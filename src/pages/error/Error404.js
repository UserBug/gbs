import React from 'react';

class Error404 extends React.Component {
  static displayName = 'Error404';
  static propTypes = {
    error: React.PropTypes.any
  };

  render() {
    return <div className={'container-fluid page page-' + this.constructor.displayName}>
      <h1 className="page-header">{this.constructor.displayName}</h1>
      <p>Page not found</p>
      {this.props.error && this.props.error.url ? <p>{this.props.error.url}</p> : null}
    </div>;
  }
}

export default Error404;
