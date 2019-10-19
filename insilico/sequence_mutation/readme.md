# Generation of heat resistant sequences

This code uses our trained models and the NCBI tBlastn to find similar existing proteins which could be more heat resistant and mutated your sequence based on naturally occuring mutations.

## Setup

First consider setting up Tensorflow/CUDA on your GPU as it takes really long to run Neural Networks only on a CPU.

Install python requirements

```shell
pip install -r requirements.txt
```

Run our python tool on your protein:

```shell
python mutate.py --resultName test1 --activeCenters "[[0, 131],[246,381]]" --sequence MKYLLPTAAAGLLLLAAQPAMAEIVLTQSPGTLSLSPGERATLSCRASQSVSSSSLDWYQQKPGQAPRLLIYGASSRATGVPDRFSGSGSGTDFTLTISRLEPEDFAVYYCLQWNYFPYTFGQGTKVEIKRTVAAPSVFIFPPSDEQLKSGTASVVCLLNNFYPREAKVQWKVDNALQSGNSQESVTEQDSKDSTYSLSSTLTLSKADYEKHKVYACEVTHQGLSSPVTKSFNRGES*SRLIKGELNMKYLLPTAAAGLLLLAAAPAMAEVQLLESGGGLVQPGGSLRLSCAASGFTFSSYAMNWVRQAPGKGLEWVSQINPSGGSTYYADSVKGRFTISRDNSKNTLYLQMNSLRAEDTAVYYCVGHEWGQGTLVTVSSASTKGPSVFPLAPSSKSTSGGTAALGCLVKDYFPEPVTVSWNSGALTSGVHTFPAVLQSSGLYSLSSVVTVPSSSLGTQTYICNVNHKPSNTKVDKKVEPKSSAATGADHHHHHH
```

The results are saved to a file in ./results/results_*.txt.