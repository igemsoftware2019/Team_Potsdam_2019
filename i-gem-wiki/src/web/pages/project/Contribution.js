import React, { useCallback } from 'react'
import { useSpring } from 'react-spring'
import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import Sponsors from "components/Sponsors";

function Contribution() {
  const [{ scroll, xy }, set] = useSpring(() => ({ scroll: 0, xy: [0, 0] }))
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(e => set({ scroll: (e.target.scrollTop) }), [set])
  return (
  <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <CustomScrollbar>
        <BackgroundImage scroll={scroll} xy={xy} title="Contribution" src="https://2019.igem.org/wiki/images/7/7f/T--Potsdam--contribution.jpg"/>
        <div className="main-content">
          <div className="page-text green">
            <h1>Contribution</h1>
            <p>We wanted to make at least a part of our model easily accessible for 
            everyone on our website which is why we implemented it into our web 
            application. This model predicts the stability of any protein sequence you will 
            give it based on our neural network trained with over 7 million sequences 
            gathered from BacDive. Since our BacDive dataset is based on primary protein 
            structure and the optimal growth temperatures of the respective organisms 
            where the protein was found in (2019.igem.org/Team:Potsdam/Design), please be 
            aware that the given temperature does not necessarily reflect the actual melting 
            temperature of the protein but acts as a reference for the general stability of the 
            protein. Specifically, the model predicts the optimal growth temperature of the 
            organism where the protein stems from. </p>
            <p>This prediction is made with a mean absolute error (MAE) of 4.5°C, verified 
            by extensive protein-cross validation during the training of our model where the 
            test set consisted of 20% of the total amount of protein sequences in the dataset 
            (1.4 Mio. Sequences). The baseline comparison to our results was the persistent 
            prediction of average temperature with which we managed to achieve a MAE of 
            8.91°C. This result is solely based on the primary structure (amino acid 
            sequence) of a protein alone without any additional information and can be used 
            on any protein sequence between 50 and 650 amino acids (the model was not 
            trained on bigger or smaller proteins since the prediction of such small or big 
            peptides is a lot harder). </p>
            <p>Another   model   we   trained   was   used   to   predict   the   actual   melting
            temperature change upon single point mutations. With some tweaks to the
            architecture, we managed to improve the MAE with regards to its predecessor
            (McGuinness et al., 2019) from 2.67°C to 2.50°C. This was mainly achieved by a
            transfer learning approach with XGBoost and the inclusion of the bigger dataset
            of 7 Mio. sequences. </p>
            <p>Although, we did not manage to verify our models in vitro, we clearly created
            machine learning algorithms which perform its intended function even under 
            strict verification criteria. Our two models outperform the average temperature 
            prediction and the results of the best machine learning paper on this matter, 
            respectively. </p>
  	  	  </div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Contribution;