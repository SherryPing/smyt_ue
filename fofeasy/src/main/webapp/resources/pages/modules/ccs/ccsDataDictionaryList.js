/**
 * Copyright (C), dzmsoft Co., Ltd
 */
																					/**
 * 初始加载
 */
$(function(){
	initActions();
	createDg();
});
/**
 * 变量区
 */
var dgList; // 列表
var dForm;// 对话框
/**
 * 初始化绑定事件
 */
function initActions(){
	$('#searchFrom_find').on('click',function(){find();});
	$('#searchFrom_reset').on('click',function(){reset();});
	$('.add').linkbutton({'onClick':function(){add();}});
	$('.edit').linkbutton({'onClick':function(){edit();}});
	$('.remove').linkbutton({'onClick':function(){remove();}});
}
/**
 * 查询
 */
function find(){
	var obj=$("#searchFrom").serializeObject();
	dgList.datagrid('load',obj); 
}
/**
 * 重置
 */
function reset(){
	$('#searchFrom').form('clear');
	find();
}
/*
 * 创建表格
 */
function createDg(){
	dgList=$('#dg').datagrid({    
	method: "post",url:ctx+'/ccsDataDictionary/find', idField : 'id',singleSelect:true,
    fit : true,fitColumns : true,border : false,striped:true,
	pagination:true,rownumbers:true,pageNumber:1,pageSize : 20,pageList : [ 20, 30, 50 ],
    columns:[[    
    	    	    		    			{field:'id',title:'ID',hidden:true}
    		    	    		    			    			    			    			    			,{field:'displayField',title:'显示值',sortable:true,width:100,align:"left",halign:'center' }
    		    	    		    			    			    			    			,{field:'valueField',title:'保存值',sortable:true,width:100,align:"left",halign:'center' }
    		    	    		    			    			    			    			,{field:'type',title:'类型',sortable:true,width:100,align:"left",halign:'center' }
    		    	    		    			    			    			    			,{field:'status',title:'状态 00：禁用 01：启用 02：删除',sortable:true,width:100,align:"left",halign:'center' }
    		    	    		    			    			    			    			,{field:'description',title:'描述',sortable:true,width:100,align:"left",halign:'center' }
    		    	    		    			    			    			    			,{field:'creator',title:'创建者',sortable:true,width:100,align:"left",halign:'center' }
    		    	    		    			    			    			    			,{field:'createTime',title:'创建时间',sortable:true,width:100,align:"left",halign:'center' ,formatter:DzmFrame.EasyUI.fmtDatetime}
    		    	    		    			    			    			    			,{field:'updator',title:'修改者',sortable:true,width:100,align:"left",halign:'center' }
    		    	    		    			    			    			    			,{field:'updateTime',title:'修改时间',sortable:true,width:100,align:"left",halign:'center' ,formatter:DzmFrame.EasyUI.fmtDatetime}
    		    	    ]],
    sortName:'displayField',sortOrder:'asc',
    enableHeaderClickMenu: false,
    enableHeaderContextMenu: false,
    toolbar:'#tb'
	});
}
/**
 * 新增
 */
function add(){
		var url = ctx+'/ccsDataDictionary/add';
	window.top.addTab('新增',url);
	}
/**
 * 编辑
 */
function edit(){
	var row = dgList.datagrid('getSelected');
	if(rowIsNull(row)) return;
		var url = ctx+'/ccsDataDictionary/edit/'+row.id;
	window.top.addTab('编辑',url);
	}
/**
 * 删除
 */
function remove(){
	var row = dgList.datagrid('getSelected');
	if(rowIsNull(row)) return;
	parent.$.messager.confirm('提示', '删除后无法恢复您确定要删除？', function(data){
		if (data){
			$.ajax({
				type:'get',
				url:ctx+"/ccsDataDictionary/remove/"+row.id,
				success: function(data){
					if (data.success){
						$.messager.alert('系统提示',data.msg,'info',function(){
							find();
						});
					} else{
						$.messager.alert('系统提示',data.msg,'error');
					}
				}
			});
		} 
	});
}
/**
 * 提交
 */
function submit(){
	$('#mainform').form('submit',{
		onSubmit:function(){
			var isValid = $(this).form('enableValidation').form('validate');
			if (isValid){
				$.messager.progress();
			}
			return isValid;	// 返回false终止表单提交
		},
		success:function(result){
			$.messager.progress('close');
			//
			var data = $.parseJSON(result);
			if (data.success){
				$.messager.alert('系统提示',data.msg,'info',function(){
					dForm.panel('close');
					find();
				});
			} else{
				$.messager.alert('系统提示',data.msg,'error');
			}
		}
	});
}
