# DeeProtein2
Neural network models to predict the function of proteins based on their sequence. The steps to download, clean and structure the training/validation set as well as train different models is provided including extensive documentation. The code was tested to run on [google colab](https://colab.research.google.com/notebooks/welcome.ipynb) or on your local machine with [Jupyter Notebook](https://jupyter.org).

The code was developed by the iGEM team [Potsdam 2019](https://2019.igem.org/Team:Potsdam) and is based on the approach of *DeeProtein* developed by Team [Heidelberg 2017](http://2017.igem.org/Team:Heidelberg/Software/DeeProtein).
## Installation
The code is provided in ipython notebooks, which were tested to be directly executable in the environments provided by google colab or Jupyter Notebook.

### *Google colab* 
Google colab allows you to efficiently run python code in your browser on a CPU, GPU or TPU provided by google without installing anything on your local machine. You just need a google account and access to the internet to be able to run ipython notebooks directly from your google drive. Consequently, this option is recommanded to get started right away. 
Just upload the folder DeeProtein2 to your google drive and you are all set.

If training on a TPU or GPU is desired, make sure to its selected in your notebook. It can be selected as an `Harware accelerator` in the menu at `Edit -> Notebook settings`. 

### *Jupyter Notebook*
The code was tested with python 3.7.4. It is highly recommanded to create your virtual environment for your individual projects with differring library requirements (see for example [conda](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)). The required packages are listed in requirements.txt and can be installed via `pip install -r requirements.txt`.

## Getting started

The procedure to obtain your trained model with caclulated metrics is split in three files for clarity: 

1. GenerateDataset.ipynb
2. AssignLabels_SplitTestValidSet.ipynb
3. Training_Analysis.ipynb

All files automatically determine if you run the code on google colab or locally with Jupyter Notebook. Out of the box, parameters are set to generate a dataset based on Swiss-Prot including sequences with a minimum of 50 AAs and a maximum of 650 AAs. All [GO labels](http://geneontology.org/docs/go-annotations/) are represented by 100 unique proteins where an indiviudal protein can only represent a single term. This corresponds to 2881 terms consequently a total of 288,100 proteins. We use 70% (201,670 proteins) of the dataset for training and keep the remaining 30% (86,430 proteins) for validation. A neural network is then trained on the data. Parameters are chosen for computationally efficieny to obtain results within hours (tested on google's TPU). Settings for our best model are included in the code and listed in the relevant section. The average f1-score and AUC is computed.

The general functionalities of the individual files are summarized below. More details and comments are given in the respective file. 

### Downloading database and cleaning data
The script *GenerateDataset.ipynb* downloads the raw data of SwissProt. All entries in SwissProt are then reduced to the sequence of an entry and its functions (GO terms). GO terms are initially split into molecular functions (F), biological processes (P) and cellular components (C). Proteins whose existence is unclear or which have no assigned functions are removed. Entries with identical sequences are reduced to a single entry  where all functions assigned to any duplicate are implicitly assumed to be functions of the sequence. Finally, extremely long (>650 AAs) or short (<50 AAs) sequences are removed from the dataset. We encode the amino acids of the sequences as integers for later training.

### Generating training and validation set
The script *AssignLabels_SplitTestValidSet.ipynb* combines the different types of GO terms (F,P,C). First, we consider all GO terms with at least the chosen minimum number of representatives in the final dataset (default: `critThresh=100`). The code loops through these terms if enough sequences (according to `critThresh`) with a term are found they are removed from the dataset and added to a new set. These sequences are considered the *representatives* of the term. The sequences will have further functions but every sequence is chosen to *represent* only one term! The idea is to reduce the imbalance of the sample as some GO terms have considerably more sequences than others in SwissProt. Finally, the dataset is split into a training and a validation set. We use 30% of representatives for validation (`validate_percentage = 0.3`). Thus, the main training set consists of the remaining 70% representatives. In addition, we save an extended training set where we include all remaining sequences. This increases the data used for training while increasing the skewness of the sample.

Important parameters:
- `critThresh = 100` sets the minimum numbers of representatives per GO term in final dataset.
- `validate_percentage = 0.3` sets the percentage of representative sequences of a terma assigned to the validation set.

### Training and analysis

The script *InitialTraining_Analysis.ipynb* loads the previously generated training and validation sets. For training the popular python library `keras` is used ([tutorial](https://www.tensorflow.org/guide/keras/train_and_evaluate)). One can choose from three tested models to train the data. Finally, metrics to evaluate the overall performance of the model (f1-score, AUC, ...) can be calculated.

Important parameters:
- `FILTERCHILDREN=True` allows the remvoval of all terms with children in the dataset. 

## Troubleshooting
### Cannot find file in Google Colab
Sometimes the notebook cannot detect files, usually re-mounting google drive solves the issue
### Running out of RAM. 
Some steps in generating the dataset take considerable amount of local memory. Saving the current dataframe, restarting the runtime/session and loading the dataframe again will clear large parts of the memory.  
### Incorrect indention width space for Google Colab 
You can go to `Tools -> Preferences... -> Editor` and change the indention width in space to 4 which is the default value for the provided scripts 

