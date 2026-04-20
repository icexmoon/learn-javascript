"use strict"
function testEval() {
    eval("console.log('hello world')");
}

// testEval();

function testEval2() {
    let result = eval("let i=0;++i;");
    console.log(result);
    // 1
}

// testEval2();

function testEval3() {
    let name = 'Jack';
    eval("console.log('hello ' + name)");
    // hello Jack
}

// testEval3();

function testEval4() {
    let name = 'Jack';
    let age = 18;
    eval(`
        age++;
        console.log('hello ' + name + ' ' + age);
    `);
    // hello Jack 19
}

testEval4();

function testEval5() {
    eval("function hello() {console.log('hello world')}");
    hello();
    // ReferenceError: hello is not defined
}

// testEval5();

function testCurry() {
    function curry(fn) {
        return function (a) {
            return function (b) {
                return fn(a, b);
            }
        }
    }

    function add(a, b) {
        return a + b;
    }

    let curryAdd = curry(add);
    console.log(curryAdd(1)(2));
}

// testCurry();

function testCurry2() {
    function add(a, b) {
        return a + b;
    }

    let _ = require('lodash');
    let curryAdd = _.curry(add);
    console.log(curryAdd(1)(2));
    console.log(curryAdd(1, 2));
}

testCurry2();

function testCurry3() { 
    let _ = require('lodash');
    function log(date, level, message){
        console.log(`${date} [${level}]: ${message}`);
    }

    let curryLog = _.curry(log);
    let todayLog = curryLog(new Date());
    let todayInfo = todayLog('INFO');
    let todayError = todayLog('ERROR');
    todayInfo('hello world');
    todayError('hello world');
    // Mon Apr 20 2026 15:36:33 GMT+0800 (中国标准时间) [INFO]: hello world
    // Mon Apr 20 2026 15:36:33 GMT+0800 (中国标准时间) [ERROR]: hello world
}

testCurry3();

function testCurry4() { 
    function curry(fn){
        return function curried(...args) {
            if (args.length >= fn.length) {
                return fn.apply(this, args);
            } else {
                return function (...args2) {
                    return curried.apply(this, args.concat(args2));
                }
            }
        }
    }

    function add(a, b, c) {
        return a + b + c;
    }

    let curryAdd = curry(add);
    console.log(curryAdd(1)(2)(3));
    console.log(curryAdd(1, 2)(3));
    console.log(curryAdd(1, 2, 3));
}

// testCurry4();

function testReference() { 
    let user = {
        _name: 'Mike',
        getName() { 
            return this._name;
        }
    }

    console.log(user.getName());
    // Mike
    let getName = user.getName;
    console.log(getName());
    // TypeError: Cannot read properties of undefined (reading '_name')
}

// testReference();

function testReference2() { 
    let user = {
        _name: 'Mike',
        getName() { 
            return this._name;
        }
    }

    console.log(user.getName());
    // Mike
    let getName = user.getName.bind(user);
    console.log(getName());
}

testReference2();