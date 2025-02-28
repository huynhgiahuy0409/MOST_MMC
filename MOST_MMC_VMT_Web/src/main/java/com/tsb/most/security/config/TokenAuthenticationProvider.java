package com.tsb.most.security.config;

import java.util.Date;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.tsb.most.basebiz.common.constant.AuthConstant;
import com.tsb.most.basebiz.dataitem.auth.CredentialItem;
import com.tsb.most.basebiz.parm.auth.CredentialParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.dataitem.ExceptionItem;
import com.tsb.most.framework.exception.ResourceForbiddenException;
import com.tsb.most.framework.exception.ResourceUnauthorizedException;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.security.SHA256;
import com.tsb.most.framework.serviceprovider.pojo.ServiceProviderPojo;

@Component
public class TokenAuthenticationProvider implements AuthenticationProvider {
	
	@Override
	public Authentication authenticate(Authentication auth) throws AuthenticationException {
		CredentialItem item = null;
		CredentialItem URLItem = null;
		Object result = null;
		
		if(((TokenAuthentication)auth).getType().equalsIgnoreCase("Bearer")){
			CredentialParm credentialParm = new CredentialParm();
			credentialParm.setUserId(((TokenAuthentication)auth).getUserId());
			//added by Brian (add) 2019/11/07
			credentialParm.setAccessToken(((TokenAuthentication)auth).getToken());
			credentialParm.setRequestUri(((TokenAuthentication)auth).getRequestUri());
			credentialParm.setHttpMethod(((TokenAuthentication)auth).getHttpMethod());
			
			
			ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
			result = serviceProviderPojo.execute("MOST.authentication.selectCredentialDtl",credentialParm);
			
			if(result instanceof ExceptionItem){
				throw new ServiceException((ExceptionItem)result);
			}else {
				item = (CredentialItem)result;
			}
			
			result = serviceProviderPojo.execute("MOST.authentication.selectCredentialURLDtl",credentialParm);
			if(result instanceof ExceptionItem){
				throw new ServiceException((ExceptionItem)result);
			}else {
				URLItem = (CredentialItem)result;
			}
			
			if(item == null){
				
				throw new ResourceUnauthorizedException("UnauthorizedException");
			}else{
				
				if(item.getRevokeYn().equals("Y")){
					throw new ResourceUnauthorizedException("UnauthorizedException");
				}
				
				//modified by Brian (not check session expired)
				String expiredCheck = (String)AppContextPropertyLoader.properties.get("expiredCheck");
				
				if(expiredCheck != null && expiredCheck.equals("Y")) {
					Date now = new Date();
					Date expireDate = new Date(item.getExpireTime().getTime());
					
					if(now.after(expireDate)){
						throw new ResourceUnauthorizedException("UnauthorizedException");
					}
				}
				
				
				if(URLItem != null) {
					//Retrive
					if(credentialParm.getHttpMethod().equals("GET")) {
						if(URLItem.getCinquiry()==null || URLItem.getCinquiry().equals("N")) {
							throw new ResourceForbiddenException("API unauthorized");
						}		
					//Create
					}else if(credentialParm.getHttpMethod().equals("POST")) {
						if(URLItem.getCcreate()==null || URLItem.getCcreate().equals("N")) {
							throw new ResourceForbiddenException("API unauthorized");
						}
					//Updtae
					}else if(credentialParm.getHttpMethod().equals("PUT")) {
						if(URLItem.getCsave()==null || URLItem.getCsave().equals("N")) {
							throw new ResourceForbiddenException("API unauthorized");
						}
					//Delete
					}else if(credentialParm.getHttpMethod().equals("DELETE")) {
						if(URLItem.getCdelete()==null || URLItem.getCdelete().equals("N")) {
							throw new ResourceForbiddenException("API unauthorized");
						}
					}
				}
				//if(item.getApiDisabledYn() == null || item.getApiDisabledYn().equals("Y")){
				//	throw new ResourceForbiddenException("API unauthorized");
				//}
				
				if(auth instanceof TokenAuthentication){
					((TokenAuthentication)auth).setUserId(item.getUserId());
					((TokenAuthentication)auth).setUserName(item.getUserName());
					((TokenAuthentication)auth).setUserLevel(item.getUserLevel());
					((TokenAuthentication)auth).setUserType(item.getUserType());
					((TokenAuthentication)auth).setPtnrCode(item.getPtnrCode());
					
					//added by Brian (update session expired time) - 2021/06/14
					item.setAccessToken(credentialParm.getAccessToken());
					UpdateItemsBizParm parm = new UpdateItemsBizParm();
					
					parm.setDataItem(item);
					
					result = serviceProviderPojo.execute("MOST.authentication.updateTokenExpiredTime",parm);
					if(result instanceof ExceptionItem){
						throw new ServiceException((ExceptionItem)result);
					}
				}
				
			}
			
		} else if(((TokenAuthentication)auth).getType().equalsIgnoreCase(AuthConstant.TOKEN_TYPE_BASIC)){
			String userId = ((TokenAuthentication)auth).getUserId();
			String password = "";
			try{
				password = SHA256.RunSha256(((TokenAuthentication)auth).getPassword());
			}catch(Exception e){
				
			}
			
			CredentialParm credentialParm = new CredentialParm();
			credentialParm.setUserId(userId);
			credentialParm.setPassword(password);
			
			ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
			result = serviceProviderPojo.execute("MOST.authentication.selectPrimaryCredential",credentialParm);
			
			if(result instanceof ExceptionItem){
				throw new ServiceException((ExceptionItem)result);
			}else {
				item = (CredentialItem)result;
			}
			
			
			if(item == null) 
				throw new ResourceUnauthorizedException("authentication fail");
			if(item != null){
				if(auth instanceof TokenAuthentication){
					((TokenAuthentication)auth).setUserId(item.getUserId());
					((TokenAuthentication)auth).setUserName(item.getUserName());
					((TokenAuthentication)auth).setUserLevel(item.getUserLevel());
					((TokenAuthentication)auth).setUserType(item.getUserType());
					((TokenAuthentication)auth).setPtnrCode(item.getPtnrCode());
				}
			}
		}
		
		return auth;
	}

	@Override
	public boolean supports(Class<?> aClass) {
		return true;
	}
}