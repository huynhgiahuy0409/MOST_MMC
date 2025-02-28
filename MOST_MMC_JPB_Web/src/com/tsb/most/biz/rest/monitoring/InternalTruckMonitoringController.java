package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.tsb.most.biz.parm.monitoring.SearchInternalTruckMonitoringParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

	
@Controller
@RequestMapping("/v1/internalTruckMonitoring")
public class InternalTruckMonitoringController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectInternalTruckMonitoringList(SearchInternalTruckMonitoringParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.internalTruckMonitoring.selectInternalTruckMonitoringList",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
	@RequestMapping(value = "/bookingcombolist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBookingComboItems(SearchInternalTruckMonitoringParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.loading.selectBookingComboItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
}
