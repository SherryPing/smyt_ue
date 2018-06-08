/**
 * 投顾公司.js
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
	require('move');
	// 初始化区域
	$(function() {
		init();
	});
	function init(){
		initConfig();
		initEvent();
	}
	
	function initConfig(){
		var params = {"org_id_init":$('#org_id_init').val()};
		$.ajax({
			url : apiPath+"/api/v1/due_diligence/org/brief/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if(resp.succeed){
					for(i in resp.org_brief){
						if(i!="org_id_init"){
							november[i].value=util.betgAgainst(resp.org_brief[i]);
						}
					}	
				}
			},
			error : function() {}
		})
		$.ajax({
			url : apiPath+"/api/v1/due_diligence/org/files/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				console.log(resp);
				if(resp.succeed){
					var rawMaterial="";
					if(resp.file_location.source_materials.length!=0){
						for(let i = 0;i<resp.file_location.source_materials.length;i++){
							rawMaterial+="<div><a href='"+resp.url_root+resp.file_location.source_materials[i].file_path+"'><img src='/resources/images/huisheng/infoimg.png' class='pdfFile' /></a><p  data-toggle='popover' data-placement='top' data-trigger='hover' data-content='"+resp.file_location.source_materials[i].file_name+"' >"+resp.file_location.source_materials[i].file_name+"</p></div>"
						}
					}
					$('#tab_14').html(rawMaterial);
					$("[data-toggle='popover']").popover();
				}
			},
			error : function() {}
		})
	}
	
	function initEvent(){
	}
});