package com.tsb.most.biz.rest.billing;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.billing.AnnualHolidayItem;
import com.tsb.most.biz.dataitem.billing.CostCenterItem;
import com.tsb.most.biz.parm.billing.SearchAnnualHolidayParm;
import com.tsb.most.biz.parm.billing.SearchDefineHolidayCodeParm;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/annualholiday")
public class AnnualHolidayController extends RestBaseController{
	@RequestMapping(value = "/defineholiydaylist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDefineHolidayCodeList(SearchDefineHolidayCodeParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.defineHolidayCode.selectDefineHolidayCodeList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/annualholidaylist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectAnnualHolidayCodeList(SearchAnnualHolidayParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.annualHoliday.selectAnnualHoliday",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/annualholidaylist/duplicatecheck", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectAnnualHolidayCodeListDuplicate(SearchAnnualHolidayParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		Object result = invokeService("MOST.annualHoliday.selectAnnualHoliday",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/annualholidaylist", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertItems(@RequestBody UpdateBizParm<AnnualHolidayItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setInsertItems(super.getItems(parm));
		
		Object result = invokeService("MOST.annualHoliday.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	@RequestMapping(value = "/annualholidaylist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@PathVariable("id") String id, @RequestBody UpdateBizParm<AnnualHolidayItem> parm) throws ServiceException, Exception{
		UpdateItemsBizParm insertParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.annualHoliday.updateItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/annualholidaylist/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteInvoiceUnit(@PathVariable("id") String id, @RequestBody UpdateBizParm<AnnualHolidayItem> parm) throws ServiceException, Exception{
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		deleteParm.setDeleteItems(super.getItems(parm));
		
		invokeService("MOST.annualHoliday.deleteItems", deleteParm);
	}
}
