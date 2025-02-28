package com.tsb.most.biz.rest.dashboard;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.dashboard.SearchCargoFlowDashboardParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/cargoflowdashboard")
public class CargoFlowDashboardController extends RestBaseController {
	
	@RequestMapping(value = "/vesselschedule", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselSchedule(SearchCargoFlowDashboardParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoflowDashboard.selectVesselSchedule", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/dischargingcommoditylist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDischargingCommoditylist(SearchCargoFlowDashboardParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoflowDashboard.selectDischargingCommoditylist", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/loadingcommoditylist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectLoadingCommoditylist(SearchCargoFlowDashboardParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoflowDashboard.selectLoadingCommoditylist", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/discharginghatchvessellist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDisCargoFlowDashbard(SearchCargoFlowDashboardParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoflowDashboard.selectDisCargoFlowDashbard", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/loadinghatchvessellist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectLoadCargoFlowDashbard(SearchCargoFlowDashboardParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoflowDashboard.selectLoadCargoFlowDashbard", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	

}
