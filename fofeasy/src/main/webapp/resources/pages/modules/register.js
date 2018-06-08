define(function(require, exports, module) {
    // 引入js和css区域
    require('validate_zh');
    require('gVerify');
    require('md5');
    var $ = require('jquery');
    var constant = require('constant');
    require('distpicker');
    // 变量区域
    var flag; //账号是否存在
    var mainForm;
    // 初始化区域
    $(function() {
        init();
    });
    
    function init() {
        ui_js();
        initEvent();
    }
    
    /**
     * 初始化事件
     */
    function initEvent() {
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