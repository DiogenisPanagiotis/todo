import React, { Component } from 'react';
import './hello.css';

class Hello extends Component {
  constructor(){
    super();
    this.state = {
      tasks: [],
      error: false
    };
  }

  renderStrikeThrough(e){
    let targ = e.target;
    console.log(targ.id);
    if (targ.classList.contains('true')) {
      targ.classList.remove('true');
    } else {
      targ.classList.add('true');
    }
  }

  deleteTask(e){
    let id = e.target.id;
    this.state.tasks.splice(id, 1);
    this.setState({
      tasks: this.state.tasks
    });
  }

  renderDelete(){
    const del = {
      float: 'right'
    };

    return (
      <span onClick={this.deleteTask.bind(this)} className="glyphicon glyphicon-trash" aria-hidden="true"></span>
    );
  }

  renderTasks(){
    let that = this;
    let tasks = this.state.tasks;
    const classes = `list-group-item`;
    const listItem = {
      width: 435
    };
    return (
      <ul className='list-group'>
        {
          tasks.map((task, i) => {
            return <li
                    onClick={this.renderStrikeThrough.bind(this)}
                    className={classes}
                    key={i}
                    style={listItem}>
                      {task}
                      {that.renderDelete()}
                   </li>;
          })
        }
      </ul>
    );
  }
  renderError(){
    const alert = {
      width: 435,
      height: 42
    };
    if (this.state.error) {
      return (
        <div>
          <br/>
          <div className="alert alert-danger" role="alert" style={alert}>
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="sr-only">Error:</span> Oops! Try again.
          </div>
        </div>
      );
    }
  }
  handleKeyPress(e){
    if (e.key === 'Enter') {
      let input = e.target.value;
      if (input === '') {
        console.log("Empty!");
        this.setState({
          error: true
        });
      } else {
        this.setState({
          error: false
        });
        this.state.tasks.push(input);
        this.setState({
          tasks: this.state.tasks
        });
        this.refs.input.value = '';
      }
    }
  }

  render(){
    const input = {
      height: 42,
      width: 435
    };
    const hr = {
      marginLeft: 0,
      width: 435
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-sm-offset-3">
            <br/>
            <div className="jumbotron">
              <h3>ToDo.</h3>
              <br />
              <input ref='input' maxLength="30" placeholder='I need to...' onKeyPress={this.handleKeyPress.bind(this)} className='form-control' style={input}></input>
              {this.renderError()}
              <br />
              {this.renderTasks()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hello;
