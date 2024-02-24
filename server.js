// var fs = require("fs");
// var  os = require("os");


// var user = os.userInfo();
// console.log(user); 

// fs.appendFile('greeting.txt','Hi '+user.username+'!\n',()=>{
//     console.log('file is created');
// })

const notes = require('./notes.js');
console.log("main server");

console.log(notes.x);
console.log(notes.addNumber(1,2));