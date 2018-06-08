<!-- 
	我的主页 
	-->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>产品透视</title>
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
	<section id="personInfo" class="fof-content" style="margin-top:140px;">
		<div class="row">
			<div class="col-md-12">
				<div class="personInfodiv">
					<img class="myAvatar" src="${ctxResources}/images/avatar/${ucsUser.avatar}"> <span
						class="personName">${ucsUser.name}</span><br> <span
						class="personCompany">${ucsUser.company}</span>
					<div id="setMenu" class="personSet">
						<button class="personBtnactiv">我的收藏</button>
						<button>对比报告</button>
						<button id="data_filbtn">数据填报</button>
						<button>个人设置</button>
						<%--<shiro:hasRole name="BaseEdition"><!-- 基础版 -->--%>
						<%--<button id="dataUp" data-type=false>自主上传</button>--%>
						<%--</shiro:hasRole>--%>
						<%--<shiro:lacksRole name="BaseEdition">--%>
						<%--<button id="dataUp" data-type =true>自主上传</button>--%>
						<%--</shiro:lacksRole>--%>
						
					</div>
				</div>
				<div id='main-content'>
				
				
				</div>
			</div>
		</div>
	</section>
	<!-- 头部分结束 -->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
			require(['easy2/My/my']);
		</script>
</body>

</html>