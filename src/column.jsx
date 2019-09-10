import React from "react";
import styled from "styled-components";
import Task from "./task";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 3px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  background-color: #818181;
  height: 50px;
  padding: 12px;
  color: white;
  font-weight: bold;
  
`;

const Counter = styled.div`
  width: 20%;
  height: 85%;
  background-color: white;
  color: black;
  text-align: center;
  float: right;
  margin: 5px 10px;
  position: relative;
  font-size: 14px;
  font-weight: bold;
  padding-top: 2px;
`;

const TaskPara = styled.p`
  text-align: center;
  font-size: 10px;
  font-weight: lighter;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;

export default class Column extends React.Component {
  render() {
     const statusVals = (Object.entries(this.props.status).map((key,value) => this.props.status[value]))
    const statusLiteral = this.props.tasks.map(task => { return statusVals[task.status] });
    const count = Object.keys(this.props.tasks).length;
    return (
      <Container>
        <Title>
          {this.props.column.title}
          <Counter>
            {count}
            <TaskPara>TASKS</TaskPara>
          </Counter>
        </Title>

        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
