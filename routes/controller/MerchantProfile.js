var Q = require('q');
var fs = require('fs');
var MerchantProfile = require("../../model/MerchantProfileModel.js");
var WebsiteProfile = require("../../model/WebsiteProfileModel.js");

exports.createNewMerchant = function(req,res){
  var merchant = req.body.merchant;
  var websit_name = "留学点评网";
  var sameName = Q.nfbind(MerchantProfile.findMerchantByName.bind(MerchantProfile));

  var handleNameResult = function(exist){
    var deferred = Q.defer();
    if (exist) {
      deferred.reject("商户名相同");
    }else{
      WebsiteProfile.getInformation(websit_name,function (err, website_profile) {
        var merchant_amount = website_profile.merchant_amount+1;
        deferred.resolve(merchant_amount);
        return deferred.promise;
      });
    }
    return deferred.promise;
  }

  var changeWebsiteProfile = function (amount) {
    var amount = amount;
    var deferred = Q.defer();
    if (!amount) {
      deferred.reject("设置失败");
    }else{
      WebsiteProfile.setMerchantsAmount(websit_name, amount, function (error, result) {
        if(result){
          result.merchant_amount++;
          deferred.resolve(result.merchant_amount);
        } else{
          deferred.reject("设置失败");
        };
        return deferred.promise;
      });
    }
    return deferred.promise;
  }

  var createMerchant = function (amount){
    var deferred = Q.defer();
    if (!amount) {
      deferred.reject("设置失败");
    }else{
      MerchantProfile.createNewMerchant(amount, merchant, function(err, new_merchant){
        deferred.resolve(new_merchant);
        // return deferred.promise;
      });
    }
    return deferred.promise;
  }

  sameName(merchant.name)
  .then(handleNameResult)
  .then(changeWebsiteProfile)
  .then(createMerchant)
  .done(
    function(data){
      fs.mkdir("./views/storage/Merchant/"+data.merchant_id);
      res.sendData(data,"创建成功");
    },function(error){
        res.sendError("创建失败");
        console.log(error);
    });
}

exports.profileUpload = function(req, res) {
  var file_name;
  var merchant_id;

  req.busboy.on('field', function(fieldname, value) {
    if (fieldname == "file_name") {
      file_name = value;
      console.log("1"+value);
    } else if (fieldname == "merchant_id"){
      merchant_id = value;
      file_name = value+"/"+file_name;
      console.log("2"+file_name);
    };
  });

  
  req.busboy.on('file', function (fieldname, file, filename) {

    var file_path = "./views/storage/Merchant/"+ file_name;
    var storage_path = "/storage/Merchant/"+file_name;

    console.log(file_name);
    var steam = fs.createWriteStream(file_path);
    file.pipe(steam);
    steam.on('error', function () {
        res.sendError("上传失败，请重新上传");
    });
    steam.on('close', function () {
      console.log("storage_path"+storage_path);
      MerchantProfile.uploadLogo(merchant_id, storage_path, function(err, merchant){
        if (err) {
          res.sendError("上传失败，请重新上传");
        } else{
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
  var merchant = req.body.merchant;
  MerchantProfile.findMerchantByEmail( merchant.email, function (err, merchant_profile) {
    if (err) {
      res.sendError(err);
    } else if (merchant.password == merchant_profile.password){
      req.session.name = merchant_profile.name;
    } else{
      res.sendError("密码错误");      
    }
  });
}
