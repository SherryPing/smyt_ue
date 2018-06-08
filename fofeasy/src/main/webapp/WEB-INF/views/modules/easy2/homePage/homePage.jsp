<!-- 帮助手册.jsp -->
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <%@ include file="/WEB-INF/views/include/taglib.jsp"%>
    <link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
    <title>首页</title>
    <%@ include file="/WEB-INF/views/include/meta.jsp"%>
    <%@ include file="/WEB-INF/views/include/common-css.jsp"%>
    <link rel="stylesheet"
          href="${ctxResources}/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" />
</head>
<body>
<!-- 头部分开始 -->

<%@ include file="/WEB-INF/views/system/header.jsp"%>

<!-- 用户服务模态框（Modal） -->
<div class="modal fade" id="serviceAgreement" tabindex="-1"
     role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h2 class="modal-title">服务协议</h2>
            </div>
            <div class="modal-body">
                <div class="modaldiv">
                    <p>1、接受条款</p>
                    <p>1.1</p>
                    <p>上海琻瑢信息科技有限公司根据以下服务条款为您提供服务。在使用上海琻瑢信息科技有限公司开发的FOF Easy前，
                        请您仔细阅读本服务条款。为获得FOF Easy网络服务，服务使用人（以下称“用户”）应当同意本协议的全部条款并按照
                        页面上的提示完成全部的注册程序。用户在进行注册程序过程中点击“同意”按钮即表示用户完全接受本协议项下的全部
                        条款。上海琻瑢信息科技有限公司有权在必要时修改本服务条款。服务条款一旦发生变动，会及时在页面上通知用户。</p>
                    <p>1.2</p>
                    <p>用户注册成功后，通过审核后。上海琻瑢信息科技公司将给予每个用户一个用户帐号及相应的密码，该用户帐号和
                        密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。您可随时改变您的密码，也可以结
                        束旧的帐户重开一个新帐户。用户同意若发现任何非法使用用户帐号或安全漏洞的情况，立即通告上海琻瑢信息科技公司。</p>
                    <p>2. 服务简介</p>
                    <p>2.1FOF Easy目前向用户提供如下服务：基金产品信息及咨询服务等。</p>
                    <p>2.2用户必须支付个人上网与此服务有关的费用。如用户拒绝支付相关费用，则FOF
                        Easy有权不向用户提供该项收费网络服务。</p>
                    <p>3. 服务条款的修改与修订</p>
                    <p>3.1</p>
                    <p>鉴于网络服务的特殊性，用户同意FOF Easy有权随时变更、中断或终止部分或全部的网络服务（包括收费网络服务）。
                        如变更、中断或终止的网络服务属于免费网络服务，FOF Easy无需通知用户，也无需对任何用户或任何第三方承担任何责
                        任；如变更、中断或终止的网络服务属于收费网络服务，FOF Easy应当在变更、中断或终止之前事先通知用户，并应向受
                        影响的用户提供等值的替代性的收费网络服务，如用户不愿意接受替代性的收费网络服务，就该用户已经支付的服务费， FOF
                        Easy应当按照该用户实际使用相应收费网络服务的情况扣除相应服务费之后将剩余的服务费退还给该用户。</p>
                    <p>3.2</p>
                    <p>FOF Easy保留随时修改或中断服务 而不需知照用户的权利。FOF Easy行使修改
                        或中断服务的权利，不需对用户或第三方负责。</p>
                    <p>3.3</p>
                    <p>如发生下列任何一种情形，FOF Easy有权随时中断或终止向用户提供本协议项下的网络服务（包括收费网络服务）
                        而无需对用户或任何第三方承担任何责任：</p>
                    <p>3.3.1 用户提供的个人资料不真实；</p>
                    <p>3.3.2 用户违反本协议中规定的使用规则；</p>
                    <p>3.3.3 用户在使用收费网络服务时未按规定向FOF Easy相应的服务费。</p>
                    <p>4. 使用规则</p>
                    <p>4.1</p>
                    <p>在使用FOF Easy网络服务时，用户必须提供及时、详尽及准确的个人资料。</p>
                    <p>4.2</p>
                    <p>不断更新注册资料，符合及时、详尽准确的要求。所有原始键入的资料将引用为注册资料。</p>
                    <p>4.3</p>
                    <p>用户不应将其帐号、密码转让或出借予他人使用。如用户发现其帐号遭他人非法使用，应立即通知FOF Easy。
                        因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用，本公司不承担任何责任。</p>
                    <p>4.4</p>
                    <p>用户同意FOF Easy有权在提供网络服务过程中以各种方式投放各种商业性广告或其他任何类型的商业信息（
                        包括但不限于在FOF Easy站的任何页面上投放广告），并且，用户同意接受FOF
                        Easy通过电子邮件或其他方式向用户发送相关商业信息。</p>
                    <p>4.5</p>
                    <p>用户在使用FOF Easy网络服务过程中，必须遵循以下原则：</p>
                    <p>4.5.1 遵守中国有关的法律和法规；</p>
                    <p>4.5.2 遵守所有与网络服务有关的网络协议、规定和程序；</p>
                    <p>4.5.3 不得为任何非法目的而使用网络服务系统；</p>
                    <p>4.5.4 不得以任何形式使用FOF
                        Easy网络服务侵犯上海琻瑢信息科技有限公司的商业利益，包括并不限于发布非经上海琻瑢信息科技有限公司许可的商业广告；</p>
                    <p>4.5.5 不得利FOF Easy进行任何可能对互联网或移动网正常运转造成不利影响的行为；</p>
                    <p>4.5.6 不得利用FOF
                        Easy提供的网络服务上传、展示或传播任何虚假的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料；</p>
                    <p>4.5.7 不得侵犯其他任何第三方的专利权、著作权、商标权、名誉权或其他任何合法权益；</p>
                    <p>4.5.8 不得利用FOF Easy网络服务系统进行任何不利于FOF Easy的行为；</p>
                    <p>4.6</p>
                    <p>FOF Easy对用户使用FOF Easy网络服务的情况进行审查和监督(包括但不限于对用户存储在FOF
                        Easy的内容进行审核)， 如用户在使用网络服务时违反任何上述规定，FOF
                        Easy或其授权的人有权要求用户改正或直接采取一切必要的措施（包括
                        但不限于更改或删除用户张贴的内容等、暂停或终止用户使用网络服务的权利）以减轻用户不当行为造成的影响。</p>
                    <p>4.6</p>
                    <p>FOF Easy针对某些特定的FOF
                        Easy网络服务的使用通过各种方式（包括但不限于网页公告、电子邮件、短信提醒等）
                        作出的任何声明、通知、警示等内容视为本协议的一部分，用户如使用该等FOF
                        Easy网络服务，视为用户同意该等声明、通知、警示的内容。</p>
                    <p>5. 隐私保护</p>
                    <p>尊重并保护用户隐私是FOF Easy一项基本政策，FOF
                        Easy不会公开、编辑或透露用户的注册资料。除非符合以下情况：</p>
                    <p>5.1.1 事先获得用户的明确授权；</p>
                    <p>5.1.2 根据中华人民共和国国家安全机构、公安部门的要求及根据相应的法律程序要求；</p>
                    <p>5.1.3为维护上海琻瑢信息科技有限公司的合法权益。</p>
                    <p>5.1.4 &nbsp;在紧急情况下竭力维护会员个人、其它社会个体和社会大众的安全；</p>
                    <p>5.2</p>
                    <p>FOF Easy可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与FOF
                        Easy同等的保护 用户隐私的责任，则FOF Easy有权将用户的注册资料等提供给该第三方。</p>
                    <p>5.3</p>
                    <p>为了协作和提供服务，在不透露单个用户隐私资料的前提下，FOF
                        Easy有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p>
                    <p>6. 免责声明</p>
                    <p>6.1</p>
                    <p>用户明确同意使用FOF Easy网络服务所存在的风险将完全由自己承担；因用户自身使用FOF
                        Easy网络服务而产生的 一切后果也由用户自己承担，本公司对用户不承担任何责任。</p>
                    <p>6.2</p>
                    <p>本公司不担保网络服务一定能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。</p>
                    <p>6.3</p>
                    <p>本公司不保证为向用户提供便利而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由FOF Easy
                        实际控制的任何网页上的内容，本公司不承担任何责任。</p>
                    <p>6.4</p>
                    <p>对于因本公司合理控制范围以外的原因，包括但不限于自然灾害、罢工或骚乱、物质短缺或定量配给、暴动、战争行为、
                        政府行为、 通讯或其他设施故障或严重伤亡事故等，致使本公司延迟或未能履约的，本公司不对您承担任何责任。</p>
                    <p>6.5</p>
                    <p>用户同意，对于FOF Easy向用户提供的数据产品或者服务的质量中由于数据自然缺陷本身引发的任何损失，FOF
                        Easy无需承担任何责任。</p>
                    <p>6.6用户理解并接受下载或通过FOF
                        Easy产品服务取得的任何信息资料取决于用户自己，并由其承担系统受损或资料丢失的所有风险和责任。</p>
                    <p>7. 知识产权</p>
                    <p>FOF Easy为提供网络服务而使用的任何软件（包括但不限于软件中所含的任何图象、照片、动画、录像、 录音、音乐、
                        文字和附加程序、随附的帮助材料）的一切权利均属于该软件的著作权人，未经该软件的著作权人许可，用户不得对该软件 进行反向工程
                        （reverse engineer）、反向编译（decompile）或反汇编（disassemble）。</p>
                    <p>8. 用户管理</p>
                    <p>用户单独承担发布内容的责任。用户对服务的使用是根据所有适用于服务的地方法律、国家法律和国际法律标准的。用户承诺：</p>
                    <p>8.1在FOF Easy的网页上发布信息或者利用FOF
                        Easy的服务时必须符合中国有关法规(部分法规请见附录)，不得在FOF Easy 的网页上或者利用FOF
                        Easy的服务制作、复制、发布、传播以下信息：</p>
                    <p>(1) 反对宪法所确定的基本原则的；</p>
                    <p>(2) 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>
                    <p>(3) 损害国家荣誉和利益的；</p>
                    <p>(4) 煽动民族仇恨、民族歧视，破坏民族团结的；</p>
                    <p>(5) 破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
                    <p>(6) 散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
                    <p>(7) 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
                    <p>(8) 侮辱或者诽谤他人，侵害他人合法权益的；</p>
                    <p>(9) 含有法律、行政法规禁止的其他内容的。</p>
                    <p>7.2在FOF Easy的网页上发布信息或者利用FOF
                        Easy的服务时还必须符合其他有关国家和地区的法律规定以及国际法的有关规定。</p>
                    <p>8.3不利用FOF Easy的服务从事以下活动：</p>
                    <p>(1) 未经允许，进入计算机信息网络或者使用计算机信息网络资源的；</p>
                    <p>(2) 未经允许，对计算机信息网络功能进行删除、修改或者增加的；</p>
                    <p>(3) 未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；</p>
                    <p>(4) 故意制作、传播计算机病毒等破坏性程序的；</p>
                    <p>(5) 其他危害计算机信息网络安全的行为。</p>
                    <p>8.4不以任何方式干扰FOF Easy的服务。</p>
                    <p>8.5遵守FOF Easy的所有其他规定和程序。</p>
                    <p>用户需对自己在使用FOF Easy服务过程中的行为承担法律责任。用户理解，如果FOF
                        Easy发现其网站传输的信息明显属于
                        上段第(1)条所列内容之一，依据中国法律，上海琻瑢信息科技有限公司有义务立即停止传输，保存有关记录，向国家有关机
                        关报告，并且删除含有该内容的地址、目录或关闭服务器。</p>
                    <p>若用户的行为不符合以上提到的服务条款，上海琻瑢信息科技有限公司将作出独立判断立即取消用户服务帐号。</p>
                    <p>9. 协议修改</p>
                    <p>9.1FOF Easy有权随时修改本协议的任何条款，一旦本协议的内容发生变动，FOF Easy将会直接在FOF
                        Easy网站上公布修
                        改之后的协议内容，该公布行为视为上海琻瑢信息科技有限公司已经通知用户修改内容。上海琻瑢信息科技有限公司也可通
                        过其他适当方式向用户提示修改内容。</p>
                    <p>9.2如果不同意FOF
                        Easy对本协议相关条款所做的修改，用户有权停止使用网络服务。如果用户继续使用网络服务，则视 为用户接受FOF
                        Easy对本协议相关条款所做的修改。</p>
                    <p>10. 通知送达</p>
                    <p>10.1本协议项下FOF
                        Easy对于用户所有的通知均可通过网页公告、电子邮件、手机短信或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。</p>
                    <p>10.2用户对于FOF Easy的通知应当通过FOF
                        Easy对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。</p>
                    <p>11. 法律</p>
                    <p>用户和上海琻瑢信息科技有限公司一致同意有关本协议以及使用FOF Easy的服务产生的争议交由仲裁解决，但是上海琻瑢
                        信息科技有限公司有权选择采取诉讼方式，并有权选择受理该诉讼的有管辖权的法院。若有任何服务条款与法律相抵触，
                        那这些条款将按尽可能接近的方法重新解析，而其它条款则保持对用户产生法律效力和影响。</p>
                    <p>12. 其他规定</p>
                    <p>12.1本协议构成双方对本协议之约定事项及其他有关事宜的完整协议，除本协议规定的之外，未赋予本协议各方其他权利。</p>
                    <p>12.2如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p>
                    <p>12.3本协议中的标题仅为方便而设，在解释本协议时应被忽略。</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="easy2Btn" data-dismiss="modal">取消</button>
                <button type="button" class="easy2Btn" data-dismiss="modal">确认</button>
            </div>
        </div>
    </div>
    <!-- /.modal-content -->
