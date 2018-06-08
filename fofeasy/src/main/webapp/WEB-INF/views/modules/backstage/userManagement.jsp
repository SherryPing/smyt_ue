<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!-- 
	用户管理 
	-->
<div class="tabContent">
				 <!-- 选项卡 -->
				  <ul class="nav nav-tabs" id="indexTabheader">
				    <li role="presentation"><div id="newuserBtn" style="width: 110px;" class="tabheadBtnac" href="#regist"
							aria-controls="home" role="tab" data-toggle="tab">新注册用户</div></li>
				    <li role="presentation"><div id="ApprovedBtn" style="width: 140px;" class="tabheadBtn" href="#audit"
							aria-controls="profile" role="tab" data-toggle="tab">已审核用户</div></li>
					  <li role="presentation"><div id="AuditBtn" style="width: 140px;" class="tabheadBtn" href="#expiredUsersDIV"
							aria-controls="profile" role="tab" data-toggle="tab">停用用户</div></li>
				  </ul>
				  <!-- Tab panes -->
				  <div class="tab-content">
				  <!-- 新注册用户DIV -->
				    <div role="tabpanel" class="tab-pane active" id="regist">
						 <div>
							 <!-- <span>手机号</span><input type="text" id="rgPhone">
						 	<span>公司</span><input type="text" id="rgCompany">
							 <span>姓名</span><input type="text" id="rgName"> 
							 <img class="searchImg imgClick" src="${ctxResources}/images/sousuo.png">-->
							 <img id = 'new_user_pass' class="" src="${ctxResources}/images/pass.png">
							 <img id = 'new_user_failed' class="" src="${ctxResources}/images/failed.png">
						</div>
						<!-- 新用户注册DIV头部 -->
					<div class="table-responsive">
						<table id='newUserTab' class="table usertab1"></table>
				    </div>
				 </div>
				 <!-- 已审核用户DIV -->
				    <div role="tabpanel" class="tab-pane" id="audit">
				    	 <div>
							<!-- <span>手机号</span><input type="text">
						 	<span>公司</span><input type="text">
							<span>姓名</span><input type="text"> 
							<img class="searchImg imgClick" src="${ctxResources}/images/sousuo.png">-->
							<img id = "audited_user_Creat" class=" imgClick" src="${ctxResources}/images/Creatuser.jpg" data-toggle="modal" data-target="#approvedUsers">
							<img class=""  src="${ctxResources}/images/Export.png" style="margin-top: -1px;">
							</div>
					
						<!-- 已审核用表 -->
					<div class="table-responsive">
						<table id = "userApprovedTab" class="table usertab2"></table>
				    </div>
				    </div>
					  <!-- 审核失败DIV -->
					  <div role="tabpanel" class="tab-pane" id="expiredUsersDIV">
						  <div>
							  <!-- <span>手机号</span><input type="text">
						 	<span>公司</span><input type="text">
							<span>姓名</span><input type="text">
							<img class="searchImg imgClick" src="${ctxResources}/images/sousuo.png">
							  <img id = "audited_user_Creat" class=" imgClick" src="${ctxResources}/images/Creatuser.jpg" data-toggle="modal" data-target="#approvedUsers">
							  <img class=""  src="${ctxResources}/images/Export.png" style="margin-top: -1px;">-->
						  </div>

						  <!-- 审核失败表 -->
						  <div class="table-responsive">
							  <table id = "expiredUserTab" class="table usertab2"></table>
						  </div>
					  </div>
			  	  </div>			
			</div>

		<!-- 模态框：图片预览 -->
		<div id="myModal" class="modal fade" tabindex="1" style="z-index: 111111111">
			<div class="modal-dialog mymodal-dialog">
				<div class="modal-content">
					<div class="modal-body" style="padding:0">
						<img id="m-avatar" src="/resources/images/check01.png"
							  style="width:100%;height:100%"/>
					</div>
				</div>
			</div>
		</div>
		<!-- 注册&编辑 -->
				<div class="modal fade" id="approvedUsers" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
					
						<form  id = 'userFROM' enctype="multipart/form-data" name='userFROM'>
						<input type="hidden" name = 'id'>
						<div class="modal-content editomodale">
							<div class="modal-header">
						        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						        <h4 class="modal-title" id="gridSystemModalLabel">新增用户</h4>
						      </div>
							<div class="modal-body">
								<div class="form-group">
									<div class="One_third">
										<label for="approvedPhone"><span class="spanRed">*</span>手机号：</label>
										<input type="number" class="editoInp" name="mobile" id="approvedPhone">
									</div>
									<div class="One_third">
										<label for="approvedCompany">公司：</label>
										<input type="text"  id="approvedCompany" class="editoInp" name="company">
									</div>
									<div class="One_third">
										<label for="approvedName"><span class="spanRed">*</span>姓名：</label>
										<input type="text" id="approvedName" class="editoInp" name="real_name">
									</div>
								</div>
								<div class="form-group">
									<div class="One_third">
										<label for="approvedLocation">地址：</label>
										<input type="text" id="approvedLocation" class="editoInp" name="city">
									</div>
									<div class="One_third">
										<label>销售：</label>
												<select name='salesman_id' class="editSlc" id="approvedManager">
													<option value='32519698-70e0-11e7-9acb-6c92bf481f81'>冯清柳</option>
													<option value='05a44d00-70e1-11e7-9acb-6c92bf481f81'>仓业新</option>
													<option value='1d0f8aa4-7110-11e7-9acb-6c92bf481f81'>王冲</option>
													<option value='0e1bc832-7110-11e7-9acb-6c92bf481f81'>陈璐佳</option>
												</select>
									</div>			
								</div>
								<div class="form-group">
									<div class="One_third">
										<label for="approvedPwd"><span class="spanRed">*</span>密码：</label>
										<input type="password" name = 'password' class="editoInp" id="approvedPwd">
									</div>
									<div class="One_third">
									<label for="approvedRpwd"><span class="spanRed">*</span>确认密码：</label>
									<input type="password" class="editoInp" id="approvedRpwd" name='repassword'>
								</div>
								<div class="form-group" style="margin-top:20px;">
										<div class="One_third">
											<label>用户类型：</label>
											<select name='type' class="editSlc" id="approvedType">
												<option value='01'>基础版</option>
												<option value='02'>升级版</option>
												<option value='03'>组合版</option>
											</select>
										</div>
										<div class="One_third">
											<input type="text" name = 'effective_day' class="useData"  value="30"><span class="spanDay">天</span>
										</div>
								</div><!-- <label class="useState">状态：试用一次</label><br> -->
								<div class="upCardiv">
									<label style="display:inline-block;width:70px;text-align:right;">名片：</label><label class="upCarbtn" for="upCardinp">上传名片</label>
									<input type="file" name="cardImg" id="upCardinp" style="opacity:0;">
								</div>
								<img class="userCard" src="${ctxResources}/images/card.jpg" style="margin-left:110px;"><br><br>
								<div class="form-group">
									<label class="Notes">备注：</label><textarea name='remarks' class="area" rows="3"></textarea>
								</div>
							</div>
							<div class="modal-footer" style="text-align: center;">
								<button id = 'savenUser' type="button" class="btn btn-default modalBtn" data-dismiss="modal">
									确认
								</button>
								<button type="button" class="btn btn-default modalBtn" data-dismiss="modal">取消
								</button>
								
							</div>
							</form>
						</div><!-- /.modal-content -->
					</div><!-- /.modal -->
				</div>
				<script>
	        		require(['backstage/userManagement']);
	   	 		</script>
						