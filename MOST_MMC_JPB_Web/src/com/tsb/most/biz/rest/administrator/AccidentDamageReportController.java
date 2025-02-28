package com.tsb.most.biz.rest.administrator;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.parm.administrator.SearchAccidentDamageReportParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/accidentreport")
public class AccidentDamageReportController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectAcdntDmgRptList(SearchAccidentDamageReportParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.accidentDamageReport.selectAcdntDmgRptList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
    }
}
