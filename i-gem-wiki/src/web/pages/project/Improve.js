import React, { useCallback } from 'react'
import { useSpring } from 'react-spring'
import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import SubtitleImage from 'components/SubtitleImage';
import Sponsors from "components/Sponsors";

function Improve() {
  const [{ scroll, xy }, set] = useSpring(() => ({ scroll: 0, xy: [0, 0] }))
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(e => set({ scroll: (e.target.scrollTop) }), [set])
  return (
  <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <CustomScrollbar>
        <BackgroundImage scroll={scroll} xy={xy} title="Improve" src="https://2019.igem.org/wiki/images/c/ce/T--Potsdam--improve.png"/>
        <div className="main-content">
          <div className="page-text red">
          <h1>Improving</h1>
          <p> Improving the deep learning algorithm to predict protein functions DeeProtein by Team Heidelberg 2017 </p>
Improving the deep learning algorithm to predict protein functions DeeProtein by Team Heidelberg 2017 

<p> The function of a protein is one of its most fundamental characteristics. To know the function of a protein helps considerably in the understanding of the protein in its natural context and, in the context of synthetic biology, might  even help to cure diseases. However, determining protein functions in the lab for the large influx of newly sequenced proteins has become infeasible. In silico algorithms geared towards predicting protein functions are much more efficient. The number of in silico determinations is already surpassing the lab determinations by orders of magnitude. 
Advances in computer science have made neural networks efficient enough to train large datasets on reasonable timescales. The predominant predictive power of neural networks lead to their success in many fields like image recognition or language processing. Recently they have also been used to predict protein functions, e.g. Clark et al., 2011, Szalkai et al., 2018.</p>

<h1>DeeProtein developed by Team Heidelberg 2017</h1>

<p> In the iGEM competition 2017 team Heidelberg (TH2017) successfully used targeted evolution to (1) change the function of an enzyme and (2) predict the activity of the enzyme (Team Heidelberg 2017 Wiki). Both experiments rested fundamentally on the neural network DeeProtein developed by TH2017 to predict protein function based solemnly of its sequence. 
The network was trained with the sequences from SwissProt and Uniprot comprising around 7 million proteins in total. Functions were defined by gene ontology (GO) annotations. The terms can be visualized as a network of branches fanning out from the root in a hierarchical fashion. Thus, terms towards the root term are directly inferable from the hierarchical ordering of the goTerms. TH2017 focused only on leaf terms for which at least 50 proteins could be found in SwissProt giving them a total of 886 functions (goTerms) with an average of 1.3 labels assigned per sequence. Their best model achieved an area under the curve value of 99% on the validation set with an F1-score of 78%. </p>
<p>TH2017 then predicted the score of 25 single or double mutant beta-Lectamase variants. With both lower and higher scores than the wildtype. The measured activity of the mutants fits the scores predicted by the network reasonably well. Lastly, TH2017 successfully evolved a beta-glucuronidase protein to a beta-galactosidase guided by DeeProtein.</p>

<h1>Our approach</h1>

<p>We were impressed by the results of TH2017 and especially drawn to their neural network, predicting protein functions, DeeProtein. Our initial idea was to use their model to predict functions of our sequences when not experimentally determined and use them as additional information for the network to get a deeper 'understanding' of proteins. This approach is referred to as transfer learning and quite popular when faced with limited data, e.g. Xu et al., 2017. </p>
<p>As the code is publicly available on github (Team Heidelberg 2017 git repository) we initially tried to use the existing code to reproduce their training results. The code base clearly shows the shear amount of time and effort spent to achieve such great results. However, the usability of the existing code with few documentation appeared rather limited for someone without prior insight into the internal structure of the code like us. </p>
<p>To appreciate the great work that was put into this very relevant problem of bio-informatics and make it available to the public and future teams of IGEM, we decided to write our own algorithm based on DeeProtein. Our approach was thereby focused on the usability of the code. Additionally, we included only proteins with experimentally determined functions and included a larger set of functions while retaining high accuracy. </p>

<h1>DeeProtein2</h1>

<h2>Documentation</h2>

<p>One of the main aims of DeeProtein2 is to make the code accessible and useful to a large variety of people. The code is released in ipython notebooks that are inherently structured to show the whole process step by step. We detailed the installation process for all essential packages for usage with jupyter notebooks. Additionally, the code can be used on Google Colab. Google Colab has the added benefit of access to a free GPU or TPU combined with zero installation as everything is run in your browser on servers provided by google.</p>
<p>We strictly limited the extend of the code as we identified size of the database as a crucial point for people to lose sight of the essential parts of the code. We wrote an extended documentation, also geared towards people with little prior knowledge of machine learning including links to helpful tutorials on the respective part of the code. All steps from downloading the dataset, cleaning the data, setting up the network, training the prepared data up to the calculation of the performance of the network are laid out in our git documentation and described in detail in the comments provided throughout the code.</p>

<h2>Modified model</h2>

<p>Contrary to TH2017 we only include sequences that have experimentally determined functions to train our model. Thereby, we want to avoid biasing the network on the patterns and limits of the  algorithm, that was used to determine functions in machine-annotated databases like Uniprot. Consequently, our dataset is purely comprised of proteins given in SwissProt. Swissprot is steadily updated such that the increase in sequences allows us to put tighter constrains on our dataset compared to the dataset of TH2017. We constrain our dataset to sequences with minimum length of 50 amino acids (AAs) and maximum length of 650 AAs. We include functions only if we find 100 proteins representative sequences for each function (without replacement).</p>
<p>We trained our model on two different datasets D100 and D100Child. Dataset D100 maximizes the amount of used functions by including all functions with 100 representatives independent of their hierarchical relations. To at least partially limit the amount of bias due to highly non-uniform occurrences of certain functions we only include the 100 representations per functions (Figure 1/2).
On the other hand, D100Child considers the hierarchical structure of GO terms. Here, we only include terms that have no children in the dataset. A similar idea was pursued by TH2017 who only included leaf terms in their analysis, which are terms that have no children whatsoever. Our approach allows us to include more labels by not only including leaf terms but additional terms without children but still limiting the interdependence between terms. </p>
<p>Dataset D100 contains 2881 GO terms with a total of 288,100 sequences with an average of 45 terms per sequence (Figure 1). On the other hand, dataset D100Child contains 1559 GO terms with a total of 155,900 sequences with an average of 4 terms per sequence (Figure 2). </p>
<SubtitleImage subtitle="Image 1: The number of terms per sequence of the dataset D100 ('given') and the predicted distribution of our best model ('predicted')" src="https://2019.igem.org/wiki/images/1/1f/T--Potsdam--D100NpSeq.png"/>
<SubtitleImage subtitle="Image 2: The number of terms per sequence of the dataset D100Child ('given') and the predicted distribution of our best model ('predicted')." src="https://2019.igem.org/wiki/images/4/47/T--Potsdam--D100ChildNpSeq.png"/>

<p>We use a larger validation set than TH2017 by validating on 30% of our 100 representatives per term. We tested a multitude of neural network architectures including fully connected neural networks and implementations of ResNet. Our best model is a convolutional neural network (CNN) with residual jumps and fully connected layers at the bottom. The fully connected layers allow direct connections from the input to the final layer. This should increase at least the initial speed of learning as no reduction of the feature space is necessary. The model has the advantage of being smaller than a ResNet and consequently easier to train. Our best model also outperformed all tested ResNet implementations. Our best model ('model1'), a smaller version of the former ('model3') and a ResNet ('model2') are available for training in our repository.</p>

<p>On the dataset D100, the best model ('model1') reaches an area under the curve of 0.98 and an F1-score of 0.86 with a recall of 0.80 and a precision of 0.94. Trained on the smaller dataset D100Child, the best model (also model1) reached an area under the curve of 0.98 and an F1-score of 0.75 with a recall of 0.67 and a precision of 0.84. </p>

<SubtitleImage subtitle="Image 3: Area under the curve (AUC) for D100 for every sequence in the dataset with an overall average of 0.98." src="https://2019.igem.org/wiki/images/a/a5/T--Potsdam--AUCD100.png"/>
<SubtitleImage subtitle="Image 4: Area under the curve (AUC) for D100Child for every sequence in the dataset with an overall average of 0.98." src="https://2019.igem.org/wiki/images/5/5b/T--Potsdam--AUCD100Child.png"/>

<p>Generally,  the model is able to predict functions with excellent precision. A small shortcoming of the model seems the underestimation of the occurrence of functions. This might be due to the imbalance of the sample. However, the model seems to have generally learned a relationship between protein sequence and its functions. Thus, we conclude that using the model to pursue a transfer learning approach to improve our main model on predicting protein thermostability appears very promising. </p>

<h1>References</h1>

<p><b>1. </b> Clark, W.T.; Radivojac, P.; Analysis of protein function and its prediction from amino acid sequence. Poteins, 2011, 79, 2086-2096</p>

<p><b>2. </b> Szalkai, B.;Grolmusz, V.; Near Perfect Protein Multi-Label Classification with Deep Neural Networks. Method, 2018, 132, 50-56</p>

<p><b>3. </b> Team Heidelberg 2017 git repository. Retrieved October 11, 2019, from https://github.com/igemsoftware2017/AiGEM_TeamHeidelberg2017</p>

<p><b>4. </b> Team Heidelberg 2017 Wiki. Retrieved October 11, 2019, from http://2017.igem.org/Team:Heidelberg</p>

<p><b>5. </b> Xu, Y.; Min, H.; Wu, Q.; Song, H.; Ye, B.; Multi-Instance Metric Transfer Learning for Genome-Wide Protein Function Prediction. Scientific Reports, 2017, 7, 41831</p>


  	  	  </div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Improve;