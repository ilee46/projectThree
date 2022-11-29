letterVal = 0;
console.log(navigator)
let device;

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(success, failure);
}

function failure() {
    console.log("Could not connect MIDI");
}

function updateDevices(event) {
    console.log(event);
}

function success(midiAccess) {
    console.log(midiAccess);
    midiAccess.addEventListener('statechange', updateDevices);
    let inputs = midiAccess.inputs;
    console.log(inputs)

    for (let output of midiAccess.outputs.values()) {
        device = output
        console.log('Output device selected', device)
    }

    inputs.forEach((input) => {
        console.log(input);
        input.addEventListener('midimessage', handleInput);
    });

}

function handleInput(input) {
    console.log(input);
    let command = input.data[0];
    let note = input.data[1];
    let velocity = input.data[2];

    console.log(`command: ${command}, note: ${note}, velocity: ${velocity}`);
    if (velocity > 0) {
        noteOn(note);
        document.getElementById('beginningString').textContent = "Ouch"
    }

    if (velocity == 0) {
        noteOff(note);
        document.getElementById('beginningString').textContent = "Ah"
    }
    if (note >= 36 && note <= 51) {
        document.body.style.backgroundColor = "cyan"
    } else if (note >= 52 && note <= 67) {
        document.body.style.backgroundColor = "red"
    } else if (note >= 68 && note <= 83) {
        document.body.style.backgroundColor = "green"
    } else if (note >= 84 && note <= 99) {
        document.body.style.backgroundColor = "purple"
    }
}

function colorM(key, clr) {
    device && device.send([0x90,key,clr]);
}

function noteOn(note) {

    if (note == 51) {
        for (val = 36; val < 52; val++) {
            colorM(val, 78);
        }
    }

    if (note == 55) {
        for (val = 52; val < 68; val++) {
            colorM(val, 72);
        }
    }

    if (note == 80) {
        for (val = 68; val < 84; val++) {
            colorM(val, 122);
        }
    }

    if (note == 84) {
        for (val = 84; val < 100; val++) {
            colorM(val, 81);
        }
    }

}

function noteOff(note) {

    if (note == 36) {
        for (val = 36; val < 52; val++) {
            colorM(val, 0);
        }
    }

    if (note == 64) {
        for (val = 52; val < 68; val++) {
            colorM(val, 0);
        }
    }

    if (note == 71) {
        for (val = 68; val < 84; val++) {
            colorM(val, 0);
        }
    }

    if (note == 99) {
        for (val = 84; val < 100; val++) {
            colorM(val, 0);
        }
    }
}