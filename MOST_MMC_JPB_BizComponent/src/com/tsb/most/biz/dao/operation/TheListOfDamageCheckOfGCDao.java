package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchDamageCheckParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class TheListOfDamageCheckOfGCDao extends BaseDao implements ITheListOfDamageCheckOfGCDao {
	
	public DataItemList selectGCDamageCheckItems(SearchDamageCheckParm parm) throws DaoException {
		return unifiedDao.getItemsPage("theListOfDamageCheckOfGC.selectGCDamageCheckItems", parm);
    }

	public DataItemList deleteGCDmgItem(DeleteItemsBizParm items) throws DaoException{
    	try{
    		DataItemList itemList = items.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "theListOfDamageCheckOfGC.deleteGCDmgItem", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }


}
