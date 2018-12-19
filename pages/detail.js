/**
 * Module depenencies
 */
import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

/**
 * Import Service with GraphQL
 */
import todoService from '../services/todo.service';

/**
 * DetailView component
 */
export default class DetailView extends Component {
  static getInitialProps ({ query: { id } }) {
    return { todoID: id };
  }

  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    todoService.getTodoById(this.props.todoID)
      .then((res) => {
        this.setState({
          todo: res.data.getTodo,
        });
      })
      .catch(console.error);
  }

  render () {
    return (
      <section className="detail-view">
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet"></link>
        <style global jsx>{`
          body,
          html {
            background-color: #eee;
            margin: 0;
            padding: 0;
            color: #333;
            font-family: 'Raleway', cursive;
          }

          * {
            box-sizing: border-box;
          }
          .ui-container {
            max-width: 600px;
            margin: 32px auto;
          }
        `}</style>
        <Header />
        <div className="ui-container">
        {this.state.todo &&
          <Card>
            <h3>{this.state.todo.title}</h3>
            <div>
              {this.state.todo.status}
            </div>
            <div>
              <label>Reported By </label>
              <a href={`mailto:${this.state.todo.reported.email}`}>{this.state.todo.reported.user}</a>
            </div>
            <div>
              <label>Assigned To </label>
              <a href={`mailto:${this.state.todo.assigned.email}`}>{this.state.todo.assigned.user}</a>
            </div>
            <div>
              <p>{this.state.todo.description}</p>
            </div>
          </Card>
        }
        </div>
      </section>
    );
  }
}
