<!-- easy2.0组合配置持仓分析.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<section>
	<div class="row">
		<div class="col-md-12">
			<div id="parentFund">
				<!-- 基金配置 -->
				<div id = 'fund_allocation' class='hidden'>
				<div class="infoTitle">
					<div class="pull-right">
						<input id="mother_startdate1" class="mother_date dateInp pull-left"
						placeholder="开始日期" name="date_start" readonly><span class="pull-left"
						style="margin:3px 20px;">至</span> <input id="mother_enddate1"
						class="mother_date dateInp pull-left" placeholder="结束日期" name="date_end"
						readonly>
					</div>
					<div class="introducTitle"></div>
					<div class="titleTxt">
						<span>基金配置</span>
					</div>
				</div>
				<div class="col-md-12 distanceTop20">
					<table class="indicatorsTbl dataTable" id="parentfTbl"
						>

					</table>
				</div>
				<!-- 收益与var贡献，波动率图 -->
				<div class="cirChart distanceTop20" style="margin-left:0px;">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">收益贡献占比</span>
						</div>
					</div>
					<div class="bchartContent" style="height: 278px;margin-top: 40px;"
						id="mincomeChart"></div>
				</div>
				<div class="cirChart distanceTop20">
					<div class="charHeader">
						<div class="headerLeft" style="padding-top:5px;padding-left:20px;width:450px;">
							<button class="momchoicebtn positionChoice positionChoice_ac">资产占比</button>
							<button class="momchoicebtn positionChoice">VaR贡献占比</button>
							<button class="momchoicebtn positionChoice">波动率贡献占比</button>
							
						</div>
					</div>
					<div class="bchartContent momchoiceDiv"
						style="height: 278px;margin-top: 40px;"
						id="montherRoundchart"></div>
					<div class="bchartContent momchoiceDiv"
						style="height: 278px;margin-top: 40px;display:none;" id="FluctuationChar">

					</div>
					<div class="bchartContent momchoiceDiv"
						style="height: 278px;margin-top: 40px;display:none;"
						id="momVolatility"></div>
						
				</div>
				<!-- 子基金时序图 -->
				<div class="assetAllocation">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">子基金组合时序图</span>
						</div>
						<div class="headerRight">
						<input id="mother_startdate2" class="mother_date dateInp pull-left" placeholder="开始日期" name="date_start" readonly><span style="margin:0 20px;">至</span>
						<input id="mother_enddate2" class="mother_date dateInp pull-left" placeholder="结束日期" name="date_end" readonly>
						</div>
					</div>
					<div id="momtimeChart" class="bigCharts border_none height360"></div>
				</div>
				</div>
				<!-- 策略配置 -->
				<div id="policyConfiguration">
					<div class="infoTitle">
						<div class="pull-right">
							<input id="strategy_startdate1"
								class="mother_date dateInp pull-left" placeholder="开始日期"
								name="date_start" readonly><span class="pull-left"
								style="margin:3px 20px;">至</span> <input id="strategy_enddate1"
								class="mother_date dateInp pull-left" placeholder="结束日期"
								name="date_end" readonly>
						</div>
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span>策略配置</span>
						</div>
					</div>
					<!-- 策略配置表 -->
					<div class="col-md-12 distanceTop20">
						<table class="indicatorsTbl dataTable" id="policyTbl">
						</table>
					</div>
					<!-- 策略配置小charts图 -->
					<div id="policyChart">
						<div class="cirChart distanceTop20" style="margin-left:0px;">
							<div class="charHeader">
								<div class="headerLeft">
									<div class="charHeadpil"></div>
									<span class="charHeadtxt">收益贡献占比</span>
								</div>
							</div>
							<div class="bchartContent"
								style="height: 280px;margin-top: 40px;" id="incomeChart">

							</div>
						</div>
						<div class="cirChart distanceTop20">
							<div class="charHeader">
								<div class="headerLeft"
									style="padding-top:5px;padding-left:20px;width:450px;">
									<button class="choicebtn positionChoice positionChoice_ac">资产占比</button>
									<button class="choicebtn positionChoice">VaR贡献占比</button>
									<button class="choicebtn positionChoice">波动率贡献占比</button>
								</div>
							</div>
							<div class="bchartContent choiceDiv"
								style="height: 278px;margin-top: 40px;" id="policyRound"></div>
							<div class="bchartContent choiceDiv"
								style="height: 278px;margin-top: 40px;display:none;"
								id="policyVar"></div>
							<div class="bchartContent choiceDiv"
								style="height: 278px;margin-top: 40px;display:none;"
								id="policyVolatility"></div>
						</div>
						<!-- 策略配置时序图 -->
						<div class="assetAllocation pull-left">
							<div class="charHeader">
								<div class="headerLeft">
									<div class="charHeadpil"></div>
									<span class="charHeadtxt">子策略组合时序图</span>
								</div>
								<div class="headerRight">
									<input id="strategy_startdate2"
										class="mother_date dateInp pull-left" placeholder="开始日期"
										name="date_start" readonly><span
										style="margin:0 20px;">至</span> <input id="strategy_enddate2"
										class="mother_date dateInp pull-left" placeholder="结束日期"
										name="date_end" readonly>
								</div>
							</div>
							<div id="policytimeChart" class="bigCharts border_none height360"></div>
						</div>
					</div>
					<!-- 策略相关性 -->
					<div id="policyDependencies">
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>策略相关性</span>
							</div>
						</div>
						<div class="thermalForce" id="headtMapdiv">
							<div class="titleDiv">
								<div></div>
								<span>基金与指数滚动相关系数</span>
							</div>
							<div class="forceHeader" style="height:110px;">
								<div class="choice pull-left">
									<div class="choiceTitle">
										<span>市场指数</span>
									</div>
									<div class="choiceContent">
										<button type="button"
											class="checkboxBtn checkboxBtnshort checkboxActive"
											value="沪深300" id="HS300">沪深300</button>
										<button type="button"
											class="checkboxBtn checkboxBtnshort checkboxActive"
											value="中证500" id="ZZ500">中证500</button>
										<button type="button"
											class="checkboxBtn checkboxBtnshort checkboxActive"
											value="上证50" id="SZ50">上证50</button>
										<button type="button"
											class="checkboxBtn checkboxBtnshort checkboxActive"
											value="中债指数" id="debtIndex">中债指数</button>
										<button type="button"
											class="checkboxBtn checkboxBtnshort checkboxActive"
											value="南华商品指数" id="nanhuaShop">南华商品</button>
									</div>
								</div>
								<div class="choice pull-left">
									<div class="choiceTitle">
										<span>策略指数</span>
									</div>
									<div class="choiceContent" id="strategyIndexdiv">
										<button type="button" class="checkboxBtn checkboxBtnshort"
											value="私募全市场指数" id="allMark">私募全市场</button>
										<button type="button" class="checkboxBtn checkboxBtnshort"
											value="私募FOF指数" id="FOF">私募FOF</button>
										<button type="button" class="checkboxBtn checkboxBtnshort"
											value="股票多头策略指数" id="stockBulls">股票多头策略</button>
										<button type="button" class="checkboxBtn checkboxBtnshort"
											value="股票多空策略指数" id="stockEmpty">股票多空策略</button>
										<button type="button" class="checkboxBtn checkboxBtnshort"
											value="市场中性策略指数" id="marketNeutrality">市场中性策略</button>
										<button type="button" class="checkboxBtn checkboxBtnshort"
											value="债券基金指数" id="bondFunds">债券基金</button>
										<button type="button" class="checkboxBtn checkboxBtnshort"
											value="管理期货策略指数" id="manageFutures">管理期货策略</button>
										<button type="button" class="checkboxBtn checkboxBtnshort"
											value="宏观策略指数" id="macroStrategy">宏观策略</button>
										<button type="button" class="checkboxBtn checkboxBtnshort"
											value="事件驱动策略指数" id="eventDriven">事件驱动策略</button>
										<button type="button" class="checkboxBtn checkboxBtnshort"
											value="相对价值策略指数" id="relativeValue">相对价值策略</button>
										<button type="button" class="checkboxBtn checkboxBtnshort"
											value="多策略指数" id="multiStrategy">多策略指数</button>
										<button type="button" class="checkboxBtn checkboxBtnshort"
											value="组合策略指数" id="portfolioInvestment">组合策略指数</button>
									</div>
								</div>
							</div>
							<div class="bchartContent" id="corLhotchar"
								style="height: 350px;width: 100%; margin: 0 auto">

							</div>
						</div>
						<div class="thermalForce">
							<div class="titleDiv" style="margin-left:36px;">
								<div></div>
								<span>子基金相关系数</span>
							</div>
							<div class="forceHeader">
								<div class="choice">
									<div class="choiceTitle">
										<span>统计期间：</span>
									</div>
									<div id="Frequency" class="choiceContent"
										style="margin-left:0px;">
										<ul class="freSlcul" style="margin-left:20px;float:left;">
											<li><button id="m1" class="slcliBtn">1M</button></li>
											<li><button id="m3" class="slcliBtn">3M</button></li>
											<li><button id="m6" class="slcliBtn">6M</button></li>
											<li><button id="y1" class="slcliBtn slcliBtnactiv">1Y</button></li>
											<li><input style="text-align: right;" class="form_date dateInp"
												size="16" type="text" value="" placeholder="开始日期" readonly>&nbsp;--&nbsp;
												<input class="form_date dateInp" size="16" type="text" value=""
												placeholder="截止日期" readonly></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="schartContent" id="correlationTbl"
								style="padding-top:20px;min-width:600px;height: 300px;">
								<%--<div class="chartsTbldiv" style="min-width:650px;">--%>
									<%--<div id="left_titlediv2" class="left_titlediv2"></div>--%>
									<%--<table id="subFundtbl" class="chartsTbl2">--%>
										<%--<thead id="correlationTblhead"></thead>--%>
										<%--<tbody id="correlationTblbody"></tbody>--%>
									<%--</table>--%>
								<%--</div>--%>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>