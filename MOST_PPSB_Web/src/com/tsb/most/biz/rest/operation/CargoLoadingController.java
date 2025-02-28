package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.dataitem.operation.CargoLoadingItem;
import com.tsb.most.biz.parm.operation.SearchCargoLoadingParm;
import com.tsb.most.biz.parm.operation.SearchHangingScaleParm;
import com.tsb.most.biz.parm.operation.SearchOperationSettingParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/cargoloading")
public class CargoLoadingController  extends RestBaseController {
	@RequestMapping(value = "/cargoLoadingList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoLoadingList(SearchCargoLoadingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoLoading.selectCargoLoadingList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/hatchList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoLoadingHatchList(SearchOperationSettingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoLoading.selectCargoLoadingHatchList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/piplineGrNo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectPiplineGrNo(SearchCargoLoadingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoLoading.selectPiplineGrNo",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/operationSetHatch", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoLoadingOperationSetHatch(SearchOperationSettingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoLoading.selectCargoLoadingOperationSetHatch",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/hangingscale", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectHangingScaleItems(SearchHangingScaleParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoLoading.selectHangingScaleItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoLoading/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateCargoLoadingItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<CargoLoadingItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItem(parm.getItem());
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoLoading.updateCargoLoadingItems",updateParm);
	
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
}
