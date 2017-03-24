import React from 'react';
import * as lib from './library';

class Spinner extends React.Component {
  static propTypes = {
    type: React.PropTypes.string,
    title: React.PropTypes.string,
    opacity: React.PropTypes.number,
    background: React.PropTypes.string
  };

  static defaultProps = {
    type: 'circle',
    opacity: 0.03,
    background: '#000'
  };
  
  render() {
    return (<div className="spinner">
      <div
        className="cover"
        style={{
        opacity: this.props.opacity,
        background: this.props.background
      }} > </div>
      {lib[this.props.type]}
    </div>);
  }
}

export default Spinner;
