const NUMBER_EXPECTED_ERROR_MESSAGE = 'Invalid arguments. Function expect Numbers';

const isNumber = argument => typeof argument === 'number';

const isValidArguments = (a, b) => !isNumber(a) || isNaN(a) || !isNumber(b) || isNaN(b);

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

const operation = prompt('Type operation (+, -, *, /)');
const argument1 = Number(prompt('Type first argument'));
const argument2 = Number(prompt('Type second argument'));

const operations = {
    '+': add,
    '-': sub,
    '*': mul,
    '/': div,
};

const result = operations[operation](argument1, argument2, NUMBER_EXPECTED_ERROR_MESSAGE);

alert(result);