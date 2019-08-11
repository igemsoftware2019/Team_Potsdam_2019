import matplotlib.pyplot as plt
import math

import numpy as np
generation_size = 200
gen = np.arange(1, generation_size)


e = [math.exp((math.log(0.01)/generation_size)*x) for x in gen]
plt.scatter(gen, e)
plt.show()
