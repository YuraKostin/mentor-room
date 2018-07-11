const x = prompt('Type first argument', '');
const y = prompt('Type second argument', '');

const isNumber = argument => typeof argument === 'number';

const add = (a, b) => {
    if (!isNumber(a) || isNaN(a) || !isNumber(b) || isNaN(b)) {
        throw new Error('add: Invalid arguments. Function expect Numbers');
    }

    return a + b;
};

// try/catch
try {
    alert(add(Number(x), Number(y)));
} catch (error) {
    alert(error);
}

// Check arguments before call

const numberX = Number(x);
const numberY = Number(y);

if (!isNumber(numberX) || isNaN(numberX) || !isNumber(numberY) || isNaN(numberY)) {
    alert('Invalid arguments type');
} else {
    alert(add(numberX, numberY));
}