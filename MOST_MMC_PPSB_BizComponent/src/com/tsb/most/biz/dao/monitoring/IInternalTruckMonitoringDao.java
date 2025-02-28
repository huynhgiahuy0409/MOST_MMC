package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchInternalTruckMonitoringParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IInternalTruckMonitoringDao {
	public DataItemList selectInternalTruckMonitoringList(SearchInternalTruckMonitoringParm parm) throws DaoException;
}
