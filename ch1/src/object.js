let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

console.log(Object.keys(salaries));
console.log(Object.values(salaries));
console.log(Object.entries(salaries));
function sumSalaries(salaries) {
  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }
  return sum;
}

console.log(sumSalaries(salaries));
console.log(sumSalaries({}));

let person = Object.fromEntries([["name", "John"], ["age", 30]]);
console.log(person);

let salaries2 = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

function doubleSalaries(salaries) {
  let entries = Object.entries(salaries).map(([name, salary]) => [name, salary * 2])
  return Object.fromEntries(entries);
}

console.log(doubleSalaries(salaries2));
// { John: 200, Pete: 600, Mary: 500 }

function count(obj) {
  return Object.keys(obj).length;
}

console.log(count(salaries));
// 3