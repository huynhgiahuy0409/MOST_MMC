package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.planning.SearchBerthPlanParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/berthmonitoring")
public class BerthMonitoringController extends RestBaseController {
	
	@RequestMapping(value = "/berthstructure", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBerthStructure(SearchBerthPlanParm berthPlanParm)  throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.berthMonitoring.selectBerthStructure",berthPlanParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/plans", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBerthPlanList(SearchBerthPlanParm berthPlanParm)  throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.berthMonitoring.selectBerthPlanList",berthPlanParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
}