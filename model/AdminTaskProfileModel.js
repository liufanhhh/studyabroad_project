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
            name: String,
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
    this.create({
        task: task
    }, cb);
}

AdminTaskProfileSchema.statics.getAdminResponseMerchantList = function(admin_name, cb) {
    console.log(admin_name);
    this.find({"task.admin":admin_name}).select("task.merchant.name").exec(cb);
}


//-------------------export-------------------------//
module.exports = mongoose.model("AdminTaskProfile", AdminTaskProfileSchema);