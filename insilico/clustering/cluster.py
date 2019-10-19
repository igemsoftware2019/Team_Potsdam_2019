from tqdm import tqdm
import pickle
# Clustering by sequence identity inspired by UCLUST (http://drive5.com/usearch/manual/uclust_algo.html)

# for each seq get all above 0.85 find highest temp and same that id
# remove duplicate ids

# 'query','target','pident','alnlen','mismatch','gapopen','qstart','qend','tstart','tend','evalue','bits'
cluster_identity = 0.85
# clusterid:[[id,pident], ...], centroid
cluster_count = 0
clusters = {}
# sequenceid:clusterid
sequences = {}

with open("outDB.tab", "r") as f:
    current_id = -1
    current_id_data = []
    for line in tqdm(f,total=2507739235,ascii=True):
        line_array = line.split('\t')
        query = line_array[0]
        target = line_array[1]
        pident = line_array[2]
        if query != current_id:

            # ASSIGN SEQUENCE TO CLUSTER
            # Check if any of the targets is a centroid if yes assign
            # Simple clustering but not optimal Clusters
            # Could improve by tracking Number of Sequences in a cluster for each id and creating new cluster depending on that whil maximizing number of sequences in a Cluster
            # But in our our case we dont have enough memory for that ~ 130GB
            if current_id_data != []:
                is_in_cluster = False
                for l in current_id_data:
                    if float(l['pident']) > cluster_identity:
                        if l['target'] in sequences:
                            if clusters[sequences[l['target']]]['centroid'] == l['target']:
                                # target is a centroid
                                clusters[sequences[l['target']]]['sequences'].append([l['query'],l['pident']])
                                is_in_cluster = True
                                break
                if not is_in_cluster:
                    sequences[query] = cluster_count
                    clusters[cluster_count] = {'centroid': query, 'sequences': [[query, 1]]}
                    cluster_count += 1
            # RESET
            current_id = query
            current_id_data = [{'query': query, 'target': target, 'pident': pident}]
        else:
            current_id_data.append({'query': query, 'target': target, 'pident': pident})

print(cluster_count)
with open('sequences.pkl', 'wb') as f:
    pickle.dump(sequences, f, protocol=pickle.HIGHEST_PROTOCOL)
with open('clusters.pkl', 'wb') as f:
    pickle.dump(clusters, f, protocol=pickle.HIGHEST_PROTOCOL)
