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
        <BackgroundImage scroll={scroll} xy={xy} title="Demonstrate" src="https://2019.igem.org/wiki/images/3/3a/T--Potsdam--group_picture.jpg"/>
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
            <p>Similarly</p>
            <Collapsible trigger="">
              <SyntaxHighlighter language="thrift" style={docco}>
              {``}
              </SyntaxHighlighter>
            </Collapsible>
            <h2>Generation of sequences</h2>
            <h2>References</h2>
            <p><b>1. </b></p>
          </div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Demonstrate;