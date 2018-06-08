<!-- 未上传 -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>未上传</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
<link rel="stylesheet"
	href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />
</head>

<body>
	<!-- 头部分开始 -->
	<%@ include file="/WEB-INF/views/system/header.jsp"%>
	<!-- 头部分结束 -->
	<!-- 内容部分开始 -->
	<section class="fof-content uploadReport">
		<div class="hh-Title1">
			<span>尽调报告上传<label>(<span id="companyName"></span>)</label></span>
		</div>
		
		<div class="infoTitle distanceTop10">
			<div id="sec1">
			<div class="infoTitle" style="margin-top:0px;">
				<div class="hh-titleTxt">
					<span>上传尽调资料</span>
				</div>
			</div>
			<!-- 上传文件 -->
			<div class="distanceTop20 reportUl">
				<div class="requiredDiv" style="width:100px;">
					<span>上传文件：</span>
				</div>
				<input type="text" id="org_id" value="${orgId}" style="display:none;">
				<form id="adjustInfomation">
					<input type="text" id="showFile" readonly placeholder="仅支持Excel文件上传!">
					<input type="text" name="org_id_init" value="${fundId}" style="display:none;">
					<input type="text" name="type" value="reports" style="display:none;">
					<input type="text" class="rand" name="rand" style="display:none;">
					<input type="file" accept=".xlsx,.xls" name="file" id="upLoadinp" class="upload_file">
					<label for="upLoadinp" class="huihong2Btn hand forFile pull-left">浏览</label>
					<button class="huihong3Btn" id="upload1" type="button">上传</button>
				</form>
			</div>
			</div>
			<!-- <div class="showFile"></div> -->
			<div class="infoTitle distanceTop20">
				<div class="hh-titleTxt">
					<span>公司相关资料</span>
				</div>
			</div>
			<!-- 公司相关资料 -->
			<div id="CompanyRelatedInformation" class="outerDiv ">
				<div>
					<div class="halfHdiv">营业执照正副本</div>
					<div class="halfHdiv">
						<label data-type="license" for="companyFile"><img src="${ctxResources}/images/huisheng/noupload_up.png"></label>
						<img id="imgGou1" src="${ctxResources}/images/huisheng/gou.png">
					</div>
				</div>
				<div>
					<div class="halfHdiv">组织机构代码证</div>
					<div class="halfHdiv">
						<label data-type="code" for="companyFile"><img src="${ctxResources}/images/huisheng/noupload_up.png"></label>
						<img id="imgGou2"  src="${ctxResources}/images/huisheng/gou.png">
					</div>
				</div>
				<div>
					<div class="halfHdiv">企业法人身份证</div>
					<div class="halfHdiv">
						<label data-type="id" for="companyFile"><img src="${ctxResources}/images/huisheng/noupload_up.png"></label>
						<img id="imgGou3" src="${ctxResources}/images/huisheng/gou.png">
					</div>
				</div>
				<div>
					<div class="halfHdiv">私募投资基金管理人登记证明</div>
					<div class="halfHdiv">
						<label data-type="register" for="companyFile"><img src="${ctxResources}/images/huisheng/noupload_up.png"></label>
						<img id="imgGou4" src="${ctxResources}/images/huisheng/gou.png">
					</div>
				</div>
				<div>
					<div class="halfHdiv">最新一期审计报告</div>
					<div class="halfHdiv">
						<label data-type="audit" for="companyFile"><img src="${ctxResources}/images/huisheng/noupload_up.png"></label>
						<img id="imgGou5" src="${ctxResources}/images/huisheng/gou.png">
					</div>
				</div>
				<div>
					<div class="halfHdiv">近三年财务报表</div>
					<div class="halfHdiv">
						<label data-type="finance" for="companyFile"><img src="${ctxResources}/images/huisheng/noupload_up.png"></label>
						<img id="imgGou6" src="${ctxResources}/images/huisheng/gou.png">
					</div>
				</div>
				<div>
					<div class="halfHdiv">风控内控制度文件</div>
					<div class="halfHdiv">
						<label data-type="rc" for="companyFile"><img id="imgGou1" src="${ctxResources}/images/huisheng/noupload_up.png"></label>
						<img src="${ctxResources}/images/huisheng/gou.png">
					</div>
				</div>
				<form id="compnayForm" name="compnayForm">
					<input type="text" name="org_id_init" value="${fundId}" style="display:none;">
					<input type="text" name="org_id" value="${orgId}" style="display:none;">
					<input type="text" class="rand" name="rand" style="display:none;">
					<input type="text" name="specify" style="display:none;">
					<input type="text" name="type" value="org_material" style="display:none;">
					<input type="file" name="file" id="companyFile" style="display:none;">
					
				</form>
			</div>
			<div class="infoTitle distanceTop20">
				<div class="hh-titleTxt">
					<span>旗下产品上传</span>
				</div>
			</div>
			<!-- 旗下产品上传 -->
			 <div class="outerDiv">
				<div class="distanceTop20 reportUl">
				<form id="profomation" name="profomation">
					<select class="sel" id="proSel" name="fund_id" style="display:none">
						
					</select>
					<!-- <div class="product-uploadDiv hand"> -->
						<input type="text" class="showFile" id="showFile2" readonly placeholder="仅支持Excel文件上传!">
						<input type="text" name="org_id_init" value="${fundId}" style="display:none;">
						<input type="text" name="org_id"  value="${orgId}" style="display:none;">
						<input type="text" name="type" value="fund_nav" style="display:none;">
						<input type="text" class="rand" name="rand" style="display:none;">
						<input type="file" accept=".xlsx,.xls" name="file" id="upLoadinp2" class="upload_file">
						<label for="upLoadinp2" class="huihong2Btn hand forFile pull-left">浏览</label>
						<button class="huihong3Btn" id="upload2" type="button">上传</button>
					<!-- </div>
					 -->
				</form>
				</div>
			</div> 
		</div>
		<div class="confirmPrcdiv">
			<a href="${ctxPage}/InvestmentRatings"><button
					class="hhBtn-default">完成</button></a>
			<button class="hhBtn-default" id="clear">清空</button>
			<a href="${ctxPage}/InvestmentRatings"><button
					class="hhBtn-default" class="back">返回</button></a>
		</div>
		<div class="modal fade" id="upload" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true" >
			<div class="modal-dialog" style="width:720px;margin-top:10%;">
				<div class="modal-content">
					<div class="modal-body" style="padding:0;padding-top:15px;">
						<div class="modalheader">
							<span>请输入产品名称</span><input type="text" class="left20">
						</div>
						<div style="height:360px;">
							<div class="datauploadModule">
								<div class="module1">基本信息</div>
								<div class="module2">
									<p class="top5">
										<a>模板下载</a>
									</p>
									<p class="top5">
										<a>数据上传</a>
									</p>
									<img class="top10" src="${ctxResources}/images/huisheng/gouActive.png">
								</div>
							</div>
							<div class="datauploadModule">
								<div class="module1">净值信息</div>
								<div class="module2">
									<p class="top5">
										<a>模板下载</a>
									</p>
									<p class="top5">
										<a>数据上传</a>
									</p>
									<img class="top10" src="${ctxResources}/images/huisheng/gou.png">
								</div>
							</div>
							<div class="datauploadModule">
								<div class="module1">持仓汇总</div>
								<div class="module2">
									<p class="top5">
										<a>模板下载</a>
									</p>
									<p class="top5">
										<a>数据上传</a>
									</p>
									<img class="top10" src="${ctxResources}/images/huisheng/gou.png">
								</div>
							</div>
							<div class="datauploadModule">
								<div class="module1">交易明细</div>
								<div class="module2">
									<p class="top5">
										<a>模板下载</a>
									</p>
									<p class="top5">
										<a>数据上传</a>
									</p>
									<img class="top10" src="${ctxResources}/images/huisheng/gou.png">
								</div>
							</div>
							<div class="datauploadModule">
								<div class="module1">估值表</div>
								<div class="module2">
									<p class="top5">
										<a>模板下载</a>
									</p>
									<p class="top5">
										<a>数据上传</a>
									</p>
									<img class="top10" src="${ctxResources}/images/huisheng/gou.png">
								</div>
							</div>
						</div>
						<div class="modalBottomdiv">
							<button id="exportExcel" class="huihong1Btn" data-dismiss="modal">确认</button>
							<button id="expclearBtn" class="huihong1Btn" data-dismiss="modal">取消</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- 右侧部分结束-->
	<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
	<script>
		require(['huihong/InvestmentRatings/observationPool/notUploaded']);
	</script>
</body>

</html>