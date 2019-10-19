import React, { useCallback, useState} from 'react'
import { useSpring, animated as a} from 'react-spring'
import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import Sponsors from "components/Sponsors";
import './results.css';

function Results() {
  const [{ scroll, xy }, set] = useSpring(() => ({ scroll: 0, xy: [0, 0] }))
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(e => set({ scroll: (e.target.scrollTop) }), [set])
  const [propsInsilico, setInsilico] = useSpring(() => ({config: { duration: 1000 }, opacity: 1, display: 'block'}))
  const [propsInvitro, setInvitro] = useSpring(() => ({config: { duration: 1000 }, opacity: 0, display: 'none'}))
  

  const [isToggled, setToggle] = useState(false)
  function toggle(){
    setToggle(!isToggled)
    setInsilico({config: { duration: 1000 }, opacity: isToggled ? 1 : 0, display: isToggled ? 'block' : 'none'})
  	setInvitro({config: { duration: 1000 }, opacity: isToggled ? 0 : 1, display: isToggled ? 'none' : 'block'})
  }
  let toggleClass = isToggled ? 'toggled': ''
  let toggleClassOposite = isToggled ? '':'toggled'

  return (
  <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <CustomScrollbar>
        <BackgroundImage scroll={scroll} xy={xy} title="Results" src="https://2019.igem.org/wiki/images/3/3a/T--Potsdam--group_picture.jpg"/>
        <div className="main-content">
          <div>
          	<h1>Project Results</h1>
          	<p> We split the result of our project into two parts. Click here to check them out.</p>
          	<span className={"butnblue noselect " + toggleClassOposite} onClick={toggle}>
    		      In-silico
    		    </span>
    		    <span className={"butngreen noselect " + toggleClass} onClick={toggle}>
    		      In-vitro
    		    </span>
          </div>
          <a.div className="page-text blue" style={propsInsilico}>
            <h1> In-silico Results </h1>
            <p> In this section we analyse and discuss our results from the experiments described in the project design section. </p>
            
            <h2> 1 Organism thermostability prediction </h2>
            <h3> 1.1 Organism thermostability class prediction </h3>
            
            <p> This section is about the results concerning the prediction of the thermostability class of the organism a specific amino acid sequence is from, based on ProtDataTherm. The dataset consists of around 9 Mio labeled protein sequences from which we used 20% (~1.8 Mio) solely for validation. So we guarantee that the model has not seen these proteins before. </p>
            <p> Overall we achieved a performance of 0.89 Area Under the Curve (AUC), which is overall a very good performance. For relation an AUC of 0.5 would be random guesses and an AUC of 1 would mean everything is predicted correctly. More concretely this means that the probability that a randomly chosen protein from a thermophilic organism and a randomly chosen protein from a mesophilic organism we predict the organism of the former to be more thermophilic is true 89% of cases. </p>
            <p> The corresponding Receiver Operator Characteristic curve can be seen here, where the positive label represents the thermophilic organism and the negative the mesophilic organism. </p>
            
            <p> TODO IMAGE Image 1: Evaluation of our best Network for predicting thermophilic and mesophilic protein classes with a ROC curve and an AUC of 0.89</p>
            <p> These results represent one of the best in literature, where the best performing models usually only reach around .8 AUC or 90% accuracy for thermostability class prediction. (Comparison is difficult because different datasets were used and sometimes accuracy is reported instead of AUC, which is a less meaningful metric in the case of thermostability class prediction if the dataset is imbalanced, which is almost always the case). [1][2][3] </p>
            
            <h3> 1.2 Organism thermostability temperature prediction </h3>
            <p> This section is about the results concerning the prediction of the Averaged Organism Growth Temperature Range prediction, where we predict the AOGTR for the organism the specific amino acid sequence can be found in, based on the BacDive+ dataset. This dataset consists of around 7 Mio protein sequences each with the according AOGTR value. From that set we used 20% (~ 1.4 Mio) solely for validation. So we guarantee that the model has not seen these proteins before. </p>
            <p> For the evaluation we benchmarked ourselves against our self set baseline which is a model always guessing the average temperature. This baseline model has a Mean Absolute Error (MAE) of 8.91, which means that the network is on average about 9 degrees celsius in its prediction for the averaged organism growth temperature range. </p>
            <p> With our first deep Convolutional Neural Networks based on our in depth literature we already achieved a significant improvement from down to 6.24 MAE. </p>
            <p> Upon hypertuning (optimising training parameters) and improving network structure we could achieve 5.45 MAE, which is a significant improvement. </p>
            
            <p> TODO Link: Network structure of our best Model</p>

            <p>There are a few things to note about the structure. First off we used a form of residual layer which has shortcuts to layers further up. This allows the network to take into considerations the intermediate results of previous layers and allows for faster training due to less backpropagation steps from the bottom.</p>
            <p>Additionally we have the typical input layer with one-hot encoding, but use a large stride size of 20 to take into consideration blocks of 20 amino acids. Afterwards we use continuously reduce the data while adding more filters. For these convolutional layers we were careful to increase to filter size before reduction layers and use correct padding size to avoid unnecessary compression/loss in the data processing. Lastly we use a Dense (fully connected) layers for the final prediction of temperature.</p>
            
            <p> To improve further on the predictions of this model we used ensemble networks. They combine multiple trained neural networks by combining all their predictions together. They are commonly used as each network learns something different about the dataset which results in more knowledge when they are combined. With this approach we achieved 4.51 MAE, which is almost half of the baseline prediction. </p>
            <p> You can find the results listed in the table below, together with an additional error metric called Root Mean Squared Error, which heavily penalizes outliers. In that sense MAE is a lower bound on RMSE. </p>
            
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
            
            <h2> 2 Protein melting temperature prediction </h2>
            <p> This section is about the results regarding predicting the change in melting temperature upon single point mutations, using XGBoost (gradient tree boosting) and the Merck&Co+ dataset.  </p>
            <p> As you can see from the figure below, we managed to improve the results compared to the baseline from the McGuinness et al. 2019 paper, which had 2.67 MAE, whereas we achieved 2.52 with their dataset alone. With the addition of the representations of the sequences generated by the deep CNNs we could improve the model even further to 2.50, which is an improvement, but not a particularly significant one.  </p>
            <p> However the machine learning approaches of the paper were trained solely on this very small dataset of around 2000 proteins and had problems to generalize to new proteins. Our neural network on the other hand has knowledge based on a lot larger dataset and with that it has larger potential to generalize for unknown proteins. </p>
            
            <table className="tg">
              <tr>
                <th className="tg-1wig">Model</th>
                <th className="tg-1wig">MAE</th>
              </tr>
              <tr>
                <td className="tg-0lax">McGuiness</td>
                <td className="tg-0lax">2.67</td>
              </tr>
              <tr>
                <td className="tg-0lax">WithoutCNN</td>
                <td className="tg-0lax">2.52</td>
              </tr>
              <tr>
                <td className="tg-0lax">WithCNN</td>
                <td className="tg-0lax">2.5</td>
              </tr>
            </table>
            <p> We could also confirm previous knowledge about the importance of certain features for dTm prediction, like fraction-buried or ddG, by analysing the feature importance of our XGBoost models using the SHAP library: </p>
            
            <p> TODO Image Image 2: On the left side are certain features and each dot in the graph is a corresponding value for one protein. A red color represents that this value was very important for a correct prediction of melting temperature and a blue dot that the value did not make a difference for prediction.</p>
            <p> What we can see for example is that cart_ddG is the most important feature (ddG calculation from CART library), and that it has a strong negative correlation with ddG (color of dots is relative value of for example ddG, whereas SHAP value is the impact on the label: here dTm). The layer_… features represent the AA sequence representations from the deep CNN. </p>
            <h2> 3 Generation of heat resistant mutants </h2>
            <p> The generation of sequences is based of the models we created using an evolutionary approach. Additionally we suggest existing more heat resistant proteins and use tBlastn to only add naturally occurring mutations. </p>
            <p> For our protein we got the following results: </p>
            
            <p> TODO IMAGE CODE </p>
            
            <p> Additionally we collaborated with x,y,z for which we equally run our protein generation to find more heat resistant proteins. In return they were willing to evaluate the proteins in the Lab. </p>
            <p> Our proteins and suggested more heat resistant proteins are currently evaluated in the Lab to test if they are also more heat resistant in reality. </p>
            
            <h2> Prediction of protein function </h2>
            <p> This section is already included in the “Improve” section, since the model used here was based on another iGEM teams previous work. </p>
            
            <h2> Future work </h2>
            <p> There is a lot of work going on in trying to predict secondary and tertiary structure of proteins with neural networks (e.g. AlphaFold). This would be very interesting for our case as the thermo- and functional stability are very dependant on the protein structure. </p>
            <p> Another option which can be considered is to create a similar model for proteins like the Word2Vec models. Basically each word is converted into a vector based on the association with other words and its usage in sentences. This can be used for parts of the amino acid sequence to determine certain structures. </p>
            <p> This is similar to our Idea of trying to train the models with a fixed window size of 30 amino acids. Most thermostability improving mutations have a local effect anyways and too drastic mutations interfere with the protein functionality. Thus it might be useful to only train the models on a limited window, which lets the network focus more on the relevant context, and more easily ignore the irrelevant distant parts of the protein which only contribute to noise. </p>
            <p> What we also wanted to try out is the use of CycleGans to generate the sequences as the generation of images using neural networks is very promising, but also relying on large amounts of high quality data. </p>
            <h3> References: </h3>
            <p><b>1.</b> Discrimination of mesophilic and thermophilic proteins using machine learning algorithms M. Michael Gromiha* and M. Xavier Suresh </p>
            <p><b>2.</b> Application of amino acid distribution along the sequence for discriminating mesophilic and thermophilic proteins Guangya Zhang, Baishan Fang (This is the Zhang et al. dataset. </p>
            <p><b>3.</b> A similarity distance of diversity measure for discriminating mesophilic and thermophilic proteins Yong-Chun Zuo • Wei Chen • Guo-Liang Fan • Qian-Zhong Li </p>

  	  	  </a.div>
  	  	  <a.div className= "page-text green" style={propsInvitro}>
  		    </a.div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Results;