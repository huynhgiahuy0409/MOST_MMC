package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchSSRListParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ISSRListDao {

    public DataItemList selectSSRList(SearchSSRListParm parm) throws DaoException;
    public DataItemList selectSSRDetail(SearchSSRListParm parm) throws DaoException;
    public DataItemList selectInvoicedSSR(SearchSSRListParm parm) throws DaoException;
    public DataItemList selectSSRSummary(SearchSSRListParm parm) throws DaoException;
    public DataItemList selectVesselInfo(SearchSSRListParm parm) throws DaoException;
    public DataItemList selectSsrPayer(SearchSSRListParm parm) throws DaoException;
    public String selectSsrNo(SearchSSRListParm parm) throws DaoException;
    public DataItemList selectSSRDtlNo(SearchSSRListParm parm) throws DaoException;
    public DataItemList selectSSRAfterSaving(SearchSSRListParm parm) throws DaoException;
    
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
	
	public DataItemList insertDetailItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateDetailItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteDetailItems(DeleteItemsBizParm parm) throws DaoException;
	
	public DataItemList deleteInvoiceDataItem(DeleteItemsBizParm item) throws DaoException;
}
