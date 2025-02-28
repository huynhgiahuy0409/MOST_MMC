package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchDimensionCheckParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class TheListOfDimensionCheckDao extends BaseDao implements ITheListOfDimensionCheckDao {
	
	public DataItemList selectGCDimensionCheckItems(SearchDimensionCheckParm parm) throws DaoException {
		return unifiedDao.getItemsPage("theListOfDimensionCheck.selectGCDimensionCheckItems", parm);
	}

	public DataItemList selectGCDimensionDtlDmgItems(SearchDimensionCheckParm parm) throws DaoException {	
		return unifiedDao.getItemsPage("theListOfDimensionCheck.selectGCDimensionDtlDmgItems", parm);
	}

	public DataItemList deleteGCDimensionItem(DeleteItemsBizParm items) throws DaoException {		
		try{
    		DataItemList itemList = items.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "theListOfDimensionCheck.deleteGCDimensionItem", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

}