</div>

<!-- 认证模态框（Modal） -->
<div class="modal fade" id="Certification" tabindex="-1"
         role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-hidden="true">&times;</button>
                    <h4 class="modal-title">投资合格者认证</h4>
                </div>
                <div class="modal-body">
                    <div class="modaldiv">
                        <p>根据《私募投资基金监督管理暂行办法》第四章第十四条规定："私募基金管理人、
                            私募基金销售机构不得向合格投资者之外的单位和个人募集资金,不得通过报刊、电台、
                            电视、互联网等公众传播媒体或讲座、报告会、分析会和布告、传单、手机短信、微信、 博客和电子邮件等方式，向不特定对象推介。"</p>
                        <p>上海琻瑢信息科技有限公司谨遵《私募投资基金监督管理暂行办法》之规定,只向特定的合格投资者宣传推介相关私募证券投资基金数据及相关咨询服务。</p>
                        <p>根据《关于规范金融机构资产管理业务的指导意见》您需符合"合格投资者"
                            标准之规定,即具备相应风险识别能力和风险承担能力，投资于单只资产管理产品不低于一定金额且符合下列条件的自然人和法人或者其他组织。
                        <p>（一）具有2年以上投资经历，且满足以下条件之一：家庭金融净资产不低于300万元，家庭金融资产不低于500万元，或者近3年本人年均收入不低于40万元。</p>
                        <p>（二）最近1年末净资产不低于1000万元的法人单位。</p>
                        <p>（三）金融管理部门视为合格投资者的其他情形。</p>
                        <p>合格投资者投资于单只固定收益类产品的金额不低于30万元，投资于单只混合类产品的金额不低于40万元，投资于单只权益类产品、单只商品及金融衍生品类产品的金额不低于100万元。请您详细阅读本提示，并注册成本公司产品的合规投资者，方可获得本公司产品的私募证券投资基金数据服务和相关咨询服务。</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="easy2Btn" data-dismiss="modal">取消</button>
                    <button type="button" class="easy2Btn" data-dismiss="modal">确认</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal -->
    </div>

