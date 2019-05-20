"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var Hello = /** @class */ (function () {
    function Hello() {
    }
    Hello.put = function () {
        var data;
        fs.writeFileSync('./hello.ts', data);
        console.log(data);
        console.log("Hello " + Hello.readme);
    };
    Hello.readme = 'Typescript';
    return Hello;
}());
Hello.put();
