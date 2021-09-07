import React from 'react';
import {Task} from "./task";

export const TaskList = ({todos, onCompleted, onDeleted }) => {
    const elements = todos.map((task) => {
        return <Task  taskData = {task} key = {task.key} onCompleted = {onCompleted} onDeleted = {onDeleted}/>;
    });
  return (
      <ul className="todo-list">
          {elements}
      </ul>
  );
};