package com.tsb.most.biz.service.monitoring;


import com.tsb.most.biz.dao.monitoring.IInternalTruckMonitoringDao;
import com.tsb.most.biz.parm.monitoring.SearchInternalTruckMonitoringParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class InternalTruckMonitoring extends MOSTBaseService implements IInternalTruckMonitoring {
	private IInternalTruckMonitoringDao internalTruckMonitoringDao;

	public void setInternalTruckMonitoringDao(IInternalTruckMonitoringDao internalTruckMonitoringDao) {
		this.internalTruckMonitoringDao = internalTruckMonitoringDao;
	}

	///////////////////////////////////////////////
	public DataItemList selectInternalTruckMonitoringList(SearchInternalTruckMonitoringParm parm) throws BizException {
        return internalTruckMonitoringDao.selectInternalTruckMonitoringList(parm);
    }
}