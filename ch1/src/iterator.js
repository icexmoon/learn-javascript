let numbers = [1, 2, 3, 4, 5]

for (let num of numbers) {
    console.log(num)
}

// 1
// 2
// 3
// 4
// 5

let person = {
    name: 'John',
    age: 30
}
for (let key in person) {
    console.log(key, person[key])
}
// name John
// age 30

let message = 'Hello';
for (let char of message) {
    console.log(char)
}
// H
// e
// l
// l
// o

let range = {
    from: 1,
    to: 5
}

range[Symbol.iterator] = function () {
    return {
        current: this.from,
        last: this.to,
        next() {
            if (this.current <= this.last) {
                return { done: false, value: this.current++ }
            } else {
                return { done: true }
            }
        }
    }
}

for (let num of range) {
    console.log(num)
}

// 1
// 2
// 3
// 4
// 5

let range2 = {
    from: 1,
    to: 5,
    [Symbol.iterator]() {
        this.current = this.from
        return this;
    },
    next() {
        if (this.current <= this.to) {
            return { done: false, value: this.current++ }
        } else {
            return { done: true }
        }
    }
}

for (let num of range2) {
    console.log(num)
}

// 1
// 2
// 3
// 4
// 5

let array = Array.from(range2);
console.log(array);
// [ 1, 2, 3, 4, 5 ]

let arrayLike = {
    '0': 'Hello',
    '1': 'World',
    '2': '!',
    length: 3
}

let arr = Array.from(arrayLike);
console.log(arr);
// [ 'Hello', 'World', '!' ]