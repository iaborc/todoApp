import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export const Task = ({taskData, onCompleted, onDeleted }) => {
  return (
    <li className={taskData.status}>
        <div className="view">
            <input className="toggle" type="checkbox" />
            <label>
                <span className="description" onClick={() => onCompleted(taskData.key)}>{taskData.name}</span>
                <span className="created">
                    created {formatDistanceToNow(taskData.time, {includeSeconds: true})} ago
                </span>
            </label>
            <button className="icon icon-edit" />
            <button className="icon icon-destroy" onClick={() => onDeleted(taskData.key)} />
        </div>
        {taskData.editing && <input type="text" className="edit" defaultValue={taskData.name} />}
    </li>
  );
};