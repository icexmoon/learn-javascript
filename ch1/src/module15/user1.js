// user1.js
export default class{
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    toString() {
        return `Name:${this.name}, Age: ${this.age}`;
    }
}