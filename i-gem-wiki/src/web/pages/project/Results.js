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
            
            <SubtitleImage subtitle="Image 1: Evaluation of our best Network for predicting thermophilic and mesophilic protein classes with a ROC curve and an AUC of 0.89" src="https://2019.igem.org/wiki/images/1/1b/T--Potsdam--insilico_result_1.png"/>
            <p> These results represent one of the best in literature, where the best performing models usually only reach around .8 AUC or 90% accuracy for thermostability class prediction. (Comparison is difficult because different datasets were used and sometimes accuracy is reported instead of AUC, which is a less meaningful metric in the case of thermostability class prediction if the dataset is imbalanced, which is almost always the case). [1][2][3] </p>
            
            <h3> 1.2 Organism thermostability temperature prediction </h3>
            <p> This section is about the results concerning the prediction of the Averaged Organism Growth Temperature Range prediction, where we predict the AOGTR for the organism the specific amino acid sequence can be found in, based on the BacDive+ dataset. This dataset consists of around 7 Mio protein sequences each with the according AOGTR value. From that set we used 20% (~ 1.4 Mio) solely for validation. So we guarantee that the model has not seen these proteins before. </p>
            <p> For the evaluation we benchmarked ourselves against our self set baseline which is a model always guessing the average temperature. This baseline model has a Mean Absolute Error (MAE) of 8.91, which means that the network is on average about 9 degrees celsius in its prediction for the averaged organism growth temperature range. </p>
            <p> With our first deep Convolutional Neural Networks based on our in depth literature we already achieved a significant improvement from down to 6.24 MAE. </p>
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
            <SubtitleImage subtitle="Image 2: On the left side are certain features and each dot in the graph is a corresponding value for one protein. A red color represents that this value was very important for a correct prediction of melting temperature and a blue dot that the value did not make a difference for prediction." src="https://2019.igem.org/wiki/images/f/f1/T--Potsdam--insilico_result_2.png"/>
            <p> What we can see for example is that cart_ddG is the most important feature (ddG calculation from CART library), and that it has a strong negative correlation with ddG (color of dots is relative value of for example ddG, whereas SHAP value is the impact on the label: here dTm). The layer_… features represent the AA sequence representations from the deep CNN. </p>
            <h2> 3 Generation of heat resistant mutants </h2>
            <p> The generation of sequences is based of the models we created using an evolutionary approach. Additionally we suggest existing more heat resistant proteins and use tBlastn to only add naturally occurring mutations. </p>
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
            
            <p> Additionally we collaborated with the Teams Victora-Wellington, AHUT_China, Aboa and TU_Dresden. For these teams we equally run our protein generation to find more heat resistant proteins. In return they were willing to evaluate the proteins in the Lab. </p>
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