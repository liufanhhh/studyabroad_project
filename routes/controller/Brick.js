// var querystring = require('querystring');
// var http = require('http');
// var fs = require('fs');

// exports.brick = function (req,res){
//   var post_data = querystring.stringify({
//   amount: 0.5,
//   currency: 'USD', 
//   description:'fanliu test', 
//   email:'fan.liu@paymentwall.com',
//   fingerprint: req.body.brick_fingerprint,
//   token: req.body.brick_token,
//   period:'day',
//   period_duration:'1',
//   'custom[ptcustom]':'3433!~,34331438573821409!~,Day!~,1!~,89!~,I-71NYKGRU45LK!~,true!~,0',
//   'trial[amount]':1,
//   'trial[currency]':'USD',
//   'trial[period]': 'day',
//   'trial[period_duration]':1
//   });



//   var post_options = {
//       host: 'api.paymentwall.com',
//       port: '80',

//       // path: '/api/brick/charge',
//       // method: 'Post',
//       path: '/api/brick/charge/68272617',
//       method: 'Get',
//       headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           "X-ApiKey": "58ab51bed29fa87881418cce5a3aac43"
//           // 'Content-Length': post_data.length
//       }
//   };
//     // console.log(post_data);

//   var post_req = http.request(post_options, function(resa) {
//       resa.setEncoding('utf8');
//       resa.on('data', function (chunk) {
//           console.log('Response: ' + chunk);
//       });
//   });

//   post_req.write('');
//   post_req.end();
// // }
var Paymentwall = require('paymentwall');

var querystring = require('querystring');

var http = require('http');

var secret = 'a5e478eb2b3492f16801539268a24af9';

var params = {

ag_type:"fixed",
amount:0.99,
uid:"5302",
sign_version:2,
currencyCode:"USD",
apiType:'subscription',
ag_external_id:"1073_5ae337fcd9ab2a9bdeb3ffa83796eadf",
ag_name:"diamond",
widget:"m2_1",
key:"1729a13115ea3310e214382c31a90b5d"

// uid:"liufanhh2222",

// key:"95983442c2bd9bb20259ea8bcdeebf52",

// product_name:"MMMMobiamo",

// product_id:"121",

// // price_id:"9.99_EUR_DE",

// amount:10.00,

// currency:"THB",

// country:"TH",

// mnc:"99",

// mcc:"520",

// sign_version:2,

// ts: Math.floor(Date.now() / 1000)

};


params.sign = new Paymentwall.Widget().calculateSignature(params, secret, 2);


var data = querystring.stringify(params);

console.log(data);

// var options = {

//    host: 'api.paymentwall.com',

//    port: 80,

//    path: '/api/mobiamo/payment',

//    method: 'POST',

//    headers: {

//        'Content-Type': 'application/x-www-form-urlencoded',

//        'Content-Length': Buffer.byteLength(data)

//    }

// };

// var req = http.request(options, function(res) {

//    console.log("statusCode'"+res.statusCode);

//    res.setEncoding('utf8');

//    res.on('data', function (chunk) {

//        console.log("body: " + chunk);

//    });

// });


// req.write(data);

// req.end();
