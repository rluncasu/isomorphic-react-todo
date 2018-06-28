import React from 'react';
import { PropTypes } from 'react';
import Immutable from 'immutable';

export default class TodosView extends React.Component {
  static propTypes = {
    todos: PropTypes.instanceOf(Immutable.List).isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
  };

  handleDelete = e => {
    const id = Number(e.target.dataset.id);

    this.props.deleteTodo(id);
  };

  handleEdit = e => {
    const id = Number(e.target.dataset.id);
    const currentVal = this.props.todos.get(id);

    let text = window.prompt('', currentVal);

    this.props.editTodo(id, text);
  };

  render() {
    const btnStyle = {
      margin: '1em 0 1em 1em',
      'border-color': 'green'
    };

    return (
      <ul className="todo-list ui-sortable">
        {this.props.todos.map((todo, index) => {
          return (
            <li style={btnStyle} key={index} className="">
              <span className="text">{todo}</span>
              <button className="btn btn-outline-danger" data-id={index} onClick={this.handleDelete}>
                X
              </button>
              <button style={btnStyle} data-id={index} onClick={this.handleEdit}>
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
