<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">

<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>投顾对比</title>
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
					<li class="Active"><span>投顾对比</span></li>
				</ul>
				<!-- 运营能力 -->
				<div class="outerDiv" id="operationalCapacity">
					<div class="infoTitle">
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span class="pull-left">运营能力</span>
						</div>
					</div>
					<div class="table-responsive pull-left distanceTop20"
						style="width: 100%;">
						<table id="conBasicinfo" class="contrastTbl dataTable">
						</table>
					</div>
				</div>
				<!-- 盈利能力 -->
				<div class="outerDiv" id="Profitability">
					<a id="november2"></a>
					<div class="infoTitle">
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span class="pull-left">盈利能力</span>
						</div>
					</div>
					<div id="contrastIndicators" class="distanceTop20">
						
						<div class="col-md-5 distanceTop20">
							<div class="schartContent height360">
								<table class="indicatorsTbl dataTable height320"
									id="profitabilityTbl"></table>
							</div>
						</div>
						<div class="col-md-7 distanceTop20" style="padding-right:0px;">
							<div class="schartContent border height360">
								<div class="charHeader">
									<div class="headerSright">
										<select id='profitabilitySlc' class="form-control">
											<option id="return">累计收益率</option>
											<option id="return_a">年化收益率</option>
											<!-- <option id="">超额年化收益率</option> -->
											<option id="sharpe_a">年化夏普比</option>
											<option id="calmar_a">年化卡玛比率</option>
											<option id="sor_a">年化索提诺比率</option>
											<option id="tr_a">年化特雷诺比率</option>
											<option id="info_a">年化信息比率</option>
											<option id="jensen_a">年化詹森指数</option>
										</select>
									</div>
								</div>
								<div class="schartContent height280" id="profitabilityChart"></div>
							</div>
						</div>
					</div>
				</div>
				<!-- 风控能力 -->
				<div class="outerDiv">
					<a id="november3"></a>
					<div class="infoTitle">
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span class="pull-left">风控能力</span>
						</div>
					</div>
					<div id="contrastAttribution" style="width: 100%;"
						class="distanceTop20">
						
						<div class="col-md-5 distanceTop20">
							<div class="schartContent height360">
								<table class="indicatorsTbl dataTable height320" id="windcontrolTbl"></table>
							</div>
						</div>
						<div class="col-md-7 distanceTop20" style="padding-right:0px;">
							<div class="schartContent border height360">
								<div class="charHeader">
									<div class="headerSright">
										<select id='windcontrolSlc' class="form-control">
											<option id="dd_a">年化下行标准差</option>
											<option id="stdev_a">年化标准差</option>
											<option id="max_drawdown">最大回撤</option>
											<option id="mdd_time">最大回撤的形成期</option>
											<option id="">最大回撤的修复期</option>
											<option id="beta">贝塔系数</option>
											<option id="VaR">风险价值</option>
										</select>
									</div>
								</div>
								<div class="schartContent height280" id="windcontrolCharts"></div>
							</div>
						</div>
					</div>
				</div>
				<!-- 投研能力 -->
				<div class="outerDiv">
					<a id="november4"></a>
					<div class="infoTitle">
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span class="pull-left">投研能力</span>
						</div>
					</div>
					<div id="contrastScene" class="distanceTop20">
						
						<div class="col-md-5 distanceTop20">
							<div class="schartContent height320">
								<table class="indicatorsTbl dataTable height320" id="investmentTbl"></table>
							</div>
						</div>
						<div class="col-md-7 distanceTop20" style="padding-right:0px;">
							<div class="schartContent border height320">
								<div class="charHeader">
									<div class="headerSright">
										<select id='investmentSlc' class="form-control">
											<option id="s_time">择时能力</option>
											<option id="s_security">选股能力</option>
											<option id="persistence">超额收益率的可持续性</option>
											<option id="odds">胜率</option>
										</select>
									</div>
								</div>
								<div class="schartContent height240" id="investmentCharts"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="navBar">
			<div class="line"></div>
			<div class="barMenu">
				<div class="Module">
					<div class="navPoint bartActive"></div>
					<div class="navTxtdiv">
						<a id="clickMenu1" class="navTxt barbActive">运营能力</a>
					</div>
				</div>
				<div class="Module">
					<div class="navPoint"></div>
					<div class="navTxtdiv">
						<a id="clickMenu2" class="navTxt">盈利能力</a>
					</div>
				</div>
				<div class="Module">
					<div class="navPoint"></div>
					<div class="navTxtdiv">
						<a id="clickMenu3" class="navTxt">风控能力</a>
					</div>
				</div>
				<div class="Module">
					<div class="navPoint"></div>
					<div class="navTxtdiv">
						<a id="clickMenu4" class="navTxt">投研能力</a>
					</div>
				</div>
			</div>
		</div>
		<!-- 添加新的产品对比 -->
		<div class="modal fade" id="addPrc" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="margin-top: 5%;width: 80%;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">对比投顾添加</h4>
					</div>
					<div class="modal-body" style="padding: 20px 20px;">
						<table id="filterTbl" class="table ulTable">
							<tr>
								<td><img src="${ctxResources}/images/check00.png">&nbsp;&nbsp;&nbsp;&nbsp;<span
									class="ultitleTxt2">关键字：</span></td>
								<td colspan="2">
									<div id="maintblSearch" class="maintblSearch">
										<select id="search_choice_id" class="searchChoice">
											<option>投资顾问</option>
											<option>基金产品</option>
											<option>投资经理</option>
										</select> <input id="keywordSearch" type="text" name="keywordSearch"
											class="searchInp">
									</div>
								</td>
							</tr>
							<tr id="statisticalInterval">
								<td><img src="${ctxResources}/images/check01.png"> <span
									class="ultitleTxt2">统计区间：</span></td>
								<td colspan="2"><span id="total"
									class="selectTime choiceTime" style="margin-left: 10px;">成立以来</span>
									<span data-id="year" class="selectTime">今年以来</span> <span
									data-id="m3" class="selectTime">近三个月</span> <span data-id="m6"
									class="selectTime">近六个月</span> <span data-id="y1"
									class="selectTime">近一年</span> <span data-id="y3"
									class="selectTime">近三年</span> <span data-id="y5"
									class="selectTime">近五年</span> <!--  <span
									class="layui-input-inline" style="margin-left:20px;"><input
										class="form-control cdata" placeholder="开始日期"
										name="date_start1" readonly> </span><span
									style="margin:0 20px;">——</span><span class="layui-input-inline">
										<input class="form-control cdata" placeholder="结束日期"
										name="date_end1" readonly>
									</span> --></td>
							</tr>
							<tr>
								<td><img src="${ctxResources}/images/check02.png"> <span
									class="ultitleTxt2">业绩指标：</span></td>
								<td colspan="2">
									<div class="indicatorsRange">
										<span class="indicatorsTitle" style="width:70px;">年化收益：</span>
										<input id="yearLowinp" class="percentInp" type="number"
											name=""> % <span class="percentHr">至</span> <input
											id="yearHighinp" class="percentInp" type="number" name="">
										%
									</div>
									<div class="indicatorsRange">
										<span class="indicatorsTitle">最大回撤：</span> <input
											id="withdrawalLow" class="percentInp" type="number" name="">
										% <span class="percentHr">至</span> <input id="withdrawalHigh"
											class="percentInp" type="number" name=""> %
									</div>
									<div class="indicatorsRange">
										<span class="indicatorsTitle">年化波动率：</span> <input
											id="fluctuationsLow" class="percentInp" type="number" name="">
										% <span class="percentHr">至</span> <input
											id="fluctuationsHigh" class="percentInp" type="number"
											name=""> %
									</div>
									<div class="indicatorsRange">
										<span class="indicatorsTitle">年化夏普比：</span> <input
											id="sharpThanLow" class="percentInp" type="number" name="">
										<span class="percentHr">至</span> <input id="sharpThanHigh"
											class="percentInp" type="number" name="">
									</div>
								</td>
							</tr>
							<tr>
								<td><img src="${ctxResources}/images/check06.png"> <span
									class="ultitleTxt2">投资策略：</span></td>
								<td><span id="secMulslebtn" class="openEnded">不限</span></td>
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
									<button id="6010501"
										class="Special checkboxBtn checkboxBtnshort" name="disMethod">债券策略</button>
									<button id="6010601"
										class="Special checkboxBtn checkboxBtnshort" name="disMethod">宏观策略</button>
									<button id="60107" class="checkboxBtn checkboxBtnshort"
										name="disMethod">组合策略</button>
									<button id="6010801"
										class="Special checkboxBtn checkboxBtnshort" name="disMethod">多策略</button>
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
							<tr id="foundationYears">
								<td><img src="${ctxResources}/images/check09.png"> <span
									class="ultitleTxt2">成立年限：</span></td>
								<td><span class="openEnded" id="establishedYears">不限</span></td>
								<td class="ulContent"><span id="1" class="selectTime"
									style="margin-left: 30px;">1年以下</span> <span id="2"
									class="selectTime">1-3年</span> <span id="3" class="selectTime">3-5年</span>
									<span id="4" class="selectTime">5年以上</span> <span class="rtop5"
									style="margin-left: 30px;">自定义:</span> <span
									class="layui-input-inline rtop5" style="margin-left: 10px;">
										<input class="dateInp cdata" placeholder="开始日期"
										name="foundation_date_start" id="foundation_date_start"
										readonly>
								</span><span class="rtop5" style="margin: 0 20px;">至</span><span
									class="rtop5 layui-input-inline"> <input
										class="dateInp cdata" placeholder="结束日期"
										name="foundation_date_end" id="foundation_date_end" readonly>
								</span></td>
							</tr>
							<tr>
								<td><img src="${ctxResources}/images/check10.png"> <span
									class="ultitleTxt2">自主发行规模：</span></td>
								<td><span class="openEnded">不限</span></td>
								<td class="ulContent" id="managementScale">
									<button data-id="13" class="checkboxBtn checkboxBtnshort"
										name="disMethod">0-1亿</button>
									<button data-id="12" class="checkboxBtn checkboxBtnshort"
										name="disMethod">1-10亿</button>
									<button data-id="7" class="checkboxBtn checkboxBtnshort"
										name="disMethod">10-20亿</button>
									<button data-id="8" class="checkboxBtn checkboxBtnshort"
										name="disMethod">20-50亿</button>
									<button data-id="9" class="checkboxBtn checkboxBtnshort"
										name="disMethod">50亿以上</button>
									<button data-id="else" class="checkboxBtn checkboxBtnshort"
										name="disMethod">其他</button>
								</td>
							</tr>
							<tr>
								<td><img src="${ctxResources}/images/check10.png"> <span
									class="ultitleTxt2">顾问管理规模：</span></td>
								<td><span class="openEnded">不限</span></td>
								<td class="ulContent" id="consultantScale">
									<button data-id="13" class="checkboxBtn checkboxBtnshort"
										name="disMethod">0-1亿</button>
									<button data-id="12" class="checkboxBtn checkboxBtnshort"
										name="disMethod">1-10亿</button>
									<button data-id="7" class="checkboxBtn checkboxBtnshort"
										name="disMethod">10-20亿</button>
									<button data-id="8" class="checkboxBtn checkboxBtnshort"
										name="disMethod">20-50亿</button>
									<button data-id="9" class="checkboxBtn checkboxBtnshort"
										name="disMethod">50亿以上</button>
									<button data-id="else" class="checkboxBtn checkboxBtnshort"
										name="disMethod">其他</button>
								</td>
							</tr>
							<tr id="distributionArea">
								<td><img src="${ctxResources}/images/check10.png"> <span
									class="ultitleTxt2">办公地址：</span></td>
								<td><span class="openEnded">不限</span></td>
								<td class="ulContent" id="region">
									<button id="上海" class="checkboxBtn checkboxBtnshort"
										name="disMethod">上海</button>
									<button id="广东" class="checkboxBtn checkboxBtnshort"
										name="disMethod">广东</button>
									<button id="深圳" class="checkboxBtn checkboxBtnshort"
										name="disMethod">深圳</button>
									<button id="北京" class="checkboxBtn checkboxBtnshort"
										name="disMethod">北京</button>
									<button id="else" class="checkboxBtn checkboxBtnshort"
										name="disMethod">其它</button>
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
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
	</section>
	<!-- 右侧部分结束-->
	<%@ include file="/WEB-INF/views/system/mainModal.jsp"%>
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
			require(['easy2/Excavation/excavationContrast']);
		</script>
</body>
</html>