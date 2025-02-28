package com.tsb.most.biz.rest.administrator;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.dataitem.administrator.MenuRegisterItem;
import com.tsb.most.basebiz.parm.administrator.SearchMenuRegisterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/menuRegister")
public class MenuRegisterController extends RestBaseController {
	
	@RequestMapping(value = "/menulist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMenuList(SearchMenuRegisterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.menuRegister.selectMenuList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/programinfolist", method =  RequestMethod.GET)
	@ResponseBody
	public RestResponse selectProgramInfoList(SearchMenuRegisterParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.menuRegister.selectProgramInfoList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/menulist", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertMenuList(@RequestBody UpdateBizParm<MenuRegisterItem> parm) throws ServiceException, Exception{
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(parm.getItem());
		insertParm.setInsertItems(insertItems);
		
		Object result = invokeService("MOST.menuRegister.insertMenuList",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/programinfolist", method =  RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertProgramInfoList(@RequestBody MenuRegisterItem item) throws ServiceException, Exception {
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);
		
		Object result = invokeService("MOST.menuRegister.insertProgramInfoList",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/menulist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateMenuList(@PathVariable("id") String id, @RequestBody UpdateBizParm<MenuRegisterItem> parm) throws ServiceException, Exception{
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(parm.getItem());
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.menuRegister.updateMenuList",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/programinfolist/{id}", method =  RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateProgramInfoList(@PathVariable("id") String id, @RequestBody MenuRegisterItem item) throws ServiceException, Exception {
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.menuRegister.updateProgramInfoList",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/menulist/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteMenuList(@PathVariable("id") String id,@RequestBody UpdateBizParm<MenuRegisterItem> parm) throws ServiceException, Exception{
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(this.getItems(parm));
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.menuRegister.deleteMenuList",deleteParm);
	}
	
	@RequestMapping(value = "/programinfolist/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteProgramInfoList(@PathVariable("id") String id,  @RequestBody UpdateBizParm<MenuRegisterItem> parm) throws ServiceException, Exception{
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(this.getItems(parm));
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.menuRegister.deleteProgramInfoList",deleteParm);
	}
}
