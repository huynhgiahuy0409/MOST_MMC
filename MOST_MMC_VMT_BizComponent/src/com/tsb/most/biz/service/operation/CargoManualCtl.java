package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.operation.ICargoManualCtlDao;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dao.operation.IOperationSettingDao;
import com.tsb.most.biz.dataitem.operation.CargoGeneralItem;
import com.tsb.most.biz.dataitem.operation.CargoMasterItem;
import com.tsb.most.biz.dataitem.operation.OperationSettingItem;
import com.tsb.most.biz.parm.operation.SearchCargoExportParm;
import com.tsb.most.biz.parm.operation.SearchCargoGatePassParm;
import com.tsb.most.biz.parm.operation.SearchCargoGeneralParm;
import com.tsb.most.biz.parm.operation.SearchCargoImportParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchOperationSettingParm;
import com.tsb.most.biz.parm.operation.SearchTruckAssignmentParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class CargoManualCtl extends MOSTBaseService implements ICargoManualCtl {
	
	private ICargoManualCtlDao cargoManualCtlDao;
	private ICargoMasterDao cargoMasterDao;	
	private ICodeMasterDao codeMasterDao;
	private IOperationSettingDao operationSettingDao;
	
//	private IShippingNoteDao shippingNoteDao;
//	
//	private IDeliveryOrderDao deliveryOrderDao;
	
	public void setCargoManualCtlDao(ICargoManualCtlDao cargoManualCtlDao) {
		this.cargoManualCtlDao = cargoManualCtlDao;
	}

	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}
	
	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}
	
	public void setOperationSettingDao(IOperationSettingDao operationSettingDao) {
	this.operationSettingDao = operationSettingDao;
}
	
