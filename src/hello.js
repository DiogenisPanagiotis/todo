import React, { Component } from 'react';
import './hello.css';

class Hello extends Component {
  constructor(){
    super();
    this.state = {
      tasks: [],
      error: false,
      strikeThrough: false,
      listId: 0
    };
  }

  renderStrikeThrough(){
    // console.log(e);
    // let targ = e.target.classList;
    // let item = document.getElementByID('targ');
    // e.target.classList.add('true');
    this.setState({
      strikeThrough: !this.state.strikeThrough
    });
  }
  renderTasks(){
    let tasks = this.state.tasks;
    const classes = `${this.state.strikeThrough} list-group-item`;
    const listItem = {
      width: 300
    };
    return (
      <ul className='list-group'>
        {
          tasks.map((task, i) => {
            return <li id={this.state.listId++} onClick={this.renderStrikeThrough.bind(this)} className={classes} key={i} style={listItem}>{task}</li>;
          })
        }
      </ul>
    );
  }
  renderError(){
    const alert = {
      width: 300
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
      width: 300
    };
    const hr = {
      marginLeft: 0,
      width: 300
    };

    return (
      <div className="container">
        <h3>ToDo.</h3>
        <hr style={hr}/>
        <input ref='input' placeholder='I need to...' onKeyPress={this.handleKeyPress.bind(this)} className='form-control' style={input}></input>
        {this.renderError()}
        <hr style={hr}/>
        {this.renderTasks()}
      </div>
    );
  }
}

export default Hello;
