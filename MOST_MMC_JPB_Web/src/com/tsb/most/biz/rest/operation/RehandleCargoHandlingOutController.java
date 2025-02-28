package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dataitem.operation.CargoHandlingOutItem;
import com.tsb.most.biz.parm.operation.SearchCargoHandlingOutParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/rehandlecargohandlingout")
public class RehandleCargoHandlingOutController  extends RestBaseController {
	@RequestMapping(value = "/cargoRhdlHandlingOutlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoRhdlHandlingOutList(SearchCargoHandlingOutParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleCargoHandlingOut.selectCargoRhdlHandlingOutList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/cargoRhdlHandlingOutlist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateCargoRhdlHandlingOutItem(@PathVariable("id") String id, @RequestBody UpdateBizParm<CargoHandlingOutItem> parm) throws ServiceException, Exception{
		parm.getItem().setCrud(DAOProcessType.INSERT);
		UpdateItemsBizParm pParm = new UpdateItemsBizParm();
		pParm.setUpdateItems(super.getItems(parm));
		
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.rehandleCargoHandlingOut.updateCargoRhdlHandlingOutItem",pParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
}
