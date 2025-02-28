package com.tsb.most.biz.rest.dashboard;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.dashboard.SearchBBTDashboardParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/bbtdashboard")
public class BBTDashboardController extends RestBaseController {
	
	@RequestMapping(value = "/shiftList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWorkShiftDefinition(SearchBBTDashboardParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bbtDashboard.selectWorkShiftDefinition", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/selectVesselCount",method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselCount(SearchBBTDashboardParm parm) throws ServiceException, Exception  {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.bbtDashboard.selectVesselCount", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

	@RequestMapping(value = "/selectWeatherForecast",method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWeatherForecast(SearchBBTDashboardParm parm) throws ServiceException, Exception  {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bbtDashboard.selectWeatherForecast", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

	@RequestMapping(value = "/selectAccidentCounts",method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectAccidentCounts(SearchBBTDashboardParm parm) throws ServiceException, Exception  {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bbtDashboard.selectAccidentsCount", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	@RequestMapping(value = "/selectTerminalOccupancy",method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTerminalOccupancy(SearchBBTDashboardParm parm) throws ServiceException, Exception  {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bbtDashboard.selectTerminalOccupancy", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	@RequestMapping(value = "/selectBulkSummary",method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBulkSummary(SearchBBTDashboardParm parm) throws ServiceException, Exception  {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bbtDashboard.selectBulkSummary", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	@RequestMapping(value = "/selectCargoOperation",method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoOperation(SearchBBTDashboardParm parm) throws ServiceException, Exception  {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bbtDashboard.selectCargoOperation", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

	@RequestMapping(value = "/selectBulkHandlingBalanceCompare",method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBulkHandlingBalanceCompare(SearchBBTDashboardParm parm) throws ServiceException, Exception  {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bbtDashboard.selectBulkHandlingBalanceCompare", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

	@RequestMapping(value = "/selectBulkProductivity",method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBulkProductivity(SearchBBTDashboardParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bbtDashboard.selectBreakDryBulkProductivity", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

	@RequestMapping(value = "/selectLorriesTurnaround",method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectLorriesTurnaround(SearchBBTDashboardParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bbtDashboard.selectLorriesTurnaround", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

	@RequestMapping(value = "/selectBulkDelay",method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBulkDelay(SearchBBTDashboardParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bbtDashboard.selectBulkDelay", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

	@RequestMapping(value = "/selectWhYdHandling",method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWhYdHandling(SearchBBTDashboardParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.bbtDashboard.selectWhYdHandling", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

}
