package com.tsb.most.biz.rest.planning;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.planning.SpaceMovementPlanItem;
import com.tsb.most.biz.parm.planning.SearchSpaceMovementPlanParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/spacemovementplan")
public class SpaceMovementPlanController  extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSpaceMovementPlanList(SearchSpaceMovementPlanParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.spaceMovementPlan.selectSpaceMovementRequestList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/multiplesearchfiltercombo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMultipleSearchFilterCombo(SearchSpaceMovementPlanParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.spaceMovementPlan.selectMultipleSearchFilterCombo",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/spcmovementplandetail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSpaceMoveMentPlanDetail(SearchSpaceMovementPlanParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.spaceMovementPlan.selectSpaceMoveMentPlanDetail", parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/spcmovementplandetail", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertSpaceMovementPlan(@RequestBody UpdateBizParm<SpaceMovementPlanItem> parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.spaceMovementPlan.insertItems", insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/spcmovementplandetail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateSpaceMovementPlan(@PathVariable("id") String id, @RequestBody UpdateBizParm<SpaceMovementPlanItem> parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.spaceMovementPlan.updateItems", updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/spcmovementplandetail/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deletePlanDetailList(@PathVariable("id") String id, @RequestBody UpdateBizParm<SpaceMovementPlanItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		
		deleteItems.setDeleteItems(super.getItems(parm));
		
		invokeService("MOST.spaceMovementPlan.deleteItems", deleteItems);
	} 
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deletePlanList(@PathVariable("id") String id, @RequestBody UpdateBizParm<SpaceMovementPlanItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		
		deleteItems.setDeleteItems(super.getItems(parm));
		
		invokeService("MOST.spaceMovementPlan.deleteItems", deleteItems);
	}
	
	
	@RequestMapping(value = "/gr", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGrList(SearchSpaceMovementPlanParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.spaceMovementPlan.selectGrList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/cargoinfo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSpaceMovementInfo(SearchSpaceMovementPlanParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.spaceMovementPlan.selectSpaceMovementInfo", parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
}
