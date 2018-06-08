<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="container-fluid">
	<input type="hidden" id="netfundId" value="${netfundId }"/>
	<form role="form" id="searchNetForm">
   		<input type="hidden" name="dataFreq" id="dataFreq" value="week"/>
   		<input type="hidden" name="intervalType" id="intervalType" value="m3"/>
   		<input type="hidden" name="revenueTarget" id="revenueTarget" value="0"/>
   	</form>
   <div class="infotitle-com">
       <img src="../../resources/images/icon_1.png" >
       <span class="title">净值表现</span>
        <!-- <span class="padding-left-md">频率：</span>
        <span class="btn-group-sm freq">
            <button class="btn active" data-value="week">周频</button>
            <button class="btn" data-value="month">月频</button>
        </span> -->
        <span class="padding-left-md">统计区间:</span>
        <span class="btn-group-sm static-region">
            <button class="btn" data-value="m1">1M</button>
            <button class="btn active" data-value="m3">3M</button>
            <button class="btn" data-value="m6">6M</button>
            <button class="btn" data-value="y1">1Y</button>
            <button class="btn" data-value="y2">2Y</button>
            <button class="btn" data-value="y3">3Y</button>
            <button class="btn" data-value="y5">5Y</button>
            <button class="btn" data-value="total">MAX</button>
        </span>
        <span style="margin-left:30px;">自定义：</span>
        <input class="form_date" size="16" type="text" value="" name="date_start" readonly><span style="margin-left:20px;">至</span>
				<input class="form_date" size="16" type="text" value="" name="date_end" readonly>
				<button class="performanceAlsbtn" name="btnOK"><span class="btnTxt">确定</span></button>
   </div>
   <div class="row">
   		<!-- <span style="margin-left:480px;height: 50px" id='benchmarkArray'> 
   			<b>Benchmark:</b>&nbsp;&nbsp;
		</span> -->
		<br><br><br>
    	<div class="col-lg-10 text-center">
    		<div id="main-chart" style="height:600px;"></div>
    	</div>
    	<div class="col-xs-2">
    		<ul class="list-group revenueTarget">
                <li style="background-color:#4FA5D6;color:white;" class="list-group-item" data-value="4">
                    	累计收益率
                </li>
            </ul>
    	</div>
    </div><br>
    <div class="row">
    	<div class="col-lg-10">
    		<div class="table-responsive">
    			<table class="performanceAlstbl" id="net-main-grid" data-toggle="net-main-grid">
				</table>	
    		</div>
    	</div>
    </div>
</div>