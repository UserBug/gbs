import React from 'react';
import { Link } from 'react-router';
import ContentForm from './ContentForm';
import compareText from '../../modules/compareText';
import CompareResult from '../../components/CompareResult';

class CompareContent extends React.Component {
  static displayName = 'CompareContent';

  constructor(...args) {
    super(...args);
    this.state = {
      compareResult: null
    }
  }

  _onChange(...args) {
    this.setState({
      compareResult: compareText(...args)
    })
  }

  render() {
    return (
      <div className={'container-fluid page page-' + this.constructor.displayName}>
        <p>Place content of two files in fields below, to see their difference.</p>
        <p>Or <Link to="/compare_on_server">load files on server</Link></p>
        <div className="row">
          <ContentForm onChange={::this._onChange}/>
        </div>
        <CompareResult rows={this.state.compareResult || []} />
      </div>
    );
  }
}

export default CompareContent;
