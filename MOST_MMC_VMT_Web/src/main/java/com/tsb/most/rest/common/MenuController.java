package com.tsb.most.rest.common;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dataitem.authmenu.AuthMenuDataItem;
import com.tsb.most.basebiz.parm.authmenu.AuthButtonParm;
import com.tsb.most.basebiz.parm.authmenu.AuthMenuParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/menu")
public class MenuController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMenuList(AuthMenuParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.authmenu.selectMenuList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

	@RequestMapping(value = "/authbutton", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectButtonItemList(AuthButtonParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.authmenu.selectMenuButtonList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMenuDetail(AuthMenuParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.authmenu.selectMenuDetail",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/buttons", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMenuButtonList(AuthMenuParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.authmenu.selectMenuButtonList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/languages", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMenuLanguageList(AuthMenuParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.authmenu.selectMenuLanguageList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/apies", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMenuApiList(AuthMenuParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.authmenu.selectMenuApiList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/favourites", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectFavouriteMenu(AuthMenuParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.authmenu.selectFavouriteMenu",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertMenu(@RequestBody AuthMenuDataItem item) throws ServiceException, Exception {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setDataItem(item);
		Object result = invokeService("MOST.authmenu.applyMenu",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
        
	}
	
	@RequestMapping(value = "/detail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateMenu(@PathVariable("id") String id, @RequestBody AuthMenuDataItem item) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setDataItem(item);
		Object result = invokeService("MOST.authmenu.applyMenu",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
        
	}
	
	@RequestMapping(value = "/detail/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteMenu(@PathVariable("id") String id, @RequestBody AuthMenuDataItem item) {
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		
		deleteParm.setDataItem(item);
        
		invokeService("MOST.authmenu.applyMenu",deleteParm);
		
	}
	
	@RequestMapping(value = "/languages", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertMenuDetail(@RequestBody AuthMenuDataItem item) throws ServiceException, Exception {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setDataItem(item);
		Object result = invokeService("MOST.authmenu.applyMenuDetail",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
		
	}
	
	@RequestMapping(value = "/languages/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateMenuDetail(@PathVariable("id") String id, @RequestBody AuthMenuDataItem item) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setDataItem(item);
		Object result = invokeService("MOST.authmenu.applyMenuDetail",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;

	}
	
	@RequestMapping(value = "/languages/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteMenuDetail(@PathVariable("id") String id, @RequestBody AuthMenuDataItem item) {
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		
		deleteParm.setDataItem(item);
        
		invokeService("MOST.authmenu.applyMenuDetail",deleteParm);
		
	}
	
	@RequestMapping(value = "/buttons", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertMenuButton(@RequestBody AuthMenuDataItem item) throws ServiceException, Exception {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setDataItem(item);
		Object result = invokeService("MOST.authmenu.applyMenuButton",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;

	}
	
	
	
	@RequestMapping(value = "/buttons/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateMenuButton(@PathVariable("id") String id, @RequestBody AuthMenuDataItem item) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setDataItem(item);
		Object result = invokeService("MOST.authmenu.applyMenuButton",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
		
        
	}
	
	@RequestMapping(value = "/buttons/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteMenuButton(@PathVariable("id") String id, @RequestBody AuthMenuDataItem item) {
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteParm.setDataItem(item);
        
		invokeService("MOST.authmenu.applyMenuButton",deleteParm);
	}
	
	
	@RequestMapping(value = "/apies", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertMenuApi(@RequestBody AuthMenuDataItem item) throws ServiceException, Exception {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setDataItem(item);
		Object result = invokeService("MOST.authmenu.applyMenuApi",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
        
	}
	
	
	@RequestMapping(value = "/apies/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateMenuApi(@PathVariable("id") String id, @RequestBody AuthMenuDataItem item) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setDataItem(item);
		Object result = invokeService("MOST.authmenu.applyMenuApi",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
		
	}
	
	@RequestMapping(value = "/apies/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteMenuApi(@PathVariable("id") String id, @RequestBody AuthMenuDataItem item) {
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteParm.setDataItem(item);
        
		invokeService("MOST.authmenu.applyMenuApi",deleteParm);
        
	}
	
	@RequestMapping(value = "/favourites", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertFavouriteMenu(@RequestBody AuthMenuDataItem item) throws ServiceException, Exception {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setDataItem(item);
		Object result = invokeService("MOST.authmenu.applyFavouriteMenu",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
        
	}
	
	@RequestMapping(value = "/favourites/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteFavouriteMenu(@PathVariable("id") String id, @RequestBody AuthMenuDataItem item) {
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteParm.setDataItem(item);
        
		invokeService("MOST.authmenu.applyFavouriteMenu",deleteParm);
        
	}
	
	@RequestMapping(value = "/hht", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMenuHHTList(AuthMenuParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.authmenu.selectMenuHHTList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
}
