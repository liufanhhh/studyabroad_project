var http = require("http"); 
function onRequest(request, response) {   
	console.log("Request received.");   
	response.writeHead(200, {"Content-Type": "text/plain"});   
	response.write("Hello World");   response.end(); } 

http.createServer(onRequest).listen(8888); 
console.log("Server has started.");
<pre escaped="true" lang="javascript" line="1">//person.js

var num = 0;
exports.Person = function(pName){
 var pri = {
      pName : " ",
      pAge : 0
   }
  var pub = {
       setName : function(pName){
          	pri.pName = pName;
        },
        getName : function(){
            return pri.pName;
        }
    }
 //construct code
    pri.pName = pName;
 
    return pub;
 }</pre>