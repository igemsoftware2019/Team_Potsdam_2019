import React, { Component, useState} from 'react'
import { useTransition, animated as a} from 'react-spring'
import CustomScrollbar from 'components/CustomScrollbar';
import useMeasure from 'utils/useMeasure'
import useMedia from 'utils/useMedia'
import data from 'data/teamData'
import './Team.css'

function ToggleButton(props) {
  const [isToggled, setToggle] = useState(false)
  function toggle(){
    setToggle(!isToggled)
    props.onToggle(isToggled, props.name)
  }
  let toggleClass = isToggled ? 'toggled': ''
  return (
    <span className={"butn " + toggleClass} onClick={toggle}>
      {props.name[0].toUpperCase() + props.name.slice(1)}
    </span>
  )
}

function TeamGrid() {
  const columns = useMedia(['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [5, 4, 3], 2)
  const [bind, { width }] = useMeasure()
  const [items, setItems] = useState(data)
  const [tags, setTags] = useState([])
  //const [filteredItems, setFilteredItems] = useState(data)
  //useEffect(() => {setItems(items)}, [items])
  let heights = new Array(columns).fill(0) // Each column gets a height starting with zero
  let gridItems = items.map((child, i) => {
    const column = heights.indexOf(Math.min(...heights)) // Basic masonry-grid placing, puts tile into the smallest column using Math.min
    const xy = [(width / columns) * column, (heights[column] += child.height / 2) - child.height / 2] // X = container width / number of columns * column index, Y = it's just the height of the current column
    return { ...child, xy, width: width / columns, height: child.height / 2 }
  })
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
    function hasTags(tags){
      return currentTags.every( val => tags.includes(val));
    }
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
  
  // This turns gridItems into transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, item => item.css, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 0
  })
  return (
    <div {...bind} className="list" style={{ height: Math.max(...heights) }}>
      <ToggleButton name="web" onToggle={selectItems}/>
      <ToggleButton name="invitro" onToggle={selectItems}/>
      <ToggleButton name="insilico" onToggle={selectItems}/>
      {transitions.map(({ item, props: { xy, ...rest }, key }) => (
        <a.div key={key} style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`), ...rest }}>
          <div style={{ background: item.css }}>
          </div>
        </a.div>
      ))}
    </div>
  )
}


class Team extends Component {
  render() {
    return (
      <div className="Team">
        <CustomScrollbar>
          <h2>Team Members</h2>
          <TeamGrid/>
        </CustomScrollbar>
      </div>
    );
  }
}
 
export default Team;