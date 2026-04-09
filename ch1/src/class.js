class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    toString() {
        return `${this.name} ${this.age}`;
    }
}

let user = new User('Mike', 30);
console.log(user.toString());
// Mike 30

function User2(name, age) {
    this.name = name;
    this.age = age;
}

User2.prototype.toString = function () {
    return `${this.name} ${this.age}`;
}

let user2 = new User2('Mike', 30);
console.log(user2.toString());
// Mike 30

console.log(typeof User);
// function
console.log(User.prototype.constructor === User);
// true
console.log(user.__proto__ === User.prototype);
// true

// User();
// TypeError: Class constructor User cannot be invoked without 'new'

let userDesc = Object.getOwnPropertyDescriptors(User.prototype);
console.log(userDesc);
// {
//   constructor: {
//     value: [class User],
//     writable: true,
//     enumerable: false,
//     configurable: true
//   },
//   toString: {
//     value: [Function: toString],
//     writable: true,
//     enumerable: false,
//     configurable: true
//   }
// }

let UserClass = class {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    toString() {
        return `${this.name} ${this.age}`;
    }
}

let user3 = new UserClass('Mike', 30);
console.log(user3.toString());
// Mike 30

let UserClass2 = class UserClass2 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    toString() {
        return `${UserClass2.name}(${this.name} ${this.age})`;
    }
}

let user4 = new UserClass2('Mike', 30);
console.log(user4.toString());
// UserClass2(Mike 30)

function createUserClass(helloPrefix) {
    return class {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        toString() {
            return `${this.name} ${this.age}`;
        }

        hello() {
            console.log(`${helloPrefix} ${this.name}`);
        }
    }
}

let UserClass3 = createUserClass('Hello');
let user5 = new UserClass3('Mike', 30);
user5.hello();
// Hello Mike

class UserClass4 {
    constructor(name) {
        this.name = name;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        if (!name) {
            throw new Error('name is empty');
        }
        if (name.length < 4) {
            throw new Error('name is too short');
        }
        this._name = name;
    }
}

let user6 = new UserClass4('Mike');
console.log(user6.name);
// user6.name = 'Mik';
// Error: name is too short

class UserClass5 {
    constructor(name) {
        this.name = name;
    }

    ['say' + 'Hello']() {
        console.log('Hello ' + this.name);
    }
}

let user7 = new UserClass5('Mike');
user7.sayHello();
// Hello Mike

class UserClass6 {
    name = 'Tom';
    constructor(name) {
        if (name) {
            this.name = name;
        }
    }

    sayHello() {
        console.log('Hello ' + this.name);
    }
}

let user8 = new UserClass6();
user8.sayHello();

console.log(UserClass6.prototype.name);
// undefined

class UserClass7 {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        console.log('Hello ' + this.name);
    }
}

let user9 = new UserClass7('Mike');
// setTimeout(user9.sayHello, 1000);
// Hello undefined
// setTimeout(() => user9.sayHello(), 1000);
// Hello Mike
// setTimeout(user9.sayHello.bind(user9), 1000);
// Hello Mike

class UserClass8 {
    constructor(name) {
        this.name = name;
    }

    sayHello = () => {
        console.log('Hello ' + this.name);
    }
}

let user10 = new UserClass8('Mike');
setTimeout(user10.sayHello, 1000);
// Hello Mike

class Animal {
    constructor(name) {
        this.name = name;
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
    }

    meow() {
        console.log(`${this.name} meow`);
    }
}

let cat = new Cat('Mike');
cat.meow();
// Mike meow
console.log(cat.__proto__ === Cat.prototype);
console.log(Cat.prototype.__proto__ === Animal.prototype);
console.log(Animal.prototype.__proto__ === Object.prototype);
// true
// true
// true

function createUser(helloPrefix) {
    return class {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        toString() {
            return `${this.name} ${this.age}`;
        }

        hello() {
            console.log(`${helloPrefix} ${this.name}`);
        }
    }
}

class Teacher extends createUser('Hello') {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }

    toString() {
        return `${super.toString()} ${this.grade}`;
    }
}

let teacher = new Teacher('Jeck Chen', 30, 1);
console.log(teacher.toString());
teacher.hello();
// Jeck Chen 30 1
// Hello Jeck Chen

class Animal2 {
    constructor(name) {
        this.name = name;
    }

