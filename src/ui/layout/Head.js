import React from 'react';

class Head extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired
  };

  render() {
    return (
      <head>
        <meta charSet="utf-8" />
        <title>{this.props.title}</title>
        <link href="/css/font-awesome.min.css" rel="stylesheet" />
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/css/spinkit.css" rel="stylesheet" />
        <link href="/css/ui.css" rel="stylesheet" />
      </head>
    );
  }
}

export default Head;
