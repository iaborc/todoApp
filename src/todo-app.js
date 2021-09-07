import React from 'react';
import {NewTaskForm} from "./new-task-form";
import {TaskList} from "./task-list";
import {Footer} from "./footer";


export class TodoApp extends React.Component {

    state = {
        taskList : [
            {status: 'completed', name: 'Completed task', key: '1', editing: false, time : (Date.now() - 17000) },
            {status:'editing', name: 'Editing task', key: '2', editing: true, time : (Date.now() - 300000)},
            {status: '', name: 'Active task', key: '3', editing: false, time : (Date.now() - 300000)},
        ]
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
    }
    onCompleted = (key) => {
        this.setState(({taskList}) => {
            const indx = taskList.findIndex((task) => task.key === key);
            const newArr = taskList.map((el, i) => {
                let newEl = Object.assign({}, el);
                if (i === indx) {
                    newEl.status === 'completed' ? newEl.status = '' : newEl.status = 'completed';
                }
                return newEl;
            })
            return { taskList : newArr};
        })
    }

    render() {
        return (
            <section className='todoapp'>
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm />
                </header>
                <section className='main'>
                    <TaskList todos={this.state.taskList} onCompleted={(key) => this.onCompleted(key)} onDeleted = {(key) => this.onDeleted(key)}/>
                </section>
                <Footer />
            </section>
        );
    }
}