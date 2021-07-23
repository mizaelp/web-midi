import notes from './notes.js';

const getMIDIMessage = midiMessage => {
    console.log(`You press a ${notes[midiMessage.data[1]][0]} note. The frequency is ${notes[midiMessage.data[1]][1]}`)
}



navigator.requestMIDIAccess()
    .then(midiAccess => {

        for(const input of midiAccess.inputs.values()) {
            input.onmidimessage = getMIDIMessage
        }
    }, () => {
        console.log('Could not access your MIDI devices')
    })

// Future implementation
const playNote = key => {
//     const context = new AudioContext()
//     const oscillator = context.createOscillator()
//     oscillator.frequency.value = key
//     oscillator.type = 'sine'
//     oscillator.connect(context.destination)

//     oscillator.start(context.currentTime)
//     setTimeout(() => {
//         oscillator.stop(context.currentTime)
//     }, 500)
}