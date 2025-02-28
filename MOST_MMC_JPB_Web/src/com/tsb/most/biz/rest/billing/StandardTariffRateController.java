package com.tsb.most.biz.rest.billing;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dataitem.billing.StandardTariffRateItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeItem;
import com.tsb.most.biz.parm.billing.SearchCostCenterParm;
import com.tsb.most.biz.parm.billing.SearchStandardTariffRateParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;


@Controller
@RequestMapping("/v1/standardtariffrate")
public class StandardTariffRateController extends RestBaseController {
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getStandardTariffRateList(SearchStandardTariffRateParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.standardTariffRate.selectStandardTariffRate",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/copy", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getCopyStandardTariffRateList(SearchStandardTariffRateParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.standardTariffRate.selectStandardTariffRate",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/combo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getApplyDateCombo(SearchStandardTariffRateParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.standardTariffRate.selectApplyDateList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/blanklist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse getBlankStandardTariffRateList(SearchStandardTariffRateParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.standardTariffRate.selectBlankStandardTariffRateList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list/duplicatecheck", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectInvoiceUnitDuplicate(SearchCostCenterParm parm)  throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.standardTariffRate.getCostCenterList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<StandardTariffRateItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		
		Object result = invokeService("MOST.standardTariffRate.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<StandardTariffRateItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.standardTariffRate.updateItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public RestResponse deleteItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<StandardTariffRateItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		RestResponse res = new RestResponse();
		deleteParm.setDeleteItems(super.getItems(parm));
		Object result = invokeService("MOST.standardTariffRate.deleteItems",deleteParm);
		res.setData(((DataItemList)result).getCollection());
		return res;
		
	}
	
}
