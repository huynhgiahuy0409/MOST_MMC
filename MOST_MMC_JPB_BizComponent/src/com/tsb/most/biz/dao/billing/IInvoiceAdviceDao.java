package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchInvoiceAdviceParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IInvoiceAdviceDao {
    public DataItemList selectInvoiceAdvice(SearchInvoiceAdviceParm parm) throws DaoException;
    public DataItemList selectInvoiceAdviceDetail(SearchInvoiceAdviceParm parm) throws DaoException;
    public String selectIvAdviceNo(SearchInvoiceAdviceParm parm) throws DaoException;
    public String selectIvAdviceSeq(SearchInvoiceAdviceParm parm) throws DaoException;
    
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
    //Invoice Advice Screen
    public DataItemList updateAckItems(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteAckItems(DeleteItemsBizParm parm) throws DaoException;
    public DataItemList searchInvoiceAdviceDataItemsForReport(SearchInvoiceAdviceParm searchParm);
    public DataItemList searchInvoiceAdviceItemsForReport(SearchInvoiceAdviceParm searchParm);
    //Invoice Advice Screen	
	
}
