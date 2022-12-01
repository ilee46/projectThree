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
    }

    if (velocity == 0) {
        noteOff(note);
    }

}

function colorM(key, clr) {
    device && device.send([0x90,key,clr]);
}

function noteOn(note) {

    if (note >= 36 && note <= 39) {
        addLongitude(-10)
    }

    if (note >= 40 && note <= 43) {
        addLongitude(-5)
    }

    if (note >= 44 && note <= 47) {
        addLongitude(-2)
    }

    if (note >= 48 && note <= 51) {
        addLongitude(-1)
    }

    if (note >= 52 && note <= 55) {
        addLat(-1)
    }

    if (note >= 56 && note <= 59) {
        addLat(-2)
    }

    if (note >= 60 && note <= 63) {
        addLat(-5)
    }

    if (note >= 64 && note <= 67) {
        addLat(-10)
    }

    if (note >= 68 && note <= 71) {
        addLongitude(10)
    }

    if (note >= 72 && note <= 75) {
        addLongitude(5)
    }

    if (note >= 76 && note <= 79) {
        addLongitude(2)
    }

    if (note >= 80 && note <= 83) {
        addLongitude(1)
    }

    if (note >= 84 && note <= 87) {
        addLat(1)
    }

    if (note >= 88 && note <= 91) {
        addLat(2)
    }

    if (note >= 92 && note <= 95) {
        addLat(5)
    }

    if (note >= 96 && note <= 99) {
        addLat(10)
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