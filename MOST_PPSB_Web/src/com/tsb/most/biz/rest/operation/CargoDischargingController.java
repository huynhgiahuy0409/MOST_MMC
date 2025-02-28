package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dataitem.operation.CargoDischargingItem;
import com.tsb.most.biz.parm.operation.SearchCargoDischargingParm;
import com.tsb.most.biz.parm.operation.SearchHangingScaleParm;
import com.tsb.most.biz.parm.operation.SearchOperationSettingParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/cargodischarging")
public class CargoDischargingController  extends RestBaseController {
	@RequestMapping(value = "/cargoDischargingList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoDischargingList(SearchCargoDischargingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = new Object();
		if("BARGE".equals(parm.getSearchType())) {
			result = invokeService("MOST.cargoDischarging.selectCargoDischargingOfBarge",parm);
		} else {
			result = invokeService("MOST.cargoDischarging.selectCargoDischargingList",parm);
		}
		
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/hatchList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoDischargingHatchList(SearchOperationSettingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoDischarging.selectCargoDischargingHatchList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/operationSetHatch", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectOperationSetHatch(SearchOperationSettingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoDischarging.selectOperationSetHatch",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/hangingscale", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectHangingScaleItems(SearchHangingScaleParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoDischarging.selectHangingScaleItems",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoDischarging/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateCargoDischarging(@PathVariable("id") String id, @RequestBody UpdateBizParm<CargoDischargingItem>  item) throws ServiceException, Exception{
		item.getItem().setCrud(DAOProcessType.INSERT);
		UpdateItemsBizParm upParm = new UpdateItemsBizParm();
		upParm.setUpdateItem(item.getItem());
		
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.cargoDischarging.updateCargoDischarging",upParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
}
