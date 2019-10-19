import React from 'react'
import { useSpring, animated as a, interpolate} from 'react-spring'
import './backgroundImage.css';
function BackgroundImage(props) {
  const interpScroll = interpolate([props.scroll,props.xy], (scroll,xy) => `translate(0px, ${scroll/3}px)`)
  const transitionMouse = interpolate([props.scroll,props.xy], (scroll, xy) =>  `perspective(600px) rotateX(${-xy[1]/400}deg) rotateY(${xy[0]/500}deg) scale(${1})`)
  const fadeIn = useSpring({from:{opacity: 0}, to:{opacity: 1},config: { duration: 1500 }})

  return (
    <a.div className="page-header" style={{ transform: interpScroll }}>
      <h1>{props.title}</h1>
      <a.div className="background-image" style={{ transform: transitionMouse}}>
        <a.img src={props.src} alt="" style={fadeIn}></a.img>
      </a.div>
    </a.div>
  )
}
export default BackgroundImage;
