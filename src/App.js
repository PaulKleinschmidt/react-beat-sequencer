import React from 'react';
import Tone from 'tone'
import { Square } from './Square'
import { kickSynth, snareSynth, hatSynth, bassSynth, pluckSynth, whiteNoise } from './synths';

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
          c3: Array(16).fill(false),
          c4: Array(16).fill(false)
        },
        synth: {
          c1: Array(16).fill(false),
          c2: Array(16).fill(false),
          c3: Array(16).fill(false),
          c4: Array(16).fill(false),
          c5: Array(16).fill(false),
          c6: Array(16).fill(false)
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

      // Drums
      this.state.instruments.drums.kicks[currentBeat]
        && kickSynth.triggerAttackRelease('c1', '10n', time)
      if (this.state.instruments.drums.snares[currentBeat]) {
        snareSynth.triggerAttackRelease('c4', '10n', time)
        whiteNoise.triggerAttackRelease("8n");
      }
      this.state.instruments.drums.hats[currentBeat]
        && hatSynth.triggerAttackRelease('32n');


      // Bass
      this.state.instruments.bass.c1[currentBeat]
        && bassSynth.triggerAttackRelease("D2", "8n");
      this.state.instruments.bass.c2[currentBeat]
        && bassSynth.triggerAttackRelease("C1", "8n");
      this.state.instruments.bass.c3[currentBeat]
        && bassSynth.triggerAttackRelease("G1", "8n");
      this.state.instruments.bass.c4[currentBeat]
        && bassSynth.triggerAttackRelease("C2", "8n");

      // Synth
      this.state.instruments.synth.c1[currentBeat]
        && pluckSynth.triggerAttackRelease("G4", "8n");
      this.state.instruments.synth.c2[currentBeat]
        && pluckSynth.triggerAttackRelease("Bb4", "8n");
      this.state.instruments.synth.c3[currentBeat]
      && pluckSynth.triggerAttackRelease("C5", "8n");
      this.state.instruments.synth.c4[currentBeat]
        && pluckSynth.triggerAttackRelease("D5", "8n");
      this.state.instruments.synth.c5[currentBeat]
        && pluckSynth.triggerAttackRelease("Eb5", "8n");
      this.state.instruments.synth.c6[currentBeat]
        && pluckSynth.triggerAttackRelease("G5", "8n");
    }


    const loopBeat = new Tone.Loop(song, '16n')
    Tone.Transport.bpm.value = 130
    Tone.Transport.start()
    loopBeat.start(0)
  }

  onActivateSquare(type, index) {
    const selectedInstrument = this.state.selectedInstrument
    const updatedState = this.state.instruments[selectedInstrument][type]
      updatedState[index] = !updatedState[index]
      this.setState({instruments: {
        ...this.state.instruments,
        selectedInstrument: {
          ...this.state.instruments[selectedInstrument],
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
            color: 'white',
          }
        }
      >
        {Object.keys(this.state.instruments.drums).map(drum => {
          const pads = this.state.instruments.drums[drum]

          return (
            <div
              style={{display: 'flex', flexDirection: 'row'}}
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
          const pads = this.state.instruments.bass[bassNote]

          return (
            <div
              style={{display: 'flex', flexDirection: 'row'}}
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

        <div style={{margin: '10px'}}/>

        {Object.keys(this.state.instruments.synth).map(synthNote => {
           const pads = this.state.instruments.synth[synthNote]

          return (
            <div
              style={{display: 'flex', flexDirection: 'row'}}
              onClick={() =>
                this.state.selectedInstrument !== 'synth' && this.setState({selectedInstrument: 'synth'})
              }
            >
              {pads.map((_note, index)=> (
                <Square
                  isBeginningOfMeasure={index === 0 || !(index % 4)}
                  index={index}
                  isOnCurrentBeat={this.state.currentBeat == index}
                  onActivate={this.onActivateSquare}
                  type={synthNote}
                  instrumentIsSelected={this.state.selectedInstrument === 'synth'}
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
