<!-- 
	策略组合 
-->
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
		<div id="policyCom" class="comContent">
			<ul class="comPrcul">
				<%-- <li class="fLi">
				<a href="${ctxPage}/combination/detail/44526A4284B42456CFA313822422FBFB">
					<div class="comHeader">
						<span class="proName">AMS2018</span> <span class="bigNumber">1.0737</span>
						<span class="smallNumber">0.0008</span> <span class="smallNumber">0.07%</span>
					</div>
					<div class="comValue">
						<span class="netAssets">净资产（万元）：</span> <span class="netValue">3.33</span>
						<span class="netAssets">今日盈亏（元）：</span> <span class="netValue">24.00</span>
						<span class="netAssets">持仓仓位：</span> <span class="netValue">96%</span>
					</div>
					</a>
				</li> --%>
			</ul>
			<div class="distanceTop">
				<div class="infoTitle">
					<div class="introducTitle"></div>
					<div class="titleTxt">
						<span class="pull-left">重大风控事项提醒</span>
					</div>
				</div>
				<table id='windControlWarningTab'></table>
			</div>
			<!-- 策略指数累计收益率 -->
			<div class="infoTitle">
				<div class="pull-right">
					<input class="Yield_date1 dateInp pull-left" placeholder="开始日期"
						name="date_start" readonly><span class="pull-left"
						style="margin:3px 20px;">至</span> <input
						class="Yield_date1 dateInp pull-left" placeholder="结束日期"
						name="date_end" readonly>
				</div>
				<div class="introducTitle"></div>
				<div class="titleTxt">
					<span class="pull-left">策略指数累计收益率</span>
				</div>
			</div>
			<div id="cumulativeReturnChart" class="schartContent height360"></div>
			<!-- 指数相关性 -->
			<div id="policyDependencies">
				<div class="infoTitle distanceTop0">
					<div class="introducTitle"></div>
					<div class="titleTxt">
						<span>指数相关性</span>
					</div>
				</div>
				<div class="col-md-12 distanceTop20" id="heatMapdiv">
					<div class="forceHeader pull-left">
						<div class="choice pull-left">
							<span class="choiceTitle" style="margin-top:5px;">关注指数:</span><select
								id="attentionIndex" class="form-control"
								style="display:inline-block;margin-left:20px;width:auto;">
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
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort checkboxActive"
									data-id="hs300">沪深300</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort checkboxActive"
									data-id="csi500">中证500</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort checkboxActive"
									data-id="sse50">上证50</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort checkboxActive"
									data-id="cbi">中债指数</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort checkboxActive"
									data-id="nfi">南华商品</button>

							</div>
						</div>
						<div class="choice pull-left">
							<div class="choiceTitle">
								<span>策略指数:</span>
							</div>
							<div class="choiceContent" id="strategyIndexdiv">
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort" data-id="FI01">私募全市场</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort" data-id="FI03">私募FOF</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort" data-id="FI04">股票多头策略</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort" data-id="FI05">股票多空策略</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort" data-id="FI06">市场中性策略</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort" data-id="FI07">债券基金</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort" data-id="FI08">管理期货策略</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort" data-id="FI09">宏观策略</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort" data-id="FI10">事件驱动策略</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort" data-id="FI11">相对价值策略</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort" data-id="FI12">多策略指数</button>
								<button type="button" name="benchmark"
									class="checkboxBtn checkboxBtnshort" data-id="FI13">组合策略指数</button>
							</div>
						</div>
					</div>
					<div class="bigCharts border_none" id="correlationchart"
						style="width:100%;"></div>
				</div>
				<div class="thermalForce">
					<div class="forceHeader">
						<div class="choice">
							<div class="choiceTitle">
								<span>统计期间：</span>
							</div>
							<div id="Frequency" class="choiceContent"
									style="margin-left:0px;">
									<ul class="freSlcul" style="margin-left:20px;float:left;">
										<li><button id="m6" class="slcliBtn slcliBtnactiv">6M</button></li>
										<li><button id="y1" class="slcliBtn">1Y</button></li>
										<li><button id="y2" class="slcliBtn">2Y</button></li>
										<li><input style="text-align: right;" class="form_date"
											size="16" type="text" value="" placeholder="开始日期" readonly>&nbsp;--&nbsp;
											<input class="form_date" size="16" type="text" value=""
											placeholder="截止日期" readonly></li>
									</ul>
								</div>
						</div>
					</div>
					<div id="correlationTbldiv"
						style="width:100%;height: 290px">
						<div class="chartsTbldiv">
							<div id="left_titlediv2" class="left_titlediv2"></div>
							<table class="chartsTbl2">
								<thead id="correlationTblhead"></thead>
								<tbody id="correlationTblbody"></tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<!-- 模态框（Modal） -->
				<div class="modal fade" id="SetUpAlerts" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog" style="margin-top:5%;width:55%;min-width:800px;">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
										&times;
									</button>
								<h4 class="modal-title" style="font-size:18px;">
										设置预警
									</h4>
							</div>
							<div class="modal-body">
								
								<!-- 预警设定 -->
								<div class="alertSet">
									<form id = 'setUpAlertsForm'>
									<input name='user_id' type="hidden" value=''>
									<input name='fund_id' type="hidden" value=''>
									<input name='freq_length' type="hidden" value='m6'>
									<!-- <div class="Select" style="display:inline-block;">
										<div id="slider" style="margin-left: 40px;">
											<ul id="historyUl">
												<li id="motherName">母基金</li>
												<li class='Sub-fund hidden'>子基金</li>
												<li style="margin-top: 30px;margin-left:-220px;" class="histolineActive" id="histolineActive"></li>
											</ul><br>
										</div>
										<div id="hitoryLine" style="width: 220px;"></div>
									</div> -->
									<div class="fundDiv">
										<div class='subFundList hidden'>
										<span style="margin-left: 45px;">子基金：</span>
										<div class='' style="display:inline-block;">
												<select id='fund_id1' class='form-control' style='width: 100px'>
													
												</select>
										</div>
										</div>
										<div class="radioDiv">
											
											<div>
												<input id="malertCondit" type="radio" name="alert_type" value="0" checked="checked">
												<label for="malertCondit">预警条件</label>
											</div>
											<div>
												<input id="mstopCondition" type="radio" name="alert_type" value="1">
												<label for="mstopCondition">止损条件</label>
											</div>
										</div>
										<div style="padding-left:105px;">
									<span>统计区间</span>
									<div class="statisticalInterval" style="margin-left:10px;">
										<input id = "freq_star" style="text-align: right;" class="form_date" size="16" type="text"  placeholder="开始日期" readonly>&nbsp;&nbsp;--&nbsp;&nbsp;
										<input id = "freq_end" class="form_date" size="16" type="text"  placeholder="截止日期" readonly>
									</div>
								</div>
								<div class="valueDiv">
									<div>
										<span>净值</span>
													<div class="inputDiv">
														<select class="pull-left" name='nav_notation'>
															<option value="less_than_or_equal_to"><=</option>
															<option value="less_than"><</option>
															<option value="more_than_or_equal_to">>=</option>
															<option value="more_than">></option>
														</select>
														<input type="text" name="nav">
													</div>
												</div>
												<div class= 'Sub-fund hidden'><span>单个子基金规模权重（%）</span>
													<div class="inputDiv">
														<select class="pull-left  " name='weight_notation'>
															<option value="more_than_or_equal_to">>=</option>
															<option value="more_than">></option>
															<option value="less_than_or_equal_to"><=</option>
															<option value="less_than"><</option>
														</select>
														<input class=' ' type="text" name="weight">
													</div>
												</div>
										</div>
										<hr class='pull-left distanceTop20' style="width: 90%">
										<div class="valueDiv">
											<div style="width:100%;">
												<div id="Frequency" style="width:100%;text-align:left;margin-top:0px;">
													<ul class="freSlcul" style="float:none;margin-left:50px;min-width:580">
														<li style="border:none;width:80px;padding-top:10px;text-align: left;"><span>统计区间</span></li>
														<!-- <li><button type="button" data-val='m3' class="m3 slcliBtn">3M</button></li> -->
														<li><button type="button" data-val='m3' class="m3 slcliBtn">3M</button></li>
														<li><button type="button" data-val='m6' class="m6 slcliBtn">6M</button></li>
														<li><button type="button" data-val='y1' class="y1 slcliBtn">1Y</button></li>
														<li><button type="button" data-val='y2' class="y2 slcliBtn">2Y</button></li>
														<li><button type="button" data-val='y3' class="y3 slcliBtn">3Y</button></li>
														<li><button type="button" data-val='y5' class="y5 slcliBtn">5Y</button></li>
														<!-- <li><button type="button" data-val='total' class="total slcliBtn">成立以来</button></li> -->
													</ul>
												</div>
											</div>
											<div><span>年化收益率（%）</span>
												<div class="inputDiv">
													<select class="pull-left" name='return_a_notation'>
															<option value="less_than_or_equal_to"><=</option>
															<option value="less_than"><</option>
															<option value="more_than_or_equal_to">>=</option>
															<option value="more_than">></option>
														</select>
														<input type="text" name="return_a">
												</div>
											</div>
											<div><span>动态回撤（%）</span>
												<div class="inputDiv">
													<select class="pull-left" name='max_retracement_notation'>
															<option value="more_than_or_equal_to">>=</option>
															<option value="more_than">></option>
															<option value="less_than_or_equal_to"><=</option>
															<option value="less_than"><</option>
														</select>
														<input type="text" name="max_retracement">
												</div>
											</div>
											<div><span>年化夏普比</span>
												<div class="inputDiv">
													<select class="pull-left" name='sharp_a_notation'>
															<option value="less_than_or_equal_to"><=</option>
															<option value="less_than"><</option>
															<option value="more_than_or_equal_to">>=</option>
															<option value="more_than">></option>
														</select>
														<input type="text" name="sharp_a">
												</div>
											</div>
											<div><span>年化波动率（%）</span>
												<div class="inputDiv">
													<select class="pull-left" name='std_a_notation'>
															<option value="more_than_or_equal_to">>=</option>
															<option value="more_than">></option>
															<option value="less_than_or_equal_to"><=</option>
															<option value="less_than"><</option>
														</select>
														<input type="text" name="std_a">
												</div>
											</div>

										</div>
									</div>
									</form>
								</div>
								<div class="modal-footer" style="border:none;">
									<div class="distanceTop20 confirmPrcdiv" style="float:none;">
										<button id = "subBtn" disabled='disabled'>确定</button>
										<button  type="reset">重置</button>
										<button data-dismiss="modal">取消</button>
									</div>
								</div>
							</div>
							<!-- /.modal-content -->
						</div>
						<!-- /.modal -->
					</div>
				</div>
		</div>