<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
    <div class="fof-grid">
        <!-- 基本信息开始 -->
        <div class="fof-grid-title">
            <img src="${ctxResources}/images/icon-PA-contrast-head.png" />
            <span>
                基本信息
            </span>
        </div>
        <div class="fof-grid-container">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <td>
                                产品全称
                            </td>
                            <td>
                                ${productCompareFormDto[0].fund_full_name}
                            </td>
                            <td>
                                ${productCompareFormDto[1].fund_full_name}
                            </td>
                            <td>
                                ${productCompareFormDto[2].fund_full_name}
                            </td>
                            <td>
                                ${productCompareFormDto[3].fund_full_name}
                            </td>
                        
                        </tr>
                        <tr>
                            <td>
                                产品简称
                            </td>
                            <td>
                                ${productCompareFormDto[0].fund_name}
                            </td>
                            <td>
                                ${productCompareFormDto[1].fund_name}
                            </td>
                            <td>
                                ${productCompareFormDto[2].fund_name}
                            </td>
                            <td>
                                ${productCompareFormDto[3].fund_name}
                            </td>
                        
                        </tr>
                        <tr>
                            <td>
                                投资策略
                            </td>
                            <td>
                                ${productCompareFormDto[0].investment_strategy }
                            </td>
                            <td>
                                ${productCompareFormDto[1].investment_strategy }
                            </td>
                            <td>
                                ${productCompareFormDto[2].investment_strategy }
                            </td>
                            <td>
                                ${productCompareFormDto[3].investment_strategy }
                            </td>
                    
                        </tr>
                        <tr>
                            <td>
                                成立日期
                            </td>
                            <td>
                                ${productCompareFormDto[0].foundation_date }
                            </td>
                            <td>
                                ${productCompareFormDto[1].foundation_date }
                            </td>
                            <td>
                                ${productCompareFormDto[2].foundation_date }
                            </td>
                            <td>
                                ${productCompareFormDto[3].foundation_date }
                            </td>
                    
                        </tr>
                        <tr>
                            <td>
                                净值日期
                            </td>
                            <td>
                                ${productCompareFormDto[0].statistic_date }
                            </td>
                            <td>
                                ${productCompareFormDto[1].statistic_date }
                            </td>
                            <td>
                                ${productCompareFormDto[2].statistic_date }
                            </td>
                            <td>
                                ${productCompareFormDto[3].statistic_date }
                            </td>
                   
                        </tr>
                        <tr>
                            <td>
                                最新净值
                            </td>
                            <td>
                                ${productCompareFormDto[0].nav }
                            </td>
                            <td>
                                ${productCompareFormDto[1].nav }
                            </td>
                            <td>
                                ${productCompareFormDto[2].nav }
                            </td>
                            <td>
                                ${productCompareFormDto[3].nav }
                            </td>
                    
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="grid-expand">
                <a href=".more0" data-toggle="collapse">
                    更多
                </a>
            </div>
            <div class="table-responsive collapse more0" id="baseInfoMore">
                <table class="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <td>
                                发行规模(百万元)
                            </td>
                            <td>
                                ${productCompareFormDto[0].issuing_scale }
                            </td>
                            <td>
                                ${productCompareFormDto[1].issuing_scale }
                            </td>
                            <td>
                                ${productCompareFormDto[2].issuing_scale }
                            </td>
                            <td>
                                ${productCompareFormDto[3].issuing_scale }
                            </td>
               
                        </tr>
                        <tr>
                            <td>
                                结构形式
                            </td>
                            <td>
                                ${productCompareFormDto[0].fund_type_structure }
                            </td>
                            <td>
                                ${productCompareFormDto[1].fund_type_structure }
                            </td>
                            <td>
                                ${productCompareFormDto[2].fund_type_structure }
                            </td>
                            <td>
                                ${productCompareFormDto[3].fund_type_structure }
                            </td>
                    
                        </tr>
                        <tr>
                            <td>
                                发行主体
                            </td>
                            <td>
                                ${productCompareFormDto[0].fund_type_issuance }
                            </td>
                            <td>
                                ${productCompareFormDto[1].fund_type_issuance }
                            </td>
                            <td>
                                ${productCompareFormDto[2].fund_type_issuance }
                            </td>
                            <td>
                                ${productCompareFormDto[3].fund_type_issuance }
                            </td>
             
                        </tr>
                        <tr>
                            <td>
                                发行地区
                            </td>
                            <td>
                                ${productCompareFormDto[0].region }
                            </td>
                            <td>
                                ${productCompareFormDto[1].region }
                            </td>
                            <td>
                                ${productCompareFormDto[2].region }
                            </td>
                            <td>
                                ${productCompareFormDto[3].region }
                            </td>
             
                        </tr>
                        <tr>
                            <td>
                                基金状态
                            </td>
                            <td>
                                ${productCompareFormDto[0].fund_status }
                            </td>
                            <td>
                                ${productCompareFormDto[1].fund_status }
                            </td>
                            <td>
                                ${productCompareFormDto[2].fund_status }
                            </td>
                            <td>
                                ${productCompareFormDto[3].fund_status }
                            </td>
                             
                        </tr>
                        <tr>
                            <td>
                                预期收益率
                            </td>
                            <td>
                                ${productCompareFormDto[0].expected_return }
                            </td>
                            <td>
                                ${productCompareFormDto[1].expected_return }
                            </td>
                            <td>
                                ${productCompareFormDto[2].expected_return }
                            </td>
                            <td>
                                ${productCompareFormDto[3].expected_return }
                            </td>
              
                        </tr>
                        <tr>
                            <td>
                                净值披露频率
                            </td>
                            <td>
                                ${productCompareFormDto[0].data_freq }
                            </td>
                            <td>
                                ${productCompareFormDto[1].data_freq }
                            </td>
                            <td>
                                ${productCompareFormDto[2].data_freq }
                            </td>
                            <td>
                                ${productCompareFormDto[3].data_freq }
                            </td>
                      
                        </tr>
                        <tr>
                            <td>
                                管理费
                            </td>
                            <td>
                                ${productCompareFormDto[0].fee_manage }
                            </td>
                            <td>
                                ${productCompareFormDto[1].fee_manage }
                            </td>
                            <td>
                                ${productCompareFormDto[2].fee_manage }
                            </td>
                            <td>
                                ${productCompareFormDto[3].fee_manage }
                            </td>
                 
                        </tr>
                        <tr>
                            <td>
                                业绩报酬
                            </td>
                            <td>
                                ${productCompareFormDto[0].fee_pay }
                            </td>
                            <td>
                                ${productCompareFormDto[1].fee_pay }
                            </td>
                            <td>
                                ${productCompareFormDto[2].fee_pay }
                            </td>
                            <td>
                                ${productCompareFormDto[3].fee_pay }
                            </td>
               
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 基本信息结束-->
        <!-- 收益指标开始 -->
        <div class="fof-grid-title">
            <img src="${ctxResources}/images/icon-PA-contrast-head.png" />
            <span>
                收益指标
            </span>
        </div>
        <div class="fof-grid-container">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <td>
                                年化收益率
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_return_a }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_return_a }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_return_a }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_return_a }
                            </td>
            
                        </tr>
                        <tr>
                            <td>
                                胜率
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_odds }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_odds }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_odds }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_odds }
                            </td>
                 
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="grid-expand">
                <a href=".more1" data-toggle="collapse">
                    更多
                </a>
            </div>
            <div class="table-responsive collapse more1" id="baseInfoMore">
                <table class="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <td>
                                超额年化收益率
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_excess_a }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_excess_a }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_excess_a }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_excess_a }
                            </td>
                    
                        </tr>
                        <tr>
                            <td>
                                正收益月数/非正收益月数
                            </td>
                            <td>
                                ${productCompareFormDto[0].ratio }
                            </td>
                            <td>
                                ${productCompareFormDto[1].ratio }
                            </td>
                            <td>
                                ${productCompareFormDto[2].ratio }
                            </td>
                            <td>
                                ${productCompareFormDto[3].ratio }
                            </td>
              
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 收益指标结束 -->
        <!-- 风险指标开始 -->
        <div class="fof-grid-title">
            <img src="${ctxResources}/images/icon-PA-contrast-head.png" />
            <span>
                风险指标
            </span>
        </div>
        <div class="fof-grid-container">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <td>
                                最大回撤
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_max_retracement }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_max_retracement }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_max_retracement }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_max_retracement }
                            </td>
           
                        </tr>
                        <tr>
                            <td>
                                最大回撤形成期数
                            </td>
                            <td>
                                ${productCompareFormDto[0].mdd_time }
                            </td>
                            <td>
                                ${productCompareFormDto[1].mdd_time }
                            </td>
                            <td>
                                ${productCompareFormDto[2].mdd_time }
                            </td>
                            <td>
                                ${productCompareFormDto[3].mdd_time }
                            </td>
           
                        </tr>
                        <tr>
                            <td>
                                贝塔系数
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_beta }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_beta }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_beta }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_beta }
                            </td>
                     
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="grid-expand">
                <a href=".more2" data-toggle="collapse">
                    更多
                </a>
            </div>
            <div class="table-responsive collapse more2" id="baseInfoMore">
                <table class="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <td>
                                年化标准差
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_stdev_a }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_stdev_a }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_stdev_a }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_stdev_a }
                            </td>
                      
                        </tr>
                        <tr>
                            <td>
                                年化下行标准差
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_dd_a }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_dd_a }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_dd_a }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_dd_a }
                            </td>
                       
                        </tr>
                        <tr>
                            <td>
                                风险价值
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_rvalue }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_rvalue }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_rvalue }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_rvalue }
                            </td>
                    
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 风险指标结束 -->
        <!-- 收益-风险指标开始 -->
        <div class="fof-grid-title">
            <img src="${ctxResources}/images/icon-PA-contrast-head.png" />
            <span>
                收益-风险指标
            </span>
        </div>
        <div class="fof-grid-container">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <td>
                                年化夏普率
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_sharpe_a }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_sharpe_a }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_sharpe_a }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_sharpe_a }
                            </td>
                        
                        </tr>
                        <tr>
                            <td>
                                年化詹森指数
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_jensen_a }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_jensen_a }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_jensen_a }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_jensen_a }
                            </td>
                       
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="grid-expand">
                <a href=".more3" data-toggle="collapse">
                    更多
                </a>
            </div>
            <div class="table-responsive collapse more3" id="baseInfoMore">
                <table class="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <td>
                                年化卡玛比率
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_calmar_a }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_calmar_a }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_calmar_a }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_calmar_a }
                            </td>
                       
                        </tr>
                        <tr>
                            <td>
                                年化索提诺比率
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_sor_a }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_sor_a }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_sor_a }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_sor_a }
                            </td>
                        
                        </tr>
                        <tr>
                            <td>
                                年化特雷诺比率
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_tr_a }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_tr_a }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_tr_a }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_tr_a }
                            </td>
                   
                        </tr>
                        <tr>
                            <td>
                                年化信息比率
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_inf_a }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_inf_a }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_inf_a }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_inf_a }
                            </td>
                        
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 风险-指标结束 -->
        <!-- 产品风格 -->
        <div class="fof-grid-title">
            <img src="${ctxResources}/images/icon-PA-contrast-head.png" />
            <span>
                产品风格
            </span>
        </div>
        <div class="fof-grid-container">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <td>
                                择时能力
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_s_time }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_s_time }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_s_time }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_s_time }
                            </td>
                            
                        </tr>
                        <tr>
                            <td>
                                选股能力
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_s_security }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_s_security }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_s_security }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_s_security }
                            </td>
                            
                        </tr>
                        <tr>
                            <td>
                                超额收益率可持续性
                            </td>
                            <td>
                                ${productCompareFormDto[0].interval_persistence }
                            </td>
                            <td>
                                ${productCompareFormDto[1].interval_persistence }
                            </td>
                            <td>
                                ${productCompareFormDto[2].interval_persistence }
                            </td>
                            <td>
                                ${productCompareFormDto[3].interval_persistence }
                            </td>
                           
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 产品风格结束 -->
        <div id="main-content">
        </div>
    </div>
