<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="container-fluid">
	<form id="main-form" action="${ctx}/product/import"
		class="form-horizontal margin-top">
		<div>
			<input type="hidden" name="id" value="${fontalInstock.id}" />
			<input type="hidden" id="fontalDeviceInfoDialogData">
			<input type="hidden" name="instockUser" id="instockUser" value="${fontalInstock.instockUser}"/>
			<input type="hidden" name="buyerUser" id="buyerUser" value="${fontalInstock.buyerUser}"/>
			<input type="hidden" name="keeperUser" id="keeperUser" value="${fontalInstock.keeperUser}"/>
		</div>
		<div class="row">
			<div class="col-lg-6">
				<div class="form-group unit">
					<label class="col-xs-3 text-right control-label"><span class="red">*</span>产品:</label>
					<div class="col-xs-9">
						<div class="uploader-container">
							<div id="contentFile"></div>
							<input type="hidden" id="contentFileInput"/>
							<input type="hidden" id="content" name="content"/>
							<input type="hidden" id="vmName"  name="vmName"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</form>
</div>