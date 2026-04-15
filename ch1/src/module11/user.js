export default class User{
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    toString() {
        return `${this.name} ${this.age}`;
    }
}

export function compare(user1, user2){
    if(user1.age > user2.age) return 1;
    if(user1.age < user2.age) return -1;
    return 0;
}