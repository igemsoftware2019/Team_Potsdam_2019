### ***Overall:***

This is the readme is regarding the work done for the ***Transfer Learning***, meaning mainly the pre-learning using the ***BacDive+*** dataset, as well as the creation and preprocessing of it.

All work is done in ***ipython notebooks***, each starting with a short description of what was done in the notebook overall, which the notebook structure should reflect as well. 

### ***Nevertheless, here is an overview:***

*	***Data/*** 
    *	***Generally:*** Contains the work regarding the creation and preprocessing of the ***BacDive+*** dataset. For further details read the description in the notebooks.
    *	***Note:*** The *df_bacdive.csv* is derived from the BacDive database, and *df_ncbi.csv* is derived from the NCBI dataset based on the organisms in *df_bacdive.csv*. Both files were created by *Lucas Golombek*.
*	***Models/*** 
    *	***Generally:*** all *BacDive+* models were trained and evaluated here
    *	***Bac_Dive_Result_Visualization/*** contains the visualization of the results of the pre-learning on BacDive+ (basically a summary/recap of all results)
    *	***CNN_Regressor_Default/*** contains the training and validation of the *default_t*, *default_h* and *avg_pred* models
    *	***CNN_Regressor_Hypertuning/*** contains the first hypertuning iteration (one hyperparameter changed in comparison the the *default* model)
    *	***CNN_Regressor_Hypertuning_Advanced/*** contains the models that were mixed based on the best performing hyperparameters, as well as the second hypertuning iteration
    *	***CNN_Regressor_Best_Eval/*** contains the final evaluation of the best performing model in *CNN_Regressor_Hypertuning_Advanced/* which is represented either by *best_t* or *best_h*
    *	***CNN_Regressor_Transfer_Learning/*** contains the training of the models that were finally used for transfer learning, i.e. for feature extraction 
