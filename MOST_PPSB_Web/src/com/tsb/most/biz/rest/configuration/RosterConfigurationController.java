package com.tsb.most.biz.rest.configuration;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.dataitem.configuration.RosterConfigurationItem;
import com.tsb.most.basebiz.parm.configuration.SearchRosterConfigurationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/rosterconfigurationshift")
public class RosterConfigurationController extends RestBaseController {
	@RequestMapping(value = "/internalStaffMngList/duplicatecheck", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectInternalStaffMngCheck(SearchRosterConfigurationParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfiguration.selectInternalStaffMngCheck",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/internalStaffMngListOnly", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectStaffInfoListOnly(SearchRosterConfigurationParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfiguration.selectStaffInfoListOnly",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/internalstaffmnguserlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectInternalStaffMngUser(SearchRosterConfigurationParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfiguration.selectInternalStaffMngUser",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/internalStaffMngListOnly", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertInternalStaffMngItems(@RequestBody UpdateBizParm<RosterConfigurationItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.rosterConfiguration.insertInternalStaffMngItems", insertParm);
		
		RestResponse response = new RestResponse();
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/internalStaffMngListOnly/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateInternalStaffMngItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<RosterConfigurationItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.rosterConfiguration.updateInternalStaffMngItems", updateParm);
		
		RestResponse response = new RestResponse();
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/internalStaffMngListOnly/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteInternalStaffMngItems(@PathVariable("id") String id, @RequestBody RosterConfigurationItem item) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		DataItemList itemList = new DataItemList();
		
		itemList.add(item);
		deleteParm.setDeleteItems(itemList);
		
		invokeService("MOST.rosterConfiguration.deleteInternalStaffMngItems", deleteParm);
	}
	
	@RequestMapping(value = "/unavailablelogforstaffListOnly", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectInternalStaffMngLog(SearchRosterConfigurationParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfiguration.selectInternalStaffMngLog",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/unavailablelogforstaffListOnly", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertInternalStaffMngLogItems(@RequestBody RosterConfigurationItem item) throws ServiceException, Exception{
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);

		Object result = invokeService("MOST.rosterConfiguration.insertInternalStaffMngLogItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;	
	}
	
	@RequestMapping(value = "/unavailablelogforstaffListOnly/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateInternalStaffMngLogItems(@PathVariable("id") String id, @RequestBody RosterConfigurationItem item) throws ServiceException, Exception{
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
			
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
			
		Object result = invokeService("MOST.rosterConfiguration.updateInternalStaffMngLogItems",updateParm);
			
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
			
		return res; 
	}
	
	@RequestMapping(value = "/unavailablelogforstaffListOnly/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteInternalStaffMngLogItems(@PathVariable("id") String id, @RequestBody RosterConfigurationItem item) throws ServiceException, Exception{
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.rosterConfiguration.deleteInternalStaffMngLogItems",deleteParm);
	}
	
	@RequestMapping(value = "/groupmanagementforrosterinternalStaffListOnly", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGroupManagementforRosterInternalStaffListOnly(SearchRosterConfigurationParm parm) throws ServiceException, Exception {
		if(parm.getUserId() != null || parm.getUserName() != null) {
			parm.setUserId(null);
			parm.setUserName(null);
		} 
		
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfiguration.selectStaffInfoListOnly",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/selectGroupList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGroupList(SearchRosterConfigurationParm parm) throws ServiceException, Exception {
		if(parm.getUserId() != null || parm.getUserName() != null) {
			parm.setUserId(null);
			parm.setUserName(null);
		} 
		
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfiguration.selectGroupList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/shiftGroupListOnly", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShiftGroupListOnly(SearchRosterConfigurationParm parm) throws ServiceException, Exception {
		if(parm.getUserId() != null || parm.getUserName() != null) {
			parm.setUserId(null);
			parm.setUserName(null);
		} 
		
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfiguration.selectShiftGroupListOnly",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/deployedGroupStaffListOnly", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDeployedGroupStaffListOnly(SearchRosterConfigurationParm parm) throws ServiceException, Exception {
		
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfiguration.selectDeployedGroupStaffListOnly",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/shiftGroupListOnly", method = RequestMethod.POST)
	@ResponseBody
	@ResponseStatus(HttpStatus.CREATED)
	public RestResponse insertShiftGroupList(@RequestBody RosterConfigurationItem item) throws ServiceException, Exception{
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);

		Object result = invokeService("MOST.rosterConfiguration.insertShiftGroupList",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;			
	}
	
	@RequestMapping(value = "/shiftGroupListOnly/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteShiftGroupList(@PathVariable("id") String id, @RequestBody RosterConfigurationItem item) throws ServiceException, Exception{
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.rosterConfiguration.deleteShiftGroupList",deleteParm);
	}
	
	@RequestMapping(value = "/shiftDefListOnly", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShiftDef(SearchRosterConfigurationParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfiguration.selectShiftDef",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/shiftDefListOnly", method = RequestMethod.POST)
	@ResponseBody
	@ResponseStatus(HttpStatus.CREATED)
	public RestResponse insertShiftDefItems(@RequestBody RosterConfigurationItem item) throws ServiceException, Exception{
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);
			
		Object result = invokeService("MOST.rosterConfiguration.insertShiftDefItems",insertParm);
			
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;			
	}
	
	@RequestMapping(value = "/shiftDefListOnly/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateShiftDefItems(@PathVariable("id") String id, @RequestBody RosterConfigurationItem item) throws ServiceException, Exception{
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
			
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
			
		Object result = invokeService("MOST.rosterConfiguration.updateShiftDefItems",updateParm);
			
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
			
		return res; 
	}
	
	@RequestMapping(value = "/shiftDefListOnly/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteShiftDefItems(@PathVariable("id") String id, @RequestBody RosterConfigurationItem item) throws ServiceException, Exception{
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.rosterConfiguration.deleteShiftDefItems",deleteParm);
	}
	
	@RequestMapping(value = "/shiftGroupDefListOnly", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGroupDef(SearchRosterConfigurationParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfiguration.selectGroupDef",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/shiftGroupDefListOnly", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertShiftGroupItems(@RequestBody RosterConfigurationItem item) throws ServiceException, Exception{
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
					
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);
					
		Object result = invokeService("MOST.rosterConfiguration.insertShiftGroupItems",insertParm);
					
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;		
	}
	
	@RequestMapping(value = "/shiftGroupDefListOnly/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateShiftGroupItems(@PathVariable("id") String id, @RequestBody RosterConfigurationItem item) throws ServiceException, Exception{
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
			
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
			
		Object result = invokeService("MOST.rosterConfiguration.updateShiftGroupItems",updateParm);
			
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
			
		return res;
	}
	
	@RequestMapping(value = "/shiftGroupDefListOnly/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteShiftGroupItems(@PathVariable("id") String id, @RequestBody RosterConfigurationItem item) throws ServiceException, Exception{
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.rosterConfiguration.deleteShiftGroupItems",deleteParm);
	}
	
	
	@RequestMapping(value = "/checkGroupIsUsedOrNot", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse checkGroupIsUsedOrNot(SearchRosterConfigurationParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfiguration.checkGroupIsUsedOrNot",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/getAllAssignedStaffByGroupCd", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getAllAssignedStaffByGroupCd(SearchRosterConfigurationParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfiguration.getAllAssignedStaffByGroupCd",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/getShiftGrpCdOnly", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getShiftGrpCdOnly(SearchRosterConfigurationParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfiguration.getShiftGrpCdOnly",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
}
