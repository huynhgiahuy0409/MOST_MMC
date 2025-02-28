package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchFreeStorageDaysParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class FreeStorageDaysDao extends BaseDao implements IFreeStorageDaysDao {
   
    public DataItemList selectFreeStorage(SearchFreeStorageDaysParm parm) throws DaoException {
        return unifiedDao.getItemsPage("freeStorageDays.selectFreeStorage", parm);
    }

    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);	
		
		unifiedDao.insertItems(null,"freeStorageDays.insertItems", insertItems);
		
		setVersion(insertItems);			
		
		return insertItems;
    }

    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
    	DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);	
		
		unifiedDao.updateItems(null,"freeStorageDays.updateItems", updateItems);
		
		setVersion(updateItems);			
		
		return updateItems;
    }

    public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
    	DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItems(null,"freeStorageDays.deleteItems", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
    }

}