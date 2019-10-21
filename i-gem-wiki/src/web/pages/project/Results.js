import React, { useCallback, useState} from 'react'
import { useSpring, animated as a} from 'react-spring'
import Collapsible from 'react-collapsible';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import SubtitleImage from 'components/SubtitleImage';
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
        <BackgroundImage scroll={scroll} xy={xy} title="Results" src="https://2019.igem.org/wiki/images/f/f3/T--Potsdam--results.png"/>
        <div className="main-content">
          <div>
          	<h1>Project Results</h1>
          	<p> We split the result of our project into two parts. Click here to check them out.</p>
          	<span className={"butnred noselect " + toggleClassOposite} onClick={toggle}>
    		      In-silico
    		    </span>
    		    <span className={"butnblue noselect " + toggleClass} onClick={toggle}>
    		      In-vitro
    		    </span>
          </div>
          <a.div className="page-text red" style={propsInsilico}>
            <h1> In-silico Results </h1>
            <p> In this section we analyse and discuss our results from the experiments described in the project design section. </p>
            
            <h2> 1 Organism thermostability prediction </h2>
            <h3> 1.1 Organism thermostability class prediction </h3>
            
            <p> This section is about the results concerning the prediction of the thermostability class of the organism a specific amino acid sequence is from, based on ProtDataTherm. The dataset consists of around 9 Mio labeled protein sequences from which we used 20% (~1.8 Mio) solely for validation. With this we guarantee that the model has not seen these proteins before. </p>
            <p> Overall we achieved a performance of 0.89 Area Under the Curve (AUC), which is a very good performance. For relation an AUC of 0.5 would be random guesses and an AUC of 1 would mean everything is predicted correctly. More concretely this means that the probability that a randomly chosen protein from a thermophilic organism and a randomly chosen protein from a mesophilic organism we predict the organism of the former to be more thermophilic is true 89% of cases. </p>
            <p> The corresponding Receiver Operator Characteristic (ROC)curve can be seen here, where the positive label represents the thermophilic organism and the negative the mesophilic organism. </p>
            
            <SubtitleImage subtitle="Image 1: Evaluation of our best Network for predicting thermophilic and mesophilic protein classes with a ROC curve and an AUC of 0.89" src="https://2019.igem.org/wiki/images/1/1b/T--Potsdam--insilico_result_1.png"/>
            <p> These results represent one of the best in literature, where the best performing models usually only reach around .8 AUC or 90% accuracy for thermostability class prediction. (Comparison is difficult because different datasets were used and sometimes accuracy is reported instead of AUC, which is a less meaningful metric in the case of thermostability class prediction if the dataset is imbalanced, which is almost always the case). [1][2][3] </p>
            
            <h3> 1.2 Organism thermostability temperature prediction </h3>
            <p> This section is about the results concerning the prediction of the Averaged Organism Growth Temperature Range (AOGTR) prediction, where we predict the AOGTR for the organism the specific amino acid sequence can be found in, based on the BacDive+ dataset. This dataset consists of around 7 Mio protein sequences each with the according AOGTR value. From that set we used 20% (~ 1.4 Mio) solely for validation. This is to ensure that the model has not seen these proteins before. </p>
            <p> For the evaluation of our model, we benchmarked ourselves against our self-set baseline which is a model always guessing the average temperature. This baseline model has a Mean Absolute Error (MAE) of 8.91, which means that the network is on average about 9 degrees celsius away in its prediction for the averaged organism growth temperature range.</p>
            <p> With our first deep Convolutional Neural Network (CNN) based on our in-depth literature, we already achieved a significant improvement and got down to 6.24 MAE.</p>
            <p> Upon hypertuning (optimising training parameters) and improving network structure we could achieve 5.45 MAE, which is a significant improvement. </p>
            
            <a href="https://2019.igem.org/wiki/images/f/f2/T--Potsdam--network_structure.jpg">Graph of our best model structure</a>
            <Collapsible trigger="Code: Best Model Network Structure">
              <SyntaxHighlighter language="python" style={docco}>
{
`inputs = Input(shape=(SEQUENCE_LEN,))
x_in = Embedding(CLASSES, 21, input_length=SEQUENCE_LEN)(inputs)

x = Conv1D(128, 20, padding="same")(x_in)
x = BatchNormalization()(x)
x = Activation("relu")(x)
x = Conv1D(128, 20, padding="same")(x)
x = BatchNormalization()(x)
x = Activation("relu")(x)
x_pre = Activation("relu")(x)

x = AveragePooling1D(2)(x_pre)
x = Conv1D(128, 3, padding="same")(x)
x = BatchNormalization()(x)
x = Activation("relu")(x)
x = Conv1D(128, 3, padding="same")(x)
x = BatchNormalization()(x)
x_mid_1 = Activation("relu")(x)

x = AveragePooling1D(2)(x_mid_1)
x = Conv1D(128, 3, padding="same")(x)
x = BatchNormalization()(x)
x = Activation("relu")(x)
x = Conv1D(128, 3, padding="same")(x)
x = BatchNormalization()(x)
x = Activation("relu")(x)

x = Conv1D(256, 3, padding="same")(x)
x = BatchNormalization()(x)
x_mid_2 = Activation("relu")(x)

x = AveragePooling1D(2)(x_mid_2)
x = Conv1D(256, 3, padding="same")(x)
x = BatchNormalization()(x)
x = Activation("relu")(x)
x = Conv1D(256, 3, padding="same")(x)
x = BatchNormalization()(x)
x_mid_3 = Activation("relu")(x)

x = AveragePooling1D(2)(x_mid_3)
x = Conv1D(256, 3, padding="same")(x)
x = BatchNormalization()(x)
x = Activation("relu")(x)
x = Conv1D(512, 3, padding="same")(x)
x = BatchNormalization()(x)
x_mid_4 = Activation("relu")(x)

x = AveragePooling1D(2)(x_mid_4)
x = Conv1D(512, 3, padding="same")(x)
x = BatchNormalization()(x)
x = Activation("relu")(x)
x = Conv1D(512, 3, padding="same")(x)
x = BatchNormalization()(x)
x = Activation("relu")(x)
x = Conv1D(512, 3, padding="same")(x)
x = BatchNormalization()(x)
x_mid_5 = Activation("relu")(x)

x = AveragePooling1D(2)(x_mid_5)
x = Conv1D(512, 3, padding="same")(x)
x = BatchNormalization()(x)
x = Activation("relu")(x)
x = Conv1D(1024, 3, padding="same")(x)
x = BatchNormalization()(x)
x = Activation("relu")(x)
x = Conv1D(1024, 3, padding="same")(x)
x = BatchNormalization()(x)
x = Activation("relu")(x)

x_pre = GlobalAveragePooling1D()(x_pre)
x_mid_1 = GlobalAveragePooling1D()(x_mid_1)
x_mid_2 = GlobalAveragePooling1D()(x_mid_2)
x_mid_3 = GlobalAveragePooling1D()(x_mid_3)
x_mid_4 = GlobalAveragePooling1D()(x_mid_4)
x_mid_5 = GlobalAveragePooling1D()(x_mid_5)
x = GlobalAveragePooling1D()(x)
x = concatenate([x_pre,x_mid_1,x_mid_2,x_mid_3,x_mid_4,x_mid_5, x], axis=-1)

x = Dense(1024)(x)
x = BatchNormalization()(x)
x = Activation("relu")(x)
x = Dense(1024)(x)
x = BatchNormalization()(x)
x = Activation("relu")(x)
x = Dense(1)(x)
x = Activation("linear")(x)

modelEmb21v6 = Model(inputs=inputs, outputs=x,name='v6')`}
              </SyntaxHighlighter>
            </Collapsible>

            <p>There are a few things to note about the structure of our model. First off, we used a form of residual layer which has shortcuts to layers further up. This allows the network to take the intermediate results of previous layers into consideration and allows for faster training due to less backpropagation steps from the bottom.</p>
            <p>Additionally, we have the typical input layer with one-hot encoding, but use a large stride size of 20 to take into consideration blocks of 20 amino acids. Afterwards, we continuously reduce the data while adding more filters. For these convolutional layers, we were careful to increase the filter size before reduction layers and use correct padding size to avoid unnecessary compression/loss in the data processing. Lastly, we use dense (fully connected) layers for the final prediction of temperature.</p>
            
            <p> To further improve on this model we used ensemble networks. They combine multiple trained neural networks by combining all their predictions together. They are commonly used because each network learns something different about the dataset which results in more knowledge when they are combined. With this approach, we achieved 4.51 MAE, which is almost half of the baseline prediction.</p>
            <p> You can find the results listed in the table below, together with an additional error metric called Root Mean Squared Error (RMSE), which heavily penalizes outliers. In that sense MAE is a lower bound on RMSE. </p>
            
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
            <p> As you can see from the figure below, we managed to improve the results compared to the baseline from the McGuinness et al. 2019 paper, which had an MAE of 2.67, whereas we achieved 2.52 with their dataset alone. With the addition of the representations of the sequences generated by the deep CNNs we could improve the model even further to 2.50, which is an improvement, but not a particularly significant one.  </p>
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
            <SubtitleImage subtitle="Image 2: On the left side are certain features and each dot in the graph is a corresponding value for one protein. A red color represents that this value was very important for a correct prediction of melting temperature and a blue dot that the value did not make a difference for prediction." src="https://2019.igem.org/wiki/images/f/f1/T--Potsdam--insilico_result_2.png"/>
            <p> What we can see for example is that cart_ddG is the most important feature (ddG calculation from CART library), and that it has a strong negative correlation with ddG (color of dots is relative value of for example ddG, whereas SHAP value is the impact on the label: here dTm). The layer_… features represent the AA sequence representations from the deep CNN. </p>
            <h2> 3 Generation of heat resistant mutants </h2>
            <p> The generation of sequences is based of the models we created using an evolutionary approach. Additionally, we suggest existing more more heat resistant proteins and use tBlastn to only add naturally occurring mutations. </p>
            <p> For our protein we got the following results: </p>
            
            <Collapsible trigger="Potsdam">
              <SyntaxHighlighter language="thrift" style={docco}>
              {`The temperature is the predicted temperature(in °C) of our neural network which the protein could withstand easily. The very high temperatures are probably incorrect but indicate more heat resistance. If you want other sequences or information about similar proteins feel free to ask us.


Original Sequence:

MKHIKSKILVILTVCMLSVISVFAFQPTESKASSGHNPVVMVHGIGGASFNFAGIKTYLASQGWSRKEMYAIDFLDKTGNNRHNAPRLSNYVKKVLSETGAKKVDIVAHSMGGANTLYYIKNLDGGDKIANVVTLGGANGLVTNRALPGTDPNQKILYTSIYSSADLIVLNPLSRLIGGKNVQIHGVGHIGLLMNSQVNGLIKEGLNGGGQNTN
Temperature: 33.47520446777344



Similar proteins found with tBlastn (which could be more heat resistant):

MVHGMGGASYNFASIKRYLVSQGWDQNQLFAIDFIDKTGNNLNNGPRLSRFVKDVLAKTGAKKVDIVAHSMGGANTLYYIKNLDGGDKIENVVTLGGANGLVSLRAFPGTDPNQKILYTSVYSSADLIVVNSLSRLIGARNVLIHGVGHIGLLTSSQVKGYVKEGLNGG
(https://www.ncbi.nlm.nih.gov/protein/AIL88638.1)
Temperature: 37.09291 Identity: 0.6997389033942559

MRRHSFLSILLICMLSVVSVFSCRPSTASAASHNPVVMVHGIGGANYNFIGIKSYLQSQGWTSSELYAINFIDKTGNNKINAPTLSEYIKHVLNQTGASKVDIVAHSMGGANTLYYIKNLDGADKVGHVVTLGGANRLVTNTAPQGIAPNDKISYTSIYSTSDYIVLNSLSKLGGANNVQISGVSHVGLLFSSKVNALIKDGLTVNGK
(https://www.ncbi.nlm.nih.gov/protein/AKI30041.1)
Temperature: 36.990833 Identity: 0.7014218009478673

MLQKKEEIMKFYKRRIVALVTILMLSVTSLFALQPSAKAAEHNPVVMVHGIGGASFNFAGIKSYLVSQGWSRDKLYAVDFWDKTGTNYNNGPVLSRFVQKVLDETGAKKVDEYVAHSMGGANTLYYIKNLDGGNKVANVVTLGGANRLTTGKAAKLPGTDPNQKILYTSIYSLADMIVMNYLSRLDGARNVQIVGVGHIGLLSSQVNSLEHKEGLMGGEQNTN
(https://www.ncbi.nlm.nih.gov/protein/AJU57487.1)
Temperature: 34.474663 Identity: 0.7597254004576659

MKHIKNKILVILTVCMLSVISVFAFQPTVSKASSGHNPVVMVHGIGGASFNFAGIKTYLASQGWSRKEMYAIDFLDKTGNNRHNAPRLSNYVKKVLSETGAKKVDIVAHSMGGANTLYYIKNLDGGDKIANVVTLGGANGLVTNRALPGTDPNQKILYTSIYSSADLIVLNPLSRLIGGKNVQIHGVGHIGLLMNSQVNGLIKEGLNGGGQNTN
(https://www.ncbi.nlm.nih.gov/protein/AGN92426.1)
Temperature: 33.508095 Identity: 0.9906542056074766



Best predicted mutations:

MKHIKSKILVILTVCMLSVISVFAFQPTESKASSGHNPVVMVHGIGGASFNFAGIKTYLASQGWSRKEMYAIDFLDKTGNNRHNAPRLSNYVKKVCSETGAKKVDIVAHSMGGANTLYYIKNLDGGDKIANVVTLGGANGLVTNRALPGTDPNQKILYTSIYSSADLIVLNPLSRLIGGKNVQIHGVGHIGLLMNSQVNGLIKEGLNGGGQNTN
Temperature: 36.9966 Identity: 0.9953271028037384

MKHIKSKILVILTVCMLTSVISVFAFQPTFSKASSGHNPVVMVHGIGGASFNFAGIKTYLASQGWSRKVMYAIDFLDKTGNNRHNAPRLSNYVKKVLSETGAKKVDIVAHSMGGANTLYYIKNLDGGDKIAIVVTLGGANGLVTNRALPGTDPNQKILYTSIYSSADLIVLNPLSVLIGGKNVQIHGVGHIGLLMNSQVNGLIKEGLNGGGQNTN
Temperature: 57.862198 Identity: 0.9790209790209791

`}
              </SyntaxHighlighter>
            </Collapsible>
            
            <p> Additionally we collaborated with the Teams Victora-Wellington, AHUT_China, Aboa and TU_Dresden. For these teams we equally run our protein generation to find more heat resistant proteins. In return they were willing to evaluate the proteins in the lab. </p>
            <Collapsible trigger="Victora-Wellington">
              <SyntaxHighlighter language="thrift" style={docco}>
              {`The temperature is the predicted temperature(in °C) of our neural network which the protein could withstand easily. The very high temperatures are probably incorrect but indicate more heat resistance. If you want other sequences or information about similar proteins feel free to ask us.



Original Sequence:

MMKKQNDIPQPIRGDKGATVKIPRNIERDRQNPDMLVPPETDHGTVSNMKFSFSDTHNRLEKGGYAREVTVRELPISENLASVNMRLKPGAIRELHWHKEAEWAYMIYGSARVTIVDEKGRSFIDDVGEGDLWYFPSGLPHSIQALEEGAEFLLVFDDGSFSENSTFQLTDWLAHTPKEVIAANFGVTKEEIANLPGKEKYIFENQLPGSLKDDIVEGPNGEVPYPFTYRLLEQEPIESEGGNVYIADSTNFKVSKTIASALVTVEPGAMRELHWHPNTHEWQYYISGKARMTVFASDGHARTFNYQAGDVGYVPFAMGHYVENIGDEPLVFLEIFKDDHYADVSLNQWLAMLPETFVQAHLDLGKDFTDVLSKEKHPVVKKKC
Temperature: 30.0330810546875



Similar proteins found with tBlastn (which could be more heat resistant):
MVRALLSLVALSLQLGSALAAPAASAASAADASAAASVSLATAASAVSSVATASLATNASPAASAAPNASGSVSAAARGTPSGTQISPPDATVPPASDDPNNVIFQPNAPDVNPQPIRGQLGAPTITNENIPVDVQNPDLLAPPSTDHGEFQNAKWPFSLSHNRLQTGGWAREQNVGVMPISTSMAGVNMRLEAGAVRELHWHKTSEWAYILNGSVQVTAINADGQNFIGHVNPGDLWFFPAGMPHSLQATNENPDGAEFVLVFPDGSFSEDSTFLLTDWLSHIPKEVIAKNFQTSISAFNNLPSQELYIFPSTPPPVNQQPPSDPQGTIPQPWTFALSQVKATQVQGGTIKIVDQTTFPASTQISAIEVTVEPGAMREIHWHPTQDEWTFYISGQGRVTIFAGTSTSRTFDYQAGDVGFVPASMGHFVENTGNDTLHFLELFPSGIVQDVSLRQWLALTPPELVQVHLGIDQDTLNQLTSFKTKEFVVGPSQ
(https://www.ncbi.nlm.nih.gov/protein/CAV20296.1)
Temperature: 36.85909 Identity: 0.5245153933865451

MRSGLTLLAAGLCAAIPVQDSPRQRLLDGLGIPSSYRSVSGGNPIPFTPGHRDPDDNAVDSVGEKLDPLPWRNGLGASVLGPWNEARSRQSPDLVRPPSTDHGNLGNMRWSFADSHIRIEEGGWTRQTTVRELPSSSELASVNMRLGEGVIRELHWHKEAEWAYVLEGKVRVTALDYEGGNFIDDLEKGDLWYFPSGIPHSLQGLSENGTEFLLVFDDGHFSEESTFVLTDWLAHTPKSVIAKNFNLAPEVFAHIPAKEKYIFQGTVPGSIDKEAPSGKNVKKSKHNFTHKMLAQEPLNSTNGGGQVRITDSKNFPISKTIAAAHAIIEPGAIREMHWHPNADEWSFFIRGRARVTIFASEGNARTFDYVPGDVGIVPRNMGHFVENIGDEPIEMLEVFRADEFRDISLFQWMGDTPKKQVVDTLFAEDPENAKLFWDRVKDADNNAVTKPDFVRSAGAQPEEL
(https://www.ncbi.nlm.nih.gov/protein/XP_009653848.1)
Temperature: 34.207436 Identity: 0.5566037735849056

MTKFPKSVLEERRAASLKLLEALDAYDNANKDEESIPVPKRGRKGNDILGPQNPDRMRQEPDTVCPPDTDHGKMPNMKWSFTDSHVRLEEGGWARETTVRELPTSKELAGVNMRLGPGVYRELHWHNESEWAYIIKGQCRISVLDLEGGSYIDDLEEGDLWYFPTGFPHGIQGTGKEGVEFLLIFDDGSFSEDSTFLLTDYIARTPKSILAKNFRVDEEVFNSLSEKEKYIFQGTIPGSLEDDRKKVTRSKHRFTHRMLKQEPKKFPGGEVRITDTSNFPVSKTTAAAHVIINPGCLREMHWHPNADEWSFFLRGRARITIFAASGNARTFNYQAGDVGIVPKNNAHYVENIGDEPVEMLEMFKAAKFEDFSTEQWLAQTPATTVAEHLNLVGGNREKFLKSLSKDKTAVKAPLRKTRSMSDMAKALEELL
(https://www.ncbi.nlm.nih.gov/protein/XP_029765098.1)
Temperature: 33.169704 Identity: 0.5865030674846625


Best predicted mutations:

MMKKQNDIPQPERGDKGATVKIPRNIERDRQNPDMLVPPPTDHGTVSNAKFSFSDTHVRLEPGGYAREVTVRELPISENLASVNMRLKPGAIRELHWHKEAEWAYMIYGSARVTIVDEKGRSFIDDVGEGDLWYFPSGLPHSIQALEEGAEFLLVFDDGSFSENSTFLLTDWLAHTPLEVIAANFGVTIEEIANLPGKEKYIFENPVPGSLKDDIVEGPNGEVPYPFTYRLLKQEPIESEGGNVYIVDSTNFKVSKTIASALVTVEPGAMRELHWHPNTHEWQYYISGKARITVFASDGHARTFNYQPGDVGYVPFAMGHYVENIGDETLVFLEIFKDDHYADVSLNQWLAMLPEEFVRAHLDLGKDFIDVLSKEKPPVVVKKC
Temperature: 93.7569 Identity: 0.9479166666666666

MMSKQNEDIPQPIRGDGKGAIVKIPRNIERDRQNPDMLVPPETDHGTVSNIKFSFSDTHNRLEKGGYAREVTVRELPISENLASVNMRLKPGVIRELHWHKEAEWAYIIYGSARITIVDEKGRSFIEDVGEGDLWYFPPGLPHSIQALEEGAEFLLVFDDGSFSENSTFLLTDWLAHTPKEVIAANFRVTVDVIANLPGKEVYIFENPLPGSLKDDIVEGPYGEVPYPFTYRLLEEEPIKSRGGKVYIVDSTNFKVSKTFASALVTVEPGAIRELHWHPNTHEWQYYIKGKARVTVFASTGHARTFNYVAGDVGYVPFAHGHYVENIGDEPLVFLEIFKDDHYADVSLNQWLAMLPEKFLQAHLDLAKDVMNVLRKVKPPVVKKKC
Temperature: 108.19523 Identity: 0.9012987012987013

MMKKQNDIPQPIRSDKGATVLIPRNLERDLQNPDMLVPPTTDHGTVSNMKFSFSDVHMRIEKGGYAREVTVRELPISENLCSVNMRLKPGAVRELHWHKEAEWAYMIYGSARVTIVDEKGRVFIADVGEGDIWYFPSGLPHSIQGLSNGAEFLLVFDDGSFDENSTFLLTDWLKHTPREVIAANFGVTKEEIAKLPVKEKYIFEAQLPGKLKDVIVEGKNGRVKYPFTYRLLDQEPIKSEGGEVYIVDSTNFKVSKTIASALVTVEPGAMRELHWHLPKTHEWQYYLSGKARVTVFAADGHARTFNYRAGDVGIVPFAMGHYVENIGDTTLVFLEIFKDPHYADISLNRQWLAVLPEDVVRALLELSKDFMDVLSKIKRPVVKKKC
Temperature: 116.03282 Identity: 0.8623376623376623

`}
              </SyntaxHighlighter>
            </Collapsible>
            <Collapsible trigger="AHUT_China">
              <SyntaxHighlighter language="thrift" style={docco}>
              {`The temperature is the predicted temperature(in °C) of our neural network which the protein could withstand easily. The very high temperatures are probably incorrect but indicate more heat resistance. If you want other sequences or information about similar proteins feel free to ask us.

Original Sequence:

MSHHWGYGKHNGPEHWHKDFPIAKGERQSPVDIDTHTAKYDPSLKPLSVSYDQATSLRILNNGHAFNVEFDDSQDKAVLKGGPLDGTYRLIQFHFHWGSLDGQGSEHTVDKKKYAAELHLVHWNTKYGDFGKAVQQPDGLAVLGIFLKVGSAKPGLQKVVDVLDSIKTKGKSADFTNFDPRGLLPESLDYWTYPGSLTTPPLLECVTWIVLKEPISVSSEQVLKFRKLNFNGEGEPEELMVDNWRPAQPLKNRQIKASFK
Temperature: 26.6293

Similar proteins found with tBlastn (which could be more heat resistant):

PAHWKEVFPVANGDRQSPIDIKTEETKYDPSLRPLNPNYDPASAKIILNNGHSTSVEFDDTVNKSVLTGGPLSGTYRLRQIHFHWGSNDEAGSEHAVDGMKYAAELHVVHWNSEKYSSFVEAARQSDGLAVMAVFLKIGECNPQLKKITDRLDTIRIKGKRALFTNFDPSCLLPKSLDYWTYFGSLTVPPLLESVIWIVLREPISVCSEQLAKFRSLLSTAEDEVACCLLRNYRPPQPLKGREVRRN
(https://www.ncbi.nlm.nih.gov/protein/XP_010295784.1)
Temperature: 40.06943 Identity: 61.22%

MSRFIWGYGEHNGPIHWNELFPIADGDHQSPIEIKTKEVKYDSSLRPLIIKYDPSLAKIISNSGHSFSVGFDDTEDKSVLQGGPLTGSYRLRQFHLHWGCADDHGSEHVVDGVPYAAELHVVHWNSDKYPSFVEAAHEPDGLAVLGVFLQIGKHNSQLQKVTDILDSIKEKGKQTQFTNFDPLSLLPPSWDYWTYPGSLTVPPLLESVTWIILKQPINISSQQLAKFRSLLCTAEGEAAAFLLSNHRPPQPLKGRKVRASFH
(https://www.ncbi.nlm.nih.gov/protein/XP_004386647.1)
Temperature: 40.625362 Identity: 60.55%


MPARGPQHPHMLFTAATGSAGCSGPEHWHKDFPNAKGERQSPVDIDTHTAKYDPSLKPLSVSYDQATSLRILNNGHSFNVEFDDSQDKAVLKGGSLDGTYRLIQFHFHWGSRDGQGSEHSVDKKKYTAELHLVHWNTKYGDFGKAVQQPDGLAVLGIFLKVGSAKPGLQKVVDVLDSIKTKGKSADFTNFDPRGLLPESLDYWTYPGSLTTPPLQECVTWIVLKEPISVSSEQILKFRKLNFNGEGEPEELMVDNWRPAQPLKNRQIKASFK
(https://www.ncbi.nlm.nih.gov/protein/XP_010380057.1)
Temperature: 30.693483 Identity: 94.90%

MSHHWGYGKHNGPEHWHKDFPIAKGERQSPVDIDTHTAKYDPSLKPLSVCYDQATSLRILNNGHSFNVEFDDSQDKAVLKGGPLDGTYRLIQFHFHWGSLDGQGSEHTVDKKKYAAELHLVHWNTKYGDFGKAVQQPDGLAVLGIFLKVGSAKPGLQKVVDVLDSIKTKGKCADFTNFDPRGLLPASLDYWTYPGSLTTPPLLECVTWIVLKEPISVSSEQMLKFRKLNFNGEGEPEELMVDNWRPAQPLKKRQIKASFK
(https://www.ncbi.nlm.nih.gov/protein/XP_002819286.1)
Temperature: 30.862743 Identity: 97.69%


Best predicted mutations:

MSKHWGYGKHNGPEHWHKDFPIAKGERQSPIDIDTSTIKYDPSLLPLSVSYDQGTSLRILNNGHAFNVEFDDSQDRAVLRGGPIDGTYRLIQFHFHWGSLDGQGSEHTVDGVKYAAELHLVHWNTKYPDFGKAVQHPDGVTVVGIFLKVGDEHPGLQRVVDVLYSIKTKGKSARFTNFSPRGLLPECLDYWTYPGSLTTPPLLECVIWIVLKEPIEVSPEQVLKFRKLLFNAEGEPPCLMVDNWRPAQPLKGRQVRASSR
Temperature: 94.68404 Identity: 86.15%

MSHHWGYGKHNGPEHWHKDFPIAKGENQSPVDIDTHTAKYDPSLRPLSVSYDQATSLRILNNGHAFNVEFDDSQNKAVLKGGPLTGTYRLIQFHFHWGSLDGQGSEHTVDKVKYAAMELHVVHWNTKYGDFGKAVQQPDGLAVLGIFLKVGSAKPGLQKVVDVLYSIKTKGKSASFTNFDPRILLPESLDYWTYPGSLTTPPLLECVTWIVLKEPISVSSEQVLKFRKLLFNGEGEPEELMVDNWRPAQPLKNRCIKASFR
Temperature: 58.56422 Identity: 95.02%`}
              </SyntaxHighlighter>
            </Collapsible>
            <Collapsible trigger="Aboa">
              <SyntaxHighlighter language="thrift" style={docco}>
              {`The temperature is the predicted temperature(in °C) of our neural network which the protein could withstand easily. The very high temperatures are probably incorrect but indicate more heat resistance. If you want other sequences or information about similar proteins feel free to ask us.

Original Sequence:

MKYLLPTAAAGLLLLAAQPAMAEIVLTQSPGTLSLSPGERATLSCRASQSVSSSSLDWYQQKPGQAPRLLIYGASSRATGVPDRFSGSGSGTDFTLTISRLEPEDFAVYYCLQWNYFPYTFGQGTKVEIKRTVAAPSVFIFPPSDEQLKSGTASVVCLLNNFYPREAKVQWKVDNALQSGNSQESVTEQDSKDSTYSLSSTLTLSKADYEKHKVYACEVTHQGLSSPVTKSFNRGES*SRLIKGELNMKYLLPTAAAGLLLLAAAPAMAEVQLLESGGGLVQPGGSLRLSCAASGFTFSSYAMNWVRQAPGKGLEWVSQINPSGGSTYYADSVKGRFTISRDNSKNTLYLQMNSLRAEDTAVYYCVGHEWGQGTLVTVSSASTKGPSVFPLAPSSKSTSGGTAALGCLVKDYFPEPVTVSWNSGALTSGVHTFPAVLQSSGLYSLSSVVTVPSSSLGTQTYICNVNHKPSNTKVDKKVEPKSSAATGADHHHHHH**
Temperature: 29.518478

Similar proteins found with tBlastn (which could be more heat resistant):

MGWSCIILFLVATATGVHSEIVLTQSPGTLSLSPGETAIISCRTSQYGSLAWYQQRPGQAPRLVIYSGSTRAAGIPDRFSGSRWGPDYNLTISNLESGDFGVYYCQQYEFFGQGTKVQVDIKRTVAAPSVFIFPPSDEQLKSGTASVVCLLNNFYPREAKVQWKVDNALQSGNSQESVTEQDSKDSTYSLSSTLTLSKADYEKHKVYACEVTHQGLSSPVTKSFNRGECGGGGSGGGGSGGGGSQIQLVQSGAEVAKPGASVKVSCKASGYTFTRYTMHWVRQRPGQGLEWIGYINPSRGYTNYNQKFKDRATLTTDKSTSTAYMELSSLTSEDTAVYYCARYYDDHYCLDYWGQGTTVTVSSVEGGSGGSGGSGGSGGVDDIQLTQSPSSLSASVGDRVTITCRASSSVSYMNWYQQKSGTAPKRWIYDTSKVASGVPYRFSGSGSGTSYTLTISSLQPEDAATYYCQQWSSNPLTFGGGTKVEIK
(https://www.ncbi.nlm.nih.gov/protein/ALJ79284.1)
Temperature: 40.537014 Identity: 63.56%

MGWSCIILFLVATATGVHSEIVLTQSPATLSLSPGERATLSCRASQSISDYLHWYQQKPGQAPRLLIYYASQSISGIPARFSGSGSGTDFTLTISSLEPEDFAVYYCQNGHSFPYTFGQGTKLEIKRTVAAPSVFIFPPSDEQLKSGTASVVCLLNNFYPREAKVQWKVDNALQSGNSQESVTEQDSKDSTYSLSSTLTLSKADYEKHKVYACEVTHQGLSSPVTKSFNRGECGGGGSGGGGSGGGGSQIQLVQSGAEVAKPGASVKVSCKASGYTFTRYTMHWVRQRPGQGLEWIGYINPSRGYTNYNQKFKDRATLTTDKSTSTAYMELSSLTSEDTAVYYCARYYDDHYCLDYWGQGTTVTVSSVEGGSGGSGGSGGSGGVDDIQLTQSPSSLSASVGDRVTITCRASSSVSYMNWYQQKSGTAPKRWIYDTSKVASGVPYRFSGSGSGTSYTLTISSLQPEDAATYYCQQWSSNPLTFGGGTKVEIK
(https://www.ncbi.nlm.nih.gov/protein/ALJ79286.1)
Temperature: 42.75422 Identity: 67.91%


Best predicted mutations:


MKYLLPTAAAGLLLLAAQPAMAEIVLTQSPGTLSLSPGERATLSCRASQSVSSSSLDWYQQKPGQAPRLLIYGASSRATGVPDRFSGSGSGTDFTLTISRLEPEDFAVYYCLQWNYFPYTFGQGTKVEIKRADAAPSVFIFPPSDEQVTSGTASVVCLLNNFYPREAKVKWKVDNALQSGSSQESVTEQDSKDSTYSLSSTLTLSSTDYQKHKLYACEVTHQGLSSPLTKSFNRGES*ARLCPGELNMKYLLPTAAAGLLLLAAAPAMAEVQLLESGGGLVQPGGSLRLSCAASGFTFSSYAMNWVRQAPGKGLEWVSQINPSGGSTYYADSVKGRFTISRDNSKNTLYLQMNSLRAEDTAVYYCVGHEWGQGTLVTVSSASTKAPSVFPLAPSSRSTSGGTVALGCLVWDYFPEPVAVSWNSGSLTSGVHTFPAVLQSSGLYSLSSMVTVPSSSLTTQTYICNVNHKPSNTKVDKRVEPKSCAATGADHHHHHH**
Temperature: 44.604977 Identity: 95.09%

MKYLLPTAAAGLLLLAAQPAMAEIVLTQSPGTLSLSPGERATLSCRASQSVSSSSLDWYQQKPGQAPRLLIYGASSRATGVPDRFSGSGSGTDFTLTISRLEPEDFAVYYCLQWNYFPYTFGQGTKVEIKRAVAAPSVFIFPPSDEQLKSGTVTVLCLLNNFYPREAKVKWKVDGAPQSGNSQESVTEQDSKDNTYSLSSTLTLSKASYQKHKLYACEVTHQGLSSPLTKSFNKGECSSELCKGELNMKYLLPTAAAGLLLLAAAPAMAEVQLLESGGGLVQPGGSLRLSCAASGFTFSSYAMNWVRQAPGKGLEWVSQINPSGGSTYYADSVKGRFTISRDNSKNTLYLQMNSLRAEDTAVYYCVGHEWGQGTLVTVSSASKKGPSVYPLAPRSKATSNGTAALGCLVKGYFPEPVTVSWNSGALTSGVHTFPSILQSDGLYSLSSVVTVPSNNLGTQTYTCNVNHKPSNTKVDKPVEPKTSAATGADHHHHHH**
Temperature: 48.41352 Identity: 93.66%

MKYLLPTAAAGLLLLAAQPAMAEIVLTQSPGTLSLSPGERATLSCRASQSVSSSSLDWYQQKPGQAPRLLIYGASSRATGVPDRFSGSGSGTDFTLTISRLEPEDFAVYYCLQWNYFPYTFGQGTKVEIKRAVAAPSVFIFPPSEEQVKSGTASVLCFLNGFYPREAKVQWKVDNAVQSGNSQESATEQDSKDNTYSLSSTLTLSKTDFQSHKLYACEVTHKGLSLPVTKSFNKGECSAEICKGELNMKYLLPTAAAGLLLLAAAPAMAEVQLLESGGGLVQPGGSLRLSCAASGFTFSSYAMNWVRQAPGKGLEWVSQINPSGGSTYYADSVKGRFTISRDNSKNTLYLQMNSLRAEDTAVYYCVGHEWGQGTLVTVSSASTKGPSVFPLAASSKSQSESTAALGCLVKGYFPEPVTMSWNSGSLTSGVHTFPAVLQSSGLYSLSSVVTLPSSSLGTKTYICNVAHKASNTKVDKRVEPKSCAKTGADHHHHHH**
Temperature: 52.06827 Identity: 92.43%`}
              </SyntaxHighlighter>
            </Collapsible>
            <Collapsible trigger="TU_Dresden">
              <SyntaxHighlighter language="thrift" style={docco}>
              {`The temperature is the predicted temperature(in °C) of our neural network which the protein could withstand easily. The very high temperatures are probably incorrect but indicate more heat resistance. If you want other sequences or information about similar proteins feel free to ask us.


Original Sequence:

MKELTMLSLSFFFVSALLAAAANPLLSAADSAPNPVLDIDGEKLRTGTNYYIVPVLRDHGGGLTVSATTPNGTFVCPPRVVQTRKEVDHDRPLAFFPENPKEDVVRVSTDLNINFSAFMPCRWTSSTVWRLDKYDESTGQYFVTIGGVKGNPGPETISSWFKIEEFCGSGFYKLVFCPTVCGSCKVKCGDVGIYIDQKGRRRLALSDKPFAFEFNKTVYF
Temperature: 34.812023



Similar proteins found with tBlastn (which could be more heat resistant): 

MSPTFYFALALTLALATKTYGAVLDIDGDIIFRGSYYVLPVIRGRGGGVTLQGRGGELCPYDIVQESSEVDEGIPVKFSNWRPRVAFVPESQDLNIEMDVEVTICIQSTYWRVGEFDEERKEYFVVAGRQDSPKSFFQIEKSGDDYKFVFCPPACDSGRPRCRNVGIFVDEIGVRRLALSSEPFLVMFKKANVTEISSKTM
(https://www.ncbi.nlm.nih.gov/protein/XP_013699343.1)
Temperature: 81.641846 Identity: 0.4655581947743468 

MKSTMLLAFALVLALSSQPLLGGAEASPEQVVDTLGKKLRVGTNYYIVPSLPYTKIRTTRGLGLASVGKPYCPLDVVVVNGYHGLPVTFSPVNPKKGVIRVSTDLNIKFSARTSCPRQYSTVWKLDDFDFSKRQWFVTTGGVVGNPSLETIHNWFKIEKYDGAYKLVYCPSVVKCPKHLCKNVGLFVDEKGNKRLALTDVPLKVQFQQA
(https://www.ncbi.nlm.nih.gov/protein/NP_001241106.1)
Temperature: 72.644226 Identity: 0.5501165501165501

MRRSIIILLSFSFILFVLAANSAPDSVLDVTRKNLRSGISYYIMPVARGGGIALGPTSPNKTCPLGVTQLSTHLNGLPLTFTPVNPKKSVIRLSTDVNIKFLGRTSCNESNVWKLRYDEVMKQYFVMVGGVEGNPGRETIDNWFKIEKTDDGYKLVFCPTVCNYCKVICRDVRIFSDDNGIRRLALSDVPFYVTFYRYFGYLFY
(https://www.ncbi.nlm.nih.gov/protein/XP_022020717.1)
Temperature: 69.24955 Identity: 0.5707547169811321 

MEATLFLSISFLLLSFTTNPVPCLATSAPQEVRDTAGKILRTGTNYYILPVVRGRGGGLKLASAGNKPCPLDVVQEPREVSNGLPLTFTPVNYKKGVVRVSTDVNIKFSSAATMCRQSTVWRLDDYDKKTGQRFVSSGGVEGNPGPATLSNWFKIEKFDGAYKLVFCPSVCRYCKVACRDIGMYIDKVGMRRLALSDKPLKVVFKKV
(https://www.ncbi.nlm.nih.gov/protein/XP_015883937.2)
Temperature: 50.19938 Identity: 0.6135831381733021


Best predicted mutations:

MKELTMLSLSFFPVSALLAAAANLLLSAADSAPNPVLDIDGEKLRTGTNYYIVIVLRDHGGGLTVIATTPNRTFVCPPRVVQTRKEVDHDRPLAFFPVNPKEDVVRVSTDLNINFSAFMPCRWTSSTVWRLAKYDESTGQWFVTIGGVKGNPGPETIVSWFKIEEFCGSGFYKLVYCPTVCYSCKVKCGDVGIYIDQKGRRRLALSDKPFAFEFNKTVYF
Temperature: 101.138214 Identity: 0.95

MKELTMLSPSFIFVSALLAAAINALLSAADAAPNPVLDIRGKKLRTGTYYYIVPVTLRDHGGGLTLLATTPNGTFVCPPRVVQLRKEVDHDRPLAFFPVNPKEDVVRVSTDLNINFSAKRPCRWTSSTVWRLDKYDPSTGQWFVIIGGVKGNPGPETISSWFKIEEFCGEKFYKLVFCPTVCGSSCKVKCGDVGIYIDQKGRRRLALSDKPFAFEFNKTVYF
Temperature: 110.66101 Identity: 0.9095022624434389

MKELTMVSLSFLLVSALLAVAANYLLRAAYSAPNPVLDIDGKKLRTGTQYYIVLVLRDHGSGLTVIATAPNGTFVCPPRVVQVRKEVDHDRPLAFFPEVNPKEDVVRVSTDLNIKFSAFMPCRWTASTVWRLDKFDLSTGQWFVTICGEKGNPGWETISSWFKIEEFCGNGFYKLVYCPTVCGSCKVKCGDVGISIDQFRRRRLGLSDRPFAVVFNKTVYF
Temperature: 125.37078 Identity: 0.8571428571428571`}
              </SyntaxHighlighter>
            </Collapsible>
            <p> Our predicted mutations and suggested more heat resistant proteins are currently evaluated in the Lab to test if they are also more heat resistant in reality.</p>
            
            <h2> Prediction of protein function </h2>
            <p> This section is already included in the <a href="https://2019.igem.org/Team:Potsdam/Improve">"Improve"</a> section, since the model used here was based on another iGEM teams previous work. </p>
            
            <h2> Future work </h2>
            <p> There is a lot of work going on in trying to predict secondary and tertiary structure of proteins with neural networks (e.g. AlphaFold). This is very interesting for our case as the thermo- and functional stability are very dependent on the protein structure.</p>
            <p> Another option which can be considered, is to create a similar model for proteins like the Word2Vec models. Basically, each word is converted into a vector based on the association with other words and its usage in sentences. This can be used for parts of the amino acid sequence to determine certain structures.</p>
            <p> This is similar to our idea of trying to train the models with a fixed window size of 30 amino acids. Most thermo stability improving mutations have a local effect anyways and too drastic mutations interfere with the protein functionality. Thus it might be useful to only train the models on a limited window, which lets the network focus more on the relevant context, and more easily ignore the irrelevant distant parts of the protein which only contribute to noise.
