package com.tsb.most.basebiz.dao.codes;

import com.tsb.most.basebiz.parm.codes.SearchDelayCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class DelayCodeDao extends BaseDao implements IDelayCodeDao{
    
	public DataItemList selectDelayCodeList(SearchDelayCodeParm parm) throws DaoException {
        try{
        	return unifiedDao.getItemsPage("delayCode.selectDelayCodeList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException{
		DataItemList insertItems = parm.getInsertItems();
		
		setNewVersion(insertItems);	
		unifiedDao.insertItems(null,"delayCode.insertDelayCodeItem", insertItems);
		setVersion(insertItems);			
		
		return insertItems;
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException{
		DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);
		
		unifiedDao.updateItemsWithTimeCheck(null,"delayCode.updateDelayCodeItem", updateItems);
		
		setVersion(updateItems);
		
		return updateItems;
	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException{
		DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItemsWithTimeCheck(null,"delayCode.deleteDelayCodeItem", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
	}
}
