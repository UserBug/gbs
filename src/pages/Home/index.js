import React from 'react';

class Home extends React.Component {
  static displayName = 'CompareContent';

  render() {
    return (
      <div className={'container-fluid page page-' + this.constructor.displayName}>
        Home
      </div>
    );
  }
}

export default Home;
