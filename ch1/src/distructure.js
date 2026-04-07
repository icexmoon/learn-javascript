// 解构赋值
let names = ['Alice', 'Bob', 'Tiff', 'Light'];
let [name1, name2, name3, name4] = names;
console.log(name1, name2, name3, name4);
// Alice Bob Tiff Light

let [firstName, lastName] = "John Smith".split(" ");
console.log(firstName, lastName);
// John Smith

let [a, , c] = [1, 2, 3];
console.log(a, c);
// 1 3

let [one, two, three] = new Set([1, 2, 3]);
console.log(one, two, three);
// 1 2 3

let userName = {};
[userName.firstName, userName.lastName] = "John Smith".split(" ");
console.log(userName.firstName, userName.lastName);
// John Smith

let user = { name: "John", age: 30 };
for (let [key, value] of Object.entries(user)) {
    console.log(`${key}:${value}`);
}
// name:John
// age:30

let userMap = new Map([["name", "John"], ["age", 30]]);
for (let [key, value] of userMap) {
    console.log(`${key}:${value}`);
}
// name:John
// age:30

let [one2, two2, ...rest] = [1, 2, 3, 4, 5];
console.log(rest);
// [ 3, 4, 5 ]

let [firstName2, lastName2] = [];
console.log(firstName2, lastName2);
// undefined undefined

let [firstName3, lastName3 = "Smith"] = "John".split(" ");
console.log(firstName3, lastName3);
// John Smith

let person = { name: "John", age: 30 };
let { name, age } = person;
console.log(name, age);
// John 30

let { name: personName } = person;
console.log(personName);
// John

let { name: personName3, ...personRest } = { name: "John", age: 30, city: "New York" };
console.log(personRest);
// { age: 30, city: 'New York' }

let userName2, userAge2;
({ name: userName2, age: userAge2 } = { name: "John", age: 30 });
console.log(userName2, userAge2);
// John 30

let options = { title: "Menu" }
let { height = 100, width = 200, title = "title" } = options;
console.log(height, width, title);
// 100 200 Menu

let person2 = { 
    name: "John", 
    age: 30,
    skills: ["HTML", "CSS", "JS"],
    address: { 
        city: "New York", 
        country: "USA" 
    },
 };

 let { 
    name: personName4, 
    age: personAge4, 
    skills: [skill1, skill2, skill3],
    address: { city: personCity, country: personCountry },
 } = person2;

 console.log(personName4, personAge4, skill1, skill2, skill3, personCity, personCountry);
//  John 30 HTML CSS JS New York USA

function setOption(height = 100, width = 200, title = "title"){
    console.log(height, width, title);
}

setOption(undefined, undefined, "Menu");
// 100 200 Menu
function setOption2({ height = 100, width = 200, title = "title" }){
    console.log(height, width, title);
}

setOption2({width: 300});
// 100 300 title
setOption2({});
// 100 200 title

function setOption3({ height = 100, width = 200, title = "title" } = {}){
    console.log(height, width, title);
}

setOption3();
// 100 200 title
