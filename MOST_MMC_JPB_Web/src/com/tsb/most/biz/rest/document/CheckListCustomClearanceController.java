package com.tsb.most.biz.rest.document;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


import com.tsb.most.biz.parm.document.SearchCheckListCustomClearanceParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/customclearance")
public class CheckListCustomClearanceController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCustomClearanceList(SearchCheckListCustomClearanceParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.checkListCustomClearance.selectCustomClearanceList", parm);
		DataItemList resList = (DataItemList)result; 
		
		res.setData(resList.getCollection());
		res.setLimit(resList.getTotalRowCount());
		
		return res;
	}
	
}