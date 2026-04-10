function testPromiseAll() {
    Promise.all([
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1);
            }, 1000);
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('模拟异步执行失败'));
            }, 500);
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(3);
            }, 3000);
        })
    ]).then(function (results) {
        console.log('这里不会生效');
    }).catch(function (err) {
        console.log('异常捕获', err);
    });
    // 异常捕获 Error: 模拟异步执行失败
    //     at Timeout._onTimeout (D:\workspace\learn-javascript\ch1\src\promise2.js:10:24)
    //     at listOnTimeout (node:internal/timers:559:17)
    //     at processTimers (node:internal/timers:502:7)
}
// testPromiseAll();
function testPromiseAllSettled() {
    Promise.allSettled([
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1);
            }, 1000);
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('模拟异步执行失败'));
            }, 500);
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(3);
            }, 3000);
        })
    ])
        .then(function (results) {
            results.forEach((result, num) => {
                if (result.status === 'fulfilled') {
                    console.log(`第${num}个结果成功`, result.value);
                } else {
                    console.log(`第${num}个结果失败`, result.reason.message);
                }
            });
        });
    // 第0个结果成功 1
    // 第1个结果失败 模拟异步执行失败
    // 第2个结果成功 3
}
// testPromiseAllSettled();
function testPromiseRace() {
    Promise.race([
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
                reject(new Error('模拟异步执行失败'));
            }, 3000);
        })
    ]).then(function (result) {
        console.log('第一个执行成功的任务', result);
    }).catch(function (err) {
        console.log('失败', err);
    });
    // 第一个执行成功的任务 2
}

// testPromiseRace();
function testPromiseRaceError() {
    Promise.race([
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1);
            }, 1000);
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('模拟异步执行失败'));
            }, 500);
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(3);
            }, 3000);
        })
    ])
        .then(function (result) {
            console.log('第一个执行成功的任务', result);
        }).catch(function (err) {
            console.log('失败', err);
        });
    // 失败 Error: 模拟异步执行失败
}

// testPromiseRaceError();

function testPromiseAny() {
    Promise.any([
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1);
            }, 1000);
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('模拟异步执行失败'));
            }, 500);
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(3);
            }, 3000);
        })
    ]).then(function (result) {
        console.log('第一个执行成功的任务', result);
    });
    // 第一个执行成功的任务 1
}

// testPromiseAny();

function testPromiseAnyError() {
    Promise.any([
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('任务1执行失败'));
            }, 1000);
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('任务2执行失败'));
            }, 500);
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('任务3执行失败'));
            }, 3000);
        })
    ])
        .then(function (result) {
            console.log('第一个执行成功的任务', result);
        }).catch(function (errors) {
            if (errors instanceof AggregateError) {
                console.log('所有任务都执行失败');
                for (const [index, error] of errors.errors.entries()) {
                    console.log(`任务${index}执行失败`, error.message);
                }
            }
        });
    // 所有任务都执行失败
    // 任务0执行失败 任务1执行失败
    // 任务1执行失败 任务2执行失败
    // 任务2执行失败 任务3执行失败
}

// testPromiseAnyError();

function testPromiseResolve() {
    Promise.resolve(1).then(function (result) {
        console.log('resolve', result);
    });
    // resolve 1
}

// testPromiseResolve();

function testPromiseResolve2() {
    new Promise(function (resolve) {
        resolve(1);
    }).then(function (result) {
        console.log('resolve', result);
    });
    // resolve 1
}

// testPromiseResolve2();

function testPromiseReject() {
    Promise.reject(new Error('模拟异步执行失败'))
        .catch(function (err) {
            console.log('失败', err);
        });
    // 失败 Error: 模拟异步执行失败
}

// testPromiseReject();

function testPromiseReject2() {
    new Promise(function (resolve, reject) {
        reject(new Error('模拟异步执行失败'));
    }).catch(function (err) {
        console.log('失败', err);
    });
    // 失败 Error: 模拟异步执行失败
}

// testPromiseReject2();

function testPromisefication() {
    function asyncTask(data, callback) {
        setTimeout(() => {
            let result = Math.random();
            if (result > 0.5) {
                callback(new Error('模拟异步执行失败'));
            }
            else {
                callback(null, result);
            }
        }, 1000);
    }
    asyncTask(1, (error, result) => {
        if (error) {
            console.log('失败', error);
        }
        else {
            console.log('成功', result);
        }
    });
}

// testPromisefication();
// testPromisefication();
// testPromisefication();

function testPromisefication2() {
    function asyncTask(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let result = Math.random();
                if (result > 0.5) {
                    reject(new Error('模拟异步执行失败'));
                }
                else {
                    resolve(result);
                }
            }, 1000);
        });
    }

    asyncTask(1)
        .then(function (result) {
            console.log('成功', result);
        })
        .catch(function (error) {
            console.log('失败', error);
        });
}

// testPromisefication2();
// testPromisefication2();
// testPromisefication2();

function testPromisefication3() {
    function asyncTask(data, callback) {
        setTimeout(() => {
            let result = Math.random();
            if (result > 0.5) {
                callback(new Error('模拟异步执行失败'));
            }
            else {
                callback(null, result);
            }
        }, 1000);
    }

    function promisefication(asyncTask, data) {
        return new Promise((resolve, reject) => {
            asyncTask(data, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    }

    promisefication(asyncTask, 1)
        .then(function (result) {
            console.log('成功', result);
        })
        .catch(function (error) {
            console.log('失败', error);
        });
}

// testPromisefication3();
// testPromisefication3();
// testPromisefication3();

function testPromisefication4() {
    function asyncTask(data, callback) {
        setTimeout(() => {
            let result = Math.random();
            if (result > 0.5) {
                callback(new Error('模拟异步执行失败'));
            }
            else {
                callback(null, result);
            }
        }, 1000);
    }

    function promisefication(fn) {
        return function (...args) {
            return new Promise(function (resolve, reject) {
                fn(...args, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        }
    }

    promisefication(asyncTask)(1)
        .then(function (result) {
            console.log(result);
        })
        .catch(function (err) {
            console.log(err);
        });
}

// testPromisefication4();
// testPromisefication4();
// testPromisefication4();

function testPromisefication5() {
    const { promisify } = require('util');
    function asyncTask(data, callback) {
        setTimeout(() => {
            let result = Math.random();
            if (result > 0.5) {
                callback(new Error('模拟异步执行失败'));
            }
            else {
                callback(null, result);
            }
        }, 1000);
    }
    promisify(asyncTask)(1)
        .then(result => {
            console.log('成功', result);
        })
        .catch(err => {
            console.log('失败', err);
        });
}

// testPromisefication5();
// testPromisefication5();
// testPromisefication5();