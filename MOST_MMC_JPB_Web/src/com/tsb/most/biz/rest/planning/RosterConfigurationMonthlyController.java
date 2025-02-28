package com.tsb.most.biz.rest.planning;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.planning.RosterConfigurationMonthlyItem;
import com.tsb.most.biz.parm.planning.SearchRosterConfigurationMonthlyParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/rosterconfigurationmonthly")
public class RosterConfigurationMonthlyController extends RestBaseController {
	@RequestMapping(value = "/shift", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShiftVesselOperation(SearchRosterConfigurationMonthlyParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfigurationMonthly.selectShiftVesselOperation",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/data", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRosterMonthlyData(SearchRosterConfigurationMonthlyParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfigurationMonthly.selectRosterMonthlyData",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/data/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateRosterMonthlySetup(@PathVariable("id") String id, @RequestBody RosterConfigurationMonthlyItem item) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		DataItemList updateItem = new DataItemList();
		RestResponse res = new RestResponse();
		
		updateItem.add(item);
		updateParm.setUpdateItems(updateItem);
		
		Object result = invokeService("MOST.planning.insertRosterSetupItems", updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/data", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<RosterConfigurationMonthlyItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.rosterConfigurationMonthly.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/shiftgrouppopup", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShiftGroupDefList(SearchRosterConfigurationMonthlyParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfigurationMonthly.selectShiftGroupDefList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/shiftdef", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShiftDefList(SearchRosterConfigurationMonthlyParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.rosterConfigurationMonthly.selectShiftDefList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
}
