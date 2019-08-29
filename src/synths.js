import Tone from 'tone'

export const kickSynth = new Tone.MembraneSynth().toMaster()

export const snareSynth = new Tone.Synth({
  volume: 1,
  oscillator: {
    type: 'fmtriangle',
    modulationType: 'square',
    harmonicity: 3.5
  },
  envelope: {
    attack: 0.001,
    decay: 0.06,
    sustain: 0.004,
    release: 0.03
  }
}).toMaster()

export const whiteNoise = new Tone.NoiseSynth(
  {
    noise: {
      type: 'white'
    },
    envelope: {
      attack: 0.2 ,
      decay: 0.9 ,
      sustain: .02,
      release: .1
    }
  }

).toMaster()

export const hatSynth = new Tone.MetalSynth({
  harmonicity: 10,
  modulationIndex: 32,
  resonance: 4000,
}).toMaster()


whiteNoise.volume.value = -45

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

export const pluckSynth = new Tone.PolySynth(6, Tone.Synth, {
  oscillator : {
		type : "sine"
  },
  envelope : {
    "attack" : .02,
		"release" : 4
	}
}).toMaster();

bassSynth.volume.value = -12
pluckSynth.volume.value = -12
hatSynth.volume.value = -36
