const x = prompt('Type first argument', '');
const y = prompt('Type second argument', '');

const isNumber = argument => typeof argument === 'number';

const add = (a, b) => {
    if (!isNumber(a) || !isNumber(b)) {
        throw new Error('add: Invalid arguments. Function expect Numbers');
    }

    return a + b;
};

alert(add(Number(x), Number(y)));