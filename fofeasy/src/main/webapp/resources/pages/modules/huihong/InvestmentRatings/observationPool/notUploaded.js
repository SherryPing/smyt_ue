/**
 * 未上传.js
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
	var jschars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var loc=location.href;
	var pageNo=0;
	if(loc.indexOf("?")>0&&loc.indexOf("=")>0){
		var locParam=loc.split("?")[1].split("=");
		if(locParam[0]=="index"){
			pageNo=Number(locParam[1]);
		}		
	}
	
	// 初始化区域
	$(function() {
		init();
	});
	function init(){
		initConfig();
		initEvent();
	}
	
	function initConfig(){
		var companyName = sessionStorage.getItem('companyName');
		$('#companyName').text(companyName);
		sessionStorage.getItem('companyName',null);
		if(pageNo==1){
			var orgId=$("#org_id").val();
			$("#sec1").css("display","none")
			$("#proSel").css("display","block")
				//旗下产品上传
				params = $.extend({}, {
					'org_id':orgId
				});
				$.ajax({
					url :apiPath+"/api/v1/due_diligence/org/funds/",
					type : 'post',
					contentType : "application/json;charset=utf-8",
					data : JSON.stringify(params),
					success : function(resp) {
						var opt="";
						for(let i in resp.funds){
							opt+="<option value='"+i+"'>";
							opt+=resp.funds[i];
							opt+="</option>";
						}
						$("#proSel").html(opt)
					},
					error : function() {}
				})
				
				$('#upload2').on('click',function(){
				var form = $("#profomation");
				profomation.org_id.value=orgId;
				var options = {
					url :apiPath+"/api/v1/due_diligence/upload_file/",
					type : 'post',
					success : function(data) {
						if(data.succeed){
							layer.msg("上传成功");
						}
					}
				};
				form.ajaxSubmit(options);
			})
		}
	}
	function initEvent(){
		//赋值随机数给表单
		$('.rand').val(generateMixed(10));
		$('#investmenTratings-investmentDetailUl li').click(function(){
			var moduleDiv = $('.detailModul');
			var moduleBtn = $('#investmenTratings-investmentDetailUl li');
			for(var i=0;i<moduleDiv.length;i++){
				$(moduleDiv[i]).fadeOut(50);
				$(moduleBtn[i]).removeClass("modulesActive");
			}
			$(this).addClass("modulesActive");
			$(moduleDiv[$(this).index()]).fadeIn(50);
		})
		$('#upLoadinp').on('change',function(){
			$("#showFile").val($('#upLoadinp').val().substring(12));
		})
		$('#upLoadinp2').on('change',function(){
			$("#showFile2").val($('#upLoadinp2').val().substring(12));
		})
		$('#upload1').on('click',function(){
			var form = $("#adjustInfomation");
			var options = {
				url :apiPath+"/api/v1/due_diligence/upload_file/",
				type : 'post',
				success : function(data) {
					if(data.succeed){
						layer.msg("上传成功");
						$("#proSel").css("display","block")
						//旗下产品上传
						params = $.extend({}, {
							'org_id':data.org_id
						});
						$.ajax({
							url :apiPath+"/api/v1/due_diligence/org/funds/",
							type : 'post',
							contentType : "application/json;charset=utf-8",
							data : JSON.stringify(params),
							success : function(resp) {
								var opt="";
								for(let i in resp.funds){
									opt+="<option value='"+i+"'>";
									opt+=resp.funds[i];
									opt+="</option>";
								}
								$("#proSel").html(opt)
							},
							error : function() {}
						})
						
						$('#upload2').on('click',function(){
						var form = $("#profomation");
						profomation.org_id.value=data.org_id;
						var options = {
							url :apiPath+"/api/v1/due_diligence/upload_file/",
							type : 'post',
							success : function(data) {
								if(data.succeed){
									layer.msg("上传成功");
								}
							}
						};
						form.ajaxSubmit(options);
					})
					}
				}
			};
			form.ajaxSubmit(options);
		})
		
		
		//公司相关资料上传，上传文件类型。
		$('#CompanyRelatedInformation .halfHdiv label').on('click',function(){
			compnayForm.specify.value = $(this).data('type');
		})
		$('#companyFile').on('change',function(){
			var form = $("#compnayForm");
			var options = {
				url :apiPath+"/api/v1/due_diligence/upload_file/",
				type : 'post',
				success : function(data) {
					if(data.succeed){
						layer.msg(data.msg);
						console.log(data);
						let type=compnayForm.specify.value;
						switch(type){
						case "license" :
							$('#imgGou1').attr('src',ctxResources+"/images/huisheng/gouActive.png");
							break;
						case "code" :
							$('#imgGou2').attr('src',ctxResources+"/images/huisheng/gouActive.png");
							break;
						case "id" :
							$('#imgGou3').attr('src',ctxResources+"/images/huisheng/gouActive.png");
							break;
						case "register" :
							$('#imgGou4').attr('src',ctxResources+"/images/huisheng/gouActive.png");
							break;
						case "audit" :
							$('#imgGou5').attr('src',ctxResources+"/images/huisheng/gouActive.png");
							break;
						case "finance" :
							$('#imgGou6').attr('src',ctxResources+"/images/huisheng/gouActive.png");
							break;
						
						}
					}
				}
			};
			form.ajaxSubmit(options);
		})
		$('#clear').on('click',function(){
			$('#showFile').val("");
		});
	}
	
	function generateMixed(n) {
	    var res = "";
	    for(var i = 0; i < n ; i ++) {
	        var id = Math.ceil(Math.random()*35);
	        res += jschars[id];
	    }
	    return res;
	}
});