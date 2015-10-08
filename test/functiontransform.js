
var Paymentwall = require('paymentwall');
exports.pwpingback = function(req,res){
// judge if the pingback is sent by Paymentwall
Paymentwall.configure(
  Paymentwall.Base.API_GOODS,
  'YOUR_APPLICATION_KEY',
  'YOUR_SECRET_KEY'
);
var pingback = new Paymentwall.Pingback(queryData, ipAddress);
if (pingback.validate()) {
var productId = pingback.getProduct().getId();
if (pingback.isDeliverable()) {
// deliver the product
} else if (pingback.isCancelable()) {
// withdraw the product
} 
console.log('OK'); // Paymentwall expects the string OK in response, otherwise the pingback will be resent
} else {
console.log(pingback.getErrorSummary());
}

//handle the parameters in req
var uid = req.query.uid;
var goodsid = req.query.goodsid;

//handle the response to Paymentwall
res.send("OK");
}
