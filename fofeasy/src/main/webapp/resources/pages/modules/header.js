define(function(require, exports, module) {
    // 引入js和css区域
    require('jdirk');
    require('md5');
    require('move');
    require('validate');
    require('cookie');
    var $ = require('jquery');
    var Ladda = require('ladda');
    require('validate_zh');
    require('gVerify');
    var constant = require('constant');
    require('distpicker');

    // 变量区域
    var mainForm;
    var distanceLeft = 0;
    var color="#0586D9";
    var flag; //账号是否存在
    var click=0;//判断用户是否点击菜单栏
    // 初始化区域
    $(function(){
        init();

    });
    function init(){
        //login-----记住用户
        if ($.cookie("rememberme") == "true") {
            $("#userName").val($.cookie("username"));
            $("#password").val($.cookie("password"));
            $("#rememberme").attr('checked','true');
        }
        // 判断用户是否登录
        if(useUserId){
            $(".welcomeUser").css("display","block");
            $("#topSearchdiv").css("display","none");
        }else{
            $(".welcomeUser").css("display","none");
            $("#topSearchdiv").css("display","block");
            var click=sessionStorage.getItem("click")
            // if(click==1){ //点击过菜单-无权限-跳回首页
            //     $("#login-window").modal('show');
            // }

        }
        initAction();
        initLoginAction(); //login操作
        ui_js(); //注册操作
        initEvent()
        $(window).resize(function() { //当浏览器大小变化时
            initAction();
        });
        expiration_reminder();
    }
    function initAction(){
        $('#btnLogout').bind('click',function(e){
            layer.confirm('您确定退出系统吗？',{title:'系统提示',btn:['确定','取消'],anim:1,icon:0},function(){
                window.onbeforeunload = null;
                location.href= ctx+ '/logout';
            })
        })

        var headerUrl = window.location.href;
        if(headerUrl.indexOf("homePage")!= -1){
            $('#navUl .header0 a').css("color",color);
            $('#navUl .otherHerf').removeClass("active2");
            $('#navUl .header0').addClass("active2");
        }else if(headerUrl.indexOf("My?index=0")!= -1){
            $('#navUl .header1 a').css("color",color);
            $('#navUl .otherHerf').removeClass("active2");
            $('#navUl .header1').addClass("active2");
        }
        else if(headerUrl.indexOf("ProductPerspective")!= -1 || headerUrl.indexOf("login")!= -1 || headerUrl.indexOf("product/showContrast")!= -1||headerUrl.indexOf("excavation")!= -1||headerUrl.indexOf("IndustryData")!= -1
            ||headerUrl.indexOf("InvestmentRatings")!= -1 ){
            $('#navUl .header2>span').css("color",color);
            $('#navUl .otherHerf').removeClass("active2");
            $('#navUl .header2').addClass("active2");
        }
        else if(headerUrl.indexOf("AutonomousManagement")!= -1 || headerUrl.indexOf("Updata/index")!= -1){
            $('#navUl .header5>span').css("color",color);
            $('#navUl .otherHerf').removeClass("active2");
            $('#navUl .header5').addClass("active2");
        }
        else if(headerUrl.indexOf("combination")!= -1){
            $('#navUl .header7>span').css("color",color);
            $('#navUl .otherHerf').removeClass("active2");
            $('#navUl .header7').addClass("active2");
        }
        else if(headerUrl.indexOf("selfManagement/show")!= -1 || headerUrl.indexOf("productDetail/show/")!= -1){
            $('#navUl .header6 a').css("color",color);
            $('#navUl .header6 img').attr('src',ctxResources+"/images/header5-2.png");
            distanceLeft = 6;
            $('#navUl .otherHerf').removeClass("active2");
            $('#navUl .header6').addClass("active2");
        }
        else if(headerUrl.indexOf("Cockpit")!= -1){
            $('#navUl .header10 a').css("color",color);
            $('#navUl .header10 img').attr('src',ctxResources+"/images/header10-2.png");
            distanceLeft = 0;
            $('#navUl .otherHerf').removeClass("active2");
            $('#navUl .header10').addClass("active2");
        }
    }

    function initLoginAction() {
        $("#Logintn").click(function(){
            $(".roleLogin").fadeOut(100);
            $(".accoLogin").fadeIn(1000);
        })
        $("a:contains('注册')").on('click',function(){
            window.location.href = ctx+'/register';
        });
        $('#btnSubmit').on('click',function(){
            var userName = $('#userName').val();
            var password = $('#password').val();
            if(userName.length==0){
                layer.msg('请输入手机号');
            }
            else if(!(/^1[34578]\d{9}$/.test(userName))){
                layer.msg('请输入正确的手机号码');
            }else if(password.length==0){
                layer.msg('请输入密码');
            }
            else{
                doLogin()
            }
        })
        $("#loginForm input").each(function(){
            $(this).bind('keypress',function(event){
                if(event.keyCode == "13") {
                    var userName = $('#userName').val();
                    var password = $('#password').val()
                    if(userName.length==0){
                        layer.msg('请输入手机号');
                    }
                    else if(!(/^1[34578]\d{9}$/.test(userName))){
                        layer.msg('请输入正确的手机号码');
                    }else if(password.length==0){
                        layer.msg('请输入密码');
                    }
                    else{
                        doLogin()
                    }
                }
            });
        });
    }
    function initEvent(){
        //header-----事件
        $("#modal2").on('click',function(){
            $(".modal2").modal('hide');
        });
        $("#modal3").on('click',function(){
            $(".modal3").modal('hide');
        })
        $("#closeAllModal").on('click',function(){
            $(".modal").modal('hide');
        })
        $('#topSearch').on('click',function(){
            var test = window.location.href;
            //判断当前页面是否是产品透视页面。
            var prc = test.indexOf("ProductPerspective");
            var excavation = test.indexOf("excavation");
            if(excavation!=-1){
                sessionStorage.setItem('searchContent',$('#search_topinp').val());
                sessionStorage.setItem('searchType',$('#select_top').val());
                window.open(ctx+"/excavation/");
            }else if(prc!=-1){

            }else{
                sessionStorage.setItem('searchContent',$('#search_topinp').val());
                sessionStorage.setItem('searchType',$('#select_top').val());
                window.open(ctx+"/ProductPerspective");
            }
        });
        $("#navUl li").on('click',function(){
            // $("#navUl li a").preventDefault();
            console.log(window.location.href);
            // debugger;
            var dom = $(this);
            if(dom.find('a').attr('href') == "#"){
                if(dom.hasClass('header5'))
                    layer.msg('您没有购买【升级版】或【组合版】，请联系您的销售经理！');
                else if(dom.hasClass('header7'))
                    layer.msg('您没有购买【组合版】，请联系您的销售经理！');
                else if(dom.hasClass('header8'))
                    layer.msg('您没有购买【升级版】或【组合版】，请联系您的销售经理！');
                else
                    layer.msg('权限不足！！');
            }
            if(useUserId){
                sessionStorage.setItem("click", "0");
            }else{//未登录点击菜单栏时存储click为1以便回首页调用login弹框
                sessionStorage.setItem("click", "1");
                $("#login-window").modal('show');
                return false; //禁用掉a的链接跳转
            }

        });

        //注册-----事件
        $("#getCode").on('click', function() { //发送短信验证
            if(flag) {
                layer('该号码已注册！');
            } else {
                $.post(ctx + "/ucsUser/Authentication", {
                        "mobile": $("#userPhone").val()
                    },
                    function(resp) {
                        if(resp.success) {
                            $.post(ctx + "/ucsUser/ucsUser:sms", {
                                "mobile": $("#userPhone").val(),
                                "newDate": $.date.format(new Date(), 'yyyy-MM-dd HH:mm:ss')
                            });
                        } else {
                            layer.msg("每个手机号每天仅可获取3次");
                        }
                    })
            }
        });
        $("#registerBtn").on('click', function() {
            var registStatus = $('#userFRM span').hasClass("tips_false");
            console.log(registStatus)
            number = userFRM.mobile.value;
            if(number.length == 0) {
                layer.msg("请输入手机号码");
            } else if(registStatus == 1) {
                layer.msg("请填写正确的信息");
            } else if(flag) {
                layer.msg("该手机号已注册");
            } else if($('#rstCertificate').is(':checked') == false) {
                layer.msg("请阅读风险提示书，勾选已阅读");
            } else {
                register();
            }
        });
    }

    //header事件-----
    function expiration_reminder(){
        $.ajax({
            url:ctx+'/ucsUser/getDay',
            type:'get',
            data:{'userId':useUserId},
            success:function(resp){
                if(resp < 7){
                    $('#expiration_reminder').text('剩余'+resp+'天到期，请联系销售经理');
                }
            }
        })
    }

    //login事件-----保存用户信息
    function saveuserinfo() {
        if($("#rememberme").is(":checked")) {
            var username = $("#userName").val();
            var password = $("#password").val();
            $.cookie("rememberme", "true", { expires: 7 }); // 存储一个带7天期限的 cookie
            $.cookie("username", username, { expires: 7 }); // 存储一个带7天期限的 cookie
            $.cookie("password", password, { expires: 7 }); // 存储一个带7天期限的 cookie
        }
        else {
            $.cookie("rememberme", "false", { expires: -1 });
            $.cookie("username", '', { expires: -1 });
            $.cookie("password", '', { expires: -1 });
        }
    }
    function doLogin(){
        var md5Pass = hex_md5(hex_md5($("#password").val()));
        var data = {"username":$('#userName').val(),"password":md5Pass};
        console.log(data);
        $.ajax({
            url:ctx+'/login',
            type:'post',
            data:data,
            success:function(resp){
                if (!resp.success){
                    layer.msg(resp.msg);
                    //
                } else{
                    layer.msg("登录成功");
//					alert(resp.url);
                    saveuserinfo();
                    var url = window.top.location.href;
                    if(null != url && ""!=url && "/"!=url && '/WEB-INF/views/error/404.jsp'!=url){
                        window.location.href = url;
                    }else{
                        window.location.href = ctx+'/userCenter/homePage/';
                    }

                }
            }
        }).always(function(){
            //process.stop();
        });
    }

    //注册事件---
    function register() {
        var params = {
            "createtime": $.date.format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        };
        var table = $('#userFRM').serializeObject();
        $.extend(params, table);
        params.password = hex_md5(hex_md5(params.password));
        $.ajax({
            url: ctx + '/ucsUser/add',
            type: 'post',
            data: params,
            success: function(resp) {
                if(resp.success) {

                    layer.msg("添加成功，待工作人员与您联系！");
                    setTimeout(function() {
                        window.location.href = ctx+"/login";
                    }, 1500);

                } else {
                    layer.msg(resp.msg);
                }
            }
        })
    }

    function ui_js() {
        $('#userPhone').blur(function phoneNumber() {
            $.post(ctx + "/ucsUser/isExists", {
                    "mobile": $("#userPhone").val()
                },
                function(resp) {
                    flag = resp.success;
                    if(flag) {
                        divPhone.innerHTML = '<span class="tips_false">该号码已存在</span>';
                    } else {
                        number = userFRM.mobile.value;
                        if(!(/^1[34578]\d{9}$/.test(number))) {
                            divPhone.innerHTML = '<span class="tips_false">请输入正确的手机号码</span>';
                        } else {
                            divPhone.innerHTML = '<span class="tips_true">√</span>';
                            if($('#imgCode').parent().find("span").hasClass("tips_true") && $('#userPhone').parent().find("span").hasClass("tips_true")) {
                                $('#getCode').addClass("getCodeBtn2");
                            }
                        }
                    }
                })

        });
        //验证密码 
        $('#userPwd').blur(function() {
            psd = userFRM.password.value;
            if(psd.length < 6  ||  psd.length > 12) {
                divPassword.innerHTML = '<span class="tips_false">请输入6-18位数字或字母</span>';
            } else {
                divPassword.innerHTML = '<span class="tips_true">√</span>';
                $('#userPwd2').blur(function() {
                    psd = userFRM.password.value;
                    psd2 = userFRM.password2.value;
                    if(psd != psd2) {
                        divPassword2.innerHTML = '<span class="tips_false">确认密码与密码不一致</span>';
                    } else {
                        divPassword2.innerHTML = '<span class="tips_true">√</span>';
                    }
                });
            }
        });

        //验证公司
        $('#userCompany').blur(function() {
            company = userFRM.company.value;
            if(company.length == 0) {
                divCompany.innerHTML = '<font class="tips_false">请输入公司名称</font>';
            } else {
                divCompany.innerHTML = '<span class="tips_true">√</span>';
            }
        });
        //图形验证码
        var verifyCode = new GVerify("v_container");
        $('#imgCode').blur(function() {
            var res = verifyCode.validate(userFRM.imgCode.value);
            if(res) {
                divImgcode.innerHTML = '<span class="tips_true">√</span>';
                if($('#imgCode').parent().find("span").hasClass("tips_true") && $('#userPhone').parent().find("span").hasClass("tips_true")) {
                    $('#getCode').addClass("getCodeBtn2");
                }
            } else {
                divImgcode.innerHTML = '<span class="tips_false">验证码错误</span>';
            }
        });
        //手机验证码
        $('#phoneCode').blur(function() {
            code = userFRM.phoneCode.value;
            if(code.length < 4) {
                divPhonecode.innerHTML = '<span class="tips_false">请填写验证码</span>';
            } else {
                divPhonecode.innerHTML = '<span class="tips_true">√</span>';
            }
        })
        $('#getCode').click(function() {
            number1 = userFRM.mobile.value;
            var res = verifyCode.validate(userFRM.imgCode.value);
            if(!(/^1[34578]\d{9}$/.test(number1))) {
                divPhone.innerHTML = '<span class="tips_false">请输入正确的手机号码</span>';
            } else if(!res) {
                divImgcode.innerHTML = '<span class="tips_false">图形验证码错误</span>';
            } else {
                divPhone.innerHTML = '<span class="tips_true">√</span>';
                var number = 100;
                $('#getCode').html("重新获取(" + number + ")");
                $('#getCode').attr("disabled", "disabled");
                setInterval(function() {
                    if(number > 0) {
                        number -= 1;
                        $('#getCode').html("重新获取(" + number + ")");
                    } else {
                        $('#getCode').html("重新获取");
                        $('#getCode').removeAttr("disabled");
                    }
                }, 1000)
            }
        });
    }
});
