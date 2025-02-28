package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.dao.monitoring.IBerthMonitoringDao;
import com.tsb.most.biz.parm.planning.SearchBerthPlanParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class BerthMonitoring extends MOSTBaseService implements IBerthMonitoring{
	private IBerthMonitoringDao berthMonitoringDao;
	
	public void setBerthMonitoringDao(IBerthMonitoringDao berthMonitoringDao) {
		this.berthMonitoringDao = berthMonitoringDao;
	}
	
    @Override
	public DataItemList selectBerthStructure(SearchBerthPlanParm parm) throws BizException{
        return berthMonitoringDao.getBerthInfoList(parm);
	}
    
    @Override
	public DataItemList selectBerthPlanList(SearchBerthPlanParm parm) throws BizException{
		return berthMonitoringDao.getBerthPlanList(parm);
	}

}