</p>
            <p> What we also wanted to try out is the use of CycleGans to generate the sequences as the generation of images using neural networks is very promising, but also relying on large amounts of high quality data. </p>
            <h3> References: </h3>
            <p><b>1.</b> Discrimination of mesophilic and thermophilic proteins using machine learning algorithms M. Michael Gromiha* and M. Xavier Suresh </p>
            <p><b>2.</b> Application of amino acid distribution along the sequence for discriminating mesophilic and thermophilic proteins Guangya Zhang, Baishan Fang (This is the Zhang et al. dataset. </p>
            <p><b>3.</b> A similarity distance of diversity measure for discriminating mesophilic and thermophilic proteins Yong-Chun Zuo • Wei Chen • Guo-Liang Fan • Qian-Zhong Li </p>

  	  	  </a.div>
  	  	  <a.div className= "page-text blue" style={propsInvitro}>
            <h1>Results </h1>
            <h2> Amplification of our Insert  </h2>
              <p>The insert amplification initially led to some problems as primers designed for the amplification have a secondary binding side leading to shorter side-products, which we realized later. In order to test the best conditions for the amplification of our insert, we performed a gradient PCR using Q5 High-Fidelity DNA polymerase (NEB) <b>(Figure 1)</b>. We found out that 58øC and 61øC as annealing temperature for 20 seconds are the best conditions to amplify our insert.</p>
<p><SubtitleImage subtitle="Image 1: Gradient PCR of our insert showed that 58øC and 61øC are the best conditions for amplification." src="https://2019.igem.org/wiki/images/f/fe/T--Potsdam--invitro_result_figure1.png"/></p>

            <h2> Cloning of Lip<sub>BA</sub> into pAS77  </h2>
              <p>For the construction of our first plasmid containing the gene encoding for the Lip<sub>BA</sub>, we used the vector pAS77. The cloning strategy chosen was a standard restriction and ligation method. Digestion of both plasmid and insert was done with restriction enzymes NcoI-HF and HindIII-HF and ligation with T4 ligase using different insert: vector molar ratios (data not shown). In order to check if the ligation worked, we performed colony-PCR of transformants using T7 and T3 primers which would bind to our backbone just outside of the insert. However, we never obtained a positive colony. To avoid possible self-ligation of the plasmid, we used antarctic phosphatase (NEB).  Still, we did not get any positive results. To check if our empty vector was not damaged or mutated, we sent it for sequencing <b>(Figure 2)</b>. We then found out that the Multiple Cloning Site (MCS) was absent in our plasmid, which explains why the ligations were not working. </p>
            <p> <SubtitleImage subtitle="Image 2: The sequencing result from pAS77 showed that the MCS is missing.  " src="https://2019.igem.org/wiki/images/8/8d/T--Potsdam--invitro_result_figure2.png"/></p>
  <h2>Cloning of Lip<sub>BA</sub> into pSLICE </h2>
            <p>After finding out that our previous vector was unusable, we tried to clone our insert into the pSLICE vector. We used the same standard cloning method, digesting both insert and plasmid with restriction enzymes NcoI-HF and HindIII-HF. To avoid possible self-ligation of the plasmid, we used also antarctic phosphatase. Different insert:vector molar ratios were used for ligation (8:1, 7:1, 6:1, 4:1). Transformants were checked by colony PCR but we never got a positive colony showing the right insert product. After sequencing several negative clones we found very frequent, weird inserts near our restriction sites sometimes showing some overlap to our insert or just random bases. It seemed like the bacterial cells repaired the restriction through the addition of extra bases leading to &quot; empty vector&quot; clones with circular plasmid and antibiotic resistance. This was especially visible when we tried to clone with pJet, a vector designed to kill the bacteria if the vector relegates without an insert, where we would still get empty vector colonies.   </p>
            <p>We then wondered if the constitutive promoter could affect the survival rate of our transformants. To check this possibility, we digested our insert with BglII, HindIII-HF and NcoI-HF restriction enzymes. DNA fragments were ligated with the digested pSLICE vector <b>(Figure 5)</b>. Three out of 30 screened colonies showed the right-sized band after the ligation. Sequencing results showed that colony 3 was the best, while colony 7 had different 35 bp than the promoter (an observation we cannot explain with our &quot; random bases inserted&quot; hypothesis from above) and colony 29 had a deletion near the C-terminus.</p>
            <p><SubtitleImage subtitle="Image 5: Colonies 3, 7 and 29 showed the right size band after ligation. " src="https://2019.igem.org/wiki/images/7/71/T--Potsdam--invitro_result_figure5.png"/></p>
 <p><b>Library construction</b>: Insert containing the Lip<sub>BA</sub> gene (pSlice with Lip<sub>BA</sub> of colony #3 from above) was amplified introducing mutations by ep-PCR. Products were digested with DpnI to remove non-mutated insert and digested with SphI and SacI restriction enzymes. Ligations were done with different insert-vector molar ratios (2:1, 3:1, 4:1, 8:1) <b>(table 1)</b>. The 8:1 ratio led to the highest transformation efficiency. We did several colony-PCR and had some positive colonies <b>(Figure 8)</b> which were sequenced (data not shown) revealing that these colonies were false positives. Interestingly, two sequencing reads mapped well onto an <i>E.Coli</i> reference genome (Jeong H, Kim HJ, Lee SJ. 2015. Complete genome sequence of <i>Escherichia coli</i> strain BL21(DE3), <b>Figure 9</b>). The second round of epPCR resulted in colonies that were screened as well<b>(Figure 10 a and b)</b>. They retained the lipase CDS but had deletions at the 3' and 5' end (biobrick prefix and suffix). This could have happened due to HindIII contamination (3' end).  </p>
 <p style={{textAlign:"center"}}> Table 1:  </p>
              
              <table className="tg">
              <tr>
                <th className="tg-1wig">plate</th>
                <th className="tg-1wig">number of colonies (100)</th>
                <th className="tg-1wig">number of colonies (pellet)</th>
              </tr>
              <tr>
                <td className="tg-0lax">   #6 vector only  </td>
                <td className="tg-0lax">58</td>
                <td className="tg-0lax">566</td>
               </tr>
               <tr>
                 <td className="tg-0lax">#3-1:3 core</td>
                 <td className="tg-0lax">24</td>
                 <td className="tg-0lax">252</td>
               </tr>
               <tr>
                 <td className="tg-0lax">#4 1:4 core</td>
                 <td className="tg-0lax">66</td>
                 <td className="tg-0lax">304</td>
               </tr>
               <tr>
                 <td className="tg-0lax">#5 1:8 core</td>
                 <td className="tg-0lax">51</td>
                 <td className="tg-0lax">770</td>
               </tr>
               <tr>
                 <td className="tg-0lax">#9 1:3 quick</td>
                 <td className="tg-0lax">78</td>
                 <td className="tg-0lax">660</td>
               </tr>
            </table>

                        <p>

                        <SubtitleImage subtitle="Image 8: Colony-PCR after ep-PCR showed some positive candidates. " src="https://2019.igem.org/wiki/images/6/66/T--Potsdam--invitro_result_figure8.png"/>
<SubtitleImage subtitle="Image 9: Sequencing results mapped to genome of <i>E.coli </i> BL21  " src="https://2019.igem.org/wiki/images/8/89/T--Potsdam--invitro_result_figure9.png"/>
              <SubtitleImage subtitle="Image 10a: Sequencing results of second round of epPCR library creation; 5' End of the construct " src="https://2019.igem.org/wiki/images/1/17/T--Potsdam--invitro_result_figure10a.png"/>
              <SubtitleImage subtitle="Image 10b: Sequencing results of second round of epPCR library creation; 3'End of construct  " src="https://2019.igem.org/wiki/images/f/f0/T--Potsdam--invitro_result_figure10b.png"/>
 <h2>Screening of lipase activity </h2></p>
              <p><b>para-Nitrophenyl-ester (pNP-ester) hydrolysis assay:</b> Liquid cultures of colony #3 were prepared, induced with IPTG and incubated over different amounts of time (data not shown) and with different IPTG concentrations <b>(Figure 11)</b> with both failing to detect significant changes in pNP-ester hydrolysis. As initial concentrations of pNP and pNP-esters seem too high for screening (not shown) we tested different concentrations with a 1:50 dilution compared to the originally proposed yielding better results. Additionally, it could be shown that para-Nitrophenylpalmitate (pNPP) has lower hydrolysis-rates than para-Nitrophenyllaurate (pNPL) under the conditions of our experiment (data not shown)</p>
<p><SubtitleImage subtitle="Image 11: Change in 405 nm absorption after 30 min incubation at 40øC to check for IPTG concentration dependence " src="https://2019.igem.org/wiki/images/1/14/T--Potsdam--invitro_result_figure11.png"/></p>
 <p><b>Detection of lipase accumulation:</b> As lipase activity could not be detected under different conditions, we wondered if our lipase was either not expressed or degraded in large quantities right after expression. To test this hypothesis, a western blot was used to detect a strep-tag on the C-terminus of the lipase added via a scar-less cloning workflow involving Type-IIS restriction enzymes.  </p>
            <p>Cloning of Lip<sub>BA</sub> into pBS1C3: In order to submit the lipase as a part into the iGEM registry we tried to clone the lipase into pBS1C3. As we suspected that constitutive expression is toxic, we used the construct of colony #3 as a template which in addition to pSB1C3 was digested with EcoRI and PstI yielding some colonies which were sequenced (not shown) but did not have the desired insert. We were not able to finish the part submission on time before the Giant Jamboree.  </p>
            <h2>Troubleshooting  </h2>
              <p><b>Ladder resolution:</b> In order to improve the resolution of our ladders, we tried different ladder dilutions. We found out that all our ladders run better and give the expected bands when they are 1:5 diluted <b>(Figure 3)</b>.</p>
              <p><SubtitleImage subtitle="Image 3: Ladder dilutions showed better running bands  " src="https://2019.igem.org/wiki/images/7/78/T--Potsdam--invitro_result_figure3.png"/></p>
<p><b>Restriction enzymes activity:</b> As we had several problems to achieve the ligation of our insert in our vector, we wanted to check if the activity of the restriction enzyme HindIII-HF was compromised. To do so, we digested the vector control pASK-IBA3C and run a gel to compare it with the undigested one <b>(Figure 4a)</b>. The undigested vector pASK-IBA3C showed the three bands expected for undigested plasmid. Digested pASK-IBA3C showed one band. We did the same using pSLICE and restriction enzymes HindIII-HF, NcoI-HF and their combination <b>(Figure 4b)</b>  </p>
             <p><SubtitleImage subtitle="Image 4: Restriction enzyme test showed that our enzymes were working properly  " src="https://2019.igem.org/wiki/images/d/dd/T--Potsdam--invitro_result_figure4.png"/></p>
<p><b>Gibson assembly: </b>Trying to get our insert cloned into our vector, we changed our cloning strategy to use Gibson assembly. The approach for Gibson assembly is the use of exonucleases to remove some nucleotides from the ends in which ligation must occur. The insert has been amplified with extra nucleotides that match the exposed ones from the vector. At the time of ligation, overlapping fragments bound to each other, ensuring the ligation of the insert (Gibson, 2011). Still, we did not get positive results, likely due to the constitutive promoter which had not been deleted at that point in time.</p>
              <p><b>Gradient ep-PCR:</b> To find the best conditions for our ep-PCR, we performed several gradient PCR?s with different concentrations of DNA <b>(Figure 7)</b>. We found that around 52 ng/&mu;l seemed to be the best concentration to perform the ep-PCR.</p>
 <p><SubtitleImage subtitle="Image 7: 52 ng/microliter of DNA seemed to be the best concentration to do the ep-PCR " src="https://2019.igem.org/wiki/images/5/52/T--Potsdam--invitro_result_figure7.png"/></p>
 <p><b>Transformations:</b> As efficiency of transformation was low, experiments for optimization were conducted. For the construct a 1:8 ratio of plasmid to insert for the ligation reaction seems to work best with 7 &mu;L of this reaction being added to the competent cells. The heat shock at 42øC was performed for 60 sec. and incubation in SOC medium at 2 h.</p>
              <h2>Outlook</h2>
              <p>The next steps in our project would revolve around further optimization of cloning and screening experiments as well a change in the lipase used or the host-organism. Additionally, different inducers could be tested or the type of protein used could be changed if no expression were to be detected (eg. by western blot).</p>
  		    </a.div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Results;