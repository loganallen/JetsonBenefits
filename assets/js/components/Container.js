import React from 'react';
import Navigation from './Navigation';

type Props = {
  children: React.Element
};

class Container extends React.Component {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

export default Container;
