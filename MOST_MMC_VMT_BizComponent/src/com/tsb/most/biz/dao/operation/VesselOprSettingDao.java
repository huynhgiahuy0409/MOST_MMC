package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchVesselOprSettingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VesselOprSettingDao extends BaseDao implements IVesselOprSettingDao {

	public DataItemList selectVesselOprSettingList(SearchVesselOprSettingParm parm) throws DaoException {
		return unifiedDao.getItemsPage("vesselOprSetting.selectVesselOprSettingList", parm);
	}

	public DataItemList selectShift(SearchVesselOprSettingParm parm) throws DaoException {
		return unifiedDao.getItems("vesselOprSetting.selectShift", parm);
	}

	public DataItemList selectEquipmentList(SearchVesselOprSettingParm parm) throws DaoException {
		return unifiedDao.getItems("vesselOprSetting.selectEquipmentList", parm);
	}

	public DataItemList selectEquipment(SearchVesselOprSettingParm parm) throws DaoException {
		return unifiedDao.getItems("vesselOprSetting.selectEquipment", parm);
	}

	public DataItemList selectRole(SearchVesselOprSettingParm parm) throws DaoException {
		return unifiedDao.getItems("vesselOprSetting.selectRole", parm);
	}

	public DataItemList selectOverlappedWithFinitePeriodHHT(SearchVesselOprSettingParm parm) throws DaoException {
		return unifiedDao.getItems("vesselOprSetting.selectOverlappedWithFinitePeriodHHT", parm);
	}

	public DataItemList selectVORDryBreakBulkForStevAndTrim(SearchVesselOprSettingParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("vesselOprSetting.selectVORDryBreakBulkForStevAndTrim", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public DataItemList selectVORDryBreakBulk(SearchVesselOprSettingParm parm) throws DaoException {

		return unifiedDao.getItems("vesselOprSetting.selectVORDryBreakBulk", parm);
	}

	public DataItemList insertVesselOprSetting(InsertItemsBizParm items) throws DaoException {
		try {
			DataItemList itemList = items.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null, "vesselOprSetting.insertVesselOprSetting", itemList);

			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime", itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime1", itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime2", itemList);
			setVersion(itemList);
			return itemList;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public DataItemList updateVesselOprSetting(UpdateItemsBizParm items) throws DaoException {
		try {
			DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateVesselOprSetting", itemList);

			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime", itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime1", itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime2", itemList);
			setVersion(itemList);
			return itemList;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public void updateAtwAtc4Vsl(DataItemList items) throws DaoException {
		try {
			setNewVersion(items);
			unifiedDao.updateItems(null, "vesselOprSetting.updateAtwAtc4Vsl", items);
		} catch (Exception e) {
			throw new DaoException(e);
		}

	}

	public void deleteVesselOprSetting(DeleteItemsBizParm items) throws DaoException {
		try {
			DataItemList itemList = items.getDeleteItems();
			unifiedDao.deleteItems(null, "vesselOprSetting.deleteVesselOprSetting", itemList);

			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime", itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime1", itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateDblBankingActualTime2", itemList);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public DataItemList updateVORDryBreakBulkItemsForStevAndTrim(DataItemList itemList) throws DaoException {
		try {
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateVORDryBreakBulkItemsForStevAndTrim", itemList);
			setVersion(itemList);
			return itemList;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public void deleteVORDryBreakBulkItems(DataItemList items) throws DaoException {
		// TODO Auto-generated method stub
		unifiedDao.updateItems("vesselOprSetting.deleteVORDryBreakBulkItems", items);
		unifiedDao.updateItems("vesselOprSetting.updateDblBankingActualTime", items);
		unifiedDao.updateItems("vesselOprSetting.updateDblBankingActualTime1", items);
		unifiedDao.updateItems("vesselOprSetting.updateDblBankingActualTime2", items);
	}

	@Override
	public DataItemList updateVORDryBreakBulkItemsWithShipCrew(DataItemList items) throws DaoException {
		// TODO Auto-generated method stub
		try {
			setNewVersion(items);
			unifiedDao.updateItems("vesselOprSetting.updateVORDryBreakBulkItemsWithShipCrew", items);
			setVersion(items);
			return items;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	/* Penalty */
	@Override
	public DataItemList selectDelayPenaltyReportList(SearchVesselOprSettingParm parm) throws DaoException {
		return unifiedDao.getItems("vesselOprSetting.selectDelayPenaltyReport", parm);
	}

	@Override
	public DataItemList selectPenaltyDescrList(SearchVesselOprSettingParm parm) throws DaoException {
		return unifiedDao.getItems("vesselOprSetting.selectPenaltyDescr", parm);
	}

	@Override
	public DataItemList insertDelayPenaltyReportList(InsertItemsBizParm items) throws DaoException {
		try {
			DataItemList itemList = items.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.insertDelayPenaltyReportList", itemList);
			setVersion(itemList);
			return itemList;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	

	@Override
	public void deleteDelayPenaltyReportList(DeleteItemsBizParm items) throws DaoException {
		try {
			DataItemList itemList = items.getDeleteItems();
			unifiedDao.deleteItems(null, "vesselOprSetting.deleteDelayPenaltyReportList", itemList);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateDelayPenaltyReportList(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "vesselOprSetting.updateDelayPenaltyReportList", itemList);
			setVersion(itemList);
			return itemList;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
}
