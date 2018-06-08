<!-- 自主管理——归因分析.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
	<section id="prcBasic" style="margin-top: 0px;">
			<div class="row">
				<div class="col-md-12">
					<div class="Select">
						<div id="slider">
							<ul id="assetUl">
								<li data-type=false>资产账户</li>
								<li data-type=true>股票资产</li>
								<li data-type=true>期货资产</li>
								<li class="histolineActive"></li>
							</ul>
						</div>
						<div id="asseLine"></div>
					</div>
					<!-- 资产账户 -->
					<div id="assetAccount" class="assetAllocationDiv">
						<div class="reportTitle distanceTop5">
							<span class="pull-left" style="margin-top: 8px;">归因方式：</span>
							<div class="selectDiv">
								<input type="radio" id="accountSperiod" name="assetAttributionmode" value="single" checked="checked">
								<label for="accountSperiod">单期</label>
							</div>
							<div class="selectDiv">
								<input type="radio" id="accountMperiod" class="morePeriod" name="assetAttributionmode" value="multi">
								<label for="accountMperiod">多期</label>
							</div>
						</div>
						<div id="assetbenchmarkrdos" class="reportTitle">
							<span class="pull-left" style="margin-top: 8px;">基准选择：</span>
							<div class="selectDiv">
								<input type="radio" id="HS300" name="atBenchmarkRdo" value='hs300' checked="checked">
								<label for="HS300">沪深300</label>
							</div>
							<div class="selectDiv">
								<input type="radio" id="CSI500" name="atBenchmarkRdo" value='csi500'>
								<label for="CSI500">中证500</label>
							</div>
							<div class="selectDiv">
								<input type="radio" id="CBI" name="atBenchmarkRdo" value='cbi'>
								<label for="CBI">中债指数</label>
							</div>
							<div class="selectDiv">
								<input type="radio" id="SSE50" name="atBenchmarkRdo" value='sse50'>
								<label for="SSE50">上证50</label>
							</div>
							<div class="selectDiv">
								<input type="radio" id="yearShopping" name="atBenchmarkRdo" value='nfi'>
								<label for="yearShopping">南华商品指数</label>
							</div>
							<div class="selectDiv">
								<button class="easy1Btn" id="customBtn" style="margin-left:20px;">自定义</button>
							</div>
						</div>
						<div class="reportTitle">
							<span class="pull-left" style="margin-top: 8px;">统计区间：</span>
							<input id="asset_startdate1" class="dateInp pull-left cdata" placeholder="开始日期"
									name="date_start" readonly><span
								style="margin:0 20px;float:left;">至</span>
									<input id="asset_enddate1" class="dateInp pull-left cdata" placeholder="结束日期"
									name="date_end" readonly>
							<button class="easy1Btn pull-left performanceAlsbtn" style="margin-left:20px;">确认</button>
						</div>
						<div class="reportTitle statisticFrequencys acountSpac hidden" style="margin:10px 0px;">
							<span>统计频率：</span>
							<label><input name="statisticFrequency" value='d' type="radio">日度</label>
							<label><input name="statisticFrequency" value='w' type="radio" checked="checked">周度</label> 
							<label><input name="statisticFrequency" value='m' type="radio">月度</label> 
							<label><input name="statisticFrequency" value='q' type="radio">季度</label>
						</div>
						<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<ul class="incomeTab" style="display:none;margin-top: 10px;">
							<li class="active">汇总</li>
							<li>明细</li>
						</ul>
					<div class="col-md-12 distanceTop20 assetTab subsidiary">
						<table class="indicatorsTbl" id="assetReferenceBenchmarkYields"></table>
					</div>
					<div class="col-md-12 distanceTop20 assetTab hidden summary" >
						<table class="indicatorsTbl" id="assetReferenceBenchmarkYields2"></table>
					</div>

					<div class="infoTitle" style="margin-top:-15px;">
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span class = 'attributionTypeSpn'>单期归因</span>
						</div>
					</div>
					<div class="col-md-7 distanceTop20 border" style="padding-left:8.5% !important;">
							<table id="assetExcessEarningsTab"
					class="pull-left attribution-stock-tab" border="0">
					<tr>
						<td colspan="2">超额收益</td></tr>
					<tr>
						<td colspan="2">
							<hr /></td></tr>
					<tr>
						<td></td><td></td></tr>
					<tr>
						<td></td><td></td></tr>
					<tr>
						<td></td><td></td></tr>
					<tr>
						<td colspan="2">
							<hr /></td></tr></table>
				<table id='assetAttributionAnalysisTab'
					class="attribution-stock-tab" border="0">
					<tr>
						<td colspan="2">归因分析</td></tr>
					<tr>
						<td colspan="2">
							<hr /></td></tr>
					<tr>
						<td></td><td></td></tr>
					<tr>
						<td></td><td></td></tr>
					<tr>
						<td></td><td></td></tr>
					<tr>
						<td colspan="2">
							<hr /></td></tr></table>
						</div>
						<div class="col-md-5 distanceTop20" style="padding-left:15px !important;padding-right:0px;">
							<div class="border pull-left" style="height:272px;width:100%;padding: 0 !important;">
								<div class="charHeader">
									<div class="headerLeft">
										<div class="charHeadpil"></div>
										<span class="charHeadtxt">归因贡献比较</span>
									</div>
								</div>
							<!-- 归因贡献比较图 -->
								<div id='assetAttributionComparison' style="height:230px;"></div>
							</div>
						</div>
						<div class="infoTitle distanceTop20">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>归因分析</span>
							</div>
						</div>
						<div class="col-md-12 distanceTop20 smallCharts">
							<!-- 归因分析图 -->
							<div id='assetSinglePeriodAttribution' style="height:280px;"></div>
						</div>
						<div class="infoTitle distanceTop20">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>仓位控制图</span>
							</div>
						</div>
						<div class="col-md-12 distanceTop20 bigCharts">
							<div id = 'assetPositionControl' class="bigCharts border_none distanceTop0" style="height:400px" ></div>
						</div>
					</div>									
					<!-- 股票资产 -->
					<div id="stockAccount" class="assetAllocationDiv " style="display: none;">
						<div class="reportTitle distanceTop5">
							<span class="pull-left" style="margin-top: 8px;">归因方式：</span>
							<div class="selectDiv">
								<input type="radio" class='' name="stockAttributionmode" value="single" checked="checked">
								<label for="accountSperiod">单期</label>
							</div>
							<div class="selectDiv">
								<input type="radio" class="morePeriod" name="stockAttributionmode" value="multi">
								<label for="accountMperiod">多期</label>
							</div>
						</div>
						<div class="reportTitle " >
							<span class="pull-left" style="margin-top: 8px;">统计区间：</span>
							<input id="asset_startdate2" class="dateInp pull-left cdata" placeholder="开始日期"
									name="date_start" readonly><span
								style="margin:0 20px;float:left;">至</span>
									<input id="asset_enddate2" class="dateInp pull-left cdata" placeholder="结束日期"
									name="date_end" readonly>
							<button class="easy1Btn pull-left performanceAlsbtn" style="margin-left:20px;">确认</button>
						</div>
						<div class="statisticFrequencys acountSpac  hidden" style="margin-top: 10px">
							<span>统计频率：</span> <label><input
								name="stoStatisticFrequency" value='d' type="radio">日度</label> <label><input
								name="stoStatisticFrequency" value='w' type="radio"
								checked="checked">周度</label> <label><input
								name="stoStatisticFrequency" value='m' type="radio">月度</label> <label><input
								name="stoStatisticFrequency" value='q' type="radio">季度</label>
						</div>
						<br>
						<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<ul class="incomeTab" style="display:none;margin-top: 10px;">
							<li class="active">汇总</li>
							<li>明细</li>
						</ul>
						<div class="earningDiv subsidiary" id="summarizing">
							<i class="glyphicon glyphicon-calendar"></i>&nbsp;&nbsp; <span
								id='phaseFrequency2'></span><br>
							<br>
							<table id="stockReferenceBenchmarkYields2"
								   class="table table-hover table-striped option-table performanceAlstbl"></table>
						</div>
						<div class="earningDiv summary" id="particulars" style="display:none;">
							<i class="glyphicon glyphicon-calendar"></i>&nbsp;&nbsp; <span
								id='phaseFrequency'></span><br>
							<br>
							<table id="stockReferenceBenchmarkYields"
								   class="table table-hover table-striped option-table performanceAlstbl"></table>
						</div>
						<div class="infoTitle" style="margin-top:-15px;">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span class='attributionTypeSpn'>单期归因</span>
							</div>
						</div>
					<div class="col-md-7 distanceTop20 border" style="padding-left:8.5% !important;">
							<table id="stockExcessEarningsTab"
								class="pull-left attribution-stock-tab" border="0">
								<tr>
									<td colspan="2">超额收益</td></tr>
								<tr>
									<td colspan="2">
										<hr /></td></tr>
								<tr>
									<td></td><td></td></tr>
								<tr>
									<td></td><td></td></tr>
								<tr>
									<td></td><td></td></tr>
								<tr>
									<td colspan="2">
										<hr /></td></tr></table>
							<table id='stockAttributionAnalysisTab'
								class="attribution-stock-tab">
								<tr>
									<td colspan="2">归因分析</td></tr>
								<tr>
									<td colspan="2">
										<hr /></td></tr>
								<tr>
									<td></td><td></td></tr>
								<tr>
									<td></td><td></td></tr>
								<tr>
									<td></td><td></td></tr>
								<tr>
									<td colspan="2">
										<hr /></td></tr></table>
						</div>
						<div class="col-md-5 distanceTop20" style="padding-left:15px !important;padding-right:0px;">
							<div class="smallCharts" style="width:100%;height:272px;">
								<div class="charHeader">
									<div class="headerLeft">
										<div class="charHeadpil"></div>
										<span class="charHeadtxt">归因贡献比较</span>
									</div>
								</div>
								<div id='stockAttributionComparison' style="height:230px !important;"></div>
							</div>
						</div>
						<div class="infoTitle distanceTop20">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>归因分析</span>
							</div>
						</div>
						<div class="col-md-12 distanceTop20 heightautoDiv">
							<div id ='stockSinglePeriodAttribution' style="height: 280px;"></div>
							<div id ='stockSWSPeriodAttributionDiv' class='hidden pull-left' style="width:100%;">
								<select class="form-control Industry"></select>
								<div id="stockSWSPeriodAttribution" style="height: 280px;width: 100%"></div>
							</div>
						</div>
						<div class="infoTitle distanceTop20">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>仓位控制图</span>
							</div>
						</div>
						<div class="col-md-12 distanceTop20 bigCharts">
							<div id='stockPositionControl' class="bigCharts border_none distanceTop0" style="height:400px"></div>
						</div>
					</div>
									
					<!-- 期货资产 -->
					<div class="assetAllocationDiv" style="display: none;">
						<div class="infoTitle distanceTop5">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>归因分析</span>
							</div>
						</div>
						<div class="col-md-5 distanceTop20">
							<div class="titleDiv">
								<div></div><span>总体期货绩效归因</span>
							</div>
							<table id = 'futuresOverallAttributionTab' class="indicatorsTbl dataTable"></table>
						</div>	
						<div class="col-md-7 distanceTop20 border" style="height: 280px;">
								<!-- <div class="charHeader">
									<div class="headerLeft">
										<div class="charHeadpil"></div>
										<span class="charHeadtxt">持仓市值时序图</span>
									</div>
								</div> -->
								<div id = 'futuresOverallAttributionGrid' style="height: 240px;">
									
								</div>
						</div>
						<div class="infoTitle distanceTop20">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>品种归因分析</span>
							</div>
							<div class="titleDiv">
								<div></div><span>十大盈利</span>
							</div>
							<div class="col-md-5">
								<table id = 'futuresInterestContractTab' class="indicatorsTbl dataTable"></table>
							</div>
							<div class="col-md-7 border smallCharts">
								<div id = 'futuresInterestContractGrid' style="height: 240px;"></div>
							</div>
							<div class="titleDiv">
								<div></div><span>十大亏损</span>
							</div>
							<div class="col-md-5">
								<table id='futuresLossContractTab' class="indicatorsTbl dataTable"></table>
							</div>
							<div class="col-md-7 border smallCharts">
								<div id="futuresLossContractGrid" style="height: 240px;"></div>
							</div>
						</div>
					</div>
					<!-- 债券资产 -->
					<div class="assetAllocationDiv" style="display: none;">
						<div class="infoTitle distanceTop40">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>国债收益率曲线（到期）</span>
							</div>
						</div>
						<div class="col-md-12 distanceTop20">
								<table class="indicatorsTbl">
									<thead>
										<tr>
											<th></th>
											<th>0月</th>
											<th>1月</th>
											<th>2月</th>
											<th>3月</th>
											<th>6月</th>
											<th>9月</th>
											<th>1年</th>
											<th>3年</th>
											<th>5年</th>
											<th>7年</th>
											<th>10年</th>
											<th>15年</th>
											<th>20年</th>
											<th>30年</th>
											<th>40年</th>
											<th>50年</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>期初（%）</td>
											<td colspan="16"></td>
										</tr>
										<tr>
											<td>期末（%）</td>
											<td colspan="16"></td>
										</tr>
										<tr>
											<td>期间变化（%）</td>
											<td colspan="16"></td>
										</tr>
									</tbody>
								</table>
								<div class="smallCharts distanceTop20 border">
									
								</div>
						</div>
						<div class="infoTitle distanceTop40">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>归因分析</span>
							</div>
						</div>
						<div class="col-md-12 distanceTop20">
								<table class="indicatorsTbl">
									<thead>
										<tr>
											<th>券种</th>
											<th>权重</th>
											<th>修正久期</th>
											<th>收益率</th>
											<th>资产配置</th>
											<th>收益率</th>
											<th>交互作用</th>
											<th>超额收益率</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>国债</td>
											<td colspan="7"></td>
										</tr>
										<tr>
											<td>金融债</td>
											<td colspan="7"></td>
										</tr>
										<tr>
											<td>企业债及公司债</td>
											<td colspan="7"></td>
										</tr>
										<tr>
											<td>资产资产证券</td>
											<td colspan="7"></td>
										</tr>
										<tr>
											<td>其他券种</td>
											<td colspan="7"></td>
										</tr>
										<tr>
											<td>合计</td>
											<td colspan="7"></td>
										</tr>
									</tbody>
								</table>
								<table class="indicatorsTbl distanceTop20">
									<thead>
										<tr>
											<th>券种</th>
											<th>权重</th>
											<th>修正久期</th>
											<th>收益率</th>
											<th>资产配置</th>
											<th>收益率</th>
											<th>交互作用</th>
											<th>超额收益率</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>国债</td>
											<td colspan="7"></td>
										</tr>
										<tr>
											<td>金融债</td>
											<td colspan="7"></td>
										</tr>
										<tr>
											<td>企业债及公司债</td>
											<td colspan="7"></td>
										</tr>
										<tr>
											<td>资产资产证券</td>
											<td colspan="7"></td>
										</tr>
										<tr>
											<td>其他券种</td>
											<td colspan="7"></td>
										</tr>
										<tr>
											<td>合计</td>
											<td colspan="7"></td>
										</tr>
									</tbody>
								</table>
								<div class="col-md-6 distanceTop20">
									<div class="charHeader">
										<div class="headerRight">
											<select>
												<option value="">投资组合</option>
											</select>
										</div>
									</div>
									<div class="smallCharts">
										
									</div>
								</div>
								<div class="col-md-6 distanceTop20">
									<div class="smallCharts">
										
									</div>
								</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		
		<!-- 资产自定义 -->
		<div id="customization" style="display:none;">
					<div class="exportLogodiv">
						<div>
							<div id="expMulselect">
										<div class="height40 paddingT20">
											<div class="huangdian">
											</div>
											<span class="pull-left">综合指数名称：</span>
											<input id='conindexName' type="text"  class="pull-left">
										</div>
										<div class="height40 paddingT20">
											<div class="huangdian">
											</div>
											<span class="pull-left">统计区间选择：</span>
											<input class="dateInp cdata pull-left" placeholder="开始日期"name="date_start" id="yield_date_start"readonly>
											<span class="pull-left" style="margin:3px 15px;">至</span>
											<input class="dateInp cdata pull-left" style="margin-right:20px;" placeholder="结束日期" name="date_end" id="yield_date_end" readonly>
										</div>
										<div class="height40 paddingT20">
											<div class="huangdian">
											</div>
											<span class="pull-left">指数成分：</span><a href="http://osz37q9fk.bkt.clouddn.com/%E8%87%AA%E5%AE%9A%E4%B9%89benchmark%E5%AF%BC%E5%85%A5.xlsx" class="pull-left">下载模板</a>
										</div>
										<div style="height:500px;">
											<div style="width:540px;float:left;">
												<table id="sliderTab" class='pull-left'>
													<tr>
														<td>
															<div class="sliderCompany"><span class="spanCompany">股票:</span></div>
														</td>
														<td>
															<div id="stockSlcdiv">
																<button class="stockSlcbtn stoBtnactiv" data-id="hs300">沪深300</button>
																<button class="stockSlcbtn" data-id="csi500">中证500</button>
																<button class="stockSlcbtn" data-id="sse50">上证50</button>
																<label for="stockImport">导入+</label><input id="stockImport" type="file" name="security">
															</div>
														<div class="main"  style="pointer-events:auto" >
														<div class="sliderPerinp">
														<input class="sliderInp" 
															type="number" id='showArea1' name="security" />%
															</div>
																<div class="control-group">
																	<div class="scroll-bar" id="scroll-bar1" >
																		<div class="entire-bar" id="entire-bar1"></div>
																		<div class="action-bar" id="action-bar1"></div>
																		<div class="action-block" id="action-block1"></div>
																	</div>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div class="sliderCompany"><span class="spanCompany">债券:</span></div>
														</td>
														<td>
															<div style="height:30px;">
																<button class="stockSlcbtn stoBtnactiv" data-id="cbi">中债指数</button>
																<label for="bondsImport">导入+</label><input id="bondsImport" type="file" name="bond">
															</div>
														<div class="main"  style="pointer-events:auto" >
														<div class="sliderPerinp">
														<input class="sliderInp"
															type="number"  id='showArea2' name="bond" />%
															</div>
																<div class="control-group">
																	<div class="scroll-bar" id="scroll-bar2">
																		<div class="entire-bar" id="entire-bar2"></div>
																		<div class="action-bar" id="action-bar2"></div>
																		<div class="action-block" id="action-block2"></div>
																	</div>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div class="sliderCompany"><span class="spanCompany">期货:</span></div>
														</td>
														<td>
															<div style="height:30px;">
																<button class="stockSlcbtn stoBtnactiv" data-id="nfi">南华商品指数</button>
																<label for="futureImport">导入+</label><input id="futureImport" type="file" name="future">
															</div>
														<div class="main"  style="pointer-events:auto">
														<div class="sliderPerinp">
														<input class="sliderInp"
															type="number"  id='showArea3' name="future" />%
															</div>
																<div class="control-group">
																	<div class="scroll-bar" id="scroll-bar3">
																		<div class="entire-bar" id="entire-bar3"></div>
																		<div class="action-bar" id="action-bar3"></div>
																		<div class="action-block" id="action-block3"></div>
																	</div>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div class="sliderCompany"><span class="spanCompany">基金:</span></div>
														</td>
														<td>
															<div style="height:30px;">
																<label for="bondsImport">导入+</label><input id="bondsImport" type="file" name="fund">
															</div>
														<div class="main"  style="pointer-events:none">
														<div class="sliderPerinp">
														<input class="sliderInp"
															type="number"  id='showArea4' name="fund" />%
															</div>
																<div class="control-group">
																	<div class="scroll-bar" id="scroll-bar4">
																		<div class="entire-bar" id="entire-bar4"></div>
																		<div class="action-bar" id="action-bar4"></div>
																		<div class="action-block" id="action-block4"></div>
																	</div>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div class="sliderCompany"><span class="spanCompany">现金:</span></div>
														</td>
														<td>
															<div style="height:30px;">
											
																<label for="bondsImport">导入+</label><input id="bondsImport" type="file" name="cash">
															</div>
														<div class="main"  style="pointer-events:none">
														<div class="sliderPerinp" >
														<input class="sliderInp"
															type="number" disabled="disabled"  id='showArea5' name="cash" />%
															</div>
																<div class="control-group" >
																	<div class="scroll-bar" id="scroll-bar5">
																		<div class="entire-bar" id="entire-bar5"></div>
																		<div class="action-bar" id="action-bar5"></div>
																		<div class="action-block" id="action-block5"></div>
																	</div>
																</div>
															</div>
														</td>
													</tr>
												</table>
											</div>
											<div id='benchmarkGrid' class="customGrid_div">
												
											</div>
										</div>
										<div id="determineDiv">
											<button id  = "previewBtn" class="easy1Btn">预览</button>
											<button id  = "sureBtn" class="easy1Btn" data-dismiss="modal">确定</button>
											<button id	= "customBack" class="easy1Btn" data-dismiss="modal">取消</button>
										</div>
							</div>
							<div id="onLoad">
							</div>
						</div>
					</div>
		</div>