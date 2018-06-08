/**
 * 投顾评级.js
 */
define(function(require, exports, module) {
	//js
	require('header');
	var $ = require('jquery');
	var util = require('util');
	//变量
	var corePool = require('huihong/InvestmentRatings/corePool/corePool');
	var primaryPool = require('huihong/InvestmentRatings/primaryPool/primaryPool');
	var observationPool = require('huihong/InvestmentRatings/observationPool/observationPool');
	var templateManagement = require('huihong/InvestmentRatings/templateManagement/templateManagement');
	var ratingMaintenance = require('huihong/InvestmentRatings/ratingMaintenance/ratingMaintenance');
	var loc=location.href;
	var pageNo=2;
	if(loc.indexOf("?")>0&&loc.indexOf("=")>0){
		var locParam=loc.split("?")[1].split("=");
		if(locParam[0]=="index"){
			pageNo=Number(locParam[1]);
		}		
	}
	$(function(){
		init();
	})
	
	// 初始化区域
	function init(){
		initConfig();
		initEvent();
		saveTemplate();
	}
	
	function initConfig(){
		/*observationPoolPage();*/
		showPage(pageNo); 
	}
	
	function initEvent(){
		$('#modules li').on('click',function(){
			$('#modules li').removeClass("modulesActive");
			$(this).addClass("modulesActive");
			showPage($('#modules li').index($(this)));
		})
	}
	
	// 业务逻辑区域
	function showPage(index){
		switch(index){
		case 0:
			// 核心池
			corePoolPage();
			break;
		case 1:
			// 初选池
			primaryPoolPage();
			break;
		case 2:
			// 观察池
			observationPoolPage();
			break;
		case 3:
			// 尽调模板管理
			templateManagementPage();
			break;
		case 4:
			//评级标准维护
			ratingMaintenancePage();
			break;
		default:
			corePoolPage();
			break;
		}
	}
	/**
	 * 核心池
	 */
	function corePoolPage(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/InvestmentRatings/corePool",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				corePool.init();
			}
		});	}
	/**
	 * 初选池
	 */
	function primaryPoolPage(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/InvestmentRatings/primaryPool",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				primaryPool.init();
			}
		});	}
	/**
	 * 观察池
	 */
	function observationPoolPage(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/InvestmentRatings/observationPool",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				observationPool.init();
			}
		});	}
	/**
	 * 尽调模板管理
	 */
	function templateManagementPage(){
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/InvestmentRatings/templateManagement",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				templateManagement.init();
			}
		});	}
	/**
	 * 评级标准维护
	 */
	function ratingMaintenancePage(){
		$('#modules li').removeClass("modulesActive");
		$("#inves").addClass("modulesActive");
		$("#main-content").html("");
		$.ajax({
			url:ctx+"/InvestmentRatings/ratingMaintenance",
			type:"get",
			data:{},
			success:function(data){
				$("#main-content").append(data);
				// 绑定事件
				ratingMaintenance.init();
			}
		});	}
	//评价模板
	function saveTemplate(){
		sessionStorage.setItem("evaluationTemplate",JSON.stringify(
		{
			basic_info:{
			share_holder:{
				a:"主要股东为实力雄厚的国内外大型企业",
				b:"主要股东为核心基金经理",
				c:"主要股东为基金经理以外的自然人"
					},
			reg_capital:{
				a:"高于2亿",
				b:"1亿到1亿9999万",
				c:"5000万到9999万",
				d:"3000到4999万",
				e:"1000万到2999万",
				f:"小于1000万"
				
			},
			years:{
				a:"成立8年以上",
				b:"5年~8年",
				c:"3年~4.9年",
				d:"1年~2.9年",
				f:"1年以"
			},
			scale_mtd:{
				a:"管理规模位于理想区间",
				b:"与理想区间偏离低于1亿",
				c:"与理想区间偏离位于1亿至3亿",
				d:"与理想区间偏离位于3亿至5亿",
				e:"与理想区间偏离位于5亿至10亿",
				f:"与理想区间偏离高于10亿得"
			},
			manage_scale:{
				1:{
					a:"自营资金管理规模占总管理规模比重高于备选池同类策略私募基金前25%",
					b:"位于前25%~前50%之间",
					c:"位于前50%~前75%之间",
					d:"低于前75%"
						},
				2:{
					a:"自营资金收入占总资产管理收入比重高于备选池同类策略私募基金前25%",
					b:"位于前25%~前50%之间",
					c:"位于前50%~前75%之间",
					d:"低于前75%"
				}
			},
			increase_ratio:{
				1:{
					a:"净利润同比增长率高于备选池同类策略私募基金前25%",
					b:"位于前25%~前50%之间",
					c:"位于前50%~前75%之间",
					d:"低于前75%"
						},
				2:{
					a:"主营业务收入同比增长率高于备选池同类策略私募基金前25%",
					b:"位于前25%~前50%之间",
					c:"位于前50%~前75%之间",
					d:"低于前75%"
				}
			},
			investor_ratio:{
				a:"机构类投资者占比高于备选池同类策略私募基金前20%",
				b:"位于前20%~前40%之间",
				c:"位于前40%~前60%之间",
				d:"位于前60%~前80%之间",
				e:"低于前80%"
			},
			prize:{
				a:"3年获奖",
				b:"2年获奖",
				c:"1年获奖"
			}
		},
		team_info:{
			staff_num:{
				a:"公司人数（人）/资产管理规模（亿）位于合理区间",
				b:"与理想区间偏离低于备选池前75%",
				c:"与理想区间偏离位于备选池前50%~前75%",
				d:"与理想区间偏离位于备选池前25%~前50%之间",
				e:"与合理区间偏离高于备选池前25%",
			},
			team_structure:{
				a:"投研团队人数占公司总人数比重高于备选池私募基金前25%",
				b:"位于前25%~前50%之间",
				c:"位于前50%~前75%之间",
				d:"低于前75%",
			},
			researcher_working_year:{
				a:"核心投研人员平均从业10年以上",
				b:"5~10年",
				c:"3~5年",
				d:"1~3年",
				e:"1年以内"
			},
			researcher_managed_asset:{
				a:"股票类基金管理规模50亿及以上",
				b:"20~50亿",
				c:"10~20亿",
				d:"5~10亿",
				e:"小于5亿"
			},
			researcher_invest_year:{
				a:"实盘投资（不包含研究）经验5年及以上",
				b:"4年",
				c:"3年",
				d:"小于3年",
				e:"小于3年"

			},
			staff_changed:{
				a:"低于前75%",
				b:"位于前50%~前75%之间",
				c:"位于前25%~前50%之间",
				d:"近一年内核心人员变动人数占总人数比重高于备选池私募基金前25%",
			}
		},
		fund_info:{
			income:{
				a:"成立以来收益率高于备选池同类策略私募基金产品前20%",
				b:"位于前20%~前40%",
				c:"位于前40%~前60%",
				d:"位于前60%~前80%",
				e:"低于前80%"
			},
			mdd:{
				a:"低于前80%",
				b:"位于前60%~前80%",
				c:"位于前40%~前60%",
				d:"位于前20%~前40%",
				e:"成立以来最大回撤高于备选池同类策略私募基金产品前20%"
			},
			income_over_mdd:{
				a:"低于前80%",
				b:"位于前60%~前80%",
				c:"位于前40%~前60%",
				d:"位于前20%~前40%",
				e:"成立以来收益率高于备选池同类策略私募基金产品前20%"
			},
			extre:{
				1:{
					a:"是",
					b:"否",
						},
				extreme_raise:{
					a:"成立以来收益率高于备选池同类策略私募基金产品前20%",
					b:"位于前20%~前40%",
					c:"位于前40%~前60%",
					d:"位于前60%~前80%",
					e:"低于前80%"
				},
				extreme_down:{
					a:"成立以来最大回撤高于备选池同类策略私募基金产品前20%",
					b:"位于前20%~前40%",
					c:"位于前40%~前60%",
					d:"位于前50%~前75%",
					e:"低于前75%"
				},
			},
		},
		rc_info:{
			rc_system:{
				a:"是",
				b:"否",
			},
			rc_member:{
				a:"核心风控人员从业10年以上",
				b:"5~10年",
				c:"3~5年",
				d:"1~3年以内",
				e:"1年以内"
			},
			rc_doc:{
				a:"是",
				b:"否"
			}
		}
	}));
}
})
