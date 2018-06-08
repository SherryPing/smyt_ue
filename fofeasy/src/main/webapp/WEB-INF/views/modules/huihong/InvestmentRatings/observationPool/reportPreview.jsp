<!-- 报告预览.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>报告预览</title>
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
	<section id="hh-reportView" class="fof-content">
		<div class="row">
			<div class="col-md-12">
				<ul class="header">
					<li id="org_name" class="1_title"></li>
					<li><button class="huihong4Btn">生成报告</button></li>
					<li>备案编号:<span class="left5" id="reg_code"></span></li>
					<li>管理规模:<span class="left5" id="asset_scale_mtd"></span></li>
					<li>已发行产品数量:<span class="left5" id="issued_funds_num"></span></li>
					<li>主要策略:<span style="width:200px;position:relative;top:10px;" class="left5 manywords hand" id="org_strategy"  data-toggle='popover'  data-placement='top'  data-trigger='hover'  data-content></span></li>
				</ul>
				<ul id="labUl" class="labelUl">
					<li class="reportTab Active"><span>基本信息</span></li>
					<li class="reportTab"><span>团队人员</span></li>
					<li class="reportTab"><span>投资策略</span></li>
					<li class="reportTab"><span>旗下产品</span></li>
					<li class="reportTab"><span>IT与风控</span></li>
					<li class="reportTab"><span>材料清单</span></li>
					<li class="reportTab"><span>补充说明</span></li>
				</ul>
			</div>
		</div>
		<!-- 报告预览_基本信息 -->
		<div class="row basicInfo moduleDiv">
			<div class="col-md-12">
				<p class="title">
					<span class="pot"></span><span class="text">基本信息</span> 
					<img class="imgP edibtn" src="${ctxResources}/images/huisheng/modify1.png" />
				</p>
				<hr />
				<form id="basicInfoform" name="basicInfoform">
					<input type="hidden" name="org_id">
					<table class="firTable" id="tab_1">
						<tr>
							<td>组织机构代码：</td>
							<td><input type="text" name="org_code"></td>
							<td>基金业协会登记时间：</td>
							<td><input type="text" name="reg_time"></td>
						</tr>
						<tr>
							<td>公司注册资本（万元）：</td>
							<td><input type="text" name="reg_capital"></td>
							<td>公司注册地址：</td>
							<td><input type="text" name="reg_address"></td>
						</tr>
						<tr>
							<td>公司实缴资本（万元）：</td>
							<td><input type="text" name="real_capital"></td>
							<td>公司办公地址：</td>
							<td><input type="text" name="office_address"></td>
						</tr>
						<tr>
							<td>公司成立时间：</td>
							<td><input type="text" name="found_date"></td>
							<td>是否具有投顾资格：</td>
							<td><input type="text" name="is_qualified"></td>
						</tr>
						<tr>
							<td>联系人：</td>
							<td><input type="text" name="linkman"></td>
							<td>联系人电话：</td>
							<td><input type="text" name="linkman_phone"></td>
						</tr>
						<tr>
							<td>联系人职位：</td>
							<td><input type="text" name="linkman_title"></td>
							<td>联系人邮箱</td>
							<td><input type="text" name="linkman_email"></td>
						</tr>
						<tr>
							<td>客户结构：</td>
							<td colspan="3" class="khcomponent">
								<div style="display:flex">
									<span style="flex:3">机构投资者占比：<input type="text"
										name="org_investor_ratio" style="width:8%;text-align:right;margin-right:5px;min-width:30px;">%</span> <span
										style="flex:3">个人投资者占比：<input type="text"
										name="individual_investor_ratio" style="width:8%;text-align:right;margin-right:5px;min-width:30px;">%</span> <span
										style="flex:3">其他占比：<input type="text"
										name="others_ratio" style="width:8%;text-align:right;margin-right:5px;min-width:30px;">%</span> <span
										style="flex:1"></span>
								</div>
							</td>
						</tr>
						<tr>
							<td>公司理念与公司文化</td>
							<td colspan="3"><div><textarea 
									name="org_philosophy_culture" ></textarea></div></td>
						</tr>
						<tr>
							<td>公司经营规划</td>
							<td colspan="3"><textarea name="org_mgt_plan"
									></textarea></td>
						</tr>
					</table>
				</form>
				
				<div class='btnDiv ediBtnGroup' id="div1" style="display:none">
					<button id='ediBtnOk_1' class='huihong4Btn ediBtnCancel'>确定</button>
					<button class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
				<p class="title">
					<span class="pot"></span> <span class="text">股东构成及股权结构</span> 
					<img class="imgP edibtn" src="${ctxResources}/images/huisheng/modify1.png" />
				</p>
				<hr />
				<!-- 股东构成及股权结构 -->
				<form id="shareholderInfoform" name="shareholderInfoform">
					<table class="secTable hhautomaticTbl" id="tab_2">
					</table>
				</form>
				<div class='btnDiv ediBtnGroup' style="display:none">
					<button id='ediBtnOk_2' class='huihong4Btn ediBtnCancel'>确定</button>
					<button class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
				<p class="title">
					<span class="pot"></span> <span class="text">公司组织结构</span>
					<img class="imgP edibtn" src="${ctxResources}/images/huisheng/modify1.png" />
				</p>
				<hr />
				<form id="departmentInfoform" name="departmentInfoform">
					<table id="tab_3" class="secTable hhautomaticTbl">

					</table>
				</form>
				<div class='btnDiv ediBtnGroup' style="display:none">
					<button id='ediBtnOk_3' class='huihong4Btn ediBtnCancel'>确定</button>
					<button class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
				<p class="title">
					<span class="pot"></span> <span class="text">公司经营情况</span>
					<img class="imgP edibtn" src="${ctxResources}/images/huisheng/modify1.png" />
				</p>
				<hr style="margin-bottom:0;" />
				<div>
					<p class="subTitle" style="overflow:hidden">
						<span class="text">近三年财务状况</span>
					</p>
					<form id="tab_4" name="tab_4">
					<input name="org_id" type="hidden">
					<input name="cs" type="hidden">
					<div class="col-md-6 col-sm-6 col-xs-6">
						<div class="colLeft">
							<table id="cwTable" class="secTable cwTable">
								<thead>
									<tr>
										<td></td>
										<td>2014年度</td>
										<td>2015年度</td>
										<td>2016年度</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>资产（万元）</td>
										<td><input type="text" name="y3_asset"></td>
										<td><input type="text" name="y2_asset"></td>
										<td><input type="text" name="y1_asset"></td>
									</tr>
									<tr>
										<td>负债（万元）</td>
										<td><input type="text" name="y3_debt"></td>
										<td><input type="text" name="y2_debt"></td>
										<td><input type="text" name="y1_debt"></td>
									</tr>
									<tr>
										<td>主营业务收入（万元）</td>
										<td><input type="text" name="y3_main_business_income"></td>
										<td><input type="text" name="y2_main_business_income"></td>
										<td><input type="text" name="y1_main_business_income"></td>
									</tr>
									<tr>
										<td>净利润（万元）</td>
										<td><input type="text" name="y3_net_profit"></td>
										<td><input type="text" name="y2_net_profit"></td>
										<td><input type="text" name="y1_net_profit"></td>
									</tr>
									<tr>
										<td>资产管理业务收入占比（%）</td>
										<td><input type="text" name="y3_asset_mgt_income_ratio"></td>
										<td><input type="text" name="y2_asset_mgt_income_ratio"></td>
										<td><input type="text" name="y1_asset_mgt_income_ratio"></td>
									</tr>
									<tr>
										<td>自营业务收入占比（%）</td>
										<td><input type="text"
											name="y3_selfopereated_income_ratio"></td>
										<td><input type="text"
											name="y2_selfopereated_income_ratio"></td>
										<td><input type="text"
											name="y1_selfopereated_income_ratio"></td>
									</tr>
								</tbody>
							</table>
							<p class="subTitle" style="overflow:hidden;">
								<span class="text">近三年管理规模变化情况</span>
							</p>
							<table id="cwTable" class="secTable cwTable">
								<thead>
									<tr>
										<td></td>
										<td>2014年度</td>
										<td>2015年度</td>
										<td>2016年度</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>管理规模（亿元）</td>
										<td><input type="text" name="y3_mgt_scale"></td>
										<td><input type="text" name="y2_mgt_scale"></td>
										<td><input type="text" name="y1_mgt_scale"></td>
									</tr>
									<tr>
										<td>自营资金管理规模（亿元）</td>
										<td><input type="text"
											name="y3_selfopereated_asset_scale"></td>
										<td><input type="text"
											name="y2_selfopereated_asset_scale"></td>
										<td><input type="text"
											name="y1_selfopereated_asset_scale"></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					</form>
					<div class="col-md-6 col-sm-6 col-xs-6 pad_right0">
						<div class="chart colRight" id="chartC"></div>
					</div>
					<div style="clear:both"></div>
					<p class="subTitle" style="overflow:hidden">
						<span class="text">近三年获奖状况</span>
					</p>
					<form id="awardWin" name="awardWin">
						<input type="text" name="org_id" style="display:none"/>
						<input type="text" name="y3_prize" style="display:none"/>
						<input type="text" name="y2_prize" style="display:none"/>
						<input type="text" name="y1_prize" style="display:none"/>
					<table id="hjTable" class="secTable cwTable thiTable">
						<thead>
							<tr>
								<td></td>
								<td>2014年度</td>
								<td>2015年度</td>
								<td>2016年度</td>
							</tr>
						</thead>
						<tbody id="wintblnContent">
							
						</tbody>
					</table>
					</form>
				</div>
				<div class='btnDiv ediBtnGroup' style="display:none">
					<button id='ediBtnOk_4' class='huihong4Btn ediBtnCancel'>确定</button>
					<button class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
			</div>

		</div>

		<!-- 报告预览_核心团队人员 -->
		<div class="row basicInfo team moduleDiv" style="display:none">
			<div class="col-md-12">
				<p class="title">
					<span class="pot"></span> <span class="text">团队规模及变动</span>
					<img class="imgP edibtn" src="${ctxResources}/images/huisheng/modify1.png" />
				</p>
				<hr/>
				<form name="staffScale" id="staffScale">
					<table id="tab_5" class="secTable teamTable hhautomaticTbl">
					</table>
				</form>
				<div class='btnDiv ediBtnGroup' style="display:none">
					<button id='ediBtnOk_5' class='huihong4Btn ediBtnCancel'>确定</button>
					<button class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
				<p class="title">
					<span class="pot"></span> <span class="text">公司关键人员信息</span>
					<img class="imgP edibtn" src="${ctxResources}/images/huisheng/modify1.png" />
				</p>
				<hr>
				<form name="staffKeyInfo" id="staffKeyInfo">
					<table id="tab_6" class=" secTable teamTable hhautomaticTbl">
					</table>
				</form>
				<div class='btnDiv ediBtnGroup' style="display:none">
					<button id='ediBtnOk_6' class='huihong4Btn ediBtnCancel'>确定</button>
					<button class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
				<p class="title">
					<span class="pot"></span> <span class="text">公司团队规划与激励机制</span> <img
						class="imgP edibtn"
						src="${ctxResources}/images/huisheng/modify1.png" />
				</p>
				<hr>
				<form id="motivationform" name="motivationform">
					<input type="hidden" name="org_id">
					<table id="tab_7" class="firTable keyPeoMsg">
						<tr class="h">
							<td>公司团队整体规划：</td>
							<td colspan="3"><textarea name="org_team_plan"></textarea></td>
						</tr>
						<tr class="h">
							<td>人员考核方式（如有）：</td>
							<td colspan="3"><textarea  name="staff_assessment"></textarea></td>
						</tr>
						<tr class="h">
							<td>公司激励机制（如有）：</td>
							<td colspan="3"><textarea name="org_incentive"></textarea></td>
						</tr>
					</table>
				</form>

				<div class='btnDiv ediBtnGroup' style="display:none">
					<button id='ediBtnOk_7' class='huihong4Btn ediBtnCancel'>确定</button>
					<button class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
			</div>
		</div>


		<!-- 报告预览_投资策略 -->
		<div class="row basicInfo inveSta moduleDiv" style="display:none">
			<div class="col-md-12">
				<p class="title">
					<span class="pot"></span> <span class="text">公司主要投资策略</span>
				</p>
				<hr />
				<div>
						<span class="ultitleTxt2"style="width:140px;line-height:30px">公司主要投资策略：</span>
						<span id="mainStrategy"></span>
				</div>
				<%-- <div class="table-responsive">
					<table id="filterTbl" class="table ulTable">
						<tr>
							<td><span class="ultitleTxt2"
								style="width:140px;line-height:30px">公司主要投资策略：</span></td>
							<td><span id="secMulslebtn" class="openEnded endActiv">不限</span></td>
							<td colspan="2" class="ulContent" id="investmentStrategy">
								<button id="60101" class="checkboxBtn checkboxBtnshort"
									name="disMethod">股票策略</button>
								<button id="60102" class="checkboxBtn checkboxBtnshort"
									name="disMethod">管理期货</button>
								<button id="60103" class="checkboxBtn checkboxBtnshort"
									name="disMethod">相对价值</button>
								<button id="60104" class="checkboxBtn checkboxBtnshort"
									name="disMethod">事件驱动</button> <img class="dropdownImg" id="dropdownImg" src="${ctxResources}/images/mainxiala.png">
								<button id="6010501"
									class="Special checkboxBtn checkboxBtnshort" name="disMethod">债券策略</button>
								<button id="6010601"
									class="Special checkboxBtn checkboxBtnshort" name="disMethod">宏观策略</button>
								<button id="60107" class="checkboxBtn checkboxBtnshort"
									name="disMethod">组合策略</button>
								<button id="6010801"
									class="Special checkboxBtn checkboxBtnshort" name="disMethod">多策略</button>
								<button id="60109" class="checkboxBtn checkboxBtnlong"
									name="disMethod">其他一级策略</button>
							</td>
						</tr>
						<!-- 投资策略详情 -->
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="stockStrategy">
								<div class="detaiTitle">
									<span>股票策略：</span>
								</div>
								<div class="checkBlock">
									<input id="6010101" type="checkbox" name="secMulscn" disabled>
									<label for="6010101">股票多头</label>
								</div>
								<div class="checkBlock">
									<input id="6010102" type="checkbox" name="secMulscn" disabled>
									<label for="6010102">股票多空</label>
								</div>
								<div class="checkBlock">
									<input id="6010103" type="checkbox" name="secMulscn" disabled>
									<label for="6010103">市场中性</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="managingFutures">
								<div class="detaiTitle">
									<span>管理期货：</span>
								</div>
								<div class="checkBlock">
									<input id="6010201" type="checkbox" name="secMulscn" disabled>
									<label for="6010201">期货趋势策略</label>
								</div>
								<div class="checkBlock">
									<input id="6010202" type="checkbox" name="secMulscn" disabled>
									<label for="6010202">期货套利策略</label>
								</div>
								<div class="checkBlock">
									<input id="6010203" type="checkbox" name="secMulscn" disabled>
									<label for="6010203">其他管理期货策略</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="relativeValue">
								<div class="detaiTitle">
									<span>相对价值：</span>
								</div>
								<div class="checkBlock">
									<input id="6010301" type="checkbox" name="secMulscn" disabled>
									<label for="6010301">ETF套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010302" type="checkbox" name="secMulscn" disabled>
									<label for="6010302">可转债套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010303" type="checkbox" name="secMulscn" disabled>
									<label for="6010303">固定收益套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010304" type="checkbox" name="secMulscn" disabled>
									<label for="6010304">分级基金套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010305" type="checkbox" name="secMulscn" disabled>
									<label for="6010305">其他相对价值策略</label>
								</div>
								<div class="checkBlock">
									<input id="6010306" type="checkbox" name="secMulscn" disabled>
									<label for="6010306">期权套利</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="eventDriven">
								<div class="detaiTitle">
									<span>事件驱动：</span>
								</div>
								<div class="checkBlock">
									<input id="6010401" type="checkbox" name="secMulscn" disabled>
									<label for="6010401">并购重组</label>
								</div>
								<div class="checkBlock">
									<input id="6010402" type="checkbox" name="secMulscn" disabled>
									<label for="6010402">定向增发</label>
								</div>
								<div class="checkBlock">
									<input id="6010403" type="checkbox" name="secMulscn" disabled>
									<label for="6010403">大宗交易</label>
								</div>
								<div class="checkBlock">
									<input id="6010404" type="checkbox" name="secMulscn" disabled>
									<label for="6010404">其他事件驱动策略</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="combiningPolicy">
								<div class="detaiTitle">
									<span>组合策略：</span>
								</div>
								<div class="checkBlock">
									<input id="6010701" type="checkbox" name="secMulscn" disabled>
									<label for="6010701">MOM</label>
								</div>
								<div class="checkBlock">
									<input id="6010702" type="checkbox" name="secMulscn" disabled>
									<label for="6010702">FOF</label>
								</div>
								<div class="checkBlock">
									<input id="6010703" type="checkbox" name="secMulscn" disabled>
									<label for="6010703">TOT</label>
								</div>
								<div class="checkBlock">
									<input id="6010704" type="checkbox" name="secMulscn" disabled>
									<label for="6010704">其他组合策略</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="otherPolicy">
								<div class="detaiTitle">
									<span>其他一级策略：</span>
								</div>
								<div class="checkBlock">
									<input id="6010902" type="checkbox" name="secMulscn" disabled>
									<label for="6010902">新三板</label>
								</div>
								<div class="checkBlock">
									<input id="6010903" type="checkbox" name="secMulscn" disabled>
									<label for="6010903">海外基金</label>
								</div>
								<div class="checkBlock">
									<input id="6010904" type="checkbox" name="secMulscn" disabled>
									<label for="6010904">货币基金</label>
									<img id="pullupImg" src="${ctxResources}/images/mainshangla.png" alt="">
								</div>
								<div class="checkBlock">
									<input id="6010901" type="checkbox" name="secMulscn" disabled>
									<label for="6010901">其他二级策略</label>
								</div>
							</td>
						</tr>
						<tr>
							<td colspan="3" style="width: 98%;">
								<button id="maindetermineBtn" class="huihong4Btn">
									<span>确认</span>
								</button>
								<button id="mainemptyBtn" class="huihong4Btn">
									<span>取消编辑</span>
								</button>
							</td>
						</tr>
					</table>
				</div> --%>
				<p class="title">
					<span class="pot"></span> <span class="text">各策略说明</span>
					<img class="imgP edibtn" src="${ctxResources}/images/huisheng/modify1.png" />
				</p>
				<hr />
				<div>
				<form id="strategyInfoform" name="strategyInfoform">
					<table id="tab_8" class="detailExplTable hhautomaticTbl">

					</table>
				</form>
				<form id="strategyInfoform2" name="strategyInfoform2">
					<input type="text" name="org_id" style="display:none" >
					<table id="tab_18" class="firTable keyPeoMsg">
						<tbody>
							<tr class="">
								<td>投资理念：</td>
								<td colspan="4"><textarea rows="2" name="invest_philosophy"></textarea></td>
							</tr>
							<tr class="">
								<td>投资流程：</td>
								<td colspan="4"><textarea rows="6" name="invest_process"></textarea></td>
							</tr>
						</tbody>
					</table>
				</form>
				</div>
				<div class='btnDiv ediBtnGroup' style="display:none">
					<button id='ediBtnOk_8' class='huihong4Btn ediBtnCancel'>确定</button>
					<button class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
				<p style="color:rgba(193, 25, 32, 1);font-size:12px;">注：包括但不限于以下内容：研发流程、决策流程、交易流程、评估流程、风控流程以及组合调整流程。</p>
			</div>
		</div>

		<!-- 旗下产品 -->
		<div class="row basicInfo inveSta moduleDiv qx col-md-12" id="qx"
			style="display:none">
			<%-- <p class="title qxspTitle outerDiv">
				<span class="pot"></span> <span class="text">旗下产品</span>
			</p>
			<hr />
			<div class="outerDiv distanceTop20" style="margin-top:0">
				<div class="table-responsive">
					<table id="filterTbl" class="table ulTable">
						<tr id="statisticalInterval">
							<td><span class="ultitleTxt2">统计区间：</span></td>
							<td colspan="2"><span id="total"
								class="selectTime choiceTime" style="margin-left: 10px;">成立以来</span>
								<span id="year" class="selectTime">今年以来</span> <span id="m3"
								class="selectTime">近三个月</span> <span id="m6" class="selectTime">近六个月</span>
								<span id="y1" class="selectTime">近一年</span> <span id="y3"
								class="selectTime">近三年</span> <span id="y5" class="selectTime">近五年</span>
								<!--  <span
								class="layui-input-inline" style="margin-left:20px;"><input
									class="form-control cdata" placeholder="开始日期"
									name="date_start1" readonly> </span><span
								style="margin:0 20px;">——</span><span class="layui-input-inline">
									<input class="form-control cdata" placeholder="结束日期"
									name="date_end1" readonly>
								</span> --></td>
						</tr>
						<tr>
							<td><span class="ultitleTxt2">投资策略：</span></td>
							<td><span id="secMulslebtn" class="openEnded endActiv">不限</span></td>
							<td colspan="2" class="ulContent" id="investmentStrategy">
								<button id="60101" class="checkboxBtn checkboxBtnshort"
									name="disMethod">股票策略</button>
								<button id="60102" class="checkboxBtn checkboxBtnshort"
									name="disMethod">管理期货</button>
								<button id="60103" class="checkboxBtn checkboxBtnshort"
									name="disMethod">相对价值</button>
								<button id="60104" class="checkboxBtn checkboxBtnshort"
									name="disMethod">事件驱动</button> <img class="dropdownImg" id="dropdownImg" src="${ctxResources}/images/mainxiala.png">
								<button id="6010501"
									class="Special checkboxBtn checkboxBtnshort" name="disMethod">债券策略</button>
								<button id="6010601"
									class="Special checkboxBtn checkboxBtnshort" name="disMethod">宏观策略</button>
								<button id="60107" class="checkboxBtn checkboxBtnshort"
									name="disMethod">组合策略</button>
								<button id="6010801"
									class="Special checkboxBtn checkboxBtnshort" name="disMethod">多策略</button>
								<button id="60109" class="checkboxBtn checkboxBtnlong"
									name="disMethod">其他一级策略</button>
							</td>
						</tr>
						<!-- 投资策略详情 -->
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="stockStrategy">
								<div class="detaiTitle">
									<span>股票策略：</span>
								</div>
								<div class="checkBlock">
									<input id="6010101" type="checkbox" name="secMulscn" disabled>
									<label for="6010101">股票多头</label>
								</div>
								<div class="checkBlock">
									<input id="6010102" type="checkbox" name="secMulscn" disabled>
									<label for="6010102">股票多空</label>
								</div>
								<div class="checkBlock">
									<input id="6010103" type="checkbox" name="secMulscn" disabled>
									<label for="6010103">市场中性</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="managingFutures">
								<div class="detaiTitle">
									<span>管理期货：</span>
								</div>
								<div class="checkBlock">
									<input id="6010201" type="checkbox" name="secMulscn" disabled>
									<label for="6010201">期货趋势策略</label>
								</div>
								<div class="checkBlock">
									<input id="6010202" type="checkbox" name="secMulscn" disabled>
									<label for="6010202">期货套利策略</label>
								</div>
								<div class="checkBlock">
									<input id="6010203" type="checkbox" name="secMulscn" disabled>
									<label for="6010203">其他管理期货策略</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="relativeValue">
								<div class="detaiTitle">
									<span>相对价值：</span>
								</div>
								<div class="checkBlock">
									<input id="6010301" type="checkbox" name="secMulscn" disabled>
									<label for="6010301">ETF套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010302" type="checkbox" name="secMulscn" disabled>
									<label for="6010302">可转债套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010303" type="checkbox" name="secMulscn" disabled>
									<label for="6010303">固定收益套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010304" type="checkbox" name="secMulscn" disabled>
									<label for="6010304">分级基金套利</label>
								</div>
								<div class="checkBlock">
									<input id="6010305" type="checkbox" name="secMulscn" disabled>
									<label for="6010305">其他相对价值策略</label>
								</div>
								<div class="checkBlock">
									<input id="6010306" type="checkbox" name="secMulscn" disabled>
									<label for="6010306">期权套利</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="eventDriven">
								<div class="detaiTitle">
									<span>事件驱动：</span>
								</div>
								<div class="checkBlock">
									<input id="6010401" type="checkbox" name="secMulscn" disabled>
									<label for="6010401">并购重组</label>
								</div>
								<div class="checkBlock">
									<input id="6010402" type="checkbox" name="secMulscn" disabled>
									<label for="6010402">定向增发</label>
								</div>
								<div class="checkBlock">
									<input id="6010403" type="checkbox" name="secMulscn" disabled>
									<label for="6010403">大宗交易</label>
								</div>
								<div class="checkBlock">
									<input id="6010404" type="checkbox" name="secMulscn" disabled>
									<label for="6010404">其他事件驱动策略</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="combiningPolicy">
								<div class="detaiTitle">
									<span>组合策略：</span>
								</div>
								<div class="checkBlock">
									<input id="6010701" type="checkbox" name="secMulscn" disabled>
									<label for="6010701">MOM</label>
								</div>
								<div class="checkBlock">
									<input id="6010702" type="checkbox" name="secMulscn" disabled>
									<label for="6010702">FOF</label>
								</div>
								<div class="checkBlock">
									<input id="6010703" type="checkbox" name="secMulscn" disabled>
									<label for="6010703">TOT</label>
								</div>
								<div class="checkBlock">
									<input id="6010704" type="checkbox" name="secMulscn" disabled>
									<label for="6010704">其他组合策略</label>
								</div>
							</td>
						</tr>
						<tr class="ivnstrategyDetail">
							<td colspan="3" class="ivnDetailtd" id="otherPolicy">
								<div class="detaiTitle">
									<span>其他一级策略：</span>
								</div>
								<div class="checkBlock">
									<input id="6010902" type="checkbox" name="secMulscn" disabled>
									<label for="6010902">新三板</label>
								</div>
								<div class="checkBlock">
									<input id="6010903" type="checkbox" name="secMulscn" disabled>
									<label for="6010903">海外基金</label>
								</div>
								<div class="checkBlock">
									<input id="6010904" type="checkbox" name="secMulscn" disabled>
									<label for="6010904">货币基金</label>
									<img id="pullupImg" src="${ctxResources}/images/mainshangla.png" alt="">
								</div>
								<div class="checkBlock">
									<input id="6010901" type="checkbox" name="secMulscn" disabled>
									<label for="6010901">其他二级策略</label>
								</div>
							</td>
						</tr>
						<tr>
							<td colspan="3" style="width: 98%;">
								<button id="maindetermineBtn" class="huihong4Btn">
									<span>确认</span>
								</button>
								<button id="mainemptyBtn" class="huihong4Btn">
									<span>取消编辑</span>
								</button>
							</td>
						</tr>
					</table>
				</div>
				<div class="outerDiv">
					<table></table>
				</div>
			</div> --%>
			<div>
			<ul id="modulesUl"
				class="investmenTratings-observationPool-modulesUl reportView-modulesUl"
				style="margin-bottom:10px">
				<li class="activeModules">业绩指标</li>
				<li>原始数据</li>
				<li class="hhline"></li>
			</ul>
				<img src="${ctxResources}/images/huisheng/noupload_down.png"
				style="float:right;margin-top:-40px;margin-right:40px;" />
				<img class="imgP edibtn" id="fundEdi" src="${ctxResources}/images/huisheng/modify1.png" style="margin-top:-39px;" />
				<img class="imgP edibtn" id="oriEdi" src="${ctxResources}/images/huisheng/modify1.png" style="display:none;margin-top:-39px;" />
			</div>
			<div class="activeDiv">
				<form id="fundInfoform" name="fundInfoform">
					<table id="tab_9" class="secTable teamTable hhautomaticTbl">
					</table>
				</form>	
					<div class='btnDiv ediBtnGroup' id="edoG_1" style="display:none">
						<button id='ediBtnOk_9' class='huihong4Btn ediBtnCancel'>确定</button>
						<button class='huihong4Btn ediBtnCancel'>取消</button>
					</div>
			</div>
			<div class="activeDiv" style="display:none;">
				<form id="fundIndicatorOriform" name="fundIndicatorOriform">
					<table id="tab_10" class="secTable teamTable hhautomaticTbl">
					</table>
				</form>
				<div class='btnDiv ediBtnGroup' id="edoG_2" style="display:none">
					<button id='ediBtnOk_10' class='huihong4Btn ediBtnCancel'>确定</button>
					<button class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
			</div>
		</div>
		<!-- 报告预览_IT与风控 -->
		<div class="row basicInfo inveSta ITfk moduleDiv" style="display:none">
			<div class="col-md-12">
				<p class="title">
					<span class="pot"></span> <span class="text">IT系统架构</span>
					<img class="imgP edibtn" src="${ctxResources}/images/huisheng/modify1.png" />
				</p>
				<hr />
				<div>
				<form id="ITStaform" name="ITStaform">
					<table id="tab_11" class="detailExplTable ITfkTable hhautomaticTbl tab_11">
					</table>
				</form>				
				<form id="ITStaform_2" name="ITStaform_2">
					<table id="tab_17" class="firTable keyPeoMsg tab_11">
						<tbody>
							<tr class="h">
								<td>介绍公司在IT层面的投入（硬件和软件）</td>
								<td colspan="5"><textarea name="it_cost"></textarea></td>
							</tr>
							<tr class="h">
								<td>介绍公司未来IT规划</td>
								<td colspan="5"><textarea name="it_plan"></textarea></td>
							</tr>
							<tr class="h">
								<td>数据来源</td>
								<td colspan="5"><textarea  name="data_source"></textarea></td>
							</tr>
							<tr class="h">
								<td>简要介绍公司数据管理</td>
								<td colspan="5"><textarea name="data_mgt"></textarea></td>
							</tr>
							<tr class="h">
								<td>交易自动化程度</td>
								<td colspan="5"><textarea
									name="transaction_auto_level"></textarea></td>
							</tr>
							<tr class="h">
								<td>简要介绍公司研发系统、交易系统、风控系统（如有）</td>
								<td colspan="5"><textarea
									name="dev_trans_risk_system_intrduction"></textarea></td>
							</tr>
							<tr class="h">
								<td>突发状况应对方案（如有）</td>
								<td colspan="5"><textarea name="emergency_plan"></textarea></td>
							</tr>
							<tr class="h">
								<td>灾后恢复方案（如有）</td>
								<td colspan="5"><textarea name="recovery_plan"></textarea></td>
							</tr>
						</tbody>
					</table>
				</form>
				</div>
				<div class='btnDiv' id='ediBtnGroup_11' style="display:none">
					<button id='ediBtnOk_11' class='huihong4Btn ediBtnCancel'>确定</button>
					<button id='ediBtnCancel_11' class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
				<div class='btnDiv ediBtnGroup' style="display:none">
					<button id='ediBtnOk_11' class='huihong4Btn ediBtnCancel'>确定</button>
					<button class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
				<p class="title">
					<span class="pot"></span> <span class="text">风控</span>
					<img class="imgP edibtn" src="${ctxResources}/images/huisheng/modify1.png" />
				</p>
				<hr />
				<div>
				<form id="fkStafform" name="fkStafform">
					<table id="tab_12" class="detailExplTable ITfkTable hhautomaticTbl">
						
					</table>
				</form>
				<form id="fkStafform_2" name="fkStafform_2">
					<table id="" class="firTable keyPeoMsg tab_12">
						<tbody>
							<tr class="h">
								<td>是否有止损机制</td>
								<td colspan="5"><input type="text"
									name="is_stop_lose_mechanism"></td>
							</tr>
							<tr class="h">
								<td>若有，请详述公司止损机制</td>
								<td colspan="5" ><textarea id="stop_lose_mechanism_illustration"></textarea></td>
							</tr>
							<tr class="h">
								<td>公司对不同策略或资产是否采用不同的风控指标</td>
								<td colspan="5"><input type="text"
									name="is_diverse_risk_index"></td>
							</tr>
							<tr class="h">
								<td>若是，请提供各个策略/资产类别的风控指标清单</td>
								<td colspan="5"><textarea 
									name="risk_control_index_list"></textarea></td>
							</tr>
							<tr class="h">
								<td>历史上发生模型风险的案例及应对措施（如有）</td>
								<td colspan="5"><textarea name="risk_handle_case"></textarea></td>
							</tr>
						</tbody>
					</table>
				</form>
				</div>
				<div class='btnDiv ediBtnGroup' style="display:none">
					<button id='ediBtnOk_12' class='huihong4Btn ediBtnCancel'>确定</button>
					<button class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
			</div>
		</div>
		<!-- 模态框：图片预览 -->
		<div id="myModal" class="modal fade">
			<div class="modal-dialog mymodal-dialog">
				<div class="modal-content">	
					<div class="modal-body">
						<img id="m-review1" src="/resources/images/check01.png" class="pic" style="width:100%"/>
					</div>				
				</div>
			</div>
		</div>
		<!-- 报告预览_材料清单 -->
		<div class="row basicInfo fileList moduleDiv" id="fileList"
			style="display:none">
			<div class="col-md-12">
				<p class="title">
					<span class="pot"></span> <span class="text">公司相关材料</span>
					<%-- <img class="imgP edibtn" src="${ctxResources}/images/huisheng/modify1.png" /> --%>
				</p>
				<hr />
				<div class="relaFile" id="tab_13">
					<div>
						<img id="h-review1" src="/resources/images/huisheng/yyzz.jpg"
							class="pic" />
						<div class="picFooter">
							<p>营业执照正副本</p>
							<div>
								<img id="view1" src="/resources/images/huisheng/reportview.png" /> <a
									id="License"><img id="h-download1"
									src="/resources/images/huisheng/noupload_down.png" /></a>
							</div>
						</div>
					</div>
					<div>
						<img id="h-review2" src="/resources/images/huisheng/zzjg.jpg"
							class="pic" />
						<div class="picFooter">
							<p>组织机构代码证</p>
							<div>
								<img id="view2" src="/resources/images/huisheng/reportview.png" /> <a
									id="Institutions"><img id="h-download2"
									src="/resources/images/huisheng/noupload_down.png" /></a>
							</div>
						</div>
					</div>
					<div>
						<img id="h-review3" src="/resources/images/huisheng/person_id.jpg"
							class="pic" />
						<div class="picFooter">
							<p>法人身份证</p>
							<div>
								<img id="view3" src="/resources/images/huisheng/reportview.png" /> <a
									id="Idcard"><img id="h-download3"
									src="/resources/images/huisheng/noupload_down.png" /></a>
							</div>
						</div>
					</div>
				</div>
				<div class='btnDiv' id='ediBtnGroup_13' style="display:none">
					<button id='ediBtnOk_13' class='huihong4Btn ediBtnCancel'>确定</button>
					<button class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
				<p class="title">
					<span class="pot"></span> <span class="text">原始资料</span>
					<%-- <img class="imgP edibtn" src="${ctxResources}/images/huisheng/modify1.png" /> --%>
				</p>
				<hr />
				<div class="sourFile" id="tab_14"></div>
				<div class='btnDiv ediBtnGroup' style="display:none">
					<button id='ediBtnOk_14' class='huihong4Btn ediBtnCancel'>确定</button>
					<button class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
			</div>
		</div>
		<!-- 补充说明 -->
		<div class="row basicInfo fileList moduleDiv" id="supplementaryNotes"
			style="display:none">
			<div class="col-md-12">
				<p class="title">
					<span class="pot"></span> <span class="text">基本信息</span>
					<img class="imgP edibtn"src="${ctxResources}/images/huisheng/modify1.png" />
				</p>
				<hr />
				<form id="cooperationFactorform" name="cooperationFactorform">
					<table class="firTable" id="tab_15">
						<tr>
							<td>拟出资安全比例：</td>
							<td><input type="text" name="safety_pad_ratio"></td>
							<td>可用于安全垫出资的总规模（万）：</td>
							<td><input type="text" name="safety_pad_scale"></td>
						</tr>
						<tr>
							<td>拟设置预警线：</td>
							<td><input type="text" name="warning_line"></td>
							<td>拟设置平仓线：</td>
							<td><input type="text" name="position_close_line"></td>
						</tr>
						<tr>
							<td>拟任投资经理：</td>
							<td><input type="text" name="fund_manager"></td>
							<td>拟设置管理费：</td>
							<td><input type="text" name="fee_manage"></td>
						</tr>
						<tr>
							<td>拟设置业绩报酬：</td>
							<td><input type="text" name="fee_pay"></td>
							<td>是否同意设置业绩计提基准：</td>
							<td><input type="text" name="is_fee_pay_benchmark"></td>
						</tr>
						<tr>
							<td>拟采用投资策略：</td>
							<td colspan="3" ><textarea class="manyWordstxtare" name="fund_type_strategy" cols="5"></textarea></td>
						</tr>
						<tr>
							<td>投资范围：</td>
							<td colspan="3"><textarea class="manyWordstxtare" name="invest_scope" cols="5"></textarea></td>
						</tr>
						<tr>
							<td>投资限制：</td>
							<td colspan="3" class="khcomponent" ><textarea class="manyWordstxtare" name="invest_limit" cols="5"></textarea></td>
						</tr>
						<tr class="h">
							<td>其他说明</td>
							<td colspan="3" ><textarea class="manyWordstxtare" name="other_instruction" cols="5"></textarea></td>
						</tr>
					</table> 
				</form>
				<div class='btnDiv ediBtnGroup' style="display:none">
					<button id='ediBtnOk_15' class='huihong4Btn ediBtnCancel'>确定</button>
					<button class='huihong4Btn ediBtnCancel'>取消</button>
				</div>
			</div>
		</div>
	</section>
	<!-- 头部分结束 -->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'huihong/InvestmentRatings/observationPool/reportPreview' ]);
	</script>
</body>
</html>