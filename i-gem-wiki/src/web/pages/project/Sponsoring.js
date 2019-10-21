import React, { useCallback } from 'react'
import { useSpring } from 'react-spring'
import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import SubtitleImage from 'components/SubtitleImage';
import Sponsors from "components/Sponsors";

function Sponsoring() {
  const [{ scroll, xy }, set] = useSpring(() => ({ scroll: 0, xy: [0, 0] }))
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(e => set({ scroll: (e.target.scrollTop) }), [set])
  return (
  <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <CustomScrollbar>
        <BackgroundImage scroll={scroll} xy={xy} title="Sponsoring" src="https://2019.igem.org/wiki/images/3/32/T--Potsdam--sponsoring.png"/>
        <div className="main-content">
          <div className="page-text green">
            <div align="justify">

<h1>Our sponsors</h1>

<SubtitleImage subtitle="Image 1: Max Planck Institute Of Colloids and Interfaces" src="https://2019.igem.org/wiki/images/5/5a/T--Potsdam--sponsor_12.png"/>
<h2>Max Planck Institute Of Colloids and Interfaces</h2>

<a href="http://www.mpikg.mpg.de/en">Website of the MPI-KGF</a>

<p className="quote2">"Biomimetic research is at the core of the Institute's activity. Common goal is to learn from nature how to build hierarchical materials or active systems with new functionalities, adaptive, self-healing or self-assembling properties."</p>
<p className="grayLink">(source: <a href="http://www.mpikg.mpg.de/en">http://www.mpikg.mpg.de/en</a>)</p>

<p>The Max Planck Institute and the gorgeous working group of Dr. Cecile Bidan supported us with a huge lab space and a pleasant working atmosphere! Many thanks to you. P.S.: <a href="http://www.mpikg.mpg.de/person/55039/2286"> Website of Cecile </a></p>

<SubtitleImage subtitle="Image 2: University of potsdam and faculty of science at the university potsdam" src="https://2019.igem.org/wiki/images/1/1f/T--Potsdam--sponsor_9.png"/>
<h2>University of potsdam and faculty of science at the university potsdam</h2>

<a href="https://www.uni-potsdam.de"> Website of the university of Potsdam </a> and <a href="https://www.uni-potsdam.de/mnfakul/"> Website of the faculaty of Science </a>

<p className="quote2">"The University of Potsdam is a public university in the Berlin-Brandenburg region of Germany. It is situated across four campuses in Potsdam and Brandenburg. Some faculty buildings are part of the campus at Griebnitzee and the New Palace of Sanssouci which is known for its UNESCO World Heritage status. The University of Potsdam is well known as one of the reputable education and research locations in Germany and Europe. More than 8,000 people are working as scholars in science." "The Faculty of Science is the largest of the five faculties at the University of Potsdam and maintains close collaborative relationships with extramural research institutions in the Potsdam region in the form of joint professorships and numerous projects."</p>
<p className="grayLink">(sources:   <a href="https://en.wikipedia.org/wiki/University_of_Potsdam"> https://en.wikipedia.org/wiki/University_of_Potsdam </a>    <a href="https://www.uni-potsdam.de/en/mnfakul.html">https://www.uni-potsdam.de/en/mnfakul.html </a>)</p>

<p>Our University and Faculty supported us with a great funding. Without this money we wouldn't be able to participate in iGEM; we specially want to thank Marita Dörrwand, she helped us a lot with the finance and without her knowledge our team would not be at this point! Many thanks to you.</p>

<SubtitleImage subtitle="Image 3: Equal opportunity office of the university potsdam" src="https://2019.igem.org/wiki/images/2/25/T--Potsdam--sponsor_6.jpg"/>
<h2>Equal opportunity office of the university potsdam</h2>

<a href="http://www.uni-potsdam.de/gleichstellung/"> Website of the Equal opportunity office</a>

<p className="quote2">"The Coordination Office for Equal Opportunities (KfC) is the central equality commissioner's office at the University of Potsdam and sees itself as an interface between science, study and administration. The various fields of tasks for the implementation of equality are anchored. At KfC, numerous activities and support opportunities for the creation of equal opportunities are conceptually developed, strategically located and linked with other offers in the fields of career and personal development, counselling and gender </p>
<p className="grayLink"> (source: <a href="http://www.uni-potsdam.de/gleichstellung/ueber-uns/profil-des-koordinationsbueros-fuer-chancengleichheit.html">http://www.uni-potsdam.de/gleichstellung/ueber-uns/profil-des-koordinationsbueros-fuer-chancengleichheit.html</a>)</p>

<p>The Equal Opportunity Office of University Potsdam supported us with a generous financial help for the trip to Boston. Especially the flights and the attendance fees (Giant Jamboree) for our team, we couldn't pay them without your help! Many thanks to you.</p>

<SubtitleImage subtitle="Image 4: Potsdam Transfer" src="https://2019.igem.org/wiki/images/c/ce/T--Potsdam--sponsor_8.png"/>
<h2>Potsdam Transfer</h2>

<a href="http://www.potsdam-transfer.de"> Website of Potsdam Transfer</a>

<p className="quote2">"The goal of the transfer service is to transfer the extensive know-how and the results from research and development into innovative technologies for the economy. We help to overcome the hurdles on this path: starting with the identification and analysis of research results for market application, project initiation and takeover of project management, through the registration and marketing of protective rights through the patent and licensing service to the presentation at international trade fairs our messaging service."  </p>
<p className="grayLink"> (source: <a href="http://www.potsdam-transfer.de/transfer">http://www.potsdam-transfer.de/transfer</a>)</p>

<p>Potsdam Transfer supported us with the attendance fees for the Giant Jamboree and with printing our poster. Without you, our Team would not come to Boston.   Many thanks to you.</p>

<SubtitleImage subtitle="Image 5: Zessko at the university potsdam" src="https://2019.igem.org/wiki/images/e/ef/T--Potsdam--sponsor_10.png"/>
<h2>Zessko at the university potsdam</h2>

<a href="https://www.uni-potsdam.de/zessko/"> Website of the Zessko </a>

<p className="quote2">"Zessko is the center for languages and key competencies. iGEM is a part of the student projects (key competencies). Student projects are recognized academic forms of teaching and learning that exist alongside lectures, seminars, and tutorials at the University of Potsdam. University lecturers provide scholarly supervision for student projects. Achievements completed in projects are credited in the European Credit Transfer System (ECTS) as courses completed in the "Student Projects" elective module (Studiumplus). Financia
l support is available through Studiumplus for completing projects." </p>
<p className="grayLink"> (source: <a href="https://www.uni-potsdam.de/en/zessko/key-competences-studiumplus/student-projects.html">https://www.uni-potsdam.de/en/zessko/key-competences-studiumplus/student-projects.htm </a>)</p>

<p>The Zessko gave us financial support for printing flyers, T-Shirts and to buy the flight tickets. A great support for our Team. Many thanks to you.</p>

<SubtitleImage subtitle="Image 6: Promega" src="https://2019.igem.org/wiki/images/c/c6/T--Potsdam--sponsor_0.png"/>
<h2>Promega</h2>


<a href="https://www.promega.de"> Website of Promega</a>

<p className="quote2">"Promega Corporation is a manufacturer of enzymes and other products for biotechnology and molecular biology with a portfolio covering the fields of genomics, protein analysis and expression, cellular analysis, drug discovery and genetic identity." </p>
<p className="grayLink"> (source: <a href="https://en.wikipedia.org/wiki/Promega">https://en.wikipedia.org/wiki/Promega</a>) Promega supported us with excellent kits and lab equipment, we would not have been able to conduct any of our experiments without your help! Many thanks to you.</p>

<SubtitleImage subtitle="Image 7: Carl Roth" src="https://2019.igem.org/wiki/images/1/11/T--Potsdam--sponsor_7.png"/>
<h2>Carl Roth</h2>

<a href= "https://www.carlroth.com/de/de"> Website of Carl Roth </a> 

<p>Carl Roth is a great company from Germany, they supply customers with items from the range of laboratory supplies and chemicals. Carl Roth supported us with their great items to carry out our labwork, our experiments would not be completed without your chemicals! Many thanks to you.</p>

<SubtitleImage subtitle="Image 8: Horbach" src="https://2019.igem.org/wiki/images/3/38/T--Potsdam--sponsor_5.png"/>
<h2>Horbach</h2>

<a href="https://www.horbach.de"> Website of Horbach </a>

<p>Horbach is a company for financial planning support for special academic projects and private people. Horbach organized a seminar for us, to build a strong team, and connected us with great companies to introduce our idea to them. They became friends with us. Many thanks to you!</p>

<SubtitleImage subtitle="Image 9: Zymo Reasearch" src="https://2019.igem.org/wiki/images/e/e9/T--Potsdam--sponsor_11.png"/>
<h2>Zymo Reasearch</h2>

<a href="https://www.zymoresearch.de"> Website of ZymoResearch </a> 

<p className="quote2">"Zymo Research Corporation has contributed greatly to the biomedical field, as evident by the numerous products launched in just two decades. Simplifying and speeding up the DNA/RNA isolation process has been the company's primary focus. In 2001 they entered into the burgeoning field of epigenetics and quickly became one of the leading players in this market.</p>
<p className="grayLink"> (source: <a href="https://www.zymoresearch.de/pages/about-zymo-research">https://www.zymoresearch.de/pages/about-zymo-research</a>)</p>

<p>Zymo Research supported us with great lab equipment and kits, without your sponsored material our labwork would have been so much harder.  any thanks to you!</p>

<SubtitleImage subtitle="Image 10: Eppendorf" src="https://2019.igem.org/wiki/images/e/e5/T--Potsdam--sponsor_1.png"/>
<h2>Eppendorf</h2>

<a href="https://www.eppendorf.com/DE-de/">Website of Eppendorf</a> 
  
 <p className="quote2">"Eppendorf is a life science company that develops, manufactures and markets systems for use in laboratories worldwide. The product range includes, for example, pipettes and automatic pipetting machines, dispensers, centrifuges, mixers as well as </p>
 <p className="grayLink"> (source: <a href="https://www.eppendorf.com/DE-de/ueber-uns/">https://www.eppendorf.com/DE-de/ueber-uns/</a>)</p>

<p>Eppendorf borrowed us a thermocycler, which was a very useful equipment during our labwork, it came with great lab materials.   Many thanks to you!</p>

<SubtitleImage subtitle="Image 11: IBA" src="https://2019.igem.org/wiki/images/9/92/T--Potsdam--sponsor_3.png"/>
<h2>IBA</h2>

<p className="quote2">"For more than two decades IBA provides innovative technologies for life science applications. The product portfolio includes tools for cell selection and expansion, protein production and assays as well as custom oligos and predefined DNA/RNA.</p>
<p className="grayLink"> (source: <a href="https://www.iba-lifesciences.com/about-us.html">https://www.iba-lifesciences.com/about-us.html</a>)</p>

<p>IBA supported us with plasmids and protein purification columns; the foundation for our work in the lab. Many thanks to you!</p>

<SubtitleImage subtitle="Image 12: Geneious Prime" src="https://2019.igem.org/wiki/images/b/b1/T--Potsdam--sponsor_2.png"/>
<h2>Geneious Prime</h2>

<a href="https://www.geneious.com/academic/"> Website of Geneious Prime </a>

<p className="quote2">"Biomatters' Geneious software applications enable scientists to work with the DNA at the core of their research. Geneious Prime and Geneious Biologics take away the pain of data management and computational complexity, allowing scientists to focus on their research."   </p>
<p className="grayLink"> (source: <a href="https://www.geneious.com/about/">https://www.geneious.com/about/</a>)</p>

<p>The Geneious software was our foundation of our experimental design, the plasmid maps, the primers and so much more. Many thanks to you!</p>

<SubtitleImage subtitle="Image 13: KWS" src="https://2019.igem.org/wiki/images/4/44/T--Potsdam--sponsor_4.png"/>
<h2>KWS</h2>

<p> <a href="https://www.kws.com/de/de/"> Website of KWS</a></p>

<p className="quote2">KWS's value chain extends from the development of varieties through the propagation and production of these varieties to marketing and distribution to farmers around the world. </p>
<p className="grayLink"> (source: <a href="https://www.kws.com/de/de/unternehmen/geschaeftsfelder/">https://www.kws.com/de/de/unternehmen/geschaeftsfelder/</a>)</p>

<p>KWS sponsored us with our team clothing, gene synthesis and sequencing; that's a big part of our labwork and with your help our team looks gorgeous! Many thanks to you!</p>

<SubtitleImage subtitle="Image 14: NEB" src="https://2019.igem.org/wiki/images/f/fb/T--Potsdam--sponsor_13.png"/>
<h2>NEB</h2>

<a href=" https://www.neb.com"> Website of NEB</a>

<p>"NEB offers the largest selection of recombinant and native enzymes for genomic research. While restriction enzymes remain part of our core product portfolio, our ever-expanding catalogue also includes products related to PCR, gene expression, sample preparation for next generation sequencing, synthetic biology, glycobiology, epigenetics and RNA analysis. Additionally, NEB is focused on strengthening alliances that enable new technologies to reach key market sectors, including molecular diagnostics development."</p> 
<p className="grayLink">(source: <a href="https://international.neb.com/about-neb/neb-overview"> https://international.neb.com/about-neb/neb-overview</a>)</p>

<p>Biobrick enzymes and Q5 polymerases were really important for our labwork, thank you, NEB, for supporting us with this awesome lab material. Many thanks to you!</p>

            </div>  
  	  	  </div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Sponsoring;