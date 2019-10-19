import React, { useCallback } from 'react'
import { useSpring } from 'react-spring'
import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import Sponsors from "components/Sponsors";

function Notebook() {
  const [{ scroll, xy }, set] = useSpring(() => ({ scroll: 0, xy: [0, 0] }))
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(e => set({ scroll: (e.target.scrollTop) }), [set])
  return (
  <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <CustomScrollbar>
        <BackgroundImage scroll={scroll} xy={xy} title="Notebook" src="https://2019.igem.org/wiki/images/3/3a/T--Potsdam--group_picture.jpg"/>
        <div className="main-content">
          <div>
          	<h1>asdf</h1>
          	<p> asdfasdf</p>
          </div>
        <div className="page-text">
	  	  </div>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Notebook;