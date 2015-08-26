var Paymentwall = require('paymentwall');
Paymentwall.configure(
  Paymentwall.Base.API_GOODS,
  'ad678b420aa1cecc4a7950a9eef4d765',
  '566f94c4e0243740faec24cb86ee0705'
);

var widget = new Paymentwall.Widget(
  'user40012',
  'p10',
  [],
  {'email': 'user@hostname.com'}
);
