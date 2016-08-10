var LogFan = require("./LogFan.js");
var LogEmail = require("./LogEmail.js");

var log = LogFan.createLogger({log_writer:"liufan",log_name:'MyLog'});
console.log(log.traceLine());
