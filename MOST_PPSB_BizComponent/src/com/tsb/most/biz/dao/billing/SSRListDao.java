package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchSSRListParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class SSRListDao extends BaseDao implements ISSRListDao {
    
    public DataItemList selectSSRList(SearchSSRListParm parm) throws DaoException {
        return unifiedDao.getItemsPage("ssrList.selectSSRList", parm);
    }
    
    public DataItemList selectSSRDetail(SearchSSRListParm parm) throws DaoException {
        return unifiedDao.getItems("ssrList.selectSSRDetail", parm);
    }
    
    public DataItemList selectInvoicedSSR(SearchSSRListParm parm) throws DaoException {
        return unifiedDao.getItems("ssrList.selectInvoicedSSR", parm);
    }
    
    public DataItemList selectSSRSummary(SearchSSRListParm parm) throws DaoException {
        return unifiedDao.getItems("ssrList.selectSSRSummary", parm);
    }
    
    public DataItemList selectVesselInfo(SearchSSRListParm parm) throws DaoException {
        return unifiedDao.getItems("ssrList.selectVesselInfo", parm);
    }
    
    public DataItemList selectSsrPayer(SearchSSRListParm parm) throws DaoException {
        return unifiedDao.getItems("ssrList.selectSsrPayer", parm);
    }
    
    public String selectSsrNo(SearchSSRListParm parm) throws DaoException {
        return (String)unifiedDao.readOne("ssrList.selectSsrNo", parm);
    }
    
    public DataItemList selectSSRDtlNo(SearchSSRListParm parm) throws DaoException {
        return unifiedDao.getItems("ssrList.selectSSRDtlNo", parm);
    }
    
    public DataItemList selectSSRAfterSaving(SearchSSRListParm parm) throws DaoException {
        return unifiedDao.getItems("ssrList.selectSSRAfterSaving", parm);
    }
    
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);	
			
			unifiedDao.insertItems(null,"ssrList.insertItems", insertItems);
			
			setVersion(insertItems);			
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"ssrList.updateItems", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.deleteItems(null,"ssrList.deleteItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	//Detail
	public DataItemList insertDetailItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);	
			
			unifiedDao.insertItems(null,"ssrList.insertDetailItems", insertItems);
			
			setVersion(insertItems);			
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
    public DataItemList updateDetailItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"ssrList.updateDetailItems", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
    public DataItemList deleteDetailItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.deleteItems(null,"ssrList.deleteDetailItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
    public DataItemList deleteInvoiceDataItem(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.deleteItems(null,"ssrList.deleteInvoiceDataItem", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
}
