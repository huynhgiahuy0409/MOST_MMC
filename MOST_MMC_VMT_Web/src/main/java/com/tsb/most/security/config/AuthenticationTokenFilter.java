package com.tsb.most.security.config;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.tsb.most.basebiz.common.constant.AuthConstant;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.log.CommonLogUtil;

@Component
public class AuthenticationTokenFilter implements Filter {
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain fc) throws IOException, ServletException {
		
		HttpServletResponse res = (HttpServletResponse) response;
		HttpServletRequest req = (HttpServletRequest) request;
		
		try {
			
			Authentication auth = null;
			
			if(req.getHeader(AuthConstant.HTTP_HEADER_AUTHORIZATION) != null) {
				String authorization[] = req.getHeader(AuthConstant.HTTP_HEADER_AUTHORIZATION).split(String.valueOf(AuthConstant.MSG_SEPERATOR));
				String tokenType = authorization[0];
				
				if(!tokenType.equalsIgnoreCase(AuthConstant.TOKEN_TYPE_NONTOKEN)) {
					String accessToken = authorization[1];
					String requestUri = req.getPathInfo();
					String branchCode = "";
					
					CommonLogUtil.out("Access Token-" + accessToken);
					
					HttpServletRequest httpServletRequest = (HttpServletRequest) request;
				    String httpMethod = httpServletRequest.getMethod();			
					
					//Support Bearer, Basic Authentication
				    if ((tokenType.equalsIgnoreCase(AuthConstant.TOKEN_TYPE_BEARER) || tokenType.equalsIgnoreCase(AuthConstant.TOKEN_TYPE_BASIC))  && accessToken != null) {

				    	auth = new TokenAuthentication(tokenType, accessToken, requestUri, httpMethod,branchCode);
						SecurityContextHolder.getContext().setAuthentication(auth);
					} else {
						throw new Exception();
					}
				    
				    CommonLogUtil.out("***************************************************");
					CommonLogUtil.out("Authentication by Basic");
					CommonLogUtil.out("***************************************************");
				}
				
			}
			
			
			fc.doFilter(req, res);
			
		} catch (Exception e) {
			((HttpServletResponse)response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
			
			System.out.println(e);
			CommonLogUtil.out("***************************************************");
			CommonLogUtil.out("* Unauthorized                                    *");
			CommonLogUtil.out(e.toString());
			CommonLogUtil.out("***************************************************");
			String url = "http://localhost:8080//common/error";
		}
	}

	@Override
	public void destroy() {

	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
		
	}
	
	private String getDataRoutingValue(){
		String value = null;
		try{
			value = AppContextPropertyLoader.properties.getProperty("dataRouting");
			if(value == null){
				value = "N";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return value;
	}
	
}