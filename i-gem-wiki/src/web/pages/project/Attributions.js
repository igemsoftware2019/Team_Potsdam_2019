import React, { useCallback } from 'react'
import { useSpring } from 'react-spring'
import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import Sponsors from "components/Sponsors";

function Attributions() {
  const [{ scroll, xy }, set] = useSpring(() => ({ scroll: 0, xy: [0, 0] }))
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(e => set({ scroll: (e.target.scrollTop) }), [set])
  return (
  <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <CustomScrollbar>
        <BackgroundImage scroll={scroll} xy={xy} title="Attributions" src="https://2019.igem.org/wiki/images/3/3a/T--Potsdam--group_picture.jpg"/>
        <div className="main-content">
        <div className="page-text blue">
        	<h1>Attributions</h1>
			<p>We want to thank everyone involved in this great adventure and for the fun times this past year! </p>
			<h3>Supervision and team leaders</h3>
			<ul>
			      <li>Prof. Salvatore Chiantia: general supvervision</li>
			      <li>Anne Schiederdecker and Prof. Petra Wendler: in vitro project guidance, lab space</li>
			</ul>
			<p> <ul>
			      <li>Robin Michaelis: student team leader</li>
			      <li>Bryan Nowack: student team leader</li>
			</ul> </p>

			<p>The team was split up into the in vitro and in silico group below. All members of the groups were generally involved in wet/dry lab work and the wiki so only other work is listed.</p>
			<h3>In vitro</h3>
			<ul>
			      <li>Pauline Kuschel: in vitro leader, project design, video</li>
			      <li>Oliver Straub: in vitro leader</li>
			      <li>Sophie Behrendt: video</li>
			      <li>Lisa-Marie Ferraton</li>
			      <li>Jose Antonio Ramirez Garcia</li>
			      <li>Sergio Gonzalez: video</li>
			      <li>Dominic Hamann</li>
			      <li>Aleksandra Khatova: project design, poster design</li>
			      <li>Tim Lange: project design</li>
			      <li>Ricarda Leisering: project design</li>
			      <li>Olamide Ahmed-Macaulay</li>
			 </ul>
			<h3>In silico</h3>
			<ul>
			      <li>Kristian Ehlert: Heidelberg 2017 implementation and improvement</li>
			      <li>Christian Min Hansch: video, web application</li>
			      <li>Pascal Iversen</li>
			      <li>Jonas Kopka: network development, wiki development, collaborations</li>
			      <li>Aaron Spieler: network development, documentation</li>
			</ul>

			<h3>Team members not affiliated to either groups</h3>
			<ul>
			      <li>Sarah Leonhardt: finances, Boston organization</li>
			      <li>Lilith Diringer: Human Practices, video</li>
			</ul>

			<p>We want to thank Prof. Michael Lenhard, Prof. Dirk Walther and Dr. Paul Saffert for their feedback for the project design and especially Marita Dörrwand, Ute Rzeha and Christina Wolff from the University for their help with bureaucracy and funding for the team. </p>
			<p>We also thank our collaborators (2019.igem.org/Team:Potsdam/collaborations) from AHUT-China (2019.igem.org/Team:AHUT_China), Turku (2019.igem.org/Team:Aoba), Dresden (2019.igem.org/Team.TU_Dresden) and Victoria-Wellington (2019.igem.org/Team:Victoria_Wellington) for helping us test our model in vitro, as well as Wroclaw (https://2019.igem.org/Team:Wroclaw), Stuttgart (https://2019.igem.org/Team:Stuttgart) and Washington (https://2019.igem.org/Team:Washington) for making it possible to collaborate with them. </p>
			<p>Special thanks go out to Sönke Erdmann and Lisa Sartorius for their invaluable support in making our music video possible. </p>

			<h3>Project start and university courses</h3>
			<p>We started our work with 11 people in August 2018 with a meeting where everyone presented their project idea and decided on the machine learning idea from Jonas Kopka. The refinement of the idea and addition of the in vitro group was done in the team together. Other members followed in fall of 2018. The in silico work was started in the winter of 2019, with the lab work following in March. </p>
			<p>Although there are courses for synthetic biology and machine learning at the University of Potsdam, they are not directly affiliated with iGEM. Some students were able to use the lab work to gain credit points for mandatory practicals. Aaron Spieler wrote a bachelor’s thesis based on some of his work for the iGEM team and submitted it to the University of Potsdam. </p>
			     

	  	</div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Attributions;