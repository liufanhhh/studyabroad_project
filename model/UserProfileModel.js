/*
 * created by Liufan 嘿嘿
 */

var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

//-----------------schema for user-----------------//

var UserProfileSchema = mongoose.Schema({
    user_id: Number,
    avatar: String,
    create_time: Date,
    nickname: String,
    realname: String,
    email: String,
    password: String,
    mobile: String,
    wechat: String,
    current_school: String,
    current_major: String,
    aim_school: Array,
    aim_major: Array,
    language_level: Array,
    identification_number: String,
    notification: {
        email: Boolean,
        wechat: Boolean,
        mobile: Boolean
    },
    follower: Array,
    confirm: Boolean,
    status: String,
    create_time: String
});

//---------Shuai's method for hashing the password------------
UserProfileSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserProfileSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password); 
}

//----------------static method--------------------//
UserProfileSchema.statics.findUserById = function(id, cb) {
    this.findOne({
        _id: id
    }, cb);
}

UserProfileSchema.statics.findUserByNickname = function(nickname, cb) {
    this.findOne({
        nickname:nickname
    }, cb);
}

UserProfileSchema.statics.findUserByEmail = function(email, cb) {
    this.findOne({
        email: email
    }, cb);
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

UserProfileSchema.statics.findUsersByNameOrEmail = function(name_email, cb) {
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
UserProfileSchema.statics.updatePasswordByEmail = function(name_email, newpassword, cb){
    var conditions = {email: name_email};
    var update = {$set :{password: newpassword}};
    this.update(conditions,update,false,cb)
}


UserProfileSchema.statics.updateEmailByRealname = function(language_level, cb) {
    this.findOneAndUpdate({
        language_level: 1 
    }, {$addToSet:{language_level: language_level}}, cb);
}

UserProfileSchema.statics.findByEmailPassword = function(email, password, cb) {
    this.findOne({
        email: email,
        password: password,
        confirm: true,
    }, cb);
}

UserProfileSchema.statics.updateUserById = function(id, email, cb) {
    this.findOneAndUpdate({
        _id: id
    }, {$set:{email:email}}, cb);
}

UserProfileSchema.statics.createSimpleUser = function(language_level, cb) {
    this.create({
        language_level: {name:12}
    }, cb);
}

UserProfileSchema.statics.createInviteUser = function(email, name, cb) {
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

UserProfileSchema.statics.confirmInviteById = function(id, nickname, password, cb) {
    this.findOneAndUpdate({
        _id: id,
    }, {
        nickname: nickname,
        password: password,
        confirm: true,
        time: new Date()
    }, cb);
}

UserProfileSchema.statics.removeById = function(id, cb) {
    this.remove({
        _id: id,
    })
}

UserProfileSchema.statics.saveUser = function(user, cb) {
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

UserProfileSchema.method.findByEmailPassword = function(cb) {
    this.model("User").find({
        email: "yinys08@163.com",
        password: "123"
    }, cb);
}


//-------------------export-------------------------//

module.exports = mongoose.model("UserProfileModel", UserProfileSchema);
