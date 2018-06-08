<!-- 
			easy2.0产品详情（主页）.jsp
 -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico"
	rel="shortcut icon">
<title></title>
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
		<input type="hidden" id="orgId" value="${orgId}"/>
		<input type="hidden" id="orgName" value=""/>
		<div id="prcInfo">
			<div class="detail_top">
				<div class="head">
					<div>
						<img id='collectImg' class="easy2Starimg" src="${ctxResources}/images/easy2Star1.png" style="width: 20px;height: 20px;">
					</div>
					<div>
						<div class="fund_name">
							<span data-toggle="popover" data-placement="top" data-trigger="hover"  data-content=""  data-id="${fundId }" data-name="${feFundInfoDto.fund_name}" id="fund_name"></span>
						</div>
						<div>
							<span id="Policy" class="tip" style="background:#8babba;"></span>
							<span id="recordNumber" class="tip" style="background:#b1ab87;"></span>
						</div>
					</div>
					<div>
						<button class="easy3btn_blue" data-toggle="modal" data-target="#mainModal">一键导出报告</button>
						<button id="addConprc" class="easy3btn_gold">添加对比</button>
					</div>
				</div>
				<div class="main" style=" margin-top: 20px;">
					<div style="flex: 3;">
						<div class="main_con">
							<div class="card flex-left">
								<div><span id="assetScale"></span></div>
								<div>自主发行规模</div>
							</div>
							<div class="card">
								<div><span id="consultantsScale"></span></div>
								<div>顾问管理规模</div>
							</div>
							<div class="card">
								<div><span id="productQuantity"></span></div>
								<div>管理产品数量</div>
							</div>
							<div class="card">
								<div><span id="memberType"></span></div>
								<div>会员类型</div>
							</div>
							<div class="card">
								<div><span id="Area"></span></div>
								<div>所在地区</div>
							</div>
							<div class="card">
								<div><span id="dateEstablishment"></span></div>
								<div>成立日期</div>
							</div>
						</div>
					</div>
					<div>
						<div class="main_con border_none">
							<div class="card2" style="margin-top: 2px;">
								<div><span style="margin-right: 0;">公司网址：</span>
									<a id="netNav" class="endActiv"  data-toggle="popover" data-placement="top" data-trigger="hover"  data-content=""></a></div>
								<div style="height: 24px;line-height: 14px;overflow: hidden;">
									<span style="margin-right: 0;display: inline-block;height: 24px;line-height: 24px;vertical-align: top;">核心人员：</span>
									<span class="ellipse" id="org_name"  data-trigger="hover" data-container="body" data-toggle="popover" data-placement="top" data-content="" style="display: inline-block;color:black;width: calc(82% - 64px);height: 24px
									;line-height: 24px;vertical-align: center;">
								</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="Menu" class="detail-menu">
				<ul id="menuUl">
					<li class="active"><a href="#">基本信息</a></li>
					<li><a href="#">业绩指标</a></li>
					<li><a href="#">旗下产品</a></li>
				</ul>
			</div>


			<%--<div id="Menu" class="Menu">--%>
								<%--<span class="menuBackground1" id="menuBackground"></span>--%>
								<%--<ul id="menuUl" style="left:38%;">--%>
									<%--<li><a href="#"><img id="menuImg1" src="${ctxResources}/images/ExcavationMenu1-2.png"></a></li>--%>
									<%--<li><a href="#"><img id="menuImg2" src="${ctxResources}/images/ExcavationMenu2-1.png"></a></li>--%>
									<%--<li><a href="#"><img id="menuImg3" src="${ctxResources}/images/ExcavationMenu3-1.png"></a></li>--%>
									<%--&lt;%&ndash; <li><a href="#"><img id="menuImg4" src="${ctxResources}/images/ExcavationMenu4-1.png"></a></li> &ndash;%&gt;--%>
								<%--</ul>--%>
							<%--</div>--%>
		</div>
		<div id="main-content"></div>
						<!-- 产品对比列表 -->
		<div id="productComparison">
			<div class="contrastTitle">
				<span>产品对比栏</span><img id="prcDelect" src="/resources/images/hideContrast.png">
			</div>
			<div class="contrastContent">
				<table id="cntrastTbl">
					<tr class="nofund">
						<td><label></label></td>
						<td class="deletImgbtn">
						</td>
					</tr>
					<tr class="nofund">
						<td><label></label></td>
						<td class="deletImgbtn">
						</td>
					</tr>
					<tr class="nofund">
						<td><label></label></td>
						<td class="deletImgbtn">
						</td>
					</tr>
					<tr class="nofund">
						<td><label></label></td>
						<td class="deletImgbtn">
						</td>
					</tr>
				</table>
				<div class="contrastBtndiv">
					<button id="prcComparbtn">对比</button>
					<button id="prcbtnClean">清空产品</button>
				</div>
			</div>
		</div>
		<br>
		<div id="SuspensionDiv">
			<div class="Contrast">
				<span>对比</span>
				<div id="cntCount">0</div>
			</div>
		</div>
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
										<span class="reportc_title">投顾收益率：</span>
										<div class="reportc_select" id="return_year">
											<span value="2017" class="reportStime choiceTime" style="margin-left:10px;">今年以来</span>
											<span value="2016" class="reportStime">2016年</span> 
											<span value="2015" class="reportStime">2015年</span>
										</div>
									</div>
									<div class="form-group height30">
										<span class="reportc_title">战胜同规模投顾比例：</span>
										<div class="reportc_select" id="ranking_freq_length">
											<span value="year" class="reportStime choiceTime" style="margin-left:10px;">今年以来</span> 
											<span value="m3" class="reportStime">近三个月</span> 
											<span value="m6" class="reportStime">近六个月</span> 
											<span value="y1" class="reportStime">近一年</span>
										</div>
									</div>
									<div class="form-group height30">
										<span class="reportc_title">收益风险比：</span>
										<div class="reportc_select" id="ratio_freq_length">
											<span value="total" class="reportStime choiceTime" style="margin-left:10px;">成立以来</span> 
											<span value="year"class="reportStime">今年以来</span> 
											<span value="m3" class="reportStime">近三个月</span> 
											<span value="m6" class="reportStime">近六个月</span> 
											<span value="y1" class="reportStime">近一年</span>
										</div>
									</div>
									<div class="form-group height30">
										<span class="reportc_title" style="margin-top:10px;">收益指标：</span>
										<div class="reportc_select" id="ratio_value_v">
											<button value="return_a" class="reportBtn reportActive">年化收益率</button>
											<button value="excess_a" class="reportBtn">超额年化收益率</button>
										</div>
									</div>
									<div class="form-group height30">
										<span class="reportc_title" style="margin-top:10px;">风险指标：</span>
										<div class="reportc_select" id="ratio_value_h">
											<button value="stdev_a" class="reportBtn reportActive">年化波动率</button>
											<button value="max_retracement" class="reportBtn">最大回撤</button>
											<button value="dd_a" class="reportBtn">年华下行标准差</button>
											<button value="beta" class="reportBtn">贝塔系数</button>
										</div>
									</div>
									<div class="form-group height30" >
										<span class="reportc_title" style="margin-top:10px;">风险调整收益指标：</span>
										<div class="reportc_select" id="return_indicator">
											<button value="return" class="reportBtn reportActive">累计收益率</button>
											<button value="return_a" class="reportBtn">年化收益率</button>
											<button value="sharp_a" class="reportBtn">年化夏普比</button>
											<button value="calmar_a" class="reportBtn">年化卡玛比率</button>
											<button value="sor_a" class="reportBtn">年化索提诺比率</button>
											<button value="tr_a" class="reportBtn">年化特雷诺比率</button>
											<button value="in_a" class="reportBtn">年化信息比</button>
											<button value="jense_a" class="reportBtn">年化詹森指数</button>
										</div>
									</div>
									<div class="form-group height30" style="margin-bottom:60px;">
										<span class="reportc_title" style="margin-top:10px;">风控指标：</span>
										<div class="reportc_select" id="risk_indicator">
											<button value="stdev_a" class="reportBtn reportActive">年化标准差</button>
											<button value=dd_a class="reportBtn">年化下行标准差</button>
											<button value="mdd" class="reportBtn">最大回撤</button>
											<button value="mdd_time" class="reportBtn">最大回撤的形成期</button>
											<button value="beta" class="reportBtn">贝塔系数</button>
											<button value="rvalue" class="reportBtn">风险价值</button>
										</div>
									</div>
									<div id="determineDiv">
										<button class="exporBtn export_pdf">
											<img src="${ctxResources}/images/expword.png"><span>导出PDF</span>
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
	<!-- 内容部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'easy2/Excavation/Detail/Detailindex']);
	</script>
</body>
</html>