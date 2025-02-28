package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchConfirmDischargingOfROROParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ConfirmDischargingOfRORODao extends BaseDao implements IConfirmDischargingOfRORODao {
  
	public DataItemList selectBlComboItems(SearchConfirmDischargingOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("confirmDischargingOfRORO.selectBlComboItems", parm);
    }
	
	public DataItemList selectCargoItems(SearchConfirmDischargingOfROROParm parm) throws DaoException {
        return unifiedDao.getItemsPage("confirmDischargingOfRORO.selectCargoItems", parm);
    }
	
	public DataItemList selectUnitItems(SearchConfirmDischargingOfROROParm parm) throws DaoException {
        return unifiedDao.getItemsPage("confirmDischargingOfRORO.selectUnitItems", parm);
    }
	
	public DataItemList updateConfirmDischargingOfRoRo(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"confirmDischargingOfRORO.updateConfirmDischargingOfRoRo", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList insertUnitCorrectionOfRoRo(InsertItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null,"confirmDischargingOfRORO.insertUnitCorrectionOfRoRo", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectApronCheckerImportList(SearchConfirmDischargingOfROROParm parm) throws DaoException {
		return unifiedDao.getItemsPage("confirmDischargingOfRORO.selectApronCheckerImportList", parm);
    }
	
	public DataItemList selectUnitItemsHHT(SearchConfirmDischargingOfROROParm parm) throws DaoException {
		try{
			return unifiedDao.getItemsPage("confirmDischargingOfRORO.selectUnitItemsHHT", parm);
		}catch(Exception e){
			System.out.println("EEE: " + e);
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateConfirmDischargingOfRoRoHHT(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"confirmDischargingOfRORO.updateConfirmDischargingOfRoRo", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList insertUnitCorrectionOfRoRoHHT(InsertItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null,"confirmDischargingOfRORO.insertUnitCorrectionOfRoRo", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

	@Override
	public void insertJobItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"confirmDischargingOfRORO.insertJobItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItem selectGatepassNo(SearchCargoArrvDelvParm parm) throws DaoException {
		try{
    		return unifiedDao.getItems("confirmDischargingOfRORO.selectGatepassNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void updateDelvItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"confirmDischargingOfRORO.updateDelvItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}


	@Override
	public boolean selectIsROROMst(SearchCargoMasterParm parm) throws DaoException {
		try{
    		String rtnValue = (String)unifiedDao.readOne("confirmDischargingOfRORO.selectIsROROMst", parm);
            
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
	public void updateNextPurpCd(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"confirmDischargingOfRORO.updateNextPurpCd", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void insertCargoInvLocationItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"confirmDischargingOfRORO.insertCargoInvLocationItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void insertConfirmDischargingOfRoRo(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"confirmDischargingOfRORO.insertConfirmDischargingOfRoRo", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
}
