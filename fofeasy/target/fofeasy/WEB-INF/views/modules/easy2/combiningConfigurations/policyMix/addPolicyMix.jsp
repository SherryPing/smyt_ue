<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>创建策略组合</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
<link rel="stylesheet"
	href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />
</head>
<body>
	<div id="layer">
		<div class="progressBardiv">
			<div class="progressBarContent">
				<div class="progress">
					<b class="progress__bar"> <span class="progress__text">
							Progress: <em>0%</em>
					</span>
					</b>
				</div>
			</div>
		</div>
	</div>
	<!-- 头部分开始 -->
	<%@ include file="/WEB-INF/views/system/header.jsp"%>
	<!-- 头部分结束 -->
	<!-- 内容部分开始 -->
	<section id="createCompolicy" class="fof-content">
		<div class="row">
			<div class="col-md-12">
				<!-- 第一步 -->
				<div class="newPolicydiv ulContent step outerDiv">
					<div class="stepsDiv">
						<div class="stepHeader">
							<span>创建策略组合步骤</span>
						</div>
						<div class="stepContent">
							<div class="stepNumberdiv">
								<div class="stepNumberAct">1</div>
								<div class="stepLine"></div>
								<div class="stepNumber">2</div>
								<div class="stepLine"></div>
								<div class="stepNumber">√</div>
							</div>
							<div class="stepTxtdiv">
								<div>
									 <span class="stepDetailAct">策略和模型选择</span>
								</div>
								<div>
									<span class="stepDetail">目标设定</span>
								</div>
								<div>
									<span class="stepDetail">完成</span>
								</div>
							</div>
						</div>
					</div>
					<div class="newPolicydiv ulContent">
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>创建组合策略</span>
							</div>
						</div>
						<div class="title-yellowdiv">
							<div></div>
							<span class="creatPrctitle">新建策略名称:</span> <input type="text"
								id="newPrcname" class="newPolicyname" name="">
						</div>
						<div class="title-yellowdiv">
							<div></div>
							<span class="creatPrctitle">投资金额<label
								style="font-size:12px;margin-left:10px;">(万元)</label>:
							</span> <input type="number" id="investmentAmountinp"
								class="newPolicyname" name="">
						</div>
						<div>
							<div class="title-yellowdiv">
								<div></div>
								<span class="creatPrctitle">Benchmark选择</span>
							</div>
							<div class="radioDiv">
								<div>
									<input id="hs300" type="checkbox" name="benchmark"
										value="沪深300"> <label for="hs300">沪深300</label>
								</div>
								<div>
									<input id="csi500" type="checkbox" name="benchmark"
										value="中证500"> <label for="csi500">中证500</label>
								</div>
								<div>
									<input id="sse50" type="checkbox" name="benchmark" value="上证50">
									<label for="sse50">上证50</label>
								</div>
								<div>
									<input id="cbi" type="checkbox" name="benchmark" value="中债指数">
									<label for="cbi">中债指数</label>
								</div>
								<div>
									<input id="nfi" type="checkbox" name="benchmark" value="南华商品指数">
									<label for="nfi">南华商品指数</label>
								</div>
							</div>
						</div>
						<div id="policySelec">
							<div class="title-yellowdiv">
								<div></div>
								<span class="creatPrctitle" style="width:200px;">策略选择<i
									style="font-size:13px;">(可多选，至少选2个)</i></span>
							</div>
							<div class="col-md-12 distanceTop20">
								<table class="table ulTable" id="industrymainTbl">
									<tr>
										<td><img src="${ctxResources}/images/check01.png"><span
											class="ultitleTxt2">市场指数：</span></td>
										<td colspan="2"><button data-id="hs300"
												class="checkboxBtn checkboxBtnshort checkboxActive"
												name="disMethod">沪深300</button>
											<button data-id="csi500" class="checkboxBtn checkboxBtnshort"
												name="disMethod">中证500</button>
											<button data-id="sse50" class="checkboxBtn checkboxBtnshort"
												name="disMethod">上证50</button>
											<button data-id="cbi" class="checkboxBtn checkboxBtnshort"
												name="disMethod">中债指数</button>
											<button data-id="nfi" class="checkboxBtn checkboxBtnshort"
												name="disMethod">南华期货指数</button></td>
									</tr>
									<tr>
										<td><img src="${ctxResources}/images/check01.png">
											<span class="ultitleTxt2">私募云通指数：</span></td>
										<td colspan="2">
											<button data-id="FI01"
												class="checkboxBtn checkboxBtnlong checkboxActive"
												name="disMethod">私募全市场指数</button>
											<button data-id="FI03"
												class="checkboxBtn checkboxBtnlong checkboxActive"
												name="disMethod">私募fof指数</button>
											<button data-id="FI04" class="checkboxBtn checkboxBtnlong"
												name="disMethod">股票多头策略指数</button>
											<button data-id="FI05" class="checkboxBtn checkboxBtnlong"
												name="disMethod">股票多空策略指数</button>
											<button data-id="FI06" class="checkboxBtn checkboxBtnlong"
												name="disMethod">市场中性策略指数</button>
											<button data-id="FI07" class="checkboxBtn checkboxBtnlong"
												name="disMethod">债券策略指数</button>
											<button data-id="FI08" class="checkboxBtn checkboxBtnlong"
												name="disMethod">管理期货策略指数</button>
											<button data-id="FI09" class="checkboxBtn checkboxBtnlong"
												name="disMethod">宏观策略指数</button>
											<button data-id="FI10" class="checkboxBtn checkboxBtnlong"
												name="disMethod">事件驱动策略指数</button>
											<button data-id="FI11" class="checkboxBtn checkboxBtnlong"
												name="disMethod">相对价值策略指数</button>
											<button data-id="FI12" class="checkboxBtn checkboxBtnlong"
												name="disMethod">多策略指数</button>
											<button data-id="FI13" class="checkboxBtn checkboxBtnlong"
												name="disMethod">组合投资策略指数</button>
										</td>
									</tr>
								</table>
							</div>
						</div>
						<div>
							<div class="title-yellowdiv">
								<div></div>
								<span class="creatPrctitle">区间选择:</span>
							</div>
							<div class="outerDiv">
								<div class="left40 distanceTop20">
										<input id="externalSample" type="radio" checked name="Sample" value="全样本区间">
										<label for="externalSample" class="margin5">全样本区间</label>
									<div class="grayDatediv">
											<input class="dateInp allranges startDate"  id="fullsample_startDate" readonly type="text">
											<span class="margin5">--</span>
											<input class="dateInp allranges endDate"  id="fullsample_endDate" readonly type="text">
									</div>
								</div>
								<div class="left40 distanceTop20">
									<input id="insideSample" type="radio" name="Sample" value="内样本区间">
									<label for="insideSample" class="margin5">内样本区间</label>
									<div class="grayDatediv">
										<input type="text" id="insideSample_startDate1" readonly class="dateInp Insidesample startDate" name="start_date">
										<span class="margin5">--</span>
										<input type="text" style="text-indent:0px;" id="insideSample_endDate1" readonly class="dateInp Insidesample endDate" name="end_date">
									</div>
									<span class="margin10">外样本区间:</span>
									<div class="grayDatediv">
										<input type="text" id="insideSample_startDate2" readonly class="dateInp Insidesample startDate" name="start_date">
										<span class="margin5">--</span>
										<input type="text" id="insideSample_endDate2" readonly class="dateInp Insidesample endDate" name="end_date">
									</div>
								</div>
							</div>
						</div>
						<div id="ConfigModel">
							<div class="title-yellowdiv">
								<div></div>
								<span class="creatPrctitle">选择配置模型</span>
							</div>
							<div class="radioDiv">
								<div>
									<input id="mv" type="radio" value="MV模型" name="condition"
										checked> <label for="mv">MV模型</label>
								</div>
								<!-- <div>
									<input id="blModel" type="radio" name="condition"> <label
										for="blModel">BL模型</label>
								</div>
								<div>
									<input id="riskAssessment" type="radio" name="condition">
									<label for="riskAssessment">风险评价</label>
								</div> -->
								<div id="riskDiv">
									<input id="rp" type="radio" name="condition" value="风险平价模型">
									<label for="rp">风险平价模型</label>
								</div>
								<div>
									<input id="custom" value="自定义子策略权重" type="radio"
										name="condition"> <label for="custom">自定义子策略权重</label>
								</div>
							</div>
						</div>
						<div id="riskAdjust" style="display:none;">
							<div class="title-yellowdiv">
								<div></div>
								<span class="creatPrctitle">调仓周期</span>
							</div>
							<div class="radioDiv">
								<div>
									<input id="keep" type="radio" data-type=null name="adjustPer" value="不调整"
										checked> <label for="keep">不调整</label>
								</div>
								<div>
									<input id="monAdjust" class="adjActive" data-type="M" type="radio"
										name="adjustPer" value="逐月调仓"> <label for="monAdjust">逐月调仓</label>
								</div>
								<div>
									<input id="quaAdjust" class="adjActive" data-type="Q" type="radio"
										name="adjustPer" value="逐季调仓"> <label for="quaAdjust">逐季调仓</label>
								</div>
								<div>
									<input id="yearAdjust" class="adjActive" data-type="Y" type="radio"
										name="adjustPer" value="逐年调仓"> <label for="yearAdjust">逐年调仓</label>
								</div>
								<div id="adjustLength" style="display:none;">
									<label for="defineMon" style="line-height: 25px;">指标计算窗口长度</label>
									<div id="definDiv" style="display:inline-block; float:right;">：
										<input type="number" id="defineMon" name="defineMon" style="width:40px;height:25px;margin:0 5px;" />月
									</div>
								</div>
							</div>
						</div>
						<div class="confirmPrcdiv">
							<a href="${ctxPage}/combination"><button>上一步</button></a>
							<button id="nextBtn1">下一步</button>
							<button class="reset">重置</button>
						</div>
					</div>
				</div>
				<!-- 第二步 -->
				<div class="targetSet step outerDiv" style="display:none;">
					<div class="stepsDiv">
						<div class="stepHeader">
							<span>创建策略组合步骤</span>
						</div>
						<div class="stepContent">
							<div class="stepNumberdiv">
								<div class="stepNumberAct">1</div>
								<div class="stepLineAct"></div>
								<div class="stepNumberAct">2</div>
								<div class="stepLine"></div>
								<div class="stepNumber">√</div>
							</div>
							<div class="stepTxtdiv">
								<div>
									<span class="stepDetailAct">策略和模型选择</span>
								</div>
								<div>
									<span class="stepDetailAct">目标设定</span>
								</div>
								<div>
									<span class="stepDetail">完成</span>
								</div>
							</div>
						</div>
					</div>
					<div class="infoTitle">
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span>目标设定</span>
						</div>
					</div>
					<div id="targetSet">
						<div class="title-yellowdiv">
							<div></div>
							<span class="creatPrctitle">目标函数选择</span>
						</div>
						<div class="valueDiv">
							<div>
								<input type="radio" name="targetfunction" id="max_sharp"
									value="年化夏普比最大" checked><label for="max_sharp">年化夏普比最大</label>
							</div>
							<div>
								<input type="radio" name="targetfunction" id="max_income"
									value="既定目标风险下，年化收益率最大"><label for="max_income">既定目标风险下，年化收益率最大</label>
							</div>
							<div>
								<input type="radio" name="targetfunction" id="min_std"
									value="既定目标收益下，年化波动率最小"><label for="min_std">既定目标收益下，年化波动率最小</label>
							</div>
						</div>
					</div>
					<div id="conditionSet">
						<div class="title-yellowdiv">
							<div></div>
							<span class="creatPrctitle" style="width:300px;">选择约束条件<i
								id="modalName"
								style="color:blue;font-size:12px;font-style:normal;"></i></span>
						</div>
						<div class="valueDiv">
							<div class="constraintConditions">
								<span>年化收益率>=</span><input id="return_a" type="text">%
							</div>
							<div class="constraintConditions">
								<span>年化波动率<=</span><input id="std_a" type="text">%
							</div>
							<div class="constraintConditions">
								<span>无风险收益率</span><span class="margin10">=</span><input
									id="risk_free" class="left20" type="number">%
							</div>
							<div class="subfundSetupdiv" style="width:40%;min-width:430px;">
								<div class="pull-left" style="width:330px;margin-top:3px;">
									<span class="marginTopn60">子基金权重</span> <input
										class="marginTopn60 subfundinp" id="subfundMin" name="min"
										type="number">%<span class="marginTopn60"
										style="margin:0 10px;">至</span> <input
										class="marginTopn60 subfundinp" id="subfundMax" name="max"
										type="number">%
								</div>
								<span class="pull-left" style="font-size:12px;">(统一设置，如果需要修改单只子策略的权重可在下列文本框中修改)</span>
							</div>
						</div>
						<div class="outerDiv distanceTop20">
							<table id="step2Tbl" class="indicatorsTbl dataTable">
							</table>
						</div>
					</div>
					<div class="confirmPrcdiv">
						<button id="step2Back">上一步</button>
						<button id="nextBtn2">下一步</button>
						<button id="step2reset" class="reset">重置</button>
					</div>
				</div>
				
				<!-- 风险平价模型 第二步 -->
				<div class="ulContent step outerDiv" id="riskModel"
					style="display:none">
					<div class="stepsDiv">
						<div class="stepHeader">
							<span>创建策略组合步骤</span>
						</div>
						<div class="stepContent">
							<div class="stepNumberdiv">
								<div class="stepNumberAct">1</div>
								<div class="stepLineAct"></div>
								<div class="stepNumberAct">2</div>
								<div class="stepLine"></div>
								<div class="stepNumber">√</div>
							</div>
							<div class="stepTxtdiv">
								<div>
									<span class="stepDetailAct">策略和模型选择</span>
								</div>
								<div>
									<span class="stepDetailAct">目标设定</span>
								</div>
								<div>
									<span class="stepDetail">完成</span>
								</div>
							</div>
						</div>
					</div>
					<div class="infoTitle" style="margin-top:0">
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span>目标设定</span>
						</div>
					</div>
					<div>
						<div class="title-yellowdiv">
							<div></div>
							<span class="creatPrctitle">目标函数选择</span>
						</div>
						<div class="outerDiv">
							<div class="left40 distanceTop20">
								<div>
									<input id="target_risk" type="radio" checked name="oriRisk" value="原始风险平价" checked>
									<label for="target_risk" class="margin5">原始风险平价</label>
								</div>
								<div class="radioDiv" id="oriDetail">
									<div>
										<input id="equivalent_std" type="radio" checked name="oriDetail"
											value=""> <label for="equivalent_std">年化波动率</label>
									</div>
									<div>
										<input id="equivalent_var" type="radio" name="oriDetail"
											value=""> <label for="equivalent_var">风险价值（VaR）</label>
									</div>
									<div>
										<input id="equivalent_cvar" type="radio" name="oriDetail"
											value=""> <label for="equivalent_cvar">条件风险价值（CVaR）</label>
									</div>
									<div>
										<input id="equivalent_mdd" type="radio" name="oriDetail" value="">
										<label for="equivalent_mdd">最大回撤</label>
									</div>
								</div>
								<div style="margin-top:20px">
									<input id="optiRisk" type="radio" name="oriRisk" value="最优风险平价">
									<label for="optiRisk" class="margin5">最优风险平价</label>
								</div>
								<div class="radioDiv" id="bestDetail" style="display:none;">
									<div>
										<input id="o_equivalent_std" type="radio" name="oriDetail" value="">
										<label for="o_equivalent_std">年化波动率</label>
									</div>
								</div>
							</div>
							<div class="title-yellowdiv">
								<div></div>
								<span class="creatPrctitle" style="width:300px;">选择约束条件
									<i style="color:blue;font-size:12px;font-style:normal;" class="modalName"></i>
								</span>
							</div>
							<div class="valueDiv" id="resOption">
								<div class="constraintConditions initDiv" id="firOption">
									<span>年化波动率<=</span>
									<input id="annRisk" type="number">%
								</div>
								<div class="constraintConditions nonInitDiv" id="secOption" style="display:none;width:30%">
									<span>风险价值（VaR）</span><span class="margin10"><=</span>
									<input id="varRisk" type="number">%
								</div>
								<div class="constraintConditions nonInitDiv" id="thiOption"
									style="display:none;width:30%">
									<span>条件风险价值（CVaR）</span><span class="margin10"><=</span>
									<input id="cvarRisk" type="number">%
								</div>
								<div class="constraintConditions initDiv" style="display:none;width:30%">
									<span>最大回撤<=</span>
									<input id="mdd" type="number">%
								</div>
								<div class="constraintConditions initDiv" id="fouOption">
									<span>无风险收益率</span><span class="margin10">=</span>
									<input id="noRisk" type="number">%
								</div>
								
							</div>
						</div>
					</div>
					<div class="outerDiv distanceTop20">
						<table id="riskTbl" class="indicatorsTbl dataTable">
						</table>
					</div>
					<div class="confirmPrcdiv distanceTop20">
						<button class="step2Back">上一步</button>
						<button id="riskBtn">下一步</button>
						<button id="riskReset">重置</button>
					</div>
				</div>
				<!-- 创建策略组合第一种情况，第三步 -->
				<div class="createCombination step outerDiv" style="display:none;">
					<div class="stepsDiv">
						<div class="stepHeader">
							<span>创建策略组合步骤</span>
						</div>
						<div class="stepContent">
							<div class="stepNumberdiv">
								<div class="stepNumberAct">1</div>
								<div class="stepLineAct"></div>
								<div class="stepNumberAct">2</div>
								<div class="stepLineAct"></div>
								<div class="stepNumberAct">√</div>
							</div>
							<div class="stepTxtdiv">
								<div>
									<span class="stepDetailAct">策略和模型选择</span>
								</div>
								<div>
									<span class="stepDetailAct">目标设定</span>
								</div>
								<div>
									<span class="stepDetailAct">完成</span>
								</div>
							</div>
						</div>
					</div>
					<div class="createPolicycom">
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>策略组合</span>
							</div>
						</div>
						<div class="col-md-12">
							<table id="step3showInfo">
								<tr>
									<td>
										<div class="prcTitle">Benchmark</div>
										<div class="benchmark"></div>
									</td>
									<td>
										<div class="prcTitle">配置模式</div>
										<div class="mode"></div>
									</td>
									<td>
										<div class="prcTitle chTitle"></div>
										<div class="Interval"></div>
									</td>
									<td>
										<div class="prcTitle">目标既定</div>
										<div class="target"></div>
									</td>
									<td>
										<div class="prcTitle">全样本区间约束条件</div>
										<div id="Conditions"></div>
									</td>
								</tr>
							</table>
						</div>
						<div class="col-md-12 distanceTop20" style="padding: 0 0;">
							<table id="creatPrctbl" class="indicatorsTbl dataTable"></table>
						</div>
						<div class="col-md-12 distanceTop20 border2 height360">
							<div class="col-md-7 height360">
								<div class="charHeader">
									<div class="headerLeft">
										<div class="charHeadpil"></div>
										<span class="charHeadtxt">有效边界</span>
									</div>
								</div>
								<div id="meanVariance" class="schartContent"></div>
							</div>
							<div class="col-md-5 height360">
								<div class="charHeader">
									<div class="headerLeft" style="width:100%;">
										<div class="charHeadpil"></div>
										<span class="charHeadtxt">组合预期业绩指标</span>
										<div
											style="display:inline-block;margin-left:20px;position:relative;top:10px;">
											<!-- <span class="allrange_stardate"></span><span class="margin10">至</span><span
											class="allrange_enddate"></span> -->
											<div class="allrange margin10"></div>
										</div>
									</div>
								</div>
								<table class="accountTbl">
									<tr>
										<td>
											<div>累计收益率</div>
											<div></div>
										</td>
										<td>
											<div>年化收益率</div>
											<div></div>
										</td>
										<td>
											<div>年化波动率</div>
											<div></div>
										</td>
									</tr>
									<tr>
										<td>
											<div>年化下行标准差</div>
											<div></div>
										</td>
										<td>
											<div>Sortino比率</div>
											<div></div>
										</td>
										<td>
											<div>年化夏普比</div>
											<div></div>
										</td>
									</tr>
									<tr>
										<td>
											<div>最大回撤</div>
											<div></div>
										</td>
										<td>
											<div>最大回撤发生时间</div>
											<div></div>
										</td>
										<td>
											<div>最大回撤形成期</div>
											<div></div>
										</td>
									</tr>
								</table>
							</div>
						</div>
						<div class="col-md-6 distanceTop20 height320">
							<div id="yieldlineCharts" class="border2 schartContent height320">
							</div>
						</div>
						<div class="col-md-6 distanceTop20 height320 pad_right0">
							<div id="yieldCharts" class="border2 schartContent height320">
							</div>
						</div>
						<div class="distanceTop20 col-md-12 border height360">
							<div class="charHeader">
								<div class="headerLeft">
									<div class="charHeadpil"></div>
									<span class="charHeadtxt">动态回撤</span>
								</div>
								<div class="headerRight">
									<!-- <button class="easy1Btn pull-left" style="margin-right:20px;"
									id="showAll">显示全部</button>
								<input class="dateInp cdata pull-left" placeholder="开始日期"
									name="date_start" id="yield_date_start" readonly> <span>至</span>
								<input class="dateInp cdata pull-left"
									style="margin-right:20px;" placeholder="结束日期" name="date_end"
									id="yield_date_end" readonly> -->
								</div>
							</div>
							<div id="dynamicDallback" class="schartContent height280"></div>
						</div>
					</div>
					<div class="confirmPrcdiv">
						<button id="step3Back">上一步</button>
						<button class="savePrc">确定</button>
					</div>
				</div>
				
				<!-- 风险评价模型，第三步 -->
				<div class="riskcreateCombination step outerDiv"
					style="display:none;">
					<div class="stepsDiv">
						<div class="stepHeader">
							<span>创建策略组合步骤</span>
						</div>
						<div class="stepContent">
							<div class="stepNumberdiv">
								<div class="stepNumberAct">1</div>
								<div class="stepLineAct"></div>
								<div class="stepNumberAct">2</div>
								<div class="stepLineAct"></div>
								<div class="stepNumberAct">√</div>
							</div>
							<div class="stepTxtdiv">
								<div>
									<span class="stepDetailAct">策略和模型选择</span>
								</div>
								<div>
									<span class="stepDetailAct">目标设定</span>
								</div>
								<div>
									<span class="stepDetailAct">完成</span>
								</div>
							</div>
						</div>
					</div>
					<div class="createPolicycom">
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>产品组合</span>
							</div>
						</div>
						<div class="col-md-12 pad_left0">
							<table class="step3showInfo">
								<tr>
									<td>
										<div class="prcTitle">Benchmark</div>
										<div class="benchmark"></div>
									</td>
									<td>
										<div class="prcTitle">配置模式</div>
										<div class="mode"></div>
									</td>
									<td>
										<div class="prcTitle chTitle"></div>
										<div class="Interval"></div>
									</td>
									<td>
										<div class="prcTitle">目标设定</div>
										<div class="target"></div>
									</td>
									<td>
										<div class="prcTitle">全样本区间约束条件</div>
										<div id="riskConditions"></div>
									</td>
								</tr>
							</table>
						</div>
						<div class="col-md-12 distanceTop20 pad_left0">
							<table id="riskcreatPrctbl" class="indicatorsTbl dataTable"></table>
						</div>
						<div class="col-md-12 distanceTop20 height320 pad_right0 pad_left0">
							<div id="risksecondAre" class="border2 schartContent height320">
							</div>
						</div>
						<div class="col-md-12 distanceTop20 border2 pad_left0">
							<div class="col-md-7">
								<div id="riskVariance" class="schartContent height360"></div>
							</div>
							<div class="col-md-5 height360" id="riskTbldiv">
								<div class="charHeader">
									<div class="headerLeft" style="width:100%;">
										<div class="charHeadpil"></div>
										<span class="charHeadtxt">组合预期业绩指标</span>
										<div
											style="display:inline-block;margin-left:20px;position:relative;top:10px;">
											<!-- <span class="allrange_stardate"></span><span class="margin10">至</span><span
											class="allrange_enddate"></span> -->
											<div class="allrange margin10"></div>
										</div>
									</div>
								</div>
								<table class="accountTbl">
									<tr>
										<td>
											<div>累计收益率</div>
											<div></div>
										</td>
										<td>
											<div>年化收益率</div>
											<div></div>
										</td>
										<td>
											<div>年化波动率</div>
											<div></div>
										</td>
									</tr>
									<tr>
										<td>
											<div>年化下行标准差</div>
											<div></div>
										</td>
										<td>
											<div>Sortino比率</div>
											<div></div>
										</td>
										<td>
											<div>年化夏普比</div>
											<div></div>
										</td>
									</tr>
									<tr>
										<td>
											<div>最大回撤</div>
											<div></div>
										</td>
										<td>
											<div>最大回撤发生时间</div>
											<div></div>
										</td>
										<td>
											<div>最大回撤形成期</div>
											<div></div>
										</td>
									</tr>
								</table>
							</div>
						</div>
						
						<div class="col-md-6 distanceTop20 height320">
							<div id="riskyieldCharts" class="border2 schartContent height320">
							</div>
						</div>
						<div class="col-md-6 distanceTop20 height320 pad_right0">
							<div id="riskdynamicDallback" class="border2 schartContent height320">
							</div>
						</div>
						
					</div>
					<div class="confirmPrcdiv">
						<button id="riskstep3Back">上一步</button>
						<button class="savePrc">保存方案</button>
					</div>
				</div>
				
				
				<!-- 策略创建第二种情况 -->
				<div class="secondSituation step outerDiv" style="display:none;">
					<div class="stepsDiv">
						<div class="stepHeader">
							<span>创建策略组合步骤</span>
						</div>
						<div class="stepContent">
							<div class="stepNumberdiv">
								<div class="stepNumberAct">1</div>
								<div class="stepLineAct"></div>
								<div class="stepNumberAct">2</div>
								<div class="stepLineAct"></div>
								<div class="stepNumberAct">√</div>
							</div>
							<div class="stepTxtdiv">
								<div>
									<span class="stepDetailAct">策略和模型选择</span>
								</div>
								<div>
									<span class="stepDetailAct">目标设定</span>
								</div>
								<div>
									<span class="stepDetailAct">完成</span>
								</div>
							</div>
						</div>
					</div>
					<div class="createPolicycom">
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>策略组合</span>
							</div>
						</div>
						<div class="distanceTop20 col-md-9 height320 pad_left0">
							<div id="" class="schartContent border2 height320">
								<div class="charHeader">
									<div class="headerLeft">
										<div class="charHeadpil"></div>
										<span class="charHeadtxt">仓位动态调整图</span>
									</div>
								</div>
								<div id="secondAre" class="schartContent height280"></div>
							</div>
						</div>
						<div class="distanceTop20 col-md-3 height320 pad_right0">
							<ul class="creatPrc-step3-secondul">
								<li>配置权重</li>
								<li><div class="creatPrc-step3-secondul-content"></div></li>
								<li><button type="button" id="configureWeights"
										class="easy2Btn">确认</button>
									<button id="weightReset" type="button" class="easy2Btn">重置</button></li>
							</ul>
						</div>
						<div class="col-md-6 distanceTop20 height320">
							<div id="secondLine" class="schartContent"></div>
						</div>
						<div class="col-md-6 distanceTop20 height320">
							<div id="secondyieldCharts" class="schartContent"></div>
						</div>
						<div class="col-md-12 border height360">
							<div class="charHeader">
								<div class="headerLeft">
									<div class="charHeadpil"></div>
									<span class="charHeadtxt">动态回撤</span>
								</div>
								<div class="headerRight">
									<!-- <button class="easy1Btn pull-left" style="margin-right:20px;"
									id="showAll">显示全部</button>
								<input class="dateInp cdata pull-left" placeholder="开始日期"
									name="date_start" id="second_date_start" readonly> <span>至</span>
								<input class="dateInp cdata pull-left"
									style="margin-right:20px;" placeholder="结束日期" name="date_end"
									id="second_date_end" readonly> -->
								</div>
							</div>
							<div id="seconddynamicDallback" class="schartContent height280">
							</div>
						</div>
					</div>
					<div class="confirmPrcdiv">
						<button id="secondBack">上一步</button>
						<button class="savePrc">保存方案</button>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- 右侧部分结束-->
	<%@ include file="/WEB-INF/views/system/mainModal.jsp"%>
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'easy2/combiningConfigurations/policyMix/addPolicyMix' ]);
	</script>
</body>
</html>