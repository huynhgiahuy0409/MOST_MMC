package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchDailyOperationsReportParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import java.util.List;

public class DailyOperationsReportDao extends BaseDao implements IDailyOperationsReportDao {
	
	public DataItemList selectDailyOperationsReport(SearchDailyOperationsReportParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("dailyOperationsReport.selectDailyOperationsReport", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public List selectVesselOperationsDelayReport(SearchDailyOperationsReportParm searchParm) throws DaoException {
		try{
			return unifiedDao.readItems("dailyOperationsReport.selectVesselOperationsDelayReport", searchParm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
}
