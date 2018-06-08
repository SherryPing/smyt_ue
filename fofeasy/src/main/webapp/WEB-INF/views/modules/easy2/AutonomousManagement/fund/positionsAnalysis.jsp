<!-- 自主管理——持仓分析.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!-- 内容部分开始 -->
<section id="prcBasic" style="margin-top: 0px;">
	<div class="row">
		<div class="col-md-12">
			<!-- 母基金配置 -->
			<div id="parentFund" class="outerDiv" style="display: none;">
				<div class="infoTitle">
					<div class="pull-right">
						<input id="mother_startdate1"
							class="mother_date1 dateInp pull-left" placeholder="开始日期"
							name="date_start" readonly><span class="pull-left"
							style="margin:3px 20px;">至</span> <input id="mother_enddate1"
							class="mother_date1 dateInp pull-left" placeholder="结束日期"
							name="date_end" readonly>
					</div>
					<div class="introducTitle"></div>
					<div class="titleTxt">
						<span>母基金配置</span>
					</div>
				</div>
				<div class="col-md-12 distanceTop20 pad0">
					<table class="indicatorsTbl dataTable" id="parentfTbl"
						data-height="360">

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
						<div class="headerLeft"
							style="padding-top:5px;padding-left:20px;width:450px;">
							<button class="momchoicebtn positionChoice positionChoice_ac">资产占比</button>
							<button class="momchoicebtn positionChoice">VaR贡献占比</button>
							<button class="momchoicebtn positionChoice">波动率贡献占比</button>

						</div>
					</div>
					<div class="bchartContent momchoiceDiv"
						style="height: 278px;margin-top: 40px;" id="montherRoundchart"></div>
					<div class="bchartContent momchoiceDiv"
						style="height: 278px;margin-top: 40px;display:none;"
						id="FluctuationChar"></div>
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
							<input id="mother_startdate2"
								class="mother_date2 dateInp pull-left" placeholder="开始日期"
								name="date_start" readonly><span style="margin:0 20px;">至</span>
							<input id="mother_enddate2"
								class="mother_date2 dateInp pull-left" placeholder="结束日期"
								name="date_end" readonly>
						</div>
					</div>
					<div id="momtimeChart" class="bigCharts border_none height360"></div>
				</div>
				<!-- 策略配置 -->
				<div id="policyConfiguration">
					<div class="infoTitle">
						<div class="pull-right">
							<input id="strategy_startdate1"
								class="strategy_date1 dateInp pull-left" placeholder="开始日期"
								name="date_start" readonly><span class="pull-left"
								style="margin:3px 20px;">至</span> <input id="strategy_enddate1"
								class="strategy_date1 dateInp pull-left" placeholder="结束日期"
								name="date_end" readonly>
						</div>
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span>策略配置</span>
						</div>
					</div>
					<!-- 策略配置表 -->
					<div class="col-md-12 distanceTop20">
						<table class="indicatorsTbl dataTable" id="policyTbl"
							data-height="280">
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
										class="strategy_date2 dateInp pull-left" placeholder="开始日期"
										name="date_start" readonly><span
										style="margin:0 20px;">至</span> <input id="strategy_enddate2"
										class="strategy_date2 dateInp pull-left" placeholder="结束日期"
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
								style="height: 350px; width: 100%;">

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
											<li><button id="m1" class="slcliBtn slcliBtnactiv">1M</button></li>
											<li><button id="m3" class="slcliBtn">3M</button></li>
											<li><button id="m6" class="slcliBtn">6M</button></li>
											<li><button id="y1" class="slcliBtn">1Y</button></li>
											<li><input style="text-align: right;" class="form_date"
												size="16" type="text" value="" placeholder="开始日期" readonly>&nbsp;--&nbsp;
												<input class="form_date" size="16" type="text" value=""
												placeholder="截止日期" readonly></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="schartContent" id="correlationTbl"
								style="padding-top:20px;min-width:600px;width: 100%;height: 300px;">
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
			<!-- 资产配置 -->
			<div id="assetAllocation" class="outerDiv">
				<div class="infoTitle">
					<div class="introducTitle"></div>
					<div class="titleTxt">
						<span>资产配置</span>
					</div>
				</div>
				<div class="Select">
					<div id="slider">
						<ul id="positionUl" class="assetUl" style="width:440px;">
							<li>资产账户</li>
							<li>股票资产</li>
							<li>期货资产</li>
							<li>债券资产</li>
							<li class="histolineActive" style="left: -110px;"></li>
						</ul>
					</div>
					<div id="asseLine" style="width:440px;"></div>
				</div>
			<!-- 资产账户 -->
				<div id="assetAllocationdiv" class="assetAllocationDiv">
					<!-- 资产配置时序图 -->
					<div id="timelineDiagram" class="assetAllocation">
						<div class="charHeader">
							<div class="headerLeft">
								<div class="charHeadpil"></div>
								<span class="charHeadtxt">资产配置时序图</span>
							</div>
							<div class="headerRight">
								<input id="asset_startdate1"
									   class="account_date1 dateInp pull-left" placeholder="开始日期"
									   name="date_start" readonly><span style="margin:0 20px;">至</span>
								<input id="asset_enddate1"
									   class="account_date1 dateInp pull-left" placeholder="结束日期"
									   name="date_end" readonly>
							</div>
						</div>
						<div id="assetAccountchart"
							 class="bigCharts border_none height360"></div>
						<div class="col-md-12 pad30">
							<table class="indicatorsTbl positionsTbl2 dataTable"
								   id="assetAccounttbl">
							</table>
						</div>
					</div>
				</div>
				<!-- 股票资产 -->
			<div id="stockAssets" class="assetAllocationDiv"
				style="display: none;">
				<!-- 行业分析 -->
				<div class="titleDiv">
					<div></div>
					<span>行业分析</span>
				</div>
				<div class="sonFunddiv border">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">行业配置时序图</span>
						</div>
						<div class="headerRight">
							<input id="stock_startdate1"
								class="dateInp pull-left stock_date1" value="2017-05-30"
								placeholder="开始日期" name="date_start" readonly><span
								style="margin:0 20px;">至</span> <input id="stock_enddate1"
								class="dateInp pull-left stock_date1" placeholder="结束日期"
								name="date_end" readonly>
						</div>
					</div>
					<div class="bigCharts border_none height360" id="stockIndustryGrid">
					</div>
					<div class="col-md-12 pad30">
						<table class="indicatorsTbl positionsTbl2 dataTable"
							id="stockIndustryTab">

						</table>
					</div>
				</div>
				<!-- 市值分析 -->
				<div class="titleDiv">
					<div></div>
					<span>市值分析</span>
				</div>
				<div class="sonFunddiv border">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">市值配置时序图</span>
						</div>
						<div class="headerRight">
							<input id="stock_startdate2"
								class="dateInp pull-left stock_date2" value="2017-05-30"
								placeholder="开始日期" name="date_start" readonly><span
								style="margin:0 20px;">至</span> <input id="stock_enddate2"
								class="dateInp pull-left stock_date2" placeholder="结束日期"
								name="date_end" readonly>
						</div>
					</div>

					<div class="bigCharts border_none height360"
						id="stockMarketValueGrid"></div>

					<div class="col-md-12 pad30">
						<table class="indicatorsTbl positionsTbl2 dataTable"
							id="stockMarketValueTab">

						</table>
					</div>
				</div>
				<!-- 股票分析 -->
				<div class="titleDiv">
					<div></div>
					<span>股票分析</span>
				</div>
				<div class="sonFunddiv border">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">持股集中度时序图</span>
						</div>
						<div class="headerRight">
							<input id="stock_startdate3"
								class="dateInp pull-left stock_date3" placeholder="开始日期"
								name="date_start" value="2017-05-30" readonly><span
								style="margin:0 20px;">至</span> <input id="stock_enddate3"
								class="dateInp pull-left stock_date3" placeholder="结束日期"
								name="date_end" readonly>
						</div>
					</div>
					<div class="bigCharts border_none height360"
						id="stockAnalysisCentralizedGrid"></div>
					<div class="col-md-12 pad30">
						<table class="indicatorsTbl positionsTbl2 dataTable"
							id="stockAnalysisValuationTab">

						</table>
					</div>
				</div>
				<!--重仓股-->
				<div class="sonFunddiv border">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
						</div>
					</div>
					<table id="stockAnalysisCentralizedTab" class="hwuTbl">
						<tbody>
							<tr>
								<td><span>最大重仓股</span></td>
								<td><span></span></td>
								<td>
									<div></div>
								</td>
							</tr>
							<tr>
								<td><span>前两大重仓股</span></td>
								<td><span></span></td>
								<td>
									<div></div>
								</td>
							</tr>
							<tr>
								<td>前三大重仓股</td>
								<td><span></span></td>
								<td>
									<div></div>
								</td>
							</tr>
							<tr>
								<td>前五大重仓股</td>
								<td><span></span></td>
								<td>
									<div></div>
								</td>
							</tr>
							<tr>
								<td>前十大重仓股</td>
								<td><span></span></td>
								<td>
									<div></div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- 股票资产组合风险 -->
				<div class="assetAllocation" style="padding-bottom:30px;">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">组合风险</span>
						</div>
					</div>
					<div class="info">
						<ul id="stockAnalysisPortfoliorisk" class="infoUl">
							<li>
								<div class="info-left">
									<img src="${ctxResources}/images/Positions-asset-1.png">
								</div>
								<div class="info-right">
									<span class="Money"></span> <br> <span class="Type"
										style="margin-left:10px;">股票现货市值</span>
								</div>
							</li>
							<li>
								<div class="info-left">
									<img src="${ctxResources}/images/Positions-asset-2.png">
								</div>
								<div class="info-right">
									<span class="Money"></span> <br> <span class="Type"
										style="margin-left:10px;">股指期货市值</span>
								</div>
							</li>
							<li>
								<div class="info-left">
									<img src="${ctxResources}/images/Positions-asset-3.png">
								</div>
								<div class="info-right">
									<span class="Money"></span> <br> <span class="Type"
										style="margin-left:10px;">净敞口</span>
								</div>
							</li>
							<li>
								<div class="info-left">
									<img src="${ctxResources}/images/Positions-asset-4.png">
								</div>
								<div class="info-right">
									<span class="Money"></span> <br> <span
										style="margin-left:10px;" class="Type">股票组合beta</span>
								</div>
							</li>
						</ul>
						<table class="riskTbl1">
							<thead>
								<tr>
									<th>置信度</th>
									<th>天数</th>
									<th>VaR（万元）</th>
									<th>VaR/净资产</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td rowspan="8">
										<div class="roundPercen">
											<img src="${ctxResources}/images/tabRound-1.png">
										</div>
										<div class="roundPercen">
											<img src="${ctxResources}/images/tabRound-2.png">
										</div>
									</td>
									<td id="95_1_1"></td>
									<td id="95_1_2"></td>
									<td id="95_1_3"></td>
								</tr>
								<tr>
									<td id="95_2_1"></td>
									<td id="95_2_2"></td>
									<td id="95_2_3"></td>
								</tr>
								<tr>
									<td id="95_3_1"></td>
									<td id="95_3_2"></td>
									<td id="95_3_3"></td>
								</tr>
								<tr>
									<td id="95_4_1"></td>
									<td id="95_4_2"></td>
									<td id="95_4_3"></td>
								</tr>
								<tr>

									<td id="99_1_1"></td>
									<td id="99_1_2"></td>
									<td id="99_1_3"></td>
								</tr>
								<tr>
									<td id="99_2_1"></td>
									<td id="99_2_2"></td>
									<td id="99_2_3"></td>
								</tr>
								<tr>
									<td id="99_3_1"></td>
									<td id="99_3_2"></td>
									<td id="99_3_3"></td>
								</tr>
								<tr>
									<td id="99_4_1"></td>
									<td id="99_4_2"></td>
									<td id="99_4_3"></td>
								</tr>
							</tbody>
						</table>
						<div class="assetSchar">
							<div class="halfChar">
								<div id="stockAnalysisVarGrid1" class="halfCharcontent"></div>
							</div>
							<div class="halfChar">
								<div id="stockAnalysisVarGrid2" class="halfCharcontent"></div>
							</div>
						</div>
					</div>
				</div>
				<!-- 股票资产交易行为分析 -->
				<div class="col-md-12 border" style="margin-top: 20px;">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">交易行为分析</span>
						</div>
					</div>
					<div class="info">
						<table id="stockAnalysisTransactions" class="riskTbl1 smalTbl"
							style="width:43%;margin-left:3%;">

						</table>
						<div class="assetSchar"
							style="height: 290px;min-width: 400px;width: calc(100% - 49% - 20px);">
							<div class="transferContent" id="transferChar">
								<div id="title">
									<img src="${ctxResources}/images/jisuanqi.png">私募云通计算
								</div>
								<div class="transFercontent">
									在<span id="calculationStarday"></span>至<span
										id="calculationendday"></span>期间,<br> 产品换手率为 <span
										class="result" id="prcChangehands">25.96%</span>日换手率<span
										id="dayChangehands" class="result">1.04%</span>
								</div>
								<div class="Signal">
									<span style="font-size: 15px;">信号：</span><br> <span>交易当日对应收盘均价超前一交易日收盘均价，当日为信号日。如：5日买入信号即交易当日的5日收盘均价超前一交易日的5日收盘均价，5日卖出信号即交易当日的5日收盘均价低于前一交易日的5日收盘均价。</span><br>
									<span>趋势买入（卖出）：买入（卖出）交易发生在信号日</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 期货资产 -->
			<div id="futuresAssets" class="assetAllocationDiv" style="display: none;">
				<div class="titleDiv">
					<div></div>
					<span>账户概况</span>
				</div>
				<div class="col-md-12 border">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">账户净值分析</span>
						</div>
					</div>
					<div class="col-md-7">
						<div class="charHeader">
							<button class="easy1Btn">累计收益</button>
						</div>
						<div class="smallCharts border_none statesDiv"
							id="futures_account_net_chart"></div>
					</div>
					<div class="col-md-5">
						<div class="charHeader">
							<span class="pull-left">统计区间：</span> <input
								class="futures_date1 dateInp pull-left" placeholder="开始日期"
								name="date_start" readonly><span class="pull-left"
								style="margin:3px 20px;">至</span> <input
								class="futures_date1 dateInp pull-left" placeholder="结束日期"
								name="date_end" readonly>
						</div>
						<table class="accountTbl">
							<tr>
								<td>
									<div>累计收益率</div>
									<div></div>
								</td>
								<td>
									<div>收益风险比</div>
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
									<div>发生时间</div>
									<div></div>
								</td>
								<td>
									<div>形成期</div>
									<div></div>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="col-md-12 border distanceTop20">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">账户出入金分析</span>
						</div>
					</div>
					<div class="charHeader">
						<button class="accessFreq positionChoice positionChoice_ac">逐日</button>
						<button class="accessFreq positionChoice">逐月</button>
						<div class="headerRight">
							<input class="futures_date2 dateInp pull-left" placeholder="开始日期"
								name="date_start" readonly><span style="margin:0 20px;">至</span><input
								class="futures_date2 dateInp pull-left" placeholder="结束日期"
								name="date_end" readonly>
						</div>
					</div>
					<div id="accessdaydiv">
						<div id="ukashDaychart"
							class="bigCharts border_none height360 marginbottom40"></div>
						<div class="col-md-12 pad30">
							<table id="ukashDaytbl"
								class="indicatorsTbl positionsTbl2 accountTbl" data-height="400">

							</table>
						</div>
					</div>
					<div id="accessmonthdiv" style="display:none;">
						<div class="col-md-12">
							<div id="ukashMonthchart"
								class="bigCharts border_none height360 marginbottom40"></div>
						</div>
						<div class="col-md-12 pad30">
							<table id="ukashMonthtbl"
								class="indicatorsTbl positionsTbl2 accountTbl" data-height="400">

							</table>
						</div>
					</div>
				</div>
				<div class="col-md-12 border distanceTop20">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">隔夜风险</span>
						</div>
						<div class="headerRight">
							<input class="futures_date3 dateInp pull-left" placeholder="开始日期"
								name="date_start" readonly><span style="margin:0 20px;">至</span>
							<input class="futures_date3 dateInp pull-left" placeholder="结束日期"
								name="date_end" readonly>
						</div>
					</div>
					<div class="bigCharts border_none height360 marginbottom40"
						id="overnightRiskchart"></div>
				</div>
				<div class="titleDiv">
					<div></div>
					<span>头寸分析</span>
				</div>
				<div class="col-md-12 border">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">平均净头寸</span>
						</div>
						<div class="headerRight">
							<input class="futures_date4 dateInp pull-left" placeholder="开始日期"
								name="date_start" readonly><span style="margin:0 20px;">至</span>
							<input class="futures_date4 dateInp pull-left" placeholder="结束日期"
								name="date_end" readonly>
						</div>
					</div>
					<div id="PositionsChart"
						class="bigCharts border_none height360 marginbottom40"></div>
					<table id="PositionsTbl"
						class="indicatorsTbl positionsTbl2 dataTable">

					</table>
				</div>
				<div class="titleDiv">
					<div></div>
					<span>盈亏分析</span>
				</div>
				<div class="col-md-12 border">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">按交易方向</span>
						</div>
						<!-- <div class="headerRight">
							<input class="futures_date5 dateInp pull-left"
								placeholder="开始日期" name="date_start" readonly><span
								style="margin:0 20px;">至</span> <input
								class="futures_date5 dateInp pull-left" placeholder="结束日期" name="date_end"
								readonly>
						</div> -->
					</div>
					<div class="col-md-6">
						<div class="smallCharts earningDiv border_none" id="profitchart1"></div>
						<div class="smallCharts earningDiv border_none">
							<div class="charHeader">
								<div class="headerLeft">
									<div class="charHeadpil"></div>
									<span class="charHeadtxt">按交易类型</span>
								</div>
							</div>
							<div id="profitchart2" class="smallCharts earningDiv border_none"
								style="height:240px;"></div>
						</div>
					</div>
					<div class="col-md-6">
						<table class="indicatorsTbl positionsTbl2 dataTable"
							id="profitTbl1">

						</table>
					</div>
				</div>
				<div class="col-md-12 border distanceTop20">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">交易盈亏</span>
						</div>
					</div>
					<div class="col-md-12 distanceTop20">
						<div class="col-md-12">
							<div id="pieChart1" class="piechart3p1"></div>
							<div id="pieChart2" class="piechart3p1"></div>
						</div>
						<div class="col-md-12 pad30">
							<table class="indicatorsTbl positionsTbl2 dataTable"
								id="profitTbl2">

							</table>
						</div>
					</div>
				</div>
				<div class="col-md-12 border distanceTop20">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">特色指标</span>
						</div>
					</div>
					<div class="col-md-12 distanceTop20">
						<div class="col-md-12 pad30">
							<table id="datalistTbl"
								class="indicatorsTbl positionsTbl2 dataTable">
							</table>
						</div>
					</div>
				</div>
				<div class="titleDiv">
					<div></div>
					<span>品种分析</span>
				</div>
				<div class="col-md-12 border">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">各品种交易盈亏图</span>
						</div>
					</div>
					<div class="col-md-8 smallCharts border_none">
						<div class="charHeader">
							<div class="headerLeft">
								<button id="nightBtn" class="varietychoice1 positionChoice positionChoice_ac">隔夜交易</button>
								<button id="dayBtn" class="varietychoice1 positionChoice ">日内交易</button>
							</div>
						</div>
						<div id="varietyNight" class="nightTransact varietyDiv1 smallCharts border_none" style="width:100%;height:240px;"></div>
						<div id="varietyDay" class="dayTransact varietyDiv1 smallCharts border_none" style="display:none;width:100%;height:240px;"></div>
					</div>
					<div class="col-md-4 smallCharts border_none">
						<div class="charHeader">
							<div class="headerLeft">
								<button class="varietychoice2 positionChoice positionChoice_ac">成交手数</button>
								<!--<button class="varietychoice2 positionChoice">成交额</button> -->
							</div>
						</div>
						<div id="varietyroundNight" class="nightTransact varietyDiv2 smallCharts border_none" style="width:100%;height:240px;"></div>
						<div id="varietyroundDay" class="dayTransact varietyDiv2 smallCharts border_none" style="display:none;width:100%;height:240px;"></div>
					</div>
					<div class="col-md-12 distanceTop20 pad30">
						<table class="nightTransact indicatorsTbl dataTable" id="VarietyNighttbl" >
						</table>
						<table class="dayTransact indicatorsTbl dataTable" id="VarietyDaytbl" style="display:none;">
						</table>
					</div>
				</div>
				<!-- 期货资产模态框（Modal） -->
				<div class="modal fade" id="varietiesModal" tabindex="-1"
					role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog" style="width: 90%;">
						<div class="modal-content">
							<div class="modal-body">
								<button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button>
								<div class="moutDiv border">
									<div class="mcharHeader">
										<div class="mheaderLeft">
											<div class="mcharHeadpil"></div>
											<span class="mcharHeadtxt">各品种交易盈亏图</span>
										</div>
									</div>
									<div class="col-md-m8" style="height: 300px;">
										<div class="mcharHeader">
											<div class="mheaderLeft">
												<button class="easy1Btn">单位净值</button>
												<button class="easy1Btn">累计收益率</button>
											</div>
										</div>
									</div>
									<div class="col-md-m4" style="height: 300px;">
										<div class="mcharHeader">
											<div class="mheaderLeft">
												<span>统计区间参与交易的天数:</span>
											</div>
										</div>
									</div>
								</div>
								<div class="moutDiv border distanceTop20">
									<div class="mcharHeader">
										<div class="mheaderLeft">
											<div class="mcharHeadpil"></div>
											<span class="mcharHeadtxt">隔夜风险</span>
										</div>
									</div>
									<div style="width: 100%;height: 300px;"></div>
								</div>
								<div class="moutDiv border distanceTop20">
									<div class="mcharHeader">
										<div class="mheaderLeft">
											<div class="mcharHeadpil"></div>
											<span class="mcharHeadtxt">某某图</span>
										</div>
									</div>
									<div style="width: 100%;height: 300px;"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 债券资产 -->
			<div id="bondAssets" class="assetAllocationDiv" style="display: none;">
				<div class="titleDiv">
					<div></div>
					<span>券种分析</span>
				</div>
				<div class="col-md-12 border">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
						</div>
						<div class="headerRight">
							<input id="bondstartdate11" class="dateInp pull-left bondsDate1" placeholder="开始日期" name="date_start" readonly>
							<span style="margin:0 20px;">至</span>
							<input id="bondenddate11" class="dateInp pull-left bondsDate1" placeholder="结束日期" name="date_end" readonly>
						</div>
					</div>
					<div id="couponSpeciesChart" class="bigCharts" style="height: 240px;border: none;"></div>
					<div class="col-md-12  pad30">
						<table id="couponSpeciesTbl" class="indicatorsTbl positionsTbl2 dataTable">
						</table>
					</div>
				</div>

				<div class="col-md-12 border_none pad0">
					<div class="col-md-6 pad_left0">
						<div class="titleDiv">
							<div></div>
							<span>期限分析</span>
						</div>
						<div id="termPie" class="bigCharts">

						</div>
					</div>
					<div class="col-md-6 pad_right0">
						<div class="titleDiv">
							<div></div>
							<span>利息分析</span>
						</div>
						<div id="interestPie" class="bigCharts">

						</div>
					</div>
				</div>
				<div class="titleDiv">
					<div></div>
					<span>评级分析</span>
				</div>
				<div class="col-md-12 border">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="mcharHeadtxt">配置时序图</span>
						</div>
						<div class="headerRight">
							<input id="asset_startdate12" class="dateInp pull-left bondsDate2" placeholder="开始日期" name="date_start" readonly>
							<span style="margin:0 20px;">至</span>
							<input id="asset_enddate12" class="dateInp pull-left bondsDate2" placeholder="结束日期" name="date_end" readonly>
						</div>
					</div>
					<div id="ratingCharts" class="bigCharts" style="height: 240px;border: none;"></div>
					<div class="col-md-12 pad30">
						<table id="ratingAnalysistbl" class="indicatorsTbl positionsTbl2 dataTable"></table>
					</div>
				</div>
				<div class="col-md-12 border distanceTop20">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">集中度分析</span>
						</div>
					</div>
					<table id="bondCentralized" class="hwuTbl">
					</table>
				</div>
			</div>
		</div>
	</div>
</section>