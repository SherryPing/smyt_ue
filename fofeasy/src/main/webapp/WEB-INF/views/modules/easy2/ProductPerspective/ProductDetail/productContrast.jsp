<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>产品对比</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
<link rel="stylesheet"
	href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />
</head>
<body>
	<!-- 头部分开始 -->
	<a id="november1"></a>
	<%@ include file="/WEB-INF/views/system/header.jsp"%>
	<!-- 头部分结束 -->
	<!-- 内容部分开始 -->
		<section id="prcContrast" class="fof-content">
			<div class="row">
				<div class="col-md-12">
					<ul id="labUl" class="labelUl">
						<li class="Active"><span>产品对比</span></li>
					</ul>
					<!-- 基本信息 -->
					<div class="table-responsive pull-left distanceTop20" style="width: 100%;">
						<table id="conBasicinfo" class="contrastTbl dataTable">
						</table>
					</div>
					<!-- 业绩指标 -->
					<div  id="contrastIndicators" class="pull-left">
						<a id="november2"></a>
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span class="pull-left">累计收益率</span>
							</div>
						</div>
						<div class="netCharts">
							<div class="charHeader">   
									<div class="headerRight">
										<input class="dateInp cdata pull-left" placeholder="开始日期"name="date_start" id="yield_date_start"readonly>
										<span>至</span>
										<input class="dateInp cdata pull-left" style="margin-right:20px;" placeholder="结束日期" name="date_end" id="yield_date_end" readonly>
										<button class="easy1Btn" id="netDate" style="">确定</button>
									</div>
							</div>
							<div id="netCharts">
							</div>
						</div>
						<div class="reportIndicators">
							<div class="pull-left" id="totalDiv">
								<span>统计区间：</span>
								<button class="selectBtn personBtnactiv" id="total">成立以来</button>
								<button class="selectBtn" id="year">今年以来</button>
							</div>
							<!-- <div class="pull-left contrastDatediv">
								<input class="dateInp cdata pull-left" placeholder="开始日期"name="foundation_date_start" id="other_date_start"readonly>
										<span class="pull-left" style="margin:0 10px;margin-top:5px;">至</span>
										<input class="dateInp cdata pull-left" placeholder="结束日期" name="foundation_date_end" id="other_date_end" readonly>
										<button class="easy1Btn" id="otherDate" style="margin-left:10px;">确定</button>
							</div> -->
							<div class="pull-right" style="margin-top:5px;">
								<span>统计日期：</span>
								<span id="statisticsDate"></span>
							</div>
							<div class="pull-right" style="margin-right:30px;">
								<span class="frequencyTxt">频率：</span>
								<div class="netFrequency frequencyActive" data-freq='m'>月</div>
							</div>
							
						</div>
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span class="pull-left">同类排名</span>
							</div>
						</div>
						<div class="col-md-5 distanceTop20" style="padding-left: 0px;">
							<table class="indicatorsTbl dataTable" id="similarRankingsTab">
								
							</table>
						</div>
						<div class="col-md-7 distanceTop20 smallCharts">
							<div class="charHeader">
									<div class="headerLeft">
										<div class="charHeadpil"></div>
										<span class="charHeadtxt">战胜同策略基金比例</span>
									</div>
								</div>
							<div id="similarRankingsCharts" class="schartContent"></div>
						</div>
							
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span class="pull-left">收益指标</span>
							</div>
						</div>
						<div class="col-md-5 distanceTop20">
							<div class="smallCharts2">
								<div class="charHeader">
									<div class="headerLeft">
										<div class="charHeadpil"></div>
										<span class="charHeadtxt">正负收益周比</span>
									</div>
								</div>
								<div class="schartContent" id="negativeCharts">

								</div>
							</div>
						</div>
						<div class="col-md-7 distanceTop20 smallCharts">
							<div class="charHeader">
								<div class="headerLeft">
									<div class="charHeadpil"></div>
									<span class="charHeadtxt">累计收益率&年化收益率</span>
								</div>
								<div class="schartContent" id="rateindicatorsCharts">

								</div>
							</div>
						</div>
						<!-- 风险指标 -->
						<div  class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span class="pull-left">风险指标</span>
							</div>
						</div>
						<!-- 风险指标表 -->
						<div class="col-md-12 distanceTop20">
							<table class="indicatorsTbl dataTable" id="riskIndicatorstbl">
								
							</table>
								<!-- 柱状图 -->
								<div class="schartContent distanceTop20 charBorder" id="riskIndicatorsCharts">
								</div>
								<!-- 面积图 -->
								<div class="bigCharts distanceTop20 charBorder">
									<div class="charHeader">
										<div class="headerLeft">
											<div class="charHeadpil"></div>
											<span class="charHeadtxt">动态回撤</span>
										</div>
										<div class="headerRight">
											<input class="dateInp cdata pull-left" placeholder="开始日期"name="date_start" id="Retreat_date_start"readonly>
											<span>至</span>
											<input class="dateInp cdata pull-left" placeholder="结束日期" name="date_end" id="Retreat_date_end" readonly>
									</div>
									</div>
									<div class="schartContent" style="height: 360px;" id="dynamicRetreatCharts">
									</div>
								</div>
						</div>
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span class="pull-left">风险调整收益指标</span>
							</div>
						</div>
						<div class="col-md-5 distanceTop20">
							<table class="indicatorsTbl dataTable" id="adjustIncomeTbl">
								
							</table>
						</div>
						<div class="col-md-7 distanceTop20 smallCharts" id="adjustIncomeChart">
							
						</div>
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span class="pull-left">相对指标</span>
							</div>
						</div>
						<div class="col-md-12 distanceTop20">
							<table class="indicatorsTbl dataTable" id="relativeIndexTbl">
							</table>
						</div>
						<div class="col-md-12 distanceTop20">
							<div class="schartContent" id="relativeIndexCharts"></div>
						</div>
					</div>
					<!-- 归因分析 -->
					<div  id="contrastAttribution" style="width: 100%;" class="pull-left">
						<a id="november3"></a>
						<div class="col-md-6">
								<div class="infoTitle">
									<div class="introducTitle"></div>
									<div class="titleTxt">
										<span class="pull-left">收益贡献对比</span>
									</div>
								</div>
								<div class="schartContent distanceTop20" style="height:300px;" id="revenueDecomposition">
									
								</div>
						</div>
						<div class="col-md-6">
								<div class="infoTitle">
									<div class="introducTitle"></div>
									<div class="titleTxt">
										<span class="pull-left">风险贡献对比</span>
									</div>
								</div>
								<div class="schartContent distanceTop20" style="height:300px;" id="revenueDecomposition1">
									
								</div>
						</div>
						<div id="Rmind" class="reportIndicators">
						</div>
					</div>
					<!-- 情景分析 -->
					<div id="contrastScene" class="pull-left" style="width: 100%;">
								<a id="november4"></a>
								<div class="infoTitle">
									<div class="introducTitle"></div>
									<div class="titleTxt">
										<span>压力测试</span>
									</div>
								</div>
							<div class="col-md-5 distanceTop20">
							<table class="indicatorsTbl dataTable" id="event-main-table" style="height:240px;">
								
							</table>
						</div>
						<div class="col-md-7 distanceTop20" style="height:240px;" id="earningStatistic1">
							
						</div>
						<div class="col-md-12 distanceTop20" style="font-size:16px;">
						注："--"表示该产品在日期范围内无净值数据
					</div>
					<div class="infoTitle" style="margin-bottom:20px;">
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span>市道分析</span>
						</div>
					</div>
					<table class="mainTbl marketAnalysistbl" id="market-main-table" style="width: 100%;border:1px solid #ddd;">
					</table>
					<div class="indicatorsContent">
							<!-- 收益指标大的charts图 -->
							<div class="bigCharts distanceTop0" id="incomeScharts" style="height: 360px;">
								<div class="charHeader">
									<div class="headerLeft">
										<div class="charHeadpil"></div>
										<span class="charHeadtxt">收益统计</span>
									</div>
									<div class="schartContent" id="earningStatistic2" style="height: 320px;">
									</div>
								</div>
							</div>
						</div>
				</div>
			</div>
					</div>
		<div id="navBar">
			<div class="line">
			</div>
			<div class="barMenu">
				<div class="Module">
					<div class="navPoint bartActive">
					</div>
					<div class="navTxtdiv">
						<a id="clickMenu1" class="navTxt barbActive">基本信息</a>
					</div>
				</div>
				<div class="Module">
					<div class="navPoint">
					</div>
					<div class="navTxtdiv">
						<a id="clickMenu2" class="navTxt">业绩指标</a>
					</div>
				</div>
				<div class="Module">
					<div class="navPoint">
					</div>
					<div class="navTxtdiv">
						<a id="clickMenu3" class="navTxt">归因分析</a>
					</div>
				</div>
				<div class="Module">
					<div class="navPoint">
					</div>
					<div class="navTxtdiv">
						<a id="clickMenu4" class="navTxt">情景分析</a>
					</div>
				</div>
			</div>
		</div>
		<div class="confirmPrcdiv">
			<button id="favoritesReport">收藏对比报告</button>
			<button id="downloadReport">下载对比报告</button>
		</div>
		<!-- 添加新的产品对比 -->
		<div class="modal fade" id="addPrc" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="margin-top: 5%;width: 80%;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							对比产品添加
						</h4>
					</div>
					<div class="modal-body" style="padding: 20px;">
					<table class="table ulTable">
						<tr>
							<td><img src="${ctxResources}/images/check00.png"><span
								class="ultitleTxt">关键字：</span></td>
							<td colspan="2">
								<div id="maintblSearch" class="maintblSearch">
									<select id="search_choice_id" class="searchChoice">
										<option>基金产品</option>
										<option>投资顾问</option>
										<option>投资经理</option>
									</select> <input id="keywordSearch" type="text" name="keywordSearch"
										class="searchInp">
								</div>
							</td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check01.png"> <span
								class="ultitleTxt">统计区间：</span></td>
							<td colspan="2"><span id="total"
								class="selectTime choiceTime" style="margin-left: 10px;">成立以来</span>
								<span id="year" class="selectTime">今年以来</span> <span id="m3"
								class="selectTime">近三月</span> <span id="m6" class="selectTime">近六月</span>
								<span id="y1" class="selectTime">近一年</span> <span id="y3"
								class="selectTime">近三年</span> <span id="y5" class="selectTime">近五年</span>
							</td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check01.png"> <span
								class="ultitleTxt">净值日期：</span></td>
							<td colspan="2"><span class="layui-input-inline"><input
									class="dateInp cdata" id="netInpleft" placeholder="开始日期"
									name="date_start1" readonly> </span><span
								style="margin:0 20px;">至</span><span class="layui-input-inline">
									<input class="dateInp cdata" id="netInpright"
									placeholder="结束日期" name="date_end1" readonly>
							</span></td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check02.png"> <span
								class="ultitleTxt">业绩指标：</span></td>
							<td colspan="2">
								<div class="indicatorsRange">
									<span class="indicatorsTitle">年化收益：</span> <input
										id="yearLowinp" class="percentInp" type="number" name="">
									% <span class="percentHr">至</span> <input id="yearHighinp"
										class="percentInp" type="number" name=""> %
								</div>
								<div class="indicatorsRange">
									<span class="indicatorsTitle">最大回撤：</span> <input
										id="withdrawalLow" class="percentInp" type="number" name="">
									% <span class="percentHr">至</span> <input id="withdrawalHigh"
										class="percentInp" type="number" name=""> %
								</div>
								<div class="indicatorsRange">
									<span class="indicatorsTitle" style="width:90px;">年化波动率：</span>
									<input id="fluctuationsLow" class="percentInp" type="number"
										name=""> % <span class="percentHr">至</span> <input
										id="fluctuationsHigh" class="percentInp" type="number" name="">
									%
								</div>
								<div class="indicatorsRange">
									<span class="indicatorsTitle" style="width:90px;">年化夏普比：</span>
									<input id="sharpThanLow" class="percentInp" type="number"
										name=""> <span class="percentHr">至</span> <input
										id="sharpThanHigh" class="percentInp" type="number" name="">
								</div>
							</td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check04.png"> <span
								class="ultitleTxt">发行方式：</span></td>
							<td><span class="openEnded endActiv">不限</span></td>
							<td id="releaseMode" class="ulContent">
								<button id="60402" class="checkboxBtn checkboxBtnshort"
									name="disMethod">自主发行</button>
								<button id="60404" class="checkboxBtn checkboxBtnshort"
									name="disMethod">券商资管</button>
								<button id="60405" class="checkboxBtn checkboxBtnshort"
									name="disMethod">期货资管</button>
								<button id="60401" class="checkboxBtn checkboxBtnshort"
									name="disMethod">信托计划</button>
								<button id="60403" class="checkboxBtn checkboxBtnlong"
									name="disMethod">公募专户及子公司管理计划</button>
								<button id="60406" class="checkboxBtn checkboxBtnlong"
									name="disMethod">保险公司及子公司管理计划</button>
								<button id="60408" class="checkboxBtn checkboxBtnshort"
									name="disMethod">有限合伙</button>
								<button id="60409" class="checkboxBtn checkboxBtnshort"
									name="disMethod">单账户</button>
								<button id="60407" class="checkboxBtn checkboxBtnshort"
									name="disMethod">海外基金</button>
								<button id="60410" class="checkboxBtn checkboxBtnshort"
									name="disMethod">其他</button>
							</td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check05.png"> <span
								class="ultitleTxt">投资标的：</span></td>
							<td><span class="openEnded endActiv">不限</span></td>
							<td id="investmentTarget" class="ulContent">
								<button id="60301" class="checkboxBtn checkboxBtnshort"
									name="disMethod">股票</button>
								<button id="60303" class="checkboxBtn checkboxBtnlong"
									name="disMethod">债券等固定收益</button>
								<button id="60307" class="checkboxBtn checkboxBtnshort"
									name="disMethod">货币型</button>
								<button id="60302" class="checkboxBtn checkboxBtnshort"
									name="disMethod">期货</button>
								<button id="60304" class="checkboxBtn checkboxBtnshort"
									name="disMethod">期权</button>
								<button id="60308" class="checkboxBtn checkboxBtnshort"
									name="disMethod">指数型</button>
								<button id="60311" class="checkboxBtn checkboxBtnshort"
									name="disMethod">混合型</button>
								<button id="60309" class="checkboxBtn checkboxBtnshort"
									name="disMethod">股权</button>
								<button id="60310" class="checkboxBtn checkboxBtnshort"
									name="disMethod">新三板</button>
								<button id="60306" class="checkboxBtn checkboxBtnshort"
									name="disMethod">海外资产</button>
								<button id="60312" class="checkboxBtn checkboxBtnshort"
									name="disMethod">其他</button>
							</td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check06.png"> <span
								class="ultitleTxt">投资策略：</span></td>
							<td><span id="secMulslebtn" class="openEnded endActiv">不限</span></td>
							<td colspan="2" class="ulContent" id="investmentStrategy">
								<button id="60101" class="checkboxBtn checkboxBtnshort"
									name="disMethod">股票策略</button>
								<button id="60102" class="checkboxBtn checkboxBtnshort"
									name="disMethod">管理期货</button>
								<button id="60103" class="checkboxBtn checkboxBtnshort"
									name="disMethod">相对价值</button>
								<button id="60104" class="checkboxBtn checkboxBtnshort"
									name="disMethod">事件驱动</button> <img class="dropdownImg"
								id="dropdownImg" src="${ctxResources}/images/mainxiala.png">
								<button id="60105" class="checkboxBtn checkboxBtnshort"
									name="disMethod">债券策略</button>
								<button id="60106" class="checkboxBtn checkboxBtnshort"
									name="disMethod">宏观策略</button>
								<button id="60107" class="checkboxBtn checkboxBtnshort"
									name="disMethod">组合策略</button>
								<button id="60108" class="checkboxBtn checkboxBtnshort"
									name="disMethod">多策略</button>
								<button id="60109" class="checkboxBtn checkboxBtnlong"
									name="disMethod">其他一级策略</button>
							</td>
						</tr>
						<!-- 投资策略详情 -->
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="stockStrategy">
								<div class="detaiTitle">
									<span>股票策略：</span>
								</div>
								<div class="checkBlock">
									<input id="6010101" type="checkbox" name="secMulscn" disabled>
									<label for="6010101">股票多头</label>
								</div>
								<div class="checkBlock">
									<input id="6010102" type="checkbox" name="secMulscn" disabled>
									<label for="6010102">股票多空</label>
								</div>
								<div class="checkBlock">
									<input id="6010103" type="checkbox" name="secMulscn" disabled>
									<label for="6010103">市场中性</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="managingFutures">
								<div class="detaiTitle">
									<span>管理期货：</span>
								</div>
								<div class="checkBlock">
									<input id="6010201" type="checkbox" name="secMulscn" disabled>
									<label for="6010201">期货趋势策略</label>
								</div>
								<div class="checkBlock">
									<input id="6010202" type="checkbox" name="secMulscn" disabled>
									<label for="6010202">期货套利策略</label>
								</div>
								<div class="checkBlock">
									<input id="6010203" type="checkbox" name="secMulscn" disabled>
									<label for="6010203">其他管理期货策略</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="relativeValue">
								<div class="detaiTitle">
									<span>相对价值：</span>
								</div>
								<div class="checkBlock">
									<input id="6010301" type="checkbox" name="secMulscn" disabled>
									<label for="6010301">ETF套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010302" type="checkbox" name="secMulscn" disabled>
									<label for="6010302">可转债套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010303" type="checkbox" name="secMulscn" disabled>
									<label for="6010303">固定收益套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010304" type="checkbox" name="secMulscn" disabled>
									<label for="6010304">分级基金套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010305" type="checkbox" name="secMulscn" disabled>
									<label for="6010305">其他相对价值策略</label>
								</div>
								<div class="checkBlock">
									<input id="6010306" type="checkbox" name="secMulscn" disabled>
									<label for="6010306">期权套利</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="eventDriven">
								<div class="detaiTitle">
									<span>事件驱动：</span>
								</div>
								<div class="checkBlock">
									<input id="6010401" type="checkbox" name="secMulscn" disabled>
									<label for="6010401">并购重组</label>
								</div>
								<div class="checkBlock">
									<input id="6010402" type="checkbox" name="secMulscn" disabled>
									<label for="6010402">定向增发</label>
								</div>
								<div class="checkBlock">
									<input id="6010403" type="checkbox" name="secMulscn" disabled>
									<label for="6010403">大宗交易</label>
								</div>
								<div class="checkBlock">
									<input id="6010404" type="checkbox" name="secMulscn" disabled>
									<label for="6010404">其他事件驱动策略</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="combiningPolicy">
								<div class="detaiTitle">
									<span>组合策略：</span>
								</div>
								<div class="checkBlock">
									<input id="6010701" type="checkbox" name="secMulscn" disabled>
									<label for="6010701">MOM</label>
								</div>
								<div class="checkBlock">
									<input id="6010702" type="checkbox" name="secMulscn" disabled>
									<label for="6010702">FOF</label>
								</div>
								<div class="checkBlock">
									<input id="6010703" type="checkbox" name="secMulscn" disabled>
									<label for="6010703">TOT</label>
								</div>
								<div class="checkBlock">
									<input id="6010704" type="checkbox" name="secMulscn" disabled>
									<label for="6010704">其他组合策略</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="otherPolicy">
								<div class="detaiTitle">
									<span>其他一级策略：</span>
								</div>
								<div class="checkBlock">
									<input id="6010902" type="checkbox" name="secMulscn" disabled>
									<label for="6010902">新三板</label>
								</div>
								<div class="checkBlock">
									<input id="6010903" type="checkbox" name="secMulscn" disabled>
									<label for="6010903">海外基金</label>
								</div>
								<div class="checkBlock">
									<input id="6010904" type="checkbox" name="secMulscn" disabled>
									<label for="6010904">货币基金</label> <img id="pullupImg"
										src="${ctxResources}/images/mainshangla.png" alt="">
								</div>
								<div class="checkBlock">
									<input id="6010901" type="checkbox" name="secMulscn" disabled>
									<label for="6010901">其他二级策略</label>
								</div>
							</td>
						</tr>
						<!--投资策略详情结束  -->
						<tr>
							<td><img src="${ctxResources}/images/check07.png"> <span
								class="ultitleTxt">结构形式：</span></td>
							<td><span class="openEnded endActiv">不限</span></td>
							<td class="ulContent" id="structureForm">
								<button id="60202" class="checkboxBtn checkboxBtnshort"
									name="disMethod">结构化</button>
								<button id="60201" class="checkboxBtn checkboxBtnshort"
									name="disMethod">非结构化</button>
							</td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check08.png"> <span
								class="ultitleTxt">基金状态：</span></td>
							<td><span class="openEnded endActiv">不限</span></td>
							<td class="ulContent" id="fundStatus">
								<button id="运行中" class="checkboxBtn checkboxBtnshort"
									name="disMethod">运行中</button>
								<button id="终止" class="checkboxBtn checkboxBtnshort"
									name="disMethod">已清盘</button>
							</td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check09.png"> <span
								class="ultitleTxt">成立年限：</span></td>
							<td><span class="openEnded endActiv" id="establishedYears">不限</span></td>
							<td class="ulContent" id="foundationYears">
								<button id="1" class="checkboxBtn checkboxBtnshort"
									name="disMethod">1年以下</button>
								<button id="2" class="checkboxBtn checkboxBtnshort"
									name="disMethod">1-3年</button>
								<button id="3" class="checkboxBtn checkboxBtnshort"
									name="disMethod">3-5年</button>
								<button id="4" class="checkboxBtn checkboxBtnshort"
									name="disMethod">5年以上</button> <span style="margin-left: 30px;">自定义:</span>
								<span class="layui-input-inline" style="margin-left: 10px;">
									<input class="dateInp cdata" placeholder="开始日期"
									name="foundation_date_start" id="foundation_date_start"
									readonly>
							</span><span style="margin: 0 20px;">至</span><span
								class="layui-input-inline"> <input class="dateInp cdata"
									placeholder="结束日期" name="foundation_date_end"
									id="foundation_date_end" readonly>

							</span>
							</td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check10.png"> <span
								class="ultitleTxt">发行地区：</span></td>
							<td><span class="openEnded endActiv">不限</span></td>
							<td class="ulContent" id="region">
								<button id="上海" class="checkboxBtn checkboxBtnshort"
									name="disMethod">上海</button>
								<button id="广东" class="checkboxBtn checkboxBtnshort"
									name="disMethod">广东</button>
								<button id="深圳" class="checkboxBtn checkboxBtnshort"
									name="disMethod">深圳</button>
								<button id="北京" class="checkboxBtn checkboxBtnshort"
									name="disMethod">北京</button>
								<button id="其它" class="checkboxBtn checkboxBtnshort"
									name="disMethod">其它</button>
							</td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check11.png"> <span
								class="ultitleTxt">披露频率：</span></td>
							<td><span class="openEnded endActiv">不限</span></td>
							<td class="ulContent" id="data_freq">
								<button id="周度" class="checkboxBtn checkboxBtnshort"
									name="disMethod">周频</button>
								<button id="月度" class="checkboxBtn checkboxBtnshort"
									name="disMethod">月频</button>
								<button id="日度" class="checkboxBtn checkboxBtnshort"
									name="disMethod">日频</button>
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
					<div id="modalHasprc">
						<span>已选择对比产品:</span>
					</div>
					<table class="mainTbl" id="main-grid" data-toggle="main-grid"
						data-id-field="id" data-show-columns="true">
					</table>
					<input type="hidden" id="product_list" name="PID" value="01/01/70" />
				</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
	</section>
	<!-- 右侧部分结束-->
	<%@ include file="/WEB-INF/views/system/mainModal.jsp"%>
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
			require(['easy2/ProductPerspective/ProductDetail/productContrast']);
	</script>
</body>
</html>