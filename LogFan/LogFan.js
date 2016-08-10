var mongoose = require("mongoose");
var LogModel = require("./LogModel");
var util = require("util");

mongoose.connect("mongodb://"+"localhost"+"/"+"logs"+"");

mongoose.connection.on('error', function() {
	throw new Error("failed to open mongoLog://" + "localhost"+"/"+"logs");
});

mongoose.connection.once('open', function(err) {
	console.log("succeeded to open mongodb://" +"localhost"+"/"+"logs");
});

var type_level_connection = { 
	trace: 10,
	debug: 20,
	info: 30,
	warn: 40,
	error: 50,
	fatal: 60,
}

function createNewLog(type){
	return function(log_message, log_data){
		this.log_type = type;
		this.log_level = type_level_connection[type];
		this.log_create_time = new Date();
		this.log_message = log_message||null;
		this.log_data = log_data||null;

		var new_log_information = this;
		if (type=='trace'||type=='debug') {
			console.log(this);
		} else{
			LogModel.createNewLog(new_log_information, function(err){
				if (err) {
					console.log(err);
				};
			});
		}
	}
};

// check the runtime environment
function checkRuntimeEnv() {
	var runtimeEnv;
	if (typeof (process) !== 'undefined' && process.versions) {
	    if (process.versions.nw) {
	    	runtimeEnv = 'nw';
	        return 'nw';
	    } else if (process.versions.node) {
	    	runtimeEnv = 'node';
	        return 'node';
	    };
	};
	if (!runtimeEnv && typeof (window) !== 'undefined' &&
	    window.window === window) {
	    runtimeEnv = 'browser';
		return 'browser';
	};
	if (!runtimeEnv) {
	    throw new Error('unknown runtime environment');
	};
}
// check the pid
function checkProcessPID(){
	if(process.pid){
		return process.pid;
	} else{
		appendToErrors("cannot get pid information");
	};
}



function LogFan(configure_info){

	this.runtimeEnv = checkRuntimeEnv();
	
	// define the log level
	this.log_errors = [];
	this.pid = checkProcessPID();

	// check the required parameter log_writer and log_name
	if (!configure_info) {
		this.appendToErrors("Configure information cannot be empty, please add log_writer and log_name");
		console.log("ERROR! Configure information cannot be empty, please add log_writer and log_name");
		this.log_writer = "LogFan";
		this.log_name = "Error";
	} else if (!configure_info.log_writer) {
		this.appendToErrors("please add log_writer");
		console.log("ERROR! please add log_writer");
		this.log_writer = "LogFan";
		this.log_name = "Error";
	} else if (!configure_info.log_writer) {
		this.appendToErrors("please add log_name");
		console.log("ERROR! please add log_writer");
		this.log_writer = "LogFan";
		this.log_name = "Error";
	} else{
		this.log_writer = configure_info.log_writer;
		this.log_name = configure_info.log_name;
	}

};

LogFan.appendToErrors = LogFan.prototype.appendToErrors = function(err){
	this.log_errors.push(err);
};



LogFan.createLogger = LogFan.prototype.createLogger =  function(configure_info){
	return new LogFan(configure_info);
};

LogFan.Trace = LogFan.prototype.Trace =  createNewLog('trace');
LogFan.Debug = LogFan.prototype.Debug =  createNewLog('debug');
LogFan.Info = LogFan.prototype.Info =  createNewLog('info');
LogFan.Warn = LogFan.prototype.Warn =  createNewLog('warn');
LogFan.Error = LogFan.prototype.Error =  createNewLog('error');
LogFan.Fatal = LogFan.prototype.Fatal =  createNewLog('fatal');

LogFan.traceLine = LogFan.prototype.traceLine = function(type){
	var err = new Error;
	err.name = 'Log Trace';
	if (type=="email") {
		trace_info = err.stack.replace(/at/gi, "<br/> at");
	} else{
		trace_info = err.stack;
	}
	return trace_info;
}


module.exports = LogFan;