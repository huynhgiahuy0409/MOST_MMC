package com.tsb.most.biz.rest.document;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.document.TruckAssignmentOfROROItem;
import com.tsb.most.biz.parm.document.SearchTruckAssignmentOfROROParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/truckassignmentofroro")
public class TruckAssignmentOfROROController extends RestBaseController {
	
	@RequestMapping(value = "/commonComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCommonComboItems(SearchTruckAssignmentOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.truckAssignmentOfRORO.selectCommonComboItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTruckAssignmentItems(SearchTruckAssignmentOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.truckAssignmentOfRORO.selectTruckAssignmentItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/assigningdriversforvehicle", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selecAssigningDriversForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.truckAssignmentOfRORO.selectAssigningDriversForVehicleItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/assigningtrucksforvehicle", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selecAssigningTrucksForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.truckAssignmentOfRORO.selectAssigningTrucksForVehicleItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/assigneddriversandtrucks", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectAssignedDriversAndTrucksForVehicleItems(SearchTruckAssignmentOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.truckAssignmentOfRORO.selectAssignedDriversAndTrucksForVehicleItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/assigneddriversandtrucks", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertDriversAndTrucksItems(@RequestBody UpdateBizParm<TruckAssignmentOfROROItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.truckAssignmentOfRORO.insertDriversAndTrucksItems",insertParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/assigneddriversandtrucks/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteAssignedDriversAndTrucksForVehicleItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<TruckAssignmentOfROROItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		deleteParm.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.truckAssignmentOfRORO.deleteAssignedDriversAndTrucksForVehicleItems",deleteParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
}
