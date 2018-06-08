<!-- easy2.0投顾挖掘业绩指标.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<div class="row">
	<div class="col-md-12">
		<div class="infoTitle ">
			<div class="introducTitle"></div>
			<div class="titleTxt">
				<span>收益风险比</span>
			</div>
		</div>
		<div class="pull-left distanceTop20" style="width:160px;">
			<select id="dateSlc" class="form-control">
				<option data-id="total">成立以来</option>
				<option data-id="year">今年以来</option>
				<option data-id="m3">近三个月</option>
				<option data-id="m6">近六个月</option>
				<option data-id="y1">近一年</option>
			</select>
		</div>
		<div class="distanceTop20 pull-left" style="width:100%;">
			<table class="indicatorsTbl dataTable" id="revenueRisktbl"></table>
		</div>
		<div class="bigCharts" style="padding-top:10px;    height: 360px;">
			<div class="charHeader" style="margin-top:0px;">
				<div class="headerLeft" style="margin-left:10px;width:146px;">
					<select id="riskSlc1" class="form-control">
						<option id="return_a">年化收益率</option>
						<option id="excess_a">超额年化收益率</option>
					</select>
				</div>
			</div>
			<div class="schartContent" id="revenueRiskcharts"
				style="text-align:center;line-height:238px;height: 270px;"></div>
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
			<div class="introducTitle"></div>
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
		<div class="infoTitle">
			<div class="introducTitle"></div>
			<div class="titleTxt">
				<span>盈利能力</span>
				<span id="return_static_date" class="black mleft20"></span>
			</div>
		</div>
		<div class="col-md-5 distanceTop20">
			<table class="indicatorsTbl dataTable height360"
				id="profitabilityTbl" style="text-align:center;line-height: 360px;"></table>
		</div>
		<div class="col-md-7 distanceTop20" id="incomeScharts" style="padding-right:0px;">
			<div class="schartContent border height360">
				<div class="charHeader">
					<div class="headerLeft">
						<div class="charHeadpil"></div>
						<span class="charHeadtxt pop" data-toggle="popover" data-trigger="hover"  data-content="反映基金在统计区间内投资的收益率,该指标越大越好。" data-placement='right'>累计收益率  <img src="${ctxResources}/images/info_b.png" class="infoImg" style="width: 16px;height:16px;"></span>
					</div>
					<div class="headerSright">
						<select id='profitabilitySlc' class="form-control">
							<option data-id="return">累计收益率</option>
							<option data-id="return_a">年化收益率</option>
							<!-- <option id="">超额年化收益率</option> -->
							<option data-id="sharpe_a">年化夏普比</option>
							<option data-id="calmar_a">年化卡玛比率</option>
							<option data-id="sor_a">年化索提诺比率</option>
							<option data-id="tr_a">年化特雷诺比率</option>
							<option data-id="info_a">年化信息比率</option>
							<option data-id="jensen_a">年化詹森指数</option>
						</select>
					</div>
				</div>
				<div class="schartContent" id="profitabilityChart"
					style="text-align:center;line-height: 238px;"></div>
			</div>
		</div>
		<div class="infoTitle">
			<div class="introducTitle"></div>
			<div class="titleTxt">
				<span>风控能力</span>
				<span id="risk_static_date" class="black mleft20"></span>
			</div>
		</div>
		<div class="col-md-5 distanceTop20">
			<table class="indicatorsTbl dataTable height320" id="windcontrolTbl"
				style="text-align:center;line-height: 360px;"></table>
		</div>
		<div class="col-md-7 distanceTop20" id="incomeScharts2" style="padding-right:0px;">
			<div class="schartContent border height360">
				<div class="charHeader">
					<div class="headerLeft">
						<div class="charHeadpil"></div>
						<span class="charHeadtxt pop" data-toggle="popover" data-trigger="hover"  data-content="实务意义：该指标把不同频度的标准差换算成年化标准差，在进行基金评价时具有可比性。该指标越小越好。" data-placement='right'>年化标准差  <img src="${ctxResources}/images/info_b.png" class="infoImg" style="width: 16px;height:16px;"></span>
					</div>
					<div class="headerSright">
						<select id='windcontrolSlc' class="form-control">
							<option data-id="stdev_a">年化标准差</option>
							<option data-id="dd_a">年化下行标准差</option>
							<option data-id="max_drawdown">最大回撤</option>
							<option data-id="mdd_time">最大回撤的形成期</option>
							<option data-id="beta">贝塔系数</option>
							<option data-id="VaR">风险价值</option>
						</select>
					</div>
				</div>
				<div class="schartContent" id="windcontrolCharts"
					style="text-align:center;line-height: 238px;"></div>
			</div>
		</div>
		<div class="infoTitle">
			<div class="introducTitle"></div>
			<div class="titleTxt">
				<span>投研能力</span>
				<span id="investment_static_date" class="black mleft20"></span>
			</div>
		</div>
		<div class="col-md-5 distanceTop20">
			<table class="indicatorsTbl dataTable height360" id="investmentTbl"
				style="text-align:center;line-height: 360px;"></table>
		</div>
		<div class="col-md-7 distanceTop20" style="padding-right:0px;">
			<div class="schartContent border height360">
				<div class="schartContent height360" id="investmentCharts"
					style="text-align:center;line-height: 325px;"></div>
			</div>
		</div>
	</div>
</div>
