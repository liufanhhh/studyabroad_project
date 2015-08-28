var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

var post_data = querystring.stringify({
	'public_key': 't_1323f420a53c2cc102e931f7f6710d',
	'card[number]': 4147371209230706,
	'card[card_exp_month]': 11,
	'card[card_exp_year]': 17,
	'card[card_cvv]': 678
});



var post_options = {
	host: 'pwgateway.com',
	port: '80',
	path: '/api/token',
	'method': 'Post',
	headers: {
	    'Content-Type': 'application/x-www-form-urlencoded',
	    'X-ApiKey': 't_2ffe77340638b142cca2acdc9cd1cf'
	}
};
console.log(post_data);

var post_req = http.request(post_options, function(resa) {
  resa.setEncoding('utf8');
  resa.on('data', function (chunk) {
      console.log('Response: ' + chunk);
  });
});

post_req.write(post_data);
post_req.end();