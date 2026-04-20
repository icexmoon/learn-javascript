"use strict";
function add(a, b) {
    return a + b;
}

console.log(add(1, 2));

let add2 = function (a, b) {
    return a + b;
}

console.log(add2(1, 2));

console.log(add3(1, 2));
function add3(a, b) {
    return a + b;
}

// console.log(add4(1, 2));
// ReferenceError: Cannot access 'add4' before initialization
let add4 = function (a, b) {
    return a + b;
}

function testSayHi() {
    if (Math.random() > 0.5) {
        function sayHi(name) {
            console.log(`Hi, ${name}`);
        }
    }
    else {
        function sayHi(name) {
            console.log(`Hello, ${name}`);
        }
    }

    sayHi('Tom');
    // ReferenceError: sayHi is not defined
}

// testSayHi();

function testSayHi2() {
    let sayHi;
    if (Math.random() > 0.5) {
        sayHi = function (name) {
            console.log(`Hi, ${name}`);
        }
    }
    else {
        sayHi = function (name) {
            console.log(`Hello, ${name}`);
        }
    }

    sayHi('Tom');
}

testSayHi2();

function testSayHi3() {
    let sayHi = Math.random() > 0.5 ?
        function (name) {
            console.log(`Hi, ${name}`);
        } :
        function (name) {
            console.log(`Hello, ${name}`);
        };
    sayHi('Tom');
}

testSayHi3();

function testSayHi4() {
    let sayHi = Math.random() > 0.5 ?
        (name) => {
            console.log(`Hi, ${name}`);
        } :
        (name) => {
            console.log(`Hello, ${name}`);
        };
    sayHi('Tom');
}

testSayHi4();

function createCounter() {
    let count = 0;
    return function () {
        return ++count;
    }
}

let counter = createCounter();
console.log(counter());
console.log(counter());
let counter2 = createCounter();
console.log(counter2());
console.log(counter2());
console.log(counter2());
// 1
// 2
// 1
// 2
// 3

let name = 'Tom';
function showName(){
    console.log(name);
}
showName();