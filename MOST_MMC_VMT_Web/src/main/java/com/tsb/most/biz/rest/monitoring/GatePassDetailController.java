package com.tsb.most.biz.rest.monitoring;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.monitoring.GatePassImportParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;



@Controller
@RequestMapping("/v1/gatepassdetail")
public class GatePassDetailController extends RestBaseController {
	@RequestMapping(value = "/gatePassDetailList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectGatePassImportList(GatePassImportParm param) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.gatePassImport.selectGatePassImport", param);
		response.setData(((DataItemList) result).getCollection());
		response.setLimit(((DataItemList) result).getTotalRowCount());
		return response;
	}

}
