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
	<!-- 头部开始 -->

	<%@ include file="/WEB-INF/views/system/header.jsp"%>
	<!-- 头部分结束 -->


	<!-- 内容部分开始 -->
	<section id="choiceTbl">

		<div class="row">
			<div class="col-md-12">
				<div class="table-responsive">
					<table class="table ulTable">
						<tr>
							<td><img src="${ctxResources}/images/check00.png">&nbsp;&nbsp;&nbsp;&nbsp;
							<span
								class="ultitleTxt">关键字：</span></td>
							<td colspan="2">
								<div id="maintblSearch" class="maintblSearch">
									<select id="search_choice_id" class="searchChoice">
										<option>基金产品</option>
										<option>投资顾问</option>
										<option>投资经理</option>
									</select>
									<input id="keywordSearch" type="text" name="keywordSearch" class="searchInp">			
								</div>
							</td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check01.png"> <span
								class="ultitleTxt">统计区间：</span></td>
							<td colspan="2"> 
							<span id="total" class="selectTime choiceTime"
								style="margin-left: 10px;">成立以来</span> <span id="year"
								class="selectTime">今年以来</span> <span id="m1" class="selectTime">近一个月</span>
								<span id="m3" class="selectTime">近三个月</span> <span id="m6"
								class="selectTime">近六个月</span> <span id="y1" class="selectTime">近一年</span>
								<span id="y3" class="selectTime">近三年</span> <span id="y5"
								class="selectTime">近五年</span> <!--  <span
								class="layui-input-inline" style="margin-left:20px;"><input
									class="form-control cdata" placeholder="开始日期"
									name="date_start1" readonly> </span><span
								style="margin:0 20px;">——</span><span class="layui-input-inline">
									<input class="form-control cdata" placeholder="结束日期"
									name="date_end1" readonly>
								</span> -->
							</td>
						</tr>
								<tr>
							<td><img src="${ctxResources}/images/check01.png"> <span
								class="ultitleTxt">净值日期：</span></td>
							<td colspan="2">
								<span
								class="layui-input-inline"><input
									class="form-control cdata" id="netInpleft" placeholder="开始日期"
									name="date_start1" readonly> </span><span
								style="margin:0 20px;">至</span><span class="layui-input-inline">
									<input class="form-control cdata" id="netInpright" placeholder="结束日期"
									name="date_end1" readonly>
								</span>
							</td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check02.png"> <span
								class="ultitleTxt">年化收益：</span></td>
								
							<td colspan="2">
									<input id="yearLowinp" class="percentInp" type="number" name="">
									%
								<span class="percentHr">至</span>
									<input id="yearHighinp" class="percentInp" type="number"
										name=""> %
							
							</td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check03.png"> <span
								class="ultitleTxt">最大回撤：</span></td>
							<td colspan="2">
									<input id="withdrawalLow" class="percentInp" type="number"
										name=""> %
								 <span class="percentHr">至</span>
								
									<input id="withdrawalHigh" class="percentInp" type="number"
										name=""> %
							</td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check04.png"> <span
								class="ultitleTxt">发行方式：</span></td>
								<td><span
								class="openEnded">不限</span></td>
							<td id="releaseMode" class="ulContent">
								<button id="60402" class="checkboxBtn checkboxBtnshort"
									name="disMethod">自主发行</button>
								<button id="60404" class="checkboxBtn checkboxBtnshort"
									name="disMethod">券商资管</button>
								<button id="60405" class="checkboxBtn checkboxBtnshort"
									name="disMethod">期货资管</button>
								<button id="60401" class="checkboxBtn checkboxBtnshort"
									name="disMethod">信托计划</button>
								<button id="60403" class="checkboxBtn checkboxBtnlong"
									name="disMethod">公募专户及子公司管理计划</button>
								<button id="60406" class="checkboxBtn checkboxBtnlong"
									name="disMethod">保险公司及子公司管理计划</button>
								<button id="60408" class="checkboxBtn checkboxBtnshort"
									name="disMethod">有限合伙</button>
								<button id="60409" class="checkboxBtn checkboxBtnshort"
									name="disMethod">单账户</button>
								<button id="60407" class="checkboxBtn checkboxBtnshort"
									name="disMethod">海外基金</button>
								<button id="60410" class="checkboxBtn checkboxBtnshort"
									name="disMethod">其他</button></td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check05.png"> <span
								class="ultitleTxt">投资标的：</span></td>
								<td><span
								class="openEnded">不限</span></td>
							<td id="investmentTarget" class="ulContent">
								<button id="60301" class="checkboxBtn checkboxBtnshort"
									name="disMethod">股票</button>
								<button id="60303" class="checkboxBtn checkboxBtnlong"
									name="disMethod">债券等固定收益</button>
								<button id="60307" class="checkboxBtn checkboxBtnshort"
									name="disMethod">货币型</button>
								<button id="60302" class="checkboxBtn checkboxBtnshort"
									name="disMethod">期货</button>
								<button id="60304" class="checkboxBtn checkboxBtnshort"
									name="disMethod">期权</button>
								<button id="60308" class="checkboxBtn checkboxBtnshort"
									name="disMethod">指数型</button>
								<button id="60311" class="checkboxBtn checkboxBtnshort"
									name="disMethod">混合型</button>
								<button id="60309" class="checkboxBtn checkboxBtnshort"
									name="disMethod">股权</button>
								<button id="60310" class="checkboxBtn checkboxBtnshort"
									name="disMethod">新三板</button>
								<button id="60306" class="checkboxBtn checkboxBtnshort"
									name="disMethod">海外资产</button>
								<button id="60312" class="checkboxBtn checkboxBtnshort"
									name="disMethod">其他</button></td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check06.png"> <span
								class="ultitleTxt">投资策略：</span></td>
								<td><span
								id="secMulslebtn" class="openEnded">不限</span></td>
							<td colspan="2" class="ulContent" id="investmentStrategy">
								<button id="60101" class="checkboxBtn checkboxBtnshort"
									name="disMethod">股票策略</button>
								<button id="60102" class="checkboxBtn checkboxBtnshort"
									name="disMethod">管理期货</button>
								<button id="60103" class="checkboxBtn checkboxBtnshort"
									name="disMethod">相对价值</button>
								<button id="60104" class="checkboxBtn checkboxBtnshort"
									name="disMethod">事件驱动</button> <img class="dropdownImg"
								id="dropdownImg" src="${ctxResources}/images/mainxiala.png">
								<button id="60105" class="checkboxBtn checkboxBtnshort"
									name="disMethod">债券策略</button>
								<button id="60106" class="checkboxBtn checkboxBtnshort"
									name="disMethod">宏观策略</button>
								<button id="60107" class="checkboxBtn checkboxBtnshort"
									name="disMethod">组合策略</button>
								<button id="60108" class="checkboxBtn checkboxBtnshort"
									name="disMethod">多策略</button>
								<button id="60109" class="checkboxBtn checkboxBtnlong"
									name="disMethod">其他一级策略</button></td>
						</tr>
						<!-- 投资策略详情 -->
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="stockStrategy">
								<div class="detaiTitle">
									<span>股票策略：</span>
								</div>
								<div class="checkBlock">
									<input id="6010101" type="checkbox" name="secMulscn"> <label
										for="6010101">股票多头</label>
								</div>
								<div class="checkBlock">
									<input id="6010102" type="checkbox" name="secMulscn"> <label
										for="6010102">股票多空</label>
								</div>
								<div class="checkBlock">
									<input id="6010103" type="checkbox" name="secMulscn"> <label
										for="6010103">市场中性</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="managingFutures">
								<div class="detaiTitle">
									<span>管理期货：</span>
								</div>
								<div class="checkBlock">
									<input id="6010201" type="checkbox" name="secMulscn"> <label
										for="6010201">期货趋势策略</label>
								</div>
								<div class="checkBlock">
									<input id="6010202" type="checkbox" name="secMulscn"> <label
										for="6010202">期货套利策略</label>
								</div>
								<div class="checkBlock">
									<input id="6010203" type="checkbox" name="secMulscn"> <label
										for="6010203">其他管理期货策略</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="relativeValue">
								<div class="detaiTitle">
									<span>相对价值：</span>
								</div>
								<div class="checkBlock">
									<input id="6010301" type="checkbox" name="secMulscn"> <label
										for="6010301">ETF套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010302" type="checkbox" name="secMulscn"> <label
										for="6010302">可转债套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010303" type="checkbox" name="secMulscn"> <label
										for="6010303">固定收益套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010304" type="checkbox" name="secMulscn"> <label
										for="6010304">分级基金套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010305" type="checkbox" name="secMulscn"> <label
										for="6010305">其他相对价值套利</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="eventDriven">
								<div class="detaiTitle">
									<span>事件驱动：</span>
								</div>
								<div class="checkBlock">
									<input id="6010401" type="checkbox" name="secMulscn"> <label
										for="6010401">并购重组</label>
								</div>
								<div class="checkBlock">
									<input id="6010402" type="checkbox" name="secMulscn"> <label
										for="6010402">定向增发</label>
								</div>
								<div class="checkBlock">
									<input id="6010403" type="checkbox" name="secMulscn"> <label
										for="6010403">大宗交易</label>
								</div>
								<div class="checkBlock">
									<input id="6010404" type="checkbox" name="secMulscn"> <label
										for="6010404">其他事件驱动策略</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="combiningPolicy">
								<div class="detaiTitle">
									<span>组合策略：</span>
								</div>
								<div class="checkBlock">
									<input id="6010701" type="checkbox" name="secMulscn"> <label
										for="6010701">MOM</label>
								</div>
								<div class="checkBlock">
									<input id="6010702" type="checkbox" name="secMulscn"> <label
										for="6010702">FOF</label>
								</div>
								<div class="checkBlock">
									<input id="6010703" type="checkbox" name="secMulscn"> <label
										for="6010703">TOT</label>
								</div>
								<div class="checkBlock">
									<input id="6010704" type="checkbox" name="secMulscn"> <label
										for="6010704">其他组合策略</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="otherPolicy">
								<div class="detaiTitle">
									<span>其他一级策略：</span>
								</div>
								<div class="checkBlock">
									<input id="6010902" type="checkbox" name="secMulscn"> <label
										for="6010902">新三板</label>
								</div>
								<div class="checkBlock">
									<input id="6010903" type="checkbox" name="secMulscn"> <label
										for="6010903">海外基金</label>
								</div>
								<div class="checkBlock">
									<input id="6010904" type="checkbox" name="secMulscn"> <label
										for="6010904">货币基金</label> <img id="pullupImg"
										src="${ctxResources}/images/mainshangla.png" alt="">
								</div>
								<div class="checkBlock">
									<input id="6010901" type="checkbox" name="secMulscn"> <label
										for="6010901">其他二级策略</label>
								</div>
							</td>
						</tr>
						<!--投资策略详情结束  -->
						<tr>
							<td><img src="${ctxResources}/images/check07.png"> <span
								class="ultitleTxt">结构形式：</span></td>
								<td><span
								class="openEnded">不限</span></td>
							<td class="ulContent" id="structureForm">
								<button id="60202" class="checkboxBtn checkboxBtnshort"
									name="disMethod">结构化</button>
								<button id="60201" class="checkboxBtn checkboxBtnshort"
									name="disMethod">非结构化</button></td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check08.png"> <span
								class="ultitleTxt">基金状态：</span></td>
								<td><span
								class="openEnded">不限</span></td>
							<td class="ulContent" id="fundStatus">
								<button id="运行中" class="checkboxBtn checkboxBtnshort"
									name="disMethod">运行中</button>
								<button id="终止" class="checkboxBtn checkboxBtnshort"
									name="disMethod">已清盘</button></td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check09.png"> <span
								class="ultitleTxt">成立年限：</span></td>
								<td><span
								class="openEnded">不限</span></td>
							<td class="ulContent" id="foundationYears">
								<button id="1" class="checkboxBtn checkboxBtnshort"
									name="disMethod">1年以下</button>
								<button id="2" class="checkboxBtn checkboxBtnshort"
									name="disMethod">1-3年</button>
								<button id="3" class="checkboxBtn checkboxBtnshort"
									name="disMethod">3-5年</button>
								<button id="4" class="checkboxBtn checkboxBtnshort"
									name="disMethod">5年以上</button>
								
								<span style="margin-left: 30px;">自定义:</span>
									 <span class="layui-input-inline"
								style="margin-left: 10px;"> <input
									class="form-control cdata" placeholder="开始日期"
									name="foundation_date_start" id="foundation_date_start"
									readonly>
							</span><span style="margin: 0 20px;">至</span><span
								class="layui-input-inline"> <input
									class="form-control cdata" placeholder="结束日期"
									name="foundation_date_end" id="foundation_date_end" readonly>

							</span></td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check10.png"> <span
								class="ultitleTxt">发行地区：</span></td>
								<td><span
								class="openEnded">不限</span></td>
							<td class="ulContent" id="region">
								<button id="上海" class="checkboxBtn checkboxBtnshort"
									name="disMethod">上海</button>
								<button id="广东" class="checkboxBtn checkboxBtnshort"
									name="disMethod">广东</button>
								<button id="深圳" class="checkboxBtn checkboxBtnshort"
									name="disMethod">深圳</button>
								<button id="北京" class="checkboxBtn checkboxBtnshort"
									name="disMethod">北京</button>
								<button id="其它" class="checkboxBtn checkboxBtnshort"
									name="disMethod">其它</button></td>
						</tr>
						<tr>
							<td><img src="${ctxResources}/images/check11.png"> <span
								class="ultitleTxt">披露频率：</span></td>
								<td><span
								class="openEnded">不限</span></td>
							<td class="ulContent" id="data_freq">
								<button id="周度" class="checkboxBtn checkboxBtnshort"
									name="disMethod">周频</button>
								<button id="月度" class="checkboxBtn checkboxBtnshort"
									name="disMethod">月频</button>
								<button id="日度" class="checkboxBtn checkboxBtnshort"
									name="disMethod">日频</button>
								</td>
						</tr>
						<tr>
							<td colspan="3" style="width: 100%;">
								<button id="maindetermineBtn" class="easy2Btn">
									<span>确定</span>
								</button>
								<button id="mainemptyBtn" class="easy2Btn">
									<span>清空</span>
								</button>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</section>
	<!-- 产品详情。 -->
	<section id="contentTbl">
		<div class="row">
			<div class="col-md-12">
				<!-- 产品对比列表 -->
				<div id="productComparison">
					<div class="contrastTitle">
						<span>产品对比栏</span><span id="prcDelect">-</span>
					</div>
					<div class="contrastContent">
						<table id="cntrastTbl">
							<tr class="nofund">
								<td><label></label></td>
								<td>
									<div class="deletContrast">
										<span>-</span>
									</div>
								</td>
							</tr>
							<tr class="nofund">
								<td><label></label></td>
								<td>
									<div class="deletContrast">
										<span>-</span>
									</div>
								</td>
							</tr>
							<tr class="nofund">
								<td><label></label></td>
								<td><div class="deletContrast">
										<span>-</span>
									</div></td>
							</tr>
							<tr class="nofund">
								<td><label></label></td>
								<td><div class="deletContrast">
										<span>-</span>
									</div></td>
							</tr>
						</table>
						<div class="contrastBtndiv">
							<button id="prcComparbtn">对比</button>
							<button id="prcbtnClean">清空产品</button>
						</div>
					</div>
				</div>
				<br>
				<div id="downTbl" >
					<div style="position:relative;float:left;width:340px;top:10px;left:calc(100% - 320px);">
						<button id="mainDownReport" data-toggle="modal" data-target="#reportModal" style="width: 100px;">批量导出报告</button>
						<button id="mainDataimport" data-size="1" data-target="#importModal" data-toggle="modal" style="margin-top:-3px;">导入</button>
						<button id="mainDown" data-toggle="modal" data-target="#mainModal">下载</button>
					</div>
				</div>
				<!-- 导入modal -->
				<div class="modal fade" id="importModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div style="margin-top:10%;">
					<div class="modal-dialog" style="min-width:600px;width:60%;">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
									&times;
								</button>
								<h2 class="modal-title" id="myModalLabel" style="font-size:18px;">
									数据导入
								</h2>
							</div>
							<div class="modal-body" id="upLoad">
								<div id="basicInfoDiv" class="uploadDiv" >
									<iframe id="iframe_info" scrolling="yes" src="${file_url}" class="fileUpload">
									</iframe>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="easy1Btn" id="buttonImportAndCalc">导入&计算
								</button>
								<!-- <button type="button" id="fileUpload2Qiniu" class="easy2Btn">上传
								</button> -->
								<button type="button" class="easy1Btn" data-dismiss="modal">关闭
								</button>
							</div>
							

						</div><!-- /.modal-content -->
					</div><!-- /.modal -->
				</div>
				</div>
				<table class="mainTbl" id="main-grid" data-toggle="main-grid"
					data-id-field="id" data-show-columns="true">
				</table>
				<div id="SuspensionDiv">
					<div class="Contrast">
						<span>对比</span>
						<div id="cntCount">0</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<div class="modal fade" id="reportModal" tabindex="-1" role="dialog"
		 aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog"
			 style="width:80%;height:600px;margin:auto;top:10%;">
			<div id="layer">
				<div class="progressBardiv">
					<div class="progressBarContent">
						<div class="progress">
							<b class="progress__bar"> <span class="progress__text">
							Progress: <em>0%</em>
					</span>
							</b>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-content">
				<div class="exportLogodiv">
					<img id="exportLogoimg" src="${ctxResources}/images/export_03.png">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="margin-right:20px;">
						&times;
					</button>
					<div>
						<section id="expMulselect">
							<div class="row">
								<div class="col-md-12">
									<!-- 统计区间 -->
									<div>
										<div id="exportStatistics">
											<div class="exportTitle">
												<span class="expTitlespan">统计区间选择:</span>
											</div>
											<div class="slcData">
												<input class="exportData" type="text" value="" name="start_data"
													   id="start_data_m" placeholder="起始日期" readonly> <img
													class="dataImg" src="${ctxResources}/images/data1.png">
											</div>
											<span class="dataHr">—</span>
											<div class="slcData">
												<input class="exportData" type="text" value="" name="end_data"
													   id="end_data_m" placeholder="结束日期" readonly> <img
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
												<button  id="daily" value="d" class="checkboxData checkboxdataAct">日</button>
												<button id="weekly" value="w" class="checkboxData">周</button>
												<button id="month" value="m" class="checkboxData">月</button>
											</div>
										</div>
										<br>
										<!-- 选择基准 -->
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
									<br> <br> <br>
									<!-- 多选表 -->
									<div class="table-responsive">
										<table class="table ulTable" id="exportTbl">
											<tr id="earningsIndicators">
												<td><span class="ultitleTxt">收益指标：</span></td>
												<td><span class="expAllslc" id="earIndicator">全选</span></td>
												<td class="ulContent"><span class="slcDiv"> <input
														id="60501_01" type="checkbox" name="累计收益率"> <label
														for="60501_01">累计收益率</label>
											</span> <span class="slcDiv"> <input id="60501_02"
																				 type="checkbox" name="年化收益率"> <label for="60501_02">年化收益率</label>
											</span> <span class="slcDiv"> <input id="60501_04"
																				 type="checkbox" name="本月以来收益率"> <label
														for="60501_04">本月以来收益率</label>
											</span> <span class="slcDiv"> <input id="60501_05"
																				 type="checkbox" name="正收益周期数"> <label
														for="60501_05">正收益周期数</label>
											</span> <span class="slcDiv"> <input id="60501_06"
																				 type="checkbox" name="非正收益周期数"> <label
														for="60501_06">非正收益周期数</label>
											</span> <span class="slcDiv"> <input id="60501_07"
																				 type="checkbox" name="最高单周期回报"> <label
														for="60501_07">最高单周期回报</label>
											</span> <span class="slcDiv"> <input id="60501_08"
																				 type="checkbox" name="最低单周期回报"> <label
														for="60501_08">最低单周期回报</label>
											</span><span class="slclongDiv"> <input id="60501_09"
																					type="checkbox" name="最长连续上涨周期数"> <label
														for="60501_09">最长连续上涨周期数</label>
											</span> <span class="slclongDiv"> <input id="60501_10"
																					 type="checkbox" name="最长连续下跌周期数"> <label
														for="60501_10">最长连续下跌周期数</label>
											</span></td>
											</tr>
											<tr id="riskincomeIndicators">
												<td><span class="ultitleTxt">风险收益指标：</span></td>
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
											</span> <span class="slclongDiv"> <input
														id="60502_06" type="checkbox" name="最大回撤修复期(天)">
													<label for="60502_06">最大回撤修复期（天）</label>
											</span>
													<span class="slcDiv"><input id="60502_07"
																				type="checkbox" name="风险价值"> <label
															for="60502_07">风险价值</label>
													</span><span class="slcDiv"><input id="60502_08"
																					   type="checkbox" name="偏度"> <label
															for="60502_08">偏度</label>
													</span> <span class="slcDiv"><input id="60502_09"
																						type="checkbox" name="峰度"><label
															for="60502_09">峰度</label>
													</span>

												</td>
											</tr>

											<tr id="earnings_riskindicators">
												<td><span class="ultitleTxt">收益-风险指标：</span></td>
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
												<td><span class="ultitleTxt">相对指数指标：</span></td>
												<td><span class="expAllslc" id="relativeIndex">全选</span></td>
												<td class="ulContent"><span class="slcDiv"> <input
														id="60505_01" type="checkbox" name="超额年化收益率"> <label
														for="60505_01">超额年化收益率</label>
											</span>
													<span class="slcDiv"> <input id="60505_09"
																				 type="checkbox" name="年化詹森指数"> <label
															for="60505_09">年化詹森指数</label>
													</span>
													<span class="slcDiv"> <input id="60505_07"
																				 type="checkbox" name="年化特雷诺比率"> <label
															for="60505_07">年化特雷诺比率</label>
											</span>
													<span class="slcDiv"><input id="60505_08"
																				type="checkbox" name="年化信息比率"> <label
															for="60505_08">年化信息比率</label>
											</span>
													<span class="slcDiv"> <input id="60505_02"
																				 type="checkbox" name="胜率"> <label for="60505_02">胜率</label>
											</span>

													<span class="slcDiv"> <input id="60505_06"
																				 type="checkbox" name="相关系数"> <label for="60505_06">相关系数</label>
											</span>
													<span class="slcDiv"> <input id="60505_03"
																				 type="checkbox" name="贝塔系数"> <label for="60505_03">贝塔系数</label>
											</span>
													<span class="slcDiv"> <input id="60505_05"
																				 type="checkbox" name="年化跟踪误差"> <label
															for="60505_05">年化跟踪误差</label>
											</span>
													<span class="slclongDiv"> <input id="60505_12"
																					 type="checkbox" name="超额收益可持续性"> <label
															for="60505_12">超额收益可持续性</label>
											</span>
													<span class="slcDiv"> <input id="60505_04"
																				 type="checkbox" name="非系统性风险"> <label
															for="60505_04">非系统性风险</label>
											</span>  <span class="slcDiv"><input id="60505_10"
																				 type="checkbox" name="择时能力"> <label
															for="60505_10">择时能力</label>
													</span> <span class="slcDiv"><input id="60505_11"
																						type="checkbox" name="选股能力"> <label
															for="60505_11">选股能力</label>
													</span> </td>
											</tr>
										</table>
									</div>
									<div id="determineDiv">
										<button id="exportWord" class="exporBtn">
											<img src="${ctxResources}/images/expword.png"><span>导出WORD</span>
										</button>
										<button id="exportPdf" class="exporBtn">
											<img src="${ctxResources}/images/expword.png"><span>导出PDF</span>
										</button>
										<button id="expclearBtn" class="exporBtn">
											<img src="${ctxResources}/images/expcancel.png">清空选择
										</button>
									</div>
								</div>
							</div>
						</section>
						<div id="onLoad" style="z-index: 999"></div>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!-- 右侧部分结束-->
	<

	<%@ include file="/WEB-INF/views/system/mainModal.jsp"%>
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'base/easy2' ]);
	</script>
</body>
</html>