let target = {};
let proxy = new Proxy(target, {});
proxy.a = 1;
console.log(proxy.a);
console.log(target.a);
for (let i in proxy) {
    console.log(i);
}
// 1
// 1
// a

let numbers = [1, 2, 3, 4, 5];
numbers = new Proxy(numbers, {
    get(target, index) {
        if (index in target) {
            return target[index];
        }
        return 0;
    }
});
console.log(numbers[1]);
console.log(numbers[100]);
// 2
// 0

let dictionary = {
    'hello': '你好',
    'world': '世界'
}
dictionary = new Proxy(dictionary, {
    get(target, phrase) {
        if (phrase in target) {
            return target[phrase];
        }
        return phrase;
    }
});
console.log(dictionary['hello']);
console.log(dictionary['world']);
console.log(dictionary['universe']);
// 你好
// 世界
// universe

let numbers2 = [];
numbers2 = new Proxy(numbers2, {
    set(target, index, value) {
        if (typeof value === 'number') {
            target[index] = value;
            return true;
        }
        return false;
    }
});
numbers2.push(1);
numbers2.push(2);
console.log(numbers2);
// [ 1, 2 ]
// numbers2.push('a');
// TypeError: 'set' on proxy: trap returned falsish for property '2'

let user = {
    name: '张三',
    age: 20,
    _password: '123'
};
user = new Proxy(user, {
    ownKeys(target) {
        return Object.keys(target).filter(key => !key.startsWith('_'));
    }
});
for (let key in user) {
    console.log(key);
}
// name
// age

let user2 = {
    name: '张三',
    age: 20,
    _password: '123'
};

user2 = new Proxy(user2, {
    ownKeys(target) {
        let keys = Object.keys(target);
        return [...keys, 'a', 'b', 'c'];
    },
    getOwnPropertyDescriptor(target, key) {
        if (key in target) {
            return Object.getOwnPropertyDescriptor(target, key);
        }
        if (['a', 'b', 'c'].includes(key)) {
            return {
                value: 0,
                writable: true,
                enumerable: true,
                configurable: true
            };
        }
    }
});

for (let key in user2) {
    console.log(key);
}
// name
// age
// _password
// a
// b
// c

function propertyProtectProxy(obj) {
    return new Proxy(obj, {
        get(target, key) {
            if (key.startsWith('_')) {
                throw new Error(`属性 ${key} 是受保护的`);
            }
            let value = target[key];
            return typeof value === 'function' ? value.bind(target) : value;
        },
        set(target, key, value) {
            if (key.startsWith('_')) {
                throw new Error(`属性 ${key} 是受保护的`);
            }
            target[key] = value;
            return true;
        },
        deleteProperty(target, key) {
            if (key.startsWith('_')) {
                throw new Error(`属性 ${key} 是受保护的`);
            }
            delete target[key];
            return true;
        },
        ownKeys(target) {
            return Object.keys(target).filter(key => !key.startsWith('_'));
        }
    });
}

let user3 = {
    name: '张三',
    age: 20,
    _password: '123'
};
user3 = propertyProtectProxy(user3);
console.log(user3.name);
console.log(user3.age);
// console.log(user3._password);
// 张三
// 20
// Error: 属性 _password 是受保护的

let user4 = {
    name: '张三',
    age: 20,
    _password: '123',
    checkPassword(password) {
        return this._password === password;
    }
};

user4 = propertyProtectProxy(user4);
console.log(user4.checkPassword('123'));
// true

let range = {
    from: 1,
    to: 5
}

range = new Proxy(range, {
    has(target, key) {
        return key >= target.from && key <= target.to;
    }
});
for (let i = 0; i <= 10; i++) {
    if (i in range) {
        console.log(i);
    }
}
// 1
// 2
// 3
// 4
// 5

function testWrapFunc() {
    function displayPerson(name, age) {
        console.log(`Name is ${name} and age is ${age}`);
    }

    function delayFunc(func, wait) {
        return function (...args) {
            setTimeout(() => {
                func.apply(this, args);
            }, wait);
        }
    }

    displayPerson = delayFunc(displayPerson, 1000);
    displayPerson('Tom', 20);
    // Name is Tom and age is 20
}

