// user2.js
export default class{
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    toString() {
        return `姓名：${this.name}，年龄： ${this.age}`;
    }
}