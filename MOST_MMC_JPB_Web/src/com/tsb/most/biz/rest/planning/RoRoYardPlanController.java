package com.tsb.most.biz.rest.planning;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.planning.RoRoYardPlanItem;
import com.tsb.most.biz.parm.planning.SearchRoRoYardPlanParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/roroyardplan")
public class RoRoYardPlanController  extends RestBaseController {
	private static Logger logger = LoggerFactory.getLogger(RoRoYardPlanController.class);
	
	@RequestMapping(value = "/cargolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRoRoYardPlanCargoList(SearchRoRoYardPlanParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.roroYardPlan.selectRoRoYardPlanCargoList",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/unitlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRoRoYardPlanUnitList(SearchRoRoYardPlanParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.roroYardPlan.selectRoRoYardPlanUnitList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/plannedlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRoRoYardPlanList(SearchRoRoYardPlanParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.roroYardPlan.selectRoRoYardPlanList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
	
	@RequestMapping(value = "/unitlist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateRoroYardPlan(@PathVariable("id") String id, @RequestBody UpdateBizParm<RoRoYardPlanItem> parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		
		items.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.roroYardPlan.updateItems", items);
		
		res.setData(((DataItemList) result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/unitlist/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteRoroYardPlan(@PathVariable("id") String id, @RequestBody UpdateBizParm<RoRoYardPlanItem> parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		
		items.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.roroYardPlan.deleteItems", items);
		
		res.setData(((DataItemList) result).getCollection());
		
		return res;
	}
	
	
	@RequestMapping(value = "/unitlistforwhimport", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectRoRoYardPlanUnitWHCheckImportList(SearchRoRoYardPlanParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.roroYardPlan.selectRoRoYardPlanUnitWHCheckImportList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
}
