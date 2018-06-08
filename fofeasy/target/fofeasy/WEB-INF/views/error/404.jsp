<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%response.setStatus(200);%>

<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/views/include/meta.jsp"%>
	<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
	<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
	<title>404 - 页面不存在</title>
</head>

<body class="bg-gray">
	<div class="middle-box text-center animated fadeInDown">
		<h1>404</h1>
        <h3 class="font-bold">页面未找到！</h3>
        <div class="error-desc">
        	    抱歉，页面好像去火星了~
            
        </div>
	</div>
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
</body>
</html>