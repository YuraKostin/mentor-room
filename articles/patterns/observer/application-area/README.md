# Паттерн "Наблюдатель"

## Область применения

Их первых вариантов, пришедших на ум, могу привести два:
1. [Обработка событий в браузере с помощью `addEventListener`](https://learn.javascript.ru/introduction-browser-events)
2. [WebSockets](https://learn.javascript.ru/websockets) -
технология, позволяющая обмениваться с сервером сообщениями

О первом примере мы и поговорим, так как эта технология
будет нужна нам при разработке калькулятора.

Существует множество различных 
(WebAPI)[https://developer.mozilla.org/ru/docs/Web/API],
среди которых есть [EventListener](https://developer.mozilla.org/ru/docs/Web/API/EventListener).

Это API позволяет нам "слушать" происходящие события, и 
реагировать на них.

**Пример 1. Window**
```javascript
const EVENT_NAME = 'my-super-event';

// Создаём объект события
const mySuperEvent = new Event(EVENT_NAME);

const handleMySuperEvent = function() {
    console.log('Hello, World!');    
};

// Подписка на событие `my-super-event`
// В примере с реализацией мы вызывали метод `subscribe`
window.addEventListener(EVENT_NAME, handleMySuperEvent);

// Вызов события `my-super-event`. 
// В примере с реализацией мы вызывали метод `notify`
window.dispatchEvent(mySuperEvent); // В консоль выводится `Hello, World`
```

**Пример 2. document**
```javascript
const handleDocumentClick = function() {
    alert('Document was clicked!');
};

// Подписка на событие `click`
document.addEventListener('click', handleDocumentClick);
```

Второй пример гораздо короче. И вы могли бы спросить:
"И как же мне теперь 'вызывать' событие?".

Выполните этот код через консоль браузера и кликните мышкой
в любом месте страницы.

Уверен, что вы увидите всплывающее окно с сообщением
_'Document was clicked!'_.  В данном случае браузер сам
"знает" о том, что нужно вызвать функцию 
`handleDocumentClick`.