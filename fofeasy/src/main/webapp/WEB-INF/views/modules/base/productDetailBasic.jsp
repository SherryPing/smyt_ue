<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="container-fluid">
   <div class="infotitle-com">
       <img src="../../resources/images/icon_1.png">
       <span class="title">基本信息</span>
   </div>
   <div class="row infobox margin-top row-no-padding">
       <div class="col-xs-6 " style="padding-right: 0px;">
           <dl class="dl-horizontal bg-gray blue-bar">
              <dt>产品简称</dt>
               <dd>${feFundDetailsDto.fundName}</dd>
               <dt>发行方式</dt>
               <dd>${feFundDetailsDto.fundTypeIssuance }</dd>
               <dt>成立日期</dt>
               <dd>${feFundDetailsDto.foundationDate }</dd>
           </dl>
       </div>
       <div class="col-xs-6" style="padding-left: 0px;">
           <dl class="dl-horizontal bg-gray">
              <dt>产品全称</dt>
               <dd>${feFundDetailsDto.fundFullName}</dd>
               <dt>投资策略</dt>
               <dd>${feFundDetailsDto.investmentStrategy }</dd>
               <dt>发行规模(亿元)</dt>
               <dd>${feFundDetailsDto.issuingScale }</dd>
           </dl>
       </div>
   </div>
   <div class="row infobox">
       <div class="col-xs-6">
           <dl class="dl-horizontal">
              <dt>结构形式</dt>
               <dd>${feFundDetailsDto.fundTypeStructure }</dd>
               <dt>基金状态</dt>
               <dd>${feFundDetailsDto.fundStatus }</dd>
               <dt>申购状态</dt>
               <dd></dd>
               <dt>开放日</dt>
               <dd>${feFundDetailsDto.openDate }</dd>
               <dt>证劵经纪</dt>
               <dd>${feFundDetailsDto.fundStockbroker }</dd>
               <dt>认购费</dt>
               <dd>${feFundDetailsDto.feeSubscription }</dd>
               <dt>赎回费</dt>
               <dd>${feFundDetailsDto.feeRedeem }</dd>
               <dt>管理费</dt>
               <dd>${feFundDetailsDto.feeManage }</dd>
               <dt>产品备案日期</dt>
               <dd>${feFundDetailsDto.regTime }</dd>
           </dl>
       </div>
       <div class="col-xs-6">
           <dl class="dl-horizontal">
               <dl class="dl-horizontal">
                   <dt>发行地区</dt>
                   <dd>${feFundDetailsDto.region }</dd>
                   <dt>基金到期日</dt>
                   <dd>${feFundDetailsDto.fundTimeLimit }</dd>
                   <dt>赎回状态</dt>
                   <dd></dd>
                   <dt>净值披露频率</dt>
                   <dd>${feFundDetailsDto.dataFreq }</dd>
                   <dt>托管银行</dt>
                   <dd>${feFundDetailsDto.fundCustodian }</dd>
                   <dt>预期收益率</dt>
                   <dd>${feFundDetailsDto.expectedReturn }</dd>
                   <dt>托管费</dt>
                   <dd>${feFundDetailsDto.feeTrust }</dd>
                   <dt>业绩报酬</dt>
                   <dd>${feFundDetailsDto.feePay }</dd>
               </dl>
           </dl>
       </div>
   </div>
   <div class="row brief" style="padding: 40px 20px;">
       <div class="col-xs-1 text-center">
           <img src="../../resources/images/icon_profile.png" class="img-circle">
           <div>${feFundDetailsDto.background }</div>
       </div>
       <div class="col-xs-11">
           <p>
              ${feFundDetailsDto.resume } 
           </p>
       </div>
   </div> 
   <div class="basicHr"></div>
   <div class="row brief" style="padding: 40px 20px;">
        <div class="col-xs-1 text-center">
            <img src="../../resources/images/icon_brief.png" class="img-circle">
            <div>${feFundDetailsDto.orgName }</div>
        </div>
        <div class="col-xs-11">
            <p>
                ${feFundDetailsDto.profile}
            </p>
        </div>
    </div>
</div>
