function sum(...numbers) {
    let sum = 0;
    for (let number of numbers) {
        sum += number;
    }
    return sum;
}

console.log(sum(1, 2, 3));
console.log(sum());
// 6
// 0

function display(message, ...names) {
    console.log(message, names);
}

display("Hello", "Alice", "Bob", "Charlie");
// Hello [ 'Alice', 'Bob', 'Charlie' ]

function sum2() {
    let sum = 0;
    for (let number of arguments) {
        sum += number;
    }
    return sum;
}

console.log(sum2(1, 2, 3));
// 6


function test() {
    console.log("test", arguments);
    let test2 = () => {
        console.log("test2", arguments);
    }
    test2();
}

test(1, 2, 3);
// test [Arguments] { '0': 1, '1': 2, '2': 3 }
// test2 [Arguments] { '0': 1, '1': 2, '2': 3 }

let numbers = [1, 2, 3];
console.log(sum(...numbers));

let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];
console.log(arr2);
// [ 1, 2, 3, 4, 5 ]

let oldArr = [1, 2, 3];
let newArr = [...oldArr];
oldArr.push(4);
console.log(oldArr);
console.log(newArr);
// [ 1, 2, 3, 4 ]
// [ 1, 2, 3 ]

let person1 = { name: "Alice", age: 20 };
let person2 = { ...person1 };
person1.name = "Bob";
console.log(person1);
console.log(person2);
// { name: 'Bob', age: 20 }
// { name: 'Alice', age: 20 }

let chars = "abcdefg";
console.log([...chars]);
// [
//   'a', 'b', 'c',
//   'd', 'e', 'f',
//   'g'
// ]

let char2 = "abcdefg";
console.log(Array.from(char2))

function func1() {
}
console.log(func1.name);
// func1

let func2 = function () {
}
console.log(func2.name);
// func2

let person = {
    func1: () => { },
    func2: function () { },
}

console.log(person.func1.name);
console.log(person.func2.name);
// func1
// func2

let arr = [function () { }];
console.log(arr[0].name);
//

function func3() { }
function func4(num1, num2) { }
function func5(num1, num2, ...rest) { }

console.log(func3.length);
console.log(func4.length);
console.log(func5.length);
// 0
// 2
// 2

function countFunc() {
    console.log(countFunc.count);
    countFunc.count++;
}
countFunc.count = 0;
countFunc();
countFunc();
countFunc();
// 0
// 1
// 2

let func6 = function (param) {
    if (param) {
        console.log(param);
    }
    else {
        func6("Tom");
    }
};
func6();
// Tom

// let func7 = function (param) {
//     if (param) {
//         console.log(param);
//     }
//     else {
//         func7("Tom");
//     }
// };
// let func8 = func7;
// func7 = null;
// func8();
// TypeError: func7 is not a function

let func7 = function funcSelf(param) {
    if (param) {
        console.log(param);
    }
    else {
        funcSelf("Tom");
    }
};
let func8 = func7;
func7 = null;
func8();