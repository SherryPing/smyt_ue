Vue.http.options.headers={};
Vue.http.options.headers.Authorization = 'Token ' + (localStorage['token']);

var app = new Vue({
		el: "#similarfunds",
		data: {
			fundId:"",
		    listData:[],
		    state:true,
		    star:[0,0,5],
		},
		methods:{
			back:function(){
				window.history.go(-1)
			},
			init: function(){
				var url = location.search; //获取url中"?"符后的字串
				this.fundId = geturlParams(url).fundid;
				app.initList();
			},
			initList:function(){
				var that = this;
				Vue.http.get(urlpath + '/wechat/fund/type_correlation?fund_id=' + that.fundId).then(
				function(resp) {
					console.log(resp)
					that.$refs.layer.style.display = "none";
					if(resp.body.success) {
						for(var i = 0; i < resp.body.correlation.length; i++) {
							resp.body.correlation[i].latest_nav = fmtFixed(resp.body.correlation[i].latest_nav,4);
							resp.body.correlation[i].latest_nav_date = (resp.body.correlation[i].latest_nav_date).substring(5, 10);
							resp.body.correlation[i].starnum=app.starF(resp.body.correlation[i].cc)[2];
							resp.body.correlation[i].starhalfnum=app.starF(resp.body.correlation[i].cc)[1];
						}
			            that.listData=resp.body.correlation,
			            that.state=true
					}else{
						that.state=false
					}
					console.log(that.listData,that.state)
				},
				function() {
					that.$refs.layer.style.display = "none";
					that.state=false
				});
			  },
			  gotoDetail:function(id){
			  	window.location.href = "productdetail.html?fundtype=public&fundId=" + id;
//			    wx.navigateTo({
//			      url: '../productdetail/productdetail?fundtype=public&fundid=' + e.currentTarget.dataset.fundid
//			    })
			  },
			  starF: function (val) {
			    val = parseFloat(val);
			    var star
			    if (val > 0.9) {
			        star=[0, 0, 5]
			    } else if (val > 0.8) {
			      star = [0, 1, 4]
			    } else if (val > 0.7) {
			      star = [0, 0, 4]
			    } else if (val > 0.6) {
			      star = [0, 1, 3]
			    } else if (val > 0.5) {
			      star = [0, 0, 3]
			    } else if (val > 0.4) {
			      star = [0, 1, 2]
			    } else if (val > 0.3) {
			      star = [0, 0, 2]
			    } else if (val > 0.2) {
			      star = [0, 1, 1]
			    } else if (val > 0.1) {
			      star = [0, 0, 1]
			    } else {
			      star = [0, 1, 0]
			    }
			    return star;
			  }
			}
		})

app.init();
