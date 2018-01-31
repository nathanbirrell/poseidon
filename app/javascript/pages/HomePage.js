import React from 'react';
import SpotsListContainer from 'containers/SpotsListContainer';
import Toggle from 'components/Toggle';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Toggle
          id="asdf"
          labelA="asdf"
          labelB="asdf"
        />
        <SpotsListContainer />
      </div>
    );
  }
}

export default HomePage;