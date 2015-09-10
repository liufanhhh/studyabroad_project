var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var Paymentwall = require('paymentwall');

exports.brick = function (req,res){
Paymentwall.configure(
  Paymentwall.Base.API_GOODS,
  'ad678b420aa1cecc4a7950a9eef4d765',
  '566f94c4e0243740faec24cb86ee0705'
);

var token = req.body.brick_token;
var fingerprint = req.body.brick_fingerprint;
console.log(token);
console.log(fingerprint);
var ccharge = new Paymentwall.Charge(
0.5,
'USD',
'fan',
'liufanhh@hotmail.com',
fingerprint,
token
// {'custom[aad]':'aa'}
);

ccharge.createCharge(function(Charge_response){
// get the onetimetoken in response
console.log('response of Charge ='+Charge_response);
});
}
// var Paymentwall = require('paymentwall');

// var querystring = require('querystring');

// var http = require('http');

// var secret = '566f94c4e0243740faec24cb86ee0705';

// var params = {

// // ag_type:"fixed",
// // amount:0.99,
// // uid:"5302",
// // sign_version:2,
// // currencyCode:"USD",
// // apiType:'subscription',
// // ag_external_id:"1073_5ae337fcd9ab2a9bdeb3ffa83796eadf",
// // ag_name:"diamond",
// // widget:"m2_1",
// // key:"1729a13115ea3310e214382c31a90b5d"

// uid:"liufanhh2222",

// key:"ad678b420aa1cecc4a7950a9eef4d765",

// product_name:"MMMMobiamo",

// product_id:"121",

// // price_id:"9.99_EUR_DE",

// amount:11000.00,

// currency:"IDR",

// country:"ID",

// mnc:"11",

// mcc:"510",

// sign_version:2,

// ts: Math.floor(Date.now() / 1000)

// };


// params.sign = new Paymentwall.Widget().calculateSignature(params, secret, 2);

// console.log(params.sign);

// var data = querystring.stringify(params);

// console.log(data);

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
