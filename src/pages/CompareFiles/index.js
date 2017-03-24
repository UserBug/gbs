import React from 'react';
import { Link } from 'react-router';
import FilesForm from './FilesForm';
import loadFilesModel from './model';
import Err from '../../components/Err';
import Spinner from './../../components/spinner';
import CompareResult from '../../components/CompareResult';

class CompareFiles extends React.Component {
  static displayName = 'CompareContent';

  constructor(...args) {
    super(...args);
    this.state = {
      error: null,
      isLoading: false,
      compareResult: []
    }
  }

  static readFile(file) {
    return new Promise(res => {
      const reader = new FileReader();
      reader.onload = e => res(e.target.result);
      reader.readAsText(file);
    })
  }

  static async _loadFiles(firstFile, secondFile) {
    return {
      firstFile: await this.readFile(firstFile),
      secondFile: await this.readFile(secondFile),
    }
  }

  _onSubmit(firstFile, secondFile) {
    this.setState({isLoading: true});
    this.constructor
      ._loadFiles(firstFile, secondFile)
      .then(loadFilesModel.compareFiles)
      .then(response => {
        this.setState({
          isLoading: false,
          compareResult: response.rows
        });
      }).catch(err => {
        this.setState({
          isLoading: false,
          error: err
        });
    });
  }

  render() {
    return (
      <div className={'container-fluid page page-' + this.constructor.displayName}>
        {this.state.isLoading ? <Spinner /> : null}
        <p>Choose files to send on server to compare.</p>
        <p>Or <Link to="/compare_on_client">insert files content to fields in browser</Link></p>
        <div className="row">
          <FilesForm onSubmit={::this._onSubmit}/>
        </div>
        <CompareResult rows={this.state.compareResult} />
        {this.state.error ? <Err>{this.state.error}</Err> : null}
      </div>
    );
  }
}

export default CompareFiles;
