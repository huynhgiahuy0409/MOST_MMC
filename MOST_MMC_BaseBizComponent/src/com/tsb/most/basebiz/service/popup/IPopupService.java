package com.tsb.most.basebiz.service.popup;

import com.tsb.most.basebiz.parm.popup.SearchPopupServiceParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

import javafx.scene.chart.PieChart.Data;

public interface IPopupService {
	public DataItemList selectPartnerCodeTypeList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectPartnerCodeType(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectCodeMasterList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectImportManifestComboList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectCommodityGroupCode(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectCommodityCode(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectAuthorityGroupPopup(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectPartnerCodeList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectSAgentList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectTariffCodeList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectPortCodeList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectPackageList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectUnnoList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectImdgList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectCountryCodeList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectExternalTruckList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectInternalTruckList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectExternalDriverList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectChassisList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectInternalChassisList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectAssignmentYardTruckList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectAssignmentTruckList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectGateInTruckList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectGoodsReceiptList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectSubDeliveryOrderList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectGatePassList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectLocationCodeList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectPackageNoList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectBargeNoList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectUnitNoList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectEquipmentCodeList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectEqList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectEquipmentCodeListGear(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectYardTruckPopupList(SearchPopupServiceParm pParm) throws BizException;
	public DataItemList selectServiceOrderList(SearchPopupServiceParm pParm) throws BizException;
	public DataItemList selectPackageTypeList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectUserType(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectDelayCodePopup(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectVSRPopupList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectGateTicketNoList(SearchPopupServiceParm parm) throws BizException;
	
	public DataItemList selectApronYardTruckPopupList(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectShipCallNoList(SearchPopupServiceParm parm) throws BizException;
	//s-OPR-015: Gate Operation – Modification
	public DataItemList selectShippingNoteListForGateOperationPopup(SearchPopupServiceParm parm) throws BizException;
	public DataItemList selectBLDOListForGateOperationPopup(SearchPopupServiceParm parm) throws BizException;
	//e-OPR-015: Gate Operation – Modification
}