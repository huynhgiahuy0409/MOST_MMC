package com.tsb.most.biz.rest.operation;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.operation.VORLiquidBulkItem;
import com.tsb.most.biz.parm.operation.SearchVORLiquidBulkParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/vorliquidbulk")
public class VORLiquidBulkController extends RestBaseController {
	@RequestMapping(value = "/berthandoperation", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBerthAndOperationItems(SearchVORLiquidBulkParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vorLiquidBulk.selectBerthAndOperationItems",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/vorsummary", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVORSummaryItems(SearchVORLiquidBulkParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vorLiquidBulk.selectVORSummaryItems",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/vordelaysummary", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVORDelaySummaryItems(SearchVORLiquidBulkParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vorLiquidBulk.selectVORDelaySummaryItems",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/cgOprType", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVORLiquidBulkCgOprType(SearchVORLiquidBulkParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vorLiquidBulk.selectVORLiquidBulkCgOprType",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/confirmationslipdetail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectConfirmationSlipDetailItem(SearchVORLiquidBulkParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vorLiquidBulk.selectConfirmationSlipDetailItem",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVORLiquidBulkDetail(SearchVORLiquidBulkParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vorLiquidBulk.selectVORLiquidBulkDetail",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertVORLiquidBulkItem(@RequestBody UpdateBizParm<VORLiquidBulkItem> parm)
			throws ServiceException, Exception {
		
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		Object result = new Object();
		RestResponse res = new RestResponse();
		insertParm.setInsertItems(super.getItems(parm));
		VORLiquidBulkItem item = new VORLiquidBulkItem();
		item = (VORLiquidBulkItem)insertParm.getInsertItems().get(0);
		
		InsertItemsBizParm finalItems = new InsertItemsBizParm();
		
		for(int i = 0; i<item.getVorLiquidBulk().size(); i++) {
			VORLiquidBulkItem itemCol = (VORLiquidBulkItem) item.getVorLiquidBulk().get(i);
			
			DataItemList itemList = new DataItemList();
			itemList.add(item.getVorLiquidBulk().get(i));
			finalItems.setInsertItems(itemList);
			
			if (itemCol.getInsertType().equals("cargoProc")) {
				result = invokeService("MOST.vorLiquidBulk.insertVORLiquidCargo", finalItems);
			}else if (itemCol.getInsertType().equals("delayProc")) {
				result = invokeService("MOST.vorLiquidBulk.insertVORLiquidDelay", finalItems);
			}
		}
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}

	@RequestMapping(value = "/detail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateVORLiquidBulkItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<VORLiquidBulkItem> parm)
			throws ServiceException, Exception {
		
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		Object result = new Object();
		RestResponse res = new RestResponse();
		updateParm.setUpdateItems(super.getItems(parm));
		VORLiquidBulkItem item = new VORLiquidBulkItem();
		item = (VORLiquidBulkItem)updateParm.getUpdateItems().getCollection().get(0);
		
		for(int i = 0; i<item.getVorLiquidBulk().size(); i++) {
			VORLiquidBulkItem itemCol = (VORLiquidBulkItem) item.getVorLiquidBulk().get(i);
			ArrayList<VORLiquidBulkItem> vorLiquidBulk = new ArrayList<VORLiquidBulkItem>();
			
			VORLiquidBulkItem newItem = new VORLiquidBulkItem();
			if (itemCol.getInsertType().equals("cargoProc")) {
				result = invokeService("MOST.vorLiquidBulk.updateVORLiquidCargo",updateParm);
			}else if (itemCol.getInsertType().equals("delayProc")) {
				result = invokeService("MOST.vorLiquidBulk.updateVORLiquidDelay ",updateParm);
			}
		}
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/detail/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteVORLiquidBulkItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<VORLiquidBulkItem> parm)
			throws ServiceException, Exception {
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		deleteParm.setDeleteItems(super.getItems(parm));
		
		invokeService("MOST.vorLiquidBulk.deleteItems", deleteParm);

	}
	
	
	//////////////////////////////////////////////////////////////////////
}
