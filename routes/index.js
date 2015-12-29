var express = require('express');
var router = express.Router();
var path = require('path');

var Enter = require('./controller/Enter.js');
var CreateUser = require('./controller/CreateUser.js');
var CreateMerchant = require('./controller/CreateMerchant.js');
var CreateAdmin = require('./controller/CreateAdmin.js');
var AdminProfile = require('./controller/AdminProfile.js');
var MerchantProfile = require('./controller/MerchantProfile.js');
var UserInformation = require('./controller/UserInformation.js');
var ResetWebsiteProfile = require('./controller/ResetWebsiteProfile.js');


var Test = require('./controller/Test.js');


module.exports = function(app) {

	app.all("/", Enter.indexpageEnter);
	app.all("/admin", Enter.authenticateAdmin, Enter.adminpageEnter);




    //Admin Area
    app.get("/admin", Enter.authenticateAdmin, Enter.getAllAccess);
    app.post("/admin/password", AdminProfile.companyPasswordChecking);
    app.post("/admin/profile/token", AdminProfile.returnToken);
    app.post("/admin/login", CreateAdmin.newuserCreate);
    app.get("/admin/liufanhh/access", Enter.getAllAccess);
    app.get("/admin/index", Enter.authenticateAdmin, Enter.adminPageEnter);


    app.get("/website/profile/create", ResetWebsiteProfile.createWebsiteInformation);
    app.get("/website/profile/usersAmountCount", ResetWebsiteProfile.countUsersAmount);
    app.get("/website/profile/usersAmountSet", ResetWebsiteProfile.setUsersAmount);
    app.get("/website/profile/merchantsAmountCount", ResetWebsiteProfile.countMerchantsAmount);
    app.get("/website/profile/merchantsAmountSet", ResetWebsiteProfile.setMerchantsAmount);



    //Index Page
	app.get("/merchant/logos", MerchantProfile.getMerchantsLogo);	

	//User Area
	app.get("/user/information", UserInformation.getOneUserNew);
	app.post("/register", CreateUser.newuserCreate);

	app.post("/user/information", UserInformation.getOneUser);
	

	//Merchant Area
	app.get("/merchant/login/:merchant_id", Enter.authenticateMerchant, Enter.merchantSessionLogin);
	app.get("/merchant/login", Enter.authenticateMerchant, Enter.merchantSessionLogin);
	app.post("/merchant/login", MerchantProfile.merchantLogin);
	app.post("/merchant/profile/password", MerchantProfile.createNewPassword);
	app.post("/merchant/profile/create", CreateMerchant.createNewMerchant);
	app.post("/merchant/profile/token", MerchantProfile.returnToken);
	app.get("/merchant/profile/find", MerchantProfile.findOneMerchant);



	app.post("/merchant/profile/logo", MerchantProfile.profileUpload);
	app.post("/merchant/profile/business_license", MerchantProfile.profileUpload);
	app.post("/merchant/profile/tax_registration", MerchantProfile.profileUpload);
	app.post("/merchant/profile/organization_order", MerchantProfile.profileUpload);



}
