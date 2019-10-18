## BacDive dataset

This dataset connects roughly 8 million protein sequences to the temperature preferences of their containing prokaryotic organisms.
It consists of two parts:
- `df_bacdive.csv` which contains temperature information on the organisms
- `df_ncbi.csv` which contains proteins that are linked to organisms in `df_bacdive.csv`
  - the `df_ncbi.csv` file is 3GB, see section troubleshooting below if that gives you trouble

The code of the BacDive and NCBI crawlers can be found in [this repository](https://gitlab.com/magratheaner/bacdive-thermal-data)

### Algorithm used to construct `df_bacdive.csv`

1. Use the BacDive advanced search to find all organisms on BacDive with any temperature information (setting: Culture and growth conditions -> Temperature `=` `*`)
2. Download resulting list of all BacDive organism IDs
3. Request BacDive entries (per API) for all IDs in the list
4. Save all positive temperature test results (e.g. type 'optimal growth temperature' test result 'positive' range '45-50') (can be more than one test per organism) (in API response under `['culture_growth_condition']['culture_temp']`)
5. Save NCBI taxonomy accession IDs of all linked genome projects (in API response under `['molecular_biology']['sequence']`)

### Algorithm used to construct `df_ncbi.csv`

1. For each organism with an NCBI taxonomy accession ID in the dataset request RefSeq proteins from NCBI (the tax IDs will only be requested once)
  1.1. for all organisms with a positive `thermophilic` test on BacDive we request all proteins
  1.2. for all the other organisms we only request 1000 proteins (this was necessary to lower the runtime to 50 hrs)

### Working with the dataset

TODO

### Troubleshooting

- the dataset containing the proteins (df_NCBI.csv) weighs in at 3GB which is too much for 32-bit applications
  - therefore you need 64-bit versions for the software you plan to load the data with (e.g. Python AMD86-64)

### TODOs

- provide some example code on how to sample a training set from the dataset
- extract a subset of the data as a standalone dataset with less than 3GB