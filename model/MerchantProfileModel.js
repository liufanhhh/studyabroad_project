/*
 * created by Liufan 嘿嘿
 */

var mongoose = require("mongoose");

//-----------------schema for user-----------------//

var MerchantProfileSchema = mongoose.Schema({
    //merchant information
    merchant_id: Number,
    create_time: Date,
    merchant_name: String,
    contact_person_name: String,
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
    followup_people: [
    /*{
        name: String,
        reason: String
    }*/
    ],

    //status
    live: Boolean,
    follower: Array,
    buyer: Array,
    reputation: Boolean,
    hierarchy: String
});

//----------------static method--------------------//
MerchantProfileSchema.statics.createNewMerchant = function(merchant_id, merchant, cb) {
    var merchant_id = merchant_id;
    console.log(merchant_id);
    var create_time = new Date();
    var merchant_name = merchant.name;
    var contact_person_name = merchant.contact_person;
    var owner_name = merchant.owner_name||null;
    var email = merchant.email||null;
    var password = merchant.password||"lxdp123";
    var mobile = merchant.mobile||null;
    var website = merchant.website||null;
    var location = merchant.location||null;
    var support_area = merchant.support_area||null;
    var pass_rate = merchant.pass_rate||6;
    var article_score = merchant.article_score||6;
    var total_score = merchant.total_score||6;
    this.create({
        //merchant information
        merchant_id: merchant_id,
        create_time: create_time,
        merchant_name: merchant_name,
        contact_person_name: contact_person_name,
        owner_name: owner_name,
        email: email,
        password: password,
        mobile: mobile,
        website: website,
        location: location,
        support_area: support_area,
        notify: {
            mobile: false,
            email: false,
            monthly_email: false 
        },
        
        // website judgement
        verification: false,
        score:{ 
            pass_rate: pass_rate,
            article_score: article_score,
            total_score: total_score
        },

        //status
        live: false,
        reputation: true,
        hierarchy: "normal"
    }, cb);
}

MerchantProfileSchema.statics.findMerchantByMID = function(MID, cb) {
    this.findOne({
        merchant_id: MID
    }, cb);
}

MerchantProfileSchema.statics.uploadLogo = function(MID, path, cb) {
    this.findOneAndUpdate({
        merchant_id: MID
    }, {
        $set:{logo: path}
    }, cb);
}

MerchantProfileSchema.statics.getMerchantsLogo = function(cb) {
    this.find({}, "merchant_name logo score", cb);
}

MerchantProfileSchema.statics.findMerchantByName = function(merchant_name, cb) {
    this.findOne({
        merchant_name: merchant_name
    }, cb);
}

MerchantProfileSchema.statics.findMerchantByEmail = function(merchant_email, cb) {
    this.findOne({
        email: merchant_email
    }, cb);
}

MerchantProfileSchema.statics.findMerchantById = function(id, cb) {
    this.findOne({
        _id: id
    }, cb);
}

MerchantProfileSchema.statics.countMerchantsAmount = function(conditions, cb) {
    var conditions = conditions||null;
    this.count({}, cb);
}



//-------------------export-------------------------//
module.exports = mongoose.model("MerchantProfile", MerchantProfileSchema);