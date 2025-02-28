package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchJobMonitoringOfROROImportParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class JobMonitoringOfROROImportDao extends BaseDao implements IJobMonitoringOfROROImportDao {   

	public DataItemList selectBlItems(SearchJobMonitoringOfROROImportParm parm) throws DaoException {
	    return unifiedDao.getItemsPage("jobMonitoringOfROROImport.selectBlItems", parm);
	}
	
	public DataItemList selectUnitItems(SearchJobMonitoringOfROROImportParm parm) throws DaoException {
		return unifiedDao.getItemsPage("jobMonitoringOfROROImport.selectUnitItems", parm);
    }
    
    public DataItemList selectUnitJobDetailItems(SearchJobMonitoringOfROROImportParm parm) throws DaoException {
    	return unifiedDao.getItemsPage("jobMonitoringOfROROImport.selectUnitJobDetailItems", parm);
    }
    
    public DataItemList getUnitQtyByGateTicketNo(SearchJobMonitoringOfROROImportParm parm) throws DaoException {
    	return unifiedDao.getItems("jobMonitoringOfROROImport.selectUnitQtyByGateTicketNo", parm);
    }
    
    public DataItemList getUnassignedJobItems(SearchJobMonitoringOfROROImportParm parm) throws DaoException {
    	return unifiedDao.getItems("jobMonitoringOfROROImport.getUnassignedJobItems", parm);
    }
    
    public void updateRoroJobMonitoringItem(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			unifiedDao.updateItem(null ,"jobMonitoringOfROROImport.updatejobMonitoringOfROROImportItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void deleteRoroJobMonitoringItem(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			unifiedDao.updateItem(null ,"jobMonitoringOfROROImport.deletejobMonitoringOfROROImportItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void updateRmcInvLocationItems(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			unifiedDao.updateItem(null ,"jobMonitoringOfROROImport.updateRmcInvLocationItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void updateRmcJobItems(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			unifiedDao.updateItem(null ,"jobMonitoringOfROROImport.updateRmcJobItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void updateRmcCargoMasterItems(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			unifiedDao.updateItem(null ,"jobMonitoringOfROROImport.updateRmcCargoMasterItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void updateJobMonitoringCgArrvDelv(DataItem item) throws DaoException{
    	try{
			setNewVersion(item);
			unifiedDao.updateItem(null ,"jobMonitoringOfROROImport.updateJobMonitoringCgArrvDelv", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void deleteJobMonitoringCgArrvDelv(DataItem item) throws DaoException{
    	try{
			setNewVersion(item);
			unifiedDao.updateItem(null, "jobMonitoringOfROROImport.deleteJobMonitoringCgArrvDelv", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void deleteRmcCargoMasterItems(DataItem item) throws DaoException{
    	try{
			setNewVersion(item);
			unifiedDao.updateItem(null, "jobMonitoringOfROROImport.deleteRmcCargoMasterItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void deleteRmcJobItems(DataItem item) throws DaoException{
    	try{
			setNewVersion(item);
			unifiedDao.updateItem(null, "jobMonitoringOfROROImport.deleteRmcJobItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void deleteRmcInvLocationItems(DataItem item) throws DaoException{
    	try{
			setNewVersion(item);
			unifiedDao.updateItem(null, "jobMonitoringOfROROImport.deleteRmcInvLocationItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
   
}
