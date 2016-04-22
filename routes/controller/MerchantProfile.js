var Q = require('q');
var fs = require('fs');
var MerchantProfile = require("../../model/MerchantProfileModel.js");

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
  MerchantProfile.findMerchantByEmail( merchant.email, function (err, merchant_profile) {
    if (err||merchant_profile[0].merchant==null) {
      res.sendError(err);
    } else if (merchant.password == merchant_profile[0].merchant.password){
      console.log("aa");
      session.merchant_id = merchant_profile[0].merchant.id;
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
  MerchantProfile.findMerchantByEmail(merchant.email, function (err, profile) {
    console.log(typeof(profile));
    console.log(typeof(profile[0]));
    if (typeof(profile)=="object"&&profile[0]!=null) {
      token = profile[0].merchant.create_time;
    console.log(profile);
      res.sendData(token,"获取成功");
    } else{
      res.sendError("邮箱错误");
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

exports.getMerchantList = function (req, res){
  var page = req.query.page;
  var page_size = req.query.page_show_amount;
  MerchantProfile.getMerchantList( page, page_size, function (err, merchantlist) {
    if (err||merchantlist[0]==null) {
      res.sendError("获取失败");
    } else{
      res.sendData(merchantlist,"获取成功");
    };
  });
}

exports.searchMerchant = function (req, res){
  var sub_function = req.query.key||null;
  var value = req.query.value||null;
  var banned = req.query.banned;
  var location_city = req.query.location_city||null;

  if (sub_function!=null) {

    switch(sub_function) {
      case "id": 
      MerchantProfile.findMerchantById( value, function (err, merchantlist) {
        callbackFunction(res, err, merchantlist);
      });
      break;
      case "name": 
      MerchantProfile.findMerchantByName( value, function (err, merchantlist) {
        callbackFunction(res, err, merchantlist);
      });
      break;
      case "email": 
      MerchantProfile.findMerchantByEmail( value, function (err, merchantlist) {
        callbackFunction(res, err, merchantlist);
      });
      break;
      case "contact_person": 
      MerchantProfile.findMerchantByContactPerson( value, banned, location_city, function (err, merchantlist) {
        callbackFunction(res, err, merchantlist);
      });
      break;
      case "mobile": 
      MerchantProfile.findMerchantByMobile( value, banned, location_city, function (err, merchantlist) {
        callbackFunction(res, err, merchantlist);
      });
      break;
      case "website": 
      MerchantProfile.findMerchantByWebsite(value, banned, location_city, function (err, merchantlist) {
        callbackFunction(res, err, merchantlist);
      });
      break;
    }

  } else if(location_city!=null){
    MerchantProfile.findMerchantByLocationCity( location_city, banned, function (err, merchantlist) {
      callbackFunction(res, err, merchantlist);
    });
  } else if(banned==true) {
    MerchantProfile.findMerchantByBanned(banned, function (err, merchantlist) {
      callbackFunction(res, err, merchantlist);
    });
  } else {
    res.sendError("必填项未填写");
  };

}

