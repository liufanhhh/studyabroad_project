/*
 * created by Liufan 嘿嘿
 */

var mongoose = require("mongoose");

//-----------------schema for Admin-----------------//

var LogSchema = mongoose.Schema({
    log_name: String,
    log_writer: String,
    log_level: Number,
    log_status: String,
    log_message: String,
    log_type: String,
    log_data: Object,
    create_time: Date
});

module.exports = mongoose.model("LogModel", LogSchema);