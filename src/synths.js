import Tone from 'tone'

export const kickSynth = new Tone.MembraneSynth().toMaster()

export const snareSynth = new Tone.Synth({
  volume: 1,
  oscillator: {
    type: 'fmtriangle',
    modulationType: 'sawtooth',
    harmonicity: 3.5
  },
  envelope: {
    attack: 0.001,
    decay: 0.06,
    sustain: 0.004,
    release: 0.03
  }
}).toMaster()

export const hatSynth = new Tone.NoiseSynth({
  noise: {
    type: "white"
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0,
    release: 0.1,
  }
}).toMaster()

export const bassSynth = new Tone.MonoSynth(
  {
    oscillator: {
      type: 'square'
    },
    filter: {
      Q: 5,
      type: 'lowpass',
    },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.9,
      release: 0.4
    },
    filterEnvelope: {
      attack: 0.001,
      decay: 0.2,
      sustain: 0.5,
      release: 2,
      baseFrequency: 80,
      octaves: 3,
      exponent: 2
    }
  }
).toMaster()

bassSynth.volume.value = -12
hatSynth.volume.value = -15
