import React from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class FilesForm extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func
  };

  constructor(...args) {
    super(...args);
    this.state = {

    }
  }

  _onSubmit(e) {
    e.preventDefault();
    if (typeof this.props.onSubmit === 'function' && this.state.firstFile && this.state.secondFile) {
      this.props.onSubmit(this.state.firstFile, this.state.secondFile);
    }
  }

  _changeFile(name, e) {
    e.preventDefault();
    const newState = {...this.state};
    newState[name] = e.target.files[0] || null;
    this.setState(newState);
  }

  _renderTextarea(name, label) {
    return (
      <FormGroup className="form-element form-input col-sm-6">
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          id={name}
          type="file"
          accept=".txt"
          autoComplete="off"
          onChange={this._changeFile.bind(this, name)}
        />
      </FormGroup>
    )
  }
  
  render() {
    const buttonDisabled = !this.state.firstFile || !this.state.secondFile;
    return (
      <Form horizontal>
        {this._renderTextarea('firstFile', 'First file')}
        {this._renderTextarea('secondFile', 'Second file')}
        <Button
          type="submit"
          onClick={::this._onSubmit}
          disabled={buttonDisabled}
        >{buttonDisabled ? 'Select both files' : 'Send'}</Button>
      </Form>
    )
  }
}

export default FilesForm;
