package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoLoadingParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchConfirmLoadingOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ConfirmLoadingOfRORODao extends BaseDao implements IConfirmLoadingOfRORODao{
    
    public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmLoadingOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmLoadingForRORO.selectShipgNoteNoComboBoxItems", parm);
    }
	
    public DataItemList selectCargoItems(SearchConfirmLoadingOfROROParm parm) throws DaoException {
    	return unifiedDao.getItemsPage("confirmLoadingForRORO.selectCargoItems", parm);
    }
    
	public DataItemList selectDirectUnitItems(SearchConfirmLoadingOfROROParm parm) throws DaoException{
        return unifiedDao.getItemsPage("confirmLoadingForRORO.selectDirectUnitItems", parm);
	}
	
    public DataItemList selectInDirectUnitItems(SearchConfirmLoadingOfROROParm parm) throws DaoException {
        return unifiedDao.getItemsPage("confirmLoadingForRORO.selectInDirectUnitItems", parm);
    }

    public DataItemList updateConfirmYardAndLoadingCheckForRoRo(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"confirmLoadingForRORO.updateConfirmYardAndLoadingCheckForRoRo", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectCargoItemsHHT(SearchConfirmLoadingOfROROParm parm) throws DaoException {
		return unifiedDao.getItemsPage("confirmLoadingForRORO.selectCargoItemsHHT", parm);
    }
    
    public DataItemList selectDirectUnitItemsHHT(SearchConfirmLoadingOfROROParm parm) throws DaoException{
        return unifiedDao.getItemsPage("confirmLoadingForRORO.selectDirectUnitItemsHHT", parm);
	}
	
    public DataItemList selectInDirectUnitItemsHHT(SearchConfirmLoadingOfROROParm parm) throws DaoException {
        return unifiedDao.getItemsPage("confirmLoadingForRORO.selectInDirectUnitItemsHHT", parm);
    }

	@Override
	public boolean selectIsROROMst(SearchCargoMasterParm parm) throws DaoException {
		try{
    		String rtnValue = (String)unifiedDao.readOne("confirmLoadingForRORO.selectIsROROMst", parm);
            
            if(rtnValue != null && rtnValue.equals("1")){
                return true;
            }else{
                return false;
            }
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public String selectGateInTimeSeq(SearchCargoLoadingParm parm) throws DaoException {
		DataItemList list = unifiedDao.getItems("confirmLoadingForRORO.selectGateInTimeSeq", parm);
	     return (String)list.getCollection().get(0);
	}

	@Override
	public void insertJobItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"confirmLoadingForRORO.insertJobItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void updateNextJobNoForWAJob(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"confirmLoadingForRORO.updateNextJobNoForWAJob", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
}
