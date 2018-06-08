<!-- 行业数据.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>行业数据</title>
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
	<section id="comConfig" class="fof-content">
		<div class="row">
			<div class="col-md-12 pad_left0">
				<ul id="labUl" class="labelUl">
					<li class="industryDatatab Active"><span>私募云通指数</span></li>
					<li class="industryDatatab"><span>全市场指数</span></li>
				</ul>
				<!-- 私募云通指数 -->
				<div class="industryDatadiv earningDiv distanceTop20">
					<div class="table-responsive">
						<table class="table ulTable" id="industrymainTbl">
							<tr>
								<td><img src="${ctxResources}/images/check01.png"><span
									class="ultitleTxt2">Benchmark：</span></td>
								<td colspan="2"><button id="hs300"
										class="checkboxBtn checkboxBtnshort checkboxActive"
										name="disMethod">沪深300</button>
									<button id="csi500" class="checkboxBtn checkboxBtnshort"
										name="disMethod">中证500</button>
									<button id="sse50" class="checkboxBtn checkboxBtnshort"
										name="disMethod">上证50</button>
									<button id="cbi" class="checkboxBtn checkboxBtnshort"
										name="disMethod">中债指数</button>
									<button id="nfi" class="checkboxBtn checkboxBtnshort"
										name="disMethod">南华期货指数</button></td>
							</tr>
							<tr>
								<td><img src="${ctxResources}/images/check01.png"> <span
									class="ultitleTxt2">私募云通指数：</span></td>
								<td colspan="2">
									<button id="FI01"
										class="checkboxBtn checkboxBtnlong checkboxActive"
										name="disMethod">私募全市场指数</button>
									<button id="FI03" class="checkboxBtn checkboxBtnlong checkboxActive"
										name="disMethod">私募fof指数</button>
									<button id="FI04" class="checkboxBtn checkboxBtnlong"
										name="disMethod">股票多头策略指数</button>
									<button id="FI05" class="checkboxBtn checkboxBtnlong"
										name="disMethod">股票多空策略指数</button>
									<button id="FI06" class="checkboxBtn checkboxBtnlong"
										name="disMethod">市场中性策略指数</button>
									<button id="FI07" class="checkboxBtn checkboxBtnlong"
										name="disMethod">债券策略指数</button>
									<button id="FI08" class="checkboxBtn checkboxBtnlong"
										name="disMethod">管理期货策略指数</button>
									<button id="FI09" class="checkboxBtn checkboxBtnlong"
										name="disMethod">宏观策略指数</button>
									<button id="FI10" class="checkboxBtn checkboxBtnlong"
										name="disMethod">事件驱动策略指数</button>
									<button id="FI11" class="checkboxBtn checkboxBtnlong"
										name="disMethod">相对价值策略指数</button>
									<button id="FI12" class="checkboxBtn checkboxBtnlong"
										name="disMethod">多策略指数</button>
									<button id="FI13" class="checkboxBtn checkboxBtnlong"
										name="disMethod">组合投资策略指数</button>
								</td>
							</tr>
							<tr>
								<td colspan="3" style="width: 98%;">
									<button id="maindetermineBtn" class="easy2Btn">
										<span>确定</span>
									</button>
									<button id="mainemptyBtn" class="easy2Btn">
										<span>清空</span>
									</button>
								</td>
							</tr>
						</table>
					</div>
					<div class="infoTitle distanceTop20" style="margin-top:5px;margin-bottom:20px;">
						<div class="pull-right">
							<input class="Yield_date1 dateInp pull-left" placeholder="开始日期"
								name="date_start" readonly><span class="pull-left"
								style="margin:3px 20px;">至</span> <input
								class="Yield_date1 dateInp pull-left" placeholder="结束日期"
								name="date_end" readonly>
						</div>
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span>累计收益率</span>
						</div>
					</div>
					<div class="bigcharts border_none" id="yieldChart"
						style="height:400px;"></div>
					<div class="bigcharts border_none" style="margin-top:60px;">
						<table id="yieldTbl" class="mainTbl">
						</table>
					</div>
					<div class="infoTitle distanceTop10">
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span>指数相关性</span>
						</div>
					</div>
					<div class="col-md-12 distanceTop20" id="heatMapdiv">
						<div class="forceHeader pull-left">
							<div class="choice pull-left">
								<span class="choiceTitle" style="margin-top:5px;">关注指数:</span><select
									id="attentionIndex" class="form-control" style="display:inline-block;margin-left:20px;width:auto;">
									<option id="FI01">私募全市场指数</option>
									<option id="FI03">私募FOF指数</option>
									<option id="FI04">股票多头策略指数</option>
									<option id="FI05">股票多空策略指数</option>
									<option id="FI06">市场中性策略指数</option>
									<option id="FI07">债券基金指数</option>
									<option id="FI08">管理期货策略指数</option>
									<option id="FI09">宏观策略指数</option>
									<option id="FI10">事件驱动策略指数</option>
									<option id="FI11">相对价值策略指数</option>
									<option id="FI12">多策略指数</option>
									<option id="FI13">组合投资策略指数</option>
								</select>
							</div>
							<div class="choice pull-left">
								<span class="choiceTitle" style="margin-top:5px;">Benchmark:</span>
								<div class="choiceContent">
										<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort checkboxActive" data-id="hs300">沪深300</button>
										<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort checkboxActive" data-id="csi500">中证500</button>
										<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort checkboxActive" data-id="sse50">上证50</button>
										<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort checkboxActive" data-id="cbi">中债指数</button>
										<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort checkboxActive" data-id="nfi">南华商品</button>
							
								</div>
							</div>
							<div class="choice pull-left">
										<div class="choiceTitle">
											<span>策略指数:</span>
										</div>
										<div class="choiceContent" id="strategyIndexdiv">
											<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort" data-id="FI01">私募全市场</button>
											<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort" data-id="FI03">私募FOF</button>
											<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort" data-id="FI04">股票多头策略</button>
											<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort" data-id="FI05">股票多空策略</button>
											<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort" data-id="FI06">市场中性策略</button>
											<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort" data-id="FI07">债券基金</button>
											<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort" data-id="FI08">管理期货策略</button>
											<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort" data-id="FI09">宏观策略</button>
											<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort" data-id="FI10">事件驱动策略</button>
											<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort" data-id="FI11">相对价值策略</button>
											<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort" data-id="FI12">多策略指数</button>
											<button type="button" name="benchmark" class="checkboxBtn checkboxBtnshort" data-id="FI13">组合策略指数</button>
										</div>
									</div>
						</div>
						<div class="bigCharts border_none" id="correlationchart" style="width:100%;"></div>
					</div>
					<div class="col-md-12 distanceTop20">
						<div class="forceHeader">
							<div class="choice">
								<div class="choiceTitle top5">
									<span>统计区间：</span>
								</div>
								<div id="Frequency" class="choiceContent"
									style="margin-left:0px;">
									<ul class="freSlcul" style="margin-left:20px;float:left;">
										<li><button id="m6" class="slcliBtn">6M</button></li>
										<li><button id="y1" class="slcliBtn slcliBtnactiv">1Y</button></li>
										<li><button id="y2" class="slcliBtn">2Y</button></li>
										<li><input style="text-align: right;" class="form_date"
											size="16" type="text" value="" placeholder="开始日期" readonly>&nbsp;--&nbsp;
											<input class="form_date" size="16" type="text" value=""
											placeholder="截止日期" readonly></li>
									</ul>
								</div>
							</div>
						</div>
						<div class="schartContent" id="correlationTbldiv"
									style="padding-top:20px;height: 300px;width: 100%;">
									<%--<div class="chartsTbldiv">--%>
										<%--<div id="left_titlediv2" class="left_titlediv2"></div>--%>
										<%--<table class="chartsTbl2">--%>
											<%--<thead id="correlationTblhead"></thead>--%>
											<%--<tbody id="correlationTblbody"></tbody>--%>
										<%--</table>--%>
									<%--</div>--%>
								</div>
					</div>
				</div>
				<!-- 全市场指数 -->
				<div class="industryDatadiv earningDiv distanceTop20"
					style="display:none;">
					
					<div class="infoTitle distanceTop0">
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span>私募全市场</span>
						</div>
					</div>
					<div class="Select">
						<div id="slider">
							<ul id="assetUl">
								<li>管理人数量</li>
								<li>基金产品数量</li>
								<li>管理基金规模</li>
								<li class="histolineActive"></li>
							</ul>
						</div>
						<div id="asseLine"  style="width:330px;"></div>
					</div>
					<div class="col-md-6 distanceTop20">
						<div class="smallCharts" style="width:100%;">
							<div class="charHeader">
								<div class="headerLeft">
									<div class="charHeadpil"></div>
									<span id="title1" class="charHeadtxt">历年私募基金管理人数量</span>
								</div>
							</div>
							<div class="smallCharts2 height240 border_none" id="allmarkYear">
							</div>
						</div>
					</div>
					<div class="col-md-6 distanceTop20 pad_right0">
						<div class="smallCharts" style="width:100%;">
							<div class="charHeader">
								<div class="headerLeft">
									<div class="charHeadpil"></div>
									<span class="charHeadtxt"><span id="years">2018</span><span id="title2">年私募基金管理人数量</span></span>
								</div>
								<div class="headerRight">
									<select id="select1">
									</select>
								</div>
							</div>
							<div id="allmarkMonth" class="smallCharts2 height240 border_none">
							</div>
						</div>
					</div>
					<div class="infoTitle distanceTop20">
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span>产品收益</span>
						</div>
					</div>
					<div class="col-md-6 distanceTop20">
						<div class="smallCharts" style="width:100%;">
							<div class="charHeader">
								<div class="headerLeft">
									<div class="charHeadpil"></div>
									<span class="charHeadtxt">全市场收益率</span>
								</div>
							</div>
							<div id="allmarkProduct1"
								class="smallCharts2 height240 border_none"></div>
						</div>
					</div>
					<div class="col-md-6 distanceTop20 pad_right0">
						<div class="smallCharts" style="width:100%;">
							<div class="charHeader">
								<div class="headerLeft">
									<div class="charHeadpil"></div>
									<span class="charHeadtxt">全市场月度收益率</span>
								</div>
								<div class="headerRight">
									<select id="select3">
									</select>
								</div>
							</div>
							<div id="allmarkProduct2"
								class="smallCharts2 height240 border_none"></div>
						</div>
					</div>
					<div class="col-md-6 distanceTop20">
						<div class="smallCharts" style="width:100%;">
							<div class="charHeader">
								<div class="headerLeft">
									<div class="charHeadpil"></div>
									<span class="charHeadtxt">策略指数月度收益率</span>
								</div>
								<div class="headerRight">
									<select id="select4">
									</select>
								</div>
							</div>
							<div id="allmarkProduct3"
								class="smallCharts2 height240 border_none"></div>
						</div>
					</div>
					<div class="col-md-6 distanceTop20 pad_right0">
						<div class="smallCharts" style="width:100%;">
							<div class="charHeader">
								<div class="headerLeft">
									<div class="charHeadpil"></div>
									<span class="charHeadtxt">策略指数近六月夏普比</span>
								</div>
								<div class="headerRight">
									<select id="select5">
									</select>
								</div>
							</div>
							<div id="allmarkProduct4"
								class="smallCharts2 height240 border_none"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- 头部分结束 -->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'easy2/IndustryData/IndustryDataindex' ]);
	</script>
</body>
</html>