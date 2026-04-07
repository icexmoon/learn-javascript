let user = { name: "John", years: 30 };

let {name, years: age, isAdmin = false} = user;

console.log( name ); // John
console.log( age ); // 30
console.log( isAdmin ); // false

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

console.log(topSalary(salaries));

function topSalary(salaries){
    if(!salaries) return null;
    let max = 0;
    let maxName = null;
    for(let [name, salary] of Object.entries(salaries)){
        if(salary > max){
            max = salary;
            maxName = name;
        }
    }
    return maxName;
}