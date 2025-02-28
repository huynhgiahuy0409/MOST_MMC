package com.tsb.most.security.config;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collection;

import org.apache.commons.codec.binary.Base64;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;


public class TokenAuthentication implements Authentication {
	private String type;
	private String token;
	private String userId;
	private String password;
	private String roleId;
	private String userType;
	private String userName;
	private String userLevel;
	private String ptnrCode;
	private String requestUri;
	private String httpMethod;
	private String branchCode;

	public TokenAuthentication(String type, String token, String requestUri, String httpMethod,String branchCode) throws IllegalArgumentException, UnsupportedEncodingException {
		this.type = type;
		this.token = token;
		this.requestUri = requestUri;
		this.httpMethod = httpMethod;
		this.branchCode  = branchCode;
		
		if(type.equalsIgnoreCase("Basic")){
			byte[] byteArray = Base64.decodeBase64(token.getBytes());
			String decodedString = new String(byteArray);
			String args[] = decodedString.split(":");
			
			this.userId = args[0];
			this.password = args[1];
		}
//		else{
//			DecodedJWT jwt = JwtBuilder.verifyJWTToken(token);
//			Claim usernameClaim = jwt.getClaim("userid");
//
//			this.userId = usernameClaim.asString();
//		}
	}
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return new ArrayList<GrantedAuthority>(0);
	}

	@Override
	public Object getCredentials() {
		return token;
	}

	@Override
	public Object getDetails() {
		return null;
	}

	@Override
	public Object getPrincipal() {
		return null;
	}

	@Override
	public boolean isAuthenticated() {
		return false;
	}

	@Override
	public void setAuthenticated(boolean isAuthenticated)
			throws IllegalArgumentException {
	}

	@Override
	public String getName() {
		return null;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}


	public String getUserLevel() {
		return userLevel;
	}

	public void setUserLevel(String userLevel) {
		this.userLevel = userLevel;
	}

	public String getPtnrCode() {
		return ptnrCode;
	}

	public void setPtnrCode(String ptnrCode) {
		this.ptnrCode = ptnrCode;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getRequestUri() {
		return requestUri;
	}

	public void setRequestUri(String requestUri) {
		this.requestUri = requestUri;
	}

	public String getHttpMethod() {
		return httpMethod;
	}

	public void setHttpMethod(String httpMethod) {
		this.httpMethod = httpMethod;
	}

	public String getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}
	

}