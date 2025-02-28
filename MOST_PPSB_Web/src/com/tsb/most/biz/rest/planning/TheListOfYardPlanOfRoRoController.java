package com.tsb.most.biz.rest.planning;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.planning.SearchTheListOfYardPlanOfRoRoParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/thelistofyardplanofroro")
public class TheListOfYardPlanOfRoRoController  extends RestBaseController {
	private static Logger logger = LoggerFactory.getLogger(TheListOfYardPlanOfRoRoController.class);
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTheListOfYardPlanOfROROItems(SearchTheListOfYardPlanOfRoRoParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		Object result = invokeService("MOST.theListOfYardPlanOfRoRo.selectTheListOfYardPlanOfROROItems",parm);
		
		response.setData(((DataItemList)result).getCollection());
		response.setLimit(((DataItemList)result).getTotalRowCount());
		
		return response;
	}
}
