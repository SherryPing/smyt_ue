<!-- 自主管理——组合调仓.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
		<section id="fundPor" style="margin-top: 0px;">
			<div class="row">
				<div class="col-md-12">
					<!-- 基金组合 -->
					<div id="portfolioFund">

						<div class="tblContent">
							<table class="leftTbl">
								<thead>
									<tr>
										<th>基金ID</th>
										<th>基金简称</th>
										<th>投资策略</th>
										<th>最新净值</th>
										<th>买入金额（万）</th>
										<th>购买日期</th>
										<th>市值（万）</th>
										<th>投资占比</th>
									</tr>
								</thead>
								<tbody>
								<tr>
									<td>H000213</td>
									<td colspan="7"></td>
								
								</tr>
								<tr>
									<td colspan="8"></td>

								</tr>
								<tr>
									<td colspan="8"></td>

								</tr>
								<tr>
									<td colspan="8"></td>

								</tr>
								<tr>
									<td colspan="8"></td>

								</tr>
								<tr>
									<td colspan="8"></td>
	
								</tr>
							</tbody>
							</table>
							<table class="rightTbl">
								<thead>
									<tr>
										<th colspan="2"><span>调仓变动</span></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><span>调仓类型：</span></td><td><select><option>申购</option></select></td>
									</tr>
									<tr>
										<td><span>调仓日期：</span></td>
										<td>
											<div class="dataDiv" style="width: 160px;">
												<input class="form_date" type="text" name="">
												<img src="${ctxResources}/images/data1.png" style="float: right;margin-right: 5px;">
											</div>
										</td>
									</tr>
									<tr>
										<td><span>买入金额：</span></td><td><input type="number" name=""></td>
									</tr>
									<tr>
										<td><span>买入份额：</span></td><td><input type="number" name=""></td>
									</tr>
									<tr>
										<td colspan="2" class="mindBtn"><button class="easy2Btn">确认</button><button class="easy2Btn">重置</button></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</section>