<!-- 
			easy2.0产品详情（主页）.jsp
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
	<section class="fof-content" style="margin-top:120px;">
		<input type="hidden" id="fundId" value="${fundId }"/>
		<input type="hidden" id="freqInput" value=""/>
		<input type="hidden" id="portfolio_type" value=""/>
		<div id="prcInfo">
			<div class="detail_top">
				<div class="head">
					<div style="height: 82%;">
						<%--<img id='collectImg' class="easy2Starimg" src="${ctxResources}/images/easy2Star1.png" style="width: 20px;height: 20px;">--%>
					</div>
					<div>
						<div class="fund_name">
							<span data-toggle="popover" data-placement="top" data-trigger="hover"  data-content=""  data-id="${fundId }" data-name="${feFundInfoDto.fund_name}" id="fund_name"></span>
						</div>
						<div>
							<span id="Policy" class="tip" style="background:#8babba;"></span>
						</div>
					</div>
					<div>
						<button class="easy3btn_blue" data-toggle="modal" data-target="#mainModal">一键导出报告</button>
						<%--<button id="addConprc" class="easy3btn_gold">添加对比</button>--%>
					</div>
				</div>
				<div class="main" style=" margin-top: 20px;">
					<div style="flex: 3;">
						<div class="main_con">
							<div class="card flex-left">
								<div><span id="freq"></span></div>
								<div>披露频率</div>
							</div>
							<div class="card">
								<div><span id="nav_date"></span></div>
								<div>净值日期</div>
							</div>
							<div class="card">
								<div><span id="netNav"></span></div>
								<div>单位净值</div>
							</div>
							<div class="card">
								<div><span id="year_return"></span></div>
								<div>今年以来收益率</div>
							</div>
							<div class="card">
								<div><span id="total_return"></span></div>
								<div>成立以来收益率</div>
							</div>
							<div class="card">
								<div><span id="foundation_date"></span></div>
								<div>成立日期</div>
							</div>
						</div>
					</div>
					<div>
						<div class="main_con border_none">
							<div class="card2" style="margin-top: 2px;"  id="model" data-toggle="popover" data-placement="top" data-content="" data-trigger="hover">
								<div>配置模型：<a id="modalStyle" data-toggle="popover" data-placement="top" data-trigger="hover"  data-content=""></a></div>
								<div>
									既定目标：<span id="target" data-trigger="hover" data-container="body" data-toggle="popover" data-placement="top" data-content="" style="color:black;">
								</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="Menu" class="detail-menu">
				<ul id="menuUl">
					<li class="active"><a href="#">业绩指标</a></li>
					<li><a href="javascript:void(0)">持仓分析</a></li>
					<li><a href="javascript:void(0)">情景分析</a></li>
					<%--<li><a href="javascript:void(0)">组合调仓</a></li>--%>
				</ul>
			</div>
			<%--<div id="projectLogo"><span id="Policy">FOF</span><a id='reg_code'></a></div>--%>
			<%--<table id="prcInfo1">--%>
				<%--<tr>--%>
					<%--<td>--%>
						<%--<div><img id='collectIMG' class="easy2Starimg" src="${ctxResources}/images/my-collection.png"><span style="color:black;" data-id="${fundId }"--%>
	<%--data-name="${feFundInfoDto.fund_name }" id="fund_name"></span><button id="addConprc" class="easy1Btn">添加对比</button></div>--%>
						<%--<div>--%>
							<%--&lt;%&ndash; <img class="easy2Starimg" src="${ctxResources}/images/my-collection.png"><a style="color:black;" href="#">投资顾问：<span id="org_name"></span> &ndash;%&gt;--%>
							<%--</a>--%>
							<%--<button class="easy1Btn" data-toggle="modal" data-target="#mainModal">生成报告</button></div>--%>

					<%--</td>--%>
					<%--<td>--%>
						<%--<div class="prcTitle">单位净值</div>--%>
						<%--<div><span id="netNav"></span></div>--%>
					<%--</td>--%>
					<%--<td>--%>
						<%--<div class="prcTitle">披露频率</div>--%>
						<%--<div><span id="freq"></span></div>--%>
					<%--</td>--%>
					<%--<td>--%>
						<%--<div class="prcTitle">净值日期</div>--%>
						<%--<div><span id="nav_date"></span></div>--%>
					<%--</td>--%>
					<%--<td>--%>
						<%--<div class="prcTitle monthly_frequency">--%>
							<%--<label>今年以来收益率</label>--%>
							<%--</div>--%>
						<%--<div><span id="year_return" ></span></div>--%>
					<%--</td>--%>
					<%--<td>--%>
						<%--<div class="prcTitle monthly_frequency">--%>
						<%--<label>成立以来收益率</label>--%>
						<%--</div>--%>
						<%--<div><span id="total_return"></span></div>--%>
					<%--</td>--%>
					<%--<td>--%>
						<%--<div class="prcTitle">基金状态</div>--%>
						<%--<div><span id="fundStatu"></span></div>--%>
					<%--</td>--%>
					<%--<td>--%>
						<%--<div class="prcTitle">成立日期</div>--%>
						<%--<div><span id="foundation_date"></span></div>--%>
					<%--</td>--%>
				<%--</tr>--%>
			<%--</table>--%>
			<%--<div id="Menu" class="Menu">--%>
				<%--<span class="menuBackground" id="menuBackground"></span>--%>
				<%--<ul id="menuUl">--%>
					<%--<li><a href="#"><img id="menuImg1" src="${ctxResources}/images/Combination1-2.png"></a></li>--%>
					<%--<li><a href="#"><img id="menuImg2" src="${ctxResources}/images/Combination2-1.png"></a></li>--%>
					<%--<li><a href="#"><img id="menuImg3" src="${ctxResources}/images/Combination3-1.png"></a></li>--%>
				<%--</ul>--%>
			<%--</div>--%>
		</div>
			<div id="main-content"></div>
	</section>
	<%@ include file="/WEB-INF/views/system/modal.jsp"%>
	<!-- 内容部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'easy2/combiningConfigurations/detail/detail' ]);
	</script>
</body>
</html>