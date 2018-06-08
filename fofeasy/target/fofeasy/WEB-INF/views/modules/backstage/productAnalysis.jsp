<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!-- 
	产品分析 
	-->
	<div class="prctalHeader">
					<span>产品分析</span>
				</div>
				<div class="prcTablediv">
						<ul class="producTab">
							<li class="tblHeader"><span>2017-02-13至2017-03-14&nbsp;&nbsp;&nbsp;<img src="${ctxResources}/images/模块统计_03.png" alt=""></span><img class="downQuestion" src="${ctxResources}/images/admq1.png"><button class="downBtn">下载</button></li>
							<li>
								<div class="producTxt">序号</div>
								<div class="producTxt">产品名称</div>
								<div class="producTxt">被查询次数</div>
								<div class="producTxt">查询人数</div>
								<div class="producTxt">操作</div>
							</li>
							<li>
								<div class="producTxt">1</div>
								<div class="producTxt">量化1号</div>
								<div class="producTxt">156次</div>
								<div class="producTxt">60</div>
								<div class="producTxt moreDetails" data-toggle="collapse" data-parent="#accordion" 
				   href="#collapse1">详细</div>
							</li>
										<div id="collapse1" class="panel-collapse collapse">
											<div class="panel-body" id="productDetails">
											</div>
										</div>
							<li><div class="producTxt">2</div>
								<div class="producTxt">量化2号</div>
								<div class="producTxt">120次</div>
								<div class="producTxt">60</div>
								<div class="producTxt moreDetails" data-toggle="collapse" data-parent="#accordion" 
				   href="#collapse2">详细</div></li>
							   <div id="collapse2" class="panel-collapse collapse">
														<div class="panel-body">
															Nihil anim keffiyeh helvetica, craft beer labore wes anderson 
															cred nesciunt sapiente ea proident. Ad vegan excepteur butcher 
															vice lomo.
														</div>
													</div>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
						</ul>
				</div>