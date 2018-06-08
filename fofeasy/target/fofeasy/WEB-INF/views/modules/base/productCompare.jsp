<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>产品对比</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
	<link rel="stylesheet" href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />
</head>
<body>
	<%@ include file="/WEB-INF/views/system/header.jsp"%>
	<!-- 上面部分开始 -->
	<div class="fof-contrast-contrastbar">
        <div class="fof-contrastbar">
            <span class="btn-group padding-left-md">
                <button type="button" class="btn btn-primary"><i class="glyphicon glyphicon-th"></i>数据表格</button>
                <button type="button" class="btn btn-default "><i class="glyphicon glyphicon-adjust"></i>图形分析</button>
            </span>
            <span class="btn-group padding-left-md compare-buttons branch-name">
                <button type="button" class="btn nofund" data-fundid="" data-fundname="" data-class="btn-success" ><span>产品对比</span></button>
                <button type="button" class="btn nofund" data-fundid="" data-fundname="" data-class="btn-primary"><span>产品对比</span></button>
                <button type="button" class="btn nofund" data-fundid="" data-fundname="" data-class="btn-success"><span>产品对比</span></button>
                <button type="button" class="btn nofund" data-fundid="" data-fundname="" data-class="btn-info"><span>产品对比</span></button>
            </span>
        </div>
    </div>
   
	<!-- 上面部分结束-->
	<!-- 下面部分开始 -->
	<div class="compare-main-content">
		 <div id="main-content"></div>
		<%@ include file="/WEB-INF/views/modules/base/productCompareChart.jsp"%>
	</div>
	<!-- 下面部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
	require(['base/productCompare']);
	</script>
</body>
</html>