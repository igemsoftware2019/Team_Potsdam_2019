import math
import requests
import time
import json
import os
import random
import Levenshtein
import xml.etree.ElementTree as ET
import argparse
import ast

from math import floor
from protein import Protein
from lxml import html
from ensemble import predict_temperature
from tqdm import tqdm

# TODO
# seperate blast file with nice tblastn calls
# seperate file with better logging of results
# split models/ensemble

random.seed(12345)

blast_path = "./blast_data/"

IUPAC_ext_dict = {"A": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6,
                  "H": 7, "I": 8, "K": 9, "L": 10, "M": 11, "N": 12,
                  "P": 13, "Q": 14, "R": 15, "S": 16, "T": 17, "V": 18,
                  "W": 19, "Y": 20, "B": 0, "X": 0, "Z": 0, "J": 0,
                  "U": 0, "O": 0}


def blast_sequence(protein, team_name, blast_size=100):
    if (os.path.exists(blast_path + team_name + '_' + str(blast_size) + '.json')
       and os.path.exists(blast_path + team_name + '_' + str(blast_size) + '.gb')):

        with open(blast_path + team_name + '_' +
                  str(blast_size) + '.json', 'r') as f:
            blast_json = json.load(f)
        blast_proteins = readProteins(blast_path + team_name + '_' + str(blast_size) + '.gb')
        return blast_json, blast_proteins
    else:
        blast_url = ('https://blast.ncbi.nlm.nih.gov/blast/Blast.cgi?CMD=put' +
                     '&DATABASE=nr&PROGRAM=tblastn&ALIGNMENTS=' +
                     str(blast_size) + '&QUERY=' + protein)
        rid_page = requests.get(blast_url)

        tree = html.fromstring(rid_page.content)
        rid = tree.xpath('//*[@id="rid"]')[0].value

        blast_result_url = ('https://blast.ncbi.nlm.nih.gov/blast/Blast.cgi?' +
                            'FORMAT_TYPE=JSON2_S&CMD=Get&RID=' + rid)
        blast_page = requests.get(blast_result_url)
        print('Blast running. This can take several minutes.')
        while 'application/json' != blast_page.headers.get('content-type'):
            blast_page = requests.get(blast_result_url)
            time.sleep(5)
        blast_json = json.loads(blast_page.content)
        print('Blast finished.')
        with open(blast_path + team_name + '_' +
                  str(blast_size) + '.json', 'w') as f:
            json.dump(blast_json, f)

        all_ids = []
        for data in blast_json['BlastOutput2'][0]['report']['results']['search']['hits']:
            all_ids.append(data['description'][0]['id'].split("|")[1])

        gb_data = ""
        for i in range(0, 9):
            batch_ids = all_ids[100*i:100+100*i]
            id_string = ",".join(batch_ids)

            request_size = requests.request(method='get', url='http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=nuccore', params={'id': id_string})
            root = ET.fromstring(request_size.text)
            batch_id_lengths = root.findall("./DocSum/Item[9]")

            batch_ids_small_file = []
            for i in range(len(batch_id_lengths)):
                gb_size = int(batch_id_lengths[i].text)
                if gb_size < 20000:
                    batch_ids_small_file.append(batch_ids[i])

            id_string = ",".join(batch_ids_small_file)
            request_gb = requests.request(method='get', url='http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?rettype=gb&retmode=text&db=nuccore', params={'id': id_string})
            gb_data += request_gb.text

        with open(blast_path + team_name + '_' + str(blast_size) + '.gb', 'w') as f:
            f.write(gb_data)
        blast_proteins = readProteins(blast_path + team_name + '_' + str(blast_size) + '.gb')
        return blast_json, blast_proteins


def find_blast_mutations(blast_json):
    mutations = []
    original_aa = ''
    for data in blast_json['BlastOutput2'][0]['report']['results']['search']['hits']:
        blast_prot = data['hsps'][0]
        num_inserts = 0
        for i in range(0, blast_prot['align_len']):
            mutation_type = None
            new_aa = None
            if blast_prot['qseq'][i] != "-":
                original_aa = blast_prot['qseq'][i]

            if blast_prot['qseq'][i] == "-":
                # inserting mutation
                mutation_type = 'insert'
                new_aa = blast_prot['hseq'][i]
                pass
            elif blast_prot['hseq'][i] == "-":
                # deleting mutation
                mutation_type = 'delete'
                new_aa = ''

                pass
            elif blast_prot['qseq'][i] != blast_prot['hseq'][i]:
                # replacing
                mutation_type = 'replace'
                new_aa = blast_prot['hseq'][i]
                pass

            # IUPAC_ext_dict: to avoid unkown AAs or X - *
            if mutation_type and new_aa in IUPAC_ext_dict:
                mutation = {
                    'type': mutation_type,
                    'position': blast_prot['query_from'] - 1 + i - num_inserts,
                    'original_aa': original_aa,
                    'new_aa': new_aa,
                    'insert_order': num_inserts,
                }
                mutations.append(mutation)
            if mutation_type == 'insert':
                num_inserts += 1
    return mutations


