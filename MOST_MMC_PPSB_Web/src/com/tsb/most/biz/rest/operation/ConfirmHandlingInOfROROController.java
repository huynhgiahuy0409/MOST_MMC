package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.ConfirmHandlingInOfROROItem;
import com.tsb.most.biz.parm.operation.SearchConfirmHandlingInOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/confirmhandlinginofroro")
public class ConfirmHandlingInOfROROController  extends RestBaseController {
	@RequestMapping(value = "/sncombolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShipgNoteNoComboBoxItems(SearchConfirmHandlingInOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingInOfRORO.selectShipgNoteNoComboBoxItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoItems(SearchConfirmHandlingInOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingInOfRORO.selectCargoItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/gateinlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGateInItems(SearchConfirmHandlingInOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingInOfRORO.selectGateInItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlinginlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectHandlingInItems(SearchConfirmHandlingInOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingInOfRORO.selectHandlingInItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlinginlist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateHandlingInUnitItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmHandlingInOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmHandlingInOfRORO.updateHandlingInUnitItems", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	/**
	 * 
	 * HHT START
	 * 
	 */
	@RequestMapping(value = "/gateinlistHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGateInItemsHHT(SearchConfirmHandlingInOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingInOfRORO.selectGateInItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlinginlistHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectHandlingInListHHT(SearchConfirmHandlingInOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingInOfRORO.selectHandlingInItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlinginlistHHT/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateHandlingInUnitItemsHHT(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmHandlingInOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmHandlingInOfRORO.updateHandlingInUnitItems", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/handlinginlistHHT/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteHandlingInUnitItemsHHT(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmHandlingInOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmHandlingInOfRORO.deleteHandlingInUnitItemsHHT", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
}
