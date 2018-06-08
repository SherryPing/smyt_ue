<!-- 添加产品 -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>添加投顾</title>
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
		<div id="investmentInfo" class="pull-left">
			<form id="basicInfo">
				<div class="infoTitle" style="margin-top:0px;">
					<div class="hh-titleTxt">
						<span>填写投顾基本信息</span>
					</div>
				</div>
				<div class="distanceTop40 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>私募管理人名称：</span>
					</div>
					<input type="text" id="org_name" class="DatafilingInp">
				</div>
				<div class="distanceTop40 halfDiv pull-left"
					style="display:inline-block;">
					<div class="requiredDiv">
						<span class="Required">*</span> <span>是否具备投顾资格：</span>
					</div>
					<select id="is_qualified" class="form-control DatafilingInp">
						<option>是</option>
						<option>否</option>
					</select>
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span> <span>协会备案编号：</span>
					</div>
					<input type="text" id="reg_code" class="DatafilingInp">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>办公地址：</span>
					</div>
					<input type="text" id="office_address" class="DatafilingInp select_date">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>协会备案日期：</span>
					</div>
					<input type="text" id="reg_time" class="DatafilingInp select_date cdate" readonly>
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>联系人：</span>
					</div>
					<input type="text" id="linkman" class="DatafilingInp">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>机构成立日期：</span>
					</div>
					<input type="text" id="found_date" class="DatafilingInp cdate">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>联系人职务：</span>
					</div>
					<input type="text" id="linkman_title" class="DatafilingInp">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>注册资本(万元)：</span>
					</div>
					<input type="number" id="reg_capital" class="DatafilingInp">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>联系人电话：</span>
					</div>
					<input type="number" id="linkman_phone" class="DatafilingInp">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>管理规模：</span>
					</div>
					<select id="asset_scale_mtd" class="form-control DatafilingInp">
						<option>0-1亿</option>
						<option>1-10亿</option>
						<option>10-20亿</option>
						<option>20-50亿</option>
						<option>50亿以上</option>
					</select>
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span>联系人邮箱：</span>
					</div>
					<input type="text" id="linkman_email" class="DatafilingInp">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>已发行产品数量：</span>
					</div>
					<input type="text" id="issued_funds_num" class="DatafilingInp">
				</div>
	
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>主要策略：</span>
					</div>
					<select id="org_strategy" class="form-control DatafilingInp">
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
						<option>其它</option>
					</select>
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span>投资风格：</span>
					</div>
					<input type="text" id="Invest_style" class="DatafilingInp">
				</div>
				<div class="distanceTop20 halfDiv pull-left">
					<div class="requiredDiv">
						<span class="Required">*</span><span>推荐机构：</span>
					</div>
					<input type="text" id="recommend_org" class="DatafilingInp">
				</div>
			</form>
			<div class="distanceTop20 halfDiv pull-left">
					<div style="background-color:#E7EBEE;width:45%;margin-left:200px;text-align:center;height:34px;padding-top:4px;">
						<button class="huihong2Btn" id="basicinfUpload">提交</button>
					</div>
			</div>
			<div class="infoTitle" style="margin-top:0px;">
				<div class="infoTitle" style="margin-top:0px;">
					<div class="hh-titleTxt">
						<span>原始资料上传</span>
					</div>
				</div>
				<div class="distanceTop20 reportUl">
					<div class="requiredDiv">
						<span>上传文件：</span>
					</div>
					<form id="rawMaterial" name="rawMaterial">
						<input type="text" id="showFile" readonly>
						<input type="text" id="org_id_init" name="org_id_init" style="display:none;">
						<input type="text" name="type" value="source_material" style="display:none;">
						<input type="file" multiple="multiple" name="file" id="upLoadinp" class="upload_file">
						<label for="upLoadinp" class="huihong2Btn hand forFile pull-left">浏览</label>
						<button class="huihong3Btn" id="upload1" type="button">上传</button>
					</form>
				</div>
				<!-- <div class="showFile"></div> -->
			</div>

		</div>
		<div class="confirmPrcdiv">
			<button class="hhBtn-default" id="clear">清空</button>
			<a href="${ctxPage}/InvestmentRatings"><button class="hhBtn-default" class="back">返回</button></a>
		</div>
	</section>
	<!-- 右侧部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require([ 'huihong/InvestmentRatings/observationPool/addCast' ]);
	</script>
</body>

</html>