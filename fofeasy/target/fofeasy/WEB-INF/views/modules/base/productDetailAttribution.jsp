<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>

<!-- 归因分析.jsp -->

<section id="resonAnalysis">
	<!-- 标签选项卡 -->
	<ul id="myTabs" class="nav nav-tabs resonUl1" role="tablist">
		<li role="presentation" class="active"><a href="#asset"
			aria-controls="home" role="tab" data-toggle="tab">资产账户</a></li>
		<li role="presentation"><a href="#profile"
			aria-controls="profile" role="tab" data-toggle="tab">股票资产</a></li>
	</ul>

	<!-- 标签窗口 -->
	<div id="myTabs1" class="tab-content tabDiv">
		<!-- 资产账户 -->
		<div role="tabpanel" class="tab-pane fade in active" id="asset">
			<!--  单选按钮，选择规格 -->
			<div id="assetAcount">
				<br />
				<div class="acountSpac attributionmode">
					<span data-toggle='popover' data-placement='auto right' data-content='注：归因分析采用Brinson模型，其中单期归因的权重选择上区间末的资产权重，多期归因的权重每期都会根据实际持仓数据重新归一化。因此对于可以获取日度持仓数据的产品，建议使用每日频持仓数据进行多期业绩归因。'data-trigger='hover'>归因方式*：</span> <label><input
						name="assetAttributionmode" value="single" checked="checked"
						type="radio">单期</label> <label><input class="morePeriod"
						name="assetAttributionmode" value="multi" type="radio">多期</label>
				</div>
				<div id="assetbenchmarkrdos" class="acountSpac">
					<span>基准选择：</span> <label><input name="atBenchmarkRdo"
						type="radio" value='hs300' checked="checked">沪深300</label> <label><input
						name="atBenchmarkRdo" type="radio" value='csi500'>中证500</label> <label><input
						name="atBenchmarkRdo" type="radio" value='cbi'>中债指数</label> <label><input
						name="atBenchmarkRdo" type="radio" value='sse50'>上证50</label> <label><input
						name="atBenchmarkRdo" type="radio" value='nfi'>南华商品指数</label> <label><button
							id="assetCust" class="easy1Btn" style="margin-left:20px;">自定义</button></label>
				</div>
				<div class="acountSpac">
					<span>统计区间：</span> <input class="form_date cdata" size="16"
						type="text" name="date_start" readonly>&nbsp;&nbsp;&nbsp;至
					<input class="form_date cdata" size="16" type="text"
						name="date_end" readonly>
					<button class="performanceAlsbtn"
						style="top:0px;margin-left:100px;">确定</button>
				</div>
				<div class="statisticFrequencys acountSpac hidden">
					<span>统计频率：</span> <label><input name="statisticFrequency"
						value='d' type="radio">日度</label> <label><input
						name="statisticFrequency" value='w' type="radio" checked="checked">周度</label>
					<label><input name="statisticFrequency" value='m'
						type="radio">月度</label> <label><input
						name="statisticFrequency" value='q' type="radio">季度</label>
				</div>
				<ul class="incomeTab" style="display:none;">
				<li class="active">汇总</li>
				<li>明细</li></ul><br><br>
				<!-- 参考基准的收益率 -->
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<i class="glyphicon glyphicon-calendar"></i>&nbsp;&nbsp; <span
					id='assetFrequency'></span><br>
				<br>
				<div class="assetTab">
					<table id="assetReferenceBenchmarkYields" class="refDatum table-striped performanceAlstbl"></table>
				</div>
				<div class="assetTab hidden">
					<table id="assetReferenceBenchmarkYields2" class="refDatum table-striped performanceAlstbl  "></table>
				</div>
				<div class="panel panel-default option-bg-top">
					<div class="panel-body ">资产账户——单期归因</div>
				</div>
				<!-- 超额收益率&归因分析 -->
				<div class="attribution-with-single-asset-accounts">
					<table id="assetExcessEarningsTab"
						class="pull-left attribution-stock-tab" border="0">
						<tr>
							<td colspan="2">超额收益</td>
						</tr>
						<tr>
							<td colspan="2">
								<hr />
							</td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td colspan="2">
								<hr />
							</td>
						</tr>
					</table>
					<table id='assetAttributionAnalysisTab'
						class="attribution-stock-tab" border="0">
						<tr>
							<td colspan="2">归因分析</td>
						</tr>
						<tr>
							<td colspan="2">
								<hr />
							</td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td colspan="2">
								<hr />
							</td>
						</tr>
					</table>
				</div>
				<div class="dataTble">
					<span>归因贡献比较：</span><br> <br>
					<div id="assetAttributionComparison"
						style="height: 400px;width: 80%" class="attContbl"></div>
				</div>
				<br>
				<br>
				<br>
				<br>
				<br>
				<div class="divHr"></div>
				<br>
				<div class="panel panel-default option-bg-top">
					<div class="panel-body ">资产账户——单期归因</div>
				</div>
				<div id="assetSinglePeriodAttribution"
					style="height: 400px;width: 80%"></div>
				<div class="divHr"></div>
				<br>
				<br> <br>
				<div class="dataTble">
					<span>仓位控制</span><br> <br>
					<div id="assetPositionControl" style="height: 400px;width: 80%"></div>
				</div>
			</div>
		</div>
		<!-- 股票资产 -->
		<div role="tabpanel" class="tab-pane fade" id="profile">
			<br>
			<div class="acountSpac attributionmode">
				<span data-toggle='popover' data-placement='auto right' data-content='注：归因分析采用Brinson模型，其中单期归因的权重选择上区间末的资产权重，多期归因的权重每期都会根据实际持仓数据重新归一化。因此对于可以获取日度持仓数据的产品，建议使用每日频持仓数据进行多期业绩归因。'data-trigger='hover'>归因方式*：</span> <label><input name="stockAttributionmode"
					value="single" checked="checked" type="radio" id="stand_alone" >单期</label>
				<label><input name="stockAttributionmode" value="multi"
					type="radio" id="multi_phase">多期</label>
			</div>
			<div class="acountSpac">
				<span>统计区间：</span> <input class="form_date cdata" size="16"
					type="text" name="date_start" readonly>&nbsp;&nbsp;&nbsp;至
				<input class="form_date cdata" size="16" type="text" name="date_end"
					readonly>
				<button class="performanceAlsbtn" style="top:0px;margin-left:100px;">确定</button>
			</div>
			<div class="statisticFrequencys acountSpac hidden">
				<span>统计频率：</span> <label><input
					name="stoStatisticFrequency" value='d' type="radio">日度</label> <label><input
					name="stoStatisticFrequency" value='w' type="radio"
					checked="checked">周度</label> <label><input
					name="stoStatisticFrequency" value='m' type="radio">月度</label> <label><input
					name="stoStatisticFrequency" value='q' type="radio">季度</label>
			</div>
			<br> <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<ul class="incomeTab" style="display:none;">
				<li class="active">汇总</li>
				<li>明细</li>

			</ul>
			<%--汇总--%>
			<div class="earningDiv" id="summarizing">
				<i class="glyphicon glyphicon-calendar"></i>&nbsp;&nbsp; <span
					id='phaseFrequency2'></span><br>
				<br>
				<table id="stockReferenceBenchmarkYields2"
					   class="table table-hover table-striped option-table performanceAlstbl"></table>
			</div>
			<%--明细--%>
			<div class="earningDiv" id="particulars"  style="display:none;">
				<i class="glyphicon glyphicon-calendar"></i>&nbsp;&nbsp; <span
					id='phaseFrequency'></span><br>
				<br>
				<table id="stockReferenceBenchmarkYields"
					class="table table-hover table-striped option-table performanceAlstbl"></table>
			</div>

			<div class="panel panel-default option-bg-top pull-left">
				<div class="panel-body">股票账户——单期归因</div>
			</div>
			<!-- 超额收益率&归因分析 -->
			<div class="attribution-with-single-asset-accounts">
				<table id="stockExcessEarningsTab"
					class="pull-left attribution-stock-tab" border="0">
					<tr>
						<td colspan="2">超额收益</td>
					</tr>
					<tr>
						<td colspan="2">
							<hr />
						</td>
					</tr>
					<tr>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td colspan="2">
							<hr />
						</td>
					</tr>
				</table>
				<table id='stockAttributionAnalysisTab'
					class="attribution-stock-tab">
					<tr>
						<td colspan="2">归因分析</td>
					</tr>
					<tr>
						<td colspan="2">
							<hr />
						</td>
					</tr>
					<tr>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td colspan="2">
							<hr />
						</td>
					</tr>
				</table>
			</div>
			<div class="dataTble">
				<span>归因贡献比较：</span><br> <br>
				<div id="stockAttributionComparison"
					style="height: 400px;width: 80%" class="attContbl"></div>
			</div>
			<br> <br> <br> <br> <br>
			<div class="divHr"></div>
			<br>
			<div class="panel panel-default option-bg-top">
				<div class="panel-body ">股票账户——单期归因</div>
			</div>

			<div id="stockSinglePeriodAttribution"
				style="height: 400px;width: 80%"></div>
			<div id='stockSWSPeriodAttributionDiv' class='hidden'>
				<select class="form-control Industry"></select>
				<div id="stockSWSPeriodAttribution" style="height: 400px;width: 80%"></div>
			</div>

			<div class="divHr"></div>
			<br>
			<br> <br>
			<div class="dataTble">
				<span>仓位控制</span><br>
				<br>
				<div id="stockPositionControl" style="height: 400px;width: 80%"></div>
			</div>
		</div>
	</div>
