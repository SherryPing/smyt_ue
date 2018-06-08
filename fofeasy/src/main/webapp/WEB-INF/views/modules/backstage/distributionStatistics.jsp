<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!-- 
	分布统计 
	-->
	<div class="prctalHeader"><span>用户ip分布图</span></div>
          <div id="main" class="mapDiv"></div>
          <div id="userAmountdiv">
            <ul class="userAmountable">
                <li class="tableHeader">
                  <div class="tableContent">行政区划</div>
                  <div class="tableContent">数量</div>
                  <div class="tableContent">总计用户量:460</div>
                </li>
                <li>
                  <div class="tableContent">上海</div>
                  <div class="tableContent">150</div>
                  <div class="tableContent"><div class="userPercent" style="width: 120px"></div></div>
                  </li>
                <li>
                  <div class="tableContent">北京</div>
                  <div class="tableContent">100</div>
                  <div class="tableContent"><div class="userPercent" style="width: 80px"></div></div>
                </li>
                <li>
                  <div class="tableContent">辽宁省</div>
                  <div class="tableContent">80</div>
                  <div class="tableContent"><div class="userPercent" style="width: 55px"></div></div>
                </li>
                <li>
                  <div class="tableContent">广东省</div>
                  <div class="tableContent">75</div>
                  <div class="tableContent"><div class="userPercent" style="width: 50px"></div></div>
                </li>
                <li>
                  <div class="tableContent">海南省</div>
                  <div class="tableContent">35</div>
                  <div class="tableContent"><div class="userPercent"  style="width: 24px"></div></div>
                </li>
                <li>
                  <div class="tableContent">云南省</div>
                  <div class="tableContent">15</div>
                  <div class="tableContent"><div class="userPercent" style="width: 10px"></div></div>
                </li>
                <li>
                  <div class="tableContent">河南省</div>
                  <div class="tableContent">5</div>
                  <div class="tableContent"><div class="userPercent" style="width: 3px"></div></div>
                </li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
          </div>