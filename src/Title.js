import React from 'react';
import PropTypes from 'prop-types';

class Title extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    const { text } = this.props;

    return (<h1>{text}</h1>);
  }
}

export {
  Title,
};
