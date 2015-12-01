/*
 * created by Liufan 嘿嘿
 */

var mongoose = require("mongoose");

//-----------------schema for website-----------------//

var WebsiteProfileSchema = mongoose.Schema({
    name: String,
    user_amount: Number,
    merchant_amount: Number
});


//----------------static method--------------------//

WebsiteProfileSchema.statics.getInformation = function(name, cb) {
    this.find({name:name}, cb);
}

WebsiteProfileSchema.statics.createWebsiteInformation = function(name, user_amount, merchant_amount, cb) {
    this.create({
        name: name,
        user_amount: user_amount||0,
        merchant_amount: merchant_amount||0
    }, cb);
}


WebsiteProfileSchema.statics.setMerchantsAmount = function(name, amount, cb){
    this.findOneAndUpdate({
        name: name
    }, {
        amount: amount
    }, cb);
}

WebsiteProfileSchema.statics.setUsersAmount = function(name, amount, cb){
    this.findOneAndUpdate({
        name: name
    }, {
        amount: amount
    }, cb);
}

//-------------------export-------------------------//
module.exports = mongoose.model("WebsiteProfile", WebsiteProfileSchema);