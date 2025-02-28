package com.tsb.most.biz.rest.vms;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.parm.vms.SalesParm;
import com.tsb.most.framework.dataitem.DataItemList;

//import com.pcs.foundation.exception.ServiceException;
//import com.pcs.rest.base.controller.RestBaseController;
//import com.plus.foundation.common.RestResponse;

import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/bulk/sales")
public class SalesController extends RestBaseController {
	/** The logger. */
	//private ILogger logger = new LoggingService(getClass());
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSalesData(SalesParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.sales.selectSalesData", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	@RequestMapping(value = "/pivot/planvsactual", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBulkSalesPlanVsActualDataList(SalesParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.sales.selectBulkSalesPlanVsActualDataList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/pivot/planvsplan", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBulkSalesPlanVsPlanDataList(SalesParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.sales.selectBulkSalesPlanVsPlanDataList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/pivot/actual", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBulkSalesActualDataList(SalesParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.sales.selectBulkSalesActualDataList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
}
