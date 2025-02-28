package com.tsb.most.basebiz.dao.combobox;

import com.tsb.most.basebiz.parm.combobox.SearchComboBoxServiceParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ComboboxServiceDao extends BaseDao implements IComboboxServiceDao{
	public DataItemList selectComboBoxCountryCode(SearchComboBoxServiceParm parm) throws DaoException {
	    return unifiedDao.getItems("comboboxService.selectComboBoxCountryCode", parm);
    }
	
	public DataItemList selectComboBoxCodeMaster(SearchComboBoxServiceParm parm) throws DaoException {
    	return unifiedDao.getItems("comboboxService.selectComboBoxCodeMaster", parm);
    }
	
	public DataItemList selectComboBoxCostCenter(SearchComboBoxServiceParm parm) throws DaoException {
    	return unifiedDao.getItems("comboboxService.selectComboBoxCostCenter", parm);
    }
	
	public DataItemList selectComboBoxWHLocation(SearchComboBoxServiceParm parm) throws DaoException {
    	return unifiedDao.getItems("comboboxService.selectComboBoxWHLocation", parm);
    }
	
	public DataItemList selectComboBoxBerthLocation(SearchComboBoxServiceParm parm) throws DaoException {
    	return unifiedDao.getItems("comboboxService.selectComboBoxBerthLocation", parm);
    }
	
	public DataItemList selectComboBoxCommodityCode(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxCommodityCode", parm);
	}
	
	public DataItemList selectComboBoxImdgCode(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxImdgCode", parm);
	}
	
	public DataItemList selectComboBoxLcd(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxLcd", parm);
	}
	
	public DataItemList selectComboBoxMcd(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxMcd", parm);
	}
	
	public DataItemList selectComboBoxAreaList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxAreaList", parm);
	}
	
	public DataItemList selectCapacityComboList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectCapacityComboList", parm);
	}
	
	public DataItemList selectComboBoxShift(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxShift", parm);
	}
	
	public DataItemList selectComboBoxBrand(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxBrand", parm);
	}
	
	public DataItemList selectComboBoxBLNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxBLNoList", parm);
	}
	
	public DataItemList selectComboBoxSNNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxSNNoList", parm);
	}
	
	public DataItemList selectComboBoxAllRoleList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxAllRoleList", parm);
	}
	
	public DataItemList selectComboBoxPartnerList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxPartnerList", parm);
	}
	
	public DataItemList selectComboBoxBookingNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxBookingNoList", parm);
	}
	
	public DataItemList selectComboBoxMasterBLNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxMasterBLNoList", parm);
	}
	
	public DataItemList selectComboBoxSubDoNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxSubDoNoList", parm);
	}
	
	public DataItemList selectComboBoxGrNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxGrNoList", parm);
	}
	
	public DataItemList selectComboBoxUnitNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxUnitNoList", parm);
	}
	
	public DataItemList selectComboDeployedEquipmentList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboDeployedEquipmentList", parm);
	}
	
	public DataItemList selectComboPlanLocationList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboPlanLocationList", parm);
	}
	
	public DataItemList selectWHComboList(SearchComboBoxServiceParm pParm) throws DaoException{
    	return unifiedDao.getItems("comboboxService.selectWHComboList", pParm);
    }
	
	public DataItemList selectComboHatchNoListHHT(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboHatchNoListHHT", parm);
	}
	
	public DataItemList selectCodeMasterList(SearchComboBoxServiceParm parm) throws DaoException {
        return unifiedDao.getItems("comboboxService.selectCodeMasterList", parm);
    }
	
	public DataItemList selectBrandComboBoxItemsHHT(SearchComboBoxServiceParm parm) throws DaoException {
        return unifiedDao.getItems("comboboxService.selectBrandComboBoxItemsHHT", parm);
    }
	
	public DataItemList selectComboBlHHT(SearchComboBoxServiceParm parm) throws DaoException {
        return unifiedDao.getItems("comboboxService.selectComboBlHHT", parm);
    }
	
	public DataItemList selectComboSnHHT(SearchComboBoxServiceParm parm) throws DaoException {
        return unifiedDao.getItems("comboboxService.selectComboSnHHT", parm);
    }
	
	public DataItemList selectComboAllMfDocIdList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboAllMfDocIdList", parm);
	}
	
	public DataItemList selectComboBLNoAndSNNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBLNoAndSNNoList", parm);
	}
	
	public DataItemList selectComboDONoAndGRNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboDONoAndGRNoList", parm);
	}
	
	public DataItemList selectComboInvoiceTemplateList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboInvoiceTemplateList", parm);
	}
	
	public DataItemList selectComboProofSheetRefNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboProofSheetRefNoList", parm);
	}
	
	public DataItemList selectComboPayerList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboPayerList", parm);
	}
	
	public DataItemList selectComboDocPayerInfoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboDocPayerInfoList", parm);
	}
	
	public DataItemList selectComboIvUserRefNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboIvUserRefNoList", parm);
	}
	
	public DataItemList selectComboIvBlSnNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboIvBlSnNoList", parm);
	}
	
	public DataItemList selectComboIvPrefixList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboIvPrefixList", parm);
	}
	
	public DataItemList selectComboTrfCdList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboTrfCdList", parm);
	}
	
	public DataItemList selectComboBoxShiftType(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxShiftType", parm);
	}
	
	public DataItemList selectComboCraneEquipmentList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboCraneEquipmentList", parm);
	}
	
	public DataItemList selectComboBoxInvMasterBlNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxInvMasterBlNoList", parm);
	}
	
	public DataItemList selectComboBoxInvBookingNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxInvBookingNoList", parm);
	}
	
	public DataItemList selectComboBoxCurrencyList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxCurrencyList", parm);
	}
	
	public DataItemList selectComboBoxGstRateList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxGstRateList", parm);
	}
	
	public DataItemList selectComboBoxIvUnitList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxIvUnitList", parm);
	}
	
	public DataItemList selectComboBoxForUnavailableLog(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxForUnavailableLog",parm);
	}
	
	///////////////////////////
	public DataItemList selectComboBoxVorLiquidCmdt(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxVorLiquidCmdt", parm);
	}
	
	public DataItemList selectComboBoxVorLiquidTmnlOpe(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxVorLiquidTmnlOpe", parm);
	}
	
	public DataItemList selectComboBoxVorLiquidShpr(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxVorLiquidShpr", parm);
	}
	
	public DataItemList selectComboBoxVorLiquidCnsne(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxVorLiquidCnsne", parm);
	}
	
	public DataItemList selectComboBoxVorLiquidPkgTp(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxVorLiquidPkgTp", parm);
	}
	public DataItemList selectComboBoxParticular(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxCodeMaster", parm);
	}
	public DataItemList selectComboBoxModeOfOpr(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxModeOfOpr", parm);
	}
	public DataItemList selectComboWhId(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectWHComboList", parm);
	}
	public DataItemList selectComboBoxGatePassBlNoList(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxGatePassBlNoList", parm);
	}
	public DataItemList selectComboBoxGatePassSnNoList(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxGatePassSnNoList", parm);
	}
	public DataItemList selectComboBoxGatePassGrList(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxGatePassGrList", parm);
	}
	public DataItemList selectComboBoxVorLiquidBlSn(SearchComboBoxServiceParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItems("comboboxService.selectComboBoxVorLiquidBlSn", parm);
	}
	public DataItemList selectComboBoxCommonCodeList(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxCommonCodeList", parm);
	}
	public DataItemList selectComboBoxCMDTCodeList(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxCMDTCodeList", parm);
	}
	//s-OPR-015: Gate Operation – Modification
	@Override
	public DataItemList selectBLDOSuggestionListForGateOperation(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectBLDOSuggestionListForGateOperation", parm);
	}

	@Override
	public DataItemList selectShippingNoteSuggestionListForGateOperation(SearchComboBoxServiceParm parm)
			throws DaoException {
		return unifiedDao.getItems("comboboxService.selectShippingNoteSuggestionListForGateOperation", parm);
	}
	
	@Override
	public DataItemList selectTruckSuggestionListList(SearchComboBoxServiceParm parm)
			throws DaoException {
		return unifiedDao.getItems("comboboxService.selectTruckSuggestionListList", parm);
	}
	
	@Override
	public DataItemList selectDriverSuggestionList(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectDriverSuggestionList", parm);
	}
	//e-OPR-015: Gate Operation – Modification
	public DataItemList selectComboBoxBitt(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxBitt", parm);
	}
	public DataItemList selectComboBoxStoppageReason(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxStoppageReason", parm);
	}
	public DataItemList selectComboBoxPackageNo(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboBoxPackageNo", parm);
	}
	//s-OPR-016: Conveyor Mode Operation
	@Override
	public DataItemList selectComboConveyorEquipmentList(SearchComboBoxServiceParm parm) throws DaoException {
		return unifiedDao.getItems("comboboxService.selectComboConveyorEquipmentList", parm);
	}
	//e-OPR-016: Conveyor Mode Operation

	@Override
	public DataItemList selectComboBoxEquipment(SearchComboBoxServiceParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return unifiedDao.getItems("comboboxService.selectComboBoxEquipment", parm);
	}
	
	public DataItemList selectComboBoxDoNoList(SearchComboBoxServiceParm parm) throws DaoException{
		return unifiedDao.getItems("comboboxService.selectComboBoxDoNoList", parm);
	}
}
