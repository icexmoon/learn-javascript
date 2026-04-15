async function test(){
    let User;
    if(Math.random() > 0.5){
        let module = await import('./user1.js');
        User = module.default;
    }
    else{
        let module = await import('./user2.js');
        User = module.default;
    }
    let user = new User('张三', 18);
    console.log(user.toString());
}

for(let i = 0; i < 10; i++){
    test();
}
// Name:张三, Age: 18
// Name:张三, Age: 18
// Name:张三, Age: 18
// Name:张三, Age: 18
// Name:张三, Age: 18
// Name:张三, Age: 18
// 姓名：张三，年龄： 18
// 姓名：张三，年龄： 18
// 姓名：张三，年龄： 18
// 姓名：张三，年龄： 18