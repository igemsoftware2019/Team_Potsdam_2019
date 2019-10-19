import pickle
from tqdm import tqdm

import matplotlib.pyplot as plt
import numpy as np


with open('clusters.pkl', 'rb') as f:
    clusters = pickle.load(f)

ident_sum = 0
size_sum = 0
sizes = []
count = 0
for key in tqdm(clusters):
    if (len(clusters[key]['sequences']) > 1 and
       clusters[key]['sequences'][0][0] == clusters[key]['sequences'][1][0]):
        clusters[key]['sequences'].pop(0)
    sizes.append(len(clusters[key]['sequences']))
    ident_sum += ((sum([float(s[1]) for s in clusters[key]['sequences']])) /
                  (len(clusters[key]['sequences'])))
    size_sum += len(clusters[key]['sequences'])
    if len(clusters[key]['sequences']) == 200:
        print(clusters[key])
print(ident_sum/len(clusters))
print(size_sum/len(clusters))

y_pos = np.arange(len(sizes))
sizes = sorted(sizes)
print(sizes)
# plt.bar(y_pos, sizes, align='center', alpha=0.5)
# plt.xticks(y_pos, y_pos)
# plt.show()

# Plot
plt.scatter(y_pos, sizes)
plt.show()
