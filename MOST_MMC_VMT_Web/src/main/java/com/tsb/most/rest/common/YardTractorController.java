package com.tsb.most.rest.common;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.parm.yardtruck.SearchEquipmentParm;
import com.tsb.most.biz.parm.yardtruck.SearchStoppageParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/yt")
public class YardTractorController extends RestBaseController {
	
	@RequestMapping(value = "/searchContainerItems",  method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public RestResponse searchEquipmentYtItems(@RequestBody SearchEquipmentParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.yardTractor.searchContainerItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/searchStopReasonItems",  method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public RestResponse searchStoppageItems(@RequestBody SearchStoppageParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.yardTractor.searchStopReasonItems",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	
	/**
	 * RBT. 20240313. ADDED FOR NEW SOURCE CODE:
	 * -----------------------------------------
	 * searchStoppageItem of YT to display after login
	 * 
	 * */
	@RequestMapping(value = "/searchLoginStoppageItem", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse searchLoginStoppageItem(@RequestBody SearchStoppageParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.yardTractor.searchStoppageItem",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	
	/**
	 * RBT. 20240313. ADDED FOR NEW SOURCE CODE:
	 * -----------------------------------------
	 * SET STOPPPAGE.
	 * IN THE ORIGINAL VERSION. THIS FUNCTION EXEC BY C3IT.
	 * TEMPORARY. UPDATE BY YT - WITHOUT MTS (C3IT).
	 * */
	@RequestMapping(value = "/setStoppage",  method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public RestResponse setStoppage(@RequestBody SearchStoppageParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.yardTractor.processSetStoppage",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	
	/**
	 * RBT. 20240313. ADDED FOR NEW SOURCE CODE:
	 * -----------------------------------------
	 * RESUME STOPPPAGE.
	 * IN THE ORIGINAL VERSION. THIS FUNCTION EXEC BY C3IT.
	 * TEMPORARY. UPDATE BY YT - WITHOUT MTS (C3IT).
	 * */
	
	@RequestMapping(value = "/resumeStoppage",  method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public RestResponse resumeStoppage(@RequestBody SearchStoppageParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.yardTractor.processResumeStoppage",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	
	
	 /**
	  * 2024.03.26
	 *  WebSocket
	 *  without MTS (c3it)
	 * 
	
	
	public void processDeviceDisConnected(String pUserId, String pUserPwd, String pEquNo) {
		SearchEquipmentParm parm = new SearchEquipmentParm();
		invokeService("MOST.yardTractor.processDeviceDisConnected",parm);
	}
	*/
	public void processDeviceConnected(String pUserId, String pUserPwd, String pEquNo, String sessionId) {
		SearchEquipmentParm parm = new SearchEquipmentParm();
		parm.setEquipmentNo(pEquNo);
		invokeService("MOST.yardTractor.processDeviceConnected",parm);
	}
	
}
