package com.tsb.most.biz.rest.planning;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.planning.VesselWorkPlanItem;
import com.tsb.most.biz.parm.planning.SearchVesselWorkPlanParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/vesselworkplan")
public class VesselWorkPlanController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselWorkPLanList(SearchVesselWorkPlanParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.workplan.selectVesselWorkPLanList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public void insertItems(@RequestBody UpdateBizParm<VesselWorkPlanItem> item) throws ServiceException, Exception {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(item));
		
		Object result = invokeService("MOST.workplan.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<VesselWorkPlanItem> item) throws ServiceException, Exception {
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(super.getItems(item));
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.workplan.updateItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteBLList(@PathVariable("id") String id, @RequestBody VesselWorkPlanItem item) throws ServiceException, Exception{
		DataItemList items = new DataItemList();
		
		items.add(item);
		
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		
		deleteItems.setDeleteItems(items);
		invokeService("MOST.workplan.deleteItems", deleteItems);
	}
}