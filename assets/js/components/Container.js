import React from 'react';

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
        {this.props.children}
      </div>
    );
  }
}

export default Container;
