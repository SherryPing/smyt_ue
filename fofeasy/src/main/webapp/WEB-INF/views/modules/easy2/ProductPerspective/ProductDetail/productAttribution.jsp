<!-- easy2.0归因分析.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
	<section id="attributionAnalysis">
		<div class="modal fade" id="fama" tabindex="-1" role="dialog"
			 aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog"
				 style="width:740px;margin:auto;margin-top:10%;">
				<div id="layer1"></div>
				<div id="onLoad"></div>
				<div class="modal-content" style="padding: 30px;">
					<div style="text-align:center;font-size:14px;font-weight:600;color: #000;">
						<span>FAMA三因子模型说明</span>
					</div>
					<div class="fama">
						<div>
							<img src="${ctxResources}/images/fama-text0.jpg">
						</div>
						<div>
							<img src="${ctxResources}/images/fama-text2.jpg">
						</div>
						<div>
							<img src="${ctxResources}/images/fama-text3.jpg">
						</div>
						<div>
							<img src="${ctxResources}/images/fama-text4.jpg">
						</div>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<div class="tab-level2" id="tabs">
			<ul>
				<li class="active" data-id="tab2" >夏普模型</li>
				<li class="" data-id="tab1" >三因子模型</li>
			</ul>
		</div>
		<%--夏普模型tab--%>
		<div id="tab2">
			<div class="infoTitle">
				<div class="introducTitle"></div>
				<div class="titleTxt">
					<span>仓位、风格模拟</span>
					<span style="color:black">统计日期：
						<i id="addDay1">----</i>
					</span>
				</div>
			</div>
			<div class="halfChar" style="margin-top: 40px;border-right:1px solid #DDDDDD">
				<div class="comment">
					<span style="margin-left:10px">大累资产占比情况</span>
				</div>
				<div class="schartContent" style="height: 310px;"  id="hidden1">
					<p class='tip' style='color: #7c7c7c;position:relative;top: 50%;text-align: center;'>数据加载中，请稍等......</p>
				</div>
				<div class="halfChar" style="margin-top: 0px;width:100%;display:none">
					<div class="bchartContent momchoiceDiv"
						 style="width: 100%;margin:0 auto;" id="shapeRound1"></div>
				</div>
			</div>
			<div class="halfChar" style="margin-top: 40px;">
				<div class="comment">
					<span style="margin-left:10px">风格因子占比情况</span>
				</div>
				<div class="schartContent" style="height: 310px;" id="hidden2">
					<p class='tip' style='color: #7c7c7c;position:relative;top: 50%;text-align: center;'>数据加载中，请稍等......</p>
				</div>
				<div class="halfChar" style="margin-top: 0px;width:100%;display:none">
					<div class="bchartContent momchoiceDiv"
						 style="width: 100%;margin:0 auto;" id="shapeRound2"></div>
				</div>
			</div>
			<div class="halfChar" style="margin-top: 40px;width:100%" id="main-grid1-group">
				<div class="comment">
					<span style="margin-left:10px">拟合优度（R-Square）：<span id="square1">0</span></span>
				</div>
				<%--<div class="schartContent" id="" style="height: 310px;">--%>
				<%--<p class='tip' style='color: #7c7c7c;position:relative;top: 50%;text-align: center;'>数据加载中，请稍等......</p>--%>
				<%--</div>--%>
				<table class="indicatorsTbl positionsTbl2 dataTable height360 border2" id="main-grid1" style="">
				</table>
			</div>
			<div id="" class="assetAllocation" style="border-width:0px">
				<div id="simulation">
					<div class="infoTitle" style="margin-top:200px">
						<div class="introducTitle"></div>
						<div class="titleTxt">
							<span>行业模拟</span>
							<span style="color:black">统计日期：
							<i id="addDay2">----</i>
						</span>
						</div>
					</div>
					<div class="halfChar" style="margin-top: 40px;width:100%;height:500px">
						<div style="width:100%;height:100%;margin-left:auto;margin-right:auto;border-bottom:1px dashed #DDDDDD">
							<div style="height:100%;width:33%;margin:0;float:left">
								<div class="schartContent" id="hidden3" style="height: 310px;">
									<p class='tip' style='color: #7c7c7c;position:relative;top: 50%;text-align: center;'>数据加载中，请稍等......</p>
								</div>
								<div id="industry1" style="display:none"></div>
							</div>
							<div style="height:100%;width:33%;margin:0;float:left">
								<div class="schartContent" id="hidden4" style="height: 310px;">
									<p class='tip' style='color: #7c7c7c;position:relative;top: 50%;text-align: center;'>数据加载中，请稍等......</p>
								</div>
								<div id="industry2" style="display:none"></div>
							</div>
							<div style="height:100%;width:33%;margin:0;float:left">
								<div class="schartContent" id="hidden5" style="height: 310px;">
									<p class='tip' style='color: #7c7c7c;position:relative;top: 50%;text-align: center;'>数据加载中，请稍等......</p>
								</div>
								<div id="industry3" style="display:none"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="halfChar" style="margin-top: 40px;width:100%;" id="main-grid2-group">
					<div class="comment">
						<span style="margin-left:10px">拟合优度（R-Square）：<span id="square2">0</span></span>
					</div>
					<%--<div class="schartContent" id="" style="height: 310px;">--%>
					<%--<p class='tip' style='color: #7c7c7c;position:relative;top: 50%;text-align: center;'>数据加载中，请稍等......</p>--%>
					<%--</div>--%>
					<table class="indicatorsTbl positionsTbl2 dataTable height360 border2" id="main-grid2" style="">
					</table>
				</div>
			</div>
		</div>
		<div id="tab1" style="display:none">
			<div class="infoTitle">
				<div class="introducTitle"></div>
				<div class="titleTxt">
					<span>收益贡献分解</span>
				</div>
			</div>
			<div class="comment" id="income-comment">
				<span>从外部归因来看，<span id="starDate1"></span> 至 <span id="endDate1"></span><span id="fundName">该基金</span>获得<span id="com-data1"></span>平均超额收益率（周度），
					其中<span id="com-data2"></span>最大，推测该基金可能<span id="com-data3"></span>。</span>
			</div>
			<div class="halfChar" style="margin-top: 40px;">
				<div class="charHeader">
					<%--<div class="headerSright">--%>
						<%--<span class="charHeadtxt">统计日期：</span>--%>
						<%--<span class="charHeadtxt"><span id="starDate1"></span> 至 <span id="endDate1"></span></span>--%>
					<%--</div>--%>
					<div class="schartContent" id="returnsColumn" style="height: 310px;">
						<p class='tip' style='color: #7c7c7c;position:relative;top: 50%;text-align: center;'>数据加载中，请稍等......</p>
					</div>
				</div>
			</div>
			<div class="halfChar" id="returnsSpider" style="margin-top: 40px;">
				<p class='tip' style='color: #7c7c7c;position:relative;top: 50%;text-align: center;'>数据加载中，请稍等......</p>
			</div>
			<div class="infoTitle distanceTop20">
				<div class="introducTitle"></div>
				<div class="titleTxt">
					<span>风险贡献分解</span>
				</div>
			</div>
			<div class="comment">
				<span>该基金在此区间内方差（周度）为<span id="com-data4"></span>，其中暴露在<span id="com-data5"></span>风险最大。</span>
			</div>
			<div class="halfChar" style="margin-top: 40px;">
				<div class="charHeader">
					<%--<div class="headerSright">--%>
						<%--<span class="charHeadtxt">统计日期：</span>--%>
						<%--<span class="charHeadtxt"><span id="starDate2"></span> 至 <span id="endDate2"></span></span>--%>
					<%--</div>--%>
					<div class="schartContent" id="riskColumn" style="height: 310px;">
						<p class='tip' style='color: #7c7c7c;position:relative;top: 50%;text-align: center;'>数据加载中，请稍等......</p>
					</div>
				</div>
			</div>
			<div class="halfChar" id="riskSpider" style="margin-top: 40px;">
				<p class='tip' style='color: #7c7c7c;position:relative;top: 50%;text-align: center;'>数据加载中，请稍等......</p>
			</div>
			<div class="infoTitle distanceTop20">
				<div class="introducTitle"></div>
				<div class="titleTxt">
					<span>因子相关性</span>
				</div>
			</div>
			<div class="col-md-6" style="min-height:232px;">
				<div class="charHeader" style="margin-top:15px">
					<div class="headerSleft" style="margin-bottom: 30px;">
						<span class="charHeadtxt">统计日期：</span>
						<span class="charHeadtxt"><span id="starDate3"></span> 至 <span id="endDate3"></span></span>
					</div>
					<table id="fit" class="mainTbl" ></table>
					<div class="r_square">
						<span>拟合优度</span><span id="r_square"></span>
					</div>
					<%--<div class="schartContent distanceTop40" id="correlationTbl" style="height: 310px;padding-top:20px;min-width:400px;">--%>
					<%--</div>--%>
				</div>
			</div>
			<div class="col-md-6" style="padding-top:20px;color:black;">
				<div class="bigCharts border_none" id="correlationchart"
					 style="width:100%;height: 320px;">
					<p class='tip' style='color: #7c7c7c;position:relative;top: 50%;text-align: center;'>数据加载中，请稍等......</p>
				</div>
				<%--<table id="fit" class="mainTbl"></table>--%>
				<%--<div class="r_square">--%>
					<%--<span>拟合优度</span><span id="r_square"></span>--%>
				<%--</div>--%>
			</div>
			<div class="dshedLine ">

			</div>

			<div class="reportIndicators">
				<span data-toggle="modal" data-target="#fama"><span class="font-bold">三因子模型说明</span><img src="${ctxResources}/images/info_b.png" style="position: relative;top: -2px;left: 3px;width: 16px;height: 16px;" alt=""/></span><br><br>
					<span class="font-bold">友情提示：</span><br>
							<p>1、每个回归单位为6个月，新成立6个月内的基金不予进行回归计算</p>
							<p>2、净值披露不满24个数据，不予回归计算;</p>
							<p>3、假设投资经理6个月的产品操作风格保持不变。</p>
							<!-- <p>4、*，**，***分别代表在90%，95%，99%的置信度下统计显著。</p> -->
			</div>
		</div>
	</section>