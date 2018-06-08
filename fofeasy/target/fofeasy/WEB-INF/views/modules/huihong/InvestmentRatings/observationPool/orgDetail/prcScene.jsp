<!-- 尽调评价   情景分析.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<section id="SituationalAnalysis">
	<div class="row">
		<div class="col-md-12">
			<!-- 情景分析 -->
			<div class="infoTitle">
				<div class="introducTitle"></div>
				<div class="titleTxt">
					<span>压力测试</span>
				</div>
			</div>
			<div class="col-md-5 distanceTop20" style="height:350px;">
				<table class="analysisTbl dataTable" id="event-main-table">
				</table>
			</div>
			<div class="col-md-7">
				<div class="bigCharts" style="height: 350px;">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">收益统计</span>
						</div>
						<div class="schartContent" id="earningStatistic1"
							style="height: 310px;"></div>
					</div>
				</div>
			</div>
			<div class="col-md-12" style="font-size:14px;color:red;">
				注："--"表示该产品在日期范围内无净值数据</div>
			<div class="infoTitle">
				<div class="frequencyRdiv" style="width:350px;margin-top: 0px;">
					<input class="dateInp cdata" placeholder="开始日期" name="date_start"
						id="Retreat_date_start" readonly> <span>至</span> <input
						class="dateInp cdata" placeholder="结束日期" name="date_end"
						id="Retreat_date_end" readonly>
				</div>
				<div class="introducTitle"></div>
				<div class="titleTxt" style="margin-bottom:20px;">
					<span>市道分析</span>
				</div>
				<table class="mainTbl marketAnalysistbl"
					style="width: 100%;border:1px solid #ddd;" id="market-main-table">
				</table>
			</div>
			<div class="indicatorsContent">
				<!-- 收益指标大的charts图 -->
				<div class="bigCharts" id="incomeScharts" style="height: 360px;">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">收益统计</span>
						</div>
						<div class="schartContent" id="earningStatistic2"
							style="height: 320px;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>