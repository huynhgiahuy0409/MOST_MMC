package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.CargoMovementItem;
import com.tsb.most.biz.parm.operation.SearchCargoMovementParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/cargomovement")
public class CargoMovementController  extends RestBaseController {
	@RequestMapping(value = "/cargoMovementList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoMovement(SearchCargoMovementParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoMovement.selectCargoMovement",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

	@RequestMapping(value = "/cargoMoveList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoMovementList(SearchCargoMovementParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoMovement.selectCargoMovementList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/checkpbzb10", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectPBZB10Movement(SearchCargoMovementParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoMovement.selectPBZB10Movement",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoMovement/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateCargoMovementItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<CargoMovementItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItem(parm.getItem());
		//invokeService("MOST.cargoMovement.updateCargoMovementItems",updateParm);
		invokeService("MOST.cargoMovement.processCargoMovementItem",updateParm);
	}
}