def readProteins(filepath):
    # (id, name, amonioacids)
    # [[0,"exampleProtein","RALLAAVQELATEEAIAVVVLTGAGDRAFIAGADISEMVEKSPAEALAFA"]]
    proteins = []
    prot_ids = []
    get_prot = False
    with open(filepath, "r") as fin:
        lines = fin.readlines()
        for l in lines:
            if "/protein_id=" in l:
                prot_ids.append(l[34:len(l)-2])
            if "/translation=" in l:
                proteins.append(l[35:].replace(' ', '').replace('\n', ''))
                get_prot = True
            elif get_prot:
                if '\"' in l[:len(l)-1]:
                    get_prot = False

                    proteins[len(proteins)-1] += l[:len(l)-2].replace(' ', '').replace('\\n', '')
                else:
                    proteins[len(proteins)-1] += l[:len(l)-1].replace(' ', '').replace('\\n', '')
    return list(zip(proteins, prot_ids))


def improve_heat_resistance(sequences, number_of_mutations=5, generations=100,
                            generation_size=1000, natural_mutations=None,
                            active_centers=None):
    generation = []
    cross_over_probability = 0.175
    mutation_probability = 0.95
    next_gen = []
    for i in range(generation_size-1):
        p = Protein(random.choice(sequences), number_of_mutations,
                    active_centers=active_centers,
                    natural_mutations=natural_mutations)
        p.mutate()
        next_gen.append(p)
    for g_id in tqdm(range(generations)):
        generation = next_gen
        for p in generation:
            p.update()

        # Sort after temperature
        for i in range(0, len(generation)):
            highest_temp = i
            for j in range(i, len(generation)):
                if (generation[highest_temp].temperature <
                   generation[j].temperature):
                    highest_temp = j
            swap = generation[highest_temp]
            generation[highest_temp] = generation[i]
            generation[i] = swap

        for i in range(0, len(generation)):
            generation[i].survival_chance = math.exp((math.log(0.01) /
                                                     (generation_size-1))*i)
        # print(f"Generation {g_id} best protein:")
        # print(generation[0])
        next_gen = []
        index = 0
        while len(next_gen) < generation_size:
            if generation[index].survival_chance > random.random():
                p = Protein(generation[index].original_seq,
                            number_of_mutations,
                            mutations=generation[index].mutations,
                            active_centers=active_centers,
                            natural_mutations=natural_mutations)
                if mutation_probability > random.random():
                    p.mutate()
                if cross_over_probability > random.random():
                    # TODO no random crossover instead with survival_chance
                    p.cross_over(generation[floor(random.random()*len(generation))])
                next_gen.append(p)
            index = (index+1) % (generation_size-1)
    return generation


# team_name = "china"
# input_sequence = 'MSHHWGYGKHNGPEHWHKDFPIAKGERQSPVDIDTHTAKYDPSLKPLSVSYDQATSLRILNNGHAFNVEFDDSQDKAVLKGGPLDGTYRLIQFHFHWGSLDGQGSEHTVDKKKYAAELHLVHWNTKYGDFGKAVQQPDGLAVLGIFLKVGSAKPGLQKVVDVLDSIKTKGKSADFTNFDPRGLLPESLDYWTYPGSLTTPPLLECVTWIVLKEPISVSSEQVLKFRKLNFNGEGEPEELMVDNWRPAQPLKNRQIKASFK'
# Lue(67)  Ser(99)  Pro（131)
# active_centers = [[64, 71], [96, 103], [128, 135]]

