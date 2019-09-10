import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Column from "./column";

const Container = styled.div`
  display: flex;
`;

const TotalCard = styled.div`
  width: 7%;
  height: 85%;
  background-color: white;
  color: black;
  text-align: center;
  margin-right: 10px;
  float: right;
  position: relative;
  font-size: 14px;
  font-weight: bold;
  padding-top: 10px;
`;

const TextPara = styled.p`
  text-align: center;
  font-size: 10px;
  font-weight: lighter;
`;

const CreateInput = styled.input`
  width: 10%;
  font-size: 22px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  border: none;
  outline-color: darkgrey;
  box-shadow: 0 2px 4px grey;
  align-self: center;
  margin-left: 10px;
`;

const HeaderSpan = styled.div`
height: 30px;
`;

class App extends React.Component {
  state = initialData;

  //   onDragStart = () => {
  //     document.body.style.color = "orange";
  //   };

  handleInputChange = event => {
    event.preventDefault();
    const { value } = event.target;  
  };

  onDragUpdate = update => {
    const destination = update;
    const { index } = destination;
    const opacity = destination
      ? index / Object.keys(this.state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  onDragEnd = result => {
    document.body.style.color = "inherit";
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
      return;
    }

    // Moving from one list to another

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.setState(newState);
  };

  render() {
    const statusVal = this.state.MAP_STATUS;
    return (
      <div>
        <HeaderSpan />
        <CreateInput type="text" 
          onChange={this.handleInputChange} />
        <TotalCard>
          {Object.keys(this.state.tasks).length}
          <TextPara>TASKS</TextPara>
        </TotalCard>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
        >
          <Container>
            {this.state.columnOrder.map((columnId, index) => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(
                taskId => this.state.tasks[taskId]
              );
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                  status={statusVal}
                />
              );
            })}
          </Container>
        </DragDropContext>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
