import './index.css'
import printMe from './print.js'

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = 'Hello we'

  btn.innerHTML = 'Click me and check the';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

let demoComponent = printMe();
document.body.appendChild(demoComponent);


if (module.hot) {
  
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');

    const nextComponent = printMe();
    console.log(nextComponent);
    console.log(demoComponent
    );
    
    document.body.removeChild(demoComponent);
    document.body.appendChild(nextComponent);
    demoComponent = nextComponent;
  })
  
}