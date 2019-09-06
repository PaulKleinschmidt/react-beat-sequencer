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
    const { flash } = this.props
    return (
      <div
        style={{
          height: '12px',
          width: '12px',
          marginRight: '10px',
          border: '3px solid white',
          borderRadius: '50%',
          backgroundColor: active ? flash ? '#0bd3d3' : '#f890e7' : '',
          padding: '3px',
          transition: 'all .7s ease-out',
          cursor: 'pointer'
        }}
        onClick={this.onMuteClick}
      />
    );
  }
}
