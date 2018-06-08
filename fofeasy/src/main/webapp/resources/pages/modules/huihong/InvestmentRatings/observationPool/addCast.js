/**
 * 添加投顾.js
 */
define(function(require, exports, module) {
	// 引入js和css区域
	var $ = require('jquery');
	require('jqueryform');
	var util = require('util');
	require('bootstrap_table_zh');
	require('bootstrap_datetimepicker');
	require('btdata_zh');
	require('header');
	require('jqueryform');
	// 初始化区域
	$(function() {
		init();
	});
	function init() {
		initConfig();
		initEvent();
	}

	function initConfig() {
		
	}
	function initEvent() {
		$('.cdate').datetimepicker({ //日期选择
			format : 'yyyy-mm-dd',
			autoclose : true,
			minView : 2,
			todayBtn : true,
			todayHighlight : true,
			language : 'zh-CN'
		});
		$('#upLoadinp').on('change', function() {
			$("#showFile").val($('#upLoadinp').val().substring(12));
		})
		$('#basicinfUpload').on('click', function() {
			if($('#org_name').val().length==0){
				layer.msg("请填写私募管理人名称");
			}else if($('#org_full_name').val().length==0){
				layer.msg("请填写机构全称");
			}else if($('#reg_code').val().length==0){
				layer.msg("请填写协会备案编号");
			}else if($('#office_address').val().length==0){
				layer.msg("请填写办公地址");
			}else if($('#reg_time').val().length==0){
				layer.msg("请填写协会备案日期");
			}else if($('#linkman').val().length==0){
				layer.msg("请填写联系人");
			}else if($('#found_date').val().length==0){
				layer.msg("请填写机构成立日期");
			}else if($('#linkman_title').val().length==0){
				layer.msg("请填写联系人职务");
			}else if($('#reg_capital').val().length==0){
				layer.msg("请填写注册资本");
			}else if($('#linkman_phone').val().length==0){
				layer.msg("请填写联系人电话");
			}else if($('#issued_funds_num').val().length==0){
				layer.msg("请填写已发行产品数量");
			}else if($('#recommend_org').val().length==0){
				layer.msg("请填写推荐机构");
			}else{
				var params = {"org_brief":{
					"org_name":$('#org_name').val(),
					"org_full_name":null,
					"is_qualified":$('#is_qualified').val(),
					"reg_code":$('#reg_code').val(),
					"office_address":$('#office_address').val(),
					"reg_time":$('#reg_time').val(),
					"linkman":$('#linkman').val(),
					"found_date":$('#found_date').val(),
					"linkman_title":$('#linkman_title').val(),
					"reg_capital":$('#reg_capital').val(),
					"linkman_phone":$('#linkman_phone').val(),
					"asset_scale_mtd":$('#asset_scale_mtd').val(),
					"linkman_email":$('#linkman_email').val(),
					"issued_funds_num":$('#issued_funds_num').val(),
					"org_strategy":$('#org_strategy').val(),
					"invest_style":null,
					"recommend_org":$("#recommend_org").val(),
				}}
				$.ajax({
					url :apiPath+"/api/v1/due_diligence/org/brief/",
					type : 'post',
					contentType : "application/json;charset=utf-8",
					data : JSON.stringify(params),
					success : function(resp) {
						if(resp.succeed){
							layer.msg("提交成功");
							$('#org_id_init').val(resp.org_id_init);
						}
					},
					error : function() {}
				})
			}
		});
		$('#upload1').on('click',function(){
			if($('#org_id_init').val().length==0){
				layer.msg("请先上传投顾基本信息");
			}else{
				var rawMaterial = $('#rawMaterial');
				var options = {
						url :apiPath+"/api/v1/due_diligence/upload_file/",
						type : 'post',
						success : function(resp) {
							if(resp.succeed){
								layer.msg(resp.msg);
							}
						}
					};
				rawMaterial.ajaxSubmit(options);
			}
		});
		$('#clear').click(function() {
			$("#org_info input").val("");
		});
	}
});