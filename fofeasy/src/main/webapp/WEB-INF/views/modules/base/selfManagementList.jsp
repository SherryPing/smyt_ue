<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>

	<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
	<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
	<title>自主管理</title>
	<%@ include file="/WEB-INF/views/include/meta.jsp"%>
	<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
	<link rel="stylesheet" href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />
</head>
<body>
	<%@ include file="/WEB-INF/views/system/header.jsp"%>
	<!-- 左侧部分开始 -->
	<div class="fof-left">
        <%@ include file="/WEB-INF/views/modules/base/selfManagementListLeft.jsp"%>
    </div>
	<!-- 左侧部分结束-->
	<!-- 右侧部分开始 -->
	<div class="fof-right">
        <div class="fof-status-block">
            <div class="form-group fof-status-search">
                <div class="input-group">
                    <span class="input-group-btn">
                        <select id="selectType" class="form-control" style="width:106px;">
                            <option value="0" selected="selected">基金产品</option>
                            <option value="1">投资顾问</option>
                            <option value="2">投资经理</option>
                        </select>
                    </span>
                    <input type="text" class="form-control" id="selectText" placeholder="关键词">
                    <span class="input-group-addon">
                        <i class="glyphicon glyphicon-search"></i>
                    </span>
                </div>
            </div>
        </div>
        <div class="fof-contrastbar" style="padding-top: 40px">
            <span class="btn-group padding-left-md compare-buttons branch-name">
                <button type="button" class="btn nofund" data-fundid="" data-fundname="" data-class="btn-primary" ><span>产品对比</span><i class="glyphicon glyphicon-trash pull-right" style="display:none"></i></button>
                <button type="button" class="btn nofund" data-fundid="" data-fundname="" data-class="btn-success"><span>产品对比</span><i class="glyphicon glyphicon-trash pull-right" style="display:none"></i></button>
                <button type="button" class="btn nofund" data-fundid="" data-fundname="" data-class="btn-info"><span>产品对比</span><i class="glyphicon glyphicon-trash pull-right" style="display:none"></i></button>
                <button type="button" class="btn nofund" data-fundid="" data-fundname="" data-class="btn-warning"><span>产品对比</span><i class="glyphicon glyphicon-trash pull-right" style="display:none"></i></button>
            </span>
            <span class="btn-group-xs padding-left-md">
            	<button type="button" class="btn btn-default" id="btnCompare">对比</button>
                <!-- <button type="button" class="btn btn-default" id="btnClear">清空</button> -->
            </span>
            <button class="btn btn-default ladda-button pull-right" id = "outputExcle">导出</button>
           <button class="btn btn-default ladda-button pull-right" style="margin-right: 15px;background-color: #3d7fc2;color: white;" type="button"  id="btnImport" data-style="expand-left" data-size="1"><span class="ladda-label">导入</span></button>
        </div>
        <table class="table table-condensed product-main-grid table-text" id="main-grid" data-toggle="main-grid" data-id-field="id">
		</table>
    </div>
	<!-- 右侧部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require(['base/selfManagementList']);
	</script>
</body>
</html>