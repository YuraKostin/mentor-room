const BasicMath = (() => {
    /**
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    const add = (a, b) => a + b;

    /**
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    const sub = (a, b) => a - b;

    /**
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    const mul = (a, b) => a * b;

    /**
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    const div = (a, b) => a / b;

    /**
     * Check that arguments is numbers
     * @param {number} a
     * @param {number} b
     * @return {boolean}
     */
    const isValidArguments = (a, b) => {
        return isNumber(a) && isNumber(b);
    };

    const ERROR_MESSAGE_NUMBER_EXPECTED = 'Invalid arguments. Function expect Numbers';

    const curried = guardify.bind(null, isValidArguments, ERROR_MESSAGE_NUMBER_EXPECTED);

    return {
        add: curried(add),
        sub: curried(sub),
        mul: curried(mul),
        div: curried(div),
    };
})();