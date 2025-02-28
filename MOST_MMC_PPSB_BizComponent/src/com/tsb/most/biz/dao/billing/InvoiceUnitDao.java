package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchInvoiceUnitParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class InvoiceUnitDao extends BaseDao implements IInvoiceUnitDao {

    public DataItemList selectInvoiceUnit(SearchInvoiceUnitParm param) throws DaoException {
        return unifiedDao.getItemsPage("invoiceUnit.selectInvoiceUnit",param);
    }
    
    public DataItemList isItemInUsed(SearchInvoiceUnitParm parm) throws DaoException {
    	DataItemList listItem = unifiedDao.getItems("invoiceUnit.isUnitInUsed",parm);
    	
    	return listItem;
    }

    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);	
		
		unifiedDao.insertItems(null,"invoiceUnit.insertInvoiceUnit", insertItems);
		
		setVersion(insertItems);			
		
		return insertItems;
    	
    }

    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
    	DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);	
		
		unifiedDao.updateItems(null,"invoiceUnit.updateInvoiceUnit", updateItems);
		
		setVersion(updateItems);			
		
		return updateItems;
    }

    public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
    	DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItems(null,"invoiceUnit.deleteInvoiceUnit", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
    }
    
}
