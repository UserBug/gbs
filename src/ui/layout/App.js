import React from 'react';
import Head from './Head';
import Scripts from './Scripts';
import getContext from './../getContext';

class App extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    params: React.PropTypes.object,
    location: React.PropTypes.object,
    children: React.PropTypes.object
  };

  static childContextTypes = getContext.childContextTypes;

  getChildContext() {
    return getContext(this.props);
  }

  render() {
    return (
      <html>
        <Head title="Test on React"/>
        <body className="pace-done">
        <div id="wrapper">
          <div id="page-wrapper" className="container">
            {this.props.children}
          </div>
        </div>
        <Scripts />
        </body>
      </html>
    );
  }
}

export default App;
