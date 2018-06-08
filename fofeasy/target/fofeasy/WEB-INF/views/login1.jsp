<!-- 登陆页.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>登录主页</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
<link rel="stylesheet"
	href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />
</head>
<body>
	<!-- 内容部分开始 -->
	<section id="hh-login" class="fof-content distanceTop20">
		<div class="row">
			<div class="col-md-12">
				<div class="hh-logo">
					<img src="${ctxResources}/images/huisheng/login_logo.png"/>
				</div>
				<div class="roleLogin">
					<p class="notiTitle">请先选择您的管理角色</p>
					<div class="rolePic">
						<img id="manager" src="${ctxResources}/images/huisheng/login-img1.png">
						<img id="org" src="${ctxResources}/images/huisheng/login-img2.png">
						<img id="fof" src="${ctxResources}/images/huisheng/login-img3.png">
						<img id="export" src="${ctxResources}/images/huisheng/login-img4.png">
						<img id="fund" src="${ctxResources}/images/huisheng/login-img5.png">
					</div>
					<button class="btn btn-danger btn-lg Logintn" id="Logintn">账号登陆</button>
				</div>
				<div class="accoLogin" style="display:none;">
					<form role="form" id="loginForm" class="subForm">
						<label class="control-label">推荐机构</label>
						<input type="text" class="form-control inputT" name="username" id="userName">
						<input type="password" class="form-control inputT" name="password" id="password">
						<div class="chkDiv">
							<input type="checkbox"  id="rememberme"/><label
								for="rememberme">下次自动登录</label>
						</div>
						<div class="btnGroup">
							<button type="button" class="btn btn-block btn-danger" id="btnSubmit">登录</button>
							<button type="button"  class="btn btn-block">取消</button>
						</div>	
					</form>
				</div>
				<!-- <div class="accoLogin" style="display:none;">
					<form class="subForm" >
						<label class="control-label">推荐机构</label>
						<input type="text" class="form-control inputT" id="name">
						<input type="text" class="form-control inputT" id="name">
						<div class="chkDiv">
							<input type="checkbox" id="chk"/>下次自动登录
						</div>
						<div class="btnGroup">					
							<button class="btn btn-block btn-danger" id="btnSubmit">登录</button>
							<button class="btn btn-block">取消</button>
						</div>								
					</form>
				</div> -->
			</div>
		</div>		 
	</section>
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'login' ]);
	</script>
</body>
</html>