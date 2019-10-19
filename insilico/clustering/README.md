# Clustering

One Approach to optimze the data was to cluster similar sequences which eliminates duplicates and determines their highest temperature resistance.

We used [MMSEQS](https://github.com/soedinglab/mmseqs2/wiki#batch-sequence-searching-using-mmseqs-search) to compute the similarity of all (around 7 Million) sequences of the BacDive+ dataset against each other. We used a computer cluster to achieve this which resulted in a 145 GB dataset.

Aftewards implemented the following algorithm based of [UCLUST](http://drive5.com/usearch/manual/uclust_algo.html) to efficiently find similar sequences.