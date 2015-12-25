var Q = require('q');
var fs = require('fs');
var MerchantProfile = require("../../model/MerchantProfileModel.js");
var WebsiteProfile = require("../../model/WebsiteProfileModel.js");

exports.profileUpload = function(req, res) {
  var file_name;
  var merchant_id;

  req.busboy.on('field', function(fieldname, value) {
    if (fieldname == "file_name") {
      file_name = value;
    } else if (fieldname == "merchant_id"){
      merchant_id = value;
      file_name = value+"/"+file_name;
    };
  });

  
  req.busboy.on('file', function (fieldname, file, filename) {

    var file_path = "./views/storage/Merchant/"+ file_name;
    var storage_path = "/storage/Merchant/"+file_name;

    var steam = fs.createWriteStream(file_path);
    file.pipe(steam);
    steam.on('error', function () {
        res.sendError("上传失败，请重新上传");
    });
    steam.on('close', function () {
      console.log(file_name);
      MerchantProfile.uploadLogo(merchant_id, storage_path, function(err, merchant){
        if (err) {
          res.sendError("上传失败，请重新上传");
        } else{
          console.log("上传成功"); 
          res.sendSuccess("上传成功");
        };

      })
    });

  });
  req.pipe(req.busboy);
}

exports.findOneMerchant = function (req, res) {
  var merchant_name = req.query.merchant_name;
  var merchant_email = req.query.merchant_email;
  if (merchant_name) {
    MerchantProfile.findMerchantByName(merchant_name,function(err, merchant){
      if (err) {
        res.sendError(err);
      } else{
        res.sendData(merchant,"success");
      }
    }); 
  } else if (merchant_email){
    MerchantProfile.findMerchantByEmail(merchant_email,function(err, merchant){
      if (err) {
        res.sendError(err);
      } else{
        res.sendData(merchant,"success");
      }
    }); 
  } else{
    res.sendError("至少需要邮箱或商户名中的一个");
  };
}

exports.getMerchantsLogo = function (req, res) {
  MerchantProfile.getMerchantsLogo(function (err, logos) {
    if (err) {
      res.sendError(err);
    } else{
      res.sendData(logos,"success");
    }
  });
}

exports.merchantLogin = function (req, res) {
  var session = req.session;
  var merchant = {
    email: req.body.email,
    password: req.body.password
  };
  console.log(merchant);
  console.log("aa");
  MerchantProfile.findMerchantByEmail( merchant.email, function (err, merchant_profile) {
    if (err) {
      res.sendError(err);
    } else if (merchant.password == merchant_profile.password){
      console.log("aa");
      session.merchant_id = merchant_profile.merchant_id;
      res.status(200).send({location:'/admin'});
    } else{
      res.sendError("密码错误");      
    }
  });
}

exports.createNewPassword = function (req, res) {
  var merchant_id = req.body.merchant_id;
  var new_password = req.body.new_password;
  MerchantProfile.updatePassword( merchant_id, new_password, function (err, merchant) {
    if (err) {
      res.sendError("密码错误");
    } else{
      res.sendSuccess("注册成功");
    };
  })
}

exports.returnToken = function (req, res) {
  var email = req.body.email;
  MerchantProfile.findMerchantByEmail( email, function (err, merchant) {
    if (err) {
      res.sendError("密码错误");
    } else{
      console.log(merchant);
      token = {
        token1: merchant._id,
        token2: merchant.create_time
      }
      console.log(token);
      res.sendData(token,"获取成功");
    };
  })
}

