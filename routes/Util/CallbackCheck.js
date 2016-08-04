exports.callbackCheck = function (res, err, profile, type) {
  try {
    if (profile===undefined||profile===null) {
      res.sendError("获取失败");
    } else if (Array.isArray(profile)){
      if (type==="Array") {
        res.sendData(data,"获取成功");
      } else if(type!=="Array"){
        res.sendError("类型获取错误");
      } else {
        res.sendError("Internal Error");
      };
    } else if {
      
    }
  } catch(error){
    res.sendError(error);
  };
};
