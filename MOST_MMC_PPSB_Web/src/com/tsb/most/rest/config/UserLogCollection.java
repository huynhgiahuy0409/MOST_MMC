/**
 * 
 */
package com.tsb.most.rest.config;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.JoinPoint;
import org.springframework.security.core.context.SecurityContextHolder;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dataitem.accesslogs.AccessLogsItem;
import com.tsb.most.framework.bizparm.BaseBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.serviceprovider.pojo.ServiceProviderPojo;
import com.tsb.most.security.config.TokenAuthentication;

/**
 * @author simonkang
 *
 */
public class UserLogCollection {
	/**
	 * 
	 * @param joinPoint
	 * @param request
	 * @param flagTp
	 */
	
	@SuppressWarnings("unchecked")
	public static void process(JoinPoint joinPoint, HttpServletRequest request, String flagTp){
		AccessLogsItem AccessLogsItem = new AccessLogsItem();
		//IServiceProxy serviceProxy = new ServiceProxy();
		
		String userId = "";
		//String groupId = "";
		String apiPath = request.getRequestURI();
	
		TokenAuthentication tokenAuth = null;
		if(SecurityContextHolder.getContext() != null){
			tokenAuth= (TokenAuthentication)SecurityContextHolder.getContext().getAuthentication();

			Object[] signatureArgs = joinPoint.getArgs();
			for (Object signatureArg: signatureArgs) {
				
				if(signatureArg instanceof DataItem){
					((DataItem)signatureArg).setStaffCd(tokenAuth.getUserId());
					((DataItem)signatureArg).setUserId(tokenAuth.getUserId());
					((DataItem)signatureArg).setUserName(tokenAuth.getUserName());
					((DataItem)signatureArg).setUserType(tokenAuth.getUserType());
				}else if(signatureArg instanceof BaseBizParm){
					((BaseBizParm)signatureArg).setUserId(tokenAuth.getUserId());
					((BaseBizParm)signatureArg).setUserType(tokenAuth.getUserType());
					((BaseBizParm)signatureArg).setUserName(tokenAuth.getUserName());
					((BaseBizParm)signatureArg).setUserLevel(tokenAuth.getUserLevel());
					((BaseBizParm)signatureArg).setPtnrCode(tokenAuth.getPtnrCode());
				}else if(signatureArg instanceof ArrayList){
					ArrayList<DataItem> list = (ArrayList<DataItem>)signatureArg;
					for(int i=0; i<list.size(); i++){
						DataItem item = (DataItem)list.get(i);
						item.setUserId(tokenAuth.getUserId());
					}
				}
			}
		}

		if(tokenAuth != null){
			userId = tokenAuth.getUserId();
			
			AccessLogsItem.setUserId(userId);
			AccessLogsItem.setPgmId(joinPoint.getSignature().getName().toString());
			AccessLogsItem.setApiPath(apiPath);
			if(flagTp.equals(DAOProcessType.INSERT)){
				AccessLogsItem.setMethod("INSERT");							
			}else if(flagTp.equals(DAOProcessType.SELECT)){
				AccessLogsItem.setMethod("SELECT");							
			}else if(flagTp.equals(DAOProcessType.UPDATE)){
				AccessLogsItem.setMethod("UPDATE");							
			}else if(flagTp.equals(DAOProcessType.DELETE)){
				AccessLogsItem.setMethod("DELETE");							
			}
			AccessLogsItem.setIpAddr(request.getRemoteAddr().toString());
			
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			insertParm.setInsertItem(AccessLogsItem);
			
			ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
			//added by Brian (2024/05/15) - Remove log 
			//Object result = serviceProviderPojo.execute("MOST.accessLogs.insertAccessLogs",insertParm);
			
		}
	}
}