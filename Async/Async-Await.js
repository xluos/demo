async function _1() {
    setTimeout(() => {
        console.log(1,"set");
    }, 300);
    return 1;
}

async function _2() {
    setTimeout(() => {
        console.log(2,"set");
    }, 200);
    return 2;
}

async function _3() {
    setTimeout(() => {
        console.log(3,"set");
    }, 10);
    return 3;
}

async function main() {
    console.log(_1());
    console.log(_2());
    console.log(_3());
}

// const delay = timeout => new Promise(resolve=> {setTimeout(resolve, timeout); console.log(timeout);
// });

async function delay(timeout) {
    return new Promise(function(resolve){
        setTimeout(resolve, timeout);
        console.log(timeout);
    })
}

async function f(){
    await delay(1000);
    await delay(1000);
    await delay(1000);
    return 'done';
}
(async function(){
     f();
     f();
})();
// f().then(v => console.log(v)); // 等待6s后才输出 'done'
// f().then(v => console.log(v))