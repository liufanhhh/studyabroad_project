var Q = require('q');
var fs = require('fs');
var md5 = require("../md5.min.js");
var AdminProfile = require("../../model/AdminProfileModel.js");

var callbackFunction = function (res, err, profile, data) {
  var data = data||null;
  if (data!=null) {
    res.sendData(data,"获取成功");
  } else if(profile instanceof Array&&data==null){
    if (profile[0] == null) {
      res.sendData(profile,"没有符合记录");
    } else{
      res.sendData(profile,"获取成功");
    };
  } else if (profile==undefined||profile==null) {
    res.sendError("未能查询到");
  } else if(err) {
    res.sendError(err);
  } else{
    res.sendData(profile,"获取成功");
  };
}

exports.companyPasswordChecking = function(req, res) {
  var company_password = req.body.company_password;
  if(company_password == md5("123QIbuZOU")){
    res.sendSuccess("success login");
  } else{
    res.sendError("wrong password");
  };  
}

exports.returnToken = function (req, res) {
  var admin_name = req.body.name;
  console.log(admin_name);
  AdminProfile.findAdminByName( admin_name, function (err, profile) {
    callbackFunction(res, err, profile, profile.admin.create_time);
  });
}

exports.deleteAdmin = function (req, res) {
  var admin_name = req.query.admin;
  console.log(admin_name);
  AdminProfile.deleteAdminByName( admin_name, function (err, profile) {
    callbackFunction(res, err, profile);
  });
}


exports.findOneAdmin = function (req, res) {
  var admin_name = req.query.admin_name;
  var admin_email = req.query.admin_email;
  if (admin_name) {
    AdminProfile.findAdminByName(admin_name,function(err, admin){
      callbackFunction(res, err, admin);
    }); 
  } else if (admin_email){
    AdminProfile.findAdminByEmail(admin_email,function(err, admin){
      callbackFunction(res, err, admin);
    }); 
  } else{
    res.sendError("至少需要邮箱或商户名中的一个");
  };
}

exports.adminLogin = function (req, res) {
  var session = req.session;
  var admin_name = req.body.name;
  var admin_password = req.body.password;
  AdminProfile.findAdminByName( admin_name, function (err, admin_profile) {
    if (err) {
      res.sendError(err);
    } else if (admin_password == admin_profile.admin.password){
      session.admin_name = admin_profile.admin.name;
      console.log(session.admin_name);
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

exports.updateAdmin = function (req, res) {
  var admin = req.body.admin;
  admin.password = admin.password_sign;
  AdminProfile.updateAdmin( admin, function (err, admin_profile) {
    if (err||admin_profile==null) {
      res.sendError("密码错误");
    } else{
      res.sendSuccess("修改成功");
    };
  })
}

exports.getAllAdmins = function(req, res){
  var deleted = req.query.deleted;
  AdminProfile.getAllAdmins(deleted, function (err, admins) {
    if (err) {
      res.sendError(err);
    } else{
      res.sendData(admins,"获取成功");
    };
  })
}


exports.adminAvatarUpload = function(req, res) {
  var file_name;
  var admin_name;

  req.busboy.on('field', function(fieldname, value) {
    if (fieldname == "filename") {
      file_name = value;
    } else if (fieldname == "admin_name"){
      admin_name = value;
    };
  });

  
  req.busboy.on('file', function (fieldname, file, filename) {

    var file_path = "./views/storage/Admin/"+ file_name;
    var storage_path = "/storage/Admin/"+file_name;

    var steam = fs.createWriteStream(file_path);
    file.pipe(steam);
    steam.on('error', function () {
        res.sendError("上传失败，请重新上传");
    });
    steam.on('close', function () {
      console.log(file_name);
      AdminProfile.uploadAvatar(admin_name, storage_path, function(err, admin){
        callbackFunction( res, err, admin);
      })
    });

  });
  req.pipe(req.busboy);
}





