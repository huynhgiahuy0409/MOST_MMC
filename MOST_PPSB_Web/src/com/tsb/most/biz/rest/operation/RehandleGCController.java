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
import com.tsb.most.biz.dataitem.operation.RehandleGCItem;
import com.tsb.most.biz.parm.operation.SearchCargoHandlingOutParm;
import com.tsb.most.biz.parm.operation.SearchRehandleGCParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;
	
@Controller
@RequestMapping("/v1/rehandleGC")
public class RehandleGCController extends RestBaseController {
	
	private static Logger logger = LoggerFactory.getLogger(RehandleGCController.class);

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRehandlingList(SearchRehandleGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleGC.selectCargoRehandlingList",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/cargoRhdlLoadinglist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRhdLoadingList(SearchRehandleGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleGC.selectCargoRhdLoadingList",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/detailList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRehandlingPopupList(SearchRehandleGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		//Object result = invokeService("MOST.rehandleGC.selectCargoRehandlingPopupList",parm);
		Object result = invokeService("MOST.rehandleGC.selectCargoRehandlingDetailList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/comboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRehandlingComboList(SearchRehandleGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleGC.selectCargoRehandlingComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/commoditygroupcombolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCommodityGroupList(SearchRehandleGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleGC.selectCommodityGroupList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/commoditycodecombolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCommodtiyCodeList(SearchRehandleGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleGC.selectCommodtiyCodeList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/snBlComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRehandlingSnBlComboList(SearchRehandleGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleGC.selectCargoRehandlingSnBlComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/rhdlShippingNoteComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRhdlShippingNoteComboList(SearchRehandleGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleGC.selectRhdlShippingNoteComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/rhdlGrNoComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRhdlGrNoComboList(SearchRehandleGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleGC.selectRhdlGrNoComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoRehandling/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateCargoRehandling(@PathVariable("id") String id, @RequestBody UpdateBizParm<RehandleGCItem> item) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(item));
		Object result = invokeService("MOST.rehandleGC.processCargoRehandlingItem",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoRehandlingForUpdate/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateCargoRehandlingForUpdate(@PathVariable("id") String id, @RequestBody UpdateBizParm<RehandleGCItem> item) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(item));
		Object result = invokeService("MOST.rehandleGC.processCargoRehandlingItemForUpdate",updateParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoRehandling/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteCargoRehandling(@PathVariable("id") String id, @RequestBody UpdateBizParm<RehandleGCItem> item) throws ServiceException, Exception{
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		
		deleteItems.setDeleteItems(super.getItems(item));
		Object result = invokeService("MOST.rehandleGC.deleteCargoRehandlingItem", deleteItems);
		res.setData(((DataItemList)result).getCollection());
		res.setErrorNumber(((DataItemList)result).getErrorFlag());
		res.setErrorDescription(((DataItemList)result).getErrorDesc());
		
		return res;
	}

	
	@RequestMapping(value = "/cargoRhdlLoadinglist", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public void processCargoRhdlLoadingItem(@RequestBody UpdateBizParm<CargoLoadingItem> item) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(item));
		invokeService("MOST.rehandleGC.processCargoRhdlLoadingItem",updateParm);

	}
	
	@RequestMapping(value = "/cargoRhdlLoadinglist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateCargoRhdlLoadingItem(@PathVariable("id") String id, @RequestBody  UpdateBizParm<CargoLoadingItem> item) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(item));
		Object result = invokeService("MOST.rehandleGC.processCargoRhdlLoadingItem",updateParm);
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
//		item.setCrud(DAOProcessType.INSERT);
//		CudParm pParm = new CudParm();
//		pParm.setDataItem(item);
//		
//		RestResponse rtnResponse = (RestResponse)execute("confirmHandlingOut","processCargoHandlingOutItem",pParm);
//		
//		return rtnResponse;
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.confirmHandlingOut.updateItems", updateParm);
		RestResponse res = new RestResponse();
		res.setData(((DataItemList)result).getCollection());
		return res;
		
	}
}
