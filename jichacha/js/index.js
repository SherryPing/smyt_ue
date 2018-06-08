Vue.use(VueResource)
Vue.http.options.headers = {};
Vue.http.options.headers.Authorization = 'Token ' + (localStorage['token']);
var app = new Vue({
	el: "#main",
	data: {
		isPrivate: false,
		publicState: true, //判断是否有数据
		privateState: true, //判断是否有数据
		publicProList: [],
		isPer: false,
		privateProList: [],
		itemIndex: 0,
		publicPage: 1,
		privatePage: 1,
		tabviewbtn: [{
				name: "主页",
				src: "images/home.png"
			},
			{
				name: "自选",
				src: "images/auto1.png"
			},
			{
				name: "我的",
				src: "images/my1.png"
			}
		],
		searchContent: "",
		hotFund: [],
		nickName:""
	},
	methods: {
		//热门基金
		initHotfund: function() {
			window.localStorage.setItem("isPublic2","1");//公募公司进入的tab公募
			this.$refs.layer.style.display = "block";
			token = localStorage.getItem("token");
			userId = localStorage.getItem("userId");
			var isPer = localStorage.getItem("auth");
			if(isPer == 0) {
				this.isPer = false;
			} else {
				this.isPer = true;
			}
			var that = this;
			that.nickName=userId;
			Vue.http.get(urlpath + '/user_static/fund_trend/').then(
				function(resp) {
					if(resp.status == 200) {
						that.hotFund = resp.body.records;
						that.$refs.layer.style.display = "none";
					}
				},
				function(resp) {
					noLogin(1, resp);
				});
			//			$.ajax({
			//				url: urlpath + '/user_static/fund_trend/',
			//				beforeSend: function(request) {
			//					request.setRequestHeader("Authorization", "Token "+token);
			//				},
			//				contentType:"application/json;charset=utf-8",
			//				type: 'GET',
			//				success: function(list) {},
			//				error: function() {}
			//			});
		},
		fundDetail: function(type, id) {
			var fundType
			var auth = localStorage.getItem("auth")
			if(type == 1) {
				fundType = "public";
				window.location.href = "pages/productdetail.html?type=" + fundType + "&fundId=" + id;
			} else if(type == 2) {
				if(auth == 0) {
					layer.msg("您还未认证，请先去认证");
					setTimeout(function() {
						window.location.href = "pages/investorsCertification.html";
					}, 1000)
				} else {
					fundType = "private";
					window.location.href = "pages/productdetail.html?type=" + fundType + "&fundId=" + id;
				}
			}
		},
		//自选页切换公私募
		togglepp: function(type) {
			var state = this.isPrivate;
			this.isPrivate = !state;
			this.publicPage = 1;
			this.privatePage = 1;
			this.publicProList = [];
			this.privateProList = [];
			if(this.isPrivate) {
				this.getCollectionpri(1)
			} else {
				this.getCollectionpub(1)
			}
		},
		//自选  获取到收藏的公募数据
		getCollectionpub: function(time) {
			var that = this;
			Vue.http.post(urlpath + '/wechat/fund/mutual/', {
				pagination: {
					"per_page": 20,
					"page": this.publicPage
				},
				user_id: userId,
				is_collection: true,
				fund_type: null
			}).then(
				function(resp) {
					var data = resp.body.records;
					if(resp.body.success) {
						if(data.mutual.records.length == 0) {
							that.publicState = false
						} else {
							for(var i = 0; i < data.mutual.records.length; i++) {
								data.mutual.records[i].latest_nav_date = formaterDate(data.mutual.records[i].latest_nav_date);
								data.mutual.records[i].latest_nav = fmtFixed(data.mutual.records[i].latest_nav,4);
								data.mutual.records[i].d7_return_a = fmtRatio2(data.mutual.records[i].d7_return_a);
								data.mutual.records[i].y1_return = fmtRatio(data.mutual.records[i].y1_return);
								data.mutual.records[i].return_10k = fmtFixed(data.mutual.records[i].return_10k,4);	
								data.mutual.records[i].reg_code = nore(data.mutual.records[i].reg_code);		
							}
							if(time == 1) {
								that.publicState = true;
								that.publicProList = data.mutual.records
							} else {
								that.publicState = true,
									that.publicProList = that.publicProList.concat(data.mutual.records)
							}
						}
					}
				},
				function(resp) {
					noLogin(1, resp);
				});
		},
		//自选 获取到私募的数据
		getCollectionpri: function(time) {
			var that = this;
			Vue.http.post(urlpath + '/wechat/fund/hedge/', {
				pagination: {
					"per_page": 20,
					"page": this.privatePage
				},
				user_id: userId,
				is_collection: true,
				fund_type: null
			}).then(
				function(resp) {
					var data = resp.body.records;
					if(resp.body.success) {
						if(data.hedge.records.length == 0) {
							that.privateState = false
						} else {
							for(var i = 0; i < data.hedge.records.length; i++) {
								data.hedge.records[i].latest_nav_date = formaterDate(data.hedge.records[i].latest_nav_date);
								data.hedge.records[i].latest_nav = fmtFixed(data.hedge.records[i].latest_nav,4);
								data.hedge.records[i].y1_return = fmtRatio(data.hedge.records[i].y1_return);
								data.hedge.records[i].reg_code = nore(data.hedge.records[i].reg_code);
							}
							if(time == 1) {
								that.privateState = true;
								that.privateProList = data.hedge.records
							} else {
								that.privateState = true,
									that.privateProList = that.privateProList.concat(data.hedge.records)
							}
						}
					}
				},
				function(resp) {
					noLogin(1, resp);
				});
		},
		removeCollection: function(id, index) {
			var that = this;
			Vue.http.post(urlpath + '/collection/fund/remove/', {
				fund_id: id,
				user_id: userId,
			}).then(
				function(resp) {
					if(resp.body.success) {
						if(that.isPrivate) {
							that.privateProList.splice(index, 1);
							that.privateProList = that.privateProList;
						} else {
							that.publicProList.splice(index, 1);
							that.publicProList = that.publicProList;
						}
						layer.msg("取消自选成功")
					}
				},
				function(resp) {
					noLogin(1, resp);
				});
		},
		//进到基金详情
		goDetail: function(type, id) {

			if(this.isPer) {
				var fundType = "";
				if(type == "private") {
					fundType = "privaye"
				} else {
					if(type == "0204") {
						fundType = 'publichb'
					} else {
						fundType = 'public'
					}
				}
				window.location.href = "pages/productdetail.html?type=" + fundType + "&fundId=" + id;
			} else {
				layer.msg("您还未认证，请您先去认证");
				setTimeout(function(){
					window.location.href = "pages/investorsCertification.html"
				},1000)
			}

		},
		//底部切换
		tabtoggle: function(index) {
			this.itemIndex = index;
			this.tabviewbtn[0].src = "images/home1.png";
			this.tabviewbtn[1].src = "images/auto1.png";
			this.tabviewbtn[2].src = "images/my1.png";
			if(index == 0) {
				this.$refs.main.style.display = "block";
				this.$refs.autoShape.style.display = "none";
				this.$refs.my.style.display = "none";
				this.tabviewbtn[0].src = "images/home.png";
			} else if(index == 1) {
				this.$refs.main.style.display = "none";
				this.$refs.autoShape.style.display = "block";
				this.$refs.my.style.display = "none";
				this.isPrivate = false;
				this.getCollectionpub(1)
				this.tabviewbtn[1].src = "images/auto.png";
			} else {
				this.$refs.main.style.display = "none";
				this.$refs.autoShape.style.display = "none";
				this.$refs.my.style.display = "block";
				this.tabviewbtn[2].src = "images/my.png";
			}
		},
		inputBlur: function() {
//			if(this.searchContent.length != 0) {
				window.location.href = "pages/result.html";
				sessionStorage.setItem("searchContent", this.searchContent);
//			}
		},
		exitAccount:function(){
			
			layer.confirm('确定退出当前账号？', {
//				title:false,
			  btn: ['取消', '确定'] //可以无限个按钮
			  ,btn2: function(index, layero){
			    window.localStorage.removeItem("token")
				window.localStorage.removeItem("userId")
				window.localStorage.removeItem("auth")
				window.localStorage.removeItem("userInfo");
	//			localStorage.clear();
				window.location.href = "login.html"
			  }
			 }
		);
			
		}
	},

})
app.initHotfund();