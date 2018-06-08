<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">

	<head>
		<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
		<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
		<title>投顾挖掘</title>
		<%@ include file="/WEB-INF/views/include/meta.jsp"%>
		<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
		<link rel="stylesheet" href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />
	</head>

	<body>
		<!-- 头部分开始 -->
		<%@ include file="/WEB-INF/views/system/header.jsp"%>
		<!-- 头部分结束 -->

		<!-- 内容部分开始 -->
		<section id="choiceTbl">
			<div>
				<ul class="indexTab">
					<li data-id="private" class="act">私募</li><li data-id="public">公募</li>
				</ul>
			</div>
			<%--私募--%>
			<div id="private">
				<div class="row">
				<div class="col-md-12">
					<div class="table-responsive">
						<table id="filterTbl" class="table ulTable">
							<tr>
								<td><img src="${ctxResources}/images/check00.png"><span class="ultitleTxt2">关键字：</span></td>
								<td colspan="2">
									<div id="maintblSearch" class="maintblSearch">
										<select id="search_choice_id" class="searchChoice">
											<option>投资顾问</option>
											<option>基金产品</option>
											<option>投资经理</option>
										</select> <input id="keywordSearch" type="text" name="keywordSearch" class="searchInp">
									</div>
								</td>
							</tr>
							<tr id="statisticalInterval">
								<td><img src="${ctxResources}/images/check01.png"> <span class="ultitleTxt2">统计区间：</span></td>
								<td colspan="2"><span id="total" class="selectTime choiceTime" style="margin-left: 10px;">成立以来</span>
									<span id="year" class="selectTime">今年以来</span> <span id="m3" class="selectTime">近三个月</span> <span id="m6" class="selectTime">近六个月</span>
									<span id="y1" class="selectTime">近一年</span> <span id="y3" class="selectTime">近三年</span> <span id="y5" class="selectTime">近五年</span>
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
								<td><img src="${ctxResources}/images/check02.png"> <span class="ultitleTxt2">业绩指标：</span></td>
								<td colspan="2">
									<div class="indicatorsRange">
										<span class="indicatorsTitle" style="width:70px;">年化收益：</span>
										<input id="yearLowinp" class="percentInp" type="number" name=""> % <span class="percentHr">至</span> <input id="yearHighinp" class="percentInp" type="number" name=""> %
									</div>
									<div class="indicatorsRange">
										<span class="indicatorsTitle">最大回撤：</span> <input id="withdrawalLow" class="percentInp" type="number" name=""> % <span class="percentHr">至</span> <input id="withdrawalHigh" class="percentInp" type="number" name=""> %
									</div>
									<div class="indicatorsRange">
										<span class="indicatorsTitle">年化波动率：</span> <input id="fluctuationsLow" class="percentInp" type="number" name=""> % <span class="percentHr">至</span> <input id="fluctuationsHigh" class="percentInp" type="number" name=""> %
									</div>
									<div class="indicatorsRange">
										<span class="indicatorsTitle">年化夏普比：</span> <input id="sharpThanLow" class="percentInp" type="number" name="">
										<span class="percentHr">至</span> <input id="sharpThanHigh" class="percentInp" type="number" name="">
									</div>
								</td>
							</tr>
							<tr>
								<td><img src="${ctxResources}/images/check06.png"> <span class="ultitleTxt2">投资策略：</span></td>
								<td><span id="secMulslebtn" class="openEnded endActiv">不限</span></td>
								<td colspan="2" class="ulContent" id="investmentStrategy">
									<button id="60101" class="checkboxBtn checkboxBtnshort" name="disMethod">股票策略</button>
									<button id="60102" class="checkboxBtn checkboxBtnshort" name="disMethod">管理期货</button>
									<button id="60103" class="checkboxBtn checkboxBtnshort" name="disMethod">相对价值</button>
									<button id="60104" class="checkboxBtn checkboxBtnshort" name="disMethod">事件驱动</button> <img class="dropdownImg" id="dropdownImg" src="${ctxResources}/images/mainxiala.png">
									<button id="60105" class="Special checkboxBtn checkboxBtnshort" name="disMethod">债券策略</button>
									<button id="60106" class="Special checkboxBtn checkboxBtnshort" name="disMethod">宏观策略</button>
									<button id="60107" class="checkboxBtn checkboxBtnshort" name="disMethod">组合策略</button>
									<button id="60108" class="Special checkboxBtn checkboxBtnshort" name="disMethod">多策略</button>
									<button id="60109" class="checkboxBtn checkboxBtnlong" name="disMethod">其他一级策略</button>
								</td>
							</tr>
							<!-- 投资策略详情 -->
							<tr class="ivnstrategyDetail">
								<td colspan="3" class="ivnDetailtd 60101" id="stockStrategy" data-id="60101">
									<div class="detaiTitle">
										<span>股票策略：</span>
									</div>
									<div class="checkBlock">
										<input id="6010101" type="checkbox" name="secMulscn">
										<label for="6010101">股票多头</label>
									</div>
									<div class="checkBlock">
										<input id="6010102" type="checkbox" name="secMulscn">
										<label for="6010102">股票多空</label>
									</div>
									<div class="checkBlock">
										<input id="6010103" type="checkbox" name="secMulscn">
										<label for="6010103">市场中性</label>
									</div>
								</td>
							</tr>
							<tr class="ivnstrategyDetail">
								<td colspan="3" class="ivnDetailtd 60102" id="managingFutures" data-id="60102">
									<div class="detaiTitle">
										<span>管理期货：</span>
									</div>
									<div class="checkBlock">
										<input id="6010201" type="checkbox" name="secMulscn">
										<label for="6010201">期货趋势策略</label>
									</div>
									<div class="checkBlock">
										<input id="6010202" type="checkbox" name="secMulscn">
										<label for="6010202">期货套利策略</label>
									</div>
									<div class="checkBlock">
										<input id="6010203" type="checkbox" name="secMulscn">
										<label for="6010203">其他管理期货策略</label>
									</div>
								</td>
							</tr>
							<tr class="ivnstrategyDetail">
								<td colspan="3" class="ivnDetailtd 60103" id="relativeValue" data-id="60103">
									<div class="detaiTitle">
										<span>相对价值：</span>
									</div>
									<div class="checkBlock">
										<input id="6010301" type="checkbox" name="secMulscn">
										<label for="6010301">ETF套利</label>
									</div>
									<div class="checkBlock">
										<input id="6010302" type="checkbox" name="secMulscn">
										<label for="6010302">可转债套利</label>
									</div>
									<div class="checkBlock">
										<input id="6010303" type="checkbox" name="secMulscn">
										<label for="6010303">固定收益套利</label>
									</div>
									<div class="checkBlock">
										<input id="6010304" type="checkbox" name="secMulscn">
										<label for="6010304">分级基金套利</label>
									</div>
									<div class="checkBlock">
										<input id="6010305" type="checkbox" name="secMulscn">
										<label for="6010305">其他相对价值策略</label>
									</div>
									<div class="checkBlock">
										<input id="6010306" type="checkbox" name="secMulscn">
										<label for="6010306">期权套利</label>
									</div>
								</td>
							</tr>
							<tr class="ivnstrategyDetail">
								<td colspan="3" class="ivnDetailtd 60104" id="eventDriven" data-id="60104">
									<div class="detaiTitle">
										<span>事件驱动：</span>
									</div>
									<div class="checkBlock">
										<input id="6010401" type="checkbox" name="secMulscn">
										<label for="6010401">并购重组</label>
									</div>
									<div class="checkBlock">
										<input id="6010402" type="checkbox" name="secMulscn">
										<label for="6010402">定向增发</label>
									</div>
									<div class="checkBlock">
										<input id="6010403" type="checkbox" name="secMulscn">
										<label for="6010403">大宗交易</label>
									</div>
									<div class="checkBlock">
										<input id="6010404" type="checkbox" name="secMulscn">
										<label for="6010404">其他事件驱动策略</label>
									</div>
								</td>
							</tr>
							<tr class="ivnstrategyDetail">
								<td colspan="3" class="ivnDetailtd 60107" id="combiningPolicy" data-id="60107">
									<div class="detaiTitle">
										<span>组合策略：</span>
									</div>
									<div class="checkBlock">
										<input id="6010701" type="checkbox" name="secMulscn">
										<label for="6010701">MOM</label>
									</div>
									<div class="checkBlock">
										<input id="6010702" type="checkbox" name="secMulscn">
										<label for="6010702">FOF</label>
									</div>
									<div class="checkBlock">
										<input id="6010703" type="checkbox" name="secMulscn">
										<label for="6010703">TOT</label>
									</div>
									<div class="checkBlock">
										<input id="6010704" type="checkbox" name="secMulscn">
										<label for="6010704">其他组合策略</label>
									</div>
								</td>
							</tr>
							<tr class="ivnstrategyDetail">
								<td colspan="3" class="ivnDetailtd 60109" id="otherPolicy" data-id="60109">
									<div class="detaiTitle">
										<span>其他一级策略：</span>
									</div>
									<div class="checkBlock">
										<input id="6010902" type="checkbox" name="secMulscn">
										<label for="6010902">新三板</label>
									</div>
									<div class="checkBlock">
										<input id="6010903" type="checkbox" name="secMulscn">
										<label for="6010903">海外基金</label>
									</div>
									<div class="checkBlock">
										<input id="6010904" type="checkbox" name="secMulscn">
										<label for="6010904">货币基金</label> <img id="pullupImg" src="${ctxResources}/images/mainshangla.png" alt="">
									</div>
									<div class="checkBlock">
										<input id="6010901" type="checkbox" name="secMulscn">
										<label for="6010901">其他二级策略</label>
									</div>
								</td>
							</tr>
							<!--投资策略详情结束  -->
							<tr id="foundationYears">
								<td><img src="${ctxResources}/images/check09.png"> <span class="ultitleTxt2">成立年限：</span></td>
								<td><span class="openEnded endActiv" id="establishedYears">不限</span></td>
								<td class="ulContent">
									<span id="1" class="selectTime" style="margin-left: 30px;">1年以下</span>
									<span id="2" class="selectTime">1-3年</span>
									<span id="3" class="selectTime">3-5年</span>
									<span id="4" class="selectTime">5年以上</span>
									<span class="rtop5" style="margin-left: 30px;">自定义:</span>
									<span class="layui-input-inline rtop5" style="margin-left: 10px;">
									<input class="dateInp cdata" placeholder="开始日期" name="foundation_date_start" id="foundation_date_start" readonly>
							</span><span class="rtop5" style="margin: 0 20px;">至</span><span class="rtop5 layui-input-inline"> 
							<input class="dateInp cdata" placeholder="结束日期" name="foundation_date_end" id="foundation_date_end" readonly>
							</span></td>
							</tr>
							<tr id="typeOfinstitution">
								<td><img src="${ctxResources}/images/check05.png"> <span class="ultitleTxt2">机构类型：</span></td>
								<td><span class="openEnded endActiv" id="establishedYears">不限</span></td>
								<td class="ulContent">
									<button data-id="4" class="checkboxBtn checkboxBtnlong" name="disMethod">私募基金管理公司</button>
									<button data-id="6" class="checkboxBtn checkboxBtnshort" name="disMethod">证券公司</button>
									<button data-id="7" class="checkboxBtn checkboxBtnshort" name="disMethod">期货公司</button>
									<button data-id="1" class="checkboxBtn checkboxBtnshort" name="disMethod">信托公司</button>
									<button data-id="5" class="checkboxBtn checkboxBtnshort" name="disMethod">基金公司</button>						
									<button data-id="2" class="checkboxBtn checkboxBtnshort" name="disMethod">基金子公司</button>
									<button data-id="else" class="checkboxBtn checkboxBtnshort" name="disMethod">其他</button>
								</td>
							</tr>
							<tr id="tabLine">
								<td><img src="${ctxResources}/images/check10.png"> <span class="ultitleTxt2">自主发行规模：</span></td>
								<td><span class="openEnded endActiv">不限</span></td>
								<td class="ulContent" id="managementScale">
									<button data-id="13" class="checkboxBtn checkboxBtnshort" name="disMethod">0-1亿</button>
									<button data-id="12" class="checkboxBtn checkboxBtnshort" name="disMethod">1-10亿</button>
									<button data-id="7" class="checkboxBtn checkboxBtnshort" name="disMethod">10-20亿</button>
									<button data-id="8" class="checkboxBtn checkboxBtnshort" name="disMethod">20-50亿</button>
									<button data-id="9" class="checkboxBtn checkboxBtnshort" name="disMethod">50亿以上</button>
									<button data-id="else" class="checkboxBtn checkboxBtnshort" name="disMethod">其他</button>
								</td>
							</tr>
							<tr>
								<td><img src="${ctxResources}/images/check10.png"> <span class="ultitleTxt2">顾问管理规模：</span></td>
								<td><span class="openEnded endActiv">不限</span></td>
								<td class="ulContent" id="consultantScale">
									<button data-id="13" class="checkboxBtn checkboxBtnshort" name="disMethod">0-1亿</button>
									<button data-id="12" class="checkboxBtn checkboxBtnshort" name="disMethod">1-10亿</button>
									<button data-id="7" class="checkboxBtn checkboxBtnshort" name="disMethod">10-20亿</button>
									<button data-id="8" class="checkboxBtn checkboxBtnshort" name="disMethod">20-50亿</button>
									<button data-id="9" class="checkboxBtn checkboxBtnshort" name="disMethod">50亿以上</button>
									<button data-id="else" class="checkboxBtn checkboxBtnshort" name="disMethod">其他</button>
								</td>
							</tr>
							<tr id="distributionArea">
								<td><img src="${ctxResources}/images/check10.png"> <span class="ultitleTxt2">办公地址：</span></td>
								<td><span class="openEnded endActiv">不限</span></td>
								<td class="ulContent" id="region">
									<button id="上海" class="checkboxBtn checkboxBtnshort" name="disMethod">上海</button>
									<button id="广东" class="checkboxBtn checkboxBtnshort" name="disMethod">广东</button>
									<button id="深圳" class="checkboxBtn checkboxBtnshort" name="disMethod">深圳</button>
									<button id="北京" class="checkboxBtn checkboxBtnshort" name="disMethod">北京</button>
									<button id="else" class="checkboxBtn checkboxBtnshort" name="disMethod">其他</button>
								</td>
							</tr>
							<tr>
								<td colspan="3" style="width: 98%;">
									<button id="maindetermineBtn" class="easy2Btn anchor" data-id="tabLine">
									<span>确定</span>
								</button>
									<button id="mainemptyBtn" class="easy2Btn">
									<span>清空</span>
								</button>
								</td>
							</tr>
						</table>
						
					</div>
				</div>
			</div>
				<!-- 产品详情。 -->
					<div class="row">
						<div class="col-md-12">
							<!-- 产品对比列表 -->
							<div id="productComparison">
								<div class="contrastTitle">
									<span>投顾对比栏</span><img id="prcDelect" src="${ctxResources}/images/hideContrast.png">
								</div>
								<div class="contrastContent">
									<table id="cntrastTbl">
										<tr class="nofund">
											<td><label></label></td>
											<td class="deletImgbtn">
										</tr>
										<tr class="nofund">
											<td><label></label></td>
											<td class="deletImgbtn">
										</tr>
										<tr class="nofund">
											<td><label></label></td>
											<td class="deletImgbtn">
										</tr>
										<tr class="nofund">
											<td><label></label></td>
											<td class="deletImgbtn">
										</tr>
									</table>
									<div class="contrastBtndiv">
										<button id="prcComparbtn">对比</button>
										<button id="prcbtnClean">清空产品</button>
									</div>
								</div>
							</div>
							<br>
							<div id="november">
								<table class="mainTbl" id="main-grid" data-toggle="main-grid" data-id-field="id" data-show-columns="true">
								</table>
							</div>
							<input type="hidden" id="product_list" name="PID" value="01/01/70" />
							<div id="SuspensionDiv">
								<div class="Contrast">
									<span>对比</span>
									<div id="cntCount">0</div>
								</div>
							</div>
						</div>
					</div>
			</div>
			<%--公募--%>
			<div id="public" style="display: none;">
				<div class="row">
					<div class="col-md-12">
						<div class="table-responsive">
							<table id="filterTblpub" class="table ulTable">
								<tr>
									<td><img src="${ctxResources}/images/check00.png"><span class="ultitleTxt2">关键字：</span></td>
									<td colspan="2">
										<div id="maintblSearchpub" class="maintblSearch">
											<input id="keywordSearchpub" type="text" name="keywordSearch" class="searchInp">
										</div>
									</td>
								</tr>
								<tr data-id="foundationYears">
									<td><img src="${ctxResources}/images/check09.png"> <span class="ultitleTxt2">成立年限：</span></td>
									<td><span id="establishedYearspub" class="openEnded endActiv" data-id="establishedYears">不限</span></td>
									<td class="ulContentpub" data-id="establishedYears">
										<button data-id="<1" class="checkboxBtn checkboxBtnshort" name="disMethod">1年以下</button>
										<button data-id="1-3" class="checkboxBtn checkboxBtnshort" name="disMethod">1-3年</button>
										<button data-id="3-5" class="checkboxBtn checkboxBtnshort" name="disMethod">3-5年</button>
										<button data-id=">5" class="checkboxBtn checkboxBtnshort" name="disMethod">5年以上</button>
										<span class="" style="margin-left: 30px;">自定义:</span>
										<span class="layui-input-inline" style="margin-left: 10px;">
									<input class="dateInp cdata date-pub" placeholder="开始日期" name="foundation_date_start" id="foundation_date_start_pub" readonly>
									</span><span class="" style="margin: 0 20px;">至</span><span class="layui-input-inline">
									<input class="dateInp cdata date-pub" placeholder="结束日期" name="foundation_date_end" id="foundation_date_end_pub" readonly>
									</span></td>
								</tr>
								<tr data-id="managementScalepub">
									<td><img src="${ctxResources}/images/check10.png"> <span class="ultitleTxt2">管理规模：</span></td>
									<td><span class="openEnded endActiv">不限</span></td>
									<td class="ulContentpub" data-id="managementScale">
										<button data-id="0-1" class="checkboxBtn checkboxBtnshort" name="disMethod">0-1亿</button>
										<button data-id="1-10" class="checkboxBtn checkboxBtnshort" name="disMethod">1-10亿</button>
										<button data-id="10-20" class="checkboxBtn checkboxBtnshort" name="disMethod">10-20亿</button>
										<button data-id="20-50" class="checkboxBtn checkboxBtnshort" name="disMethod">20-50亿</button>
										<button data-id="50" class="checkboxBtn checkboxBtnshort" name="disMethod">50亿以上</button>
									</td>
								</tr>
								<tr data-id="distributionArea">
									<td><img src="${ctxResources}/images/check10.png"> <span class="ultitleTxt2">办公地址：</span></td>
									<td><span class="openEnded endActiv">不限</span></td>
									<td class="ulContentpub" data-id="region">
										<button data-id="上海" class="checkboxBtn checkboxBtnshort" name="disMethod">上海</button>
										<button data-id="深圳" class="checkboxBtn checkboxBtnshort" name="disMethod">深圳</button>
										<button data-id="北京" class="checkboxBtn checkboxBtnshort" name="disMethod">北京</button>
										<button data-id="else" class="checkboxBtn checkboxBtnshort" name="disMethod">其他</button>
									</td>
								</tr>
								<tr>
									<td colspan="3" style="width: 98%;">
										<button id="maindetermineBtnpub" class="easy2Btn anchor" data-id="tabLine">
											<span>确定</span>
										</button>
										<button id="mainemptyBtnpub" class="easy2Btn">
											<span>清空</span>
										</button>
									</td>
								</tr>
							</table>
						</div>
						<div>
							<table class="mainTbl" id="main-grid-pub" data-toggle="main-grid" data-id-field="id" data-show-columns="true">
							</table>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- 右侧部分结束-->
		<%@ include file="/WEB-INF/views/system/mainModal.jsp"%>
		<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
		<script>
			require(['easy2/Excavation/excavationIndex']);
		</script>
	</body>

</html>