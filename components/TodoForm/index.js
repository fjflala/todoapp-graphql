/**
 * Module dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Input from '../Input';
import Textarea from '../Textarea';
import Select from '../Select';

/**
 * Styles
 */
const styles = {
  title: {
    margin: '0 0 16px',
  },
};

/**
 * TodoForm Component
 */
export default class TodoForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    users: PropTypes.array,
  }

  static defaultProps = {
    onSubmit: () => {},
    users: [],
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  onChange = (event, field) => {
    let value = event.target.value;

    if (['assigned', 'reported'].includes(field)) {
      value = event.target.options[event.target.selectedIndex].value;
    }

    this.setState({
      [field]: value,
    });
  }

  onSubmit = () => {
    const {
      onSubmit,
    } = this.props;

    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit({
        title: this.state.title,
        description: this.state.description,
        assigned: this.state.assigned,
        reported: this.state.reported,
      });
    }
  }

  render () {
    const {
      users,
    } = this.props;
    return (
      <React.Fragment>
        <h3 style={styles.title}>Add Todo</h3>
        <div>
          <Input
            onChange={event => this.onChange(event, 'title')}
            type="text"
            placeholder="Title" 
          />
        </div>
        <div>
          <Select
            style={{width: '47%', display: 'inline-block', marginRight: '16px'}}
            placeholder="Reporter"
            onChange={(event) => this.onChange(event, 'reported')} 
          >
            <option>Reporter</option>
            {users && users.map(user => (
              <option key={user.ID} value={user.ID}>{user.user}</option>
            ))}
          </Select>
          <Select
            style={Object.assign({}, styles.input, {width: '47%', display: 'inline-block', marginLeft: '16px'})}
            placeholder="Reported"
            onChange={(event) => this.onChange(event, 'assigned')}
          >
            <option>Assigned</option>
            {users && users.map(user => (
              <option key={user.ID} value={user.ID}>{user.user}</option>
            ))}
          </Select>
        </div>
        <div>
          <Textarea
            onChange={event => this.onChange(event, 'description')}
            style={styles.textarea}
            placeholder="Description"
          />
        </div>
        <div style={{textAlign: 'right'}}>
          <Button onClick={() => this.onSubmit()}>Add</Button>
        </div>
      </React.Fragment>
    )
  }
}
