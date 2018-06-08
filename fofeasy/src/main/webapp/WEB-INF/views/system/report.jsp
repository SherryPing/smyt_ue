
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>产品透视</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
<link rel="stylesheet"
	href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />
</head>
<body>
	<header id="fundReporthead">
		<img src="${ctxResources}/images/reportImg.png">
	</header>
	<section id="report">
		<div class="row">
			<div class="col-md-12">
				<!-- 基金简评 -->
				<div class="reportModule">
					<div class="reportTitletxt">基金简评</div>
					<div class="oneReport">
						<div class="reportTitle">
							<div class="line1">	
							</div>
								<span class="reportitleTxt">
									该基金成立至今不足一年，成立以来的收益排名属于同类产品前5%的水平，但波动率水平较高，使夏普比排名中等水平
								</span>
						</div>
						<div class="reportContent">
							<span>**一期最新基金净值为 1.34，该基金成立以来累计收益率为
								34.3%，在本期同类基金中位于前 1.15%的水平（234/20368）；
								该基金成立以来的年化收益率为 48.17%，在本期同类产品
								位于前 12.68%的水平（2584/20368）；成立以来的年化波动率为
								26.41%，最大回撤为 21.44%，年化夏普比率为 1.7381，夏
								普比位于本期同类基金中位于 50.39%的水平（10265/20368）。
							</span>
						</div>
					</div>
					<div class="oneReport">
						<div class="reportTitle">
							<div class="line1">	
							</div>
								<span class="reportitleTxt" style="margin-top: 10px;">
									基金近一个月的表现差强人意，收益环比减少，收益波动性增大。
								</span>

						</div>
						<div class="reportContent">
							<span>
							该基金属于股票多头策略，今年以来的年化收益 227.93%，
							今年以来的年化波动率为 18.86%,在同类基金中位于 1.15%
							（234/20368），高于参考基准沪深 300 指数 5.25%。该基金的夏
							普比率为 8.66，索提诺比率为 30.56，显著优于股票多头类
							基金平均水平，该基金的风险管理能力（特雷诺比率和詹森
							比率）在股票多头类产品中位于前 1.69%（345/20368）。
							</span>
						</div>
					</div>
					<div class="oneReport" style="height: 180px;">
						<div class="reportTitle">
							<div class="line1">	
							</div>
								<span class="reportitleTxt" style="margin-top: 10px;">
									基金今年以来的收益率表现优于沪深 300，风险管理能力在同类基金中优势明显。
								</span>

						</div>
						<div class="reportContent">
							<span>
									该基金近一个月来的累计收益率为-2.40%，环比减少
									117.30%，近一个月来的年化收益率为-22.31%，环比减少
									107.81%，近一个月来的年化波动率为 16.50%，环比增加
									71.60%。
							</span>
						</div>
					</div>
					<div class="oneReport" style="height: 180px;">
						<div class="reportTitle">
							<div class="line1">	
							</div>
								<span class="reportitleTxt">
									该基金成立以来在成长性因子上暴露最多，流动性因子、市场因子其次，规模、波动率和动量因子为负贡献。长期来看，越来越偏重成长性，价值因子逐步降低
								</span>
						</div>
						<div class="reportContent">
							<span>
							</span>
						</div>
					</div>
				</div>
				<!-- 基金概况 -->
				<div class="reportModule">
					<div class="reportTitletxt">基金概况</div>
						<div class="oneReport" style="height: 160px;">
							<div class="reportTitle">
								<div class="line2">	
								</div>
								<div class="fundProfile">
									<span>基金简称：</span>
									<span>**一起</span>
								</div>
								<div class="fundProfile">
									<span>基金全称：</span>
									<span>**一期私募证券投资</span>
								</div>
								<div class="fundProfile">
									<span>基金成立日期：</span>
									<span>2016-06-27</span>
								</div>
								<div class="fundProfile">
									<span>投资顾问：</span>
									<span>**投资</span>
								</div>
								<div class="fundProfile">
									<span>投资策略：</span>
									<span>股票策略-股票多头</span>
								</div>
								<div class="fundProfile">
									<span>净值日期：</span>
									<span>2017-03-31</span>
								</div>
								<div class="fundProfile">
									<span>单位净值：</span>
									<span>1.343</span>
								</div>
							</div>
						</div>
				</div>
					<!-- 业绩分析 -->
				<div class="reportModule">
						<div class="reportTitletxt">业绩分析</div>
						<div class="reportIndicators">
							<h5>业绩指标</h5>
							<ul class="reportUl">
								<li><div></div>
									<span>
										累计收益率：基金在统计区间内投资的回报率，使用基金区间最新复权累计净值计算。
									</span>
								</li>
								<li><div></div>
									<span>
										夏普比率：基金在统计区间内每一单位总风险所获得的超额年化收益率，无风险收益采取一年期国债，风险用年化波动率指标刻画。
									</span>
								</li>
								<li><div></div>
									<span>
										最大回撤：基金在统计区间内的任一历史时点起，复权累计净值走到最低点时收益率回撤幅度的最大值。
									</span>
								</li>
								<li><div></div>
									<span>
										同类排序：指在统一策略分类下的产品中所占位置的百分比，如55%（798）则表示统计区间内同类产品共798只，其中该指标下基金位于同类排序的百分比为55%。
									</span>
								</li>
								<li>
									<div></div>
									<span>
										累计收益率：基金在统计区间内投资的回报率，使用基金区间最新复权累计净值计算。
									</span>
								</li>
								<li>
									<div></div>
									<span>
										最长连续上涨周期数：统计区间内基金自然周期复权累计净值连续上涨周期数的最大值。
									</span>
								</li>
								<li>
									<div></div>
									<span>
										胜率：统计区间内自然周期累计收益率超越基准指数相应自然周期累计收益率周期数与统计区间内完整的自然周期的总周期数之比。
									</span>
								</li>
							</ul>
						</div>
						<div class="halfChart">
								<div class="headerLeft">
										<span class="reportcharTitle">分指标排名</span>
										<div class="reportcharLine"></div>
								</div>
								<div class="reportcharContent" style="height: 270px;">
									
								</div>
								<span style="margin-top: 10px;">
								统计期间：成立以来&nbsp;&nbsp;&nbsp;统计日期：2017-03-31&nbsp;同期存续中的股票多头基金共20368只
								</span>
						</div>
						<div class="halfChart">
							<div class="headerLeft">
										<span class="reportcharTitle">净值基金表</span>
										<div class="reportcharLine"></div>
								</div>
								<div class="reportcharContent">
									
								</div>
						</div>
						<div class="outerDiv distanceTop20">
							<span class="reportcharTitle">净值表</span>
							<div class="reportcharLine" style="margin-left:-70px; "></div>
						</div>
						<div class="infoTitle">
							<table class="mainTbl netTbl" id="main-grid" data-toggle="table">
									<thead>
										<tr>
											<th data-field="add" data-sortable="true" data-align="center" style="width: 35%;"><span>2016/4/21</span>——<span>2017/3/2</span></th>
											<th data-field="Ordinal">单位净值</th>
											<th data-field="fundAbbreviation">累计净值</th>
											<th data-field="disclosureFrequency">复权累计净值</th>
											<th data-field="investmentAdvisers">累计收益率</th>
											<th data-field="investmentManager">数据来源</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>2017/3/21</td>
											<td>1.000</td>
											<td>1.000</td>
											<td>1.000</td>
											<td></td>
											<td></td>
										</tr>
										<tr>
											<td colspan="6"></td>
										</tr>
										<tr>
											<td colspan="6"></td>
										</tr>
										<tr>
											<td colspan="6"></td>
										</tr>
										<tr>
											<td colspan="6"></td>
										</tr>
										<tr>
											<td colspan="6"></td>
										</tr>
										<tr>
											<td colspan="6"></td>
										</tr>
										<tr>
											<td colspan="6"></td>
										</tr>
										<tr>
											<td colspan="6"></td>
										</tr>
									</tbody>
								</table>
						</div>
						<!-- 收益指标 -->
						<div class="reportIndicators">
							<h5>收益指标</h5>
							<ul class="reportUl">
								<li><div></div>
									<span>
										累计收益率：基金在统计区间内投资的回报率，使用基金区间最新复权累计净值计算。
									</span>
								</li>
								<li><div></div>
									<span>
										胜率：统计区间内自然周期累计收益率超越基准指数相应自然周期累计收益率周期数与统计区间内完整的自然周期的总周期数之比。
									</span>
								</li>
								<li><div></div>
									<span>
										最长连续上涨周期数：统计区间内基金自然周期复权累计净值连续上涨周期数的最大值。
									</span>
								</li>
								<li><div></div>
									<span>
										正收益周期数：统计区间内基金自然周期收益率大于0的周期数。
									</span>
								</li>
								<li>
									<div></div>
									<span>
										非正收益周期数：统计区间内基金自然周期收益率小于等于0的周期数。
									</span>
								</li>
								<li>
									<div></div>
									<span>
										自然周期：按照净值采样频率可以分类日度、周度和月度。
									</span>
								</li>
							</ul>
						</div>
							<div class="outerDiv distanceTop20">
								<span class="reportcharTitle">收益指标表现</span>
								<div class="reportcharLine"></div>
								<div class="headerSright">
									<span>统计日期：</span> 
											<span>2017-02-28</span>
											<span class="splitLine">—</span>
											<span>2017-04-30</span>
								</div>
							</div>
								<!-- 收益指标表 -->
							<table class="indicatorsTbl distanceTop20">
								<thead>
									<tr>
										<td>统计区间</td>
										<td>AMS2018</td>
										<td>沪深300</td>
										<td>策略指数</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>成立以来</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>今年以来</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>近一个月</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>近三个月</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>近六个月</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>近一年</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</tbody>
							</table>
							<!-- 收益指标小的charts图 -->
							<div class="smallCharts distanceTop20" id="incomeScharts">
							</div>
							<!-- 正负收益周期比 -->
							<div class="outerDiv distanceTop20">
								<span class="reportcharTitle">正负收益周期比</span>
								<div class="reportcharLine" style="margin-left: -120px;"></div>
								<div class="headerSright">
									<span>统计日期：</span> 
											<span>2017-02-28</span>
											<span class="splitLine">—</span>
											<span>2017-04-30</span>
								</div>
							</div>
							<div class="One-third"></div>
							<div class="One-third"></div>
							<div class="One-third"></div>
							<!-- 风险指标 -->
						<div class="reportIndicators">
							<h5>风险指标</h5>
							<ul class="reportUl">
								<li><div></div>
									<span>
										年化波动率：把不同周期的波动率进行年化，在进行基金评价时更具有可比性
									</span>
								</li>
								<li><div></div>
									<span>
										年化下行波动率：也称年化下行风险，为传统波动率计算中向下波动的部分，更符合投资者对风险的认知
									</span>
								</li>
								<li><div></div>
									<span>
										最大回撤：基金在统计区间内的任一历史时点起，复权累计净值走到最低点时收益率回撤幅度的最大值
									</span>
								</li>
								<li><div></div>
									<span>
										风险价值：基金在一定的时间（比如 1日、 5 日、 20 日）内，在一定的置信度(比如 95%或 99%)下，投资者最大的期望损失。
									</span>
								</li>
							</ul>
						</div>
						<div class="outerDiv distanceTop20">
								<span class="reportcharTitle">风险指标表现</span>
								<div class="reportcharLine"></div>
								<div class="headerSright">
									<span>统计日期：</span> 
											<span>2017-02-28</span>
											<span class="splitLine">—</span>
											<span>2017-04-30</span>
								</div>
						</div>
						<div class="indicatorsContent" style="margin-top:0px">
							<!-- 风险指标大的charts图 -->
							<div class="bigCharts" style="margin:10px 0;">
								<div class="charHeader">
									<div class="headerLeft">
										<div class="charHeadpil"></div>	
										<span class="charHeadtxt">动态回撤</span>
									</div>
								</div>
								<div id="riskBcharts" class="bchartContent">

								</div>
							</div>
							<!-- 风险指标表 -->
							<table class="indicatorsTbl">
								<thead>
									<tr>
										<td>统计区间</td>
										<td>AMS</td>
										<td>沪深300</td>
										<td>策略指数</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>成立以来</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>今年以来</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>近一个月</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>近三个月</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>近六个月</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>近一年</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</tbody>
							</table>
							<!-- 风险指标小的charts图 -->
							<div class="smallCharts" id="incomeScharts">
								<div class="charHeader">
									<div class="headerSright">
										<select class="form-control">
											<option>成立以来</option>
											<option>今年以来</option>
											<option>近一个月</option>
											<option>近六个月</option>
											<option>近一年</option>
										</select>
									</div>
								</div>
								<div class="schartContent" id="riskScharts">
								</div>
							</div>
						</div>
							<!-- 风险调整收益指标 -->
						<div class="reportIndicators">
							<h5>风险调整收益指标</h5>
							<ul class="reportUl">
								<li><div></div>
									<span>
										夏普比率：基金在统计区间内每一单位总风险所获得的超额年化收益率，风险用年化波动率指标刻画。
									</span>
								</li>
								<li><div></div>
									<span>
										卡玛比率：基金在统计区间内超额年化收益和最大回撤之比。
									</span>
								</li>
								<li><div></div>
									<span>
										索提诺比率：基金在统计区间内超额年化收益和年化下行波动率之比，适合对资产价值下跌较敏感的投资者。
									</span>
								</li>
								<li><div></div>
									<span>
										特雷诺比率：基金在统计区间内每一单位系统风险所获得的超额年化收益率，系统风险用年资本资产定价模型求得的β来刻画。
									</span>
								</li>
								<li><div></div>
									<span>
										信息比率：基金在统计区间内超额年化收益和年化跟踪误差之比。
									</span>
								</li>
								<li><div></div>
									<span>
										詹森比率：衡量基金与市场无关的超额年化收益大小。
									</span>
								</li>
							</ul>
						</div>
						<div class="outerDiv distanceTop20">
								<span class="reportcharTitle">年化夏普比</span>
								<div class="reportcharLine"></div>
								<div class="headerSright">
									<span>统计日期：</span> 
											<span>2017-02-28</span>
											<span class="splitLine">—</span>
											<span>2017-04-30</span>
								</div>
						</div>
						<!-- 年化夏普比表 -->
							<table class="indicatorsTbl distanceTop20">
								<thead>
									<tr>
										<td>统计区间</td>
										<td>AMS2018</td>
										<td>沪深300</td>
										<td>策略指数</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>成立以来</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>今年以来</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>近一个月</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>近三个月</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>近六个月</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>近一年</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</tbody>
							</table>
							<!-- 年化夏普比小charts图 -->
							<div class="smallCharts distanceTop20" id="incomeScharts">
							</div>
							<!-- 归因分析 -->
							<div class="reportTitletxt">归因分析</div>
							<div class="reportIndicators">
								<h5>外部评价指标</h5>
								<ul class="reportUl">
									<li><div></div>
										<span>
											规模因子：各股总市值（流通市值）对数值。
										</span>
									</li>
									<li><div></div>
										<span>
											财务质量因子：当年各股一致预期 EPS与价格的比值；当年一致预期 ROE 等指标。
										</span>
									</li>
									<li><div></div>
										<span>
											价值因子：统计日上一年度 PE；统计日滚动一致预期 PE 等指标。
										</span>
									</li>
									<li><div></div>
										<span>
											波动率因子：采用半衰期加权法加权超额收益的过去 N 个交易日的波动率（日：N=25；周：N=52；月：N=12）等指标。
										</span>
									</li>
									<li>
										<div></div>
										<span>
											成长因子：营业总收入复合增长率；净利润复合增长率等指标。
										</span>
									</li>
									<li>
										<div></div>
										<span>
											市场因子：CAPM 模型中得到的 beta。
										</span>
									</li>
									<li>
										<div></div>
										<span>
											动量因子：CAPM 模型中得到的阿尔法等指标。
										</span>
									</li>
									<li>
										<div></div>
										<span>
											流动性因子：21 天换手率；3 个月换手率；1 年换手率等指标。
										</span>
									</li>
									<li>
										<div></div>
										<span>
											杠杆因子：资产负债率等指标。
										</span>
									</li>
									<li>
										<div></div>
										<span>
											非线性规模因子：对公司总市值（流通市值）取自然对数，然后取立方，再与规模因子指标 lnCapT 做正交化。
										</span>
									</li>
								</ul>
							</div>
							<div class="halfChart">
							<div class="headerLeft">
										<span class="reportcharTitle">风格因子贡献——收益归因</span>
										<div class="reportcharLine" style="width: 240px;margin-left: -220px;"></div>
								</div>
								<div class="reportcharContent">
									
								</div>
						</div>
						<div class="halfChart">
							<div class="headerLeft">
										<span class="reportcharTitle">风格因子时序变化——收益归因</span>
										<div class="reportcharLine" style="width: 260px;margin-left: -240px;"></div>
								</div>
								<div class="reportcharContent">
									
								</div>
						</div>
						<div class="reportTitletxt">归因分析</div>
						<div class="reportIndicators">
								<h5 style="font-weight: 600;font-size: 16px;">情景分析</h5>
								<ul class="reportUl">
									<li style="width: 100%;">
										<span style="margin: 0;">根据沪深300指数两年内单日跌幅相对前60日波动率比值最大的3种极端情形，对基金按最新60日波动率计算单日最大跌幅</span>
									</li>
								</ul>
						</div>
						<div class="outerDiv distanceTop20">
								<span class="reportcharTitle">压力测试</span>
								<div class="reportcharLine" style="margin-left: -90px;"></div>
						</div>
						<table class="analysisTbl">
						<thead>
							<tr>
								<th>事件</th>
								<th>策略组合1</th>
								<th>沪深300涨跌幅</th>
								<th>基金收益率</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>股灾1.0</td>
								<td>
									<div class="onDiv">2015/06/12</div>
									<div class="underDiv">2016/08/18</div>
								</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>股灾2.0</td>
								<td>
									<div class="onDiv">2015/06/12</div>
									<div class="underDiv">2016/08/18</div>
								</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>2016股市熔断</td>
								<td>
									<div class="onDiv">2015/06/12</div>
									<div class="underDiv">2016/08/18</div>
								</td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
					<div class="smallCharts" style="margin-top: 20px;height: 350px;">
						<div class="charHeader">
							<div class="headerLeft">
								<div class="charHeadpil"></div>
								<span class="charHeadtxt">收益统计</span>
							</div>
							<div class="schartContent" id="earningStatistic1" style="height: 310px;">

							</div>
						</div>
					</div>
					<div class="dshedLine"></div>
					<div class="reportTitletxt">免责声明</div>
					<div class="Statement">
						本文中所提及的基金及投顾公司仅为展示说明功能，不构成
						任何投资参考意见，亦不构成财务、法律、税务、投资咨询
						意见或其他意见，对任何因直接或间接使用本文所涉及的信
						息和内容或者据此进行投资所造成的一切后果或损失，私募
						云通不承担任何法律责任。
						本报告版权归私募云通所有。未获得私募云通事先书面授
						权，任何人不得对本报告进行任何形式的发布、复制。如遵
						循原文本意地引用、刊发，需注明出处“私募云通”。
					</div>
				</div>
			</div>
		</div>
	</section>
</body>
	<%@ include file="/WEB-INF/views/system/mainModal.jsp"%>
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
	</script>
</body>
</html>