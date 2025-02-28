package com.tsb.mostif.webservice.util;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.tsb.most.framework.i18n.MessageResource;
import com.tsb.mostif.bizcom.authorization.JWTAuth;
import com.tsb.mostif.bizparm.common.CommonParm;
import com.tsb.mostif.common.util.Utils;
import com.tsb.mostif.constants.MessageConstants;
import com.tsb.mostif.dataitem.error.ErrorResultItem;

public class AuthorizationFilter implements ContainerRequestFilter {

	public static final String AUTHENTICATION_HEADER 	= "Authorization";
//	public static final String TOKEN_PATH 				= "JwtAuthService/token";
	public static final String TOKEN_PATH 				= "api/v1/token";
	public static final String DUMMY_SERVER_PATH 		= "dummy/SetBerthPlanRequest";
	JWTAuth authenticationService = new JWTAuth();

	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {

		// Get header info
		String headerAuthInfoValue = requestContext.getHeaderString(AUTHENTICATION_HEADER);
		UriInfo urlInfo = requestContext.getUriInfo();
		Utils utils = new Utils();
		String requestURL = urlInfo.getPath();
		CommonParm parm = new CommonParm();
		
//		if(headerAuthInfoValue != null && headerAuthInfoValue.length() > 1) {
//		
//			// Check Token
//			parm.setRequestAuth(headerAuthInfoValue);
////			JWTAuthResultItem authResultItem = authenticationService.checkToken(headerAuthInfoValue);
//			Object authResultItem = utils.invokeService("TosIF.jwtAuth.checkToken", parm);
////			String resultAuthText = authResultItem.getMessage();
//	
////			if(resultAuthText != null) {
////				ErrorResultItem errorItem = new ErrorResultItem();
////				errorItem.setError("TKN001");
////				errorItem.setErrorDescription(resultAuthText);
////				Response accessUnauthorized = Response.status(Response.Status.UNAUTHORIZED).entity(errorItem).type(MediaType.APPLICATION_JSON_TYPE).build();
////				requestContext.abortWith(accessUnauthorized);
////			}
//			if (authResultItem != null) {
//				Response accessUnauthorized = Response.status(Response.Status.UNAUTHORIZED).entity(authResultItem).type(MediaType.APPLICATION_JSON_TYPE).build();
//				requestContext.abortWith(accessUnauthorized);				
//			}
//		
//		} else {
//			if(!requestURL.equals(TOKEN_PATH)) { // && !requestURL.equals(DUMMY_SERVER_PATH)
//				ErrorResultItem errorItem = new ErrorResultItem();
//				String errCode = MessageConstants.NO_TOKEN_IN_REQUEST;
//				String errMsg = MessageResource.getInstance().getMessage(errCode);
//				errorItem.setError(errCode);
//				errorItem.setErrorDescription(errMsg);
//				
//				Object response = utils.convertObjectToJson(errorItem);
//				Response accessUnauthorized = Response.status(Response.Status.UNAUTHORIZED).entity(response).type(MediaType.APPLICATION_JSON_TYPE).build();
//				requestContext.abortWith(accessUnauthorized);
//			}
//		}
		
	}
    
}
