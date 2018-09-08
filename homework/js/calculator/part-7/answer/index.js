// Elements
const commandsContainerElement = document.getElementById('commands');
const digitsContainerElement = document.getElementById('digits');
const arg1Element = document.getElementById('argument-1');
const arg2Element = document.getElementById('argument-2');
const commandElement = document.getElementById('command');
const result = document.getElementById('result');

// Helpers and constants
const DIGITS_RANGE = [48, 57];
const MAX_ARGUMENT_LENGTH = 5;

const COMMAND_CLEAR = 'c';
const COMMAND_ADD = '+';
const COMMAND_SUB = '-';
const COMMAND_MUL = '*';
const COMMAND_DIV = '/';

const commands = {
    [COMMAND_ADD]: BasicMath.add,
    [COMMAND_SUB]: BasicMath.sub,
    [COMMAND_MUL]: BasicMath.mul,
    [COMMAND_DIV]: BasicMath.div,
};

// State
let arg1 = 0;
let arg2 = 0;
let command = null;

document.addEventListener('keyup', e => {
    const key = e.key;
    const keyCode = key.charCodeAt(0);
    const isDigit = keyCode >= DIGITS_RANGE[0] && keyCode <= DIGITS_RANGE[1];

    if (isDigit) {
        if (!command && String(arg1).length !== MAX_ARGUMENT_LENGTH) {

            arg1 = Number(String(arg1) + key);
            arg1Element.textContent = arg1;

            return;
        }

        if (command && String(arg2).length !== MAX_ARGUMENT_LENGTH) {
            arg2 = Number(String(arg2) + key);
            arg2Element.textContent = arg2;

            result.textContent = commands[command](arg1, arg2);
        }

        return;
    }

    const isMathCommand = [COMMAND_ADD, COMMAND_SUB, COMMAND_MUL, COMMAND_DIV].includes(key);

    if (isMathCommand) {
        command = key;

        if (arg1) {
            commandElement.textContent = command;

            if (arg2) {
                result.textContent = commands[command](arg1, arg2);
            }
        }
    }

    if (key === COMMAND_CLEAR) {
        [arg1Element, arg2Element, commandElement, result].forEach(element => {
            element.textContent = '';
        });

        arg1 = 0;
        arg2 = 0;
        command = null;
    }
});