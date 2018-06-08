<!-- easy2.0组合配置-业绩指标.jsp -->
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

				<div class="charHeader distanceTop20">
					<div class="headerLeft">
						<div class="charHeadpil"></div>
						<span id="main_title" class="charHeadtxt pop" data-toggle="popover" data-trigger="hover" data-content="反映基金在统计区间内投资的收益率,该指标越大越好。" data-placement='right'>累计收益率 <img src="${ctxResources}/images/info_b.png" class="infoImg" style="width: 16px;height:16px;">  </span>
					</div>
					<div class="headerRight">
					<button class="easy1Btn pull-left" style="margin-right:20px;" id="lastYear">近一年</button>										
						<button class="easy1Btn pull-left" style="margin-right:20px;"
							id="showAll">显示全部</button>
						<input class="dateInp cdata pull-left" placeholder="开始日期"
							name="date_start" id="yield_date_start" readonly> <span>至</span>
						<input class="dateInp cdata pull-left" style="margin-right:20px;"
							placeholder="结束日期" name="date_end" id="yield_date_end" readonly>

					</div>
				</div>
				<div id="netCharts"></div>
			</div>
			<div class="netSplitline"></div>
			<div id="netTbl" class="dataTbl">

				<table class="mainTbl" id="nav-main-grid"></table>
			</div>
			
			<div class="bgGraydiv">
				
				<div id='statistikDato' class="frequencyRdiv">
					<span>统计日期：</span> <span>1971-1-1</span>
				</div>
			</div>

			<!-- 收益指标 -->
			<div class="infoTitle">
				<div class="introducTitle"></div>
				<div class="titleTxt">
					<span>收益指标</span>
				</div>
			</div>
			<div class="indicatorsContent">
				<!-- 收益指标滑动条 -->
				<div style="float: left;width: 100%;margin-top: 0px;">
					<div id="incomeSlider">
						<ul id="incomeUl">
							<li data-indicator='return'>累计收益率</li>
							<li data-indicator='return_a'>年化收益率</li>
							<li class="histolineActive" style="margin-left:-220px;"></li>
						</ul>
						<br>
					</div>
					<div id="incomeLine"></div>
				</div>
				<!-- 收益指标大的charts图 -->
				<div class="bigCharts" id="incomeBcharts"
					style="margin-bottom: 20px;"></div>
				<!-- 收益指标表 -->
				<div class="col-md-5">
					<table id='incomeIndicatorsTab' class="indicatorsTbl dataTable"
						style="height:323px;"></table>
				</div>
				<!-- 收益指标小的charts图 -->
				<div class="col-md-7 smallCharts" style="height:322px;">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">正负收益周期比</span>
						</div>
						<div class="headerSright">
							<select id='incomeIndicatorsSLT' class="form-control">
							</select>
						</div>
						<div class="schartContent1" id="incomeCycleRatio"></div>
						<div class="chartRightcnt">
							<div>
								<span class="line"> </span>
								<div id='return_bm_div' class="productName">沪深300</div>
								<div>正收益期数</div>
							</div>
							<div>
								<span class="line" style="background-color:#FF82A0;"> </span>
								<div id='return_pe_div' class="productName">债券基金指数</div>
								<div>正收益期数</div>
							</div>
							<div>
								<span class="line" style="background-color:#4BECFF;"> </span>
								<div id='return_fund_div' class="productName">债券基金指数</div>
								<div>正收益期数</div>
							</div>
							<div>
								<span class="line" style="background-color:#ECEFF2;"> </span>
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
				</div>
			</div>
			<div class="indicatorsContent">
				<!-- 风险指标表 -->
				<div class="col-md-5">
					<table id='riskIndicatorsTab' class="indicatorsTbl dataTable"
						style="height:203px;"></table>
				</div>
				<!-- 风险指标小的charts图 -->
				<div class="col-md-7 smallCharts" style="height:202px;">
					<div class="charHeader">
						<div class="headerSright">
							<select id='riskIndicatorsSLT' class="form-control"></select>
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
							<button class="easy1Btn pull-left" style="margin-right:20px;"
								id="showAll1">显示全部</button>
							<input class="dateInp cdata pull-left" placeholder="开始日期"
								name="date_start" id="Retreat_date_start" readonly> <span>至</span>
							<input class="dateInp cdata pull-left" placeholder="结束日期"
								name="date_end" id="Retreat_date_end" readonly>
						</div>
					</div>
					<div id="riskBcharts" class="bchartContent" style="height: 300px;"></div>
				</div>
			</div>
			<!-- 风险调整收益指标 -->
			<div class="infoTitle distanceTop0">
				<div class="introducTitle"></div>
				<div class="titleTxt">
					<span class="pop" data-toggle="popover" data-trigger="hover"  data-content="基本思路是对收益加以风险调整，可以实现对收益和风险的综合考虑。" data-placement='right'>风险调整收益指标  <img src="${ctxResources}/images/info_b.png" class="infoImg" style="width: 16px;height:16px;"></span>
				</div>
			</div>
			<div class="indicatorsContent">
				<!-- 风险调整收益指标表 -->
				<div class="col-md-5">
					<table id='riskAdjustmentTab' class="indicatorsTbl dataTable"
						style="height:323px;"></table>
				</div>
				<!-- 风险调整收益指标小的charts图 -->
				<div class="col-md-7 smallCharts" id="incomeScharts2"
					style="height:322px;">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt pop" data-toggle="popover" data-trigger="hover"  data-content="该指标是最常用的风险调整后收益指标，反映了承担每一单位总风险而获得的超额收益率，该比率越大越好。在相同风险前提下，我们都希望基金给我们相对更高的回报；或者说在相同收益的前提下，所承受的风险最小。
	缺点在于收益率要服从正态分布，受基准影响大。" data-placement='right'>年化夏普比  <img src="${ctxResources}/images/info_b.png" class="infoImg" style="width: 16px;height:16px;"></span>
						</div>
						<div class="headerSright">
							<select id='riskAdjustmentSLT' class="form-control">
							</select>
						</div>
					</div>
					<div class="schartContent" id="riskAdjustmentGrid"
						style="height:280px;"></div>
				</div>
			</div>
			<!-- 相对指标 -->
						<div class="infoTitle distanceTop0">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>相对指标</span>
							</div>
						</div>
						<div class="indicatorsContent">
						<div class="col-md-5">
							<table id='relativeIndexTab' class="indicatorsTbl dataTable" style="height:323px;"></table>
						</div>
							<!-- 相对指标 小的charts图 -->
						<div class="col-md-7 smallCharts" id="incomeScharts" style="height:322px;">
								<div class="charHeader">
						<div class="headerSright">
							<select id='riskAdjustmentSLT1' class="form-control">
							</select>
						</div>
					</div>
								<div class="schartContent" id="relativeIndexGrid" style="height:280px;"></div>
							</div>
		</div>
	</div>
</section>