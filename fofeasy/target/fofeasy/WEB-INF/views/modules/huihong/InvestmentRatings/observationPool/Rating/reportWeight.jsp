<!-- 评分评级_当前权重 -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>当前权重</title>
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
	<div id="newTemp" class="row">
		<div class="col-md-12" style="min-width: 1240px;">
			<div class="header">
				<span id="back">当前权重</span>
				<span class="back" style="cursor:pointer">返回上一页</span>
			</div>
			<form id="newTempForm" name="newTempForm">
			<div class="mainContent">
				<div class="leftCon">
					<div class="firStage">
						<div>
							<span>客观评价&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<input type="number" name="objective_mark"/> %
						</div>						
					</div>
					<div class="secStage">
						<div class="secDiv1"></div>
						<div class="secDiv2">
							<div>
								<span>公司资质&nbsp;&nbsp;&nbsp;&nbsp;</span>
								<input type="number" name="basic_info" /><span> %</span>
							</div>
						</div>
						<div class="secDiv3">
							<div>
								<span>团队架构&nbsp;&nbsp;&nbsp;&nbsp;</span>
								<input type="number" name="team_info"/><span> %</span>
							</div>
						</div>
						<div class="secDiv4">
							<div>
								<span>产业历史业绩&nbsp;&nbsp;&nbsp;&nbsp;</span>
								<input type="number" name="fund_info"/><span> %</span>
							</div>
						</div>
						<div class="secDiv5">
							<div>
								<span>风险控制&nbsp;&nbsp;&nbsp;&nbsp;</span>
								<input type="number" name="rc_info"/><span> %</span>
							</div>
						</div>
					</div>
					<div class="thirStage">
						<div class="thirDiv1">
							<div>
								<div>
									<span class="floatLeft">股东背景</span><input type="number" name="share_holder"/><span>%</span>
								</div>					
							</div>
							<div>
								<div>
									<span class="floatLeft">注册资本</span><input type="number" name="reg_capital" /><span>%</span>
								</div>
							</div>
							<div>
								<div>
									<span class="floatLeft">成立年限</span><input type="number" name="years"/><span>%</span>
								</div>
							</div>
							<div>
								<div>
									<span class="floatLeft">目前产品管理规模</span><input type="number" name="scale_mtd"/><span>%</span>
								</div>
							</div>
							<div>
								<div>
									<span class="floatLeft">自营资金管理状况</span><input type="number" name="manage_scale"/><span>%</span>
								</div>
							</div>
							<div>
								<div>
									<span class="floatLeft">财务状况</span><input type="number" name="increase_ratio"/><span>%</span>
								</div>
							</div>
							<div>
								<div>
									<span class="floatLeft">客户结构</span><input type="number" name="investor_ratio"/><span>%</span>
								</div>
							</div>
							<!-- <div>
								<div>
									<span class="floatLeft">客户结构</span><input type="number"/><span>%</span>
								</div>
							</div> -->
							<div>
								<div>
									<span class="floatLeft">近三年获奖记录</span><input type="number" name="prize"/><span>%</span>
								</div>
							</div>
						</div>
						<div class="thirDiv2">
							<div>
								<div>
									<span class="floatLeft">公司人数</span><input type="number" name="staff_num"/><span>%</span>
								</div>					
							</div>
							<div>
								<div>
									<span class="floatLeft">团队结构</span><input type="number" name="team_structure"/><span>%</span>
								</div>
							</div>
							<div>
								<div>
									<span class="floatLeft">投研人员平均从业年限</span><input type="number" name="researcher_invest_year"/><span>%</span>
								</div>
							</div>
							<div>
								<div>
									<span class="floatLeft">核心基金经理过往管理规模</span><input type="number" name="researcher_managed_asset"/><span>%</span>
								</div>
							</div>
							<div>
								<div>
									<span class="floatLeft">核心投资经理实盘投资经验</span><input type="number" name="researcher_working_year"/><span>%</span>
								</div>
							</div>
							<div>
								<div>
									<span class="floatLeft">近一年内核心人员变更情况</span><input type="number" name="staff_changed"/><span>%</span>
								</div>
							</div>
						</div>
						<div class="thirDiv3">
							<!-- <div>
								<div>
									<span class="floatLeft">产品年限</span><input type="number"/><span>%</span>
								</div>					
							</div>
							<div>
								<div>
									<span class="floatLeft">产品收益/回撤门槛</span><input type="number"/><span>%</span>
								</div>
							</div> -->
							<div>
								<div>
									<span class="floatLeft">收益率</span><input type="number" name="income"/><span>%</span>
								</div>
							</div>
							<div>
								<div>
									<span class="floatLeft">最大回撤</span><input type="number" name="mdd"/><span>%</span>
								</div>
							</div>
							<div>
								<div>
									<span class="floatLeft">收益回撤比</span><input type="number" name="income_over_mdd"/><span>%</span>
								</div>
							</div>
							<div>
								<div>
									<span class="floatLeft">暴涨情况收益率</span><input type="number" name="extreme_raise"/><span>%</span>
								</div>
							</div>
							<div>
								<div>
									<span class="floatLeft">暴跌情况收益率</span><input type="number" name="extreme_down"/><span>%</span>
								</div>
							</div>
						</div>
						<div class="thirDiv4">
							<div>
								<div>
									<span class="floatLeft">是否有独立的风控部门/系统</span><input type="number" name="rc_system"/><span>%</span>
								</div>					
							</div>
							<div>
								<div>
									<span class="floatLeft">核心风控人员从业年限</span><input type="number" name="rc_member"/><span>%</span>
								</div>
							</div>
							<div>
								<div>
									<span class="floatLeft">是否提供了完整的风控制度书面文件</span><input type="number" name="rc_doc"/><span>%</span>
								</div>
							</div>							
						</div>
						
					</div>
				</div>
				<div class="rightCon">
					<div class="firStage">
						<div>
							<span>主观评价&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<input type="number" name="subjective_mark" /> %
						</div>						
					</div>
					<div class="secStage">
						<div>
							<div>
								<span class="floatLeft">股权结构</span><input type="number" name="sh_structure"/><span>%</span>
							</div>					
						</div>
						<div>
							<div>
								<span class="floatLeft">组织架构</span><input type="number" name="department_structure"/><span>%</span>
							</div>
						</div>
						<div>
							<div>
								<span class="floatLeft">经营计划</span><input type="number" name="plan"/><span>%</span>
							</div>
						</div>
						<div>
							<div>
								<span class="floatLeft">核心投研人员</span><input type="number" name="core_member"/><span>%</span>
							</div>
						</div>
						<div>
							<div>
								<span class="floatLeft">激励机制</span><input type="number" name="org_incentive"/><span>%</span>
							</div>
						</div>
						<div>
							<div>
								<span class="floatLeft">策略容量</span><input type="number" name="strategy_scale"/><span>%</span>
							</div>
						</div>
						<div>
							<div>
								<span class="floatLeft">投资理念</span><input type="number" name="invest_philosophy"/><span>%</span>
							</div>
						</div>
						<div>
							<div>
								<span class="floatLeft">投资流程</span><input type="number" name="invest_process"/><span>%</span>
							</div>
						</div>
						<div>
							<div>
								<span class="floatLeft">交易系统</span><input type="number" name="trading_system"/><span>%</span>
							</div>
						</div>
						<div>
							<div>
								<span class="floatLeft">风控流程</span><input type="number" name="risk_control_process"/><span>%</span>
							</div>
						</div>
						<div>
							<div>
								<span class="floatLeft">产品相关事宜</span><input type="number" name="invest_factors"/><span>%</span>
							</div>
						</div>
											
					</div>
				</div>
			</div>
			
		</form>	
		</div>	
	</div>
	</section>
	<!-- 内容部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'huihong/InvestmentRatings/observationPool/rating/reportWeight' ]);
	</script>
</body>
</html>