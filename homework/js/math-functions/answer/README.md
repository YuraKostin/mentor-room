## Вопрос:
*Существует ли способ заставить функцию работать некорректно, 
 не меняя её код?*
 
## Ответ:

Передать в функцию параметры не числового типа

---

## Вопрос:
Какие действия необходимо предпринять чтобы избежать 
некорректного поведения?
 
## Ответ:

Есть разные подходы к разработке.

Если функция получила неверные данные, то можно:

* бросить исключение
* вернуть характерное значение, например, 
для функции `add` - NaN, и оставлять ответственность
за входящие данные на пользовательском коде.
ИМХО - функция не должна подстраиваться под входящие
значения.
* Вообще не заморачиваться над тем, что могут прийти
данные неожиданного типа

Думаю, что я расположил пункты, 
в порядке от лучшего к худшему 
(исключительно по своему мнению).

---

## Вопрос:
*Возможно ли написать любую из этих функций так, чтобы она принимала 
2 и больше параметров? Если да - предложите реализацию.*

```javascript
// ES5 старый вариант
var add = function () {
    // Превращаем переданные аргументы в массив
    var args = Array.prototype.slice.call(arguments);
    var result = 0;
    
    // Складываем все элементы массива
    for (var i = 0; i < args.length; i++) {
        result += args[i];
    }
    
    // Возвращаем сумму
    return result;
};
```

```javascript
// ES5 с использованием Array.prototype.reduce
var add = function () {
    var args = Array.prototype.slice.call(arguments);
    
    return args.reduce(function (a, b) {
        return a + b;
    }, 0);
};
```

```javascript
// Современный вариант
const add = (...args) => args.reduce((a, b) => a + b, 0);
```