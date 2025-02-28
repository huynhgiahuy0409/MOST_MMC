package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchConfirmHandlingOutOfROROParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ConfirmHandlingOutOfRORODao extends BaseDao implements IConfirmHandlingOutOfRORODao {
  
	public DataItemList selectBlComboItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORO.selectBlComboItems", parm);
    }
	
	public DataItemList selectDriverComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORO.selectDriverComboBoxItems", parm);
    }
	
	public DataItemList selectDriverWithoutTruckComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORO.selectDriverWithoutTruckComboBoxItems", parm);
    }
	
	public DataItemList selectTruckComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORO.selectTruckComboBoxItems", parm);
    }
	
	public DataItemList selectUnitComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORO.selectUnitComboBoxItems", parm);
    }
	
	public DataItemList selectCargoItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItemsPage("confirmHandlingOutOfRORO.selectCargoItems", parm);
    }
	
	public DataItemList selectDoItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORO.selectDoItems", parm);
    }
	
	public DataItemList selectHandlingOutUnitItems(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORO.selectHandlingOutUnitItems", parm);
    }
	
	public DataItemList updateConfirmHandlingOutOfRoRo(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"confirmHandlingOutOfRORO.updateConfirmHandlingOutOfRoRo", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList deleteConfirmHandlingOutOfRoRo(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"confirmHandlingOutOfRORO.deleteConfirmHandlingOutOfRoRo", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	
	public DataItemList selectDoItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORO.selectDoItemsHHT", parm);
    }
	
	public DataItemList selectHandlingOutUnitItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORO.selectHandlingOutUnitItemsHHT", parm);
    }
	
	public DataItemList updateGateTransactionsHHT(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"confirmHandlingOutOfRORO.updateGateTransactionsHHT", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateHandlingOutUnitItemsHHT(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"confirmHandlingOutOfRORO.updateHandlingOutUnitItemsHHT", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList deleteHandlingOutUnitItemsHHT(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"confirmHandlingOutOfRORO.deleteHandlingOutUnitItemsHHT", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

	public void insertGateTransactions(DataItemList itemList) throws DaoException {
		try{
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"confirmHandlingOutOfRORO.insertGateTransactions", itemList);
			setVersion(itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectDriverWithoutTruckComboBoxItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORO.selectDriverWithoutTruckComboBoxItemsHHT", parm);
    }
	
	public DataItemList selectTruckComboBoxItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORO.selectTruckComboBoxItemsHHT", parm);
    }
	
	public DataItemList selectDriverComboBoxItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmHandlingOutOfRORO.selectDriverComboBoxItemsHHT", parm);
    }

	@Override
	public String selectJobGroupNo(SearchCargoMasterParm parm) throws DaoException {
		try{
        	return (String)unifiedDao.readOne("cargoMaster.selectJobGroupNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public boolean selectIsCargoMstHOStDt(SearchCargoMasterParm parm) throws DaoException {
		try{
    		String rtnValue = (String)unifiedDao.readOne("cargoMaster.selectIsCargoMstHOStDt", parm);
           
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
	public boolean selectIsCargoAvDvChk(SearchCargoMasterParm parm) throws DaoException {
		try{
        	String rtnValue = (String)unifiedDao.readOne("cargoMaster.selectIsCargoAvDvChk", parm);
        	
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
	public boolean selectIsROROMst(SearchCargoMasterParm parm) throws DaoException {
		try{
    		String rtnValue = (String)unifiedDao.readOne("confirmHandlingOutOfRORO.selectIsROROMst", parm);
            
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
	public DataItemList insertCargoHOJobItems(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null, "confirmHandlingOutOfRORO.insertCargoHOJobItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}


	@Override
	public DataItemList insertCargoHOArrvDelvItems(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null, "confirmHandlingOutOfRORO.insertCargoHOArrvDelvItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectGatepassNo(SearchCargoArrvDelvParm parm) throws DaoException {
		try{
    		return unifiedDao.getItems("cargoArrvDelv.selectGatepassNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateCargoHOArrvDelvItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "confirmHandlingOutOfRORO.updateCargoHOArrvDelvItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
}
