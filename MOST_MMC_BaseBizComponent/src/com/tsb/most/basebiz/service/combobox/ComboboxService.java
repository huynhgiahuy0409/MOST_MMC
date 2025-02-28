package com.tsb.most.basebiz.service.combobox;

import com.tsb.most.basebiz.dao.combobox.IComboboxServiceDao;
import com.tsb.most.basebiz.parm.combobox.SearchComboBoxServiceParm;
import com.tsb.most.common.constant.ComboboxConstant;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ComboboxService extends MOSTBaseService implements IComboboxService {
	private IComboboxServiceDao comboboxServiceDao;

	public void setComboboxServiceDao(IComboboxServiceDao comboboxServiceDao) {
		this.comboboxServiceDao = comboboxServiceDao;
	}

	public DataItemList selectComboBox(SearchComboBoxServiceParm parm) throws BizException {
		DataItemList rValue = new DataItemList();

		if (parm.getSearchType() != null && !parm.getSearchType().equals("")) {
			if (parm.getSearchType().equals(ComboboxConstant.COMBO_CNTRY_CD)) {
				rValue = comboboxServiceDao.selectComboBoxCountryCode(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_BERTH_LOC)) {
				rValue = comboboxServiceDao.selectComboBoxBerthLocation(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_WH_LOC)) {
				rValue = comboboxServiceDao.selectComboBoxWHLocation(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_AREA_LOC)) {
				rValue = comboboxServiceDao.selectComboBoxAreaList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_COSTCNT_CD)) {
				rValue = comboboxServiceDao.selectComboBoxCostCenter(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_CMDT_CD)) {
				rValue = comboboxServiceDao.selectComboBoxCommodityCode(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_IMDG)) {
				rValue = comboboxServiceDao.selectComboBoxImdgCode(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_EQU_CAPA_CD)) {
				rValue = comboboxServiceDao.selectCapacityComboList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_LCD)) {
				rValue = comboboxServiceDao.selectComboBoxLcd(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_MCD)) {
				rValue = comboboxServiceDao.selectComboBoxMcd(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_SHFT)) {
				rValue = comboboxServiceDao.selectComboBoxShift(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_BRAND)) {
				rValue = comboboxServiceDao.selectComboBoxBrand(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_BLNO)) {
				rValue = comboboxServiceDao.selectComboBoxBLNoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_SNNO)) {
				rValue = comboboxServiceDao.selectComboBoxSNNoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_ALL_ROLE)) {
				rValue = comboboxServiceDao.selectComboBoxAllRoleList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_PARTNER)) {
				rValue = comboboxServiceDao.selectComboBoxPartnerList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_BOOKINGNO)) {
				rValue = comboboxServiceDao.selectComboBoxBookingNoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_MASTERBLNO)) {
				rValue = comboboxServiceDao.selectComboBoxMasterBLNoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_SUBDONO)) {
				rValue = comboboxServiceDao.selectComboBoxSubDoNoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_GRNO)) {
				rValue = comboboxServiceDao.selectComboBoxGrNoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_UNITNO)) {
				rValue = comboboxServiceDao.selectComboBoxUnitNoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_DEPLOYED_EQ)) {
				rValue = comboboxServiceDao.selectComboDeployedEquipmentList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_PLAN_LOC_ID)) {
				rValue = comboboxServiceDao.selectComboPlanLocationList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_MBL_NO_BOOKING_NO)) {
				rValue = comboboxServiceDao.selectComboAllMfDocIdList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_BL_NO_SN_NO)) {
				rValue = comboboxServiceDao.selectComboBLNoAndSNNoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_DO_NO_GR_NO)) {
				rValue = comboboxServiceDao.selectComboDONoAndGRNoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_INVOICE_TEMPLATE)) {
				rValue = comboboxServiceDao.selectComboInvoiceTemplateList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_PROOFSHEET_REF_NO)) {
				rValue = comboboxServiceDao.selectComboProofSheetRefNoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_PAYER)) {
				rValue = comboboxServiceDao.selectComboPayerList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_DOC_PAYER_INFO)) {
				rValue = comboboxServiceDao.selectComboDocPayerInfoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_IV_USER_REF_NO)) {
				rValue = comboboxServiceDao.selectComboIvUserRefNoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_IV_BL_SN)) {
				rValue = comboboxServiceDao.selectComboIvBlSnNoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_IV_PREFIX)) {
				rValue = comboboxServiceDao.selectComboIvPrefixList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_TRF_CD)) {
				rValue = comboboxServiceDao.selectComboTrfCdList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_INV_MBL_NO)) {
				rValue = comboboxServiceDao.selectComboBoxInvMasterBlNoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_IV_BOOKING_NO)) {
				rValue = comboboxServiceDao.selectComboBoxInvBookingNoList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_BLNO_HHT)) {
				rValue = comboboxServiceDao.selectComboBlHHT(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_SNNO_HHT)) {
				rValue = comboboxServiceDao.selectComboSnHHT(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_HATCH_NO_HHT)) {
				rValue = comboboxServiceDao.selectComboHatchNoListHHT(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_SHFT_TYPE)) {
				rValue = comboboxServiceDao.selectComboBoxShiftType(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_CRANE_EQ)) {
				rValue = comboboxServiceDao.selectComboCraneEquipmentList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_CONVEYOR_EQ)) {
				//OPR-016: Conveyor Mode Operation
				rValue = comboboxServiceDao.selectComboConveyorEquipmentList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_CURRENCY)) {
				rValue = comboboxServiceDao.selectComboBoxCurrencyList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_GST_RATE)) {
				rValue = comboboxServiceDao.selectComboBoxGstRateList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_IV_UNIT)) {
				rValue = comboboxServiceDao.selectComboBoxIvUnitList(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_HR_LOG)) { // Added by Tim 02/26/2024 11:00
				rValue = comboboxServiceDao.selectComboBoxForUnavailableLog(parm);
			} else if (parm.getSearchType().equals("I")) { // Added by Tim 03/26/2024 13:14
				rValue = comboboxServiceDao.selectComboBoxCodeMaster(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_VORLQ_CMDT)) {
				rValue = comboboxServiceDao.selectComboBoxVorLiquidCmdt(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_VORLQ_TMNLOPE)) {
				rValue = comboboxServiceDao.selectComboBoxVorLiquidTmnlOpe(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_VORLQ_PKGTP)) {
				rValue = comboboxServiceDao.selectComboBoxVorLiquidPkgTp(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_VORLQ_SHPR)) {
				rValue = comboboxServiceDao.selectComboBoxVorLiquidShpr(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_VORLQ_CNSNE)) {
				rValue = comboboxServiceDao.selectComboBoxVorLiquidCnsne(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_PARTICULAR)) {
				rValue = comboboxServiceDao.selectComboBoxParticular(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_MODE_OPERATION)) {
				rValue = comboboxServiceDao.selectComboBoxModeOfOpr(parm);
			}  else if (parm.getSearchType().equals(ComboboxConstant.COMBO_WH_ID)) {
				rValue = comboboxServiceDao.selectComboWhId(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_OPR_BLNO)) {
				rValue = comboboxServiceDao.selectComboBoxGatePassBlNoList(parm);
			}else if (parm.getSearchType().equals(ComboboxConstant.COMBO_OPR_SNNO)) {
				rValue = comboboxServiceDao.selectComboBoxGatePassSnNoList(parm);
			}else if (parm.getSearchType().equals(ComboboxConstant.COMBO_OPR_GR)) {
				rValue = comboboxServiceDao.selectComboBoxGatePassGrList(parm);
			}else if (parm.getSearchType().equals(ComboboxConstant.COMBO_VORLQ_BLSN)) {
				rValue = comboboxServiceDao.selectComboBoxVorLiquidBlSn(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_BIIT)) {
				rValue = comboboxServiceDao.selectComboBoxBitt(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_STOPPAGE_REASON)) {
				rValue = comboboxServiceDao.selectComboBoxStoppageReason(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_PACKAGE_NO)) {
				rValue = comboboxServiceDao.selectComboBoxPackageNo(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_EQ)) {
				rValue = comboboxServiceDao.selectComboBoxEquipment(parm);
			} else if (parm.getSearchType().equals(ComboboxConstant.COMBO_DO_NO)) {
				rValue = comboboxServiceDao.selectComboBoxDoNoList(parm);
			}
			
		} else {
			rValue = comboboxServiceDao.selectComboBoxCodeMaster(parm);
		}
		return rValue;
	}

	public DataItemList selectBrandComboBoxItemsHHT(SearchComboBoxServiceParm parm) throws BizException {
		return comboboxServiceDao.selectBrandComboBoxItemsHHT(parm);
	}
	//s-OPR-015: Gate Operation – Modification
	@Override
	public DataItemList getSuggestionList(SearchComboBoxServiceParm parm) throws BizException {
		DataItemList rValue = new DataItemList();
		switch (parm.getSearchType()) {
			case ComboboxConstant.COMBO_BLNO:
				rValue = comboboxServiceDao.selectBLDOSuggestionListForGateOperation(parm);
				break;
			case ComboboxConstant.COMBO_SNNO:
				rValue = comboboxServiceDao.selectShippingNoteSuggestionListForGateOperation(parm);
				break;
			case ComboboxConstant.COMBO_TRUCK:
				rValue = comboboxServiceDao.selectTruckSuggestionListList(parm);
				break;
			case ComboboxConstant.COMBO_DRIVER:
				rValue = comboboxServiceDao.selectDriverSuggestionList(parm);
				break;
		}
		return rValue;
	}
	//e-OPR-015: Gate Operation – Modification

}
