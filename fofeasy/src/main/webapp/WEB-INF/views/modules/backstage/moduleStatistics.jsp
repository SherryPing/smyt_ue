<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!-- 
	模块统计 
	-->
	<div class="prctalHeader"><span>模块统计</span></div>
				<table class="mTable1">
					<tr class="tableTr">
						<td colspan="3">
						昨日关键指标
						</td>
					</tr>
					<tr class="mtblTr2">
						<td>菜单点击次数<br><br><span>25</span></td>
						<td>菜单点击人数<br><br><span>24</span></td>
						<td>人均点击数<br><br><span>1.04</span></td>
					</tr>
				</table>
				<div class="slcbtnDiv">
					<button class="slcbtnActive" id="menuclickBtn">菜单点击次数</button>
					<button class="slcBtn">菜单点击人数</button>
					<button class="slcBtn" id="fnstatisticsBtn">功能分布统计</button>
				</div>
				<div class="statisticsdiv1" id="menuclickDiv">
					<div class="tableTr">
						<span>最近30天：&nbsp;&nbsp;<img src="${ctxResources}/images/模块统计_03.png" alt=""></span>
						<span class="staHspan">2017-02-13至2017-03-14&nbsp;&nbsp;<img src="${ctxResources}/images/模块统计_03.png" alt=""></span>
					</div>
					<div id="menuclickCnt">
						
					</div>
				</div>
				<div class="statisticsdiv1 moduHide" id="fnstatisticsDiv">
					<div class="tableTr">
						<span>最近30天：&nbsp;&nbsp;<img src="${ctxResources}/images/模块统计_03.png" alt=""></span>
						<span class="staHspan">2017-02-13至2017-03-14&nbsp;&nbsp;&nbsp;<img src="${ctxResources}/images/模块统计_03.png" alt=""></span>
						
					</div>
					<div id="functionStats">
						
					</div>
				</div>
					<table class="mTable2">
						<tr class="tableTr1">
							<td colspan="4"><span class="staHspan">2017-02-13至2017-03-14&nbsp;&nbsp;&nbsp;<img src="${ctxResources}/images/模块统计_03.png" alt=""></span></td><td ><button class="downTable">下载表格</button></td>	
						</tr>
						<tr>
							<td class="mTable2td">一级菜单</td>
							<td class="mTable2td">子菜单</td>
							<td class="mTable2td">菜单点击次数</td>
							<td class="mTable2td">菜单点击人数</td>
							<td class="mTable2td">人均点击次数</td>
						</tr>
						<tr>
							<td rowspan="5">产品透视</td>
							<td>基本信息</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>							
							<td>净值表现</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>							
							<td>产品风格</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>							
							<td>业绩指标</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>							
							<td>对比工具</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td rowspan="4">产品透视</td>
							<td>基本信息</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>						
							<td>期下产品</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>						
							<td>能力指标</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>对比工具</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td rowspan="2">自定义数据</td>
							<td>产品制表</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>							
							<td>投顾制表</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</table>