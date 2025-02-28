package com.tsb.most.biz.rest.document;

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

import com.tsb.most.biz.dataitem.document.TruckAssignmentItem;
import com.tsb.most.biz.parm.document.SearchTruckAssignmentParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/truckAssignment")
public class TruckAssignmentController extends RestBaseController {
	private static Logger logger = LoggerFactory.getLogger(TruckAssignmentController.class);
	
	@RequestMapping(value = "/grItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGoodReceiptItems(SearchTruckAssignmentParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.truckAssignment.selectGoodReceiptItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/sdoItems", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSubDoNoItems(SearchTruckAssignmentParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.truckAssignment.selectSubDoNoItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/grItem", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGoodReceiptItemforAssigment(SearchTruckAssignmentParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.truckAssignment.selectGoodReceiptItemforAssigment",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/changeBLSNo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectChangeBLSNo(SearchTruckAssignmentParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.truckAssignment.selectChangeBLSNo",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

	@RequestMapping(value = "/filelist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectFileList(SearchTruckAssignmentParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.truckAssignment.selectFileList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	@RequestMapping(value = "/lorryassignmentinquiry", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTruckAssignmentItems(SearchTruckAssignmentParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.truckAssignment.selectTruckAssignmentItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/lorryassignmentinquiry", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertTruckAssignment(@RequestBody UpdateBizParm<TruckAssignmentItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.setInsertItems(super.getItems(parm));
		RestResponse response = new RestResponse();
		
		Object result = invokeService("MOST.truckAssignment.insertTruckAssignment", insertParm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		
		return response;
	}
	
	@RequestMapping(value = "/lorryassignmentinquiry/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateTruckAssignment(@PathVariable("id") String id, @RequestBody UpdateBizParm<TruckAssignmentItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		updateItems.addUpdateItem(super.getItems(parm));
		RestResponse response = new RestResponse();
		
		Object result = invokeService("MOST.truckAssignment.updateTruckAssignment", updateItems);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		
		return response;
	}
	
	@RequestMapping(value = "/lorryassignmentinquiry/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteTruckAssignment(@PathVariable("id") String id, @RequestBody UpdateBizParm<TruckAssignmentItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		deleteItems.setDeleteItems(super.getItems(parm));

		invokeService("MOST.truckAssignment.deleteTruckAssignment", deleteItems);
	}
	
	@RequestMapping(value = "/processQrCode/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse processQrCode(@PathVariable("id") String id, @RequestBody UpdateBizParm<TruckAssignmentItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		updateItems.addUpdateItem(super.getItems(parm));
		RestResponse response = new RestResponse();
		
		Object result = invokeService("MOST.truckAssignment.processQrCode", updateItems);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		
		return response;
	}
}
