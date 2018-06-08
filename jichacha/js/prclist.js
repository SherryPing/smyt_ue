	Vue.http.options.headers = {};
	Vue.http.options.headers.Authorization = 'Token ' + (localStorage['token']);
	var sorturl="";
	var sortupurl="../images/sort_up.png";
	var sortdownurl="../images/sort_down.png";
	
	var app = new Vue({
		el: "#prclist",
		data: {
			private: false,
			hb: false,
			privatePage: 1,
			publicPage: 1,
			type: "0201",
			type2: "6010101",
			isPer: false,
			privateStragey: [{
					name: '股票多头',
					id: "6010101"
				},
				{
					name: '股票多空',
					id: "6010102"
				},
				{
					name: '市场中性',
					id: "6010103"
				},
				{
					name: '管理期货',
					id: "60102"
				},
				{
					name: '债券策略',
					id: "60105"
				},
				{
					name: '相对价值',
					id: "60103"
				},
				{
					name: '宏观策略',
					id: "60106"
				},
				{
					name: '事件驱动',
					id: "60104"
				},
				{
					name: '组合策略',
					id: "60107"
				},
				{
					name: '多策略',
					id: "60108"
				},
				{
					name: '其他策略',
					id: "60109"
				},
			],
			publicStragey: [{
					name: "股票型",
					id: "0201"
				},
				{
					name: "债券型",
					id: "0202"
				},
				{
					name: "混合型",
					id: "0203"
				},
				{
					name: "货币型",
					id: "0204"
				},
				{
					name: "QDII",
					id: "0205"
				},
				{
					name: "其他基金",
					id: "0299"
				},
			],
			privateData: [],
			publicData: [],
			hbList: [],
			subitemsExpanded: false,
			ascending:false,//倒序
		    column:'viewed', //净值日期排序
		    y1url: sorturl,
		    navurl: sorturl,
		    collectedurl: sorturl,
		    viewedurl: sorturl,
		    d7url: sorturl,
		    k10url: sorturl,
			top5: [],
			hedgeTop5: [],
			total:1,
			listNum:0,
			off_on:false,
		},
		methods: {
			goDetail: function(type, id) {
					var fundType = "private"
					if(type == "0204") {
						fundType = "publichb";
					} else if(type == "private") {
						fundType = "private";
					} else {
						fundType = "public";
					}
				if(this.isPer||fundType!="private") {
					window.location.href = "productdetail.html?type=" + fundType + "&fundId=" + id;
				}else{
					layer.msg("您还未认证，请您先去认证");
					setTimeout(function(){
						window.location.href = "investorsCertification.html";
					},1000)
				}

			},
			sort:function(column){
//				console.log($(".search_list").scrollTop())
//				$(".search_list").scrollTop(110)
				var that =this;
			    this.$refs.layer.style.display = "block";
			    if(this.private) { //私募
					this.privatePage = 1;					
				} else { //公募
					this.publicPage = 1;					
				}
			    if (column=="y1"){
			      if (this.column =="y1_return"){
			        var ascending = !this.ascending;
			      }else{
			        var ascending = false;
			      }     
	
			        this.column= "y1_return";
			        this.ascending= ascending;

			      if (this.ascending){
//			        this.setData({
			          this.y1url=sortupurl;
//			        })
			      }else{
//			        this.setData({
			          this.y1url=sortdownurl;
			          this.navurl=sorturl;
			          this.collectedurl=sorturl;
			          this.viewedurl= sorturl;
			          this.d7url=sorturl;
			          this.k10url= sorturl;
//			        })
			      }
			      if (!this.private){
			        this.publicList(this.type, 1);   
			      }else{
			        this.privateList(1);  
			      }     
			    } else if (column == "collected") {
			      if (this.column == "collected") {
			        var ascending = !this.ascending;
			      } else {
			        var ascending = false;
			      }
//			      this.setData({
			        this.column= "collected";
			        this.ascending= ascending;
//			      });
			      if (this.ascending) {
//			        this.setData({
			          this.collectedurl=sortupurl;
//			        })
			      } else {
//			        this.setData({
			          this.collectedurl= sortdownurl;
			          this.navurl= sorturl;
			          this.y1url= sorturl;
			          this.viewedurl= sorturl;
			          this.d7url= sorturl;
			          this.k10url= sorturl;
//			        })
			      }
			      if (!this.private) {
			        this.publicList(this.type, 1);   
			      } else {
			        this.privateList(1);
			      } 
			    } else if (column == "viewed") {
			      if (this.column == "viewed") {
			        var ascending = !this.ascending;
			      } else {
			        var ascending = false;
			      }
//			      this.setData({
			        this.column= "viewed";
			        this.ascending= ascending;
//			      })
			      if (this.ascending) {
//			        this.setData({
			          this.viewedurl= sortupurl;
//			        })
			      } else {
//			        this.setData({
			          this.viewedurl= sortdownurl;
			          this.navurl= sorturl;
			          this.y1url= sorturl;
			          this.collectedurl= sorturl;
			          this.d7url= sorturl;
			          this.k10url= sorturl;
//			        })
			      }
			      if (!this.private) {
			        this.publicList(this.type, 1);
			      } else {
			        this.privateList(1);
			      }
			    } else if (column == "nav") {
			      if (this.column == "latest_nav_date") {
			        var ascending = !this.ascending;
			      } else {
			        var ascending = false;
			      }
//			      this.setData({
			        this.column= "latest_nav_date";
			        this.ascending= ascending;
//			      })
			      if (this.ascending) {
//			        this.setData({
			          this.navurl= sortupurl;
//			        })
			      } else {
//			        this.setData({
			          this.navurl= sortdownurl;
			          this.viewedurl= sorturl;
			          this.y1url= sorturl;
			          this.collectedurl= sorturl;
			          this.d7url= sorturl;
			          this.k10url= sorturl;
//			        })
			      }
			      if (!this.private) {
			        this.publicList(this.type, 1);
			      } else {
			        this.privateList(1);
			      }
			    } else if (column == "d7_return_a") {
			      if (this.column == "d7_return_a") {
			        var ascending = !this.ascending;
			      } else {
			        var ascending = false;
			      }
//			      this.setData({
			        this.column= "d7_return_a";
			        this.ascending= ascending;
//			      })
			      if (this.ascending) {
//			        this.setData({
			          this.d7url= sortupurl;
//			        })
			      } else {
//			        this.setData({
			          this.d7url= sortdownurl;
			          this.viewedurl= sorturl;
			          this.y1url= sorturl;
			          this.collectedurl= sorturl;
			          this.navurl= sorturl;
			          this.k10url= sorturl;
//			        })
			      }
			      if (!this.private) {
			        this.publicList(this.type, 1);
			      } else {
			        this.privateList(1);
			      }
			    } else if (column == "return_10k") {
			      if (this.column == "return_10k") {
			        var ascending = !this.ascending;
			      } else {
			        var ascending = false;
			      }
//			      this.setData({
			        this.column= "return_10k";
			        this.ascending= ascending;
//			      })
			      if (this.ascending) {
//			        this.setData({
			          this.k10url= sortupurl;
//			        })
			      } else {
//			        this.setData({
			          this.k10url= sortdownurl;
			          this.viewedurl= sorturl;
			          this.y1url= sorturl;
			          this.collectedurl= sorturl;
			          this.navurl= sorturl;
			          this.d7url= sorturl;
//			        })
			      }
			      if (!this.private) {
			        this.publicList(this.type, 1);
			      } else {
			        this.privateList(1);
			      }
			    }
			  },
			pubToggle: function(type) {
				if(this.private) { //私募
					this.privatePage = 1;
					this.type2 = type;
					this.privateData = [];
					this.privateList(1);
				} else { //公募
					this.publicPage = 1;
					this.type = type;
					this.publicData = [];
					this.publicList(this.type, 1);
				}
			},
			privateList: function(time) {
				var that = this;
				Vue.http.post(urlpath + '/wechat/fund/hedge/', {
					user_id: userId,
					fund_type: that.type2,
					pagination: {
						"per_page": 20,
						"page": that.privatePage
					},
				}).then(
					function(resp) {
						setInterval(function() {
							that.$refs.layer.style.display = "none";
						}, 500)
						if(resp.status == 200) {
							that.off_on=true;
							that.$refs.layer.style.display = "none";
							that.hedgeTop5 = resp.body.user_viewed_top5.hedge;
							that.listNum = resp.body.records.hedge.total;
							if(time == 1) {
								for(var i = 0; i < resp.body.records.hedge.records.length; i++) {
									resp.body.records.hedge.records[i].y1_return = fmtRatio2(resp.body.records.hedge.records[i].y1_return);
									resp.body.records.hedge.records[i].latest_nav_date = (resp.body.records.hedge.records[i].latest_nav_date).substring(5, 10);
								}
								that.privateData = resp.body.records.hedge.records;
							} else {
								for(var i = 0; i < resp.body.records.hedge.records.length; i++) {
									resp.body.records.hedge.records[i].y1_return = fmtRatio2(resp.body.records.hedge.records[i].y1_return);
									resp.body.records.hedge.records[i].latest_nav_date = (resp.body.records.hedge.records[i].latest_nav_date).substring(5, 10);
								}
								that.privateData = that.privateData.concat(resp.body.records.hedge.records);
							}
						}
					},
					function(resp) {
						setInterval(function() {
							that.$refs.layer.style.display = "none";
						}, 500)
						noLogin(2, resp);
					});
			},
			publicList: function(val, time) {
				var that = this;
				Vue.http.post(urlpath + '/wechat/fund/mutual/', {
					user_id: userId,
					fund_type: that.type,
					pagination: {
						"per_page": 20,
						"page": that.publicPage
					},
					order_by: { "column": that.column, "ascending": that.ascending}
				}).then(
					function(resp) {

						if(resp.status == 200) {
							that.off_on=true;
							that.$refs.layer.style.display = "none";
							that.top5 = resp.body.user_viewed_top5.mutual;
							that.listNum = resp.body.records.mutual.total;
							if(time == 1) {
								if(val == "0204") {
									for(var i = 0; i < resp.body.records.mutual.records.length; i++) {
										resp.body.records.mutual.records[i].d7_return_a = fmtRatio(resp.body.records.mutual.records[i].d7_return_a);
										resp.body.records.mutual.records[i].return_10k = fmtFixed(resp.body.records.mutual.records[i].return_10k, 4);
										resp.body.records.mutual.records[i].latest_nav_date = formDate(resp.body.records.mutual.records[i].latest_nav_date);
									}
									that.hbList = resp.body.records.mutual.records;
								} else {
									for(var i = 0; i < resp.body.records.mutual.records.length; i++) {
										resp.body.records.mutual.records[i].y1_return = fmtRatio2(resp.body.records.mutual.records[i].y1_return);
										resp.body.records.mutual.records[i].latest_nav = fmtFixed(resp.body.records.mutual.records[i].latest_nav, 4);
										resp.body.records.mutual.records[i].latest_nav_date = formDate(resp.body.records.mutual.records[i].latest_nav_date);
									}
									that.publicData = resp.body.records.mutual.records;
									if(resp.body.records.mutual.total==0){ //判断其他基金返回数据不为0
										that.total=0;
									}
								}
							} else {
								if(val == "0204") {
									for(var i = 0; i < resp.body.records.mutual.records.length; i++) {
										resp.body.records.mutual.records[i].d7_return_a = fmtRatio(resp.body.records.mutual.records[i].d7_return_a);
										resp.body.records.mutual.records[i].return_10k = fmtFixed(resp.body.records.mutual.records[i].return_10k, 4);
										resp.body.records.mutual.records[i].latest_nav_date = formDate(resp.body.records.mutual.records[i].latest_nav_date);
									}
									that.hbList = that.hbList.concat(resp.body.records.mutual.records);
								} else {
									for(var i = 0; i < resp.body.records.mutual.records.length; i++) {
										resp.body.records.mutual.records[i].y1_return = fmtRatio2(resp.body.records.mutual.records[i].y1_return);
										resp.body.records.mutual.records[i].latest_nav = fmtFixed(resp.body.records.mutual.records[i].latest_nav, 4);
										resp.body.records.mutual.records[i].latest_nav_date = formDate(resp.body.records.mutual.records[i].latest_nav_date);
									}
									that.publicData = that.publicData.concat(resp.body.records.mutual.records);
								}

							}
						}
					},
					function(resp) {
						setTimeout(function() {
							that.$refs.layer.style.display = "none";
						}, 500)
						noLogin(2, resp);
					});
			},
			dropLoad: function() {
				this.$refs.layer.style.display = "block";
				var auto = localStorage.getItem("auth");
				if(auto == 0) {
					this.isPer = false;
				} else {
					this.isPer = true;
				}
				userId = localStorage.getItem("userId");
				var that = this;
				var url = location.search; //获取url中"?"符后的字串   
				var type = geturlParams(url).type;
				if(type == "public") {
					if(that.type == "0204") {
						app.publicList("0204", 1);
					} else {
						app.publicList("0201", 1);
					}

					that.private = false;
				} else {
					app.privateList(1);
					that.private = true;
					document.title="私募列表"; 
				}
				window.onscroll = function() {
					var sTop = $(window).scrollTop();
					var performance = sTop - document.getElementById("anchorPoint").offsetTop;
					var bottom = -668;
					if(performance > bottom) {	
						if(that.off_on){
							that.off_on=false;
							if(that.private){
								if(that.privateData.length == that.listNum){
									layer.msg("加载完成")
								}else{
									that.$refs.layer.style.display = "block";
									that.privatePage++
									that.privateList();
								}
							
							
						}else{
							if(that.type == "0204"){
								if(that.hbList.length == that.listNum){
									layer.msg("加载完成")
								}else{
									that.$refs.layer.style.display = "block";
									that.publicPage++
									that.publicList("0204", 2)
								}
							}else{
								if(that.publicData.length == that.listNum){
									layer.msg("加载完成")
								}else{
									that.$refs.layer.style.display = "block";
									that.publicPage++
									that.publicList("0201", 2)
								}
							}
							
						}
						}
						
//						if(that.private) { //私募
//							that.privatePage++
//								that.privateList();
//						} else { //公募
//							that.publicPage++
//								if(that.type == "0204") {
//									that.publicList("0204", 2)
//								} else {
//									that.publicList("0201", 2)
//								}
//
//						}
					}
				}
			}
		}
	})
	app.dropLoad();