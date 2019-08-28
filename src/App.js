import React from 'react';
import Tone from 'tone'
import { Square } from './Square'
import { kickSynth, snareSynth, hatSynth, bassSynth } from './synths';

class App extends React.Component {
  constructor() {
    super()
    this.state={
      instruments: {
        drums: {
          kicks: Array(16).fill(false),
          snares: Array(16).fill(false),
          hats: Array(16).fill(false)
        },
        bass: {
          c1: Array(16).fill(false),
          c2: Array(16).fill(false),
          c3: Array(16).fill(false)
        }
      },
      currentBeat: 0,
      selectedInstrument: 'drums'
    }
    this.onActivateSquare = this.onActivateSquare.bind(this)
  }

  componentDidMount() {
    let currentBeat = 0
    const song = (time) => {
      currentBeat += 1
      if (currentBeat === 16) {
        currentBeat = 0
      }
      this.setState({currentBeat})

      // Kicks
      this.state.instruments.drums.kicks.forEach(((kick, index) => {
        if ((index === currentBeat) && kick) {
          kickSynth.triggerAttackRelease('c1', '10n', time)
        }
      }))

      this.state.instruments.drums.snares.forEach(((snare, index) => {
        if ((index === currentBeat) && snare) {
          snareSynth.triggerAttackRelease('c4', '10n', time)
        }
      }))

      this.state.instruments.drums.hats.forEach(((snare, index) => {
        if ((index === currentBeat) && snare) {
          hatSynth.triggerAttackRelease('32n');
        }
      }))

      // Bass
      this.state.instruments.bass.c1.forEach(((c1, index) => {
        if ((index === currentBeat) && c1) {
          bassSynth.triggerAttackRelease("C1", "8n");
        }
      }))

      this.state.instruments.bass.c2.forEach(((c2, index) => {
        if ((index === currentBeat) && c2) {
          bassSynth.triggerAttackRelease("Eb1", "8n");
        }
      }))

      this.state.instruments.bass.c3.forEach(((c3, index) => {
        if ((index === currentBeat) && c3) {
          bassSynth.triggerAttackRelease("G1", "8n");
        }
      }))
    }


    const loopBeat = new Tone.Loop(song, '16n')
    Tone.Transport.bpm.value = 130
    Tone.Transport.start()
    loopBeat.start(0)
  }

  onActivateSquare(type, index) {
    const selectedInstrument = this.state.selectedInstrument
    const updatedState = this.state.instruments[this.state.selectedInstrument][type]
      updatedState[index] = !updatedState[index]
      this.setState({instruments: {
        ...this.state.instruments,
        selectedInstrument: {
          ...this.state.instruments[this.state.selectedInstrument],
          type: updatedState
        }
    }})
  }

  render() {
    return (
      <div
        className="App"
        style={
          {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'right',
            minHeight: '100vh',
            backgroundColor: 'black',
            color: 'white'
          }
        }
      >
        {Object.keys(this.state.instruments.drums).map(drum => {
          let pads
          switch(drum) {
            case "kicks":
              pads = this.state.instruments.drums.kicks
              break;
            case "snares":
              pads = this.state.instruments.drums.snares
              break;
            case "hats":
              pads = this.state.instruments.drums.hats
              break;
            default:
              break;
          }

          return (
            <div
              style={
                {
                    display: 'flex',
                    flexDirection: 'row',
                }
              }
              onClick={() =>
                this.state.selectedInstrument !== 'drums' && this.setState({selectedInstrument: 'drums'})
              }
            >
              {pads.map((_drum, index)=> (
                <Square
                  isBeginningOfMeasure={index === 0 || !(index % 4)}
                  index={index}
                  isOnCurrentBeat={this.state.currentBeat == index}
                  onActivate={this.onActivateSquare}
                  type={drum}
                  instrumentIsSelected={this.state.selectedInstrument === 'drums'}
                  updateSelectedInstrument={() => this.setState({selectedInstrument: 'drums'})}
                />
              ))}
            </div>
          )
        })}

        <div style={{margin: '10px'}}/>

        {Object.keys(this.state.instruments.bass).map(bassNote => {
          let pads
          switch(bassNote) {
            case "c1":
              pads = this.state.instruments.bass.c1
              break;
            case "c2":
              pads = this.state.instruments.bass.c2
              break;
            case "c3":
              pads = this.state.instruments.bass.c3
              break;
            default:
              break;
          }

          return (
            <div
              style={
                {
                    display: 'flex',
                    flexDirection: 'row',
                }
              }
              onClick={() =>
                this.state.selectedInstrument !== 'bass' && this.setState({selectedInstrument: 'bass'})
              }
            >
              {pads.map((_note, index)=> (
                <Square
                  isBeginningOfMeasure={index === 0 || !(index % 4)}
                  index={index}
                  isOnCurrentBeat={this.state.currentBeat == index}
                  onActivate={this.onActivateSquare}
                  type={bassNote}
                  instrumentIsSelected={this.state.selectedInstrument === 'bass'}
                />
              ))}
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
