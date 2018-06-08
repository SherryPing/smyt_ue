<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">

	<head>
		<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
		<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
		<title>自主管理</title>
		<%@ include file="/WEB-INF/views/include/meta.jsp"%>
		<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
		<link rel="stylesheet" href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />
	</head>

	<body>
		<!-- 头部分开始 -->
		<%@ include file="/WEB-INF/views/system/header.jsp"%>
		<!-- 头部分结束 -->
		<!-- 内容部分开始 -->
		<section id="AutManagement" class="fof-content" style="margin-top:110px;">
			<div class="firDiv">
				<div class="addNewprc">
					<p id="toSelfLoaded" class="nnn11"  style="position:relative;top:10px;">
					<span class="glyphicon glyphicon-plus"></span><span style="margin-left:10px;margin-top:5px;">添加新产品</span></p>
				</div>
				<div class="table-responsive">
					<table class="mainTbl table independMaintbl" id="listFuntTab"></table>
				</div>
			</div>
			<div class="distanceTop">
				<div class="infoTitle">
					<div class="introducTitle"></div>
					<div class="titleTxt">
						<span class="pull-left">重大风控事项提醒</span>
					</div>
				</div>
				<table class="dataTable" id='windControlWarningTab'></table>
			</div>
				<!-- 模态框（Modal） -->
				<div class="modal fade" id="SetUpAlerts" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog" style="margin-top:5%;width:55%;min-width:800px;">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
										&times;
									</button>
								<h4 class="modal-title" style="font-size:18px;">
										设置预警
									</h4>
							</div>
							<div class="modal-body">
								<!-- 预警设定 -->
								<div class="alertSet">
									<form id = 'setUpAlertsForm'>
									<input name='user_id' type="hidden" value=''>
									<input name='fund_id' type="hidden" value=''>
									<input name='freq_length' type="hidden" value='m6'>
									<!-- <div class="Select" style="display:inline-block;">
										<div id="slider" style="margin-left: 40px;">
											<ul id="historyUl">
												<li id="motherName">母基金</li>
												<li class='Sub-fund hidden'>子基金</li>
												<li style="margin-top: 30px;margin-left:-220px;" class="histolineActive" id="histolineActive"></li>
											</ul><br>
										</div>
										<div id="hitoryLine" style="width: 220px;"></div>
									</div> -->
									<div class="fundDiv">
										<div class='subFundList hidden'>
										<span style="margin-left: 45px;">子基金：</span>
										<div class='' style="display:inline-block;">
												<select id='fund_id1' class='form-control' style='width: 100px'>
													
												</select>
										</div>
										</div>
										<div class="radioDiv">
											
											<div>
												<input id="malertCondit" type="radio" name="alert_type" value="0" checked="checked">
												<label for="malertCondit">预警条件</label>
											</div>
											<div>
												<input id="mstopCondition" type="radio" name="alert_type" value="1">
												<label for="mstopCondition">止损条件</label>
											</div>
										</div>
										<div style="padding-left:40px;">
									<span>统计区间</span>
									<div class="statisticalInterval" style="margin-left:10px;">
										<input id = "freq_star" style="text-align: right;" class="form_date" size="16" type="text"  placeholder="开始日期" readonly>&nbsp;&nbsp;--&nbsp;&nbsp;
										<input id = "freq_end" class="form_date" size="16" type="text"  placeholder="截止日期" readonly>
									</div>
								</div>
								<div class="valueDiv">
									<div>
										<span>净值</span>
													<div class="inputDiv">
														<select class="pull-left" name='nav_notation'>
															<option value="less_than_or_equal_to"><=</option>
															<option value="less_than"><</option>
															<option value="more_than_or_equal_to">>=</option>
															<option value="more_than">></option>
														</select>
														<input type="text" name="nav">
													</div>
												</div>
												<div class= 'Sub-fund hidden' ><span>单个子基金规模权重（%）</span>
													<div class="inputDiv">
														<select class="pull-left  " name='weight_notation'>
															<option value="more_than_or_equal_to">>=</option>
															<option value="more_than">></option>
															<option value="less_than_or_equal_to"><=</option>
															<option value="less_than"><</option>
														</select>
														<input class=' ' type="text" name="weight">
													</div>
												</div>
										</div>
										<hr class='pull-left distanceTop20' style="width: 90%">
										<div class="valueDiv">
											<div style="width:100%;">
												<div id="Frequency" style="width:100%;text-align:left;margin-top:0px;">
													<ul class="freSlcul" style="float:none;min-width:580">
														<li style="border:none;width:80px;padding-top:10px;text-align: left;"><span>统计区间</span></li>
														<!-- <li><button type="button" data-val='m3' class="m3 slcliBtn">3M</button></li> -->
														<li><button type="button" data-val='m3' class="m3 slcliBtn">3M</button></li>
														<li><button type="button" data-val='m6' class="m6 slcliBtn">6M</button></li>
														<li><button type="button" data-val='y1' class="y1 slcliBtn">1Y</button></li>
														<li><button type="button" data-val='y2' class="y2 slcliBtn">2Y</button></li>
														<li><button type="button" data-val='y3' class="y3 slcliBtn">3Y</button></li>
														<li><button type="button" data-val='y5' class="y5 slcliBtn">5Y</button></li>
														<!-- <li><button type="button" data-val='total' class="total slcliBtn">成立以来</button></li> -->
													</ul>
												</div>
											</div>
											<div><span>年化收益率（%）</span>
												<div class="inputDiv">
													<select class="pull-left" name='return_a_notation'>
															<option value="less_than_or_equal_to"><=</option>
															<option value="less_than"><</option>
															<option value="more_than_or_equal_to">>=</option>
															<option value="more_than">></option>
														</select>
														<input type="text" name="return_a">
												</div>
											</div>
											<div><span>最大回撤（%）</span>
												<div class="inputDiv">
													<select class="pull-left" name='max_retracement_notation'>
															<option value="more_than_or_equal_to">>=</option>
															<option value="more_than">></option>
															<option value="less_than_or_equal_to"><=</option>
															<option value="less_than"><</option>
														</select>
														<input type="text" name="max_retracement">
												</div>
											</div>
											<div><span>年化夏普比</span>
												<div class="inputDiv">
													<select class="pull-left" name='sharp_a_notation'>
															<option value="less_than_or_equal_to"><=</option>
															<option value="less_than"><</option>
															<option value="more_than_or_equal_to">>=</option>
															<option value="more_than">></option>
														</select>
														<input type="text" name="sharp_a">
												</div>
											</div>
											<div><span>年化波动率（%）</span>
												<div class="inputDiv">
													<select class="pull-left" name='std_a_notation'>
															<option value="more_than_or_equal_to">>=</option>
															<option value="more_than">></option>
															<option value="less_than_or_equal_to"><=</option>
															<option value="less_than"><</option>
														</select>
														<input type="text" name="std_a">
												</div>
											</div>

										</div>
									</div>
									</form>
								</div>
								<div class="modal-footer" style="border:none;">
									<div class="distanceTop20 confirmPrcdiv" style="float:none;">
										<button id = "subBtn" disabled='disabled'>确定</button>
										<button  type="reset">重置</button>
										<button data-dismiss="modal">取消</button>
									</div>
								</div>
							</div>
							<!-- /.modal-content -->
						</div>
						<!-- /.modal -->
					</div>
				</div>
		</section>
		<div>
		</div>
		<!-- 头部分结束 -->
		<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
		<script>
			require(['easy2/AutonomousManagement/independentMain']);
		</script>
	</body>

</html>