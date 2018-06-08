<!-- 评分评级_客观评价 -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>客观评价</title>
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
	<input type="hidden" id="org_id" value="${orgId}">	
	<input type="hidden" id="org_id_init" value="${fundId}">
	<section class="fof-content">
		<div id="ratingPage" class="row ratingPage">
			<div class="col-md-12">
			<!-- 头部步驟 -->
			<div class="topHead">
				<div class="Figure">
					<div class="emptyCircle"></div>
					<div class="oriBumper"></div>
					<div class="oriCircle"></div>
					<div class="oriBumper"></div>
					<div class="oriCircle"></div>					
				</div>
				<div class="txt">
					<span>客观评价</span> <span class="oriSpan">主观评价</span> <span class="oriSpan">评价结果</span>
				</div>
			</div>
			<!-- 内容主体_客观评价部分 -->
			<div id="mainContent" class="mainContent">
				<div class="header"><span>客观评价</span></div>				
				<form id="objForm" name="objForm">					
					<div class="title">
						<span class="pot"></span>
						<span class="text">公司资质</span>
					</div>
					<hr/>	
					<div class="con">
						<p class="que">1、主要股东背景<span class="subQ">（本题满分：<input type="text" value="x" name="share_holder" readonly/>/ <span>3</span>分）</span></p>
						<div class="ans">
							<div >
								<input type="radio" name="q1" id="q1a1"/> <label for="q1a1">主要股东为实力雄厚的国内外大型企业；</label>
							</div>
							<div >
								<input type="radio" name="q1" id="q1a2"/> <label for="q1a2">主要股东为核心基金经理；</label>
							</div>
							<div >
								<input type="radio" name="q1" id="q1a3"/> <label for="q1a3">主要股东为基金经理以外的自然人；</label>
							</div>
						</div>
						<p class="que">2、注册资本<span class="subQ">（本题满分：<input type="text" value="x" name="reg_capital" readonly/>/ <span>5</span>分）</span></p>
						<div class="ans">
							<div >
								<input type="radio" name="q2" id="q2a1"/> <label for="q2a1">高于2亿；</label>
							</div>
							<div >
								<input type="radio" name="q2" id="q2a2"/> <label for="q2a2">1亿到1亿9999万；</label>
							</div>
							<div >
								<input type="radio" name="q2" id="q2a3"/> <label for="q2a3">5000万到9999万；</label>
							</div>
						</div>	
						<div class="ans">
							<div >
								<input type="radio" name="q2" id="q2a4"/> <label for="q2a4">4999万；</label>
							</div>
							<div >
								<input type="radio" name="q2" id="q2a5"/> <label for="q2a5">1000万到2999万；</label>
							</div>
							<div >
								<input type="radio" name="q2" id="q2a6"/> <label for="q2a6">小于1000万；</label>
							</div>
						</div>	
						<p class="que">3、成立年限<span class="subQ">（本题满分：<input type="text" value="x" name="years" readonly/>/ <span>4</span>分）</span></p>
						<div class="ans">
							<div >
								<input type="radio" name="q3" id="q3a1"/> <label for="q3a1">成立8年以上；</label>
							</div>
							<div >
								<input type="radio" name="q3" id="q3a2"/> <label for="q3a2">5年~8年；</label>
							</div>
							<div >
								<input type="radio" name="q3" id="q3a3"/> <label for="q3a3">3年~4.9年；</label>
							</div>
						</div>	
						<div class="ans">
							<div >
								<input type="radio" name="q3" id="q3a4"/> <label for="q3a4">1年~2.9年；</label>
							</div>
							<div >
								<input type="radio" name="q3" id="q3a5"/> <label for="q3a5">1年以内；</label>
							</div>
							<div ></div>
						</div>
						<p class="que">4、目前管理产品规模<span class="subQ">（本题满分：<input type="text" value="x" name="scale_mtd" readonly/>/ <span>5</span>分）</span></p>
						<div class="ans"><div>硬性要求：管理规模不小于2亿，否则剔除初选池。理想区间：10亿-20亿，在该区间以外的偏离越大得分越低。</div></div>
						<div class="ans">							
							<div >
								<input type="radio" name="q4" id="q4a1"/> <label for="q4a1">管理规模位于理想区间；</label>
							</div>
							<div >
								<input type="radio" name="q4" id="q4a2"/> <label for="q4a2">与理想区间偏离低于1亿；</label>
							</div>
							<div >
								<input type="radio" name="q4" id="q4a3"/> <label for="q4a3">与理想区间偏离位于1亿至3亿；</label>
							</div>
						</div>	
						<div class="ans">
							<div >
								<input type="radio" name="q4" id="q4a4"/> <label for="q4a4">与理想区间偏离位于3亿至5亿；</label>
							</div>
							<div >
								<input type="radio" name="q4" id="q4a5"/> <label for="q4a5">与理想区间偏离位于5亿至10亿；</label>
							</div>
							<div >
								<input type="radio" name="q4" id="q4a6"/> <label for="q4a6">与理想区间偏离高于10亿；</label>
							</div>
						</div>		
						<p class="que">5、自营资金管理状况<span class="subQ">（本题满分：<input type="text" value="x" name="manage_scale" readonly/>/ <span>3</span>分）</span></p>
						<div class="ans ">
							<div >
								<input type="radio" name="q5" id="q5a4"/> <label for="q5a4">低于前75%；</label>
							</div>	
							<div >
								<input type="radio" name="q5" id="q5a3"/> <label for="q5a3">位于前50%~前75%之间；</label>
							</div>										
						</div>	
						<div class="ans dashDivTop">														
							<div >
								<input type="radio" name="q5" id="q5a2"/> <label for="q5a2">位于前25%~前50%之间；</label>
							</div>
							<div >
								<input type="radio" name="q5" id="q5a1"/> <label for="q5a1">自营资金管理规模占总管理规模比重高于备选池同类策略私募基金前25%；</label>
							</div>
						</div>	
						
						<div class="ans dashDivBottom">
							<div >
								<input type="radio" name="q5_2" id="q5_2a4"/> <label for="q5_2a4">低于前75%；</label>
							</div>
							<div >
								<input type="radio" name="q5_2" id="q5_2a3"/> <label for="q5_2a3">位于前50%~前75%之间；</label>
							</div>
														
						</div>	
						<div class="ans ">	
							<div >
								<input type="radio" name="q5_2" id="q5_2a2"/> <label for="q5_2a2">位于前25%~前50%之间；</label>
							</div>						
							<div >
								<input type="radio" name="q5_2" id="q5_2a1"/> <label for="q5_2a1">自营资金收入占总资产管理收入比重高于备选池同类策略私募基金前25%；</label>
							</div>
											
						</div>	
						
						<p class="que">6、财务状况<span class="subQ">（本题满分：<input type="text" value="x" name="increase_ratio" readonly/>/ <span>3</span>分）</span></p>
						<div class="ans dashDivTop">							
							<div class="minWidthDiv">
								<input type="radio" name="q6" id="q6a1"/> <label for="q6a1">净利润同比增长率高于备选池同类策略私募基金前25%；</label>
							</div>
							<div >
								<input type="radio" name="q6" id="q6a2"/> <label for="q6a2">位于前25%~前50%之间；</label>
							</div>
							<div >
								<input type="radio" name="q6" id="q6a3"/> <label for="q6a3">位于前50%~前75%之间；</label>
							</div>
							<div >
								<input type="radio" name="q6" id="q6a4"/> <label for="q6a4">低于前75%；</label>
							</div>
						</div>			
						<div class="ans dashDivBottom">							
							<div class="minWidthDiv">
								<input type="radio" name="q6_2" id="q6_2a1"/> <label for="q6_2a1">主营业务收入同比增长率高于备选池同类策略私募基金前25%；</label>
							</div>
							<div >
								<input type="radio" name="q6_2" id="q6_2a2"/> <label for="q6_2a2">位于前25%~前50%之间；</label>
							</div>	
							<div >
								<input type="radio" name="q6_2" id="q6_2a3"/> <label for="q6_2a3">位于前50%~前75%之间；</label>
							</div>
							<div >
								<input type="radio" name="q6_2" id="q6_2a4"/> <label for="q6_2a4">低于前75%；</label>
							</div>				
						</div>	
						<p class="que">7、客户结构<span class="subQ">（本题满分：<input type="text" value="x" name="investor_ratio" readonly/>/ <span>4</span>分）</span></p>
						<div class="ans">
							<div class="minWidthDiv">
								<input type="radio" name="q7" id="q7a1"/> <label for="q7a1">机构类投资者占比高于备选池同类策略私募基金前20%；</label>
							</div>
							<div >
								<input type="radio" name="q7" id="q7a2"/> <label for="q7a2">位于前20%~前40%之间；</label>
							</div>
							<div >
								<input type="radio" name="q7" id="q7a3"/> <label for="q7a3">位于前40%~前60%之间；</label>
							</div>
						</div>	
						<div class="ans">
							<div class="minWidthDiv">
								<input type="radio" name="q7" id="q7a4"/> <label for="q7a4">位于前60%~前80%之间；</label>
							</div>
							<div >
								<input type="radio" name="q7" id="q7a5"/> <label for="q7a5">低于前80%；</label>
							</div>
							<div ></div>
						</div> 
						<p class="que">8、近三年获奖记录<span class="subQ">（本题满分：<input type="text" value="x" name="prize" readonly/>/ <span>3</span>分）</span></p>
						<div class="ans">
							<div >
								<input type="radio" name="q8" id="q8a1"/> <label for="q8a1">3年获奖；</label>
							</div>
							<div >
								<input type="radio" name="q8" id="q8a2"/> <label for="q8a2">2年获奖；</label>
							</div>
							<div >
								<input type="radio" name="q8" id="q8a3"/> <label for="q8a3">1年获奖；</label>
							</div>
						</div>
						<div class="ans"><div style="color:red">奖项包括但不限于中国证券报、上海证券报、中国基金报、朝阳永续、好买财富、私募排排网、Wind和华宝证券组织颁发的奖项</div></div>														
					</div>
					<div class="title">
						<span class="pot"></span>
						<span class="text">团队架构</span>
					</div>
					<hr/>	
					<div class="con">
						<p class="que">1、公司人数<span class="subQ">（本题满分：<input type="text" value="x" name="staff_num" readonly/>/ <span>4</span>分）</span></p>
						<div class="ans"><div>硬性要求：公司人数必须不少于10人，否则剔除备选池。&nbsp;&nbsp;&nbsp;&nbsp;合理区间：公司人数（人）/资产管理规模（亿）= 1～2，在该区间以外的偏离度越大得分越低。</div></div>
						<div class="ans">							
							<div >
								<input type="radio" name="q9" id="q9a1"/> <label for="q9a1">公司人数（人）/资产管理规模（亿）位于合理区间；</label>
							</div>
							<div >
								<input type="radio" name="q9" id="q9a5"/> <label for="q9a5">与理想区间偏离低于备选池前75%；</label>
							</div>
							<div >
								<input type="radio" name="q9" id="q9a4"/> <label for="q9a4">与理想区间偏离位于备选池前50%~前75%；</label>
							</div>		
						</div>	
						<div class="ans">
							<div >
								<input type="radio" name="q9" id="q9a3"/> <label for="q9a3">与理想区间偏离位于备选池前25%~前50%之间；</label>
							</div>
							<div >
								<input type="radio" name="q9" id="q9a2"/> <label for="q9a2">与合理区间偏离高于备选池前25%；</label>
							</div>
							<div ></div>
						</div>	
						<p class="que">2、团队结构<span class="subQ">（本题满分：<input type="text" value="x" name="team_structure" readonly/>/ <span>6</span>分）</span></p>
						<div class="ans">
							<div class="minWidthDiv">
								<input type="radio" name="q10" id="q10a1"/> <label for="q10a1">投研团队人数占公司总人数比重高于备选池私募基金前25%；</label>
							</div>
							<div >
								<input type="radio" name="q10" id="q10a2"/> <label for="q10a2">位于前25%~前50%之间；</label>
							</div>
							<div >
								<input type="radio" name="q10" id="q10a3"/> <label for="q10a3">位于前50%~前75%之间；</label>
							</div>
						</div>	
						<div class="ans">
							<div >
								<input type="radio" name="q10" id="q10a4"/> <label for="q10a4">低于前75%；</label>
							</div>
							<div ></div>
							<div ></div>
						</div>
						<p class="que">3、核心投研人员平均从业年限<span class="subQ">（本题满分：<input type="text" value="x" name="researcher_working_year" readonly/>/ <span>8</span>分）</span></p>
						<div class="ans">
							<div >
								<input type="radio" name="q11" id="q11a1"/> <label for="q11a1">核心投研人员平均从业10年以上；</label>
							</div>
							<div >
								<input type="radio" name="q11" id="q11a2"/> <label for="q11a2">5~10年；</label>
							</div>
							<div >
								<input type="radio" name="q11" id="q11a3"/> <label for="q11a3">3~5年；</label>
							</div>
						</div>	
						<div class="ans">
							<div >
								<input type="radio" name="q11" id="q11a4"/> <label for="q11a4">1~3年；</label>
							</div>
							<div >
								<input type="radio" name="q11" id="q11a5"/> <label for="q11a5">1年以内；</label>
							</div>
							<div ></div>
						</div> 
						<div class="ans"><div style="color:red">核心投研人员包括但不限于投资总监、研究总监、交易总监、基金经理和首席策略开发等岗位成员</div></div>																		
						<p class="que">4、核心基金经理过往管理规模<span class="subQ">（本题满分：<input type="text" value="x" name="researcher_managed_asset" readonly/>/ <span>8</span>分）</span></p>
						<div class="ans cardTab">
							<span class="activeSpan" id="stock">股票类</span> <span id="reguEarn">固定收益类</span> <span id="quant">量化类</span>
						</div>
						<div id="stockChioce">
							<div class="ans" >
								<div >
									<input type="radio" name="q12" id="q12a1"/> <label for="q12a1">股票类基金管理规模50亿及以上；</label>
								</div>
								<div >
									<input type="radio" name="q12" id="q12a2"/> <label for="q12a2">20~50亿；</label>
								</div>
								<div >
									<input type="radio" name="q12" id="q12a3"/> <label for="q12a3">10~20亿；</label>
								</div>
							</div>	
							<div class="ans">
								<div >
									<input type="radio" name="q12" id="q12a4"/> <label for="q12a4">5~10亿；</label>
								</div>
								<div >
									<input type="radio" name="q12" id="q12a5"/> <label for="q12a5">小于5亿；</label>
								</div>
								<div ></div>
							</div> 
						</div>
						<div id="reguEarnChioce" style="display:none">
							<div class="ans" >
								<div >
									<input type="radio" name="q12_2" id="q12_1a1"/> <label for="q12_1a1">固定收益类基金管理规模100亿及以上；</label>
								</div>
								<div >
									<input type="radio" name="q12_2" id="q12_1a2"/> <label for="q12_1a2">20~50亿；</label>
								</div>
								<div >
									<input type="radio" name="q12_2" id="q12_1a3"/> <label for="q12_1a3">10~20亿；</label>
								</div>
							</div>	
							<div class="ans">
								<div >
									<input type="radio" name="q12_2" id="q12_1a4"/> <label for="q12_1a4">5~10亿；</label>
								</div>
								<div >
									<input type="radio" name="q12_2" id="q12_1a5"/> <label for="q12_1a5">小于5亿；</label>
								</div>
								<div ></div>
							</div> 
						</div>
						<div id="quantChioce" style="display:none">
							<div class="ans" >
								<div >
									<input type="radio" name="q12_3" id="q12_2a1"/> <label for="q12_2a1">量化类基金管理规模20亿及以上；</label>
								</div>
								<div >
									<input type="radio" name="q12_3" id="q12_2a2"/> <label for="q12_2a2">20~50亿；</label>
								</div>
								<div >
									<input type="radio" name="q12_3" id="q12_2a3"/> <label for="q12_2a3">10~20亿；</label>
								</div>
							</div>	
							<div class="ans">
								<div >
									<input type="radio" name="q12_3" id="q12_2a4"/> <label for="q12_2a4">5~10亿；</label>
								</div>
								<div >
									<input type="radio" name="q12_3" id="q12_2a5"/> <label for="q12_2a5">小于5亿；</label>
								</div>
								<div ></div>
							</div> 
						</div>
						<p class="que">5、核心基金经理实盘投资经验<span class="subQ">（本题满分：<input type="text" value="x" name="researcher_invest_year" readonly/>/ <span>8</span>分）</span></p>
						<div class="ans">
							<div >
								<input type="radio" name="q13" id="q13a1"/> <label for="q13a1">实盘投资（不包含研究）经验5年及以上；</label>
							</div>
							<div >
								<input type="radio" name="q13" id="q13a2"/> <label for="q13a2">4年；</label>
							</div>
							<div >
								<input type="radio" name="q13" id="q13a3"/> <label for="q13a3">3年；</label>
							</div>
						</div>	
						<div class="ans">
							<div >
								<input type="radio" name="q13" id="q13a4"/> <label for="q13a4">小于3年；</label>
							</div>
							<div ><input type="radio" name="q13" id="q13a5"/> <label for="q13a5">小于3年；</label></div>
							<div ></div>
						</div> 
						<div class="ans"><div style="color:red">仅指量化策略，股票策略小于3年不得分</div></div>																		
						<p class="que">6、近一年内核心人员变更情况<span class="subQ">（本题满分：<input type="text" value="x" name="staff_changed" readonly/>/ <span>6</span>分）</span></p>
						<div class="ans">
							<div >
								<input type="radio" name="q14" id="q14a3"/> <label for="q14a3">低于前75%；</label>
							</div>
							<div >
								<input type="radio" name="q14" id="q14a4"/> <label for="q14a4">位于前50%~前75%之间；</label>
							</div>								
						</div>	
						<div class="ans">
							<div >
								<input type="radio" name="q14" id="q14a2"/> <label for="q14a2">位于前25%~前50%之间；</label>
							</div>	
							<div >
								<input type="radio" name="q14" id="q14a1"/> <label for="q14a1">近一年内核心人员变动人数占总人数比重高于备选池私募基金前25%；</label>
							</div>
						</div> 
					</div>
					<div class="title">
						<span class="pot"></span>
						<span class="text">产品历史业绩</span>
					</div>
					<hr/>	
					<div class="con">
						<!-- <p class="que">1、产品年限<span class="subQ">（本题满分：<input type="text" value="x" name="staff_changed" readonly/>/ <input type="text" value="x" name="" readonly/>分）</span></p>
						<div class="ans"><div>硬性要求：主打产品可追溯业绩达半年以上，否则剔除备选池。</div></div>
						<div class="ans">							
							<div >
								<input type="radio" name="q15" id="q15a1"/> <label for="q15a1">可追溯业绩达半年以上；</label>
							</div>
							<div >
								<input type="radio" name="q15" id="q15a2"/> <label for="q15a2">不可追溯业绩达半年以上（剔除备选池）；</label>
							</div>							
						</div>	
						<p class="que">2、产品收益/回撤门槛<span class="subQ">（本题满分：<input type="text" value="x" name="staff_changed" readonly/>/ <input type="text" value="x" name="" readonly/>分）</span></p>
						<div class="ans"><div style="min-width:1020px">硬性要求：主要产品历史收益率至少要高于同时间区间同类策略私募基金的前60%或主要产品历史最大回撤至少要低于同时间区间同类策略私募基金的前40%，否则剔除备选池</div></div>
						<div class="ans">							
							<div >
								<input type="radio" name="q16" id="q16a1"/> <label for="q16a1">是；</label>
							</div>
							<div >
								<input type="radio" name="q16" id="q16a2"/> <label for="q16a2">否（剔除备选池）；</label>
							</div>							
						</div>	 -->
						<p class="que">1、收益率<span class="subQ">（本题满分：<input type="text" value="x" name="income" readonly/>/ <span>4</span>分）</span></p>
						<div class="ans">
							<div class="minWidthDiv">
								<input type="radio" name="q17" id="q17a1"/> <label for="q17a1">成立以来收益率高于备选池同类策略私募基金产品前20%；</label>
							</div>
							<div >
								<input type="radio" name="q17" id="q17a2"/> <label for="q17a2">位于前20%~前40%；</label>
							</div>
							<div >
								<input type="radio" name="q17" id="q17a3"/> <label for="q17a3">位于前40%~前60%；</label>
							</div>
						</div>	
						<div class="ans">
							<div class="minWidthDiv">
								<input type="radio" name="q17" id="q17a4"/> <label for="q17a4">位于前60%~前80%；</label>
							</div>
							<div >
								<input type="radio" name="q17" id="q17a5"/> <label for="q17a5">低于前80%；</label>
							</div>
							<div ></div>
						</div> 
						<p class="que">2、最大回撤<span class="subQ">（本题满分：<input type="text" value="x" name="mdd" readonly/>/ <span>4</span>分）</span></p>
						<div class="ans">
							<div class="minWidthDiv">
								<input type="radio" name="q18" id="q18a5"/> <label for="q18a5">低于前80%；</label>
							</div>
							<div class="minWidthDiv">
								<input type="radio" name="q18" id="q18a4"/> <label for="q18a4">位于前60%~前80%；</label>
							</div>
							<div >
								<input type="radio" name="q18" id="q18a3"/> <label for="q18a3">位于前40%~前60%；</label>
							</div>							
						</div>	
						<div class="ans">
							<div >
								<input type="radio" name="q18" id="q18a2"/> <label for="q18a2">位于前20%~前40%；</label>
							</div>
							<div >
								<input type="radio" name="q18" id="q18a1"/> <label for="q18a1">成立以来最大回撤高于备选池同类策略私募基金产品前20%；</label>
							</div>
							<div ></div>
						</div> 
						<p class="que">3、收益回撤比<span class="subQ">（本题满分：<input type="text" value="x" name="income_over_mdd" readonly/>/ <span>4</span>分）</span></p>
						<div class="ans">
							<div class="minWidthDiv">
								<input type="radio" name="q19" id="q19a5"/> <label for="q19a5">低于前80%；</label>
							</div>
							<div class="minWidthDiv">
								<input type="radio" name="q19" id="q19a4"/> <label for="q19a4">位于前60%~前80%；</label>
							</div>
							<div >
								<input type="radio" name="q19" id="q19a3"/> <label for="q19a3">位于前40%~前60%；</label>
							</div>							
						</div>	
						<div class="ans">
							<div >
								<input type="radio" name="q19" id="q19a2"/> <label for="q19a2">位于前20%~前40%；</label>
							</div>
							<div >
								<input type="radio" name="q19" id="q19a1"/> <label for="q19a1">成立以来收益率高于备选池同类策略私募基金产品前20%；</label>
							</div>
							<div ></div>
						</div> 
						<p class="que">4、极端行情表现<span class="subQ">（本题满分：<input type="text" value="x" name="extre" readonly/>/ <span>8</span>分）</span></p>
						<!-- <div class="ans cardTab2">
							<span class="activeSpan" id="stock2">股票类</span> <span id="reguEarn2">固定收益类</span> <span id="quant2">量化类</span>
						</div>	 -->				
						<div id="stock2Chioce">
							<div class="ans"><div>近三年市场本身或产品存续期间是否经历极端行情；</div></div>	
							<div class="ans dashBottom" >
								<div >
									<input type="radio" name="q20" id="q20a1"/> <label for="q20a1">是；</label>
								</div>
								<div >
									<input type="radio" name="q20" id="q20a2"/> <label for="q20a2">否；</label>
								</div>
							</div>
							<div id="extrSituation">
								<div class="ans dashDivBottom dashTop"><div>暴涨情况收益率<span class="subQ">（本题满分：<input type="text" value="x" name="extreme_raise" readonly/>/ <span>4</span>分）</span></div></div>	
								<div class="ans" >
									<div class="minWidthDiv">
										<input type="radio" name="q20_2" id="q20_2a1"/> <label for="q20_2a1">成立以来收益率高于备选池同类策略私募基金产品前20%；</label>
									</div>
									<div >
										<input type="radio" name="q20_2" id="q20_2a2"/> <label for="q20_2a2">位于前20%~前40%；</label>
									</div>
									<div >
										<input type="radio" name="q20_2" id="q20_2a3"/> <label for="q20_2a3">位于前40%~前60%；</label>
									</div>
								</div>	
								<div class="ans dashDivTop">
									<div class="minWidthDiv">
										<input type="radio" name="q20_2" id="q20_2a4"/> <label for="q20_2a4">位于前60%~前80%；</label>
									</div>
									<div >
										<input type="radio" name="q20_2" id="q20_2a5"/> <label for="q20_2a5">低于前80%；</label>
									</div>
									<div ></div>
								</div> 
								<div class="ans dashDivBottom"><div>暴跌情况收益率<span class="subQ">（本题满分：<input type="text" value="x" name="extreme_down" readonly/>/ <span>4</span>分）</span></div></div>	
								<div class="ans" >
									<div class="minWidthDiv">
										<input type="radio" name="q20_3" id="q20_3a1"/> <label for="q20_3a1">成立以来最大回撤高于备选池同类策略私募基金产品前20%；</label>
									</div>
									<div >
										<input type="radio" name="q20_3" id="q20_3a2"/> <label for="q20_3a2">位于前20%~前40%；</label>
									</div>
									<div >
										<input type="radio" name="q20_3" id="q20_3a3"/> <label for="q20_3a3">位于前40%~前60%；</label>
									</div>
								</div>	
								<div class="ans">
									<div class="minWidthDiv">
										<input type="radio" name="q20_3" id="q20_3a4"/> <label for="q20_3a4">位于前50%~前75%；</label>
									</div>
									<div >
										<input type="radio" name="q20_3" id="q20_3a5"/> <label for="q20_3a5">低于前75%；</label>
									</div>
									<div ></div>
								</div>	
							</div>									
						</div>
						<!-- <div id="reguEarn2Chioce" style="display:none">
							<div class="ans"><div>近三年市场本身或产品存续期间是否经历极端行情；</div></div>	
							<div class="ans dashBottom" >
								<div >
									<input type="radio" name="q20" id="q202a1"/> <label for="q202a1">是；</label>
								</div>
								<div >
									<input type="radio" name="q20" id="q202a2"/> <label for="q202a2">否；</label>
								</div>
							</div>	
							<div id="extrSituation2">
								<div class="ans dashDivBottom dashTop"><div>暴涨情况收益率</div></div>	
								<div class="ans " >
									<div class="minWidthDiv">
										<input type="radio" name="q20_2" id="q20_2_2a1"/> <label for="q20_2_2a1">成立以来收益率高于备选池同类策略私募基金产品前20%；</label>
									</div>
									<div >
										<input type="radio" name="q20_2" id="q20_2_2a2"/> <label for="q20_2_2a2">位于前20%~前40%；</label>
									</div>
									<div >
										<input type="radio" name="q20_2" id="q20_2_2a3"/> <label for="q20_2_2a3">位于前40%~前60%；</label>
									</div>
								</div>	
								<div class="ans dashDivTop">
									<div class="minWidthDiv">
										<input type="radio" name="q20_2" id="q20_2_2a4"/> <label for="q20_2_2a4">位于前60%~前80%；</label>
									</div>
									<div >
										<input type="radio" name="q20_2" id="q20_2_2a5"/> <label for="q20_2_2a5">低于前80%；</label>
									</div>
									<div ></div>
								</div> 
								<div class="ans dashDivBottom"><div>暴跌情况收益率</div></div>	
								<div class="ans" >
									<div class="minWidthDiv">
										<input type="radio" name="q20_3" id="q20_3_2a1"/> <label for="q20_3_2a1">成立以来最大回撤高于备选池同类策略私募基金产品前20%；</label>
									</div>
									<div >
										<input type="radio" name="q20_3" id="q20_3_2a2"/> <label for="q20_3_2a2">位于前20%~前40%；</label>
									</div>
									<div >
										<input type="radio" name="q20_3" id="q20_3_2a3"/> <label for="q20_3_2a3">位于前40%~前60%；</label>
									</div>
								</div>	
								<div class="ans">
									<div class="minWidthDiv">
										<input type="radio" name="q20_3" id="q20_3_2a4"/> <label for="q20_3_2a4">位于前50%~前75%；</label>
									</div>
									<div >
										<input type="radio" name="q20_3" id="q20_3_2a5"/> <label for="q20_3_2a5">低于前75%；</label>
									</div>
									<div ></div>
								</div>	
							</div>									
						</div>
						<div id="quant2Chioce" style="display:none">
							<div class="ans"><div>近三年市场本身或产品存续期间是否经历极端行情；</div></div>	
							<div class="ans dashBottom" >
								<div >
									<input type="radio" name="q20" id="q203a1"/> <label for="q203a1">是；</label>
								</div>
								<div >
									<input type="radio" name="q20" id="q203a2"/> <label for="q203a2">否；</label>
								</div>
							</div>	
							<div id="extrSituation3">
								<div class="ans dashDivBottom dashTop"><div>暴涨情况收益率</div></div>	
								<div class="ans" >
									<div class="minWidthDiv">
										<input type="radio" name="q20_2" id="q20_2_3a1"/> <label for="q20_2_3a1">成立以来收益率高于备选池同类策略私募基金产品前20%；</label>
									</div>
									<div >
										<input type="radio" name="q20_2" id="q20_2_3a2"/> <label for="q20_2_3a2">位于前20%~前40%；</label>
									</div>
									<div >
										<input type="radio" name="q20_2" id="q20_2_3a3"/> <label for="q20_2_3a3">位于前40%~前60%；</label>
									</div>
								</div>	
								<div class="ans dashDivTop">
									<div class="minWidthDiv">
										<input type="radio" name="q20_2" id="q20_2_3a4"/> <label for="q20_2_3a4">位于前60%~前80%；</label>
									</div>
									<div >
										<input type="radio" name="q20_2" id="q20_2_3a5"/> <label for="q20_2_3a5">低于前80%；</label>
									</div>
									<div ></div>
								</div> 
								<div class="ans dashDivBottom"><div>暴跌情况收益率</div></div>	
								<div class="ans" >
									<div class="minWidthDiv">
										<input type="radio" name="q20_3" id="q20_3_3a1"/> <label for="q20_3_3a1">成立以来最大回撤高于备选池同类策略私募基金产品前20%；</label>
									</div>
									<div >
										<input type="radio" name="q20_3" id="q20_3_3a2"/> <label for="q20_3_3a2">位于前20%~前40%；</label>
									</div>
									<div >
										<input type="radio" name="q20_3" id="q20_3_3a3"/> <label for="q20_3_3a3">位于前40%~前60%；</label>
									</div>
								</div>	
								<div class="ans">
									<div class="minWidthDiv">
										<input type="radio" name="q20_3" id="q20_3_3a4"/> <label for="q20_3_3a4">位于前50%~前75%；</label>
									</div>
									<div >
										<input type="radio" name="q20_3" id="q20_3_3a5"/> <label for="q20_3_3a5">低于前75%；</label>
									</div>
									<div ></div>
								</div>	
							</div>									
						 -->
						 </div>
					<div class="title">
						<span class="pot"></span>
						<span class="text">风险控制</span>
					</div>
					<hr/>	
					<div class="con" style="margin-bottom: 30px;">
						<p class="que">1、是否有独立的风控部门/系统<span class="subQ">（本题满分：<input type="text" value="x" name="rc_system" readonly/>/ <span>3</span>分）</span></p>
						<div class="ans">							
							<div >
								<input type="radio" name="q22" id="q22a1"/> <label for="q22a1">是；</label>
							</div>
							<div >
								<input type="radio" name="q22" id="q22a2"/> <label for="q22a2">否；</label>
							</div>							
						</div>	
						<p class="que">2、核心风控人员从业年限<span class="subQ">（本题满分：<input type="text" value="x" name="rc_member" readonly/>/ <span>4</span>分）</span></p>
						<div class="ans">
							<div >
								<input type="radio" name="q23" id="q23a1"/> <label for="q23a1">核心风控人员从业10年以上；</label>
							</div>
							<div >
								<input type="radio" name="q23" id="q23a2"/> <label for="q23a2">5~10年；</label>
							</div>
							<div >
								<input type="radio" name="q23" id="q23a3"/> <label for="q23a3">3~5年；</label>
							</div>
						</div>	
						<div class="ans">
							<div >
								<input type="radio" name="q23" id="q23a4"/> <label for="q23a4">1~3年以内；</label>
							</div>
							<div >
								<input type="radio" name="q23" id="q23a5"/> <label for="q23a5">1年以内；</label>
							</div>
							<div ></div>
						</div>
						<p class="que">3、是否提供了完整的风控制度书面文件<span class="subQ">（本题满分：<input type="text" value="x" name="rc_doc" readonly/>/ <span>3</span>分）</span></p>
						<div class="ans">							
							<div >
								<input type="radio" name="q24" id="q24a1"/> <label for="q24a1">是；</label>
							</div>
							<div >
								<input type="radio" name="q24" id="q24a2"/> <label for="q24a2">否；</label>
							</div>							
						</div>	
					</div>	
					</div>				
					<div class="footerBtnGroup">
						<button type="button" id="next1">下一步</button>
						<a href="${ctxPage}/InvestmentRatings"><button type="button">取消</button></a>	
					</div>
					</form>	
					</div>	
			</div>
			</div>
	</section>

	<!-- 内容部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require(['huihong/InvestmentRatings/observationPool/rating/objectiveEvaluation']); 
	</script>
</body>

</html>