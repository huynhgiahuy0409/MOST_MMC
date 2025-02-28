package com.tsb.most.biz.rest.operation;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dataitem.operation.VesselDelayItem;
import com.tsb.most.biz.parm.operation.SearchVesselDelayParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/vesseldelay")
public class VesselDelayController extends RestBaseController {

	@RequestMapping(value = "/combo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselDelayComboList(SearchVesselDelayParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vesselDelay.selectVesselDelayComboList",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}	
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselDelayList(SearchVesselDelayParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		if ("DelayRecordList".equalsIgnoreCase(parm.getSearchType())) {
			Object result = invokeService("MOST.vesselDelay.selectVesselDelayList",parm);
			response.setData(((DataItemList)result).getCollection());
			response.setLimit(((DataItemList)result).getTotalRowCount());
		} else if (parm.getSearchType().equals("comboList")) {
			Object result = invokeService("MOST.vesselDelay.selectVesselDelayList",parm);
			response.setData(((DataItemList)result).getCollection());
		} else if (parm.getSearchType().equals("acceptedDelayCode")) {
			Object result = invokeService("MOST.vesselDelay.selectVesselDelayList",parm);
			response.setData(((DataItemList)result).getCollection());
		}
		return response;
	}	

	@RequestMapping(value = "/delaycodelist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDelayCodeList(SearchCodeMasterParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.vesselDelay.selectDelayCodeList",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertVesselDelayItems(@RequestBody VesselDelayItem item)
			throws ServiceException, Exception {

		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
			
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);
			
		Object result = invokeService("MOST.vesselDelay.insertVesselDelayItems",insertParm);
			
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;	
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateVesselDelayItems(@PathVariable("id") String id, @RequestBody VesselDelayItem item)
			throws ServiceException, Exception {
		
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
			
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
			
		Object result = invokeService("MOST.vesselDelay.updateVesselDelayItems",updateParm);
						
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
			
		return res;   
	}

	@RequestMapping(value = "/verified", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse updateVerifiedVesselDelayItems(@RequestBody VesselDelayItem item)
			throws ServiceException, Exception {	
	
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.vesselDelay.updateVerifiedVesselDelayItems",updateParm);
				
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;	
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteVesselDelayItems(@PathVariable("id") String id, @RequestBody VesselDelayItem item)
			throws ServiceException, Exception {
	
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.vesselDelay.deleteVesselDelayItems",deleteParm);
	}
	
}
