package com.tsb.most.biz.rest.billing;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.billing.PartnerTariffRateItem;
import com.tsb.most.biz.parm.billing.SearchPartnerTariffRateParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;


@Controller
@RequestMapping("/v1/partnertariffrate")
public class PartnerTariffRateController extends RestBaseController {

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectPartnerTariffRate(SearchPartnerTariffRateParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.partnerTariffRate.selectPartnerTariffRate",parm);
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/berth", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBerthList(SearchPartnerTariffRateParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.partnerTariffRate.selectBerthList",parm);
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}

	@RequestMapping(value = "/detaillist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectPartnerTariffRateDetailList(SearchPartnerTariffRateParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.partnerTariffRate.selectPartnerTariffRateDetailList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/detaillist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updatePartnerTariffRateDetail(@PathVariable("id") String id, @RequestBody UpdateBizParm<PartnerTariffRateItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.partnerTariffRate.updatePartnerTariffRate", updateParm);
		
		RestResponse res = new RestResponse();
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/detaillist", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertPartnerTariffRateDetail(@RequestBody UpdateBizParm<PartnerTariffRateItem> parm) throws ServiceException, Exception {
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.partnerTariffRate.insertPartnerTariffRate",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deletePartnerTariffRate(@PathVariable("id") String id, @RequestBody PartnerTariffRateItem item) throws ServiceException, Exception{
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		DataItemList items = new DataItemList();
		
		items.add(item);
		deleteItems.setDeleteItems(items);
		
		invokeService("MOST.partnerTariffRate.deletePartnerTariffRate", deleteItems);
	}
	
	@RequestMapping(value = "/detaillist/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deletePartnerTariffRateDetail(@PathVariable("id") String id, @RequestBody UpdateBizParm<PartnerTariffRateItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		deleteItems.setDeleteItems(super.getItems(parm));
		
		invokeService("MOST.partnerTariffRate.deletePartnerTariffRateDetail", deleteItems);
	}
}
