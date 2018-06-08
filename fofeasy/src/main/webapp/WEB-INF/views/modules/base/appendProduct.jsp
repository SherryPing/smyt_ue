<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

		<div>
			<div class="top-bg">已选基金名称：</div>
			
		</div>
		<div>
			<form class="">
			<table border="0" >
				<tr>
					<td>产品名称：</td>
					<td><input class="form-control" type="text" /></td>
					<td>投资顾问：</td>
					<td><input class="form-control" type="text" /></td>
					<td>投资经理：</td>
					<td><input class="form-control" type="text" /></td>
				</tr>
				<tr>
					<td>发行主题：</td>
					<td>
						<select class="form-control">
							<option selected = "selected">--请选择--</option>
							<option>--1--</option>
							<option>--2--</option>
							<option>--3--</option>
							<option>--4--</option>
							
						</select>
					</td>
					<td colspan="2"><input class="form-control" type="text" /></td>
					<td >投资策略：</td>
					<td>
						<select class="form-control">
							<option  selected = "selected">--请选择--</option>
							<option>--1--</option>
							<option>--2--</option>
							<option>--3--</option>
							<option>--4--</option>
						</select>
					</td>
				</tr>
			</table>
			<div>
			<button class="btn btn-default fof-bg-color pull-right">搜&nbsp;索</button>
			</div>
			</form>
		</div>
		<div>
			 <table id="addForm-grid"></table>
		</div>
		<hr />
		
		<button class="btn btn-default fof-bg-color pull-right">取&nbsp;消</button><button class="btn btn-default fof-bg-color pull-right">确&nbsp;定</button>

