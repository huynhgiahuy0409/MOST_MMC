package com.tsb.most.biz.rest.billing;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dataitem.billing.InvoiceDataItem;
import com.tsb.most.biz.dataitem.billing.SSRListItem;
import com.tsb.most.biz.parm.billing.SearchCostCenterParm;
import com.tsb.most.biz.parm.billing.SearchSSRListParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/ssrlist")
public class SSRListController extends RestBaseController {

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSSRList(SearchSSRListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.ssrList.selectSSRList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/ssrValidation", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectInvoicedSSR(SearchSSRListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.ssrList.selectInvoicedSSR", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/costCenter", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCostCenter(SearchCostCenterParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.ssrList.selectCostCenter", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}
	
	@RequestMapping(value = "/vessel", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselInfo(SearchSSRListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.ssrList.selectVesselInfo", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/ssrPayer", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSsrPayer(SearchSSRListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.ssrList.selectSsrPayer", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}

	@RequestMapping(value = "/detaillist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectSSRDetailList(SearchSSRListParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.ssrList.selectSSRDetailList", parm);

		res.setData(((DataItemList) result).getCollection());
		res.setLimit(((DataItemList) result).getTotalRowCount());

		return res;
	}
	
	@RequestMapping(value = "/detaillist/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateItems(@RequestBody SSRListItem item) throws ServiceException, Exception{
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		item.setCrud(DAOProcessType.UPDATE);
		ArrayList<SSRListItem> arrItem = item.getArrSSRDetail();
		
		if (arrItem != null) {
			if (arrItem.size() > 0) {
				for (int i = 0; i < arrItem.size(); i++) {
					if (arrItem.get(i).getWorkingStatus().equals(DAOProcessType.INSERT)) {
						arrItem.get(i).setCrud(DAOProcessType.INSERT);
					} else if (arrItem.get(i).getWorkingStatus().equals(DAOProcessType.DELETE)) {
						arrItem.get(i).setCrud(DAOProcessType.DELETE);
					} else {
						arrItem.get(i).setCrud(DAOProcessType.UPDATE);
					}
				}
			}
		}
		
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.ssrList.updateDetailItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;  
    }
	
	@RequestMapping(value = "/invoice", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ResponseBody
	public RestResponse insertInvoice(@RequestBody InvoiceDataItem item) throws ServiceException, Exception {
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);
		
		Object result = invokeService("MOST.ssrList.insertInvoiceItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;	
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse insertSSRList(@RequestBody SSRListItem item) throws ServiceException, Exception {
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		RestResponse res = new RestResponse();
		
		insertItems.add(item);
		insertParm.setInsertItems(insertItems);
		
		Object result = invokeService("MOST.ssrList.insertItems",insertParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;	
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateSSRList(@RequestBody SSRListItem item) throws ServiceException, Exception {
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		RestResponse res = new RestResponse();
		
		updateItems.add(item);
		updateParm.setUpdateItems(updateItems);
		
		Object result = invokeService("MOST.ssrList.updateItems",updateParm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;  
	}

	@RequestMapping(value = "/list/{id}", method = RequestMethod.DELETE)
	@ResponseBody
    public void deleteInvoiceUnit(@RequestBody SSRListItem item) throws ServiceException, Exception{
    	DataItemList deleteItems = new DataItemList();
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
		
		deleteItems.add(item);
		deleteParm.setDeleteItems(deleteItems);
		
		invokeService("MOST.ssrList.deleteInvoiceUnit",deleteParm);
    }

	public void GenerateIvDataItem(InvoiceDataItem ivDetailItem, SSRListItem item) {
		ivDetailItem.setVslCallId(item.getVslCallId());
		ivDetailItem.setTrfCd(item.getTrfCd());
		ivDetailItem.setTrfDescr(item.getTrfDescr());
		ivDetailItem.setPayer(item.getPayerCd());
		ivDetailItem.setPtnrCd(item.getPayerCd());
		ivDetailItem.setSubTrfCd(item.getSubTrfCd());
		ivDetailItem.setUnit1Val(item.getUnitQty1()); 
		ivDetailItem.setUnit2Val(item.getUnitQty2());
		ivDetailItem.setUnit3Val(item.getUnitQty3());
		ivDetailItem.setAplyRate(item.getAplyUnitPrc());
		ivDetailItem.setAplyAmt(item.getTotalAmount());
		ivDetailItem.setStdRate(item.getStdRate());
		ivDetailItem.setRefNo2(item.getSsrNo());
		ivDetailItem.setRefNo3(item.getSeq());
		ivDetailItem.setGatherNo(item.getGatherNo());
		ivDetailItem.setCostCentCd(item.getCostCenter());
		ivDetailItem.setPayTpCd(item.getPayerTpCd());
		ivDetailItem.setGstAmount(item.getGstAmount());
		
		double totalAmtIv = Double.parseDouble(item.getGstAmount()) + Double.parseDouble(item.getTotalAmount());
		String ttAmtString = String.valueOf(totalAmtIv);

		ivDetailItem.setGstAmt("");
		ivDetailItem.setTotalAmount(ttAmtString);
		ivDetailItem.setTotalAmt("");
		ivDetailItem.setPayableAmount(item.getPayableAmount());
		ivDetailItem.setGstTpCd(item.getGstTpCd());
		ivDetailItem.setGstValue(item.getGstValue());
		int GSTper = (int) (Double.parseDouble(item.getGstValue()) * 100);
		ivDetailItem.setGstPercent(String.valueOf(GSTper));
		ivDetailItem.setGatherDt(item.getIssueDt());
		ivDetailItem.setcType(item.getcType());
		ivDetailItem.setScrId("SSR");
		ivDetailItem.setUserId(item.getUserId());
		ivDetailItem.setIvPrfx(item.getIvPrfx());
		ivDetailItem.setIsPrfx("true");
		ivDetailItem.setRevsUnit1Val("");
		ivDetailItem.setRevsUnit2Val("");
		ivDetailItem.setRevsUnit3Val("");
		ivDetailItem.setRevsRate("");
		ivDetailItem.setRevsAmt("");
		String stt = item.getSubStatus();

		if (item.getSubStatus().equalsIgnoreCase(CodeConstant.MT_IVSTAT_VF) || item.getcType() == CodeConstant.MT_IVSTAT_IV) {
			ivDetailItem.setAdhocYn(CommonConstants.N);
		} else {
			ivDetailItem.setAdhocYn(CommonConstants.Y);
		}
	}
}
