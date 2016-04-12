/*
 * created by Liufan 嘿嘿
 */

var mongoose = require("mongoose");

//-----------------schema for Admin-----------------//

var AdminProfileSchema = mongoose.Schema({
    admin:{
        name: String,
        response_company: Array,
        email: String,
        password: String,
        mobile: String,
        birthday: String,
        status: String,
        create_time: Date
    }
});
//----------------static method--------------------//
AdminProfileSchema.statics.findAdminById = function(id, cb) {
    this.findOne({
        _id: id
    }, cb);
}

AdminProfileSchema.statics.countAdminsAmount = function(conditions, cb) {
    var conditions = conditions||null;
    this.count({
        conditions: conditions
    }, cb);
}

AdminProfileSchema.statics.findAdminByNickname = function(nickname, cb) {
    this.findOne({
        nickname:nickname
    }, cb);
}

AdminProfileSchema.statics.findAdminByName = function(name, cb) {
    this.findOne({
        "admin.name": name
    }, cb);
}

AdminProfileSchema.statics.findAdminByEmail = function(email, cb) {
    this.findOne({
        email: email
    }, cb);
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

AdminProfileSchema.statics.findAdminsByNameOrEmail = function(name_email, cb) {
    qs = escapeRegExp(name_email);
    this.find({
        $or: [{
            name: {
                $regex: '.*' + qs + '.*'
            }
        }, {
            email: {
                $regex: '.*' + qs + '.*'
            }
        }]
    }, cb);

}
AdminProfileSchema.statics.updatePasswordByEmail = function(name_email, newpassword, cb){
    var conditions = {email: name_email};
    var update = {$set :{password: newpassword}};
    this.update(conditions,update,false,cb)
}


AdminProfileSchema.statics.updateEmailByRealname = function(realname, email, cb) {
    this.findOneAndUpdate({
        realname: realname
    }, {$addToSet:{trypush:email}}, cb);
}

AdminProfileSchema.statics.findByEmailPassword = function(email, password, cb) {
    this.findOne({
        email: email,
        password: password,
        confirm: true,
    }, cb);
}

AdminProfileSchema.statics.updateAdminById = function(id, email, cb) {
    this.findOneAndUpdate({
        _id: id
    }, {$set:{email:email}}, cb);
}

AdminProfileSchema.statics.createNewAdmin = function(admin, cb) {
    this.create({
    admin: admin
    }, cb);
}

AdminProfileSchema.statics.createInviteAdmin = function(email, name, cb) {
    // 外部保证本步更新或者创建的Admin均是没有确认注册的
    this.findOneAndUpdate({
        email: email
    }, {
        nickname: name,
        name: name,
        config: {
            ntf: {
                email: true,
                never: false,
                desktop: true
            },
            content: {
                involve: true,
                follow: true,
                all: false
            }
        },
        confirm: false,
        time: new Date()
    }, {
        upsert: true
    }, cb);
}

AdminProfileSchema.statics.confirmInviteById = function(id, nickname, password, cb) {
    this.findOneAndUpdate({
        _id: id,
    }, {
        nickname: nickname,
        password: password,
        confirm: true,
        time: new Date()
    }, cb);
}

AdminProfileSchema.statics.removeById = function(id, cb) {
    this.remove({
        _id: id,
    })
}

AdminProfileSchema.statics.saveAdmin = function(Admin, cb) {
    this.findOneAndUpdate({
        _id: Admin._id
    }, {
        name: Admin.name,
        mobile: Admin.mobile,
        school: Admin.school,
        major: Admin.major,
        skill: Admin.skill,
        job: Admin.job,
        location: Admin.location,
        website: Admin.website,
        language: Admin.language,
    }, cb);
}

AdminProfileSchema.statics.getAllAdmins = function(cb) {
    this.find().exec(cb);
}



//---------------non-static method------------------//

AdminProfileSchema.method.findByEmailPassword = function(cb) {
    this.model("Admin").find({
        email: "yinys08@163.com",
        password: "123"
    }, cb);
}


//-------------------export-------------------------//

module.exports = mongoose.model("AdminProfile", AdminProfileSchema);
