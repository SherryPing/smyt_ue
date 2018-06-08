<!-- 评分评级_评分报告人浏览 -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>评分报告人浏览</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
<link rel="stylesheet"
	href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />
</head>
<body>
	<input type="hidden" id="org_id" value="${orgId}">
	<input type="hidden" id="user_id" value="${useUserId}">
	<input type="hidden" id="org_id_init" value="${fundId}">
	<!-- 头部分开始 -->
	<%@ include file="/WEB-INF/views/system/header.jsp"%>
	<!-- 头部分结束 -->
	<!-- 内容部分开始 -->
	<section class="fof-content Evaluation">
		<div id="resultsBrowse" class="row">
			<div class="col-md-12">
				<div class="content">
					<div class="header">
						<span>评分报告(<span id="moduleName"></span>)</span>
						<span style="float:right">
							<a href="${ctxPage}/InvestmentRatings/observationPool/Score/reportWeight/${fundId},${orgId}"><img src="${ctxResources}/images/huisheng/reportview.png" id="goToReportWeight"></a>
							<img src="${ctxResources}/images/huisheng/noupload_down.png" id="download">
						</span>
						</div>
						<div id="scoreReport" class="col-md-12 distanceTop20">
							<span id="myReport">我的评分报告：</span>
						</div>
						<div class="col-md-12 border distanceTop20">
							<div id="scoreInfo" class="col-md-8" style="height:20px;">
								<div class="height40 starDiv"></div>
								<div class="infoDiv">
									<span>某某投顾公司:</span>
									<span class="companyName"></span>
								</div>
								<div class="infoDiv">
									<span>客观得分:</span>
									<span class="objectiveScore"></span>
								</div>
								<div class="infoDiv">
									<span>评分日期:</span>
									<span class="scoreDate"></span>
								</div>
								<div class="infoDiv">
									<span>主观得分:</span>
									<span class="subjectiveScore"></span>
								</div>
								<div class="infoDiv">
									<span>所用模板:</span>
									<span class="useTemplate"></span>
								</div>
								<div class="infoDiv">
									<span>综合得分:</span>
									<span class="total"></span>
								</div>
							</div>
							<div class="col-md-4" id="roundChart" style="height:200px;">
								
							</div>
							<hr />
							<div class="col-md-12">
								<ul id="modulesUl" class="investmenTratings-observationPool-modulesUl">
									<li style="width:200px;">客观分析（<span id="useobjectiveScore"></span>/100）
									</li>
									<!-- <li class="histolineActive"></li> -->
								</ul>
							</div>
							<div class="col-md-12 objectiveEvaluationdiv">
								<div class="col-md-8">
									<p class="distanceTop10">公司资质:</p>
									<form id="objectiveCompanyInfo" name="objectiveCompanyInfo">
										<table class="impersonalTbl">
											<thead>
												<tr>
													<th>序号</th>
													<th>评分依据</th>
													<th>得分</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>1</td>
													<td><span>主要股东背景:</span><input type="text" name="share_holder" readonly></td>
													<td><span class="share_holder"></span></td>
												</tr>
												<tr>
													<td>2</td>
													<td>
														<span>注册资本:</span><input type="text" name="reg_capital" readonly></td>
													<td><span class="reg_capital"></span></td>
												</tr>
												<tr>
													<td>3</td>
													<td><span>成立年限:</span><input type="text" name="years" readonly></td>
													<td><span class="years"></span></td>
												</tr>
												<tr>
													<td>4</td>
													<td><span>目前管理产品规模:</span><input type="text" name="scale_mtd" readonly></td>
													<td><span class="scale_mtd"></span></td>
												</tr>
												<tr>
													<td>5</td>
													<td><span>自营基金管理状况:</span><input type="text" name="manage_scale" readonly></td>
													<td><span class="manage_scale"></span></td>
												</tr>
												<tr>
													<td>6</td>
													<td><span>财务状况:</span><input type="text" name="increase_ratio" readonly></td>
													<td><span class="increase_ratio"></span></td>
												</tr>
												<tr>
													<td>7</td>
													<td><span>客户结构:</span><input type="text" name="investor_ratio" readonly></td>
													<td><span class="investor_ratio"></span></td>
												</tr>
												<tr>
													<td>8</td>
													<td><span>近3年获奖记录</span><input type="text" name="prize" readonly></td>
													<td><span class="prize"></span></td>
												</tr>
											</tbody>
										</table>
									</form>
								</div>
								<div class="col-md-4">
									<div id="companyRate" class="impscoringRate">
										<div class="tr pad_left10" style="height:34px">得分率</div>
										<div class="tr share_holder">
											<div class="lineOdiv">
												<div class="lineIdiv"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr reg_capital">
											<div class="lineOdiv">
												<div class="lineIdiv"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr years">
											<div class="lineOdiv">
												<div class="lineIdiv"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr scale_mtd">
											<div class="lineOdiv">
												<div class="lineIdiv"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr manage_scale">
											<div class="lineOdiv">
												<div class="lineIdiv"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr increase_ratio">
											<div class="lineOdiv">
												<div class="lineIdiv"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr investor_ratio">
											<div class="lineOdiv">
												<div class="lineIdiv"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr prize">
											<div class="lineOdiv">
												<div id="november" class="lineIdiv"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
									</div>
								</div>
								<div class="col-md-8">
									<p class="distanceTop10">团队架构:</p>
									<form id="objectiveTeamInfo" name="objectiveTeamInfo">
										<table class="impersonalTbl">
											<thead>
												<tr>
													<th>序号</th>
													<th>评分依据</th>
													<th>得分</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>1</td>
													<td><span>公司人数:</span><input type="text" name="staff_num" readonly></td>
													<td><span class="staff_num"></span></td>
												</tr>
												<tr>
													<td>2</td>
													<td><span>团队结构:</span><input type="text" name="team_structure" readonly></td>
													<td><span class="team_structure"></span></td>
												</tr>
												<tr>
													<td>3</td>
													<td><span>核心投研人员平均从业年限:</span><input type="text" name="researcher_working_year" readonly></td>
													<td><span class="researcher_working_year"></span></td>
												</tr>
												<tr>
													<td>4</td>
													<td><span>核心基金经理过往管理规模:</span><input type="text" name="researcher_managed_asset" readonly></td>
													<td><span class="researcher_managed_asset"></span></td>
												</tr>
												<tr>
													<td>5</td>
													<td><span>核心基金经理实盘投资经验:</span><input type="text" name="researcher_invest_year" readonly></td>
													<td><span class="researcher_invest_year"></span></td>
												</tr>
												<tr>
													<td>6</td>
													<td><span>近一年内核心人员变更情况:</span><input type="text" name="staff_changed" readonly></td>
													<td><span class="staff_changed"></span></td>
												</tr>
											</tbody>
										</table>
									</form>
								</div>
								<div class="col-md-4">
									<div id="teamRate" class="impscoringRate">
										<div class="tr pad_left10"></div>
										<div class="tr staff_num">
											<div class="lineOdiv">
												<div class="lineIdiv" style="width:50%;"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr team_structure">
											<div class="lineOdiv">
												<div class="lineIdiv" style="width:20%;"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr researcher_working_year">
											<div class="lineOdiv">
												<div class="lineIdiv" style="width:75%;"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr researcher_managed_asset">
											<div class="lineOdiv">
												<div class="lineIdiv" style="width:50%;"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr researcher_invest_year">
											<div class="lineOdiv">
												<div class="lineIdiv" style="width:50%;"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr staff_changed">
											<div class="lineOdiv">
												<div class="lineIdiv" style="width:10%;"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
									</div>
								</div>
								<div class="col-md-8">
									<p class="distanceTop10">产品历史业绩:</p>
									<form id="objectivePrcInfo" name="objectivePrcInfo">
										<table class="impersonalTbl">
											<thead>
												<tr>
													<th>序号</th>
													<th>评分依据</th>
													<th>得分</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>1</td>
													<td><span>收益率:</span><input type="text" name="income" readonly></td>
													<td><span class="income"></span></td>
												</tr>
												<tr>
													<td>2</td>
													<td><span>最大回撤比:</span><input type="text" name="mdd" readonly></td>
													<td><span class="mdd"></span></td>
												</tr>
												<tr>
													<td>3</td>
													<td><span>收益回撤比:</span><input type="text" name="income_over_mdd" readonly></td>
													<td><span class="income_over_mdd"></span></td>
												</tr>
												<tr>
													<td>4</td>
													<td><span>极端行情表现:</span><span id="extreme" style="margin-left:5px;"></span></td>
													<td><span class="staff_changed"></span></td>
												</tr>
											</tbody>
										</table>
									</form>
								</div>
								<div class="col-md-4">
									<div id="prcRate" class="impscoringRate">
										<div class="tr pad_left10"></div>
										<div class="tr income">
											<div class="lineOdiv">
												<div class="lineIdiv" style="width:50%;"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr mdd">
											<div class="lineOdiv">
												<div class="lineIdiv" style="width:20%;"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr income_over_mdd">
											<div class="lineOdiv">
												<div class="lineIdiv" style="width:75%;"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr staff_changed">
											<div class="lineOdiv">
												<div class="lineIdiv" style="width:50%;"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
									</div>
								</div>
								<div class="col-md-8">
									<p class="distanceTop10">风险控制:</p>
									<form id="objectiveRiskcontrol" name="objectiveRiskcontrol">
										<table class="impersonalTbl">
											<thead>
												<tr>
													<th>序号</th>
													<th>评分依据</th>
													<th>得分</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>1</td>
													<td><span>是否有独立的风控部门:</span><input type="text" name="rc_system" readonly></td>
													<td><span class="rc_system"></span></td>
												</tr>
												<tr>
													<td>2</td>
													<td><span>核心风控人员从业年限:</span>1~3年以内<input type="text" name="rc_member" readonly></td>
													<td><span class="rc_member"></span></td>
												</tr>
												<tr>
													<td>3</td>
													<td><span>是否提供了完整的风控制度书面文件:</span><input type="text" name="rc_doc" readonly></td>
													<td><span class="rc_doc"></span></td>
												</tr>
											</tbody>
										</table>
									</form>
								</div>
								<div class="col-md-4">
									<div id="riskRate" class="impscoringRate">
										<div class="tr pad_left10"></div>
										<div class="tr rc_system">
											<div class="lineOdiv">
												<div class="lineIdiv"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr rc_member">
											<div class="lineOdiv">
												<div class="lineIdiv"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
										<div class="tr rc_doc">
											<div class="lineOdiv">
												<div class="lineIdiv"></div>
											</div>
											<div class="scorWeights"><span class="accountedFor"></span>%</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-12">
								<ul id="modulesUl" class="investmenTratings-observationPool-modulesUl">
									<li style="width:200px;">主观分析（<span id="usesubjectiveScore"></span>/100）
									</li>
									<!-- <li class="histolineActive"></li> -->
								</ul>
							</div>
							<div class="col-md-12 objectiveEvaluationdiv">
							<div class="col-md-8">
								<form id="subjectiveScore" name="subjectiveScore">
									<table class="subjectivelyTbl">
										<thead>
											<tr>
												<th>序号</th>
												<th>评分依据</th>
												<th>得分</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>1</td>
												<td>
													<div>主要股东背景:</div>
													<div>
														<span>标准:</span>股权结构是否主次分明，清晰合理
													</div>
												</td>
												<td><span class="sh_structure"></span></td>
											</tr>
											<tr>
												<td>2</td>
												<td>
													<div>组织架构:</div>
													<div>
														<span>标准:</span>组织架构是否合理分明
													</div>
												</td>
												<td><span class="department_structure"></span></td>
											</tr>
											<tr>
												<td>3</td>
												<td>
													<div>经营规划:</div>
													<div>
														<span>标准:</span>经营规划是否清晰合理，是否具备可操作性，是否存在重大隐患
													</div>
												</td>
												<td><span class="plan"></span></td>
											</tr>
											<tr>
												<td>4</td>
												<td>
													<div>核心投研人员教育/工作背景:</div>
													<div>
														<span>标准:</span>学历如何，过往工作单位如何，职位如何
													</div>
												</td>
												<td><span class="core_member"></span></td>
											</tr>
											<tr>
												<td>5</td>
												<td>
													<div>激励机制:</div>
													<div>
														<span>标准:</span>是否有明确的考核与激励机制，机制是否合理
													</div>
												</td>
												<td><span class="org_incentive"></span></td>
											</tr>
											<tr>
												<td>6</td>
												<td>
													<div>策略容量:</div>
													<div>
														<span>标准:</span>各类策略可接受容量额度是否足够
													</div>
												</td>
												<td><span class="strategy_scale"></span></td>
											</tr>
											<tr>
												<td>7</td>
												<td>
													<div>投资理念:</div>
													<div>
														<span>标准:</span>投资理念是否有理有据，是否具备可持续性和操作性
													</div>
												</td>
												<td><span class="invest_philosophy"></span></td>
											</tr>
											<tr>
												<td>8</td>
												<td>
													<div>投资流程:</div>
													<div>
														<span>标准:</span>综合评价投资决策流程是否清晰、成熟稳定、有操作性，有无明确的决策机制
													</div>
												</td>
												<td><span class="invest_process"></span></td>
											</tr>
											<tr>
												<td>9</td>
												<td>
													<div>交易系统:</div>
													<div>
														<span>标准:</span>综合评价投资决策流程是否清晰、成熟稳定、有操作性，有无明确的决策机制
													</div>
												</td>
												<td><span class="trading_system"></span></td>
											</tr>
	
											<tr>
												<td>10</td>
												<td>
													<div>产品相关事宜:</div>
													<div>
														<span>安全垫比例，金额:</span>前后端收费是否符合FOF项目要求
													</div>
												</td>
												<td><span class="invest_factors"></span></td>
											</tr>
											<tr>
												<td>11</td>
												<td>
													<div>风控流程:</div>
													<div>
														<span>标准:</span>综合评价风控流程是否清晰、有效、有可操作性、有无专人定期监控，有无完善的风控系统及科学的评价体系
													</div>
												</td>
												<td><span class="risk_control_process"></span></td>
											</tr>
										</tbody>
									</table>
								</form>
							</div>
							
							<div class="col-md-4">
								<div id="subjectiveRate" class="subscoringRate">
									<div class="tr pad_left10" style="height:34px;"></div>
									<div class="tr sh_structure">
										<div class="lineOdiv">
											<div class="lineIdiv"></div>
										</div>
										<div class="scorWeights"><span class="accountedFor"></span>%</div>
									</div>
									<div class="tr department_structure">
										<div class="lineOdiv">
											<div class="lineIdiv"></div>
										</div>
										<div class="scorWeights"><span class="accountedFor"></span>%</div>
									</div>
									<div class="tr plan">
										<div class="lineOdiv">
											<div class="lineIdiv"></div>
										</div>
										<div class="scorWeights"><span class="accountedFor"></span>%</div>
									</div>
									<div class="tr core_member">
										<div class="lineOdiv">
											<div class="lineIdiv"></div>
										</div>
										<div class="scorWeights"><span class="accountedFor"></span>%</div>
									</div>
									<div class="tr org_incentive">
										<div class="lineOdiv">
											<div class="lineIdiv"></div>
										</div>
										<div class="scorWeights"><span class="accountedFor"></span>%</div>
									</div>
									<div class="tr strategy_scale">
										<div class="lineOdiv">
											<div class="lineIdiv"></div>
										</div>
										<div class="scorWeights"><span class="accountedFor"></span>%</div>
									</div>
									<div class="tr invest_philosophy">
										<div class="lineOdiv">
											<div class="lineIdiv"></div>
										</div>
										<div class="scorWeights"><span class="accountedFor"></span>%</div>
									</div>
									<div class="tr invest_process">
										<div class="lineOdiv">
											<div class="lineIdiv"></div>
										</div>
										<div class="scorWeights"><span class="accountedFor"></span>%</div>
									</div>
									<div class="tr trading_system">
										<div class="lineOdiv">
											<div class="lineIdiv"></div>
										</div>
										<div class="scorWeights"><span class="accountedFor"></span>%</div>
									</div>
									<div class="tr invest_factors">
										<div class="lineOdiv">
											<div class="lineIdiv"></div>
										</div>
										<div class="scorWeights"><span class="accountedFor"></span>%</div>
									</div>
									<div class="tr risk_control_process">
										<div class="lineOdiv">
											<div class="lineIdiv"></div>
										</div>
										<div class="scorWeights"><span class="accountedFor"></span>%</div>
									</div>
								</div>
							</div>
						</div>
						</div>
						<div class="col-md-12 pad_left0 pad_right0 distanceTop40">
							<div class="header">
								<span>他人评分情况</span>
							</div>
							<div class="outerDiv distanceTop20">
								<table id="otherScoretbl" class="mainTbl"></table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- 内容部分结束-->
		<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
		<script>
			require(['huihong/InvestmentRatings/observationPool/rating/speakerBrowsing']);
		</script>
	</body>

</html>