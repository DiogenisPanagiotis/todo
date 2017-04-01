import React, { Component } from 'react';
import './hello.css';

class Hello extends Component {
  constructor(){
    super();
    this.state = {
      tasks: [],
      error: false,
      listId: 0
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
    let id = e.target.parentElement.id;
    let tasks = this.state.tasks;
    console.log("parent: ", e.target.parentElement);
    console.log("id: ", id);
    console.log("state.tasks: ",tasks);
    for (let i = 0; i < tasks.length; i++) {
      let bucket = tasks[i];
      console.log(bucket[1], id);
      if (bucket[1].toString() === id) {
        tasks.splice(i, 1);
      }
    }
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
                    id={task[1]}
                    onClick={this.renderStrikeThrough.bind(this)}
                    className={classes}
                    key={i}
                    style={listItem}>
                      {task[0]}
                      {that.renderDelete()}
                   </li>;
          })
        }
      </ul>
    );
  }

  renderDismiss(){
    this.setState({ error: false});
    this.refs.input.focus();
  }

  renderError(){
    const alert = {
      width: 435,
      height: 42,
      paddingTop: 10,
      marginBottom: 0
    };
    if (this.state.error) {
      return (
        <div>
          <br/>
          <div className="alert alert-danger alert-dismissable" style={alert} role="alert">
            <button onClick={this.renderDismiss.bind(this)} type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="sr-only">Error:</span> <strong>Oops!</strong> Try again.
          </div>
        </div>
      );
    }
  }

  handleKeyPress(e){
    if (e.key === 'Enter') {
      let input = e.target.value;
      let id = this.state.listId;
      if (input === '') {
        console.log("Empty!");
        this.setState({
          error: true
        });
      } else {
        this.setState({
          error: false
        });
        this.state.tasks.push([input, Math.random()]);
        this.setState({
          tasks: this.state.tasks
        });
        this.state.listId++;
        this.setState({
          listId: this.state.listId
        });
        this.refs.input.value = '';
      }
    }
  }

  renderInput(){
    const input = {
      height: 42,
      width: 435
    };
    return (
      <input
        ref='input'
        maxLength="30"
        placeholder='I need to...'
        onKeyPress={this.handleKeyPress.bind(this)}
        className='form-control'
        style={input}>
      </input>
    );
  }

  componentDidMount(){
    this.refs.input.focus();
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-sm-offset-3">
            <br/>
            <div className="jumbotron">
              <h3>ToDo.</h3>
              <br />
              {this.renderInput()}
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
