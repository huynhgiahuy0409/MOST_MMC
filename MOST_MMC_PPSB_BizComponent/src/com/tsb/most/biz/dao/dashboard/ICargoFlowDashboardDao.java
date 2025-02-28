package com.tsb.most.biz.dao.dashboard;

import com.tsb.most.biz.parm.dashboard.SearchCargoFlowDashboardParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICargoFlowDashboardDao {
	public DataItemList selectVesselSchedule(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectDischargingCommoditylist(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectDischargingCommodityTotalAmt(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectDischargingCommodityAmt(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectDischargingCommodityPtnr(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectLoadingCommoditylist(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectLoadingCommodityTotalAmt(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectLoadingCommodityAmt(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectLoadingCommodityPtnr(SearchCargoFlowDashboardParm parm) throws DaoException;
	
	//vessel 
	public DataItemList selectVesselTotalAmt(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectVesselHandledAmt(SearchCargoFlowDashboardParm parm) throws DaoException;
	
	//Yard 
	public DataItemList selectYardTotalAmt(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectYardHandledAmt(SearchCargoFlowDashboardParm parm) throws DaoException;
	
	//Discharged
	public DataItemList selectDischargedSummaryByCmdt(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectDischargedSummaryByVsl(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectVesselDischargedAmt(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectVesselDischargedAmtByVsl(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectWarehouseDischargedAmt(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectGateDischargedAmt(SearchCargoFlowDashboardParm parm) throws DaoException;

	//Loaded
	public DataItemList selectLoadedSummaryByCmdt(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectLoadedSummaryByVsl(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectVesselLoadingAmt(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectVesselLoadingAmtByVsl(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectWarehouseLoadingAmt(SearchCargoFlowDashboardParm parm) throws DaoException;
	public DataItemList selectGateLoadingAmt(SearchCargoFlowDashboardParm parm) throws DaoException;
}
