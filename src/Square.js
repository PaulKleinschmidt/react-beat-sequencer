import React from 'react';

export class Square extends React.Component {
  constructor() {
    super()
    this.state={
      active: false
    }
    this.activate = this.activate.bind(this)
  }

  activate() {
    if (this.props.instrumentIsSelected) {
      this.setState({active: !this.state.active})
      this.props.onActivate(this.props.type, this.props.index)
    }
  }

  render() {
    const { active } = this.state
    const { instrumentIsSelected, isOnCurrentBeat, isBeginningOfMeasure} = this.props

    return (
      <div
        style={{
          height: instrumentIsSelected ? '40px' : '10px',
          width: '40px',
          boxSizing: 'border-box',
          border:
            !instrumentIsSelected ? isOnCurrentBeat && active ? '2px solid white' : '' :
            isOnCurrentBeat && active ? '2px solid orange' :
            active ? '3px solid red' : '3px solid white',
          transform: isOnCurrentBeat && active ? "rotateZ(-2deg)" : "",
          boxShadow: active && instrumentIsSelected ? '1px 1px 40px 1px red' : '',
          backgroundColor:
            isOnCurrentBeat && active ? '#0bd3d3' :
            isOnCurrentBeat ? '#f890e7' : isBeginningOfMeasure || !instrumentIsSelected ? 'gray' : 'white',
          transition: 'all .2s ease-out',
          margin: '3px',
          cursor: 'pointer'
        }}
        onClick={this.activate}
      />
    );
  }
}
