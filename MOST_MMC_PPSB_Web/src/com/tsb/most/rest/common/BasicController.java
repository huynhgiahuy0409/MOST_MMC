/**
* 
* COPYRIGHT (PLUS) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
* 
* FILE NAME : com.pcs.rest.common.BasicController.java 
* CREATE ON : 2015. 3. 27
* CLASS DESCRIPTION :
* 
*  
* CHANGE REVISION
* --------------------------------------------------------------------------
* DATE            AUTHOR                       REVISION     
* --------------------------------------------------------------------------
* 2015. 3. 27     PLUSHYS             First release.
* --------------------------------------------------------------------------
*
*/
package com.tsb.most.rest.common;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.dataitem.auth.CredentialItem;
import com.tsb.most.basebiz.dataitem.user.UserInfoDataItem;
import com.tsb.most.basebiz.parm.auth.CredentialParm;
import com.tsb.most.basebiz.parm.user.UserInfoParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

// TODO: Auto-generated Javadoc
/**
 * The Class BasicController.
 */
@Controller
@RequestMapping("/v1/basic")
public class BasicController extends RestBaseController {

	@RequestMapping(value = "/basic-authentication", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public RestResponse selectComponentRole(CredentialParm parm) throws ServiceException, Exception {
		//if call is reached here, then already passed spring security, so basic authentication is okay.
		CredentialItem item = new CredentialItem();
		item.setUserId(parm.getUserId());
		item.setRoleId(parm.getRoleId());
		item.setUserType(parm.getUserType());
		item.setUserName(parm.getUserName());
		item.setUserLevel(parm.getUserLevel());
		item.setPtnrCode(parm.getPtnrCode());
		List list = new ArrayList();
		list.add(item);
		
		RestResponse res = new RestResponse();
		res.setData(list);
		
		return res;
	}	
	
	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public RestResponse selectProfile(UserInfoParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.user.selectUserInfo", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/profile", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse updateUserInfo(@RequestBody UserInfoDataItem item) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setDataItem(item);
		
		Object result = invokeService("MOST.user.updateUserInfo",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	

}