    toString() {
        return `${this.name}`;
    }
}

class Cat2 extends Animal2 {
    constructor(name) {
        super(name);
    }

    toString() {
        return `${super.toString()} meow`;
    }
    show() {
        setTimeout(() => console.log('show', super.toString()), 1000);
        // setTimeout(function(){console.log('show', super.toString())}, 1000);
        // SyntaxError: 'super' keyword unexpected here
    }
}

let cat2 = new Cat2('Mike');
console.log(cat2.toString());
// Mike meow
cat2.show();
// show Mike

class User3 {
    constructor(name) {
        this.name = name;
    }
}

class Teacher3 extends User3 {
    constructor(name, school) {
        super(name);
        this.school = school;
    }
}

let teacher3 = new Teacher3('Tom');

class Animal3 {
    name = 'Animal';
    showName() {
        console.log('showName', this.name);
    }
}

class Cat3 extends Animal3 {
    name = 'Cat';
}

let cat3 = new Cat3();
cat3.showName();
// showName Cat
let animal3 = new Animal3();
animal3.showName();
// showName Animal

class Animal4 {
    name = 'Animal';
    constructor() {
        console.log('name', this.name);
    }
}

class Cat4 extends Animal4 {
    name = 'Cat';
}

let cat4 = new Cat4();
let animal4 = new Animal4();
// name Animal
// name Animal

class Animal5 {
    constructor() {
        console.log('name', this.getName());
    }
    getName() {
        return 'Animal';
    }
}

class Cat5 extends Animal5 {
    getName() {
        return 'Cat';
    }
}

let cat5 = new Cat5();
let animal5 = new Animal5();

// name Cat
// name Animal

class Animal6 {
    constructor() {
        console.log('name', this.name);
    }
    get name() {
        return 'Animal';
    }
}

class Cat6 extends Animal6 {
    get name() {
        return 'Cat';
    }
}

let cat6 = new Cat6();
let animal6 = new Animal6();
// name Cat
// name Animal

class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    get area() {
        return this.width * this.height;
    }

    static compare(r1, r2) {
        return r1.area > r2.area;
    }
}

let r1 = new Rectangle(10, 20);
let r2 = new Rectangle(20, 30);
console.log(Rectangle.compare(r1, r2));
// false

class Sample {
    static test() {
        console.log(this === Sample);
    }
}

Sample.test();
// true

class Sample2 { }

Sample2.show = function () {
    console.log(this === Sample2);
}

Sample2.show();
// true

class Counter {
    static count = 0;
    constructor() {
        Counter.count++;
    }
}
let c1 = new Counter();
let c2 = new Counter();
console.log(Counter.count);
// 2

class Shape {
    static compare(s1, s2) {
        if (s1.area === s2.area) {
            return 0;
        }
        if (s1.area < s2.area) {
            return -1;
        }
        return 1;
    }
}

class Rectangle2 extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    get area() {
        return this.width * this.height;
    }
}

let r3 = new Rectangle2(10, 20);
let r4 = new Rectangle2(20, 30);
console.log(Rectangle2.compare(r3, r4));
// -1

console.log(Rectangle2.__proto__ === Shape);
// true

class Person7 {
    constructor(name) {
        this.name = name;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    sayHello() {
        console.log('Hello ' + this.name);
    }
}

let person7 = new Person7('Jim');
person7.sayHello();

class Person8 {
    #name = '';
    constructor(name) {
        this.#name = name;
    }

