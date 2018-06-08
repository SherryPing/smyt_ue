<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!-- 数据填报 -->
				<div class="">
					<div id="dataFildiv">
						<div class="infoTitle">
							<div class="titleTxt" style="width:100%;margin-left:0px;">
								<div class="pull-left" style="margin-top:-10px;">
									<span
										style="font-size:16px;font-weight:500;color:black;left:0px;color:#4FA5D6;">首届量化联盟杯私募Q指数入围大赛</span><br>
									<img style="margin-top:25px;"
										src="${ctxResources}/images/import.png"> <span
										style="position:relative;font-size:16px;font-weight:500;color:black;left:0px;top:15px;">数据填报</span>
									<a style="position:relative;top:15px;margin-left:20px;"
										href="http://osz37q9fk.bkt.clouddn.com/htsmq.zip">下载模板</a>
								</div>
								<div class="pull-right">
									<button id="singUp" class="easy1Btn">单只上传</button>
									<button id="more_up" class="easy1Btn" data-toggle="modal"
										data-target="#myModal">批量上传</button>
								</div>
							</div>
						</div>
						<div class="reportUl distanceTop20">
							<table id="data_filtbl" class="indicatorsTbl dataTable"></table>
						</div>
					</div>
					<div id="singleFill" style="display:none;">
						<div id="navBar" style="right:30px;">
							<div class="line"></div>
							<div class="barMenu">
								<div class="Module" style="width:110px;">
									<div class="navPoint bartActive"></div>
									<div class="navTxtdiv">
										<a id="clickMenu1" class="navTxt barbActive">投顾基础信息</a>
									</div>
								</div>
								<div class="Module" style="width:110px;">
									<div class="navPoint"></div>
									<div class="navTxtdiv">
										<a id="clickMenu2" class="navTxt">产品基本信息</a>
									</div>
								</div>
								<div class="Module" style="width:130px;">
									<div class="navPoint"></div>
									<div class="navTxtdiv">
										<a id="clickMenu3" class="navTxt">基金经理基本信息</a>
									</div>
								</div>
								<div class="Module" style="width:110px;">
									<div class="navPoint"></div>
									<div class="navTxtdiv">
										<a id="clickMenu4" class="navTxt">净值上传</a>
									</div>
								</div>
							</div>
						</div>
						<div id="investmentInfo" class="pull-left">
							<a id="november1"></a>
							<div class="infoTitle" style="margin-top:10px;">
								<div class="titleTxt"
									style="width:100%;margin-left:0px;border-color:#4FA5D6;">
									<span
										style="font-size:16px;font-weight:500;color:#4FA5D6;left:20px;">投顾基础信息</span>
								</div>
							</div>
							<form id="org_info" name="org_data" enctype="multipart/form-data">
								<input type="text" style="display:none;" name="org_id">
								<div class="distanceTop40 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>机构简称：</span>
									</div>
									<input type="text" name="org_name" class="DatafilingInp">
								</div>
								<div class="distanceTop40 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>机构全称：</span>
									</div>
									<input type="text" name="org_full_name" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>备案编号：</span>
									</div>
									<input type="text" name="reg_code" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>备案时间：</span>
									</div>
									<input type="text" name="reg_time"
										class="DatafilingInp select_date" readonly>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>机构成立日期：</span>
									</div>
									<input type="text" name="found_date"
										class="DatafilingInp select_date" readonly>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>地区：</span>
									</div>
									<input type="text" name="region" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>注册资本(万)：</span>
									</div>
									<input type="text" name="reg_capital" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>实缴资本(万)：</span>
									</div>
									<input type="text" name="real_capital" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>主要策略：</span>
									</div>
									<input type="text" name="master_strategy" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>联系地址：</span>
									</div>
									<input type="text" name="address" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>投研人员规模：</span>
									</div>
									<input type="text" name="team_scale" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>投研团队核心人员：</span>
									</div>
									<input type="text" name="team" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>已发行的产品数量：</span>
									</div>
									<input type="text" name="fund_num" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>截至上月末管理产品规模(万)：</span>
									</div>
									<input type="text" name="asset_mgt_scale" class="DatafilingInp">
								</div>
								<div class="distanceTop20 reportUl pull-left">
									<div class="requiredDiv">
										<span>是否具备投顾资格：</span>
									</div>
									<select class="form-control DatafilingInp"
										name="is_qualification" style="width:22.5%;">
										<option>是</option>
										<option>否</option>
									</select>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>联系人：</span>
									</div>
									<input type="text" name="linkman" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>联系电话：</span>
									</div>
									<input type="text" name="linkman_phone" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>联系人职务：</span>
									</div>
									<input type="text" name="linkman_duty" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>联系人邮箱：</span>
									</div>
									<input type="text" name="linkman_email" class="DatafilingInp">
								</div>
								<div class="distanceTop20 reportUl">
									<div class="requiredDiv">
										<span>投资理念：</span>
									</div>
									<textarea class="textAre" name="investment_idea"
										placeholder="最多200字"></textarea>
								</div>
								<div class="distanceTop20 reportUl">
									<div class="requiredDiv">
										<span>所获荣誉：</span>
									</div>
									<textarea class="textAre" name="prize" placeholder="最多200字"></textarea>
								</div>
								<div class="distanceTop20 reportUl">
									<div class="requiredDiv">
										<span>公司简介：</span>
									</div>
									<textarea name="profile" class="textAre" placeholder="最多200字"></textarea>
								</div>
								<div class="confirmPrcdiv distanceTop20">
									<button disabled="disabled" class="btn upfileBtn"
										id="cast_gubtn" type="button">确认</button>
									<button id="company_clear" type="button">清空</button>
								</div>
							</form>
						</div>
						<div id="productInfo" class="pull-left">
							<a id=november2></a>
							<form id="fund_info" name="fund_info">
								<div class="infoTitle">
									<div class="titleTxt"
										style="width:100%;margin-left:0px;border-color:#4FA5D6;">
										<span
											style="font-size:16px;font-weight:500;color:#4FA5D6;left:20px;">产品基础信息</span>
									</div>
								</div>
								<div class="distanceTop40 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>产品简称：</span>
									</div>
									<input type="text" name="fund_name" class="DatafilingInp">
								</div>
								<div class="distanceTop40 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>产品全称：</span>
									</div>
									<input type="text" name="fund_full_name" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>投资策略：</span>
									</div>
									<select name="fund_type_strategy"
										class="form-control DatafilingInp">
										<option>股票策略-股票多头</option>
										<option>股票策略-股票多空</option>
										<option>股票策略-市场中性</option>
										<option>管理期货-期货趋势</option>
										<option>管理期货-期货套利</option>
										<option>管理期货-其他管理期货策略</option>
										<option>相对价值-ETF套利</option>
										<option>相对价值-可转债套利</option>
										<option>相对价值-固定收益套利</option>
										<option>相对价值-分级基金套利</option>
										<option>相对价值-期权套利</option>
										<option>相对价值-其他相对价值套利</option>
										<option>事件驱动-并购重组</option>
										<option>事件驱动-定向增发</option>
										<option>事件驱动-大宗交易</option>
										<option>事件驱动-其他事件驱动策略</option>
										<option>债券策略-债券策略</option>
										<option>宏观策略-宏观策略</option>
										<option>组合策略-MOM</option>
										<option>组合策略-FOF</option>
										<option>组合策略-TOT</option>
										<option>组合策略-其他组合策略</option>
										<option>多策略-多策略</option>
									</select>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>参赛组别：</span>
									</div>
									<select name="match_group" class="form-control DatafilingInp">
										<option>股票多空组</option>
										<option>市场中性组</option>
										<option>管理期货组</option>
										<option>复合策略组</option>
									</select>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>成立日期：</span>
									</div>
									<input type="text" name="foundation_date"
										class="DatafilingInp select_date" readonly>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>备案编号：</span>
									</div>
									<input type="text" name="reg_code" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>发行方式：</span>
									</div>
									<select name="fund_type_issuance"
										class="form-control DatafilingInp">
										<option>自主发行</option>
										<option>券商资管</option>
										<option>期货资管</option>
										<option>信托计划</option>
										<option>公募专户及子公司管理计划</option>
										<option>保险公司及子公司管理计划</option>
										<option>有限合伙</option>
										<option>单账户</option>
										<option>海外基金</option>
										<option>其他</option>
									</select>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>结构形式：</span>
									</div>
									<select name="fund_type_structure"
										class="form-control DatafilingInp">
										<option>非结构化</option>
										<option>结构化</option>
									</select>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>是否主基金：</span>
									</div>
									<select name="is_main_fund" class="form-control DatafilingInp">
										<option>是</option>
										<option>否</option>
									</select>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>基金结构(优先劣后占比)：</span>
									</div>
									<input name="fund_structure" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>发行规模(万)：</span>
									</div>
									<input name="issue_scale" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>截至上月末管理规模(万)：</span>
									</div>
									<input name="asset_scale" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>投资顾问：</span>
									</div>
									<input name="fund_manager" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>基金管理人：</span>
									</div>
									<input name="fund_manager_nominal" type="text"
										class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>基金经理：</span>
									</div>
									<input name="fund_member" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>托管机构：</span>
									</div>
									<input name="fund_custodian" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>证券经纪人：</span>
									</div>
									<input name="fund_stockbroker" type="text"
										class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>存续期：</span>
									</div>
									<input name="duration" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>开放日：</span>
									</div>
									<input name="open_date" type="text" class="DatafilingInp"
										readonly>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>封闭期：</span>
									</div>
									<input name="locked_time_limit" type="text"
										class="DatafilingInp select_date" readonly>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>业绩报酬：</span>
									</div>
									<input name="fee_pay" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>业绩报酬计提说明：</span>
									</div>
									<input name="fee_pay_remark" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>管理费：</span>
									</div>
									<input name="fee_manage" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>赎回费：</span>
									</div>
									<input name="fee_redeem" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>认购费：</span>
									</div>
									<input name="fee_subscription" type="text"
										class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>托管费：</span>
									</div>
									<input name="fee_trust" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>最低认购金额(万)：</span>
									</div>
									<input name="min_purchase_amount" type="text"
										class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>最低追加金额(万)：</span>
									</div>
									<input name="min_append_amount" type="text"
										class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>止损线：</span>
									</div>
									<input name="stop_line" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>预警线：</span>
									</div>
									<input name="alert_line" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>投资范围：</span>
									</div>
									<input name="investment_range" type="text"
										class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>投资理念：</span>
									</div>
									<input name="investment_idea" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>管理人参与规模：</span>
									</div>
									<input name="manager_participation_scale" type="text"
										class="DatafilingInp">
								</div>
								<div class="confirmPrcdiv distanceTop20">
									<button disabled="disabled" class="btn upfileBtn" type="button"
										id="product_infobtn">确认</button>
									<button id="product_clear" type="button">清空</button>
								</div>
							</form>
						</div>
						<div id="manageInfo" class="pull-left">
							<a id=november3></a>
							<form id="manager_info" name="manager_info">
								<div class="infoTitle">
									<div class="titleTxt"
										style="width:100%;margin-left:0px;border-color:#4FA5D6;">
										<span
											style="font-size:16px;font-weight:500;color:#4FA5D6;left:20px;">基金经理基本信息</span>
									</div>
								</div>
								<div id="showManagerdiv" class="pull-left"></div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>姓名：</span>
									</div>
									<input name="user_name" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>性别：</span>
									</div>
									<input name="sex" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>当前认知机构名称：</span>
									</div>
									<input name="org_name" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>职务：</span>
									</div>
									<input name="duty" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>实盘投资年限：</span>
									</div>
									<input name="investment_years" type="text"
										class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>机构任职日期：</span>
									</div>
									<input name="entry_date" type="text"
										class="DatafilingInp select_date" readonly>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>学历：</span>
									</div>
									<input name="education" type="text" class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>基金经理背景：</span>
									</div>
									<select name="background" class="form-control DatafilingInp">
										<option>券商</option>
										<option>公募</option>
										<option>保险</option>
										<option>媒体</option>
										<option>海外</option>
										<option>民间</option>
										<option>其他</option>
									</select>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>是否为核心成员：</span>
									</div>
									<select name="is_core_member"
										class="form-control DatafilingInp">
										<option>是</option>
										<option>否</option>
									</select>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>是否具备基金从业资格：</span>
									</div>
									<select name="is_fund_qualification"
										class="form-control DatafilingInp">
										<option>是</option>
										<option>否</option>
									</select>
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>过往最大管理规模(万元)：</span>
									</div>
									<input name="max_asset_mgt_scale" type="text"
										class="DatafilingInp">
								</div>
								<div class="distanceTop20 halfDiv pull-left">
									<div class="requiredDiv">
										<span>教育背景/资格证书：</span>
									</div>
									<input name="qualification" type="text" class="DatafilingInp">
								</div>
								<input name="user_id" type="text" style="display:none;">
								<input name="uid" type="text" style="display:none;">
								<div class="distanceTop20 reportUl">
									<div class="requiredDiv">
										<span class="Required">*</span> <span>人物简介：</span>
									</div>
									<textarea name="introduction" class="textAre"
										placeholder="最多200字"></textarea>
								</div>
								<div class="distanceTop20 reportUl">
									<div class="requiredDiv">
										<span>职业经历：</span>
									</div>
									<textarea name="resume" class="textAre" placeholder="最多200字"></textarea>
								</div>
								<div class="distanceTop20 reportUl">
									<div class="requiredDiv">
										<span>所获荣誉：</span>
									</div>
									<textarea name="prize" class="textAre" placeholder="最多200字"></textarea>
								</div>
								<div class="confirmPrcdiv distanceTop20">
									<button disabled="disabled" class="btn upfileBtn" type="button"
										id="manager_infobtn">确认</button>
									<button id="manager_clear" type="button">清空</button>
								</div>
							</form>
						</div>
						<div id="netDatauplodad" class="pull-left"
							style="margin-bottom:150px;width:100%;">
							<a id=november4></a>
							<div class="infoTitle">
								<div class="titleTxt"
									style="width:100%;margin-left:0px;border-color:#4FA5D6;">
									<span
										style="font-size:16px;font-weight:500;color:#4FA5D6;left:20px;">净值数据上传</span>
								</div>
							</div>
							<div class="distanceTop20 reportUl">
								<div class="requiredDiv">
									<span>上传文件：</span>
								</div>
								<form id="file">
									<input type="text" id="showFile"> <input type="text"
										name="uid" value="" style="display:none;"> <input
										type="hidden" id='upuserid' name="user_id" value="">
									<input type="text" name="type" value="nav"
										style="display:none;"> <input type="file"
										accept=".xlsx,.xls" name="file" id="upLoadinp"
										class="upload_file"> <label for="upLoadinp"
										class="easy2Btn forFile pull-left">浏览</label>
									<button class="easy1Btn" id="upload1" type="button">上传</button>
								</form>
							</div>
							<div id="nav_uploadInfo"
								class="distanceTop20 border downExceldiv"
								style="display:none;text-indent:20px;"></div>
							<div class="distanceTop20 border downExceldiv">
								<div>
									<span style="margin-left:20px;">下载Excel模板：</span> <a
										href="http://osz37q9fk.bkt.clouddn.com/htsmq.zip">导入模板.xlsx</a>
								</div>
								<div style="margin-top:5px;">
									<span style="margin-left:20px;">上传操作轻松快捷</span>
								</div>
							</div>
							<div class="confirmPrcdiv distanceTop20">
								<button id="supBack">提交</button>
							</div>
						</div>
					</div>
					<!-- 批量上传（Modal） -->
					<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
						aria-labelledby="myModalLabel" aria-hidden="true">
						<div class="modal-dialog"
							style="margin-top:10%;width:55%;min-width:700px;">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal"
										aria-hidden="true">&times;</button>
									<h4 class="modal-title" style="font-size:18px;">数据上传</h4>
								</div>
								<div class="modal-body">
									<div class="distanceTop20" style="height:40px;">
										<form id="more_file">
											<input type="text" class="pull-left" id="more_showFile"
												style="height:26px;width:240px;"> <input type="text"
												id="more_uptype" name="type" value="fund"
												style="display:none;"> <input type="file"
												accept=".xlsx,.xls" name="file" id="more_upLoadinp"
												class="upload_file"> <label for="more_upLoadinp"
												class="easy2Btn forFile pull-left">浏览</label> <input
												class="easy1Btn pull-left" id="more_upload" type="button"
												value="上传"> <input type='text' id="more_upfundid"
												name='fund_id' value="" style="display:none;"> <input
												type='text' id="more_uid" name='uid' value=""
												style="display:none;"> <input type='text'
												id="more_upuserid" name='user_id' value=""
												style="display:none;">
										</form>
									</div>
									<div id="more_nav_uploadInfo"
										class="distanceTop20 border downExceldiv"></div>
									<div class="distanceTop20 border" style="height:100px;">
										<div>
											<span style="margin-left:20px;">下载Excel模板：</span> <a
												href="http://osz37q9fk.bkt.clouddn.com/htsmq.zip">导入模板.xlsx</a>
										</div>
										<div style="margin-top:5px;">
											<span style="margin-left:20px;">上传操作轻松快捷</span>
										</div>
									</div>
									<div class="distanceTop20 confirmPrcdiv" style="float:none;">
										<button id="complete" data-dismiss="modal">完成</button>
										<button id="supBack" data-dismiss="modal">返回</button>
									</div>
								</div>

							</div>
							<!-- /.modal-content -->
						</div>
						<!-- /.modal -->
					</div>
				</div>
				<!-- 自主上传 -->
				<div class="addNewprcslc">
					<div class="pull-right">
						<button id="singUp" class="easy1Btn">单只上传</button>
						<button id="more_up" class="easy1Btn" data-toggle="modal"
							data-target="#myModal">批量上传</button>
					</div>
				</div>