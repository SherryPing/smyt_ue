
<!-- 核心池 -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<div class="outerDiv investmenTratings-observationPool">
	<ul id="modulesUl" class="investmenTratings-observationPool-modulesUl">
		<li class="activeModules">投顾列表</li>
		<li>统计分析</li>
		<li class="hhline"></li>
	</ul>
	<!-- 投顾列表 -->
	<div class="moduleDiv outerDiv distanceTop40">
		<div class="table-responsive">
			<table id="filterTbl" class="table ulTable">
				<tr>
					<td><span class="ultitleTxt2">关键字：</span></td>
					<td colspan="2">
						<div id="maintblSearch" class="maintblSearch">
							<input id="keywordSearch" type="text" placeholder="投顾名称"
								name="keywordSearch" class="searchInp">
						</div>
					</td>
				</tr>
				<tr>
					<td><span class="ultitleTxt2">投资策略：</span></td>
					<td class="ulContent" id="investmentStrategy"
						style="text-align:center;"><span id="secMulslebtn"
						class="openEnded">不限</span></td>
					<td>
						<button id="60101" class="checkboxBtn checkboxBtnshort"
							name="disMethod">股票策略</button>
						<button id="60102" class="checkboxBtn checkboxBtnshort"
							name="disMethod">管理期货</button>
						<button id="60103" class="checkboxBtn checkboxBtnshort"
							name="disMethod">相对价值</button>
						<button id="60104" class="checkboxBtn checkboxBtnshort"
							name="disMethod">事件驱动</button> <img class="dropdownImg"
						id="dropdownImg" src="${ctxResources}/images/mainxiala.png">
						<button id="6010501" class="Special checkboxBtn checkboxBtnshort"
							name="disMethod">债券策略</button>
						<button id="6010601" class="Special checkboxBtn checkboxBtnshort"
							name="disMethod">宏观策略</button>
						<button id="60107" class="checkboxBtn checkboxBtnshort"
							name="disMethod">组合策略</button>
						<button id="6010801" class="Special checkboxBtn checkboxBtnshort"
							name="disMethod">多策略</button>
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
							<input id="6010306" type="checkbox" name="secMulscn" disabled>
							<label for="6010306">期权套利</label>
						</div>
						<div class="checkBlock">
							<input id="6010305" type="checkbox" name="secMulscn" disabled>
							<label for="6010305">其他相对价值策略</label>
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
							<label for="6010703">TOT</label><img id="pullupImg"
								src="${ctxResources}/images/mainshangla.png" alt="">
						</div>
						<div class="checkBlock">
							<input id="6010704" type="checkbox" name="secMulscn" disabled>
							<label for="6010704">其他组合策略</label>
						</div>
					</td>
				</tr>
				<!--投资策略详情结束  -->
				<tr id="foundationYears">
					<td><span class="ultitleTxt2">成立年限：</span></td>
					<td class="ulContent" colspan="2"><span id="1"
						class="selectTime" style="margin-left: 30px;">1年以下</span> <span
						id="2" class="selectTime">1-3年</span> <span id="3"
						class="selectTime">3-5年</span> <span id="4" class="selectTime">5年以上</span>
						<span class="rtop5" style="margin-left: 30px;">自定义:</span> <span
						class="layui-input-inline rtop5" style="margin-left: 10px;">
							<input class="dateInp cdata" placeholder="开始日期"
							name="foundation_date_start" id="foundation_date_start" readonly>
					</span><span class="rtop5" style="margin: 0 20px;">至</span><span
						class="rtop5 layui-input-inline"> <input
							class="dateInp cdata" placeholder="结束日期"
							name="foundation_date_end" id="foundation_date_end" readonly>
					</span></td>
				</tr>
				<tr>
					<td><span class="ultitleTxt2">投顾规模：</span></td>
					<td class="ulContent" id="managementScale" colspan="2">
						<button data-id="13" class="checkboxBtn checkboxBtnshort"
							name="disMethod">0-1亿</button>
						<button data-id="12" class="checkboxBtn checkboxBtnshort"
							name="disMethod">1-10亿</button>
						<button data-id="7" class="checkboxBtn checkboxBtnshort"
							name="disMethod">10-20亿</button>
						<button data-id="8" class="checkboxBtn checkboxBtnshort"
							name="disMethod">20-50亿</button>
						<button data-id="9" class="checkboxBtn checkboxBtnshort"
							name="disMethod">50亿以上</button>
						<button data-id="else" class="checkboxBtn checkboxBtnshort"
							name="disMethod">其他</button>
					</td>
				</tr>
				<tr>
					<td><span class="ultitleTxt2">合作状态：</span></td>
					<td class="ulContent" id="consultantScale" colspan="2">
						<button data-id="13" class="checkboxBtn checkboxBtnshort"
							name="disMethod">未开始</button>
						<button data-id="12" class="checkboxBtn checkboxBtnshort"
							name="disMethod">进行中</button>
						<button data-id="12" class="checkboxBtn checkboxBtnshort"
							name="disMethod">提前终止</button>
						<button data-id="12" class="checkboxBtn checkboxBtnshort"
							name="disMethod">到期完成</button>
					</td>
				</tr>
				<tr>
					<td><span class="ultitleTxt2">综合评级：</span></td>
					<td class="ulContent pad0" id="consultantScale" colspan="2">
						<div class="percent45 pull-left">
							<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini"
								name="disMethod">*****</button>
							<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini"
								name="disMethod">****</button>
							<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini"
								name="disMethod">***</button>
							<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini"
								name="disMethod">**</button>
							<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini"
								name="disMethod">*</button>
						</div>
						<div class="percent55 pull-left">
							<div class="tableTitlediv">收益能力:</div>
							<div class="padTop8" style="min-width:480px;">
								<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini"
									name="disMethod">*****</button>
								<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini"
									name="disMethod">****</button>
								<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini"
									name="disMethod">***</button>
								<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini"
									name="disMethod">**</button>
								<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini" 
									name="disMethod">*</button>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td><span class="ultitleTxt2">风控能力：</span></td>
					<td class="ulContent" id="consultantScale" colspan="2">
						<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini"
							name="disMethod">*****</button>
						<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini"
							name="disMethod">****</button>
						<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini"
							name="disMethod">***</button>
						<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini"
							name="disMethod">**</button>
						<button data-id="else" class="checkboxBtn checkboxBtnshort checkboxmini"
							name="disMethod">*</button>
					</td>
				</tr>
				<tr>
					<td colspan="3" style="width: 98%;">
						<button id="maindetermineBtn" class=huihong1Btn>
							<span>确定</span>
						</button>
						<button id="mainemptyBtn" class="huihong1Btn">
							<span>清空</span>
						</button>
					</td>
				</tr>
			</table>
		</div>
		<div id="november">
			<table class="mainTbl" id="main-grid" data-toggle="main-grid"
				data-id-field="id" data-show-columns="true">
			</table>
		</div>
	</div>
	<!-- 统计分析 -->
	<div class="moduleDiv" style="display:none;"></div>
</div>