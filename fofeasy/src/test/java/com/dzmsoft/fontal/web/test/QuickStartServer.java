package com.dzmsoft.fontal.web.test;

import org.eclipse.jetty.server.Server;




/**
 * 使用Jetty运行调试Web应用, 在Console输入回车快速重新加载应用.
 * 
 * @author calvin
 */
public class QuickStartServer {

	public static final int PORT = 8096;
	public static final String CONTEXT = "/";
	public static final String[] TLD_JAR_NAMES = new String[] {"spring-webmvc", "shiro-web"};

	public static void main(String[] args) throws Exception {
		
//		File licenseFile = new File("demo.license");
//		if (licenseFile.exists()) {
//			OutputStream oStream = new FileOutputStream("demo.license");
//			oStream.write(new License().setLicense(new File("license-plain.txt")).
//					loadKey("secring.gpg", "keyUserId").encodeLicense("keyPassword").getBytes("utf-8"));
//			oStream.close();
//		}else{
//			License license = new License();
//			
//			if (license.loadKey("pubring.gpg", null).setLicenseEncodedFromFile("demo.license").isVerified()) {
//				System.out.println(license.getFeature("edition"));
//	            System.out.println(license.getFeature("valid-until"));
//			}
//		}
		// 设定Spring的profile
		Profiles.setProfileAsSystemProperty(Profiles.DEVELOPMENT);
		// 启动Jetty
		Server server = JettyFactory.createServerInSource(PORT, CONTEXT);
		server.setAttribute("org.eclipse.jetty.server.Request.maxFormContentSize", 1000000); //设置表单数据提交上限，负数则默认 200000
		JettyFactory.setTldJarNames(server, TLD_JAR_NAMES);

		try {
			server.start();
			System.out.println("[INFO] 服务启动  http://localhost:" + PORT + CONTEXT);
			System.out.println("[HINT] 按回车迅速重启");
			// 等待用户输入回车重载应用.
			while (true) {
				char c = (char) System.in.read();
				if (c == '\n') {
					JettyFactory.reloadContext(server);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.exit(-1);
		}
	}
}
