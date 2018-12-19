/**
 * Module dependencies
 */
import React from 'react';
import Link from 'next/link';

/**
 * Todo Service
 */
import todoService from '../../services/todo.service';

/**
 * Styles
 */
const styles = {
  div: {
    display: 'inline-block',
    width: '85%',
    padding: '0 16px',
    maxWidth: '800px',
  },
  input: {
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #333',
    padding: '8px'
  },
  predictionContainer: {
    backgroundColor: '#eee',
    margin: '-3px 0 0',
    border: '1px solid #333',
    position: 'relative',
    zIndex: '10',
    padding: '16px 8px',
    listStyle: 'none',
    borderBottomRightRadius: '4px',
    borderBottomLeftRadius: '4px',
  }
};

/**
 * Search component
 */
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      results: [],
    };

    this.node = null;
  }

  componentDidMount() {
    if (this.node) {
      document.body.addEventListener('click', event => {
        if (this.node && !this.node.contains(event.target)) {
          this.show(false);
        }
      });
    }
  }

  onChange = (event) => {
    this.setState({
      q: event.target.value
    }, () => {
      todoService.searchTodo(this.state.q)
        .then(res => {
          this.setState({
            results: res.data.searchTodo,
          });
        })
        .catch(console.error);
    });
  }

  show = (display) => {
    this.setState({
      show: display,
    });
  }

  render() {
    return (
      <div style={styles.div} ref={node => this.node = node}>
        <input
          onFocus={() => this.show(true)}
          onChange={(event) => this.onChange(event)}
          style={styles.input}
          placeholder="Search a todo"
        />
        {this.state.show && this.state.results.length > 0 && this.state.q.length > 0 && 
          <ul style={styles.predictionContainer}>
            {this.state.results && this.state.results.map(todo => (
              <li key={todo.ID}>
                <Link
                  href={{pathname: '/detail', query: { id: todo.ID }}}
                  as={`/detail/${todo.ID}`}
                >
                  <button>{todo.title}</button>
                </Link>
              </li>
            ))}
          </ul>
        }
      </div>
    )
  }
}