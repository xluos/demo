async function _1() {
    setTimeout(() => {
        console.log(1, Date.now());
    }, 1000);
    return 1;
}

async function _2() {
    setTimeout(() => {
        console.log(2, Date.now());
    }, 1000);
    return 2;
}

async function _3() {
    setTimeout(() => {
        console.log(3, Date.now());
    }, 1000);
    return 3;
}

// async function main() {
//     console.log(await _1(), Date.now());
//     console.log(await _2(), Date.now());
//     console.log(await _3(), Date.now());
// }


// const delay = timeout => new Promise(resolve=> {setTimeout(resolve, timeout); console.log(timeout);
// });

async function delay(timeout) {
    return new Promise(function(resolve){
        setTimeout(resolve, timeout);
        console.log(timeout,Date.now());
    })
}

async function f(){
    await delay(1000);
    await delay(1000);
    await delay(1000);
    return 'done';
}
f().then(v => console.log(v)); // 等待3s后才输出 'done'
f().then(v => console.log(v));