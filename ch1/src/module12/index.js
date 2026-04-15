import * as user from './user.js';

let User = user.default;
let compare = user.compare;
let user1 = new User('Mike', 20);
let user2 = new User('Jane', 18);
console.log(compare(user1, user2));
