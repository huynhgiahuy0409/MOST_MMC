package com.tsb.most.biz.rest.validation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.parm.validation.SearchValidationCodeParm;
import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/validationcode")
public class ValidationCodeController extends RestBaseController {
	private static Logger logger = LoggerFactory.getLogger(ValidationCodeController.class);

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectValidation(SearchValidationCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.validationCode.selectValidation", parm);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}

	// ADP.
	@RequestMapping(value = "/validatetruckgateinlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectValidationTruckGateinList(SearchCargoArrvDelvParm parm)
			throws ServiceException, Exception {
		RestResponse response = new RestResponse();

		Object result = new Object();
		result = invokeService("MOST.validationCode.selectValidationTruckGateinList", parm);
		response.setData(((DataItemList) result).getCollection());

		return response;
	}

	
}
