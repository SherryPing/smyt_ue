<!-- 
			尽调评价产品详情（主页）.jsp
 -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico"
	rel="shortcut icon">
<title>${feFundInfoDto.fund_name }</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
</head>
<body>
	<%@ include file="/WEB-INF/views/system/header.jsp"%>
<!-- 头部 -->
<!-- 内容部分开始 -->
	<section class="fof-content" style="margin-top:100px;">
<%-- 		<input type="hidden" id="fundId" value="${fundId }"/>
		<input type="hidden" id="freq" value=""/> --%>
		<div id="prcInfo">
		<div id="projectLogo"><span id="Policy">FOF</span><a id='reg_code'></a></div>
						<table id="prcInfo">
							<tr>
								<td>
									<div><img id='collectIMG' class="easy2Starimg" src="${ctxResources}/images/my-collection.png"><span title="${feFundInfoDto.fund_name}" class="manywords140" style="color:black;" data-id="${fundId }"
				data-name="${feFundInfoDto.fund_name}" id="fund_name"></span><button id="addConprc" class="easy1Btn">添加对比</button></div>
									<div>
										<img class="easy2Starimg" src="${ctxResources}/images/my-collection.png"><a id="investmentAdvisers" target="_blank" style="color:black;min-width:140px;" href="#">投资顾问：<span id="org_name"></span></a>
										<button class="easy1Btn" data-toggle="modal" data-target="#mainModal">生成报告</button></div>

								</td>
								<td>
									<div class="prcTitle">单位净值</div>
									<div><span id="netNav"></span></div>
								</td>
								<td>
									<div class="prcTitle">累计净值</div>
									<div><span id="added_nav"></span></div>
								</td>
								<td>
									<div class="prcTitle">复权累计净值</div>
									<div><span id="swanav"></span></div>
								</td>
								<td>
									<div class="prcTitle">净值日期</div>
									<div><span id="nav_date"></span></div>
								</td>
								<td>
									<div class="prcTitle monthly_frequency">
										<label style="float:left;margin-top:-20px;font-size:12px;">(月频)</label>
										<label>今年以来收益率</label>
										</div>
									<div><span id="year_return" ></span></div>
								</td>
								<td>
									<div class="prcTitle monthly_frequency">
									<label style="float:left;margin-top:-20px;font-size:12px;">(月频)</label>
									<label>成立以来收益率</label>
									</div>
									<div><span id="total_return"></span></div>
								</td>
								<td>
									<div class="prcTitle">基金状态</div>
									<div><span id="fundStatu"></span></div>
								</td>
								<td>
									<div class="prcTitle">成立日期</div>
									<div><span id="foundation_date"></span></div>
								</td>
							</tr>
						</table>
						<div id="Menu" class="Menu">
							<span class="menuBackground" id="menuBackground"></span>
							<ul id="menuUl">
								<li><a href="#"><img id="menuImg1" src="${ctxResources}/images/MenuOptions1-2.png"></a></li>
								<li><a href="#"><img id="menuImg2" src="${ctxResources}/images/MenuOptions2-1.png"></a></li>
								<li><a href="#"><img id="menuImg3" data-isLegal='true' src="${ctxResources}/images/MenuOptions3-1.png"></a></li>
								<li><a href="#"><img id="menuImg4" src="${ctxResources}/images/MenuOptions4-1.png"></a></li>
							</ul>
						</div>
					</div>
			<div id="main-content">
			</div>
	</section>
	<%@ include file="/WEB-INF/views/system/modal.jsp"%>
	<!-- 内容部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'huihong/InvestmentRatings/observationPool/orgDetail/prcDetail' ]);
	</script>
</body>
</html>