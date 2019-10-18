import React, { useCallback, useState} from 'react'
import { useSpring, animated as a} from 'react-spring'
import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import Sponsors from "components/Sponsors";

import './Design.css';

function Design() {
  const [{ scroll, xy }, set] = useSpring(() => ({ scroll: 0, xy: [0, 0] }))
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(e => set({ scroll: (e.target.scrollTop) }), [set])
  const [propsInsilico, setInsilico] = useSpring(() => ({opacity: 1, display: 'block'}))
  const [propsInvitro, setInvitro] = useSpring(() => ({opacity: 0, display: 'none'}))
  

  const [isToggled, setToggle] = useState(false)
  function toggle(){
    setToggle(!isToggled)
    setInsilico({opacity: isToggled ? 1 : 0, display: isToggled ? 'block' : 'none'})
  	setInvitro({opacity: isToggled ? 0 : 1, display: isToggled ? 'none' : 'block'})
  }
  let toggleClass = isToggled ? 'toggled': ''
  let toggleClassOposite = isToggled ? '':'toggled'

  return (
  <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <CustomScrollbar>
        <BackgroundImage scroll={scroll} xy={xy} title="Design" src="https://2019.igem.org/wiki/images/3/3a/T--Potsdam--group_picture.jpg"/>
        <div className="main-content">
          <div>
          	<h1>Project Design</h1>
          	<p> We split the design of our project into two parts. Click here to check them out.</p>
          	<span className={"butnblue noselect " + toggleClassOposite} onClick={toggle}>
		      In-silico
		    </span>
		    <span className={"butngreen noselect " + toggleClass} onClick={toggle}>
		      In-vitro
		    </span>
          </div>
          <a.div className="page-text insilico" style={propsInsilico}>
            <h1>In-silico Project Design</h1>
			<p>As with all great scientific projects, in the beginning, there is only a vision; a vision of how the results of the project will impact the lives of many people for the better: the core reason for our efforts.</p>
			<p><b>Our vision was simple, yet daring:</b></p>
			<p>Support scientists in the wet lab in the creation of more thermophilic proteins by suggesting thermostability improving mutations, which should reduce the necessity for expensive experimentation. </p>
			<p>In the beginning, none of us had any idea how to approach this problem as we come from an interdisciplinary background of biology and computer science. However, through careful planning, and diligent research, we managed to tackle this notoriously hard problem and overcome many challenges. In the end, the results speak for themselves, which is why we feel confirmed in our project design and overall approach.  </p>
			
			<h2>Problem setting</h2>
			<p>Overall, we wanted to develop an application (preferably web-based) that any researcher with internet access could use. This application should be able to give a mutated version of a protein (or a list of suggested mutations) for a polypeptide specified by the user. The specified mutant should have a higher melting temperature as the protein specified by the user, if possible. All the internal workings should be hidden away, but accessible through the code provided on GitHub. This provides an easy to use interface with a straight forward use case. </p>
			<p>TODO IMAGE Subtitle: Visualisation of change in melting temperature (dTM) between wild type (blue) and mutant (orange) proteins</p>
			<p>The first step to towards this goal was to figure out how to predict single point mutations which improve thermostability.</p>
			
			<h2>Neural Networks</h2>
			<p>Since the main machine learning architecture used during our research are Artificial Neural Networks, here is a brief intro:</p>
			<p>The archetypical neural network looks something like this:</p>
			<p>TODO IMAGE(https://de.wikipedia.org/wiki/K%C3%BCnstliches_neuronales_Netz#/media/Datei:Neural_network.svg)</p>
			<p>It has an input layer (the green one on the left), where we feed the network with data. Then it can have multiple hidden layers (the blue one) where most of the computation is going on, and finally an output layer (yellow one) were we get the results/predictions of our networks. </p>
			<p>Each dot in this graph constitutes a single artificial neuron (inspired by the neurons in our brain), which has its inputs (here from the left) does some computation (just some basic multiplication and addition based on the inputs and its current state, followed by an activation) and outputs a number (the result of the internal computation), which is passed along to the next layer. </p>
			<p>These networks can be “trained” to give some specific output based on the input which works something like this: we feed the network a data sample, the networks gives a prediction for that data point, and we tell it how good the prediction was. Based on this feedback the network adjusts the internal states of the artificial neurons, so that next time the prediction is closer to what we would judge as correct. </p>
			
			<h1>Design Iterations</h1>
			<p>In our project we went through five main iterations to continuously improve the results of our goal. First we researched the current status in literature in relation to our project. Afterwards we had to steps on different dataset to improve our modeling to predict protein temperature stability. Building on the best models we developed an approach to generate more heat resistance sequences. Lastly we worked on further ideas which can be used to improve the results. </p>
			<h2>1. Literature research</h2>
			<p>Since we did not know anything about the literature in this problem domain, we had to familiarize ourselves with it from the ground up. During this process we identified the following problems: </p>
			<b><p>1.          Lack of available data</p>
			<p>2.          Low quality of most available data</p>
			<p>3.          Insufficient validation of previous results</p>
			<p>4.          Difficult generalization of models to other datasets</p>
			<p>5.          Reliance on expensive 3D structure computations</p></b>
			<br/>
			<p>Problems 3 and 4 were managed by relying on very recent high quality research which we also used as a baseline to compare our results against. [1]</p>
			<p>From previous modeling approaches and results, we distilled that a machine learning based approaches, specifically relying on transfer learning, are likely to have the most effects on this topic. </p>
			<p>Transfer learning is known to improve the generalizations of models, in this case the performance of the model on previously unseen proteins and their mutants which is from our viewpoint one of the most important aspects. For this a large dataset of proteins is needed. </p>
			<p>Concerning the computation of 3D structure we decided to only rely on the primary amino acid structure of the protein, which is available in a lot larger dataset then the 3D structure. </p>
			
			<h3>Datasets</h3>
			<p>NCBI dataset: Our first approach was to search the National Center for Biotechnology Information (abbreviation NCBI) database for thermophilic organisms and extract their proteins which resulted in around ~100k proteins for which we knew where thermophilic which we used a validation for some models. </p>
			<p>This data was not sufficient for our use case this is why we researched and aggregated data of other existing datasets.</p>
			<p>TODO IMAGE Subtitle: Overview of datasets related to protein thermostability</p>
			<p><b>ProTherm [2]:</b></p>
			<p>1. Widely used in this problem domain</p>
			<p>2. Contains: Wildtype mutant pairs with dTm information (size ~18k)</p>
			<p>3. Problem: tried preprocessing, but failed due to complexity of task</p>
			<p><b>ProtDataTherm [3]:</b></p>
			<p>1. Large dataset suitable for deep neural networks</p>
			<p>2. Contains: Proteins and their source organism’s growth temperature class (size ~9Mio)</p>
			<p>3. Problem: only contains thermostability class, and not temperature</p>
			<p><b>BacDive [4]:</b></p>
			<p>This database contains various information on bacteria, including their growth temperature range. We used this database in combination with the NCBI database to construct the BacDive+ dataset, which contains paris of protein amino acid sequences and organism growth temperature information (of the organism the proteins sequence can be found in). The construction of BacDive+ is thus very similar to ProtDataTherm, however, we kept the real valued information about the organism growth temperature and did not convert it into thermal stability classes. The overall size of the dataset is about 7Mio sequences and 20k organisms. In the graph below you can see the distribution of the Averaged Organism Growth Temperature range among the proteins: </p>
			<p>TODO IMAGE </p>

			<p><b>Merck&Co [1]:</b></p>
			<p>The Merck&Co dataset stems from the McGuinness et al. 2019 paper and is the bases for the Merck&Co+ dataset, which we constructed by additionally supplementing the dataset with the actual amino acid sequences and sequence representations extracted from one of our deep convolutional neural networks. Overall it is a high quality dataset based on ProTherm->HoTMuSiC->Merck&Co->Merck&Co+ and contains about 2k wildtype and mutant AA sequence pairs (and their corresponding mutation) with many features and the change in melting temperature (dTm), which we tried to predict. Below you can see the distribution of the label (the dTm) in the overall dataset. </p>
			<p>TODO IMAGE </p>
			
			<h3>Machine Learning Approaches</h3>
			<p>From our literature research we knew that Support Vector Machines and Random Forests performed well on predicting dTm upon single point mutations. However, we wanted to advance this research with the following more advanced and new machine learning methods. </p>
			<p><b>Gradient Boosting:</b></p>
			<p>This approach works similar to random forests which were used in previous research. Advancing the random forest this approach differs through weak learners which are correlated and the model exploits knowledge about previously made mistakes. </p>
			<p><b>Cycle GANs [5](Generative Adversarial Networks):</b></p>
			<p>Can transform one image of domain A into another of domain B and back. Specifically this was used for images in which a horse is used to look like a zebra. We wanted to use this to transform mesophilic proteins into thermophilic ones. The Problem is changes made by the model are probably too drastic which then would also affect functionality and is a lot harder to validate. </p>
			<p><b>Deep Neural Networks:</b></p>
			<p>Neural networks have been tried by other researchers, but only very rudimentarily as they require a lot of data and for Deep Neural Networks with a lot more layser larger amounts of research. Two common types of neural networks are relevant for our use case Convolutional Neural Networks as they perform well too learn more advanced feature about sequential data and residual layers which use jump connections to improve the learning process and avoid getting stuck on local minimas. </p>
			<p><b>Simulated Evolution:</b></p>
			<p>Once we have a working architecture to predict thermostability increasing mutations, we can use simulated evolution to further increase the thermostability of the protein. The evolution process is very useful as there is a huge space of possible mutation combinations and it can be hard to find optimal combinations without it. </p>
			
			<h2>2 Organism thermostability prediction</h2>
			<h3>2.1 Organism thermostability class prediction</h3>
			<p>As a first approach we looked for available large scale datasets with relation to protein thermostability that we could use for training deep neural networks.</p>
			<p>We found ProtDataTerm suitable, so we used it as the training dataset for a deep convolutional neural network according to best practices. We also continued tuning the network in an explorative way in a triple cross-validation fashion. </p>
			<p>The input to the network was the label encoded sequence, the output either 1 for thermostable, or 0 for mesostable. We evaluated the performance using the AUC value of the ROC curve, since ProtDataTherm is an unbalanced dataset (mesostable proteins overrepresented). </p>
			<p>After the evaluation, however, we started thinking about using the network for transfer learning for protein melting temperature prediction, and decided that since thermostability class prediction is fundamentally a classification problem, we should look for a dataset with which we could perform a regression, which would be more close to the regression problem of predicting protein melting temperature, thus we created BacDive+. </p>
			
			<h3>2.2 Organism growth temperature prediction</h3>
			<p>Our next step is to more accurately determine the temperature stability a proteins for this we use the averaged  organism growth temperature range (AOGTR) of about 7Mio proteins found in the BacDive+ dataset. </p>
			<p>To increase the generalization capability of our models, we trained our deep residual Convolutional Neural Networks on a larger set of data to prevent the models from overfitting on the relatively small datasets that contain information about mutations and the corresponding melting temperature change. The expectation is that the model learns key patterns that make a sequence thermophilic which is already researched to be the case for image classification using similar networks. </p>
			<p>The connections to predicting thermostability in the form of the melting temperature is the following: Proteins of an organism with high growth temperature must also function at higher temperatures, so most of the proteins probably have a higher melting temperature as well. </p>
			<p>The implications here are more of a statistical nature and not without its exceptions e.g. there are a hand full of proteins in E.coli which survive cooking, but it’s exactly this statistical correlation which the deep residual Convolutional Neural Networks and later exploit to create more thermostable mutants. </p>
			<p>The Neural Networks were fed with the encoded amino acid sequence where one to twenty represent the canonical amino acids and zero the end of the sequence. We used proteins with length of 50 to 650 to avoid untypical proteins and expected as the output the AOGTR. </p>
			<p>The network was trained with a classical triple cross-validation method using 80%/20% train/test split and was optimized using manual hyper tuning of the parameters. Additionally we used ensemble networks to improve the performance. Ensembles work by averaging over the results of multiple different networks as each network learned slightly different things about the data. </p>
			
			<h2>3 Protein melting temperature prediction</h2>
			<h3>Merck&Co+ Validation & Baselines</h3>
			<p>For our baseline, we compared ourselves with the Mc Guinness et al. paper.</p>
			<p>We used the Merck&Co+ dataset with representations extracted from the pre learned deep Convolutional Neural Networks (feed the network with a sequence and extract the output at a chosen layer). For the architecture, we chose the state of the art gradient (tree) boosting library called XGBoost which is regularly used in machine learning competitions. </p>
			<p>We trained our models in a 7-trial 5-fold cross-validation, or alternatively, in a novel Leave-one-protein-out cross-validation (one protein and its mutants in the holdout set on each split) fashion, with Bayesian Optimization as hyper parameter tuning. </p>
			<p>This allowed for a detailed comparison with current research and gave us important feedback on moving forward.</p>
			
			<h2>4 Generation of heat resistant mutants</h2>
			<p>Finally, we created an application that given an input AA sequence outputs mutants that it predicted to be more thermostable as well as very similar proteins found with tBlastn  which are more heat resistant. For the latter we run our models on the most similar sequences of the blast results and return the ones with most similarity and heat resistance. </p>
			<p>The mutation are done differently. We decided to use the tBlastn result to find mutations which naturally occur in proteins and only use these to be allowed for mutations which means their exact position and amino acid. To further avoid functional changes we don’t allow mutations in active centers which have to be previously set. </p>
			<p>Our experiments showed that we need to introduce multiple mutations to increase the melting temperature of our protein by a significant amount through a cumulative effect. We decided to use a simulated evolution approach as the search field for possible mutations is very large. The evolutionary approach works similar to evolution in nature including cross over of good mutations and a higher “survival” chance of mutations to be kept based on how much they improve thermostability. </p>
			<p>We planned to use the model for the prediction of protein functions (for more information have a look at the Project/Improve section) to also affect the survival rate of mutations to avoid mutations which structually and functionally change the protein, but did not have the time to add this feature. </p>
			<p>We then run this our evolutionary approach over several generations until no significant changes occur.</p>
			
			<h2>5 Improving our dataset/model</h2>
			<p>Lastly we started further improvements on the dataset as the data is the deciding factor in out modelling. To main points we wanted to improve where that the dataset contained quite similar or duplicate proteins which we wanted to remove. What was additionally bad about them was that they often were from different organisms and had different temperature assigned which could hinder the training process of our model. </p>
			<p>To approach this issue we used a computer cluster to compute identity and blast results of all sequence against all other which is are quite expensive operations for ~7Mio proteins. (https://github.com/soedinglab/mmseqs2/wiki#batch-sequence-searching-using-mmseqs-search) Afterwards we implemented an efficient clustering algorithm for our use case which is based of Uclust (http://drive5.com/usearch/manual/uclust_algo.html). It removes unnecessary proteins which are to similar more correctly sets the highest temperature the cluster of these proteins is able to withstand. </p>
			<p>We also started research on more data we could provide the neural network with which could be easily calculated based on the primary structure. These were for instance polarity, aromaticity, amino acid mass and further properties and look forward to using the improved dataset in future work. </p>
			<p>TODO IMAGE </p>

			<h2>Prediction of protein function</h2>
			<p>This section is already included in the “Improve” section, since the model used here was based on another iGEM teams previous work.</p>
			<h3>References:</h3>
			
			<p><b>1.</b> Kenneth N. Mcguinness, Weilan Pan, Robert P. Sheridan, Grant Murphy, and Alejandro Crespo. Role of simple descriptors and applicability domain in predicting change in protein thermostability. Plos One, 13(9), 2018.</p>
			<p><b>2.</b> M. D. S. Kumar, K. A. Bava, M. M. Gromiha, P. Prabakaran, K. Kitajima,H. Uedaira, and A. Sarai. Protherm and pronit: thermodynamic databasesfor proteins and protein-nucleic acid interactions. Nucleic Acids Research,34(90001), 2006.</p>
			<p><b>3.</b> Hassan Pezeshgi Modarres, Mohammad R. Mofrad, and Amir Sanati-Nezhad. Protdatatherm: A database for thermostability analysis and engineeringof proteins. Plos One, 13(1), 2018. </p>
			<p><b>4.</b> Lorenz Christian Reimer, Anna Vetcininova, Joaquim Sardà Carbasse, CarolaSöhngen, Dorothea Gleim, Christian Ebeling, and Jörg Overmann. Bacdivein 2019: bacterial phenotypic data for high-throughput biodiversityanalysis. Nucleic Acids Research, 47(D1), 2018.</p>
		    <p><b>5.</b> Zhu, J. Y., Park, T., Isola, P., & Efros, A. A. (2017). Unpaired image-to-image translation using cycle-consistent adversarial networks. In Proceedings of the IEEE international conference on computer vision (pp. 2223-2232).</p>
	  	  </a.div>
	  	  <a.div className= "page-text invitro" style={propsInvitro}>
	  		<h1> In-vitro Project Design </h1>

			<h2> Main engineering principles </h2>

			<p> <b>Trial and error </b> – Finding a more thermostable variant of a lipase without knowing and considering which changes in the amino acid-sequence would lead to an increase in thermostability. At first glance, this sounds like finding the needle in a haystack, doesn’t it? Let us look at the method we used to design our experiment: The error-prone PCR (ep-PCR) (Leung, Chen and Goeddel, 1989; Cadwell and Joyce, 1992). This random mutagenesis method is based on a modified polymerase chain reaction, using a polymerase without proof reading. The aim for the error-prone PCR is to get a higher number of failures during the DNA replication through adding Mn<sup>2+</sup> to the reaction buffer in order to increase the possibility of non-Watson-Crick-pairing. Additionally, a non-equimolar amount of dNTPs is added to avoid a mutation bias caused by the addition of Mn2+ (McCullum et al., 2010). After several rounds of these ep-PCR, we will get hundreds of different sequences with a various number of mutations randomly distributed in the whole sequence. So, we end up creating a library with all of these, which can be used for screening and further experiments. </p>

			<p><b>A detective’s game </b>– As we have several hundreds of colonies now, we need to find out if the lipase is still active or if we might have mutated a part of the sequence that is essential for the lipase activity. Additionally, we want to find out if our work was successful, meaning if there is a higher stability at a higher temperature. The method we choose for this is a para-Nitro-phenol (pNP)-ester-hydrolysis assay (Tabatabai, 1994). If there is lipase activity in the lysate of the cells of the colony, it will hydrolyse the pNP-ester into p-Nitrophenol and the corresponding fatty acid: </p>

			<p> TODO please include the image ''invitro_project:design_image_1'', thanks</p>

			<p> <i> Image 1: Principle of the pNP-ester hydrolysys  assay: lipase catalysed reaction with pNP-ester as substrate in water-solution splitted into p-Nitrophenol and corresponding fatty acid. </i> </p>


			<p>The p-Nitrophenol has a yellow colour that can be detected via photometric measurement at a wavelength of 410 nm.</p>

			<p> <b>Presentation ceremony </b> – The quantitative assay is the third big principle that we use during our experiments, based on comparison of our measurement data with a detected standard curve for p-Nitrophenol and calculating the amount of enzyme that release 1 micromol of p-Nitrophenol in one minute. This is set as one unit of enzyme activity (Tabatabai, 1994). </p>

			<p> <b>A backup plan </b> – In order to improve and validate our neuronal network, we will synthesize DNA sequences predicted by our model. These sequences were prodicted to have an increased thermostability. Once we have cloned them into our vector of choice, we will express them and test them with the same pNP assay explained above. </p>

			<h2> Our daily journey in the lab – combining the methods above to create a project plan </h2>

			<p> <b>The DNA of our choice </b> – We decided to work with a lipase mainly because of the various number of industrial applications. These are, for example, the textile industry, pharmacy or biodiesel production (Sarmah <i>et al.</i>, 2018). We chose a lipase, that is similar to the lipase from <i> Bacillus amyloliquefaciens </i>B, named Lip<sub>BA</sub>, as it has a small size, is easy to express and handle, presents moderate thermophilic traits and can work under extreme alkaline pH levels (Cai <i>et al.</i>, 2014, Saengsanga<i> et al.</i>, 2016). </p>

			<p>Our DNA construct (<b>Figure</b>) consists of the gene encoding for Lip<sub>BA</sub> flanked by several parts from the iGEM registry:</p>

			<p> TODO please include the image ''invitro_project_design_image_2" </p>

			<p><i>image 2: Construct that we synthesized. Starting with the iGEM prefix with its typical restriction sites (EcoRI, NotI, XbaI). Flanked by BglII restriction sites the constitutive promotor (BBa_J23119) is following. Through the inserted restriction sites, we can easily cut out the promotor if overexpression of the lipase is harmful to the bacteria. Followed by a ribosomal binding site (BBa_B0030), the Lip<sub>BA</sub> and the following terminator of transcription (BBa_K864600). At the 3' end  is the iGEM suffix with its typical restriction sites (SpeI, NotI, PstI). </i></p>

			<p>This fragment gets cloned into the pBluepSLiCE-vector (following called pSLiCE-vector) via standard digestion-ligation protocols <b>(Figure)</b>. The pSLICE-vector is a low copy number which contains an Ampicillin-resistance gene and a <i>lacZ</i> repressor operon. This allows inducible activation of a T7 promoter and, thus, expression of the gene of interest.</p>

			<p> TODO please include the image "invitro_project_design_image_3"</p>

			<p><i>Image 3: Plasmid map of pSLiCE with origin of replication, Ampicillin-resistance, T7 and T3 promotor and our inserted construct</i></p>

			<p>The construct, designed above, gets transformed into the expressing strain <i>E. coli </i> strain BL21(DE3) with oligonucleotides flanking the Lip<sub>BA</sub> gene. We will introduce mutations at random points within its sequence by <b>ep-PCR</b>. Our plan is to create a <b>library with many sequence variants of Lip<sub>BA</sub></b>. In order to test the conditions we will first create a test-library to find out the best ones for the epPCR. </p>

			<p>After all the mutated sequences are generated and inserted in the <i>E. coli </i>BL21(DE3), the next question is to find out if the lipases are still functional and if they have a higher thermostability. First, we want to try to work with the constitutive promotor, if this is not working, we want to remove the constitutive promoter of our contracts to control the expression of the gene. Second, we will induce expression of the protein by IPTG and measure its activity by the <b>pNP-ester-hydrolysis assay</b>, explained above. </p>

			<p>For this, we use the lysate of cells containing the mutated  Lip<sub>BA</sub>. The screening takes place at 40 °C  under different induction conditions and incubation times in a plate reader. Two measurements at room temperature will be done, one before and one after the incubation time. pNP in buffer solution is used as positive control, lysed <i> E. coli</i> cells without a plasmid and with an empty plasmid in buffer solution as negative control to avoid failures because of background activity.</p>

			<p> After several rounds or error-prone PCR and screening, the colonies that provided the best results in the screening will be used for the <b>quantitative assay</b>as explained above. On a 96 well plate we will measure a standard curve of pNP in different concentrations and the chosen mutants to find out how much of the pNP-ester was splited by the mutated Lip<sub>BA</sub>. This is one of our final goals: to mutate the Lip<sub> BA</sub> and get a fragment with a higher thermostability. The second goal for the in vitro part is to verify the in silico model during screening the predicted sequences.</p>


			<h2> For a long journey it’s all about preparation – the long way before starting with the actual experiments.</h2>

			<p><b>Self-hydrolysis of pNP-ester? </b>– This would lead to false positive results and needs to be avoided. </p>

			<p><b>Does our strain contain the T7-system and is it working?</b> – We need the T7 system for transcription if we cut out the constitutive promotor. For checking it we use an RFP tag cloned into the pSLiCE vector. If it is expressed the resulting colonies will be red.</p>

			<p> <b>The best conditions for our screening? </b>With test-screenings of the BL21(DE3), using inserted pSLiCE ligated with Lip<sub>BA</sub> we check the conditions where we get the best screening results, e. g. the pH value, which ester we use as substrate, the substrate concentration and the wavelength.  </p>

			<p><b> References:</b> </p>

			<p> https://genome.cshlp.org/content/2/1/28https://ci.nii.ac.jp/naid/10003752379/</p>

			<p><b>1.</b> Cai, X., Ma, J., Wei, D. Z., Lin, J. P., and Wei, W. (2014). Functional expression of a novel alkaline-adapted lipase of Bacillus amyloliquefaciens from stinky tofu brine and development of immobilized enzyme for biodiesel production. Antonie Van Leeuwenhoek, 106(5), 1049-1060.</p>

			<p><b>2.</b> McCullum, E. O., Williams, B. A., Zhang, J., and Chaput, J. C. (2010). Random mutagenesis by error-prone PCR. In In vitro mutagenesis protocols (pp. 103-109). Humana Press, Totowa, NJ. </p>

			<p><b>3.</b> Saengsanga, T., Siripornadulsil, W., and Siripornadulsil, S. (2016). Molecular and enzymatic characterization of alkaline lipase from Bacillus amyloliquefaciens E1PA isolated from lipid-rich food waste. Enzyme and microbial technology, 82, 23-33.</p>

			<p><b>4.</b> Sarmah, N., Revathi, D., Sheelu, G., Rani, K. Y., Sridhar, S., Mehtab, V., and Sumana, C. (2018). Recent advances on sources and industrial applications of lipases. Biotechnology progress, 34(1), 5-28.</p>

			<p><b>5.</b> Tabatabai, M. A. (1994). Soil enzymes. Methods of soil analysis: part 2—microbiological and biochemical properties, (methodsofsoilan2), 775-833. </p>
		  </a.div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Design;