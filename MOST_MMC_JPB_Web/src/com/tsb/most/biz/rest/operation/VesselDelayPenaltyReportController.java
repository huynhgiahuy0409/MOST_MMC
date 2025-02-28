package com.tsb.most.biz.rest.operation;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.operation.VesselDelayPenaltyReportItem;
import com.tsb.most.biz.parm.operation.SearchVesselDelayPenaltyReportParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/vesseldelaypnty")
public class VesselDelayPenaltyReportController extends RestBaseController{
	@RequestMapping(value = "/list", method=RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDelayPenaltyReportList(SearchVesselDelayPenaltyReportParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vesselDelayPenaltyReport.selectDelayPenaltyReportList", parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertVesselDelayItems(@RequestBody UpdateBizParm<VesselDelayPenaltyReportItem> item) 
			throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(item));
		Object result = invokeService("MOST.vesselDelayPenaltyReport.insertVesselDelayItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateVesselDelayItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<VesselDelayPenaltyReportItem> item)
			throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(item));
		
		Object result = invokeService("MOST.vesselDelayPenaltyReport.updateVesselDelayItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteVesselDelayItems(@PathVariable("id") String id, @RequestBody VesselDelayPenaltyReportItem item)
			throws ServiceException, Exception {
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.vesselDelayPenaltyReport.deleteVesselDelayItems",deleteParm);
	}


}
