import notes from './notes.js';

document.querySelector("button").addEventListener("click", () => {

    const getMIDIMessage = midiMessage => {

        const { data } = midiMessage

        const command = data[0]
        const note = data[1]
        const velocity = (data.length > 2) ? data[2] : 0

        if(command === 144) {
            playNote(notes[note][1])
        }
    
        console.log(`You press a ${notes[note][0]} note. The frequency is ${notes[note][1]}`)
    }
    
    navigator.requestMIDIAccess()
        .then(midiAccess => {
    
            for(const input of midiAccess.inputs.values()) {
                input.onmidimessage = getMIDIMessage
            }
            
        }, () => {
            console.log('Could not access your MIDI devices')
        })
    
    const playNote = key => {

        const context = new AudioContext()
        const oscillator = context.createOscillator()

        oscillator.frequency.value = key
        oscillator.type = 'sine'
        oscillator.connect(context.destination)
    
        oscillator.start(context.currentTime)
        setTimeout(() => {
            oscillator.stop(context.currentTime)
        }, 500)
        context.resume()
    }

})