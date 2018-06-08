<!-- easy2.0基本信息.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<div class="row">
	<div class="col-md-12">
		<div class="col-md-6" style="padding-right:30px;">
			<div class="infoTitle">
				<div class="introducTitle"></div>
				<div class="titleTxt">
					<span>产品分布</span>
				</div>
			</div>
			<div class="schartContent border distanceTop20 height300"
				id="prcdistribChart"></div>
		</div>
		<div class="col-md-6">
			<div class="infoTitle">

				<div class="introducTitle"></div>
				<div class="titleTxt">
					<span>投顾收益率</span>
					<div id="org_return_btn" class="pull-right">
						<span style="font-weight:500;top:0px;">统计区间：</span>
						<button id="2017" class="statisticalInterval1 selectBtn ">今年以来</button>
						<button id="2016" class="statisticalInterval1 selectBtn activeBtn">2016年</button>
						<button id="2015" class="statisticalInterval1 selectBtn">2015年</button>
					</div>
				</div>

			</div>
			<div class="schartContent border distanceTop20 height300"
				id="castYield"></div>
		</div>
		<div class="col-md-6" style="padding-right:30px;">
			<div class="infoTitle">
				<div class="introducTitle"></div>
				<div class="titleTxt">
					<span>同规模投顾排名</span>
					<span class="static_date black mleft20"></span>
				</div>
			</div>
			<div style="margin-top:20px;float: left;width: 100%;">
				<button class="samescalerank selectBtn activeBtn left20" data-id="issue">自主发行</button>
				<button class="samescalerank selectBtn" data-id="consultant">顾问管理</button>
			</div>
			<div class="schartContent height300" style="margin-top: 14px;">
				<table class="indicatorsTbl dataTable" id="samescaleTbl" data-height=300 style="border: 1px solid #ddd;height: 257px;">
				</table>
			</div>
		</div>
		<div class="col-md-6">
			<div class="infoTitle">
				<div class="introducTitle"></div>
				<div class="titleTxt">
					<span>战胜同规模投顾比例</span>
				</div>
			</div>
			<div class="schartContent border distanceTop20 height300">
				<div class="charHeader" id="tableHead">
					<div class="headerSright">
						<select id='similarRankingsSlc' class="form-control">
							<option id="year">今年以来</option>
							<option id="m3">近三个月</option>
							<option id="m6">近六个月</option>
							<option id="y1">近一年</option>
						</select>
					</div>
				</div>
				<div class="schartContent" id="samescaleCharts" ></div>
			</div>
		</div>
		<div id="managerInfo" style="padding-right:15px;">
			<div class="infoTitle">
				<div class="introducTitle"></div>
				<div class="titleTxt">
					<span>投研团队概况</span>
				</div>
			</div>
			<div id="infoDetail" class="infoDetail"></div>
		</div>
		<div id="companyInfo" style="padding-right:15px;">
			<div class="infoTitle">
				<div class="introducTitle"></div>
				<div class="titleTxt">
					<span>投资顾问简介</span>
				</div>
			</div>
			<img src="${ctxResources}/images/companyinfo.png" class="companyImg">
			<div class="companyInfotxt">
				<span id="proFile"> </span>
			</div>
		</div>
	</div>
</div>