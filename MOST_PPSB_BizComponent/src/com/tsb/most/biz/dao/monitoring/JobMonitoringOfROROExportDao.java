package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchJobMonitoringOfROROExportParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class JobMonitoringOfROROExportDao extends BaseDao implements IJobMonitoringOfROROExportDao {   

	public DataItemList selectShipgNoteNoComboBoxItems(SearchJobMonitoringOfROROExportParm parm) throws DaoException {
	  return unifiedDao.getItems("jobMonitoringOfROROExport.selectShipgNoteNoComboBoxItems", parm);
    }
	
	public DataItemList selectCargoItems(SearchJobMonitoringOfROROExportParm parm) throws DaoException {
        return unifiedDao.getItems("jobMonitoringOfROROExport.selectCargoItems", parm);
    }
	
	public DataItemList selectUnitItems(SearchJobMonitoringOfROROExportParm parm) throws DaoException{
		return unifiedDao.getItemsPage("jobMonitoringOfROROExport.selectUnitItems", parm);
	}
	
	public DataItemList selectUnitJobDetailItems(SearchJobMonitoringOfROROExportParm parm) throws DaoException {
    	return unifiedDao.getItemsPage("jobMonitoringOfROROExport.selectUnitJobDetailItems", parm);
    }
	
	public DataItemList selectValidationForDeletingGateInJob(SearchJobMonitoringOfROROExportParm parm) throws DaoException {
    	return unifiedDao.getItems("jobMonitoringOfROROExport.selectValidationForDeletingGateInJob", parm);
    }
	
	public DataItemList updateRoroJobMonitoringItem(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"jobMonitoringOfROROExport.updateJobMonitoringOfROROExportItem", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void deleteRoroJobMonitoringItem(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			unifiedDao.updateItem(null ,"jobMonitoringOfROROExport.deleteRoroJobMonitoringItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
}
