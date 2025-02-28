package com.tsb.most.biz.rest.operation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.operation.SearchRehandleOperationGCParm;
import com.tsb.most.biz.parm.operation.SearchRehandlingOfGCParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;
	
@Controller
@RequestMapping("/v1/rehandleoperationgc")
public class RehandleOperationGCController extends RestBaseController {
	
	private static Logger logger = LoggerFactory.getLogger(RehandleOperationGCController.class);

	@RequestMapping(value = "/rehandleOperationlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRhdlOperation(SearchRehandleOperationGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleOperationGC.selectCargoRhdlOperation",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/comboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRehandlingComboList(SearchRehandlingOfGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleOperationGC.selectCargoRehandlingComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/snBlComboList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRehandlingSnBlComboList(SearchRehandlingOfGCParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleOperationGC.selectCargoRehandlingSnBlComboList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

}
