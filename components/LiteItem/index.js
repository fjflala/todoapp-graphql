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
import './styles__small.scss';


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
        <Card className="ui-liteitem">
          <h3 className="ui-liteitem__title-todo">{todo.title}</h3>
          <small>
            Author: <a className="ui-liteitem__user" href={`mailto:${todo.reported.email}`}>
              {todo.reported.user}
            </a>
          </small>
          <span className="ui-liteitem__line">|</span>
          <small>
              Assigned: <a className="ui-liteitem__user" href={`mailto:${todo.assigned.email}`}>
              {todo.assigned.user}
            </a>
          </small>
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
