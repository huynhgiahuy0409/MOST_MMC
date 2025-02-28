package com.tsb.most.biz.rest.document;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.document.DeliveryOrderOfVehicleItem;
import com.tsb.most.biz.parm.document.SearchDeliveryOrderOfVehicleParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/deliveryorderofvehicle")
public class DeliveryOrderOfVehicleController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDeliveryOrderItems(SearchDeliveryOrderOfVehicleParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.deliveryOrderOfVehicle.selectDeliveryOrderItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/subdeliveryorderofvehicle", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSubDeliveryOrderItems(SearchDeliveryOrderOfVehicleParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.deliveryOrderOfVehicle.selectSubDeliveryOrderItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/assigningdriversforvehicle", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectAssigningDriversForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.deliveryOrderOfVehicle.selectAssigningDriversForVehicleItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/assigningtrucksforvehicle", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectAssigningTrucksForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.deliveryOrderOfVehicle.selectAssigningTrucksForVehicleItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/assigneddriversandtrucks", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectAssignedDriversAndTrucksForVehicleItems(SearchDeliveryOrderOfVehicleParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.deliveryOrderOfVehicle.selectAssignedDriversAndTrucksForVehicleItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/assigneddriversandtrucks", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertDriversAndTrucksItems(@RequestBody UpdateBizParm<DeliveryOrderOfVehicleItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.deliveryOrderOfVehicle.insertDriversAndTrucksItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertSubDeliveryOrderItems(@RequestBody UpdateBizParm<DeliveryOrderOfVehicleItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.deliveryOrderOfVehicle.insertSubDeliveryOrderItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateSubDeliveryOrderItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<DeliveryOrderOfVehicleItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.deliveryOrderOfVehicle.updateSubDeliveryOrderItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/assigneddriversandtrucks/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteAssignedDriversAndTrucksForVehicleItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<DeliveryOrderOfVehicleItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		
		deleteParm.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.deliveryOrderOfVehicle.deleteAssignedDriversAndTrucksForVehicleItems",deleteParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteSubDeliveryOrderItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<DeliveryOrderOfVehicleItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		
		deleteParm.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.deliveryOrderOfVehicle.deleteSubDeliveryOrderItems",deleteParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
}
