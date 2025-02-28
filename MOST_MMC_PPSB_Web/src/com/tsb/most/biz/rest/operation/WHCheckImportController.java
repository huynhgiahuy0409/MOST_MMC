package com.tsb.most.biz.rest.operation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dataitem.operation.CargoDischargingItem;
import com.tsb.most.biz.dataitem.operation.ConfirmDischargingOfROROItem;
import com.tsb.most.biz.parm.operation.SearchCargoDischargingParm;
import com.tsb.most.biz.parm.operation.SearchConfirmDischargingOfROROParm;
import com.tsb.most.biz.parm.operation.SearchOperationSettingParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/whcheckimport")
public class WHCheckImportController  extends RestBaseController {
	@RequestMapping(value = "/whCheckImportList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWhCheckImportList(SearchCargoDischargingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.whCheckImport.selectWhCheckImportList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/loadlocation", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectLocationList(SearchOperationSettingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.whCheckImport.selectLocationList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/hatchList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWhCheckImportHatchList(SearchOperationSettingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.whCheckImport.selectWhCheckImportHatchList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/operationSetHatch", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoDischargingOperationSetHatch(SearchOperationSettingParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.confirmDischarging.selectCargoDischargingOperationSetHatch",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/whCheckImport/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateWhCheckImportItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<CargoDischargingItem>  item) throws ServiceException, Exception{
		item.getItem().setCrud(DAOProcessType.INSERT);
		UpdateItemsBizParm upParm = new UpdateItemsBizParm();
		upParm.setUpdateItem(item.getItem());
		
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.whCheckImport.updateWhCheckImportItems",upParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}

	/*RORO
	*/
	@RequestMapping(value = "/whCheckImportForROROList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectWhCheckImportForROROList(SearchConfirmDischargingOfROROParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.whCheckImport.selectWhCheckImportForROROList",parm);
		res.setData(((DataItemList)result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/whCheckImportForRORO/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<ConfirmDischargingOfROROItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm items = new UpdateItemsBizParm();
		items.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.whCheckImport.updateROROItems", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
}
