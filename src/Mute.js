import React from 'react';

export class Mute extends React.Component {
  constructor() {
    super()
    this.state={
      active: true
    }

    this.onMuteClick = this.onMuteClick.bind(this)
  }

  onMuteClick() {
    this.setState({ active: !this.state.active })
    return this.props.onClick()
  }


  render() {
    const { active } = this.state
    return (
      <div
        style={{
          height: '12px',
          width: '12px',
          marginRight: '10px',
          border: '2px solid white',
          borderRadius: '50%',
          backgroundColor: active ? '#f890e7' : '',
          padding: '3px',
          transition: 'all .2s ease-out',
          cursor: 'pointer'
        }}
        onClick={this.onMuteClick}
      />
    );
  }
}
