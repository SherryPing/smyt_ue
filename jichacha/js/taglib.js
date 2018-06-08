var urlpath = "https://wxapi.fofeasy.com";
//var urlpath = "http://192.168.11.135:8000";
var userId = localStorage.getItem("userId");
var betgAgainst = function(data, type, number) {
	if(data == "-" || data == null || data.length == 0 || data == "---") {
		return "--";
	} else if(type == "percent") {
		if(typeof(number) != "undefined") {
			return exports.fmtRatio(data, number);
		} else {
			return exports.fmtRatio(data);
		}
	} else if(type == "number") {
		if(typeof(number) != "undefined") {
			return exports.fmtFixed(data, number);
		} else {
			return exports.fmtFixed(data);
		}
	} else {
		return data;
	}
}

var fmtRatio = function(val, index) {
	//index默认值为2
	var index = arguments[1] ? arguments[1] : 2;

	if(val == null || isNaN(val) || typeof(val) == "string" && val == '') {
		return '--';
	}
	var ratio = (val * 100).toFixed(index);
	return ratio + "%";
}
var fmtRatio2 = function(val, index) {
	//index默认值为2
	var index = arguments[1] ? arguments[1] : 2;

	if(val == null || isNaN(val) || typeof(val) == "string" && val == '') {
		return '--';
	}
	var ratio = (val * 100).toFixed(index);
	return ratio;
}
var fmtFixed = function(val, index) {
	if(val == null || isNaN(val) || typeof(val) == "string" && val == '')
		return "--";
	return(val * 1).toFixed(index);
}
//获取头部url参数
var geturlParams = function(url) {
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest
}
//空字段取值--
var nore = function(val) {
	if(val || val == 0)
		return val;
	else
		return "--";
}
//格式日期
var formDate = function(val) {
	return val?val.substring(5, 10):"--";
}
var formaterDate = function(val) {
	if(val) {
		return val.substring(5, 10)
	} else {
		return "--"
	}
}
var noLogin = function(file,res) {
	if(res.status == 401) {
		layer.msg("您好像没登录");
		setTimeout(function() {
			if(file==1){
				window.location.href = "login.html";
			}else{
				window.location.href = "../login.html";
			}
			
		}, 1000)
	}
}
//私募公司管理规模万元转亿元范围
var tomillion=function(val){
		if(val>500000){
			return "50亿以上"
		}else  if(val>200000){
			return "20-50亿"
		}else if(val>100000){
			return "10-20亿"
		}else if(val>10000){
			return "1-10亿"
		}else if(val>0){
			return "0-1亿"
		}else{
			return "--"
		}
	}