// testWrapFunc();

function testWrapFunc2() {
    function displayPerson(name, age) {
        console.log(`Name is ${name} and age is ${age}`);
    }

    function delayFunc(func, wait) {
        return function (...args) {
            setTimeout(() => {
                func.apply(this, args);
            }, wait);
        }
    }

    console.log(displayPerson.name);
    console.log(displayPerson.length);
    // displayPerson
    // 2
    displayPerson = delayFunc(displayPerson, 1000);
    console.log(displayPerson.name);
    console.log(displayPerson.length);
    //
    // 0   
    displayPerson('Tom', 20);
    // Name is Tom and age is 20
}

// testWrapFunc2();

function testWrapFunc3() {
    function displayPerson(name, age) {
        console.log(`Name is ${name} and age is ${age}`);
    }

    function delayFunc(func, wait) {
        return new Proxy(func, {
            apply(target, thisArg, args) {
                setTimeout(() => {
                    target.apply(thisArg, args);
                }, wait);
            }
        });
    }

    console.log(displayPerson.name);
    console.log(displayPerson.length);
    // displayPerson
    // 2
    displayPerson = delayFunc(displayPerson, 1000);
    console.log(displayPerson.name);
    console.log(displayPerson.length);
    // displayPerson
    // 2
    displayPerson('Tom', 20);
    // Name is Tom and age is 20
}

// testWrapFunc3();

function testReflect() {
    let user = {
        name: '张三',
        age: 20,
    }
    user = new Proxy(user, {
        get(target, key) {
            return Reflect.get(target, key);
        },
        set(target, key, value) {
            return Reflect.set(target, key, value);
        }
    })
    console.log(user.name);
    console.log(user.age);
}

// testReflect();

function testReflect2() {
    let user = {
        _name: '张三',
        get name() {
            return this._name;
        }
    }
    user = new Proxy(user, {
        get(target, key) {
            return target[key];
        },
    })
    let admin = {
        _name: '李四',
        __proto__: user
    }
    console.log(admin.name);
    // 张三
}

testReflect2();

function testReflect3() {
    let user = {
        _name: '张三',
        get name() {
            return this._name;
        }
    }
    user = new Proxy(user, {
        get(target, key, receiver) {
            return Reflect.get(target, key, receiver);
        },
    })
    let admin = {
        _name: '李四',
        __proto__: user
    }
    console.log(admin.name);
    // 李四
}

// testReflect3();

function testInnerData() {
    let map = new Map();
    let proxy = new Proxy(map, {});
    proxy.set('name', '张三');
    // TypeError: Method Map.prototype.set called on incompatible receiver #<Map>
}

// testInnerData();

function testInnerData2() {
    let map = new Map();
    let proxy = new Proxy(map, {
        get(target, key, receiver) {
            let value = Reflect.get(...arguments);
            return typeof value === 'function' ? value.bind(target) : value;
        },
    });
    proxy.set('name', '张三');
    console.log(proxy.get('name'));
}

testInnerData2();

function testPrivateAttr() {
    class Person {
        #name = '张三';
        getName() {
            return this.#name;
        }
    }
    let person = new Person();
    person = new Proxy(person, {});
    console.log(person.getName());
    // TypeError: Cannot read private member #name from an object whose class did not declare it
}

// testPrivateAttr();

function testPrivateAttr2() {
    class Person {
        #name = '张三';
        getName() {
            return this.#name;
        }
    }
    let person = new Person();
    person = new Proxy(person, {
        get(target, key, receiver) {
            let value = Reflect.get(...arguments);
            return typeof value === 'function' ? value.bind(target) : value;
        }
    });
    console.log(person.getName());
}

// testPrivateAttr2();

function testRevocableProxy() {
    let obj = {
        data: 'hello'
    }
    let { proxy, revoke } = Proxy.revocable(obj, {});
    console.log(proxy.data);
    revoke();
    console.log(proxy.data);
    // TypeError: Cannot perform 'get' on a proxy that has been revoked
}

// testRevocableProxy();