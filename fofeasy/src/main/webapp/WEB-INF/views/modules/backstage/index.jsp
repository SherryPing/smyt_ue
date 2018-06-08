<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- 
	后台管理主页 
	-->
<!DOCTYPE html>
<html>
<head lang="zh-CN">
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>后台管理</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/back-Css.jsp"%>
	<body>
			<header id="header">
			<div class="row">
	 				<div class="col-md-12 title">
						<a href="javascript:void(0);"><img class="editInfotd" src="${ctxResources}/images/back-logo.png"></a>
	 				</div>
			</div>
		</header>
		<section>
			<div class="row">
				<div class="col-md-1">
					<div id="nav" class="nav-toggle">
						<ul id= 'manageMenus' class="navul">
							<shiro:hasRole name="adminUser">
							<li class="module"><a href="javascript:void(0);"><img src="${ctxResources}/images/back-user-01.png"><span>用户管理</span></a></li>
							</shiro:hasRole>
							<li class="module"><img src="${ctxResources}/images/Statistics01.png"><span>统计分析</span></li>
							<li><a href="javascript:void(0);"><span>分布统计</span></a></li>
							<li><a href="javascript:void(0);"><span>模块统计</span></a></li>
							<li><a href="javascript:void(0);"><span>注册统计</span></a></li>
							<li><a href="javascript:void(0);"><span>产品分析</span></a></li>
							<li><a href="javascript:void(0);"><span>投顾分析</span></a></li>
							<shiro:hasRole name="adminUser">
							<li class="module"><img src="${ctxResources}/images/user02.png"><span class="active1">个性设置</span></li>
							<li><a href="javascript:void(0);"><span>角色设置</span></a></li>
							<li data-id="0"><span class="active1">基本设置</span></li>
							</shiro:hasRole>
						</ul>
					</div>
				</div>
			<div id="main-content" class="col-md-11"></div>
		</div>	
		</section>
		<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	    <script>
	        require(['backstage/index']);
	    </script>
	</body>
</html>
