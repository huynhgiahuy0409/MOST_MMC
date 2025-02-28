package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.ConfirmHandlingOutOfROROItem;
import com.tsb.most.biz.parm.operation.SearchConfirmHandlingOutOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/confirmhandlingoutofroro")
public class ConfirmHandlingOutOfROROController  extends RestBaseController {
	@RequestMapping(value = "/handlingOutComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectHandlingOutComboItems(SearchConfirmHandlingOutOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingOutOfRORO.selectHandlingOutComboItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/comboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBlComboItems(SearchConfirmHandlingOutOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingOutOfRORO.selectBlComboItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoItems(SearchConfirmHandlingOutOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingOutOfRORO.selectCargoItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/dolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDoItems(SearchConfirmHandlingOutOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingOutOfRORO.selectDoItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlingOutlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectHandlingOutUnitItems(SearchConfirmHandlingOutOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingOutOfRORO.selectHandlingOutUnitItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlingOutlist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateHandlingOutUnitItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmHandlingOutOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmHandlingOutOfRORO.updateHandlingOutUnitItems", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlingOutlist/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteHandlingOutUnitItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmHandlingOutOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmHandlingOutOfRORO.deleteHandlingOutUnitItems", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	/**
	 *
	 * HHT START
	 * 
	 */
	@RequestMapping(value = "/dolistHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDoItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingOutOfRORO.selectDoItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlingOutlistHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectHandlingOutUnitItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingOutOfRORO.selectHandlingOutUnitItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlingOutlistHHT/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateHandlingOutUnitItemsHHT(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmHandlingOutOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmHandlingOutOfRORO.updateHandlingOutUnitItemsHHT", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlingOutlistHHT/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteHandlingOutUnitItemsHHT(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmHandlingOutOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmHandlingOutOfRORO.deleteHandlingOutUnitItemsHHT", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlingOutComboListHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectHandlingOutComboItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingOutOfRORO.selectHandlingOutComboItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
}
