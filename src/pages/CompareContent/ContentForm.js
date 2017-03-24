import React from 'react';
import bs from 'browser-storage';
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class FilesForm extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func
  };

  constructor(...args) {
    super(...args);
    this.state = {
      firstContent: null,
      secondContent: null
    }
  }

  static getValueFromEvent(e) {
    return e ? (typeof e === 'object' && e.target ? e.target.value : (
      typeof e === 'object' && 'value' in e ? e.value : e
    )) : null;
  }

  componentDidMount() {
    const stateFromCatche = {
      firstContent: bs.getItem('firstContent'),
      secondContent: bs.getItem('secondContent')
    };
    this._onChange(stateFromCatche.firstContent, stateFromCatche.secondContent);
    this.setState(stateFromCatche);
  }

  _onChange(firstContent, secondContent) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(firstContent, secondContent);
    }
  }

  _changeField(name, value) {
    value = this.constructor.getValueFromEvent(value);
    const newState = {...this.state};
    newState[name] = this.constructor.getValueFromEvent(value);
    bs.setItem(name, value);

    this.setState(newState);
    if (typeof this.props.onChange === 'function') {
      this._onChange(newState.firstContent, newState.secondContent);
    }
  }

  _renderTextarea(name, label) {
    return (
      <FormGroup className="form-element form-input col-sm-6">
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          componentClass="textarea"
          placeholder={label + '...'}
          rows="6"
          onChange={this._changeField.bind(this, name)}
          value={this.state[name] || ''}
        />
      </FormGroup>
    )
  }
  
  render() {
    return (
      <Form horizontal>
        {this._renderTextarea('firstContent', 'First file')}
        {this._renderTextarea('secondContent', 'Second file')}
      </Form>
    )
  }
}

export default FilesForm;
