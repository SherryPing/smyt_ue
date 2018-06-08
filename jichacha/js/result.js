Vue.http.options.headers = {};
Vue.http.options.headers.Authorization = 'Token ' + (localStorage['token']);
var app = new Vue({
	el: "#result",
	data: {
		isPublic: true, //判断私募公募切换
		cato: true, //公募产品公司切换
		priCato: true, //私募产品公司切换
		qualify: false, //私募是否认证成功
		searchContent: "",
		page: 1, //产品
		page2: 1, //公司
		mh: null, //3代表公募公司,4私募公司,1公募基金,2私募基金
		mh2: null,
		more: true,
		searchAll: 0,
		publicFundNum: 0,
		publicOrgNum: 0,
		privateFundNum: 0,
		privateOrgNum: 0,
		publicProList: [],
		publicComList: [],
		privateProList: [],
		privateComList: [],
		off_on: false,
		fundListState: true,
		comListState: true,
	},
	methods: {
		init: function() {
			this.$refs.layer.style.display = "block";
			var url = location.search; //获取url中"?"符后的字串   
			this.searchContent = sessionStorage.getItem("searchContent")
			userId = localStorage.getItem("userId");
			var qualifyState = localStorage.getItem("auth");
			if(qualifyState == 0) {
				this.qualify = false;
			} else {
				this.qualify = true;
			}
//			console.log(this.qualify)
			this.fundList(2, 1);
			this.comList(2, 1);
			this.dropLoad();
		},
		clear: function() {
			sessionStorage.setItem("searchContent", "")
			this.searchContent = sessionStorage.getItem("searchContent")
		},
		search: function(number) {//搜索
			if(number==1){				
				if(this.fundListState&&this.comListState){
					sessionStorage.setItem("searchContent", this.searchContent);
					this.searchAll = 0;
					this.fundListState = false;
					this.comListState = false;
					app.fundList(2, 1);
					app.comList(2, 1);					
				}
			}else{
				sessionStorage.setItem("searchContent", this.searchContent);
					this.searchAll = 0;
					app.fundList(2, 1);
					app.comList(2, 1);
			}
			
			
			
		
		},
		//公私募切换
		ispublic: function() {
			this.isPublic = true;
		},
		isprivate: function() {
			this.isPublic = false;
		},
		//产品公司切换
		iscato: function(type, stype) {
			if(type == "public") {
				if(stype == "production") {
					this.cato = true;
					this.more = true;
					this.page = 1;
					this.publicProList = [];
					this.fundList(2);
				} else {
					this.cato = false;
					this.more = true;
					this.page2 = 1;
					this.publicComList = [];
					this.comList(2);
				}
			} else {
				if(stype == "production") {
					this.priCato = true;
					this.more = true;
					this.page = 1;
					this.privateProList = [];
					this.fundList(2);
				} else {
					this.priCato = false;
					this.more = true;
					this.page2 = 1;
					this.privateComList = [];
					this.comList(2);
				}
			}

		},
		//产品
		fundList: function(val, time) {
				var that = this;
				Vue.http.post(urlpath + '/wechat/fund/list/', {
					"user_id": userId,
					"m_or_h": that.mh,
					"fund_name": that.searchContent,
					"pagination": {
						"per_page": 20,
						"page": that.page
					},
					"order_by": {
						column: "total_fund_num",
						ascending: false
					}
				}).then(
					function(resp) {

						that.$refs.layer.style.display = "none";
						that.off_on = true;
						if(resp.body.success) {
							for(var i = 0; i < resp.body.records.mutual.records.length; i++) {
								resp.body.records.mutual.records[i].latest_nav_date = formDate(resp.body.records.mutual.records[i].latest_nav_date);
								resp.body.records.mutual.records[i].y1_return = fmtRatio2(resp.body.records.mutual.records[i].y1_return);
								resp.body.records.mutual.records[i].d7_return_a = fmtRatio2(resp.body.records.mutual.records[i].d7_return_a);
								resp.body.records.mutual.records[i].foundation_date = nore(resp.body.records.mutual.records[i].foundation_date);
								resp.body.records.mutual.records[i].latest_nav = fmtFixed(resp.body.records.mutual.records[i].latest_nav, 4);
								resp.body.records.mutual.records[i].return_10k = fmtFixed(resp.body.records.mutual.records[i].return_10k, 4);

							}

							for(var j = 0; j < resp.body.records.hedge.records.length; j++) {
								resp.body.records.hedge.records[j].latest_nav_date = formDate(resp.body.records.hedge.records[j].latest_nav_date);
								resp.body.records.hedge.records[j].y1_return = fmtRatio2(resp.body.records.hedge.records[j].y1_return);
								resp.body.records.hedge.records[j].latest_nav = fmtFixed(resp.body.records.hedge.records[j].latest_nav, 4);
							}

							if(time == 1) {
								//							that.searchAll = 0;	
								that.publicFundNum = resp.body.records.mutual.total;
								that.privateFundNum = resp.body.records.hedge.total;
								that.searchAll += resp.body.records.mutual.total + resp.body.records.hedge.total;

								if(val == 2) {
									//							if(that.isPublic) {
									that.publicProList = resp.body.records.mutual.records;
									//							} else {
									that.privateProList = resp.body.records.hedge.records;
									//							}
								}
							} else {
								if(that.isPublic) {
									that.publicProList = that.publicProList.concat(resp.body.records.mutual.records);
								} else {
									that.privateProList = that.privateProList.concat(resp.body.records.hedge.records);
								}
							}
						}
						that.$refs.layer.style.display = "none";
						that.fundListState = true;
					},
					function(resp) {
						that.fundListState = true;
						that.$refs.layer.style.display = "none";
						noLogin(2, resp);
					});

		},
		//公司
		comList: function(val, time) {
				var that = this;
				Vue.http.post(urlpath + '/wechat/org/search/', {
					user_id: userId,
					m_or_h: that.mh,
					org_name: that.searchContent,
					order_by: {
						column: "total_fund_num",
						ascending: false
					},
					pagination: {
						"per_page": 20,
						"page": that.page2
					},
				}).then(
					function(resp) {
						that.$refs.layer.style.display = "none";
						if(resp.body.success) {
							that.off_on = true;
							for(var i = 0; i < resp.body.records.mutual.records.length; i++) {
								resp.body.records.mutual.records[i].core_fund_name = nore(resp.body.records.mutual.records[i].core_fund_name);
								resp.body.records.mutual.records[i].foundation_date = nore(resp.body.records.mutual.records[i].foundation_date);
							}

							for(var j = 0; j < resp.body.records.hedge.records.length; j++) {
								resp.body.records.hedge.records[j].core_fund_name = nore(resp.body.records.hedge.records[j].core_fund_name);
								resp.body.records.hedge.records[j].foundation_date = nore(resp.body.records.hedge.records[j].foundation_date);
							}
							if(val == 2) { //首次加载,将私募公募都加载出来,用于统计全部数量
								if(time == 1) {
									that.searchAll += resp.body.records.hedge.total + resp.body.records.mutual.total
									that.publicComList = resp.body.records.mutual.records;
									that.privateComList = resp.body.records.hedge.records;
									that.publicOrgNum = resp.body.records.mutual.total;
									that.privateOrgNum = resp.body.records.hedge.total;
								} else {
									//								if(that.isPublic) {
									that.publicComList = resp.body.records.mutual.records;
									//								} else {
									that.privateComList = resp.body.records.hedge.records;
									//								}
								}
							} else {
								that.publicComList = that.publicComList.concat(resp.body.records.mutual.records);
								that.privateComList = that.privateComList.concat(resp.body.records.hedge.records);
							}
						}
						that.comListState = true;
					},
					function(resp) {
						that.comListState = true;
						that.$refs.layer.style.display = "none";
						noLogin(2, resp);
					});

		},
		goFund: function(type, id) {

			var fundType = "";
			if(type == "private") {
				fundType = "private";
			} else {
				if(type == "0204") {
					fundType = "publichb";
				} else {
					fundType = "public";
				}
			}
			if(this.qualify || this.isPublic) {
				window.location.href = "productdetail.html?type=" + fundType + "&fundId=" + id;
			} else {
				layer.msg("您还未认证，请您先认证");
				setTimeout(function() {
					window.location.href = "investorsCertification.html"
				}, 1000)
			}
		},
		goCompany: function(type, id) {
			if(this.qualify) {
				window.location.href = "companydetail.html?type=" + type + "&orgId=" + id;
			} else {
				layer.msg("您还未认证，请您先认证");
				setTimeout(function() {
					window.location.href = "investorsCertification.html"
				}, 1000)
			}

		},
		addCollection: function(event, index, id) {
			event.cancelBubble = true;
			var that = this;
			Vue.http.post(urlpath + '/collection/fund/add/', {
				"user_id": userId,
				"fund_id": id,
			}).then(
				function(resp) {
					if(resp.body.success) {
						if(that.isPublic) { //公募
							that.publicProList[index].is_collection = true;
						} else { //私募
							that.privateProList[index].is_collection = true;
						}
						layer.msg("加入自选成功")
					}
				},
				function(resp) {
					noLogin(2, resp);
				});
		},
		removeCollection: function(event, index, id) {
			event.cancelBubble = true;
			var that = this;
			Vue.http.post(urlpath + '/collection/fund/remove/', {
				"user_id": userId,
				"fund_id": id,
			}).then(
				function(resp) {
					if(resp.body.success) {
						if(that.isPublic) { //公募
							that.publicProList[index].is_collection = false;
						} else { //私募
							that.privateProList[index].is_collection = false;
						}
						layer.msg("取消自选成功")
					}
				},
				function(resp) {
					noLogin(2, resp);
				});
		},
		dropLoad: function() {
			var that = this;
			window.onscroll = function() {
				var sTop = $(window).scrollTop();
				var Performance = sTop - document.getElementById("november").offsetTop;
				//公募
				//这里用 [ off_on ] 来控制是否加载 （这样就解决了 当上页的条件满足时，一下子加载多次的问题啦

				if(that.isPublic) {
					var bottom = -737
					if(that.cato) { //产品
						if(Performance > bottom) {
							if(that.off_on) {
								that.off_on = false;
								if(that.publicProList.length >= that.publicFundNum) { //判断是否已经全部加载出来
									layer.msg("已加载全部")
								} else {
									that.more = true;
									that.$refs.layer.style.display = "block";
									that.page++
										that.fundList();
								}
							}
						}
					} else { //公司
						if(Performance > bottom) {
							if(that.off_on) {
								that.off_on = false;
								if(that.publicComList.length >= that.publicOrgNum) { //判断是否已经全部加载出来
									layer.msg("已加载全部")
								} else {
									that.more = true;
									that.$refs.layer.style.display = "block";
									that.page2++
										that.comList();
								}
							}
						}
					}
				} else {

					var bottom = -737
					if(that.priCato) { //产品
						if(Performance > bottom) {
							if(that.off_on) {
								that.off_on = false;
								if(that.privateProList.length >= that.privateFundNum) { //判断是否已经全部加载出来
									layer.msg("已加载全部")
								} else {
									that.$refs.layer.style.display = "block";
									that.page++
										that.fundList()
								}
							}
						}
					} else { //公司
						if(Performance > bottom) {
							if(that.off_on) {
								that.off_on = false;
								if(that.privateComList.length >= that.privateOrgNum) { //判断是否已经全部加载出来
									layer.msg("已加载全部")
								} else {
									that.more = true;
									that.$refs.layer.style.display = "block";
									that.page2++
										that.comList();
								}
							}
						}
					}
				}

			}
		}
	}
})
app.init()