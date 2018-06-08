<!-- easy2.0情景分析.jsp -->
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
			<div class="col-md-12 distanceTop20" style="padding-left: 0px;">
				<span>事件</span>
				<div class="menuDiv left10">
					<div class="show_menu">
						<span id="showName">2018年2月全球股市暴跌</span>
						<span class="caret pull-right" style="margin-right: 10px;margin-top: 10px;"></span>
					</div>
					<ul id="first_menu" class="first_menu" style="display: none;">
						<li class="strategy1"><a>管理期货市场</a>
							<ul class="head_twoMenu">
								<li class="strategy number1" data-name="双十一夜盘“大屠杀”" data-id="25">双十一夜盘“大屠杀”(2017-11-11至2017-11-15)</li>
								<li class="strategy number1" data-name="黑色系商品大跌" data-id="24">黑色系商品大跌(2017-02-03至2017-02-04)</li>
								<li class="strategy number1" data-name="2016年期货“单边市”" data-id="20">2016年期货“单边市”(2016-10-10至2016-12-09)</li>
								<li class="strategy number1" data-name="国债期货和黑色系暴跌" data-id="23">国债期货和黑色系暴跌(2016-11-29至2016-11-30)</li>
								<li class="strategy number1" data-name="2016年极端天气" data-id="18">2016年极端天气(2016-06-01至2016-07-30)</li>
								<li class="strategy number1" data-name="2016年“黑色系”暴涨" data-id="21">2016年“黑色系”暴涨(2016-01-01至2016-04-15)</li>
								<li class="strategy number1" data-name="金属扩大供应" data-id="19">金属扩大供应(2015-10-04至2015-10-31)</li>
								<li class="strategy number1" data-name="全球大宗商品暴跌" data-id="22">全球大宗商品暴跌(2015-07-06至2015-07-08)</li>
							</ul>
						</li>
						<li class="strategy1"><a>固收（债券）市场</a>
							<ul class="head_twoMenu">
								<li class="strategy number1" data-name="证监会清理资金池类债券产品" data-id="15">证监会清理资金池类债券产品(2017-05-04至2017-05-11)</li>
								<li class="strategy number1" data-name="货币政策继续去杠杆" data-id="14">货币政策继续去杠杆(2017-03-20至2017-03-27)</li>
								<li class="strategy number1" data-name="2016年债灾" data-id="9">2016年债灾(2016-10-24至2016-12-16)</li>
								<li class="strategy number1" data-name="信用债违约" data-id="10">信用债违约(2016-04-01至2016-06-03)</li>
								<li class="strategy number1" data-name="15-16年人民币降息" data-id="13">15-16年人民币降息(2015-05-12至2016-02-26)</li>
								<li class="strategy number1" data-name="市场大量信贷传闻" data-id="16">市场大量信贷传闻(2016-01-14至2016-01-27)</li>
								<li class="strategy number1" data-name="美联储首次加息" data-id="11">美联储首次加息(2015-12-15至2015-12-31)</li>
								<li class="strategy number1" data-name="系列国际风险事件发酵" data-id="17">系列国际风险事件发酵(2015-09-24至2015-10-28)</li>
								<li class="strategy number1" data-name="“811”人民币汇改" data-id="12">“811”人民币汇改(2015-08-11至2015-08-18)</li>
							</ul>
						</li>
						<li class="strategy1">
							<a>A股市场</a>
							<ul class="head_twoMenu">
								<li class="strategy number1" data-name="2018年2月全球股市暴跌" data-id="1">2018年2月全球股市暴跌(2018-02-05至2018-02-09)</li>
								<li class="strategy number1" data-name="2017年创业板大跌" data-id="3">2017年创业板大跌(2016-12-01至2017-07-17)</li>
								<li class="strategy number1" data-name="2017年“一九”行情" data-id="2">2017年“一九”行情(2017-05-05至2017-06-12)</li>
								<li class="strategy number1" data-name="证监会主席痛斥“野蛮收购”现象" data-id="4">证监会主席痛斥“野蛮收购”现象(2016-12-03至2017-01-16)</li>
								<li class="strategy number1" data-name="2016年人民币纳入SDR" data-id="5">2016年人民币纳入SDR(2016-10-01至2016-11-28)</li>
								<li class="strategy number1" data-name="2016股市熔断" data-id="8">2016股市熔断(2016-01-04至2016-01-07)</li>
								<li class="strategy number1" data-name="股灾2.0" data-id="7">股灾2.0(2015-08-19至2015-09-29)</li>
								<li class="strategy number1" data-name="股灾1.0" data-id="6">股灾1.0(2015-06-12至2015-08-18)</li>
							</ul>
						</li>
					</ul>
				</div>
					<%--<ul id="first_menu" class="first_menu" style="display: none;">--%>
						<%--<li class="strategy1"><a>管理期货市场</a>--%>
							<%--<ul class="head_twoMenu">--%>
								<%--<li class="strategy number1" data-name="双十一夜盘“大屠杀”" data-id="25">双十一夜盘“大屠杀”(2017-11-11至2017-11-15)</li>--%>
								<%--<li class="strategy number1" data-name="黑色系商品大跌" data-id="24">黑色系商品大跌(2017-02-03至2017-02-04)</li>--%>
								<%--<li class="strategy number1" data-name="2016年期货“单边市”" data-id="20">2016年期货“单边市”(2016-10-10至2016-12-09)</li>--%>
								<%--<li class="strategy number1" data-name="国债期货和黑色系暴跌" data-id="23">国债期货和黑色系暴跌(2016-11-29至2016-11-30)</li>--%>
								<%--<li class="strategy number1" data-name="2016年极端天气" data-id="18">2016年极端天气(2016-06-01至2016-07-30)</li>--%>
								<%--<li class="strategy number1" data-name="2016年“黑色系”暴涨" data-id="21">2016年“黑色系”暴涨(2016-01-01至2016-04-15)</li>--%>
								<%--<li class="strategy number1" data-name="金属扩大供应" data-id="19">金属扩大供应(2015-10-04至2015-10-31)</li>--%>
								<%--<li class="strategy number1" data-name="全球大宗商品暴跌" data-id="22">全球大宗商品暴跌(2015-07-06至2015-07-08)</li>--%>
							<%--</ul>--%>
						<%--</li>--%>
						<%--<li class="strategy1"><a>固收（债券）市场</a>--%>
							<%--<ul class="head_twoMenu">--%>
								<%--<li class="strategy number1" data-name="证监会清理资金池类债券产品" data-id="15">证监会清理资金池类债券产品(2017-05-04至2017-05-11)</li>--%>
								<%--<li class="strategy number1" data-name="货币政策继续去杠杆" data-id="14">货币政策继续去杠杆(2017-03-20至2017-03-27)</li>--%>
								<%--<li class="strategy number1" data-name="2016年债灾" data-id="9">2016年债灾(2016-10-24至2016-12-16)</li>--%>
								<%--<li class="strategy number1" data-name="信用债违约" data-id="10">信用债违约(2016-04-01至2016-06-03)</li>--%>
								<%--<li class="strategy number1" data-name="15-16年人民币降息" data-id="13">15-16年人民币降息(2015-05-12至2016-02-26)</li>--%>
								<%--<li class="strategy number1" data-name="市场大量信贷传闻" data-id="16">市场大量信贷传闻(2016-01-14至2016-01-27)</li>--%>
								<%--<li class="strategy number1" data-name="美联储首次加息" data-id="11">美联储首次加息(2015-12-15至2015-12-31)</li>--%>
								<%--<li class="strategy number1" data-name="系列国际风险事件发酵" data-id="17">系列国际风险事件发酵(2015-09-24至2015-10-28)</li>--%>
								<%--<li class="strategy number1" data-name="“811”人民币汇改" data-id="12">“811”人民币汇改(2015-08-11至2015-08-18)</li>--%>
							<%--</ul>--%>
						<%--</li>--%>
						<%--<li class="strategy1">--%>
							<%--<a>A股市场</a>--%>
							<%--<ul class="head_twoMenu">--%>
								<%--<li class="strategy number1" data-name="2018年2月全球股市暴跌" data-id="1">2018年2月全球股市暴跌(2018-02-05至2018-02-09)</li>--%>
								<%--<li class="strategy number1" data-name="2017年创业板大跌" data-id="3">2017年创业板大跌(2016-12-01至2017-07-17)</li>--%>
								<%--<li class="strategy number1" data-name="2017年“一九”行情" data-id="2">2017年“一九”行情(2017-05-05至2017-06-12)</li>--%>
								<%--<li class="strategy number1" data-name="证监会主席痛斥“野蛮收购”现象" data-id="4">证监会主席痛斥“野蛮收购”现象(2016-12-03至2017-01-16)</li>--%>
								<%--<li class="strategy number1" data-name="2016年人民币纳入SDR" data-id="5">2016年人民币纳入SDR(2016-10-01至2016-11-28)</li>--%>
								<%--<li class="strategy number1" data-name="2016股市熔断" data-id="8">2016股市熔断(2016-01-04至2016-01-07)</li>--%>
								<%--<li class="strategy number1" data-name="股灾2.0" data-id="7">股灾2.0(2015-08-19至2015-09-29)</li>--%>
								<%--<li class="strategy number1" data-name="股灾1.0" data-id="6">股灾1.0(2015-06-12至2015-08-18)</li>--%>
							<%--</ul>--%>
						<%--</li>--%>
					<%--</ul>--%>

			</div>
			<div class="col-md-5 distanceTop20" style="height:250px;margin-top:20px">
				<form name="testTbl">
					<table class="infodataTable" id="event-main-table" style="height: 240px;">
						<tbody>
						<tr>
							<td>事件</td>
							<td><input type="text" readonly name="row_name"></td>
						</tr>
						<tr>
							<td>日期范围</td>
							<td id="tblDate"></td>
						</tr>
						<tr>
							<td>沪深300涨跌幅</td>
							<td><input type="text" readonly name="bm"></td>
						</tr>
						<tr>
							<td>基金收益率</td>
							<td><input type="text" readonly name="fund"></td>
						</tr>
						</tbody>
					</table>
				</form>
			</div>
			<div class="col-md-7 distanceTop20">
				<div class="bigCharts" style="height: 250px;">
					<div class="charHeader">
						<div class="headerLeft">
							<div class="charHeadpil"></div>
							<span class="charHeadtxt">收益统计</span>
						</div>
						<div class="schartContent" id="earningStatistic1"
							style="height: 210px;"></div>
					</div>
				</div>
			</div>
			<div class="col-md-12" style="font-size:14px;color:red;margin-top: 5px;">
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
				<div class="bigCharts" id="incomeScharts" style="height: 360px;margin-top:0">
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