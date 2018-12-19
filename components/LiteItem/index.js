/**
 * Module Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import IconDelete from '@material-ui/icons/Delete';
import IconArrowForward from '@material-ui/icons/ArrowForward';
import IconEdit from '@material-ui/icons/Edit';
import Card from '../Card';

/**
 * Styles
 */
const styles = {
  titleTodo: {
    fontWeight: 900,
    margin: 0,
  },
  actions: {
    backgroundColor: '#333',
  },
};


/**
 * LiteItem component
 */
export default class LiteItem extends React.Component {
  static propTypes = {
    todo: PropTypes.shape({
      ID: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      assigned: PropTypes.shape({
        user: PropTypes.string,
        email: PropTypes.string,
      }).isRequired,
      reported: PropTypes.shape({
        user: PropTypes.string,
        email: PropTypes.string,
      }).isRequired,
    }).isRequired,
    onDelete: PropTypes.func,
  }

  static defaultProps = {
    onDelete: () => {},
  }

  render() {
    const {
      todo,
      onDelete,
    } = this.props;
    return (
      <React.Fragment>
        <style global jsx>{`
          .ui-liteitem__actions {
            background-color: #333;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 86.5%;
            transition: left 0.15s ease-in-out;
            text-align: center;
            vertical-align: middle;
            padding: 8px 0;
          }
          .ui-liteitem {
            position: relative;
            overflow: hidden;
          }
          .ui-liteitem:hover .ui-liteitem__actions {
            left: 80%;
          }

          .ui-liteitem__detail {
            border: 0;
            background: 0;
            color: white;
            display: block;
            text-align: center;
            cursor: pointer;
          }

          .ui-liteitem__status {
            background-color: #eee;
            position: absolute;
            top: 0;
            bottom: 0;
            padding: 32px 16px;
            border-left: 1px solid #ccc;
            width: 77px;
          }

          .ui-liteitem__status--wip {
            background-color: #fff9ae;
            border-color: #dab600;
            color: #a98600;
          }

          .ui-liteitem__status--done {
            background-color: #aed581;
            border-color: #33691e;
            color: #33691e;
          }

          .ui-liteitem__actions-container {
            position: absolute;
            margin-left: 76px;
          }

          .ui-liteitem__status-label {
            display: block
          }
        `}</style>
        <Card className="ui-liteitem">
          <h3 style={styles.titleTodo}>{todo.title}</h3>
          <small>Author: <a style={{color: '#333', fontWeight: 900, textDecoration: 'none'}} href={`mailto:${todo.reported.email}`}>{todo.reported.user}</a></small>
          <span style={{margin: '0 8px'}}>|</span>
          <small>Assigned: <a style={{color: '#333', fontWeight: 900, textDecoration: 'none'}} href={`mailto:${todo.assigned.email}`}>{todo.assigned.user}</a></small>
          <div className="ui-liteitem__actions">
            <div className={`ui-liteitem__status ui-liteitem__status--${todo.status.toLowerCase()}`}>
              <small className="ui-liteitem__status-label">status</small>
              <strong>{todo.status}</strong>
            </div>
            <div className="ui-liteitem__actions-container">
              <button className="ui-liteitem__detail" onClick={onDelete}>
                <IconDelete />
              </button>
              <Link
                href={{pathname: '/detail', query: { id: todo.ID }}}
                as={`/detail/${todo.ID}`}
              >
                <button className="ui-liteitem__detail">
                  <IconArrowForward />
                </button>
              </Link>
              <Link
                href={{pathname: '/edit', query: { id: todo.ID }}}
                as={`/edit/${todo.ID}`}
              >
                <button className="ui-liteitem__detail">
                  <IconEdit />
                </button>
              </Link>
            </div>
          </div>
        </Card>
      </React.Fragment>
    )
  }
} 
