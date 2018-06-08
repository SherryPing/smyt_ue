/**
 * 我的收藏.js
 */
define(function(require, exports, module) {

	require('bootstrap_table_zh');
	var $ = require('jquery');
	var util = require('util');
	//变量
	var fundIds;
    var fundType;
    var investmentStrategy_first="";
	/*const color="#0078D7";*/
	const color="#4FA5D6";
	
	// 初始化区域
	function _init(){
		initConfig();
		initEvent();
		listCollection();
		initAction();
		castListCollection();
	}
	
	function initConfig(){
		
	}
	
	function initEvent(){
		$('#historyUl li').click(function(){
			let cDiv = $('.collectionDiv');
			$('.collectionDiv').fadeOut(50);
			$(cDiv[$(this).index()]).fadeIn(800);
		});
		$('#castguTab').on('click','.orgCancel',function(){
			let params  = {"user_id":useUserId,"org_id":$(this).data('id')};
			layer.confirm('确认取消收藏？', {
				  btn: ['确认','取消'] //按钮
				}, function(index){
					$.ajax({
						url:apiPath+"/api/v1/org/collection/remove/",
						type:"post",
						contentType:"application/json;charset=utf-8",
						data:JSON.stringify(params),
						success:function(data){
							layer.msg('删除成功！');
							castListCollection();
						}
					});
					layer.close(index);
				}, function(){
				});
		});
        //基金类型选择
        $("#fundModule").on("click",".tabBtn",function () {
            if($(this).hasClass("active")){//点击取消 显示全部
                $(this).removeClass("active");
                investmentStrategy_first="";
                find();
			}else{//点击选中
                $("#fundModule .tab2 .tabBtn").removeClass('active');
                $(this).addClass("active");
                investmentStrategy_first=$(this).data("id");
                find();
			}

        })
	}
    function find(){
        $.post(ctx+'/userCenter/lsitFund',{'userId':useUserId,'user_id':useUserId},function(resp){
            fundIds = resp.join(',');
            fundTab.bootstrapTable('refresh',{url:ctx+'/product/easyfind'});
        })
    }
    //基金公司基金类型统计
    function orgTypeStatistics(){
        var params = {
            org_id:orgId
        }
        $.ajax({
            url : apiPath2 + "/base/org/fund_type_count",
            type : 'get',
            contentType : "application/json;charset=utf-8",
            data : params,
            success : function(resp) {
                if (resp.success) {
                    var content = "";
                    var number =0;
                    for(var i = 0;i<resp.records.length;i++){
                        if(i==0){
                            content+="<span data-typeCode='"+resp.records[i].type_code+"' class='tabBtn active'>"+resp.records[i].type_name+"("+resp.records[i].num+"只)</span>"
                            fundType = resp.records[i].type_code;
                        }else{
                            content+="<span data-typeCode='"+resp.records[i].type_code+"' class='tabBtn'>"+resp.records[i].type_name+"("+resp.records[i].num+"只)</span>"
                        }
                        number+=parseInt(resp.records[i].num);
                    }
                    $('#fundNumber').text(number);
                    $('#fundModule .tab2').html(content)
                    // orgList()
                }
            },
            error : function(resp) {
                layer.msg(resp.info_msg);
            }
        });
    }
	
	/**
	 * 产品查询用户收藏id
	 */
	function listCollection(){
		$.ajax({
			url:ctx+'/userCenter/lsitFund',
			type:'post',
			data:{'userId':useUserId,'user_id':useUserId},
			success:function(resp){
				if(resp.length>0){
					fundIds = resp.join(',');
				}else
					fundIds = "0000"
				initFundTab();
			}
		})
	}
	
	
	//收藏列表渲染
	function initFundTab(){
		fundTab = $("#main-grid").bootstrapTable({
			sidePagination:'server',search: true,cache:false,method:'post',url:ctx+'/product/easyfind',queryParams:queryParams,contentType: 'application/x-www-form-urlencoded',
    		pagination:true,pageNumber:1,pageSize:20,search:false,
    		toolbar:'#main-tab-td',singleSelect:false,striped:true,clickToSelect:true,
    		columns:[
						{field:'name',title:'取消收藏',sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
							return "<img alt='取消收藏' data-id="+row.fundId+" src= '"+ctxResources+"/images/addCollect.png'>";
						}},
						{field:'index',title:'序号',sortable:false,width:100,align: 'center',valign: 'middle'},
						{field:'fundName',title:'基金简称',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val,row){
							/*return "<a style='color:#0078D7' data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/ProductPerspective/detail/" + row.fundId +"' >"+ val +"</a>"*/
							return "<a style='color:"+color+"' data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/ProductPerspective/detail/" + row.fundId +"' >"+ val +"</a>"
						}},
						{field:'dataFreq',title:'披露频率',sortable:false,width:100,align: 'center',valign: 'middle'},    
						{field:'orgName',title:'投资顾问',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},    
						{field:'fundMember',title:'投资经理',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},    
						{field:'stypeCodeName1',title:'投资策略',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},   
						{field:'stypeCodeName3',title:'发行主体',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},  
						{field:'navDate',title:'净值日期',sortable:true,width:100,align: 'center',valign: 'middle'},						
						{field:'nav',title:'单位净值',sortable:true,width:100,align: 'center',valign: 'middle'},    
						{field:'addedNav',title:'累计净值',sortable:true,width:100,align: 'center',valign: 'middle'},
						{field:'intervalReturn',title:'累计收益率',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}, 
						{field:'returnA',title:'年化收益率',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}
    		],
    		onPostBody:onPostBody
		})

		$("[data-toggle='popover']").popover();
	}
	
	//查询条件 
	function queryParams(params){
    	var solidParams = {
	    	page:params.pageNumber,
	    	rows:params.limit,
	    	sort:params.sort,
	    	order:params.order
            // fund_type:fundType
    	};
    	return $.extend(solidParams,{'fundIds':fundIds,'user_id':useUserId,'investmentStrategy_first':investmentStrategy_first});
    }
	//消息提示
	function cellStyle(val){
    	var dom=['--'];
    	if(val != null&&val != ""&&val!="--"){
    		dom = ["<span data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover'>"+val+"</span>"];
    	}
    	return dom.join("");
    }
	//表格渲染完成后处理
	function onPostBody(){
		//绑定取消收藏
		$("#main-grid img[src$='addCollect.png']").on('click',function(){
			var fundId = $(this).data('id')
			layer.confirm('确认取消收藏？', {
				  btn: ['确认','取消'] //按钮
				}, function(index){
					$.post(ctx+"/userCenter/delFund",{'fundId':fundId,'user_id':useUserId},function(resp){
						refresh();
						layer.msg('删除成功！');
					});
					
					layer.close(index);
				}, function(){
				});
		});
	}
	/**
     * 仅刷新当前页面
     */
    function refresh(){
    	$.post(ctx+'/userCenter/lsitFund',{'userId':useUserId,'user_id':useUserId},function(resp){
    		if(resp.length>0){
				fundIds = resp.join(',');
			}else
				fundIds = "0000"
    		fundTab.bootstrapTable('refresh');   
    	})
    }
	/**
	 * 投顾查询用户收藏id
	 */
	function castListCollection(){
		let params = {'user_id':useUserId}
		$.ajax({
			url:apiPath+"/api/v1/org/collection/list/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
					if(resp.org_id.length>0){
						initOrgshow();
					}	
			}
		})
	}
	function initOrgshow(){
		let params = {'user_id':useUserId}
		$.ajax({
			url:apiPath+"/api/v1/org/collection/show/",
			type:'post',
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(params),
			success:function(resp){
				if(resp.success){
					initOrgTab(resp.records.data);
					$('#castguTab').bootstrapTable("load",resp.records.data);
					$("[data-toggle='popover']").popover();
				}
			}
		})
	}
	//收藏列表渲染
	function initOrgTab(data){
		orgTab = $("#castguTab").bootstrapTable({
			sidePagination : 'client',
			cache : false,
			data : data,
			pagination : true,
			pageNumber : 1,
			pageSize : 20,
			pageList : [ 10, 20, 50 ],
			search : false,
			singleSelect : false,
			striped : true,
			clickToSelect : true,
			undefinedText : '--',
    		columns:[
						{field:'name',title:'取消收藏',sortable:false,align: 'center',valign: 'middle',formatter:function(val,row){
							return "<img alt='取消收藏' class='orgCancel' data-id="+row.org_id+" src= '"+ctxResources+"/images/addCollect.png'>";
						}},
						{field:'row_name',title:'序号',sortable:false,width:100,align: 'center',valign: 'middle',formatter : function(val, row) {
							return val+1
						}},
						{field:'org_name',title:'投资顾问',sortable:false,width:100,align: 'center',valign: 'middle',formatter:function(val,row){
							/*return "<a style='color:#0078D7' data-toggle='popover' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/excavation/detail/" + row.org_id +"' >"+ val +"</a>"*/
							return  "<a data-toggle='popover' class='jumpLabel' data-placement='top' data-content="+val+" data-trigger='hover' target='_blank'  href='"+ ctx+ "/excavation/detail/" + row.org_id +"' >"+ val +"</a>"
						}},
						{field:'managers',title:'投资经理',sortable:false,width:180,class:"fieldInterception",align: 'center',valign: 'middle',
							formatter:function(val,row){
								return "<span data-toggle='popover' data-placement='bottom' data-content="+val+" data-trigger='hover'>"+ val +"</span>"
							}},
						{field:'master_strategy',title:'主要策略',sortable:false,width:100,align: 'center',valign: 'middle'},    
						{field:'found_date',title:'成立日期',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},    
						{field:'fund_num',title:'存续产品数量',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},   
						{field:'total_fund_num',title:'发行主体',sortable:false,width:100,align: 'center',valign: 'middle',formatter:cellStyle},  
						{field:'return',title:'累计收益率',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},						
						{field:'return_a',title:'年化收益率',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},    
						{field:'sharp_a',title:'年化夏普比',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}},
						{field:'stdev_a',title:'年化波动率',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}, 
						{field:'mdd',title:'最大回撤',sortable:true,width:100,align: 'center',valign: 'middle',formatter:function(val){return util.fmtRatio(val);}}
    		],
		})
		$("[data-toggle='popover']").popover();
	}
	function initAction() {
		var iSpeed = 0;
		var left = 0;
		function move(obj, iTarget) {
			clearInterval(obj.timer);
			obj.timer = setInterval(function() {
				iSpeed += (iTarget - obj.offsetLeft) / 5;
				iSpeed *= 0.7;
				left += iSpeed;

				if (Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) {
					clearInterval(obj.timer);
					obj.style.left = iTarget + 'px';
				//alert('关了');
				} else {
					obj.style.left = left + 'px';
				}
			}, 30);
		}
		var historyUl = document.getElementById('historyUl');
		var historyLi = historyUl.getElementsByTagName('li');
		var historyBg = historyLi[historyLi.length - 1];
		var Distance = historyUl.children[0].offsetLeft;
		var current = 0;
		for (var i = 0; i < historyLi.length - 1; i++) {
			historyLi[i].onmouseover = function() {
				move(historyBg, this.offsetLeft);
			};
			historyLi[i].onmouseout = function() {
				move(historyBg, Distance);
			};
			historyLi[i].onclick = function() {
				Distance = this.offsetLeft;
			};
		}
	}
	
	
	//输出区域
	exports.init = _init;
})
	