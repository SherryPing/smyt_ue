<!--尽调评价归因分析.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
	<section id="attributionAnalysis">
		<div class="infoTitle distanceTop20">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>收益贡献分解</span>
							</div>
						</div>
						<div class="halfChar">
							<div class="charHeader">
								<div class="headerSright">
									<span class="charHeadtxt">统计日期：</span>
									<span class="charHeadtxt"><span id="starDate1"></span> 至 <span id="endDate1"></span></span>
								</div>
								<div class="schartContent" id="returnsColumn" style="height: 310px;">

								</div>
							</div>
						</div>
						<div class="halfChar" id="returnsSpider">
							
						</div>
						<div class="infoTitle distanceTop20">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>风险贡献分解</span>
							</div>
						</div>
						<div class="halfChar">
							<div class="charHeader">
								<div class="headerSright">
									<span class="charHeadtxt">统计日期：</span>
									<span class="charHeadtxt"><span id="starDate2"></span> 至 <span id="endDate2"></span></span>
								</div>
								<div class="schartContent" id="riskColumn" style="height: 310px;">

								</div>
							</div>
						</div>
						<div class="halfChar" id="riskSpider">
							
						</div>
						<div class="infoTitle distanceTop20">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>因子相关性</span>
							</div>
						</div>
						<div class="col-md-6">
							<div class="charHeader">
								<div class="headerSleft">
									<span class="charHeadtxt">统计日期：</span>
									<span class="charHeadtxt"><span id="starDate3"></span> 至 <span id="endDate3"></span></span>
								</div>
								<div class="schartContent distanceTop40" id="correlationTbl" style="height: 310px;padding-top:20px;min-width:400px;">
								</div>
							</div>
						</div>
						<div class="col-md-6" style="padding-top:40px;color:black;">
							<div style="text-align:center;font-size:15px;font-weight:500;">
								<span>股多头策略基金的FAMA三因子模型说明</span>
							</div>
							<div>
								<div><div class="dianBlack"></div><span class="factorDescriptiontxt">  股票样本选取</span></div>
									<p class="textleft20">采用沪深全部A股的周度数据（每周五），其中剔除ST股及金融股。</p>
								<div><div class="dianBlack"></div><span class="factorDescriptiontxt">  因子构造方法</span></div>
									<p class="textleft20">按照流通市值的中位数将股票样本划分为小规模(S)和大规模(B)两类，再按照账面市值比从高到低排序后分为三组，前30%为高账面市值比(H)，后30%为低账面市值比(L)，中间40%为中等账面市值比(M)，共得到六个组合，在每周五按照流通市值加权平均，求得规模因子收益率和价值因子收益率。</p>
								<div><div class="dianBlack"></div><span class="factorDescriptiontxt"> 三因子模型</span></div>
									<p class="textleft20">r_it-r_ft=α_i+β_im (r_mt-r_ft )+β_is 〖SMB〗_t+β_ih 〖HML〗_t+ε_it</p>
									<p class="textleft20">其中，r_it为投资组合i的收益率；r_ft为t时刻的一年期国债利率，α_i为投资组合i的超额收益率，r_mt为沪深300指数的收益率，〖SMB〗_t为规模因子，〖HML〗_t为价值因子。</p>
								<div style="margin-left:20px;">
									<div><div class="dianBlack"></div><span class="factorDescriptiontxt">  规模因子〖SMB〗</span></div>
									<p class="textleft20">衡量了由于上市公司规模不同导致的收益率差异。即小规模公司平均收益率与大规模公司平均收益率之间的差额。</p>
									<div><div class="dianBlack"></div><span class="factorDescriptiontxt">  价值因子〖HML〗</span></div>
									<p class="textleft20">衡量了由于上市公司账面市值比不同导致的收益率差异。HML𝑡是高账面市值比公司的平均收益率与低账面市值比公司平均收益率的差额。</p>
									<div><div class="dianBlack"></div><span class="factorDescriptiontxt">  市场因子 r_mt-r_ft</span></div>
									<p class="textleft20">沪深300指数的收益率与一年期国债利率的差额。</p>
								</div>
								<div><div class="dianBlack"></div><span class="factorDescriptiontxt">  收益贡献分解</span></div>
									<p class="textleft20">采取结构化因子模型求解因子收益贡献。</p>
								<div><div class="dianBlack"></div><span class="factorDescriptiontxt">  风险贡献分解</span></div>
									<p class="textleft20">采取结构化因子模型求解因子的风险贡献。</p>			
								</div>
						</div>
						<div class="dshedLine ">
							
						</div>
						<div class="reportIndicators">
								<span>友情提示：</span><br>
										<p>1、每个回归单位为6个月，新成立6个月内的基金不予进行回归计算</p>
										<p>2、净值披露不满24个数据，不予回归计算;</p>
										<p>3、假设投资经理6个月的产品操作风格保持不变。</p>
										<!-- <p>4、*，**，***分别代表在90%，95%，99%的置信度下统计显著。</p> -->
						</div>
	</section>