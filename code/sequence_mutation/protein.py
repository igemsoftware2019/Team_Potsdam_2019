import random
from math import floor
from uuid import uuid4

from ensemble import predict_temperature

random.seed(12345)


class Protein():
    def __init__(self, original_sequence, number_of_mutations, mutations=None,
                 max_protein_length=650, min_protein_length=50,
                 natural_mutations=None, active_centers=None):
        self.original_seq = original_sequence
        self.number_of_mutations = number_of_mutations
        self.mutations = mutations or []
        self.natural_mutations = natural_mutations
        self.active_centers = active_centers
        self.dont_mutate = []
        if self.active_centers:
            for c in active_centers:
                self.dont_mutate = self.dont_mutate + list(range(c[0], c[1]))
        self.max_protein_length = max_protein_length
        self.min_protein_length = min_protein_length
        self.temperature = None
        self.structural_stability = None
        self.survival_chance = None

    def mutate(self):
        '''
        If there are too many mutations it removes a random mutation.
        '''
        if len(self.mutations) >= self.number_of_mutations:
            # Maybe remove worst mutation instead of random
            i = floor(random.random() * len(self.mutations))
            self.mutations = self.mutations[:i] + self.mutations[i+1:]
        mutation = self.natural_mutation()
        if not mutation['position'] in self.dont_mutate:
            self.mutations.append(mutation)

    def natural_mutation(self):
        return random.choice(self.natural_mutations)

    '''
    We don't do the following mutation types: Duplication, Inversion,
    Translocation, because they change too many AAs at once.
    '''
    def random_mutation(self):
        '''
        Makes no or a random replace/delete/insert mutation.
        '''
        # TODO check if correct amino acids
        amino_acids = ['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L',
                       'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y']
        random_type = random.random()
        mutated_seq_len = len(self.sequence())
        if random_type < 0.66:
            mutation_type = 'replace'
        elif (random_type < 0.835 and
              mutated_seq_len > self.min_protein_length):
            # Dont allow insert mutations below 50 AAs
            mutation_type = 'delete'
        elif (random_type < 0.99 and
              mutated_seq_len < self.max_protein_length):
            # Dont allow insert mutations above 650 AAs
            mutation_type = 'insert'
        else:
            mutation_type = 'no_mutation'
            return

        if mutation_type == 'replace':
            mutation_pos = floor(random.random() * len(self.original_seq))
            # Remove original_ aa to ensure that it is not randomly the same aa
            amino_acids.pop(amino_acids.index(self.original_seq[mutation_pos]))
            new_aa = amino_acids[floor(random.random()*19)]
        elif mutation_type == 'delete':
            mutation_pos = floor(random.random() * len(self.original_seq))
            new_aa = ''
        elif mutation_type == 'insert':
            # +1 to allow mutations before and behind sequence
            mutation_pos = floor(random.random() * (len(self.original_seq)+1))
            new_aa = amino_acids[floor(random.random()*20)]

        orig_pos = (mutation_pos - 1 if mutation_pos == len(self.original_seq)
                    else mutation_pos)
        mutation = {
            'type': mutation_type,
            'position': mutation_pos,
            'original_aa': self.original_seq[orig_pos],
            'new_aa': new_aa,
            'insert_order': int(uuid4()),
        }
        return mutation

    def cross_over(self, other):
        # Maybe choose five best mutations instead of random
        cut_self = floor(random.random()*len(self.mutations))
        cut_other = floor(random.random()*len(other.mutations))
        crossed_mutations = (self.mutations[:cut_self] +
                             other.mutations[cut_other:])
        # Remove too many mutations
        while len(crossed_mutations) >= self.number_of_mutations:
            # Maybe remove worst mutation instead of random
            i = floor(random.random() * len(crossed_mutations))
            crossed_mutations = crossed_mutations[:i] + crossed_mutations[i+1:]
        return Protein(self.original_seq, self.number_of_mutations,
                       mutations=crossed_mutations)

    def sequence(self):
        '''This returns the sequence with its mutations.

        Delete and insert mutations make the position incorrect. To work
        around that delete mutations temporarly add an empty space '_' which
        is removed at the end.

        Insert mutations are applied last by keeping track of how many
        insertions happend before to insert at the correct position,
        additionally they have a insert_order/uuid to have a consistent
        position
        '''
        mutated_seq = self.original_seq
        all_inserts = []
        for m in self.mutations:
            # because insert canbe one larger than
            orig_pos = (m['position'] - 1 if m['position'] ==
                        len(self.original_seq) else m['position'])
            # does not work/apply for mutation across multiple sequences
            # if m['original_aa'] != self.original_seq[orig_pos]:
            # raise Exception("Trying to mutate the wrong position", str(m))

            if m['type'] == 'replace':
                mutated_seq = (mutated_seq[:m['position']] + m['new_aa'] +
                               mutated_seq[(m['position']+1):])
            elif m['type'] == 'delete':
                mutated_seq = (mutated_seq[:m['position']] + '_' +
                               mutated_seq[(m['position']+1):])
            elif m['type'] == 'insert':
                all_inserts.append(m)

        if len(all_inserts) > 1:
            # Sort all inserts by position and insert_order
            for i in range(len(all_inserts)):
                smallest_pos = i
                for j in range(i, len(all_inserts)):
                    m = all_inserts[j]
                    smallest = all_inserts[smallest_pos]
                    if m['position'] < smallest['position']:
                        smallest_pos = j
                    elif (m['position'] == smallest['position'] and
                          m['insert_order'] < smallest['insert_order']):
                        smallest_pos = j
                smallest = all_inserts[smallest_pos]
                # Swap
                tmp = all_inserts[i]
                all_inserts[i] = all_inserts[smallest_pos]
                all_inserts[smallest_pos] = tmp

        # Iteratively add insertions
        previous_inserts = 0
        for m in all_inserts:
            insert_pos = (m['position']+previous_inserts)
            mutated_seq = (mutated_seq[:insert_pos] + m['new_aa'] +
                           mutated_seq[insert_pos:])
            previous_inserts += 1

        # Remove '_'
        mutated_seq = mutated_seq.replace('_', '')
        return mutated_seq

    def update(self):
        self.predict_temperature()
        self.predict_structure_stability()
        return self.temperature, self.structural_stability

    def predict_temperature(self):
        # RUN BACDIVe model?
        self.temperature = predict_temperature([self.sequence()])
        return self.temperature

    def predict_structure_stability(self):
        # RUN deepprotein model?
        # compare go output
        # or we try to rpedict centers first
        self.structural_stability = 0
        return self.structural_stability

    def __repr__(self):
        return ("Protein: " + str(self.temperature) + ", " +
                str(self.structural_stability) + ", " +
                str(self.survival_chance) + ", " +
                str(self.mutations) + ", " +
                str(self.sequence()))
