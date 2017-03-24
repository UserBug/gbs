import React from 'react';

function getContext(props) {
  return {
    location: props.location
  }
}

getContext.childContextTypes = {
  location: React.PropTypes.object
};

export default getContext;
