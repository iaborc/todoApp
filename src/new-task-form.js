import React from 'react';
export class NewTaskForm extends React.Component {
    state = {
        newTask: ''
    };

    onChange = (e) => {
        this.setState({
            newTask: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onTaskAdd(this.state.newTask);
        this.setState({
            newTask: ''
        });
    }

    render(){
        return(
        <form onSubmit={this.onSubmit}>
            <input className="new-todo" placeholder="What needs to be done?" autoFocus
                   onChange={this.onChange} value={this.state.newTask} />
        </form>
        );
    }
}