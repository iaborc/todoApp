import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export const Task = ({taskData, onCompleted, onDeleted }) => {
    const hidden = taskData.hidden ? ' hidden' : '';
  return (
    <li className={taskData.status + hidden} >
        <div className='view'>
            <input className="toggle" type="checkbox" id={taskData.key}
                   checked={taskData.status === 'completed'}
                   onChange={() => onCompleted(taskData.key)}/>
            <label htmlFor={taskData.key}>
                <span className="description" >{taskData.name}</span>
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