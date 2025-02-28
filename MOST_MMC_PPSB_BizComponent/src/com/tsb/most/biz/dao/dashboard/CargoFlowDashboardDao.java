package com.tsb.most.biz.dao.dashboard;

import com.tsb.most.biz.parm.dashboard.SearchCargoFlowDashboardParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public class CargoFlowDashboardDao extends BaseDao implements ICargoFlowDashboardDao {

	public DataItemList selectVesselSchedule(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectVesselSchedule",parm);
	}

	@Override
	public DataItemList selectDischargingCommoditylist(SearchCargoFlowDashboardParm parm) throws DaoException {
		return unifiedDao.getItems("cargoFlowDashboard.selectDischargingCommoditylist",parm);
	}

	@Override
	public DataItemList selectDischargingCommodityTotalAmt(SearchCargoFlowDashboardParm parm) throws DaoException {
		return unifiedDao.getItems("cargoFlowDashboard.selectDischargingCommodityTotalAmt",parm);
	}

	@Override
	public DataItemList selectDischargingCommodityAmt(SearchCargoFlowDashboardParm parm) throws DaoException {
		return unifiedDao.getItems("cargoFlowDashboard.selectDischargingCommodityAmt",parm);
	}

	@Override
	public DataItemList selectDischargingCommodityPtnr(SearchCargoFlowDashboardParm parm) throws DaoException {
		return unifiedDao.getItems("cargoFlowDashboard.selectDischargingCommodityPtnr",parm);
	}

	@Override
	public DataItemList selectLoadingCommoditylist(SearchCargoFlowDashboardParm parm) throws DaoException {
		return unifiedDao.getItems("cargoFlowDashboard.selectLoadingCommoditylist",parm);
	}

	@Override
	public DataItemList selectLoadingCommodityTotalAmt(SearchCargoFlowDashboardParm parm) throws DaoException {
		return unifiedDao.getItems("cargoFlowDashboard.selectLoadingCommodityTotalAmt",parm);
	}

	@Override
	public DataItemList selectLoadingCommodityAmt(SearchCargoFlowDashboardParm parm) throws DaoException {
		return unifiedDao.getItems("cargoFlowDashboard.selectLoadingCommodityAmt",parm);
	}

	@Override
	public DataItemList selectLoadingCommodityPtnr(SearchCargoFlowDashboardParm parm) throws DaoException {
		return unifiedDao.getItems("cargoFlowDashboard.selectLoadingCommodityPtnr",parm);
	}
	
	public DataItemList selectVesselTotalAmt(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectVesselTotalAmt",parm);
	}
	
	public DataItemList selectVesselHandledAmt(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectVesselHandledAmt",parm);
	}
	
	public DataItemList selectYardTotalAmt(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectYardTotalAmt",parm);
	}
	
	public DataItemList selectYardHandledAmt(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectYardHandledAmt",parm);
	}
	
	////Discharging///////////////////////////////////////
	public DataItemList selectDischargedSummaryByCmdt(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectDischargedSummaryByCmdt",parm);
	}
	
	public DataItemList selectDischargedSummaryByVsl(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectDischargedSummaryByVsl",parm);
	}
	
	public DataItemList selectVesselDischargedAmt(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectVesselDischargedAmt",parm);
	}
	
	public DataItemList selectVesselDischargedAmtByVsl(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectVesselDischargedAmtByVsl",parm);
	}
	
	public DataItemList selectWarehouseDischargedAmt(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectWarehouseDischargedAmt",parm);
	}
	
	public DataItemList selectGateDischargedAmt(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectGateDischargedAmt",parm);
	}
	
	////Loading///////////////////////////////////////
	public DataItemList selectLoadedSummaryByCmdt(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectLoadedSummaryByCmdt",parm);
	}
	
	public DataItemList selectLoadedSummaryByVsl(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectLoadedSummaryByVsl",parm);
	}
	
	public DataItemList selectVesselLoadingAmt(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectVesselLoadingAmt",parm);
	}
	
	public DataItemList selectVesselLoadingAmtByVsl(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectVesselLoadingAmtByVsl",parm);
	}
	
	public DataItemList selectWarehouseLoadingAmt(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectWarehouseLoadingAmt",parm);
	}
	
	public DataItemList selectGateLoadingAmt(SearchCargoFlowDashboardParm parm) throws DaoException{
		return unifiedDao.getItems("cargoFlowDashboard.selectGateLoadingAmt",parm);
	}
}
