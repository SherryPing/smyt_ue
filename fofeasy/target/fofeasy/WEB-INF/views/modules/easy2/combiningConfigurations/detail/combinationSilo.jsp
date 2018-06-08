<%--
  Created by IntelliJ IDEA.
  User: november
  Date: 2018/5/21
  Time: 下午3:52
  To change this template use File | Settings | File Templates.
--%>
<!-- 资产配置——组合调仓.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<style type="text/css">
    .fund-tab {
        list-style-type:none;letter-spacing:1px
    }
    .fund-tab > li {
        height:35px;margin:10px;white-space:nowrap
    }
    .fund-tab > label > span{margin:0 auto;position:absolute;left:90px;top:3px}
    .fund-tab > li > input,select {height:25px;width:50%}
</style>
<section id="fundPor" style="margin-top: 0px;">
    <div class="row">
        <div class="col-md-12">
            <!-- 基金组合 -->
            <div id="portfolioFund">
                <div class="distanceTop20">
                    <button class="btn-default active">
                        组合调仓
                    </button>
                    <button class="btn-default">
                        调仓记录
                    </button>
                    <button class="btn-default">
                        资金划转
                    </button>

                </div>
                <div class="tblContent distanceTop20">
                    <div class="module">
                        <div style="folat:left;width:75%;height:auto;float:left">
                            <table class="mainTbl table">
                            <thead>
                            <tr>
                                <th>基金ID</th>
                                <th>基金简称</th>
                                <th>投资策略</th>
                                <th>最新净值</th>
                                <th>买入金额（万）</th>
                                <th>购买日期</th>
                                <th>市值（万）</th>
                                <th>投资占比</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>H000213</td>
                                <td colspan="7"></td>

                            </tr>
                            <tr>
                                <td colspan="8"></td>

                            </tr>
                            <tr>
                                <td colspan="8"></td>

                            </tr>
                            <tr>
                                <td colspan="8"></td>

                            </tr>
                            <tr>
                                <td colspan="8"></td>

                            </tr>
                            <tr>
                                <td colspan="8"></td>

                            </tr>
                            <tr>
                                <td colspan="8"></td>

                            </tr>
                            <tr>
                                <td colspan="8"></td>

                            </tr>
                            <tr>
                                <td colspan="8"></td>

                            </tr>
                            <tr>
                                <td colspan="8"></td>

                            </tr>
                            </tbody>
                        </table>
                        </div>
                        <div style="folat:left;width:24%;margin-left:5px;height:456px;float:left;border:1px solid #D8D8E0;color:black;overflow:hidden">
                            <label style="background-color:#F7FBFE;width:100%;height:40px;font-size:16px;line-height:36px;border:1px solid #D8D8E0">
                                <span>&nbsp;资金划转</span>
                            </label>
                            <ul class="fund-tab">
                                <li style="">
                                    <label>产品名称：</label>
                                    <select name="" id="">
                                        <option value="">产品1</option>
                                    </select>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span style="min-width:10%">
                                        <a href="">搜索</a>&nbsp;
                                        <a href="">导入</a>
                                    </span>
                                </li>
                                <li>
                                    <label>调仓类型：</label>
                                    <select name="" id="">
                                        <option value="">申购</option>
                                        <option value="">赎回</option>
                                    </select>
                                </li>
                                <li>
                                    <label>调仓日期：</label>
                                    <span class="layui-input-inline">
                                        <input class="dateInp cdata">
                                    </span>
                                </li>
                                <li>
                                    <label>账户可用余额（万元）：</label>
                                    <span>6000</span>
                                </li>
                                <li>
                                    <label>产品净值：</label>
                                    <span>1.321(净值日期：2017-12-11)</span>
                                </li>
                                <li>
                                    <label>申购金额（万元）：</label>
                                    <input type="text" style="width:35%">
                                </li>
                                <li>
                                    <label>申购份额：</label>
                                    <span>2000</span>
                                </li>
                                <li>
                                    <label>最大可申购份额：</label>
                                    <span>5000</span>
                                </li>
                                <label style="background-color:#F7FBFE;width:100%;height:40px;margin-bottom:0px;font-size:16px;line-height:36px;border:1px solid #D8D8E0;position:relative">
                                    <span>
                                        <button class="easy2Btn anchor"><span>确认</span></button>
                                        <button class="easy2Btn anchor"><span>重置</span></button>
                                    </span>
                                </label>
                            </ul>
                        </div>
                    </div>
                    <div class="module" style="display: none;">
                        <table class="mainTbl table">
                            <thead>
                            <tr>
                                <th>基金ID</th>
                                <th>基金简称</th>
                                <th>投资策略</th>
                                <th>最新净值</th>
                                <th>买入金额（万）</th>
                                <th>购买日期</th>
                                <th>市值（万）</th>
                                <th>投资占比</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>H000213</td>
                                <td colspan="7"></td>

                            </tr>
                            <tr>
                                <td colspan="8"></td>

                            </tr>
                            <tr>
                                <td colspan="8"></td>

                            </tr>
                            <tr>
                                <td colspan="8"></td>

                            </tr>
                            <tr>
                                <td colspan="8"></td>

                            </tr>
                            <tr>
                                <td colspan="8"></td>

                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="module" style="display: none;">
                        <p>当前母基金账户可用余额为：<span class="red">****万元</span></p>
                        <div style="folat:left;width:75%;height:auto;float:left">
                            <table class="mainTbl table">
                                <thead>
                                <tr>
                                    <th>基金ID</th>
                                    <th>基金简称</th>
                                    <th>投资策略</th>
                                    <th>最新净值</th>
                                    <th>买入金额（万）</th>
                                    <th>购买日期</th>
                                    <th>市值（万）</th>
                                    <th>投资占比</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>H000213</td>
                                    <td colspan="7"></td>

                                </tr>
                                <tr>
                                    <td colspan="8"></td>

                                </tr>
                                <tr>
                                    <td colspan="8"></td>

                                </tr>
                                <tr>
                                    <td colspan="8"></td>

                                </tr>
                                <tr>
                                    <td colspan="8"></td>

                                </tr>
                                <tr>
                                    <td colspan="8"></td>

                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style="folat:left;width:24%;margin-left:5px;height:456px;float:left;border:1px solid #D8D8E0;color:black;overflow:hidden">
                            <label style="background-color:#F7FBFE;width:100%;height:40px;font-size:16px;line-height:36px;border:1px solid #D8D8E0">
                                <span>&nbsp;资金划转</span>
                            </label>
                            <ul class="fund-tab">
                                <li style="">
                                    <label>产品名称：</label>
                                    <span>母基金01</span>
                                </li>
                                <li>
                                    <label>调仓类型：</label>
                                    <input type="date">
                                </li>
                                <li>
                                    <label>资金划转：</label>
                                    <select name="" id="">
                                        <option value="">追加资金</option>
                                        <option value="">减少资金</option>
                                    </select>
                                </li>
                                <li>
                                    <label>划转金额（万元）：</label>
                                    <input type="text" style="width:35%">
                                </li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <label style="background-color:#F7FBFE;width:100%;height:40px;margin-bottom:0px;font-size:16px;line-height:36px;border:1px solid #D8D8E0;position:relative">
                                    <span style="margin:0 auto">
                                        <button class="easy2Btn anchor">确认</button>
                                        <button class="easy2Btn anchor">重置</button>
                                    </span>
                                </label>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
