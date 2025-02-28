/**
*
*
* FILE NAME : com.tsb.most.biz.rest.administrator.ScreenAuthorityController.java
* CREATE ON : 2018. 03. 26
* CLASS DESCRIPTION : Component Authorization Controller
*
* 
* CHANGE REVISION
* --------------------------------------------------------------------------
* DATE            AUTHOR                       REVISION    
* --------------------------------------------------------------------------
* 2024. 01. 10   Brian Park                  First release.
* --------------------------------------------------------------------------
*
*/

package com.tsb.most.biz.rest.administrator;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.dataitem.administrator.ScreenAuthorityItem;
import com.tsb.most.basebiz.parm.administrator.SearchScreenAuthorityParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;


@Controller
@RequestMapping("/v1/screenauthority")
public class ScreenAuthorityController extends RestBaseController {
	
	
	//List
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectScreenAuthority(SearchScreenAuthorityParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		parm.setScreenType(CommonConstants.SCREEN_TYPE_LIST); //List Screen
		Object result = invokeService("MOST.screenAuthority.selectScreenAuthority",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<ScreenAuthorityItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.screenAuthority.insertItems",insertParm);
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<ScreenAuthorityItem> item) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		
		updateParm.setUpdateItems(super.getItems(item));
		Object result = invokeService("MOST.screenAuthority.updateItems",updateParm);
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	
	//List
	@RequestMapping(value = "/authdata", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectAuthData(SearchScreenAuthorityParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.screenAuthority.selectScreenAuthority",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	
}