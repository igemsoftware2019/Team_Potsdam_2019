import React, { Component } from "react";
import CustomScrollbar from 'components/CustomScrollbar';
import './Description.css'

class Description extends Component {
  render() {
    return (
      <div className="page">
        <CustomScrollbar>
        	<div className="description">
	          <h1>What is the goal of our project? Why did we choose this topic?</h1>
	          <p>The landscape of biological sciences has changed greatly in the last decades thanks to the advancement of in silico tools. Their integration in already well-established fields have provided us with a new scope with which to keep moving forward, while reducing the complexity of tasks which previously seemed inaccessible. Whether by allowing us to process an ever-growing amount of data in sequence analysis approaches, or by supplying an environment in which to reliable simulate biological systems, these Bioinformatics tools have already proven their utility. Not only that, but they have also shown signs of a yet untapped potential to be exploited in the future times. This year, we intended to implement said techniques into our project. By doing so, we also wished to promote collaboration and integration between people from different backgrounds (mainly Biology and Computer Science).</p>
	          <p>Quickly described, our project focuses on generating thermophilic proteins in two different ways and comparing the results. Thermophilicity is a highly desirable protein property for industrial and scientific uses, due to instability being one of the main limiting factors in their application. Enhancing and improving their heat resistance, while maintaining their original activity, would greatly reduce the associated cost of an uncountable amount of processes.</p>
	          <h1>In silico:</h1>
	          <p>A major part of the project is Computer-Science-based.</p>
	          <p>In order to achieve our goal, we obtain training sets by combining existing data from databases such as BacDive, NCBI and PDB. This allows us to feed our neural network models with millions of entries containing relevant information such as protein sequence, structures, and temperature information, and results in predictions for unseen parts of the datasets.</p>
	          <p>Then, parts of these networks may be recycled into others (Transfer Learning), and the insight gained from the previous training and validation processes can be used to introduce mutations in protein sequences which improve their thermostability. We plan on using CycleGANs as well. These are more complex networks which would directly generate more heat resistant versions of an input protein.</p>
	          <p>Essentially, our neural networks are trained to detect and predict thermostability of already existing proteins and use that knowledge to generate new proteins which show a higher resistance to heat.</p>
	          <h1>In vitro:</h1>
	          <p>While our in silico approach can be generalized to a wide range of proteins, we required to focus on a certain type of protein for our lab work. After carrying out some research, we decided to put our attention into lipases, which, industrially speaking, could be considered a Swiss army knife, due to their many useful applications in different fields.</p>
	          <p>As a way of validating the results obtained by our neural network, we will build a mutant library (with the use of error-prone PCR, epPCR). This introduces mutations to a wild-type protein sequence, generating many different strands which will need to be screened afterwards.</p>
	          <p>For the screening procedure, we developed a two-step protocol.</p>
	          <ul>
	            <li>First step: screening by using tributyrin agar assay. Only the colonies showing a clear halo on the tributyrin agar plate contain a working lipase, and only these will be selected for the second screening step.</li>
	            <li>Second step: screening by using pNP lipase activity assay. Lipase activity will split the p-NitroPhenol esters into colourful compounds. These compounds can be quantified through spectrophotometric techniques, and only those colonies which show a higher activity will be selected for the next rounds of epPCR.</li>
	          </ul>
          </div> 
        </CustomScrollbar>
      </div>
    );
  }
}

export default Description;