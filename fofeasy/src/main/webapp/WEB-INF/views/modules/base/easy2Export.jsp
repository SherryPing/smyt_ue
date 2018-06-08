<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<%@ include file="/WEB-INF/views/include/meta.jsp"%>
	<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
	<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
	<link rel="stylesheet" href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />

</head>
<body>
	<section id="expMulselect">
			<div class="row">
				<div class="col-md-12">
				<!-- 统计区间 -->
					<div id="exportStatistics">
						<div class="exportTitle">
							<span class="expTitlespan">统计区间选择:</span>
						</div>
						<div class="slcData">
							<input class="exportData" type="text" value="" id='nav_range_s' readonly>
							<img class="dataImg" src="${ctxResources}/images/data1.png">
						</div>
							<span class="dataHr">—</span>
						<div class="slcData">
							<input class="exportData" type="text" value="" id='nav_range_e' readonly>
							<img class="dataImg" src="${ctxResources}/images/data1.png">
						</div>
					</div><br><br><br>
					<!-- 频率 -->
					<div id="exportFrequency">
						<div class="exportTitle">
							<span class="expTitlespan">频率:</span>
						</div>
						<div>
							<button class="checkboxData checkboxdataAct">周</button>
							<button class="checkboxData">月</button>
						</div>
					</div><br>
					<!-- 选择基准 -->
					<div id="exportBenchmark">
						<div class="exportTitle">
							<span class="expTitlespan">选择基准:</span>
						</div>
						<div class="bmarkSlc">
							<div id="HS300"></div>
							<label for="HS300">沪深300</label>
						</div>
						<div class="bmarkSlc">
							<div id="CSI500"></div>
							<label for="CSI500">中证500</label>
						</div>
						<div class="bmarkSlc">
							<div id="expSz50"></div>
							<label>上证50</label>
						</div>
						<div class="bmarkSlc">
							<div id="CBI" class="benchmarkDivfalse"></div>
							<label class="benchmarkLabfalse">中债指数</label>
						</div>
						<div class="bmarkSlc">
							<div id="expAllmark" class="benchmarkDivfalse"></div>
							<label class="benchmarkLabfalse">私募全市场</label>
						</div>
						<div class="bmarkSlc">
							<div id="expMhead" class="benchmarkDivfalse"></div>
							<label class="benchmarkLabfalse">股票多头</label>
						</div>
					</div>
					<!-- 多选表 -->
					<table class="ulTable" id="exportTbl">
						<tr title="earningsIndicators">
							<td class="ulTitle">
								<span class="ultitleTxt">收益指标：</span>
							</td>
							<td class="ulContent">
								<span id="earIndicator" class="expAllslc expAllslcone">全选</span>
								<div class="slcDiv">
									<input id="60501_01" type="checkbox" name="earIndicator">
									<label for="60501_01">累计收益率</label>
								</div>
								<div class="slcDiv">
									<input id="60501_02" type="checkbox" name="earIndicator">
									<label for="60501_02">年化收益率</label>
								</div>
								<div class="slcDiv">
									<input id="60501_03" type="checkbox" name="earIndicator">
									<label for="60501_03">今年以来收益率</label>
								</div>
								<div class="slcDiv">
									<input id="60501_04" type="checkbox" name="earIndicator">
									<label for="60501_04">本月收益率</label>
								</div>
								<div class="slcDiv">
									<input id="60501_05" type="checkbox" name="earIndicator">
									<label for="60501_05">正收益周数</label>
								</div>
								<div class="slcDiv">
									<input id="60501_06" type="checkbox" name="earIndicator">
									<label for="60501_06">最高单汇报</label>
								</div>
								<div class="slcDiv">
									<input id="60501_07" type="checkbox" name="earIndicator">
									<label for="60501_07">最低单汇报</label>
								</div>
							</td>
						</tr>
						<tr title="riskincomeIndicators">
							<td class="ulTitle">
								<span class="ultitleTxt">风险收益指标：</span>
							</td>
							<td class="ulContent">
								<span class="expAllslc" id="riskIndicator">全选</span>
								<div class="slcDiv">
									<input id="60502_01" type="checkbox" name="riskIndicator">
									<label for="60502_01">标准差</label>
								</div>
								<div class="slcDiv">
									<input id="60502_02" type="checkbox" name="riskIndicator">
									<label for="60502_02">年化标准差</label>
								</div>
								<div class="slcDiv">
									<input id="60502_03" type="checkbox" name="riskIndicator">
									<label for="60502_03">年化下行标准差</label>
								</div>
								<div class="slcDiv">
									<input id="60502_04" type="checkbox" name="riskIndicator">
									<label for="60502_04">最大回撤</label>
								</div>
								<div class="slclongDiv">
									<input id="60502_05" type="checkbox" name="riskIndicator">
									<label for="60502_05">最大回撤的形成期（天）</label>
								</div>
								<div class="slcDiv" style="width: 170px;">
									<input id="60502_06" type="checkbox" name="riskIndicator">
									<label for="60502_06">最大回撤修复期（天）</label>
								</div>
							</td>
						</tr>
						<tr title="riskincomeIndicators">
							<td>
								<div class="moreCheck">
									<div class="slcDiv">
										<input id="60502_07" type="checkbox" name="riskIndicator">
										<label for="60502_07">偏度</label>
									</div>
									<div class="slcDiv">
										<input id="60502_08" type="checkbox" name="riskIndicator">
										<label for="60502_08">峰度</label>
									</div>
									<div class="slcDiv">
										<input id="60502_09" type="checkbox" name="riskIndicator">
										<label for="60502_09">非正收益率</label>
									</div>
								</div>
							</td>
						</tr>
						<tr title="earnings_riskindicators">
							<td class="ulTitle">
								<span class="ultitleTxt">收益-风险指标：</span>
							</td>
							<td class="ulContent">
								<span class="expAllslc expAllslcone" id="earRiskind">全选</span>
								<div class="slcDiv">
									<input id="60503_01" type="checkbox" name="earRiskind">
									<label for="60503_01">年化夏普比率</label>
								</div>
								<div class="slcDiv">
									<input id="60503_02" type="checkbox" name="earRiskind">
									<label for="60503_02">年化卡玛比率</label>
								</div>
								<div class="slcDiv">
									<input id="60503_03" type="checkbox" name="earRiskind">
									<label for="60503_03">年化索提诺比率</label>
								</div>
								<div class="slcDiv">
									<input id="60503_04" type="checkbox" name="earRiskind">
									<label for="60503_04">风险价值调整比</label>
								</div>
							</td>
						</tr>
						<tr title="styleIndicator">
							<td class="ulTitle">
								<span class="ultitleTxt">风格指标：</span>
							</td>
							<td class="ulContent">
								<span class="expAllslc expAllslcone" id="styleIndicator">全选</span>
								<div class="slclongDiv">
									<input id="60504_01" type="checkbox" name="styleIndicator">
									<label for="60504_01">最长连续上涨周数</label>
								</div>
								<div class="slclongDiv">
									<input id="60504_02" type="checkbox" name="styleIndicator">
									<label for="60504_02">最长连续下跌周数</label>
								</div>
							</td>
						</tr>
						<tr title="RelativeIndex">
							<td class="ulTitle">
								<span class="ultitleTxt">相对指数指标：</span>
							</td>
							<td class="ulContent">
								<span class="expAllslc" id="relativeIndex">全选</span>
								<div class="slcDiv">
									<input id="60505_01" type="checkbox" name="relativeIndex">
									<label for="60505_01">超额年化收益率</label>
								</div>
								<div class="slcDiv">
									<input id="60505_02" type="checkbox" name="relativeIndex">
									<label for="60505_02">胜率</label>
								</div>
									<div class="slcDiv">
									<input id="60505_03" type="checkbox" name="relativeIndex">
									<label for="60505_03">贝塔系数</label>
								</div>
								<div class="slcDiv">
									<input id="60505_04" type="checkbox" name="relativeIndex">
									<label for="60505_04">非系统性风险</label>
								</div>
									<div class="slcDiv">
									<input id="60505_05" type="checkbox" name="relativeIndex">
									<label for="60505_05">年化跟踪误差</label>
								</div>
								<div class="slcDiv">
									<input id="60505_06" type="checkbox" name="relativeIndex">
									<label for="60505_06">相关系数</label>
								</div>
								<div class="slcDiv">
									<input id="60505_07" type="checkbox" name="relativeIndex">
									<label for="60505_07">年化特雷诺比率</label>
								</div>
							</td>
						</tr>
						<tr title="RelativeIndex">
							<td>
								<div class="moreCheck">
									<div class="slcDiv">
										<input id="60505_08" type="checkbox" name="relativeIndex">
										<label for="60505_08">年化信息比率</label>
									</div>
									<div class="slcDiv">
										<input id="60505_09" type="checkbox" name="relativeIndex">
										<label for="60505_09">年化詹森指数</label>
									</div>
									<div class="slcDiv">
										<input id="60505_10" type="checkbox" name="relativeIndex">
										<label for="60505_10">择时能力</label>
									</div>
									<div class="slcDiv">
										<input id="60505_11" type="checkbox" name="relativeIndex">
										<label for="60505_11">选股能力</label>
									</div>
									<div class="slclongDiv">
										<input id="60505_12" type="checkbox" name="relativeIndex">
										<label for="60505_12">超额收益率可持续性</label>
									</div>
								</div>
							</td>
						</tr>					
					</table>
					<div id="determineDiv">
						<button id="expdetermineBtn" class="exporBtn">确定</button>
						<button id="expclearBtn" class="exporBtn">清空选择</button>
					</div>
				</div>
			</div>
	</section>
	<section id="expPreview">
			<div class="row">
				<div class="col-md-12">
					<div id="expPreviewdiv">
						<div id="charPreview">
							<div><span>图表预览</span></div>
							<button class="previewBtn firstBtn">净值走势</button>
							<button class="previewBtn">资产配置时序图</button>
							<button class="previewBtn">行业配置时序图</button>
							<button class="previewBtn">市值时序图</button>
							<button class="previewBtn">持股集中度</button>
							<button class="previewBtn">组合风险</button>
							<button class="previewBtn firstBtn">交易占比</button>
							<button class="previewBtn">单期归因贡献</button>
							<button class="previewBtn">单期仓位控制</button>
							<button class="previewBtn">单期归因资产账户</button>
							<button class="previewBtn">单期归因贡献(期货)</button>
							<button class="previewBtn">单期仓位控制(期货)</button>
							<button class="previewBtn firstBtn">单期归因资产账户(期货)</button>
						</div>
						<div id="november" style="width: 100%;height: 500px;">
						</div>
					</div>
				</div>
			</div>
	</section>
			<!-- 悬浮底下的3个按钮 -->
			<div id="exportBtndiv">
				<button id="exportPdf" class="exporBtn">
					<img src="${ctxResources}/images/exppdf.png" alt="">
					<span>导出PDF</span>
				</button>
				<button id="exportWord" class="exporBtn">
					<img src="${ctxResources}/images/expword.png">
					<span>导出WORD</span>
				</button>
				<button id="exportCancel" class="exporBtn">
					<img src="${ctxResources}/images/expcancel.png">
					<span>取消</span>
				</button>
			</div>
	<!-- 右侧部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require(['base/easy2Export']);
	</script>
</body>
</html>