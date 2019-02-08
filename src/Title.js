import React from 'react';
import PropTypes from 'prop-types';
import styles from './Title.css';

class Title extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    const { text } = this.props;

    return (<h1 className={styles.red}>{text}</h1>);
  }
}

export {
  Title,
};
