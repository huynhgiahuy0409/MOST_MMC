package com.tsb.most.rest.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.dataitem.administrator.UserRegisterItem;
import com.tsb.most.basebiz.dataitem.user.UserInfoDataItem;
import com.tsb.most.basebiz.parm.administrator.SearchUserRegisterParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

/**
 * The Class UserListController.
 */
@Controller
@RequestMapping("/v1/identities")
public class IdentityController extends RestBaseController {
	
	@RequestMapping(value = "/users/checkoldpassword", method = RequestMethod.GET)
	@ResponseBody		
	public RestResponse checkOldPassword(SearchUserRegisterParm parm) throws ServiceException{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.userRegister.checkOldPassword", parm);	// Service Bean ID
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/users/userpassword/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateUserPassword(@PathVariable("id") String id, @RequestBody UserInfoDataItem item) throws ServiceException, Exception{
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.userRegister.updateUserPassword",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/users/updateuserinfo/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateUserInfo(@PathVariable("id") String id, @RequestBody UserRegisterItem item) throws ServiceException, Exception{
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.userRegister.updateUserInfo",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
}