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
import com.tsb.most.biz.dataitem.billing.ProofSheetItem;
import com.tsb.most.biz.dataitem.document.ShippingNoteItem;
import com.tsb.most.biz.parm.billing.SearchDataGatheringParm;
import com.tsb.most.biz.parm.billing.SearchProofSheetParm;
import com.tsb.most.biz.parm.billing.SearchTariffCodeParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/proofsheet")
public class ProofSheetController extends RestBaseController{
	@RequestMapping(value = "/tariff/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTariffCode(SearchTariffCodeParm parm)  throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.invoiceTemplate.selectTariffCode",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/gathered/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectProofSheetList(SearchProofSheetParm parm)  throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.proofSheet.selectProofSheetList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/gathered/checkforeignexchangerate", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectForeignExchangeRate(SearchProofSheetParm parm)  throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.foreignExchangeRate.selectCurrencyList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/gathered/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public void insertDataProofSheet(@RequestBody UpdateBizParm<ProofSheetItem> parm) throws ServiceException, Exception{
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		insertParm.setInsertItems(super.getItems(parm));
		invokeService("MOST.proofSheet.updateGatheredData", insertParm);
	}
	
	@RequestMapping(value = "/combo/costcenter", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCostCenterCombo(SearchProofSheetParm parm)  throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.proofSheet.selectCostCenterCombo",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/combo/prefix", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectComboBoxIvPrefix(SearchProofSheetParm parm)  throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.proofSheet.selectComboBoxIvPrefix",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/gathered/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updateDataProofSheet(@PathVariable("id") String id, @RequestBody UpdateBizParm<ProofSheetItem> parm) throws ServiceException, Exception {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		updateParm.setUpdateItems(super.getItems(parm));
		invokeService("MOST.proofSheet.updateGatheredData",updateParm);
	}
	
	@RequestMapping(value = "/gathered/exchange", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectExchangeData(SearchDataGatheringParm parm)  throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.proofSheet.selectExchangeData",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
	@RequestMapping(value = "/gathered/partnerRates", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectPartnerRates(SearchProofSheetParm parm)  throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.proofSheet.selectPartnerRates",parm);
		
		res.setData(((DataItemList)result).getCollection());
		
		return res;
	}
	
}
