<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>

<!-- 持仓分析.jsp -->

<div id="position">

	<!-- 标签选项卡 -->
	<ul class="nav nav-tabs" role="tablist">
		<li role="presentation" class="active"><a href="#asset"
			role="tab" data-toggle="tab"><i
				class="glyphicon glyphicon-bookmark" aria-hidden="true"></i> 资产账户</a></li>
		<li role="presentation"><a href="#stock" aria-controls="stock"
			role="tab" data-toggle="tab"><i class="glyphicon glyphicon-btc"></i>
				股票资产</a></li>
	</ul>

	<!-- 标签窗口 -->
	<div class="tab-content option-div">
		<!--资产账户-开始-->
		<div role="tabpanel" class="tab-pane fade in active" id="asset">
			<div class="">
				<div class="layui-form-pane" style="margin-top: 15px;">
					<div class="layui-form-item">
						<label class="layui-form-label"
							style="width: 100px; margin-right: 15px;">统计区间</label> <span
							class="layui-input-inline"> <input
							class="form-control cdata" placeholder="开始日期" name="date_start"
							readonly>
						</span> <span class="layui-input-inline"> <input
							class="form-control cdata" placeholder="结束日期" name="date_end"
							readonly>
						</span>
						<button class="performanceAlsbtn" style="margin-left: 15px;"
							name="btnOK">确定</button>

						<label style="margin-left: 400px;">统计日期：<span
							id="assetStatisticsDate"></span></label>
					</div>
				</div>
				<div class="panel panel-default option-bg-top" style="margin:0;">
					<div class="panel-body ">${feFundInfoDto.fund_name }区间大类资产配置时序图</div>
				</div>
				<div id="assetAccountGrid" style="height: 550px;"></div>
			</div>
			<div>
				
				<table class="table table-hover table-striped option-table performanceAlstbl"
					id="assetAccountTab" data-toggle="assetAccountTab">
				</table>
				
			</div>


		</div>
		<!--资产账户-结束-->

		<!--股票资产-开始-->
		<div role="tabpanel" class="tab-pane fade" id="stock">
			<!--股票资产-top开始-->
			<div id="stock-top">
				<div id="stock-top-left" class="pull-left">
					<form class="form-inline form-line" action="javascript:void(0)"
						id="stock-top-form">
						<div class="layui-form-item">
							<label class="layui-form-label"
								style="width: 100px; margin-right: 15px;">统计区间</label> <span
								class="layui-input-inline"> <input
								class="form-control cdata" placeholder="开始日期" name="date_start"
								readonly></span> <span class="layui-input-inline"> <input
								class="form-control cdata" placeholder="结束日期" name="date_end"
								readonly></span>
							<button class="performanceAlsbtn" style="margin-left: 15px;"
								name="btnOK">确定</button>
						</div>
						<br />
						<div>
							<label>统计维度：</label> <input type="radio" name="optionsRadios"
								value="1"> 资产净资产 &nbsp;&nbsp;&nbsp;&nbsp; <input
								type="radio" name="optionsRadios" value="2" checked>
							股票资产
						</div>
					</form>
				</div>
				<div id="stock-top-rigth" class="pull-rigth">
					<ul class="nav navbar-nav navbar-right pull-right">
						<li class=""><a href="#"> <img
								src="${ctxResources}/images/position_stock-ui1.png">
								<div>行业分析</div>
						</a></li>
						<li class=""><a href="#"> <img
								src="${ctxResources}/images/position_stock-ui2.png">
								<div>市值分析</div>
						</a></li>
						<li><a href="#"> <img
								src="${ctxResources}/images/position_stock-ui3.png">
								<div>股票分析</div>
						</a></li>

					</ul>
				</div>
			</div>
			<!--股票资产-top结束-->
			<!--股票资产-Main开始-->
			<div id="stock-main">
				<!--行业分析-->
				<div id="main-industry" class="">
					<div class="panel panel-default option-bg-top" style="margin-top:120px;margin-left:0px;">
						<div class="panel-body ">${feFundInfoDto.fund_name }股票资产区间行业配置时序图</div>
					</div>
					<div id="stockIndustryGrid" style="min-width: 600px;width:100%;height: 450px"></div>
					<table
						class="table table-hover table-striped option-table performanceAlstbl"
						id="stockIndustryTab">
					</table>
				</div>

				<!--市值分析-->
				<div id="main-marketvalue" class="hidden">
				<div class="panel panel-default option-bg-top" style="margin-top:120px;margin-left:0px;">
						<div class="panel-body ">${feFundInfoDto.fund_name }区间持仓市值时序图</div>
					</div>
					<div id="stockMarketValueGrid"
						style="min-width: 600px; height: 450px"></div>
					<table id="stockMarketValueTab"
						class="performanceAlstbl table table-hover table-striped option-table"></table>
					
				</div>

				<!--股票分析-->
				<div id="main-stock" class="hidden"  style="margin-top:120px;margin-left:0px;">
			
					
					<!--股票资料持股时序图-->
					<div>
						<div class="panel panel-default option-bg-top" style="margin-left:0px;">
							<div class="panel-body ">${feFundInfoDto.fund_name }区间持仓市值时序图</div>
						</div>
						<div id="stockAnalysisCentralizedGrid"
							style="min-width: 600px; height: 450px"></div>
					</div>
							<!-- 总体估值流动性 -->
					<div>
						<div class="panel panel-default option-bg-top clearfix" style="margin-left:0px;">
							<div class="panel-body">${feFundInfoDto.fund_name }期末总体估值与流动性</div>
						</div>
						统计日期：<span id='stockStatisticsDate'></span>
						<table id="stockAnalysisValuationTab" class="performanceAlstbl"></table>
					</div>
										<!--持股集中度-->
					<div>
						<div class="panel panel-default option-bg-top clearfix">
							<div class="panel-body">${feFundInfoDto.fund_name }持股集中度</div>
						</div>
						<br>
						<table id="stockAnalysisCentralizedTab" class="vertical-bar">
							<tr>
								<td>最大重仓股</td>
								<td><div style="background-color: #E60048;"></div>
									<span></span></td>
							</tr>
							<tr>
								<td>前两大重仓股</td>
								<td><div style="background-color: #736F63; "></div>
									<span></span></td>
							</tr>
							<tr>
								<td>前三大重仓股</td>
								<td><div style="background-color: #B294F4;"></div>
									<span></span></td>
							</tr>
							<tr>
								<td>前五大重仓股</td>
								<td><div style="background-color: #D3BF5C;"></div>
									<span></span></td>
							</tr>
							<tr>
								<td>前十大重仓股</td>
								<td><div style="background-color: #4174A3;"></div>
									<span></span></td>
							</tr>
						</table>
						<br> <br>
					</div>
					<!--组合风险-->
					<div>
						<div class="panel panel-default option-bg-top" style="margin-left:0px;">
							<div class="panel-body ">组合风险</div>
						</div>
						<table id="stockAnalysisPortfoliorisk" class='stock-analysis-tab'
							frame="void" border="2" align="center">
							<tr>
								<td><p>股票现货敞口（万元）</p> <br /> <span>17483.22</span></td>
								<td><p>股指期货敞口（万元）</p> <br /> <span>-2165.11</span></td>
							</tr>
							<tr>
								<td><p>净敞口（万元）</p> <br /> <span>19599.22</span></td>
								<td><p>组合beta</p> <br /> <span>0.86</span></td>
							</tr>
						</table>
						<table id="stockAnalysisVarTab" class="stock-table-default">

						</table>
						<br>
						<div
							style="margin: 10px auto; width: 90%; height: 450px; background-color: #F1F1F3">
							<div id="stockAnalysisVarGrid1" class="pull-left"
								style="min-width:400px;height:400px"></div>
							<div id="stockAnalysisVarGrid2" class="pull-left"
								style="min-width:400px;height:400px"></div>
						</div>
					</div>

					<!--交易类型占比-->
					<div>
						<div class="panel panel-default option-bg-top" style="margin-left:0px;">
							<div class="panel-body ">交易行为分析</div>
						</div>
						<div>
							<blockquote id="stockAnalysisChangeHands"
								class='blockquote-default'>
								<p>
									通过计算我们得到，在<span></span>期间，产品换手率为<span></span>，日均换手率<span></span>
								</p>
								<ul>
									<li><span>根据不同期限买入信号，计算自买入交易中趋势买入次数和反转买入次数比重，以及卖出交易中趋势卖出次数和反转卖出次数比重。</span></li>
									<li><span>信号：交易当日对应收盘均价超前一交易日收盘均价，当日为信号日。如：5日买入信号即交易当日的5日收盘均价超前一交易日的5日收盘均价,5日卖出信号即交易当日的5日收盘均价低于前一 交易日的5日收盘均价。</span></li>
									<li><span>趋势买入（卖出）：买入（卖出）交易发生在信号日</span></li>
								</ul>
							</blockquote>
						</div>
						<table id="stockAnalysisTransactions" class="stock-table-default"></table>
						<center>
							<div id="stockAnalysisTransactionsGrid1" class='pull-left' style="height: 400px;"></div>
							<div id="stockAnalysisTransactionsGrid2" class='pull-left' style="height: 400px;">
							</div>
						</center>
					</div>
				</div>
			</div>
			<!--股票资产-Main结束-->
		</div>
		<!--股票资产-结束-->

	</div>
</div>