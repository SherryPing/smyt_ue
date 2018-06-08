$(function(){
	var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
            window.location.href = "../website_pc/index.html";
        }
   	 //	各页面导入导航栏和底部  	 	
   	 var headerCnt = '<div class="sy-header"><div class="row head" ><span class="col-sm-11 col-xs-11" ><img src="img/head-logo.png" alt="私募云通" style="width: 33px;"/>私募云通</span><span class=" glyphicon glyphicon-align-justify switch "a="2" ></span></div><div class="cover" style="display: none;"><div class=""><ul><li class="core_data" ><a href="index.html">首页</a ></li></ul></div><div class="cover_div"><p class="core_data" data-level="2"><span class="col-xs-11 col-sm-11">核心数据</span><span class="glyphicon glyphicon-menu-down"></span></p><ul><li class="core_data li" ><a href="privateFundData.html?name=hedge">中国私募证券投资基金数据库</a></li><li class="core_data li" ><a href="publicFundData.html?name=mutual">中国公募基金数据库</a></li></ul></div><div class=""><p class="core_data" data-level="2"><span class="col-xs-11 col-sm-11">系统工具</span><span class="glyphicon glyphicon-menu-down" ></span></p><ul ><li class="core_data li" ><a href="fofeasy.html?name=fofeasy">FOF Easy可视化Web终端</a></li><li class="core_data li" ><a href="fofpower.html">FOF Power基金管理系统</a></li><li class="core_data li" ><a href="jcc.html">基金查询移动web端 — 基查查</a></li></ul></div><div class=""><p class="core_data" data-level="2"><span class="col-xs-11 col-sm-11">配套服务</span><span class="glyphicon glyphicon-menu-down" ></span></p><ul><li class="core_data li" ><a href="institution.html">云通致善资产管理研究院</a></li><li class="core_data li" ><a href="assess.html">评价服务</a></li><li class="core_data li" ><a href="exponential.html">指数服务</a></li><li class="core_data li" ><a href="club.html">云尚俱乐部</a></li></ul></div><div class=""><ul><li class="core_data" ><a href="aboutUs.html">关于我们</a ></li><li class="core_data" ><a href="applyFor.html" >申请产品试用</a></li></ul></div></div></div><div class="mask"></div>';
   	 var bootCnt = '<div class="row mtop35"><div class="col-xs-12 col-sm-12" style="padding: 0;"><div class="footerBg"><img style="width: 100%;" src="img/footer_m.png" alt=""></div></div></div><div class="row"><div class="col-xs-12 col-sm-12 footerTxt" style="padding: 0;line-height:25px"><span>公司地址：上海市浦东新区浦东南路1271-1289号华融大厦901室</span></div><div class="col-xs-12 col-sm-12 footerTxt" style="padding: 0;"><span>版权所有 Copyright(©)2016-2018</span> <span>上海琻瑢信息科技有限公司</span></div></div>';
   	 $(".load_header").html(headerCnt);
   	 $(".load_footer").html(bootCnt);
   	 
   	 $(".switch").on("click",function(){
	   		var this_a=$(this).attr("a");
	   		if(this_a==1){
	   			$(this).attr("a",2);
	   			$(".cover").slideUp(200);
	   			$(this).removeClass("glyphicon-remove").addClass("glyphicon-align-justify");
	   		}
	   		if(this_a==2){
	   			mask();
	   			$(".cover").slideDown(200);
	   			$(this).attr("a",1);
	   			$(this).removeClass("glyphicon-align-justify").addClass("glyphicon-remove");
	   		}
	   });
	   
	   $(".cover .core_data").on("click",function(){
	   		var data_hide=$(this).data("level");
			if (data_hide==1) {
				$(this).data("level",2);
				$(this).next("ul,div").slideDown(150);
				$(this).find("span:nth-child(2)").removeClass("glyphicon glyphicon-menu-right").addClass("glyphicon glyphicon-menu-down");
			}
			if(data_hide==2){
				$(this).data("level",1);
				$(this).next("ul,div").slideUp(150);
				$(this).find("span:nth-child(2)").removeClass("glyphicon glyphicon-menu-down").addClass("glyphicon glyphicon-menu-right");
			}
	   })
	//	跳转申请试用页面
	$("div[data-id='apply-btn']").click(function(){
		window.location.href="applyFor.html";
	})
	//	关于我们图片滚动
	var arr=[1,2,3,0];
	$(".about-con3 .btn-right").click(function(){		
		arr.unshift(arr.pop());
		var divs=$(".about-con3 .page-content .bg>div");
		for(var i=0;i<divs.length;i++){
			var ind="item-index"+arr[i];
			divs.eq(i).removeClass();
			divs.eq(i).addClass("item");
			divs.eq(i).addClass(ind);
			if(arr[i]=="1"){
				divs.eq(i).data('id','btn-left')
			}
		}
	})

	$(".about-con3 .btn-left").click(function(){	
		console.log("888")
		arr.push(arr.shift());
		var divs=$(".about-con3 .page-content .bg>div");
		for(var i=0;i<divs.length;i++){
			var ind="item-index"+arr[i];
			divs.eq(i).removeClass();
			divs.eq(i).addClass("item");
			divs.eq(i).addClass(ind);
		}
	})
	loadFundData();
	
		//pernum:每页展示的子div的数量;pageNum:第几页
	function page(perNum,pageNum){
		var start=(pageNum-1)*perNum;
		var end=start+perNum;
		//console.log(start,end)
		$(".pagination-div>div").css("display","none")
		$(".pagination-div>div").slice(start,end).css("display","flex")
	}
//	指数分页
	$(".exponential .pagination li").click(function(){			
		var pageNum=$(this).data("id");
		if(pageNum=="prev"){
			var tempNum=$(".exponential .pagination li.active").data("id")-1;
			if(tempNum>0){
				pageNum=tempNum;
			}else{
				pageNum=1;
			}
		}else if(pageNum=="next"){
			var tempNum2=Number($(".exponential .pagination li.active").data("id"))+1;
			var amount=$(this).prev().data("id")
			if(tempNum2<amount){
				pageNum=tempNum2;
			}else{
				pageNum=amount;			
			}
		}
		$(".exponential .pagination li").removeClass("active");	
		$(".exponential .pagination li[data-id="+pageNum+"]").addClass("active");
		page(3,pageNum)
	})
})



