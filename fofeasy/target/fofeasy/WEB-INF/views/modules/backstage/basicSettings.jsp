<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!-- 
	基本设置
	-->
	<%@ include file="/WEB-INF/views/include/taglib.jsp"%>

				<div class="prctalHeader">
					<span>基本设置</span>
				</div>
				<div class="basicSet">			
						<div id="searchAdm">
							<div class="searchInpdiv">
								<input class="searchInp" name="adminName" type="text" placeholder="管理员昵称">
									<img class="addSales" src="${ctxResources}/images/back-basicSearch.png">
							</div>
							<img class="addAdminimg" data-toggle="modal" data-target="#creatAdm" src="${ctxResources}/images/back-addadmin.png" alt="">
						</div><br><br>
						<div class="bastblDiv1">
							<table id="main-tab" ></table>
						</div>
						<div class="bastblDiv2">
							<ul id="userCount" class="adminTbl2">
								
							</ul>
						</div>
						</div>
						<div class="modal fade creatAdm" id="creatAdm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
							<div class="modal-dialog">
								<div  class="modal-content">
								<div class="modal-header">
						        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						        <h4 class="modal-title" id="gridSystemModalLabel">新增用户</h4>
						      </div>
								<form id='userFm' action="">
									<div class="modal-body">
										<input type="hidden" id="uId" name="uId" value=""/>
										<div class="form-group">
											<label for="admName" class="col-sm-3 control-label">昵称</label>
												<input type="text" class="basicInp form-control" id="admName" 
													   name="admName" placeholder="请输入昵称">
										</div>
										<div class="form-group">
											<label for="phone" class="col-sm-3 control-label">手机号</label>
												<input type="text" class="basicInp form-control" id="phone"
													   name="phone" placeholder="请输入手机号">
										</div>
											<div class="form-group">
											<label for="admPwd" class="col-sm-3 control-label">密码</label>
												<input type="password" class="basicInp form-control" id="admPwd"
													   name="admPwd" placeholder="请输入密码">
										</div>
										<div class="form-group">
											<label for="admRpwd" class="col-sm-3 control-label">确认密码</label>
												<input type="password" class="basicInp form-control" id="admRpwd" 
													   name="admPwd" placeholder="请输入确认密码">
										</div>
										<div class="form-group">
											<label class="col-sm-3 control-label">管理员类型</label>
													<select class="form-control basicSlc" id="admType" name="admType">
													</select>
										</div>
									</div>
									<div class="modal-footer" style="text-align: center;">
										<button id="regUserBtn" type="button" class="btn btn-default modalBtn" data-dismiss="modal">
											确认
										</button>
										<button type="button" class="btn btn-default modalBtn" data-dismiss="modal">取消
										</button>
										
									</div>
									</form>
								</div><!-- /.modal-content -->
							</div><!-- /.modal -->
						</div>
			</div>
		</div>

