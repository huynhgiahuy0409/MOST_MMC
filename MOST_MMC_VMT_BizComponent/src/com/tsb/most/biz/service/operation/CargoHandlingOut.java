package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.dao.configuration.IWhConfigurationDao;
import com.tsb.most.basebiz.dataitem.configuration.WhConfigurationItem;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.basebiz.parm.configuration.SearchWhConfigurationParm;
import com.tsb.most.biz.dao.operation.ICargoArrvDelvDao;
import com.tsb.most.biz.dao.operation.ICargoHandlingOutDao;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dataitem.operation.CargoArrvDelvItem;
import com.tsb.most.biz.dataitem.operation.CargoHandlingOutItem;
import com.tsb.most.biz.dataitem.operation.PackageJobItem;
import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.biz.parm.operation.SearchCargoHandlingOutParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class CargoHandlingOut extends MOSTBaseService implements ICargoHandlingOut {
	private ICargoHandlingOutDao cargoHandlingOutDao;
	private ICodeMasterDao codeMasterDao;
	private ICargoMasterDao cargoMasterDao;
	private ICargoArrvDelvDao cargoArrvDelvDao;
	private IWhConfigurationDao whConfigurationDao;
	
	public void setWhConfigurationDao(IWhConfigurationDao whConfigurationDao) {
		this.whConfigurationDao = whConfigurationDao;
	}
	public void setCargoHandlingOutDao(ICargoHandlingOutDao cargoHandlingOutDao) {
		this.cargoHandlingOutDao = cargoHandlingOutDao;
	}
	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}
	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}
	public void setCargoArrvDelvDao(ICargoArrvDelvDao cargoArrvDelvDao) {
		this.cargoArrvDelvDao = cargoArrvDelvDao;
	}

	public DataItemList selectCargoHandlingOutList(SearchCargoHandlingOutParm parm) throws BizException {
		CargoHandlingOutItem returnItem = new CargoHandlingOutItem();
		returnItem.setItems(cargoHandlingOutDao.selectCargoHandlingOutList(parm).getCollection());

		// Get Cargo Type code
		SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
		partyCode.setLcd(CodeConstant.LCD_MOST);
		partyCode.setMcd(CodeConstant.MCD_MT_CGTP);
		returnItem.setCargoTypeList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

		DataItemList itemList = new DataItemList();
		itemList.add(returnItem);
		return itemList;
	}
	
	public DataItemList updateCargoHandlingOutItem(UpdateItemsBizParm parm) throws BizException {
		DataItemList returnList = new DataItemList();
		CargoHandlingOutItem masterItem = (CargoHandlingOutItem) parm.getUpdateItems().get(0);

		CargoHandlingOutItem jobItem = null;
		CargoHandlingOutItem jobGerItem = null;// general jobItem

		CargoHandlingOutItem invLocItem = null;
		CargoHandlingOutItem delvItem = null;

		SearchCargoMasterParm mstParm;
		SearchWhConfigurationParm whParm;
		List listConfirmation = null;
		String jobGroupNo = null;

		boolean isBbk = false;
		boolean isDbk = false;

		UpdateItemsBizParm updateMstItems = new UpdateItemsBizParm();
		InsertItemsBizParm insertJobItems = new InsertItemsBizParm();
		InsertItemsBizParm insertDelvItems = new InsertItemsBizParm();
		UpdateItemsBizParm updateDelvItems = new UpdateItemsBizParm();
		InsertItemsBizParm insertInvLocItems = new InsertItemsBizParm();

		mstParm = new SearchCargoMasterParm();
		mstParm.setCgNo(masterItem.getCgNo());
		mstParm.setVslCallId(masterItem.getVslCallId());
		mstParm.setLorryNo(masterItem.getLorryId());

		jobGroupNo = cargoMasterDao.selectJobGroupNo(mstParm);
		masterItem.setJobGroup(jobGroupNo);

		int gerQty = 0;
		double gerMt = 0;
		double gerM3 = 0;

		// ///////////////////////////////////////////////////////////////////////////////////////////////////////
		// Start Auto
		/*
		 * Normal : wHdao.getInvLocs(whParm); Damage : wHdao.getDmgInvLocs(whParm);
		 * Spare : wHdao.getSprInvLocs(whParm);
		 */
		if (masterItem.getAutoLocFlag() != null && masterItem.getAutoLocFlag().equals("true")) {

			whParm = new SearchWhConfigurationParm();
			whParm.setCgNo(masterItem.getCgNo());
			whParm.setVslCallId(masterItem.getVslCallId());
			whParm.setSpCaCoCd(masterItem.getSpCaCoCd());
			whParm.setWhTpCd(masterItem.getJobCoCd());

			//normal case inv_loc
			listConfirmation = whConfigurationDao.selectHOInvLocs(whParm).getCollection();

			if (masterItem.getLocCount() != 0 && listConfirmation.size() > 0) {
				if (masterItem.getLocCount() == 1) {// One Cell
					oneAutoLocHO(listConfirmation, masterItem, "G");
				} else {// mutil Cell
					mutiAutoLocHO(listConfirmation, masterItem, "G");
				}
			}

		}

		// ///////////////////////////////////////////////////////////////////////////////////////////////////////end
		// AutoLocation

		/** *************** Export ************** */
		if (masterItem.getCatgCd().equals("E") || masterItem.getCatgCd().equals("S")) { // if 3 //
			// Export Case
			// Gr
			System.out.println("Export");
			// //TMT_CG_MST
			/** *02. Start HO Time****************************** */
			if (cargoMasterDao.selectIsCargoMstHOStDt(mstParm)) {
				masterItem.setHdlOutStDt(masterItem.getHdlOutStDt());
				masterItem.setHdlOutEndDt(masterItem.getHdlOutEndDt());
			} else {
				masterItem.setHdlOutEndDt(masterItem.getHdlOutEndDt());
			}
			/** *02. End HO Time * */
			/** *03. Start Job ****************************** */
			jobItem = (CargoHandlingOutItem) masterItem.clone();
			jobItem.setJobTpCd("LO");
			jobItem.setJobPurpCd("WG");
			jobItem.setStat("COM");

			invLocItem = (CargoHandlingOutItem) jobItem.clone();
			for (int j = 0; j < invLocItem.getWhConfigurationItems().size(); j++) {
				WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItem.getWhConfigurationItems().get(j);
				if (whconfItem.getWhTpCd().equals("G")) {
					CargoHandlingOutItem gerInvLocItem = (CargoHandlingOutItem) invLocItem.clone();
					gerInvLocItem.setLocArea(gerInvLocItem.getLocId());
					gerInvLocItem.setLocId(whconfItem.getLocId());
					gerInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
					gerInvLocItem.setLocWgt((whconfItem.getWgt()));
					gerInvLocItem.setLocMsrmt((whconfItem.getMsrmt()));
					gerInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
					gerInvLocItem.setWhLocTpCd(whconfItem.getLocTpCd());
					gerInvLocItem.setJobCoCd(whconfItem.getWhTpCd());
					insertInvLocItems.addInsertItem(gerInvLocItem);

					gerQty = gerQty + gerInvLocItem.getLocQty();
					gerMt = gerMt + gerInvLocItem.getLocWgt();
					gerM3 = gerM3 + gerInvLocItem.getLocMsrmt();
				}
			}
			/** *03. End job * */

			/** * 04-4. Start Ger Job **************** */
			isBbk = false;
			isDbk = false;
			if (jobItem.getCgTpCd().equals("BBK") && (gerMt > 0 || gerQty > 0)) {
				isBbk = true;
			}
			if ((jobItem.getCgTpCd().equals("DBN")) && (gerMt > 0)) {
				isDbk = true;
			}
			if (isBbk || isDbk) {
				jobGerItem = (CargoHandlingOutItem) jobItem.clone();
				jobGerItem.setDmgYn("N");
				jobGerItem.setShuYn("N");
				jobGerItem.setPkgQty(gerQty);
				jobGerItem.setWgt(gerMt);
				jobGerItem.setMsrmt(gerM3);
				jobGerItem.setJobCoCd("G");
				insertJobItems.addInsertItem(jobGerItem);

				/** * 04-1-1. Start CG_ARRV_DELV ****************** */
				delvItem = (CargoHandlingOutItem) jobGerItem.clone();
				if (delvItem.getJobCoCd().equals("G")) {
					delvItem.setCgInOutCd("O");
					if (cargoMasterDao.selectIsCargoAvDvChk(mstParm)) {
						updateDelvItems.addUpdateItem(delvItem);
					} else {
						insertDelvItems.addInsertItem(delvItem);
					}
				}
				/** * 04-1-1. End CG_ARRV_DELV **** */
			} // end isBbk / isDbk Case of Normal
			/** * 04-4. End Ger Job **************** */
			// /////////////////////////////////
			if (cargoMasterDao.selectIsCargoMst(mstParm)) {
				updateMstItems.addUpdateItem(masterItem);
			}
			
			/** *************** Import ************** */
			/** ** Start Import ********************************* */
		} else { // Import Case  if (masterItem.getCatgCd().equals("I") || masterItem.getCatgCd().equals("T"))
			if (masterItem.getDelvTpCd().equals("I")) {// direct
				// TMT_JOB,
				// TMT_CG_MST,
				// TMT_DELV
				// TMT_CG_MST UPDATE, TMT_JOB LO JOB_TYPE LIFT ON
				// INSERT, TMT_DELV INSERT

				// //TMT_CG_MST
				/** *Start Status ****************************** */
				if ("Y".equals(masterItem.getWhFnlDelvYn()) || "true".equals(masterItem.getWhFnlDelvYn())) {
					if (masterItem.getDisEndDt() != null) {
						masterItem.setStat("DV");
					} else {
						masterItem.setStat("OD");
					}

				} else {
					if (masterItem.getDisEndDt() != null) {
						masterItem.setStat("OD");
					} else {
						masterItem.setStat("ST");
					}
				}
				/** ***********************************End Status */
				if (cargoMasterDao.selectIsCargoMstHOStDt(mstParm)) {
					masterItem.setHdlOutStDt(masterItem.getHdlOutStDt());
					masterItem.setHdlOutEndDt(masterItem.getHdlOutEndDt());
				} else {
					masterItem.setHdlOutEndDt(masterItem.getHdlOutEndDt());
				}
				if (cargoMasterDao.selectIsCargoMst(mstParm)) {
					updateMstItems.addUpdateItem(masterItem);
				}

				// startDT
				/***************************************************
				 * 1. GENERAL 2. DMG
				 * 
				 **************************************************/
				// //TMT_JOB
				/**
				 * *03. Start job ***********************************
				 */
				jobItem = (CargoHandlingOutItem) masterItem.clone();
				jobItem.setPkgQty(masterItem.getLoadQty());
				jobItem.setWgt(masterItem.getLoadMt());
				jobItem.setMsrmt(masterItem.getLoadM3());
				jobItem.setJobTpCd("LO");
				jobItem.setJobPurpCd("WG");
				jobItem.setStat("COM");
				if (masterItem.getDisEndDt() != null) {
					if ("Y".equals(masterItem.getWhFnlDelvYn()) || "true".equals(masterItem.getWhFnlDelvYn())) {
						jobItem.setFnlDelvYn("Y");
					} else {
						jobItem.setFnlDelvYn("N");
					}
				} else {
					jobItem.setFnlDelvYn("N");
				}

				invLocItem = (CargoHandlingOutItem) jobItem.clone();
				for (int j = 0; j < invLocItem.getWhConfigurationItems().size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItem.getWhConfigurationItems().get(j);
					if (whconfItem.getWhTpCd().equals("G")) {
						CargoHandlingOutItem gerInvLocItem = (CargoHandlingOutItem) invLocItem.clone();
						gerInvLocItem.setLocArea(gerInvLocItem.getLocId());
						gerInvLocItem.setLocId(whconfItem.getLocId());
						gerInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
						gerInvLocItem.setLocWgt((whconfItem.getWgt()));
						gerInvLocItem.setLocMsrmt((whconfItem.getMsrmt()));
						gerInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
						gerInvLocItem.setWhLocTpCd(whconfItem.getLocTpCd());
						gerInvLocItem.setJobCoCd(whconfItem.getWhTpCd());
						insertInvLocItems.addInsertItem(gerInvLocItem);

						gerQty = gerQty + gerInvLocItem.getLocQty();
						gerMt = gerMt + gerInvLocItem.getLocWgt();
						gerM3 = gerM3 + gerInvLocItem.getLocMsrmt();
					}
				}
				/** *03. End job * */

				/** * 04-2. Start Ger Job **************** */
				jobGerItem = (CargoHandlingOutItem) jobItem.clone();
				jobGerItem.setDmgYn("N");
				jobGerItem.setShuYn("N");
				jobGerItem.setPkgQty(gerQty);
				jobGerItem.setWgt(gerMt);
				jobGerItem.setMsrmt(gerM3);
				jobGerItem.setJobCoCd("G");
				insertJobItems.addInsertItem(jobGerItem);
				
				/** * 04-2-1. Start CG_ARRV_DELV ****************** */
				delvItem = (CargoHandlingOutItem) jobGerItem.clone();
				if (delvItem.getDmgYn() == null || !delvItem.getDmgYn().equals("Y")) {
					delvItem.setCgInOutCd("O");
					mstParm.setCgInOutCd("O");

					if (cargoMasterDao.selectIsCargoAvDvChk(mstParm)) {
						if (jobItem.getFnlDelvYn().equals("Y")) {
							delvItem.setFnlYn("Y");
							updateDelvItems.addUpdateItem(delvItem);
						} else {
							updateDelvItems.addUpdateItem(delvItem);
						}
					} else {
						if (jobItem.getFnlDelvYn().equals("Y")) {
							delvItem.setFnlYn("Y");
							insertDelvItems.addInsertItem(delvItem);
						} else {
							insertDelvItems.addInsertItem(delvItem);
						}

					}
				}
				
				/** * 04-2-1. END CG_ARRV_DELV **** */
				// }
				/** * 04-3. End SHU Job * */
			} // end if - first

		} // end 3

		if (updateMstItems.getUpdateItems() != null && updateMstItems.getUpdateItems().size() > 0) {
			cargoHandlingOutDao.updateCargoHandlingOutItems(updateMstItems);
		}

		if (insertJobItems.getInsertItems() != null && insertJobItems.getInsertItems().size() > 0) {
			cargoHandlingOutDao.insertCargoHOJobItems(insertJobItems);
			
			
		}

		if (insertInvLocItems.getInsertItems() != null && insertInvLocItems.getInsertItems().size() > 0) {
			cargoHandlingOutDao.insertCargoInvLocationItems(insertInvLocItems);
		}

		if (insertJobItems.getInsertItems() != null && insertJobItems.getInsertItems().size() > 0) {
			cargoHandlingOutDao.updateCargoMasterStatus(insertJobItems);
		}

		if (insertDelvItems.getInsertItems() != null && insertDelvItems.getInsertItems().size() > 0) {
			for (int i = 0; i < insertDelvItems.getInsertItems().size(); i++) {
				CargoHandlingOutItem item = (CargoHandlingOutItem) insertDelvItems.getInsertItems().get(i);
				
				if("Y".equalsIgnoreCase(item.getIsMultiCargo())) {
					item.setRmk("Multiple-Cargo");//CUSP.ADP
					item.setIsMultiCargo("Y");
				}

				// Get gate pass numer
				SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
				gpParm.setVslCallId(item.getVslCallId());
				gpParm.setCgNo(item.getCgNo());
				gpParm.setGateTxnNo(item.getGateTxnNo());
				gpParm.setIsMultiCargo(item.getIsMultiCargo());
				DataItemList gpList = cargoArrvDelvDao.selectGatepassNo(gpParm);
				if (gpList != null && gpList.size() > 0) {
					CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
					item.setGatePassNo(gpItem.getGatePassNo());
				}

				// Insert processing
				 UpdateItemsBizParm tmpArrvDelvItems = new UpdateItemsBizParm();
				 tmpArrvDelvItems.addUpdateItem(item);
				 cargoHandlingOutDao.updateCargoHOArrvDelvItems(tmpArrvDelvItems);
			}
		}

		if (updateDelvItems.getUpdateItems() != null && updateDelvItems.getUpdateItems().size() > 0) {
			for (int i = 0; i < updateDelvItems.getUpdateItems().size(); i++) {
				CargoHandlingOutItem item = (CargoHandlingOutItem) updateDelvItems.getUpdateItems().get(i);

				if(this.checkMultiCargoTxn(item)) {
					item.setRmk("Multiple-Cargo");//CUSP.ADP
					item.setIsMultiCargo("Y");
				}
				
				// Get gate pass numer
				SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
				gpParm.setVslCallId(item.getVslCallId());
				gpParm.setCgNo(item.getCgNo());
				gpParm.setGateTxnNo(item.getGateTxnNo());
				gpParm.setIsMultiCargo(item.getIsMultiCargo());
				
				DataItemList gpList = cargoArrvDelvDao.selectGatepassNo(gpParm);
				if (gpList != null && gpList.size() > 0) {
					CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
					item.setGatePassNo(gpItem.getGatePassNo());
				}

				// Update processing
				UpdateItemsBizParm tmpArrvDelvItems = new UpdateItemsBizParm();
				tmpArrvDelvItems.addUpdateItem(item);
				cargoHandlingOutDao.updateCargoHOArrvDelvItems(tmpArrvDelvItems);
			}
		}
		
		//Package Items
		insertPakageJobItems(insertJobItems.getInsertItems());
		
		returnList.add(insertJobItems.getInsertItems());
		return returnList;
	}
	
	
	public DataItemList updateCargoHandlingOutItem_Bk(UpdateItemsBizParm parm) throws BizException {
		DataItemList returnList = new DataItemList();
		CargoHandlingOutItem masterItem = (CargoHandlingOutItem) parm.getUpdateItems().get(0);

		CargoHandlingOutItem jobItem = null;
		CargoHandlingOutItem jobDmgItem = null;
		CargoHandlingOutItem jobShuItem = null;
		CargoHandlingOutItem jobGerItem = null;// general jobItem

		CargoHandlingOutItem invLocItem = null;
		CargoHandlingOutItem delvItem = null;

		SearchCargoMasterParm mstParm;
		SearchWhConfigurationParm whParm;
		List listConfirmation = null;
		String jobGroupNo = null;

		boolean isBbk = false;
		boolean isDbk = false;

		UpdateItemsBizParm updateMstItems = new UpdateItemsBizParm();
		InsertItemsBizParm insertJobItems = new InsertItemsBizParm();
		InsertItemsBizParm insertDelvItems = new InsertItemsBizParm();
		UpdateItemsBizParm updateDelvItems = new UpdateItemsBizParm();
		InsertItemsBizParm insertInvLocItems = new InsertItemsBizParm();

		mstParm = new SearchCargoMasterParm();
		mstParm.setCgNo(masterItem.getCgNo());
		mstParm.setVslCallId(masterItem.getVslCallId());
		mstParm.setLorryNo(masterItem.getLorryId());

		jobGroupNo = cargoMasterDao.selectJobGroupNo(mstParm);
		masterItem.setJobGroup(jobGroupNo);

		int shuQty = 0;
		double shuMt = 0;
		double shuM3 = 0;

		int dmgQty = 0;
		double dmgMt = 0;
		double dmgM3 = 0;

		int gerQty = 0;
		double gerMt = 0;
		double gerM3 = 0;

		// ///////////////////////////////////////////////////////////////////////////////////////////////////////
		// Start Auto
		/*
		 * Normal : wHdao.getInvLocs(whParm); Damage : wHdao.getDmgInvLocs(whParm);
		 * Spare : wHdao.getSprInvLocs(whParm);
		 */
		if (masterItem.getAutoLocFlag() != null && masterItem.getAutoLocFlag().equals("true")) {

			whParm = new SearchWhConfigurationParm();
			whParm.setCgNo(masterItem.getCgNo());
			whParm.setVslCallId(masterItem.getVslCallId());
			whParm.setSpCaCoCd(masterItem.getSpCaCoCd());
			whParm.setWhTpCd(masterItem.getJobCoCd());

			// ////normal case inv_loc
			listConfirmation = whConfigurationDao.selectHOInvLocs(whParm).getCollection();

			if (masterItem.getLocCount() != 0 && listConfirmation.size() > 0) {
				if (masterItem.getLocCount() == 1) {// One Cell
					oneAutoLocHO(listConfirmation, masterItem, "G");
				} else {// mutil Cell
					mutiAutoLocHO(listConfirmation, masterItem, "G");
				}
			}

		}

		// ///////////////////////////////////////////////////////////////////////////////////////////////////////end
		// AutoLocation

		/** *************** Export ************** */
		if (masterItem.getCatgCd().equals("E") || masterItem.getCatgCd().equals("S")) { // if 3 //
			// Export Case
			// Gr
			System.out.println("Export");
			// //TMT_CG_MST
			/** *02. Start HO Time****************************** */
			if (cargoMasterDao.selectIsCargoMstHOStDt(mstParm)) {
				masterItem.setHdlOutStDt(masterItem.getHdlOutStDt());
				masterItem.setHdlOutEndDt(masterItem.getHdlOutEndDt());
			} else {
				masterItem.setHdlOutEndDt(masterItem.getHdlOutEndDt());
			}
			/** *02. End HO Time * */
			/** *03. Start Job ****************************** */
			jobItem = (CargoHandlingOutItem) masterItem.clone();
			jobItem.setJobTpCd("LO");
			jobItem.setJobPurpCd("WG");
			jobItem.setStat("COM");

			invLocItem = (CargoHandlingOutItem) jobItem.clone();
			for (int j = 0; j < invLocItem.getWhConfigurationItems().size(); j++) {
				WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItem.getWhConfigurationItems().get(j);
				/** * 03-1-1 Start DMG Inv_LOC ****** */
				if (whconfItem.getWhTpCd().equals("D")) {
					CargoHandlingOutItem dmgInvLocItem = (CargoHandlingOutItem) invLocItem.clone();
					dmgInvLocItem.setLocArea(dmgInvLocItem.getLocId());
					dmgInvLocItem.setLocId(whconfItem.getLocId());
					dmgInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
					dmgInvLocItem.setLocWgt((whconfItem.getWgt()));
					dmgInvLocItem.setLocMsrmt((whconfItem.getMsrmt()));
					dmgInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
					dmgInvLocItem.setJobCoCd(whconfItem.getWhTpCd());
					dmgInvLocItem.setDmgYn("Y");
					insertInvLocItems.addInsertItem(dmgInvLocItem);

					dmgQty = dmgQty + dmgInvLocItem.getLocQty();
					dmgMt = dmgMt + dmgInvLocItem.getLocWgt();
					dmgM3 = dmgM3 + dmgInvLocItem.getLocMsrmt();
					/** * 03-1-1 End DMG Inv_LOC * */
					/** * 03-2-1 Start SHU Inv_LOC ****** */
				} else if (whconfItem.getWhTpCd().equals("S")) {
					CargoHandlingOutItem shuInvLocItem = (CargoHandlingOutItem) invLocItem.clone();
					shuInvLocItem.setLocArea(shuInvLocItem.getLocId());
					shuInvLocItem.setLocId(whconfItem.getLocId());
					shuInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
					shuInvLocItem.setLocWgt((whconfItem.getWgt()));
					shuInvLocItem.setLocMsrmt((whconfItem.getMsrmt()));
					shuInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
					shuInvLocItem.setJobCoCd(whconfItem.getWhTpCd());
					shuInvLocItem.setShuYn("Y");
					insertInvLocItems.addInsertItem(shuInvLocItem);

					shuQty = shuQty + shuInvLocItem.getLocQty();
					shuMt = shuMt + shuInvLocItem.getLocWgt();
					shuM3 = shuM3 + shuInvLocItem.getLocMsrmt();
				} else if (whconfItem.getWhTpCd().equals("G")) {
					CargoHandlingOutItem gerInvLocItem = (CargoHandlingOutItem) invLocItem.clone();
					gerInvLocItem.setLocArea(gerInvLocItem.getLocId());
					gerInvLocItem.setLocId(whconfItem.getLocId());
					gerInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
					gerInvLocItem.setLocWgt((whconfItem.getWgt()));
					gerInvLocItem.setLocMsrmt((whconfItem.getMsrmt()));
					gerInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
					gerInvLocItem.setWhLocTpCd(whconfItem.getLocTpCd());
					gerInvLocItem.setJobCoCd(whconfItem.getWhTpCd());
					insertInvLocItems.addInsertItem(gerInvLocItem);

					gerQty = gerQty + gerInvLocItem.getLocQty();
					gerMt = gerMt + gerInvLocItem.getLocWgt();
					gerM3 = gerM3 + gerInvLocItem.getLocMsrmt();
				}
				/** * 03-2-1 End SHU Inv_LOC * */
			}
			/** *03. End job * */

			/** * 04-1. Start DMG Job **************** */
			isBbk = false;
			isDbk = false;
			if (jobItem.getCgTpCd().equals("BBK") && (dmgMt > 0 || dmgQty > 0)) {
				isBbk = true;
			}
			if ((jobItem.getCgTpCd().equals("DBN") || jobItem.getCgTpCd().equals("DBE")
					|| jobItem.getCgTpCd().equals("DBK")) && (dmgMt > 0)) {
				isDbk = true;
			}

			if (isBbk || isDbk) {
				jobDmgItem = (CargoHandlingOutItem) jobItem.clone();
				jobDmgItem.setDmgYn("Y");
				jobDmgItem.setShuYn("N");
				jobDmgItem.setPkgQty(dmgQty);
				jobDmgItem.setWgt(dmgMt);
				jobDmgItem.setMsrmt(dmgM3);
				jobDmgItem.setJobCoCd("D");
				insertJobItems.addInsertItem(jobDmgItem);

				/** * 04-1-1. Start CG_ARRV_DELV ****************** */
				delvItem = (CargoHandlingOutItem) jobDmgItem.clone();
				if (delvItem.getDmgYn() != null && delvItem.getDmgYn().equals("Y")) {
					delvItem.setCgInOutCd("O");// delv//
					if (cargoMasterDao.selectIsCargoAvDvChk(mstParm)) {
						updateDelvItems.addUpdateItem(delvItem);
					} else {
						insertDelvItems.addInsertItem(delvItem);
					}
				}
				/** * 04-1-1. End CG_ARRV_DELV **** */
			}
			/** * 04-1. End DMG Job * */
			/** * 04-2. Start SHU Job **************** */
			isBbk = false;
			isDbk = false;
			if (jobItem.getCgTpCd().equals("BBK") && (shuMt > 0 || shuQty > 0)) {
				isBbk = true;
			}
			if ((jobItem.getCgTpCd().equals("DBN") || jobItem.getCgTpCd().equals("DBE")
					|| jobItem.getCgTpCd().equals("DBK")) && (shuMt > 0)) {
				isDbk = true;
			}
			if (isBbk || isDbk) {
				jobShuItem = (CargoHandlingOutItem) jobItem.clone();
				jobShuItem.setShuYn("Y");
				jobShuItem.setDmgYn("N");
				jobShuItem.setPkgQty(shuQty);
				jobShuItem.setWgt(shuMt);
				jobShuItem.setMsrmt(shuM3);
				jobShuItem.setJobCoCd("S");
				insertJobItems.addInsertItem(jobShuItem);

				/** * 04-2-1. Start CG_ARRV_DELV ****************** */
				delvItem = (CargoHandlingOutItem) jobShuItem.clone();
				if (delvItem.getShuYn() != null && delvItem.getShuYn().equals("Y")) {
					delvItem.setCgInOutCd("O");
					if (cargoMasterDao.selectIsCargoAvDvChk(mstParm)) {
						updateDelvItems.addUpdateItem(delvItem);
					} else {
						insertDelvItems.addInsertItem(delvItem);
					}
				}
				/** * 04-2-1. END CG_ARRV_DELV **** */
			}
			/** * 04-3. End SHU Job * */
			// ////////////////////////////////
			/** * 04-4. Start Ger Job **************** */
			isBbk = false;
			isDbk = false;
			if (jobItem.getCgTpCd().equals("BBK") && (gerMt > 0 || gerQty > 0)) {
				isBbk = true;
			}
			if ((jobItem.getCgTpCd().equals("DBN") || jobItem.getCgTpCd().equals("DBE")
					|| jobItem.getCgTpCd().equals("DBK")) && (gerMt > 0)) {
				isDbk = true;
			}
			if (isBbk || isDbk) {
				jobGerItem = (CargoHandlingOutItem) jobItem.clone();
				jobGerItem.setDmgYn("N");
				jobGerItem.setShuYn("N");
				jobGerItem.setPkgQty(gerQty);
				jobGerItem.setWgt(gerMt);
				jobGerItem.setMsrmt(gerM3);
				jobGerItem.setJobCoCd("G");
				insertJobItems.addInsertItem(jobGerItem);

				/** * 04-1-1. Start CG_ARRV_DELV ****************** */
				delvItem = (CargoHandlingOutItem) jobGerItem.clone();
				if (delvItem.getJobCoCd().equals("G")) {
					delvItem.setCgInOutCd("O");
					if (cargoMasterDao.selectIsCargoAvDvChk(mstParm)) {
						updateDelvItems.addUpdateItem(delvItem);
					} else {
						insertDelvItems.addInsertItem(delvItem);
					}
				}
				/** * 04-1-1. End CG_ARRV_DELV **** */
			} // end isBbk / isDbk Case of Normal
			/** * 04-4. End Ger Job **************** */
			// /////////////////////////////////
			if (cargoMasterDao.selectIsCargoMst(mstParm)) {
				updateMstItems.addUpdateItem(masterItem);
			} else {
				//
			}
			/** *************** Import ************** */
			/** ** Start Import ********************************* */
		} else  { // Import Case if (masterItem.getCatgCd().equals("I") || masterItem.getCatgCd().equals("T"))
			if (masterItem.getDelvTpCd().equals("I")) {// direct
				// TMT_JOB,
				// TMT_CG_MST,
				// TMT_DELV
				// TMT_CG_MST UPDATE, TMT_JOB LO JOB_TYPE LIFT ON
				// INSERT, TMT_DELV INSERT

				// //TMT_CG_MST
				/** *Start Status ****************************** */
				if ("Y".equals(masterItem.getWhFnlDelvYn()) || "true".equals(masterItem.getWhFnlDelvYn())) {
					if (masterItem.getDisEndDt() != null) {
						masterItem.setStat("DV");
					} else {
						masterItem.setStat("OD");
					}

				} else {
					if (masterItem.getDisEndDt() != null) {
						masterItem.setStat("OD");
					} else {
						masterItem.setStat("ST");
					}
				}
				/** ***********************************End Status */
				if (cargoMasterDao.selectIsCargoMstHOStDt(mstParm)) {
					masterItem.setHdlOutStDt(masterItem.getHdlOutStDt());
					masterItem.setHdlOutEndDt(masterItem.getHdlOutEndDt());
				} else {
					masterItem.setHdlOutEndDt(masterItem.getHdlOutEndDt());
				}
				if (cargoMasterDao.selectIsCargoMst(mstParm)) {
					updateMstItems.addUpdateItem(masterItem);
				}

				// startDT
				/***************************************************
				 * 1. GENERAL 2. DMG
				 * 
				 **************************************************/
				// //TMT_JOB
				/**
				 * *03. Start job ***********************************
				 */
				jobItem = (CargoHandlingOutItem) masterItem.clone();
				jobItem.setPkgQty(masterItem.getLoadQty());
				jobItem.setWgt(masterItem.getLoadMt());
				jobItem.setMsrmt(masterItem.getLoadM3());
				jobItem.setJobTpCd("LO");
				jobItem.setJobPurpCd("WG");
				jobItem.setStat("COM");
				if (masterItem.getDisEndDt() != null) {
					if ("Y".equals(masterItem.getWhFnlDelvYn()) || "true".equals(masterItem.getWhFnlDelvYn())) {
						jobItem.setFnlDelvYn("Y");
					} else {
						jobItem.setFnlDelvYn("N");
					}
				} else {
					jobItem.setFnlDelvYn("N");
				}

				invLocItem = (CargoHandlingOutItem) jobItem.clone();
				for (int j = 0; j < invLocItem.getWhConfigurationItems().size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItem.getWhConfigurationItems().get(j);
					// 03-1-1 Start DMG Inv_LOC
					if (whconfItem.getWhTpCd().equals("D")) {
						CargoHandlingOutItem dmgInvLocItem = (CargoHandlingOutItem) invLocItem.clone();
						dmgInvLocItem.setLocArea(dmgInvLocItem.getLocId());
						dmgInvLocItem.setLocId(whconfItem.getLocId());
						dmgInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
						dmgInvLocItem.setLocWgt((whconfItem.getWgt()));
						dmgInvLocItem.setLocMsrmt((whconfItem.getMsrmt()));
						dmgInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
						dmgInvLocItem.setJobCoCd(whconfItem.getWhTpCd());
						dmgInvLocItem.setDmgYn("Y");
						insertInvLocItems.addInsertItem(dmgInvLocItem);

						dmgQty = dmgQty + dmgInvLocItem.getLocQty();
						dmgMt = dmgMt + dmgInvLocItem.getLocWgt();
						dmgM3 = dmgM3 + dmgInvLocItem.getLocMsrmt();
					} else if (whconfItem.getWhTpCd().equals("G")) {
						CargoHandlingOutItem gerInvLocItem = (CargoHandlingOutItem) invLocItem.clone();
						gerInvLocItem.setLocArea(gerInvLocItem.getLocId());
						gerInvLocItem.setLocId(whconfItem.getLocId());
						gerInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
						gerInvLocItem.setLocWgt((whconfItem.getWgt()));
						gerInvLocItem.setLocMsrmt((whconfItem.getMsrmt()));
						gerInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
						gerInvLocItem.setWhLocTpCd(whconfItem.getLocTpCd());
						gerInvLocItem.setJobCoCd(whconfItem.getWhTpCd());
						insertInvLocItems.addInsertItem(gerInvLocItem);

						gerQty = gerQty + gerInvLocItem.getLocQty();
						gerMt = gerMt + gerInvLocItem.getLocWgt();
						gerM3 = gerM3 + gerInvLocItem.getLocMsrmt();
					}
					// 03-2-1 End GENERAL Inv_LOC
				}
				/** *03. End job * */
				/** * 04-1. Start DMG Job **************** */
				isBbk = false;
				isDbk = false;
				if (jobItem.getCgTpCd().equals("BBK") && (dmgMt > 0 || dmgQty > 0)) {
					isBbk = true;
				}
				if ((jobItem.getCgTpCd().equals("DBN") || jobItem.getCgTpCd().equals("DBE")
						|| jobItem.getCgTpCd().equals("DBK")) && (dmgMt > 0)) {
					isDbk = true;
				}

				if (dmgMt > 0 || dmgM3 > 0) {
					jobDmgItem = (CargoHandlingOutItem) jobItem.clone();
					jobDmgItem.setDmgYn("Y");
					jobDmgItem.setShuYn("N");
					jobDmgItem.setPkgQty(dmgQty);
					jobDmgItem.setWgt(dmgMt);
					jobDmgItem.setMsrmt(dmgM3);
					jobDmgItem.setJobCoCd("D");
					insertJobItems.addInsertItem(jobDmgItem);

					/**
					 * * 04-1-1. Start CG_ARRV_DELV ******************
					 */
					delvItem = (CargoHandlingOutItem) jobDmgItem.clone();
					if (delvItem.getDmgYn() != null && delvItem.getDmgYn().equals("Y")) {
						delvItem.setCgInOutCd("O");
						mstParm.setCgInOutCd("O");
						if (cargoMasterDao.selectIsCargoAvDvChk(mstParm)) {
							updateDelvItems.addUpdateItem(delvItem);
						} else {
							insertDelvItems.addInsertItem(delvItem);
						}
					}
					/** * 04-1-1. End CG_ARRV_DELV **** */
				}
				/** * 04-1. End DMG Job * */
				
				
				/** * 04-2. Start Ger Job **************** */
				jobGerItem = (CargoHandlingOutItem) jobItem.clone();
				jobGerItem.setDmgYn("N");
				jobGerItem.setShuYn("N");
				jobGerItem.setPkgQty(gerQty);
				jobGerItem.setWgt(gerMt);
				jobGerItem.setMsrmt(gerM3);
				jobGerItem.setJobCoCd("G");
				insertJobItems.addInsertItem(jobGerItem);
				
				/** * 04-2-1. Start CG_ARRV_DELV ****************** */
				delvItem = (CargoHandlingOutItem) jobGerItem.clone();
				if (delvItem.getDmgYn() == null || !delvItem.getDmgYn().equals("Y")) {
					delvItem.setCgInOutCd("O");
					mstParm.setCgInOutCd("O");

					if (cargoMasterDao.selectIsCargoAvDvChk(mstParm)) {
						if (jobItem.getFnlDelvYn().equals("Y")) {
							delvItem.setFnlYn("Y");
							updateDelvItems.addUpdateItem(delvItem);
						} else {
							updateDelvItems.addUpdateItem(delvItem);
						}
					} else {
						if (jobItem.getFnlDelvYn().equals("Y")) {
							delvItem.setFnlYn("Y");
							insertDelvItems.addInsertItem(delvItem);
						} else {
							insertDelvItems.addInsertItem(delvItem);
						}

					}
				}
				/** * 04-2-1. END CG_ARRV_DELV **** */
				// }
				/** * 04-3. End SHU Job * */
			} // end if - first

		} // end 3

		if (updateMstItems.getUpdateItems() != null && updateMstItems.getUpdateItems().size() > 0) {
			cargoHandlingOutDao.updateCargoHandlingOutItems(updateMstItems);
		}

		if (insertJobItems.getInsertItems() != null && insertJobItems.getInsertItems().size() > 0) {
			cargoHandlingOutDao.insertCargoHOJobItems(insertJobItems);
			
			
		}

		if (insertInvLocItems.getInsertItems() != null && insertInvLocItems.getInsertItems().size() > 0) {
			cargoHandlingOutDao.insertCargoInvLocationItems(insertInvLocItems);
		}

		if (insertJobItems.getInsertItems() != null && insertJobItems.getInsertItems().size() > 0) {
			cargoHandlingOutDao.updateCargoMasterStatus(insertJobItems);
		}

		if (insertDelvItems.getInsertItems() != null && insertDelvItems.getInsertItems().size() > 0) {
			for (int i = 0; i < insertDelvItems.getInsertItems().size(); i++) {
				CargoHandlingOutItem item = (CargoHandlingOutItem) insertDelvItems.getInsertItems().get(i);
				
				if("Y".equalsIgnoreCase(item.getIsMultiCargo())) {
					item.setRmk("Multiple-Cargo");//CUSP.ADP
					item.setIsMultiCargo("Y");
				}

				// Get gate pass numer
				SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
				gpParm.setVslCallId(item.getVslCallId());
				gpParm.setCgNo(item.getCgNo());
				gpParm.setGateTxnNo(item.getGateTxnNo());
				gpParm.setIsMultiCargo(item.getIsMultiCargo());
				DataItemList gpList = cargoArrvDelvDao.selectGatepassNo(gpParm);
				if (gpList != null && gpList.size() > 0) {
					CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
					item.setGatePassNo(gpItem.getGatePassNo());
				}

				// Insert processing
				UpdateItemsBizParm tmpArrvDelvItems = new UpdateItemsBizParm();
				 tmpArrvDelvItems.addUpdateItem(item);
				 cargoHandlingOutDao.updateCargoHOArrvDelvItems(tmpArrvDelvItems);
			}
		}

		if (updateDelvItems.getUpdateItems() != null && updateDelvItems.getUpdateItems().size() > 0) {
			for (int i = 0; i < updateDelvItems.getUpdateItems().size(); i++) {
				CargoHandlingOutItem item = (CargoHandlingOutItem) updateDelvItems.getUpdateItems().get(i);

				if(this.checkMultiCargoTxn(item)) {
					item.setRmk("Multiple-Cargo");//CUSP.ADP
					item.setIsMultiCargo("Y");
				}
				
				// Get gate pass numer
				SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
				gpParm.setVslCallId(item.getVslCallId());
				gpParm.setCgNo(item.getCgNo());
				gpParm.setGateTxnNo(item.getGateTxnNo());
				gpParm.setIsMultiCargo(item.getIsMultiCargo());
				
				DataItemList gpList = cargoArrvDelvDao.selectGatepassNo(gpParm);
				if (gpList != null && gpList.size() > 0) {
					CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
					item.setGatePassNo(gpItem.getGatePassNo());
				}

				// Update processing
				UpdateItemsBizParm tmpArrvDelvItems = new UpdateItemsBizParm();
				tmpArrvDelvItems.addUpdateItem(item);
				cargoHandlingOutDao.updateCargoHOArrvDelvItems(tmpArrvDelvItems);
			}
		}
		
		//Package Items
		insertPakageJobItems(insertJobItems.getInsertItems());
		
		returnList.add(insertJobItems.getInsertItems());
		return returnList;
	}
	
	/**
	 * @param listConfirmation
	 * @param item
	 * @param flag
	 * G:Normal S:Spare D:whDamage
	 */
	private void oneAutoLocHO(List listConfirmation, CargoHandlingOutItem item, String flag) {
		ArrayList autoitemList = new ArrayList();
		String whName = null;
		String firstName = null;
		String minName = null;
		String whGPreName = null;
		int countG = 0;

		if (item.getCgTpCd().equals("BBK")) {
			WhConfigurationItem autowhconfItem;

			// Normal Case
			if (item.getLoadMt() > 0 && flag.equals("G")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0, firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName.lastIndexOf("-") + 1);

					}

					whGPreName = whName + "(" + minName + "," + ++countG + ")";

					if (item.getLoadMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));
					}
					autoitemList.add(autowhconfItem);
				} // end for
				item.setLocId(whGPreName);

			} else if (item.getLoadM3() > 0 && flag.equals("G")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0, firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName.lastIndexOf("-") + 1);
					}

					whGPreName = whName + "(" + minName + "," + ++countG + ")";

					if (item.getLoadM3() == item.getM3()) {
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));
					}
					autoitemList.add(autowhconfItem);

				} // end for
				item.setLocId(whGPreName);
			} else if (item.getLoadQty() > 0 && flag.equals("G")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0, firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName.lastIndexOf("-") + 1);

					}

					whGPreName = whName + "(" + minName + "," + ++countG + ")";

					if (item.getLoadQty() == item.getQty()) {
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));
					}
					autoitemList.add(autowhconfItem);

				} // end for
				item.setLocId(whGPreName);
			}

			if (flag.equals("G")) {
				item.setWhConfigurationItems(autoitemList);
			}
		} else {// DBK
			WhConfigurationItem autowhconfItem;

			// Normal Case
			if (item.getLoadMt() > 0 && flag.equals("G")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0, firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName.lastIndexOf("-") + 1);

					}

					whGPreName = whName + "(" + minName + "," + ++countG + ")";

					if (item.getLoadMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));
					}

					autoitemList.add(autowhconfItem);
				} // end for
				item.setLocId(whGPreName);
			}
			if (flag.equals("G")) {
				item.setWhConfigurationItems(autoitemList);
			}
		}
	}
	
	/**
	 * @param listConfirmation
	 * @param item
	 * @param flag
	 * G:Normal S:Spare D:whDamage
	 */
	private void mutiAutoLocHO(List listConfirmation, CargoHandlingOutItem item, String flag) {
		ArrayList autoitemList = new ArrayList();
		String whName = null;
		String firstName = null;
		String minName = null;
		String whGPreName = null;
		int countG = 0;
		if (item.getCgTpCd().equals("BBK")) {
			WhConfigurationItem autowhconfItem = new WhConfigurationItem();
			if (item.getLoadMt() > 0 && flag.equals("G")) {
				double sumMT = item.getLoadMt();// Summary AMT
				double sumM3 = item.getLoadM3();// Summary AMT
				int sumQty = item.getLoadQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumMT <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0, firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName.lastIndexOf("-") + 1);
					}

					if (0 != whconfItem.getWgt() && whconfItem.getWgt() != whconfItem.getDumpWgt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();

						if (sumMT > autowhconfItem.getWgt()) {

							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem.setDumpPkgQty(autowhconfItem.getPkgQty());

							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty - Integer.parseInt(autowhconfItem.getPkgQty());

							whGPreName = whName + "(" + minName + "," + ++countG + ")";
						} else if (sumMT == autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whGPreName = whName + "(" + minName + "," + ++countG + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumMT = 0;

							whGPreName = whName + "(" + minName + "," + ++countG + ")";

						}
						autoitemList.add(autowhconfItem);
					}
				} // end for
				item.setLocId(whGPreName);
			} else if (item.getLoadM3() > 0 && flag.equals("G")) {
				double sumMT = 0.000d;
				sumMT = item.getLoadMt();// Summary AMT
				double sumM3 = item.getLoadM3();// Summary AMT
				int sumQty = item.getLoadQty();// Summary AMT

				double locMt = 0.000d;
				double locM3 = 0;
				int locQty = 0;

				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumM3 <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0, firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName.lastIndexOf("-") + 1);
					}
					if (0 != whconfItem.getMsrmt() && whconfItem.getMsrmt() != whconfItem.getDumpMsrmt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();

						if (sumM3 > autowhconfItem.getMsrmt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem.setDumpPkgQty(autowhconfItem.getPkgQty());
							double sumAutoMT = 0.000d;
							sumAutoMT = autowhconfItem.getWgt();
							sumMT = ((sumMT * 1000) - (sumAutoMT * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty - Integer.parseInt(autowhconfItem.getPkgQty());

							// sumM3 = interSumM3;

							whGPreName = whName + "(" + minName + "," + ++countG + ")";

						} else if (sumM3 == autowhconfItem.getMsrmt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumM3 = 0;

							whGPreName = whName + "(" + minName + "," + ++countG + ")";

						} else {
							double sumAutoMT = 0.000d;
							sumAutoMT = autowhconfItem.getWgt();
							locMt = ((sumAutoMT * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumM3 = 0;

							whGPreName = whName + "(" + minName + "," + ++countG + ")";

						}
						autoitemList.add(autowhconfItem);
					}
				} // end for
				item.setLocId(whGPreName);
			} else if (item.getLoadQty() > 0 && flag.equals("G")) {
				double sumMT = item.getLoadMt();// Summary AMT
				double sumM3 = item.getLoadM3();// Summary AMT
				int sumQty = item.getLoadQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumQty <= 0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0, firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName.lastIndexOf("-") + 1);

					}

					if (!"0".equals(whconfItem.getPkgQty())
							&& !whconfItem.getPkgQty().equals(whconfItem.getDumpPkgQty())) {
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();

						if (sumQty > Integer.parseInt(autowhconfItem.getPkgQty())) {

							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem.setDumpPkgQty(autowhconfItem.getPkgQty());

							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty - Integer.parseInt(autowhconfItem.getPkgQty());

							whGPreName = whName + "(" + minName + "," + ++countG + ")";

						} else if (sumQty == Integer.parseInt(autowhconfItem.getPkgQty())) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumQty = 0;

							whGPreName = whName + "(" + minName + "," + ++countG + ")";

						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumQty = 0;

							whGPreName = whName + "(" + minName + "," + ++countG + ")";

						}
						autoitemList.add(autowhconfItem);
					}
				} // end for
				item.setLocId(whGPreName);
			}
			if (flag.equals("G")) {
				item.setWhConfigurationItems(autoitemList);
			}
		} else {
			WhConfigurationItem autowhconfItem = new WhConfigurationItem();
			if (item.getLoadMt() > 0 && flag.equals("G")) {
				double sumMT = 0.000d;
				sumMT = item.getLoadMt();// Summary AMT

				double sumM3 = item.getLoadM3();// Summary AMT
				int sumQty = item.getQty();// Summary AMT

				double locMt = 0.000d;
				double locM3 = 0.000d;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumMT <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0, firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName.lastIndexOf("-") + 1);
					}

					if (0 != whconfItem.getWgt() && whconfItem.getWgt() != whconfItem.getDumpWgt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						if (sumMT > autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem.setDumpPkgQty(autowhconfItem.getPkgQty());
							double sumAutoMt = 0.000d;
							sumAutoMt = autowhconfItem.getWgt();
							sumMT = ((sumMT * 1000) - (sumAutoMt * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty - Integer.parseInt(autowhconfItem.getPkgQty());
							whGPreName = whName + "(" + minName + "," + ++countG + ")";

						} else if (sumMT == autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0.000d;
							whGPreName = whName + "(" + minName + "," + ++countG + ")";
						} else {
							double sumAutoMt = 0.000d;
							sumAutoMt = autowhconfItem.getWgt();
							locMt = ((sumAutoMt * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem.getPkgQty()) - sumQty;
							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));
							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumMT = 0.000d;
							whGPreName = whName + "(" + minName + "," + ++countG + ")";
						}
						autoitemList.add(autowhconfItem);
					}
				} // end for
				item.setLocId(whGPreName);
			}
			if (flag.equals("G")) {
				item.setWhConfigurationItems(autoitemList);
			}
		}
	}
	
	/*
	 * Check Multiple Cargo Txn
	 * */
	private boolean checkMultiCargoTxn(CargoHandlingOutItem item) throws BizException  {
		
		SearchCargoArrvDelvParm parm = new SearchCargoArrvDelvParm();
		parm.setVslCallId(item.getVslCallId());
		parm.setGateTxnNo(item.getGateTxnNo());
		
		DataItemList resList = cargoArrvDelvDao.checkMultiCargoTxn(parm);
		return (resList.getCollection().size() > 0);
		
	}

	private void insertPakageJobItems(DataItemList insertJobItems) throws BizException  {
		//Package Items
		DataItemList insertPkgItems = new DataItemList();
    	CargoHandlingOutItem item = (CargoHandlingOutItem)insertJobItems.get(0);
        ArrayList pkgLists = (ArrayList) item.getPackageItems();
        if (pkgLists.size() > 0) {
        	  for (int j = 0; j < pkgLists.size(); j++) {
                  PackageJobItem pkgItem = (PackageJobItem) pkgLists.get(j);
                  pkgItem.setJobNo(item.getJobNo());
                  pkgItem.setJobTpCd(item.getJobTpCd());
                  pkgItem.setJobPurpCd(item.getJobPurpCd());
                  pkgItem.setOpeClassCd(item.getCatgCd());
                  pkgItem.setVslCd(item.getVslCd());
                  pkgItem.setCallSeq(item.getCallSeq());
                  pkgItem.setCallYear(item.getCallYear());
                  pkgItem.setPkgTpCd(item.getPkgTpCd());
                  pkgItem.setUserId(item.getUserId());
                  
                  insertPkgItems.add(pkgItem);
        	  }
        	  
        	  if(insertPkgItems.size() > 0) {
        		  cargoHandlingOutDao.insertPackageJobItems(insertPkgItems);
        	  }
        }
	}
}
