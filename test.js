function Log(configure_info){
	this.log_writer = configure_info.log_writer|| appendToErrors("log_writer cannot be empty");
	this.log_name = configure_info.log_name|| appendToErrors("log_name cannot be empty");
	this.errors = [];
	this.trace = 10;
	this.debug = 20;
	this.info = 30;
	this.warn = 40;
	this.error = 50;
	this.fatal = 60;
	if (configure_info.level!=null) {
		this[configure_info.level.name]=configure_info.level.number;
	};
};

Log.prototype.appendToErrors = function(err){
	this.errors.push(err);
};

Log.prototype.createLogger = function(configure_info){
	return new Log(configure_info);
};

module.exports = Log;