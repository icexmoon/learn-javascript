let user = {
    name: 'Tom',
    age: 18,
}
let nameDesc = Object.getOwnPropertyDescriptor(user, 'name');
console.log(nameDesc);
// { value: 'Tom', writable: true, enumerable: true, configurable: true }

Object.defineProperty(user, 'name', {
    value: 'Jerry',
    writable: false,
    enumerable: false,
    configurable: false,
});

nameDesc = Object.getOwnPropertyDescriptor(user, 'name');
console.log(nameDesc);
// {
//   value: 'Jerry',
//   writable: false,
//   enumerable: false,
//   configurable: false
// }

Object.defineProperty(user, 'sex', {
    value: 'male'
});
console.log(user.sex);
let sexDesc = Object.getOwnPropertyDescriptor(user, 'sex');
console.log(sexDesc);
// male
// {
//   value: 'male',
//   writable: false,
//   enumerable: false,
//   configurable: false
// }

let user2 = {
    name: 'Tom',
}

Object.defineProperty(user2, 'name', {
    writable: false
})

user2.name = 'Jerry';
console.log(user2.name);
// Tom

let user3 = {
    name: 'Tom',
    toString () {
        return `${this.name}`;
    }
}

for(let key in user3){
    console.log(key);
}

// name
// toString

let user4 = {
    name: 'Tom',
    toString () {
        return `${this.name}`;
    }
}

Object.defineProperty(user4, 'toString', {
    enumerable: false
})

for(let key in user4){
    console.log(key);
}

// name

let user5 = {
    name: 'Tom',
}

Object.defineProperty(user5, 'name', {
    configurable: false,
    writable: false,
})

delete user5.name;
console.log(user5.name);
// Tom

// Object.defineProperty(user5, 'name', {
//     writable: true,
// })
// TypeError: Cannot redefine property: name

let MyMath = {
    pi: 3.14
}

Object.defineProperty(MyMath, 'pi', {
    writable: false,
    configurable: false,
})

MyMath.pi = 3.15;
console.log(MyMath.pi);
// 3.14

let user6 = { 
}

Object.defineProperties(user6,{
    name: {
        value: 'Tom',
        writable: false,
        enumerable: true,
        configurable: true,
    },
    age: {
        value: 18,
        writable: true,
        enumerable: true,
        configurable: true,
    }
})

let user7 = {
    name: 'Tom',
    age: 18,
    sex: 'male',
    toString () {
        return `${this.name} ${this.age} ${this.sex}`;
    }
};
Object.defineProperties(user7, {
    name: {
        writable: false,
        enumerable: true,
        configurable: true,
    },
    toString: {
        enumerable: false,
    }
});

let user8 = {};
for(let key in user7){
    user8[key] = user7[key];
}
let user8propertyDesc = Object.getOwnPropertyDescriptors(user8);
console.log(user8propertyDesc);
// {
//   name: {
//     value: 'Tom',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   age: { value: 18, writable: true, enumerable: true, configurable: true },
//   sex: {
//     value: 'male',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   }
// }

let user9 = {};
Object.defineProperties(user9, Object.getOwnPropertyDescriptors(user7));
let user9propertyDesc = Object.getOwnPropertyDescriptors(user9);
console.log(user9propertyDesc);

let name = {
    firstName: 'Tom',
    lastName: 'Jerry',
    get fullName () {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName (value) {
        let names = value.split(' ');
        this.firstName = names[0];
        this.lastName = names[1];
    }
}
console.log(name.fullName);
// Tom Jerry
name.fullName = 'Jeck Chen';
console.log(name.firstName);
console.log(name.lastName);
// Jeck
// Chen

let name2 = {
    firstName: 'Tom',
    lastName: 'Jerry',
};
Object.defineProperty(name2, 'fullName', {
    get () {
        return `${this.firstName} ${this.lastName}`;
    },
    set (value) {
        let names = value.split(' ');
        this.firstName = names[0];
        this.lastName = names[1];
    }
});
console.log(name2.fullName);
// Tom Jerry

// Object.defineProperty(name2, 'attr', {
//     get() {
//         return this.firstName;
//     },
//     value: 'Tom',
// });
// TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>     

let person = {
    name: undefined
};
person.name = 'Tom';
console.log(person.name);

let person2 = { 
    _name: undefined,
    get name () {
        return this._name;
    },
    set name (value) {
        if(!value){
            throw new Error('Name cannot be empty');
        }
        if(value.trim().length <= 4){
            throw new Error('Name is too short');
        }
        this._name = value;
    } 
};
// person2.name = 'Tom';
// Error: Name is too short
