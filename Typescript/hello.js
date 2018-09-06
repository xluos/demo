"use strict";
var Hello = /** @class */ (function () {
    function Hello() {
    }
    Hello.put = function () {
        console.log("Hello " + Hello.readme);
    };
    Hello.readme = 'Typescript';
    return Hello;
}());
Hello.put();
