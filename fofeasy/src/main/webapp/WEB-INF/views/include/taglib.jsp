<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>  
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="/WEB-INF/tlds/shiro.tld" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" scope="request"/>
<c:set var="ctxResources" value="${pageContext.request.contextPath}/resources" scope="request"/>
<c:set var="ctxPage" value="${pageContext.request.contextPath}" scope="request" />
<c:set var="file_url" value="http://upload.fofpower.com" scope="session"/>

<script>
	var useUserId = '${useUserId}';
	var ctx = '${pageContext.request.contextPath}';
	var ctxResources = '${ctxResources}';
	var image_host = "http://192.168.11.128:810/upload/";//"http://file.fofpower.com/upload/";//
    var apiPath = 'https://api.fofeasy.com';//服务器
    //var apiPath = "http://192.168.11.162:8090";//詹靖华
    //var apiPath = 'http://localhost:8091';//兵哥
    //var apiPath2 = 'http://192.168.11.135:8000';//何超
    //var apiPath2 = 'http://192.168.11.135:8091';//何超
    //var apiPath2 = 'http://192.168.11.191:8091';//何超 虚拟机
    var apiPath2 = 'https://wxapi.fofeasy.com';//
	var upLoadapiPath = "http://file.fofpower.com/upload";
	var upload_path= "/usr/local/upload/";
	var hchartsExportServerUrl = "http://192.168.11.167:3003/";
</script>
