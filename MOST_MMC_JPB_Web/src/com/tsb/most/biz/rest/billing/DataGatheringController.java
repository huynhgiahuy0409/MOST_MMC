package com.tsb.most.biz.rest.billing;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.billing.DataGatheringItem;
import com.tsb.most.biz.parm.billing.SearchDataGatheringParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/datagathering")
public class DataGatheringController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDataGathering(SearchDataGatheringParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.dataGathering.selectDataGathering",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/detaillist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDataGatheringDetail(SearchDataGatheringParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.dataGathering.selectDataGatheringDetail",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/validationVesselSchedule", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectValidVslSchedule(SearchDataGatheringParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.dataGathering.selectValidVslSchedule",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/apply/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse applyDataGathering(@PathVariable("id") String id, @RequestBody UpdateBizParm<DataGatheringItem> parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.dataGathering.applyDataGathering", updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/savedetail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse saveDataGatheringDetail(@PathVariable("id") String id, @RequestBody UpdateBizParm<DataGatheringItem> parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.dataGathering.applyDataGatheringDetail", updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/removedetail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void removeDataGatheringDetail(@PathVariable("id") String id, @RequestBody UpdateBizParm<DataGatheringItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		deleteParm.setDeleteItem(super.getItems(parm));
		
		Object result = invokeService("MOST.dataGathering.applyGatheredDataDelete", deleteParm);
	}
}
