import React, { Component, PropTypes } from 'react';
import * as TodoActions from 'actions/TodoActions';
import { connect } from 'react-redux';
import _ from 'lodash';

class Details extends Component {
  static propTypes = {
    todos: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  //  the [needs] property is used in [fetchComponentData]
  static needs = [TodoActions.getTodos];

  render() {
    const { todos, params } = this.props;
    const { todoId } = params;

    return (
      <div className="todo-details">
        Details : {todos.get(todoId)}
      </div>
    );
  }
}

export default connect(state => ({ todos: state.todos }))(Details);
