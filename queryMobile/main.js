const api = require('axios')

let data = ['15238281019'];

let a

(async function () {
  a = await api.get(' https://www.iteblog.com/api/mobile.php?mobile=15238281019',{mobile: 15238281019})
  console.log('TCL: ---------');
  console.log('TCL: a', a);
  console.log('TCL: ---------');
  
})()