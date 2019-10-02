import tensorflow as tf
import numpy as np

SEQUENCE_LEN = 650
CLASSES = 21


# this Removes all variables/ to make sure the correct model is created
# tf.keras.backend.clear_session()


inputs = tf.keras.layers.Input(shape=(SEQUENCE_LEN,))
x = tf.keras.layers.Embedding(CLASSES, 21, input_length=SEQUENCE_LEN)(inputs)
# Embedding 21 for full input (no information loss)

# kernel_size 21 I was thinking that 21 inputs was one amino acid,
# because the embbeding basically makes a one hot encoding (might be wrong)
x = tf.keras.layers.Conv1D(128, 21)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(128, 3)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(128, 3)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(128, 3)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(128, 3)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)

x = tf.keras.layers.MaxPooling1D(3)(x)
x = tf.keras.layers.Conv1D(256, 3)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(256, 3)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(256, 3)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(256, 3)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(256, 3)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)

x = tf.keras.layers.MaxPooling1D(3)(x)
x = tf.keras.layers.Conv1D(512, 3)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(512, 3)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(512, 3)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(512, 3)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(512, 3)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)

x = tf.keras.layers.GlobalAveragePooling1D()(x)
# I experimented with dropout, which was some times helpful
x = tf.keras.layers.Dropout(0.25)(x)
x = tf.keras.layers.Dense(256)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Dense(16)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Dense(1)(x)
x = tf.keras.layers.Activation("linear")(x)

modelEmb21v2 = tf.keras.Model(inputs=inputs, outputs=x,name='v2')
modelEmb21v2.summary()

# For the gpu ensemble model the models have to be compiled/created seperatly
modelEmb21v2.compile(
      optimizer=tf.train.AdamOptimizer(),
      loss=tf.keras.losses.mean_absolute_error,
      metrics=['mse'])

inputs = tf.keras.layers.Input(shape=(SEQUENCE_LEN,))
x_in = tf.keras.layers.Embedding(CLASSES, 21, input_length=SEQUENCE_LEN)(inputs)
# Embedding 21 for full input (no information loss)

'''
kernel_size 20/21 I was thinking that 20/21 inputs was one amino acid, because 
the embbeding basically makes a one hot encoding (might be wrong)

I wanted small first layers to train with a larger batchsize and  to reduce computations

I also used padding same because if the size is always reduced some information has to be either compressed or gets lost
'''

