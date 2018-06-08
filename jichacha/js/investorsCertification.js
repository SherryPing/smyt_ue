Vue.http.options.headers = {};
Vue.http.options.headers.Authorization = 'Token ' + (localStorage['token']);
var app = new Vue({
	el: "#investors",
	data: {
		active1: false,
		active2: false
	},
	methods: {
		toggle: function(type) {
			if(type == 1) {
				var state = this.active1;
				this.active1 = !state;
			} else {
				var state = this.active2;
				this.active2 = !state;
			}
		},
		init: function() {
			var auth = localStorage.getItem("auth");
			if(auth == 0) {
				this.active1 = false;
				this.active2 = false;
			} else if(auth == 1) {
				this.active1 = true;
				this.active2 = false;
			} else if(auth == 2) {
				this.active1 = false;
				this.active2 = true;
			} else {
				this.active1 = true;
				this.active2 = true;
			}
		},
		submit: function() {
			var  that= this;
			var value = "0";
			if(!that.active1 && !that.active2) {
				value = "0"
			} else if(that.active1 && !that.active2) {
				value = "1"
			} else if(!that.active1 && that.active2) {
				value = "2"
			} else {
				value = "3"
			}
			userId = localStorage.getItem("userId")
			if(value ==0){
				layer.msg("请至少勾选一项符合的标准进行认证")
			}else{
				Vue.http.post(urlpath + '/wechat/user/', {
					user_id: userId,
					auth: value
				}).then(
					function(resp) {
						if(resp.body.success) {
							layer.msg("认证成功");
							localStorage.setItem("auth",resp.body.auth)
							setTimeout(function(){
								window.location.href = "../index.html";
							},1000)
						}else{
							layer.msg("认证失败,请重试");
						}
					},
					function(resp) {
						noLogin(2, resp);
					});
			}
		}
	}
});
app.init()