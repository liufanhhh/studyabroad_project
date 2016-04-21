/*
 * created by Liufan 嘿嘿
 */

var mongoose = require("mongoose");

//-----------------schema for user-----------------//

var UserProfileSchema = mongoose.Schema({
    user: {
        id: Number,
        nickname: String,
        realname: String,
        email: String,
        password: String,
        mobile: String,
        current_school: String,
        current_major: String,
        target_school: Array,
        target_major: Array,
        target_area: Array,
        language_level: String,
        identitynumber:String,
        config: {
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
        follower: Array,
        read_history: {
            merchant: Array,
            goods: Array,
            teacher: Array,
            user: Array,
            activity: Array
        },
        favourate: {
            merchant: Array,
            teacher: Array,
            goods: Array,
            user: Array,
            activity: Array
        },
        purchased:{
            goods: Array
        },
        group: Array,
        email_confirm: Boolean,
        id_verification: Boolean,
        special_identification: Array,
        create_time: Date
    }
});

//----------------static method--------------------//
UserProfileSchema.statics.findUserById = function(id, cb) {
    this.findOne({
        _id: id
    }, cb);
}

UserProfileSchema.statics.countUsersAmount = function(conditions, cb) {
    var conditions = conditions||null;
    this.count(conditions, cb);
};

UserProfileSchema.statics.findUserByNickname = function(nickname, cb) {
    this.findOne({
        "user.nickname":nickname
    }, cb);
}

UserProfileSchema.statics.findUserByEmail = function(email, cb) {
    this.findOne({
        "user.email": email
    }, cb);
}

UserProfileSchema.statics.createNewUser = function(user, cb) {
    this.create({
        user: user
    }, cb);
}

UserProfileSchema.statics.confirmUserEmail = function(user_id, cb) {
    this.findOneAndUpdate({
        _id: user_id
    }, {
        $set: { "user.email_confirm": true}
    }, cb);
}

//-------------------export-------------------------//

module.exports = mongoose.model("UserProfileModel", UserProfileSchema);
