package com.tsb.most.security.config;

import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

public class SecurityWebApplicationInitializer extends AbstractSecurityWebApplicationInitializer {

	/* �����ڸ� Ǯ�� �Ǹ�...�Ʒ������� �߻�
	 * java.lang.IllegalStateException: Cannot initialize context because there is 
	 * already a root application context present - check whether you have 
	 * multiple ContextLoader* definitions in your web.xml!
	 * ���� url : https://javadeveloperzone.com/common-error/spring-security-check-whether-multiple-contextloader-definitions-web-xml/
	 * 
	 */
	
//	public SecurityWebApplicationInitializer() {
//		super(SecurityConfig.class);
//	}

}