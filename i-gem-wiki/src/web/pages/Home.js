import React, { useCallback, useState } from 'react';
import { useSpring, animated as a, interpolate} from 'react-spring';
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons';
import {Fade, Flip, Slide} from 'react-reveal';
import {
  NavLink
} from 'react-router-dom'

import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import Sponsors from "components/Sponsors";
import './home.css'
/*
for (var i = 0 ; i < 15; i++) {
    Math.random()
  }
{lines.map(function(line, i){
    return <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke-width={line.width} stroke="cyan" obj={line} key={i}/>;
})}
{circles.map(function(circle, i){
    return <circle cx={circle.x} cy={circle.y} r={circle.r} fill="cyan" obj={circle} key={i} />;
})}
*/
function Home() {
  const [parallax, setParallax] = useState(false)
  const [myScroll, setScroll] = useState(0)

  const [{ scroll, xy }, set] = useSpring(() => ({ scroll: 0, xy: [0, 0] }))
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(function(e){
    set({ scroll: (e.target.scrollTop) });
    setScroll(e.target.scrollTop);
  }, [set,setScroll])
  const fadeIn = useSpring({from:{opacity: 0, top:"0vh"}, to:{opacity: 1, top:"14vh" },config: { duration: 1500 }})
  const interpScroll = interpolate([scroll,xy], (scroll,xy) => `${(scroll-900)/3}px`)
  const interpScroll2 = interpolate([scroll,xy], (scroll,xy) => `${(scroll-1500)/3}px`)

  return (
    <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <Parallax pages={0.923*4.7} scrolling={true} ref={ref => (setParallax(ref))}>
        <ParallaxLayer offset={0} speed={0.5} factor={0.923} style={{ zIndex:2 ,backgroundColor: '#000'}} onClick={() => parallax.scrollTo(0.923*0.4)}>
          <Slide left when={myScroll>=0 && myScroll<300}>
            <div className="logoHome">
              <a.img src="https://2019.igem.org/wiki/images/4/40/T--Potsdam--logo.png" alt="" style={fadeIn}></a.img>
            </div>
          </Slide>
          <Fade when={myScroll>=0 && myScroll<300}>
            <a.div className="openerText" style={fadeIn}>
              <h1>TherMaL UP</h1>
              <p>Evolution of thermophilic proteins with a neural network-based approach</p>
              <p>Team Potsdam iGEM 2019</p>
            </a.div>
          </Fade>
          <video className="backgroundVideo" autoplay="autoplay" preload="auto" controls="" loop="true">
            <source src="https://2019.igem.org/wiki/images/3/37/T--Potsdam--fire.mp4" type="video/mp4" />
          </video>
        </ParallaxLayer>
        <ParallaxLayer offset={0.923} speed={1.3} factor={0.923*0.7} style={{ backgroundColor: '#fff', zIndex: 1000, overflow: "hidden",height: "auto!important" }} onClick={() => parallax.scrollTo(0.923*0.8)}>
          <Slide left when={myScroll>100 && myScroll<500}>
            <div className="page-text red" style={{marginBottom: "150px"}}>
              <h1>Abstract</h1>
              <p>Thermophilicity is a highly desirable protein property relevant for industrial and scientific applications. Predicting mutations needed to convey thermophilic qualities is very difficult which is why our project focuses on developing a neural network which models the thermostability of proteins and finds more heat resistant protein variants. We hope to reduce the amount of lab work necessary to create new proteins with different properties and thereby magnify the possible scope that directed evolution can offer. More concretely, we use existing data from databases like BacDive and train neural networks on around 7 million amino acid sequences to predict the optimal growth temperature of the host organism and then apply different methods to find more stable variants. In parallel to this, a directed evolution approach will be utilized in vitro to find thermophilic variants. Additionally, we will analyse and verify the proteins that the neural network has predicted in the lab.</p>
              <span className={"butnred noselect toggled"} style={{float: "right", marginRight: "100px", padding: "5px 10px"}}>
                <NavLink className="nav-link" to="/Description"> Inspiration </NavLink>
              </span>
            </div>
          </Slide>
        </ParallaxLayer>
        <ParallaxLayer offset={0.923} speed={0.6} factor={0.923*1.5} style={{zIndex:2 ,backgroundColor: '#0b7faf' }} onClick={() => parallax.scrollTo(0.923*1.3)}>
          <iframe width="70%" height="50%" alt="Video Loading" src="https://www.youtube.com/embed/HsKj9c8H-cs" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </ParallaxLayer>
        <ParallaxLayer offset={0.923*1.73} speed={1.3} factor={0.923*0.7} style={{ backgroundColor: '#fff', zIndex: 1000, overflow: "hidden", height: "auto!important" }} onClick={() => parallax.scrollTo(0.923*1.6)}>
          <Fade top when={myScroll>650 && myScroll<1000}>
            <div className="page-text red" style={{ textAlign:"center", marginBottom: "75px"}}>
              <h1>Beyond the lab</h1>

              <span className={"butnred noselect toggled"} style={{ marginRight: "100px", padding: "5px 10px"}}>
                <NavLink className="nav-link" to="/Collaborations"> Collaborations </NavLink>
              </span>
              <span className={"butnred noselect toggled"} style={{ marginRight: "100px", padding: "5px 10px"}}>
                <NavLink className="nav-link" to="/Team"> Team </NavLink>
              </span>
              <span className={"butnred noselect toggled"} style={{ padding: "5px 10px"}}>
                <NavLink className="nav-link" to="/Human_Practices"> Human Practice </NavLink>
              </span>
            </div>
          </Fade>
        </ParallaxLayer>
        <ParallaxLayer offset={0.923*1.73} speed={0.2} factor={0.923*0.9} style={{backgroundColor: '#0b7faf' }} onClick={() => parallax.scrollTo(0.923*1.9)}>
          <a.div className="teamImage" style={{ left: interpScroll }}>
            <a.img src="https://2019.igem.org/wiki/images/6/6b/T--Potsdam--lab.png" alt=""></a.img>
          </a.div>
        </ParallaxLayer>
        <ParallaxLayer offset={0.923*2.19} speed={1.3} factor={0.923*2.55} style={{top: "-12%", backgroundColor: '#fff', zIndex: 1000, overflow: "hidden"}} onClick={() => parallax.scrollTo(0.923*3.05)}>
          <Fade top when={myScroll>1000 && myScroll<1300}>
            <div className="page-text red" style={{ textAlign:"center", marginBottom: "75px"}}>
              <h1>Overview</h1>
            </div>
          </Fade>
          <a.div className="overviewImage" >
            <a.img src="https://2019.igem.org/wiki/images/3/36/T--Potsdam--workflow.png" alt=""></a.img>
          </a.div>
          <Flip left when={myScroll>=1100 && myScroll<1500}>
            <div className="insilicoText1">
              <p>Combining existing data from databases we model neural networks to be able to make predictions on unseen parts of the datasets</p>
            </div>
          </Flip>
          <Flip left when={myScroll>=1100 && myScroll<1500}>
            <div className="invitroText1">
              <p>LipBA from Bacillus amyloliquefaciens</p>
            </div>
          </Flip>

          <Flip left when={myScroll>=1200 && myScroll<1700}>
            <div className="insilicoText2">
              <p>Supervised neural network learns complex sequence-thermostability relations</p>
            </div>
          </Flip>
          <Flip left when={myScroll>=1200 && myScroll<1700}>
            <div className="invitroText2">
              <p>Error prone PCR introduces mutations to the DNA by an amplification reaction with a higher number of mistakes</p>
              <span className={"butnblue noselect toggled"} style={{ padding: "5px 5px"}}>
                <NavLink className="nav-link" to="/Experiments"> Protocols </NavLink>
              </span>
            </div>
          </Flip>

          <Flip left when={myScroll>=1300 && myScroll<1700}>
            <div className="insilicoText3">
              <p>Neural network predicts stabilizing mutations for any given protein</p>
              <span className={"butnred noselect toggled"} style={{ padding: "5px 5px"}}>
                <NavLink className="nav-link" to="/Model"> Model </NavLink>
              </span>
            </div>
          </Flip>
          <Flip left when={myScroll>=1300 && myScroll<1700}>
            <div className="invitroText3">
              <p>Two steps of high-throughput screening:</p>
              <p>1. Tributyrin agar assay</p>
              <p>2. Colorimetric pNP lipase activity assay</p>
              <span className={"butnblue noselect toggled"} style={{ padding: "5px 5px"}}>
                <NavLink className="nav-link" to="/Safety"> Safety </NavLink>
              </span>
            </div>
          </Flip>
          <span className={"butngreen noselect toggled"} style={{ padding: "5px 10px"}}>
            <NavLink className="nav-link" to="/Design"> Read more about our project design </NavLink>
          </span>
        </ParallaxLayer>
        <ParallaxLayer offset={0.923*3} speed={0.2} factor={0.923*0.9} style={{backgroundColor: '#0b7faf' }} onClick={() => parallax.scrollTo(0.923*3.6)}>
          <video className="backgroundVideo2" autoplay="autoplay" preload="auto" controls="" loop="true">
            <source src="https://2019.igem.org/wiki/images/3/37/T--Potsdam--fire.mp4" type="video/mp4" />
          </video>
        </ParallaxLayer>
        <ParallaxLayer offset={0.923*3.7} speed={0} factor={0.9} style={{backgroundColor: '#fff', zIndex: 1000, overflow: "hidden"}}onClick={() => parallax.scrollTo(0)}>
          <Sponsors/>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
 
export default Home;