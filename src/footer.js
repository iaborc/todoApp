import React from 'react';
import {TasksFilter} from "./task-filter";
import PropTypes from 'prop-types';

export const Footer = ({taskFilter, clearCompleted, todoCount}) => {

    const filterList = taskFilter.map((filter) => {
        return <TasksFilter filterData={filter} key = {filter.key}/>;
    });
    return (
        <footer className="footer">
            <span className="todo-count">{todoCount} items left</span>
            <ul className='filters'>
                {filterList}
            </ul>
            <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
        </footer>
    );
}
Footer.defaultProps = {
    taskFilter: [],
    todoCount: 0,
    clearCompleted: () => {},
};
Footer.porpTypes = {
    taskFilter: PropTypes.arrayOf(PropTypes.object).isRequired,
    todoCount: PropTypes.number,
    clearCompleted: PropTypes.func,
};