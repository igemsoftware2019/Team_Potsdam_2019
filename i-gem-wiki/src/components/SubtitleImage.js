import React from 'react'
import { useSpring, animated as a} from 'react-spring'
import './subtitleImage.css';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x/4}deg) rotateY(${y/4}deg) scale(${s})`

function SubtitleImage(props) {

  const [position, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  const fadeIn = useSpring({from:{opacity: 0}, to:{opacity: 1},config: { duration: 1500 }})

  return (
    <a.div className="subtitle-container">
      <a.div className="subtitle-image" align="center" onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ width: props.width, transform: position.xys.interpolate(trans)}}>
        <a.img src={props.src} alt="" style={fadeIn}></a.img>
      </a.div>
      <p className="subtitle">{props.subtitle}</p>
    </a.div>
  )
}
export default SubtitleImage;
