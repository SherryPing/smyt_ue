<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!-- 个人设置 -->
				<div class="distanceTop20">
					<form id='userInformation' enctype="multipart/form-data">
						<div class="personSettitle">
							<span>个人设置</span>
							<div class="line"></div>
						</div>
						<!-- 模态框：图片预览 -->
						<div id="myModal" class="modal fade">
							<div class="modal-dialog mymodal-dialog">
								<div class="modal-content" style="width:500px;height:500px;border-radius:50%;overflow:hidden">	
									<div class="modal-body" style="padding:0">
										<img id="m-avatar" src="/resources/images/check01.png"
											class="pic" style="width:500px;height:500px"/>
									</div>				
								</div>
							</div>
						</div>
						
						<div class="personSetcnt">
							<div class="col-md-6" style="text-align: center;">
								<img id="myAvatar" class="bigHead myAvatar"
									src="${ctxResources}/images/avatar/${ucsUser.avatar}"> </br> </br>
								</br> <label class='changeAvatar' for="updateAvatar">更换头像</label><input
									class='hidden' id="updateAvatar" accept=".gif,.png,.jpg"
									type="file" name="avatar">
							</div>
							<div class="col-md-6">
								<ul class="setInfoul">
									<li><span class="setInfotitle">昵称</span>
										<div class="setinfoCnt">
											<input name='name' type="text" value="${ucsUser.name}">
										</div></li>
									<li><span class="setInfotitle">性别</span>
										<div style="width: 80%;height: 40px;float: left;">
											<input type="radio" name="sex" id="Male" value='男'
												style="margin-left:80px;"
												${ucsUser.sex=="男" ? 'checked': ''}> <label
												for="Male">男</label> <input type="radio" name="sex"
												id="Female" value='女' style="margin-left:20px;"
												${ucsUser.sex=="女" ? 'checked': ''}> <label
												for="Female">女</label>
										</div></li>
									<li><span class="setInfotitle">公司</span>
										<div class="setinfoCnt">
											<input name='company' type="text" value="${ucsUser.company}">
										</div></li>
									<li><span class="setInfotitle">职位</span>
										<div class="setinfoCnt">
											<input name='position' type="text"
												value="${ucsUser.position}">
										</div></li>
									<li><span class="setInfotitle">工作地</span>
										<div class="setinfoCnt">
											<input name='city' type="text" value="${ucsUser.city}">
										</div></li>
									<li><span class="setInfotitle">邮箱</span>
										<div class="setinfoCnt">
											<input name='email' type="text" value="${ucsUser.email}">
										</div></li>
									<li><span class="setInfotitle">密码</span>
										<div class="setinfoCnt">
											<input name='password' type="password" value="">
										</div></li>
									<li><span class="setInfotitle">手机</span>
										<div class="setinfoCnt">
											<input name='mobile' readonly="readonly" type="text"
												value="${ucsUser.mobile}">
										</div></li>
								</ul>
							</div>
						</div>
					</form>
					<button class='easy2Btn pull-right' id='submit'
						style="margin-top:30px;margin-right:60px;">提交</button>
				</div>