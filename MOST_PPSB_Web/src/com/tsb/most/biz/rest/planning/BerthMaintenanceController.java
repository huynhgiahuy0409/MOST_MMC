package com.tsb.most.biz.rest.planning;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.planning.BerthMaintenanceItem;
import com.tsb.most.biz.parm.planning.SearchBerthMaintenanceParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/berthmaintenance")
public class BerthMaintenanceController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBerthMaintenanceList(SearchBerthMaintenanceParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.berthMaintenance.selectBerthMaintenanceList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/checkduplicate", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDuplicateBerthNoAndStartTime(SearchBerthMaintenanceParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.berthMaintenance.selectDuplicateBerthNoAndStartTime",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertBerthMaintenanceList(@RequestBody UpdateBizParm<BerthMaintenanceItem> parm) throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		InsertItemsBizParm items = new InsertItemsBizParm();
		items.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.berthMaintenance.insertBerthMaintenanceList", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateBerthMaintenanceList(@PathVariable("id") String id, @RequestBody UpdateBizParm<BerthMaintenanceItem> parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.berthMaintenance.updateBerthMaintenanceList", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItems(@PathVariable("id") String id, @RequestBody BerthMaintenanceItem item) throws ServiceException, Exception{
		DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.berthMaintenance.deleteBerthMaintenanceList",deleteParm);
	}
	

	@RequestMapping(value = "/berthloclist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBerthLocList(SearchBerthMaintenanceParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.berthMaintenance.selectBerthLocList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/bittlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBittList(SearchBerthMaintenanceParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.berthMaintenance.selectBittList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/stoppagereasonlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectStoppageReasonList(SearchBerthMaintenanceParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.berthMaintenance.selectStoppageReasonList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
}