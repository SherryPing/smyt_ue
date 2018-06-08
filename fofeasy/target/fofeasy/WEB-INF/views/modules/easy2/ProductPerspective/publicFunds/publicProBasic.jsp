<!-- easy2.0基本信息.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
			<div class="row">
				<div class="col-md-12">
					<div id="basicInfo" class="distanceTop">
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>基本信息</span>
							</div>
						</div>
						<table id="basicTbl1">
							<tr>
								<td>基金简称：<span id="fundName"></span></td>
							</tr>
							<tr>
								<td>基金公司：<span id="orgName"></span></td>
							</tr>
							<tr>
								<td>基金类型：<span id="fundType"></span></td>
							</tr>
							<tr>
								<td>成立规模：<span id="init_raise"></span></td>
							</tr>
							<tr>
								<td>申购状态：<span id="purchase_status"></span></td>
							</tr>
							<tr>
								<td>业绩比较基准：<span id="comparison_criterion"></span></td>
							</tr>
							<tr>
								<td>申购费：<span id="fee_purchase"></span></td>
							</tr>
							<tr>
								<td>管理费：<span id="fee_manage"></span></td>
							</tr>
						</table>
							<table id="basicTbl2">
							<tr>
								<td>基金全称：<span id="fund_full_name"></span></td>
							</tr>
							<tr>
								<td>基金经理：<span id="person_info"></span></td>
							</tr>
							<tr>
								<td>成立日期：<span id="foundation_date1"></span></td>
							</tr>
							<tr>
								<td>最新规模：<span id="total_asset"></span></td>
							</tr>
							<tr>
								<td>赎回状态：<span id="redemption_status"></span></td>
							</tr>
							<tr>
								<td>跟踪标的：<span id="tracking_benchmark"></span></td>
							</tr>
							<tr>
								<td>赎回费：<span id="fee_redeem"></span></td>
							</tr>
							<tr>
								<td>托管费：<span id="fee_trust"></span></td>
							</tr>
						</table>
					</div>
					<div id="managerInfo">
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>投资经理简介</span>
							</div>
						</div>
						<div id="infoDetail" class="infoDetail">
					
						</div>
					</div>
					<div id="companyInfo">
						<div class="infoTitle">
							<div class="introducTitle"></div>
							<div class="titleTxt">
								<span>投资顾问简介</span>
							</div>
						</div>
						<img src="${ctxResources}/images/companyinfo.png" class="companyImg">
						<div class="companyInfotxt">
							<span id="proFile">
							
							</span>
						</div>
					</div>
			</div>
		</div>