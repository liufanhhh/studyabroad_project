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
UserProfileSchema.statics.createSimpleUser = function(user_nickname, user_realname, email, newPassword, userid, cb) {
    this.create({
        language_level: {name:12}
    }, cb);
}


//-------------------export-------------------------//

module.exports = mongoose.model("UserProfileModel", UserProfileSchema);
