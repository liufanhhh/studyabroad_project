var util = require('util');


function Base() {
}

Base.prototype = {
	VC_CONTROLLER: 'ps',
	GOODS_CONTROLLER: 'subscription',
	CART_CONTROLLER: 'cart',

	errors: [],

	getApiType: function() {
		return this.apiType;
	},

	getAppKey: function() {
		return this.appKey;
	},

	getSecretKey: function() {
		return this.secretKey;
	},

	objectMerge: function(a, b) {
		for (var x in b) a[x] = b[x];
			return a;
	},

	sortObject: function(o) {
		var sorted = {},
			key, a = [];

		for (key in o) {
			if (o.hasOwnProperty(key)) {
				a.push(key);
			}
		}

		a.sort();

		for (key = 0; key < a.length; key++) {
			sorted[a[key]] = o[a[key]];
		}

		return sorted;
	},

	appendToErrors: function(err) {
		return this.errors.push(err);
	},

	getErrors: function() {
		return this.errors;
	},

	getErrorSummary: function() {
		return this.getErrors().join("\n");
	}
};

Base.prototype.aname = 'fan';
console.log(Base.prototype.aname);
function Widget() {

}

util.inherits(Widget, Base);
util._extend(Widget.prototype, {

	aaname: function(){
		console.log(this.aname);
	}
});

var widget = new Widget();

widget.aaname();

var changeaname = function(aname){
	Base.prototype.aname = aname;
}

changeaname('dd');

function Charge() {

}
Base.prototype.aaname = function(){
	console.log(this.aname);
}
util.inherits(Charge, Base);


var charge = new Charge();

charge.aaname();

