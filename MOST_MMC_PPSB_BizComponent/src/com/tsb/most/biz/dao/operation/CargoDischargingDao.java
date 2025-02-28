package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.parm.operation.SearchCargoDischargingParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CargoDischargingDao extends BaseDao implements ICargoDischargingDao {

	public DataItemList selectCargoDischargingList(SearchCargoDischargingParm parm) throws DaoException {
        return unifiedDao.getItems("cargoDischarging.selectCargoDischargingList", parm);
    }
	
	public DataItemList selectCargoDischargingOfBarge(SearchCargoDischargingParm parm) throws DaoException {
        return unifiedDao.getItems("cargoDischarging.selectCargoDischargingOfBarge", parm);
    }
	
	public void insertCargoDischargingItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoDischarging.insertCargoDischargingItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public void updateCargoDischargingItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoDischarging.updateCargoDischargingItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public void updateDischaringAmts(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoDischarging.updateDischaringAmts", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public void insertJobItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoDischarging.insertJobItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public void updateCargoMasterStatus(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoDischarging.updateCargoMasterStatus", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public void updateCargoMasterInfo(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoDischarging.updateCargoMasterInfo", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public void insertDelvItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoDischarging.insertDelvItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public void updateDelvItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoDischarging.updateDelvItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void insertBalItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoDischarging.insertBalItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void insertCargoInvLocationItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoDischarging.insertCargoInvLocationItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public void updateDischaringFinals(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoDischarging.updateDischaringFinals", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public void updateNextPurpCd(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoDischarging.updateNextPurpCd", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	//Package
	public void insertPackageJobItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoDischarging.insertPackageJobItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
}
