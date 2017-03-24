import React from 'react';

class Err extends React.Component {
  render() {
    if (this.props.children) {
      if (typeof this.props.children === 'object' && this.props.children.stack) {
        console.error(this.props.children.message); // eslint-disable-line
        console.error(this.props.children.stack); // eslint-disable-line
      } else {
        console.error(String(this.props.children)); // eslint-disable-line
      }

      return (
        <div className="alert alert-danger">{String(this.props.children)}</div>
      );
    } else {
      return null;
    }
  }
}

export default Err;
