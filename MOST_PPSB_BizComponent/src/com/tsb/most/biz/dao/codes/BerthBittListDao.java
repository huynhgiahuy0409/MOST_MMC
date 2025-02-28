package com.tsb.most.biz.dao.codes;

import com.tsb.most.biz.parm.codes.SearchBerthBittListParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class BerthBittListDao extends BaseDao implements IBerthBittListDao{
    
    public DataItemList selectBerthBittList(SearchBerthBittListParm parm) throws DaoException{
        return unifiedDao.getItems("BerthBittList.selectBerthBittList",parm);
    }
    
	public DataItemList insertBerthBittList(InsertItemsBizParm parm) throws DaoException{
		DataItemList insertItems = parm.getInsertItems();
		
		setNewVersion(insertItems);	
		unifiedDao.insertItems(null,"BerthBittList.insertBerthBittList", insertItems);
		setVersion(insertItems);			
		
		return insertItems;
	}

	public DataItemList updateBerthBittList(UpdateItemsBizParm parm) throws DaoException{
		DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);
		
		unifiedDao.updateItemsWithTimeCheck(null,"BerthBittList.updateBerthBittList", updateItems);
		
		setVersion(updateItems);
		
		return updateItems;
	}

	public DataItemList deleteBerthBittList(DeleteItemsBizParm parm) throws DaoException{
		DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItemsWithTimeCheck(null,"BerthBittList.deleteBerthBittList", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
		
	}
	
	public DataItemList selectBerthLocList(SearchBerthBittListParm parm) throws DaoException{
        return unifiedDao.getItems("BerthBittList.selectBerthLocList",parm);
    }
	
	public DataItemList selectDuplicateBerthBitt(SearchBerthBittListParm parm) throws DaoException{
        return unifiedDao.getItems("BerthBittList.selectDuplicateBerthBitt",parm);
    }
}
