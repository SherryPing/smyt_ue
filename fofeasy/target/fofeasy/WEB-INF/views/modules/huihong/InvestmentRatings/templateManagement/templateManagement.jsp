<!-- 尽调模板管理.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<div class="outerDiv investmenTratings-template">
	<ul class="comPrcul make_profile">
		<li>
			<div class="borderBttomdashed">
				<div class="halfDiv pull-left">
					<span>系统默认模板</span>
				</div>
				<div class="halfDiv pull-left">
					<a style="font-size: 13px;font-weight: 400;" href="/InvestmentRatings/observationPool1/reportPreview/-,-"><img src="${ctxResources}/images/huisheng/reportview.png" alt="">预览</a>
					<a style="font-size: 13px;font-weight: 400;" href="http://osz37q9fk.bkt.clouddn.com/2017-12-14/dd_template2.xlsx"><img src="${ctxResources}/images/huisheng/noupload_down.png" alt="">下载</a>
					<img id="createNewTemp2" src="/resources/images/setAlert.png">
				</div>
			</div>
			<div class="notes">
				备注：适用于任何类型的万能模板
			</div>
		</li>
		<%--<li>--%>
			<%--<div class="borderBttomdashed">--%>
				<%--<div class="halfDiv pull-left">--%>
					<%--<span>用户自定义模板</span>--%>
				<%--</div>--%>
				<%--<div class="halfDiv pull-left">--%>
					<%--<img src="${ctxResources}/images/setAlert.png">--%>
				<%--</div>--%>
			<%--</div>--%>
			<%--<div class="notes">--%>
				<%--备注：此处显示用户备注信息--%>
			<%--</div>--%>
		<%--</li>--%>
	</ul>
</div>
<div id="hh-templateManage" class="outerDiv" style="display:none;">
	<div class="row">
		<div class="col-md-12 ">
			<div class="header">
				<p>创建尽调模板</p>
			</div>
			<div class="topImg">
				<div class="col"></div>
				<div class="col">
					<img src="${ctxResources}/images/check06.png" />
					<p>基金信息</p>
				</div>
				<div class="col">
					<img src="${ctxResources}/images/check06.png" />
					<p>核心团队</p>
				</div>
				<div class="col">
					<img src="${ctxResources}/images/check06.png" />
					<p>投资策略</p>
				</div>
				<div class="col">
					<img src="${ctxResources}/images/check06.png" />
					<p>产品要素</p>
				</div>
				<div class="col">
					<img src="${ctxResources}/images/check06.png" />
					<p>IT与风控</p>
				</div>
				<div class="col"></div>
			</div>
			<div class="fundInfo">
				<div class="header1">
					<p>基金信息</p>
				</div>
				<div class="funDetail">
					<div class="line">
						<div class="col">
							<input type="checkbox" id=""> <label>私募管理人名称</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>基金业协会登记编号</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>登记时间</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>注册地址</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>办公地址</label>
						</div>
					</div>
					<div class="line">
						<div class="col">
							<input type="checkbox" id=""> <label>注册资本</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>是否具备投顾资格</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>已发行产品数量</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>客户结构</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>管理规模</label>
						</div>
					</div>
					<div class="line">
						<div class="col">
							<input type="checkbox" id=""> <label>自营资金管理规模占比</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>成立年限</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>公司理念</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>公司文化</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>经营规划</label>
						</div>
					</div>
					<div class="line">
						<div class="col">
							<input type="checkbox" id=""> <label>股权结构</label>
						</div>
					</div>
					<div class="line subLine">
						<div class="col">
							<input type="checkbox" id=""> <label>股东名称</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>是否为国内外大型企业</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>是否为核心基金经理</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>出资金额</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>持股比例</label>
						</div>
					</div>
					<div class="line">
						<div class="col">
							<input type="checkbox" id=""> <label>财务状况</label>
						</div>
					</div>
					<div class="line subLine">
						<div class="col">
							<input type="checkbox" id=""> <label>资产</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>负债</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>主营业务收入</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>主营业务收入同比增长</label>
						</div>
						<div class="col"></div>
					</div>
					<div class="line subLine" style="margin-top:10px">
						<div class="col">
							<input type="checkbox" id=""> <label>资管业务收入占比</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>净利润</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>净利润同比增长</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>自营资金收入</label>
						</div>
						<div class="col">
							<input type="checkbox" id=""> <label>自营资金收入占比</label>
						</div>
					</div>
					<div class="btnGroup">
						<button class="btn">下一步</button>
						<button class="btn">重 置</button>
						<button class="btn">取 消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