//	public void setShippingNoteDao(IShippingNoteDao shippingNoteDao) {
//		this.shippingNoteDao = shippingNoteDao;
//	}
//	
//	public void setOperationSettingDao(IOperationSettingDao operationSettingDao) {
//		this.operationSettingDao = operationSettingDao;
//	}
//	
//	public void setDeliveryOrderDao(IDeliveryOrderDao deliveryOrderDao) {
//		this.deliveryOrderDao = deliveryOrderDao;
//	}
	
	public DataItemList selectCargoGeneralList(SearchCargoGeneralParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		CargoGeneralItem returnItem = new CargoGeneralItem();
		returnItem.setCargoGeneralList(cargoManualCtlDao.selectCargoGeneralList(parm).getCollection());
		
		List totalList = cargoManualCtlDao.selectCargoGeneralTotal(parm).getCollection();
		List remainList = cargoManualCtlDao.selectCargoGeneralRemain(parm).getCollection();
		List sumList = new ArrayList();
		sumList.add(totalList);
		sumList.add(remainList);
		returnItem.setSummaryList(sumList);
		itemList.add(returnItem);
		return itemList;
	}
	
	public DataItemList selectCargoExportList(SearchCargoExportParm parm) throws BizException {
		if ("GR".equals(parm.getPageType())) {
			int iTemp = ((Integer.parseInt(parm.getCurrentPage()) - 1) * Integer.parseInt(parm.getNumbPerPage())) + 1;
			parm.setFromRow(iTemp + "");
			iTemp = (Integer.parseInt(parm.getCurrentPage()) * Integer.parseInt(parm.getNumbPerPage()));
			parm.setToRow(iTemp + "");
		}
		DataItemList result = cargoManualCtlDao.selectCargoExportList(parm);
		return result;
	}
	
	public DataItemList selectCargoImportList(SearchCargoImportParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		if ("comboList".equals(parm.getSearchType())) {
			SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
			partyCode.setLcd(CodeConstant.LCD_MOST);
			partyCode.setMcd(CodeConstant.MCD_MT_DELVTP);
			itemList.setCollection(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
		} else {
			itemList = cargoManualCtlDao.selectCargoImportList(parm);
		}
		return itemList;
	}
	
	public DataItemList selectCargoGatePassList(SearchCargoGatePassParm parm) throws BizException {
		return cargoManualCtlDao.selectCargoGatePassList(parm);
	}
	
	public DataItemList selectSnBlComboList(SearchCargoMasterParm parm) throws BizException {
		CargoMasterItem returnItem = new CargoMasterItem();
		DataItemList itemList = new DataItemList();

//		SearchShippingNoteParm snParm = new SearchShippingNoteParm();
//		SearchDeliveryOrderParm deParm = new SearchDeliveryOrderParm();
//		SearchManifestParm mfParm = new SearchManifestParm();
//		
//		snParm.setSearchType(parm.getSearchType());
//		snParm.setVslCallId(parm.getVslCallId());
//		snParm.setArrvDtFm(parm.getArrvDtFm());
//		snParm.setOpType(parm.getOpType());
//		snParm.setArrvDtTo(parm.getArrvDtTo());
//		snParm.setPtnrCd(parm.getPtnrCode());
//		
//		deParm.setSearchType(parm.getSearchType());
//		deParm.setVslCallId(parm.getVslCallId());
//		deParm.setAuthority(parm.getUserType());
//		deParm.setPtnrType(parm.getAuthority());
//		deParm.setPtnrcd(parm.getPtnrCode());
//		
//		mfParm.setVslCallId(parm.getVslCallId());
//
//		returnItem.setSnList(shippingNoteDao.selectShippingNoteComboList(snParm).getCollection());
//		returnItem.setBlList(deliveryOrderDao.selectDeliveryOrderBLComboList(deParm).getCollection());
//		
//		mfParm.setOpeClassCd(CodeConstant.MT_CATGTP_E);
//		returnItem.setBookingNoList(shippingNoteDao.selectManifestComboList(mfParm).getCollection());
//		mfParm.setOpeClassCd(CodeConstant.MT_CATGTP_I);
//		returnItem.setMasterBlList(deliveryOrderDao.selectManifestComboList(mfParm).getCollection());

		itemList.add(returnItem);
		return itemList;
	}
	
	public DataItemList selectGrGoComboList(SearchCargoMasterParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		CargoMasterItem returnItem = new CargoMasterItem();
//		List list = cargoMasterDao.selectGrGoComboList(parm).getCollection();
//		CargoMasterItem cgItem = null;
//		if (list != null && list.size() > 0) {
//			cgItem = (CargoMasterItem) list.get(0);
//			returnItem.setItems(list);
//
//			SearchShippingNoteParm snParm = new SearchShippingNoteParm();
//			snParm.setVslCallId(cgItem.getVslCallId());
//
//			if (!CodeConstant.VESSEL_SCHEDULE_STRG.equals(cgItem.getVslCallId())) {
//				returnItem.setSnList(shippingNoteDao.selectShippingNoteComboList(snParm).getCollection());
//			}
//		}
		itemList.add(returnItem);
		return itemList;
	}
	
	public DataItemList selectGpGoComboList(SearchCargoMasterParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		CargoMasterItem returnItem = new CargoMasterItem();
//		List list = cargoMasterDao.selectGpGoComboList(parm).getCollection();
//		CargoMasterItem cgItem = null;
//		if (list != null && list.size() > 0) {
//			cgItem = (CargoMasterItem) list.get(0);
//			returnItem.setItems(list);
//
//			SearchCargoGatePassParm gpParm = new SearchCargoGatePassParm();
//			gpParm.setVslCallId(cgItem.getVslCallId());
//			gpParm.setGatePassNo(parm.getGatePassNo());
//
//			returnItem.setBlList(cargoManualCtlDao.selectBLComboList(gpParm).getCollection());
//		}
		itemList.add(returnItem);
		return itemList;
	}
	
	public DataItemList selectCargoGeneralComboList(SearchCargoGeneralParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		CargoGeneralItem returnItem = new CargoGeneralItem();
		SearchCodeMasterParm partyCode;

//		// cargo category code
//		partyCode = new SearchCodeMasterParm();
//		partyCode.setLcd(CodeConstant.LCD_MOST);
//		partyCode.setMcd(CodeConstant.MCD_MT_CATGTP);
//		returnItem.setCategoryList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
//
//		// tspttp code
//		partyCode.setLcd(CodeConstant.LCD_MOST);
//		partyCode.setMcd(CodeConstant.MCD_MT_TSPTTP);
//		partyCode.setCol2(CodeConstant.LCD_MOST);
//		returnItem.setModeOfOprList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
//		
//		// delivery
//		partyCode = new SearchCodeMasterParm();
//		partyCode.setLcd(CodeConstant.LCD_MOST);
//		partyCode.setMcd(CodeConstant.MCD_MT_DELVTP); // event type
//		returnItem.setDeliveryList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
//		
//		// cago type cd
//		partyCode = new SearchCodeMasterParm();
//		partyCode.setLcd(CodeConstant.LCD_MOST);
//		partyCode.setMcd(CodeConstant.MCD_MT_CGTP); // event type
//		returnItem.setCargoTypeList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
//
//		// pakage type cd
//		partyCode = new SearchCodeMasterParm();
//		partyCode.setLcd(CodeConstant.LCD_MOST);
//		partyCode.setMcd(CodeConstant.MCD_MT_PKGTP); // event type
//		returnItem.setPackageTypeList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
//		
//		// Shift Dt
//		SearchOperationSettingParm operationSetParm = new SearchOperationSettingParm();
//		operationSetParm.setSearchType("CT");
//		returnItem.setShiftDtList(operationSettingDao.selectOperationSetShftDtList(operationSetParm).getCollection());
		
		itemList.add(returnItem);
		return itemList;
	}
	
	public DataItemList selectOperationSetShftDtList(SearchOperationSettingParm parm) throws BizException {
		//return operationSettingDao.selectOperationSetShftDtList(parm);
		return null;
	}
	
	public DataItemList selectOperationSetShftList(SearchOperationSettingParm parm) throws BizException {
		//return operationSettingDao.selectOperationSetShftList(parm);
		return null;
	}
	
	public DataItemList updatingYardTruckWHCheckImport(UpdateItemsBizParm parm) throws BizException {
		return cargoManualCtlDao.updatingYardTruckWHCheckImport(parm);
	}
	
	public DataItemList updatingYardTruckIndirectLoading(UpdateItemsBizParm parm) throws BizException {
		return cargoManualCtlDao.updatingYardTruckIndirectLoading(parm);
	}
	
	/******TABLET***********************/
	public DataItemList selectQrInformation(SearchTruckAssignmentParm parm) throws BizException {
		return cargoManualCtlDao.selectQrInformation(parm);
	}
	@Override
	public DataItemList selectCargoExportROROList(SearchCargoExportParm parm) throws BizException {
		if ("GR".equals(parm.getPageType())) {
			int iTemp = ((Integer.parseInt(parm.getCurrentPage()) - 1) * Integer.parseInt(parm.getNumbPerPage())) + 1;
			parm.setFromRow(iTemp + "");
			iTemp = (Integer.parseInt(parm.getCurrentPage()) * Integer.parseInt(parm.getNumbPerPage()));
			parm.setToRow(iTemp + "");
		}
		DataItemList result = cargoManualCtlDao.selectCargoExportForROROList(parm);
		return result;
	}
	@Override
	public DataItemList selectCargoImportROROList(SearchCargoImportParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		if ("comboList".equals(parm.getSearchType())) {
			SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
			partyCode.setLcd(CodeConstant.LCD_MOST);
			partyCode.setMcd(CodeConstant.MCD_MT_DELVTP);
			itemList.setCollection(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
		} else {
			itemList = cargoManualCtlDao.selectCargoImporForROROtList(parm);
		}
		return itemList;
	}
	
	
	//RBT. 2024 add Activate Operation
	/**
	 * To make an Active YT List by Input vessel.
	 * Select all Internal Truck which assigned [TMT_ASSIGN_TRANSPORT] doc belong to inputed Vessel.
	 * Then Insert all to TMT_YT_POOL. Previous records related to that YT will be deleted.
	 * */
	@Override
	public DataItemList processActivateOperation(UpdateItemsBizParm parm) throws BizException {
		
		DataItemList items = parm.getUpdateItems();
		OperationSettingItem item = (OperationSettingItem) items.get(0);
		
		if("I".equals(item.getOpeClassCd())) {
			item.setDocNo(item.getBlNo());
		}else {
			item.setDocNo(item.getShipgNoteNo());
		}
		
		SearchOperationSettingParm ytParm = new SearchOperationSettingParm();
		ytParm.setVslCallId(item.getVslCallId());
		DataItemList dLRes = operationSettingDao.selectYTList(ytParm);
		DataItemList dlYTPoolList = new DataItemList();
		ArrayList<OperationSettingItem> ytList = (ArrayList<OperationSettingItem>) dLRes.getCollection();
		
		for (OperationSettingItem ytPoolItem : ytList) {
			ytPoolItem.setVslCd(item.getVslCd());
			ytPoolItem.setCallYear(item.getCallYear());
			ytPoolItem.setCallSeq(item.getCallSeq());
			ytPoolItem.setVslCallId(item.getVslCallId());
			ytPoolItem.setOpeClassCd(item.getOpeClassCd());
			ytPoolItem.setMfDocId(item.getMfDocId());
			ytPoolItem.setDocNo(item.getDocNo());
			ytPoolItem.setUserId(item.getUserId());
			
			dlYTPoolList.add(ytPoolItem);
		}
		
		InsertItemsBizParm insParm = new InsertItemsBizParm();
		insParm.setInsertItems(dlYTPoolList);
		return operationSettingDao.insertYTPool(insParm);
	}
}
