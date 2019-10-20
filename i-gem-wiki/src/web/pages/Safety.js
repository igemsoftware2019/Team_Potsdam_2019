import React, { useCallback } from 'react'
import { useSpring } from 'react-spring'
import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import Sponsors from "components/Sponsors";

function Safety() {
  const [{ scroll, xy }, set] = useSpring(() => ({ scroll: 0, xy: [0, 0] }))
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(e => set({ scroll: (e.target.scrollTop) }), [set])
  return (
  <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <CustomScrollbar>
        <BackgroundImage scroll={scroll} xy={xy} title="Safety" src="https://2019.igem.org/wiki/images/3/3a/T--Potsdam--group_picture.jpg"/>
        <div className="main-content">
        	<div className="page-text blue">
				<h1>Safety first – everything else second!</h1>

				<p> In the iGEM competition, biosafety is a very important part. This is not only general safety during the work 
				in the laboratory, it is also important to think about a safe project design. </p>

				<h3> Safety in the <i> in vitro </i> project design </h3>

				<p>This year we worked with random mutagenesis to produce various changes in the amino-acid-sequence without 
				knowing their effect. To avoid risks that may accrue from these proteins, we worked in a S1-laboratory. 
				After screening the colonies from <i>E. coli </i> BL21(DE3) for lipase activity, all colonies that didn’t show 
				a higher activity were killed during autoclaving. </p>

				<p>We tried to avoid toxic chemicals, a few ones couldn’t be eliminated e. g. para-Nitrophenol and its esters that
				 were used regularly during the screening procedure. Working with this needed extra care and responsibility. 
				Chemicals such as Ethidium Bromide were avoided and replaced by non-toxic DNA dyes. </p>

				<h3> Safety and security in the <i> in-silico </i> project </h3>

				<p>It seems like a challenging task to check sequences before actually sequencing them but during our research 
				we learned that there are also methods in the in silico design to ensure biosafety. Therefore, we contacted
				 doulix, a company which synthesizes DNA for their costumers and needs some way to ensure safety of the requested 
				sequences. They recommended Battelle, which developed ThreatSEQ - a DNA Screening Web Service which we contacted to use their services. 
				We were allowed to send them sequences and check those for safety. We tried to work out a way to automatically send sequences to their server to check for safety.
				Sadly this did not work out as IGEM requires to open source all procedures which did not conform with the security standards of ThreatSEQ. </p>

				<p>Apart from the oficial and regulated way we can use our own models to avoid dangerous proteins.
				Specifically we can use our model which predicts protein functions (see the Improve Section) to find proteins with hazardous properties and not allow them to be mutated.</p>

				<h3> Safety during lab work </h3>

				<p> That's why we had to work in a S1 lab and invest a lot of time in talking about biosafety to make sure that 
				everyone knows how to deal with the different dangers and is aware of the general safety guidelines. We got two 
				safety introductions for the two labs we are working in (University of Potsdam and Max-Planck-Institute for Colloids 
				and Interfaces) and a lab tour during which the safety equipment was shown and explained. Additionally, there was an 
				extra introduction for using specific devices such as centrifuges, washing machines and autoclaves. </p>

				<p>One of the most important points was to avoid the possibility that any contaminated equipment leaves the lab and is 
				released into the environment. 
				Furthermore, the security of the persons working in the lab was obligatory. Students working in the lab had to inform 
				themselves about the risk of working with the chemicals before starting any lab work. Everyone worked concentrated and 
				cleaned up after the work was finished. Additionally, we paid intention to a clear documentation and labelling system 
				with the respective hazard-symbols directly on each tube that contains hazardous substances. Furthermore, the waste 
				treatment regulations were followed in order to avoid contamination of non-toxic stuff and reduce the amount of toxic 
				waste to a minimum. </p>

				<p>One of the most toxic component in our lab work, that is used regularly, is para-Nitrophenol. It is toxic via 
				breathing in, swallowing up and skin contact. It can lead to dizziness, sickness, headache, sepsis and might be 
				cancerous. Cleaning water after contact with p-Nitrophenol is difficult. Because of that we need to take extra care 
				by handling pNP e.g. wearing gloves to avoid skin contact and working with the fume hood to avoid breathing in bigger 
				amounts. An extra bottle with toxic waste for everything that was in touch with pNP was prepared. </p>

				<b>For us iGEM means having fun in the lab, but never forget about safety! </b>
	  		</div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Safety;