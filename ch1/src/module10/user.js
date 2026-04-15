class User{
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    toString() {
        return `${this.name} ${this.age}`;
    }
}

export {User as default}