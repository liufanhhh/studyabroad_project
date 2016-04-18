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
        assign_admin: String,
        create_admin: String,
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

AdminTaskProfileSchema.statics.getAllTasks = function(page, page_size, cb) {
    this.find().sort({"task.create_time": 'desc'}).skip(page_size*(page-1)).limit(page_size).exec(cb);
}

AdminTaskProfileSchema.statics.findTaskByMerchantId = function(merchant_id, cb) {
    this.find({"task.merchant.id":merchant_id}, cb);
}

AdminTaskProfileSchema.statics.findTaskByTaskId = function(task_id, cb) {
    this.find({_id:task_id}, cb);
}

AdminTaskProfileSchema.statics.getAdminResponseMerchantList = function(admin_name, cb) {
    this.find({"task.assign_admin":admin_name}).select("task.merchant.name").exec(cb);
}


//-------------------export-------------------------//
module.exports = mongoose.model("AdminTaskProfile", AdminTaskProfileSchema);