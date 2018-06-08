<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="container-fluid">
	<input type="hidden" id="netfundId" value="${netfundId }" />
	<form role="form" id="searchNetForm">
		<input type="hidden" name="dataFreq" id="dataFreq" value="week" /> <input
			type="hidden" name="intervalType" id="intervalType" value="m3" /> <input
			type="hidden" name="revenueTarget" id="revenueTarget" value="0" />
	</form>
	
	
	<br />
	<div class="infotitle-com" style="line-height: 40px;">
		<span class="title">请选择统计区间</span>
	</div>
	<div class="layui-form-pane" style="margin-top: 15px;">
		<div class="layui-form-item">
			<label class="layui-form-label" style="width:100px;margin-right: 15px;">净值表现</label>
			<span class="layui-input-inline"> <input class="layui-input"
				placeholder="开始日" id="nav_range_s">
			</span> <span class="layui-input-inline"> <input class="layui-input"
				placeholder="截止日" id="nav_range_e">
			</span>
			<button class="layui-btn" style="margin-left: 15px;" id="btnOK">确定</button>
		</div>
	</div>
	<div class="infotitle-com" style="line-height: 40px;">
		<span class="title">导出格式</span>
	</div>
	<div align="left" style="margin-top: 15px;">
		<button class="layui-btn layui-btn-normal layui-btn-radius"
			id="exportPdf">导出PDF</button>
		<button class="layui-btn layui-btn-warm layui-btn-radius"
			id="exportWord">导出Word</button>
	</div>
	
	<div class="infotitle-com" style="line-height: 40px;">
		<span class="title">报告图片预览</span>
	</div>
	
	<div class="infotitle-com" style="line-height: 30px;">
		<img src="${ctxResources}/images/icon_1.png"> 
		<span class="title">净值图</span>
	</div>
	<div class="row">
		<span style="margin-left: 18%;" id='benchmarkArray'> <b>Benchmark:</b>&nbsp;&nbsp;
		</span><br><br><br>
		<div class="col-lg-10 text-center">
			<div id="main-chart" style="height: 600px; width: 1000px;"></div>
		</div>
		<div class="col-lg-10 text-center">
			<div id="assetAccountGrid" style="height: 550px; width: 1000px; margin: 10px 5%"></div>
		</div>
		
	</div>
</div>