/**
 * Module depenencies
 */
import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';

/**
 * Import Service with GraphQL
 */
import todoService from '../services/todo.service';

/**
 * Styles
 */
import '../styles/edit/styles__small.scss';

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
          ...res.data.getTodo,
        });
      })
      .catch(console.error);
  }

  onChange = (event, field) => {
    this.setState({
      [field]: event.target.value,
    });
  }

  onSubmit = () => {
    const body = Object.assign({}, this.state);
    body.assigned = this.state.assigned.ID;
    body.reported = this.state.reported.ID;

    todoService.editTodo(body)
      .then((res) => {
        window.location.href = '/';
      })
      .catch(console.error)
  }

  render () {
    return (
      <section className="detail-view">
        <Header />
        <div className="ui-container">
        {this.state.ID &&
          <Card>
            <Input
              defaultValue={this.state.title}
              onChange={event => this.onChange(event, 'title')}
              placeholder="Title"
            />
            <div>
              <Select
                value={this.state.status}
                onChange={event => this.onChange(event, 'status')}
              >
                <option selected={this.state.status === 'TODO'}>TODO</option>
                <option selected={this.state.status === 'WIP'}>WIP</option>
                <option selected={this.state.status === 'DONE'}>DONE</option>
              </Select>
            </div>
            <div>
              <label>Reported By </label>
              <a href={`mailto:${this.state.reported.email}`}>{this.state.reported.user}</a>
            </div>
            <div>
              <label>Assigned To </label>
              <a href={`mailto:${this.state.assigned.email}`}>{this.state.assigned.user}</a>
            </div>
            <div>
              <Textarea
                defaultValue={this.state.description}
                onChange={event => this.onChange(event, 'description')}
              />
            </div>
            <div style={{textAlign: 'right'}}>
              <Button onClick={this.onSubmit}>
                Editar
              </Button>
            </div>
          </Card>
        }
        </div>
      </section>
    );
  }
}
