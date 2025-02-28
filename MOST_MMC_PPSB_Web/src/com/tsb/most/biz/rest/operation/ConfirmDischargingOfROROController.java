package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.ConfirmDischargingOfROROItem;
import com.tsb.most.biz.parm.operation.SearchConfirmDischargingOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;


@Controller
@RequestMapping("/v1/confirmdischargingofroro")
public class ConfirmDischargingOfROROController  extends RestBaseController {

	@RequestMapping(value = "/comboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBlComboItems(SearchConfirmDischargingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmDischargingOfRORO.selectBlComboItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoItems(SearchConfirmDischargingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmDischargingOfRORO.selectCargoItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/unitlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitItems(SearchConfirmDischargingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmDischargingOfRORO.selectUnitItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/cargolist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmDischargingOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmDischargingOfRORO.updateItems", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unitlist/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmDischargingOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmDischargingOfRORO.deleteItems", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	
	/**
	 * ==========================================================
	 * HHT START
	 */
	@RequestMapping(value = "/yardImportListHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectYardCheckerImportList(SearchConfirmDischargingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmDischargingOfRORO.selectApronCheckerImportList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/apronImportListHHT", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectApronCheckerImportList(SearchConfirmDischargingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmDischargingOfRORO.selectApronCheckerImportList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unitlisthht", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitItemsHHT(SearchConfirmDischargingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmDischargingOfRORO.selectUnitItemsHHT",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unitlisthht/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItemsHHT(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmDischargingOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmDischargingOfRORO.updateItemsHHT", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/unitlisthht/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteItemsHHT(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmDischargingOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmDischargingOfRORO.deleteItemsHHT", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
}
