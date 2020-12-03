import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";
import './index.scss'
const item = {
  id: v4(),
  name: "test 1"
}

const item2 = {
  id: v4(),
  name: "test2"
}
export const App = () => {
  const [state, setState] = useState({
    "open": {
      title: "Open",
      items: [item, item2]
    },
    "todo": {
      title: "Todo",
      items: []
    },
    "in-progress": {
      title: "In Progress",
      items: []
    },
    "done": {
      title: "Done",
      items: []
    }
  })
  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)


      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }
  return (
<section class="hero">
      <div className="hero-head">
          <header class="navbar has-background-white">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item">
                <img src="https://www.allocloud.com/sites/default/files/2017-06/ALLOcloud_Vertical_PNG.png" alt="Logo"/>
              </a>
              <span class="navbar-burger burger" data-target="navbarMenuHeroC">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            
          </div>
        </header>
      </div>
        
      <div className="hero-body">
          
      <div className="columns is-desktop"> 

      
        <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return(
            <div key={key} className={"card column m-1"}>
              <header class="card-header">
                  <p class="card-header-title">
                  {data.title}
                  </p>
              </header>
            
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"card-content"}
                    >
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                              console.log(snapshot)
                              return(
                                <div
                                  className="notification m-1 is-link"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
      </div>
      </div>
    </section>
  )
}



ReactDOM.render(
<App />
,
document.getElementById('root')
);


