var MerchantProfile = require("../../model/MerchantProfileModel.js");
var UserProfile = require("../../model/UserProfileModel.js");

exports.createWebsiteInformation = function (req,res) {
	var merchant = {
		id:0
	};
	var user = {
		id:0
	};
	MerchantProfile.createNewMerchant(merchant, function(err, new_merchant){
        if (err||new_merchant==null) {
          	res.sendError("设置失败");
        } else{
        	UserProfile.createNewUser(user, function(err, new_user){
        		if (err||new_user==null) {
        			res.sendError("设置失败");
        		} else{
	          		res.sendSuccess("设置成功");
        		};
        	});
        };
    });
}