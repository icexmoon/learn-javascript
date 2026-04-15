function* generator() {
    yield 1;
    yield 2;
    return 3;
}

var gen = generator();
console.log(gen);
// Object [Generator] {}

let next;
do {
    next = gen.next();
    console.log(next.value);
} while (!next.done);
// 1
// 2
// 3

for (let n of generator()) {
    console.log(n);
}
// 1
// 2

function* generator2() {
    yield 1;
    yield 2;
    yield 3;
}

for (let n of generator2()) {
    console.log(n);
}
// 1
// 2
// 3

let numbers = [0, ...generator2()];
console.log(numbers);
// [ 0, 1, 2, 3 ]

let range = {
    from: 0,
    to: 5,
    [Symbol.iterator]() {
        return {
            current: this.from,
            last: this.to,
            next() {
                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            },
        };
    },
}

for (let n of range) {
    console.log(n);
}

let range2 = {
    from: 0,
    to: 5,
    *[Symbol.iterator]() {
        for (let value = this.from; value <= this.to; value++) {
            yield value;
        }
    },
}

for (let n of range2) {
    console.log(n);
}

function* numberGenerator(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

function* charGenerator() {
    yield* numberGenerator('0'.charCodeAt(), '9'.charCodeAt());
    yield* numberGenerator('A'.charCodeAt(), 'Z'.charCodeAt());
    yield* numberGenerator('a'.charCodeAt(), 'z'.charCodeAt());
}

let chars = [...charGenerator()].map(char => String.fromCharCode(char));
console.log(chars);
// [
//   '0', '1', '2', '3', '4', '5', '6', '7', '8',
//   '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
//   'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
//   'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
//   'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
//   'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
//   's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
// ]

function* charGenerator2() {
    for (let i of numberGenerator('0'.charCodeAt(), '9'.charCodeAt())) {
        yield i;
    }

    for (let i of numberGenerator('A'.charCodeAt(), 'Z'.charCodeAt())) {
        yield i;
    }

    for (let i of numberGenerator('a'.charCodeAt(), 'z'.charCodeAt())) {
        yield i;
    }
}

let chars2 = [...charGenerator2()].map(char => String.fromCharCode(char));
console.log(chars2);

function* sayGenerator() {
    let msg = yield 'Hi, I\'m Jeck';
    console.log(msg);
    msg = yield 'Hi, LiLei, How are you?';
    console.log(msg);
    yield 'I\'m fine too';
}

let generator3 = sayGenerator();
console.log(generator3.next().value);
console.log(generator3.next('Hi, Jeck, I\'m LiLei').value);
console.log(generator3.next('I\'m fine, thank you, and you?').value);
// Hi, I'm Jeck
// Hi, Jeck, I'm LiLei
// Hi, LiLei, How are you?
// I'm fine, thank you, and you?
// I'm fine too

function* generator4() {
    let i = 0;
    let n = 1;
    while (true) {
        try{
            n = yield n * i;
        }
        catch (e) {
            console.log(e);
        }
        i++;
    }
}

// let gen4 = generator4();
// for (let n of [1, 2, 3, 4, 5]) {
//     if (Math.random() > 0.5) {
//         gen4.throw(new Error('模拟异常'));
//     }
//     console.log(gen4.next(n).value);
// }

function* generator5() {
    let i = 0;
    let n = 1;
    while (true) {
        n = yield n * i;
        i++;
    }
}

let gen5 = generator5();
for (let n of [1, 2, 3, 4, 5]) {
    console.log(gen5.next(n).value);
}
gen5.return('done');
console.log(gen5.next());

async function* generator6(n) {
    for (let i = 0; i < n; i++) {
        let result = await new Promise(resolve => setTimeout(resolve, 1000, Math.random()));
        yield result;
    }
}

async function testAsncGenerator() { 
    for await (let n of generator6(5)) {
        console.log(n);
    }
}

// testAsncGenerator();
// 0.007971594423372474
// 0.5708672336224248
// 0.5406785133665706
// 0.4951318979970558
// 0.4768186280156048

let randomNumber = {
    size: 5,
    [Symbol.asyncIterator]() {
        return {
            current: 0,
            last: this.size - 1,
            async next() {
                let num = await new Promise(resolve => setTimeout(resolve, 1000, Math.random()));
                if (this.current <= this.last) {
                    this.current++;
                    return { done: false, value: num };
                } else {
                    return { done: true };
                }
            }
        }
    }
}

async function testRandomNumber() {
    for await (let n of randomNumber) {
        console.log(n);
    }
}

// testRandomNumber();
// 0.8102974935193057
// 0.032189090795476494
// 0.634830641483874
// 0.9304805121107931
// 0.6579102151359983

let randomNumber2 = {
    size: 5,
    async *[Symbol.asyncIterator]() {
        for (let i = 0; i < this.size; i++) {
            yield await new Promise(resolve => setTimeout(resolve, 1000, Math.random()));
        }
    }
}

async function testRandomNumber2() {
    for await (let n of randomNumber2) {
        console.log(n);
    }
}

testRandomNumber2();

async function* fetchCommits(repo){
    let url = `https://api.github.com/repos/${repo}/commits`;
    while(url){ 
        let result = await fetch(url,{
            headers: {'User-Agent': 'Our script'},
        });
        let body = await result.json();
        let nextPage = result.headers.get('Link').match(/<(.*?)>; rel="next"/);
        nextPage = nextPage?.[1];
        url = nextPage;
        for(let commit of body){
            yield commit;
        }
    }
}

async function testFetchCommits() { 
    let count = 0;
    for await (let commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
        console.log(commit.author.login);
        count++;
        if (count >= 10) break;
    }
}

testFetchCommits();