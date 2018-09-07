const operationsContainer = document.getElementById('operations');
const digitsContainer = document.getElementById('digits');

operationsContainer.addEventListener('click', e => {
    const { target } = e;
    const isButton = target.nodeName === 'BUTTON';

    if (isButton) {
        alert(target.dataset.operation);
    }
});

digitsContainer.addEventListener('click', e => {
    const { target } = e;
    const isButton = target.nodeName === 'BUTTON';

    if (isButton) {
        alert(target.dataset.digit);
    }
});