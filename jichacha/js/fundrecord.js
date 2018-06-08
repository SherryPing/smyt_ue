Vue.http.options.headers={};
Vue.http.options.headers.Authorization = 'Token ' + (localStorage['token']);
var app = new Vue({
	el: "#record",
	data: {
		orgId: "",
		address: "",
		employee_scale: "",
		foundation_date: "",
		initiation_time: "",
		integrity: [],
		is_member: "",
		member_type: "",
		org_category: "",
		org_code: "",
		org_full_name: "",
		org_id: "",
		org_name: "",
		org_web: "",
		property: "",
		real_capital: 0,
		real_capital_proportion: "",
		reg_address: "",
		reg_capital: 0,
		reg_code: "",
		reg_time: "",
	},
	methods: {
		orgInfo: function(e) {
//			this.$refs.layer.style.display = "block";
			var url = location.search; //获取url中"?"符后的字串   
			this.orgId = geturlParams(url).orgId;
			
			userId = localStorage.getItem("userId");
			var that = this;
			Vue.http.get(urlpath + '/wechat/org/reg_info', {
					params: {
						user_id: userId,
						org_id: that.orgId,
					}
				}).then(
					function(resp) {
						var data =nore(resp.body.reg_info);
						that.address = nore(data.address);
						that.employee_scale = nore(data.employee_scale);
						that.foundation_date = nore(data.foundation_date);
						that.initiation_time = nore(data.initiation_time);
						that.integrity = nore(data.integrity);
						that.is_member = nore(data.is_member);
						that.member_type = nore(data.member_type);
						that.org_category = nore(data.org_category);
						that.org_code = nore(data.org_code);
						that.org_full_name = nore(data.org_full_name);
						that.org_id = nore(data.org_id);
						that.org_name = nore(data.org_name);
						that.org_web = nore(data.org_web);
						that.property = nore(data.property);
						that.real_capital = nore(data.real_capital);
						that.real_capital_proportion = nore(data.real_capital_proportion);
						that.reg_address = nore(data.reg_address);
						that.reg_capital = nore(data.reg_capital);
						that.reg_code = nore(data.reg_code);
						that.reg_time = nore(data.reg_time);
//									this.$refs.layer.style.display = "none";
				},
				function(resp) {
					noLogin(2,resp);
				});
	}
}
});
app.orgInfo();