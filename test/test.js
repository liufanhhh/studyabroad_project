var Paymentwall = require('paymentwall');
Paymentwall.configure(
  Paymentwall.Base.API_BRICK,
  't_1323f420a53c2cc102e931f7f6710d',
  't_2ffe77340638b142cca2acdc9cd1cf'
);

// var onetimetoken = new Paymentwall.Onetimetoken(
// 4000000000000002,          // Card number, digits only
// 01,         // Expiration month, 2 digits from 01 to 12
// 2017,           // Expiration year, 4 digits
// 121                // CVC/CVV, 3-4 digits
// );
// onetimetoken.createOnetimetoken(function(onetimetoken_data){
// // get the onetimetoken in response
// console.log('onetimetoken='+onetimetoken_data.token);
// });


var charge = new Paymentwall.Charge(
0.5,
'USD',
'fan liu test',
'liufanhh@hotmail.com',
'ashdf',
'123',
{'custom': 'aaa'} 
);

charge.createCharge();
