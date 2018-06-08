<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head lang="zh-CN">
	<title>私募云通业绩评价系统</title>
    <%@ include file="/WEB-INF/views/include/meta.jsp"%>
	<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
	<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
</head>
<body class="bg-gray">
    <nav role="navigation" class="navbar homepage-logo-top" style="height: 300px;">
    </nav>
    <div class="container no-padding-horizontal" style="height: 725px;margin-top:-250px;">
        <%@ include file="/WEB-INF/views/system/header.jsp"%>
        <div class="homepage-mainmenu-bg bg-gray" style="height:570px;">
        	<div class="container-fluid">
            <div class="row">
	            <div class="col-xs-3 mainmenu-top-up text-center">
	                <a href="#setting" data-toggle="collapse" aria-expanded="false" >
	                    <img src="${ctxResources }/images/setting.png" class="img-circle">
	                    <div >系统管理</div>
	                </a>
	                <div id="setting" class="panel-collapse collapse in time-menus" aria-expanded="false" style="height: 0px">
	                    <div class="mainmenus">
	                        <a class="mainmenus-left" href="${ctx }/fontalOptSet/show"></a>
	                        <div class="mainmenu-point"></div>
	                    </div>
	                    <div class="mainmenus">
	                        <a class="mainmenus-right" href="${ctx }/qrtzCronTriggers/show"></a>
	                        <div class="mainmenu-point" ></div>
	                    </div>
	                    <div class="mainmenus">
	                        <a class="mainmenus-left" href="${ctx }/fontalEndProcess/show"></a>
	                        <div class="mainmenu-point"></div>
	                    </div>
	                    <div class="mainmenus">
	                        <a class="mainmenus-right"></a>
	                        <div class="mainmenu-point"></div>
	                    </div>
	                </div>
	            </div>
	            <div class="col-xs-3 mainmenu-top-down text-center">
	                <a href="#report" data-toggle="collapse" aria-expanded="false" >
	                    <img src="${ctxResources }/images/report.png" class="img-circle">
	                    <div></div>
	                </a>
	                <div id="report" class="panel-collapse collapse in time-menus" aria-expanded="false" style="height: 0px">
	                    <div class="mainmenus">
	                        <a class="mainmenus-left" href="${ctx }/fontalDeviceInfo/show"></a>
	                        <div class="mainmenu-point"></div>
	                    </div>
	                    <div class="mainmenus">
	                        <a class="mainmenus-right" href="${ctx }/fontalInstock/show"></a>
	                        <div class="mainmenu-point"></div>
	                    </div>
	                    <div class="mainmenus">
	                        <a class="mainmenus-left" href="${ctx }/fontalOutstock/show"></a>
	                        <div class="mainmenu-point"></div>
	                    </div>
	                </div>
	            </div>
	            <div class="col-xs-3 mainmenu-top-up text-center">
	                <a href="#user" data-toggle="collapse" aria-expanded="false" >
	                    <img src="${ctxResources }/images/user.png" class="img-circle">
	                    <div >用户管理</div>
	                </a>
	                <div id="user" class="panel-collapse collapse in time-menus" aria-expanded="false" style="height: 0px">
	                    <div class="mainmenus">
	                        <a class="mainmenus-left" href="${ctx }/ucsUser/show">用户信息</a>
	                        <div class="mainmenu-point"></div>
	                    </div>
	                    <div class="mainmenus">
	                        <a class="mainmenus-right" href="${ctx }/ucsRole/show">角色管理</a>
	                        <div class="mainmenu-point"></div>
	                    </div>
	                </div>
	            </div>
	            <div class="col-xs-3 mainmenu-top-down text-center">
	                <a href="#report" data-toggle="collapse" aria-expanded="false" >
	                    <img src="${ctxResources }/images/input.png" class="img-circle">
	                    <div></div>
	                </a>
	                <div id="report" class="panel-collapse collapse in time-menus" aria-expanded="false" style="height: 0px">
	                    <div class="mainmenus">
	                        <a class="mainmenus-left" href="${ctx }/fontalCheckItems/show"></a>
	                        <div class="mainmenu-point"></div>
	                    </div>
	                    <div class="mainmenus">
	                        <a class="mainmenus-right"></a>
	                        <div class="mainmenu-point"></div>
	                    </div>
	                    <div class="mainmenus">
	                        <a class="mainmenus-left" href="${ctx }/fontalRunLog/add"></a>
	                        <div class="mainmenu-point"></div>
	                    </div>
	                    <div class="mainmenus">
	                        <a class="mainmenus-right"></a>
	                        <div class="mainmenu-point"></div>
	                    </div>
	                    <div class="mainmenus">
	                        <a class="mainmenus-left" href="${ctx }/fontalStopCar/show"></a>
	                        <div class="mainmenu-point"></div>
	                    </div>
	                </div>
	            </div>
	        </div>
	       </div>
        </div>
    </div>

    <%@ include file="/WEB-INF/views/include/common-js.jsp"%>
    <script>
        require(['index']);
    </script>
</body>
</html>