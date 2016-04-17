/*
 * created by Liufan 嘿嘿
 */

var mongoose = require("mongoose");

//-----------------schema for user-----------------//

var MerchantProfileSchema = mongoose.Schema({
    merchant: {
        //merchant information
        id: Number,
        create_time: Date,
        name: String,
        contact_person_name: String,
        owner_name: String,
        email: String,
        password: String,
        mobile: String,
        website: String,
        location_city: String,
        location_details: String,
        support_area: Array,  //支持地区 String
        identity_number: String,
        logo: String,
        business_license: String,
        tax_registration_certification: String,
        organization_order_certificaion: String,
        star_teacher: Array,
        special_area: Array,
        other_contact_method: Array,
        goods: Array,
        notify: {
            mobile: Boolean,
            email: Boolean,
            monthly_email: Boolean 
        },
        
        // website judgement
        government_verification: Boolean,
        website_verification: Boolean,
        score:{ 
            pass_rate: Number,
            article_score: Number,
            total_score: Number
        },
        //status
        live: Boolean,
        banned: Boolean,
        follower: Array,
        buyer: Array,
        willing_to_cooperate: Boolean,
        hierarchy: String
    }
});

//----------------static method--------------------//
MerchantProfileSchema.statics.createNewMerchant = function(merchant, cb) {
    this.create({
        merchant: merchant
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
    this.find().sort({"merchant.create_time": 'desc'}).skip(0).limit(6).exec(cb);
}

MerchantProfileSchema.statics.getMerchantList = function(page, page_size, cb) {
    this.find().sort({"merchant.create_time": 'desc'}).skip(page_size*(page-1)).limit(page_size).exec(cb);
}

MerchantProfileSchema.statics.findMerchantById = function(id, cb) {
    this.findOne({
        _id: id
    },cb);
}

MerchantProfileSchema.statics.updatePassword = function(merchant_id, new_password, cb) {
    this.findOneAndUpdate({
        merchant_id: merchant_id
    }, {
        password: new_password 
    }, cb);
}

MerchantProfileSchema.statics.countMerchantsAmount = function(conditions, cb) {
    var conditions = conditions||null;
    this.count(conditions, cb);
}

MerchantProfileSchema.statics.nameComplete = function(unfinished_name, cb) {
    var name = new RegExp(unfinished_name, "gi");
    this.find({
        "merchant.name": {
            $regex: name
        }
    }).select('merchant.name').exec(cb);
}

MerchantProfileSchema.statics.findMerchantById = function(id, cb) {
    this.findOne({
        "merchant.id": id
    }).exec(cb);
}

MerchantProfileSchema.statics.findMerchantByName = function(name, cb) {
    this.findOne({
        "merchant.name": name
    }).exec(cb);
}

MerchantProfileSchema.statics.findMerchantByEmail = function(email, cb) {
    this.findOne({
        "merchant.email": email
    }).exec(cb);
}

MerchantProfileSchema.statics.findMerchantByContactPerson = function(contact_person, cb) {
    this.find({
        "merchant.contact_person": contact_person
    }).exec(cb);
}

MerchantProfileSchema.statics.findMerchantByMobile = function(mobile, cb) {
    this.find({
        "merchant.mobile": mobile
    }).exec(cb);
}

MerchantProfileSchema.statics.findMerchantByWebsite = function(website, cb) {
    this.find({
        "merchant.website": website
    }).exec(cb);
}

MerchantProfileSchema.statics.findMerchantByLocationCity = function(location_city, cb) {
    this.findOne({
        "merchant.location_city": location_city
    }).exec(cb);
}

//-------------------export-------------------------//
module.exports = mongoose.model("MerchantProfile", MerchantProfileSchema);