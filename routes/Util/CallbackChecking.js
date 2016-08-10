var LogFan = require("../../LogFan/LogFan.js");
var log = LogFan.createLogger({log_writer:"liufanhh",log_name:'CallbackErrorLog'});

exports.checkCallback = function (res, err, profile, type) {
  try {
    if (type=="LogEmail") {
      if (err) {
        log.error("Email Sent Failed", {ErrorInfo:err.stack});
      }
    } else if(err) {
      log.error("A Error Happened in Callback Function", {ErrorInfo:err.stack});
    } else if(profile===undefined||profile===null) {
      log.warn("Data is Undefined or Null in Callback Function", {ErrorInfo:log.traceLine()});
      res.sendError("获取失败");
    } else if (Array.isArray(profile)){
      if (type==="Array") {
        res.sendData(profile,"获取成功");
      } else if(type!=="Array"){
        res.sendError("类型获取错误");
        log.error("查询数组发生错误", {ErrorInfo:log.traceLine()});
      } else {
        res.sendError("Internal Error");
        log.error("内部错误", {ErrorInfo:log.traceLine()});
      };
    } else if (profile instanceof Object){
      if (type==="Object") {
        res.sendData(profile,"获取成功");
      } else if(type!=="Object"){
        res.sendError("类型获取错误");
        log.error("查询对象发生错误", {ErrorInfo:log.traceLine()});
      } else {
        res.sendError("Internal Error");
        log.error("内部错误", {ErrorInfo:log.traceLine()});
      };
    } else if (profile) {
      res.sendData(profile,"获取成功");
    } else {
      log.warn("Unexpected Callback type", {WarnInfo:log.traceLine(),Data: profile});
    }
  } catch(e){
    log.Error(
      "SendEmail Function Error", 
      {
        ErrorInfo:e.stack,
      });
    if (type!=="LogEmail") {
      res.sendError(e);
    }
  };
};
