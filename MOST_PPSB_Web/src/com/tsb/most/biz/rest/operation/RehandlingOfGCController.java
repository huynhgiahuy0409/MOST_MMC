package com.tsb.most.biz.rest.operation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.operation.CargoHandlingOutItem;
import com.tsb.most.biz.dataitem.operation.CargoLoadingItem;
import com.tsb.most.biz.dataitem.operation.RehandlingOfGCItem;
import com.tsb.most.biz.parm.operation.SearchCargoHandlingOutParm;
import com.tsb.most.biz.parm.operation.SearchRehandlingOfGCParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;
	
@Controller
@RequestMapping("/v1/rehandlingofgc")
public class RehandlingOfGCController extends RestBaseController {
	
	private static Logger logger = LoggerFactory.getLogger(RehandlingOfGCController.class);

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRehandlingList(SearchRehandlingOfGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandlingOfGC.selectCargoRehandlingList",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/detailList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRehandlingPopupList(SearchRehandlingOfGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandlingOfGC.selectCargoRehandlingPopupList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/snBlComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRehandlingSnBlComboList(SearchRehandlingOfGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandlingOfGC.selectCargoRehandlingSnBlComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/comboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRehandlingComboList(SearchRehandlingOfGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandlingOfGC.selectCargoRehandlingComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/rhdlShippingNoteComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRhdlShippingNoteComboList(SearchRehandlingOfGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandlingOfGC.selectRhdlShippingNoteComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/rhdlGrNoComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRhdlGrNoComboList(SearchRehandlingOfGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandlingOfGC.selectRhdlGrNoComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoRehandling/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateCargoRehandlingItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<RehandlingOfGCItem> item) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(item));
		Object result = invokeService("MOST.rehandlingOfGC.updateCargoRehandlingItems",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoRehandling/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteCargoRehandlingItems(@PathVariable("id") String id, @RequestBody RehandlingOfGCItem item) throws ServiceException, Exception{
		UpdateItemsBizParm deleteItems = new UpdateItemsBizParm();
		DataItemList itemList = new DataItemList();
		
		itemList.add(item);
		deleteItems.setUpdateItems(itemList);
		invokeService("MOST.rehandlingOfGC.updateCargoRehandlingItems", deleteItems);
	}
	
	@RequestMapping(value = "/cargoRhdlLoadinglist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRhdLoadingList(SearchRehandlingOfGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandlingOfGC.selectCargoRhdLoadingList",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/cargoRhdlLoadinglist", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public void processCargoRhdlLoadingItem(@RequestBody UpdateBizParm<CargoLoadingItem> item) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(item));
		invokeService("MOST.rehandlingOfGC.processCargoRhdlLoadingItem",updateParm);

	}
	
	@RequestMapping(value = "/cargoRhdlLoadinglist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateCargoRhdlLoadingItem(@PathVariable("id") String id, @RequestBody  UpdateBizParm<CargoLoadingItem> item) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(item));
		Object result = invokeService("MOST.rehandlingOfGC.processCargoRhdlLoadingItem",updateParm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());

		return res;
		
	}
	
	@RequestMapping(value = "/cargoRhdlHandlingOutlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRhdlHandlingOutList(SearchCargoHandlingOutParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmHandlingOut.getCargoRhdlHandlingOutList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	
	@RequestMapping(value = "/cargoRhdlHandlingOutlist", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public void processCargoRhdlHandlingOutItem(@RequestBody UpdateBizParm<CargoHandlingOutItem> item) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(item));
		
		invokeService("MOST.confirmHandlingOut.processCargoHandlingOutItem",updateParm);
	}
	
	@RequestMapping(value = "/cargoRhdlHandlingOutlist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateCargoRhdlHandlingOutItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<CargoHandlingOutItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmHandlingOut.updateItems", updateParm);
		RestResponse res = new RestResponse();
		res.setData(((DataItemList)result).getCollection());
		return res;
		
	}
}
