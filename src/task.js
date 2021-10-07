import React from 'react';
import PropTypes from 'prop-types';

export class Task extends React.Component {

    static defaultProps = {
        updateInterval: 1000,
        onTick: () => {},
        onSave: () => {},
        onEdit: () => {},
        onDeleted: () => {},
        onCompleted: () => {},
    };

    static propTypes = {
        updateInterval: PropTypes.number,
        onTick: PropTypes.func,
        onSave: PropTypes.func,
        onEdit: PropTypes.func,
        onDeleted: PropTypes.func,
        onCompleted: PropTypes.func,
        taskData: PropTypes.shape({
            status: PropTypes.string,
            name: PropTypes.string,
            timeHasPassed: PropTypes.string,
            key: PropTypes.number,
            hidden: PropTypes.bool,
        }).isRequired
    }

    componentDidMount() {
        this.TimerID = setInterval(() => this.props.onTick(), this.props.updateInterval);
    }

    componentWillUnmount() {
        clearInterval(this.TimerID);
    }

    onChange = (e) => {
        if (e.code === 'Enter') {
            const newName = e.target.value;
            this.props.onSave(this.props.taskData.key, newName);
        }
    }

    render(){
        const hidden = this.props.taskData.hidden ? ' hidden' : '';
        return (
            <li className={this.props.taskData.status + hidden}>
                <div className='view'>
                    <input className="toggle" type="checkbox" id={this.props.taskData.key}
                           checked={this.props.taskData.status === 'completed'}
                           onChange={() => this.props.onCompleted(this.props.taskData.key)}/>
                    <label htmlFor={this.props.taskData.key}>
                        <span className="description" >{this.props.taskData.name}</span>
                        <span className="created">
                    created {this.props.taskData.timeHasPassed} ago
                </span>
                    </label>
                    <button className="icon icon-edit" onClick={() => this.props.onEdit(this.props.taskData.key)}/>
                    <button className="icon icon-destroy" onClick={() => this.props.onDeleted(this.props.taskData.key)} />
                </div>
                {this.props.taskData.status === 'editing' &&
                <input type="text"
                       className="edit" defaultValue={this.props.taskData.name}
                       onKeyUp={this.onChange} title={"press Enter to save"}/>
                }
            </li>
        );
    }

}