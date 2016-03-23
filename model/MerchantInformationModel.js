/*
 * created by Liufan 嘿嘿
 */

var mongoose = require("mongoose");

//-----------------schema for user-----------------//

var MerchantInformationSchema = mongoose.Schema({
    //direct generate by programme 
    merchantid: Number,
    create_time: Date,

    //required area when creating by admin
    merchant_name: String,
    password: String,
    mobile: String,
    website: String,

    //required area when merchant register
    email: String,
    owner_name: String,
    location: String,
    support_area: Array,
    logo: String,
    business_license: String,
    tax_registration_certification: String,
    organization_order_certificaion: String,
    star_teacher: Array,
    special_area: Array
    notify: {
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
    follow_up_people: [{
        name: String,
        reason: String
    }],

    //status
    live: Boolean,
    follower: Array,
    buyer: Array,
    reputation: Boolean,
    hierarchy: String

});