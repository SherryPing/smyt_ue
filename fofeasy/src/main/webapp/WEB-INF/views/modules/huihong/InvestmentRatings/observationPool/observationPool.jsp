<!-- 观察池 -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<div class="outerDiv investmenTratings-observationPool">
	<div class="investmenTratings-observationPool-modulesUl">
		<ul id="modulesUl" class="hhlineUl">
			<li class="activeModules">投顾列表</li>
			<li>统计分析</li>
			<li class="hhline"></li>
		</ul>
	</div>
	<!-- 投顾列表 -->
	<div class="moduleDiv outerDiv distanceTop40">
		<div class="table-responsive">
			<table id="filterTbl" class="table ulTable">
				<tr>
					<td><img src="${ctxResources}/images/check00.png"><span
						class="ultitleTxt">关键字：</span></td>
					<td colspan="2">
						<div id="maintblSearch" class="maintblSearch">
							<input id="keywordSearch" type="text" placeholder="投顾名称"
								name="keywordSearch" class="searchInp">
						</div>
					</td>
				</tr>
				<tr>
					<td><img src="${ctxResources}/images/check06.png"> <span
						class="ultitleTxt">投资策略：</span></td>
					<td class="ulContent"
						style="text-align:center;"><span class="openEnded ">不限</span></td>
					<td id="investmentStrategy">
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
					<td colspan="3" class="ivnDetailtd" id="stockStrategy" data-id="60101">
						<div class="detaiTitle">
							<span>股票策略：</span>
						</div>
						<div class="checkBlock">
							<input id="6010101" type="checkbox" name="secMulscn" value="股票多头">
							<label for="6010101">股票多头</label>
						</div>
						<div class="checkBlock">
							<input id="6010102" type="checkbox" name="secMulscn" value="股票多空">
							<label for="6010102">股票多空</label>
						</div>
						<div class="checkBlock">
							<input id="6010103" type="checkbox" name="secMulscn" value="市场中性">
							<label for="6010103">市场中性</label>
						</div>
					</td>
				</tr>
				<tr class="ivnstrategyDetail">
					<td colspan="3" class="ivnDetailtd" id="managingFutures" data-id="60102">
						<div class="detaiTitle">
							<span>管理期货：</span>
						</div>
						<div class="checkBlock">
							<input id="6010201" type="checkbox" name="secMulscn" value="期货趋势策略">
							<label for="6010201">期货趋势策略</label>
						</div>
						<div class="checkBlock">
							<input id="6010202" type="checkbox" name="secMulscn" value="期货套利策略">
							<label for="6010202">期货套利策略</label>
						</div>
						<div class="checkBlock">
							<input id="6010203" type="checkbox" name="secMulscn" value="其他管理期货策略">
							<label for="6010203">其他管理期货策略</label>
						</div>
					</td>
				</tr>
				<tr class="ivnstrategyDetail">
					<td colspan="3" class="ivnDetailtd" id="relativeValue" data-id="60103">
						<div class="detaiTitle">
							<span>相对价值：</span>
						</div>
						<div class="checkBlock">
							<input id="6010301" type="checkbox" name="secMulscn" value="ETF套利">
							<label for="6010301">ETF套利</label>
						</div>
						<div class="checkBlock">
							<input id="6010302" type="checkbox" name="secMulscn" value="可转债套利">
							<label for="6010302">可转债套利</label>
						</div>
						<div class="checkBlock">
							<input id="6010303" type="checkbox" name="secMulscn" value="固定收益套利">
							<label for="6010303">固定收益套利</label>
						</div>
						<div class="checkBlock">
							<input id="6010304" type="checkbox" name="secMulscn" value="分级基金套利">
							<label for="6010304">分级基金套利</label>
						</div>
						<div class="checkBlock">
							<input id="6010306" type="checkbox" name="secMulscn" value="期权套利">
							<label for="6010306">期权套利</label>
						</div>
						<div class="checkBlock">
							<input id="6010305" type="checkbox" name="secMulscn" value="其他相对价值策略">
							<label for="6010305">其他相对价值策略</label>
						</div>

					</td>
				</tr>
				<tr class="ivnstrategyDetail">
					<td colspan="3" class="ivnDetailtd" id="eventDriven" data-id="60104">
						<div class="detaiTitle">
							<span>事件驱动：</span>
						</div>
						<div class="checkBlock">
							<input id="6010401" type="checkbox" name="secMulscn" value="并购重组">
							<label for="6010401">并购重组</label>
						</div>
						<div class="checkBlock">
							<input id="6010402" type="checkbox" name="secMulscn" value="定向增发">
							<label for="6010402">定向增发</label>
						</div>
						<div class="checkBlock">
							<input id="6010403" type="checkbox" name="secMulscn" value="大宗交易">
							<label for="6010403">大宗交易</label>
						</div>
						<div class="checkBlock">
							<input id="6010404" type="checkbox" name="secMulscn" value="其他事件驱动策略">
							<label for="6010404">其他事件驱动策略</label>
						</div>
					</td>
				</tr>
				<tr class="ivnstrategyDetail">
					<td colspan="3" class="ivnDetailtd" id="combiningPolicy" data-id="60107">
						<div class="detaiTitle">
							<span>组合策略：</span>
						</div>
						<div class="checkBlock">
							<input id="6010701" type="checkbox" name="secMulscn" value="MOM">
							<label for="6010701">MOM</label>
						</div>
						<div class="checkBlock">
							<input id="6010702" type="checkbox" name="secMulscn" value="FOF">
							<label for="6010702">FOF</label>
						</div>
						<div class="checkBlock">
							<input id="6010703" type="checkbox" name="secMulscn" value="TOT">
							<label for="6010703">TOT</label><img id="pullupImg"
								src="${ctxResources}/images/mainshangla.png" alt="">
						</div>
						<div class="checkBlock">
							<input id="6010704" type="checkbox" name="secMulscn" value="其他组合策略">
							<label for="6010704">其他组合策略</label>
						</div>
					</td>
				</tr>
				<!--投资策略详情结束  -->
				<tr id="foundationYears">
					<td><img src="${ctxResources}/images/check09.png"> <span
						class="ultitleTxt">成立年限：</span></td>
					<td class="ulContent"
						style="text-align:center;"><span id="secMulslebtn" class="openEnded">不限</span></td>
					<td class="ulContent"><span id="1" class="selectTime"
						style="margin-left: 30px;">1年以下</span> <span id="2"
						class="selectTime">1-3年</span> <span id="3" class="selectTime">3-5年</span>
						<span id="4" class="selectTime">5年以上</span> <span class="rtop5"
						style="margin-left: 30px;">自定义:</span> <span
						class="layui-input-inline rtop5" style="margin-left: 10px;">
						<input class="dateInp cdata" placeholder="开始日期" name="foundation_date_start" id="foundation_date_start" readonly>
					</span><span class="rtop5" style="margin: 0 20px;">至</span><span
						class="rtop5 layui-input-inline">
						<input class="dateInp cdata" placeholder="结束日期" name="foundation_date_end" id="foundation_date_end" readonly>
					</span></td>
				</tr>
				<tr>
					<td><img src="${ctxResources}/images/check10.png"> <span
						class="ultitleTxt">投顾规模：</span></td>
					<td class="ulContent"
						style="text-align:center;"><span class="openEnded ">不限</span></td>
					<td class="ulContent" id="specialBtn">
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
					<td><img src="${ctxResources}/images/check10.png"> <span
						class="ultitleTxt">尽调状态：</span></td>
					<td class="ulContent"
						style="text-align:center;"><span 
						class="openEnded">不限</span></td>
					<td class="ulContent" id="adjustStatus">
						<button data-id="12" class="checkboxBtn checkboxBtnshort"
							name="disMethod">未开始</button>
						<button data-id="12" class="checkboxBtn checkboxBtnshort"
							name="disMethod">已完成</button>
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
		<div class="outerDiv distanceTop20">
			<div class="adjustState">
				线上尽调未开始<span id="not_start"></span>家;尽调已完成<span id="done"></span>家;上周完成尽调<span id="last_week"></span>家;
			</div>
			<div class="pull-right" style="margin-bottom:10px;">			
				<%-- <a href="${ctxPage}/InvestmentRatings/observationPool/orgDetail/prcDetail">产品详情</a> --%>
				<a class="hhaBtn" href="${ctxPage}/InvestmentRatings/observationPool/AddCast">
				<span class="glyphicon glyphicon-plus"></span>
				<!-- <img src="/resources/images/addNewprc.png"> -->
				<span class="left5" style="margin:0 10px;">添加投顾</span></a>
			</div>
		</div>
		<div id="obsTab">
			<table class="mainTbl" id="main-grid" data-toggle="main-grid"
				data-id-field="id" data-show-columns="true">
			</table>
		</div>
	</div>
	<!-- 统计分析 -->
	<div class="moduleDiv" style="display:none;">
	<div class="center">暂无数据</div>
	<!-- 	<div class="infoTitle">
			<div class="introducTitle hhcolor"></div>
			<div class="titleTxt">
				<span>观察池投顾数量和入选比例</span>
			</div>
		</div>
		<div class="bigCharts" id="incomeScharts1" style="height: 280px;">

		</div>
		<div class="outerDiv distanceTop20">
			<table class="mainTbl marketAnalysistbl"
				style="width: 100%;border:1px solid #ddd;" id="market-main-table1">
			</table>
		</div>
		<div class="infoTitle">
			<div class="introducTitle hhcolor"></div>
			<div class="titleTxt">
				<span>观察池策略分布</span>
			</div>
		</div>
		<div class="bigCharts" id="incomeScharts2" style="height: 280px;">

		</div>
		<div class="outerDiv distanceTop20">
			<table class="mainTbl marketAnalysistbl"
				style="width: 100%;border:1px solid #ddd;" id="market-main-table2">
			</table>
		</div>
		<div class="infoTitle">
			<div class="introducTitle hhcolor"></div>
			<div class="titleTxt">
				<span>观察池投顾收益分布</span>
			</div>
		</div>
		<div class="col-md-5 distanceTop20" style="height:280px;">
			<table class="analysisTbl" id="event-main-table">
			</table>
		</div>
		<div class="col-md-7 pad_right0">
			<div class="bigCharts" style="height: 280px;"></div>
		</div>
		<div class="infoTitle">
			<div class="introducTitle hhcolor"></div>
			<div class="titleTxt">
				<span>观察池投顾收益分布</span>
			</div>
		</div>
		<div class="col-md-5 distanceTop20" style="height:280px;">
			<table class="analysisTbl" id="event-main-table">
			</table>
		</div>
		<div class="col-md-7 pad_right0">
			<div class="bigCharts" style="height: 280px;"></div>
		</div>
	</div> -->
</div>
<!-- 批量上传（Modal） -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog" style="margin-top:10%;width:55%;min-width:700px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" style="font-size:18px;">数据上传</h4>
				</div>
				<div class="modal-body">
					<div class="distanceTop20" style="height:40px;">
						<form name="more_file" id="more_file">
							<input type="text" class="pull-left" id="more_showFile" style="height:26px;width:240px;">
							<input type="file" name="file" id="upLoadinp" class="upload_file" multiple="multiple">
							<label for="upLoadinp" class="easy2Btn forFile pull-left">浏览</label>
							<input type='text' id="org_id_init" name='org_id_init' value=""style="display:none;">
							<input type="text" name="type" value="reports" style="display:none;">
						</form>
					</div>
					<div class="distanceTop20 border" style="height:100px;">
						<div style="margin-top:5px;">
							<span style="margin-left:20px;color:red;" id="info"></span>
						</div>
					</div>
					<div class="distanceTop20 confirmPrcdiv" style="float:none;">
						<button id="upload">上传</button>
						<button id="supBack" data-dismiss="modal">返回</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>