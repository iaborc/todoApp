import React from 'react';
import {Task} from "./task";

export const TaskList = ({todos}) => {
    const elements = todos.map((task) => {
        return <Task  taskData = {task} key = {task.key} />;
    });
  return (
      <ul className="todo-list">
          {elements}
      </ul>
  );
};