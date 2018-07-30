# Паттерн "Наблюдатель"

## Реализация

### Простейшая реализация.

Издатель. Издателем у нас будет простой объект, который будет 
иметь два метода `subscribe` и `notify`.

```javascript
const publisher = {
    subscribe() {
        // code
    },
    
    notify() {
        // code
    },
};
```

Также не будем забывать, что издатель должен вести списки тех,
кто подписан на уведомления от него.

```javascript
const publisher = {
	eventSubscribers: new Map(),

    subscribe() {
        // code
    },

    notify() {
        // code
    },
};
```

Отлично. Кто же у нас будет подписчиком? Сделаем подписчиками
функции. Так в данный момент будет проще.

То есть будем реализовывать следующий алгоритм:
1. Издатель(`publisher`) получает нового подписчика(`функцию`),
которого интересует конкретное событие(`event`),
и записывает его в список подписчиков(`eventSubscribers`)
2. При наступлении события(`event`), вызывается функция
уведомления(`notify`), которая обегает всех 
подписчиков(`eventSubscribers`), раздавая новую информацию
3. А подписчики(`eventSubscribers`) уже делают с ней, что хотят.

В коде это может выглядеть так:

```javascript
const publisher = {
    // Отображение Событие -> Подписчики
    eventSubscribers: new Map(),
    
    /**
    * Функция подписки на событие
    * @param {string} event
    * @param {function} fn
    */
    subscribe(event, fn) {
        // Если ещё никто не подписался на конкретное событие
        if (!this.eventSubscribers.has(event)) {
            // Создаём массив подписчиков на это событие
            this.eventSubscribers.set(event, []);
        }
        
        // Добавляем подписчика на событие в массив
        this.eventSubscribers.get(event).push(fn);
    },
    
    /**
    * Функция, получающая событие и данные для отправки подписчикам
    * @param {string} event
    * @param {*} args
    */
    notify(event, ...args) {
        // Получение массива функций-подписчиков для определённого события
        const subscribers = this.eventSubscribers.get(event) || [];
    
        // Вызов каждой функции-подписчика с данными
        subscribers.forEach(subscriber => subscriber(...args));
    },
};
```

Пример использования

```javascript
const buyForFriend = product => {
    console.log(`Купить и подарить другу появившийся на прилавках ${product}`);
};
const buyForTest = product => {
    console.log(`Купить и протестировать новый ${product}`);
};

publisher.subscribe('new-product', buyForFriend);
publisher.subscribe('new-product', buyForTest);

publisher.notify('new-product', 'Квадракоптер G504-DX');

// В консоли мы увидим следующее
Купить другу появившийся на прилавках Квадракоптер G504-DX
Купить и протестировать новый Квадракоптер G504-DX
```

### ООП реализация

```javascript
class AbstractObserver {
    constructor() {        
        if (this.constructor.name === 'AbstractObserver') {
            throw new Error(`[${this.constructor.name}]: Impossible to create instance of abstract class`);
        }
    }
    
    update() {
        throw new Error(`[${this.constructor.name}]: You should implement [update] method`);
    }
}

class AbstractObservable {
    constructor() {        
        if (this.constructor.name === 'AbstractObservable') {
            throw new Error(`[${this.constructor.name}]: Impossible to create instance of abstract class`);
        }
    }
    
    subscribe() {
        throw new Error(`[${this.constructor.name}]: You should implement [subscribe] method`);
    }
    
    unsubscribe() {
        throw new Error(`[${this.constructor.name}]: You should implement [unsubscribe] method`);
    }
    
    notify() {
        throw new Error(`[${this.constructor.name}]: You should implement [notify] method`);
    }
}
```

Мы реализовали абстрактные классы. Их экземпляры нельзя создавать, а в наследующих классах, 
нельзя не реализовать ключевые методы. Фактически, так как в javascript пока не реализованы
интерфейсы, на мой взгляд, нужно довольствоваться вот такими способами.

А теперь пример.

```javascript
// Наследуемся от абстрактного наблюдателя, объявляя класс подписчика на газеты
class NewspaperSubscriber extends AbstractObserver {
    constructor({ name, action }) {
        super();
        
        this.name = name;
        this.action = action;
    }
    
    // Реализуем метод update
    update(data) {
        console.log(`${this.name} получил газеу и увидел новость, что "${data}" и ${this.action}`);
    }
}

// Наследуемся от абстрактного наблюдаемого, объявляя класс газетного издательства
class NewspaperPublisher extends AbstractObservable {
    constructor({ name }) {
        super();
        
        this.eventSubscribers = new Map();
        this.name = name;
    }
    
    // Реализуем метод подписки
    subscribe(event, subscriber) {
        if (!this.eventSubscribers.has(event)) {
            this.eventSubscribers.set(event, []);
        }
        
        this.eventSubscribers.get(event).push(subscriber);
    }
    
    // Реализуем метод уведомления подписчиков
    notify(event, ...args) {
        const subscribers = this.eventSubscribers.get(event) || [];

        subscribers.forEach(subscriber => subscriber.update(...args));
    }
    
    // Реализуем метод отказа от подписки
    unsubscribe(event, subscriber) {
        const subscribers = this.eventSubscribers.get(event);
        
        subscribers.forEach((item, index) => {
            if (item === subscriber) {
                subscribers.splice(index, 1);
            }
        })
    }
}

const john = new NewspaperSubscriber({
    name: 'John',
    action: 'от голода съел газету с солью и перцем'
});

const james = new NewspaperSubscriber({
    name: 'James',
    action: 'задумался о поступлении на медицинский факультет'
});

const newspaperPublisher = new NewspaperPublisher({
    name: 'Times'
});

newspaperPublisher.subscribe('daily-news', james);
newspaperPublisher.subscribe('gastronomic-news', john);

newspaperPublisher.notify('daily-news', 'учёные изобрели способ борьбы с недосыпом');

newspaperPublisher.notify('gastronomic-news', 'Макдональдс выпустил новый вид бургеров');
newspaperPublisher.notify('gastronomic-news', 'БургерКинг выпустил новый вид наггетсов');

// В какой-то момент, Джон неизбежно отравился, питаясь исключительно газетами, и он решает отписаться от получения гастрономической газеты
newspaperPublisher.unsubscribe('gastronomic-news', john);

newspaperPublisher.notify('gastronomic-news', 'БотатФуд пополнил своё меню новыми начинками');
// В консоль ничего не выводится, так как больше подписчиков на гастрономические новости нет.
```

[Область применения](../application-area)