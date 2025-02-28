package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.WHReconciliationItem;
import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.biz.parm.operation.SearchWHReconciliationPivotParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/whreconciliation")
public class WHReconciliationController extends RestBaseController{
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWHRecnList(SearchWHReconciliationParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.whReconciliation.selectWHRecnList",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/pivot", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWHRecnListPivot(SearchWHReconciliationPivotParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.whReconciliation.selectWHRecnListPivot",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWHReconcilationDetail(SearchWHReconciliationParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.whReconciliation.selectWHRecnList",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/detail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateWHReconcilation(@PathVariable("id") String id, @RequestBody WHReconciliationItem item) throws ServiceException, Exception{
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.whReconciliation.updateWHReconcilation",updateParm);
	
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;		
	}
	
	@RequestMapping(value = "/settle", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse processSettlementItems(@RequestBody UpdateBizParm<WHReconciliationItem> parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		InsertItemsBizParm items = new InsertItemsBizParm();
		
		items.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.whReconciliation.processSettlementItems", items);
		
		res.setData(((DataItemList) result).getCollection());
		return res;
	}

}
