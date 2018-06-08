Vue.http.options.headers={};
Vue.http.options.headers.Authorization = 'Token ' + (localStorage['token']);
var color1 = ['#ffc43f', '#f7635b', '#04afff', '#fd02b9', '#fdf002', '#6477a3', '#fc76fb', '#b5d3ff', '#1b62cb', '#a2bfce', '#f48579', '#ee3d97', '#4f7cdd', '#88a18b'];
	var app = new Vue({
		el: "#comDetail",
		data: {
			orgtype: "",
			isPrivate:false,
			orgId: "",
			org_name: "",
			foundation_date: "",
			total_fund_num: "",
			reg_capital: "",
			scale_mgt: "",
			core_fund_id: "",
			core_fund_name: "",
			core_manager: "",
			totalNum: "",
			fundNum: "",
			color1: color1,
			point: [],
			series: [],
			listCurrency:false,
			flagStragey: [],
			hbList: [],
			publicList: [],
			page: 1,
			dataNum: 0,
			distribute: true,
			scrollLeft: true,
			scrollRight: false,
			type:"",
			qxtype:"",
		},
		methods: {
			back:function(){
				window.history.go(-1)
			},
			goDetail: function(id) {
				var fundType = "private";
				if(this.isPrivate){
					fundType = "private";
				}else{
					if(this.type == "0204") {
						fundType = "publichb";
					}else {
						fundType = "public";
					}
				}
				
				window.location.href = "productdetail.html?type=" + fundType + "&fundId=" + id;
			},
			goToFundRecord:function(){
				window.location.href = "fundrecord.html?orgId=" + this.orgId;
			},
			initPage:function(){
				
				this.$refs.layer.style.display = "block";
				var url = location.search; //获取url中"?"符后的字串   
				var type = geturlParams(url).type;
				userId = localStorage.getItem("userId");
				this.orgId = geturlParams(url).orgId
				if(type=="public"||type=="publichb"){
					this.isPrivate = false;
					window.localStorage.setItem("isPublic2","1");
				}else{
					this.isPrivate = true;
					window.localStorage.setItem("isPublic2","2");
				}
			},
			toggleStrategy:function(type,data){
				if(type=="0204"){
					this.listCurrency = true;
				}else{
					this.listCurrency = false;
				}
				this.page=1;
				this.type = type;
				this.dataNum = data;
				this.prclicList(type,1);
			},
			orgInfo: function() {
				var that = this;
				Vue.http.get(urlpath + '/wechat/org/detail?org_id=' + that.orgId + "&user_id=" + that.userId).then(
					function(resp) {
						if(resp.body.success) {
							var data = resp.body.records;
							that.org_name = nore(data.org_name);
							that.foundation_date = nore(data.foundation_date);
							that.total_fund_num = nore(data.total_fund_num);
							that.reg_capital = fmtFixed(data.reg_capital, 2);
							if(that.isPrivate){
								that.scale_mgt = tomillion(data.scale_mgt);
							}else{
								that.scale_mgt = fmtFixed(data.scale_mgt, 2);
							}							
							that.core_fund_id = data.core_fund_id;
							that.core_fund_name = nore(data.core_fund_name);
							that.core_manager = nore(data.core_manager);
							
						}
					},
					function(resp) {
						noLogin(2,resp);
					});
			},
			proDiver: function() {
				var that = this;
				Vue.http.get(urlpath + '/wechat/org/fund/distribute?org_id=' + that.orgId + "&user_id=" + that.userId).then(
					function(resp) {
						if(resp.body.success) {
							var data = resp.body.fund_distribute
							if(data && data.length > 0) {
								that.flagStragey = data; //用于旗下
								that.type = data[0].fund_type;
								that.dataNum = data[0].data
								if(data[0].fund_type=="0204"){
									that.listCurrency = true;
								}else{
									that.listCurrency = false;
								}
								that.prclicList(that.type, 1)
							} else {
								that.$refs.layer.style.display = "none";
								that.distribute = false
							}

						}else{
							that.$refs.layer.style.display = "none";
							that.distribute=false
						}
					},
					function(resp) {
						noLogin(2,resp);
					});
			},
			//画图的
			proNum: function() {
				var that = this;
				Vue.http.get(urlpath + '/wechat/org/fund/num?org_id=' + that.orgId + "&user_id=" + that.userId ).then(
					function(resp) {
						if(resp.body.success) {
							var data = resp.body.fund_num
							if(data.total_fund_num > 0) {
								for(var i = 0; i < data.distribute.length; i++) {
									that.series.push([data.distribute[i].name, data.distribute[i].data])
									that.point.push({
										name: data.distribute[i].name,
										value: fmtRatio(data.distribute[i].data / data.total_fund_num),
										color: color1[i]
									});
								}
//								console.log(that.series,that.point)
								that.totalNum = data.total_fund_num;
								that.fundNum = data.fund_num;
								that.initRing();
								that.$refs.layer.style.display = "none";
							} else {
//								this.setData({
									that.$refs.layer.style.display = "none";
									that.distribute=false
//								})
							}
						}
					},
					function(resp) {
						noLogin(2,resp);
					});
			},
			initRing: function() {
				$('#chart').highcharts({
					chart: {
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false,
						spacing: [0, 0, 15, 0]
					},
					title: {
						floating: true,
						text: '存续产品数量：' + this.fundNum + '<br>累计产品数量：' + this.totalNum,
						style: {
							"fontSize": "12px"
						}
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
					},
					colors: color1,
					credits: {
						enabled: false //不显示highcharts链接
					},
					exporting: {
						enabled: false //设置导出按钮不可用
					},
					plotOptions: {
						pie: {
							allowPointSelect: false,
							cursor: 'pointer',
							dataLabels: {
								enabled: false,
								format: '<b>{point.name}</b>: {point.percentage:.2f} %',
								style: {
									color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
								}
							},
						}
					},

					series: [{
						type: 'pie',
						innerSize: '83%',
						name: '比例',
						data: this.series
					}]
				}, function(c) {
					// 环形图圆心
					var centerY = c.series[0].center[1],
						titleHeight = parseInt(c.title.styles.fontSize);
					c.setTitle({
						y: centerY - titleHeight / 2
					});
					chart = c;
				});
			},
			prclicList: function(val, time) {
				var that = this;
				Vue.http.get(urlpath + '/wechat/org/fund/list/', {
					params: {
						user_id: that.userId,
						org_id: that.orgId,
						fund_type: that.type,
						per_page: 20,
						page: that.page
					}
				}).then(
					function(resp) {
						if(resp.body.success) {
							that.$refs.layer.style.display = "none";
							if(time == 1) { //首次进入相应tab
								if(val == "0204") {
									for(var i = 0; i < resp.body.funds.length; i++) {											
										resp.body.funds[i].latest_nav_date = formDate(resp.body.funds[i].latest_nav_date);
										resp.body.funds[i].d7_return_a = fmtRatio(resp.body.funds[i].d7_return_a,2);
										resp.body.funds[i].return_10k = fmtFixed(resp.body.funds[i].return_10k,4);
										resp.body.funds[i].reg_code=nore(resp.body.funds[i].reg_code);
									}
									that.hbList = resp.body.funds
								} else {
									for(var i = 0; i < resp.body.funds.length; i++) {			
										resp.body.funds[i].latest_nav = fmtFixed(resp.body.funds[i].latest_nav,4);
										resp.body.funds[i].total_return_a = fmtRatio2(resp.body.funds[i].total_return_a);
										resp.body.funds[i].latest_nav_date = formDate(resp.body.funds[i].latest_nav_date);
										resp.body.funds[i].reg_code=nore(resp.body.funds[i].reg_code);
									}
									that.publicList = resp.body.funds
								}
							} else {
								if(val == "0204") {
									for(var i = 0; i < resp.body.funds.length; i++) {										
										resp.body.funds[i].latest_nav_date = formDate(resp.body.funds[i].latest_nav_date);
										resp.body.funds[i].d7_return_a = fmtRatio(resp.body.funds[i].d7_return_a,2);
										resp.body.funds[i].return_10k = fmtFixed(resp.body.funds[i].return_10k,4);
										resp.body.funds[i].reg_code=nore(resp.body.funds[i].reg_code);
									}
									that.hbList = that.hbList.concat(resp.body.funds)
								} else {
									for(var i = 0; i < resp.body.funds.length; i++) {
										resp.body.funds[i].latest_nav = fmtFixed(resp.body.funds[i].latest_nav,4);
										resp.body.funds[i].total_return_a = fmtRatio2(resp.body.funds[i].total_return_a);
										resp.body.funds[i].latest_nav_date = formDate(resp.body.funds[i].latest_nav_date);	
										resp.body.funds[i].reg_code=nore(resp.body.funds[i].reg_code);
									}
									that.publicList = that.publicList.concat(resp.body.funds);
								}
							}
							
						}
					},
					function(resp) {
						noLogin(2,resp);
					});
			},
			dropLoad: function() {
				var that = this;
				var sTop = $(".con").scrollTop();
				var performance = sTop - document.getElementById("anchorPoint").offsetTop;
				var bottom = -580;
				if (this.dataNum>20){				    					
					if(performance>bottom){						
						if (that.type == "0204") {
							if (that.hbList.length == that.dataNum) {
					          layer.msg("加载完成")
			        		} else {
			        			layer.msg("加载中")
								that.page++
								app.prclicList(that.type)
							}
						}else{
							if (that.publicList.length == that.dataNum) {
					          layer.msg("加载完成")
			        		} else {
			        			layer.msg("加载中")
								that.page++
								app.prclicList(that.type)
							}
						}
						
					}
				}else{
					if(performance>bottom){
						layer.msg("加载完成")
					}
				}
			}
		}
	})
	app.initPage()
	app.proNum();
	app.orgInfo();
	app.proDiver();