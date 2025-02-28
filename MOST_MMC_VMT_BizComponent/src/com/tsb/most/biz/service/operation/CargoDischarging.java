package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.dataitem.configuration.WhConfigurationItem;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.operation.ICargoArrvDelvDao;
import com.tsb.most.biz.dao.operation.ICargoDischargingDao;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dao.operation.IHangingScaleDao;
import com.tsb.most.biz.dao.operation.IOperationSettingDao;
import com.tsb.most.biz.dataitem.operation.CargoArrvDelvItem;
import com.tsb.most.biz.dataitem.operation.CargoDischargingItem;
import com.tsb.most.biz.dataitem.operation.HangingScaleItem;
import com.tsb.most.biz.dataitem.operation.OperationSettingItem;
import com.tsb.most.biz.dataitem.operation.PackageJobItem;
import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.biz.parm.operation.SearchCargoDischargingParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchHangingScaleParm;
import com.tsb.most.biz.parm.operation.SearchOperationSettingParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class CargoDischarging extends MOSTBaseService implements ICargoDischarging {
	private ICargoDischargingDao cargoDischargingDao;
	private ICodeMasterDao codeMasterDao;
	private IOperationSettingDao operationSettingDao;
	private ICargoMasterDao cargoMasterDao;
	private ICargoArrvDelvDao cargoArrvDelvDao;
	private IHangingScaleDao hangingScaleDao;

	public void setCargoArrvDelvDao(ICargoArrvDelvDao cargoArrvDelvDao) {
		this.cargoArrvDelvDao = cargoArrvDelvDao;
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

	public void setCargoDischargingDao(ICargoDischargingDao cargoDischargingDao) {
		this.cargoDischargingDao = cargoDischargingDao;
	}
	
	public void setHangingScaleDao(IHangingScaleDao hangingScaleDao) {
		this.hangingScaleDao = hangingScaleDao;
	}

	public DataItemList selectCargoDischargingOfBarge(SearchCargoDischargingParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		CargoDischargingItem returnItem = new CargoDischargingItem();
		returnItem.setItems((ArrayList<CargoDischargingItem>) cargoDischargingDao.selectCargoDischargingOfBarge(parm).getCollection());
		
		itemList.add(returnItem);
		return itemList;
	}
	
	public DataItemList selectCargoDischargingList(SearchCargoDischargingParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		CargoDischargingItem returnItem = new CargoDischargingItem();
		SearchOperationSettingParm opParm = new SearchOperationSettingParm();
		opParm.setShftDt(parm.getShftDt());
		opParm.setShftId(parm.getShftId());
		opParm.setCgTpCd(parm.getCgTpCd());
		opParm.setVslCallId(parm.getVslCallId());
		
		if (!"LOADCDMSTER".equals(parm.getHhtFlags())) {
			returnItem.setItems((ArrayList<CargoDischargingItem>)cargoDischargingDao.selectCargoDischargingList(parm).getCollection());
			
			if (!"LOADCARGO".equals(parm.getHhtFlags())) {
				returnItem.setHatchNoList(operationSettingDao.selectOpHatchList(opParm).getCollection());
			}
		}
		
		if (!"LOADCARGO".equals(parm.getHhtFlags())) {
			if ("LOADCDMSTER".equals(parm.getHhtFlags())
					|| "1STLD".equals(parm.getHhtFlags())) {
				SearchCodeMasterParm partyCode;
				
				partyCode = new SearchCodeMasterParm();
				partyCode.setLcd(CodeConstant.LCD_MOST);
				partyCode.setMcd(CodeConstant.MCD_MT_TSPTTP); // event type
				partyCode.setCol2(CodeConstant.LCD_MOST);
				returnItem.setModeOfOprList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
				
				partyCode = new SearchCodeMasterParm();
				partyCode.setLcd(CodeConstant.LCD_MOST);
				partyCode.setMcd(CodeConstant.MCD_MT_DELVTP); // event type
				returnItem.setDeliveryList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
				
				// Get Cargo Type code
				partyCode = new SearchCodeMasterParm();
				partyCode.setLcd(CodeConstant.LCD_MOST);
				partyCode.setMcd(CodeConstant.MCD_MT_CGTP);
				returnItem.setCargoTypeList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
				
				returnItem.setHatchNoList(operationSettingDao.selectOpHatchList(opParm).getCollection());
			}
		}
		itemList.add(returnItem);
		return itemList;
	}
	
	public DataItemList selectCargoDischargingHatchList(SearchOperationSettingParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		OperationSettingItem returnItem = new OperationSettingItem();

		parm.setCgTpCd("BBK");
		returnItem.setBbkOpHatchList(operationSettingDao.selectOpHatchList(parm).getCollection());
		
		parm.setCgTpCd("DBK");
		returnItem.setDbkOpHatchList(operationSettingDao.selectOpHatchList(parm).getCollection());

		itemList.add(returnItem);
		return itemList;
	}
	
	public DataItemList selectOperationSetHatch(SearchOperationSettingParm parm) throws BizException {
		return operationSettingDao.selectOperationSetHatch(parm);
	}
	public DataItemList updateCargoDischarging_bk(UpdateItemsBizParm parm) throws BizException {
		// /ApronCheck(); direct Cargo
        // WhCheck(); -- handling In - indirect Cargo
        // (1) Dircet Cargo
        /*
         * JOBPURP(VG), JOBTP(DS)
         */
        // (2) InDirect Cargo
        /*
         * 1. GENERAL a. JOBPURP(VA), JOBTP(DS) b. SETLOCATION setting, When job
         * monitoring list implement i. JOBPURP(AW), JOBTP(LF) - LOCATION ii.
         * selected VA's jobPurposeCd setLOCATION. 2. GENERAL + Damage - first
         * JOB operation(2) a. GENERAL i. JOBPURP(VA), JOBTP(DS) ii. SETLOCATION
         * setting i. JOBPURP(AW), JOBTP(LF) - LOCATION ii. selected VA's
         * jobPurposeCd setLOCATION. b. DMG i. JOBPURP(VA), JOBTP(DS) + DMG
         * CHECK ii. SETLOCATION setting i. JOBPURP(AW), JOBTP(LF) - LOCATION
         * ii.selected VA's jobPurposeCd setLOCATION.
         */
    	DataItemList response = new DataItemList();
        CargoDischargingItem masterItem = (CargoDischargingItem)parm.getUpdateItem();
        
        if("VB".equals(masterItem.getJobPurpCd()) || "AB".equals(masterItem.getJobPurpCd())) {
        	//Barge Operation
        	updateForBargeOperation(parm);
        } else {
        	DataItemList items = new DataItemList();
            items.add(masterItem);

            CargoDischargingItem mstItem = null;
            CargoDischargingItem jobItem = null;
            CargoDischargingItem delvItem = null;
            CargoDischargingItem balItem = null;
            CargoDischargingItem invLocItem = null;

            SearchCargoMasterParm mstParm;

            DataItemList insertItems = new DataItemList();
            DataItemList updateItems = new DataItemList();
            DataItemList deleteItems = new DataItemList();
            DataItemList updateDischaringAmts = new DataItemList();

            DataItemList insertJobItems = new DataItemList();

            DataItemList insertDelvItems = new DataItemList();
            DataItemList updateDelvItems = new DataItemList();

            DataItemList insertBalItems = new DataItemList();

            DataItemList insertInvLocItems = new DataItemList();// INV_LOC
            DataItemList updateDischaringFinalItems = new DataItemList();

            String jobGroupNo = null;
            for (int i = 0; i < items.size(); i++) {
                CargoDischargingItem item = (CargoDischargingItem) items.get(i);
                
                String uuid = UUID.randomUUID().toString();
                item.setNewVersion(uuid);
                
                if (item.getCrud() != null
                        && !item.getCrud().equals(DAOProcessType.QUERY)) {
                    if (item.getCrud().equals(DAOProcessType.INSERT)) {
                        mstParm = new SearchCargoMasterParm();
                        mstParm.setVslCallId(item.getVslCallId());
                        if (i == 0) {
                            jobGroupNo = cargoMasterDao.selectJobGroupNo(mstParm);

                        }
                        item.setJobGroup(jobGroupNo);
                        /**
                         * *****************DIRECT Cargo TMT_JOB, TMT_CG_MST,
                         * TMT_CG_ARRV_DELV********
                         */
                        if (item.getOpDelvTpCd().equals("D")) {

                            mstParm.setCgNo(item.getCgNo());
                            mstParm.setVslCallId(item.getVslCallId());
                            mstParm.setLorryNo(item.getLorryId());
                            mstParm.setCgInOutCd("O");

                            if (item.getOpDelvTpCd().equals("D")) {
                                // LoadQty
                                item.setPkgQty(item.getLoadQty());
                                item.setWgt(item.getLoadMt());
                                item.setMsrmt(item.getLoadM3());
                                /** ** Check Actual Delivery code ************ */
                                String actualDelv = cargoMasterDao.selectActualDelvTpCd(mstParm);
                                if (actualDelv != null) {
                                    if (!actualDelv.equals(item.getOpDelvTpCd())) {
                                        item.setOpDelvTpCd("B");
                                    }
                                }

                                /** *****************End Actual Delivery Code ** */

                                /** * Check W/H Final_YN************************* */
                                if (cargoMasterDao.selectIsWHFinalCheck(mstParm)) {
                                    item.setWhFnlDelvYn("Y");
                                } else {
                                    item.setWhFnlDelvYn("N");
                                }
                                /** ******************END Check W/H Final_YN *** */

                                /** *****Check Stat_cd ************************* */

                                /** **********************END Check Stat_cd******* */
                            }
                            // if cargo exist
                            if (cargoMasterDao.selectIsCargoMst(mstParm)) {
                                // FinalDs
                                // finalDischargingChk(mstItem, item);
                                if (item.getFnlOpeYn().equals("Y")
                                        || item.getFnlOpeYn().equals("true")) {// if // finalOpe // true // -- // discharging
                                    if (item.getWhFnlDelvYn().equals("N")
                                            && item.getOpDelvTpCd().equals("D")) {
                                        item.setStat("DV");// StatCd
                                        item.setDisEndDt(item.getEndDt());
                                        item.setDisEndDtStr(item.getEndDtStr());
                                    } else if (item.getWhFnlDelvYn().equals("Y")
                                            && item.getOpDelvTpCd().equals("B")) {
                                        item.setStat("DV");
                                        item.setDisEndDt(item.getEndDt());
                                        item.setDisEndDtStr(item.getEndDtStr());
                                    } else if (item.getWhFnlDelvYn().equals("N")) {
                                        item.setStat("ST");// StateCd
                                        item.setDisEndDt(item.getEndDt());
                                        item.setDisEndDtStr(item.getEndDtStr());
                                    }
                                } else {
                                    item.setStat("OD");
                                }
                                if("AG".equalsIgnoreCase(item.getJobPurpCd())) {
                                	item.setPkgQty(0);
                                	item.setWgt(0);
                                	item.setMsrmt(0);
                                }
                                updateItems.add(item);
                                if (item.getFnlOpeYn().equals("Y")
                                        || item.getFnlOpeYn().equals("true")) {
       
                                    item.setDisEndDt(item.getEndDt());
                                    item.setDisEndDtStr(item.getEndDtStr());
                                    updateDischaringFinalItems.add(item);
                                }
                            } else {
                                if (item.getFnlOpeYn().equals("Y")
                                        || item.getFnlOpeYn().equals("true")) {

                                    if (item.getWhFnlDelvYn().equals("N")
                                            && item.getOpDelvTpCd().equals("D")) {
                                        item.setStat("DV");// StatCd
                                        item.setDisEndDt(item.getEndDt());
                                        item.setDisEndDtStr(item.getEndDtStr());
                                    } else if (item.getWhFnlDelvYn().equals("Y")
                                            && item.getOpDelvTpCd().equals("B")) {
                                        item.setStat("DV");
                                        item.setDisEndDt(item.getEndDt());
                                        item.setDisEndDtStr(item.getEndDtStr());
                                    } else if (item.getWhFnlDelvYn().equals("N")) {
                                        item.setStat("ST");
                                        item.setDisEndDt(item.getEndDt());
                                        item.setDisEndDtStr(item.getEndDtStr());
                                    }
                                } else {
                                    item.setStat("OD");// it is not final-OP
                                }
                                if (!(item.getDmgWgt() == 0 && item.getDmgM3() == 0 && item
                                        .getDmgQty() == 0)) {
                                    item.setDmgYn("Y");
                                }
                                insertItems.add(item);
                                if (item.getFnlOpeYn().equals("Y")
                                        || item.getFnlOpeYn().equals("true")) {
                                    item.setDisEndDt(item.getEndDt());
                                    item.setDisEndDtStr(item.getEndDtStr());
                                    updateDischaringFinalItems.add(item);
                                }
                            }

                            // TMT_JOB
                            jobItem = (CargoDischargingItem) item.clone();// Direct
                            jobItem.setPkgQty(item.getLoadQty());
                            jobItem.setWgt(item.getLoadMt());
                            jobItem.setMsrmt(item.getLoadM3());
                            jobItem.setLorryId(item.getLorryId());
                            jobItem.setShftId(item.getShftId());
                            jobItem.setJobTpCd("DS");
                            jobItem.setDelvTpCd("D");
                            jobItem.setStat("COM");
                            if (item.getFnlOpeYn().equals("Y")
                                    && item.getEndDt() != null) {// if finalOpe

                                jobItem.setFnlOpeYn("Y");
                            }

                            jobItem.setJobCoCd("G");
                            insertJobItems.add(jobItem);

                            /*******************************************************
                             * TMT_CG_ARRV_DELV IF FINAL_DELV =Y, STAT_CD=DV INSERT
                             * -1 LORRY INSERT Checked cg_no, vsl_call_id check if
                             * tmt_cg_arrv_delv does exist ==> update not exist ==>
                             * insert
                             ******************************************************/
                            delvItem = (CargoDischargingItem) item.clone();
                            delvItem.setJobCoCd("G");
                            delvItem.setJobTpCd("DS");
                            delvItem.setDelvTpCd("D");
                            delvItem.setCgInOutCd("O");

                            // CONDITION
                            /*
                             * VSL_CALL_ID = #vslCallId# CG_IN_OUT_CD = #cgInOutCd#
                             * CG_NO = #cgNo# LORRY_NO = #lorryNo# GATE_PASS_NO IS
                             * NULL
                             */
                            if (cargoMasterDao.selectIsCargoAvDvChk(mstParm)) {
                                if (jobItem.getFnlDelvYn() != null
                                        && (jobItem.getFnlDelvYn().equals("Y")
                                        || jobItem.getFnlDelvYn().equals("true") ) ) {
                                    delvItem.setFnlYn("Y");
                                    updateDelvItems.add(delvItem);
                                } else {
                                    updateDelvItems.add(delvItem);
                                }
                            } else {
                                if (jobItem.getFnlDelvYn() != null
                                        && jobItem.getFnlDelvYn().equals("Y")) {
                                    delvItem.setFnlYn("Y");
                                    insertDelvItems.add(delvItem);
                                } else {
                                    insertDelvItems.add(delvItem);
                                }
                            }
                            // END Direct
                            // /InDirect
                        } else if (item.getOpDelvTpCd().equals("I")){// first INDIRECT TMT_JOB, TMT_CG_MST, TMT_CG_BAL
                            // (insert) - 1
                            // Indirect this cargos does update from remove cargo
                            // after INDIRECT TMT_JOB, TMT_CG_MST, TMT_CG_BAL
                            // (update) - 2
                            delvItem = (CargoDischargingItem) item.clone();
                            balItem = (CargoDischargingItem) item.clone();

                            // TMT_CG_MST
                            mstParm.setCgNo(item.getCgNo());
                            mstParm.setVslCallId(item.getVslCallId());
                            mstParm.setLorryNo(item.getLorryId());
                            mstParm.setCgInOutCd("O");

                            if (!(item.getDmgWgt() == 0 && item.getDmgM3() == 0 && item
                                    .getDmgQty() == 0)) {
                                item.setDmgYn("Y");
                            } else {
                                item.setDmgYn("N");
                            }

                            mstItem = (CargoDischargingItem) item.clone();

                            mstItem.setPkgQty(item.getWhQty());
                            mstItem.setWgt(item.getWhWgt());
                            mstItem.setMsrmt(item.getWhM3());

                            String actualDelv = cargoMasterDao.selectActualDelvTpCd(mstParm);
                            /** ** Check Actual Delivery code ************ */
                            if (actualDelv != null) {
                                if (!actualDelv.equals(item.getOpDelvTpCd())) {
                                    mstItem.setOpDelvTpCd("B");
                                }
                            }

                            /** **********************************END* */
                            /** * Check W/H Final_YN************************* */

                            /** **********************************END* */

                            /** *************Final Discharging Check */

                            if (item.getFnlOpeYn().equals("Y")) {
                                mstItem.setStat("DD");
                                mstItem.setWhFnlDelvYn("N");
                            } else {
                                mstItem.setStat("OD");
                                mstItem.setWhFnlDelvYn("N");
                            }

                            /** **********************************END* */
                            if (cargoMasterDao.selectIsCargoMstHOStDt(mstParm)) {
                                mstItem.setHdlInEndDt(item.getEndDt());// existing
                                mstItem.setHdlInEndDtStr(item.getEndDtStr());// existing
                                // start-Time
                            } else {
                                mstItem.setHdlInStDt(item.getStartDt());
                                mstItem.setHdlInEndDt(item.getEndDt());
                                mstItem.setHdlInStDtStr(item.getStartDtStr());
                                mstItem.setHdlInEndDtStr(item.getEndDtStr());
                            }

                            if (cargoMasterDao.selectIsCargoMst(mstParm)) {
                                
                            	if("AG".equalsIgnoreCase(item.getJobPurpCd())) {
                            		mstItem.setPkgQty(0);
                            		mstItem.setWgt(0);
                            		mstItem.setMsrmt(0);
                                }
                            	updateItems.add(mstItem);
                                
                                if (item.getFnlOpeYn().equals("Y")
                                        || item.getFnlOpeYn().equals("true")) {// if finalOpe true  discharging
                                    item.setDisEndDt(item.getEndDt());
                                    item.setDisEndDtStr(item.getEndDtStr());
                                    updateDischaringFinalItems.add(item);
                                }
                            } else {
                                insertItems.add(mstItem);
                                if (item.getFnlOpeYn().equals("Y")
                                        || item.getFnlOpeYn().equals("true")) {
                                    item.setDisEndDt(item.getEndDt());
                                    item.setDisEndDtStr(item.getEndDtStr());
                                    updateDischaringFinalItems.add(item);
                                }
                            }

                            // TMT_JOB -1 jobTpCd(DS),jobpurpcd(VW)

                            CargoDischargingItem jobGeneralItem;
                            if (item.getCgTpCd() != null) {
                                if (item.getCgTpCd().equals("BBK")
                                        && !(item.getWhWgt() == 0
                                                && item.getWhM3() == 0 && item
                                                .getWhQty() == 0)) {
                                    jobGeneralItem = (CargoDischargingItem) item
                                            .clone();
                                    jobGeneralItem.setPkgQty(item.getWhQty());
                                    jobGeneralItem.setWgt(item.getWhWgt());
                                    jobGeneralItem.setMsrmt(item.getWhM3());
                                    jobGeneralItem.setJobTpCd("DS");
                                    jobGeneralItem.setStat("COM");
                                    jobGeneralItem.setDelvTpCd("I");
                                    jobGeneralItem.setDmgYn("N");
                                    jobGeneralItem.setHhtChk("N");
                                    jobGeneralItem.setJobCoCd("G");
                                    jobGeneralItem.setShftId(item.getShftId());
                                    insertJobItems.add(jobGeneralItem);

                                } else if ((item.getCgTpCd().equals("DBE")
                                        || item.getCgTpCd().equals("DBN") || item
                                        .getCgTpCd().equals("DBK"))
                                        && !(item.getWhWgt() == 0
                                                && item.getWhM3() == 0 && item
                                                .getWhQty() == 0)) {

                                    jobGeneralItem = (CargoDischargingItem) item
                                            .clone();
                                    jobGeneralItem.setPkgQty(item.getWhQty());
                                    jobGeneralItem.setWgt(item.getWhWgt());
                                    jobGeneralItem.setMsrmt(item.getWhM3());
                                    jobGeneralItem.setJobTpCd("DS");
                                    jobGeneralItem.setStat("COM");
                                    jobGeneralItem.setDelvTpCd("I");
                                    jobGeneralItem.setDmgYn("N");
                                    jobGeneralItem.setJobCoCd("G");
                                    insertJobItems.add(jobGeneralItem);
                                }

                                // /TMT_CG_BAL - BBK
                                if (item.getCgTpCd().equals("BBK")
                                        && !(item.getDmgWgt() == 0
                                                && item.getDmgM3() == 0 && item
                                                .getDmgQty() == 0)) {
                                    balItem = (CargoDischargingItem) item.clone();
                                    if (item.getOverChk()) {
                                        balItem.setBalStatCd("OVR");

                                    } else {
                                        balItem.setBalStatCd("DMG");
                                    }

                                    balItem.setMsrmt(item.getDmgM3());
                                    balItem.setWgt(item.getDmgWgt());
                                    balItem.setPkgQty(item.getDmgQty());

                                    updateDischaringAmts.add(balItem);// Add AMT
                                    // DMG
                                    insertBalItems.add(balItem);

                                    // Damage jobItem
                                    CargoDischargingItem jobDmgItem = (CargoDischargingItem) item
                                            .clone();
                                    jobDmgItem.setPkgQty(item.getDmgQty());
                                    jobDmgItem.setWgt(item.getDmgWgt());
                                    jobDmgItem.setMsrmt(item.getDmgM3());
                                    jobDmgItem.setDmgYn("Y");
                                    jobDmgItem.setJobTpCd("DS");
                                    jobDmgItem.setStat("COM");
                                    jobDmgItem.setDelvTpCd("I");
                                    jobDmgItem.setHhtChk("N");
                                    jobDmgItem.setJobCoCd("D");
                                    insertJobItems.add(jobDmgItem);

                                    if (item.getHhtChk().equals("Y")) {
                                        jobDmgItem = (CargoDischargingItem) item
                                                .clone();
                                        jobDmgItem.setPkgQty(item.getDmgQty());
                                        jobDmgItem.setWgt(item.getDmgWgt());
                                        jobDmgItem.setMsrmt(item.getDmgM3());
                                        jobDmgItem.setToLocId(item.getDmgLocId());
                                        jobDmgItem.setDmgYn("Y");
                                        jobDmgItem.setJobTpCd("LF");
                                        jobDmgItem.setStat("COM");
                                        jobDmgItem.setDelvTpCd("I");
                                        jobDmgItem.setJobCoCd("D");
                                        insertJobItems.add(jobDmgItem);

                                        /** *********** inv Location ***** */
                                        ArrayList invLocLists = (ArrayList) jobDmgItem.getWhConfigurationItems();
                                        
                                        // CargoDischargingItem invLocItem;
                                        if (invLocLists.size() > 0) {
                                            for (int j = 0; j < invLocLists.size(); j++) {
                                                invLocItem = (CargoDischargingItem) jobDmgItem
                                                        .clone();
                                                WhConfigurationItem whconfItem = (WhConfigurationItem) invLocLists.get(j);
                                                if ("D".equals(whconfItem
                                                        .getWhTpCd())) {
                                                    invLocItem.setJobNo("");
                                                    invLocItem.setLocArea(jobDmgItem.getDmgLocId());
                                                    invLocItem.setLocId(whconfItem.getLocId());
                                                    invLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
                                                    invLocItem.setLocWgt(whconfItem.getWgt());
                                                    invLocItem.setLocMsrmt(whconfItem.getMsrmt());
                                                    invLocItem.setWhTpCd(whconfItem.getWhTpCd());
                                                    insertInvLocItems.add(invLocItem);
                                                }
                                            }
                                        }// end invloc                               

                                    }

                                } else if ((item.getCgTpCd().equals("DBE")|| item.getCgTpCd().equals("DBN")||item.getCgTpCd().equals("DBK"))
                                        && !(item.getDmgWgt() == 0 && item.getDmgM3() == 0 && item.getDmgQty() == 0)) {
                                    balItem = (CargoDischargingItem) item.clone();
                                    if (item.getOverChk()) {
                                        balItem.setBalStatCd("OVR");

                                    } else {
                                        balItem.setBalStatCd("DMG");
                                    }

                                    balItem.setMsrmt(item.getDmgM3());
                                    balItem.setWgt(item.getDmgWgt());
                                    balItem.setPkgQty(item.getDmgQty());

                                    updateDischaringAmts.add(balItem);// Add AMT
                                    // DMG
                                    insertBalItems.add(balItem);

                                    // Damage jobItem
                                    CargoDischargingItem jobDmgItem = (CargoDischargingItem) item.clone();
                                    jobDmgItem.setPkgQty(item.getDmgQty());
                                    jobDmgItem.setWgt(item.getDmgWgt());
                                    jobDmgItem.setMsrmt(item.getDmgM3());
                                    jobDmgItem.setDmgYn("Y");
                                    jobDmgItem.setJobTpCd("DS");
                                    jobDmgItem.setStat("COM");
                                    jobDmgItem.setDelvTpCd("I");
                                    jobDmgItem.setJobCoCd("D");

                                    jobDmgItem.setHhtChk("N");
                                    insertJobItems.add(jobDmgItem);

                                    if (item.getHhtChk().equals("Y")) {
                                        jobDmgItem = (CargoDischargingItem) item.clone();
                                        jobDmgItem.setPkgQty(item.getDmgQty());
                                        jobDmgItem.setWgt(item.getDmgWgt());
                                        jobDmgItem.setMsrmt(item.getDmgM3());
                                        jobDmgItem.setToLocId(item.getDmgLocId());
                                        jobDmgItem.setDmgYn("Y");
                                        jobDmgItem.setJobTpCd("LF");// DS
                                        jobDmgItem.setJobPurpCd("AW");
                                        jobDmgItem.setStat("COM");
                                        jobDmgItem.setDelvTpCd("I");
                                        jobDmgItem.setJobCoCd("D");
                                        insertJobItems.add(jobDmgItem);

                                        /** *********** inv Location ***** */
                                        ArrayList invLocLists = (ArrayList) jobDmgItem.getWhConfigurationItems();
                                        
                                        // CargoDischargingItem invLocItem;
                                        if (invLocLists.size() > 0) {
                                            for (int j = 0; j < invLocLists.size(); j++) {
                                                invLocItem = (CargoDischargingItem) jobDmgItem.clone();
                                                WhConfigurationItem whconfItem = (WhConfigurationItem) invLocLists.get(j);
                                                
                                                if ("D".equals(whconfItem.getWhTpCd())) {
                                                    invLocItem.setJobNo("");
                                                    invLocItem.setLocArea(jobDmgItem .getDmgLocId());
                                                    invLocItem.setLocId(whconfItem.getLocId());
                                                    invLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
                                                    invLocItem.setLocWgt(whconfItem.getWgt());
                                                    invLocItem.setLocMsrmt(whconfItem.getMsrmt());
                                                    invLocItem.setWhTpCd(whconfItem.getWhTpCd());
                                                    insertInvLocItems.add(invLocItem);
                                                }
                                            }
                                        }// end invloc
                                    }
                                }
                            }
                        }
                    } else if (item.getCrud().equals(DAOProcessType.UPDATE)) {
                        updateItems.add(item);
                    } else if (item.getCrud().equals(DAOProcessType.DELETE)) {
                        deleteItems.add(item);
                    }
                }
            }

            if (insertItems.size() > 0) {
            	cargoDischargingDao.insertCargoDischargingItems(insertItems);
            }

            if (updateItems.size() > 0) {
            	cargoDischargingDao.updateCargoDischargingItems(updateItems);
            }

            if (updateDischaringAmts.size() > 0) {
            	cargoDischargingDao.updateDischaringAmts(updateDischaringAmts);
            }

            if (insertJobItems.size() > 0) {
            	cargoDischargingDao.insertJobItems(insertJobItems);
            	cargoDischargingDao.updateCargoMasterStatus(insertJobItems);// updateStaus
            	cargoDischargingDao.updateCargoMasterInfo(insertJobItems);// updateStaus
            	
            	//processOperationTime((CargoDischargingItem)insertJobItems.getCollection().get(0));
            	response.add(insertJobItems);
            }

            if (insertDelvItems.size() > 0) {
                for (int i = 0; i < insertDelvItems.size(); i++) {
                    CargoDischargingItem item = (CargoDischargingItem) insertDelvItems.get(i);

                    // Get gate pass numer
                    SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
                    gpParm.setVslCallId(item.getVslCallId());
                    List gpList = cargoArrvDelvDao.selectGatepassNo(gpParm).getCollection();
                    if (gpList != null && gpList.size() > 0) {
                        CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
                        item.setGatePassNo(gpItem.getGatePassNo());
                        response.add(gpList);
                    }

                    // Insert processing
                    DataItemList tmpArrvDelvItems = new DataItemList();
                    tmpArrvDelvItems.add(item);
                    cargoDischargingDao.insertDelvItems(tmpArrvDelvItems);
                }
            }

            if (updateDelvItems.size() > 0) {
                for (int i = 0; i < updateDelvItems.size(); i++) {
                    CargoDischargingItem item = (CargoDischargingItem) updateDelvItems.get(i);

                    // Get gate pass numer
                    SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
                    gpParm.setVslCallId(item.getVslCallId());
                    List gpList = cargoArrvDelvDao.selectGatepassNo(gpParm).getCollection();
                    if (gpList != null && gpList.size() > 0) {
                        CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
                        item.setGatePassNo(gpItem.getGatePassNo());
                        response.add(gpList);
                    }

                    // Update processing
                    DataItemList tmpArrvDelvItems = new DataItemList();
                    tmpArrvDelvItems.add(item);
                    cargoDischargingDao.updateDelvItems(tmpArrvDelvItems);
                }
            }

            if (insertBalItems.size() > 0) {
            	cargoDischargingDao.insertBalItems(insertBalItems);
            }

            if (insertInvLocItems.size() > 0) {
            	cargoDischargingDao.insertCargoInvLocationItems(insertInvLocItems);
            }

            if (updateDischaringFinalItems.size() > 0) {
            	cargoDischargingDao.updateDischaringFinals(updateDischaringFinalItems);
            }
            
            //Package Items
            insertPakageJobItems(insertJobItems);
        }
      
        return response;
	}
	
	public DataItemList updateCargoDischarging(UpdateItemsBizParm parm) throws BizException {
    	DataItemList response = new DataItemList();
        CargoDischargingItem masterItem = (CargoDischargingItem)parm.getUpdateItem();
        
        DataItemList items = new DataItemList();
        items.add(masterItem);

        CargoDischargingItem jobItem = null;
        CargoDischargingItem delvItem = null;

        SearchCargoMasterParm mstParm;

        DataItemList insertItems = new DataItemList();
        DataItemList updateItems = new DataItemList();
        DataItemList deleteItems = new DataItemList();
        DataItemList insertJobItems = new DataItemList();
        DataItemList updateDelvItems = new DataItemList();
        DataItemList updateDischaringFinalItems = new DataItemList();

        String jobGroupNo = null;
        if(items.size() > 0) {
        	 mstParm = new SearchCargoMasterParm();
        	 
        	 CargoDischargingItem tmp = (CargoDischargingItem) items.get(0);
             mstParm.setVslCallId(tmp.getVslCallId());
             jobGroupNo = cargoMasterDao.selectJobGroupNo(mstParm);
             
             for (int i = 0; i < items.size(); i++) {
             	CargoDischargingItem item = (CargoDischargingItem) items.get(i);
                 
                 String uuid = UUID.randomUUID().toString();
                 item.setNewVersion(uuid);
                 if (item.getCrud() != null
                         && !item.getCrud().equals(DAOProcessType.QUERY)) {
                     if (item.getCrud().equals(DAOProcessType.INSERT)) {
                    	 item.setJobGroup(jobGroupNo);
                    	 
                    	 //Confirm amount
                    	 item.setPkgQty(item.getLoadQty());
                         item.setWgt(item.getLoadMt());
                         item.setMsrmt(item.getLoadM3());
                         
                         if (item.getFnlOpeYn().equals("Y")
                                 || item.getFnlOpeYn().equals("true")) {
                        	 item.setStat("DV");
                             item.setDisEndDt(item.getEndDt());
                             item.setDisEndDtStr(item.getEndDtStr());
                             
                             updateDischaringFinalItems.add(item);
                         } else {
                             item.setStat("OD");
                         }
                    	 
                		 mstParm.setCgNo(item.getCgNo());
                         mstParm.setVslCallId(item.getVslCallId());
                         mstParm.setLorryNo(item.getLorryNo());
                         mstParm.setCgInOutCd("O");
                         mstParm.setGateTxnNo(item.getGateTxnNo());
                         
                         //TMT_CG_MST
                         if (cargoMasterDao.selectIsCargoMst(mstParm)) {
                        	 updateItems.add(item);
                         } else {
                        	 insertItems.add(item);
                         }
                         
                         //TMT_JOB
                         jobItem = (CargoDischargingItem) item.clone();
                         jobItem.setPkgQty(item.getLoadQty());
                         jobItem.setWgt(item.getLoadMt());
                         jobItem.setMsrmt(item.getLoadM3());
                         jobItem.setJobTpCd("DS");
                         jobItem.setDelvTpCd(item.getOpDelvTpCd());
                         jobItem.setStat("COM");
                         jobItem.setJobCoCd("G");
                         if (item.getFnlOpeYn().equals("Y")
                                 && item.getEndDt() != null) {

                             jobItem.setFnlOpeYn("Y");
                         }
                         insertJobItems.add(jobItem);
                         
                         //TMT_CG_ARRV_DELV
                         if (cargoMasterDao.selectIsCargoAvDvChk(mstParm)){
                        	 delvItem = (CargoDischargingItem) item.clone();
                        	 delvItem.setCgInOutCd("O");
                        	 
                        	// Get gate pass numer
                             SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
                             gpParm.setVslCallId(item.getVslCallId());
                             List gpList = cargoArrvDelvDao.selectGatepassNo(gpParm).getCollection();
                             if (gpList != null && gpList.size() > 0) {
                                 CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
                                 delvItem.setGatePassNo(gpItem.getGatePassNo());
                             }
                             
                        	 updateDelvItems.add(delvItem);
                         }
                     }  else if (item.getCrud().equals(DAOProcessType.UPDATE)) {
                         updateItems.add(item);
                     } else if (item.getCrud().equals(DAOProcessType.DELETE)) {
                         deleteItems.add(item);
                     }
                 }
             }
        }
        
        if (insertItems.size() > 0) {
        	cargoDischargingDao.insertCargoDischargingItems(insertItems);
        }

        if (updateItems.size() > 0) {
        	cargoDischargingDao.updateCargoDischargingItems(updateItems);
        }
        
        if (insertJobItems.size() > 0) {
        	cargoDischargingDao.insertJobItems(insertJobItems);
        	cargoDischargingDao.updateCargoMasterStatus(insertJobItems);// updateStaus
        	cargoDischargingDao.updateCargoMasterInfo(insertJobItems);// updateStaus
        }
        
        if (updateDelvItems.size() > 0) {
        	cargoDischargingDao.updateDelvItems(updateDelvItems);
        }
        
        if (updateDischaringFinalItems.size() > 0) {
        	cargoDischargingDao.updateDischaringFinals(updateDischaringFinalItems);
        }
        
        //Package Items
        insertPakageJobItems(insertJobItems);
        
        //Hanging scale UPDATE
        updateHangingScaleItems(insertJobItems);

        response.add(insertJobItems);
        return response;
	}
	
	public DataItemList updateForBargeOperation(UpdateItemsBizParm parm) throws BizException {
    	DataItemList response = new DataItemList();
        CargoDischargingItem masterItem = (CargoDischargingItem)parm.getUpdateItem();
        DataItemList items = new DataItemList();
        items.add(masterItem);

        CargoDischargingItem jobItem = null;

        SearchCargoMasterParm mstParm;

        DataItemList insertItems = new DataItemList();
        DataItemList updateItems = new DataItemList();
        DataItemList deleteItems = new DataItemList();
        DataItemList updateDischaringAmts = new DataItemList();
        DataItemList insertJobItems = new DataItemList();
        DataItemList updateDischaringFinalItems = new DataItemList();

        String jobGroupNo = null;
        for (int i = 0; i < items.size(); i++) {
            CargoDischargingItem item = (CargoDischargingItem) items.get(i);
            String uuid = UUID.randomUUID().toString();
            item.setNewVersion(uuid);
            
            if (item.getCrud() != null
                    && !item.getCrud().equals(DAOProcessType.QUERY)) {
                if (item.getCrud().equals(DAOProcessType.INSERT)) {
                    mstParm = new SearchCargoMasterParm();
                    mstParm.setVslCallId(item.getVslCallId());
                    if (i == 0) {
                        jobGroupNo = cargoMasterDao.selectJobGroupNo(mstParm);

                    }
                    item.setJobGroup(jobGroupNo);
                    
                    mstParm.setCgNo(item.getCgNo());
                    mstParm.setVslCallId(item.getVslCallId());

                    // if cargo exist
                    if (cargoMasterDao.selectIsCargoMst(mstParm)) {
                        // FinalDs
                        if (item.getFnlOpeYn().equals("Y")
                                || item.getFnlOpeYn().equals("true")) {
                        	item.setStat("DV");
                            item.setDisEndDt(item.getEndDt());
                            item.setDisEndDtStr(item.getEndDtStr());
                        } else {
                            item.setStat("OD");
                        }

                        updateItems.add(item);
                        if (item.getFnlOpeYn().equals("Y")
                                || item.getFnlOpeYn().equals("true")) {
                            item.setDisEndDt(item.getEndDt());
                            item.setDisEndDtStr(item.getEndDtStr());
                            updateDischaringFinalItems.add(item);
                        }
                    } else {
                        // if final discharging
                        if (item.getFnlOpeYn().equals("Y")
                                || item.getFnlOpeYn().equals("true")) {
                        	 item.setStat("DV");
                             item.setDisEndDt(item.getEndDt());
                             item.setDisEndDtStr(item.getEndDtStr());
                        } else {
                            item.setStat("OD");
                        }

                        insertItems.add(item);
                        if (item.getFnlOpeYn().equals("Y")
                                || item.getFnlOpeYn().equals("true")) {
                            item.setDisEndDt(item.getEndDt());
                            item.setDisEndDtStr(item.getEndDtStr());
                            updateDischaringFinalItems.add(item);
                        }
                    }

                    // TMT_JOB
                    jobItem = (CargoDischargingItem) item.clone();
                    if("VB".equals(masterItem.getJobPurpCd())) {
                    	jobItem.setPkgQty(item.getLoadQty());
                        jobItem.setWgt(item.getLoadMt());
                        jobItem.setMsrmt(item.getLoadM3());
                    } else {
                    	 jobItem.setPkgQty(item.getAprQty());
                         jobItem.setWgt(item.getAprMt());
                         jobItem.setMsrmt(item.getAprM3());
                    }
                   
                    jobItem.setLorryId(item.getLorryId());
                    jobItem.setJobTpCd("DS");
                    jobItem.setDelvTpCd("D");
                    jobItem.setStat("COM");
                    if (item.getFnlOpeYn().equals("Y")
                            && item.getEndDt() != null) {
                        jobItem.setFnlOpeYn("Y");
                    }

                    jobItem.setJobCoCd("G");
                    insertJobItems.add(jobItem); 
                } else if (item.getCrud().equals(DAOProcessType.UPDATE)) {
                    updateItems.add(item);
                } else if (item.getCrud().equals(DAOProcessType.DELETE)) {
                    deleteItems.add(item);
                }
            }
        }

        if (insertItems.size() > 0) {
        	cargoDischargingDao.insertCargoDischargingItems(insertItems);
        }

        if (updateItems.size() > 0) {
        	cargoDischargingDao.updateCargoDischargingItems(updateItems);
        }

        if (updateDischaringAmts.size() > 0) {
        	cargoDischargingDao.updateDischaringAmts(updateDischaringAmts);
        }

        if (insertJobItems.size() > 0) {
        	cargoDischargingDao.insertJobItems(insertJobItems);
        	cargoDischargingDao.updateCargoMasterStatus(insertJobItems);// updateStaus
        	cargoDischargingDao.updateCargoMasterInfo(insertJobItems);// updateStaus
        }

        if (updateDischaringFinalItems.size() > 0) {
        	cargoDischargingDao.updateDischaringFinals(updateDischaringFinalItems);
        }
        
        //Hanging scale
        updateHangingScaleItems(insertJobItems);
        return response;
	}

	private void insertPakageJobItems(DataItemList insertJobItems) throws BizException  {
    	//Package Items
    	DataItemList insertPkgItems = new DataItemList();
    	CargoDischargingItem item = (CargoDischargingItem)insertJobItems.get(0);
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
        		  cargoDischargingDao.insertPackageJobItems(insertPkgItems);
        	  }
        }
    }
	
	//HANGING SCALE
	public DataItemList selectHangingScaleItems(SearchHangingScaleParm parm) throws BizException {
		return hangingScaleDao.selectHangingScaleItems(parm);
	}
	
	private void updateHangingScaleItems(DataItemList insertJobItems) throws BizException  {
    	DataItemList updItems = new DataItemList();
    	CargoDischargingItem item = (CargoDischargingItem)insertJobItems.get(0);
        ArrayList list = (ArrayList) item.getHangingScaleItems();
        if (list.size() > 0) {
        	  for (int j = 0; j < list.size(); j++) {
                  HangingScaleItem cudItem = (HangingScaleItem) list.get(j);
                  cudItem.setJobNo(item.getJobNo());
                  cudItem.setJobTpCd(item.getJobTpCd());
                  cudItem.setJobPurpCd(item.getJobPurpCd());
                  cudItem.setUserId(item.getUserId());
                  
                  updItems.add(cudItem);
        	  }
        	  
        	  if(updItems.size() > 0) {
        		  hangingScaleDao.updateHangingScaleItems(updItems);
        	  }
        }
    }
}
