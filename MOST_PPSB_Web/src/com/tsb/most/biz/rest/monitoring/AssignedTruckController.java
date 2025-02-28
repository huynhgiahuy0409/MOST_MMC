package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.GateOperationItem;
import com.tsb.most.biz.parm.monitoring.SearchAssignedTruckParm;
import com.tsb.most.biz.parm.monitoring.SearchAssignedTruckPivotParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/assignedtrucklist")
public class AssignedTruckController extends RestBaseController{
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTruckListItems(SearchAssignedTruckParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.assignedTruck.selectLorryListItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;		
	}
	
	@RequestMapping(value = "/unitNoList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitNoList(SearchAssignedTruckParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.assignedTruck.selectUnitNoList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;		
	}
	
	@RequestMapping(value = "/unitNoListForROROImport", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitNoListForROROImport(SearchAssignedTruckParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.assignedTruck.selectUnitNoListForROROImport",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;		
	}
	
	@RequestMapping(value = "/unitNoListForROROExport", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectUnitNoListForROROExport(SearchAssignedTruckParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.assignedTruck.selectUnitNoListForROROExport",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;		
	}
	
	@RequestMapping(value = "/pivot", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectLorryListPivotItems(SearchAssignedTruckPivotParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.assignedTruck.selectLorryListPivotItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/cir/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateCirPrintItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<GateOperationItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItem(parm.getItem());
		invokeService("MOST.assignedTruck.updateCirPrintItem",updateParm);
	}
}
