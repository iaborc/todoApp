import React from 'react';
import {NewTaskForm} from "./new-task-form";
import {TaskList} from "./task-list";
import {Footer} from "./footer";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


export class TodoApp extends React.Component {

    maxKey = 103;

    state = {
        taskList : [
            this.createTask('Completed task', 'completed',17000),
            this.createTask('Editing task', 'editing',300000),
            this.createTask('Active task', '',300000)
        ],
        taskFilter:  [
            {name: 'All', selected: true, func: () => this.onAll(), key: 100},
            {name: 'Active', selected: false, func: () => this.onActive(), key: 101},
            {name: 'Completed', selected: false, func: () => this.onDone(), key: 102}
        ],
        taskCount: 0
    };

    onTick = () => {
        this.setState(({taskList}) => {
            const newArr = taskList.map((el) => {
                const newEl = {...el};
                newEl.timeHasPassed = formatDistanceToNow(newEl.time, {includeSeconds: true});
                return newEl;
            });

            return {
                taskList: newArr
            };
        })
    }

    onDeleted = (key) => {
        this.setState( ({taskList}) => {
            const indx = taskList.findIndex((task) => task.key === key);
            const newArr = [
                ...taskList.slice(0, indx),
                ...taskList.slice(indx + 1)
            ];
            return {
                taskList : newArr
            };
        })
    };

    onCompleted = (key) => {
        this.setState(({taskList}) => {
            const indx = taskList.findIndex((task) => task.key === key);
            const newArr = taskList.map((el, i) => {
                let newEl = {...el};
                if (i === indx) {
                    newEl.status === 'completed' ? newEl.status = '' : newEl.status = 'completed';
                }
                return newEl;
            })
            return { taskList : newArr};
        })
        const selectedFilter = this.state.taskFilter.filter((el) => el.selected)[0];
        selectedFilter.func();
    };

    onFilterSelected = (filter) => {
        const taskFilter = this.state.taskFilter
        return taskFilter.map((f) => {
            const newEl = {...f};
            newEl.selected = newEl.name === filter;
            return newEl;
        });
    };

    onActive = () => {
        this.setState( ({taskList}) => {
            const newArr = taskList.map((el) => {
                const newEl = {...el};
                newEl.hidden = el.status !== '';
                return newEl;
            });
            const newFilters = this.onFilterSelected('Active');

            return {taskList: newArr, taskFilter: newFilters};
        });
    };

    onAll = () => {
        this.setState(({taskList}) => {
            const newArr = taskList.map((el) => {
                const newEl = {...el};
                newEl.hidden = false;
                return newEl;
            });
            const newFilters = this.onFilterSelected('All');

            return {taskList: newArr, taskFilter: newFilters};
        });
    };

    onDone = () => {
        this.setState(({taskList}) => {
            const newArr = taskList.map((el) => {
                const newEl = {...el};
                newEl.hidden = el.status !== 'completed';
                return newEl;
            });
            const newFilters = this.onFilterSelected('Completed');
            return {taskList: newArr, taskFilter: newFilters};
            })
    };

    clearCompleted = () => {
        this.setState(({taskList}) => {
            const newArr = taskList.reduce((acc, el) => {
                const newEl = {...el};
                if(el.status !== 'completed') acc.push(newEl);
                return acc;
            },[]);
            return {taskList: newArr};
        })
    };



    createTask(newTodo, status = '', time = 0)  {
        const timeHasPassed = formatDistanceToNow(Date.now() - time, {includeSeconds: true});
        return {
            status: status,
            name: newTodo,
            key: this.maxKey++,
            time: Date.now() - time,
            timeHasPassed: timeHasPassed
        };
    }

    onTaskAdd = (newTodo) => {
        const currentTasks = this.state.taskList;
        const newTask = this.createTask(newTodo);
        this.setState({taskList: [...currentTasks, newTask]});
        const selectedFilter = this.state.taskFilter.filter((el) => el.selected)[0];
        selectedFilter.func();
    };

    onEdit = (key) => {
        this.setState(({taskList}) => {
            const indx = taskList.findIndex((task) => task.key === key);
            const newArr = taskList.map((el, i) => {
                let newEl = {...el};
                if (i === indx) newEl.status = 'editing';
                return newEl;
            });
            return {
                taskList: newArr
            };
        });
    }
    onSave = (key, newName) => {
        this.setState(({taskList}) => {
            const indx = taskList.findIndex((task) => task.key === key);
            const newArr = taskList.map((el, i) => {
                let newEl = {...el};
                if (i === indx) {
                    newEl.status = '';
                    newEl.name = newName;
                }
                return newEl;
            });
            return {
                taskList: newArr
            };
        });
        const selectedFilter = this.state.taskFilter.filter((el) => el.selected)[0];
        selectedFilter.func();
    }

    render() {
        const todoCount = this.state.taskList.filter((el) => el.status === '').length;
        return (
            <section className='todoapp'>
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm onTaskAdd={(newTodo) => this.onTaskAdd(newTodo)}/>
                </header>
                <section className='main'>
                    <TaskList todos={this.state.taskList} onCompleted={(key) => this.onCompleted(key)}
                              onDeleted={(key) => this.onDeleted(key)} onEdit={this.onEdit} onSave={this.onSave}
                              onTick={this.onTick}
                    />
                </section>
                <Footer taskFilter={this.state.taskFilter} clearCompleted={() => this.clearCompleted()} todoCount={todoCount}/>
            </section>
        );
    }
}