package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.monitoring.SearchGateOutParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/gateout")
public class GateOutController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectListOfGateOut(SearchGateOutParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.gateOut.selectListOfGateOut",parm);
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		return response;
	}
	
	@RequestMapping(value = "/snBlComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectListOfGateOutBlComboList(SearchGateOutParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.gateOut.selectListOfGateOutBlComboList",parm);
		response.setData(((DataItemList)result).getCollection());
		return response;
	}
}
