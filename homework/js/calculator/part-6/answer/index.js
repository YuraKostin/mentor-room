// Elements
const commandsContainerElement = document.getElementById('commands');
const digitsContainerElement = document.getElementById('digits');
const arg1Element = document.getElementById('argument-1');
const arg2Element = document.getElementById('argument-2');
const commandElement = document.getElementById('command');
const result = document.getElementById('result');

// Helpers and constants
const OPERATION_CLEAR = 'clear';
const MAX_ARGUMENT_LENGTH = 5;
const commands = {
    '+': BasicMath.add,
    '-': BasicMath.sub,
    '*': BasicMath.mul,
    '/': BasicMath.div,
};

// State
let arg1 = 0;
let arg2 = 0;
let command = null;

commandsContainerElement.addEventListener('click', e => {
    const { target } = e;
    const isButton = target.nodeName === 'BUTTON';

    if (!isButton) {
        return;
    }

    command = target.dataset.command;

    if (command === OPERATION_CLEAR) {
        [arg1Element, arg2Element, commandElement, result].forEach(element => {
            element.textContent = '';
        });

        arg1 = 0;
        arg2 = 0;
        command = null;
        return;
    }

    if (arg1) {
        commandElement.textContent = command;

        if (arg2) {
            result.textContent = commands[command](arg1, arg2);
        }
    }
});

digitsContainerElement.addEventListener('click', e => {
    const { target } = e;
    const isButton = target.nodeName === 'BUTTON';

    if (!isButton) {
        return;
    }

    const digit = target.dataset.digit;

    if (!command && String(arg1).length !== MAX_ARGUMENT_LENGTH) {

        arg1 = Number(String(arg1) + digit);
        arg1Element.textContent = arg1;

        return;
    }

    if (command && String(arg2).length !== MAX_ARGUMENT_LENGTH) {
        arg2 = Number(String(arg2) + digit);
        arg2Element.textContent = arg2;

        result.textContent = commands[command](arg1, arg2);
    }
});