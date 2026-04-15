import {default as User, compare} from './user.js';

let user1 = new User('Mike', 20);
let user2 = new User('Jane', 18);
console.log(compare(user1, user2));
