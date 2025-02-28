package com.tsb.most.biz.rest.planning;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.planning.SearchAlertFunctionParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/commonCode")
public class AlertFunctionController extends RestBaseController { 
	
	@GetMapping("/alertlist")
	@ResponseBody
	public RestResponse getAlertFunctionList(SearchAlertFunctionParm parm) throws ServiceException {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.alertFunction.getAlertFunctionList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}
	
}
