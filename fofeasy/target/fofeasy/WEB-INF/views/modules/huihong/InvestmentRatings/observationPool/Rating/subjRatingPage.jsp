<!-- 评分评级_主观评价-->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>主观评价</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
<link rel="stylesheet"
	href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />
</head>

<body>
	<!-- 头部分开始 -->
	<%@ include file="/WEB-INF/views/system/header.jsp"%>
	<!-- 头部分结束 -->
	<!-- 内容部分开始 -->
	<section class="fof-content">
		<div id="subjRatingPage" class="row subjRatingPage">
			<div class="col-md-12">
			<!-- 头部切换 -->
			<div class="topHead">
				<div class="Figure">
					<div class="circle">
						<span class="glyphicon glyphicon-ok"></span>
					</div>
					<div class="Bumper"></div>
					<div class="emptyCircle"></div>
					<div class="oriBumper"></div>
					<div class="oriCircle"></div>	
				</div>
				<div class="txt">
					<span>客观评价</span> <span>主观评价</span> <span class="oriSpan">评价结果</span>
				</div>
			</div>
			<!-- 内容主体_客观评价部分 -->
			<div id="mainContent" class="mainContent">
				<div class="header"><span>主观评价</span></div>				
				<form id="subjForm" name="subjForm">
					<input type="hidden" id="org_id" value="${orgId}">	
					<input type="hidden" id="org_id_init" value="${fundId}">
					<input type="hidden" id="user_id" value="${useUserId}">								
					<div class="con">
						<p class="que">1、股权结构<span class="subQ">（本题满分：<input type="text" value="x" name="sh_structure" readonly/>分）</span></p>
						<div class="ans clearfix">
							<div class="stand">
								<p>标准：股权结构是否主次分明，清晰合理</p>
							</div>
							<div class="rating">
								<label class="score">评分&nbsp;</label>
								<input type="number" name="sco1" />
							</div>						
						</div>
						<hr/>
						<p class="que">2、组织架构<span class="subQ">（本题满分：<input type="text" value="x" name="department_structure" readonly/>分）</span></p>
						<div class="ans clearfix">
							<div class="stand">
								<p>标准：组织架构是否合理分明</p>
							</div>
							<div class="rating">
								<label class="score">评分&nbsp;</label>
								<input type="number" name="sco2" />
							</div>						
						</div>
						<hr/>
						<p class="que">3、经营规划<span class="subQ">（本题满分：<input type="text" value="x" name="plan" readonly/>分）</span></p>
						<div class="ans clearfix">
							<div class="stand">
								<p>标准：综合评价经营规划是否清晰合理，是否具备可操作性，是否存在重大隐患</p>
							</div>
							<div class="rating">
								<label class="score">评分&nbsp;</label>
								<input type="number" name="sco3" />
							</div>						
						</div>	
						<hr/>					
						<p class="que">4、核心投研人员教育/工作背景<span class="subQ">（本题满分：<input type="text" value="x" name="core_member" readonly/>分）</span></p>
						<div class="ans clearfix">
							<div class="stand">
								<p>标准：学历如何，过往工作单位如何，职位如何</p>
							</div>
							<div class="rating">
								<label class="score">评分&nbsp;</label>
								<input type="number" name="sco4" />
							</div>							
						</div>
						<hr/>
						<p class="que">5、激励机制<span class="subQ">（本题满分：<input type="text" value="x" name="org_incentive" readonly/>分）</span></p>
						<div class="ans clearfix">
							<div class="stand">
								<p>标准：是否有明确的考核与激励机制，机制是否合理</p>
							</div>
							<div class="rating">
								<label class="score">评分&nbsp;</label>
								<input type="number" name="sco5" />
							</div>						
						</div>
						<hr/>
						<p class="que">6、策略容量<span class="subQ">（本题满分：<input type="text" value="x" name="strategy_scale" readonly/>分）</span></p>
						<div class="ans clearfix">
							<div class="stand">
								<p>标准：各类策略可接受容量额度是否足够</p>
							</div>
							<div class="rating">
								<label class="score">评分&nbsp;</label>
								<input type="number" name="sco6" />
							</div>						
						</div>
						<hr/>
						<p class="que">7、投资理念<span class="subQ">（本题满分：<input type="text" value="x" name="invest_philosophy" readonly/>分）</span></p>
						<div class="ans clearfix">
							<div class="stand">
								<p>标准：投资理念是否有理有据，是否具备可持续性和操作性</p>
							</div>
							<div class="rating">
								<label class="score">评分&nbsp;</label>
								<input type="number" name="sco7" />
							</div>							
						</div>
						<hr/>
						<p class="que">8、投资流程<span class="subQ">（本题满分：<input type="text" value="x" name="invest_process" readonly/>分）</span></p>
						<div class="ans clearfix">
							<div class="stand">
								<p>标准：综合评价投资决策流程是否清晰、成熟稳定，有操作性，有无明确的决策机制</p>
							</div>
							<div class="rating">
								<label class="score">评分&nbsp;</label>
								<input type="number" name="sco8" />
							</div>						
						</div>
						<hr/>
						<p class="que">9、交易系统<span class="subQ">（本题满分：<input type="text" value="x" name="trading_system" readonly/>分）</span></p>
						<div class="ans clearfix">
							<div class="stand">
								<p>标准：是否具备完善可靠的交易系统</p>
							</div>
							<div class="rating">
								<label class="score">评分&nbsp;</label>
								<input type="number" name="sco9" />
							</div>														
						</div>
						<hr/>
						<p class="que">10、产品相关事宜<span class="subQ">（本题满分：<input type="text" value="x" name="invest_factors" readonly/>分）</span></p>
						<div class="ans clearfix">
							<div class="stand">
								<p>标准：安全垫比例，金额；前后端收费是否符合FOF项目要求</p>
							</div>
							<div class="rating">
								<label class="score">评分&nbsp;</label>
								<input type="number" name="sco11" />
							</div>										
						</div>
						<hr/>
						<p class="que">11、风控流程<span class="subQ">（本题满分：<input type="text" value="x" name="risk_control_process" readonly/>分）</span></p>
						<div class="ans clearfix">
							<div class="stand">
								<p>标准：综合评价风控流程是否清晰、有效、有可操作性，有无专人定期监控，有无完善的风控系统及科学的评价体系</p>
							</div>
							<div class="rating">
								<label class="score">评分&nbsp;</label>
								<input type="number" name="sco10" />
							</div>												
						</div>						
						<hr/>							
					</div>
					<div class="footerBtnGroup" >
						<button type="button" id="previ">上一步</button>
						<button type="button" id="comp">完成</button>	
						<!-- <button type="button" id="cancel">取消</button>	 -->	
					</div>
				</form>		
				<div class="scoreReferCard" id="card1" style="top: 190px;">
				  	<!-- 股东构成及股权结构 -->
					<form id="shareholderInfoform" name="shareholderInfoform">
						<table class="secTable hhautomaticTbl" id="tab_1">
						</table>
					</form>
				</div>
				<div class="scoreReferCard" id="card2" style="display:none">
				    <form id="departmentInfoform" name="departmentInfoform">
					  <table id="tab_2" class="secTable hhautomaticTbl">
					  </table>
				    </form>
				</div>
				<div class="scoreReferCard" id="card3" style="display:none">
					<p class="cardTitle">公司经营规划</p>
				  	<div id="div_3" class="referBorderDiv"></div>
				</div>
				<div class="scoreReferCard" id="card4" style="display:none">
				    <p class="cardTitle">公司关键人员信息</p>
				    <div class="referBorderDiv">
					    <form name="staffKeyInfo" id="staffKeyInfo">
							<table id="tab_6" class=" secTable teamTable hhautomaticTbl">
							</table>
						</form>
					</div>
				</div>
				<div class="scoreReferCard" id="card5" style="display:none">
				    <p class="cardTitle">公司团队整体规划：</p>
				  	<div id="div_5_1" class="referBorderDiv"></div>
				  	<p class="cardTitle">公司人员考核方式（如有）：</p>
				  	<div id="div_5_2" class="referBorderDiv"></div>
				  	<p class="cardTitle">公司激励机制（如有）：</p>
				  	<div id="div_5_3" class="referBorderDiv"></div>
				</div>
				<div class="scoreReferCard" id="card6" style="display:none">
					<form id="strategyInfoform" name="strategyInfoform">
						<table id="tab_8" class="detailExplTable hhautomaticTbl">
	
						</table>
					</form>
				</div>
				<div class="scoreReferCard" id="card7" style="display:none">
					<p class="cardTitle">投资理念：</p>
				  	<div id="div_7" class="referBorderDiv"></div>
				</div>
				<div class="scoreReferCard" id="card8" style="display:none">
					<p class="cardTitle">投资流程：</p>
				  	<div id="div_8" class="referBorderDiv"></div>
				</div>
				<div class="scoreReferCard" id="card9" style="display:none">
					<p class="cardTitle">交易 自动化程度：</p>
				  	<div id="div_9_1" class="referBorderDiv"></div>
				  	<p class="cardTitle" >简要介绍公司研发系统、交易系统、风控系统（如有）：</p>
				  	<div id="div_9_2" class="referBorderDiv"></div>
				</div>
				<div class="scoreReferCard" id="card10" style="display:none">
				  	<table id="tab_2" class="secTable hhautomaticTbl table table-no-bordered table-striped">
				  		<tbody>
				  			<tr>
				  				<td style="width: 220px; ">
				  					<span class='blueLeft'>拟出资安全比例：<span id="span_10_1"></span></span>
				  				</td>
				  				<td style="width: 350px; ">
				  					<span>可用于安全垫出资的总规模（万）：<span id="span_10_2"></span></span>
				  				</td>
				  			</tr>
				  			<tr>
				  				<td style="width: 220px; ">
				  					<span class='blueLeft'>拟设置管理费：<span id="span_10_3"></span></span>
				  				</td>
				  				<td style="width: 350px; ">
				  					<span>是否同意设置业绩计提基准：<span id="span_10_4"></span></span>
				  				</td>
				  			</tr>
				  		</tbody>
				  	</table>
				</div>
				<div class="scoreReferCard" id="card11" style="display:none">
					<p class="cardTitle">是否有止损机制：<span id="span_11_1" style="font-weight:500"></span></p>
				  	<p class="cardTitleMargin0" >请详述公司止损机制（如有）：</p>
				  	<div id="div_11_1" class="referBorderDiv"></div>
				  	<p class="cardTitleMargin0" >公司对不同策略或资产是否采用不同的风控指标：<span id="span_11_2" style="font-weight:500"></span></p>
				  	<p class="cardTitleMargin0" >若是，请提供各个策略/资产类别的风控指标清单：</p>
				  	<div id="div_11_2" class="referBorderDiv"></div>
				  	<p class="cardTitle">历史上发生模型风险的案例及应对措施（如有）：</p>
				  	<div id="div_11_3" class="referBorderDiv"></div>
				</div>
			</div>			
			</div>
		</div>		
	</section>

	<!-- 内容部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require(['huihong/InvestmentRatings/observationPool/rating/subjRatingPage']); 
	</script>
</body>

</html>