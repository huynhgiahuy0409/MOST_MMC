package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchJobMonitoringOfRORORehandlingParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IJobMonitoringOfRORORehandlingDao {
	public DataItemList selectShipgNoteNoComboBoxItems(SearchJobMonitoringOfRORORehandlingParm parm) throws DaoException;
	public DataItemList selectCargoItems(SearchJobMonitoringOfRORORehandlingParm parm) throws DaoException ;
	public DataItemList selectUnitItems(SearchJobMonitoringOfRORORehandlingParm parm) throws DaoException;
	public DataItemList selectUnitJobDetailItems(SearchJobMonitoringOfRORORehandlingParm parm) throws DaoException;
	
	public DataItemList updateRoroJobMonitoringItem(UpdateItemsBizParm parm) throws DaoException;
	public void deleteRoroJobMonitoringItem(DataItem item) throws DaoException;
}
