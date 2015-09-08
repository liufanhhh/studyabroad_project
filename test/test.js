var Paymentwall = require('paymentwall');
Paymentwall.configure(
  Paymentwall.Base.API_BRICK,
  'ad678b420aa1cecc4a7950a9eef4d765',
  '566f94c4e0243740faec24cb86ee0705'
);
// try{
// 	var onetimetoken = new Paymentwall.Onetimetoken(
// 	4000000000000002,          // Card number, digits only
// 	01,         // Expiration month, 2 digits from 01 to 12
// 	2017,           // Expiration year, 4 digits
// 	121                // CVC/CVV, 3-4 digits
// 	);
// 	onetimetoken.createOnetimetoken(function(onetimetoken_response){
// 	// get the onetimetoken in response
// 	console.log('onetimetoken='+onetimetoken_response.token);
// 	});
// }catch(e){
// 	console.log(e);
// }




var ccharge = new Paymentwall.Charge(
1,
'USD',
'fan',
'helloaa',
123,
'ddd',
{'custom[aad]':'aa'}
);

ccharge.createCharge(function(Charge_response){
// get the onetimetoken in response
console.log('response of Charge ='+Charge_response);
});

// var charge = new Paymentwall.Charge();

// charge.otherOperation(123121,'detail',function(refund_data){
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

