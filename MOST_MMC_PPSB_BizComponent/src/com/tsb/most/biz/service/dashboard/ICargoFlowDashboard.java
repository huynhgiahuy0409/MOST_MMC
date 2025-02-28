package com.tsb.most.biz.service.dashboard;

import com.tsb.most.biz.parm.dashboard.SearchCargoFlowDashboardParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ICargoFlowDashboard {
	public DataItemList selectVesselSchedule(SearchCargoFlowDashboardParm parm) throws BizException;
	public DataItemList selectLoadingCommoditylist(SearchCargoFlowDashboardParm parm) throws BizException;
	public DataItemList selectDischargingCommoditylist(SearchCargoFlowDashboardParm parm) throws BizException;
	public DataItemList selectDisCargoFlowDashbard(SearchCargoFlowDashboardParm parm) throws BizException;
	public DataItemList selectLoadCargoFlowDashbard(SearchCargoFlowDashboardParm parm) throws BizException;
	
}
