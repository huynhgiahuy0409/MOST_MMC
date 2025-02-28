package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.InvoiceDataItem;
import com.tsb.most.biz.dataitem.billing.InvoiceItem;
import com.tsb.most.biz.parm.billing.SearchInvoiceParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IInvoiceDao {
	public String selectGatherNo(SearchInvoiceParm item) throws DaoException;
	public String selectInvoiceNo(SearchInvoiceParm parm) throws DaoException;
	
	//Invoice List
	public DataItemList selectInvoiceItemList(SearchInvoiceParm parm) throws DaoException;
	public boolean selectInvoiceItemStatCd(SearchInvoiceParm item) throws DaoException;
	
	public void updateXmsInvoiceStatus(UpdateItemsBizParm parm) throws DaoException;
	public void deleteInvoiceItems(DeleteItemsBizParm parm) throws DaoException;
	public void updateNullInvoiceNoInInvoiceDataItem(UpdateItemsBizParm parm) throws DaoException;
	
	//Invoice Detail
	public DataItemList selectInvoiceDetailItem(SearchInvoiceParm parm) throws DaoException;
	
	public DataItemList getInvoicePayerInfos(SearchInvoiceParm parm) throws DaoException;
	
    public DataItemList searchInvoiceItems(SearchInvoiceParm parm) throws DaoException;
    public DataItemList searchInvoiceItemsWithDetail(SearchInvoiceParm parm) throws DaoException;
    public DataItemList searchInvoiceItemsWithDetailForWhRental(SearchInvoiceParm parm) throws DaoException;
    public DataItemList searchInvoiceItemsWithDetailForNonCallId(SearchInvoiceParm parm) throws DaoException;
    public DataItemList searchInvoiceItemsForNonCallId(SearchInvoiceParm parm) throws DaoException;
    public DataItemList searchInvoiceItemsForWhRental(SearchInvoiceParm parm) throws DaoException;
    
    public void insertInvoiceDataItem(TxTraceInfo txTraceInfo, InvoiceDataItem item) throws DaoException;
    public void insertInvoiceDataItemDirectInvoice(TxTraceInfo txTraceInfo, InvoiceDataItem item) throws DaoException;
    public void insertInvoiceItem(TxTraceInfo txTraceInfo, InvoiceItem invoiceItem) throws DaoException;
    public boolean isInvoiceDataItemExist(InvoiceDataItem item) throws DaoException;
    public String generateInvoiceNoSeq(SearchInvoiceParm item) throws DaoException;
    public DataItemList searchInvoiceDataItems(SearchInvoiceParm parm) throws DaoException;
    public DataItemList searchInvoiceDataItemsForWhRental(SearchInvoiceParm parm) throws DaoException;
    public DataItemList searchInvoiceDataItemsForExternal(SearchInvoiceParm parm) throws DaoException;
    public DataItemList searchInvoiceDataItemsForExternalForNonCallId(SearchInvoiceParm parm) throws DaoException;
    public DataItemList searchInvoiceDataItemsForExternalForWhRental(SearchInvoiceParm parm) throws DaoException;
    public void updateInvoiceDataItem(TxTraceInfo txTraceinfo, InvoiceDataItem item) throws DaoException;
    public void updateSsrStatus(TxTraceInfo txTraceInfo, InvoiceItem invoiceItem) throws DaoException;
    
    public void deleteAdhocItemsNonTimeCheck(TxTraceInfo txTraceinfo, InvoiceDataItem item) throws DaoException;
    public void deleteInvoiceDataItems(DeleteItemsBizParm parm) throws DaoException;
    
    public DataItemList getInvoiceNosByPayer(SearchInvoiceParm parm) throws DaoException;
    public DataItemList getInvoiceNosByPayerWhRental(SearchInvoiceParm parm) throws DaoException;
    public DataItemList getTariffCodeSRate(SearchInvoiceParm parm) throws DaoException;
    public String getPackageTariffName(SearchInvoiceParm parm) throws DaoException;
    
    public DataItemList getInvoicePrefixInfos(SearchInvoiceParm parm) throws DaoException;
    public int updateViewUser(TxTraceInfo txTraceinfo, SearchInvoiceParm parm) throws DaoException;
    public void updatePrintUser(TxTraceInfo txTraceinfo, InvoiceItem item) throws DaoException;
    
    public DataItemList selectViewUser(TxTraceInfo txTraceInfo, SearchInvoiceParm parm) throws DaoException;
    public DataItemList searchInvoiceItems4AlertList(SearchInvoiceParm parm) throws DaoException;
    public DataItemList searchInvoiceItems4AlertListNonJPVC(SearchInvoiceParm parm) throws DaoException;
    public DataItemList searchinvoiceList4RentalContactByAgent(SearchInvoiceParm parm) throws DaoException;
    public void updateInvoiceErpStatCd(InvoiceItem items,TxTraceInfo txtrace) throws DaoException;
   
    public DataItemList getCalcAmout(SearchInvoiceParm parm) throws DaoException; //added by Vin - 20191029 - Invoice Detail Screen, total section
    
    public DataItemList getInvoiceDataAuditItem(SearchInvoiceParm parm) throws DaoException;
    public DataItemList getInvoicePayerInfos2(SearchInvoiceParm parm) throws DaoException;
    public DataItemList getInvoicePayerDetailInfos2(SearchInvoiceParm parm) throws DaoException;
    public void transferInvoiceItems(UpdateItemsBizParm parm) throws DaoException;
}