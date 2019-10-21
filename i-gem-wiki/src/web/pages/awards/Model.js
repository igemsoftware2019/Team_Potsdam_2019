import React, { useCallback} from 'react'
import { useSpring } from 'react-spring'
import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import SubtitleImage from 'components/SubtitleImage';
import Sponsors from "components/Sponsors";

function Model() {
  const [{ scroll, xy }, set] = useSpring(() => ({ scroll: 0, xy: [0, 0] }))
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(e => set({ scroll: (e.target.scrollTop) }), [set])
  return (
  <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <CustomScrollbar>
        <BackgroundImage scroll={scroll} xy={xy} title="Model" src="https://2019.igem.org/wiki/images/3/3a/T--Potsdam--nerons_invert.png"/>
        <div className="main-content">
          <div className="page-text red">
            <h1>The Model</h1>
            <p>The main idea for the in silico part of our project was to build a computational model to predict thermostable variants of proteins. Generally, the search for relevant mutants in the lab is extremely costly in terms of time and resources. The need for a great model thereby arises to significantly increase the efficiency of the search for thermostable proteins.</p>
            <h2>Theoretical Background</h2>
          <p>Deep learning approaches have led to great breakthroughs in recent years. These algorithms yield unprecedented results not only in areas of visual image recognition but also where sequential data is used such as in Natural language processing or Time Series Prediction. The nature of the problem led us to choose such a successful computational technique to tackle our problem.</p>
          <p>As a core architecture we chose Convolutional Neural Networks (CNN) which seem to be a very potent architecture when it comes to detecting patterns of spatial correlation (e.g. images or sequences). The basic idea of a deep CNN (a network composed of many layers of convolutions) is the following:</p>
          <SubtitleImage subtitle="Image 1: Convolutional Neural Network for image processing" src="https://2019.igem.org/wiki/images/8/8e/T--Potsdam--model2.png"/>
          <p className="grayLink">(<a href="https://medium.com/diaryofawannapreneur/deep-learning-for-computer-vision-for-the-average-person-861661d8aa61">Source</a>)</p>
          <p>We feed (‘train’) the network with our input data (in our case the primary amino acid sequence of the protein) and the correct output data we want the model to predict (e.g. the melting temperature of the protein). In the process the network learns to detect more and more complex patterns at each layer. Eventually the network should be able to predict the correct output of so far unseen input data (estimated melting temperature of unknown protein). To put it in the context of image recognition one can think of individual layers as follows; In the first layer the network can detect edges and their orientation, in the next layer it can detect a specific combination of edges (like a curved shape), and at higher levels even more complicated shapes, each layer building on the patterns that were detected on the layer below.</p>
          <p>In Image 1, we show a visual representation of our early model, which was trained on the database ProtDataTherm to classify the thermostability of proteins (mesophilic or thermophilic).</p>
          <SubtitleImage subtitle="Image 2: Visual representation of our classifier for thermostability. Higher values correspond to AA positions more relevant to the decision of the classification. On the other hand, more negative values correspond to AA positions that subvert the decision. Values derived by omitting AAs at certain positions and then recording the change (color coded in the graphics) in predictions by the model.)" src="https://2019.igem.org/wiki/images/7/7e/T--Potsdam--model1.png"/>
          <p>Our final model should be able to detect patterns in AA sequences that make proteins more thermostable. Visualizing the learned patters of such a model appears much harder when limited to a single dimension but the same idea applies in theory.</p>
          <h2>The Data</h2>
          <p>One of the most difficult things to figure out in deep learning is what data to use and how to represent it so that the network can learn it easily. We opted for a simple label encoding, which means that sequences are represented as an array of length 650. At each position the corresponding Amino Acid is encoded as in integer between 0-21, where 0 represents None and others the canonical amino acids. We also tried alternative encodings (like one hot encoding), but we saw no increase in model performance.</p>
          <p>Measured melting temperatures are only available for thousands of proteins which makes it unsuitable for training neural networks. Instead we compiled BacDive+ and used it as our main dataset with further details given in the project design section (provided through our github). BacDive+ contains 7.7 Mio data points consisting of pairs of label encoded Amino Acid sequences and the averaged growth temperature range of the protein organism (AOGTR).</p>
          <SubtitleImage subtitle="Image 3: Distribution of the AOGTR in the BacDive+ Dataset" src="https://2019.igem.org/wiki/images/c/c7/T--Potsdam--model4.png"/>
          <p>We opted for this dataset due to the large quantity of temperature information related to proteins. Fundamentally, an, at least statistical, correlation between melting temperature and growth temperature should exist. The idea being that a thermophilic organism (an organism with a high growth temperature range) will more likely contain proteins that have higher melting temperatures than a mesophilic organism, where proteins do not necessarily have to function at such high temperatures. Our main assumption is that the deep CNN is able to comprehend this correlation and thereby learn the influence of single AAs on the thermostablity of the protein from the data.</p>
          <h2>Model training</h2>
          <p>Due to the relatively large dataset (about 7.7 million data points) a rather simple Triple Cross Validation was performed with one fifth of the data belonging to the holdout set, and two thirds of the remainder belonging to the training set, and the remaining one third to the tune set (see figure below).</p>
          <SubtitleImage subtitle="Image 4: Visualization of the relative proportions of the train, tune and holdout set sizes" src="https://2019.igem.org/wiki/images/4/42/T--Potsdam--model3.png"/>
          <p>Before the split, the whole dataset was shuffled. The tune set was used for hyper-tuning, and the holdout set for evaluating the performance of the models.</p>
          <p>For the reported holdout set performance the model was trained separately on the 3 possible inner train/tune splits and each time evaluated on the holdout set (3-fold). </p>
          <p>The output of the neural network are decimal values between 0 and 1, so we rescaled the result to the range of the AOGTR. The value 0.1 represents an AOGTR of ~20°C and the value 0.9 represents an AOGTR of ~80°C.</p>
          <p>If you are interested in more details, please check our github, where you will find the exact model definitions used.</p>
          <h2>Model results</h2>
          <p>Our results regarding AOGTR prediction are the following:</p>
          <table className="tg">
              <tr>
                <th className="tg-1wig">Model</th>
                <th className="tg-1wig">MAE</th>
                <th className="tg-1wig">RMSE</th>
              </tr>
              <tr>
                <td className="tg-1wig">Baseline (Average)</td>
                <td className="tg-0lax">8.913</td>
                <td className="tg-0lax">12.696</td>
              </tr>
              <tr>
                <td className="tg-0lax"><span style={{fontWeight:"bold"}}>Basic CNN</span></td>
                <td className="tg-0lax">6.241</td>
                <td className="tg-0lax">8.912</td>
              </tr>
              <tr>
                <td className="tg-1wig">Best Neural Network</td>
                <td className="tg-0lax">5.454</td>
                <td className="tg-0lax">8.379</td>
              </tr>
              <tr>
                <td className="tg-1wig">Best Ensemble of Networks</td>
                <td className="tg-0lax"><span style={{fontWeight:400, fontStyle:"normal"}}>4.51</span></td>
                <td className="tg-0lax"><span style={{fontWeight:400, fontStyle:"normal"}}>7.357</span></td>
              </tr>
            </table>
          <p>To summarize, we were able to drastically improve upon the baseline of predicting the average.</p>
          <h1>Prediction of protein function</h1>
          <p>In addition, we also created a model called DeeProtein2 to predict the function of a protein based on the protein sequence. The idea to use a neural network to predict protein functions is based on the algorithm DeeProtein which way developed by Team Heidelberg 2017 (TH2017). Our approach was to train a neural network on SwissProt sequences and their functions represented by Gene Ontology (GO) terms. For every GO term in our final dataset, we picked out 100 sequences from it. We ensured that every sequence in the final dataset represents only a single GO term. This selection process should limit the large spread of GO term occurrence. Excluding outliers in sequence length, we ended up with 2881 GO terms in our final dataset with an average of 45 terms per sequence.</p>
          <p>GO terms are structured hierarchically. Thus, terms situated below the corresponding term (children) are heavily interdependent. This may compromise the performance of the model and introduce biases. To avoid this, we created a subset of our dataset with 1559 GO terms with an average of 4 terms per sequence, where only the children of terms are included.</p>
          <p>We trained on 70 representatives per GO term and evaluated the performance of the model on 30 representatives per term. We tested different neural network architectures including an implementation of a residual network which gave worse results. Our best model is a convolutional neural network with residual jumps and fully connected layers at the bottom. These layers allow direct connections from the input to the final layers which boosts initial training speed as less feature abstraction is necessary. Our best model reaches a very promising average AUC of 0.98 for both datasets. The smaller dataset - only including children terms - reaches an f1-score of 0.75 whereas the complete dataset reaches an f1-score of 0.86.</p>
          <p>These great results indicate that the network has learned new characteristics of the protein. Our main model might greatly benefit from a deeper understanding of proteins. In the future, we would like to use transfer learning to incorporate the learned properties of DeeProtein2 to our main thermostability predicting algorithm, because this approach would help the network to find helpful properties which are not detectable with only knowing the primary sequence. </p>

  	  	  </div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Model;