<%--欢迎加入模态框（modal）--%>
<div class="modal fade join-modal" id="join" tabindex="-1"
     role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" style="width: 610px; margin: 0 auto;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h1 class="modal-title bold">HFMI指数</h1>
            </div>
            <div class="modal-body">
                <div class='top-part'>
                    <div class='title-logo'>
                        <image class="mid-bg" src="${ctxResources}/images/join-logo.png" style='width:119px;height:32px;'></image>
                        <image class="mid-bg" src="${ctxResources}/images/join-renda.png" style='width:118px;height:32px;float:right;'></image>
                    </div>
                    <div class='info'>
                        <div>尊敬的基金经理：</div>
                        <div class='indent50'>您好！</div>
                        <div class='indent50'>HFMI（Hedge Fund Manager Index）指数由私募云通与中国人民大学量化投资研究所联合研究编制，旨在反映中国私募基金行业的增长或衰退。</div>
                        <div class='indent50'>通过HFMI指数，私募基金经理可以及时了解同行对资本市场的观点和看法，更好地进行投资决策。HFMI指数的荣枯也反映了私募基金经理们的投资信心，将成为中国金融市场发展的“晴雨表”。</div>
                        <div class='indent50'>HFMI指数的调查对象均为资深而专业的基金经理，采用定向邀请，匿名填写的方式完成调查。鉴于您和贵公司行业中的地位和影响力，特邀请您拨冗填写，共襄盛举！</div>
                        <div class='indent50'>HFMI指数将于每月5号，通过私募云通公众号（ ID : fofpower )发布。如您需要，我们也可发至您留存的邮箱。
                        </div>
                        <div class='indent50'>此致</div>
                        <div>敬礼！</div>
                        <div>顺祝冬祺！</div>
                        <div style='overflow:hidden'>
                            <div class='fr tr' style='width:95px;'>李勇（博士）</div><div class='fr'>中国人民大学教授 ：</div>
                        </div>
                        <div style='overflow:hidden'>
                            <div class='fr tr' style='width:95px'>巫景飞（博士）</div><div class='fr'>私募云通创始人 ：</div>
                        </div>
                        <div class="tc bold" style="border-top: 2px dashed #D0D0D0 ;margin: 20px;padding: 20px;">HFMI指数持续招募中，请扫描下方二维码</div>
                        <div class="scan" style="margin-top: 20px;text-align: center;"><img src="${ctxResources}/images/HFMI.jpg" width="165"/> </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <%--<button type="button" class="easy2Btn" data-dismiss="modal">取消</button>--%>
                <button type="button" class="easy2Btn" data-dismiss="modal">确认</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal -->
