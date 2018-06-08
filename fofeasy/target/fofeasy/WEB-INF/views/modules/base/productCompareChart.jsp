
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="fof-chart">
    <div class="fof-chart-search">
    	<form role="form" id="searchChartForm">
    		<input type="hidden" name="dataFreq" id="dataFreq" value="week"/>
    		<input type="hidden" name="intervalType" id="intervalType" value="m3"/>
    		<input type="hidden" name="revenueTarget" id="revenueTarget" value="0"/>
    	</form>
        <span class="padding-left-md">频率：</span>
        <span class="btn-group-sm freq">
            <button class="btn active" data-value="week">周频</button>
            <button class="btn" data-value="month">月频</button>
        </span>
        <span class="padding-left-md">统计区间:</span>
        <span class="btn-group-sm static-region">
            <button class="btn active" data-value="m3">3M</button>
            <button class="btn" data-value="m6">6M</button>
            <button class="btn" data-value="y1">1Y</button>
            <button class="btn" data-value="y2">2Y</button>
            <button class="btn" data-value="y3">3Y</button>
            <button class="btn" data-value="y5">5Y</button>
            <button class="btn" data-value="max">MAX</button>
        </span>
    </div>
    <div class="row">
    	<div class="col-lg-10 text-center">
    		<div id="main-chart" style="height:600px;width:1000px;"></div>
    	</div>
    	<div class="col-xs-2">
    		<ul class="list-group revenueTarget">
                <li class="list-group-item active" data-value="0">
                    	单位净值
                </li>
                <li class="list-group-item" data-value="1">
                    	累计净值
                </li>
                <li class="list-group-item" data-value="2">
                    	复权累计净值
                </li>
                <li class="list-group-item" data-value="4">
                    	累计收益率
                </li>
                <li class="list-group-item" data-value="3">
                   	 最大回撤
                </li>
            </ul>
    	</div>
    </div>
</div>