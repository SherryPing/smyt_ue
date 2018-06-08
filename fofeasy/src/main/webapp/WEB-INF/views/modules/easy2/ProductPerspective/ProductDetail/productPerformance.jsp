<!-- easy2.0业绩指标.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
	<section id="performanceIndicators" style="margin-top: 0px;">
			<div class="row">
				<div class="col-md-12">
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>历史净值</span>
							</div>
						</div>			
						<div class="netCharts">
							<div class="charHeader distanceTop20" style="margin-top:20px">
									<div class="headerLeft">
										<div class="charHeadpil"></div>
										<span id="main_title" class="charHeadtxt pop" data-toggle="popover" data-trigger="hover" data-content="反映基金在统计区间内投资的收益率,该指标越大越好。" data-placement='right'>累计收益率 <img src="${ctxResources}/images/info_b.png" class="infoImg" style="width: 16px;height:16px;">  </span>
									</div>
									<div class="headerRight">
										<button class="easy1Btn pull-left" style="margin-right:20px;" id="lastYear">近一年</button>
										<button class="easy1Btn pull-left" style="margin-right:20px;" id="showAll">显示全部</button>
										<input class="dateInp cdata pull-left" placeholder="开始日期"name="date_start" id="yield_date_start"readonly>
										<span>至</span>
										<input class="dateInp cdata pull-left" style="margin-right:20px;" placeholder="结束日期" name="date_end" id="yield_date_end" readonly>
									</div>
								</div>
							<div id="netCharts">
							</div>
						</div>
						<%--<div class="netSplitline"></div>--%>
						<div id="netTbl" class="dataTbl">
								<table class="mainTbl" id="nav-main-grid"></table>
						</div>
						<!-- 同类排名 -->
						<div class="infoTitle distanceTop0" id="rankingTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span id="rankName">同类排名</span><span id="rank_staticdate" class="black mleft20">(截止日期)</span>
							</div>
						</div>
						<div class="indicatorsContent" id="rankingDiv">
							<div class="col-md-5">
								<table id='similarRankingsTab' class="indicatorsTbl dataTable"></table>
							</div>
							<div class="col-md-7 smallCharts" style="height:280px;">
								<div class="charHeader">
									<div class="headerLeft">
											<div class="charHeadpil"></div>
											<span class="charHeadtxt">战胜同策略基金比例</span>
									</div>
									<div class="headerSright">
										<select id='similarRankingsSLT' class="form-control">
										</select>
									</div>
								</div>
								<div class="schartContent" id="similarRankingsGrid"></div>
								</div>
						</div>
						<div class="bgGraydiv" style="height:70px">
								<div class="frequencyLdiv" id="freqDiv">
									<span class="frequencyTxt" style="padding-top: 12px">频率：</span>
									<div class="netFrequency " data-freq='w'>周</div>
									<div class="netFrequency frequencyActive" data-freq='m'>月</div>
								</div>
						</div>
						<!-- 收益指标 -->
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>收益指标</span>
								<span class="static_date black mleft20"></span>
							</div>
						</div>
							<div class="indicatorsContent">
							<!-- 收益指标滑动条 -->
							<div style="float: left;width: 100%;">
								<div id="incomeSlider">
									<ul id="incomeUl">
										<li data-indicator='return'>累计收益率</li>
										<li data-indicator='return_a'>年化收益率</li>
										<li class="histolineActive" style="margin-left:-220px;"></li>
									</ul><br>
								</div>
								<div id="incomeLine"></div>
							</div>
							<!-- 收益指标大的charts图 -->
							<div class="bigCharts" id="incomeBcharts" style="margin-bottom: 20px;">
							</div>
								<!-- 收益指标表 -->
							<div class="col-md-5">
								<table id='incomeIndicatorsTab' class="indicatorsTbl dataTable" style="height:323px;"></table>
							</div>
							<!-- 收益指标小的charts图 -->
							<div class="col-md-7 smallCharts" style="height:322px;">
									<div class="charHeader">
										<div class="headerLeft">
											<div class="charHeadpil"></div>
											<span class="charHeadtxt">正负收益周期比</span>
										</div>
										<div class="headerSright">
											<select id = 'incomeIndicatorsSLT' class="form-control">
											</select>
										</div>
										<div class="schartContent1" id="incomeCycleRatio">
										</div>
										<div class="chartRightcnt">
											<div>
												<span class="line">
												</span>
												<div id = 'return_bm_div' class="productName">沪深300</div>
												<div>正收益期数</div>
											</div>
											<div>
												<span class="line" style="background-color:#FF82A0;">
												</span>
												<div id = 'return_pe_div' class="productName">债券基金指数</div>
												<div>正收益期数</div>
											</div>
											<div>
												<span class="line" style="background-color:#4BECFF;">
												</span>
												<div id = 'return_fund_div' class="productName">债券基金指数</div>
												<div>正收益期数</div>
											</div>
											<div>
											<span class="line" style="background-color:#ECEFF2;">
												</span>
												<div>&nbsp;</div>
												<div>负收益期数</div>
											</div>
										</div>
									</div>
							</div>
						</div>
						<!-- 风险指标 -->
						<div class="infoTitle distanceTop0">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>风险指标</span>
								<span class="static_date black mleft20"></span>
							</div>
						</div>
						<div class="indicatorsContent">
							<!-- 风险指标表 -->
							<div class="col-md-5">
								<table id='riskIndicatorsTab' class="indicatorsTbl dataTable" style="height:203px;"></table>
							</div>
							<!-- 风险指标小的charts图 -->
							<div class="col-md-7 smallCharts" style="height:202px;">
									<div class="charHeader">
										<div class="headerSright">
											<select id= 'riskIndicatorsSLT' class="form-control"></select>
										</div>
									</div>
									<div class="schartContent" id="riskScharts" style="height:160px;">
									</div>
							</div>
							<!-- 风险指标大的charts图 -->
							<div class="bigCharts" style="margin-top: 10px;">
								<div class="charHeader">
									<div class="headerLeft">
										<div class="charHeadpil"></div>
										<span class="charHeadtxt pop" data-toggle="popover" data-trigger="hover"  data-content="动态回撤是指在基金净值从历史最高点开始回落的幅度，当动态回撤为0时，表示该基金创新高。" data-placement='right'>动态回撤  <img src="${ctxResources}/images/info_b.png" class="infoImg" style="width: 16px;height:16px;"></span>
									</div>
									<div class="headerRight">
										<button class="easy1Btn pull-left" style="margin-right:20px;" id="lastYear1">近一年</button>
										<button class="easy1Btn pull-left" style="margin-right:20px;" id="showAll1">显示全部</button>
										<input class="dateInp cdata pull-left" placeholder="开始日期"name="date_start" id="Retreat_date_start"readonly>
										<span>至</span>
										<input class="dateInp cdata pull-left" placeholder="结束日期" name="date_end" id="Retreat_date_end" readonly>		
									</div>
								</div>
								<div id="riskBcharts" class="bchartContent" style="height: 300px;">
								</div>
							</div>
						</div>
						<!-- 风险调整收益指标 -->
						<div class="infoTitle distanceTop0">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span >风险调整收益指标</span>
								<span class="static_date black mleft20"></span>
							</div>
						</div>
						<div class="indicatorsContent">
							<!-- 风险调整收益指标表 -->
							<div class="col-md-5">
								<table id='riskAdjustmentTab' class="indicatorsTbl dataTable" style="height:323px;"></table>
							</div>
							<!-- 风险调整收益指标小的charts图 -->
							<div class="col-md-7 smallCharts" id="incomeScharts" style="height:324px;">
									<div class="charHeader">
										<div class="headerLeft">
											<div class="charHeadpil"></div>
											<span class="charHeadtxt pop" data-toggle="popover" data-trigger="hover"  data-content="反映承担每一单位风险而获得的超额收益率，采用年化波动率来衡量风险，该指标越大越好。" data-placement='right'>年化夏普比  <img src="${ctxResources}/images/info_b.png" class="infoImg" style="width: 16px;height:16px;"></span>
										</div>
										<div class="headerSright">
											<select id= 'riskAdjustmentSLT' class="form-control">
											</select>
										</div>
									</div>
									<div class="schartContent" id="riskAdjustmentGrid" style="height:280px;">
									</div>
							</div>
						</div>
						<!-- 相对指标 -->
						<div class="infoTitle distanceTop0">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>相对指标</span>
								<span class="static_date black mleft20"></span>
							</div>
						</div>
						<div class="indicatorsContent">
						<div class="col-md-5" id="relatiDiv">
							<table id='relativeIndexTab' class="indicatorsTbl dataTable" style="height:323px;"></table>
							<span id="noTab" style="display:none">产品净值数据不足，无业绩指标</span>
						</div>
							<!-- 相对指标 小的charts图 -->
						<div class="col-md-7 smallCharts" id="relativeScharts" style="height:322px;">
								<div class="charHeader">
									<div class="headerSright">
										<select name="relativeIndexBMK" class="form-control">
											<option value="hs300">沪深300</option>
											<option value="csi500">中证500</option>
											<option value="sse50">上证50</option>
											<option value="cbi">中债指数</option>
											<option value="nfi">南华商品指数</option>
										</select>
									</div>
								</div>
								<div class="schartContent" id="relativeIndexGrid" style="height:280px;"></div>
							</div>
					</div>
				</div>
			</div>
		</section>