<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="fof-sidebar-head">
    <span class="fof-sidebar-head-text">自主管理</span>
</div>
<form role="form" id="searchForm">
	<ul class="list-group">
	    <li class="list-group-item" >
	        <span>统计区间：</span>
	        <select class="chosen-select" tabindex="2" data-placeholder="成立以来" id="stypeCodeName8Cond" name="statisticsRange">
	            
	        </select>
	    </li>
	    <li class="list-group-item" style="height: 65px;">
	        <div>
	            <span>年化收益：</span>
	        </div>
	        <div style="float:left;margin-top: 5px;">
               <input type="number" class="ant-input-number" name="yearReturnLeft" >
               <span style="margin:0 5px;">~</span>
               <input type="number" class="ant-input-number" name="yearReturnRight">
               <span style="margin: 0 5px;">%</span>
           </div>
	    </li>
	    <li class="list-group-item" style="height: 65px;">
	        <div>
	            <span>最大回撤：</span>
	        </div>
	        <div style="float:left;margin-top: 5px;">
               <input type="number" class="ant-input-number" name="maxRetracementLeft">
               <span style="margin:0 5px;">~</span>
               <input type="number" class="ant-input-number" name="maxRetracementRight">
               <span style="margin: 0 10px;">%</span>
           </div>
	    </li>
	    <li class="list-group-item">
	        <span>发行方式：</span>
	        <select class="chosen-select" tabindex="2" data-placeholder="不限" id="stypeCodeName1Cond" name="typeCode3">
	            <option value=''>不限</option>
	            
	        </select>
	    </li>
	    <li class="list-group-item">
	        <span>投资标的：</span>
	        <select class="chosen-select" tabindex="2" data-placeholder="不限" id="stypeCodeName2Cond" name="typeCode2">
	            <option value=''>不限</option>
	        </select>
	    </li>
	    <li class="list-group-item">
	        <span>投资策略：</span>
	        <select class="chosen-select" tabindex="2" data-placeholder="不限" id="stypeCodeName3Cond" name="typeCode1">
	        	<option value=''>不限</option>
	        </select>
	    </li>
	    <li class="list-group-item">
	        <span>结构形式：</span>
	        <select class="chosen-select" tabindex="2" data-placeholder="不限" id="stypeCodeName4Cond" name="typeCode4">
	        	<option value=''>不限</option>
	        </select>
	    </li>
	    <li class="list-group-item">
	        <span>基金状态：</span>
	        <select class="chosen-select" tabindex="2" data-placeholder="不限" id="stypeCodeName5Cond" name="fundStatus">
	            <option value=''>不限</option>
	        </select>
	    </li>
	    <li class="list-group-item">
	        <span>成立年限：</span>
	        <select class="chosen-select" tabindex="2" data-placeholder="不限" id="stypeCodeName6Cond" name="foundationDaysRange">
	            <option value=''>不限</option>
	        </select>
	    </li>
	    <li class="list-group-item">
	        <span>发行地区：</span>
	        <select class="chosen-select" tabindex="2" data-placeholder="不限" id="stypeCodeName7Cond" name="region">
	            <option value=''>不限</option>
	        </select>
	    </li>
	</ul>
	<input type="hidden" id="stypeCodeName8Cond"  name="fundName" value=""/>
	<input type="hidden" id="stypeCodeName9Cond"  name="orgName" value=""/>
</form>
<div class="btn-group-sm text-center">
    <button type="button" class="btn btn-primary ladda-button" data-style="expand-left" data-size="1" id="btnSubmit"><span class="ladda-label">提交</span></button>
    <button type="button" class="btn btn-default ladda-button" data-style="expand-left" data-size="1" id="btnClean"><span class="ladda-label">清空</span></button>
</div>