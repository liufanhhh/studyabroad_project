var mongoose = require("mongoose");
var LogModel = require("./LogModel");

mongoose.connect("mongodb://"+"localhost"+"/"+"logs"+"");

mongoose.connection.on('error', function() {
	console.log("failed to open mongoLog://" + "localhost"+"/"+"logs");
});

mongoose.connection.once('open', function() {
	console.log("succeeded to open mongodb://" +"localhost"+"/"+"logs");
});

LogModel.createLogCollection = function(){

};

function Log(){
	this.errors = [];
	this.trace = 10;
	this.debug = 20;
	this.info = 30;
	this.warn = 40;
	this.error = 50;
	this.fatal = 60;
};

Log.prototype.appendToErrors = function(err){
	this.errors.push(err);
};

Log.prototype.createLogger = function(configure_info, extra_info){
	try{
		this.log_writer = configure_info.log_writer|| appendToErrors("log_writer cannot be empty");
		this.log_name = configure_info.log_name|| appendToErrors("log_name cannot be empty");
		this.log_type = configure_info.log_type|| appendToErrors("log_type cannot be empty");
		this.log_emergency = configure_info.log_status|| false;
		this.log_message = configure_info.log_message|| appendToErrors("log_message cannot be empty");
		this.create_time = configure_info.create_time|| new Date();
		this.log_data = extra_info||null,
		this.log_level = this[log.type]|| null;
		if (this.errors[0]!=null) {
			for( e in this.errors){
				console.log(e);
			};
		} else{

		};
	} catch(err){
		console.log(err);
	}
};

module.exports = Log;