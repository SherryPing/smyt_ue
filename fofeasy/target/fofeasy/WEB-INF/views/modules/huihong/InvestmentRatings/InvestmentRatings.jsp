<!-- 组合配置.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>${feFundInfoDto.fund_name }</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
</head>
<body>
	<%@ include file="/WEB-INF/views/system/header.jsp"%>

	<div class="fof-content" style="margin-top:120px;">
		<div class="row">
			<div class="col-md-12">
				<ul id="modules" class='investmenTratings-modulesUl'>
					<li>核心池</li>
					<li>初选池</li>
					<li class="modulesActive">观察池</li>
					<li>尽调模板管理</li>
					<li id="inves">评级标准维护</li>
				</ul>
				<div id="main-content"></div>

			</div>
		</div>
	</div>
	<%@ include file="/WEB-INF/views/system/modal.jsp"%>
	<!-- 内容部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'huihong/InvestmentRatings/InvestmentRatings' ]);
	</script>
</body>
</html>