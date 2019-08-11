import math
from random import random
from math import floor
from protein import Protein


def evolve_generation(sequences, scores):
    return []


'''
option one give mutations with worse funcitonalstblity a lower score (calc
functionality score if it stays the same)
option two dont allow mutation at wrong location (calc most important locations
at the beginning and reduce mutation chance for them? or continously)
both ?
'''


def improve_heat_resistance(seq, mutations=5, generations=10,
                            generation_size=100):
    generation = []
    cross_over_probability = 0.075
    mutation_probability = 0.85
    next_gen = []
    for i in range(generation_size-1):
        p = Protein(seq, mutations)
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
                p = Protein(seq, mutations, generation[index].mutations)
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

print(improve_heat_resistance(r_seq))
