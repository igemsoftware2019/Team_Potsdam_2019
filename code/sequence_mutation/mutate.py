import math
from random import random
from math import floor
from protein import Protein


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
            if mutation_type:
                mutation = {
                    'type': mutation_type,
                    'position': blast_prot['query_from'] - 1 + i - num_inserts,
                    'original_aa': original_aa,
                    'new_aa': new_aa,
                    'insert_order': num_inserts,
                }
                mutations.append(mutation)
                if mutation['position'] < 20:
                    print(mutation)
                    print(blast_prot)
            if mutation_type == 'insert':
                num_inserts += 1
    return mutations


def improve_heat_resistance(seq, number_of_mutations=5, generations=10,
                            generation_size=100, natural_mutations=None):
    generation = []
    cross_over_probability = 0.075
    mutation_probability = 0.85
    next_gen = []
    for i in range(generation_size-1):
        p = Protein(seq, number_of_mutations,
                    natural_mutations=natural_mutations)
        p.mutate()
        next_gen.append(p)

    for i in range(generations):
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
        print(generation)
        next_gen = []
        index = 0
        while len(next_gen) < generation_size:
            if generation[index].survival_chance > random():
                p = Protein(seq, number_of_mutations,
                            mutations=generation[index].mutations,
                            natural_mutations=natural_mutations)
                if mutation_probability > random():
                    p.mutate()
                if cross_over_probability > random():
                    # TODO no random crossover instead with survival_chance
                    p.cross_over(generation[floor(random()*len(generation))])
                next_gen.append(p)
            index = (index+1) % (generation_size-1)
        # print stats best prot
    # find best proteins and calc survival chance

    return generation[0]


amino_acids = ['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L',
               'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y']
r_seq = ""
for i in range(5):
    r_seq = r_seq + amino_acids[floor(random()*20)]
print(r_seq)
# TODO load blast json
# todo find regions with no mutations
# todo test with random mutation
# todo run network on blast similar seqs same length identity
natural_mutations = find_blast_mutations(blast_json)
print(improve_heat_resistance(r_seq, natural_mutations=natural_mutations))
