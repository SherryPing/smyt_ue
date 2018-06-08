<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">

	<head>
		<%@ include file="/WEB-INF/views/include/meta.jsp"%>
		<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
		<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
		<link rel="stylesheet" href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />

	</head>

	<body>
		<section id="customization" style="margin:30px 20px;">
			<div id="customDiv">
				<br>
				<div class="layui-form-pane" style="margin-top: 15px;">
					<div class="layui-form-item">
						<span style="float:left;margin-top:10px;">统计区间选择：</span> <span class="layui-input-inline" style="margin-left:20px;"> <input
						class="form-control cdata" placeholder="开始日期" name="date_start"
						readonly>
					</span> <span class="layui-input-inline"> <input
						class="form-control cdata" placeholder="结束日期" name="date_end"
						readonly>
					</span>
						<button class="performanceAlsbtn" style="margin-left: 15px;" name="btnOK">确定</button>
					</div>
				</div>
				<div class="customTitle">
					<span>综合指数成分：</span>
				</div>
				<div class="bmarkSlc">
					<div id="HS300"></div>
					<label>沪深300</label>
				</div>
				<div class="bmarkSlc">
					<div id="CSI500"></div>
					<label for="CSI500">中证500</label>
				</div>
				<div class="bmarkSlc">
					<div id="expSz50"></div>
					<label>上证50指数</label>
				</div>
				<div class="bmarkSlc">
					<div id="expSz50"></div>
					<label>中债指数</label>
				</div>
				<div class="bmarkSlc">
					<div id="expSz50"></div>
					<label>大宗商品指数</label>
				</div>
				<a id="externalImport" href="#" data-toggle="modal" data-target="#importModal">外部导入+</a>
			</div>
			<br>
			<table id="sliderTab">
				<tr>
					<td>
						<div class="sliderCompany">
							<span>沪深300</span>
						</div> <input class="sliderInp" type="number" id="showArea1" />%
					</td>
					<td>
						<div class="main">
							<div class="control-group">
								<div class="scroll-bar" id="scroll-bar1">
									<div class="entire-bar" id="entire-bar1"></div>
									<div class="action-bar" id="action-bar1" style="bgcol"></div>
									<div class="action-block" id="action-block1"></div>
								</div>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="sliderCompany">
							<span>中证500</span>
						</div> <input class="sliderInp" type="number" id="showArea2" />%
					</td>
					<td>
						<div class="main">
							<div class="control-group">
								<div class="scroll-bar" id="scroll-bar2">
									<div class="entire-bar" id="entire-bar2"></div>
									<div class="action-bar" id="action-bar2"></div>
									<div class="action-block" id="action-block2"></div>
								</div>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="sliderCompany">
							<span>上证50指数</span>
						</div> <input class="sliderInp" type="number" id="showArea3" />%
					</td>
					<td>
						<div class="main">
							<div class="control-group">
								<div class="scroll-bar" id="scroll-bar3">
									<div class="entire-bar" id="entire-bar3"></div>
									<div class="action-bar" id="action-bar3"></div>
									<div class="action-block" id="action-block3"></div>
								</div>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="sliderCompany">
							<span>中债指数</span>
						</div> <input class="sliderInp" type="number" id="showArea4" />%
					</td>
					<td>
						<div class="main">
							<div class="control-group">
								<div class="scroll-bar" id="scroll-bar4">
									<div class="entire-bar" id="entire-bar4"></div>
									<div class="action-bar" id="action-bar4"></div>
									<div class="action-block" id="action-block4"></div>
								</div>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="sliderCompany">
							<span>大宗商品指数</span>
						</div> <input class="sliderInp" type="number" id="showArea5" />%
					</td>
					<td>
						<div class="main">
							<div class="control-group">
								<div class="scroll-bar" id="scroll-bar5">
									<div class="entire-bar" id="entire-bar5"></div>
									<div class="action-bar" id="action-bar5"></div>
									<div class="action-block" id="action-block5"></div>
								</div>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="sliderCompany">
							<span>债券</span>
						</div> <input class="sliderInp" type="number" id="showArea6" />%
					</td>
					<td style="width:200px;">
						<div class="main">
							<div class="control-group">
								<div class="scroll-bar" id="scroll-bar6">
									<div class="entire-bar" id="entire-bar6"></div>
									<div class="action-bar" id="action-bar6"></div>
									<div class="action-block" id="action-block6"></div>
								</div>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="sliderCompany">
							<span>期货</span>
						</div> <input class="sliderInp" type="number" id="showArea7" />%
					</td>
					<td style="width:200px;">
						<div class="main">
							<div class="control-group">
								<div class="scroll-bar" id="scroll-bar7">
									<div class="entire-bar" id="entire-bar7"></div>
									<div class="action-bar" id="action-bar7"></div>
									<div class="action-block" id="action-block7"></div>
								</div>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<button>拟合</button>
					</td>

				</tr>
			</table>

			<!-- 模态框 -->
			<div class="modal fade" id="importModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog" style="width:60%;height:600px;margin:auto;top:50%;margin-top:-300px;">
					<div class="modal-content">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<div>
							<h1 class="modal-title importTitle">外部导入</h1>
							<hr>
						</div>
						<div class="modal-body">
							<div class="table-responsive">
								<table id="importTbl" class="table" style="width:80%;margin:auto;">
									<tbody>
										<tr>
											<td>股票</td>
											<td><label for="downStock">下载模版</label> <input class="importDowninp" style="opacity:0;" id="downStock" type="file"></td>
											<td>
												<img src="${ctxResources}/images/import.png">
												<span>上传</span>
												<img class="impResultimg" src="${ctxResources}/images/importsuc.png">
											</td>
										</tr>
										<tr>
											<td>债券</td>
											<td><label for="downBonds">下载模版</label> <input class="importDowninp" style="opacity:0;" id="downBonds" type="file"></td>
											<td>
												<img src="${ctxResources}/images/import.png">
												<span>上传</span>
											</td>
										</tr>
										<tr>
											<td>期货</td>
											<td><label for="downFutures">下载模版</label> <input class="importDowninp" style="opacity:0;" id="downFutures" type="file"></td>
											<td>
												<img src="${ctxResources}/images/import.png">
												<span>上传</span>

											</td>
										</tr>
										<tr>
											<td>基金</td>
											<td><label for="downFund">下载模版</label> <input class="importDowninp" style="opacity:0;" id="downFund" type="file"></td>
											<td>
												<img src="${ctxResources}/images/import.png">
												<span>上传</span>
												<img class="impResultimg" src="${ctxResources}/images/importsuc.png">
											</td>
										</tr>
										<tr class="importFai">
											<td>现金</td>
											<td><label for="downCash">下载模版</label> <input class="importDowninp" style="opacity:0;" id="downCash" type="file"></td>
											<td>
												<img src="${ctxResources}/images/import.png">
												<span>上传</span>
												<img class="impResultimg" src="${ctxResources}/images/importfai.png">
											</td>
										</tr>
										<tr>
											<td>其他</td>
											<td><label for="downOther">下载模版</label> <input class="importDowninp" style="opacity:0;" id="downOther" type="file"></td>
											<td>
												<img src="${ctxResources}/images/import.png">
												<span>上传</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="modal-footer" style="text-align:center;border-top:none;margin-bottom:40px;">
							<button type="button" class="exporBtn" data-dismiss="modal">确定
						</button>
							<button class="exporBtn" data-dismiss="modal">取消</button>
						</div>
					</div>
				</div>
			</div>

		</section>
		<!-- 右侧部分结束-->
		<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
		<script>
			require(['base/attCustomization']);
		</script>
	</body>

</html>