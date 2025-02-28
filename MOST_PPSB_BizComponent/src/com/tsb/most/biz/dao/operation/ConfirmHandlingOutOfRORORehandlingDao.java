package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchConfirmHandlingOutOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ConfirmHandlingOutOfRORORehandlingDao extends BaseDao implements IConfirmHandlingOutOfRORORehandlingDao {
  
	public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORORehandling.selectShipgNoteNoComboBoxItems", parm);
    }
	
	public DataItemList selectDriverComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORORehandling.selectDriverComboBoxItems", parm);
    }
	
	public DataItemList selectDriverWithoutTruckComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORORehandling.selectDriverWithoutTruckComboBoxItems", parm);
    }
	
	public DataItemList selectTruckComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORORehandling.selectTruckComboBoxItems", parm);
    }
	
	public DataItemList selectCargoItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItemsPage("confirmHandlingOutOfRORORehandling.selectCargoItems", parm);
    }
	
	public DataItemList selectUnitItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORORehandling.selectUnitItems", parm);
    }
	
	public DataItemList updateHandlingOutUnitItems(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"confirmHandlingOutOfRORORehandling.updateHandlingOutUnitItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList deleteHandlingOutUnitItems(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"confirmHandlingOutOfRORORehandling.deleteHandlingOutUnitItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
}
