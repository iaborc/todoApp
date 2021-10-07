import React from 'react';
import PropTypes from 'prop-types';

export  const TasksFilter = ({filterData}) => {
    const selected = filterData.selected ? 'selected' : '';
    return (
            <li>
                <button className={selected} onClick={filterData.func}>{filterData.name}</button>
            </li>
    );
};

TasksFilter.propTypes = {
    filterData: PropTypes.shape({
        func: PropTypes.func,
        name: PropTypes.string,
        selected: PropTypes.bool,
    }).isRequired
}