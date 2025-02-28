package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;
import java.util.UUID;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.dataitem.configuration.WhConfigurationItem;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.operation.ICargoArrvDelvDao;
import com.tsb.most.biz.dao.operation.ICargoDischargingDao;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dao.operation.IConfirmDischargingOfRORODao;
import com.tsb.most.biz.dao.operation.IOperationSettingDao;
import com.tsb.most.biz.dataitem.operation.CargoArrvDelvItem;
import com.tsb.most.biz.dataitem.operation.CargoDischargingItem;
import com.tsb.most.biz.dataitem.operation.ConfirmDischargingOfROROItem;
import com.tsb.most.biz.dataitem.operation.OperationSettingItem;
import com.tsb.most.biz.dataitem.operation.PackageJobItem;
import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.biz.parm.operation.SearchCargoDischargingParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchConfirmDischargingOfROROParm;
import com.tsb.most.biz.parm.operation.SearchOperationSettingParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class WHCheckImport implements IWHCheckImport{
	private ICargoDischargingDao cargoDischargingDao;
	private IOperationSettingDao operationSettingDao;
	private ICargoMasterDao cargoMasterDao;
	private ICargoArrvDelvDao cargoArrvDelvDao;
	private ICodeMasterDao codeMasterDao;
	private IConfirmDischargingOfRORODao confirmDischargingOfRORODao;
	private static String ALL = "*";
	
	
	public void setCargoDischargingDao(ICargoDischargingDao cargoDischargingDao) {
		this.cargoDischargingDao = cargoDischargingDao;
	}

	public void setOperationSettingDao(IOperationSettingDao operationSettingDao) {
		this.operationSettingDao = operationSettingDao;
	}

	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}

	public void setCargoArrvDelvDao(ICargoArrvDelvDao cargoArrvDelvDao) {
		this.cargoArrvDelvDao = cargoArrvDelvDao;
	}

	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}

	public void setConfirmDischargingOfRORODao(IConfirmDischargingOfRORODao confirmDischargingOfRORODao) {
		this.confirmDischargingOfRORODao = confirmDischargingOfRORODao;
	}
	////////////////////////////////////////////////////////////////
	public DataItemList selectWhCheckImportList(SearchCargoDischargingParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		CargoDischargingItem returnItem = new CargoDischargingItem();
		SearchOperationSettingParm opParm = new SearchOperationSettingParm();
		opParm.setShftDt(parm.getShftDt());
		opParm.setShftId(parm.getShftId());
		opParm.setCgTpCd(parm.getCgTpCd());
		opParm.setVslCallId(parm.getVslCallId());
		
		// BTL.QUAN 27-08-2012 Loading confirm performance START
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
				partyCode.setLcd("MT");
				partyCode.setMcd("TSPTTP"); // event type
				partyCode.setCol2("MT");
				returnItem.setModeOfOprList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
				
				partyCode = new SearchCodeMasterParm();
				partyCode.setLcd("MT");
				partyCode.setMcd("DELVTP"); // event type
				returnItem.setDeliveryList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
				
				// Get Cargo Type code
				partyCode = new SearchCodeMasterParm();
				partyCode.setLcd("MT");
				partyCode.setMcd("CGTP");
				returnItem.setCargoTypeList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
				
				returnItem.setHatchNoList(operationSettingDao.selectOpHatchList(opParm).getCollection());
			}
		}
		itemList.add(returnItem);
		return itemList;
	}
	
	public DataItemList selectWhCheckImportHatchList(SearchOperationSettingParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		OperationSettingItem returnItem = new OperationSettingItem();

		parm.setCgTpCd("BBK");
		returnItem.setBbkOpHatchList(operationSettingDao.selectOpHatchList(parm).getCollection());
		
		parm.setCgTpCd("DBK");
		returnItem.setDbkOpHatchList(operationSettingDao.selectOpHatchList(parm).getCollection());

		itemList.add(returnItem);
		return itemList;
	}
	
	public DataItemList selectCargoDischargingOperationSetHatch(SearchOperationSettingParm parm) throws BizException {
		return operationSettingDao.selectOperationSetHatch(parm);
	}
	
	public DataItemList selectLocationList(SearchOperationSettingParm parm) throws BizException {
		return operationSettingDao.selectLocationList(parm);
	}

    public DataItemList updateWhCheckImportItems(UpdateItemsBizParm parm) throws BizException {
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
                    // insertItems.add(item);
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
                 // first INDIRECT TMT_JOB, TMT_CG_MST, TMT_CG_BAL
                    // (insert) - 1
                    // Indirect this cargos does update from remove cargo
                    // after INDIRECT TMT_JOB, TMT_CG_MST, TMT_CG_BAL
                    // (update) - 2
                    delvItem = (CargoDischargingItem) item.clone();
                    balItem = (CargoDischargingItem) item.clone();

                    // TMT_CG_MST
                    // mstParm = new CargoMasterParm();
                    mstParm.setCgNo(item.getCgNo());
                    mstParm.setVslCallId(item.getVslCallId());
                    mstParm.setLorryNo(item.getLorryId());
                    mstParm.setCgInOutCd("O");

                    mstItem = (CargoDischargingItem) item.clone();

                    // setCargoDischarging(mstItem, item, mstParm)

                    mstItem.setPkgQty(item.getWhQty());
                    mstItem.setWgt(item.getWhWgt());
                    mstItem.setMsrmt(item.getWhM3());

                    String actualDelv = cargoMasterDao.selectActualDelvTpCd(mstParm);
                    /** ** Check Actual Delivery code ************ */
                    if (actualDelv != null) {
                        if (!actualDelv.equals(item.getOpDelvTpCd())) {
                            mstItem.setOpDelvTpCd("B");
                        }// when value is diffrent, insert both
                    }
                    // else{
                    // mstItem.setActlDelvTpCd(item.getOpDelvTpCd());
                    // }
                    /** **********************************END* */
                    /** * Check W/H Final_YN************************* */
                    // --20071130
                    // if(mstDao.getWareHouseFinalCheck(mstParm)){// IF Y,
                    // item.setWhFnlDelvYn("Y");
                    // }else{//ELSE 'N'
                    // item.setWhFnlDelvYn("N");
                    // }
                    /** **********************************END* */

                    /** *************Final Discharging Check */
                    // statusDS = mstDao.getCargoDisStausCheck(mstParm);
                    // if(statusDS!= null){
                    // mstItem.setStatCd(statusDS);
                    if (item.getFnlOpeYn().equals("Y")) {// if finalOpe
                        // true --
                        // discharging
                        mstItem.setStat("ST");
                        mstItem.setWhFnlDelvYn("N");
                    } else {
                        mstItem.setStat("OD");
                        mstItem.setWhFnlDelvYn("N");
                    }

                    // }else{
                    //
                    // mstItem.setStatCd("ST");
                    // }
                    /** **********************************END* */
                    if (cargoMasterDao.selectIsCargoMstHOStDt(mstParm)) {
                        mstItem.setHdlInEndDt(item.getEndDt());// existing
                        // start-Time
                    } else {
                        mstItem.setHdlInStDt(item.getStartDt());
                        mstItem.setHdlInEndDt(item.getEndDt());
                    }

                    if (cargoMasterDao.selectIsCargoMst(mstParm)) {
                        updateItems.add(mstItem);
                        if (item.getFnlOpeYn().equals("Y")
                                || item.getFnlOpeYn().equals("true")) {// if
                            // finalOpe
                            // true
                            // --
                            // discharging
                            item.setDisEndDt(item.getEndDt());
                            item.setDisEndDtStr(item.getEndDtStr());
                            updateDischaringFinalItems.add(item);
                        }
                    } else {
                        insertItems.add(mstItem);
                        if (item.getFnlOpeYn().equals("Y")
                                || item.getFnlOpeYn().equals("true")) {// if
                            // finalOpe
                            // true
                            // --
                            // discharging
                            item.setDisEndDt(item.getEndDt());
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
                            // && (item.getWhWgt() >0 || item.getWhM3()
                            // >0)){// 2009 choi validation nothting

                            // setCargoDisJob(jobItem, item);
                            jobGeneralItem = (CargoDischargingItem) item
                                    .clone();
                            jobGeneralItem.setPkgQty(item.getWhQty());
                            jobGeneralItem.setWgt(item.getWhWgt());
                            jobGeneralItem.setMsrmt(item.getWhM3());
                            jobGeneralItem.setToLocId(item.getLocId());
                            jobGeneralItem.setJobTpCd("DS");// DS
                            jobGeneralItem.setJobPurpCd("AW");
                            jobGeneralItem.setStat("COM");
                            jobGeneralItem.setDelvTpCd("I");
                            jobGeneralItem.setDmgYn("N");
                            jobGeneralItem.setHhtChk("N");
                            jobGeneralItem.setJobCoCd("G");
                            //jobGeneralItem.setLorryId("INDIRECT");
                            insertJobItems.add(jobGeneralItem);

                            ArrayList invLocLists = (ArrayList) jobGeneralItem.getWhConfigurationItems();
                            
                            // CargoDischargingItem invLocItem;
                            if (invLocLists.size() > 0) {
                                // insertInvLocItems.add((IDataItemList)invLocLists.get(0));
                                for (int j = 0; j < invLocLists.size(); j++) {
                                    invLocItem = (CargoDischargingItem) jobGeneralItem
                                            .clone();
                                    WhConfigurationItem whconfItem = (WhConfigurationItem) invLocLists.get(j);
                                    if ("G".equals(whconfItem
                                            .getWhTpCd())) {
                                        invLocItem.setJobNo("");
                                        invLocItem
                                                .setLocArea(jobGeneralItem
                                                        .getLocId());
                                        invLocItem.setLocId(whconfItem
                                                .getLocId());
                                        invLocItem.setLocQty(Integer
                                                .parseInt(whconfItem
                                                        .getPkgQty()));
                                        invLocItem.setLocWgt(whconfItem
                                                .getWgt());
                                        invLocItem
                                                .setLocMsrmt(whconfItem
                                                        .getMsrmt());
                                        invLocItem.setWhTpCd(whconfItem
                                                .getWhTpCd());
                                        invLocItem.setWhLocTpCd(whconfItem.getLocTpCd());  //LOC_TP_CD in TMT_LOC_DEF and WH_LOC_TP in TMT_INV_LOC
                                        insertInvLocItems
                                                .add(invLocItem);
                                    }
                                }
                            }
                        } else if ((item.getCgTpCd().equals("DBE")
                                || item.getCgTpCd().equals("DBN") 
                                || item.getCgTpCd().equals("DBK") 
                                || item.getCgTpCd().equals("LQD") 
                                || item.getCgTpCd().equals("LQE") 
                                || item.getCgTpCd().equals("LQN"))
                                && !(item.getWhWgt() == 0
                                        && item.getWhM3() == 0 && item
                                        .getWhQty() == 0)) {

                            // setCargoDisJob(jobItem, item);
                            jobGeneralItem = (CargoDischargingItem) item
                                    .clone();
                            jobGeneralItem.setPkgQty(item.getWhQty());
                            jobGeneralItem.setWgt(item.getWhWgt());
                            jobGeneralItem.setMsrmt(item.getWhM3());
                            jobGeneralItem.setToLocId(item.getLocId());
                            jobGeneralItem.setJobTpCd("DS");// DS
                            jobGeneralItem.setJobPurpCd("AW");
                            jobGeneralItem.setStat("COM");
                            jobGeneralItem.setDelvTpCd("I");
                            jobGeneralItem.setDmgYn("N");
                            jobGeneralItem.setJobCoCd("G");
                            insertJobItems.add(jobGeneralItem);
                            
                            /** *********** inv Location ***** */
                            ArrayList invLocLists = (ArrayList) jobGeneralItem.getWhConfigurationItems();
                            
                            // CargoDischargingItem invLocItem;
                            if (invLocLists.size() > 0) {
                                // insertInvLocItems.add((IDataItemList)invLocLists.get(0));
                                for (int j = 0; j < invLocLists.size(); j++) {
                                    invLocItem = (CargoDischargingItem) jobGeneralItem
                                            .clone();
                                    WhConfigurationItem whconfItem = (WhConfigurationItem) invLocLists
                                            .get(j);
                                    if ("G".equals(whconfItem
                                            .getWhTpCd())) {
                                        invLocItem.setJobNo("");
                                        invLocItem
                                                .setLocArea(jobGeneralItem
                                                        .getLocId());
                                        // cargoHIInvLocItem.setLocId(whconfItem.getLocId());
                                        invLocItem.setLocId(whconfItem
                                                .getLocId());
                                        invLocItem.setLocQty(Integer
                                                .parseInt(whconfItem
                                                        .getPkgQty()));
                                        invLocItem.setLocWgt(whconfItem
                                                .getWgt());
                                        invLocItem
                                                .setLocMsrmt(whconfItem
                                                        .getMsrmt());
                                        invLocItem.setWhTpCd(whconfItem
                                                .getWhTpCd());
                                        invLocItem.setWhLocTpCd(whconfItem.getLocTpCd());  //LOC_TP_CD in TMT_LOC_DEF and WH_LOC_TP in TMT_INV_LOC
                                        insertInvLocItems
                                                .add(invLocItem);
                                    }
                                }
                            }// end invloc
                        }

                        // /TMT_CG_BAL - BBK
                        if (item.getCgTpCd().equals("BBK")
                                && !(item.getDmgWgt() == 0
                                        && item.getDmgM3() == 0 && item
                                        .getDmgQty() == 0)) {
                            // &&(item.getDmgWgt() > 0 || item.getDmgM3() >
                            // 0 )){
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
                            jobDmgItem.setJobTpCd("DS");// DS
                            jobDmgItem.setJobPurpCd("VA");
                            jobDmgItem.setStat("COM");
                            jobDmgItem.setDelvTpCd("I");
                            jobDmgItem.setHhtChk("N");
                            jobDmgItem.setJobCoCd("D");
                            insertJobItems.add(jobDmgItem);

                            if (item.getHhtChk().equals("Y")) {
                                jobDmgItem = (CargoDischargingItem) item
                                        .clone();
                                // jobDmgItem.setFnlOpeYn("N");
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
                                    // insertInvLocItems.add((IDataItemList)invLocLists.get(0));
                                    for (int j = 0; j < invLocLists.size(); j++) {
                                        invLocItem = (CargoDischargingItem) jobDmgItem
                                                .clone();
                                        WhConfigurationItem whconfItem = (WhConfigurationItem) invLocLists.get(j);
                                        if ("D".equals(whconfItem
                                                .getWhTpCd())) {
                                            invLocItem.setJobNo("");
                                            invLocItem
                                                    .setLocArea(jobDmgItem
                                                            .getDmgLocId());
                                            invLocItem.setLocId(whconfItem
                                                    .getLocId());
                                            invLocItem.setLocQty(Integer
                                                    .parseInt(whconfItem
                                                            .getPkgQty()));
                                            invLocItem.setLocWgt(whconfItem
                                                    .getWgt());
                                            invLocItem
                                                    .setLocMsrmt(whconfItem
                                                            .getMsrmt());
                                            invLocItem.setWhTpCd(whconfItem
                                                    .getWhTpCd());
                                            invLocItem.setWhLocTpCd(whconfItem.getLocTpCd());  //LOC_TP_CD in TMT_LOC_DEF and WH_LOC_TP in TMT_INV_LOC
                                            insertInvLocItems
                                                    .add(invLocItem);
                                        }
                                    }
                                }// end invloc
                            }

                        } else if ((item.getCgTpCd().equals("DBE")
                                || item.getCgTpCd().equals("DBN") 
                                || item.getCgTpCd().equals("DBK") 
                                || item.getCgTpCd().equals("LQD")
                                || item.getCgTpCd().equals("LQE")
                                || item.getCgTpCd().equals("LQN"))
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
                            jobDmgItem.setJobTpCd("DS");// DS
                            jobDmgItem.setJobPurpCd("VA");
                            jobDmgItem.setStat("COM");
                            jobDmgItem.setDelvTpCd("I");
                            jobDmgItem.setJobCoCd("D");

                            jobDmgItem.setHhtChk("N");
                            insertJobItems.add(jobDmgItem);

                            if (item.getHhtChk().equals("Y")) {
                                jobDmgItem = (CargoDischargingItem) item
                                        .clone();
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
                                    // insertInvLocItems.add((IDataItemList)invLocLists.get(0));
                                    for (int j = 0; j < invLocLists.size(); j++) {
                                        invLocItem = (CargoDischargingItem) jobDmgItem
                                                .clone();
                                        WhConfigurationItem whconfItem = (WhConfigurationItem) invLocLists
                                                .get(j);
                                        if ("D".equals(whconfItem
                                                .getWhTpCd())) {
                                            invLocItem.setJobNo("");
                                            invLocItem
                                                    .setLocArea(jobDmgItem
                                                            .getDmgLocId());
                                            // cargoHIInvLocItem.setLocId(whconfItem.getLocId());
                                            invLocItem.setLocId(whconfItem
                                                    .getLocId());
                                            invLocItem.setLocQty(Integer
                                                    .parseInt(whconfItem
                                                            .getPkgQty()));
                                            invLocItem.setLocWgt(whconfItem
                                                    .getWgt());
                                            invLocItem
                                                    .setLocMsrmt(whconfItem
                                                            .getMsrmt());
                                            invLocItem.setWhTpCd(whconfItem
                                                    .getWhTpCd());
                                            invLocItem.setWhLocTpCd(whconfItem.getLocTpCd());  //LOC_TP_CD in TMT_LOC_DEF and WH_LOC_TP in TMT_INV_LOC
                                            insertInvLocItems
                                                    .add(invLocItem);
                                        }
                                    }
                                }// end invloc
                            }
                        }
                    }
                    // /TMT_DELV - Indirect does not exist
                
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

        if (insertJobItems.size() > 0) {
        	cargoDischargingDao.insertJobItems(insertJobItems);
        	cargoDischargingDao.updateNextPurpCd(insertJobItems);
        	
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

        if (updateDelvItems.size() > 0) {// check
            for (int i = 0; i < updateDelvItems.size(); i++) {
                CargoDischargingItem item = (CargoDischargingItem) updateDelvItems.get(i);

                // Get gate pass numer
                SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
                gpParm.setVslCallId(item.getVslCallId());
                List gpList = cargoArrvDelvDao.selectGatepassNo(gpParm).getCollection();
                if (gpList != null && gpList.size() > 0) {
                    CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
                    item.setGatePassNo(gpItem.getGatePassNo());
                    //returnItem.add(gpList);
                    response.add(gpList);
                }

                // Update processing
                DataItemList tmpArrvDelvItems = new DataItemList();
                tmpArrvDelvItems.add(item);
                cargoDischargingDao.updateDelvItems(tmpArrvDelvItems);
            }
        }

        if (insertBalItems.size() > 0) {// check
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
        
        return response;
    }
    
    private void insertPakageJobItems(DataItemList insertJobItems) throws BizException  {
    	//Package Items
    	DataItemList insertPkgItems = new DataItemList();
    	CargoDischargingItem item = (CargoDischargingItem)insertJobItems.get(0);
    	if(item != null) {
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
    }

	/*RORO
	*/    
	@Override
	public DataItemList selectWhCheckImportForROROList(SearchConfirmDischargingOfROROParm parm) throws BizException {
		DataItemList list = confirmDischargingOfRORODao.selectCargoItems(parm);
		if(list.size() > 0 ) {
			List<String> unitList = new ArrayList<String>();
			List<String> vgUnit = new ArrayList<String>();
			ConfirmDischargingOfROROItem items = (ConfirmDischargingOfROROItem) list.get(0);
			if(items.getUnitNo() != null && !items.getUnitNo().equals("")){
				unitList = Arrays.asList(items.getUnitNo().split("\\s*,\\s*"));
				if(items.getAwUnit() != null && !items.getAwUnit().equals("")) {
					vgUnit = Arrays.asList(items.getAwUnit().split("\\s*,\\s*"));
	
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

	@Override
	public DataItemList updateROROItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList response = new DataItemList();
        DataItemList items = parm.getUpdateItems();

        ConfirmDischargingOfROROItem mstItem = null;
        ConfirmDischargingOfROROItem jobItem = null;
        ConfirmDischargingOfROROItem invLocItem = null;
        SearchCargoMasterParm mstParm;

        DataItemList updateItems = new DataItemList();

        DataItemList insertJobItems = new DataItemList();

        DataItemList insertInvLocItems = new DataItemList();// INV_LOC

        DataItemList updateDischaringFinalItems = new DataItemList();

        String jobGroupNo = null;
        for (int i = 0; i < items.size(); i++) {
        	ConfirmDischargingOfROROItem item = (ConfirmDischargingOfROROItem) items.get(i);
            String uuid = UUID.randomUUID().toString();
            item.setNewVersion(uuid);
            
            mstParm = new SearchCargoMasterParm();
            mstParm.setVslCallId(item.getVslCallId());
            if (i == 0) {
                jobGroupNo = cargoMasterDao.selectJobGroupNo(mstParm);

            }
            item.setJobGroup(jobGroupNo);
            /**
             * *****************DIRECT Cargo TMT_JOB, TMT_RORO_MST,
             * TMT_CG_ARRV_DELV********
             */
//            delvItem = (ConfirmDischargingOfROROItem) item.clone();
            // TMT_CG_MST
            mstParm.setCgNo(item.getBlNo());
            mstParm.setVslCallId(item.getVslCallId());
            mstParm.setLorryNo(item.getLorryId());
            mstParm.setCgInOutCd("O");

            mstItem = (ConfirmDischargingOfROROItem) item.clone();
            mstItem.setPkgQty(item.getWhQty());
            mstItem.setWgt(item.getWhWgt());
            mstItem.setMsrmt(item.getWhM3());
            if(item.getUnitNo() != null && !item.getUnitNo().equals("")) {
            	mstItem.setUnitNo(makeInValue(item.getUnitNo()));
            }

            /** **********************************END* */

            /** *************Final Discharging Check */
            if (item.getFnlOpeYn().equals("Y")) {// if finalOpe
                // true --
                // discharging
                mstItem.setStatCd("ST");
            } else {
                mstItem.setStatCd("OD");
            }
            /** **********************************END* */
            
            if (confirmDischargingOfRORODao.selectIsROROMst(mstParm)) {
                updateItems.add(mstItem);
                if (item.getFnlOpeYn().equals("Y") || item.getFnlOpeYn().equals("true")) {
                    item.setDisEndDt(item.getEndDt());
                    item.setDisEndDtStr(item.getEndDtStr());
                    updateDischaringFinalItems.add(item);
                }
            }
            // TMT_JOB -1 jobTpCd(DS),jobpurpcd(VW)

            ConfirmDischargingOfROROItem jobGeneralItem;
            if (item.getCgTpCd() != null) {
                if (!(item.getWhWgt() == 0 && item.getWhM3() == 0 && item.getWhQty() == 0)) {
                    jobGeneralItem = (ConfirmDischargingOfROROItem) item.clone();
                    jobGeneralItem.setPkgQty(item.getWhQty());
                    jobGeneralItem.setWgt(item.getWhWgt());
                    jobGeneralItem.setMsrmt(item.getWhM3());
                    jobGeneralItem.setToLocId(item.getLocId());
                    jobGeneralItem.setJobTpCd("DS");// DS
                    jobGeneralItem.setJobPurpCd("AW");
                    jobGeneralItem.setStatCd("COM");
                    jobGeneralItem.setDelvTpCd("I");
                    jobGeneralItem.setDmgYn("N");
                    jobGeneralItem.setJobCoCd("G");
                    jobGeneralItem.setUnitNo(item.getUnitNo());
                    
                    if (item.getDriverId() != null  && !item.getDriverId().equals("")) {// set mode of operation
                    	jobGeneralItem.setTsptTpCd("OH");
                    }
                    insertJobItems.add(jobGeneralItem);

                    invLocItem = (ConfirmDischargingOfROROItem) jobGeneralItem.clone();
                    invLocItem.setJobNo("");
                    invLocItem.setLocArea(jobGeneralItem.getLocId());
                    invLocItem.setLocId(jobGeneralItem.getLocId());
                    invLocItem.setLocQty(jobGeneralItem.getPkgQty());
                    invLocItem.setLocWgt(jobGeneralItem.getWgt());
                    invLocItem.setLocMsrmt(jobGeneralItem.getMsrmt());
                    invLocItem.setWhTpCd("G");  //LOC_TP_CD in TMT_LOC_DEF and WH_LOC_TP in TMT_INV_LOC
                    insertInvLocItems.add(invLocItem);
               }// end invloc
           }
        }
        UpdateItemsBizParm updBizParm = new UpdateItemsBizParm();
        updBizParm.addUpdateItem(updateItems);
        if (updateItems.size() > 0) {
        	confirmDischargingOfRORODao.updateConfirmDischargingOfRoRo(updBizParm);
        }

        if (insertJobItems.size() > 0) {
        	confirmDischargingOfRORODao.insertJobItems(insertJobItems);
        	confirmDischargingOfRORODao.updateNextPurpCd(insertJobItems);
        	
        	response.add(insertJobItems);
        }
        return response;
	}

	private String makeInValue(String value) {
		if(value == null ||  value.length() == 0){
			return value;
		}
		else if(value.equals(ALL)){
			return null;
		}
		StringTokenizer st = new StringTokenizer(value,",");
		StringBuffer sql = new StringBuffer();
		sql.append("(");
		while (st.hasMoreElements()) {
			sql.append("'");
			sql.append(st.nextElement().toString().trim());
			sql.append("'");
			if(st.hasMoreElements()){
				sql.append(",");
			}
		}
		sql.append(")");
	  
		return sql.toString();
	}


}
