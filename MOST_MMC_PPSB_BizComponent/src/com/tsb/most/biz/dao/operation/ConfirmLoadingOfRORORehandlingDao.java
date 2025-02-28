package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchConfirmLoadingOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ConfirmLoadingOfRORORehandlingDao extends BaseDao implements IConfirmLoadingOfRORORehandlingDao{
    
    public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmLoadingOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmLoadingOfRORORehandling.selectShipgNoteNoComboBoxItems", parm);
    }
	
    public DataItemList selectCargoItems(SearchConfirmLoadingOfROROParm parm) throws DaoException {
    	return unifiedDao.getItemsPage("confirmLoadingOfRORORehandling.selectCargoItems", parm);
    }
    
	public DataItemList selectUnitItems(SearchConfirmLoadingOfROROParm parm) throws DaoException{
        return unifiedDao.getItems("confirmLoadingOfRORORehandling.selectUnitItems", parm);
	}

    public DataItemList updateLoadingOfRORORehandlingItems(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"confirmLoadingOfRORORehandling.updateLoadingOfRORORehandlingItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
}
