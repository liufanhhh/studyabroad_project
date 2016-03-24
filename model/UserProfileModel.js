/*
 * created by Liufan 嘿嘿
 */

var mongoose = require("mongoose");

//-----------------schema for user-----------------//

var UserProfileSchema = mongoose.Schema({
    user_id: Number,
    user_login_times: Number,
    user_nickname: String,
    user_realname: String,
    user_email: String,
    user_password: String,
    user_mobile: String,
    user_current_school: String,
    user_current_major: String,
    user_target_school: String,
    user_target_major: String,
    user_target_area: Array,
    user_language_level: String,
    user_identitynumber:String,
    user_config: {
        ntf: {
            email: Boolean,
            mobile: Boolean,
            wechat: Boolean
        },
        show_personal_file: {
            all: Boolean,
            follower: Boolean,
            never: Boolean
        }
    },
    user_follower: Array,
    user_read_history: {
        merchant: Array,
        goods: Array,
        teacher: Array,
        user: Array,
        activity: Array
    },
    user_favourate: {
        merchant: Array,
        teacher: Array,
        goods: Array,
        user: Array,
        activity: Array
    },
    user_purchased:{
        goods: Array
    },
    user_group: Array,
    user_email_confirm: Boolean,
    user_id_verification: Boolean,
    user_special_identification: Array,
    user_create_time: Date
});

//----------------static method--------------------//
UserProfileSchema.statics.findUserById = function(id, cb) {
    this.findOne({
        _id: id
    }, cb);
}

UserProfileSchema.statics.countUsersAmount = function(conditions, cb) {
    var conditions = conditions||null;
    this.count({
        conditions: conditions
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


UserProfileSchema.statics.updateEmailByRealname = function(realname, email, cb) {
    this.findOneAndUpdate({
        realname: realname
    }, {$addToSet:{trypush:email}}, cb);
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

UserProfileSchema.statics.emailVerify = function (id) {
    this.findOneAndUpdate({
        _id: id
    }, {$set:{email_confirm:true}}, cb);
}

UserProfileSchema.statics.createNewUser = function(user_id, user, cb) {
    this.create({
        user_id: user_id,
        login_times: 0,
        nickname: user.name,
        email: user.email,
        password: user.password_sign,
        config: {
            ntf: {
                email: true,
                mobile: false,
                wechat: false
            },
            show_personal_file: {
                all: false,
                follower: true,
                never: false
            },

        },
        email_confirm: false,
        id_verification: false,
        create_time: user.create_time
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
