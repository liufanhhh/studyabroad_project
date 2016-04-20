var express = require('express');
var router = express.Router();
var path = require('path');

var Enter = require('./controller/Enter.js');
var CreateUser = require('./controller/CreateUser.js');
var CreateMerchant = require('./controller/CreateMerchant.js');
var CreateAdmin = require('./controller/CreateAdmin.js');
var AdminProfile = require('./controller/AdminProfile.js');
var AdminTaskProfile = require('./controller/AdminTaskProfile.js');
var MerchantProfile = require('./controller/MerchantProfile.js');
var UserProfile = require('./controller/UserProfile.js');
var ResetWebsiteProfile = require('./controller/ResetWebsiteProfile.js');


var Test = require('./controller/Test.js');


module.exports = function(app) {

	app.all("/", Enter.indexpageEnter);
	app.all("/admin", Enter.authenticateAdmin, Enter.adminPageEnter);

    //Admin Area
    app.get("/admin", Enter.authenticateAdmin, Enter.getAllAccess);
    app.post("/admin/password", AdminProfile.companyPasswordChecking);
    app.post("/admin/profile/token", AdminProfile.returnToken);
    app.post("/admin/login", AdminProfile.adminLogin);
    app.post("/admin/create", CreateAdmin.createNewAdmin);
    app.post("/admin/profile/change", Enter.authenticateAdmin, AdminProfile.updateAdmin);
    app.post("/admin/task/create", Enter.authenticateAdmin, AdminTaskProfile.adminTaskCreate);
    app.get("/admin/task/assign/update", Enter.authenticateAdmin, AdminTaskProfile.taskAssignAdminUpdate);
    app.post("/admin/task/note/update", Enter.authenticateAdmin, AdminTaskProfile.taskNoteUpdate);
    app.get("/admin/liufanhh/access", Enter.getAllAccess);
    app.get("/admin/delete", Enter.authenticateAdmin, AdminProfile.deleteAdmin);
    app.get("/admin/login", Enter.authenticateAdmin, Enter.adminPageEnter);
    app.get("/admin/index", Enter.authenticateAdmin, Enter.adminPageEnter);
    app.get("/admin/get/admin/list", Enter.authenticateAdmin, AdminProfile.getAllAdmins);
    app.get("/admin/all/task/list", Enter.authenticateAdmin, AdminTaskProfile.getAllTasks);
    app.get("/admin/get/merchant/list", Enter.authenticateAdmin, MerchantProfile.getMerchantList);
    app.get("/admin/current/name", function(req, res) {
    	res.sendData(req.session.admin_name,"获取成功");
    });
    app.get("/admin/response/merchants/name", Enter.authenticateAdmin, AdminTaskProfile.getAdminResponseMerchantList);
    app.get("/admin/search/merchant", Enter.authenticateAdmin, MerchantProfile.searchMerchant);
    app.get("/admin/search/task/id", Enter.authenticateAdmin, AdminTaskProfile.searchTaskById);
    app.get("/admin/search/task/merchant/id", Enter.authenticateAdmin, AdminTaskProfile.searchTaskByMerchantId);
    app.get("/admin/search/task/all/conditions", Enter.authenticateAdmin, AdminTaskProfile.searchTaskByAllConditions);
    

    
    

    app.get("/website/profile/create", ResetWebsiteProfile.createWebsiteInformation);




    //Index Page
	app.get("/merchant/logos", MerchantProfile.getMerchantsLogo);	

	//User Area
	app.get("/user/signup/page", Enter.userSignup);
	app.get("/user/login/page", Enter.userLogin);
	// app.get("/user/login", Enter.authenticateUser, Enter.indexpageEnter);
	app.get("/user/login/profile", Enter.authenticateUser, Enter.userProfilePage);
	app.post("/user/register", CreateUser.newuserCreate);
	app.post("/user/profile/token", UserProfile.getToken);
	app.post("/user/name/checking", UserProfile.nameChecking);
	app.post("/user/email/checking", UserProfile.emailChecking);
	app.post("/user/information", Enter.authenticateUser, UserProfile.getOneUser);
	app.post("/user/login", UserProfile.userLogin);
	app.get("/verification", UserProfile.emailVerify);
	app.get("/user/email/sent", Enter.emailSent);



	//Merchant Area
	app.get("/merchant/cooperate", MerchantProfile.merchantLogin);
	app.get("/merchant/login", Enter.authenticateMerchant, Enter.merchantProfilePage);

	app.post("/merchant/login", MerchantProfile.merchantLogin);
	app.post("/merchant/profile/password", MerchantProfile.createNewPassword);
	app.post("/merchant/profile/create", CreateMerchant.createNewMerchant);
	app.post("/merchant/profile/token", MerchantProfile.returnToken);
	app.get("/merchant/profile/find", MerchantProfile.findOneMerchant);
	app.post("/merchant/profile/logo", Enter.authenticateMerchant, MerchantProfile.profileUpload);
	app.post("/merchant/profile/business_license", Enter.authenticateMerchant, MerchantProfile.profileUpload);
	app.post("/merchant/profile/tax_registration", Enter.authenticateMerchant, MerchantProfile.profileUpload);
	app.post("/merchant/profile/organization_order", Enter.authenticateMerchant, MerchantProfile.profileUpload);
	app.get("/merchant/name/complete", MerchantProfile.merchantNameComplete);

}
