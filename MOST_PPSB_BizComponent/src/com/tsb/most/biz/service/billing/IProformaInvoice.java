package com.tsb.most.biz.service.billing;

import java.text.ParseException;

import com.tsb.most.biz.parm.billing.SearchProformaInvoiceParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IProformaInvoice {
	public DataItemList selectProformaInvoice(SearchProformaInvoiceParm parm) throws BizException;

	public DataItemList selectTrfInfoForProformaIv(SearchProformaInvoiceParm parm) throws BizException;

	public DataItemList processSettlementProformaIv(UpdateItemsBizParm parm) throws BizException, ParseException;

	public DataItemList updateCalculationProformaIv(UpdateItemsBizParm parm) throws BizException;

	public DataItemList updateCUDProformaIv(InsertItemsBizParm parm) throws BizException;

	public DataItemList processCUDCreditAdditionalIv(InsertItemsBizParm parm) throws BizException;

	// MMC - Settlement
	public DataItemList updateInvoiceStatus(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updateApplyFreeDays(UpdateItemsBizParm parm) throws BizException;
}
