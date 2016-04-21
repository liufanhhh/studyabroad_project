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

MerchantProfileSchema.statics.getMerchantsLogo = function(cb) {
    this.find().sort({"merchant.create_time": 'desc'}).skip(0).limit(6).exec(cb);
}

MerchantProfileSchema.statics.getMerchantList = function(page, page_size, cb) {
    this.find().sort({"merchant.create_time": 'desc'}).skip(page_size*(page-1)).limit(page_size).exec(cb);
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
    this.find({
        "merchant.id": id
    }).exec(cb);
}

MerchantProfileSchema.statics.findMerchantByName = function(name, cb) {
    this.find({
        "merchant.name": name
    }).exec(cb);
}

MerchantProfileSchema.statics.findMerchantByEmail = function(email, cb) {
    this.find({
        "merchant.email": email
    }).exec(cb);
}

MerchantProfileSchema.statics.findMerchantByContactPerson = function(contact_person, banned, location_city, cb) {
    if (location_city!=null) {
        this.find({
            "merchant.contact_person": contact_person,
            "merchant.banned": banned,
            "merchant.location_city": location_city
        }).exec(cb);
    } else{
        this.find({
            "merchant.contact_person": contact_person,
            "merchant.banned": banned
        }).exec(cb);
    };

}

MerchantProfileSchema.statics.findMerchantByMobile = function(mobile, banned, location_city, cb) {
    if (location_city!=null) {
        this.find({
            "merchant.mobile": mobile,
            "merchant.banned": banned,
            "merchant.location_city": location_city
        }).exec(cb);
    } else{
        this.find({
            "merchant.mobile": mobile,
            "merchant.banned": banned
        }).exec(cb);
    };
}

MerchantProfileSchema.statics.findMerchantByWebsite = function(website, banned, location_city, cb) {
    if (location_city!=null) {
        this.find({
            "merchant.website": website,
            "merchant.banned": banned,
            "merchant.location_city": location_city
        }).exec(cb);
    } else{
        this.find({
            "merchant.website": website,
            "merchant.banned": banned
        }).exec(cb);
    };

}

MerchantProfileSchema.statics.findMerchantByLocationCity = function(location_city, banned, cb) {
    this.find({
        "merchant.location_city": location_city,
        "merchant.banned": banned
    }).exec(cb);
}

MerchantProfileSchema.statics.findMerchantByBanned = function(banned, cb) {
    this.find({
        "merchant.banned": banned
    }).exec(cb);
}

//-------------------export-------------------------//
module.exports = mongoose.model("MerchantProfile", MerchantProfileSchema);