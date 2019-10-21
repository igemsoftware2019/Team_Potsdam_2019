import React, { useCallback, useState } from 'react'
import { useSpring,animated as a } from 'react-spring'
import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import Sponsors from "components/Sponsors";

function Description() {
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
        <BackgroundImage scroll={scroll} xy={xy} title="Our Project" src="https://2019.igem.org/wiki/images/0/0f/T--Potsdam--header.png"/>
        <div className="main-content">
          <div>
          	<span className={"butnblue noselect " + toggleClassOposite} onClick={toggle}>
    		      Description and Inspiration
    		    </span>
    		    <span className={"butnred noselect " + toggleClass} onClick={toggle}>
    		      Background
    		    </span>
          </div>
        <a.div className="page-text blue" style={propsInsilico}>
        	<h1>Project description and inspiration</h1>
			<p>Our project, TherMaL.UP, focuses on the generation of thermophilic protein sequences via the use of neural networks. As mentioned in several publications and review articles (e.g; Pezeshgi Modarres et al., 2016, and Lehmann et al., 2001), thermophilicity is a highly desirable protein property for both industrial and scientific applications, even motivating the creation of dedicated databases focused on relevant information for this characteristic (ProtDataTherm, established by Pezeshgi Modarres et al., 2018). Availability of thermostable variants of proteins tends to reduce production costs, since it reduces monitoring over the temperature of the processes, and broadens the potential uses of the protein. A particular application for thermostable proteins which will likely be subject to further research in the next years is biodiesel refining. Use of thermostable variants with respect to mesostable ones has proven to reduce the risk of contamination and to improve substrate solubility during the process (Turner et al.). Nonetheless, predicting mutations needed to convey thermophilic qualities can be challenging, as many individual factors (e.g. tertiary structure, proportion of disulphide bonds and side chain hydrogen bonds, hydrophobicity) (Robinson et al., 2015, Kumar et al., 2000, and Danson et al., 1996) need to be taken into consideration.</p>
			<p>In order to develop a new application that assists researchers who desire to carry out directed evolution, we decided to follow a machine-learning-based approach, more particularly using Deep Convolutional Neural Networks (CNNs).</p>
			<p>During a first training stage, we trained our model with a dataset containing circa 7 million amino acid sequences, in order to predict optimal growth temperature of the organism where the corresponding protein originated from. While optimal temperature range for a polypeptide may not be always available in the databases, optimal growth temperature of an organism will correlate, as a general rule, with the thermostability range of their native proteins. This association allows training the deep CNNs to establish a relationship between structure (including potential patterns affecting secondary and tertiary structures) and thermostability.</p>
			<p>Once the training phase was complete, by recycling parts from these previous networks via Transfer Learning, and the use of cross-validation and Gradient Boosting techniques, the insight gained can be used to introduce new single point mutations in a certain protein sequence of interest, with the purpose of finding new stable variants.</p>
			<p>As an extra validation method for the conclusions derived from the neural network, we developed a parallel <i>in vitro</i> workflow with the aim of generating new thermophilic variants of a particular protein (Lipase from <i>Bacillus amyloliquefaciens</i>, or LipBA) via directed evolution. More precisely, we designed building a mutant library with the use of error-prone PCR. This procedure introduces mutations to a wild-type protein sequence, generating many different strands which are to be screened for activity afterwards, following a custom two-assay sequential protocol. Additionally, we will synthetize DNA sequences generated by our neural network approach.</p>
			<h2>Why did we choose this project?</h2>
			<p>The landscape of biological sciences has changed greatly in the last decades thanks to the advancement of in silico tools. Their integration in already well-established fields has provided us with a new scope with which to keep moving forward, while reducing the complexity of tasks which previously seemed inaccessible. Whether by allowing us to process an ever-growing amount of data in sequence analysis approaches, or by supplying an environment in which to reliable simulate biological systems, these Bioinformatics tools have already proven their utility. Not only that, but they have also shown signs of a yet untapped potential to be exploited in the future times. This year, we wished to find a project which included said tools as a main component, but at the same time provided the chance to encourage close and direct cooperation from team members with diverse backgrounds. With the progress of science, the ramification and specialization on the different fields is inevitable, but we believe that it is important to stimulate collaboration between branches.</p>
			<p>Naturally, generating a potentially thermostable polypeptide sequence is not the final goal of these models. An arduous follow up consisting on purifying and characterizing the resulting protein must be carried out. Such a process entails significant time and economic investments, both of which can be reduced if the quality of the base model is improved, as the number of potential unsatisfactory results is diminished.</p>
			<p>Considering all the previous points, it was obvious to us that there was certainly an opportunity for development of a new model which would ensure both stability and functionality of the output sequence. By doing so, we would greatly cut down the work and cost of directed evolution processes.</p>
			<p>While looking into previous iGEM projects, the idea for the Undergraduate Finalist Heidelberg 2017 caught our attention. They developed a deep learning network which was meant to predict function of a protein based on the primary structure. Even if we had already defined the main goals and approaches of our strategy before we found theirs, they served as source of inspiration when generating our own model from scratch. On later stages of our project, we additionally decided to introduce some improvements in their DeeProtein network.</p>
			<p></p>
			<h2>Bibliography and sources</h2>
			<p><b>1.</b> Pezeshgi Modarres H, Mofrad MR, Sanati-Nezhad A (2016) Protein thermostability engineering, RSC Adv., 2016, 6, 115252-115270</p>
			<p><b>2.</b> Lehmann M., Wyss M. (2001) Engineering proteins for thermostability: the use of sequence alignments versus rational design and directed evolution. Current Opinion in Biotechnology, Volume 12, Issue 4, 1 August 2001, 371-375</p>
			<p><b>3.</b> Pezeshgi Modarres H, Mofrad MR, Sanati-Nezhad A (2018) ProtDataTherm: A database for thermostability analysis and engineering of proteins. PLoS ONE 13(1): e0191222.</p>
			<p><b>4.</b> Robinson P. K. (2015). Enzymes: principles and biotechnological applications. Essays in biochemistry, 59, 1–41. </p>
			<p><b>5.</b> Turner P., Mamo G., Karlsson E. N. (2007), Potential and utilization of thermophiles and thermostable enzymes in biorefining. Microbial Cell Factories, 9, 1475-2859</p>
			<p><b>6.</b> Kumar S., Tsai C., Nussinov R., (2000), Factors enhancing protein thermostability. Protein Engineering, Design and Selection, Volume 13, Issue 3, March 2000, 179–191 </p>
			<p><b>7.</b> Danson M., Hough D., Russell R., & Taylor G., Pearl L., (1996). Enzyme thermostability and thermoactivity. Protein Engineering. 9(8): 629-30.</p>
			<p><b>8.</b> Harrington L.B., Paez-Espino D., Staahl B. T., Chen J. S., Ma E., Kyrpides N. C., Doudna J. A., (2017), A thermostable Cas9 with increased lifetime in human plasma. Nature Communications 1424, Volume 8, Issue 1, 2041-1723.</p>
			<p><b>9.</b> Musil M., Stourac J., Bendl J, Brezovsky J., Prokop Z., Zendulka J., Martinek T., Bednar D., Damborsky J., (2017), FireProt: web server for automated design of thermostable proteins. Nucleic Acids Research, Volume 45, Issue W1, 3 July 2017, Pages W393–W399.</p>
			<p><b>10.</b> iGEM Heidelberg 2017, The Phage and the Furious</p>
		</a.div>
		<a.div className="page-text red" style={propsInvitro}>
			<h1>Background</h1>

			<p>In 1967, Thomas D. Brock, in his search for the upper temperature of life, described for the first-time organisms growing at temperatures higher than 92<sup>º</sup>C, the point at which water boils (Brock, 1967). Since then, several studies identified microbial growth at even higher temperatures reaching 122<sup>º</sup>C (Blöchl <i>et</i> <i>al</i>., 1997, Kashefi & Lovley, 2003, Takai <i>et</i> <i>al</i>., 2008). For biologists, understanding temperature adaption is of great interest, as it might hold the answer to how life originated (Weiss <i>et</i> <i>al</i>., 2016, Lanier & Williams, 2017). Additionally, as Brock already stressed in his work, these studies can reveal the extremes to which evolution can be pushed (Brock, 1967). Yet, outside the scientific community, there was and still is a great interest in these adaption mechanisms, in particular concerning protein functionality, since their industrial applications appear limitless and the demand for them does not cease (Dumorné <i>et</i> <i>al</i>., 2017).</p>

			<p>Proteins, the workers of life, participate in almost all biological processes. They are complex linear polymers made of a repertoire of 20 amino acids. The sequence in which these amino acids are linked to each other determines the three-dimensional structure which, at the same time, implies the function of the protein (Berg <i>et</i> <i>al</i>., 2012). Folding and maintenance of such structure occurs due to intramolecular interactions between the amino acids. These can be heavily affected by parameters such as temperature or acidity. The ability to remain in the folded state under extreme temperature conditions is referred to as thermostability (Jaenicke & Böhm, 1998, Zhou & Pang, 2018). Protein thermostability can be inferred as a direct relationship between the optimal growth temperature of the organism producing the protein and its melting point (Gromiha <i>et</i> <i>al</i>., 1999).</p>

			<p>Thermostability is a desired characteristic of proteins in many industrial fields because thermostable proteins remain functional under often very harsh industrial conditions. Additionally, a bio-based economy reduces contamination risks and can improve other characteristics, for instance, increasing substrate solubility (Dumorné <i>et</i> <i>al</i>., 2017). Applications of thermostable proteins are countless, ranging from lipases and cellulases used as detergent additives or in food processing (Dadshahi <i>et</i> <i>al</i>., 2016), glucosidases for biodiesel production (Aguirre <i>et</i> <i>al</i>., 2018) to polymerases used in research by means of the polymerase chain reaction (PCR) (Xu <i>et</i> <i>al</i>., 2017). The wide range of current fields hints at the immense potential for engineering thermostable proteins for more effective usage at higher temperatures and in even more fields.</p>

			<p>Direct evolution and machine learning are the two main approaches used to modify a specific protein property. Direct evolution-based methods try to imitate natural selection pressure by introducing random mutations within the protein sequence and selecting for those variants which show improvement for the desired trait (Chen & Arnold, 1993). While this methodology has been proven to work in various cases (Sachsenhauser & Bardwell, 2018), for many proteins the number of possible combinations is enormous, and the screening process might be laborious, expensive and take a long time. Moreover, identification of the contribution of individual short sequences within a protein to the overall function and structure of a mutated protein is almost impossible or would require additional steps which increase the cost of the procedure considerably (Yang <i>et</i> <i>al</i>., 2019). Machine learning-based methods are capable of retaining such information. This ensures that beneficial sequences are always present in the new variants. This considerably reduces the number of variants that need to be screened. In addition, the possibility to screen many more sequences thanks to computational power highly optimizes the selection process of mutated proteins (Yang <i>et</i> <i>al</i>., 2019). Nevertheless, machine learning does not render direct evolution-based methods redundant, as the success of the machine-learning based approach heavily relies on the quality and quantity of experimentally determined sequences and their corresponding features (Wu <i>et</i> <i>al</i>., 2019).</p>

			<p>For our project we focused on the physiologically very relevant enzymes: Lipases. Lipases (E.C.3.1.1.3) catalyze the hydrolysis of triglycerides, resulting in glycerol and fatty acids as products. This has a huge commercial potential, for instance, in the production of biodiesel (Zhao <i>et</i> <i>al</i>., 2015). Lipases from Bacillus spp have been shown to be suitable for industrial purposes, as they are small in size, easy to express, purify and show thermophilic characteristics. The lipase LipBA, from <i>B</i>. <i>amyloliquefaciens</i> exhibits these traits under high pH levels, being able to keep almost 50% of residual activity at 70ºC. This suggests that recombinant variants of LipBA have a profound potential value in the industry (Cai <i>et</i> <i>al</i>., 2014, Saengsanga <i>et</i> <i>al</i>., 2016).</p>

			<p>In this project, we developed a neural network based on existing databases like BacDive, NCBI and PDB to approximate the thermostability of proteins of interest by predicting the optimal growth conditions to express them. In addition, in order to test and validate our model, we have identified beneficial sequences to improve the thermostability of the lipase LipBA from <i>B</i>. <i>amyloliquefaciens</i>. We aimed also to express these new variants and show that these characteristics are indeed improved.</p>
			<h2>References</h2>
			<p><b>1.</b> Aguirre, A., Eberhardt, F., Hails, G., Cerminati, S., Castelli, M. E., Rasia, R. M., ... & Peiru, S. (2018). The production, properties, and applications of thermostable steryl glucosidases. World Journal of Microbiology and Biotechnology, 34(3), 40.</p>
			<p><b>2.</b> Berg, J. M., Tymoczko, J. L., & Stryer, L. (2012). Biochemistry/Jeremy M. Berg, John L. Tymoczko, Lubert Stryer; with Gregory J. Gatto, Jr.</p>
			<p><b>3.</b> Blöchl, E., Rachel, R., Burggraf, S., Hafenbradl, D., Jannasch, H. W., & Stetter, K. O. (1997). Pyrolobus fumarii, gen. and sp. nov., represents a novel group of archaea, extending the upper temperature limit for life to 113 C. Extremophiles, 1(1), 14-21.</p>
			<p><b>4.</b> Brock, T. D. (1967). Life at High Temperatures: Evolutionary, ecological, and biochemical significance of organisms living in hot springs is discussed. Science, 158(3804), 1012-1019.</p>
			<p><b>5.</b> Cai, X., Ma, J., Wei, D. Z., Lin, J. P., & Wei, W. (2014). Functional expression of a novel alkaline-adapted lipase of Bacillus amyloliquefaciens from stinky tofu brine and development of immobilized enzyme for biodiesel production. Antonie Van Leeuwenhoek, 106(5), 1049-1060.</p>
			<p><b>6.</b> Chen, K., & Arnold, F. H. (1993). Tuning the activity of an enzyme for unusual environments: sequential random mutagenesis of subtilisin E for catalysis in dimethylformamide. Proceedings of the National Academy of Sciences, 90(12), 5618-5622.</p>
			<p><b>7.</b> Dadshahi, Z., Homaei, A., Zeinali, F., Sajedi, R. H., & Khajeh, K. (2016). Extraction and purification of a highly thermostable alkaline caseinolytic protease from wastes Penaeus vannamei suitable for food and detergent industries. Food chemistry, 202, 110-115.</p>
			<p><b>8.</b> Dumorné, K., Córdova, D. C., Astorga-Eló, M., & Renganathan, P. (2017). Extremozymes: a potential source for industrial applications. J Microbiol Biotechnol, 27(4), 649-659.</p>
			<p><b>9.</b> Gromiha MM, Oobatake M, Sarai A (1999). Important amino acid properties for enhanced thermostability from mesophilic to thermophilic proteins. Biophysical Chemistry, 82(1):51–67.</p>
			<p><b>10.</b> Jaenicke, R., & Böhm, G. (1998). The stability of proteins in extreme environments. Current opinion in structural biology, 8(6), 738-748.</p>
			<p><b>11.</b> Kashefi, K., & Lovley, D. R. (2003). Extending the upper temperature limit for life. Science, 301(5635), 934-934.</p>
			<p><b>12.</b> Lanier, K. A., & Williams, L. D. (2017). The origin of life: models and data. Journal of molecular evolution, 84(2-3), 85-92.</p>
			<p><b>13.</b> Sachsenhauser, V., & Bardwell, J. C. (2018). Directed evolution to improve protein folding in vivo. Current opinion in structural biology, 48, 117-123.</p>
			<p><b>14.</b> Saengsanga, T., Siripornadulsil, W., & Siripornadulsil, S. (2016). Molecular and enzymatic characterization of alkaline lipase from Bacillus amyloliquefaciens E1PA isolated from lipid-rich food waste. Enzyme and microbial technology, 82, 23-33.</p>
			<p><b>15.</b> Takai, K., Nakamura, K., Toki, T., Tsunogai, U., Miyazaki, M., Miyazaki, J., ... & Horikoshi, K. (2008). Cell proliferation at 122 C and isotopically heavy CH4 production by a hyperthermophilic methanogen under high-pressure cultivation. Proceedings of the National Academy of Sciences, 105(31), 10949-10954.</p>
			<p><b>16.</b> Weiss, M. C., Sousa, F. L., Mrnjavac, N., Neukirchen, S., Roettger, M., Nelson-Sathi, S., & Martin, W. F. (2016). The physiology and habitat of the last universal common ancestor. Nature Microbiology, 1(9), 16116.</p>
			<p><b>17.</b> Wu, Z., Kan, S. J., Lewis, R. D., Wittmann, B. J., & Arnold, F. H. (2019). Machine learning-assisted directed protein evolution with combinatorial libraries. Proceedings of the National Academy of Sciences, 116(18), 8852-8858.</p>
			<p><b>18.</b> Xu, W., Jiang, W., Wang, J., Yu, L., Chen, J., Liu, X., ... & Zhu, T. F. (2017). Total chemical synthesis of a thermostable enzyme capable of polymerase chain reaction. Cell Discovery, 3, 17008.</p>
			<p><b>19.</b> Yang, K. K., Wu, Z., & Arnold, F. H. (2019). Machine-learning-guided directed evolution for protein engineering. Nature methods, 1.</p>
			<p><b>20.</b> Zhao, X., Qi, F., Yuan, C., Du, W., & Liu, D. (2015). Lipase-catalyzed process for biodiesel production: enzyme immobilization, process simulation and optimization. Renewable and Sustainable Energy Reviews, 44, 182-197.</p>
			<p><b>21.</b> Zhou, H. X., & Pang, X. (2018). Electrostatic interactions in protein structure, folding, binding, and condensation. Chemical reviews, 118(4), 1691-1741.</p>

	  	</a.div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Description;