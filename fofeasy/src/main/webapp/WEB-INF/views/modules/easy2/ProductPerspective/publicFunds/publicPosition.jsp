<!-- 自主管理——持仓分析.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!-- 内容部分开始 -->
<section id="prcBasic" style="margin-top: 0px;">
    <div class="row">
        <div class="col-md-12">
            <!-- 资产配置 -->
            <div id="assetAllocation" class="outerDiv">
                <div class="infoTitle">
                    <div class="introducTitle"></div>
                    <div class="titleTxt">
                        <span>资产配置</span>
                    </div>
                </div>
                <div id="assetAllocationdiv" class="assetAllocationDiv">
                    <div id="timelineDiagram" class="assetAllocation">
                        <div class="charHeader">
                            <div class="headerLeft" style="margin-left: 5px;">
                                资产规模（亿元）
                            </div>
                            <div class="headerRight2">
                                截至<span id="dead-date">--</span>，<span id="fund-name">--</span> 净资产规模：<span class="red" id="total-asset">--</span>，比上一期（<span id="last-date">--</span>）<span id="flucture">--</span>了：<span class="red" id="change"></span>
                            </div>
                        </div>
                        <div id="assetAccountchart"
                             class="bigCharts border_none height360"></div>
                    </div>
                    <%--表数据--%>
                    <div class="cirChart distanceTop20" style="margin-left:0px;">
                        <div class="charHeader">
                            <div class="headerLeft" style="margin-left: 5px;">
                                <span>数据日期：</span>
                                <select id="assetdate" style="height: 28px;"></select>
                            </div>
                        </div>
                        <div class="bchartContent"  style="height: 278px;margin-top: 40px;"
                             >
                            <table class="mainTbl" id="assetTbl"></table>
                        </div>
                    </div>
                    <%--资产配置环图--%>
                    <div class="cirChart distanceTop20">
                        <div class="bchartContent momchoiceDiv"
                             style="height: 278px;margin-top: 40px;" id="assetRoundchart"></div>
                    </div>
                </div>

            </div>
            <!-- 股票行业分布 -->
            <div id="stockIndust" class="outerDiv">
                <div class="infoTitle">
                    <div class="introducTitle"></div>
                    <div class="titleTxt">
                        <span>股票行业分布</span>
                    </div>
                </div>
                <div id="stockIndustdiv" class="assetAllocationDiv">
                    <%--表数据--%>
                    <div class="cirChart distanceTop20" style="margin-left:0px;">
                        <div class="charHeader">
                            <div class="headerLeft" style="margin-left: 5px;">
                                <span>数据日期：</span>
                                <select id="stockIndustdate" style="height: 28px;"></select>
                            </div>
                        </div>
                        <div class="bchartContent"  style="height: 278px;margin-top: 40px;">
                            <table class="mainTbl" id="stockIndustTable"></table>
                        </div>
                    </div>
                    <%--行业分条形图--%>
                    <div class="cirChart distanceTop20">
                        <div class="headerRight2" style="margin-top: 15px;margin-right: 15px;">
                            <span>前五大行业占资产比例：<span id="conPercent" class="red" >--</span></span>
                        </div>
                        <div class="bchartContent momchoiceDiv"
                             style="height: 278px;margin-top: 40px;width: 100%;" id="stockIndustChart">

                            <div class="pro-bar">
                                <div class="bar"><div class="active"></div></div>
                                <div class="percent">31.44%</div>
                                <div class="clarity ellipse">租赁和商业服务业</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 重仓 -->
            <div id="heavyPosition" class="outerDiv">
                <div class="tab-level2" id="hh">
                    <ul>
                        <li class="active" data-id="stock" id="li-mix-stock">重仓持股</li>
                        <li data-id="bond" id="li-mix">重仓债券</li>
                        <li class="active"  data-id="bond" id="li-bond">重仓债券</li>
                    </ul>
                </div>

                <!-- 重仓持股 -->
                <div id="heavyStockHold" class="assetAllocationDiv">
                    <!-- 柱图 -->
                    <div class="assetAllocation">
                        <div class="charHeader">
                            <div class="headerLeft" style="margin-left: 5px;">
                                <span>数据日期：</span>
                                <select id="heavyStockHolddate" style="height: 28px;"></select>
                            </div>
                            <div class="headerRight2" >
                                <span>前十大重仓持股占资产比例：<span id="stockConcert" class="red">--</span></span>
                            </div>
                        </div>
                        <div id="heavyStockHoldchart"
                             class="bigCharts border_none height360"></div>
                        <%--<div class="bchartContent"  style="height: 278px;margin-top: 40px;"--%>
                        <%-->--%>
                            <%--<table class="mainTbl" id="assetTbl"></table>--%>
                        <%--</div>--%>
                        <div class="col-md-12 pad30">
                            <table class="indicatorsTbl positionsTbl2 dataTable height360 border2"
                                   id="heavyStockHoldTbl">
                            </table>
                        </div>
                    </div>
                </div>
                <!-- 重仓债券 -->
                <div id="heavyBond" class="assetAllocationDiv" style="display: none;">
                    <!-- 柱图 -->
                    <div class="assetAllocation">
                        <div class="charHeader">
                            <div class="headerLeft" style="margin-left: 5px;">
                                <span>数据日期：</span>
                                <select id="heavyBonddate" style="height: 28px;"></select>
                            </div>
                            <div class="headerRight2">
                               <span>前五大重仓债券占资产比例：<span id="bondConcert" class="red">--</span></span>
                            </div>
                        </div>
                        <div id="heavyBondchart"
                                 class="bigCharts border_none height360"></div>

                        <div class="col-md-12 pad30">
                            <table class="indicatorsTbl positionsTbl2 dataTable height360"
                                   id="heavyBondTbl">
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
</section>