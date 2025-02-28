package com.tsb.most.biz.service.operation;

import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dao.codes.CodeMasterDao;
import com.tsb.most.basebiz.dao.combobox.IComboboxServiceDao;
import com.tsb.most.basebiz.dataitem.configuration.ServiceOrderSettingItem;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.operation.IVesselOprSettingDao;
import com.tsb.most.biz.dataitem.operation.VesselOprSettingItem;
import com.tsb.most.biz.parm.operation.SearchVesselOprSettingParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.response.RestResponse;

public class VesselOprSetting extends MOSTBaseService implements IVesselOprSetting {
	private IVesselOprSettingDao vesselOprSettingDao;
	

	public void setVesselOprSettingDao(IVesselOprSettingDao vesselOprSettingDao) {
		this.vesselOprSettingDao = vesselOprSettingDao;
	}
	///////////////////////////////////////////////

	@Override
	public DataItemList selectVesselOprSettingList(SearchVesselOprSettingParm parm) throws BizException {
		return vesselOprSettingDao.selectVesselOprSettingList(parm);
	}

	@Override
	public DataItemList selectVesselOprSettingCommonCd(SearchVesselOprSettingParm parm) throws BizException {
		VesselOprSettingItem returnItem = new VesselOprSettingItem();

		SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
		partyCode.setLcd(CodeConstant.LCD_MOST);
		partyCode.setMcd(CodeConstant.MCD_MT_EQFCTPCD);
		partyCode.setScdLgv(CodeConstant.MT_EQFCDIVCD_FC);

		if ("equipment".equalsIgnoreCase(parm.getSearchType())) {
			returnItem.setEquipmentCombo(vesselOprSettingDao.selectEquipmentList(parm).getCollection());

		} else if ("HHTrole1".equalsIgnoreCase(parm.getSearchType())) {
			parm.setRsDivCd("S");
			returnItem.setRoleDivSCombo(vesselOprSettingDao.selectRole(parm).getCollection());

		} else if ("HHTrole2".equalsIgnoreCase(parm.getSearchType())) {
			parm.setRsDivCd("S");
			returnItem.setRoleDivSCombo(vesselOprSettingDao.selectRole(parm).getCollection());

		} else if ("HHTshift".equalsIgnoreCase(parm.getSearchType())) {
			returnItem.setShiftCombo(vesselOprSettingDao.selectShift(parm).getCollection());

		}
		// else if ("HHTfacility".equalsIgnoreCase(parm.getSearchType())) {
		// returnItem.setFacilityCombo(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

		// }
		else {
			// Shift
			// returnItem.setShiftCombo(vesselOprSettingDao.selectShift(parm).getCollection());

			// Equipment
			parm.setEqTpCd("EQ");
			returnItem.setEquipmentCombo(vesselOprSettingDao.selectEquipmentList(parm).getCollection());

			// Role 1
			// parm.setRsDivCd("S");
			// returnItem.setRoleDivSCombo(vesselOprSettingDao.selectRole(parm).getCollection());

			// Facility
			parm.setEqTpCd("FC");
			returnItem.setFacilityCombo(vesselOprSettingDao.selectEquipment(parm).getCollection());

			// Role 2
			// parm.setRsDivCd("T");
			// returnItem.setRoleDivTCombo(vesselOprSettingDao.selectRole(parm).getCollection());
		}

		DataItemList returnItems = new DataItemList();
		returnItems.add(returnItem);

		return returnItems;
	}

	@Override
	public DataItemList selectOverlappedWithFinitePeriod(SearchVesselOprSettingParm parm) throws BizException {
		return null;
		// vesselOprSettingDao.selectOverlappedWithFinitePeriod(parm);
	}

	@Override
	public DataItemList insertVesselOprSetting(InsertItemsBizParm parm) throws BizException {
		DataItemList res = vesselOprSettingDao.insertVesselOprSetting(parm);
		updateAtwAtc4Vsl(parm.getInsertItems());
		return res;
	}

	@Override
	public DataItemList updateVesselOprSetting(UpdateItemsBizParm parm) throws BizException {
		DataItemList res = vesselOprSettingDao.updateVesselOprSetting(parm);
		updateAtwAtc4Vsl(parm.getUpdateItems());
		return res;
	}

	@Override
	public void deleteVesselOprSetting(DeleteItemsBizParm parm) throws BizException {
		vesselOprSettingDao.deleteVesselOprSetting(parm);
		updateAtwAtc4Vsl(parm.getDeleteItems());
	}

	public void updateAtwAtc4Vsl(DataItemList items) throws BizException {
		vesselOprSettingDao.updateAtwAtc4Vsl(items);
	}