    sayHello() {
        console.log('Hello ' + this.#name);
    }
}

let person8 = new Person8('Jeck Chen');
person8.sayHello();
// person8.#name;
// SyntaxError: Private field '#name' must be declared in an enclosing class

class MyArray extends Array {
    isEmpty() {
        return this.length === 0;
    }
}

let arr = new MyArray();
console.log(arr.isEmpty());
// true
arr.push(1);
console.log(arr.isEmpty());
// false
let arr2 = new MyArray(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
arr2 = arr2.filter(item => item > 5);
console.log(arr2);
console.log(arr2.isEmpty());
// MyArray(5) [ 6, 7, 8, 9, 10 ]
// false

class MyArray2 extends Array {
    isEmpty() {
        return this.length === 0;
    }

    static get [Symbol.species]() {
        return Array;
    }
}
let arr3 = new MyArray2(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
arr3 = arr3.filter(item => item > 5);
console.log(arr3);
// [ 6, 7, 8, 9, 10 ]

class Reactangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}

class Square extends Reactangle {
    constructor(length) {
        super(length, length);
    }
}

class Circle {
    constructor(radius) {
        this.radius = radius;
    }
}

function printArea(shape) {
    if (shape instanceof Reactangle) {
        console.log(shape.width * shape.height);
        return;
    }
    if (shape instanceof Circle) {
        console.log(Math.PI * shape.radius * shape.radius);
        return;
    }
}

printArea(new Square(5));
printArea(new Circle(5));
printArea(new Reactangle(5, 10));
// 25
// 78.53981633974483
// 50

function isInstanceOf(obj, clazz) {
    if (!obj) {
        return false;
    }
    if (!obj.__proto__) {
        return false;
    }
    let proto = obj.__proto__;
    do {
        if (proto === clazz.prototype) {
            return true;
        }
        proto = proto.__proto__;
        if (!proto) {
            return false;
        }
    }
    while (true);
}

console.log(isInstanceOf(new Square(5), Square));
console.log(isInstanceOf(new Square(5), Reactangle));
console.log(isInstanceOf(new Square(5), Circle));
// true
// true
// false

function Cat9() {
    this.name = 'Cat';
}

let cat9 = new Cat9();
Cat9.prototype = {};
console.log(cat9 instanceof Cat9);
// false

console.log(Reactangle.prototype.isPrototypeOf(new Reactangle(1, 5)));
console.log(Reactangle.prototype.isPrototypeOf(new Square(1, 5)));
console.log(Reactangle.prototype.isPrototypeOf(new Circle(1, 5)));
// true
// true
// false

let toString = Object.prototype.toString;
console.log(toString.call(new Reactangle(1, 5)));
console.log(toString.call([1, 2, 3]));
console.log(toString.call(null));
console.log(toString.call(undefined));
console.log(toString.call(new Date()));
console.log(toString.call(1));
console.log(toString.call('1'));
// [object Object]
// [object Array]
// [object Null]
// [object Undefined]
// [object Date]
// [object Number]
// [object String]

class Animal10 {
    static [Symbol.hasInstance](instance) {
        if (instance.eat) {
            return true;
        }
    }
}

console.log({ eat: true } instanceof Animal10);
console.log({} instanceof Animal10);
// true
// false

let obj = {
    [Symbol.toStringTag]: 'MyObject'
}
console.log({}.toString.call(obj));
// [object MyObject]

class Car {
    constructor(name) {
        this.name = name;
    }
}

let operateMixin = {
    start() {
        console.log(`${this.name} start`);
    },
    stop() {
        console.log(`${this.name} stop`);
    }
}

Object.assign(Car.prototype, operateMixin);
let car = new Car('BMW');
car.start();
car.stop();
// BMW start
// BMW stop

let safeOperateMixin = {
    __proto__: operateMixin,
    start() {
        console.log('safe check before start');
        super.start();
    },
    stop() {
        console.log('safe check before stop');
        super.stop();
    }
}

class SafeCar {
    constructor(name) {
        this.name = name;
    }
}

Object.assign(SafeCar.prototype, safeOperateMixin);
let safeCar = new SafeCar('BMW');
safeCar.start();
safeCar.stop();
// safe check before start
// BMW start
// safe check before stop
// BMW stop

let eventMixin = {
    getEventHandlers(eventName) {
        if (!this._eventHandlers) {
            this._eventHandlers = {};
        }
        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        }
        return this._eventHandlers[eventName];
    },
    off(eventName, handler) {
        let handlers = this.getEventHandlers(eventName);
        for (let i = handlers.length - 1; i >= 0; i--) {
            if (handlers[i] === handler) {
                handlers.splice(i, 1);
            }
        }
    },
    on(eventName, handler) {
        let handlers = this.getEventHandlers(eventName);
        handlers.push(handler);
    },
    trigger(eventName, ...args) {
        let handlers = this.getEventHandlers(eventName);
        for (let handler of handlers) {
            handler.call(this, ...args);
        }
    }
}

class Menu {
    constructor(name) {
        this.name = name;
    }

    select() {
        this.trigger('select', this.name);
    }
}

Object.assign(Menu.prototype, eventMixin);
let title = new Menu('title');
title.on('select', function (name) {
    console.log(`selected ${name}`);
});
title.select();
// selected title