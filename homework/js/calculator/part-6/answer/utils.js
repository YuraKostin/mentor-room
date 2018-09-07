/**
 * Check that argument is valid number
 * @param {*} argument
 * @return {boolean}
 */
const isNumber = argument => typeof argument === 'number' && !isNaN(argument);

/**
 * Wrapper for functions, which validates passed arguments,
 * and throws error when arguments is invalid
 * @param {function} validator
 * @param {string} exception
 * @param {function} fn
 * @return {function}
 */
const guardify = (validator, exception, fn) => {
    return (...args) => {
        const isValidArgs = validator(...args);

        if (isValidArgs) {
            return fn(...args);
        } else {
            const { name } = fn;
            const finalException = name.length ? `[${name}]: ${exception}` : exception;

            throw new Error(finalException);
        }
    };
};