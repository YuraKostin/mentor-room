const ERROR_MESSAGE_NUMBER_EXPECTED = 'Invalid arguments. Function expect Numbers';

const isNumber = argument => typeof argument === 'number';

const isValidArguments = (a, b) => isNumber(a) && !isNaN(a) && isNumber(b) && !isNaN(b);

const add = (a, b, invalidArgumentMessage) => {
    if (isValidArguments(a, b)) {
        return a + b;
    }

    throw new Error(`[add]: ${invalidArgumentMessage}`);
};
const sub = (a, b, invalidArgumentMessage) => {
    if (isValidArguments(a, b)) {
        return a - b;
    }

    throw new Error(`[sub]: ${invalidArgumentMessage}`);
};
const mul = (a, b, invalidArgumentMessage) => {
    if (isValidArguments(a, b)) {
        return a * b;
    }

    throw new Error(`[mul]: ${invalidArgumentMessage}`);
};
const div = (a, b, invalidArgumentMessage) => {
    if (isValidArguments(a, b)) {
        return a / b;
    }

    throw new Error(`[div]: ${invalidArgumentMessage}`);
};

const actions = '+-*/';

const isInvalidAction = string => {
    return !string || string.length !== 1 || !actions.includes(string);
};

const runCalculator = () => {
    const operations = {
        '+': add,
        '-': sub,
        '*': mul,
        '/': div,
    };

    let operation;

    while (isInvalidAction(operation)) {
        operation = prompt('Type operation (+, -, *, /)');
    }

    let argument1;

    while (isNaN(argument1)) {
        argument1 = Number(prompt('Type first argument'));
    }

    let argument2;

    while (isNaN(argument2)) {
        argument2 = Number(prompt('Type second argument'));
    }

    const result = operations[operation](argument1, argument2, ERROR_MESSAGE_NUMBER_EXPECTED);

    alert(result);

    if (confirm('Do you want to calc anything else?')) {
        runCalculator();
    }
};