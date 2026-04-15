// \src\module3\hello.js
import { userName } from "./user.js";
function sayHello(name) {
  console.log(`hello ${name}`);
}

sayHello(userName);