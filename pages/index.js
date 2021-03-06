/**
 * Module dependencies
 */
import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Card from '../components/Card';
import TodoForm from '../components/TodoForm';
import LiteItem from '../components/LiteItem';

/**
 * Import Service with GraphQL
 */
import todoService from '../services/todo.service';
import userService from '../services/user.service';

/**
 * Styles
 */
import '../styles/index/styles__small.scss';

/**
 * ListView component
 */
export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      todos: [],
    };
  }

  componentDidMount() {
    todoService.getTodos({limit: 10, offset: 0})
      .then(res => {
        this.setState({
          todos: res.data.getTodos,
        });
      })

    userService.getUsers({limit: 10, offset: 0})
      .then(res => {
        this.setState({
          users: res.data.getUsers,
        });
      })
  }

  onTodoAdded = (data) => {
    todoService.createTodo(data)
      .then(res => {
        const todos = this.state.todos;
        todos.push(res.data.createTodo);
        
        this.setState({
          todos
        });
      })
      .catch(console.log)
  }

  onDelete = (ID) => {
    todoService.deleteTodo(ID)
      .then((res) => {
        this.setState({
          todos: res.data.deleteTodo,
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <section className="list-view">
        <Header />
        <div className="ui-container">
          <Card>
            <TodoForm
              users={this.state.users}
              onSubmit={data => this.onTodoAdded(data)}
            />
          </Card>
          <ul className="list-view__list-container">
            {this.state.todos && this.state.todos.map(todo => (
              <li key={todo.title} className="list-view__item-container">
                <LiteItem todo={todo} onDelete={() => this.onDelete(todo.ID)} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}
