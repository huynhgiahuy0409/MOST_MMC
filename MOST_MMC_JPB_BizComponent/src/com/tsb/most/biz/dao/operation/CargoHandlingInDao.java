package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.parm.operation.SearchCargoHandlingInParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CargoHandlingInDao extends BaseDao implements ICargoHandlingInDao {

	public DataItemList selectCargoHandlingInList(SearchCargoHandlingInParm parm) throws DaoException {
        return unifiedDao.getItems("cargoHandlingIn.selectCargoHandlingInList", parm);
    }
	
	public DataItemList selectLocationList(SearchCargoHandlingInParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoHandlingIn.selectLocationList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public String selectGateInTimeSeq(SearchCargoHandlingInParm parm) throws DaoException {
        DataItemList list = unifiedDao.getItems("cargoHandlingIn.selectGateInTimeSeq", parm);
        return (String)list.getCollection().get(0);
    }
	
	public void insertCargoHandlingInItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoHandlingIn.insertCargoHandlingInItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public void updateCgHIAmtItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoHandlingIn.updateCgHIAmtItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public void insertHIJobItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoHandlingIn.insertHIJobItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void insertBalItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoHandlingIn.insertBalItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}	
    }
	
	public void insertRhdlItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoHandlingIn.insertRhdlItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void updateHIGPArrvDelvItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoHandlingIn.updateHIGPArrvDelvItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void updateCargoHandlingInItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoHandlingIn.updateCargoHandlingInItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void insertCargoInvLocationItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoHandlingIn.insertCargoInvLocationItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void updateCargoMasterStatus(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoHandlingIn.updateCargoMasterStatus", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void updateCargoMasterInfo(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoHandlingIn.updateCargoMasterInfo", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void insertHIArrvDelvItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoHandlingIn.insertHIArrvDelvItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void updateHIArrvDelvItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoHandlingIn.updateHIArrvDelvItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void insertHIGeneralGateIn(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoHandlingIn.insertHIGeneralGateIn", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void updateHIGateInTime(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoHandlingIn.updateHIGateInTime", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void updateHIGateInLorry(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoHandlingIn.updateHIGateInLorry", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void updateHIOnlyLorry(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoHandlingIn.updateHIOnlyLorry", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	//Package
	public void insertPackageJobItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoHandlingIn.insertPackageJobItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
}
