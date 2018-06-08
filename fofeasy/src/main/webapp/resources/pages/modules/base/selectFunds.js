define(function(require, exports, module) {
	// 引入js区域
	require('layer');
	var $ = require('jquery');
	var constant = require('constant');
	// 业务逻辑区域
	/**
	 * 产品透视私募添加产品
	 */
	function add2SelectFunds(fund){
		var selectFunds = getFunds();
		if (checkExistFund(selectFunds,fund.fundId)){
			// 已经存在
			return 1;
		}
		if (selectFunds.length >= 4){
			// 添加超出限额
			return 2;
		}
		selectFunds.push(fund);
		localStorage[constant.selectFunds] = JSON.stringify(selectFunds);
		return 3;
	}
    /**
     * 产品透视公募添加产品
     */
    function add2SelectFundspub(fund){
        var selectFunds = getFundspub();
        if (checkExistFund(selectFunds,fund.fundId)){
            // 已经存在
            return 1;
        }
        if (selectFunds.length >= 4){
            // 添加超出限额
            return 2;
        }
        selectFunds.push(fund);
        localStorage[constant.selectFundspub] = JSON.stringify(selectFunds);
        return 3;
    }
	/**
	 * 投顾挖掘添加产品
	 */
	function excavatadd2SelectFunds(fund){
		var excavatselectFunds = excavatGetfunds();
		if (excavatcheckExistFund(excavatselectFunds,fund.fundId)){
			// 已经存在
			return 1;
		}
		if (excavatselectFunds.length >= 4){
			// 添加超出限额
			return 2;
		}
		fund = [fund]
		excavatselectFunds.push(fund);
		localStorage.setItem("excavat",JSON.stringify(excavatselectFunds))
		return 3;
	}
	/**
	 * 组合配置添加产品
	 */
	function combinatadd2SelectFunds(fund){
		var combinatselectFunds = combinatGetfunds();
		if (combinatcheckExistFund(combinatselectFunds,fund.fundId)){
			// 已经存在
			return 1;
		}
		if (combinatselectFunds.length >= 20){
			// 添加超出限额
			return 2;
		}
		fund = [fund]
		combinatselectFunds.push(fund);
		localStorage.setItem("combinat",JSON.stringify(combinatselectFunds))
		return 3;
	}
	/**
	 * 产品透视移除产品 私募
	 */
	function removeFunds(selectFund){
		var selectFunds = getFunds();
		for (var i=0; i<selectFunds.length; i++){
			var fund = selectFunds[i];
			if (fund.fundId ==  selectFund.fundId){
				selectFunds.splice(i,1);
			}
		}
		localStorage[constant.selectFunds] = JSON.stringify(selectFunds);
	}
    /**
     * 产品透视移除产品 公募
     */
    function removeFundspub(selectFund){
        var selectFunds = getFundspub();
        for (var i=0; i<selectFunds.length; i++){
            var fund = selectFunds[i];
            if (fund.fundId ==  selectFund.fundId){
                selectFunds.splice(i,1);
            }
        }
        localStorage[constant.selectFundspub] = JSON.stringify(selectFunds);
    }
	/**
	 * 产品透视移除所有产品 私募
	 */
	function removeAllfunds(selectFund){
        localStorage[constant.selectFunds] =[];
	}
    /**
     * 产品透视移除所有产品 公募
     */
    function removeAllfundspub(selectFund){
        localStorage[constant.selectFundspub] =[];
    }
	/**
	 * 投顾挖掘移除产品
	 */
	function excavatremoveFunds(selectFund){
		var selectFunds = excavatGetfunds();
		for (var i=0; i<selectFunds.length; i++){
			var fund = selectFunds[i];
			if (fund[0].fundId ==  selectFund.fundId){
				selectFunds.splice(i,1);
			}
		}
        localStorage.setItem("excavat",JSON.stringify(selectFunds));
	}
	/**
	 * 投顾挖掘移除产品
	 */
	function excavatremoveAllfunds(){
        localStorage.setItem("excavat",[]);
	}
	/**
	 * 组合配置移除所有产品
	 */
	function combinatremoveFunds(selectFund){
		var selectFunds = combinatGetfunds();
		for (var i=0; i<selectFunds.length; i++){
			var fund = selectFunds[i];
			if (fund[0].fundId ==  selectFund.fundId){
				selectFunds.splice(i,1);
			}
		}
        localStorage.setItem("combinat",JSON.stringify(selectFunds));
	}
	/**
	 * 组合配置移除所有产品
	 */
	function combinatremoveAllfunds(){
        localStorage.setItem("combinat",[]);
	}
	/**
	 * 产品透视获取产品清单 私募
	 */
	function getFunds(){
		var selectFunds = localStorage[constant.selectFunds];
		if (selectFunds==undefined || selectFunds==''){
			selectFunds = [];
		} else{
			selectFunds = JSON.parse(selectFunds);
		}
		return selectFunds;
	}
    /**
     * 产品透视获取产品清单 公募
     */
    function getFundspub(){
        var selectFunds = localStorage[constant.selectFundspub];
        if (selectFunds==undefined || selectFunds==''){
            selectFunds = [];
        } else{
            selectFunds = JSON.parse(selectFunds);
        }
        return selectFunds;
    }
	/**
	 * 投顾挖掘获取产品清单
	 */
	function excavatGetfunds(){
		var excavatselectFunds = localStorage.getItem("excavat");
		if (excavatselectFunds==undefined || excavatselectFunds==''){
			excavatselectFunds = [];
		} else{
			excavatselectFunds = JSON.parse(excavatselectFunds);
		}
		return excavatselectFunds;
	}
	/**
	 * 组合配置获取产品清单
	 */
	function combinatGetfunds(){
		var combinatselectFunds = localStorage.getItem("combinat");
		if (combinatselectFunds==undefined || combinatselectFunds==''){
			combinatselectFunds = [];
		} else{
			combinatselectFunds = JSON.parse(combinatselectFunds);
		}
		return combinatselectFunds;
	}
	/**
	 * 产品透视获取产品id清单 私募
	 */
	function getFundIds(){
		var selectFunds = getFunds();
		var ids = '';
		for (var i=0; i<selectFunds.length; i++){
			var fund = selectFunds[i];
			if (i == 0){
				ids += fund.fundId;
			} else{
				ids += ',' + fund.fundId;
			}
		}
		return ids;
	}
    /**
     * 产品透视获取产品id清单 公募
     */
    function getFundIdspub(){
        var selectFunds = getFundspub();
        var ids = '';
        for (var i=0; i<selectFunds.length; i++){
            var fund = selectFunds[i];
            if (i == 0){
                ids += fund.fundId;
            } else{
                ids += ',' + fund.fundId;
            }
        }
        return ids;
    }
	/**
	 * 投顾挖掘获取产品id清单
	 */
	function excavatGetfundIds(){
		var selectFunds = excavatGetfunds();
		return selectFunds;
	}
	/**
	 * 组合配置获取产品id清单
	 */
	function combinatGetfundIds(){
		var selectFunds = combinatGetfunds();
		return selectFunds;
	}
	/**
	 * 产品透视检查基金产品是否已经添加
	 */
	function checkExistFund(selectFunds,selectFund){
		var isExist = false;
		for (var i=0; i<selectFunds.length; i++){
			var fund = selectFunds[i];
			if (fund.fundId == selectFund){
				isExist = true;
			}
		}
		return isExist;
	}
	function isExist(fund){
		var selectFunds = getFunds();
		return checkExistFund(selectFunds,fund);
	}
    /**
     * 产品透视检查基金产品是否已经添加
     */
    function checkExistFundpub(selectFunds,selectFund){
        var isExist = false;
        for (var i=0; i<selectFunds.length; i++){
            var fund = selectFunds[i];
            if (fund.fundId == selectFund){
                isExist = true;
            }
        }
        return isExist;
    }
    function isExistpub(fund){
        var checkExistFundpub = getFundspub();
        return checkExistFundpub(selectFunds,fund);
    }
	/**
	 * 投顾挖掘检查基金产品是否已经添加
	 */
	function excavatcheckExistFund(selectFunds,selectFund){
		var isExist = false;
		for (var i=0; i<selectFunds.length; i++){
			var fund = selectFunds[i][0];
			if (fund.fundId == selectFund){
				isExist = true;
			}
		}
		return isExist;
	}
	function excavatisExist(fund){
		var selectFunds = excavatGetfunds();
		return excavatcheckExistFund(selectFunds,fund);
	}
	/**
	 * 组合配置检查基金产品是否已经添加
	 */
	function combinatcheckExistFund(selectFunds,selectFund){
		var isExist = false;
		for (var i=0; i<selectFunds.length; i++){
			var fund = selectFunds[i][0];
			if (fund.fundId == selectFund){
				isExist = true;
			}
		}
		return isExist;
	}
	function combinatisExist(fund){
		var selectFunds = combinatGetfunds();
		return combinatcheckExistFund(selectFunds,fund);
	}
	// 输出区域  私募
	exports.add = add2SelectFunds;
	exports.remove = removeFunds;
	exports.removeAllfunds = removeAllfunds;
	exports.isExist = isExist
	exports.getFunds = getFunds;
	exports.getFundIds = getFundIds;
    /*
    * 公募
    * */
    exports.addpub = add2SelectFundspub;
    exports.removepub = removeFundspub;
    exports.removeAllfundspub = removeAllfundspub;
    exports.isExistpub = isExistpub;
    exports.getFundspub = getFundspub;
    exports.getFundIdspub = getFundIdspub;
    /*
    * 投顾
    * */
	exports.excavatadd = excavatadd2SelectFunds;
	exports.excavatremoveFunds = excavatremoveFunds;
	exports.excavatremoveAllfunds = excavatremoveAllfunds;
	exports.excavatisExist = excavatisExist
	exports.excavatGetfunds = excavatGetfunds;
	exports.excavatGetfundIds = excavatGetfundIds;
    /*
    * 组合配置
    * */
	exports.combinatadd = combinatadd2SelectFunds;
	exports.combinatremoveFunds = combinatremoveFunds;
	exports.combinatremoveAllfunds = combinatremoveAllfunds;
	exports.combinatisExist = combinatisExist
	exports.combinatGetfunds = combinatGetfunds;
	exports.combinatGetfundIds = combinatGetfundIds;
});