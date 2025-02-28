package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.operation.SearchCargoJobParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CargoJobDao extends BaseDao implements ICargoJobDao {
	
	public DataItemList selectCargoJobWhLocCombo(SearchCargoJobParm parm) throws DaoException {
        return unifiedDao.getItems("cargoJob.selectCargoJobWhLocCombo", parm);
    }
	 
	public DataItemList selectCargoJobSnCombo(SearchCargoJobParm parm) throws DaoException {
        return unifiedDao.getItems("cargoJob.selectCargoJobSnCombo", parm);
    }
	
	public DataItemList selectCargoJobBLCombo(SearchCargoJobParm parm) throws DaoException {
        return unifiedDao.getItems("cargoJob.selectCargoJobBLCombo", parm);
    }
	
	public DataItemList selectCargoJob(SearchCargoJobParm parm) throws DaoException {
        return unifiedDao.getItems("cargoJob.selectCargoJob", parm);
    }
	
	public String selectCargoJobRhdlNos(SearchCargoJobParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return null;
	}
	
	public DataItemList selectCargoJobDelete(SearchCargoJobParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoJob.selectCargoJobDelete", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectCargoJobNoRhdle(SearchCargoJobParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoJob.selectCargoJobNoRhdle", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateRhdlJobAmt(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoJob.updateRhdlJobAmt", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateCgBalJobAmt(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoJob.updateCgBalJobAmt", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateJobAmt(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoJob.updateJobAmt", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateJobGroup(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoJob.updateJobGroup", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateArrvDelvJobAmt(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoJob.updateArrvDelvJobAmt", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateInvLocJobAmt(DataItemList items) throws DaoException{
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoJob.updateInvLocJobAmt", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateCgMstItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoJob.updateCgMstItems", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateCgMstStatus(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoJob.updateCgMstStatus", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void deleteCargoJobItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.deleteItems(null,"cargoJob.deleteCargoJobItems", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void deleteConsolDeconsolVAJobForImport(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.deleteItems(null,"cargoJob.deleteConsolDeconsolVAJobForImport", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void deleteConsolDeconsolWAJobForExport(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.deleteItems(null,"cargoJob.deleteConsolDeconsolWAJobForExport", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void deleteConsolDeconsolWAJobForExportInv(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.deleteItems(null,"cargoJob.deleteConsolDeconsolWAJobForExportInv", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateFinalDisItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoJob.updateFinalDisItems", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateGateInItems(UpdateItemsBizParm items) throws DaoException{
		try{
			DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "cargoJob.updateGateInItems", itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateGateOutItems(UpdateItemsBizParm items) throws DaoException{
		try{
			DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "cargoJob.updateGateOutItems", itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectCargoJobForRORO(SearchCargoJobParm parm) throws DaoException {
		return unifiedDao.getItems("cargoJob.selectCargoJobForRORO", parm);
	}

	@Override
	public void updateROROMstItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"cargoJob.updateROROMstItems", items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void deleteROROItems(DeleteItemsBizParm items) throws DaoException {
		try{
    		DataItemList deleteItems = items.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.deleteItems(null, "cargoJob.deleteROROItems", deleteItems);
			setVersion(deleteItems);
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
	}

	@Override
	public void updateStatusForROROItems(DataItemList items) throws DaoException {
		try {
			setNewVersion(items);
			unifiedDao.updateItems(null, "cargoJob.updateStatusForROROItems", items);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
}
