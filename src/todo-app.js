import React from 'react';
import {NewTaskForm} from "./new-task-form";
import {TaskList} from "./task-list";
import {Footer} from "./footer";


export const TodoApp = () => {

    const taskList = [
        {status: 'completed', name: 'Completed task', key: '1st', editing: false, time : (Date.now() - 17000) },
        {status:'editing', name: 'Editing task', key: '2nd', editing: true, time : (Date.now() -    300000)},
        {status: '', name: 'Active task', key: '3rd', editing: false, time : (Date.now() -    300000)},
    ];
    return (
        <section className='todoapp'>
            <header className="header">
                <h1>todos</h1>
                <NewTaskForm />
            </header>
            <section className='main'>
                <TaskList todos={taskList} />
            </section>
            <Footer />
        </section>
    );
};