/*
 * created by Liufan 嘿嘿
 */

var mongoose = require("mongoose");

//-----------------schema for Admin-----------------//

var AdminTaskProfileSchema = mongoose.Schema({
    task:{
        header: String,
        merchant: {
            id: Number,
            hierarchy: String,
            willing_to_cooperate: Boolean
        },
        admin: String,
        task_type: String,
        status: String,
        create_time: Date,
        note: Array
    }
});
//----------------static method--------------------//
AdminTaskProfileSchema.statics.createNewTask = function(task, cb) {
    console.log(task);
    this.create({
        task: task
    }, cb);
}


//-------------------export-------------------------//
module.exports = mongoose.model("AdminTaskProfile", AdminTaskProfileSchema);