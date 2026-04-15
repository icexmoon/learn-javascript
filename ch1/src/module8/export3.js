let count = 0;

function add(a, b){
    return a + b;
}

class User{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
}

export {add as myAdd, User as MyUser, count as myCount};