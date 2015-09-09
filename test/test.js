var Paymentwall = require('paymentwall');
Paymentwall.configure(
  Paymentwall.Base.API_GOODS,
  't_1323f420a53c2cc102e931f7f6710d',
  't_2ffe77340638b142cca2acdc9cd1cf'
);

var onetimetoken = new Paymentwall.Onetimetoken(
4000000000000002,          // Card number, digits only
01,         // Expiration month, 2 digits from 01 to 12
2015,           // Expiration year, 4 digits
121            // CVC/CVV, 3-4 digits
);
onetimetoken.createOnetimetoken(function(onetimetoken_response){
// get the onetimetoken in response
console.log('onetimetoken='+onetimetoken_response.token);

var token = onetimetoken_response.token;

var ccharge = new Paymentwall.Charge(
0.5,
'USD',
'fan',
'liufanhh@hotmail.com',
123,
token
// {'custom[aad]':'aa'}
);

ccharge.createCharge(function(Charge_response){
// get the onetimetoken in response
console.log('response of Charge ='+Charge_response);
});

var subscription = new Paymentwall.Subscription(
1,
'USD',
'fan',
'hello.com',
123,
token,
'day',
3,
{
	'trial[amount]':1,
	'trial[currency]':'USD',
	'trial[period]':'day',
	'trial[period_duration]':3
}
);

subscription.createSubscription(function(subscription_response){
	console.log(subscription_response);
});

});


// 4147371209230706,          // Card number, digits only
// 11,         // Expiration month, 2 digits from 01 to 12
// 2017,           // Expiration year, 4 digits
// 678 



// var ccharge = new Paymentwall.Charge(
// 0.5,
// 'USD',
// 'fan',
// 'liufanhh@hotmail.com',
// 123,
// 'o_ef0b32907c58146462724a4291d757c6',
// {'custom[aad]':'aa'}
// );

// // ccharge.createCharge(function(Charge_response){
// // // get the onetimetoken in response
// // console.log('response of Charge ='+Charge_response);
// // });

// var charge = new Paymentwall.Charge();

// charge.otherOperation(123121,'refund',function(refund_data){
// 	console.log('refund_data'+refund_data);
// });


// var subscription = new Paymentwall.Subscription(
// 1,
// 'USD',
// 'fan',
// 'hello.com',
// 123,
// 123,
// 3,
// 'day',
// {
// 	'trial[amount]':1,
// 	'trial[currency]':'USD',
// 	'trial[period]':3,
// 	'trial[period_duration]':'day'
// }
// );

// subscription.createSubscription(function(subscription_response){
// 	console.log(subscription_response);
// });


// var subscription = new Paymentwall.Subscription();
// subscription.otherOperation(1231111,'detail',function(refund_data){
// 	console.log('refund_data'+refund_data);
// });









