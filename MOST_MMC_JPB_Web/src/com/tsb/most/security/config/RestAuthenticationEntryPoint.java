package com.tsb.most.security.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.tsb.most.framework.exception.ResourceForbiddenException;


@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint{

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		String statusText = "";
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setContentType("application/json");
		if(authException instanceof ResourceForbiddenException){
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			statusText = "You do not have the correct permissions to access the resource";
		}else{
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			statusText = "This resource requires authentication";
		}
		//response.getOutputStream().println("{ \"statusText\": \"" + statusText + "\",\"responseText\":\"" + authException.getMessage()+"\"}");
		response.getOutputStream().println(statusText);
	}
}
