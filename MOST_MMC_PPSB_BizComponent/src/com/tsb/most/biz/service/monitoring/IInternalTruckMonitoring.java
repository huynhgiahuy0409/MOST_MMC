package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchInternalTruckMonitoringParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IInternalTruckMonitoring {
	public DataItemList selectInternalTruckMonitoringList(SearchInternalTruckMonitoringParm parm) throws BizException;
}
