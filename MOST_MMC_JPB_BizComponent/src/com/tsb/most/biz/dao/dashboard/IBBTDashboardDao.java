package com.tsb.most.biz.dao.dashboard;

import com.tsb.most.biz.parm.dashboard.SearchBBTDashboardParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IBBTDashboardDao {
    public DataItemList selectVesselCount(SearchBBTDashboardParm parm) throws DaoException;
    public DataItemList selectWorkShiftDefinition(SearchBBTDashboardParm parm) throws DaoException;
    public DataItemList selectAccidentsCount(SearchBBTDashboardParm parm) throws DaoException;
    public DataItemList selectTerminalOccupancy(SearchBBTDashboardParm parm) throws DaoException;
    public DataItemList selectBulkSummary(SearchBBTDashboardParm parm) throws DaoException;
    public DataItemList selectCargoOperation(SearchBBTDashboardParm parm) throws DaoException;
    public DataItemList selectBulkHandlingBalanceCompare(SearchBBTDashboardParm parm) throws DaoException;
    public DataItemList selectBreakDryBulkProductivity(SearchBBTDashboardParm parm) throws DaoException;
    public DataItemList selectLiquidBulkProductivity(SearchBBTDashboardParm parm) throws DaoException;
    public DataItemList selectLorriesTurnaround(SearchBBTDashboardParm parm) throws DaoException;
    public DataItemList selectBulkDelay(SearchBBTDashboardParm parm) throws DaoException;
    public DataItemList selectWhYdHandling(SearchBBTDashboardParm parm) throws DaoException;
    

}
