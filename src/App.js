import React from 'react';
import Tone from 'tone'
import { Square } from './Square'
import { kickSynth, snareSynth, hatSynth, bassSynth, pluckSynth, whiteNoise, percSynth } from './synths';
import { Mute } from './Mute'

class App extends React.Component {
  constructor() {
    super()
    this.state={
      instruments: {
        drums: {
          kicks: Array(16).fill(false),
          snares: Array(16).fill(false),
          hats: Array(16).fill(false),
          perc: Array(16).fill(false)
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
      selectedInstrument: 'drums',
      mutedTracks: []
    }
    this.onActivateSquare = this.onActivateSquare.bind(this)
    this.onMuteClick = this.onMuteClick.bind(this)
  }

  componentDidMount() {
    let currentBeat = 0
    const song = (time) => {
      currentBeat += 1
      if (currentBeat === 16) {
        currentBeat = 0
      }
      this.setState({currentBeat})

      // Play Drums
      if (!this.state.mutedTracks.includes('drums')) {
        this.state.instruments.drums.kicks[currentBeat]
        && kickSynth.triggerAttackRelease('c1', '10n', time)
        if (this.state.instruments.drums.snares[currentBeat]) {
          snareSynth.triggerAttackRelease('c4', '10n', time)
          whiteNoise.triggerAttackRelease("8n");
        }
        this.state.instruments.drums.hats[currentBeat]
          && hatSynth.triggerAttackRelease('32n');
        this.state.instruments.drums.perc[currentBeat]
          && percSynth.triggerAttackRelease('c5', '32n');
      }

      // Play Bass
      if (!this.state.mutedTracks.includes('bass')) {
        this.state.instruments.bass.c1[currentBeat]
          && bassSynth.triggerAttackRelease("Bb0", "8n");
        this.state.instruments.bass.c2[currentBeat]
          && bassSynth.triggerAttackRelease("C1", "8n");
        this.state.instruments.bass.c3[currentBeat]
          && bassSynth.triggerAttackRelease("G1", "8n");
        this.state.instruments.bass.c4[currentBeat]
          && bassSynth.triggerAttackRelease("C2", "8n");
      }

      // Play Synth
      if (!this.state.mutedTracks.includes('synth')) {
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
    }


    const loopBeat = new Tone.Loop(song, '16n')
    Tone.Transport.bpm.value = 130
    Tone.Transport.start()
    loopBeat.start(0)
  }

  onActivateSquare(type, index) {
    Tone.context.resume()

    const selectedInstrument = this.state.selectedInstrument
    const instrumentStateCopy = JSON.parse(JSON.stringify(this.state.instruments))
    const updatedState = instrumentStateCopy[selectedInstrument][type]
    updatedState[index] = !updatedState[index]
    this.setState({instruments: instrumentStateCopy})
  }

  onMuteClick(instrument) {
    let mutedTracks = Object.assign([], this.state.mutedTracks)
    if (this.state.mutedTracks.includes(instrument)) {
      mutedTracks.splice(this.state.mutedTracks.indexOf(instrument), 1)
    } else {
      mutedTracks.push(instrument)
    }
    this.setState({ mutedTracks })
  }

  render() {
    return (
      <div
        style={
          {
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'right',
            paddingRight: '20px',
            paddingBottom: '20px'
          }
        }
      >
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
              color: 'white',
            }
          }
        >
          {Object.keys(this.state.instruments).map(instrument => (
            <div style={{ display: 'flex', flexDirection: 'row',  alignItems: 'center', margin: '10px'}}>
            <Mute
              flash={this.state.currentBeat === 0 || !(this.state.currentBeat % 4)}
              onClick={() => this.onMuteClick(instrument)}
            />
            <div style={{ display: 'flex', flexDirection: 'column'}}>
              {Object.keys(this.state.instruments[instrument]).map(sound => {
                const pads = this.state.instruments[instrument][sound]

                return (
                  <div
                    style={{display: 'flex', flexDirection: 'row'}}
                    onClick={() =>
                      this.state.selectedInstrument !== instrument && this.setState({selectedInstrument: instrument})
                    }
                  >
                    {pads.map((_drum, index)=> (
                      <Square
                        isBeginningOfMeasure={index === 0 || !(index % 4)}
                        index={index}
                        isOnCurrentBeat={this.state.currentBeat == index}
                        onActivate={this.onActivateSquare}
                        type={sound}
                        instrumentIsSelected={this.state.selectedInstrument === instrument}
                        updateSelectedInstrument={() => this.setState({selectedInstrument: instrument})}
                        muted={this.state.mutedTracks.includes(instrument)}
                      />
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          ))}
        </div>
        <a
          style={
            {textDecoration: 'none', color: 'gray', fontWeight: 'bold'}
          }
          href='https://github.com/PaulKleinschmidt/react-beat-sequencer'
        >
          Made by PaulKleinschmidt {`</>`}
        </a>

      </div>
    );
  }
}

export default App;
