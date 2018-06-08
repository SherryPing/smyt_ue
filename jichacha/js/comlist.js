Vue.http.options.headers = {};
Vue.http.options.headers.Authorization = 'Token ' + (localStorage['token']);
var page12 = 1; //公募公司页数
var page22 = 1; //私募公司
var app = new Vue({
	el: "#comList",
	data: {
		isPublic: false,
		publicComList: [],
		privateComList: [],
		isPer:false,
		mh: 3,
		page: 1,
		publicOrgNum: 0,
		privateOrgNum: 0,
		publicComList: [],
	},
	created: function () {
		if(window.localStorage.getItem("isPublic2")){
			var isPublic2=window.localStorage.getItem("isPublic2");
			if(isPublic2==1){
				this.isPublic=true
			}else{
				this.isPublic=false
			}
			console.log(this.isPublic,"****")
			if(this.isPublic==true){
				this.mh = 3;
				this.comList();
			}else{
				this.mh = 4;
				if(page22 == 1) {
					this.comList(1);
				} else {
					this.comList();
				}
			}
		}else{
			this.comList(1);
		}
	},
	methods: {
		toggle: function(type) {
			if(type == "public") {
				this.mh = 3;
				this.isPublic = true;
				if(page12==1){
					this.page=1;
					this.comList(1);
				}				
			} else {
				this.mh = 4;
				this.isPublic = false;
				if(page22 == 1) {
					this.page=1;
					this.comList(1);
				}
			}
		},
		comList: function(time) {
			var that = this;
			console.log(that.isPublic)
			Vue.http.post(urlpath + '/wechat/org/search/', {
				userId: userId,
				m_or_h: that.mh,
				org_name: "",
				order_by: {
					column: "total_fund_num",
					ascending: false
				},
				pagination: {
					"per_page": 20,
					"page": that.page
				},
			}).then(
				function(resp) {
					if(time == 1) { //首次进入相应tab
						console.log(that.isPublic)
						var state = that.isPublic
						if(that.isPublic) {
							console.log("777")
							for(var i = 0; i < resp.body.records.mutual.records.length; i++) {
								var date=resp.body.records.mutual.records[i].foundation_date;
								var core_fund_name=resp.body.records.mutual.records[i].core_fund_name;
								resp.body.records.mutual.records[i].foundation_date = date?date:"--";
								resp.body.records.mutual.records[i].core_fund_name = core_fund_name?core_fund_name:"--";
							}
							that.publicOrgNum = resp.body.records.mutual.total;
							that.publicComList = resp.body.records.mutual.records;
						} else {
							console.log("888")
							for(var i = 0; i < resp.body.records.hedge.records.length; i++) {
								var date=resp.body.records.hedge.records[i].foundation_date;
								var core_fund_name=resp.body.records.hedge.records[i].core_fund_name;
								resp.body.records.hedge.records[i].foundation_date = date?date:"--";
								resp.body.records.hedge.records[i].core_fund_name = core_fund_name?core_fund_name:"--";
							}
							that.privateOrgNum = resp.body.records.hedge.total;
							that.privateComList = resp.body.records.hedge.records;
						}
					} else {
						if(that.isPublic) {
							for(var i = 0; i < resp.body.records.mutual.records.length; i++) {
								var date=resp.body.records.mutual.records[i].foundation_date;
								var core_fund_name=resp.body.records.mutual.records[i].core_fund_name;
								resp.body.records.mutual.records[i].foundation_date = date?date:"--";
								resp.body.records.mutual.records[i].core_fund_name = core_fund_name?core_fund_name:"--";
							}
							that.publicOrgNum = resp.body.records.mutual.total;
							that.publicComList = that.publicComList.concat(resp.body.records.mutual.records);
						} else {
							for(var i = 0; i < resp.body.records.hedge.records.length; i++) {
								var date=resp.body.records.hedge.records[i].foundation_date;
								var core_fund_name=resp.body.records.hedge.records[i].core_fund_name;
								resp.body.records.hedge.records[i].foundation_date = date?date:"--";
								resp.body.records.hedge.records[i].core_fund_name = core_fund_name?core_fund_name:"--";
							}
							that.privateOrgNum = resp.body.records.hedge.total;
							that.privateComList = that.privateComList.concat(resp.body.records.hedge.records);
						}
					}
					that.$refs.layer.style.display = "none";
				},
				function(resp) {
					noLogin(2,resp);
				});
		},
		dropLoad: function() {
			this.$refs.layer.style.display = "block";
			userId = localStorage.getItem("userId");
			var authState = localStorage.getItem("auth");
			if(authState==0){
				this.isPer=false;
			}else{
				this.isPer=true;
			}
			var that = this;
			window.onscroll = function() {
				var sTop = $(window).scrollTop();
				var performance = sTop - document.getElementById("anchorPoint").offsetTop;
				var bottom = -668;
				//公募
				if(performance > bottom) {
					if(that.isPublic){
						if(that.publicComList.length == that.publicOrgNum){
							layer.msg("已加载全部")
						}else{
							that.$refs.layer.style.display = "block";
							page12++;
							that.page = page12;
							that.comList();
						}	
//						publicStop=sTop
					}else{
						if(that.privateComList.length == that.privateOrgNum){
							layer.msg("已加载全部")
						}else{
							that.$refs.layer.style.display = "block";
							page22++
							that.page = page22;
							that.comList();
						}
						
					}
					
//					that.$refs.layer.style.display = "block";
//					if(that.isPublic) { //公募
//						page12++;
//						that.page = page12;
//						that.comList();
//					} else { //私募
//						page22++
//						that.page = page12;
//						that.comList();
//					}
//					setInterval(function() {
//						that.$refs.layer.style.display = "none";
//					}, 1500)
				}
			}
		},
		goDetail: function(type, id) {
			if(!this.isPer){
				layer.msg("您还未验证，请先去验证");
				setTimeout(function(){
					window.location.href = "investorsCertification.html"
				},1000)
			}else{
				window.location.href = "companydetail.html?type=" + type + "&orgId=" + id;
			}
		}
	}
})
app.dropLoad();
//app.comList(1);
