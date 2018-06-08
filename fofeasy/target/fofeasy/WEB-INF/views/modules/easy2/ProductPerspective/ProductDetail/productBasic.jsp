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
								<td>发行方式：<span id="fund_type_issuance"></span></td>
							</tr>
							<tr>
								<td>成立日期：<span id="foundation_date1"></span></td>
							</tr>
							<tr>
								<td>结构形式：<span id="fund_type_structure"></span></td>
							</tr>
							<tr>
								<td>基金状态：<span id="fund_status"></span></td>
							</tr>
							<tr>
								<td>开放日：<span id="open_date"></span></td>
							</tr>
							<tr>
								<td>证券经纪：<span id="fund_stockbroker"></span></td>
							</tr>
							<tr>
								<td>认购费：<span id="fee_subscription"></span></td>
							</tr>
							<tr>
								<td>赎回费：<span id="fee_redeem"></span></td>
							</tr>
							<tr>
								<td>管理费：<span id="fee_manage"></span></td>
							</tr>
							<tr>
								<td>产品备案日期：<span id="reg_time"></span></td>
							</tr>
						</table>
							<table id="basicTbl2">
							<tr>
								<td>基金全称：<span id="fund_full_name"></span></td>
							</tr>
							<tr>
								<td>投资策略：<span id="fund_type_strategy"></span></td>
							</tr>
							<tr>
								<td>发行规模（亿元）：<span id="asset_scale"></span></td>
							</tr>
							<tr>
								<td>发行地区：<span id="region"></span></td>
							</tr>
							<tr>
								<td>基金到期日：<span id="fund_time_limit"></span></td>
							</tr>
							<tr>
								<td>净值日期：<span id="nav_date1"></span></td>
							</tr>
							<tr>
								<td>净值披露频率：<span id="data_freq"></span></td>
							</tr>
							<tr>
								<td>托管银行：<span id="fund_custodian"></span></td>
							</tr>
							<tr>
								<td>预期收益率：<span id="expected_return"></span></td>
							</tr>
							<tr>
								<td>托管费：<span id="fee_trust"></span></td>
							</tr>
							<tr>
								<td>业绩报酬：<span id="fee_pay"></span></td>
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