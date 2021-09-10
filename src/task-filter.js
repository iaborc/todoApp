import React from 'react';

export  const TasksFilter = ({filterData}) => {
    const selected = filterData.selected ? 'selected' : '';
    return (
            <li>
                <button className={selected} onClick={filterData.func}>{filterData.name}</button>
            </li>
    );
};