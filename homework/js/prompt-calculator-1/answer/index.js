const isNumber = argument => typeof argument === 'number';

const add = (a, b) => {
    if (!isNumber(a) || isNaN(a) || !isNumber(b) || isNaN(b)) {
        throw new Error('add: Invalid arguments. Function expect Numbers');
    }

    return a + b;
};
const sub = (a, b) => {
    if (!isNumber(a) || isNaN(a) || !isNumber(b) || isNaN(b)) {
        throw new Error('sub: Invalid arguments. Function expect Numbers');
    }

    return a - b;
};
const mul = (a, b) => {
    if (!isNumber(a) || isNaN(a) || !isNumber(b) || isNaN(b)) {
        throw new Error('mul: Invalid arguments. Function expect Numbers');
    }

    return a * b;
};
const div = (a, b) => {
    if (!isNumber(a) || isNaN(a) || !isNumber(b) || isNaN(b)) {
        throw new Error('div: Invalid arguments. Function expect Numbers');
    }

    return a / b;
};

const operation = prompt('Type operation (+, -, *, /)');
const argument1 = Number(prompt('Type first argument'));
const argument2 = Number(prompt('Type second argument'));

let result;

switch (operation) {
    case '+':
        result = add(argument1, argument2);
        break;
    case '-':
        result = sub(argument1, argument2);
        break;
    case '*':
        result = mul(argument1, argument2);
        break;
    case '/':
        result = div(argument1, argument2);
        break;
}

alert(result);