# team_name = "finnland"
# input_sequence = 'MKYLLPTAAAGLLLLAAQPAMAEIVLTQSPGTLSLSPGERATLSCRASQSVSSSSLDWYQQKPGQAPRLLIYGASSRATGVPDRFSGSGSGTDFTLTISRLEPEDFAVYYCLQWNYFPYTFGQGTKVEIKRTVAAPSVFIFPPSDEQLKSGTASVVCLLNNFYPREAKVQWKVDNALQSGNSQESVTEQDSKDSTYSLSSTLTLSKADYEKHKVYACEVTHQGLSSPVTKSFNRGES*SRLIKGELNMKYLLPTAAAGLLLLAAAPAMAEVQLLESGGGLVQPGGSLRLSCAASGFTFSSYAMNWVRQAPGKGLEWVSQINPSGGSTYYADSVKGRFTISRDNSKNTLYLQMNSLRAEDTAVYYCVGHEWGQGTLVTVSSASTKGPSVFPLAPSSKSTSGGTAALGCLVKDYFPEPVTVSWNSGALTSGVHTFPAVLQSSGLYSLSSVVTVPSSSLGTQTYICNVNHKPSNTKVDKKVEPKSSAATGADHHHHHH'
# active_centers = [[0, 131],[246,381]]

# team_name = "dresden"
# input_sequence = 'MKELTMLSLSFFFVSALLAAAANPLLSAADSAPNPVLDIDGEKLRTGTNYYIVPVLRDHGGGLTVSATTPNGTFVCPPRVVQTRKEVDHDRPLAFFPENPKEDVVRVSTDLNINFSAFMPCRWTSSTVWRLDKYDESTGQYFVTIGGVKGNPGPETISSWFKIEEFCGSGFYKLVFCPTVCGSCKVKCGDVGIYIDQKGRRRLALSDKPFAFEFNKTVYF'
# active_centers = []

# team_name = "wellington"
# input_sequence = 'MMKKQNDIPQPIRGDKGATVKIPRNIERDRQNPDMLVPPETDHGTVSNMKFSFSDTHNRLEKGGYAREVTVRELPISENLASVNMRLKPGAIRELHWHKEAEWAYMIYGSARVTIVDEKGRSFIDDVGEGDLWYFPSGLPHSIQALEEGAEFLLVFDDGSFSENSTFQLTDWLAHTPKEVIAANFGVTKEEIANLPGKEKYIFENQLPGSLKDDIVEGPNGEVPYPFTYRLLEQEPIESEGGNVYIADSTNFKVSKTIASALVTVEPGAMRELHWHPNTHEWQYYISGKARMTVFASDGHARTFNYQAGDVGYVPFAMGHYVENIGDEPLVFLEIFKDDHYADVSLNQWLAMLPETFVQAHLDLGKDFTDVLSKEKHPVVKKKC'
# active_centers = []

# team_name = 'potsdam'
# input_sequence= 'MKHIKSKILVILTVCMLSVISVFAFQPTESKASSGHNPVVMVHGIGGASFNFAGIKTYLASQGWSRKEMYAIDFLDKTGNNRHNAPRLSNYVKKVLSETGAKKVDIVAHSMGGANTLYYIKNLDGGDKIANVVTLGGANGLVTNRALPGTDPNQKILYTSIYSSADLIVLNPLSRLIGGKNVQIHGVGHIGLLMNSQVNGLIKEGLNGGGQNTN'
# active_centers = [[107,113],[163,169],[186,192]]


parser = argparse.ArgumentParser(description='Mutation of protein for more heat resistance (Results can be found in the ./results/ folder.) ')
parser.add_argument('--resultName', type=str, required=True, help='Name used for the results_(resultName).txt')
parser.add_argument('--sequence', type=str, required=True, help='Amino acid sequence in capital letters of a protein (length 50 - 650)')
parser.add_argument('--activeCenters', type=str, nargs='?', const='[]', required=False, help='String representation of active centers which should not be mutated. Example: \"[[107,113],[163,169]]\" here region 107-113 and 163-169 are not mutated.')
parser.add_argument('--blastSize', type=int, default=1000, required=False, help='Number of BlastResults used to find similar proteins and naturally occuring mutations.')
parser.add_argument('--generations', type=int, default=20, required=False, help='Number of generations run in the evolutionary algorithm.')
parser.add_argument('--generationSize', type=int, default=1000, required=False, help='Number of proteins in each generation.')
args = parser.parse_args()

team_name = str(args.resultName)
input_sequence = str(args.sequence)
active_centers = ast.literal_eval(args.activeCenters)

blast_size = args.blastSize
generations = args.generations
generation_size = args.generationSize

base_temperature = predict_temperature(input_sequence)

result_file = open("./results/results_" + team_name + ".txt", "w")

