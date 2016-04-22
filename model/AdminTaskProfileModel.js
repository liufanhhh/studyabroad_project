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
        // {
        //     create_admin: String,
        //     content: String,
        //     create_time: Date,
        // }
        
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

AdminTaskProfileSchema.statics.searchTaskByMerchantId = function(merchant_id, cb) {
    this.find({"task.merchant.id":merchant_id}, cb);
}

AdminTaskProfileSchema.statics.searchTaskById = function(_id, cb) {
    this.find({_id:_id}, cb);
}



AdminTaskProfileSchema.statics.getAdminResponseMerchantList = function(admin_name, cb) {
    this.find({"task.assign_admin":admin_name}).select("task.merchant.name").exec(cb);
}


AdminTaskProfileSchema.statics.searchTaskByAllConditions = function(task, cb) {
    console.log(task);
    this
    .where("task.assign_admin").in(task.assign_admin)
    .where("task.create_admin").in(task.create_admin)
    .where("task.status").in(task.status)
    .where("task.task_type").in(task.task_type)
    .exec(cb);
}

AdminTaskProfileSchema.statics.taskAssignAdminUpdate = function(_id, assign_admin, cb) {
    this.findOneAndUpdate({
        _id:_id
    }, {
        "task.assign_admin": assign_admin
    }, cb);
};

AdminTaskProfileSchema.statics.taskNoteUpdate = function(_id, new_note, cb) {
    this.findOneAndUpdate({
        _id:_id
    }, {
        "task.note": new_note
    }, cb);
};

//-------------------export-------------------------//
module.exports = mongoose.model("AdminTaskProfile", AdminTaskProfileSchema);