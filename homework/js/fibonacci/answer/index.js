const fibonacci = index => {
    if (index === 0) {
        return 0;
    }

    let counter = 1;
    let a = 0;
    let b = 1;

    while (counter < index) {
        [a, b] = [b, a + b];
        counter++;
    }

    return b;
};