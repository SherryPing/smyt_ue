/**
 * 数据填报.js
 */
define(function(require, exports, module) {
	var $ = require('jquery');
	var util = require('util');
	require('bootstrap_datetimepicker');
	require('bootstrap_table_zh');
	require('btdata_zh');
	require('jqueryform');
	// 初始化区域
	var fund_id = null;
	function _init() {
		initConfig();
		initEvent();
		queryCompany();
		dataFiltbl();
	}

	function initConfig() {
	}

	function initEvent() {
		//日期选择
		$('.select_date').datetimepicker({
		    format: 'yyyy-mm-dd',
		    autoclose: true,
		    minView: 2,
		    todayBtn: true,
		    todayHighlight: true,
		    language: 'zh-CN'
		});
		//右侧导航栏，到相对应的位置，状态相对应改变。
		window.onscroll = function() {
			var sTop = document.documentElement.scrollTop;
			var n1 = sTop - document.getElementById("november1").offsetTop;
			var n2 = sTop - document.getElementById("november2").offsetTop;
			var n3 = sTop - document.getElementById("november3").offsetTop;
			var n4 = sTop - document.getElementById("november4").offsetTop;
			var dian = $('.navPoint');
			var txt = $('.navTxt');
			if (n2 >= 0) {
				for (var i = 0; i < dian.length; i++) {
					$(dian[i]).removeClass('bartActive');
					$(txt[i]).removeClass('barbActive');
				}
				$(dian[1]).addClass('bartActive');
				$(txt[1]).addClass('barbActive');
				if (n3 >= 0) {
					for (var i = 0; i < dian.length; i++) {
						$(dian[i]).removeClass('bartActive');
						$(txt[i]).removeClass('barbActive');
					}
					$(dian[2]).addClass('bartActive');
					$(txt[2]).addClass('barbActive');
					if (n4 >= -400) {
						for (var i = 0; i < dian.length; i++) {
							$(dian[i]).removeClass('bartActive');
							$(txt[i]).removeClass('barbActive');
						}
						$(dian[3]).addClass('bartActive');
						$(txt[3]).addClass('barbActive');
					}
				}
			} else {
				for (var i = 0; i < dian.length; i++) {
					$(dian[i]).removeClass('bartActive');
					$(txt[i]).removeClass('barbActive');
				}
				$(dian[0]).addClass('bartActive');
				$(txt[0]).addClass('barbActive');
			}
		}
		//点击滑动到相对应的位置。
		$("#clickMenu1").click(function() {
			var speed = 1000;
			$('html,body').animate({
				scrollTop : '0px'
			},
				speed);
		});
		$("#clickMenu2").click(function() {
			var height1 = $('#investmentInfo').outerHeight();
			var result = parseInt(height1 + 220);
			var speed = 1000;
			$('html,body').animate({
				scrollTop : parseInt(result) + 'px'
			},
				speed);
		});
		$("#clickMenu3").click(function() {
			var height1 = $(document).height();
			var height2 = $('#manageInfo').outerHeight();
			var height3 = $('#netDatauplodad').outerHeight();
			var result = parseInt(height1 - height2 - height3 - 260);
			var speed = 1000;
			$('html,body').animate({
				scrollTop : parseInt(result) + 'px'
			},
				speed);
		});
		$("#clickMenu4").click(function() {
			var height1 = $(document).height();
			var result = height1;
			var speed = 1000;
			$('html,body').animate({
				scrollTop : parseInt(result) + 'px'
			},
				speed);
		});
		//点击数据填报里的单只上传，先请求后端，看是否上传过投顾信息。
		$('#singUp').on('click', function() {
			$('#dataFildiv').fadeOut(100);
			$('#singleFill').fadeIn(1500);
			$('#fund_info input').val('');
			fund_id = null;
			queryCompany();
			var params1 = {
				'method' : 'query',
				'uid' : useUserId,
				'manager_id' : null,
				'user_id' : useUserId
			};
			$.ajax({
				url : upLoadapiPath + "/fund_manager/",
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params1),
				success : function(resp) {
					if (resp.succeed == true) {
						manager_id = resp.manager_ids[0][0];
						var info = resp.manager_info;
						for (var a in info) {
							manager_info[a].value = info[a];
						}
						$('#showManagerdiv').html('');
						var managerInfo = "";
						for (var i = 0; i < resp.manager_ids.length; i++) {
							managerInfo += "<button type='button' data-id='" + resp.manager_ids[i][0] + "' class='easy2Btn manager'>" + resp.manager_ids[i][1] + "</button>"
						}
						managerInfo += "<button type='button' class='easy2Btn' id='add_prc'>添加</button>"
						$('#showManagerdiv').html(managerInfo);
					}
				},
				error : function() {}
			})
		});
		$('#supBack').on('click', function() {
			$('#singleFill').fadeOut(100);
			$('#dataFildiv').fadeIn(1500);
		});
		$('#complete').on('click', function() {
			$('#singleFill').fadeOut(100);
			$('#dataFildiv').fadeIn(1500);
		});
		$('#upLoadinp').on('change', function() {
			$('#showFile').val($('#upLoadinp').val().substring(12))
		});
		$('#more_upLoadinp').on('change', function() {
			$('#more_showFile').val($('#more_upLoadinp').val().substring(12));
		});
		//投顾公司填写内容发生变化，确定按钮才能点击。
		$('#org_info input').on('change', function() {
			$('#cast_gubtn').removeAttr('disabled');
		});
		$('#org_info select').on('change', function() {
			$('#cast_gubtn').removeAttr('disabled');
		});
		$('#org_info textarea').on('change', function() {
			$('#cast_gubtn').removeAttr('disabled');
		});
		//产品填写内容发生变化，确定按钮才能点击。
		$('#fund_info input').on('change', function() {
			$('#product_infobtn').removeAttr('disabled');
		});
		$('#fund_info select').on('change', function() {
			$('#product_infobtn').removeAttr('disabled');
		});
		$('#fund_info textarea').on('change', function() {
			$('#product_infobtn').removeAttr('disabled');
		});
		//基金经理填写内容发生变化，确定按钮才能点击。
		$('#manager_info input').on('change', function() {
			$('#manager_infobtn').removeAttr('disabled');
		});
		$('#manager_info select').on('change', function() {
			$('#manager_infobtn').removeAttr('disabled');
		});
		$('#manager_info textarea').on('change', function() {
			$('#manager_infobtn').removeAttr('disabled');
		});
		//投顾公司添加，或者更新投顾信息
		$('#cast_gubtn').click(function() {
			if (org_data.org_name.value.length == 0) {
				layer.msg('机构简称不能为空');
			} else if (org_info.org_full_name.value.length == 0) {
				layer.msg('机构全称不能为空');
			} else if (org_info.reg_code.value.length == 0) {
				layer.msg('备案编号不能为空');
			} else if (org_info.team_scale.value.length == 0) {
				layer.msg('投研人员规模不能为空');
			} else if (org_info.team.value.length == 0) {
				layer.msg('投研团队核心人员不能为空');
			} else if (org_info.fund_num.value.length == 0) {
				layer.msg('已发行的产品数量不能为空');
			} else if (org_info.linkman.value.length == 0) {
				layer.msg('联系人不能为空')
			} else if (org_info.linkman_phone.value.length == 0) {
				layer.msg('联系电话不能为空')
			} else {
				var params = {
					'method' : 'update',
					'uid' : useUserId,
					'org_data' : $('#org_info').serializeObject(),
					'user_id' : useUserId
				};
				//					$.each(params.org_data,function(i,n){
				//						if(n=='')
				//							params.org_data[i]=null;
				//					});
				$.ajax({
					url : upLoadapiPath + "/investment_company/",
					type : 'post',
					contentType : "application/json;charset=utf-8",
					data : JSON.stringify(params),
					success : function(resp) {
						if (resp.succeed == true) {
							org_id = resp.org_info;
							var info = resp.org_info;
							for (var a in info) {
								org_info[a].value = info[a];
							}
							layer.msg(resp.msg)
						}
					},
					error : function() {}
				})
			}
		});
		//点击产品列表里面的修改，出现相对应的信息。
		$('#data_filtbl').on('click', '.modify_prc', function() {
			$('#dataFildiv').fadeOut(100);
			$('#singleFill').fadeIn(1500);
			fund_id = $(this).attr('data-id');
			queryCompany();
			var params = {
				'method' : 'query',
				'uid' : useUserId,
				'fund_id' : fund_id,
				'user_id' : useUserId
			};
			$.ajax({
				url : upLoadapiPath + "/fund/",
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params),
				success : function(resp) {
					if (resp.succeed == true) {
						var info = resp.fund_info;
						for (var a in info) {
							fund_info[a].value = info[a];
						}
					}
				},
				error : function() {}
			})
			var params1 = {
				'method' : 'query',
				'uid' : useUserId,
				'fund_id' : fund_id
			};
			$.ajax({
				url : upLoadapiPath + "/fund_manager/",
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params),
				success : function(resp) {
					if (resp.succeed == true) {
						var info = resp.manager_info;
						for (var a in info) {
							manager_info[a].value = info[a];
						}
						$('#showManagerdiv').html('');
						var managerInfo = "";
						for (var i = 0; i < resp.manager_ids.length; i++) {
							managerInfo += "<button type='button' data-id='" + resp.manager_ids[i][0] + "' class='easy2Btn manager'>" + resp.manager_ids[i][1] + "</button>"
						}
						managerInfo += "<button type='button' class='easy2Btn' id='add_prc'>添加</button>"
						$('#showManagerdiv').html(managerInfo);
					}
				},
				error : function() {}
			})
		});
		//点击表里面的更新净值事件。
		$('#data_filtbl').on('click', '.net_worth', function() {
			fund_id = $(this).prev().attr('data-id');
			$('#more_uptype').val('nav');
			$('#myModal').modal('show');
		});
		//产品基础信息确定事件。
		$('#product_infobtn').click(function() {
			if (fund_info.fund_name.value.length == 0) {
				layer.msg('请填写产品名称');
			} else if (fund_info.fund_full_name.value.length == 0) {
				layer.msg('请填写产品全称');
			} else if (fund_info.fund_type_strategy.value.length == 0) {
				layer.msg('请填写投资策略');
			} else if (fund_info.match_group.value.length == 0) {
				layer.msg('请填写参赛组别');
			} else if (fund_info.foundation_date.value.length == 0) {
				layer.msg('请填写成立日期');
			} else if (fund_info.reg_code.value.length == 0) {
				layer.msg('请填写备案编号');
			} else if (fund_info.issue_scale.value.length == 0) {
				layer.msg('请填写发行规模');
			} else if (fund_info.asset_scale.value.length == 0) {
				layer.msg('请填写截至上月末管理规模');
			} else if (fund_info.fund_manager.value.length == 0) {
				layer.msg('请填写投资顾问');
			} else if (fund_info.fund_manager_nominal.value.length == 0) {
				layer.msg('请填写基金管理人');
			} else if (fund_info.fund_member.value.length == 0) {
				layer.msg('请填写基金经理');
			} else {
				var params = {
					'method' : 'update',
					'uid' : useUserId,
					'fund_data' : $('#fund_info').serializeObject(),
					'user_id' : useUserId
				};
				$.ajax({
					url : upLoadapiPath + "/fund/",
					type : 'post',
					contentType : "application/json;charset=utf-8",
					data : JSON.stringify(params),
					success : function(resp) {
						if (resp.succeed) {
							layer.msg(resp.msg);
						} else {
							layer.msg(resp.msg)
						}
					},
					error : function() {}
				});
			}
		});
		//基金经理信息确定事件。
		$('#manager_infobtn').click(function() {
			if (manager_info.user_name.value.length == 0) {
				layer.msg('请填写姓名');
			} else if (manager_info.duty.value.length == 0) {
				layer.msg('请填写职务');
			} else if (manager_info.entry_date.value.length == 0) {
				layer.msg('请填写机构任职日期');
			} else if (manager_info.is_core_member.value.length == 0) {
				layer.msg('请填写人物简介');
			} else {
				var params = null;
				if (manager_id == null) {
					params = {
						'method' : 'update',
						'uid' : useUserId,
						'manager_data' : $('#manager_info').serializeObject(),
						'user_id' : useUserId
					};
				} else {
					params = {
						'method' : 'update',
						'uid' : useUserId,
						'manager_data' : $('#manager_info').serializeObject(),
						'manager_id' : manager_id,
						'user_id' : useUserId
					};
				}
				$.ajax({
					url : upLoadapiPath + "/fund_manager/",
					type : 'post',
					contentType : "application/json;charset=utf-8",
					data : JSON.stringify(params),
					success : function(resp) {
						if (resp.succeed == true) {
							$('#showManagerdiv').html('');
							var managerInfo = "";
							for (var i = 0; i < resp.manager_ids.length; i++) {
								managerInfo += "<button type='button' data-id='" + resp.manager_ids[i][0] + "' class='easy2Btn manager'>" + resp.manager_ids[i][1] + "</button>"
							}
							managerInfo += "<button type='button' class='easy2Btn' id='add_prc'>添加</button>"
							$('#showManagerdiv').html(managerInfo);
							layer.msg(resp.msg);
						} else {
							layer.msg('出錯了');
						}
					},
					error : function() {}
				})
			}
		});
		//点击基金经理，展示相对应的基金经理信息。
		$('#manageInfo').on('click', '.manager', function() {
			manager_id = $(this).attr('data-id');
			var params = null;
			if (fund_id == null) {
				params = {
					'method' : 'query',
					'uid' : useUserId,
					'manager_id' : manager_id,
					'user_id' : useUserId
				}
			} else {
				params = {
					'method' : 'query',
					'uid' : useUserId,
					'manager_id' : manager_id,
					'fund_id' : fund_id,
					'user_id' : useUserId
				}
			}
			$.ajax({
				url : upLoadapiPath + "/fund_manager/",
				type : 'post',
				contentType : "application/json;charset=utf-8",
				data : JSON.stringify(params),
				success : function(resp) {
					if (resp.succeed == true) {
						var info = resp.manager_info;
						for (var a in info) {
							manager_info[a].value = info[a];
						}
						var managerInfo = "";
						$('#showManagerdiv').html('');
						for (var i = 0; i < resp.manager_ids.length; i++) {
							managerInfo += "<button type='button' data-id='" + resp.manager_ids[i][0] + "' class='easy2Btn manager'>" + resp.manager_ids[i][1] + "</button>"
						}
						managerInfo += "<button type='button' class='easy2Btn' id='add_prc'>添加</button>"
						$('#showManagerdiv').html(managerInfo);
					} else {
						layer.msg('我也不知道是什么情况');
					}
				},
				error : function() {}
			})
		});
		//点击添加基金经理。
		$('#manageInfo').on('click', '#add_prc', function() {
			manager_id = null;
			$("#manageInfo input").val('');
			$("#manageInfo textarea").val('');
		});
		//单只产品上传
		$('#upload1').on('click', function() {
			$("input[name='uid']").val(useUserId); //,'user_id':useUserId
			$("#upuserid").val(useUserId);
			var form = $("#file");
			var options = {
				url : upLoadapiPath + "/receiver/",
				type : 'post',
				success : function(data) {
					$('#nav_uploadInfo').fadeIn(1000);
					$('#nav_uploadInfo').html("<p>" + data.status.nav.msg + "</p>");
				}
			};
			form.ajaxSubmit(options);
		});
		//批量上传
		$('#more_upload').on('click', function() {
			if (fund_id == null) {
				$('#more_upfundid').val('');
			} else {
				$('#more_upfundid').val(fund_id);
			}
			$("#more_upuserid").val(useUserId);
			$("#more_uid").val(useUserId);
			var form = $("#more_file");
			var options = {
				url : upLoadapiPath + "/receiver/",
				type : 'post',
				success : function(data) {
					dataFiltbl();
					$('#more_nav_uploadInfo').fadeIn(1000);
					$('#more_nav_uploadInfo').css('color', 'red');
					$('#more_nav_uploadInfo').html(data.status.nav.msg);
				}
			};
			form.ajaxSubmit(options);
		});
	}
	//数据填报用户添加过的产品
	function dataFiltbl() {
		var params = {
			'uid' : useUserId,
			'user_id' : useUserId
		}
		$.ajax({
			url : upLoadapiPath + "/fund_static/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed) {
					initTable($('#data_filtbl'), resp);
				}
			},
			error : function() {}
		})
	}
	//查询投顾公司
	function queryCompany() {
		var params = {
			'method' : 'query',
			'uid' : useUserId,
			'user_id' : useUserId
		};
		$.ajax({
			url : upLoadapiPath + "/investment_company/",
			type : 'post',
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(params),
			success : function(resp) {
				if (resp.succeed == true) {
					var info = resp.org_info;
					for (var a in info) {
						org_info[a].value = info[a];
					}
				}
			},
			error : function() {}
		})

	}
	function initTable(dom, resp) {
		dom.bootstrapTable({
			striped : true,
			sidePagination : 'client',
			cache : false,
			data : resp.fund_static.data,
			pagination : true,
			pageNumber : 1,
			pageSize : 20,
			pageList : [ 10, 20, 50 ],
			search : false,
			undefinedText : '--',
			singleSelect : false,
			striped : true,
			clickToSelect : true,
			columns : [
				{
					field : 'row_name',
					title : resp.fund_static.columns.row_name,
					sortable : false,
					align : 'center',
					valign : 'middle',
				},
				{
					field : 'fund_name',
					title : resp.fund_static.columns.fund_name,
					sortable : false,
					align : 'center',
					valign : 'middle',
				},
				{
					field : 'org_name',
					title : resp.fund_static.columns.org_name,
					sortable : false,
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'user_name',
					title : resp.fund_static.columns.user_name,
					sortable : false,
					align : 'center',
					valign : 'middle',
				},
				{
					field : 'match_group',
					title : resp.fund_static.columns.match_group,
					sortable : false,
					align : 'center',
					valign : 'middle',
				},
				{
					field : 'fund_type_strategy',
					title : resp.fund_static.columns.fund_type_strategy,
					sortable : false,
					align : 'center',
					valign : 'middle',
				},
				{
					field : 'issue_scale',
					title : resp.fund_static.columns.issue_scale,
					sortable : false,
					align : 'center',
					valign : 'middle',
				},
				{
					field : 'nav_date',
					title : resp.fund_static.columns.nav_date,
					sortable : false,
					align : 'center',
					valign : 'middle',
				},
				{
					field : 'nav',
					title : resp.fund_static.columns.nav,
					sortable : false,
					align : 'center',
					valign : 'middle',
				},
				{
					field : 'added_nav',
					title : resp.fund_static.columns.added_nav,
					sortable : false,
					align : 'center',
					valign : 'middle',
				},
				{
					field : '',
					title : '操作',
					class : "Operation",
					width : '200',
					sortable : false,
					align : 'center',
					valign : 'middle',
					formatter : function(val, row) {
						return "<a data-id='" + row.fund_id + "' class='modify_prc'>修改</a><a class='net_worth'>更新净值</a>" //<a class='fill_report'>报告</a>
					}
				},
			],
			onClickRow : resp.onClickRow,
			onPostBody : resp.onPostBody
		});
	}
	//输出区域
	exports.init = _init;
})