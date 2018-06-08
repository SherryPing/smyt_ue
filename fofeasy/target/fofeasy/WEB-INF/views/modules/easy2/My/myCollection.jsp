<!-- 我的收藏 -->
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<div class="addNewprcslc" style="display:block">
<div class="outerDiv distanceTop20" style="margin-bottom:20px;">
		<div id="slider">
			<ul id="historyUl">
				<li>私募</li>
				<li>投顾</li>
				<li class="histolineActive" style="margin-top: 30px;margin-left: -220px;"></li>
			</ul>
			<br>
		</div>
		<div id="hitoryLine" class="distanceTop20" style="width: 220px;"></div>
	</div>
	<div class="collectionDiv" id="fundModule">
		<%-- <div id="mySearch">
			<span>搜索产品：</span>
			<div>
				<input type="text" name=""><img src="${ctxResources}/images/basicSearch.png">
			</div>
		</div> --%>
		<div class="tab2" style="margin-top: -20px;float: left;min-height: 50px;line-height: 50px;height: auto;">
			<span data-id="60101" class="tabBtn">股票策略</span>
			<span data-id="60102" class="tabBtn ">管理期货</span>
			<span data-id="60103" class="tabBtn ">相对价值</span>
			<span data-id="60104" class="tabBtn ">事件驱动</span>
			<span data-id="60105" class="tabBtn ">债券策略</span>
			<span data-id="60106" class="tabBtn ">宏观策略</span>
			<span data-id="60107" class="tabBtn ">组合策略</span>
			<span data-id="60108" class="tabBtn ">多策略</span>
			<span data-id="60109" class="tabBtn ">其他一级策略</span>
		</div>
		<div class="distanceTop20" >
			<table class="mainTbl table" id="main-grid"></table>
		</div>
	</div>
	<div class="collectionDiv distanceTop20" style="display: none;">
		<div class="outerDiv">
			<table id="castguTab" class="mainTbl table"></table>
		</div>
	</div>
</div>