package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchJobMonitoringOfROROImportParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IJobMonitoringOfROROImportDao {
	public DataItemList selectBlItems(SearchJobMonitoringOfROROImportParm parm) throws DaoException;
	public DataItemList selectUnitItems(SearchJobMonitoringOfROROImportParm parm) throws DaoException;
	public DataItemList selectUnitJobDetailItems(SearchJobMonitoringOfROROImportParm parm) throws DaoException;
	public DataItemList getUnitQtyByGateTicketNo(SearchJobMonitoringOfROROImportParm parm) throws DaoException;
	public DataItemList getUnassignedJobItems(SearchJobMonitoringOfROROImportParm parm) throws DaoException;
	
	public void updateRoroJobMonitoringItem(DataItem item) throws DaoException;
	public void updateRmcInvLocationItems(DataItem item) throws DaoException;
	public void updateRmcJobItems(DataItem item) throws DaoException;
	public void updateRmcCargoMasterItems(DataItem item) throws DaoException;
	public void updateJobMonitoringCgArrvDelv(DataItem item) throws DaoException;
	public void deleteRoroJobMonitoringItem(DataItem item) throws DaoException;
	public void deleteJobMonitoringCgArrvDelv(DataItem item) throws DaoException;
	public void deleteRmcCargoMasterItems(DataItem item) throws DaoException;
	public void deleteRmcJobItems(DataItem item) throws DaoException;
	public void deleteRmcInvLocationItems(DataItem item) throws DaoException;
}
