package com.tsb.most.biz.rest.operation;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.operation.VORDryBreakBulkItem;
import com.tsb.most.biz.parm.operation.SearchVORDryBreakBulkParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/vordrybreakbulk")
public class VORDryBreakBulkController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVORDryBreakBulk(SearchVORDryBreakBulkParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vorDryBreakBulk.selectVORDryBreakBulk",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertVORDryBreakBulk(@RequestBody UpdateBizParm<VORDryBreakBulkItem> parm) throws ServiceException, Exception {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.setInsertItems(super.getItems(parm));
		
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vorDryBreakBulk.insertItems", insertParm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<VORDryBreakBulkItem> parm) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vorDryBreakBulk.updateItems", updateParm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}

	
	@RequestMapping(value = "/verify/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse verifyVORDryBreakBulk(@PathVariable("id") String id, @RequestBody UpdateBizParm<VORDryBreakBulkItem> parm)
			throws ServiceException, Exception {
		UpdateItemsBizParm itemList = new UpdateItemsBizParm();
		itemList.setUpdateItems(super.getItems(parm));
		
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vorDryBreakBulk.verifyItems", itemList);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}

	@RequestMapping(value = "/vesselinformation", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselInformation(SearchVORDryBreakBulkParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vorDryBreakBulk.selectVesselInformation",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}

	@RequestMapping(value = "/isOverlappedWithFinitePeriod", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse isOverlappedWithFinitePeriodHHT(SearchVORDryBreakBulkParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vorDryBreakBulk.isOverlappedWithFinitePeriodHHT",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}

	private String getChecked(String flag) {
		if ("true".equals(flag)) {
			return "v";
		}

		return null;
	}

	@RequestMapping(value = "/handlingservicereport", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectHandlingServicePDFReportList(SearchVORDryBreakBulkParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vorDryBreakBulk.selectHandlingServicePDFReportList",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/checkdocumentdatastore", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectOpeJobList(SearchVORDryBreakBulkParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vorDryBreakBulk.selectOpeJobList",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
}