import React from 'react';
import {Task} from "./task";
import PropTypes from 'prop-types';

export const TaskList = ({todos, onCompleted, onDeleted, onEdit, onSave, onTick}) => {


    const elements = todos.map((task) => {
        return <Task  taskData={task} key={task.key} onCompleted={onCompleted}
                      onDeleted={onDeleted} onEdit={onEdit} onSave={onSave} onTick={onTick}/>;
    });

        return (
            <ul className="todo-list">
                {elements}
            </ul>
        );
}

TaskList.defaultProps = {
    onTick: () => {},
    onSave: () => {},
    onEdit: () => {},
    onDeleted: () => {},
    onCompleted: () => {},
}

TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onTick: PropTypes.func,
    onSave: PropTypes.func,
    onEdit: PropTypes.func,
    onDeleted: PropTypes.func,
    onCompleted: PropTypes.func,
};