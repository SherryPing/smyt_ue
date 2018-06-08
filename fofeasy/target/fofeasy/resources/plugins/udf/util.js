define(function(require, exports, module) {
	require('jdirk');
	var $ = require('jquery');
	/**
	 * 屏蔽字符串
	 */
	function _abbr(val,begin,end){
		if ($.isEmptyObject(val)){
			return '';
		}
		var diff = end - begin;
		var star = "";
		for (var i=0; i<diff; i++){
			star = star + "*";
		}
		val = val.replace(val.substring(begin,end),star);
		return val;
	}
	/**
	 * 表格数据过滤器
	 */
	function _dataGridLoadFilter(data,row,pre){
		 if(pre)  
	            pre = pre+".";  
	     for (var att in data) {  
           var r = data[att];  
           if(typeof(r) == "object"){  
        	   if ($.array.isArray(r)){
        		   row[pre+att] = r;
        	   } else{
        		   _dataGridLoadFilter(r,row,pre+att);  
        	   }
           }else{  
              row[pre+att] = r;                    
         }  
       } 
	}
	// 输出区域
	/**
	 * 指定位子插入字符
	 */
	exports.insert_flg = function(str,flg,sn){
	    var newstr="";
	    for(var i=0;i<str.length;i+=sn){
	        var tmp=str.substring(i, i+sn);
	        newstr+=tmp+flg;
	    }
	    return newstr;
	}
	/**
	 * 获取json对象长度
	 */
	exports.getJsonObJLength = function(json){
        var jsonLength=0;
        for (var i in json) {
            jsonLength++;
        }
        return jsonLength;
    }
	/**
	 * 格式化字符数
	 */
	exports.fmtFixed = function(val,index){
		if(val==null||isNaN(val)||typeof(val)=="string"&&val=='')
			return "--";
		return (val*1).toFixed(index);
	}
	/**
	 * 屏蔽手机号
	 */
	exports.fmtMobile = function(val){
		return _abbr(val,3,7);
	}
	/**
	 * 屏蔽身份认证号
	 */
	exports.fmtIdCard = function(val){
		return _abbr(val,10,14);
	}
	/**
	 * yyyy-MM-dd格式
	 */
	exports.fmtYyyMd = function(val){
		return $.date.format(val,'yyyyMMdd');
	}
	exports.fmtYyyyMMdd = function(val){
		return $.date.format(val,'yyyy-MM-dd');
	}
	exports.fmtYyyyMMddHHmm = function(val){
		return $.date.format(val,'yyyy-MM-dd HH:mm');
	}
	/**
	 * 格式化百分比
	 */
	exports.fmtRatio = function(val,index){
		//index默认值为2
		var index = arguments[1] ? arguments[1] : 2;
		
		if(val==null||isNaN(val)||typeof(val)=="string"&&val==''){
			return '--';
		}
		var ratio = (val*100).toFixed(index);
		return ratio + '%';
	}
	exports.fmtRatioN = function(val){
		if(val==null||isNaN(val)||typeof(val)=="string"&&val==''){
			return '--'
		}
		var ratio = (val*100).toFixed(0);
		return ratio + '%';
	}
	exports.fmtRatioNp = function(val){
		if(val==null||isNaN(val)||typeof(val)=="string"&&val==''){
			return '--'
		}
		var ratio = (val*100).toFixed(0);
		return ratio;
	}
	//负数转正
    exports.fmtRatioPlus = function(val,index){
        if(val==null||isNaN(val)||typeof(val)=="string"&&val==''){
            return '--'
        }else if( val<0){
        	val=-val;
		}
        var ratio = (val*100).toFixed(index);
        return ratio + '%';
    }
	/**
	 * 乘以100
	 */
	exports.fmtHundred = function(val){
		if(val==null||isNaN(val)||typeof(val)=="string"&&val==''){
			return ''
		}
		var ratio = (val*100).toFixed(0);
		return ratio;
	}
	/**
	 * 表格数据过滤器
	 */
	exports.dataGridLoadFilter = function(data){
		var value = {total:data.total,rows:[]};
		if (!$.isEmptyObject(data.rows) && $.isArray(data.rows)){
			for (var i=0; i<data.rows.length; i++){
				var row = {};
				_dataGridLoadFilter(data.rows[i],row,"");
				value.rows.push(row);
			}
		}
		return value;
	}
	/**
	 * 做空处理
	 */
	exports.betgAgainst = function(data,type,number){
		if(data== "-"|| data==null||data.length==0||data=="---"){
			return "--";
		}else if(type=="percent"){
			if(typeof(number)!="undefined"){
			return exports.fmtRatio(data,number);
			}else{
			return exports.fmtRatio(data);
			}
		}else if(type=="number"){
			if(typeof(number)!="undefined"){
				return exports.fmtFixed(data,number);
			}else{
			return exports.fmtFixed(data);
			}
		}
		else{
			return data;
		}
		
	}
	/**
	 * 添加天数
	 */
	exports.addDays = function(value,days){
		"use strict";
		let date1 = new Date(value);
        date1.setDate(date1.getDate() + days);
        let year = date1.getFullYear();
        let month = date1.getMonth() + 1;
        let day = date1.getDate();
        if(month<10)
        	month = "0"+month;
        if(day<10)
        	day = "0" + day
        return year + "-" + month + "-" + day;
	}
	
	exports.minYears = function(value,years){
		"use strict";
		let date1 = new Date(value);
        date1.setYear(date1.getFullYear() - years);
        let year = date1.getFullYear();
        let month = date1.getMonth() + 1;
        let day = date1.getDate();
        if(month<10)
        	month = "0"+month;
        if(day<10)
        	day = "0" + day
        return year + "-" + month + "-" + day;
	}
    //value:表格里表头中对应的$元素，name:util.explain里传入的参数，返回提示内容
    exports.table_info=function (value,name,place) {
        value.attr("data-toggle", "popover");
        value.attr("data-trigger", "hover");
        value.attr("data-content", util.explain(name));
        value.attr("data-placement", place?place:"right");
        value.attr("data-container", "body");
        return value;
    }
	exports.explain = function(value){
        if(value=="rvalue_adjustment_ratio"||value=="风险价值调整比"){ //风险价值调整比
            return "反映承担每一单位风险而获得的超额收益率，采用风险价值衡量风险，该指标越大越好。"
        }else if(value=="sharp_a"||value=="sharpe_a"||value=="年化夏普比"){ //年化夏普比
            return "反映承担每一单位风险而获得的超额收益率，采用年化波动率来衡量风险，该指标越大越好。"
        }else if(value=="sor_a"||value=="年化索提诺比率") { //年化索提诺比率
            return  "反映承担每一单位风险而获得的超额收益率，采用年化下行标准差来衡量风险，该指标越大越好。"
        }else if(value=="calmar_a"||value=="年化卡玛比率") { //年化卡玛比率
            return "反映承担每一单位风险而获得的超额收益率，采用最大回撤来衡量风险，该指标越大越好。"
        }else if(value=="return"||value=="累计收益率") { //累计收益率--
            return "反映基金在统计区间内投资的收益率。该指标越大越好。"
        }else if(value=="return_a"||value=="年化收益率") { //年化收益率--
            return "实务意义：该指标把不同频率的收益率（日收益率、周收益率、月收益率）换算成年化收益率，在进行基金评价时具有可比性。该指标越大越好。缺点：对于短于一年的收益率进行年化处理的隐含假设为本年至今的收益率可以保持到年末，该假设通常不符合现实。"
        }else if(value=="tr_a"||value=="年化特雷诺比率") { //年化特雷诺比率
            return "反映基金承担每一单位系统性风险而获得的超额收益率，该指标越大越好。"
        }else if(value=="info_a"||value=="年化信息比率"||value=="inf_a") { //年化信息比率
            return "反映每单位跟踪误差下所获得的超额收益，该指标越大越好。"
        }else if(value=="jensen_a"||value=="年化詹森指数") { //年化詹森指数
            return "詹森指数又称为阿尔法值，反映基金业绩中超过市场基准组合所获得的超额收益，该指标越大越好。"
        }else if(value=="stdev_a"||value=="年化标准差") { //年化标准差--
            return "实务意义：该指标把不同频度的标准差换算成年化标准差，在进行基金评价时具有可比性。该指标越小越好。"
        }else if(value=="dd_a"||value=="年化下行标准差") { //年化下行标准差--
            return "实务意义：将基金收益率小于无风险收益率的情况定义为下行风险，反映下行风险的波动幅度，更符合投资者对风险认知。该指标越小越好。备注：标准差所量化的对象是基金收益的波动，而不是风险，因此标准差并没有体现基金亏损的可能性。下行标准差则弥补了这一点。"
        }else if(value=="max_drawdown"||value=="max_retracement"||value=="最大回撤") { //最大回撤
            return "回撤是指在某一段时期内基金净值从最高点开始回落到低点的最大幅度，用来衡量该基金的抗风险能力，该指标越小越好。"
        }else if(value=="mdd_time"||value=="最大回撤的形成期") { //最大回撤的形成期--
            return "实务意义：该指标反映了基金净值从最高点开始回落到最低点时所经历的时间长度。"
        }else if(value=="beta"||value=="贝塔系数") { //贝塔系数--
            return "实务意义：反映了基金收益率相对于基准收益率的敏感度，表示市场风险。贝塔系数的绝对值大于1，则基金的波动性大于业绩评价基准的波动性。"
        }else if(value=="VaR"||value=="风险价值") { //风险价值
            return "即风险价值，表示基金在未来特定的一段时间内的最大可能损失，该指标越小越好。"
        }else if(value=="年化波动率") { //年化波动率
            return "把不同频率的波动率（日波动率、周波动率、月波动率）换算成年化波动率，使得基金评价时具有可比性，该指标越小越好。"
        }else if(value=="波动率") { //波动率
            return "反映基金收益率的波动幅度及稳定性，该指标越大，表明基金收益率序列波动越厉害，风险程度越大，故该指标越小越好。"
        }else if(value=="相关系数"||value=="corr"||value=="benchmark_r") { //相关系数
            return "若相关系数为正，其值越大，表示基金收益走势与基准收益走势越接近，若相关系数为负，其值越小，表示基金收益走势与基准收益走势越背离。"
        }else if(value=="odds"||value=="胜率") { //胜率
            return "反映统计区间内基金收益率超越基准收益的周期数与区间总周期数之比，该指标越大越好。"
        }
	}
	exports.star = 	function (Score){
		Score = parseFloat(Score);
		var star = "";
			if(Score>90){
				countingStar(5)
			}else if(Score>80){
				countingStar(4,"yes")
			}else if(Score>70){
				countingStar(4);
			}else if(Score>60){
				countingStar(3,"yes");
			}else if(Score>50){
				countingStar(3);
			}else if(Score>40){
				countingStar(2,"yes");
			}else if(Score>30){
				countingStar(2);
			}else if(Score>20){
				countingStar(1,"yes");
			}else if(Score>10){
				countingStar(1);
			}else if(Score>0){
				countingStar(0,"yes");
			}
		function countingStar(number,half){
				if(number==5){
					for(var i = 0;i<number;i++){
						star+="<img src='/resources/images/star.jpg'>"
					}
				}else{
					if(half=="yes"){
						var emptyStar = 5 - number -1
						for(var i = 0;i<number;i++){
							star+="<img src='/resources/images/star.jpg'>"
						}
						star+="<img src='/resources/images/halfStar.jpg'>"
						for(var i = 0;i<emptyStar;i++){
							star+="<img src='/resources/images/emptyStar.jpg'>"
						}
					}else{
						var emptyStar = 5 - number;
						for(var i = 0;i<number;i++){
							star+="<img src='/resources/images/star.jpg'>"
						}
						for(var i = 0;i<emptyStar;i++){
							star+="<img src='/resources/images/emptyStar.jpg'>"
						}
					}
				}
			
		}
		return star
}
});