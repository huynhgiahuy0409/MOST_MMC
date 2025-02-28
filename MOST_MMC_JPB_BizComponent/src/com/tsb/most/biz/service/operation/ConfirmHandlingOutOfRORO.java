package com.tsb.most.biz.service.operation;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.tsb.most.biz.dao.operation.IConfirmHandlingOutOfRORODao;
import com.tsb.most.biz.dataitem.operation.CargoArrvDelvItem;
import com.tsb.most.biz.dataitem.operation.ConfirmHandlingOutOfROROItem;
import com.tsb.most.biz.dataitem.operation.GateOperationsItem;
import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchConfirmHandlingOutOfROROParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ConfirmHandlingOutOfRORO implements IConfirmHandlingOutOfRORO{
	private IConfirmHandlingOutOfRORODao confirmHandlingOutOfRORODao;

	public void setconfirmHandlingOutOfRORODao(IConfirmHandlingOutOfRORODao confirmHandlingOutOfRORODao) {
		this.confirmHandlingOutOfRORODao = confirmHandlingOutOfRORODao;
	}

	public DataItemList selectHandlingOutComboItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException{
		ConfirmHandlingOutOfROROItem returnItem = new ConfirmHandlingOutOfROROItem();

        returnItem.setDriverItems(confirmHandlingOutOfRORODao.selectDriverWithoutTruckComboBoxItems(parm).getCollection());
        returnItem.setDriverWithTruckItems(confirmHandlingOutOfRORODao.selectDriverComboBoxItems(parm).getCollection());
        returnItem.setTruckItems(confirmHandlingOutOfRORODao.selectTruckComboBoxItems(parm).getCollection());
        returnItem.setUnitItems(confirmHandlingOutOfRORODao.selectUnitComboBoxItems(parm).getCollection());
              
  		DataItemList returnItems = new DataItemList();
        returnItems.add(returnItem);
        return returnItems;      
	}

	public DataItemList selectBlComboItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException{
		DataItemList list = confirmHandlingOutOfRORODao.selectBlComboItems(parm);
        return list;
	}
	
	public DataItemList selectCargoItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException{
		DataItemList list = confirmHandlingOutOfRORODao.selectCargoItems(parm);
		if(list.size() > 0 ) {
			List<String> unitList = new ArrayList<String>();
			List<String> vgUnit = new ArrayList<String>();
			ConfirmHandlingOutOfROROItem items = (ConfirmHandlingOutOfROROItem) list.get(0);
			if(items.getUnitNo() != null && !items.getUnitNo().equals("")){
				unitList = Arrays.asList(items.getUnitNo().split("\\s*,\\s*"));
				if(items.getVgUnitNo() != null && !items.getVgUnitNo().equals("")) {
					vgUnit = Arrays.asList(items.getVgUnitNo().split("\\s*,\\s*"));

					List<String> tempListUnit = new ArrayList<String>();
					for(int i=0; i < unitList.size(); i++) {
						if(!vgUnit.contains(unitList.get(i))) {
							tempListUnit.add(unitList.get(i));
						}
					}
					String unitNos = String.join(",", tempListUnit);
					items.setUnitNo(unitNos);
				}
			}
		}
        return list;
	}
	
	public DataItemList selectDoItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException{
		DataItemList list = confirmHandlingOutOfRORODao.selectDoItems(parm);
        return list;
	}
	
	public DataItemList selectHandlingOutUnitItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException{
		DataItemList list = confirmHandlingOutOfRORODao.selectHandlingOutUnitItems(parm);
        return list;
	}
	
	public DataItemList updateHandlingOutUnitItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList returnList = new DataItemList();
		ConfirmHandlingOutOfROROItem masterItem = (ConfirmHandlingOutOfROROItem) parm.getUpdateItems().get(0);

		ConfirmHandlingOutOfROROItem jobItem = null;
		ConfirmHandlingOutOfROROItem jobGerItem = null;// general jobItem
		ConfirmHandlingOutOfROROItem delvItem = null;

		SearchCargoMasterParm mstParm;
		List listConfirmation = null;
		String jobGroupNo = null;
		UpdateItemsBizParm updateMstItems = new UpdateItemsBizParm();
		InsertItemsBizParm insertJobItems = new InsertItemsBizParm();
		InsertItemsBizParm insertDelvItems = new InsertItemsBizParm();
		UpdateItemsBizParm updateDelvItems = new UpdateItemsBizParm();
		mstParm = new SearchCargoMasterParm();
		mstParm.setCgNo(masterItem.getCgNo());
		mstParm.setVslCallId(masterItem.getVslCallId());
		mstParm.setLorryNo(masterItem.getLorryId());
		mstParm.setDriverId(masterItem.getDriverId());

		jobGroupNo = confirmHandlingOutOfRORODao.selectJobGroupNo(mstParm);
		masterItem.setJobGroup(jobGroupNo);

		int gerQty = 0;
		double gerMt = 0;
		double gerM3 = 0;

		/** *************** Export ************** */
		if (masterItem.getCatgCd().equals("E") || masterItem.getCatgCd().equals("S")) {
			// //TMT_RORO_MST
			if (confirmHandlingOutOfRORODao.selectIsCargoMstHOStDt(mstParm)) {
				masterItem.setHdlOutStDt(masterItem.getHdlOutStDt());
				masterItem.setHdlOutEndDt(masterItem.getHdlOutEndDt());
			} else {
				masterItem.setHdlOutEndDt(masterItem.getHdlOutEndDt());
			}
			//Handling Out for Return to Shipper
			masterItem.setStatCd("DV");
			jobItem = (ConfirmHandlingOutOfROROItem) masterItem.clone();
			jobItem.setJobTpCd("LO");
			jobItem.setJobPurpCd("WG");
			jobItem.setStatCd("COM");
			jobGerItem = (ConfirmHandlingOutOfROROItem) jobItem.clone();
			jobGerItem.setPkgQty(masterItem.getLoadQty());
			jobGerItem.setWgt(masterItem.getLoadMt());
			jobGerItem.setMsrmt(masterItem.getLoadM3());
			jobGerItem.setJobCoCd("G");
			insertJobItems.addInsertItem(jobGerItem);

				/** * 04-1-1. Start CG_ARRV_DELV ****************** */
				delvItem = (ConfirmHandlingOutOfROROItem) jobGerItem.clone();
				if (delvItem.getJobCoCd().equals("G")) {
					delvItem.setCgInOutCd("O");
					if (confirmHandlingOutOfRORODao.selectIsCargoAvDvChk(mstParm)) {
						updateDelvItems.addUpdateItem(delvItem);
					} else {
						insertDelvItems.addInsertItem(delvItem);
					}
				}
				/** * 04-1-1. End CG_ARRV_DELV **** */
			if (confirmHandlingOutOfRORODao.selectIsROROMst(mstParm)) {
				updateMstItems.addUpdateItem(masterItem);
			}
		}else { 
			if (masterItem.getDelvTpCd().equals("I")) {
				if (masterItem.getDisEndDt() != null) {
					masterItem.setStatCd("DV");
				} else {
					masterItem.setStatCd("OD");
				}
				if (confirmHandlingOutOfRORODao.selectIsCargoMstHOStDt(mstParm)) {
					masterItem.setHdlOutStDt(masterItem.getHdlOutStDt());
					masterItem.setHdlOutEndDt(masterItem.getHdlOutEndDt());
				} else {
					masterItem.setHdlOutEndDt(masterItem.getHdlOutEndDt());
				}
				if (confirmHandlingOutOfRORODao.selectIsROROMst(mstParm)) {
					updateMstItems.addUpdateItem(masterItem);
				}
				/**
				 * *03. Start job ***********************************
				 */
				jobItem = (ConfirmHandlingOutOfROROItem) masterItem.clone();
				jobItem.setPkgQty(masterItem.getLoadQty());
				jobItem.setWgt(masterItem.getLoadMt());
				jobItem.setMsrmt(masterItem.getLoadM3());
				jobItem.setJobTpCd("LO");
				jobItem.setJobPurpCd("WG");
				jobItem.setStatCd("COM");
				if (masterItem.getDriverId() != null  && !masterItem.getDriverId().equals("")) {// set mode of operation
					jobItem.setTsptTpCd("OH");
                }
				/** *03. End job * */
				
				jobGerItem = (ConfirmHandlingOutOfROROItem) jobItem.clone();
//				jobGerItem.setPkgQty(gerQty);
//				jobGerItem.setWgt(gerMt);
//				jobGerItem.setMsrmt(gerM3);
				jobGerItem.setJobCoCd("G");
				insertJobItems.addInsertItem(jobGerItem);
				
				/** * 04-2-1. Start CG_ARRV_DELV ****************** */
				delvItem = (ConfirmHandlingOutOfROROItem) jobGerItem.clone();
				delvItem.setCgInOutCd("O");
				mstParm.setCgInOutCd("O");
				if (confirmHandlingOutOfRORODao.selectIsCargoAvDvChk(mstParm)) {
					updateDelvItems.addUpdateItem(delvItem);
				} else {
					insertDelvItems.addInsertItem(delvItem);
				}
				/** * 04-2-1. END CG_ARRV_DELV **** */
			}
		}

		if (insertJobItems.getInsertItems() != null && insertJobItems.getInsertItems().size() > 0) {
			confirmHandlingOutOfRORODao.insertCargoHOJobItems(insertJobItems);
		}
		if (insertDelvItems.getInsertItems() != null && insertDelvItems.getInsertItems().size() > 0) {
			for (int i = 0; i < insertDelvItems.getInsertItems().size(); i++) {
				ConfirmHandlingOutOfROROItem item = (ConfirmHandlingOutOfROROItem) insertDelvItems.getInsertItems().get(i);
				SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
				gpParm.setVslCallId(item.getVslCallId());
				gpParm.setCgNo(item.getCgNo());
				gpParm.setGateTxnNo(item.getGateTxnNo());
				DataItemList gpList = confirmHandlingOutOfRORODao.selectGatepassNo(gpParm);
				if (gpList != null && gpList.size() > 0) {
					CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
					item.setGatePassNo(gpItem.getGatePassNo());
				}
				// Insert processing
				 InsertItemsBizParm tmpArrvDelvItems = new InsertItemsBizParm();
				 tmpArrvDelvItems.addInsertItem(item);
				 confirmHandlingOutOfRORODao.insertCargoHOArrvDelvItems(tmpArrvDelvItems);
			}
		}
		if (updateDelvItems.getUpdateItems() != null && updateDelvItems.getUpdateItems().size() > 0) {
			for (int i = 0; i < updateDelvItems.getUpdateItems().size(); i++) {
				ConfirmHandlingOutOfROROItem item = (ConfirmHandlingOutOfROROItem) updateDelvItems.getUpdateItems().get(i);

				// Get gate pass numer
				SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
				gpParm.setVslCallId(item.getVslCallId());
				gpParm.setCgNo(item.getCgNo());
				gpParm.setGateTxnNo(item.getGateTxnNo());
				gpParm.setIsMultiCargo(item.getIsMultiCargo());
				
				DataItemList gpList = confirmHandlingOutOfRORODao.selectGatepassNo(gpParm);
				if (gpList != null && gpList.size() > 0) {
					CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
					item.setGatePassNo(gpItem.getGatePassNo());
				}

				// Update processing
				UpdateItemsBizParm tmpArrvDelvItems = new UpdateItemsBizParm();
				tmpArrvDelvItems.addUpdateItem(item);
				confirmHandlingOutOfRORODao.updateCargoHOArrvDelvItems(tmpArrvDelvItems);
			}
		}
		return confirmHandlingOutOfRORODao.updateConfirmHandlingOutOfRoRo(parm);
	}
	
	public DataItemList deleteHandlingOutUnitItems(UpdateItemsBizParm parm) throws BizException {
		return confirmHandlingOutOfRORODao.deleteConfirmHandlingOutOfRoRo(parm);
	}
	
	
	public DataItemList selectDoItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws BizException{
		DataItemList list = confirmHandlingOutOfRORODao.selectDoItemsHHT(parm);
        return list;
	}
	
	public DataItemList selectHandlingOutUnitItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws BizException{
		DataItemList list = confirmHandlingOutOfRORODao.selectHandlingOutUnitItemsHHT(parm);
        return list;
	}
	
	public DataItemList updateHandlingOutUnitItemsHHT(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList =  parm.getUpdateItems();
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		
		for(ConfirmHandlingOutOfROROItem item : (ArrayList<ConfirmHandlingOutOfROROItem>) itemList.getCollection()) {
			if(item.getTruckNo() == null || item.getTruckNo().equals("")) {
				GateOperationsItem insertDriverItem = new GateOperationsItem();
				insertDriverItem.setVslCallId(item.getVslCallId());
				insertDriverItem.setVslCode(item.getVslCd());
				insertDriverItem.setCallYear(item.getCallYear());
				insertDriverItem.setCallSeq(item.getCallSeq());
				insertDriverItem.setLocID(item.getYardLoc());
				insertDriverItem.setSnNo(item.getShipgNoteNo());
				insertDriverItem.setBlNo(item.getBlNo());
				insertDriverItem.setDoNo(item.getDoNo());
				insertDriverItem.setsDoNo(item.getSdoNo());
				insertDriverItem.setUnitNo(item.getUnitNo());
				insertDriverItem.setBrandCD(item.getBrandCd());
				insertDriverItem.setGrNo(item.getGrNo());
				insertDriverItem.setRmk(item.getHoRemarks());
				
				insertDriverItem.setCargoType(item.getCgTpCd());
				insertDriverItem.setTransportComp(item.getTsptCompCd());
				insertDriverItem.setTicketNo(item.getGateTicketNo());
				insertDriverItem.setGateInCd("GATE01");
				insertDriverItem.setGateInDate(item.getGateInDate());
				insertDriverItem.setGateOutDate(item.getGateOutDate());
				
				insertDriverItem.setDriverId(item.getDriverId());
				insertDriverItem.setDriverName(item.getDriverNm());
				insertDriverItem.setDriverLicense(item.getDriverLicense());
				insertDriverItem.setUserId(item.getUserId());
				
				updateItems.addUpdateItem(insertDriverItem);

				confirmHandlingOutOfRORODao.updateGateTransactionsHHT(updateItems);
				
			}	
		}
		
		return confirmHandlingOutOfRORODao.updateHandlingOutUnitItemsHHT(parm);
	}
	
	public DataItemList deleteHandlingOutUnitItemsHHT(UpdateItemsBizParm parm) throws BizException {
		return confirmHandlingOutOfRORODao.deleteHandlingOutUnitItemsHHT(parm);
	}
	
	public DataItemList selectHandlingOutComboItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws BizException{
		ConfirmHandlingOutOfROROItem returnItem = new ConfirmHandlingOutOfROROItem();

        returnItem.setDriverItems(confirmHandlingOutOfRORODao.selectDriverWithoutTruckComboBoxItemsHHT(parm).getCollection());
        returnItem.setDriverWithTruckItems(confirmHandlingOutOfRORODao.selectDriverComboBoxItemsHHT(parm).getCollection());
        returnItem.setTruckItems(confirmHandlingOutOfRORODao.selectTruckComboBoxItemsHHT(parm).getCollection());
//        returnItem.setUnitItems(confirmHandlingOutOfRoRoDao.selectUnitComboBoxItems(parm).getCollection());
              
  		DataItemList returnItems = new DataItemList();
        returnItems.add(returnItem);
        return returnItems;      
	}
	
	public DataItemList selectDriverWithoutTruckComboBoxItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws BizException{
  		DataItemList returnItems = confirmHandlingOutOfRORODao.selectDriverWithoutTruckComboBoxItemsHHT(parm);
        return returnItems;      
	}
	public DataItemList selectTruckComboBoxItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws BizException{
  		DataItemList returnItems = confirmHandlingOutOfRORODao.selectTruckComboBoxItemsHHT(parm);
        return returnItems;      
	}
	
	
}