function loadFundData(){
	//获取头部url参数
	var geturlParams = function(url) {
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest
	}
	
	
	
	
	var url = location.search; //获取url中"?"符后的字串   
	var name = geturlParams(url).name;
	
	if(name==null){
		return;
	}
	// 头部菜单滚动
	var mutualNum=8037;
	var mutualOrgNum=133;
	var mutualManageNum=3024;
	var hedgeNum=176083;	
	var hedgeOrgNum=34046;	
	var hedgeManageNum=5567;
	$.ajax({
        url: "https://wxapi.fofeasy.com/base/fund/home/fund_about_count",
//			url: "http://192.168.11.135:8000/base/fund/home/fund_about_count",
        type: 'get',
        contentType: "application/json;charset=utf-8",
        data: {},
        async:true,
        success: function (resp) {
            if(resp.success){
            	var hedgeAll=resp.records.hedge;
            	var mutualAll=resp.records.mutual;
            	var staticdate=resp.records.hedge.date;
            	hedgeNum=hedgeAll.fund;
        		hedgeOrgNum=hedgeAll.org;
        		hedgeManageNum=hedgeAll.person;
        		mutualNum=mutualAll.fund;
        		mutualOrgNum=mutualAll.org;
        		mutualManageNum=mutualAll.person; 
//        		console.info(JSON.stringify(resp))
            	if(name=="hedge"){      
        			$(".private-con #hedge-date").text(staticdate);
        			$(".private-con #hedge-company").text(hedgeOrgNum);
        			$(".private-con #hedge-product").text(hedgeNum);
        			$(".private-con #hedge-manager").text(hedgeManageNum);
            	}else if(name=="mutual"){
            		$(".private-con #mutual-date").text(staticdate);
        			$(".private-con #mutual-company").text(mutualOrgNum);
        			$(".private-con #mutual-product").text(mutualNum);
        			$(".private-con #mutual-manager").text(mutualManageNum);
            	}else if(name=="fofeasy"){
            		$(".easy-con3 #hedge-sum").text(hedgeNum);
        			$(".easy-con3 #mutual-sum").text(mutualNum);
            		$(".easy-con3 .now-date").text(staticdate);
        			var hedgeDiv="";
        			var mutualDiv="";
        			for(var i=0;i<hedgeAll.fund_type.length;i++){
        				hedgeDiv += "<div>"+hedgeAll.fund_type[i].type_name+":"+hedgeAll.fund_type[i].num+"</div>";
        			}
        			for(var i=0;i<mutualAll.fund_type.length;i++){
        				if(mutualAll.fund_type[i].type_name=="其他基金")
        				continue;
        				mutualDiv += "<div>"+mutualAll.fund_type[i].type_name+":"+mutualAll.fund_type[i].num+"</div>";
        			}
        			$(".easy-con3 #mutual-con").html(mutualDiv);
    				$(".easy-con3 #hedge-con").html(hedgeDiv);
            	}
            }
        }
    });
}

//遮罩层
function mask(){
	var cover_height=$("body").innerHeight()-52;		//获取当前屏幕的高度
	if(cover_height>750){
		$(".cover").height(cover_height+"px")	//设置遮罩层的高度   	
		var ii=$(".cover").innerHeight();
	}	
}
