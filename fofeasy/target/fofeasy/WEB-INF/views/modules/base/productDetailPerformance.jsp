<%@page contentType="text/html" pageEncoding="UTF-8"%>
<style>
.fixed-table-container{
padding-bottom:0px !important;
}
</style>
<div class="container-fluid">
	<form role="form" id="searchPermormanceForm">
   		<input type="hidden" name="dataFreq" id="dataFreq" value="week"/>
   		<input type="hidden" name="intervalType" id="intervalType" value="m3"/>
   		<input type="hidden" name="fundId" id="permormancefundId" value="${permormancefundId }"/>
   	</form>
   <div class="infotitle-com">
       <img src="../../resources/images/icon_1.png" >
       <span class="title">业绩指标</span>
       <span class="padding-left-md">频率：</span>
       <span class="btn-group-sm freq">
            <button class="btn" data-value="daily">日频</button>
            <button class="btn active" data-value="week">周频</button>
            <button class="btn" data-value="month">月频</button>
        </span>
        <span class="padding-left-md">统计区间:</span>
        <span class="btn-group-sm static-region">
            <button class="btn" data-value="m1">1M</button>
            <button class="btn active" data-value="m3">3M</button>
            <button class="btn" data-value="m6">6M</button>
            <button class="btn" data-value="y1">1Y</button>
            <button class="btn" data-value="y2">2Y</button>
            <button class="btn" data-value="y3">3Y</button>
            <button class="btn" data-value="y5">5Y</button>
            <button class="btn" data-value="max">MAX</button>
        </span>
   </div>
   <div class="permormance-grid container">
	   <div class="row">
	   		<div class="col-lg-12">
	   			<div class="infotitle-com">
	   				<img src="../../resources/images/icon_1.png" >
	   			</div>
	   			<div class="infotitle-com">
	   				<img src="../../resources/images/icon_1.png" >
	   				<span>收益指标</span>
	   			</div>
	   			<br>
	   			<div class="table-responsive">
	   				<table class="table performanceAlstbl" id="revenue-main-grid" data-toggle="revenue-main-grid">
					</table>
	   			</div>
	   			<div class="infotitle-com">
	   				<img src="../../resources/images/icon_1.png" >
	   				<span>风险指标</span>
	   			</div>
	   			<br>
	   			<div class="table-responsive">
	   				<table class="table performanceAlstbl" id="risk-main-grid" data-toggle="risk-main-grid">
					</table>	
	   			</div>
	   			<div class="infotitle-com">
	   				<img src="../../resources/images/icon_1.png" >
	   				<span>收益-风险指标</span>
	   			</div>
	   			<br>
	   			<div class="table-responsive">
	   				<table class="table performanceAlstbl" id="revenue-risk-main-grid" data-toggle="revenue-risk-main-grid">
					</table>	
	   			</div>
	   			<!-- <div class="infotitle-com">
	   				<img src="../../resources/images/icon_1.png" >
	   				<span>风格指标</span>
	   			</div>
	   			<br>
	   			<div class="table-responsive">
	   				<table class="table performanceAlstbl" id="style-main-grid" data-toggle="style-main-grid">
					</table>	
	   			</div> -->
	   			<div class="infotitle-com">
	   				<img src="../../resources/images/icon_1.png" >
	   				<span>相对指数指标</span>
	   			</div>
	   			<br>
	   			<div class="table-responsive">
	   				<table class="table performanceAlstbl" id="index_relative-main-grid" data-toggle="index_relative-main-grid">
					</table>	
	   			</div>
	   			<div style="width: anto;height: 50px;"></div>
	   		</div>
	   </div>
   </div>
</div>