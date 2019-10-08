import React from 'react'
import { animated as a, interpolate} from 'react-spring'
import './backgroundImage.css';
function BackgroundImage(props) {
  const interpScroll = interpolate([props.scroll,props.xy], (scroll,xy) => `translate(0px, ${scroll/3}px)`)
  const transitionMouse = interpolate([props.scroll,props.xy], (scroll, xy) =>  `perspective(600px) rotateX(${-xy[1]/400}deg) rotateY(${xy[0]/500}deg) scale(${1})`)

  return (
    <a.div className="page-header" style={{ transform: interpScroll }}>
      <h1>{props.title}</h1>
      <a.div className="background-image" style={{ transform: transitionMouse }}>
        <img src={props.src} alt=""></img>
      </a.div>
    </a.div>
  )
}
export default BackgroundImage;
