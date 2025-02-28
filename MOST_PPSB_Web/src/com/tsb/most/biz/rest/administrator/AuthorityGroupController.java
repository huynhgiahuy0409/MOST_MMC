/**
*
*
* FILE NAME : com.pcs.rest.authority.ComponentAuthorization.java
* CREATE ON : 2018. 03. 26
* CLASS DESCRIPTION : Component Authorization Controller
*
* 
* CHANGE REVISION
* --------------------------------------------------------------------------
* DATE            AUTHOR                       REVISION    
* --------------------------------------------------------------------------
* 2015. 03. 26    CHAE JIHEON                  First release.
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

import com.tsb.most.basebiz.dataitem.administrator.AuthorityGroupItem;
import com.tsb.most.basebiz.parm.administrator.SearchAuthorityGroupParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;


@Controller
@RequestMapping("/v1/authoritygroup")
public class AuthorityGroupController extends RestBaseController {
	
	@RequestMapping(value = "/authgrplist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectAuthorityGroup(SearchAuthorityGroupParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.authorityGroup.selectAuthorityGroup",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/ptnrtp", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectPartnerType(SearchAuthorityGroupParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.authorityGroup.selectPartnerType",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/userlistbygrp", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUSerListByGroup(SearchAuthorityGroupParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.authorityGroup.selectUserListByGroup",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	//Template manager
	@RequestMapping(value = "/templatelist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTemplateList(SearchAuthorityGroupParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.authorityGroup.selectTemplateList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/accessauth", method =  RequestMethod.GET)
	@ResponseBody
	public RestResponse selectAccessAuth(SearchAuthorityGroupParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.authorityGroup.selectAccessAuth",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/accessauth", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<AuthorityGroupItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.authorityGroup.insertItems",insertParm);
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/accessauth/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<AuthorityGroupItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.authorityGroup.updateItems",updateParm);
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/authgrplist/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id,@RequestBody UpdateBizParm<AuthorityGroupItem> parm) throws ServiceException, Exception{
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(this.getItems(parm));
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.authorityGroup.deleteItems",deleteParm);
	}
}