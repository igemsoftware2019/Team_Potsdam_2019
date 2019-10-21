import React, { useCallback } from 'react'
import { useSpring } from 'react-spring'
import Collapsible from 'react-collapsible';

import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import Sponsors from "components/Sponsors";

function Experiments() {
  const [{ scroll, xy }, set] = useSpring(() => ({ scroll: 0, xy: [0, 0] }))
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(e => set({ scroll: (e.target.scrollTop) }), [set])
  return (
  <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <CustomScrollbar>
        <BackgroundImage scroll={scroll} xy={xy} title="Experiments" src="https://2019.igem.org/wiki/images/b/b7/T--Potsdam--methods.jpg"/>
        <div className="main-content">
          <div className="page-text green">
            <h1>Protocols</h1>
            <p>Have a look at our lab protcols</p>
            <Collapsible trigger="Protocol 1: Digestion">
              <div className="protocol">
                <h2>Digestion</h2>
                <ul>
                    <li>Take your sample, mix it and centrifuge it down.</li>
                    <li>  Prepare the following on ice. Take a microcentrifuge tube or PCR tube and put following stuff in:</li>
                </ul>

                <table className="tg">
                  <tbody>
                    <tr>
                      <td className="tg-1wig">sample e.g. Miniprep</td>
                      <td className="tg-1wig">200 to 500 ng</td>
                    </tr>
                    <tr>
                      <td className="tg-1wig">10 x buffer</td>
                      <td className="tg-1wig">1  microL</td>
                    </tr>
                    <tr>
                      <td className="tg-1wig"> Enzyme 1</td>
                      <td className="tg-1wig">0,1 microL</td>
                    </tr>
                    <tr>
                      <td className="tg-1wig">Enzyme 2k</td>
                      <td className="tg-1wig">0,1 microL</td>
                    </tr>
                    <tr>
                      <td className="tg-1wig">dd water</td>
                      <td className="tg-1wig">fill up to 100 microL</td>
                    </tr>
                    <tr>
                      <td className="tg-1wig">total volume</td>
                      <td className="tg-1wig">10 microL </td>
                    </tr>
                  </tbody>
                </table>

                <ul>
                  <li>If you have more than one reaction, you can prepare a Mastermix</li>
                  <li>Mix and centrifuge carefully.</li>
                  <li>Incubate for 1h at 37°C.</li>
                    <li>When you don't continue working with the digestion do a heat inactivation (temperature and durations    depends on used enzyme)</li>
                  <li>After digestion you have to do a purification (PCR purification or gel purification)</li>
                </ul>
              </div>
            </Collapsible>
            <Collapsible trigger="Protocol 2: Sequential Digest">
              <div className="protocol">
                <h2>Sequential digest</h2>
<ul>
    <li>Take your sample, mix it and centrifuge it down.</li>
    <li>  Prepare the following on ice. Take a microcentrifuge tube or PCR tube and put following stuff in:</li>
</ul>

<table className="tg">
  <tbody>
    <tr>
      <td className="tg-1wig">sample e.g. Miniprep</td>
      <td className="tg-1wig">200 to 500 ng</td>
    </tr>
    <tr>
      <td className="tg-1wig">10 x buffer</td>
      <td className="tg-1wig">1  microL</td>
    </tr>
    <tr>
      <td className="tg-1wig"> Enzyme 1</td>
      <td className="tg-1wig">0,1 microL</td>
    </tr>
    <tr>
      <td className="tg-1wig">dd water</td>
      <td className="tg-1wig">fill up to 10 microL</td>
    </tr>
      <tr>
      <td className="tg-1wig">total volume</td>
      <td className="tg-1wig">10 microL </td>
    </tr>
</tbody>
</table>

<ul>
  <li>If you have more than one reaction, prepare a Mastermix</li>
  <li>Mix and centrifuge carefully.</li>
  <li>Incubate for 1h at 37°C.</li>
  <li>Adjust the salt concentration</li>
  <li>Add Enzyme 2</li>
  <li>Mix gently</li>
  <li>Incubate for another 1 h at 37 °C</li>
  <li>When you don't continue working with the digestion do a heat inactivation (temperature and durations depends on used enzyme)</li>
  <li>After digestion you have to do a purification (PCR purification for the insert and gel purification for the vector)</li>
</ul>


<ul>
  <li>If you have more than one reaction, you can prepare a Mastermix</li>
  <li>Mix and centrifuge carefully.</li>
  <li>Incubate for 1h at 37°C.</li>
    <li>When you don't continue working with the digestion do a heat inactivation (temperature and durations    depends on used enzyme)</li>
  <li>After digestion you have to do a purification (PCR purification or gel purification)</li>
</ul>
              </div>
            </Collapsible>
            <Collapsible trigger="Protocol 3: Ligation">
              <div className="protocol">
                <h2>Ligation</h2>

<p> <b>Always prepare a ligation-reaction without insert to test self ligation! </b></p>

<ul>
  <li>Set up the following reaction in a microcentrifuge tube or PCR tube on ice (let the Ligase stay as long as possible in the freezer):</li>
</ul>

<table className="tg">
  <tbody>
    <tr>
      <td className="tg-1wig"><b>10 x T4 DNA Ligase Buffer</b></td>
      <td className="tg-1wig">1 microL</td>
            <td className="tg-1wig">2 microL</td>
            <td className="tg-1wig">5 microL</td>
    </tr>
    <tr>
      <td className="tg-1wig"><b>Vector DNA</b></td>
      <td rowspan="2" colspan="3">Which ratio is best has to be decided through experiments (possible ratios: 1:3; 1:5; 1:7; 1:8 etc.) (total DNA weigth: 1-10ng/µL)</td>
      </tr>
    <tr>
      <td className="tg-1wig"><b>Insert DNA</b></td>
    </tr>
    <tr>
      <td className="tg-1wig"><b>T4 DNA Ligase</b></td>
      <td className="tg-1wig">0,5 microL (add last)</td>
            <td className="tg-1wig">1 microL (add last)</td>
            <td className="tg-1wig">2,5  microL (add last)</td>
    </tr>
      <tr>
      <td className="tg-1wig"><b>water</b></td>
      <td className="tg-1wig">(fill up to 10 µL)</td>
            <td className="tg-1wig">(fill up to 20 µL)</td>
           <td className="tg-1wig">(fill up to 50 µL)</td>
    </tr>
          <tr>
      <td className="tg-1wig"><b>total volume</b></td>
      <td className="tg-1wig">10 microL</td>
            <td className="tg-1wig">20 microL</td>
            <td className="tg-1wig">50 microL</td>
    </tr>
</tbody>
</table>

<ul>
  <li>Gently mix the reaction by pipetting up and down and microfuge briefly.</li>
  <li>Incubation: at 16°C overnight or at room temperature (22°C) for 1 hour </li>
  <li>Heat inactivate at 65°C for 10 minutes.</li>
  <li>Use ligation for transformation or store in the freezer!</li>
</ul>
              </div>
            </Collapsible>
            <Collapsible trigger="Protocol 4: Gibson Assambly">
              <div className="protocol">
                <h2>Gibbson Assambly</h2>

<ul>
  <li>Set up the following reaction in a PCR tube on ice:</li>
</ul>  
<table className="tg">
  <tbody>
    <tr>
      <td className="tg-1wig"></td>
          <td className="tg-1wig"><b>2-3 fragments</b></td>
          <td className="tg-1wig"><b>positive control</b></td>
    </tr>
    <tr>
      <td className="tg-1wig"><b>total amount of fragments</b></td>
           <td className="tg-1wig">x microL (0,02 - 0,5 pM)</td>
           <td className="tg-1wig"><b>10 microL</b></td>
    </tr>
    <tr>
      <td className="tg-1wig"><b>2 x Gibson Assambly Mastermix</b></td>
      <td className="tg-1wig">10 microL</td>
            <td className="tg-1wig">10 microL</td>
       </tr>
      <tr>
      <td className="tg-1wig"><b>water</b></td>
      <td className="tg-1wig">10 - x microL</td>
            <td className="tg-1wig">0 microL</td>
      </tr>
          <tr>
      <td className="tg-1wig"><b>total volume</b></td>
      <td className="tg-1wig">20 microL</td>
            <td className="tg-1wig">20 microL</td>
    </tr>
</tbody>
</table>
  


<ul>
  <li> Incubate samples in a thermocycler at 50°C for 15 minutes when 2 or 3 fragments are being assembled or 60 minutes when 4-6 fragments are being assembled.</li>
  <li>store samples on ice or at –20°C for subsequent transformation</li>
</ul> 
              </div>
            </Collapsible>
            <Collapsible trigger="Protocol 5: Golden Gate Cloning">
              <div className="protocol">
                <h2>Golden Gate Cloning</h2>

<p><b>Important:</b> </p>
<p>Amplify your fragment of interest with extension primers to add a Type IIS restriction site!</p>
<p>Digest with Type IIS Enzyme!</p>

<ul>
  <li>Set up the following reaction in a microcentrifuge tube on ice.</li>
</ul>

<table className="tg">
  <tbody>
    <tr>
      <td className="tg-1wig">10 x T4 DNA Ligase Buffer</td>
      <td className="tg-1wig">2 microL</td>
    </tr>
    <tr>
      <td className="tg-1wig">Vector DNA</td>
      <td rowspan="2"> -  Aproximately 7:1 ratio of molar mass between Vector and Insert</td>
    </tr>
    <tr>
      <td className="tg-1wig">Insert DNA</td>
    </tr>
    <tr>
      <td className="tg-1wig">T4 DNA Ligase</td>
      <td className="tg-1wig"> 1 microL</td>
    </tr>
        <tr>
      <td className="tg-1wig">dd water</td>
      <td className="tg-1wig"> fill up to 20 microL</td>
    </tr>
      <tr>
      <td className="tg-1wig">total volume</td>
      <td className="tg-1wig">20 microL </td>
    </tr>
 </tbody>
</table>
  
 <ul>
  <li>Gently mix the reaction by pipetting up and down and microfuge briefly.</li>
  <li>Incubation: 15°C overnight or room temperature (22°C) for 1 hour</li>
  <li>Heat inactivate at 65°C for 10 minutes.</li>
  <li>Use for transformation or store in the freezer!</li>
</ul>
 


<ul>
  <li>If you have more than one reaction, you can prepare a Mastermix</li>
  <li>Mix and centrifuge carefully.</li>
  <li>Incubate for 1h at 37°C.</li>
    <li>When you don't continue working with the digestion do a heat inactivation (temperature and durations    depends on used enzyme)</li>
  <li>After digestion you have to do a purification (PCR purification or gel purification)</li>
</ul>
              </div>
            </Collapsible>
            <Collapsible trigger="Protocol 6: Transformation">
              <div className="protocol">
                <h2>Transformation Protocol –<i>E. coli</i> </h2>

<ul>
  <li>Prechill 1.5 mL tube on ice </li>
  <li>Thaw a tube competent E. coli cells on ice for 10 minutes.</li>
  <li>mix competent cells gently</li>
  <li>Pipette 50 microL of the cells into the 1.5 mL tube</li>
  <li>Add 1-7 microL (containing 1 pg - 100 ng of plasmid) DNA to the cell mixture. </li>
  <li>Flick the tube 4-5 times to mix cells and DNA. </li>
  <li>Place the mixture on ice for 30 minutes </li>
  <li>Heat shock at exactly 42°C for exactly 60 seconds. </li>
  <li>Place on ice for 5 minutes. </li>
  <li>Pipette 950 microL of room temperature SOC into the mixture.</li>
  <li>Place at 37°C for 120 minutes and shake vigorously (800 rpm in thermo mix block)</li>
  <li>Warm selection plates to 37°C</li>
  <li>Mix the cells thoroughly by flicking the tube and inverting</li>
  <li>Spread 50-200 microL onto a selection plate and incubate overnight at 37°C.</li>
</ul>
              </div>
            </Collapsible>
            <Collapsible trigger="Protocol 7: Competent Cell">
              <div className="protocol">
                <h2>Chemical competent cells</h2>

<p>Before you start, be sure there is an overnight culture of the cells you want to make competent</p>

<p> preparation:</p>

<ul>
<li>Cool down centrifuge to 4°C</li>
<li>Prepare an ice-bucket</li>
<li>Prepare: 100 mM CaCl<sub>2</sub> (from 1M stock: 5 mL stock + 45mL H<sub>2</sub>O)</li>
<li>Prepare: 100 mM CaCl<sub>2</sub> 20% Glycerol (from 1M CaCl<sub>2</sub>-stock and 80% Glycerol-stock: 2,5 mL CaCL<sub>2</sub> + 6,25 mL Glycerol + 16,25 mL H<sub>2</sub>O)</li>
<li>Filter 100 mM CaCl<sub>2</sub> and 100 mM CaCl<sub>2</sub> 20% Glycerol steril and put them on ice</li>
<li>Label 55 eppendorf tubes and put them in the -80°C freezer for at least 1 hour</li>
<li>Put four 50 mL falcons on ice</li>
</ul>

  <p>    procedure:  </p>

<ul>
<li>Add 2 mL from the overnight culture to 200 mL DYT-medium and incubate them at 37°C and 350 rpm (LB-medium also works, but the incubation needs longer; make sure there is an antibiotic in the medium if needed)</li>
<li>Stop incubation when OD600nm is in the range between 0,2 and 0,5 (about 0,35 would be best; use only the medium to get the blank)</li>
<li>Split incubated solution into the  four cooled 50 mL falcons (make sure they all have  the same weight)</li>
<li>Centrifuge those 4 falcons at 4°C and 3000 g for 15 min</li>
<li>Discard the supernatants and resuspend each pellet in 2,5 mL 100 mM CaCl<sub>2</sub> (resuspend by gently pipetting up and down)</li>
<li>Merge the solutions, so you have two falcons left with the resuspension of two pellets in each falcon (you can do that while resuspending)</li>
<li>Put the two falcons on ice for 30min</li>
<li>Centrifuge the 2 falcons at 4°C and 3000 g for 15 min</li>
<li>Discard the supernatants and resuspend one pellet in 5 mL 100 mM CaCl<sub>2</sub> 20% Glycerol (resuspend by gently pipetting up and down)</li>
<li>Use this resuspension to resuspend the other pellet, so you have everything in one falcon</li>
<li>Aliquot 100 microL in each eppendorf tube and freeze them in the -80°C freezer immediately</li>
</ul>
              </div>
            </Collapsible>
            <Collapsible trigger="Protocol 8: Phusion PCR">
              <div className="protocol">
                <h2>  PCR (Phusion Polymerase)</h2>

<ul>
  <li>Prepare a PCR master mix:</li>
</ul>

<table className="tg">
  <tbody>
    <tr>
      <td className="tg-1wig"></td>
      <td className="tg-1wig">1 reaction</td>
    </tr>
    <tr>
      <td className="tg-1wig">Polymerase (5 u/microL)</td>
      <td className="tg-1wig">0,125 microL</td>
    </tr>
    <tr>
      <td className="tg-1wig"> 10 x Polymerase buffer</td>
      <td className="tg-1wig">2,5 microL</td>
    </tr>
    <tr>
      <td className="tg-1wig">Primer 1</td>
      <td className="tg-1wig">0,5 microL</td>
    </tr>
      <tr>
      <td className="tg-1wig">Primer 2</td>
      <td className="tg-1wig">0,5 microL</td>
    </tr>
      <tr>
      <td className="tg-1wig">dd water</td>
      <td className="tg-1wig">20,875 microL</td>
    </tr>
      <tr>
      <td className="tg-1wig">total volume</td>
      <td className="tg-1wig">25 microL </td>
    </tr>
</tbody>
</table>

<ul>
<li>Mix gently, avoid bubbles.</li>
<li>Aliquot the 25 microL of PCR master mix into each PCR tube.</li>
<li>Add 1 microL DNA into each tube</li>
</ul>

<ul>
  <li>Put the samples in the thermocycler with following conditions:</li>
</ul>

<table className="tg">
  <tbody>
    <tr>
      <td className="tg-1wig">initial denaturation</td>
      <td className="tg-1wig">1 cycle: 95 °C, 15 sec</td>
    </tr>
    <tr>
      <td className="tg-1wig">Denaturation</td>
      <td className="tg-1wig">30 - 40 cycles: 95 °C, 15 sec</td>
    </tr>
    <tr>
      <td className="tg-1wig"> Annealing</td>
      <td className="tg-1wig">30 - 40 cycles: 45 - 68 °C, 15 - 60 sec</td>
    </tr>
    <tr>
      <td className="tg-1wig">Extension</td>
      <td className="tg-1wig">30 - 40 cycles: 68 °C, 1 min per kb</td>
    </tr>
      <tr>
      <td className="tg-1wig">Final extension</td>
      <td className="tg-1wig">1 cycle: 68 °C, 5 min</td>
    </tr>
     </tbody>
</table>

              </div>
            </Collapsible>
            <Collapsible trigger="Protocol 9: Colony PCR">
              <div className="protocol">
                <h2>Colony PCR (Taq-Polymerase)</h2>
<ul>
<li>Prepare a PCR master mix:</li>
</ul>
<table className="tg">
<tbody>
<tr>
<td className="tg-1wig"> </td>
<td className="tg-1wig">1 reaction</td>
</tr>
<tr>
<td className="tg-1wig">DNTPs mix (10 mM)</td>
<td className="tg-1wig">0,5 microL</td>
</tr>
<tr>
<td className="tg-1wig">Polymerase (5 u/microL)r</td>
<td className="tg-1wig">0,125 microL</td>
</tr>
<tr>
<td className="tg-1wig">10 x Polymerase buffer</td>
<td className="tg-1wig">2,5 microL</td>
</tr>
<tr>
<td className="tg-1wig">Primer 1</td>
<td className="tg-1wig">0,5 microL</td>
</tr>
<tr>
<td className="tg-1wig">Primer 2</td>
<td className="tg-1wig">0,5 microL</td>
</tr>
<tr>
<td className="tg-1wig">dd water</td>
<td className="tg-1wig">10,875 microL</td>
</tr>
<tr>
<td className="tg-1wig">total volume</td>
<td className="tg-1wig">15 microL</td>
</tr>
</tbody>
</table>
<ul>
<li>pick colonies (prepare a masterplate) and transfer into the tubes and resuspend in 10 microL water with a pipette</li>
<li>Mix gently, avoid bubbles.</li>
<li>Aliquot 15 microL of PCR master mix into each PCR tube.</li>
</ul>
<ul>
<li>Put the samples in the thermocycler with following conditions:</li>
</ul>
<table className="tg">
<tbody>
<tr>
<td className="tg-1wig">initial denaturation</td>
<td className="tg-1wig">1 cycle: 95 °C, 60 sec</td>
</tr>
<tr>
<td className="tg-1wig">Denaturation</td>
<td className="tg-1wig">30 - 40 cycles: 95 °C, 15 secc</td>
</tr>
<tr>
<td className="tg-1wig">Annealing</td>
<td className="tg-1wig">30 - 40 cycles: 55 - 65 °C, 15 sec</td>
</tr>
<tr>
<td className="tg-1wig">Extension</td>
<td className="tg-1wig">30 - 40 cycles: 72 °C, 15 - 90 sec</td>
</tr>
<tr>
<td className="tg-1wig">Final extension</td>
<td className="tg-1wig">1 cycle: 72 °C, 5 min</td>
</tr>
</tbody>
</table>
<p> preparation Masterplate:</p>
<ul>
<li>you do a masterplate, so you have colonies with the right insert, after you checked it via cPCR (when you forget to do this, you know you did a successful ligation and trafo but destroyed all your colonies.)</li>
<li>to prepare a masterplate label a agar plate like a chessboard and then touch one zone with a colony you want to do a cPCR with. Label this zone, so you can remember which colony is their after you did the cPCR (so when the gel shows the right insert you have now colonies on the masterplate to do a miniprep with)</li>
<li>work semi sterile</li>
</ul>
              </div>
            </Collapsible>
            <Collapsible trigger="Protocol 10: Error-Prone PCR">
              <div className="protocol">
                <h2>Error-Prone PCR</h2>

<ul>
<li>Prepare 4 x epPCR buffer:</li>
</ul>
<table className="tg">
<tbody>
<tr>
<td className="tg-1wig">reagent</td>
<td className="tg-1wig">amount</td>
<td className="tg-1wig">concentration in buffer</td>
<td className="tg-1wig">final concentration in epPCR</td>
</tr>
<tr>
<td className="tg-1wig">KCl</td>
<td className="tg-1wig">7,455 g</td>
<td className="tg-1wig">200 mM</td>
<td className="tg-1wig">50 mM</td>
</tr>
<tr>
<td className="tg-1wig">Tris-HCl (pH 8,3)</td>
<td className="tg-1wig">2,42 g</td>
<td className="tg-1wig">40 mM</td>
<td className="tg-1wig">10 mM</td>
</tr>

</tbody>
</table>

<ul>
  <li>Prepare epPCR master mix with the given concentrationson ice, add the Polymerase as the last step:</li>
</ul>

<table className="tg">
<tbody>
<tr>
  <td className="tg-1wig">reagent</td>
  <td className="tg-1wig">concentration per reaction</td>
  <td className="tg-1wig">volume</td>
</tr>
  <tr>
  <td className="tg-1wig">Buffer (4 x)</td>
  <td className="tg-1wig">see above</td>
  <td className="tg-1wig">25 microL</td>
</tr>
<tr>
  <td className="tg-1wig">DNA</td>
  <td className="tg-1wig">20 fmol</td>
  <td className="tg-1wig"></td>
</tr>
<tr>
  <td className="tg-1wig">Primer 1</td>
  <td className="tg-1wig">30 pmol</td>
  <td className="tg-1wig"></td>
</tr>
<tr>
  <td className="tg-1wig">Primer 2</td>
  <td className="tg-1wig">30 pmol</td>
  <td className="tg-1wig"></td>
</tr>
<tr>
  <td className="tg-1wig">MgCl<sub>2</sub> (20 mM)</td>
  <td className="tg-1wig">7 mM</td>
  <td className="tg-1wig">35 microL</td>
</tr>
  <tr>
    <td className="tg-1wig">MnCl<sub>2</sub> (5 mM)</td>
  <td className="tg-1wig">0,5 mM</td>
  <td className="tg-1wig">10 microL</td>
</tr>
  <tr>
  <td className="tg-1wig">Polymerase</td>
  <td className="tg-1wig">5 U</td>
  <td className="tg-1wig"></td>
</tr>
  <tr>
  <td className="tg-1wig">dATP</td>
  <td className="tg-1wig">0,2 mM</td>
  <td className="tg-1wig">1 microL</td>
</tr>
<tr>
  <td className="tg-1wig">dTTP</td>
  <td className="tg-1wig">1 mM</td>
  <td className="tg-1wig">5 microL</td>
</tr>
  <tr>
  <td className="tg-1wig">dGTP</td>
  <td className="tg-1wig">0,2 mM</td>
  <td className="tg-1wig">1 microL</td>
</tr>
  <tr>
  <td className="tg-1wig">dCTP</td>
  <td className="tg-1wig">1 mM</td>
  <td className="tg-1wig">5 microL</td>
</tr>
    <tr>
  <td className="tg-1wig">water</td>
  <td className="tg-1wig"></td>
  <td className="tg-1wig">up to 100 microL</td>
</tr>
    <tr>
  <td className="tg-1wig">tota volume</td>
  <td className="tg-1wig"></td>
  <td className="tg-1wig">100 microL</td>
</tr>
</tbody>
</table>

<ul>
   <li>Put your sample in the thermocycler with following conditions:</li>
</ul>

  <table className="tg">
 <tbody>
<tr>
  <td className="tg-1wig">Denaturation</td>
  <td className="tg-1wig">30 cycles: 94 °C, 60 sec</td>
</tr>
<tr>
  <td className="tg-1wig">Annealing</td>
  <td className="tg-1wig">30 cycles: 45 °C, 60 sec</td>
</tr>
<tr>
  <td className="tg-1wig">Extension</td>
  <td className="tg-1wig">30 cycles: 72 °C, 1 min</td>
</tr>

</tbody>
</table>



              </div>
            </Collapsible>
            <Collapsible trigger="Protocol 11: Gel Electrophoresis">
              <div className="protocol">
                <h2>Gel Electrophoresis</h2>

<p>
  1. Preparationn of 1 x TAE:</p>
<ul>
   <li> 0,5 M EDTA Stock solution
        <ol>
          <li>Take a 500 mL bottle</li>
          <li>Add 93,05 g EDTA disodium salt (MW = 372,24g/mol)</li>
          <li>Add 400 mL dH<sub>2</sub>O</li>
           <li>Adjust to pH 8.0</li>
      <li>Add dH2O to 500 mL</li>
      <li>Autoclave</li>
    </ol>     
  </li>
  <li> 50X TAE – Buffer
      <ol>
          <li>Take a 1 L bottle</li>
      <li>Add 242 g TRIS–base (MW = 121,14 g/mol)</li>
      <li>Dissolve in 700 mL dH<sub>2</sub>O</li>
      <li>Add 57,1 mL 100 % glacial acid (or acetic acid)</li>
      <li>Add 100 mL 0,5 M EDTA stock</li>
      <li>Add dH<sub>2</sub>O to 1 L</li>
      <li>pH should be about 8.5</li>
      <li>Store at room temperature</li>
        </ol>
  </li>
 <li>Prepare 1 X TAE working solution
      <ol>
          <li>Add 20 mL 50 X TAE – Buffer to a beaker</li>
        <li>Add 1 L dH<sub>2</sub>O</li>
        </ol>
  </li> 
</ul>

<p>   2. Preparing the gel</p>

<ul>
<li>Weigh 1 g Agarose into a 150 mL flask</li>
<li>Fill up to 100 mL with TAE–buffer</li>
<li>Microwave until the agarose completed dissolved</li>
<li>Cool down to approximately 50 °C</li>
<li>Add 5 microL GelRed</li>
<li>Pour to gel into a gel tray</li>
<li>Put in the comb you need</li>
<li>Let the gel solidify</li>
</ul>

<p>
3. Loading Samples and Running an Agarose Gel:  
</p>

<ul>
<li>Add loading buffer to each of your samples.</li>
<li>place the agarose gel into the gel box (electrophoresis unit).</li>
<li>Fill gel box with 1xTAE until the gel is covered.</li>
<li>Carefully load a molecular weight ladder into the first lane of the gel.</li>
<li>Carefully load your samples into the additional wells of the gel.</li>
<li>Run the gel at 80 V until the dye line is approximately 75-80% of the way down the gel</li>
<li>Turn OFF power, disconnect the electrodes from the power source, and then carefully remove the gel from the gel box.</li>
<li>Using any device that has UV light, visualize your DNA fragments.</li>
</ul>

<p>4. Analysing the gel:</p>
<p>Using the DNA ladder in the first lane as a guide (the manufacturer's instruction will tell you the size of each band), you can interpret the bands that you get in your sample lanes to determine if the resulting DNA bands that you see are as expected or not. </p>

              </div>
            </Collapsible>
            <Collapsible trigger="Protocol 12: Gel and  PCR Purification">
              <div className="protocol">
                <h2>Gel and  PCR Purification </h2>

<ul>
  <li>Dissolving a Gel Slice</li>
      <ol>
          <li> Excise DNA band from gel and place gel slice in a 1,5 mL microcentrifuge tube.</li>
      <li>Add 10 microL Membrane Binding Solution per 10 mg of gel slice. Incubate at 50 - 65°C until gel slice is completely dissolved.(shake for faster melting process)</li>
  </ol>
  <li>Processing PCR amplifications</li>
    <ol>
       <li>Add an equal volume of Membrane Binding Solution to the PCR amplification.</li>
    </ol>
  <li>Binding of DNA</li>
   <ol>
       <li>Insert SV Minicolumn into Collection Tube.</li>
    <li>Transfer dissolved gel mixture or prepared PCR product to the Minicolumn assembly.</li>         <li>Incubate at room temperature for 1 minute.</li>
    <li>Centrifuge at 16,000 × g for 1 minute. Discard flow through and reinsert Minicolumn into the Collection Tube.</li>
  </ol>
<li>Washing</li>
      <ol>
           <li>Add 700 microL Membrane Wash Solution (ethanol added). Centrifuge at 16,000 × g for 1 minute. Discard flowthrough and reinsert Minicolumn into Collection Tube.</li>
    <li>Repeat Step 4 with 500 microL Membrane Wash Solution. Centrifuge at 16,000 × g for 5  minutes.</li>
    <li>Empty the Collection Tube and transfer Minicolumn to a clean 1.5 mL eppendorf tube. Wait until  every residual ethanol is evaporated.</li>
        </ol>
<li>Elution</li>
    <ol>
              <li>Add up to 50 microL of Nuclease-Free Water to the Minicolumn. Incubate at room temperature for 1 minute. Centrifuge at 16,000 × g for 1 minute</li>
            <li>Discard Minicolumn and store DNA at 4°C or - 20°C (check concentration via Nanodrop)</li>
       </ol> 
  
</ul>

              </div>
            </Collapsible>
            <Collapsible trigger="Protocol 13: Miniprep">
              <div className="protocol">
              <h2>Miniprep</h2>

<p>Production of Cleared Lysate</p>
<ul>
<li>Harvest 1-10 mL of overnight culture and centrifuge it for 5 minutes at maximum speed.</li>
<li>Pour off the supernatant</li>
<li>Thoroughly resuspend pellet with 250 microL of Cell Resuspension Solution.</li>
<li>Add 250 microL of Cell Lysis Solution to each sample; invert 4 times to mix.</li>
<li>Incubate at room temperature until cell suspension clears (about 5 min)</li>
<li>Add 10 microL of Alkaline Protease Solution; invert 4 times to mix. Incubate 5 minutes at room temperature.</li>
<li>Add 350 microL of Neutralization Solution; invert 4 times to mix.</li>
<li>Centrifuge at maximum speed for 10 minutes at room temperature.</li>
</ul>
<p>Binding of Plasmid DNA</p>
<ul>
<li>Insert Spin Column into Collection Tube.</li>
<li>Decant cleared lysate into Spin Column.</li>
<li>Centrifuge at top speed for 1 minute at room temperature. Discard flowthrough, and reinsert Column into Collection Tube.</li>
</ul>
<p>Washing</p>
<ul>
<li>Add 750 microL of Wash Solution (ethanol added). Centrifuge at maximum speed for 1 minute. Discard flowthrough and reinsert column into Collection Tube.</li>
<li>Add 250 microL of Wash Solution (ethanol added). Centrifuge at maximum speed for 1 minute. Discard flowthrough and reinsert column into Collection Tube.</li>
</ul>
<p>Elution</p>
<ul>
<li>Transfer Spin Column to a sterile 1,5 mL microcentrifuge tube, being careful not to transfer any of the Column Wash Solution with the Spin Column. If the Spin Column has Column Wash Solution associated with it, centrifuge again for 1 minute at top speed, then transfer the Spin Column to a new, sterile 1,5 microL microcentrifuge tube.</li>
<li>Add up to 100 microL of Nuclease-Free Water to the Spin Column. Centrifuge at top speed for 1 minute at room temperature.</li>
<li>Discard column, and store DNA at -20 °C or below.</li>
  </ul>

              </div>
            </Collapsible>
            <Collapsible trigger="Protocol 14: pNP- Ester hydrolyses assay">
              <div className="protocol">
              <h2>pNP- Ester hydrolyses assay</h2>

<p><ul>-  Prepare the solutions, that you need for this screening step, follow this recipe:</ul></p>
<p><ul>-  pNP ester solution: 
<ul><li>  Mix 8,4 mL isopropanol with 2,1 mL acetonitrile </li></ul>
<ul><li>  Weigh in 0,0532 g pNP ester </li></ul>
<ul><li>  Dissolve in 5 mL of solvent mixture</li></ul>
<ul><li>  Fill up to 7 mL with solvent mixture</li></ul>
<ul><li>  Store in the fridge for about 1 week</li></ul></ul></p>

<p><ul>-  buffer solution:
<ul><li>  Weigh in 0,38 g glycine and 0,04 g NaOH</li></ul>
<ul><li>  Dissolve in 80 mL MilliQ H2O</li></ul>
<ul><li>  Add 100 µL of a 1M CaCl2 solution </li></ul>
<ul><li>  Add 3 mL of a 10% Triton X-100 solution</li></ul>
<ul><li>  Fill up to 100 mL </li></ul>
<ul><li>  Store in fridge</li></ul></ul></p>

<p><ul>-  pNP solution:
<ul><li>  Mix 8,4 mL isopropanol with 2,1 mL acetonitrile </li></ul>
<ul><li>  Weigh in 0,0532 g pNP</li></ul>
<ul><li>  Dissolve in 5,6 mL of solvent mixture</li></ul>
<ul><li>  Fill up to 7 mL with solvent mixture</li></ul>
<ul><li>  Store in the fridge for about 1 week</li></ul></ul></p>

<p>- Prepare lysis buffer:</p>
 <table className="tg">
   
   <tr>
     <td className="tg-1wig"> </td>
     <td className="tg-1wig">needed concentration </td>
     <td className="tg-1wig"> Volume (take from stock solution)</td>
   </tr>
   <tr>
     <td className="tg-1wig">Tris-HCl (pH 8,5 adjusted at 30°C) </td>
     <td className="tg-1wig"> 50 mM </td>
     <td className="tg-1wig"> 10 mL </td>
   </tr>
   <tr>
     <td className="tg-1wig"> NaCl </td>
     <td className="tg-1wig">100 mM</td>
     <td className="tg-1wig">10 mL</td>
   </tr>
  <tr>
      <td className="tg-1wig"> EDTA (just solving at pH8)</td>
      <td className="tg-1wig"> 1 mM </td>
      <td className="tg-1wig"> 12 mL </td>
   </tr>
   <tr>
     <td className="tg-1wig">PMSF</td>
     <td className="tg-1wig"> 1 mM</td>
     <td className="tg-1wig"> 0,05 mL </td>
   </tr>
   <tr>
     <td className="tg-1wig"> Triton X-100</td>
     <td className="tg-1wig"> 0,5 % (v/v)</td>
     <td className="tg-1wig"> 12,5 mL </td>
  </tr>
   <tr> 
     <td className="tg-1wig"> water </td>
     <td className="tg-1wig"> </td>
     <td className="tg-1wig"> 454,95 mL </td>
   </tr>  
  </table>

<p><ul>-  check if the bacteria grew</ul>
<ul>- Prepare crude enzyme extract </ul>
<ul>- Add 400 µL lysis buffer to 200 µL culture </ul>
<ul>- Mix a few times</ul>
<ul>- Centrifuge in Eppendorf-tubes at 4°C at 15000g for 15 min</ul></p>

<p><ul>-  Prepare the crude-enzyme extract for the mutants:
<ul><li>  Put 0,75 mL LB + Amp to each well</li></ul>
<ul><li>  Inoculate from 96-deep-well plate</li></ul>
<ul><li>  Let it grow a few hours</li></ul>
<ul><li>  Check if all the cultures have roughly the same OD</li></ul>
<ul><li>  Add 0,75 mL lysis buffer into the wells</li></ul>
<ul><li>  Mix it by pipetting up and down a few times</li></ul>
<ul><li>  Incubate it at 4 °C for 4 hours</li></ul>
<ul><li>  Centrifuge the 96-well-plates at 4 °C at 15000 g for 15 min</li></ul></ul></p>

<p><ul>-  Put the solutions in a water bath (or thermoblock) at 60 °C, until they become transparent</ul></p>
<p><ul>-  Let the solution cool down a few minutes (on ice)</ul></p>
<p><ul>-  Add 205 µL buffer solution into each well </ul></p>
<p><ul>-  Add 25 µL of pNP-ester-solution into each well apart from the positive controls</ul></p>
<p><ul>-  Add 20 µL crude enzyme extract</ul></p>
<p><ul>-  Measure absorbance at 410 nm</ul></p>
<p><ul>-  Put the plate into a PCR machine at 40°C for 30 min </ul></p>
<p><ul>-  Stop reaction by addition of 82,5 µL chilled acetone:ethanol mixture (1:1) into each well</ul></p>
<p><ul>-  Cool down the plate reader to room temerature</ul></p>
<p><ul>-  Measure absorbance at 410 nm in plate reader</ul></p>

              </div>
            </Collapsible>
            <Collapsible trigger="Protocol 15: Buffer and Media">
              <div className="protocol">
              <h2>Buffer and Media</h2>

<p>LB medium</p>
<p><ul>-  Add to a 1 L:
<ul><li>  10 % tryptone peptone</li></ul>
<ul><li>  5 % yeast</li></ul>
<ul><li>  10 % NaCl</li></ul>
<ul><li>  Everything was diluted in milliQ-water</li></ul></ul>
<ul>- Autoclave it</ul></p>


<p>LB-agar</p>
<p><ul>-  Add to a 1 L bottle:
<ul><li>  15 % agar</li></ul>
<ul><li>  10 % bacto-tryptone</li></ul>
<ul><li>  5 % yeast extract</li></ul>
<ul><li>  10 % NaCl</li></ul>
<ul><li>  Everything was diluted in milliQ-water</li></ul></ul>
- Autoclave it</p>


<p>SOC medium</p>
<p><ul>- Add to a 1 L bottle
<ul><li>  Add 20 g Bacto – tryptone</li></ul>
<ul><li>  Add 5 g Bacto – yeast extract</li></ul>
<ul><li>  Add 0,5 g NaCl</li></ul>
<ul><li>  Add 2,5 mL KCl (1 M)</li></ul>
<ul><li>  Add milliQ-water to 1 L</li></ul>
<ul><li>  Adjust to pH 7.0 (NaOH)</li></ul></ul>
<ul>- Autoclave</ul>
<ul>- Add 20 mL glucose (1 M) immediately before use</ul></p>


<p>EDTA (0,5 M)</p>
<ul>- Dissolve 18,6% Na<sub>2</sub>EDTA in NaOH.</ul>



<p>TAE - Buffer</p>
<p>1) 0,5 M EDTA Stock solution</p>
<p><ul>-  Take a 500 mL bottle
<ul><li>  Add 93,05 g EDTA disodium salt (MW = 372,24 g/mol)</li></ul>
<ul><li>  Add 400 mL milliQ-water </li></ul>
<ul><li>  Adjust to pH 8.0</li></ul>
<ul><li>  Add milliQ-water to 500 mL</li></ul></ul>
<ul>- Autoclave</ul></p>

<p>2) 50 X TAE – Buffer</p>
<p><ul>-  Take a 1 L bottle
<ul><li>  Add 242 g TRIS – base (MW = 121,14 g/mol)</li></ul>
<ul><li>  Dissolve in 700 mL milliQ-water</li></ul>
<ul><li>  Add 57,1 mL 100 % glacial acid (or acetic acid)</li></ul>
<ul><li>  Add 100 mL 0,5 M EDTA stock</li></ul>
<ul><li>  Add milliQ-water to 1 L</li></ul></ul>
<ul>- pH should be about 8.5</ul>
<ul>- Store at RT</ul></p>

<p>3) Prepare 1 X TAE working solution</p>
<p><ul>-  Add 20 mL 50 X TAE – Buffer to a beaker</ul>
<ul>- Add 1 L milliQ-water</ul></p>

              </div>
            </Collapsible>
  	  	  </div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Experiments;