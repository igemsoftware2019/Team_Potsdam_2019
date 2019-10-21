import React, { useCallback } from 'react'
import { useSpring } from 'react-spring'
import Collapsible from 'react-collapsible';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import Sponsors from "components/Sponsors";

function Demonstrate() {
  const [{ scroll, xy }, set] = useSpring(() => ({ scroll: 0, xy: [0, 0] }))
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(e => set({ scroll: (e.target.scrollTop) }), [set])
  return (
  <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <CustomScrollbar>
        <BackgroundImage scroll={scroll} xy={xy} title="Demonstrate" src="https://2019.igem.org/wiki/images/5/51/T--Potsdam--chalkboard.png"/>
        <div className="main-content">
          <div className="page-text blue">
            <h1>Demonstrate</h1>
            <p>In the following section we will show case the parts of our work which can be easily demonstrated. These are the prediction of heatresistance, prediction of protein function and the mutation/suggestion of more heat resistant proteins which we will cover with concrete examples. For an in depth look of the usage have a look at the code and documentation in our github repository.</p>
            <h2>Prediction of heatresistance</h2>
            <p>To predict the temperature resistant of a protein we only need the amino acid sequence which can extracted from the DNA. Here we use the protein <a href="https://www.ncbi.nlm.nih.gov/protein/AGO17775.1">lipase [Bacillus amyloliquefaciens]</a> with the following sequence:</p>
            <Collapsible trigger="Lipase [Bacillus amyloliquefaciens]">
              <SyntaxHighlighter language="thrift" style={docco}>
              {`MKHIKSKILVILTVCMLSVISVFAFQPTESKASSGHNPVVMVHGIGGASFNFAGIKTYLASQGWSRKEMYAIDFLDKTGNNRHNAPRLSNYVKKVLSETGAKKVDIVAHSMGGANTLYYIKNLDGGDKIANVVTLGGANGLVTNRALPGTDPNQKILYTSIYSSADLIVLNPLSRLIGGKNVQIHGVGHIGLLMNSQVNGLIKEGLNGGGQNTN**`}
              </SyntaxHighlighter>
            </Collapsible>
            <p> Its optimum temperature was previously determined to be close to 35°C </p>
            <p> For our model we automatically preprocess the protein sequence in a so called one-hot encoding which is afterwards run through the neural network. This process typically takes less than a second on most Graphical Processing Units (GPUs). We simple run the following function:</p>
            <SyntaxHighlighter language="python" style={docco}>
              {`from ensemble import predict_temperature
predict_temperature("MKHIKSKILVILTVCMLSVISVFAFQPTESKASSGHNPVVMVHGIGGASFNFAGIKTYLASQGWSRKEMYAIDFLDKTGNNRHNAPRLSNYVKKVLSETGAKKVDIVAHSMGGANTLYYIKNLDGGDKIANVVTLGGANGLVTNRALPGTDPNQKILYTSIYSSADLIVLNPLSRLIGGKNVQIHGVGHIGLLMNSQVNGLIKEGLNGGGQNTN**")`}
            </SyntaxHighlighter>
            <p> As a result we get a prediction of 33.475204°C which is only off by 1.6°C. </p>
            <p> Overall we demonstrate that our approach can be used to get a close estimate for most proteins (see the Results section). This can be used to assist and speed up labwork, but keep in mind that there are edge cases and uncertainties in the prediction.</p>

            <h2>Prediction of protein function</h2>
            <p>Similarly we used the <a href="https://www.uniprot.org/uniprot/B7NR61">Pantothenate kinase</a> for which we no the protein function givne with go terms to test the results of our model.</p>
            <Collapsible trigger="Pantothenate kinase">
              <SyntaxHighlighter language="thrift" style={docco}>
              {`MSIKEQTLMTPYLQFDRNQWAALRDSVPMTLSEDEIARLKGINEDLSLEEVAEIYLPLSRLLNFYISSNLRRQAVLEQFLGTNGQRIPYIISIAGSVAVGKSTTARVLQALLSRWPEHRRVELITTDGFLHPNQVLKERGLMKKKGFPESYDMHRLVKFVSDLKSGVPNVTAPVYSHLIYDVIPDGDKTVVQPDILILEGLNVLQSGMDYPHDPHHVFVSDFVDFSIYVDAPEDLLQTWYINRFLKFREGAFTDPDSYFHNYAKLTKEEAIKTAMTLWKEINWLNLKQNILPTRERASLILTKSANHAVEEVRLRK`}
              </SyntaxHighlighter>
            </Collapsible>
            <Collapsible trigger="Pantothenate kinase: Protein Functions given in GoTerms">
              <SyntaxHighlighter language="thrift" style={docco}>
              {`['GO:0004594','GO:0005524','GO:0015937','GO:0016301',
              'GO:0004594','GO:0016310','GO:0005524','GO:0005737',
              'GO:0015937','GO:0000166','GO:0016301','GO:0016740',
              'GO:0005737','GO:0015937','GO:0005524','GO:0005737',
              'GO:0015937','GO:0004594']`}
              </SyntaxHighlighter>
            </Collapsible>
            <p>After we run our model similar to before we get the following result:</p>
            <Collapsible trigger="Predicted GoTerms">
              <SyntaxHighlighter language="thrift" style={docco}>
              {`['GO:0004594', 'GO:0015937', 'GO:0015936', 'GO:0034033',
       'GO:0034030', 'GO:0033866', 'GO:0033865', 'GO:0034032',
       'GO:0033875', 'GO:0016773', 'GO:0009152', 'GO:0009108',
       'GO:0006164', 'GO:0072522', 'GO:0016301', 'GO:0006732',
       'GO:0009260', 'GO:0046390', 'GO:0009150', 'GO:0006163',
       'GO:0072521', 'GO:0009259', 'GO:0009165', 'GO:1901293',
       'GO:0051188', 'GO:0019693', 'GO:0016772', 'GO:0051186',
       'GO:0009117', 'GO:0006753', 'GO:1901137', 'GO:0034654',
       'GO:0055086', 'GO:0090407', 'GO:0019637', 'GO:1901135',
       'GO:0006796', 'GO:0006793', 'GO:0019438', 'GO:0018130',
       'GO:1901362', 'GO:0005524', 'GO:0032559', 'GO:0030554',
       'GO:0008144', 'GO:0035639', 'GO:0032555', 'GO:0017076',
       'GO:0032553', 'GO:0097367', 'GO:0016740', 'GO:0006139',
       'GO:0000166', 'GO:1901265', 'GO:0043168', 'GO:0044271',
       'GO:0036094', 'GO:0044281', 'GO:0046483', 'GO:0006725',
       'GO:1901566', 'GO:1901360', 'GO:0005737', 'GO:0044249',
       'GO:1901576', 'GO:0034641', 'GO:0009058', 'GO:1901564',
       'GO:0043167', 'GO:1901363', 'GO:0097159', 'GO:0006807',
       'GO:0044238', 'GO:0003824', 'GO:0071704', 'GO:0044424',
       'GO:0044237', 'GO:0005488', 'GO:0008152', 'GO:0044464',
       'GO:0009987', 'GO:0005575', 'GO:0008150', 'GO:0003674']`}
              </SyntaxHighlighter>
            </Collapsible>
            <p>In the result we correctly predict all protein functions except one, but the model also predicts a lot more functions which the protein does not have. This happens sometimes with neuralnetwork when the loss function is not penalizing the prediction of too many terms enough which is another point to further improve the model.</p>
            <p> In the lab the predictions are probably to inaccurate as there are too many protein functions predicted which would need to be narrowed down.</p>
            <p> but all in all this model can be used to leran more about the protein which is useful for transferlearning on other neural networks and can be used to keep the functionality stable when introducing mutations insilico.</p>
            <h2>Generation of sequences</h2>
            <p> Now we use the models to find more heat resistant proteins on NCBI and suggest serveral mutations. Here we use the same protein as in the first section.</p>
            <Collapsible trigger="Lipase [Bacillus amyloliquefaciens]">
              <SyntaxHighlighter language="thrift" style={docco}>
              {`MKHIKSKILVILTVCMLSVISVFAFQPTESKASSGHNPVVMVHGIGGASFNFAGIKTYLASQGWSRKEMYAIDFLDKTGNNRHNAPRLSNYVKKVLSETGAKKVDIVAHSMGGANTLYYIKNLDGGDKIANVVTLGGANGLVTNRALPGTDPNQKILYTSIYSSADLIVLNPLSRLIGGKNVQIHGVGHIGLLMNSQVNGLIKEGLNGGGQNTN**`}
              </SyntaxHighlighter>
            </Collapsible>
            <p> To run our genetic algorithm you can use our command line tool like this: </p>
            <SyntaxHighlighter language="shell" style={docco}>
              {`$python mutate.py --resultName lipA --activeCenters "[[0, 131],[246,381]]" --sequence MKHIKSKILVILTVCMLSVISVFAFQPTESKASSGHNPVVMVHGIGGASFNFAGIKTYLASQGWSRKEMYAIDFLDKTGNNRHNAPRLSNYVKKVLSETGAKKVDIVAHSMGGANTLYYIKNLDGGDKIANVVTLGGANGLVTNRALPGTDPNQKILYTSIYSSADLIVLNPLSRLIGGKNVQIHGVGHIGLLMNSQVNGLIKEGLNGGGQNTN`}
            </SyntaxHighlighter>
            <p>For more details you can use</p>
            <SyntaxHighlighter language="shell" style={docco}>
              {`$python mutate.py --help`}
            </SyntaxHighlighter>
            <p> This process will take quite some time. Even on a GPU (about 20 - 30 min) as first the blast has to run which takes a while and afterwards we do mutliple generation each having multiple protein mutants where for every modification our model need to be used to check if it improved thermostability.</p>
            <p> As a Result we get a the following file:</p>
            <Collapsible trigger="Predictions">
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
            <p>This can now be synthesized and test in the lab. This has the potential to greatly reduce time and cost to facilitate directed evolution.</p>
          </div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Demonstrate;