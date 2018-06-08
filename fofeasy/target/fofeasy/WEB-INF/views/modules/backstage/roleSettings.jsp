<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!-- 
	角色设置 
	-->
	<div class="prctalHeader">
					<span>角色设置</span>
				</div>
				<div class="userSet">
					<div class="setTitle"><span>用户设置</span></div>				
						<table class="userType">
							<tr>
								<td><img src="${ctxResources}/images/meiqian.png">试试用户<input class="inputDay" type="text" value="7" readonly><span class="manyDay">天</span></td>
								<td><img src="${ctxResources}/images/youqian.png">付费用户<input class="inputDay" type="text" value="365" readonly><span class="manyDay">天</span></td>
							</tr>
						</table>
				</div>
				<div class="userSet">
					<div class="setTitle"><span>销售分管统计</span></div>				
						<table class="userType">
							<tr>
								<td><img class="imgHeader" src="${ctxResources}/images/tx1.jpg"><img data-toggle="modal" data-target="#modifyInfo" class="bianji" src="${ctxResources}/images/bianji.png"><br><span>王冲</span><br><span>25人</span></td>
								<td><img class="imgHeader" src="${ctxResources}/images/tx1.jpg"><img class="bianji" src="${ctxResources}/images/bianji.png"><br><span>仓业新</span><br><span>25人</span></td>
								<td><img class="imgHeader" src="${ctxResources}/images/tx1.jpg"><img class="bianji" src="${ctxResources}/images/bianji.png"><br><span>冯清柳</span><br><span>25人</span></td>
								<td><img class="addSales" data-toggle="modal" data-target="#addManege" src="${ctxResources}/images/+.png"></td>
							</tr>
						</table>
				</div>
						<div class="modal fade" id="addManege" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-body">
										<div class="form-group">
											<div class="upAvatardiv"><input id="upAvatar1" type="file" name="" class="upImg"></div>
											<label for="upAvatar1" class="upAvafont">上传头像</label>
										</div>
										<div class="form-group">
											<label for="manageName" class="col-sm-3 control-label"><span class="spanRed">*</span>&nbsp;&nbsp;姓名</label>
												<input type="text" class="basicInp form-control" id="manageName" 
													   placeholder="请输入姓名">
										</div>
										<div class="form-group">
											<label for="manageEmail" class="col-sm-3 control-label"><span class="spanRed">*</span>&nbsp;&nbsp;邮箱</label>
												<input type="text" class="basicInp form-control" id="manageEmail" 
													   placeholder="请输入邮箱">
										</div>
									</div>
									<div class="modal-footer" style="text-align: center;">
										<button type="button" class="btn btn-default modalBtn">
											确认
										</button>
										<button type="button" class="btn btn-default modalBtn" data-dismiss="modal">取消
										</button>	
									</div>
								</div><!-- /.modal-content -->
							</div><!-- /.modal -->
						</div>
						<div class="modal fade" id="modifyInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-body">
										<div class="form-group">
											<div class="upAvatardiv"><input id="upAvatar2" type="file" name="" class="upImg"></div>
											<label class="upAvafont" for="upAvatar2">上传头像</label>
										</div>
										<div class="form-group">
											<label for="mName" class="col-sm-3 control-label"><span class="spanRed">*</span>&nbsp;&nbsp;姓名</label>
												<input type="text" class="basicInp form-control" id="mName" 
													   placeholder="请输入姓名">
										</div>
										<div class="form-group">
											<label for="mEmail" class="col-sm-3 control-label"><span class="spanRed">*</span>&nbsp;&nbsp;邮箱</label>
												<input type="text" class="basicInp form-control" id="mEmail" 
													   placeholder="请输入邮箱">
										</div>
									</div>
									<div class="modal-footer" style="text-align: center;">
										<button type="button" class="btn btn-default modalBtn">
											确认
										</button>
										<button type="button" class="btn btn-default modalBtn" data-dismiss="modal">取消
										</button>	
									</div>
								</div><!-- /.modal-content -->
							</div><!-- /.modal -->
						</div>