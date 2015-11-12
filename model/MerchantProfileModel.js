/*
 * created by Liufan 嘿嘿
 */

var mongoose = require("mongoose");

//-----------------schema for user-----------------//

var MerchantProfileSchema = mongoose.Schema({
    //merchant information
    merchantid: Number,
    create_time: Date,
    merchant_name: String,
    owner_name: String,
    email: String,
    password: String,
    mobile: String,
    website: String,
    location: String,
    support_area: Array,
    identity_number: String,
    logo: String,
    business_license: String,
    tax_registration_certification: String,
    organization_order_certificaion: String,
    star_teacher: Array,
    special_area: Array,
    notification: {
        mobile: Boolean,
        email: Boolean,
        monthly_email: Boolean 
    },

    // website judgement
    verification: Boolean,
    score:{ 
        pass_rate: Number,
        article_score: Number,
        total_score: Number
    },
    followup_people: Array,
    //status
    live: Boolean,
    follower: Array,
    buyer: Array,
    reputation: Boolean,
    hierarchy: String

});


//----------------static method--------------------//

MerchantProfileSchema.statics.createSimpleUser = function(nickname, email, password, cb) {
    this.create({
        nickname: nickname,
        password: password,
        email: email,
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
        confirm: true,
        time: new Date()
    }, cb);
}


//-------------------export-------------------------//

module.exports = mongoose.model("UserModel", MerchantProfileSchema);