	/* Stevedore and Trimming */
	@Override
	public DataItemList selectVORDryBreakBulk(SearchVesselOprSettingParm parm) throws BizException {
		if ("info".equalsIgnoreCase(parm.getSearchType())) {
			return vesselOprSettingDao.selectVORDryBreakBulk(parm);
		} else if ("infoSheet".equalsIgnoreCase(parm.getSearchType())) {
			return vesselOprSettingDao.selectVORDryBreakBulkForStevAndTrim(parm);
		} else {
			return vesselOprSettingDao.selectVORDryBreakBulkForStevAndTrim(parm);
		}
	}

	@Override
	public void processVORDryBreakBulkForStevAndTrimCUD(UpdateItemsBizParm parm) throws BizException {

		VesselOprSettingItem returnItem = (VesselOprSettingItem) parm.getDataItem();
		DataItemList items = new DataItemList();
		items.add(returnItem);

		DataItemList updateItems = new DataItemList();
		DataItemList deleteItems = new DataItemList();
		DataItemList headItems = new DataItemList();

		// lv.dat declare a temp list for update the all 0 qty
		DataItemList tempItems = new DataItemList();

		for (int i = 0; i < items.size(); i++) {
			VesselOprSettingItem item = (VesselOprSettingItem) items.get(i);
			VesselOprSettingItem insItem = (VesselOprSettingItem) item.clone();
			VesselOprSettingItem updateItem = (VesselOprSettingItem) item.clone();

			if ("BBK".equalsIgnoreCase(item.getCgTpCd()) || "DBK".equalsIgnoreCase(item.getCgTpCd())) {
				updateItem.setRsDivCd("EQ");
				updateItem.setCwDiv(item.getCwDiv());
				headItems.add(updateItem);
			}

			if ("BBK".equalsIgnoreCase(item.getCgTpCd())) {
				if (item.getSpr() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
					// Delete it
					insItem.setRoleCd("MS");
					deleteItems.add((VesselOprSettingItem) insItem.clone());
				} else {
					// Update it
					insItem.setRoleCd("MS");
					insItem.setWkerQty(item.getSpr());
					updateItems.add((VesselOprSettingItem) insItem.clone());
				}
				if (item.getWinch() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
					// Delete it
					insItem.setRoleCd("WM");
					deleteItems.add((VesselOprSettingItem) insItem.clone());
				} else {
					// Update it
					insItem.setRoleCd("WM");
					insItem.setWkerQty(item.getWinch());
					updateItems.add((VesselOprSettingItem) insItem.clone());
				}
				if (item.getGeneral() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
					// Delete it
					insItem.setRoleCd("GW");
					deleteItems.add((VesselOprSettingItem) insItem.clone());
				} else {
					// Update it
					insItem.setRoleCd("GW");
					insItem.setWkerQty(item.getGeneral());
					updateItems.add((VesselOprSettingItem) insItem.clone());
				}
				if (item.getSupervisor() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
					// Delete it
					insItem.setRoleCd("AS");
					deleteItems.add((VesselOprSettingItem) insItem.clone());
				} else {
					// Update it
					insItem.setRoleCd("AS");
					insItem.setWkerQty(item.getSupervisor());
					updateItems.add((VesselOprSettingItem) insItem.clone());
				}
				if (item.getNonworker() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
					// Delete it
					insItem.setRoleCd("TW");
					deleteItems.add((VesselOprSettingItem) insItem.clone());
				} else {
					// Update it
					insItem.setRoleCd("TW");
					insItem.setWkerQty(item.getNonworker());
					updateItems.add((VesselOprSettingItem) insItem.clone());
				}

				// add item for all 0 qty
				if (item.getSpr() == 0 && item.getWinch() == 0 && item.getGeneral() == 0 && item.getSupervisor() == 0
						&& item.getNonworker() == 0 && "N".equalsIgnoreCase(item.getCwDiv())) {
					insItem.setRoleCd("MS");
					insItem.setWkerQty(0);
					tempItems.add((VesselOprSettingItem) insItem.clone());
				}

			} else if ("DBK".equalsIgnoreCase(item.getCgTpCd())) {
				if (item.getSpr() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
					// Delete it
					insItem.setRoleCd("MS");
					deleteItems.add((VesselOprSettingItem) insItem.clone());
				} else {
					// Update it
					insItem.setRoleCd("MS");
					insItem.setWkerQty(item.getSpr());
					updateItems.add((VesselOprSettingItem) insItem.clone());
				}
				if (item.getSignal() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
					// Delete it
					insItem.setRoleCd("SM");
					deleteItems.add((VesselOprSettingItem) insItem.clone());
				} else {
					// Update it
					insItem.setRoleCd("SM");
					insItem.setWkerQty(item.getSignal());
					updateItems.add((VesselOprSettingItem) insItem.clone());
				}
				if (item.getDeck() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
					// Delete it
					insItem.setRoleCd("DM");
					deleteItems.add((VesselOprSettingItem) insItem.clone());
				} else {
					// Update it
					insItem.setRoleCd("DM");
					insItem.setWkerQty(item.getDeck());
					updateItems.add((VesselOprSettingItem) insItem.clone());
				}
				if (item.getHoper() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
					// Delete it
					insItem.setRoleCd("HM");
					deleteItems.add((VesselOprSettingItem) insItem.clone());
				} else {
					// Update it
					insItem.setRoleCd("HM");
					insItem.setWkerQty(item.getHoper());
					updateItems.add((VesselOprSettingItem) insItem.clone());
				}
				if (item.getGeneral() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
					// Delete it
					insItem.setRoleCd("GW");
					deleteItems.add((VesselOprSettingItem) insItem.clone());
				} else {
					// Update it
					insItem.setRoleCd("GW");
					insItem.setWkerQty(item.getGeneral());
					updateItems.add((VesselOprSettingItem) insItem.clone());
				}
				if (item.getSupervisor() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
					// Delete it
					insItem.setRoleCd("AS");
					deleteItems.add((VesselOprSettingItem) insItem.clone());
				} else {
					// Update it
					insItem.setRoleCd("AS");
					insItem.setWkerQty(item.getSupervisor());
					updateItems.add((VesselOprSettingItem) insItem.clone());
				}
				if (item.getNonworker() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
					// Delete it
					insItem.setRoleCd("TW");
					deleteItems.add((VesselOprSettingItem) insItem.clone());
				} else {
					// Update it
					insItem.setRoleCd("TW");
					insItem.setWkerQty(item.getNonworker());
					updateItems.add((VesselOprSettingItem) insItem.clone());
				}

				// add item for all 0 qty
				if (item.getSpr() == 0 && item.getSignal() == 0 && item.getDeck() == 0 && item.getHoper() == 0
						&& item.getGeneral() == 0 && item.getSupervisor() == 0 && item.getNonworker() == 0
						&& "N".equalsIgnoreCase(item.getCwDiv())) {
					insItem.setRoleCd("MS");
					insItem.setWkerQty(0);
					tempItems.add((VesselOprSettingItem) insItem.clone());
				}
			}
		}

		if (updateItems.size() > 0) {
			this.vesselOprSettingDao.updateVORDryBreakBulkItemsForStevAndTrim(updateItems);
		}

		if (deleteItems.size() > 0) {
			this.vesselOprSettingDao.deleteVORDryBreakBulkItems(deleteItems);
		}

		if (tempItems.size() > 0) {
			this.vesselOprSettingDao.updateVORDryBreakBulkItemsForStevAndTrim(tempItems);
		}

		if (headItems.size() > 0) {
			this.vesselOprSettingDao.updateVORDryBreakBulkItemsWithShipCrew(headItems);
		}

	}
	
