package com.tsb.most.biz.rest.configuration;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.dataitem.configuration.DriverTruckRegistrationItem;
import com.tsb.most.basebiz.parm.configuration.SearchDriverTruckRegistrationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/drivertruckregistration")
public class DriverTruckRegistrationController extends RestBaseController {
	
	// Drivers Tab Controller =================================================================================================================================
	
	@RequestMapping(value = "/driversListOnly", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDriverRegistrationItems(SearchDriverTruckRegistrationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.driverTruckRegistration.selectDriverRegistrationItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	@RequestMapping(value = "/checkdriverduplicate", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDriverDuplicateItems(SearchDriverTruckRegistrationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.driverTruckRegistration.selectDriverDuplicateItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/checkchassisduplicate", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectChassisDuplicateItems(SearchDriverTruckRegistrationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.driverTruckRegistration.selectChassisDuplicateItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/checktruckduplicate", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTruckDuplicateItems(SearchDriverTruckRegistrationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.driverTruckRegistration.selectTruckDuplicateItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/driversListOnly", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertDriverRegistrationItems(@RequestBody DriverTruckRegistrationItem item) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		InsertItemsBizParm parm = new InsertItemsBizParm();
		
		parm.addInsertItem(item);
		Object result = invokeService("MOST.driverTruckRegistration.insertDriverRegistrationItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/driversListOnly/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateDriverRegistrationItems(@PathVariable("id") String id, @RequestBody DriverTruckRegistrationItem item) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		UpdateItemsBizParm parm = new UpdateItemsBizParm();
		
		parm.addUpdateItem(item);
		Object result = invokeService("MOST.driverTruckRegistration.updateDriverRegistrationItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/driversListOnly/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteDriverRegistrationItems(@PathVariable("id") String id, @RequestBody DriverTruckRegistrationItem item) throws ServiceException, Exception{
		DeleteItemsBizParm parm = new DeleteItemsBizParm();
		
		parm.addDeleteItem(item);
		
		invokeService("MOST.driverTruckRegistration.deleteDriverRegistrationItems",parm);
	}
	
	// Lorries Tab Controller =================================================================================================================================
	@RequestMapping(value = "/lorriesListOnly", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTruckRegistrationItems(SearchDriverTruckRegistrationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.driverTruckRegistration.selectTruckRegistrationItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/lorriesListOnly", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertTruckRegistrationItems(@RequestBody DriverTruckRegistrationItem item) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		InsertItemsBizParm parm = new InsertItemsBizParm();
		
		parm.addInsertItem(item);
		Object result = invokeService("MOST.driverTruckRegistration.insertTruckRegistrationItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/lorriesListOnly/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateTruckRegistrationItems(@PathVariable("id") String id, @RequestBody DriverTruckRegistrationItem item) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		UpdateItemsBizParm parm = new UpdateItemsBizParm();
		
		parm.addUpdateItem(item);
		Object result = invokeService("MOST.driverTruckRegistration.updateTruckRegistrationItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/lorriesListOnly/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteTruckRegistrationItems(@PathVariable("id") String id, @RequestBody DriverTruckRegistrationItem item) throws ServiceException, Exception{
		DeleteItemsBizParm parm = new DeleteItemsBizParm();
		
		parm.addDeleteItem(item);
		
		invokeService("MOST.driverTruckRegistration.deleteTruckRegistrationItems",parm);
	}
	
	@RequestMapping(value = "/chassisListOnly", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectChassisRegistrationItems(SearchDriverTruckRegistrationParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.driverTruckRegistration.selectChassisRegistrationItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/chassisListOnly", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertChassisRegistrationItems(@RequestBody DriverTruckRegistrationItem item) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		InsertItemsBizParm parm = new InsertItemsBizParm();
		
		parm.addInsertItem(item);
		Object result = invokeService("MOST.driverTruckRegistration.insertChassisRegistrationItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/chassisListOnly/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateChassisRegistrationItems(@PathVariable("id") String id, @RequestBody DriverTruckRegistrationItem item) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		UpdateItemsBizParm parm = new UpdateItemsBizParm();
		
		parm.addUpdateItem(item);
		Object result = invokeService("MOST.driverTruckRegistration.updateChassisRegistrationItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/chassisListOnly/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteChassisRegistrationItems(@PathVariable("id") String id, @RequestBody DriverTruckRegistrationItem item) throws ServiceException, Exception{
		DeleteItemsBizParm parm = new DeleteItemsBizParm();
		
		parm.addDeleteItem(item);
		
		invokeService("MOST.driverTruckRegistration.deleteChassisRegistrationItems",parm);
	}
}
