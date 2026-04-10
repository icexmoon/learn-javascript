let promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            resolve(42);
        }
        else {
            reject(new Error('失败'));
        }
    }, 1000);
});

promise.then(function (value) {
    console.log('success', value); // 42
}, function (error) {
    console.log('fail', error); // Error: 失败
});

function createPromise() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve(42);
            }
            else {
                reject(new Error('失败'));
            }
        }, 1000);
    });
}

let promise2 = createPromise();
promise2.then(function (value) {
    console.log('success', value); // 42
})
    .catch(function (error) {
        console.log('fail', error);
    })
    .finally(function () {
        console.log('finally');
    });

new Promise(function (resolve, reject) {
    setTimeout(() => {
        let randomNum = Math.random();
        console.log(`${randomNum}`);
        resolve(randomNum);
    }, 1000);
}).then(function (value) {
    let randomNum = Math.random();
    console.log(`${value} + ${randomNum}`)
    return value + randomNum;
}).then(function (value) {
    let randomNum = Math.random();
    console.log(`${value} + ${randomNum}`)
    return value + randomNum;
}).then(function (value) {
    console.log(value);
});
// 0.30704685466788906
// 0.30704685466788906 + 0.6445051295238531
// 0.9515519841917421 + 0.6476301325887244
// 1.5991821167804665

let promise3 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        let randomNum = Math.random();
        console.log(`${randomNum}`);
        resolve(randomNum);
    }, 1000);
});

promise3.then(function (value) {
    let randomNum = Math.random();
    console.log(`${value} + ${randomNum}`)
    return value + randomNum;
});

promise3.then(function (value) {
    let randomNum = Math.random();
    console.log(`${value} + ${randomNum}`)
    return value + randomNum;
});

promise3.then(function (value) {
    let randomNum = Math.random();
    console.log(`${value} + ${randomNum}`)
    return value + randomNum;
});
// 0.43215362083224207
// 0.43215362083224207 + 0.5543302400890311
// 0.43215362083224207 + 0.6470879646639638
// 0.43215362083224207 + 0.6314888642633443

new Promise(function (resolve, reject) {
    setTimeout(() => {
        let randomNum = Math.random();
        console.log(`${randomNum}`);
        resolve(randomNum);
    }, 1000);
}).then(function (value) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            let randomNum = Math.random();
            console.log(`${value} + ${randomNum}`)
            resolve(value + randomNum);
        }, 1000);
    });
}).then(function (value) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            let randomNum = Math.random();
            console.log(`${value} + ${randomNum}`)
            resolve(value + randomNum);
        }, 1000);
    });
}).then(function (value) {
    console.log(value);
});
// 0.9100113268839283
// 0.9100113268839283 + 0.017846977573172218
// 0.9278583044571005 + 0.24503169342106612
// 1.1728899978781666

new Promise(function (resolve, reject) {
    resolve(1);
}).then(function (value) {
    value++;
    console.log(value);
    return value;
}).then(function (value) {
    value++;
    console.log(value);
    return value;
}).then(function (value) {
    throw new Error('出错了');
}).catch(function (err) {
    console.log(err);
});
// 2
// 3
// Error: 出错了
//     at D:\workspace\learn-javascript\ch1\src\promise.js:135:11
//     at processTicksAndRejections (node:internal/process/task_queues:96:5)

let promise4 = createPromise();
promise4.then(function (value) {
    throw new Error('出错了');
})
    .catch(function (err) {
        console.log(err);
        throw new Error('新的错误');
    })
    .then(function (value) {
        console.log('这里不会被执行');
    })
    .catch(function (err) {
        console.log(err);
    });
// Error: 失败
//     at Timeout._onTimeout (D:\workspace\learn-javascript\ch1\src\promise.js:25:24)
//     at listOnTimeout (node:internal/timers:559:17)
//     at processTimers (node:internal/timers:502:7)
// Error: 新的错误
//     at D:\workspace\learn-javascript\ch1\src\promise.js:151:11

Promise.all([
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2);
        }, 500);
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(3);
        }, 3000);
    })
]).then(function (numbers) {
    console.log(numbers);
});
// [ 1, 2, 3 ]

Promise.all([
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Promise 失败'));
        }, 500);
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(3);
        }, 3000);
    })
]).then(function (numbers) {
    console.log(numbers);
}).catch(function (err) {
    console.log(err);
});
// Error: Promise 失败
//     at Timeout._onTimeout (D:\workspace\learn-javascript\ch1\src\promise.js:195:20)
//     at listOnTimeout (node:internal/timers:559:17)
//     at processTimers (node:internal/timers:502:7)