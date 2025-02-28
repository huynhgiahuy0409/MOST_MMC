package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.CargoHandlingInItem;
import com.tsb.most.biz.parm.operation.SearchCargoHandlingInParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/cargohandlingin")
public class CargoHandlingInController  extends RestBaseController {
	@RequestMapping(value = "/cargoHandlingInList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoHandlingInList(SearchCargoHandlingInParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoHandlingIn.selectCargoHandlingInList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoHandlingIn/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateCargoHandlingInItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<CargoHandlingInItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItem(parm.getItem());
		Object result = invokeService("MOST.cargoHandlingIn.updateCargoHandlingInItems",updateParm);
		
		RestResponse res = new RestResponse();
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/loadlocation", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectLocationList(SearchCargoHandlingInParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoHandlingIn.selectLocationList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
}
