### ***Overall:***

This is the readme regarding the work done for the overall problem setting of ***predicting protein thermostability change upon single point mutation***, as reported in the thesis. This includes the preprocessing and creation of the various subsets of the *T1626* dataset (and the other *Merck&Co+* (sub) datasets), as well as the classical cross-validation on it. The *leave-one-protein-out cross-validation*, as well as the *sanity checks* and any other validations related to problem domain can be found here too. For an in depth explanation look into the thesis.

All work is done in ***ipython notebooks***, each starting with a short description of what was done in the notebook overall, which the notebook structure should reflect as well. The model taxonomy was later reworked (see below) and thus mostly differs from what was used at the time of creation. Therefore I included the current name of the models in brackets in the notebooks where appropriate. 

### ***Nevertheless, here is an overview:***

*	***Data/*** 
    *	***Generally:*** contains the creation of all the data files & sources used by the *XGBoost* models for *dTM* prediction. 
    *	***Souce/*** contains the original *Merck&Co* source dataset, as well as a color coded version of it (for the different types of features).
    *	***T96/, T251/, T1626/, T1973/*** contain the creation of the corresponding data subsets of the *Merck&Co+* dataset, as well as the aligned deep CNN feature extractions, according to the general schema mentioned below.
        *	In the ***cnn_rep_sampler_.../*** subfolders the representations from the deep CNN are extracted. In the ***paper_datasets_.../*** subfolders the different subsets from the *Merck&Co+* dataset are generated based on the type of the features (see model taxonomy). In the ***sequence_sampler_.../*** subfolder the *Merck&Co+* dataset is generated based on the *Merck&Co* dataset (*AA* sequences requested and preprocessed).
        *	The ***T1973/*** folder is just a concatenation of the *T96*, *T251* and *T1626* sub datasets and thus does not contain a *sequence_sampler_.../* folder, since the sequences are just the sequences from the other three sub datasets combined.
        *  The  ***T1626/*** additionally contains the ***own_baseline_xgboost_T1626*** folder, which essentially does the same as *paper_datasets_.../*, however, was created before that and is the nomenclature and ordering of the features is not consistent with the other sub datasets.


*	***Models/***
    * ***Generally:*** mainly contains the classical *7-trial 5-fold cross-validation* of the XGBoost models with the nested Bayesian hypertuning on the *T1626* dataset.
    *	***Paper_Features_Own_Baseline/*** contains the training, tuning and validation of the *Merck&Co+ feature* based models.
    *	***CNN_Features/*** contains the training, tuning and validation of the *Extracted CNN feature* based models. 
    *	***CNN_Features_Paper_Features/*** contains the training, tuning and validation of the *combined feature* based models. 
    *	***CNN_Features_Pretrain_Cont/*** only contains the training and validation of the models that do not rely on XGBoost for transfer learning, but rather classical neural networks to continue training on the new problem domain (was experimental, not further explained in thesis).
    *	***Validation_Models*** contains the training of select models on the whole *T1626* dataset (the *validation models*), so that they could be retrospectively evaluated on the *T96* and *T251* dataset later. This is not further elaborated in the thesis.
*	***Validation/***
    *	***Per_Protein_Cross_Validation/*** contains everything regarding the execution of the *leave-one-protein-out cross-validation* on the *T1973* dataset, as reported in the thesis.
    *	***Sanity_Checks/*** contains everything regarding the execution of the sanity checks on the *T1626* dataset. Is basically an evaluation of the *CNN* feature extractions based on the type and layer, and overall usefulness.
    *	***Feature_Importance/*** contains the feature importance analysis of the *validation models* using the *SHAP* library.
    *	***Clustering_Sequence_Representation/*** contains clusterings of the extracted CNN representations using t-SNE to see whether they cluster based on *dTm* (they do not) or based on wild-type (they do). Not further elaborated in the thesis.
    *	***Prospective_T96/*** contains a retrospective validation on the *T96* dataset using the *validation models*. Not further elaborated in the thesis.
    *	***Retrospective_T251/*** contains a retrospective validation on the *T251* dataset using the *validation models*. Contains *AUC* values etc. that can be compared to results in the *McGuinness et al. 2018* paper. Not further elaborated in the thesis. 

### ***Model Taxonomy:***

Regex that matches most model names:

***(S)?((^|_)(E|BL|DS|CART|MOE|MONO))?(_EXT)?((^|_)(W|M|D|A)(1|2|3)((1|2|3))?)?(_s|_f)?***

*	S=”ALG features, which are sequence structure features”
*	E=”ALL energy features”
*	BL through MONO=”One of the energy feature libraries which is called BL or DS or CART or MOE or MONO”
*	W=”Wild-type sequence representation”
*	M=”Mutant sequence representation”
*	D=”Difference between the W and M”
*	A=”Wildtype, mutant and difference”
*	EXT=”Extended features, only in T1626 for legacy reasons”
*	1=”First Layer”
*	13=”First to Third layer”
*	_s=scaled at training time by ”z-score” normalization 
*	_f=”filtered dataset used”

#### ***Legacy Taxonomy Explained:***

The biggest difference in taxonomy is that *paper_features* usually referred to *S_E*, *unless* a specific subset like *E* was specified afterwards (in which case it was *only* *E*), as well as that *S* was called *ALG*.

Additionally, for the feature extractions, instead of *M* *mut*, instead *A* *all*, instead *D* diff and instead of *W* *wt* was used. Beyond that the *default* in the name represents the model that was used for transfer learning in the end (see thesis), and *64* an alternative transfer learning model that was not further pursued.
