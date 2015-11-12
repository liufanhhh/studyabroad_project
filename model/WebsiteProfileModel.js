/*
 * created by Liufan 嘿嘿
 */

var mongoose = require("mongoose");

//-----------------schema for user-----------------//

var WebsiteProfileSchema = mongoose.Schema({
    user_amount: Number,
    merchant_amount: Number,

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