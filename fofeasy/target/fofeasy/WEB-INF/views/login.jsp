<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<link href="${ctxResources}/images/title-logo.ico" rel="shortcut icon">
<title>登录</title>
<%@ include file="/WEB-INF/views/include/meta.jsp"%>
<%@ include file="/WEB-INF/views/include/common-css.jsp"%>
</head>
<body style="min-width:1200px;overflow:auto;">



	<section>
		<nav class="navbar navbar-default header" role="navigation"
			style="border:none;min-height:0px;margin-bottom:0;">
			<div id="topbar">
				<div class="welcomeUser">
					<span>欢迎您使用 FOF Easy!</span>
				</div>
			</div>
		</nav>
		<div class="login_content">
		
		</div>
		<div class="login_window">
				<div class="logo">
					<img src="${ctxResources}/images/login_title.png"
						class="login_titleimg">
				</div>
				<div class="window_content">

					<form role="form" id="loginForm">
						<div class="window_inpdiv">
							<input type="number" name="username" id="userName"
								placeholder="手机号">
						</div>
						<div class="window_inpdiv">
							<input type="password" name="password" id="password"
								placeholder="密码" autocomplete="off">
						</div>
						<div class="window_buttondiv"
							style="text-align:left;margin-left:90px;">
							<input type="checkbox" id="rememberme"><label
								for="rememberme">记住账户</label>
						</div>
						<div class="window_buttondiv">
							<button type="button" class="loginBtn" data-style="expand-left"
								data-size="1" id="btnSubmit">
								<span class="ladda-label">登录</span>
							</button>
						</div>
						<div class="window_buttondiv">
							<a class="registBtn" data-style="expand-left" data-size="1"
								href="javaScript:void(0)">注册</a>
						</div>
						<div class="window_buttondiv">
							<img src="${ctxResources}/images/browserLogo.png"> <span
								class="browserRemind">建议使用Chrome浏览器</span>
						</div>
						<div class="window_buttondiv"
							style="text-align:middle;margin-left:0px;">
							<c:if test="${not empty param.kickout}">
								<font style="color:red">您被踢出登录了。</font>
							</c:if>
							<div class="footer">
								<img src="${ctxResources}/images/loginphone.png"
									style="margin:0 5px;"><span>客服电话： 021-68591716</span>
							</div>
						</div>
					</form>
				</div>
		</div>
		<div class="loginFooter">
			<div class="Under">
				<div class="up">
					<span> <a href="http://www.fofpower.com" target="_black">关于我们</a>&nbsp;&nbsp;|&nbsp;&nbsp;
						<a href="" data-toggle="modal" data-target="#serviceAgreement">服务协议</a>&nbsp;&nbsp;|&nbsp;&nbsp;
						<a href="" data-toggle="modal" data-target="#Certification">投资合格者认证</a>
					</span>
				</div>
				<div class="down">
					<span>Copyright&nbsp;@copy2016&nbsp;Suntime&nbsp;Inc.&nbsp;&nbsp;All
						rights reserved.&nbsp;&nbsp;上海琻瑢信息科技有限公司&nbsp;&nbsp;版权所有</span>
					<div class="record_div">
						<a target="_blank" href="http://www.miitbeian.gov.cn">沪ICP备16034721号-3</a>
					</div>
				</div>
			</div>
		</div>
		<!-- 服务协议模态框（Modal） -->
		<div>
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
			<!-- /.modal -->
			<!-- 认证模态框（Modal） -->
			<div>
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
									<p>根据《私募投资基金监督管理暂行办法》第四十章第四十条规定："私募基金管理人、
										私募基金销售机构不得向合格投资者之外的单位和个 人募集资金,不得通过报轩、电台、
										电视、互联网等公众传播媒体或讲座、报告会、分析会和布告、传单、手机短信、微信、 博客和电子邮件 等方式，向不特定对象推介。"</p>
									<p>上海琻瑢信息科技有限公司谨遵《私募投资基金监督管理暂行办法》之规定,只向特定的合格投资者宣传推介相关私募证券投资基金数据及相关咨询服务。</p>
									<p>根据《私募投资基金监督管理暂行办法》您需符合"合格投资者"
										标准之规定,即具备相应风险识别能力和风险承担能力，投资于单只私募的金额不低于100万 元，
										且个人金融类资产不低于300万元或者最近三年个人年均收入不低于50万元人民币，机构用户净资产不低于1000万元。请您详细阅读本提示，并注册成FOF
										Easy 的合规投资者，方可获得FOF Easy私募证券投资基金数据服务和相关咨询服务。</p>
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
			</div>
		</div>
	</section>
</body>
<%@ include file="/WEB-INF/views/include/common-js.jsp"%>
<!-- 加载js文件 -->
<script>
	require(['login']);
	</script>

</html>
