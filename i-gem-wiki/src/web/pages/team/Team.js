import React, { useCallback, useState, useRef} from 'react'
import { useSpring, useTransition, animated as a} from 'react-spring'
import CustomScrollbar from 'components/CustomScrollbar';
import BackgroundImage from 'components/BackgroundImage';
import Sponsors from "components/Sponsors";
import useMeasure from 'utils/useMeasure'
import useMedia from 'utils/useMedia'
import teamData from 'data/teamData'
import './Team.css'

function ToggleButton(props) {
  const [isToggled, setToggle] = useState(false)
  function toggle(){
    setToggle(!isToggled)
    props.onToggle(isToggled, props.name)
  }
  let toggleClass = isToggled ? 'toggled': ''
  return (
    <span className={"butn noselect " + toggleClass} onClick={toggle}>
      {props.name[0].toUpperCase() + props.name.slice(1)}
    </span>
  )
}
function Card(props){
  const [height, setHeight] = useState(0)
  const ref = useRef(null)
  if(ref.current !== null){
    if(ref.current.clientHeight !== height){
      setHeight(ref.current.clientHeight)
      props.onHeightChange(props.item.id,ref.current.clientHeight)  
    }
  }
  
  return(
    <a.div ref={ref} className="team-card" style={{boxShadow:props.boxShadow}}>
      <img src={props.item.image} alt={props.item.name+" Face"}></img>
      <h3> {props.item.name} </h3>
      
      {props.item.tags.map( (tag,key) => (
        <span key={key} className="team-tag noselect">{tag[0].toUpperCase() + tag.slice(1)}</span>
      ))}
      <blockquote className="quote">{props.item.quote}</blockquote>
      <p> {props.item.text} </p>
      <div className="team-quote" style={{background:'green'}}></div>
      <div className="team-text" style={{background:'orange'}}></div>
    </a.div>

  )
}

for (var i = 0; i < teamData.length; i++) {
  teamData[i].id = i
}
function TeamGrid() {
  const columns = useMedia(['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [4, 3, 2], 1)
  const [bind, { width }] = useMeasure()
  const [data, setData] = useState(teamData)
  const [items, setItems] = useState(data)
  const [tags, setTags] = useState([])
  const [changedHeight, setChangedHeight] = useState(true)
  function selectItems(isToggled, name) {
    let currentTags = []
    if (!isToggled){
      let added = tags.concat([name])
      currentTags = added
      setTags(added)
    }else{
      let removed = tags.filter(v => v !== name); 
      currentTags = removed
      setTags(removed)
    }
    updateItems(currentTags,true)
  }
  function updateItems(currentTags,updateTags){
    
    function hasTags(itemTags){
      return currentTags.every( val => itemTags.includes(val));
    }
    if (updateTags || changedHeight) {
      setChangedHeight(false)
      let res = []
      for (var i = 0; i < data.length; i++) {
        if (currentTags.length === 0){
          res.push(data[i])
        }else if (hasTags(data[i].tags)){
          res.push(data[i])
        }
      }
      setItems(res)  
    }
  }
  
  function updateHeight(id, height){
    data[id].height = height + 30
    setData(data)
    setChangedHeight(true)
    clearTimeout()
    setTimeout(()=> updateItems(tags,false),1000)
  }
  function hasTags(itemTags){
    return tags.every( val => itemTags.includes(val));
  }
  let heights = new Array(columns).fill(0) // Each column gets a height starting with zero
  let gridItems = items.filter(item =>hasTags(item.tags)).map((child, i) => {
    const column = heights.indexOf(Math.min(...heights)) // Basic masonry-grid placing, puts tile into the smallest column using Math.min
    const xy = [(width / columns) * column, (heights[column] += child.height) - child.height ] // X = container width / number of columns * column index, Y = it's just the height of the current column
    return { ...child, xy, width: width / columns, height: data[child.id].height}
  })
  
  // This turns gridItems into transitions, any addition, removal or change will be animated
  //box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  const transitions = useTransition(gridItems, item => item.id, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0, boxShadow:'0 0px 0px rgba(0,0,0,0), 0 0px 0px rgba(0,0,0,0)'}),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1, boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { opacity:0, boxShadow:'0 0px 0px rgba(0,0,0,0), 0 0px 0px rgba(0,0,0,0)'},
    config: { mass: 1, tension: 700, friction: 100 },
    trail: 0
  })
  return (
    <div {...bind} className="list" style={{ height: Math.max(...heights) }}>
      <ToggleButton name="invitro" onToggle={selectItems}/>
      <ToggleButton name="insilico" onToggle={selectItems}/>
      <ToggleButton name="lead" onToggle={selectItems}/>
      <ToggleButton name="human practice" onToggle={selectItems}/>
      <ToggleButton name="web" onToggle={selectItems}/>
      {transitions.map(({ item, props: { xy,boxShadow,...rest }, key }) => (
        <a.div key={key} style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`), ...rest}}>
          <Card item={item} boxShadow={boxShadow} onHeightChange={updateHeight}/>
        </a.div>
      ))}
    </div>
  )
}
function Team() {
  const [{ scroll, xy }, set] = useSpring(() => ({ scroll: 0, xy: [0, 0] }))
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(e => set({ scroll: (e.target.scrollTop) }), [set])

  return (
    <div className="page" onMouseMove={onMove} onScroll={onScroll}>
      <CustomScrollbar>
        <BackgroundImage scroll={scroll} xy={xy} title="Team Members" src="https://2019.igem.org/wiki/images/3/3a/T--Potsdam--group_picture.jpg"/>
        <div className="main-content">
          <div className= "page-text">
            <h1> It's all about teamwork - iGEM Potsdam 2019   </h1>

            <p> <b> In Germany, there is the acronym - "TEAM: Toll Ein Anderer macht's" which means as much as "Great, there is another person
            who can do this stuff, so, I don't care."</b></p>

            <p>Finding team members and bringing them together as a team is one of the first milestones in the iGEM project.
            In the beginning, we were several students of which most don't know each other, who should work together for several months.
            Within the month we weren't just students with the same passion: TherMal.UP. We also became friends and created a great
            working spirit which leads to helping hands whenever you face a problem. </p>

            <p> If you want to know some more about our 20 student members from different study backgrounds such as Bioscience,
            Computer Science and Informatics as well as about our team building activities, you will find some pictures and information
            e.g. a quote from everyone on the next page.</p>

            <p> We also got great support from our supervisors as Prof. Dr. Chianti, Prof. Dr. Wendler and her working group and the working group
            from Dr. Bidan. </p>
          </div>
          <TeamGrid/>
        </div>
        <Sponsors/>
      </CustomScrollbar>
    </div>
  );
}
 
export default Team;
