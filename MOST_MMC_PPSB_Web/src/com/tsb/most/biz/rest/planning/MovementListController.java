package com.tsb.most.biz.rest.planning;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.planning.SearchMovementListParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/movementList")
public class MovementListController  extends RestBaseController {
	@RequestMapping(value = "/cargoMoveList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoMovementList(SearchMovementListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.movementList.selectCargoMovementList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
}