	@Override
	public IDataItem selectDelayPenaltyReportList(SearchVesselOprSettingParm parm) throws BizException {
		VesselOprSettingItem returnItem = new VesselOprSettingItem();
		if (parm.getSearchType() == null) {
			parm.setSearchType("reportList");
		}
		if (parm.getSearchType().equals("reportList")) {
			DataItemList delayPenaltyList = this.vesselOprSettingDao.selectDelayPenaltyReportList(parm);
			return delayPenaltyList;
		} else if (parm.getSearchType().equals("penaltyDescr")) {
			DataItemList penaltyDescrList = this.vesselOprSettingDao.selectPenaltyDescrList(parm);
			return penaltyDescrList;
		}

		return returnItem;
	}
	@Override
	public DataItemList insertDelayPenaltyReportList(InsertItemsBizParm parm) throws BizException {
        return this.vesselOprSettingDao.insertDelayPenaltyReportList(parm);
    }
	
	@Override
	public void deleteDelayPenaltyReportList(DeleteItemsBizParm parm) throws BizException {
        this.vesselOprSettingDao.deleteDelayPenaltyReportList(parm);
    }

	@Override
	public DataItemList updateDelayPenaltyReportList(UpdateItemsBizParm parm) throws BizException {
	        return vesselOprSettingDao.updateDelayPenaltyReportList(parm);
	}
}
