/*
 * created by Liufan 嘿嘿
 */

var mongoose = require("mongoose");

//-----------------schema for Admin-----------------//

var LogSchema = mongoose.Schema({
    log_name: String,
    log_writer: String,
    log_level: Number,
    log_errors: Array,
    log_message: String,
    log_type: String,
    log_data: Object,
    pid: String,
    log_create_time: Date
});

LogSchema.statics.createNewLog = function(log_info, cb) {
	if (!log_info) {
        throw new Error('ERROR! log_info is empty');
	} else{
        this.create({
            log_name: log_info.log_name,
            log_writer: log_info.log_writer,
            log_level: log_info.log_level,
            log_errors: log_info.log_errors,
            log_message: log_info.log_message,
            log_type: log_info.log_type,
            log_data: log_info.log_data,
            pid: log_info.pid,
            log_create_time: log_info.log_create_time
        }, cb);
    }
}


module.exports = mongoose.model("LogModel", LogSchema);