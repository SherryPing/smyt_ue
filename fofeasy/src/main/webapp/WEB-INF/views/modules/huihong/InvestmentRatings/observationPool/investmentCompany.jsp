<%-- 尽调状态未开始，投顾公司 --%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>添加投顾</title>
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
	<section class="fof-content">
		<input type="hidden" id="org_id_init" value="${fundId}">
		<div class="hh-Title1">
			<span>投顾公司信息</span>
		</div>
		<div class="outerDiv companyInfo" id="basicInfo">
			<form id="november" class="firTable" name="november">
				<table id="basicTbl1">
					<tbody>
						<tr>
							<td>私募管理人名称：<input type="text" name="org_name"></td>
						</tr>
						<tr>
							<td>协会备案编号：<input type="text" name="reg_code"></td>
						</tr>
						<tr>
							<td>机构备案日期：<input type="text" name="reg_time"></td>
						</tr>
						<tr>
							<td>机构成立日期：<input type="text" name="found_date"></td>
						</tr>
						<tr>
							<td>注册资本(万元)：<input type="text" name="reg_capital"></td>
						</tr>
						<tr>
							<td>管理规模：<input type="text" name="asset_scale_mtd"></td>
						</tr>
						<tr>
							<td>已发行的产品数量：<input type="text" name="issued_funds_num"></td>
						</tr>
						<tr>
							<td>主要策略：<input type="text" name="org_strategy"></td>
						</tr>
						<tr>
							<td>推荐机构：<input type="text" name="recommend_org"></td>
						</tr>
					</tbody>
				</table>
				<table id="basicTbl2">
					<tbody>
						<tr>
							<td>机构全称：<input type="text" name="org_full_name"></td>
						</tr>
						<tr>
							<td>是否具备投顾资格：<input type="text" name="is_qualified"></td>
						</tr>
						<tr>
							<td>办公地址：<input type="text" name="office_address"></td>
						</tr>
						<tr>
							<td>联系人：<input type="text" name="linkman"></td>
						</tr>
						<tr>
							<td>联系人职务：<input type="text" name="linkman_title"></td>
						</tr>
						<tr>
							<td>联系人电话号码：<input type="text" name="linkman_phone"></td>
						</tr>
						<tr>
							<td>联系人邮箱：<input type="text" name="linkman_email"></td>
						</tr>
						<tr>
							<td>投顾风格：<input type="text" name="invest_style"></td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
		<div class="hh-Title1 distanceTop40">
			<span>原始资料</span>
		</div>
		<div id="tab_14" class="sourFile outerDiv distanceTop20"></div>
	</section>
	<!-- 右侧部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require(['huihong/InvestmentRatings/observationPool/investmentCompany']);
	</script>
</body>

</html>