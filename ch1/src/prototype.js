let person = {
    name: 'Jonh',
    age: 20
}

let teacher = {
    school: 'MIT',
    __proto__: person
}

console.log(teacher.name);
console.log(teacher.age);
console.log(teacher.school)
// Jonh
// 20
// MIT

let animal = {
    eat() {
        console.log('Eat');
    }
};

let rabbit = {
    jump() {
        console.log('Jump');
    },
    __proto__: animal
}

let longEarRabbit = {
    __proto__: rabbit
}

longEarRabbit.eat();
longEarRabbit.jump();

// 通过原型修改属性
let animal2 = {
    eat() {
        console.log('Eat');
    }
};

let rabbit2 = {
    __proto__: animal2
}

rabbit2.eat = function () {
    console.log('Eat2');
}

rabbit2.eat();
animal2.eat();
// Eat2
// Eat

let person2 = {
    firstName: 'Jonh',
    lastName: 'Doe',
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    },
    set fullName(value) {
        let parts = value.split(' ');
        this.firstName = parts[0];
        this.lastName = parts[1];
    }
}
let teacher2 = {
    school: 'MIT',
    __proto__: person2
}
teacher2.fullName = 'Mike Smith';
console.log(teacher2.fullName);
console.log(person2.fullName);
// Mike Smith
// Jonh Doe

let person3 = {
    name: 'Jonh',
    age: 20,
}

let teacher3 = {
    school: 'MIT',
    __proto__: person3
}

console.log(Object.keys(teacher3));
// [ 'school' ]
for (let key in teacher3) {
    if (teacher3.hasOwnProperty(key)) {
        console.log('Own property: ' + key);
    }
    else {
        console.log('Inherited property: ' + key);
    }
}
// Own property: school
// Inherited property: name
// Inherited property: age
let basePerson = {
    toString() {
        return `${this.name} ${this.age}`;
    }
}

let Person = function (name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype = basePerson;
let person4 = new Person('Jonh', 20);
console.log(person4.toString());
// Jonh 20
console.log(person4.__proto__ === Person.prototype)
// true

let Person5 = function (name, age) {
    this.name = name;
    this.age = age;
}
console.log(Person5.prototype.constructor === Person5);

let person5 = new Person5('Jonh', 20);
let person6 = new person5.constructor('Mike', 30);
console.log(person6.name);
// Mike

let Person7 = function (name, age) {
    this.name = name;
    this.age = age;
}
Person7.prototype.toString = function () {
    return `${this.name} ${this.age}`;
}
let person7 = new Person7('Jonh', 20);
console.log(person7.toString());

let Person8 = function (name, age) {
    this.name = name;
    this.age = age;
}

Person8.prototype = {
    constructor: Person8,
    toString() {
        return `${this.name} ${this.age}`;
    }
}

let person8 = new Person8('Jonh', 20);
console.log(person8.toString());

let obj = {};
console.log(obj.toString());
// [object Object]

let obj2 = new Object();
console.log(obj2.__proto__ === Object.prototype);
console.log(obj2.toString === obj2.__proto__.toString);
console.log(obj2.toString === Object.prototype.toString);
// true
// true
// true

let arr = [1, 2, 3];
console.log(arr.__proto__ === Array.prototype);
// true

let func = function () { };
console.log(func.__proto__ === Function.prototype);
// true

String.prototype.repeat = function (times) {
    let result = '';
    for (let i = 0; i < times; i++) {
        result += this;
    }
    return result;
}

console.log('a'.repeat(5));
// aaaaa

let obj3 = {
    0: 'hello',
    1: 'world',
    length: 2
}

obj3.join = Array.prototype.join;
console.log(obj3.join(','));
// hello,world

let obj4 = {
    0: 'hello',
    1: 'world',
    length: 2
};

console.log(Object.getPrototypeOf(obj4) === Object.prototype);
Object.setPrototypeOf(obj4, Array.prototype);
console.log(obj4.join(','));
// hello,world

let obj5 = Object.create(Array.prototype);
obj5.push('hello', 'world');
console.log(obj5.join(','));
// hello,world

let obj6 = {
    0: 'hello',
    1: 'world',
    length: 2,
    __proto__: Array.prototype
}
console.log(obj6.join(','));

let obj7 = Object.create(Array.prototype,{
    0: {
        value: 'hello'
    },
    1: {
        value: 'world'
    },
    length: {
        value: 2
    }
});
console.log(obj7.join(','));
