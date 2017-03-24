import React from 'react';

class CompareResult extends React.Component {
  static propTypes = {
    rows: React.PropTypes.array.isRequired
  };

  render() {
    const className = {
      '+': 'add',
      '-': 'remove',
      '*': 'replace',
    };

    const elements = [];
    for (const i in this.props.rows) {
      elements.push(
        <tr key={i} className={className[this.props.rows[i].prefix] || ''}>
          <td>{i*1 + 1}</td>
          <td>{this.props.rows[i].prefix}</td>
          <td>{this.props.rows[i].value}</td>
        </tr>
      );
    }

    return elements.length ? <table className="result"><tbody>{elements}</tbody></table> : null;
  }

}

export default CompareResult;
