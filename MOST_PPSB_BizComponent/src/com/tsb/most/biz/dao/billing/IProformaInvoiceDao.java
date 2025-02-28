package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchProformaInvoiceParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IProformaInvoiceDao {
	public DataItemList selectProformaInvoice(SearchProformaInvoiceParm parm) throws DaoException ;    
	public DataItemList selectTrfInfoForProformaIv(SearchProformaInvoiceParm parm) throws DaoException;
	public String selectInvoiceNo(SearchProformaInvoiceParm parm) throws DaoException;
	public DataItemList selectTrfInfoForCreditAdditionalIv(SearchProformaInvoiceParm parm) throws DaoException;
	public DataItemList selectGatheringDataForProformaIv(SearchProformaInvoiceParm parm) throws DaoException;
	public boolean selectIsExistedPorthandlingInvoiced(SearchProformaInvoiceParm parm) throws DaoException;
	public DataItemList selectReceiptReport(SearchProformaInvoiceParm parm) throws DaoException;
	
	public int insertInvoiceItem(DataItem item) throws DaoException;
	public int insertInvoiceDataItem(DataItem item) throws DaoException;
	public int insertInvoiceDataDetailItem(DataItem item) throws DaoException;
	public void updateInvoiceItem(DataItem item) throws DaoException;
	public void updateInvoiceNoToProformaIvData(DataItem item) throws DaoException;
	public void updateBillWgtCargoMaster(DataItem item) throws DaoException;
	
	public void updateRefIvNo(DataItem item) throws DaoException;
	public void updateOriginalHandlingGoodsIvData(DataItem item) throws DaoException;
	DataItemList updateInvoiceDataStatus(UpdateItemsBizParm parm) throws DaoException;
	DataItemList updateInvoiceStatus(UpdateItemsBizParm parm) throws DaoException;
	public void updateInvoiceDataItem(DataItem item) throws DaoException;
	
	// MMC - Settlement
	public DataItemList updateSettleStorageAmt(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateApplyFreeDays(UpdateItemsBizParm parm) throws DaoException;
}
