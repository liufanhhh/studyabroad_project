/*
 * created by Liufan 嘿嘿
 */

var mongoose = require("mongoose");

//-----------------schema for user-----------------//

var UserSchema = mongoose.Schema({
    user: {
        // _id: mongoose.Schema.ObjectId,
        time: Date,
        nickname: String,
        realname: String,
        email: String,
        password: String,
        mobile: String,
        school: String,
        major: String,
        skill: String,
        job: String,
        location: String,
        website: String,
        language: String,
        identitynumber:String,
        pic: mongoose.Schema.ObjectId,
        hello: Array,
        config: {
            ntf: {
                email: Boolean,
                never: Boolean,
                desktop: Boolean
            },
            content: {
                involve: Boolean,
                follow: Boolean,
                all: Boolean
            }
        },
        confirm: Boolean,
    }
});


//----------------static method--------------------//
UserSchema.statics.findUserById = function(id, cb) {
    this.findOne({
        _id: id
    }, cb);
}

UserSchema.statics.findUserByNickname = function(nickname, cb) {
    this.findOne({
        nickname:nickname
    }, cb);
}

UserSchema.statics.findUserByEmail = function(email, cb) {
    this.findOne({
        email: email
    }, cb);
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

UserSchema.statics.findUsersByNameOrEmail = function(name_email, cb) {
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
UserSchema.statics.updatePasswordByEmail = function(name_email, newpassword, cb){
    var conditions = {email: name_email};
    var update = {$set :{password: newpassword}};
    this.update(conditions,update,false,cb)
}



UserSchema.statics.findByEmailPassword = function(email, password, cb) {
    this.findOne({
        email: email,
        password: password,
        confirm: true,
    }, cb);
}

UserSchema.statics.updateUserById = function(id, new_user_doc, cb) {
    this.findOneAndUpdate({
        _id: id
    }, new_user_doc, cb);
}

UserSchema.statics.createSimpleUser = function(user, cb) {
    this.create({
        user: user,
        user: [1,2,3]
    }, cb);
}

UserSchema.statics.createInviteUser = function(email, name, cb) {
    // 外部保证本步更新或者创建的User均是没有确认注册的
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

UserSchema.statics.confirmInviteById = function(id, nickname, password, cb) {
    this.findOneAndUpdate({
        _id: id,
    }, {
        nickname: nickname,
        password: password,
        confirm: true,
        time: new Date()
    }, cb);
}

UserSchema.statics.removeById = function(id, cb) {
    this.remove({
        _id: id,
    })
}

UserSchema.statics.saveUser = function(user, cb) {
    this.findOneAndUpdate({
        _id: user._id
    }, {
        name: user.name,
        mobile: user.mobile,
        school: user.school,
        major: user.major,
        skill: user.skill,
        job: user.job,
        location: user.location,
        website: user.website,
        language: user.language,
    }, cb);
}
//---------------non-static method------------------//

UserSchema.method.findByEmailPassword = function(cb) {
    this.model("User").find({
        email: "yinys08@163.com",
        password: "123"
    }, cb);
}


//-------------------export-------------------------//

module.exports = mongoose.model("UserProfileModelBackup", UserSchema);