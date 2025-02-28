package com.tsb.most.biz.service.dashboard;

import com.tsb.most.biz.parm.dashboard.SearchBBTDashboardParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public interface IBBTDashboard {
	public DataItemList selectVesselCount(SearchBBTDashboardParm parm) throws BizException;
	public DataItemList selectWeatherForecast(SearchBBTDashboardParm parm) throws BizException;
	public DataItemList selectWorkShiftDefinition(SearchBBTDashboardParm parm) throws BizException;
    public DataItemList selectAccidentsCount(SearchBBTDashboardParm parm) throws BizException;
    public DataItemList selectTerminalOccupancy(SearchBBTDashboardParm parm) throws BizException;
    public DataItemList selectBulkSummary(SearchBBTDashboardParm parm) throws BizException;
    public DataItemList selectCargoOperation(SearchBBTDashboardParm parm) throws BizException;
    public DataItemList selectBulkHandlingBalanceCompare(SearchBBTDashboardParm parm) throws BizException;
    public DataItemList selectBreakDryBulkProductivity(SearchBBTDashboardParm parm) throws BizException;
    public DataItemList selectLiquidBulkProductivity(SearchBBTDashboardParm parm) throws BizException;
    public DataItemList selectLorriesTurnaround(SearchBBTDashboardParm parm) throws BizException;
    public DataItemList selectBulkDelay(SearchBBTDashboardParm parm) throws BizException;
    public DataItemList selectWhYdHandling(SearchBBTDashboardParm parm) throws BizException;
}