x = tf.keras.layers.Conv1D(128, 20, padding="same")(x_in)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(128, 20, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x_pre = tf.keras.layers.Activation("relu")(x)

x = tf.keras.layers.AveragePooling1D(2)(x_pre)
x = tf.keras.layers.Conv1D(128, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(128, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x_mid_1 = tf.keras.layers.Activation("relu")(x)

x = tf.keras.layers.AveragePooling1D(2)(x_mid_1)
x = tf.keras.layers.Conv1D(128, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(128, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
'''
Similar to the reasons for padding I chose to increase the filter size and 
data size before Pooling to allow more information to be transfered,
but this is just hypothetical
'''
x = tf.keras.layers.Conv1D(256, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x_mid_2 = tf.keras.layers.Activation("relu")(x)

x = tf.keras.layers.AveragePooling1D(2)(x_mid_2)
x = tf.keras.layers.Conv1D(256, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(256, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x_mid_3 = tf.keras.layers.Activation("relu")(x)

x = tf.keras.layers.AveragePooling1D(2)(x_mid_3)
x = tf.keras.layers.Conv1D(256, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(512, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x_mid_4 = tf.keras.layers.Activation("relu")(x)

x = tf.keras.layers.AveragePooling1D(2)(x_mid_4)
x = tf.keras.layers.Conv1D(512, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(512, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(512, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x_mid_5 = tf.keras.layers.Activation("relu")(x)

x = tf.keras.layers.AveragePooling1D(2)(x_mid_5)
x = tf.keras.layers.Conv1D(512, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(1024, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Conv1D(1024, 3, padding="same")(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)


x_pre = tf.keras.layers.GlobalAveragePooling1D()(x_pre)
x_mid_1 = tf.keras.layers.GlobalAveragePooling1D()(x_mid_1)
x_mid_2 = tf.keras.layers.GlobalAveragePooling1D()(x_mid_2)
x_mid_3 = tf.keras.layers.GlobalAveragePooling1D()(x_mid_3)
x_mid_4 = tf.keras.layers.GlobalAveragePooling1D()(x_mid_4)
x_mid_5 = tf.keras.layers.GlobalAveragePooling1D()(x_mid_5)
x = tf.keras.layers.GlobalAveragePooling1D()(x)
x = tf.keras.layers.concatenate([x_pre,x_mid_1,x_mid_2,x_mid_3,x_mid_4,x_mid_5, x], axis=-1)
'''
Here I used simple residual layers to use data from different processing levels. 
This might also improve training because there are less layers between input
and output.
'''

x = tf.keras.layers.Dense(1024)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Dense(1024)(x)
x = tf.keras.layers.BatchNormalization()(x)
x = tf.keras.layers.Activation("relu")(x)
x = tf.keras.layers.Dense(1)(x)
x = tf.keras.layers.Activation("linear")(x)

modelEmb21v6 = tf.keras.Model(inputs=inputs, outputs=x, name='v6')
modelEmb21v6.summary()

# For the gpu ensemble model the models have to be compiled/created seperatly
modelEmb21v6.compile(
    optimizer=tf.train.AdamOptimizer(),
    loss=tf.keras.losses.mean_absolute_error,
    metrics=['mse'])


model_saves_folder_location = './'
weights_emb21v2 = model_saves_folder_location+"model_Emb21_v2_6.hdf5"
weights_emb21v6 = model_saves_folder_location+"model_Emb21_v6_10.hdf5"

# tf.keras.backend.clear_session()


def ensemble(models):
    inputs = tf.keras.layers.Input(shape=(SEQUENCE_LEN,))
    # get the output of model given the input image
    outputs = [model(inputs) for model in models]
    y = tf.keras.layers.Average()(outputs)
    model = tf.keras.Model(inputs=inputs, outputs=y, name='ensemble')
    return model


modelEmb21v2.load_weights(weights_emb21v2)
modelEmb21v6.load_weights(weights_emb21v6)

models = [modelEmb21v2, modelEmb21v6]
ensemble_model = ensemble(models)
ensemble_model.compile(
    optimizer=tf.train.AdamOptimizer(),
    loss=tf.keras.losses.mean_squared_error,
    metrics=['mse']
)


def predict_temperature(sequences):
    # pre process
    def seq_transf_pad(seq, max_seq_len=650):
        IUPAC_ext_dict = {"A": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6,
                          "H": 7, "I": 8, "K": 9, "L": 10, "M": 11, "N": 12,
                          "P": 13, "Q": 14, "R": 15, "S": 16, "T": 17, "V": 18,
                          "W": 19, "Y": 20, "B": 21, "X": 21, "Z": 21, "J": 21,
                          "U": 21, "O": 21, "*": 21}
        return np.pad(np.array(list(map(lambda x: IUPAC_ext_dict[x], seq)), dtype="int8"), (0, max_seq_len - len(seq)), 'constant')
    if type(sequences) == str:
        if len(sequences) > 650 or len(sequences) < 50:
            return [[[-1]]]
        pre_processed_data = [seq_transf_pad(sequences)]
    else:
        pre_processed_data = []
        for seq in sequences:
            if len(seq) > 650 or len(seq) < 50:
                return [[[-1]]]
            pre_processed_data.append(seq_transf_pad(seq))
    # run
    predicitons = ensemble_model.predict(np.array(pre_processed_data), verbose=0)
    # scale data
    mean = 34.76104917
    std = 12.700758666423116
    # variance = 161.30924601
    results = []
    for p in predicitons:
        # reverse (r - mean) /std
        # print(p)
        p = p.reshape(-1, 1)
        results.append((p*std)+mean)
    return results
