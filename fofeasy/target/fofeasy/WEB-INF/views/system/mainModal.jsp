<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
<div class="modal fade" id="mainModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog"
		style="width:80%;height:600px;margin:auto;top:50%;margin-top:-300px;">
		<div id="layer1"></div>
		<div class="modal-content">
			<div class="exportLogodiv">
				<img id="exportLogoimg" src="${ctxResources}/images/export_03.png">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true" style="margin-right:20px;">&times;</button>
				<div>
					<section id="expMulselect">
						<div class="row">
							<div class="col-md-12">
								<!-- 统计区间 -->
								<div>
									<div id="exportStatistics">
										<div class="exportTitle">
											<span class="expTitlespan">统计日期选择:</span>
										</div>
										<div class="slcData">
											<input class="exportData" type="text" value=""
												name="start_data" placeholder="起始日期" readonly> <img
												class="dataImg" src="${ctxResources}/images/data1.png">
										</div>
										<span class="dataHr">—</span>
										<div class="slcData">
											<input class="exportData" type="text" value=""
												name="end_data" placeholder="结束日期" readonly> <img
												class="dataImg" src="${ctxResources}/images/data1.png">
										</div>
									</div>
									<br> <br> <br>
									<!-- 频率 -->
									<div id="exportFrequency">
										<div class="exportTitle">
											<span class="expTitlespan">频率:</span>
										</div>
										<div>
											<button id="weekly" class="checkboxData checkboxdataAct">周</button>
											<button id="month" class="checkboxData">月</button>
										</div>
									</div>
									<br>
									<div id="statisticalInterval">
										<div class="exportTitle">
											<span class="expTitlespan">统计区间:</span>
										</div>
										<div>
											<span data-id="total" class="selectTime choiceTime">成立以来</span>
											<span data-id="year" class="selectTime">今年以来</span>
											<span data-id="m3" class="selectTime">近三月</span>
											<span data-id="m6" class="selectTime">近六月</span>
											<span data-id="y1" class="selectTime">近一年</span>
											<span data-id="y3" class="selectTime">近三年</span>
											<span data-id="y5"class="selectTime">近五年</span>
										</div>
									</div>
									<br><br>
									<!-- 选择基准-->
									<div id="exportBenchmark">
										<div class="exportTitle">
											<span class="expTitlespan">选择基准:</span>
										</div>
										<div id="radiusChoice">
											<div class="bmarkSlc">
												<div id="hs300"></div>
												<label for="HS300">沪深300</label>
											</div>
											<div class="bmarkSlc">
												<div id="csi500" class="benchmarkDivfalse"></div>
												<label for="CSI500" class="benchmarkLabfalse">中证500</label>
											</div>
											<div class="bmarkSlc">
												<div id="sse50" class="benchmarkDivfalse"></div>
												<label class="benchmarkLabfalse">上证50</label>
											</div>
											<div class="bmarkSlc">
												<div id="cbi" class="benchmarkDivfalse"></div>
												<label>中债指数</label>
											</div>
											<div class="bmarkSlc">
												<div id="nfi" class="benchmarkDivfalse"></div>
												<label>南华商品指数</label>
											</div>
										</div>
									</div>
								</div>
								<br><br><br>
								<!-- 多选表 -->
								<div class="table-responsive">
									<table class="table ulTable" id="exportTbl">
										<tr id="earningsIndicators">
											<td><span class="ultitleTxt2">收益指标：</span></td>
											<td><span class="expAllslc" id="earIndicator">全选</span></td>
											<td class="ulContent"><span class="slcDiv"> <input
													id="60501_01" type="checkbox" name="累计收益率"> <label
													for="60501_01">累计收益率</label>
											</span> <span class="slcDiv"> <input id="60501_02"
													type="checkbox" name="年化收益率"> <label for="60501_02">年化收益率</label>
											</span> <span class="slcDiv"> <input id="60501_03"
													type="checkbox" name="今年以来收益率"> <label
													for="60501_03">今年以来收益率</label>
											</span> <span class="slcDiv"> <input id="60501_04"
													type="checkbox" name="本月以来收益率"> <label
													for="60501_04">本月以来收益率</label>
											</span> <span class="slcDiv"> <input id="60501_05"
													type="checkbox" name="正收益周(月)数"> <label
													for="60501_05">正收益周(月)数</label>
											</span> <span class="slcDiv"> <input id="60501_06"
													type="checkbox" name="非正收益周(月)数"> <label
													for="60501_06">非正收益周(月)数</label>
											</span> <span class="slcDiv"> <input id="60501_07"
													type="checkbox" name="最高单周(月)回报"> <label
													for="60501_07">最高单周(月)回报</label>
											</span> <span class="slcDiv"> <input id="60501_08"
													type="checkbox" name="最低单周(月)回报"> <label
													for="60501_08">最低单周(月)回报</label>
											</span><span class="slclongDiv"> <input id="60501_09"
													type="checkbox" name="最长连续上涨周(月)数"> <label
													for="60501_09">最长连续上涨周(月)数</label>
											</span> <span class="slclongDiv"> <input id="60501_10"
													type="checkbox" name="最长连续下跌周(月)数"> <label
													for="60501_10">最长连续下跌周(月)数</label>
											</span></td>
										</tr>
										<tr id="riskincomeIndicators">
											<td><span class="ultitleTxt2">风险收益指标：</span></td>
											<td><span class="expAllslc" id="riskIndicator">全选</span></td>
											<td class="ulContent"><span class="slcDiv"> <input
													id="60502_01" type="checkbox" name="标准差"> <label
													for="60502_01">标准差</label>
											</span> <span class="slcDiv"> <input id="60502_02"
													type="checkbox" name="年化标准差"> <label for="60502_02">年化标准差</label>
											</span> <span class="slcDiv"> <input id="60502_03"
													type="checkbox" name="年化下行标准差"> <label
													for="60502_03">年化下行标准差</label>
											</span> <span class="slcDiv"> <input id="60502_04"
													type="checkbox" name="最大回撤"> <label for="60502_04">最大回撤</label>
											</span> <span class="slclongDiv"> <input id="60502_05"
													type="checkbox" name="最大回撤形成期(天)"> <label
													for="60502_05">最大回撤形成期（天）</label>
											</span> <span class="slclongDiv"> <input id="60502_06"
													type="checkbox" name="最大回撤修复期(天)"> <label
													for="60502_06">最大回撤修复期（天）</label>
											</span> <span class="slcDiv"><input id="60502_07"
													type="checkbox" name="风险价值"> <label for="60502_07">风险价值</label>
											</span><span class="slcDiv"><input id="60502_08"
													type="checkbox" name="偏度"> <label for="60502_08">偏度</label>
											</span> <span class="slcDiv"><input id="60502_09"
													type="checkbox" name="峰度"><label for="60502_09">峰度</label>
											</span></td>
										</tr>

										<tr id="earnings_riskindicators">
											<td><span class="ultitleTxt2">收益风险指标：</span></td>
											<td><span class="expAllslc" id="earRiskind">全选</span></td>
											<td class="ulContent"><span class="slcDiv"> <input
													id="60503_01" type="checkbox" name="年化夏普比率"> <label
													for="60503_01">年化夏普比率</label>
											</span> <span class="slcDiv"> <input id="60503_02"
													type="checkbox" name="年化卡玛比率"> <label
													for="60503_02">年化卡玛比率</label>
											</span> <span class="slcDiv"> <input id="60503_03"
													type="checkbox" name="年化索提诺比率"> <label
													for="60503_03">年化索提诺比率</label>
											</span> <span class="slcDiv"> <input id="60503_04"
													type="checkbox" name="风险价值调整比"> <label
													for="60503_04">风险价值调整比</label>
											</span></td>
										</tr>
										<tr id="RelativeIndex">
											<td><span class="ultitleTxt2">相对指数指标：</span></td>
											<td><span class="expAllslc" id="relativeIndex">全选</span></td>
											<td class="ulContent"><span class="slcDiv"> <input
													id="60505_01" type="checkbox" name="超额年化收益率"> <label
													for="60505_01">超额年化收益率</label>
											</span> <span class="slcDiv"> <input id="60505_02"
													type="checkbox" name="胜率"> <label for="60505_02">胜率</label>
											</span> <span class="slcDiv"> <input id="60505_03"
													type="checkbox" name="贝塔系数"> <label for="60505_03">贝塔系数</label>
											</span> <span class="slcDiv"> <input id="60505_04"
													type="checkbox" name="非系统性风险"> <label
													for="60505_04">非系统性风险</label>
											</span> <span class="slcDiv"> <input id="60505_05"
													type="checkbox" name="年化跟踪误差"> <label
													for="60505_05">年化跟踪误差</label>
											</span> <span class="slcDiv"> <input id="60505_06"
													type="checkbox" name="相关系数"> <label for="60505_06">相关系数</label>
											</span> <span class="slcDiv"> <input id="60505_07"
													type="checkbox" name="年化特雷诺比率"> <label
													for="60505_07">年化特雷诺比率</label>
											</span> <!-- <span class="slcDiv"><input id="60505_08"
														type="checkbox" name="年化信息比率"> <label
														for="60505_08">年化信息比率</label>
													</span> <span class="slcDiv"> <input id="60505_09"
														type="checkbox" name="年化詹森指数"> <label
														for="60505_09">年化詹森指数</label>
													</span><span class="slcDiv"><input id="60505_10"
														type="checkbox" name="择时能力"> <label
														for="60505_10">择时能力</label>
													</span> <span class="slcDiv"><input id="60505_11"
														type="checkbox" name="选股能力"> <label
														for="60505_11">选股能力</label>
													</span> <span class="slclongDiv"> <input id="60505_12"
														type="checkbox" name="超额收益率可持续性"> <label
														for="60505_12">超额收益率可持续性</label>
											</span> --></td>
										</tr>
									</table>
								</div>
								<div id="determineDiv">
									<button id="exportExcel" class="exporBtn">
										<img src="${ctxResources}/images/expword.png"><span>导出EXCEL</span>
									</button>
									<button id="expclearBtn" class="exporBtn">
										<img src="${ctxResources}/images/expcancel.png">清空选择
									</button>
								</div>
							</div>
						</div>
					</section>
					<div id="onLoad"></div>
				</div>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>

	<!-- /.modal -->
</div>
<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
<script>
		require(['mainModal']);
	</script>