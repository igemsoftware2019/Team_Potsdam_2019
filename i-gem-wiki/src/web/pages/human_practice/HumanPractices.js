import React, { useCallback, useState } from 'react'
import { useSpring, animated as a } from 'react-spring'
import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import SubtitleImage from 'components/SubtitleImage';
import Sponsors from "components/Sponsors";

function HumanPractices() {
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
  let toggleClass = isToggled ? 'toggled' : ''
  let toggleClassOposite = isToggled ? '' : 'toggled'
  return (
  <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <CustomScrollbar>
        <BackgroundImage scroll={scroll} xy={xy} title="Human Practice" src="https://2019.igem.org/wiki/images/9/98/T--Potsdam--human_practices.png"/>
        <div className="main-content blue">
          <div>
          	<h1>Human Practice</h1>
            <span className={"butnred noselect " + toggleClassOposite} onClick={toggle}>
              Education and Engagement
            </span>
            <span className={"butngreen noselect " + toggleClass} onClick={toggle}>
              Integrated Human Practice
            </span>
          </div>
          <a.div className="page-text red" style={propsInsilico}>
          <h1>Education and Engagement</h1>

<p>We wanted to use this opportunity that iGEM presented us to educate and help demystify the quite cryptic term "synthetic biology" within our community and beyond.</p>

<p>Even within our scientific community at the university and associated institutes, synthetic biology can still lead to confused faces. To help get our fellow scientists interested in synthetic biology we spread the word at every opportunity we got.</p>
<p>In collaboration with our own university press we are featured on the <b>University of Potsdam Homepage</b> where our team and project description and a video interview is prominently featured.</p>
<SubtitleImage subtitle="Image 2: Interview" src="https://2019.igem.org/wiki/images/6/68/T--Potsdam--interview.png"/>
<p><i>For German speakers who are interested in the full interview, please follow this LINK: <a href="https://mediaup.uni-potsdam.de/Play/9352">Radio Interview</a>.</i></p>
<p>Furthermore, an article on iGEM, our team and our project idea will be published in the November issue of the <b>BIOspektrum Magazine</b>, a German magazine associated with Springer Press that publishes review articles on current topics in life science research and news regarding biology in industry and politics.</p>
<p>To get our first semester students hooked on synthetic biology and to get some advertisement going for next year's iGEM team we presented at the <b>first semester welcome festivities</b> the “WarmUP!”. We presented a short summary on iGEM and our project followed by a very entertaining PowerPoint Karaoke session. The basic idea of this is the presentation of a completely unknown, jumbled up PowerPoint presentation and having fun improvising a new presentation to connect the slides.</p>
<SubtitleImage subtitle="Image 3: WarmUP" src="https://2019.igem.org/wiki/images/5/5c/T--Potsdam--warmup.png"/> 
<p>This year we also collaborated with other teams across the globe to spread awareness in their respective scientific communities. We participated in Team Wroclaw's Comic strip and helped translate Team Washington's pamphlet texts into German.</p>
<p><i>For more on this see our <a href="2019.igem.org/Team:Potsdam/collaborations">collaborations page</a>.</i></p>
<p>As a finale to our work on iGEM on the university campus this year we will hold a <b>presentation for our fellow students</b> on synthetic biology, our project progress and iGEM in general at the end of October. We hope we can convey how much fun we had, despite all the work that comes with it and we hope to inspire people to join next year's team at the University of Potsdam.</p>

<p>To spread awareness beyond the academic scientific community we participated in multiple events around Potsdam and Berlin for interested people to get a first taste of science.</p> 
<p>We talked to high school students interested in studying at our university at the University's <b>“open day”</b> about informatics and bioinformatics and about iGEM as an extracurricular student project.</p>
<p>At the Potsdam day of science 2019, we got people laughing with another PowerPoint Karaoke session whilst simultaneously explaining the idea of iGEM and what synthetic biology is all about. This event is open to people of all generations who are interested in science. It gives them the opportunity to interact with representatives of universities, research institutes and companies in and around Potsdam and find out about their work, engage in fun experiments or hear interesting talks on current scientific topics.</p>
<SubtitleImage subtitle="Image 4: Potsdam day of Science ('Potsdamer Tag der Wissenschaften' - PTDW)" src="https://2019.igem.org/wiki/images/0/04/T--Potsdam--ptdw.png"/> 
<p>We also participated in the 72<sup>nd</sup> <b>science slam in Berlin</b> with a summary of our project. The rules of science slam are simple, present your topic in 10 minutes and be funny. Whilst we did not win, we had a great time and got a big round of applause. It was a great and challenging experience to take something as complicated as directed evolution and artificial intelligence and trying to boil that down to just ten minutes of presentation to laymen who maybe didn't have any biology teaching since middle school.</p>

<p>To reach more of the non-scientific community we got creative.</p>
<p>Just like in 2017, where the Potsdam team made a <b>music parody</b> of Ed Sheeran's "<a href="https://www.youtube.com/watch?v=DKa2WAsErwA">Shape of you</a>", we filmed and edited a team video to give people, who have no idea what we're all about, a quirky first impression of us and our project idea as part of our crowdfunding campaign. We chose to do this in the form of a music video parody of AC/DC's “TNT” for its catchy rhythm. The video features some troubles we faced in the lab and with programming and our main method of selecting for good proteins in our yellow coloured PNP assays. Special thanks go out to Lisa Sartorius, who sang our cover version for us!</p>
<p><i>For more on the video go to our <a href="2019.igem.org/Team:Potsdam/video">video page</a>.</i></p>
<p>Check out our <a href="https://www.youtube.com/watch?v=HsKj9c8H-cs">Video </a>on Youtube.</p>
<p>We went for a live broadcast on the <b>Funk.UP radio station</b> were our team members talked about synthetic biology and iGEM, creating and communicating information in interdisciplinary teams, the ups and downs of working in large teams and advantages and skills learned through student projects.</p>
<p>Throughout our project we also maintained a <b>social media</b> presence keeping people posted on new developments, photos, events and what's going on behind the labcoats on Instagram and Facebook.</p>
<SubtitleImage subtitle="Image 5: PNP" src="https://2019.igem.org/wiki/images/1/12/T--Potsdam--pnp.png"/>
<p>Check us out at: <i><a href="https://www.instagram.com/igemunipotsdam/">Instagram</a>; <a href="https://de-de.facebook.com/igempotsdam/">Facebook</a></i></p>
<SubtitleImage subtitle="Image 6: Us on social media" src="https://2019.igem.org/wiki/images/2/2f/T--Potsdam--socialmedia.png"/>
          </a.div>
          <a.div className="page-text green" style={propsInvitro}>
            <h1>Integrated Human Practice</h1>

<p>Human practice in any iGEM project is about connecting our ideas and projects with the real world. This then gives us feedback which allows us to adjust the project idea to the real-world needs and applications. Our project is all about using computer science for biological purposes. We hope to create a neural network that will help generate thermostable proteins, thus streamlining an otherwise extensive research process. In order to reflect on our project ideas and perfect them we continuously sought out information and feedback on multiple levels of expertise and know-how. This included researchers in the field, interested parties in the industry and fellow students.</p>

<p>We have talked to several Professors and research assistants at our university that have experience with biochemistry and protein work, with professors of computer science and with professors at the Max-Plank-institutes in Potsdam. They made us realize that a final completed product would need to be widely accessible, ideally in the form of an online application to be of optimal use to people in the lab worldwide. For full transparency the coding for our model should also be accessible on platforms like GitHub, to also encourage further development or improvement on similar models.</p>
 
<p>Increased thermostability in proteins is of particular interest in many industrial processes as this, for example, may allow for faster reactions. Thus, a functioning Neural Network that can help predict thermostable variants of any protein would be invaluable. To help us gain some insight into providing automated sequence - based services on a large scale we spoke to a representative from Doulix.</p>
<p>Doulix offers an online platform that includes an extensive array of design tools for DNA synthesis and cloning work and as such have a lot of experience working with large biological datasets and artificial intelligence. In addition, they're a great supporter for iGEM, with special offers for iGEM teams.</p>
<SubtitleImage subtitle="Image 1: Logo Doulix" src="https://2019.igem.org/wiki/images/b/b8/T--Potsdam--Doulix.png"/>
<p>The interview helped us understand that for possible real-world applications of our model we would have to find solutions for safeguarding not only our system against misuse, but also ensuring user data safety and tackle possible liability concerns. As user data safety and liability are problems, which we would only face at a much later stage of project development we decided to focus our efforts on finding a way to guard our systems against misuse. Upon the recommendation of Doulix, we contacted Battelle, a company that offer a screening service, that compares any given sequence against datasets of known dangerous proteins. For our currently model-generated sequences we arranged with them to have these screened, but we were unable to integrate an automated preliminary screening step to our model due to Battelles security standards.</p>
<p>Another way we are preliminarily guarding our system against misuse is to use our function predicting model to find harmful proteins and will stop the model from working on it.</p>
<p><i>Read more about this on our <a href="2019.igem.org/Team:Potsdam/safety"> Safety Page</a>.</i></p>
<p>As our project contributes to the increasingly streamlined and automated future of science, we also sought feedback and insight from fellow students, the scientists of the future.</p>

<p>We took part in several Team meetups, in Leuven, Berlin, Bonn and Duesseldorf, which gave us the opportunity to engage and exchange information and experience with other teams. Most importantly, to get feedback on our project idea, our poster and our presentation which we used to perfect our project and some input on troubleshooting.</p>

<p>To really put our model to the test and get some real feedback on how to possibly further improve our network we offered other iGEM teams at the meetups and worldwide the opportunity to send in their protein sequence of choice and let us generate sequences for protein with increased thermostability.</p>
<p>Although multiple teams took us up on our offer, we sadly did not get back many results.</p>

<p><i>Read more about this on our collaborations page: <a href="2019.igem.org/Team:Potsdam/collaborations">Collaborations</a>.</i></p>
  	  	  </a.div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default HumanPractices;