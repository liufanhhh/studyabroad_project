/*
  angular-md5 - v0.1.8 
  2015-11-17
*/

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
  module.exports = "liufanhh";
}
(function(angular) {
  "use strict";
  angular.module("liufanhh", []).factory("test", [ function() {
    var test = {
        create: function(){
          return "success";
        }
      }
    return test;
  } ]);
})(angular);

