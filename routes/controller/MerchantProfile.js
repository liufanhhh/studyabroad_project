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
  MerchantProfile.findMerchantByEmail( merchant, function (err, merchant_profile) {
    if (err||merchant_profile.merchant==null) {
      res.sendError(err);
    } else if (merchant.password == merchant_profile.merchant.password){
      console.log("aa");
      session.merchant_id = merchant_profile.merchant.id;
      res.status(200).send({location:'/merchant/login'});
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
      res.sendError("邮箱错误");
    } else{
      res.sendSuccess("注册成功");
    };
  })
}

exports.returnToken = function (req, res) {
  var merchant = {
    email: req.body.email
  };
  MerchantProfile.findMerchantByEmail(merchant, function (err, profile) {
    console.log(profile);
    if (err||profile==null) {
      res.sendError("邮箱错误");
    } else{
      console.log(profile);
      token = profile.merchant.create_time;
      res.sendData(token,"获取成功");
    };
  })
}

exports.merchantNameComplete = function  (req, res) {
  var unfinished_name = req.query.name;
  MerchantProfile.nameComplete( unfinished_name, function (err, completed_name) {
    if (err) {
      res.sendError(err);
    } else{
      res.sendData(completed_name,"获取成功");
    };
  })

}
