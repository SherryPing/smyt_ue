/**
 * 基本信息.js
 */
define(function(require, exports, module) {
	var $ = require('jquery');
	var state = false;
	// 初始化区域
	function _init(){
		if(document.referrer.indexOf("customData")){
			state = true;
		};
//		basicInfo()
	}
	function basicInfo(){
		
	}
	//输出区域
	exports.init = _init;
})
	