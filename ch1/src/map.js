let map = new Map();
map.set('name', 'John');
map.set('age', 30);
console.log(map.get('name'));
console.log(map.get('age'));
// John
// 30
console.log(map.size);
// 2

let emails = new Map();
let john = { name: 'John' };
let jack = { name: 'Jack' };
emails.set(john, 'john@mail');
emails.set(jack, 'jack@mail');
console.log(emails.get(john));
console.log(emails.get(jack));
// john@mail
// jack@mail

let map2 = new Map();
map2.set(1, 'one');
map2.set('1', 'two');
console.log(map2.size);
console.log(map2.get(1));
console.log(map2.get('1'));
// 2
// one
// two

let map3 = new Map();
map3.set(true, 'boolean')
    .set(1, 'number');
console.log(map3.get(true));
console.log(map3.get(1));
// boolean
// number

let map4 = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
]);

for (let [key, value] of map4) {
    console.log(key + ': ' + value);
}

// 1: one
// 2: two
// 3: three

let map5 = new Map([
    ['1', 'one'],
    ['2', 'two'],
    ['3', 'three']
]);
for (let [key, value] of map5.entries()) {
    console.log(key + ': ' + value);
}

// 1: one
// 2: two
// 3: three

let map6 = new Map([
    ["name", "jack"],
    ["age", 16]
]);
console.log(map6.get("name"));

function getMapFromObj(obj) {
    if (!obj) {
        return null;
    }
    return new Map(Object.entries(obj));
}

let map7 = getMapFromObj({ name: 'jack', age: 16 });
console.log(map7.get('name'));
console.log(map7.get('age'));
// jack
// 16

function getObjFromMap(map) {
    if (!map) {
        return null;
    }
    return Object.fromEntries(map.entries());
}

let map8 = new Map([
    ['name', 'jack'],
    ['age', 16]
]);

let obj = getObjFromMap(map8);
console.log(obj.name);
console.log(obj.age);
// jack
// 16

let set = new Set();
let person1 = { name: 'jack' };
let person2 = { name: 'tom' };
let person3 = { name: 'lucy' };
set.add(person1).add(person2).add(person3);
set.add(person1);
console.log(set.size);
// 3

for (let person of set) {
    console.log(person.name);
}
// jack
// tom
// lucy

set.forEach((person, personAgain, set) => {
    console.log(person.name);
});
// jack
// tom
// lucy


let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"

function staticString(str){
    let map = new Map();
    if(!str){
        return map;
    }
    for (let char of str) {
        if(map.has(char)){
            map.set(char, map.get(char) + 1);
        }
        else{
            map.set(char, 1);
        }
    }
    return map;
}

function aclean(arr) {
    let maps = [];
    let strs = [];
    for(let str of arr){
        str = str.toLowerCase();
        let charMap = staticString(str);
        if(maps.length === 0){
            maps.push(charMap);
            strs.push(str);
        }
        else{
            let same = false;
            for(let value of maps){
                if(compareCharMap(charMap, value)){
                    same = true;
                    break;
                }
            }
            if(!same){
                maps.push(charMap);
                strs.push(str);
            }
        }
    }
    return strs;
}

function compareCharMap(map1, map2){
    if(map1.size !== map2.size){
        return false;
    }
    for(let [key, value] of map1){
        if(!map2.has(key) || map2.get(key) !== value){
            return false;
        }
    }
    return true;
}