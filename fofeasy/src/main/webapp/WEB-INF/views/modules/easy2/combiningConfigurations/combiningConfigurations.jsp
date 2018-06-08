<!-- 组合配置.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>组合配置</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
<link rel="stylesheet"
	href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />
</head>
<body>
	<!-- 头部分开始 -->
	<%@ include file="/WEB-INF/views/system/header.jsp"%>
	<!-- 头部分结束 -->
	<!-- 内容部分开始 -->
	<section id="comConfig" class="fof-content">
		<div class="row">
			<div class="col-md-12 pad_left0">
				<ul id="labUl" class="labelUl">
					<li id="policyComtab" class="Active"><span>策略组合</span></li>
					<li id="productComtab"><span>产品组合</span></li>
				</ul>
				<div id="main-content"></div>
			</div>
		</div>
	</section>
	<!-- 头部分结束 -->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'easy2/combiningConfigurations/combiningConfigurations' ]);
	</script>
</body>
</html>