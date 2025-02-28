package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dataitem.operation.CargoLoadingItem;
import com.tsb.most.biz.parm.operation.SearchCargoLoadingParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/rehandlecargoloading")
public class RehandleCargoLoadingController  extends RestBaseController {
	@RequestMapping(value = "/cargoRhdlLoadinglist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRhdLoadingList(SearchCargoLoadingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleCargoLoading.selectCargoRhdLoadingList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoRhdlLoadinglist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateCargoRhdlLoadingItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<CargoLoadingItem> parm) throws ServiceException, Exception{
		parm.getItem().setCrud(DAOProcessType.INSERT);
		UpdateItemsBizParm pParm = new UpdateItemsBizParm();
		pParm.setUpdateItems(super.getItems(parm));
		
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleCargoLoading.updateCargoRhdlLoadingItem",pParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
}
