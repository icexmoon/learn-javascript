let sum = new Function('a', 'b', 'return a + b');
console.log(sum(1, 2));
// 3

let funcContent = `
  if(!arr){
    return 0;
  }
  let total = 0;
  for(num of arr){
    total += num;
  }
  return total;
`;
let sumArr = new Function('...arr', funcContent);
console.log(sumArr(1, 2, 3, 4, 5));
// 15

// function test(){
//     let a = 1;
//     let codeFunc = new Function('return a + 1');
//     return codeFunc();
// }

// console.log(test());

function test() {
    let a = 1;
    let codeFunc = function () {
        return a + 1;
    };
    return codeFunc();
}

console.log(test());
// 2

function showTime() {
    console.log(Date.now());
}

setTimeout(showTime, 1000);

function sum2(a, b) {
    console.log(a + b);
}

setTimeout(sum2, 1000, 1, 2);
// 3

setTimeout(() => {
    console.log(Date.now());
}, 1000);

let timeout = setTimeout(() => console.log("hello"), 1000);
clearTimeout(timeout);

// let timeShowSchedule = setInterval(() => {
//     console.log(Date.now());
// }, 1000);
// setTimeout(() => clearInterval(timeShowSchedule), 5000);

// 嵌套 setTimeout

// setTimeout(function showTime(){
//     console.log(formatTime(Date.now()));
//     setTimeout(showTime, 1000);
// }, 1000);

/**
 * 时间格式化函数
 * @param {Date|string|number} date 日期对象/时间戳/日期字符串
 * @param {string} format 格式化模板，默认 YYYY-MM-DD HH:mm:ss
 * @returns {string} 格式化后的时间字符串
 */
function formatTime(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
    // 兼容入参：统一转为 Date 对象
    const d = new Date(date);

    // 补零函数：小于10的数字前面加0
    const pad = (num) => num.toString().padStart(2, '0');

    // 时间字段映射
    const timeMap = {
        YYYY: d.getFullYear(),
        MM: pad(d.getMonth() + 1), // 月份从0开始，需要+1
        DD: pad(d.getDate()),
        HH: pad(d.getHours()),
        mm: pad(d.getMinutes()),
        ss: pad(d.getSeconds())
    };

    // 替换模板
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => timeMap[match]);
}


function pingServer() {
    // 模拟测试服务器是否存活
    return Math.random() > 0.5;
}

// setTimeout(function ping(delayN = 1){
//     if(pingServer()){
//         console.log('服务器正常');
//         delayN = 1;
//     }else{
//         console.log('服务器异常');
//         delayN *= 2;
//         console.log(`延迟${delayN}秒重试`);
//     }
//     setTimeout(ping, 1000*delayN, delayN);
// }, 1000)

// 计算斐波那契数列
function fib(n) {
    if (n <= 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

// console.log('fib(10)', fib(10));
// console.log('fib(40)', fib(40));
// console.log('fib(40)', fib(40));
// console.log('fib(40)', fib(40));

let cache = new Map();
function cachedFib(n) {
    if (cache.has(n)) {
        return cache.get(n);
    }
    let result = fib(n);
    cache.set(n, result);
    return result;
}

// console.log('cachedFib(40)', cachedFib(40));
// console.log('cachedFib(40)', cachedFib(40));
// console.log('cachedFib(40)', cachedFib(40));

function cacheFunc(fn) {
    let cache = new Map();
    return function (...args) {
        let key = args.join(',');
        if (cache.has(key)) {
            return cache.get(key);
        }
        let result = fn(...args);
        cache.set(key, result);
        return result;
    }
}

let cachedFib2 = cacheFunc(fib);
// console.log('cachedFib2(40)', cachedFib2(40));
// console.log('cachedFib2(40)', cachedFib2(40));
// console.log('cachedFib2(40)', cachedFib2(40));

let myMath = {
    tag: 'myMath',
    fib: function (n) {
        console.log(`${this.tag} fib(${n})`);
        if (n <= 1) {
            return n;
        }
        return fib(n - 1) + fib(n - 2);
    }
}

console.log(myMath.fib(10));

let cachedFib3 = cacheFunc(myMath.fib);
console.log(cachedFib3(10))
// myMath fib(10)
// 55
// undefined fib(10)
// 55

function cacheObjFunc(obj, fn) {
    let cache = new Map();
    return function (...args) {
        let key = args.join(',');
        if (cache.has(key)) {
            return cache.get(key);
        }
        let result = fn.call(obj, ...args);
        cache.set(key, result);
        return result;
    }
}

let cachedFib4 = cacheObjFunc(myMath, myMath.fib);
console.log(cachedFib4(10))
// myMath fib(10)
// 55

let user2 = {
    name: 'Jack',
    hello() {
        console.log(`hello ${this.name}`);
    }
};
user2.hello();
setTimeout(user2.hello, 1000);
// hello undefined
setTimeout(function () {
    user2.hello();
}, 1000);
// hello Jack

setTimeout(user2.hello.bind(user2), 1000);
// hello Jack

function multiply(a, b) {
    return a * b;
}

let double = multiply.bind(null, 2);
console.log(double(1));
console.log(double(2));
console.log(double(3));
// 2
// 4
// 6

function partial(fn, ...args) {
    return function (...rest) {
        return fn.call(this, ...args, ...rest);
    }
}

let user3 = {
    name: 'Jack',
    hello(prefix, suffix) {
        console.log(`${prefix} ${this.name} ${suffix}`);
    }
}

user3.hello2 = partial(user3.hello, 'hello');
user3.hello2('!');
// hello Jack !

let names = {
    title: 'Mr',
    names: ['Tom', 'Jerry'],
    hello() {
        this.names.forEach((name) => {
            console.log(`hello, ${this.title} ${name}`);
        })
    }
}
names.hello();
// hello, Mr Tom
// hello, Mr Jerry

function delayCall(fn, delay){
    return function (){
        console.log('call function after delay time');
        setTimeout(()=>{
            fn.apply(this, arguments);
        }, delay);
    }
}

function sayHello(name) {
    console.log(`hello ${name}`);
}

delayCall(sayHello, 1000)('Tom');

function delayCall2(fn, delay){
    return function (...args){
        console.log('call function after delay time');
        let ctx = this;
        setTimeout(function () {
            fn.apply(ctx, args);
        }, delay);
    }
}

delayCall2(sayHello, 1000)('Tom');
