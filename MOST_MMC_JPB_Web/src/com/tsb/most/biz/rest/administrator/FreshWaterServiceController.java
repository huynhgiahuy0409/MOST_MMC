package com.tsb.most.biz.rest.administrator;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.parm.administrator.SearchFreshWaterServiceParm;
import com.tsb.most.basebiz.parm.common.SearchVesselCallListParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/fws")
public class FreshWaterServiceController extends RestBaseController{
	@RequestMapping(value = "/fwslist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectListofFreshWater(SearchFreshWaterServiceParm parm) throws ServiceException, Exception {		
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.freshWaterService.selectFreshWaterServiceItems", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/selectSearchVesselCallId", method = RequestMethod.GET)
	@ResponseBody
    public RestResponse selectSearchVesselCallId(SearchVesselCallListParm parm) throws ServiceException {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.searchVesselCall.selectSearchVesselCallId",parm);
		
		res.setData(((DataItemList)result).getCollection());
		return res;
    }
}