package com.tsb.most.biz.rest.operation;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.WHReconciliationItem;
import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;



@Controller
@RequestMapping("/v1/whreconciliation")
public class WHReconciliationController extends RestBaseController{
	@RequestMapping(value = "/whreconciliationlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWHReconcilationList(SearchWHReconciliationParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.whReconciliation.selectWHRecnList",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWHReconcilationDetail(SearchWHReconciliationParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.whReconciliation.selectWHRecnDetailList",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
	@RequestMapping(value = "/detail/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void insertWHReconcilation(@PathVariable("id") String id, @RequestBody UpdateBizParm<WHReconciliationItem> parm) throws ServiceException, Exception{
		
		Object result = new Object();
		
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.setInsertItems(super.getItems(parm));
		invokeService("MOST.whReconciliation.processWHReconciliationItems", insertParm);
		
	}
}
