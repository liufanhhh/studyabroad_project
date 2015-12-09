var Q = require('q');
var fs = require('fs');
var MerchantProfile = require("../../model/MerchantProfileModel.js");
var WebsiteProfile = require("../../model/WebsiteProfileModel.js");

exports.createNewMerchant = function(req,res){
  var merchant = req.body.merchant;
  var websit_name = "liufan";
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
  var fullname;
  var merchant_id;

  req.busboy.on('field', function(fieldname, value) {
    console.log("fieldname"+fieldname+"value"+value);
    if (fieldname == "fullname") {
      fullname = value;
    } else if (filename == "merchant_id"){
      merchant_id = value;
      fullname = value+"/"+fullname;
    } else if(fieldname == "file_name"){
      file_name = value;
    };
  });

  req.busboy.on('file', function (fieldname, file, filename) {
    var file_path = "./views/storage/Merchant/"+ fullname;

    
      var steam = fs.createWriteStream(file_path);
      file.pipe(steam);
      steam.on('close', function () {
        console.log('File ' + filename + ' is uploaded');
        res.json({
          filename: file_name
        });
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
        console.log(merchant);
        res.sendData(merchant,"success");
      }
    }); 
  } else if (merchant_email){
    MerchantProfile.findMerchantByEmail(merchant_email,function(err, merchant){
      if (err) {
        res.sendError(err);
      } else{
        console.log(merchant);
        res.sendData(merchant,"success");
      }
    }); 
  } else{
    res.sendError("至少需要邮箱或商户名中的一个");
  };
}


