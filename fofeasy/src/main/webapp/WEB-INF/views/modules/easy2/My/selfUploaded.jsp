<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!-- 自主上传 -->
<div class="">
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
	<div id="dataFildiv">
		<div class="infoTitle">
			<div class="titleTxt" style="width:100%;margin-left:0px;">
				<div class="pull-left" style="margin-top:-30px;">
					<img style="margin-top:15px;"
						src="${ctxResources}/images/import.png"> <span
						style="position:relative;font-size:16px;font-weight:500;color:black;left:0px;top:10px;">数据填报</span>
					<a style="position:relative;top:10px;margin-left:20px;"
						href="http://osz37q9fk.bkt.clouddn.com/htsmq.zip">下载模板</a>
				</div>
				<div class="pull-right">
					<button id="singUp" class="easy1Btn">单只上传</button>
					<!-- <button id="more_up" class="easy1Btn" data-toggle="moda l"
						data-target="#myModal">批量上传</button> -->
				</div>
			</div>
		</div>
		<div class="reportUl distanceTop20">
			<table id="data_filtbl" class="indicatorsTbl dataTable"></table>
		</div>
	</div>
	<!-- 单只产品上传 -->
	<div id="singnUpdiv" class="outerDiv distanceTop20"
		style="display:none;">
		<div id="investmentInfo" class="pull-left">
			<form name="single_file" id="single_file">
				<div class="infoTitle" style="margin-top:0px;">
					<div class="titleTxt"
						style="width:100%;margin-left:0px;border-color:#4FA5D6;">
						<span
							style="font-size:16px;font-weight:500;color:#4FA5D6;left:20px;">基础信息</span>
					</div>
				</div>
				<input type="text" style="display:none;" name="org_id">
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>基金类别：</span>
					</div>
					<select id="fund_category" name="fund_category"
						class="form-control DatafilingInp">
						<option>非FOF基金</option>
						<option>FOF母基金</option>
						<option>FOF子基金</option>
					</select>
				</div>
				<div class="distanceTop20 halfDiv pull-left" style="display:none;"
					id="parent_fund">
					<div class="requiredDiv">
						<span class="Required">*</span><span>所属母基金：</span>
					</div>
					<input type="text" name="parent_fund" class="DatafilingInp">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span> <span>产品名称：</span>
					</div>
					<input type="text" id="product_name" name="product_name"
						class="DatafilingInp">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span> <span>投资策略：</span>
					</div>
					<select id="investment_strategy" name="investment_strategy"
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
						<span class="Required">*</span><span>成立日期：</span>
					</div>
					<input type="text" id="date_of_establishment"
						name="foundation_date" class="DatafilingInp select_date date"
						readonly>
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>净值披露：</span>
					</div>
					<select id="net_worth_disclosure" name="data_freq"
						class="form-control DatafilingInp">
						<option>日度</option>
						<option>周度</option>
						<option>月度</option>
					</select>
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>投资顾问：</span>
					</div>
					<input type="text" id="investment_advisers"
						name="investment_advisers" class="DatafilingInp select_date">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>基金管理人：</span>
					</div>
					<input type="text" id="fund_manager" name="fund_manager"
						class="DatafilingInp">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>投资经理：</span>
					</div>
					<input type="text" id="investment_manager"
						name="investment_manager" class="DatafilingInp">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span>发行方式：</span>
					</div>
					<select id="distribution_mode" name="distribution_mode"
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
						<span>备案编号：</span>
					</div>
					<input type="text" id="record_reg" name="record_reg"
						class="DatafilingInp">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span>结构形式：</span>
					</div>
					<select id="fund_type_structure" name="fund_type_structure"
						class="form-control DatafilingInp">
						<option>非结构化</option>
						<option>结构化</option>
					</select>
				</div>
				<div class="distanceTop20 reportUl">
					<div class="requiredDiv">
						<span>备注：</span>
					</div>
					<textarea id="notes" class="textAre" name="notes"
						placeholder="最多200字"></textarea>
				</div>
				<input type="text" name="fund_id" style="display:none;">
			</form>
			<!-- 数据上传 -->
			<div class="infoTitle">
				<div class="titleTxt"
					style="width:100%;margin-left:0px;border-color:#4FA5D6;">
					<span
						style="font-size:16px;font-weight:500;color:#4FA5D6;left:20px;">数据上传</span>
				</div>
			</div>
			<div class="outerDiv distanceTop20" style="text-align:center;">
				<div class="datauploadModule">
					<div class="module1">补充基本信息</div>
					<div class="module2">
						<p class="top5 hand">
							<a href="http://osz37q9fk.bkt.clouddn.com/1103/info.xlsx">模板下载</a>
						</p>
						<p class="top5 hand">
							<a data-id="info" class="type" data-type="补充基本信息"
								data-toggle="modal" data-target="#myModal">数据上传</a>
						</p>
						<img class="top10" src="${ctxResources}/images/huisheng/gou.png">
					</div>
				</div>
				<div class="datauploadModule">
					<div class="module1">净值信息</div>
					<div class="module2">
						<p class="top5 hand">
							<a href="http://osz37q9fk.bkt.clouddn.com/1103/nav.xlsx">模板下载</a>
						</p>
						<p class="top5 hand">
							<a data-id="nav" class="type" data-type="净值信息"
								data-toggle="modal" data-target="#myModal">数据上传</a>
						</p>
						<img class="top10" src="${ctxResources}/images/huisheng/gou.png">
					</div>
				</div>
				<div class="datauploadModule">
					<div class="module1">持仓汇总</div>
					<div class="module2">
						<p class="top5 hand">
							<a href="http://osz37q9fk.bkt.clouddn.com/1103/position.xlsx">模板下载</a>
						</p>
						<p class="top5 hand">
							<a data-id="position" class="type" data-type="持仓汇总"
								data-toggle="modal" data-target="#myModal">数据上传</a>
						</p>
						<img class="top10" src="${ctxResources}/images/huisheng/gou.png">
					</div>
				</div>
				<div class="datauploadModule">
					<div class="module1">交易明细</div>
					<div class="module2">
						<p class="top5 hand">
							<a href="http://osz37q9fk.bkt.clouddn.com/1103/trade.xlsx">模板下载</a>
						</p>
						<p class="top5 hand">
							<a data-id="trade" class="type" data-type="交易明细"
								data-toggle="modal" data-target="#myModal">数据上传</a>
						</p>
						<img class="top10" src="${ctxResources}/images/huisheng/gou.png">
					</div>
				</div>
				<div class="datauploadModule">
					<div class="module1">期货持仓交易明细表</div>
					<div class="module2">
						<p class="top5 hand">
							<a href="http://osz37q9fk.bkt.clouddn.com/1103/future.xlsx">模板下载</a>
						</p>
						<p class="top5 hand">
							<a data-id="future" class="type" data-type="期货持仓交易明细表"
								data-toggle="modal" data-target="#myModal">数据上传</a>
						</p>
						<img class="top10" src="${ctxResources}/images/huisheng/gou.png">
					</div>
				</div>
				<div class="datauploadModule">
					<div class="module1">估值表</div>
					<div class="module2">
						<p class="top5 hand">
							<a href="http://osz37q9fk.bkt.clouddn.com/%E4%BC%B0%E5%80%BC%E8%A1%A8%E6%A8%A1%E6%9D%BF.xls">模板下载</a>
						</p>
						<p class="top5 hand">
							<a data-id="valuation" data-type="估值表" class="type"
								data-toggle="modal" data-target="#myModal">数据上传</a>
						</p>
						<img class="top10" src="${ctxResources}/images/huisheng/gou.png">
					</div>
				</div>
			</div>

			<!-- 确定按钮 -->
			<div class="confirmPrcdiv distanceTop40">
				<button id="determineBtn" class="btn upfileBtn" type="button">确定</button>
				<button id="back" type="button">返回</button>
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
					<h4 class="modal-title" style="font-size:16px;">
						数据上传<span class="left10 red">请上传该产品的<label id="prcTypetxt"
							style="font-weight:400;"></label></span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="distanceTop20" style="height:40px;">
						<form name="more_file" id="more_file">
							<input type="text" class="pull-left" id="more_showFile"
								style="height:26px;width:240px;"> <input type="text"
								id="more_uptype" name="type" value="info" style="display:none;">
							<input type="file" accept=".xlsx,.xls,.txt" name="file"
								id="more_upLoadinp" class="upload_file" multiple="multiple">
							<label for="more_upLoadinp" class="easy2Btn forFile pull-left">浏览</label>
							<input type='text' id="more_upfundid" name='fund_id' value=""
								style="display:none;"> <input type='text'
								id="more_upuserid" name='user_id' value="" style="display:none;">
							<input type="text" name="fund_category" style="display:none;">
							<input type="text" name="parent_fund" style="display:none;">
							<input type="text" name="product_name" style="display:none;">
							<input type="text" name="foundation_date" style="display:none;">
							<input type="text" name="investment_advisers"
								style="display:none;"> <input type="text"
								name="fund_manager" style="display:none;"> <input
								type="text" name="investment_manager" style="display:none;">
							<input type="text" name="distribution_mode" style="display:none;">
							<input type="text" name="record_reg" style="display:none;">
							<!-- <input type="text" name="structural_form" style="display:none;"> -->
							<input type="text" name="investment_strategy"
								style="display:none;"> <input type="text" name="notes"
								style="display:none;"> <input type="text"
								name="fund_type_structure" style="display:none;"> <input
								type="text" name="data_freq" style="display:none;">
						</form>
					</div>
					<div class="distanceTop20 border" style="height:170px;">
						<div style="margin-top:5px;padding-left: 20px;">
							<div
								style="margin-left:0px;color:red;height:140px;overflow:auto;"
								id="info"></div>
						</div>
					</div>
					<div class="distanceTop20 confirmPrcdiv" style="float:none;">
						<button id="more_upload">上传</button>
						<button id="supBack" data-dismiss="modal">返回</button>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
</div>