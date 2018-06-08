<!-- 
			easy2.0产品详情（主页）.jsp
 -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>${feFundInfoDto.fund_name }</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
</head>
<body>

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
	<%@ include file="/WEB-INF/views/system/header.jsp"%>
	<!-- 头部 -->
	
	<!-- 内容部分开始 -->
	<section class="fof-content" style="margin-top:120px;">
		<input type="hidden" id="fundId" value="${fundId}" /> <input
			type="hidden" id="freq" value="" />
		<div id="prcInfo">
			<div class="detail_top">
				<div class="head">
					<div style="height: 82%;">
					</div>
					<div>
						<div class="fund_name">
							<span data-toggle="popover" data-placement="top" data-trigger="hover"  data-content=""  data-id="${fundId }" data-name="${feFundInfoDto.fund_name}" id="fund_name"></span>
						</div>
						<div>
							<span id="Policy" class="tip" style="background:#8babba;"></span>
							<span id="reg_code" class="tip" style="background:#b1ab87;"></span>
						</div>
					</div>
					<div>
						<button class="easy3btn_blue" data-toggle="modal" data-target="#mainModal">一键导出报告</button>
					</div>
				</div>
				<div class="main">
					<div>
						<div class="date_top">净值日期：<span id="nav_date"></span></div>
						<div class="main_con">
							<div class="card flex-left">
								<div><span id="netNav"></span></div>
								<div>单位净值</div>
							</div>
							<div class="card">
								<div><span id="added_nav"></span></div>
								<div>累计净值</div>
							</div>
							<div class="card">
								<div><span id="swanav"></span></div>
								<div>复权累计净值</div>
							</div>
						</div>
					</div>
					<div>
						<div class="date_top" >
							<%--指标日期：<span id=""></span>--%>
						</div>
						<div class="main_con">
							<div class="card">
								<div><span id="year_return" ></span></div>
								<div>今年以来收益率(月频)</div>
							</div>
							<div class="card">
								<div><span id="total_return"></span></div>
								<div>成立以来收益率(月频)</div>
							</div>
						</div>
					</div>
					<div>
						<div class="main_con border_none">
							<div class="card2">
								<div>投资顾问：<span id="org_name"  data-toggle="popover" data-placement="top" data-trigger="hover"  data-content=""></span></div>
								<div>
									<span><span>成立日期：</span><span id="foundation_date"></span></span>
									<span><span>运行状态：</span><span id="fundStatu"></span></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="Menu" class="detail-menu">
				<ul id="menuUl">
					<li><a href="#">基本信息</a></li>
					<li class="active"><a href="#">业绩指标</a></li>
					<li><a href="javascript:void(0)">持仓分析</a></li>
					<li><a href="javascript:void(0)">归因分析</a></li>
					<li><a href="javascript:void(0)">情景分析</a></li>
					<%--<li><a href="javascript:void(0)">组合调仓</a></li>--%>
				</ul>
			</div>
		</div>
		<div id="main-content"></div>
	</section>

	<div class="modal fade" id="mainModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog"
			style="width:80%;margin:auto;margin-top:10%;min-width:1000px;">
			<div id="layer"></div>
			<div class="modal-content">
				<div class="exportLogodiv">
					<input type = "hidden" id='report_type' value="performance" />
					<img id="exportLogoimg" src="${ctxResources}/images/export_03.png">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true" style="margin-right:20px;">&times;</button>
					<div>
						<section id="expMulselect">
							<div class="row">
								<div class="col-md-12">
									<div class="form-group height30">
										<span class="reportc_title">统计区间(分指标排名)：</span>
										<div class="reportc_select" id="index_ranking">
											<span id="year" class="reportStime choiceTime"
												style="margin-left:10px;">今年以来</span> <span id="m3"
												class="reportStime">近三个月</span> <span id="m6"
												class="reportStime">近六个月</span> <span id="y1"
												class="reportStime">近一年</span>
										</div>
									</div>
									<div class="form-group height30" style="margin-bottom:5px;">
										<div id="exportBenchmark">
											<span class="reportc_title">Benchmark：</span>
											<div id="radiusChoice" class="reportc_select">
												<div class="bmarkSlc1" style="margin-left:10px;">
													<div id="hs300"></div>
													<label for="HS300">沪深300</label>
												</div>
												<div class="bmarkSlc1">
													<div id="sse50" class="benchmarkDivfalse"></div>
													<label class="benchmarkLabfalse">上证50</label>
												</div>
												<div class="bmarkSlc1">
													<div id="csi500" class="benchmarkDivfalse"></div>
													<label for="CSI500" class="benchmarkLabfalse">中证500</label>
												</div>
												<div class="bmarkSlc1">
													<div id="cbi" class="benchmarkDivfalse"></div>
													<label>中债指数</label>
												</div>
												<div class="bmarkSlc1">
													<div id="nfi" class="benchmarkDivfalse"></div>
													<label>南华商品指数</label>
												</div>
												<div class="bmarkSlc1">
													<div id="allmark" class="benchmarkDivfalse"></div>
													<label>私募全市场</label>
												</div>
											</div>
										</div>
									</div>
									<div class="form-group height30">
										<span class="reportc_title" style="margin-top:10px;">收益指标：</span>
										<div class="reportc_select" id="income_indicators">
											<button id="return" class="reportBtn reportActive">累计收益率</button>
											<button id="return_a" class="reportBtn">年化收益率</button>
										</div>
									</div>
									<div class="form-group height30" style="margin-bottom:0px;">
										<span class="reportc_title">统计区间(风险指标)：</span>
										<div class="reportc_select" id="risk_indicator">
											<span id="total" class="reportStime choiceTime"
												style="margin-left: 10px;">成立以来</span> <span id="year"
												class="reportStime">今年以来</span> <span id="m3"
												class="reportStime">近三个月</span> <span id="m6"
												class="reportStime">近六个月</span> <span id="y1"
												class="reportStime">近一年</span> <span id="y2"
												class="reportStime">近两年</span>
										</div>
									</div>
									<div class="form-group height30" id="sharp_select">
										<span class="reportc_title" style="margin-top:10px;">风险调整收益指标：</span>
										<div class="reportc_select">
											<button id="sharp_a" class="reportBtn reportActive">年化夏普比</button>
											<button id="calmar_a" class="reportBtn">年化卡玛比</button>
											<button id="sor_a" class="reportBtn">年化索提诺</button>
											<button id="rvalue_adjustment_ratio" class="reportBtn">风险价值调整比</button>
										</div>
									</div>
									<div class="form-group height30" id="relative_index"
										style="margin-bottom:60px;">
										<span class="reportc_title" style="margin-top:10px;">相对指标：</span>
										<div class="reportc_select">
											<button id="odds" class="reportBtn reportActive">胜率</button>
											<button id=benchmark_r class="reportBtn">相关系数</button>
											<button id="inf_a" class="reportBtn">年化信息比</button>
											<button id="jensen_a" class="reportBtn">年化詹森指数</button>
											<button id="tr_a" class="reportBtn">年化特雷诺比率</button>
										</div>
									</div>
									<div id="determineDiv">
										<button class="exporBtn export_pdf">
											<img src="${ctxResources}/images/expword.png"><span>导出业绩报告</span>
										</button>
										<button class="exporBtn export_pdf">
											<img src="${ctxResources}/images/expword.png"><span>导出持仓报告</span>
										</button>
										<button class="exporBtn export_pdf">
											<img src="${ctxResources}/images/expword.png"><span>导出归因报告</span>
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

	<%-- <%@ include file="/WEB-INF/views/system/modal.jsp"%> --%>
	<!-- 内容部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'easy2/AutonomousManagement/fund/detailIndex' ]);
	</script>
</body>
</html>