</section>


<!-- 基准自定义 -->
<section id="customization" style="margin:30px 20px;" class='hidden'>
	<from id='benchmarkFrm' action='#'>
	<div id="customDiv">
		<br>
		<div class="customTitle">
			<span>综合指数名称：</span> <input type="text" id='conindexName'
				name="conindexName" class="indexName">
		</div>
		<br>
		<br>
		<br>

		<div class="layui-form-pane">
			<div class="layui-form-item">
				<span style="float:left;margin-top:10px;">统计区间选择：</span> <span
					class="layui-input-inline"> <input
					class="form-control form_date cdata" style="height:34px;"
					placeholder="开始日期" name="date_start" readonly></span> <span
					class="layui-input-inline"> <input
					class="form-control form_date cdata" style="height:34px;"
					placeholder="结束日期" name="date_end" readonly></span>
			</div>
		</div>
		<div class="customTitle">
			<span>指数成分：</span> <a href="#">模板下载</a>
		</div>
	</div>
	<br>
	<table id="sliderTab" class='pull-left'>
		<tr>
			<td>
				<div class="sliderCompany">
					<span class="spanCompany">股票:</span>
				</div>
			</td>
			<td>
				<div id="stockSlcdiv">
					<button class="stockSlcbtn" data-id="hs300">沪深300</button>
					<button class="stockSlcbtn" data-id="csi500">中证500</button>
					<button class="stockSlcbtn" data-id="sse50">上证50</button>
					<label for="stockImport">导入+</label><input id="stockImport"
						type="file" name="security">
				</div>
				<div class="main">
					<div class="sliderPerinp">
						<input class="sliderInp" type="number" disabled="disabled"
							id='showArea1' name="security" />%
					</div>
					<div class="control-group">
						<div class="scroll-bar" id="scroll-bar1">
							<div class="entire-bar" id="entire-bar1"></div>
							<div class="action-bar" id="action-bar1"></div>
							<div class="action-block" id="action-block1"></div>
						</div>
					</div>
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<div class="sliderCompany">
					<span class="spanCompany">债券:</span>
				</div>
			</td>
			<td>
				<div style="height:30px;">
					<button class="stockSlcbtn" data-id="cbi">中债指数</button>
					<label for="bondsImport">导入+</label><input id="bondsImport"
						type="file" name="bond">
				</div>
				<div class="main">
					<div class="sliderPerinp">
						<input class="sliderInp" type="number" disabled="disabled"
							id='showArea2' name="bond" />%
					</div>
					<div class="control-group">
						<div class="scroll-bar" id="scroll-bar2">
							<div class="entire-bar" id="entire-bar2"></div>
							<div class="action-bar" id="action-bar2"></div>
							<div class="action-block" id="action-block2"></div>
						</div>
					</div>
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<div class="sliderCompany">
					<span class="spanCompany">期货:</span>
				</div>
			</td>
			<td>
				<div style="height:30px;">
					<button class="stockSlcbtn" data-id="nfi">南华商品指数</button>
					<label for="futureImport">导入+</label><input id="futureImport"
						type="file" name="future">
				</div>
				<div class="main">
					<div class="sliderPerinp">
						<input class="sliderInp" type="number" disabled="disabled"
							id='showArea3' name="future" />%
					</div>
					<div class="control-group">
						<div class="scroll-bar" id="scroll-bar3">
							<div class="entire-bar" id="entire-bar3"></div>
							<div class="action-bar" id="action-bar3"></div>
							<div class="action-block" id="action-block3"></div>
						</div>
					</div>
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<div class="sliderCompany">
					<span class="spanCompany">基金:</span>
				</div>
			</td>
			<td>
				<div style="height:30px;">
					<label for="bondsImport">导入+</label><input id="bondsImport"
						type="file" name="fund">
				</div>
				<div class="main">
					<div class="sliderPerinp">
						<input class="sliderInp" type="number" disabled="disabled"
							id='showArea4' name="fund" />%
					</div>
					<div class="control-group">
						<div class="scroll-bar" id="scroll-bar4">
							<div class="entire-bar" id="entire-bar4"></div>
							<div class="action-bar" id="action-bar4"></div>
							<div class="action-block" id="action-block4"></div>
						</div>
					</div>
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<div class="sliderCompany">
					<span class="spanCompany">现金:</span>
				</div>
			</td>
			<td>
				<div style="height:30px;">

					<label for="bondsImport">导入+</label><input id="bondsImport"
						type="file" name="cash">
				</div>
				<div class="main">
					<div class="sliderPerinp">
						<input class="sliderInp" type="number" disabled="disabled"
							id='showArea5' name="cash" />%
					</div>
					<div class="control-group">
						<div class="scroll-bar" id="scroll-bar5">
							<div class="entire-bar" id="entire-bar5"></div>
							<div class="action-bar" id="action-bar5"></div>
							<div class="action-block" id="action-block5"></div>
						</div>
					</div>
				</div>
			</td>
		</tr>
	</table>
	<div id="benchmarkGrid" class='pull-left'
		style="width: calc(100% - 580px);height: 600px;min-width:400px;">
	</div>
	</from>
	<div id="footBtndiv">
		<button id="previewBtn">预览</button>
		<button id="sureBtn">确定</button>
		<button id="customBack">返回</button>
	</div>

</section>