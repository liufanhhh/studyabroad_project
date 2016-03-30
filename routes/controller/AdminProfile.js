var Q = require('q');
var fs = require('fs');
var md5 = require("../md5.min.js");
var AdminProfile = require("../../model/AdminProfileModel.js");
var WebsiteProfile = require("../../model/WebsiteProfileModel.js");


exports.companyPasswordChecking = function(req, res) {
  var company_password = req.body.company_password;
  if(company_password == md5("123QIbuZOU")){
    res.sendSuccess("success login");
  } else{
    res.sendError("wrong password");
  };  
}

exports.returnToken = function (req, res) {
  var admin_name = req.body.admin_name;
  AdminProfile.findAdminByName( admin_name, function (err, admin) {
    if (err) {
      res.sendError("密码错误");
    } else{
      token = {
        token1: admin._id,
        token2: admin.create_time
      }
      res.sendData(token,"获取成功");
    };
  })
}

exports.findOneAdmin = function (req, res) {
  var admin_name = req.query.admin_name;
  var admin_email = req.query.admin_email;
  if (admin_name) {
    AdminProfile.findAdminByName(admin_name,function(err, admin){
      if (err) {
        res.sendError(err);
      } else{
        res.sendData(admin,"success");
      }
    }); 
  } else if (admin_email){
    AdminProfile.findAdminByEmail(admin_email,function(err, admin){
      if (err) {
        res.sendError(err);
      } else{
        res.sendData(admin,"success");
      }
    }); 
  } else{
    res.sendError("至少需要邮箱或商户名中的一个");
  };
}

exports.AdminLogin = function (req, res) {
  var session = req.session;
  var admin_name = req.body.admin_name;
  var admin_password = req.body.admin_password;
  AdminProfile.findAdminByName( admin_name, function (err, admin_profile) {
    if (err) {
      res.sendError(err);
    } else if (admin_password == admin_profile.password){
      session.admin_name = admin_profile.name;
      res.status(200).send({location:'/admin/index'});
    } else{
      res.sendError("密码错误");      
    }
  });
}

exports.createNewPassword = function (req, res) {
  var admin_id = req.body.admin_id;
  var new_password = req.body.new_password;
  AdminProfile.updatePassword( admin_id, new_password, function (err, admin) {
    if (err) {
      res.sendError("密码错误");
    } else{
      res.sendSuccess("注册成功");
    };
  })
}

exports.getAllAdmins = function(req, res){
  console.log("aa");
  AdminProfile.getAllAdmins(function (err, admins) {
    if (err) {
      res.sendError(err);
    } else{
      console.log(admins);
      res.sendData(admins,"获取成功");
    };
  })
}


