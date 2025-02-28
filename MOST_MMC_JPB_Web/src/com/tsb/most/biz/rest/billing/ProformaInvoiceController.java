package com.tsb.most.biz.rest.billing;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.biz.dataitem.billing.DataGatheringItem;
import com.tsb.most.biz.dataitem.billing.ProformaInvoiceItem;
import com.tsb.most.biz.parm.billing.SearchProformaInvoiceParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/proformainvoice")
public class ProformaInvoiceController extends RestBaseController {
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectProformaInvoice(SearchProformaInvoiceParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.proformaInvoice.selectProformaInvoice", parm);
		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse processCUDCreditAdditionalIv(@RequestBody UpdateBizParm<ProformaInvoiceItem> parm)
			throws ServiceException, Exception {

		RestResponse res = new RestResponse();
		InsertItemsBizParm items = new InsertItemsBizParm();
		items.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.proformaInvoice.processCUDCreditAdditionalIv", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}

	@RequestMapping(value = "/createproforma", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTrfInfoForProformaIv(SearchProformaInvoiceParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.proformaInvoice.selectTrfInfoForProformaIv", parm);
		res.setData(((DataItemList) result).getCollection());

		return res;
	}

	@RequestMapping(value = "/createproforma", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse updateCUDProformaIv(@RequestBody UpdateBizParm<ProformaInvoiceItem> parm)
			throws ServiceException, Exception {

		RestResponse res = new RestResponse();
		InsertItemsBizParm items = new InsertItemsBizParm();
		items.setInsertItems(super.getItems(parm));
		Object result = invokeService("MOST.proformaInvoice.updateCUDProformaIv", items);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}

	@RequestMapping(value = "/gathering/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateCalculationProformaIv(@RequestBody UpdateBizParm<DataGatheringItem> parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();

		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.proformaInvoice.updateCalculationProformaIv", updateParm);

		res.setData(((DataItemList) result).getCollection());
		return res;
	}

	@RequestMapping(value = "/settlement/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse processSettlementProformaIv(@RequestBody UpdateBizParm<DataGatheringItem> parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();

		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.proformaInvoice.processSettlementProformaIv", updateParm);

		res.setData(((DataItemList) result).getCollection());
		return res;
	}

	// MMC - Settlement
	@RequestMapping(value = "/cargocombo", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoComboForProformaIv(SearchProformaInvoiceParm parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		Object result = invokeService("MOST.proformaInvoice.selectCargoComboForProformaIv", parm);
		res.setData(((DataItemList) result).getCollection());

		return res;
	}
	
	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateProformaInvoice(@RequestBody UpdateBizParm<ProformaInvoiceItem> parm)
			throws ServiceException, Exception {
		
		RestResponse res = new RestResponse();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		Object result = invokeService("MOST.proformaInvoice.updateInvoiceStatus", updateParm);
		res.setData(((DataItemList) result).getCollection());
		return res;
	}
	
	@RequestMapping(value = "/applyfreedays/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateApplyFreeDays(@PathVariable("id") String id, @RequestBody UpdateBizParm<ProformaInvoiceItem> parm) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		
		Object result = invokeService("MOST.proformaInvoice.updateApplyFreeDays", updateParm);
	}
}
