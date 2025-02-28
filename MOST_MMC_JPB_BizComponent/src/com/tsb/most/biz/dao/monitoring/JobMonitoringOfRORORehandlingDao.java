package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchJobMonitoringOfRORORehandlingParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class JobMonitoringOfRORORehandlingDao extends BaseDao implements IJobMonitoringOfRORORehandlingDao {   

	public DataItemList selectShipgNoteNoComboBoxItems(SearchJobMonitoringOfRORORehandlingParm parm) throws DaoException {
        return unifiedDao.getItems("jobMonitoringOfRORORehandling.selectShipgNoteNoComboBoxItems", parm);
	}
	
	public DataItemList selectCargoItems(SearchJobMonitoringOfRORORehandlingParm parm) throws DaoException {
		return unifiedDao.getItemsPage("jobMonitoringOfRORORehandling.selectCargoItems", parm);
    }
	
	public DataItemList selectUnitItems(SearchJobMonitoringOfRORORehandlingParm parm) throws DaoException{
		return unifiedDao.getItemsPage("jobMonitoringOfRORORehandling.selectUnitItems", parm);
	}
	
	public DataItemList selectUnitJobDetailItems(SearchJobMonitoringOfRORORehandlingParm parm) throws DaoException {
    	return unifiedDao.getItemsPage("jobMonitoringOfRORORehandling.selectUnitJobDetailItems", parm);
    }
	
	public DataItemList updateRoroJobMonitoringItem(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"jobMonitoringOfRORORehandling.updateJobMonitoringOfRORORehandlingItem", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void deleteRoroJobMonitoringItem(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			unifiedDao.updateItem(null ,"jobMonitoringOfRORORehandling.deleteJobMonitoringOfRORORehandlingItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
}
