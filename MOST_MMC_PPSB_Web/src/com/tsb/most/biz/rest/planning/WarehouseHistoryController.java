package com.tsb.most.biz.rest.planning;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.operation.SearchCargoJobParm;
import com.tsb.most.biz.parm.planning.SearchWarehouseHistoryParm;
import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/warehouseHistory")
public class WarehouseHistoryController extends RestBaseController{
	
	@RequestMapping(value = "/historyList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoJobHistoryList(SearchWarehouseHistoryParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.warehouseHistory.selectCargoJobHistoryList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		
		return response;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWHRecnList(SearchWHReconciliationParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.warehouseHistory.selectWHRecnList",parm);
		
		response.setData(((DataItemList)result).getCollection());
		
		return response;
	}
}
