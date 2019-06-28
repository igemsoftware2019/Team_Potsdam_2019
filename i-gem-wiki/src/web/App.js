import React, { Component } from 'react';
import {
  Route,
  BrowserRouter
} from 'react-router-dom'

import IgemNavbar from "components/IgemNavbar";
import './App.css'; 

import Home from "./pages/Home";

import Team from "./pages/team/Team";
import Collaborations from "./pages/team/Collaborations";

import Description from "./pages/project/Description";
import Design from "./pages/project/Design";
import Experiments from "./pages/project/Experiments";
import Notebook from "./pages/project/Notebook";
import Contribution from "./pages/project/Contribution";
import Results from "./pages/project/Results";
import Demonstrate from "./pages/project/Demonstrate";
import Improve from "./pages/project/Improve";
import Attributions from "./pages/project/Attributions";

import PartsOverview from "./pages/parts/PartsOverview";
import BasicParts from "./pages/parts/BasicParts";
import CompositeParts from "./pages/parts/CompositeParts";
import PartCollection from "./pages/parts/PartCollection";

import Safety from "./pages/Safety";

import HumanPractices from "./pages/human_practice/HumanPractices";
import EducationAndEngagement from "./pages/human_practice/EducationAndEngagement";

import Entrepreneurship from "./pages/awards/Entrepreneurship";
import Hardware from "./pages/awards/Hardware";
import Measurement from "./pages/awards/Measurement";
import Model from "./pages/awards/Model";
import Plant from "./pages/awards/Plant";
import Software from "./pages/awards/Software";

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/Team:Potsdam">
        <IgemNavbar></IgemNavbar>
        <div className="content">
          <Route exact path="/" component={Home}/>
          
          <Route path="/Team" component={Team}/>
          <Route path="/Collaborations" component={Collaborations}/>

          <Route path="/Description" component={Description}/>
          <Route path="/Design" component={Design}/>
          <Route path="/Experiments" component={Experiments}/>
          <Route path="/Notebook" component={Notebook}/>
          <Route path="/Contribution" component={Contribution}/>
          <Route path="/Results" component={Results}/>
          <Route path="/Demonstrate" component={Demonstrate}/>
          <Route path="/Improve" component={Improve}/>
          <Route path="/Attributions" component={Attributions}/>

          <Route path="/Parts" component={PartsOverview}/>
          <Route path="/Basic_Part" component={BasicParts}/>
          <Route path="/Composite_Part" component={CompositeParts}/>
          <Route path="/Part_Collection" component={PartCollection}/>

          <Route path="/Safety" component={Safety}/>

          <Route path="/Human_Practices" component={HumanPractices}/>
          <Route path="/Public_Engagement" component={EducationAndEngagement}/>

          <Route path="/Entrepreneurship" component={Entrepreneurship}/>
          <Route path="/Hardware" component={Hardware}/>
          <Route path="/Measurement" component={Measurement}/>
          <Route path="/Model" component={Model}/>
          <Route path="/Plant" component={Plant}/>
          <Route path="/Software" component={Software}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
