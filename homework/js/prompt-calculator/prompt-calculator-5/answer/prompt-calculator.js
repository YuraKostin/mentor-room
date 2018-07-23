const PromptCalculator = (() => {
    const QUESTION_ACTION = 'Type operation (+, -, *, /)';
    const QUESTION_ARGUMENT_1 = 'Type first argument';
    const QUESTION_ARGUMENT_2 = 'Type second argument';
    const QUESTION_CONFIRM = 'Do you want to calc anything else?';

    /**
     * Check that string corresponds to conditions
     * @param {string} string
     * @return {boolean}
     */
    const isValidAction = string => {
        const ACTIONS = '+-*/';

        return string.length === 1 && ACTIONS.includes(string);
    };

    /**
     * Show prompt modal window until user will type valid data
     * @param {string} question
     * @param {function} validator
     * @param {function} [translator]
     * @return {*}
     */
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

    const operations = {
        '+': BasicMath.add,
        '-': BasicMath.sub,
        '*': BasicMath.mul,
        '/': BasicMath.div,
    };

    const run = () => {
        const operation = getInput(QUESTION_ACTION, isValidAction);
        const argument1 = getInput(QUESTION_ARGUMENT_1, isNumber, Number);
        const argument2 = getInput(QUESTION_ARGUMENT_2, isNumber, Number);
        const selectedOperation = operations[operation];
        const result = selectedOperation(argument1, argument2);

        alert(result);

        if (confirm(QUESTION_CONFIRM)) {
            run();
        }
    };

    return { run };
})();