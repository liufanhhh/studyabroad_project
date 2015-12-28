// var Paymentwall = require('paymentwall');
// Paymentwall.configure(
//   Paymentwall.Base.API_BRICK,
//   't_1323f420a53c2cc102e931f7f6710d',
//   't_2ffe77340638b142cca2acdc9cd1cf'
// );

// var onetimetoken = new Paymentwall.Onetimetoken(
// 4242424242424242,          // Card number, digits only
// 11,         // Expiration month, 2 digits from 01 to 12
// 2017,           // Expiration year, 4 digits
// 678                // CVC/CVV, 3-4 digits
// );
// onetimetoken.getonetimetoken();
// console.log('aaa');

var md5 = require("blueimp-md5");
var base_string = 'lxdpHH123';
var confirm_password = md5(md5(md5(base_string)+base_string)+base_string);
console.log(confirm_password);
