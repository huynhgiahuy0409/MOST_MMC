package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchJobMonitoringOfROROExportParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IJobMonitoringOfROROExportDao {
	public DataItemList selectShipgNoteNoComboBoxItems(SearchJobMonitoringOfROROExportParm parm) throws DaoException ;
	public DataItemList selectCargoItems(SearchJobMonitoringOfROROExportParm parm) throws DaoException;
	public DataItemList selectUnitItems(SearchJobMonitoringOfROROExportParm parm) throws DaoException;
	public DataItemList selectUnitJobDetailItems(SearchJobMonitoringOfROROExportParm parm) throws DaoException;
	public DataItemList selectValidationForDeletingGateInJob(SearchJobMonitoringOfROROExportParm parm) throws DaoException;
	
	public DataItemList updateRoroJobMonitoringItem(UpdateItemsBizParm parm) throws DaoException;
	public void deleteRoroJobMonitoringItem(DataItem item) throws DaoException;
}
