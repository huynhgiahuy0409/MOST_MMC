package com.tsb.most.biz.rest.monitoring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.monitoring.SearchTheListOfUnitNoCorrectionParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;


@Controller
@RequestMapping("/v1/thelistofunitnocorrection")
public class TheListOfUnitNoCorrectionController  extends RestBaseController {
	@RequestMapping(value = "/unitList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCorrectionUnitNoItems(SearchTheListOfUnitNoCorrectionParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.theListOfUnitNoCorrection.selectCorrectionUnitNoItems",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		return res;
	}
	
}
