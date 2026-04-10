function testAsync() {
    async function asyncFunc() {
        return 1;
    }

    asyncFunc().then(function (value) {
        console.log(value);
    });
    // 1
}

// testAsync();

function testAsync2() {
    async function asyncFunc() {
        return Promise.resolve(1);
    }

    asyncFunc().then(function (value) {
        console.log(value);
    });
    // 1
}

// testAsync2();

async function testAwait() {
    let promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            let result = Math.random();
            if (result > 0.5) {
                resolve(result);
            }
            else {
                reject(result);
            }
        }, 1000);
    });
    try {
        let result = await promise;
        console.log('success', result);
    }
    catch (e) {
        console.log('fail', e);
    }
}

// testAwait();
// testAwait();
// testAwait();

async function testAwait2() { 
    class User{
        constructor(name) {
            this.name = name;
        }
        async getName(){
            return this.name;
        }
    }

    let user = new User('Mike');
    let name = await user.getName();
    console.log(name);
}

testAwait2();

