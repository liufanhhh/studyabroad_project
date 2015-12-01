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
UserProfileSchema.statics.createNewMerchant = function(merchant, cb) {
    var merchant_id = merchant., merchant_name, contact_person_name, email, mobile, website, location, 
    this.create({
        merchant_id: merchant_id,
        create_time: new Date(),
        merchant_name: merchant_name,
        contact_person_name: contact_person_name,
        email: email,
        password: "liuxuedianping",
        contact_person:     $scope.merchant.contact_person,
        mobile:     mobile,
        website:    $scope.merchant.website,
        location:   $scope.merchant.location,
        support_area:   $scope.merchant.support_area,
        score:{ 
            pass_rate:  $scope.merchant.score.pass_rate,
            article_score:  $scope.merchant.score.article_score,
            total_score: $scope.merchant.score.total_score
        }
        nickname: nickname,
        realname: realname,
        password: password,
        identitynumber: userid,
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
        confirm: false,
        status: status,
        create_time: new Date()
    }, cb);
}

MerchantProfileSchema.statics.findMerchantByMID = function(MID, cb) {
    this.findOne({
        merchant_id: MID
    }, cb);
}

MerchantProfileSchema.statics.findMerchantByName = function(merchant_name, cb) {
    this.findOne({
        merchant_name: merchant_name
    }, cb);
}

MerchantProfileSchema.statics.findMerchantById = function(id, cb) {
    this.findOne({
        _id: id
    }, cb);
}

MerchantProfileSchema.statics.countMerchantsAmount = function(conditions, cb) {
    var conditions = conditions||null;
    this.count({
        conditions
    }, cb);
}



//-------------------export-------------------------//
module.exports = mongoose.model("MerchantProfile", MerchantProfileSchema);