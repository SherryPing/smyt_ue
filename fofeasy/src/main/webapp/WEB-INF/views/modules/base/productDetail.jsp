<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>

<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico"
	rel="shortcut icon">
<title>${feFundInfoDto.fund_name }</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
</head>
<body>
	<%@ include file="/WEB-INF/views/system/header.jsp"%>
	<!-- 左侧部分开始 -->
	<div class="fof-left">
		<div class="fof-sidebar-head">
			<span class="fof-sidebar-head-text" data-id="${fundId }"
				data-name="${feFundInfoDto.fund_name }" id="fund">${feFundInfoDto.fund_name }</span>
		</div>
		<ul class="ul1 all-b">
			<li class="all-nowarp"><span class="text-center imgspan"><img
					src="${ctxResources}/images/Icon_Bookmark.png"></span> 投资顾问： <span>
					<a style="color:black;" target="_blank" href="#">${feFundInfoDto.org_name }</a>
			</span></li>
			<li class="all-nowarp"><span class="text-center imgspan"><img
					src="${ctxResources}/images/Icon_User.png"></span> 投资经理： <span
				style="color:black;"> ${feFundInfoDto.fund_member } </span></li>
		</ul>
		<ul class="ul2 all-b list-group">
			<li class="list-group-item">单位净值：<span>${feFundInfoDto.nav }</span>
			</li>
			<li class="list-group-item">累计净值：<span>${feFundInfoDto.added_nav }</span>
			</li>
			<li class="list-group-item">统计日期：<span id="statistic_date">${feFundInfoDto.statistic_date }</span>
			</li>
			<li class="list-group-item">今年以来收益率：<span>${feFundInfoDto.year_return }%</span>
			</li>
			<li class="list-group-item">成立以来收益率：<span>${feFundInfoDto.total_return }%</span>
			</li>
			<li class="list-group-item">基金状态：<span>${feFundInfoDto.fund_status }</span>
			</li>
			<li class="list-group-item">成立日期：<span id="foundation_date">${feFundInfoDto.foundation_date }</span>
			</li>
			<li class="list-group-item"
				style="width:235px;margin-left:-15px;border-top:1px solid #CCC;border-bottom:1px solid #CCC;">
				<%-- <shiro:hasRole name="adminUser"> --%>
				<button type="button" style="" id="generateReport" class="btn btn-block full-width" data-toggle="modal" data-target="#reportModal">一键生成报告</button>
				<%-- </shiro:hasRole> --%>
			</li>
		</ul>
		<br>
		<ul class="ul3 list-group">
			<li class="list-group-item active" data-id="0">
				<div style="margin-bottom: 5px;">
					<img src="${ctxResources}/images/ul4_1a.png" class="a"><img
						src="${ctxResources}/images/ul4_1b.png" class="b"> <span>基本信息</span>
				</div>
			</li>
			<li class="list-group-item" data-id="1" id="netli">
				<div>
					<img src="${ctxResources}/images/ul4_2a.png" class="a"> <img
						src="${ctxResources}/images/ul4_2b.png" class="b"> <span>净值分析</span>
				</div>
			</li>
			<li class="list-group-item" data-id="2">
				<div>
					<img src="${ctxResources}/images/ul4_3a.png" class="a"> <img
						src="${ctxResources}/images/ul4_3b.png" class="b"> <span>业绩分析</span>
				</div>
			</li>
			<li class="list-group-item" data-id="3">
				<div>
					<img src="${ctxResources}/images/ul4_4a.png" class="a"> <img
						src="${ctxResources}/images/ul4_4b.png" class="b"> <span>持仓分析</span>
				</div>
			</li>
			<li class="list-group-item" data-id="4">
				<div>
					<img src="${ctxResources}/images/ul4_1a.png" class="a"> <img
						src="${ctxResources}/images/ul4_1b.png" class="b"> <span>归因分析</span>
				</div>
			</li>
		</ul>
	</div>
	<!-- 左侧部分结束-->
	<!-- 右侧部分开始 -->
	<div class="fof-right">
		<div id="main-content"></div>
	</div>
	<%@ include file="/WEB-INF/views/system/modal.jsp"%>
	<!-- 右侧部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'base/productDetail' ]);
	</script>
</body>
</html>