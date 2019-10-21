import React, { useCallback } from 'react'
import { useSpring } from 'react-spring'
import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import SubtitleImage from 'components/SubtitleImage';
import Sponsors from "components/Sponsors";

function Collaborations() {
  const [{ scroll, xy }, set] = useSpring(() => ({ scroll: 0, xy: [0, 0] }))
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(e => set({ scroll: (e.target.scrollTop) }), [set])
  return (
  <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <CustomScrollbar>
        <BackgroundImage scroll={scroll} xy={xy} title="Collaborations" src="https://2019.igem.org/wiki/images/4/43/T--Potsdam--collaboration.jpg"/>
        <div className="main-content">
          <div className="page-text green">
            <h1>Collaborations</h1>
            <h2>Need thermostable proteins?</h2>
            <p>We started our own call for collaborations in summer, shortly before we were finished with our first prototype of the neural network. This was mainly to find out whether our model actually works as expected in vitro and to test it on several different protein classes. Ideally, it would also give the teams the ability to work on proteins with increased thermostability which might be beneficial for their projects.</p>
            <p>Four teams followed our call and are listed below with a short summary of their project and the results of their stability measurements:</p>

            <SubtitleImage subtitle="Image 1: Logo Aboa" src="https://2019.igem.org/wiki/images/e/ee/T--Potsdam--Aboa.png"/>
            <h2>Aboa</h2>
            <p>Team Aboa from Turku, Finland is working on Fab fragments which they want to direct to the periplasmic space in <i>E.coli</i>. To ensure that the binding capabilities of the antibody fragment are not diminished, we only concentrated our efforts on the constant regions of the chains. Aboa had problems with the cloning since the construct presented itself to be toxic in <i>E.coli</i> cells. </p>

            <SubtitleImage subtitle="Image 2: Logo AHUT China" src="https://2019.igem.org/wiki/images/f/ff/T--Potsdam--AHUT.png"/>
            <h2>AHUT_China </h2>
            <p>The team from the Anhui University of Technology was among the first teams to message us regarding a possible collaboration. They are working on carbonic anhydrase and its application to capture CO2 from the atmosphere. Just last year, they managed to mutate the original anhydrase sequence for increased stability and activity and are now trying to express immobilizable anhydrase to facilitate industrial applications. Since the human carbonic anhydrase is very well characterized, we were able to make sure that certain amino acids such as the catalytic triad and its direct surrounding area are not mutated by our model to increase the likelihood of retaining protein function. </p>
            <p>Unfortunately, they were not able to produce our mutants, so we could not verify our model in vitro. </p>
            <SubtitleImage subtitle="Image 3: Logo TU Dresden" src="https://2019.igem.org/wiki/images/3/32/T--Potsdam--TUD.png"/>
            <h2>TU_Dresden</h2>
            <p>One of the projects of Dresden team is related to the global problem of sugar-excess related disorders such as obesity and diabetes with expressing the protein miraculin from Spirulina. Miraculin is a sweet-taste modifier thanks to its ability to bind to sweet receptors on the human tongue. The goal is to express miraculin and create a healthy food supplement by enhancing the sweetness of foods without adding sugars. Since the mechanism of miraculin is still poorly understood, the whole protein was subjected to mutation. The Dresdeners were not able to get sufficient results in time for the Jamboree. </p>

            <SubtitleImage subtitle="Image 4: Logo Victora-Wellington" src="https://2019.igem.org/wiki/images/f/f3/T--Potsdam--Victoria.png"/>
            <h2>Victora-Wellington</h2>
            <p>Team Victoria-Wellington is focusing their effort on generating a glycerol-based fuel cell. Their battery works with three different enzymes, of which we mutated the Oxalate-Decarboxylase so that their battery can also withstand some higher temperatures. The team came just short of finishing the construct and testing its activity. </p>

            
            <h2>Comics by Wroclaw</h2>
            <SubtitleImage subtitle="Image 5: Comic" src="https://2019.igem.org/wiki/images/d/d0/T--Potsdam--Wroclaw.png"/>
            <p>Heavy metals are nothing to be underestimated, especially when they contaminate our air. The team from Wroclaw made a call for comics for raising awareness about heavy metals in the air and we took part with some great pictures of our own. In fall, are comics were uploaded on Facebook for a small contest (https://www.facebook.com/myairrowia/).</p>

            <SubtitleImage subtitle="Image 6: Logo Washington" src="https://2019.igem.org/wiki/images/c/c9/T--Potsdam--Washington.png"/>
            <h2>Washington audio book</h2>
            <p>The team from Washington developed several small outreach booklets designed to teach basic topics of synthetic biology to any layman. We collaborated with them to translate some of their booklets in German so that we can further increase the range of their project. The books that were translated by us are: </p>
            <ul>
            <li>DNA extraction form fruits</li>
            <li>Chameleon Genetics</li>
            <li>Lego DNA/Jellybean Peptide</li>
            <li>Solving Global Problems: Pollution</li>
            <li>Solving Global Problems: Food Shortages & GMO’s</li>
            <li>Solving Global Problems: Zika Virus</li>
            </ul>
            <p>Other translations into German were done by iGEM Nantes 2019. </p>
            <SubtitleImage subtitle="Image 7: Logo Stuttgart" src="https://2019.igem.org/wiki/images/7/72/T--Potsdam--Stuttgart.png"/>
            <h2>Algae-based medium by Stuttgart</h2>
            <SubtitleImage subtitle="Image 8:  Comic" src="https://2019.igem.org/wiki/images/7/7f/T--Potsdam--collaborationFigure1.png"/>
            <p>In order to increase the sustainability and eco-balance of bacterial growth media, team Stuttgart developed an algae-based medium.  They sent us several samples of it so we could asses the growth of our working lab bacteria <i>E. coli</i> BL21(DE3).</p> 
            <p> We needed to take a first measurement of the absorbance at 600 nm wavelength of the media without any culture to use it as a blank. After inoculation, we took measurements every 45 minutes until stationary phase was reached. We used the blank measurements to remove the background absorbance. This method works well if changes in the background media over time are not expected. However, to our surprise, we found precipitation in our samples (<b>Figure 1</b>). Precipitation could be caused by the medium itself (for example, excess of Mg<sup>2+</sup>) or by dying or clumping cells. This heavily compromises the reliability of absorbance measurements taken. In this case, the best approach would have been to measure a media-only sample at the same timepoints of the experimental samples. However, the protocol we got did not account for this problem. Therefore, we were unable to perform any significant statistical analysis of our results</p>. 
  	  	  </div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Collaborations;