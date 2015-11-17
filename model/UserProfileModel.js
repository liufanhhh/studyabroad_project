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
    id_number: String,
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
UserProfileSchema.statics.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserProfileSchema.statics.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password); 
}

//----------------static method--------------------//
UserProfileSchema.statics.createSimpleUser = function(user_nickname,user_realname,email,newPassword, id_number, user_id, cb) {
    this.create({
        nickname: user_nickname,
        realname: user_realname,
        email: email,
        password: newPassword,
        id_number: id_number,
        user_id: user_id
    }, cb);
}

UserProfileSchema.statics.countUserAmount = function(cb){
    this.count({},cb);
}

UserProfileSchema.statics.findUserByNickname = function(nickname, cb){
    this.findOne({
        nickname: nickname,
    }, cb);
}

UserProfileSchema.statics.findUserByEmail = function(email, cb){
    this.findOne({
        email: email,
    }, cb);
}

//-------------------export-------------------------//

module.exports = mongoose.model("UserProfileModel", UserProfileSchema);
