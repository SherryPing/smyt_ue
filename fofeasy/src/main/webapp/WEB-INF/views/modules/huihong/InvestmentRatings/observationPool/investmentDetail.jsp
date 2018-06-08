<!-- 尽调状态已完成，投顾详情。 -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title></title>
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
		<div class="row">
			<div class="col-md-12">
		<ul id="investmenTratings-investmentDetailUl" class='investmenTratings-modulesUl'>
			<li class="modulesActive">业绩指标</li>
			<li>旗下产品</li>
		</ul>
		<div id="prcInfo">
			<div class="outerDiv" style="font-size:14px;"></div>
			<table id="prcInfo">
				<tr>
					<td>
						<div>
							<div class="hh-smallTitle"></div>
							<span class="manywords140" style="color:black;" id="fund_name"></span>
						</div>
						<div>
							<div class="hh-smallTitle"></div>
							<a href="#"> <span id="org_name" class="manywords140"
								data-trigger="hover" data-container="body" data-toggle="popover"
								data-placement="top" data-content="" style="color:black;">
							</span>
							</a> <a target="_black" href="#"><button class="adjustReportbtn">尽调报告</button></a>
						</div>

					</td>
					<td>
						<div class="prcTitle">主要策略</div>
						<div>
							<span id="assetScale"></span>
						</div>
					</td>
					<td>
						<div class="prcTitle">公司网址</div>
						<div>
							<span id="consultantsScale"></span>
						</div>
					</td>
					<td>
						<div class="prcTitle">资产管理规模</div>
						<div>
							<span id="productQuantity"></span>
						</div>
					</td>
					<td>
						<div class="prcTitle">管理产品数量</div>
						<div>
							<span id="recordNumber"></span>
						</div>
					</td>
					<td>
						<div class="prcTitle">投顾评价</div>
						<div>
							<span id="memberType"></span>
						</div>
					</td>
					<td>
						<div class="prcTitle">所在地区</div>
						<div>
							<span id="Area"></span>
						</div>
					</td>
					<td>
						<div class="prcTitle">成立日期</div>
						<div>
							<span id="dateEstablishment"></span>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<!-- 业绩指标 -->
		<div class="detailModul">
				<div class="infoTitle">
					<div class="introducTitle hhcolor"></div>
					<div class="titleTxt">
						<span>运营能力</span>
					</div>
				</div>
				<div id="basicInfo">
					<table id="basicTbl1">
						<tr>
							<td>今年以来累计收益率：<span id="yearsYield"></span></td>
						</tr>
						<tr>
							<td>成立年限(年)：<span id="establishedYears"></span></td>
						</tr>
						<tr>
							<td>注册资本(万元)：<span id="registeredCapital"></span></td>
						</tr>
						<tr>
							<td>高管是否有从业资格：<span id="Qualifications"></span></td>
						</tr>
						<tr>
							<td>投资策略数量(类)：<span id="numberOfstrategy"></span></td>
						</tr>
						<tr>
							<td>年均产品发行数量(只/年)：<span id="numberOfreleases"></span></td>
						</tr>

					</table>
					<table id="basicTbl2">
						<tr>
							<td>成立以来累计收益率：<span id="EstablishedYield"></span></td>
						</tr>
						<tr>
							<td>自主管理规模：<span id="assetRange"></span></td>
						</tr>
						<tr>
							<td>顾问管理规模：<span id="consultantsRange"></span></td>
						</tr>
						<tr>
							<td>注册资本实缴比例：<span id="capitalRatio"></span></td>
						</tr>
						<tr>
							<td>是否是会员：<span id="isVIP"></span></td>
						</tr>
						<!-- 			<tr>
				<td>备案基金数量(新规后数量及占比)：<span id="numberOfrecords"></span></td>
			</tr> -->
						<tr>
							<td>员工数量：<span id="numberOfemployees"></span></td>
						</tr>
					</table>
				</div>
				<div class="infoTitle col-md-12">
					<div class="introducTitle hhcolor"></div>
					<div class="titleTxt">
						<span>收益风险比</span>
					</div>
				</div>
				<div class="distanceTop20 pull-left" style="width:100%;">
					<table class="indicatorsTbl table" id="revenueRisktbl"></table>
				</div>
				<div class="bigCharts height320" style="padding-top:5px;">
					<div class="charHeader" style="margin-top:0px;">
						<div class="headerLeft" style="margin-left:10px;width:146px;">
							<select id="riskSlc1" class="form-control">
								<option id="return_a">年化收益率</option>
								<option id="excess_a">超额年化收益率</option>
							</select>
						</div>
					</div>
					<div class="schartContent" id="revenueRiskcharts"></div>
					<div class="charBottom">
						<div class="botSlcdiv pull-right">
							<select id="riskSlc2" class="form-control">
								<option id="stdev_a">年化波动率</option>
								<option id="max_retracement">最大回撤</option>
								<option id="dd_a">年化下行标准差</option>
								<option id="beta">贝塔系数</option>
							</select>
						</div>
					</div>
				</div>

				<div class="infoTitle">
					<div class="introducTitle hhcolor"></div>
					<div class="titleTxt">
						<span>盈利能力</span>
					</div>
				</div>
				<div class="col-md-5 distanceTop20">
					<table class="indicatorsTbl table height360" id="profitabilityTbl"></table>
				</div>
				<div class="col-md-7 distanceTop20" style="padding-right:0px;">
					<div class="schartContent border height360">
						<div class="charHeader">
							<div class="headerSright">
								<select id='profitabilitySlc' class="form-control">
									<option id="return">累计收益率</option>
									<option id="return_a">年化收益率</option>
									<!-- <option id="">超额年化收益率</option> -->
									<option id="sharp_a">年化夏普比</option>
									<option id="calmar_a">年化卡玛比率</option>
									<option id="sor_a">年化索提诺比率</option>
									<option id="tr_a">年化特雷诺比率</option>
									<option id="in_a">年化信息比率</option>
									<option id="jense_a">年化詹森指数</option>
								</select>
							</div>
						</div>
						<div class="schartContent" id="profitabilityChart"></div>
					</div>
				</div>
				<div class="infoTitle">
					<div class="introducTitle hhcolor"></div>
					<div class="titleTxt">
						<span>风控能力</span>
					</div>
				</div>
				<div class="col-md-5 distanceTop20">
					<table class="indicatorsTbl table height320" id="windcontrolTbl"></table>
				</div>
				<div class="col-md-7 distanceTop20" style="padding-right:0px;">
					<div class="schartContent border height360">
						<div class="charHeader">
							<div class="headerSright">
								<select id='windcontrolSlc' class="form-control">
									<option id="stdev_a">年化标准差</option>
									<option id="dd_a">年化下行标准差</option>
									<option id="mdd">最大回撤</option>
									<option id="mdd_time">最大回撤的形成期</option>
									<option id="beta">贝塔系数</option>
									<option id="rvalue">风险价值</option>
								</select>
							</div>
						</div>
						<div class="schartContent" id="windcontrolCharts"></div>
					</div>
				</div>
				<div class="infoTitle">
					<div class="introducTitle hhcolor"></div>
					<div class="titleTxt">
						<span>投研能力</span>
					</div>
				</div>
				<div class="col-md-5 distanceTop20">
					<table class="indicatorsTbl table height360" id="investmentTbl"></table>
				</div>
				<div class="col-md-7 distanceTop20" style="padding-right:0px;">
					<div class="schartContent border height360">
						<div class="schartContent height360" id="investmentCharts"></div>
					</div>
				</div>
		</div>
		<!-- 旗下产品 -->
		<div class="detailModul" style="display:none;">
				<div class="col-md-12">
					<div style="float: left;width: 100%;margin-top:10px;">
						<div id="incomeSlider">
							<ul id="incomeUl">
								<li id="on" class="productStates">运行中</li>
								<li id="off" class="productStates">已清盘</li>
								<li class="histolineActive"></li>
							</ul>
							<br>
						</div>
						<div id="incomeLine"></div>
					</div>
					<!-- 运行中 -->
					<div class="statesDiv distanceTop20 pull-left">
						<table class="table ulTable">
							<tr id="foundationYears">
								<td><img src="${ctxResources}/images/check01.png"> <span
									class="ultitleTxt">统计区间：</span></td>
								<td colspan="2"><span id="total"
									class="selectTime choiceTime" style="margin-left: 10px;">成立以来</span>
									<span id="year" class="selectTime">今年以来</span> <span id="m3"
									class="selectTime">近三个月</span> <span id="m6" class="selectTime">近六个月</span>
									<span id="y1" class="selectTime">近一年</span> <span id="y3"
									class="selectTime">近三年</span> <span id="y5" class="selectTime">近五年</span>
									<!--  <span
									class="layui-input-inline" style="margin-left:20px;"><input
										class="form-control cdata" placeholder="开始日期"
										name="date_start1" readonly> </span><span
									style="margin:0 20px;">——</span><span class="layui-input-inline">
										<input class="form-control cdata" placeholder="结束日期"
										name="date_end1" readonly>
									</span> --></td>
							</tr>
							<tr>
								<td><img src="${ctxResources}/images/check06.png"> <span
									class="ultitleTxt">投资策略：</span></td>
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
						</table>
						<table class="mainTbl" id="main-grid" data-toggle="main-grid"
							data-id-field="id" data-show-columns="true">
						</table>
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>产品相关性矩阵</span>
							</div>
						</div>
						<div class="pull-left distanceTop20" style="width:100%;">
							<div id="Frequency" class="outerDiv">
								<ul class="freSlcul pull-left" style="margin-left:0px;">
									<li style="border:none;width:80px;padding-top:10px;"><span>统计区间</span></li>
									<li class="slcliBtnactiv"><input
										style="text-align: right;" class="form_date" size="16"
										type="text" value="" placeholder="开始日期" readonly>&nbsp;--&nbsp;
										<input class="form_date" size="16" type="text" value=""
										placeholder="截止日期" readonly></li>
								</ul>
								<div class="pull-left left30">
									<span class="distanceTop10 pull-left">产品：</span>
									<div class="showPrc-select">
										<span class="selectPrc">选择产品</span>
										<div class="selectPrcdiv noShow">
											<ul id="selectPrcul" class="ul-div">
											</ul>
										</div>
									</div>
									<div id="showInfo" class="pull-left left30"
										style="color:red;padding-top:8px;"></div>
								</div>
							</div>
							<div class="pull-left distanceTop20" style="width:100%;">
								<div class="schartContent" id="correlationTbl"
									style="padding-top:20px;min-width:600px;">
									<div class="chartsTbldiv">
										<div id="left_titlediv3" class="left_titlediv3"></div>
										<table id="subFundtbl" class="chartsTbl3"
											style="margin-bottom:30px;">
											<thead id="correlationTblhead"></thead>
											<tbody id="correlationTblbody"></tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</section>
	<!-- 右侧部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
			require(['huihong/InvestmentRatings/observationPool/investmentDetail']);
	</script>
</body>

</html>
