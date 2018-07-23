const add = (a, b) => a + b;

const sub = (a, b) => a - b;

const mul = (a, b) => a * b;

const div = (a, b) => a / b;

const isNumber = argument => typeof argument === 'number' && !isNaN(argument);

const guardify = (fn, validator, exception) => {
    return (...args) => {
        const isValidArgs = validator(...args);

        if (isValidArgs) {
            return fn(...args);
        } else {
            throw new Error(exception);
        }
    };
};

const runCalculator = () => {
    const isValidAction = string => {
        const ACTIONS = '+-*/';

        return string.length === 1 && ACTIONS.includes(string);
    };

    const getInput = (question, validator, translator) => {
        if (!translator) {
            translator = value => value;
        }

        while (true) {
            const answer = prompt(question);
            const isEscPressed = answer === null;
            const isEmptyString = !isEscPressed && answer.length === 0;

            if (isEscPressed || isEmptyString) {
                continue;
            }

            const translatedAnswer = translator(answer);
            const isValidAnswer = validator(translatedAnswer);

            if (isValidAnswer) {
                return translatedAnswer;
            }
        }
    };

    const QUESTION_ACTION = 'Type operation (+, -, *, /)';
    const QUESTION_ARGUMENT_1 = 'Type first argument';
    const QUESTION_ARGUMENT_2 = 'Type second argument';
    const QUESTION_CONFIRM = 'Do you want to calc anything else?';
    const ERROR_MESSAGE_NUMBER_EXPECTED = 'Invalid arguments. Function expect Numbers';

    const operations = {
        '+': add,
        '-': sub,
        '*': mul,
        '/': div,
    };

    const operation = getInput(QUESTION_ACTION, isValidAction);
    const argument1 = getInput(QUESTION_ARGUMENT_1, isNumber, Number);
    const argument2 = getInput(QUESTION_ARGUMENT_2, isNumber, Number);

    const operationArgumentsValidator = (a, b) => {
        return isNumber(a) && isNumber(b);
    };

    const safetyOperation = guardify(
        operations[operation],
        operationArgumentsValidator,
        ERROR_MESSAGE_NUMBER_EXPECTED
    );

    const result = safetyOperation(argument1, argument2);

    alert(result);

    if (confirm(QUESTION_CONFIRM)) {
        runCalculator();
    }
};