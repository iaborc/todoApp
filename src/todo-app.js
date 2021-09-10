import React from 'react';
import {NewTaskForm} from "./new-task-form";
import {TaskList} from "./task-list";
import {Footer} from "./footer";


export class TodoApp extends React.Component {

    maxKey = 103;

    state = {
        taskList : [
            this.createTask('Completed task', 'completed', false, 17000),
            this.createTask('Editing task', 'editing', true, 300000),
            this.createTask('Active task', '', false, 300000)
        ],
        taskFilter:  [
            {name: 'All', selected: true, func: () => this.onAll(), key: 100},
            {name: 'Active', selected: false, func: () => this.onActive(), key: 101},
            {name: 'Completed', selected: false, func: () => this.onDone(), key: 102}
        ],

        taskCount: 0
    };

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
    };

    onFilterSelected = (filter) => {
        const taskFilter = this.state.taskFilter
        const newArr = taskFilter.map((f) => {
            const newEl = {...f};
            newEl.selected = newEl.name === filter ? true : false;
            return newEl;
        });
        return newArr;
    };

    onActive = () => {
        this.setState( ({taskList}) => {
            const newArr = taskList.map((el) => {
                const newEl = {...el};
                if(el.status !== '') {
                    newEl.hidden = true;
                } else newEl.hidden = false;
                return newEl;
            });
            const newFilter = this.onFilterSelected('Active');

            return {taskList: newArr, taskFilter: newFilter};
        });
    };

    onAll = () => {
        this.setState(({taskList}) => {
            const newArr = taskList.map((el) => {
                const newEl = {...el};
                newEl.hidden = false;
                return newEl;
            });
            const newFilter = this.onFilterSelected('All');

            return {taskList: newArr, taskFilter: newFilter};
        });
    };

    onDone = () => {
        this.setState(({taskList}) => {
            const newArr = taskList.map((el) => {
                const newEl = {...el};
                if(el.status !== 'completed') {
                    newEl.hidden = true;
                } else newEl.hidden = false;
                return newEl;
            });
            const newFilter = this.onFilterSelected('Completed');
            return {taskList: newArr, taskFilter: newFilter};
            })
    };

    clearCompleted = () => {
        console.log('work');
        this.setState(({taskList}) => {
            const newArr = taskList.reduce((acc, el) => {
                const newEl = {...el};
                if(el.status !== 'completed') acc.push(newEl);
                return acc;
            },[]);
            return {taskList: newArr};
        })
    };



    createTask(newTodo, status = '', editing = false, timeLeft = 0)  {
        return {
            status: status,
            name: newTodo,
            key: this.maxKey++,
            editing: editing,
            time: Date.now() - timeLeft
        };
    }

    onTaskAdd = (newTodo) => {
        const currentTasks = this.state.taskList;
        const newTask = this.createTask(newTodo);
        this.setState({taskList: [...currentTasks, newTask]});
    };


    render() {
        const todoCount = this.state.taskList.filter((el) => el.status === '').length;
        return (
            <section className='todoapp'>
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm onTaskAdd={(newTodo) => this.onTaskAdd(newTodo)}/>
                </header>
                <section className='main'>
                    <TaskList todos={this.state.taskList} onCompleted={(key) => this.onCompleted(key)} onDeleted = {(key) => this.onDeleted(key)}/>
                </section>
                <Footer taskFilter={this.state.taskFilter} clearCompleted={() => this.clearCompleted()} todoCount={todoCount}/>
            </section>
        );
    }
}