Vue.http.options.headers={};
Vue.http.options.headers.Authorization = 'Token ' + (localStorage['token']);
var app = new Vue({
	el: "#prcDetail",
	data: {
		fundtype: 'public',
		freqCnt: "今年以来",
		freqLength: "year",
		collection: false,
		isCurrency: false,
		freq: [{
				name: "今年以来",
				id: "year"
			},
			{
				name: "近三个月",
				id: "m3"
			},
			{
				name: "近六个月",
				id: "m6"
			},
			{
				name: "近一年",
				id: "y1"
			},
			{
				name: "成立以来",
				id: "total"
			},
		],
		// 基金信息数据
		fundId: "",
		isprivate: false,
		fundName: "",
		fundType: "",
		fundTypeName: "",
		latestNav: "",
		latestNavDate: "",
		regCode: "",
		y1Return: "",
		return_10k:"",
		d7_return_a:"",
		
		//云通分析
		cloudState: true,
		fundState1: "",
		fundState2: "",
		fundState3: "",
		d7Return2:"",
		d7rank:"",
		//业绩走势
		lineState: true,
		//净值
		chart: true,
		netData: [],
		netState:true,
		//同类排名
		rankState: true,
		incomeReturn: "",
		incomeMaxdrawdown: "",
		incomeSharpe: "",
		rankReturn: "",
		rankMaxdrawdown: "",
		rankSharpe: "",
		rankTotal: "",
		returnLocation: "",
		mddLocation: "",
		sharpeLocation: "",
		d7Return:"",
		return10k:"",
		//风险指标柱状图数据
    	riskState:true,
		//基本信息
		basicInfo: {},
		managerName: "",
	},
	methods: {
		add:function(){
			var that = this;
			Vue.http.post(urlpath + '/collection/fund/add/', {
				"user_id": userId,
				"fund_id": that.fundId,
			}).then(
				function(resp) {
					that.collection = true;
					layer.msg("添加自选成功")
				},
				function(resp) {
					noLogin(2,resp);
				});
		},
		navToSimilar: function () {
			window.location.href = "similarfunds.html?fundid=" + this.fundId;
		},
		navToCom: function(org_id){
			if(org_id){
				window.location.href = "companydetail.html?type=" + this.fundtype+'&orgId='+org_id;
			}else{
				return;
			}
			
		},
		remove:function(){
			var that = this;
			Vue.http.post(urlpath + '/collection/fund/remove/', {
				"user_id": userId,
				"fund_id": that.fundId,
			}).then(
				function(resp) {
					that.collection = false;
					layer.msg("删除自选成功")
				},
				function(resp) {
					noLogin(2,resp);
				});
		},
		back:function(){
			window.history.go(-1)
		},
		init: function() {
			this.$refs.layer.style.display = "block";
			var url = location.search; //获取url中"?"符后的字串   
			this.fundtype = geturlParams(url).type;
			var type=this.fundtype;
			this.fundId = geturlParams(url).fundId;
			userId = localStorage.getItem("userId")
			if(type == "private") {
				this.isprivate = true;
				app.fundInfo();
				app.cloudAnalysis();
				app.performance();
				app.nav();
				app.rank();
				app.risk();
				app.basicInfo2();
			} else {
				this.isprivate = false;
				if(type == "publichb") {
					this.isCurrency = true;
					app.fundInfo();
//					app.cloudAnalysis();
//					app.performance();
//					app.nav();
//					app.rank();
//					app.basicInfo2();
				}else{
					app.fundInfo();
//					app.cloudAnalysis();
//					app.performance();
//					app.nav();
//					app.rank();
//					app.risk();
//					app.basicInfo2();
				}
				
			}
		},
		toggleTc: function() {
			this.chart = !this.chart;
		},
		toggleFreq: function(type,name) {
			this.freqCnt = name;
			this.freqLength = type;
			this.performance();
			this.nav();
			this.rank();
			if(!this.isCurrency){
				this.risk();
			}
			
		},
		//提示框
		confirm: function(val){
			var con="";
			if(val=="return"){
				con="年化收益率：把不同频率的收益率（日收益率、周收益率、月收益率）换算成年化收益率，使得基金评价时具有可比性，该指标越大越好。"
			}else if(val=="mdd"){
				con="最大回撤：回撤是指在某一段时期内基金净值从最高点开始回落到低点的最大幅度，用来衡量该基金的抗风险能力，该指标越小越好。"
			}else if(val=="sharp"){
				con="年化夏普：反映了承担每一单位总风险而获得的超额收益率，该指标越大越好。"
			}else if(val=="sevenday"){
				con="7日年化：反映了货币基金最近7日的平均收益水平，该指标越大越好。"
			}else if(val=="var"){
				con="VaR：即风险价值，表示基金在未来特定的一段时间内的最大可能损失，该指标越小越好。"
			}else if(val=="stdev"){
				con="年化波动率：反映基金收益率的波动幅度及稳定性，该指标越大，表明基金收益率序列波动越厉害，风险程度越大，故该指标越小越好。"
			}
			layer.msg(con, {
		        time: 20000, //20s后自动关闭
		        btn: '哦',
		        btnAlign: 'c' ,
		      });
		},
		fundInfo: function() {
			var that = this;
			Vue.http.get(urlpath + '/wechat/fund/detail?fund_id=' + that.fundId + "&user_id=" + userId).then(
				function(resp) {
					if(resp.body.success) {
						var data = resp.body.records;
						that.fundId = data.fund_id;
						that.fundName = data.fund_name;
						that.fundType = data.fund_type;
						that.fundTypeName = data.fund_type_name;
						that.y1Return = fmtRatio2(data.y1_return);
						that.d7_return_a = fmtRatio2(data.d7_return_a);
						that.return_10k = fmtFixed(data.return_10k,4);
						that.latestNav = data.latest_nav;
						that.latestNavDate = data.latest_nav_date.substring(5, 10);
						that.regCode = nore(data.reg_code);
						if(resp.body.in_collection) {
							that.collection = true;
						} else {
							that.collection = false;
						}
						if(that.fundtype != "private") {
							if(data.fund_type=="0204"){							
					            that.isCurrency=true,
					           	app.cloudAnalysis();
								app.performance();
								app.nav();
								app.rank();
								app.basicInfo2();
							}else{
								that.isCurrency=false,
								app.cloudAnalysis();
								app.performance();
								app.nav();
								app.rank();
								app.risk();
								app.basicInfo2();
							}
						}
					}
				},
				function(resp) {
					noLogin(2,resp);
				});
		},
		cloudAnalysis: function() {
			var that = this;
			Vue.http.get(urlpath + '/wechat/fund/comment?fund_id=' + that.fundId + "&user_id=" + userId ).then(
				function(resp) {
					if(resp.body.success) {
						if (that.isCurrency){
				              that.d7Return2= resp.body.records.d7_return_a;
				         }else{
							that.fundState1 = resp.body.records.return_a;
							that.fundState2 = resp.body.records.max_drawdown;
							that.fundState3 = resp.body.records.return_a;
						}
					}
				},
				function(resp) {
					noLogin(2,resp);
				});
		},
		performance: function() {
			var that = this;
			Vue.http.get(urlpath + '/wechat/fund/accumulate_return?fund_id=' + that.fundId + "&freq_length=" + that.freqLength ).then(
				function(resp) {
					if(resp.body.success) {
						var data = resp.body.income
						var series = [];
						for(var i = 0; i < data.index.length; i++) {
							if(i == 0) {
								series.push({
									name: "本基金",
									data: data.data[i]
								});
							} else {
								series.push({
									name: data.index[i],
									data: data.data[i]
								});
							}
						}
						$("#lineCharts").highcharts({
							chart: {
								type: "line",
							},
							title: {
								text: null
							},
							colors: ['#e56a30', '#4fa5f6', '#d3ab46'],
							xAxis: {
								categories: data.columns,
								crosshair: true,
								tickInterval: 9
							},
							yAxis: {
								labels: {
									enabled: true, //y轴可见
									formatter: function() { //根据传入进行y轴格式化区分
										return(this.value * 100).toFixed(1) + "%";
									},
								},
								title: null
							},
							plotOptions: {
								series: {
									marker: {
										radius: 1,
									},
								}
							},
							tooltip: {
								pointFormatter: function() {
									return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + fmtRatio(this.y) + '</b><br/>';
								},
								shared: true, //是否共享提示框
							},
							credits: {
								enabled: false //不显示highcharts链接
							},
							series: series
						});
						that.$refs.layer.style.display = "none";
					}else{
						that.$refs.layer.style.display = "none";
						that.lineState=false;
					}
				},
				function(resp) {
					noLogin(2,resp);
				});
		},
		//净值标
		nav: function() {
			var that = this;
			Vue.http.get(urlpath + '/wechat/fund/nav?fund_id=' + that.fundId + "&freq_length=" + that.freqLength).then(
				function(resp) {
					if(resp.body.success){
						var data = resp.body.nav
						for(var i = 0; i < data.length; i++) {
							data[i].added_nav = fmtFixed(data[i].added_nav, 4);
							data[i].nav = fmtFixed(data[i].nav, 4);
							data[i].d7_return_a = fmtRatio(data[i].d7_return_a, 2);
							data[i].return_10k = fmtFixed(data[i].return_10k, 4);
							data[i].swanav = fmtFixed(data[i].swanav, 4);
						}
						that.netData = data;
//						console.log(that.netData)
						that.netState = true;
					}else{
						that.netState = false;
					}
				},
				function(resp) {
					noLogin(2,resp);
				})
		},
		rank: function() {
			var that = this;
			Vue.http.get(urlpath + '/wechat/fund/rank?fund_id=' + that.fundId + "&freq_length=" + that.freqLength ).then(
				function(resp) {
					if(resp.body.success) {
						var data = resp.body.rank;
						if(!that.isCurrency) {
							if(data.rank.return_a||data.rank.max_drawdown||data.rank.sharpe_a){
								var retrunLocation = data.rank.return_a / data.total;
								var maddLocation = data.rank.max_drawdown / data.total;
								var rankSharpe = data.rank.sharpe_a / data.total;
								//因为后端没有传百分比。所以在前端自己计算了。然后那个滑动轴是手写的。所以步骤这么多212是总体宽度。不要乱删。
								that.rankState = true,
									that.incomeReturn = fmtRatio(data.indicator.return_a);
								that.incomeMaxdrawdown = fmtRatio(data.indicator.max_drawdown);
								that.incomeSharpe = fmtFixed(data.indicator.sharpe_a, 2);
								that.rankReturn = data.rank.return_a;
								that.rankMaxdrawdown = data.rank.max_drawdown;
								that.rankSharpe = data.rank.sharpe_a;
								that.rankTotal = data.total;
								that.$refs.returns.style.left = (0.8 * fmtFixed(retrunLocation * 100)) + "px";
								that.$refs.mdd.style.left = (0.8 * fmtFixed(maddLocation * 100)) + "px";
								that.$refs.sharpe.style.left = (0.8 * fmtFixed(rankSharpe * 100)) + "px";
								that.returnLocation = fmtRatio(retrunLocation, 1);
								that.mddLocation = fmtRatio(maddLocation, 1);
								that.sharpeLocation = fmtRatio(rankSharpe, 1);
							}else{
								that.rankState = false;
							}
						} else {
							if(data.rank.d7_return_a){
								var retrunLocationvalue = data.rank.d7_return_a / data.total;
					              that.rankState=true;
					              that.d7Return=fmtRatio(data.indicator.d7_return_a,2);
					              that.rankReturn=data.rank.d7_return_a;
					              that.returnLocation=fmtRatio(retrunLocationvalue);
					              that.returnRankpercent=(0.8 * fmtFixed(retrunLocationvalue * 100)) + "px";
					              that.rankTotal=data.total;
					              that.d7rank=fmtRatio(1 - retrunLocationvalue,1);
				             }else{
				             	that.rankState = false;
				             }

						}
					}else{
						that.rankState = false;
					}
				},
				function(resp) {
					noLogin(2,resp);
				});
		},
		risk: function() {
			var that = this;
			Vue.http.get(urlpath + '/wechat/fund/risk?fund_id=' + that.fundId + "&freq_length=" + that.freqLength).then(
				function(resp) {
					if(resp.body.success) {
						var data = resp.body.risk_indicator
						var series = [];
						for(var i = 0; i < data.index.length; i++) {
							if(i == 0) {
								series.push({
									name: "本基金",
									data: data.data[i]
								});
							} else {
								series.push({
									name: data.index[i],
									data: data.data[i]
								});
							}
						}
						$("#columnCharts").highcharts({
							chart: {
								type: "column",
							},
							title: {
								text: null
							},
							colors: ['#e56a30', '#4fa5f6', '#d3ab46'],
							xAxis: {
								categories: ["VaR", "年化波动率", "最大回撤"],
								crosshair: true
							},
							yAxis: {
								labels: {
									enabled: true, //y轴可见
									formatter: function() { //根据传入进行y轴格式化区分
										return(this.value * 100).toFixed(0) + "%";
									},
								},
								title: null
							},
							plotOptions: {
						        column : {
									pointWidth : 20,
								}
						    },
							legend: {
								itemDistance:10
							},
							tooltip: {
								pointFormatter: function() {
									return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + fmtRatio(this.y) + '</b><br/>';
								},
								shared: true, //是否共享提示框
							},
							credits: {
								enabled: false //不显示highcharts链接
							},
							series: series
						});
					}else{
						that.riskState = false;
					}
				},
				function(resp) {
					noLogin(2,resp);
				});
		},
		basicInfo2: function() {
			var that = this;
			Vue.http.get(urlpath + '/wechat/fund/info?fund_id=' + that.fundId ).then(
				function(resp) {
					if(resp.body.success) {
						that.basicInfo = resp.body.info;
						resp.body.info.data_freq = nore(resp.body.info.data_freq);
						resp.body.info.foundation_date = nore(resp.body.info.foundation_date);
						resp.body.info.fund_full_name = nore(resp.body.info.fund_full_name);
						resp.body.info.fund_name = nore(resp.body.info.fund_name);
						resp.body.info.fund_strategy = nore(resp.body.info.fund_strategy);
						resp.body.info.issue_method = nore(resp.body.info.issue_method);
//						console.log()
						if(resp.body.info.manager_name.length != 0) {
							var managername = "";
							for(var i = 0; i < resp.body.info.manager_name.length; i++) {
								managername += resp.body.info.manager_name[i];
							}
							that.managerName = managername;
						}else{
							that.managerName = "--";
						}
					}
				},
				function(resp) {
					noLogin(2,resp);
				});
		}
	}
})
app.init();