result_file.write("The temperature is the predicted temperature(in °C) of our neural network which the protein could withstand easily. The very high temperatures are probably incorrect but indicate more heat resistance. If you want other sequences or information about similar proteins feel free to ask us." + '\n')
result_file.write('\n')
result_file.write("Original Sequence:" + '\n')
result_file.write('\n')
result_file.write(input_sequence + '\n')
result_file.write(f'Temperature: {base_temperature[0][0][0]}' + '\n')
result_file.write('\n')
result_file.flush()

blast_json, blast_proteins = blast_sequence(input_sequence, team_name, blast_size=blast_size)

natural_mutations = find_blast_mutations(blast_json)

'''
# Temporary to avoid mutations of Cystine
temp = natural_mutations
natural_mutations = []
for m in temp:
    if m['original_aa'] == 'c' or m['original_aa'] == 'C':
        pass
    else:
        natural_mutations.append(m)
'''

# Run network on blast similar seqs same length identity
promising_sequences = []
for prot in blast_proteins:
    if 'X' not in prot[0]:
        temp = predict_temperature(prot[0])
        if temp > base_temperature:
            identity = Levenshtein.ratio(input_sequence, prot[0])
            promising_sequences.append([prot[0], prot[1], temp, identity])

promising_sequences = sorted(promising_sequences, key=lambda x: x[2][0][0][0])
result_file.write("Similar proteins found with tBlastn (which could be more heat resistant):" + '\n')
highest_identity = 0
for p in reversed(promising_sequences):
    if highest_identity < p[3]:
        highest_identity = p[3]
        result_file.write(p[0] + '\n')
        result_file.write("(https://www.ncbi.nlm.nih.gov/protein/" + p[1] + ")" + '\n')
        result_file.write("Temperature: " + str(p[2][0][0][0]) + " Identity: " + str(p[3]) + '\n')
        result_file.write('\n')

result_file.write("Best predicted mutations:" + '\n')
result_file.write('\n')
result_file.flush()
result = improve_heat_resistance([input_sequence],
                                 number_of_mutations=1,
                                 active_centers=active_centers,
                                 natural_mutations=natural_mutations,
                                 generations=generations,
                                 generation_size=generation_size)
result_file.write(result[0].sequence() + '\n')
identity = Levenshtein.ratio(input_sequence, result[0].sequence())
result_file.write("Temperature: " + str(result[0].temperature[0][0][0]) + " Identity: " + str(identity) + '\n')
result_file.write('\n')
result_file.flush()
result = improve_heat_resistance([input_sequence],
                                 number_of_mutations=5,
                                 active_centers=active_centers,
                                 natural_mutations=natural_mutations,
                                 generations=generations,
                                 generation_size=generation_size)
result_file.write(result[0].sequence() + '\n')
identity = Levenshtein.ratio(input_sequence, result[0].sequence())
result_file.write("Temperature: " + str(result[0].temperature[0][0][0]) + " Identity: " + str(identity) + '\n')
result_file.write('\n')
result_file.flush()
result = improve_heat_resistance([input_sequence],
                                 number_of_mutations=len(input_sequence)*0.5,
                                 active_centers=active_centers,
                                 natural_mutations=natural_mutations,
                                 generations=generations,
                                 generation_size=generation_size)
result_file.write(result[0].sequence() + '\n')
identity = Levenshtein.ratio(input_sequence, result[0].sequence())
result_file.write("Temperature: " + str(result[0].temperature[0][0][0]) + " Identity: " + str(identity) + '\n')
result_file.write('\n')
result_file.flush()
result = improve_heat_resistance([input_sequence],
                                 number_of_mutations=len(input_sequence)*0.10,
                                 active_centers=active_centers,
                                 natural_mutations=natural_mutations,
                                 generations=generations,
                                 generation_size=generation_size)
result_file.write(result[0].sequence() + '\n')
identity = Levenshtein.ratio(input_sequence, result[0].sequence())
result_file.write("Temperature: " + str(result[0].temperature[0][0][0]) + " Identity: " + str(identity) + '\n')
result_file.write('\n')
result_file.flush()
result = improve_heat_resistance([input_sequence],
                                 number_of_mutations=len(input_sequence)*0.15,
                                 active_centers=active_centers,
                                 natural_mutations=natural_mutations,
                                 generations=generations,
                                 generation_size=generation_size)
result_file.write(result[0].sequence() + '\n')
identity = Levenshtein.ratio(input_sequence, result[0].sequence())
result_file.write("Temperature: " + str(result[0].temperature[0][0][0]) + " Identity: " + str(identity) + '\n')
result_file.write('\n')
result_file.flush()