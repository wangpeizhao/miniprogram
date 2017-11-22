function sayHello(name){
  console.log("Hello ${name}"+name);
}

function sayGoogbye(name) {
  console.log("Googbye ${name}");
}

module.exports.sayHello = sayHello
exports.sayGoogbye = sayGoogbye