(() => {
    const timer = getRandom();

    let a = 1;
    let b = 5;

    setTimeout(run, timer);

    function run() {
        // debugger;

        for (let i = 0; i < 5; i++) {
            if (i > 1) {
                changeA(i);
            } else if (i > 0) {
                changeB(i);
            }
        }
    }

    function changeA(newA) {
        a = newA;
    }

    function changeB(newB) {
        b -= newB;
    }

    function getRandom() {
        const random = Math.round(Math.random() * 10);

        return Math.pow(random, 3);
    }
})();