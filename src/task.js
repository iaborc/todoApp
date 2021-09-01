import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export const Task = ({taskData}) => {
  return (
    <li className={taskData.status}>
        <div className="view">
            <input className="toggle" type="checkbox" />
            <label>
                <span className="description">{taskData.name}</span>
                <span className="created">
                    created {formatDistanceToNow(taskData.time, {includeSeconds: true})} ago
                </span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy"></button>
        </div>
        {taskData.editing && <input type="text" className="edit" defaultValue={taskData.name} />}
    </li>
  );
};