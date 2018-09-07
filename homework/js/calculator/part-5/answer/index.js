const commandsContainer = document.getElementById('commands');
const digitsContainer = document.getElementById('digits');
const arg1 = document.getElementById('argument-1');
const arg2 = document.getElementById('argument-2');
const command = document.getElementById('command');
const result = document.getElementById('result');

const changeElementPlaceholderText = (element, value) => {
    element.textContent = value;
};
const calc = (command, value1, value2) => {
    return command(value1, value2);
};

const OPERATION_CLEAR = 'clear';
const commands = {
    '+': BasicMath.add,
    '-': BasicMath.sub,
    '*': BasicMath.mul,
    '/': BasicMath.div,
};

commandsContainer.addEventListener('click', e => {
    const { target } = e;
    const isButton = target.nodeName === 'BUTTON';

    if (!isButton) {
        return;
    }

    const commandToDo = target.dataset.command;

    if (commandToDo === OPERATION_CLEAR) {
        changeElementPlaceholderText(arg1, '');
        changeElementPlaceholderText(arg2, '');
        changeElementPlaceholderText(command, '');
        changeElementPlaceholderText(result, '');
        return;
    }

    if (arg1.textContent.length > 0) {
        changeElementPlaceholderText(command, commandToDo);

        if (arg2.textContent.length > 0) {
            changeElementPlaceholderText(result, calc(
                commands[commandToDo],
                Number(arg1.textContent),
                Number(arg2.textContent),
            ));
        }
    }
});

digitsContainer.addEventListener('click', e => {
    const { target } = e;
    const isButton = target.nodeName === 'BUTTON';

    if (!isButton) {
        return;
    }

    const digit = target.dataset.digit;

    if (command.textContent.length === 0 && arg1.textContent.length !== 5) {
        changeElementPlaceholderText(arg1.textContent, arg1.textContent += digit);
        return;
    }

    if (command.textContent.length !== 0 && arg2.textContent.length !== 5) {
        changeElementPlaceholderText(arg2.textContent, arg2.textContent += digit);
        changeElementPlaceholderText(result, calc(
            commands[command.textContent],
            Number(arg1.textContent),
            Number(arg2.textContent),
        ));
    }
});