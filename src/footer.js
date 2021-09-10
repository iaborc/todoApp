import React from 'react';
import {TasksFilter} from "./task-filter";

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