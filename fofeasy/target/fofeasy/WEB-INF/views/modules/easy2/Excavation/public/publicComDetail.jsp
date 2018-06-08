<!-- 公募投顾详情（主页）-->
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
	<!-- 头部 -->
	<%@ include file="/WEB-INF/views/system/header.jsp"%>
	<!-- 内容部分开始 -->
	<section class="contentDiv">
		<input type="hidden" id="orgId" value="${orgId }"/>
		<%--内容头部--%>
		<div class="moduleDiv2 prcInfo">
			<table >
				<tr>
					<td>
						<div>
							<img class="easy2Starimg" src="${ctxResources}/images/company-logo.png" style="width: 70px;height: 70px;">
							<a id="investmentCompany" target="_blank" style="position:relative;left: 100px;color:black;min-width:140px;font-size: 16px;" href="#">某某基金公司</a>
						</div>
					</td>
					<td>
						<div class="prcTitle">管理规模（亿元）</div>
						<div><span id="netScale"></span></div>
					</td>
					<td>
						<div class="prcTitle">成立日期</div>
						<div><span id="foundationDate"></span></div>
					</td>
					<td>
						<div class="prcTitle">网站地址</div>
						<div><span id="net"></span></div>
					</td>
					<td>
						<div class="prcTitle">办公地址</div>
						<div><span data-content="" data-toggle='popover' data-placement='top' data-trigger='hover' class="manywords160" style="color: #000 !important;" id="orgAddress"></span></div>
					</td>
				</tr>
			</table>
		</div>
		<%--内容主体--%>
		<div class="moduleDiv">
			<ul class="tab" id="fundManageTab">
				<li class="tabItem active"><span data-id="fund" class="tabLink f16 pad_lr30">基金(<span id="fundNumber"></span>只)</span></li>
				<li class="tabItem"><span data-id="manage" class="tabLink f16 pad_lr30">基金经理(<span id="fundManagerNumber"></span>位)</span></li>
			</ul>
			<div id="fundModule">
				<div class="tab2">
					<span class="tabBtn active">股票型基金(20只)</span>
					<span class="tabBtn">债券型基金(10只)</span>
					<span class="tabBtn">混合型基金(50只)</span>
					<span class="tabBtn">货币型基金(10只)</span>
					<span class="tabBtn">其他基金(-)</span>
				</div>
				<div id="stockType" class="fundTable">
					<div id="noCurrency">
						<table id="stockTypeTable"></table>
					</div>
					<div id="currency" style="display: none;">
						<table id="stockTypeTablecc"></table>
					</div>
				</div>
			</div>
			<div id="fundgManageModule" style="display: none;" class="clearfix">
			</div>
		</div>
	</section>
	<!-- 内容部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'easy2/Excavation/public/publicComDetail' ]);
	</script>
</body>
</html>