package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.parm.operation.SearchCargoMovementParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CargoMovementDao extends BaseDao implements ICargoMovementDao {

	public DataItemList selectCargoMovementList(SearchCargoMovementParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("cargoMovement.selectCargoMovementList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectMVWHComboList(SearchCargoMovementParm parm) throws DaoException{
    	try{
    		return unifiedDao.getItems("cargoMovement.selectMVWHComboList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectCargoMVLoc(SearchCargoMovementParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoMovement.selectCargoMVLoc", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public DataItemList selectImportPBZB10Inf(SearchCargoMovementParm parm) throws DaoException {
		try{
			return unifiedDao.getItems("cargoMovement.selectImportPBZB10Inf", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
		
	}
	
	public DataItemList selectExportPBZB10Inf(SearchCargoMovementParm parm) throws DaoException {
		try{
			return unifiedDao.getItems("cargoMovement.selectExportPBZB10Inf", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
		
	}
	
	public DataItemList selectInvLocList(SearchCargoMovementParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoMovement.selectInvLocList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public void insertCargoMovementJobItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoMovement.insertCargoMovementJobItems", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void insertMinusInvLocItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoMovement.insertMinusInvLocItems", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void insertInvLocItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoMovement.insertInvLocItems", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void updateWeightBridge(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoMovement.updateWeightBridge", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
}