</div>
<section class="home">
    <%--头部banner--%>
    <div class="masthead top-bg-power">
        <!--<img src="img/top-bg.png" width="100%"/>-->
        <div class="bg-content">
            <div class="title"> FOF Power</div>
            <div class="title-lg">专业FOF管理工具，私有化部署</div>
            <div class="con">强大的数据库，结合金融机构内源数据，通过模块的自由组合，可以为金融机构在私募<br>
                FOF的投前筛选、投中评价和投后管理全流程提供支持，提升FOF机构管理能力。</div>
        </div>
    </div>
    <%--公告--%>
    <div class="public-msg">
        <img src="${ctxResources}/images/home-publisher-icon.png">
        <span class="title">POWER公告：</span>
        <span class="msg">敬爱的用户！于2018年5月23日凌晨，我们系统已经升级至v1.1.7版本。</span>
    </div>
    <div class="main-con">
        <%--公私募数据--%>
        <div class="con1">
            <div class="tab-new">
                <span class="active" data-id="hedge">私募数据</span>
                <span data-id="mutual">公募数据</span>
            </div>
            <div class="data-card">
                <div class="card">
                    <div><img src="${ctxResources}/images/home-pro-icon.png"/></div>
                    <div class="name">基金产品</div>
                    <div class="num" id="num1"></div>
                </div>
                <div class="card">
                    <div><img src="${ctxResources}/images/home-com-icon.png"/></div>
                    <div class="name">基金公司</div>
                    <div class="num" id="num2"></div>
                </div>
                <div class="card">
                    <div><img src="${ctxResources}/images/home-manager-icon.png"/></div>
                    <div class="name">基金经理</div>
                    <div class="num" id="num3"></div>
                </div>
            </div>
        </div>
        <%--业绩指数表--%>
        <div class="con2">
            <div class="tab-new">
                <span class="active" style=" margin-right: -5px;cursor: auto;">私募综合</span>业绩指数
            </div>
            <div class="big-charts">
                <div class="title">累计收益率</div>
                <div id="indicator-chart" style="width: 100%;height: 350px;"></div>
            </div>
        </div>
    </div>
    <%--分策略业绩指数情况--%>
    <div class="con3">
        <div class="title">私募分策略业绩指数情况</div>
        <div class="sub-title"><span id="statistic_date">--年--月</span></div>
        <div class="con-card">
            <div class="card">
                <div class="left">
                    <div class="legend">
                        <span class="pot"></span>
                        <span data-id="index_name"></span>
                    </div>
                    <hr class="divi"/>
                    <div class="value" data-id="index_value"></div>
                    <div class="tip">成份数量</div>
                    <div class="num" data-id="funds_num"></div>
                </div>
                <div class="right">
                    <div class="sm-charts"></div>
                    <div class="fluc">
                        <span data-id="change"></span><img src="">
                    </div>
                    <div class="btns">
                        <span class="btn-change">较上个月</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="left">
                    <div class="legend">
                        <span class="pot"></span>
                        <span data-id="index_name"></span>
                    </div>
                    <hr class="divi"/>
                    <div class="value" data-id="index_value"></div>
                    <div class="tip">成份数量</div>
                    <div class="num" data-id="funds_num"></div>
                </div>
                <div class="right">
                    <div class="sm-charts"></div>
                    <div class="fluc">
                        <span data-id="change"></span><img src="">
                    </div>
                    <div class="btns">
                        <span class="btn-change">较上个月</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="left">
                    <div class="legend">
                        <span class="pot"></span>
                        <span data-id="index_name"></span>
                    </div>
                    <hr class="divi"/>
                    <div class="value" data-id="index_value"></div>
                    <div class="tip">成份数量</div>
                    <div class="num" data-id="funds_num"></div>
                </div>
                <div class="right">
                    <div class="sm-charts"></div>
                    <div class="fluc">
                        <span data-id="change"></span><img src="">
                    </div>
                    <div class="btns">
                        <span class="btn-change">较上个月</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="left">
                    <div class="legend">
                        <span class="pot"></span>
                        <span data-id="index_name"></span>
                    </div>
                    <hr class="divi"/>
                    <div class="value" data-id="index_value"></div>
                    <div class="tip">成份数量</div>
                    <div class="num" data-id="funds_num"></div>
                </div>
                <div class="right">
                    <div class="sm-charts"></div>
                    <div class="fluc">
                        <span data-id="change"></span><img src="">
                    </div>
                    <div class="btns">
                        <span class="btn-change">较上个月</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="left">
                    <div class="legend">
                        <span class="pot"></span>
                        <span data-id="index_name"></span>
                    </div>
                    <hr class="divi"/>
                    <div class="value" data-id="index_value"></div>
                    <div class="tip">成份数量</div>
                    <div class="num" data-id="funds_num"></div>
                </div>
                <div class="right">
                    <div class="sm-charts"></div>
                    <div class="fluc">
                        <span data-id="change"></span><img src="">
                    </div>
                    <div class="btns">
                        <span class="btn-change">较上个月</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="left">
                    <div class="legend">
                        <span class="pot"></span>
                        <span data-id="index_name"></span>
                    </div>
                    <hr class="divi"/>
                    <div class="value" data-id="index_value"></div>
                    <div class="tip">成份数量</div>
                    <div class="num" data-id="funds_num"></div>
                </div>
                <div class="right">
                    <div class="sm-charts"></div>
                    <div class="fluc">
                        <span data-id="change"></span><img src="">
                    </div>
                    <div class="btns">
                        <span class="btn-change">较上个月</span>
                    </div>
                </div>
            </div>
            <div class="drop tc pointer" id="dropDown">
                <img src="${ctxResources}/images/mainxiala.png"/>
            </div>
            <div id="dropLoad" style="display: none;">
            <div class="card">
                <div class="left">
                    <div class="legend">
                        <span class="pot"></span>
                        <span data-id="index_name"></span>
                    </div>
                    <hr class="divi"/>
                    <div class="value" data-id="index_value"></div>
                    <div class="tip">成份数量</div>
                    <div class="num" data-id="funds_num"></div>
                </div>
                <div class="right">
                    <div class="sm-charts"></div>
                    <div class="fluc">
                        <span data-id="change"></span><img src="">
                    </div>
                    <div class="btns">
                        <span class="btn-change">较上个月</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="left">
                    <div class="legend">
                        <span class="pot"></span>
                        <span data-id="index_name"></span>
                    </div>
                    <hr class="divi"/>
                    <div class="value" data-id="index_value"></div>
                    <div class="tip">成份数量</div>
                    <div class="num" data-id="funds_num"></div>
                </div>
                <div class="right">
                    <div class="sm-charts"></div>
                    <div class="fluc">
                        <span data-id="change"></span><img src="">
                    </div>
                    <div class="btns">
                        <span class="btn-change">较上个月</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="left">
                    <div class="legend">
                        <span class="pot"></span>
                        <span data-id="index_name"></span>
                    </div>
                    <hr class="divi"/>
                    <div class="value" data-id="index_value"></div>
                    <div class="tip">成份数量</div>
                    <div class="num" data-id="funds_num"></div>
                </div>
                <div class="right">
                    <div class="sm-charts"></div>
                    <div class="fluc">
                        <span data-id="change"></span><img src="">
                    </div>
                    <div class="btns">
                        <span class="btn-change">较上个月</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="left">
                    <div class="legend">
                        <span class="pot"></span>
                        <span data-id="index_name"></span>
                    </div>
                    <hr class="divi"/>
                    <div class="value" data-id="index_value"></div>
                    <div class="tip">成份数量</div>
                    <div class="num" data-id="funds_num"></div>
                </div>
                <div class="right">
                    <div class="sm-charts"></div>
                    <div class="fluc">
                        <span data-id="change"></span><img src="">
                    </div>
                    <div class="btns">
                        <span class="btn-change">较上个月</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="left">
                    <div class="legend">
                        <span class="pot"></span>
                        <span data-id="index_name"></span>
                    </div>
                    <hr class="divi"/>
                    <div class="value" data-id="index_value"></div>
                    <div class="tip">成份数量</div>
                    <div class="num" data-id="funds_num"></div>
                </div>
                <div class="right">
                    <div class="sm-charts"></div>
                    <div class="fluc">
                        <span data-id="change"></span><img src="">
                    </div>
                    <div class="btns">
                        <span class="btn-change">较上个月</span>
                    </div>
                </div>
            </div>
            </div>
            <div class="drop tc pointer"  id="dropUp" style="display: none;">
                <img src="${ctxResources}/images/mainshangla.png"/>
            </div>
        </div>
    </div>
    <%--中间banner--%>
    <div class="middle-banner">
        <%--<div class="ch-title">私募基金管理人HFMI指数</div>--%>
        <%--<hr class="divi"/>--%>
        <%--<div class="en-title">HEDGE FUND MANAGER INDEX</div>--%>
        <button class="join pointer" data-toggle="modal" data-target="#join">欢迎加入</button>
    </div>
    <%--基金研究院信息--%>
    <div class="research-news">
        <div class="left">
            <div class="title">
                <div class="ch">基金研究院</div>
                <div class="en">News</div>
            </div>
            <div class="image">
                <img src="${ctxResources}/images/home-research.png">
            </div>
        </div>
        <div class="right">
            <div class="info">
                <a class="inline-block" href="https://mp.weixin.qq.com/s?__biz=MzI5OTM1MDQyOQ==&mid=2247489856&idx=1&sn=944306ebb695b6caff16e0a914955680&chksm=ec96b9b2dbe130a46ab9ae3dc3e4a8f526e1c63b186e81989df54d81442deafc19e0d14084f9&mpshare=1&scene=1&srcid=0514TFt9TiulhLm7gPgoWR1x#rd">
                    <div class="title ellipse">
                        云通致善资产管理研究院正式成立，打造产学研一体化高端智库
                    </div>
                    <div class="detail ellipse">
                        2018年5月5日，私募云通联合致善金融书院以及众多海内外知名高校金融教授、业界一线投资人共同发起的云通致善资产管理研究院
                    </div>
                </a>
                <div>
                    <div class="title">05-09</div>
                    <div class="tip">
                        <span>fofpower</span>
                        <span>云通动态</span>
                    </div>
                </div>

            </div>
            <div class="info">
                <a class="inline-block"  href="https://mp.weixin.qq.com/s?__biz=MzI5OTM1MDQyOQ==&mid=2247489468&idx=1&sn=74f6ed3b6b79b336a94c27d67fc47237&chksm=ec96b74edbe13e58b014d9359628544e24dcce4ea544eb28afa3d202ff59dc87335b05ecb46a&mpshare=1&scene=1&srcid=0514zOZeoZHJOMAhYYYjgS39#rd">
                    <div class="title ellipse">
                        基于机器学习的私募基金策略分类漫谈
                    </div>
                    <div class="detail ellipse">
                        众所周知，私募行业不像公募基金行业有健全的信息披露平台，不管是净值信息还是持仓数据，基本都是透明的。
                    </div>
                </a>
                <div>
                    <div class="title">04-03</div>
                    <div class="tip">
                        <span>fofpower</span>
                        <span>云通研究</span>
                    </div>
                </div>
            </div>
            <div class="info">
                <a class="inline-block"  href="https://mp.weixin.qq.com/s?__biz=MzI5OTM1MDQyOQ==&mid=2247488972&idx=1&sn=7eb03a3a14dad5315edbb23ba0f8c23a&chksm=ec96b53edbe13c28ef56a80102a986cca893183546cc553a3dc371cc352b89b2c04c2fb65a1f&mpshare=1&scene=1&srcid=0514f6MUudwU7wvDvvhN0rpj#rd">
                    <div class="title ellipse">
                        私募云通私募证券类基金的评级方法
                    </div>
                    <div class="detail ellipse">
                        根据基金业协会统计，截止2017年末中国私募证券基金实缴规模已到达2.2858万亿元。虽然绝大部分私募证券基金都以追求绝对收益为目的
                    </div>
                </a>
                <div>
                    <div class="title">02-26</div>
                    <div class="tip">
                        <span>fofpower</span>
                        <span>云通研究</span>
                    </div>
                </div>
            </div>
            <div class="info">
                <a class="inline-block" href="https://mp.weixin.qq.com/s?__biz=MzI5OTM1MDQyOQ==&mid=2247488755&idx=1&sn=a9d10ed1263885629ff97bbee87929a7&chksm=ec96b401dbe13d176b7f780b43875e88f64df087174c8742d670267f0bf5daeec49a5b02b8c0&mpshare=1&scene=1&srcid=0514HZ22aJs8jWEjYMF24RWj#rd">
                    <div class="title ellipse">
                        Sharpe风格因子模型在基金投资风格分析中的应用
                    </div>
                    <div class="detail ellipse">
                        基金投资风格是指基金资产在不同标的资产间进行配置的投资策略或者计划。最早由威廉·夏普在1992年提出并使用，它本质上是一种有约束的线性模型，通
                    </div>
                </a>
                <div>
                    <div class="title">02-06</div>
                    <div class="tip">
                        <span>fofpower</span>
                        <span>云通研究</span>
                    </div>
                </div>

            </div>
            <div class="info">
                <a class="inline-block"  href="https://mp.weixin.qq.com/s?__biz=MzI5OTM1MDQyOQ==&mid=2247488562&idx=2&sn=e9178c929eda149df4935aa3a1539702&chksm=ec96b4c0dbe13dd69f19d46812292bdf668f0414bd4fe2c4a00f8ae09a8ea38fd072a62c44cb&mpshare=1&scene=1&srcid=0514TXA7Kgvo87i6cgfR2wv7#rd">
                    <div class="title ellipse">
                        2017中国私募证券基金投资年度报告
                    </div>
                    <div class="detail ellipse">
                        证券类私募管理人规模两极分化较为严重。根据基金业协会备案数据显示，自主发行基金规模达10亿元以上的私募证券基金管理人数量为288家，
                    </div>
                </a>
                <div>
                    <div class="title">01-07</div>
                    <div class="tip">
                        <span>fofpower</span>
                        <span>云通研究</span>
                    </div>
                </div>

            </div>

        </div>
    </div>
    <%--底部的banner--%>
    <div class="bottom-banner">
        <div class="top-part">
            <div class="card">
                <img src="${ctxResources}/images/home-b-icon1.png">
                <span>云端解决方案</span>
            </div>
            <div class="card">
                <img src="${ctxResources}/images/home-b-icon2.png">
                <span>优化组合模型</span>
            </div>
            <div class="card">
                <img src="${ctxResources}/images/home-b-icon3.png">
                <span>专业产品报告</span>
            </div>
        </div>
        <div class="bottom-part">
            <div class="img-left">
                <img src="${ctxResources}/images/home-b-icon4.png">
            </div>
            <div class="con">
                <div>专业工具+海量数据，提供零门槛专业数据服务</div>
                <div>支持云端的私募大数据库，与您的工作环境无缝链接，实现高速效率</div>
            </div>
            <div class="img-left">
                <img src="${ctxResources}/images/home-b-icon5.png">
            </div>
        </div>
    </div>
    <%--底部信息--%>
    <div class="contact-msg">
        <div class="left">
            <div class="contact">
                <img src="${ctxResources}/images/home-loc.png">
                联系我们
            </div>
            <div class="con">
                <div class="tel">
                    客服热线：021-68591716
                </div>
                <div class="tel">
                    邮箱：service@fofpower.com
                </div>
                <div class="tel">
                    公司地址：上海市浦东新区浦东南路1271-1289号华融大厦901室
                </div>
                <div class="copy">
                    <span>©2016-2018 上海琻瑢信息科技有限公司 沪ICP备16034721号-3</span>
                    <span><span class="pointer" data-toggle="modal" data-target="#Certification">合格投资者认证</span> | <span  class="pointer" data-toggle="modal" data-target="#serviceAgreement">用户协议</span></span>
                </div>
            </div>
        </div>
        <div class="right">
            <img src="${ctxResources}/images/home-scan.png">
        </div>
    </div>
</section>
<!-- 头部分结束 -->
<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
<script>
    require(['easy2/homePage/homePage']);
</script>
</body>
</html>
