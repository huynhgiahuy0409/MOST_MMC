package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchDailyOperationsReportParm;
import com.tsb.most.biz.parm.monitoring.SearchDischargingParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import java.util.List;

public interface IDailyOperationsReportDao {
	
	public DataItemList selectDailyOperationsReport(SearchDailyOperationsReportParm parm) throws DaoException;
	public List selectVesselOperationsDelayReport(SearchDailyOperationsReportParm searchParm)throws DaoException;

}
