package com.tsb.most.biz.service.monitoring;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.monitoring.ICargoJobDao;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dataitem.operation.CargoArrvDelvItem;
import com.tsb.most.biz.dataitem.operation.CargoJobItem;
import com.tsb.most.biz.parm.operation.SearchCargoJobParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class CargoJob extends MOSTBaseService implements ICargoJob {
	private int MAX_HATCH_NO = 11;
	private ICargoJobDao cargoJobDao;
	private ICodeMasterDao codeMasterDao;
	private ICargoMasterDao cargoMasterDao;
	private static String ALL = "*";

	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}

	public void setCargoJobDao(ICargoJobDao cargoJobDao) {
		this.cargoJobDao = cargoJobDao;
	}

	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}

	/////////////////////////////////////////////////////////
	public DataItemList selectJobMonitoringList(SearchCargoJobParm parm) throws BizException {
		DataItemList returnItems = new DataItemList();

		if ("HHT_cargoJob".equalsIgnoreCase(parm.getSearchType())) {
			return cargoJobDao.selectCargoJob(parm);
		} else if ("HHT_TSPTTP".equalsIgnoreCase(parm.getSearchType())) {
			SearchCodeMasterParm partyCode;

			partyCode = new SearchCodeMasterParm();
			partyCode.setLcd(CodeConstant.LCD_MOST);
			partyCode.setMcd(CodeConstant.MCD_MT_TSPTTP); // event type
			partyCode.setCol2(CodeConstant.LCD_MOST);

			return codeMasterDao.selectCodeMasterSmallCodeList(partyCode);
		} else {
//			CargoJobItem returnItem = new CargoJobItem();
//
//			returnItem.setItems((ArrayList<CargoJobItem>) cargoJobDao.selectCargoJob(parm).getCollection());
//
//			SearchCodeMasterParm partyCode;
//
//			partyCode = new SearchCodeMasterParm();
//			partyCode.setLcd(CodeConstant.LCD_MOST);
//			partyCode.setMcd(CodeConstant.MCD_MT_TSPTTP); // event type
//			partyCode.setCol2(CodeConstant.LCD_MOST);
//
//			returnItem.setOprList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
//
//			List hatchNoList = new ArrayList();
//
//			for (int i = 0; i < this.MAX_HATCH_NO; i++) {
//				CodeMasterItem addItem = new CodeMasterItem();
//				addItem.setScd(String.format("H%d", i + 1));
//				addItem.setScdNm(String.format("H%d", i + 1));
//				hatchNoList.add(addItem);
//			}
//
//			returnItem.setHatchNoList(hatchNoList);
//
//			SearchCodeMasterParm packageTypeParm = new SearchCodeMasterParm();
//			packageTypeParm.setLcd(CodeConstant.LCD_MOST);
//			packageTypeParm.setMcd(CodeConstant.MCD_MT_PKGTP);
//			packageTypeParm.setTyCd("CD");
//			returnItem.setPackageTypeList(codeMasterDao.selectCodeMasterSmallCodeList(packageTypeParm).getCollection());
//
//			returnItems.add(returnItem);
			if(parm.getCgTpCd() != null && parm.getCgTpCd().equals("RCV")) {
				parm.setJobTpCd(makeInValue(parm.getJobTpCd()));
				returnItems =  cargoJobDao.selectCargoJobForRORO(parm);
			}else {
				returnItems =  cargoJobDao.selectCargoJob(parm);
			}
		}
		return returnItems;
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

	public IDataItem updateJobMonitoring(UpdateItemsBizParm parm) throws BizException {
		CargoJobItem masterItem = (CargoJobItem) parm.getUpdateItems().get(0);
		ArrayList<CargoJobItem> items = new ArrayList<CargoJobItem>();
		items.add(masterItem);
		SearchCargoJobParm searchParm = new SearchCargoJobParm();

		/**
		 * Only Delete NEED DataBase
		 * 
		 * TMT_CG_MST, TMT_JOB, TMT_INV_LOC, TMT_CG_ARRV_DELV, TMT_RHDL_CG, TMT_CG_BAL
		 * 
		 * checked WHEN TMT_CG_ARRV_DELV GATE_OUT_DATE IS NULL, IT IS able to Delete
		 * TMT_JOB ==> same Group all delete throw new BizException("errorID input");
		 * Checked Operation Loading (GV-LD, GA-LD, AG-LO, GA-LD, AW-LF, WA-LO, GG-LO,
		 * GW-LF) Handling in Discharging(VG-DS, VA-DA, AW-LF, WG-LO) Handling out
		 * Movement GateOut(IO-GO) CHECKED SELECT -> (1)ATC is not null - Can't delete,
		 * (2)CHILD(job) = group all delete, (3)Gate Out is not null - Can't Delete
		 * first
		 */
		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList deleteItems = new DataItemList();

		DataItemList deleteRhdlItems = new DataItemList();
		DataItemList groupJobItems = new DataItemList();
		DataItemList updateGroupJobItems = new DataItemList();
		DataItemList updateDeleteMstAMTItems = new DataItemList();
		DataItemList updateFinalDisItems = new DataItemList();
		DataItemList updateCgMstStatusItems = new DataItemList();

		UpdateItemsBizParm gateInUpdates = new UpdateItemsBizParm();
		UpdateItemsBizParm gateOutUpdates = new UpdateItemsBizParm();
		DataItemList updGOList = new DataItemList();
		DataItemList updGIList = new DataItemList();

		SearchCargoJobParm chkParm = new SearchCargoJobParm();
		CargoJobItem cgMstUpDelAMTItem = null;
		List cgMstList = new ArrayList();
		String[] arrRhdlNo = null;
		boolean isExistedGroupJob = false;
		boolean isValidUpdate = false;

		for (int i = 0; i < items.size(); i++) {
			CargoJobItem groupJobItem = null;
			CargoJobItem item = (CargoJobItem) items.get(i);

			String strRhdlNo = "";
			arrRhdlNo = new String[] {};

			if ("R".equals(item.getRhdlMode())) {
				if (item.getRhdlNo() != null && item.getRhdlNo().trim() != "") {
					arrRhdlNo = item.getRhdlNo().split(",");
				}
			} else {
				chkParm.setVslCallId(item.getNxVslCallId());
				chkParm.setCgNo(item.getNxCgNo());
				chkParm.setBlSn(item.getNxRefNo());
				chkParm.setRhdlGroupNo(item.getRhdlGroupNo());

				String rhdlNos = cargoJobDao.selectCargoJobRhdlNos(chkParm);
				if (rhdlNos != null) {
					if (!"".equals(rhdlNos.trim())) {
						arrRhdlNo = rhdlNos.split(",");
					}
				}
			}

			for (int j = 0; j < arrRhdlNo.length; j++) {
				if (strRhdlNo.length() == 0) {
					strRhdlNo = "'" + arrRhdlNo[j].trim() + "'";
				} else {
					strRhdlNo += ",'" + arrRhdlNo[j].trim() + "'";
				}
			}

			if (i == 0) {
				searchParm.setVslCallId(item.getVslCallId());
				searchParm.setCgNo(item.getCgNo());

				if ("RC".equals(item.getJobTpCd())) {
					searchParm.setJobTpCd(item.getJobTpCd());
				}

				searchParm.setRhdlNo(strRhdlNo);
			}

			if (item.getCrud() != null && !item.getCrud().equals(DAOProcessType.QUERY)) {

				if (item.getCrud().equals(DAOProcessType.INSERT)) {
					insertItems.add(item);
				} else if (item.getCrud().equals(DAOProcessType.UPDATE)) {

					// Export/Import/Storage/Transhipment
					if ("E/I/S/T/R".indexOf(item.getOpeClassCd()) >= 0) {
						chkParm = new SearchCargoJobParm();
						chkParm.setVslCallId(item.getVslCallId());
						chkParm.setCgNo(item.getCgNo());
						chkParm.setJobGroup(item.getJobGroup());
						chkParm.setJobNo(item.getJobNo());
						chkParm.setOpeClassCd(item.getOpeClassCd());
						chkParm.setRhdlNo(strRhdlNo);

						cgMstList = new ArrayList();
						isExistedGroupJob = false;

						if (!isExistedGroupJob) {
							updateGroupJobItems.add((CargoJobItem) item.clone());
							chkParm.setJobNo("");
							cgMstList = cargoJobDao.selectCargoJobDelete(chkParm).getCollection();
							chkParm.setJobNo(item.getJobNo());
						}
						if (cgMstList.size() == 1) {
							// do nothing
						} else if (cgMstList.size() == 2) {
							CargoJobItem jobItem1 = (CargoJobItem) cgMstList.get(0);
							CargoJobItem jobItem2 = (CargoJobItem) cgMstList.get(1);
							isValidUpdate = false;
							boolean isWA = false;
							boolean isAV = false;
							boolean isVA = false;
							boolean isAW = false;
							boolean isGV = false;
							boolean isAG = false;
							boolean isGA = false;
							boolean isWW = false;

							if (jobItem1.getJobPurpCd().equals("WA") || jobItem2.getJobPurpCd().equals("WA")) {
								isWA = true;
							}
							if (jobItem1.getJobPurpCd().equals("AV") || jobItem2.getJobPurpCd().equals("AV")) {
								isAV = true;
							}
							if (jobItem1.getJobPurpCd().equals("VA") || jobItem2.getJobPurpCd().equals("VA")) {
								isVA = true;
							}
							if (jobItem1.getJobPurpCd().equals("AW") || jobItem2.getJobPurpCd().equals("AW")) {
								isAW = true;
							}
							if (jobItem1.getJobPurpCd().equals("GV") || jobItem2.getJobPurpCd().equals("GV")) {
								isGV = true;
							}
							if (jobItem1.getJobPurpCd().equals("AG") || jobItem2.getJobPurpCd().equals("AG")) {
								isAG = true;
							}
							if (jobItem1.getJobPurpCd().equals("GA") || jobItem2.getJobPurpCd().equals("GA")) {
								isGA = true;
							}
							if (jobItem1.getJobPurpCd().equals("WW") && jobItem2.getJobPurpCd().equals("WW") && jobItem1.getRcCoCd().equals("ST")) {
								isWW = true;
							}														
							
							if (isWA && isAV) {
								isValidUpdate = true;
							} else if (isVA && isAW) {
								isValidUpdate = true;
							} else if (isGV && isAG) {
								isValidUpdate = true;
							} else if (isAW && isGA) {
								isValidUpdate = true;
							} else if (isWW) {
								isValidUpdate = true;
							} else if(jobItem1.getTsptTpCd().equals("GI") || jobItem1.getTsptTpCd().equals("GO")) {
								isValidUpdate = true;
							}

							if (!isValidUpdate) {
								// throw new BizException("CT121011008",
								// "CT121011008");
								throw new BizException(new Exception());

							}
						} else if (cgMstList.size() > 2 && (!(item.getTsptTpCd().equals("GI")) && !(item.getTsptTpCd().equals("GO")))) {
							// throw new BizException("CT121011007",
							// "CT121011007");
							throw new BizException(new Exception());
						}

						for (int j = 0; j < cgMstList.size(); j++) {
							CargoJobItem jobItem = (CargoJobItem) cgMstList.get(j);
							jobItem.setWgt(item.getWgt());
							jobItem.setMsrmt(item.getMsrmt());
							jobItem.setPkgQty(item.getPkgQty());
							jobItem.setPkgNo(item.getPkgNo());
							jobItem.setHatchNo(item.getHatchNo());
							jobItem.setWorkStDt(item.getWorkStDt());
							jobItem.setWorkEndDt(item.getWorkEndDt());
							jobItem.setTsptTpCd(item.getTsptTpCd());
							jobItem.setFnlOpeYn(item.getFnlOpeYn());
							jobItem.setPkgTpCd(item.getPkgTpCd());
							jobItem.setUserId(item.getUserId());
							jobItem.setRepkgTypeCd(item.getRepkgTypeCd());
							
							jobItem.setCgGrossWgt(item.getCgGrossWgt());
							jobItem.setBagWgt(item.getBagWgt());

							// In case of Final Discharging
							if (jobItem.getJobTpCd().equals("DS") && jobItem.getFnlOpeYn().equals("Y")) {
								SearchCargoMasterParm mstParm = new SearchCargoMasterParm();
								mstParm.setVslCallId(jobItem.getVslCallId());
								mstParm.setCgNo(jobItem.getCgNo());

								if (cargoMasterDao.selectIsImportInvSumCheck(mstParm)) {
									jobItem.setFnlDelvYn("Y");
								} else {
									jobItem.setFnlDelvYn("N");
								}
							}

							updateItems.add(jobItem);
						}

						// Update TMT_CG_ARRV_DELV
						if ("IO/OI".indexOf(item.getJobPurpCd()) >= 0) {
							CargoJobItem gateJobItem = (CargoJobItem) item.clone();
							CargoArrvDelvItem cgDevlItem = new CargoArrvDelvItem();

							cgDevlItem.setVslCallId(gateJobItem.getVslCallId());
							cgDevlItem.setCgNo(gateJobItem.getCgNo());
							cgDevlItem.setJobTpCd(gateJobItem.getJobTpCd());
							cgDevlItem.setJobPurpCd(gateJobItem.getJobPurpCd());
							cgDevlItem.setUserId(gateJobItem.getUserId());

							Date date = Calendar.getInstance().getTime();
							DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
							String strInOutDt = "";
							if(item.getCgTpCd() != null && item.getCgTpCd().equals("RCV")) {
								if(gateJobItem.getWorkStDt() != null && !gateJobItem.getWorkStDt().equals("")) {
									strInOutDt = dateFormat.format(gateJobItem.getWorkStDt());
								}else {
									strInOutDt = dateFormat.format(new Date());
								}
							}else {
								strInOutDt = dateFormat.format(gateJobItem.getWorkStDt());
							}
							if ("GI".equals(gateJobItem.getJobTpCd())) {
								cgDevlItem.setGateInDt(strInOutDt);
								updGIList.add(cgDevlItem);

							} else if ("GO".equals(gateJobItem.getJobTpCd())) {
								cgDevlItem.setGateOutDt(strInOutDt);
								cgDevlItem.setGatePassNo(gateJobItem.getGatePassNo());
								updGOList.add(cgDevlItem);
							}
						}
					}

					if (item.getOpeClassCd().equals("R")) { // Rehandle

						cgMstList = new ArrayList();

						chkParm = new SearchCargoJobParm();
						chkParm.setRhdlNo(strRhdlNo);
						chkParm.setJobGroup(item.getJobGroup());

						cgMstList = cargoJobDao.selectCargoJobDelete(chkParm).getCollection();

						for (int j = 0; j < cgMstList.size(); j++) {
							updateCgMstStatusItems.add((CargoJobItem) cgMstList.get(j));
						}
					}
				} else if (item.getCrud().equals(DAOProcessType.DELETE)) {

					chkParm = new SearchCargoJobParm();
					chkParm.setVslCallId(item.getVslCallId());
					chkParm.setCgNo(item.getCgNo());
					chkParm.setJobGroup(item.getJobGroup());
					chkParm.setJobNo(item.getJobNo());
					chkParm.setOpeClassCd(item.getOpeClassCd());
					chkParm.setRhdlNo(strRhdlNo);

					cgMstList = new ArrayList();

					if (i == 0) {
						groupJobItems.add((CargoJobItem) item.clone());

						chkParm.setJobNo("");

						cgMstList = cargoJobDao.selectCargoJobDelete(chkParm).getCollection();

						chkParm.setJobNo(item.getJobNo());
					} else {
						for (int j = 0; j < groupJobItems.size(); j++) {
							groupJobItem = (CargoJobItem) groupJobItems.get(j);

							if (!groupJobItem.getJobGroup().equals(item.getJobGroup())) {
								groupJobItems.add((CargoJobItem) item.clone());

								chkParm.setJobNo("");

								cgMstList = cargoJobDao.selectCargoJobDelete(chkParm).getCollection();

								chkParm.setJobNo(item.getJobNo());
							}
						}
					}

					if (item.getOpeClassCd().equals("R")) { // Rehandle

						cgMstList = new ArrayList();

						chkParm = new SearchCargoJobParm();
						chkParm.setRhdlNo(strRhdlNo);
						chkParm.setJobGroup(item.getJobGroup());

						cgMstList = cargoJobDao.selectCargoJobNoRhdle(chkParm).getCollection();

					}

					String chkCode = "";
					for (int j = 0; j < cgMstList.size(); j++) {
						CargoJobItem delItem = (CargoJobItem) cgMstList.get(j);
						delItem.setUserId(item.getUserId());
						
						if(item.getJobTpCd().equals("MV") || (item.getTsptTpCd().equals("GI") || item.getTsptTpCd().equals("GO"))) {
							if(delItem.getJobNo().equals(item.getJobNo())) {
								deleteItems.add(delItem);
							}
						}else {							
							deleteItems.add(delItem);
						}
						
						cgMstUpDelAMTItem = (CargoJobItem) cgMstList.get(j);

						chkCode = cgMstUpDelAMTItem.getJobPurpCd() + cgMstUpDelAMTItem.getJobTpCd();
						boolean isGVLD = ("GVLD".equals(chkCode));
						boolean isGALD = ("GALD".equals(chkCode));
						boolean isAGLOD = ("AGLOD".equals(chkCode + cgMstUpDelAMTItem.getDelvTpCd()));
						boolean isGGLO = ("GGLO".equals(chkCode));
						boolean isGWLF = ("GWLF".equals(chkCode));
						boolean isWVLD = ("WVLD".equals(chkCode));
						boolean isWALD = ("WALD".equals(chkCode));
						boolean isAVLDR = ("AVLDR".equals(chkCode + cgMstUpDelAMTItem.getOpeClassCd()));
						boolean isVGDS = ("VGDS".equals(chkCode));
						boolean isVADS = ("VADS".equals(chkCode));
						boolean isWGLO = ("WGLO".equals(chkCode));
						boolean isIOGO = ("IOGO".equals(chkCode));
						updateDeleteMstAMTItems.add(cgMstUpDelAMTItem);
						if (isGVLD || isAGLOD || isGGLO || isGWLF || isWVLD || isWALD || isAVLDR || isWGLO || isIOGO) {
							updateDeleteMstAMTItems.add(cgMstUpDelAMTItem);
						} else if (isVGDS || isVADS) {
							if ("Y".equals(cgMstUpDelAMTItem.getFnlOpeYn())) {
								updateFinalDisItems.add(cgMstUpDelAMTItem);
							}
							updateDeleteMstAMTItems.add(cgMstUpDelAMTItem);
						}
						if(item.getCgTpCd() != null && item.getCgTpCd().equals("RCV")) {
							if(delItem.getJobPurpCd() != null) {
								DeleteItemsBizParm deleteROROItem = new DeleteItemsBizParm(); 
								delItem.setUnitNos(makeInValue(item.getUnitNos())); 
								deleteROROItem.addDeleteItem(delItem); 
								if((delItem.getJobPurpCd().equals("VA") || delItem.getJobPurpCd().equals("VG"))) {
									cargoJobDao.deleteROROItems(deleteROROItem);
								} 
								DataItemList updateStatusItems = new DataItemList();
								CargoJobItem updateStatusItem = (CargoJobItem) delItem.clone();
								updateStatusItem.setCgNo(item.getBlSn()); 
								updateCargoStatusAfterDelete(updateStatusItem);
								updateStatusItems.add(updateStatusItem);
								cargoJobDao.updateStatusForROROItems(updateStatusItems);
							}
						}
					}
				}
			}

			CargoJobItem rdhlItem = null;
			for (int j = 0; j < deleteItems.size(); j++) {
				rdhlItem = (CargoJobItem) deleteItems.get(j);
				if (rdhlItem.getRhdlMode() != null && !rdhlItem.getRhdlMode().equals("N")
						&& rdhlItem.getRhdlMode() != "") {
					deleteRhdlItems.add(rdhlItem);
				}
			}

			if (updateItems.size() > 0) {
				if(item.getCgTpCd() != null && item.getCgTpCd().equals("RCV")) {
					cargoJobDao.updateJobAmt(updateItems);
					cargoJobDao.updateJobGroup(updateItems);
					cargoJobDao.updateArrvDelvJobAmt(updateItems);
					cargoJobDao.updateROROMstItems(updateItems);
				}else if(item.getCgTpCd() != null && !(item.getTsptTpCd().equals("GI") || item.getTsptTpCd().equals("GO"))) {
					cargoJobDao.updateRhdlJobAmt(updateItems);
					cargoJobDao.updateCgBalJobAmt(updateItems);
					cargoJobDao.updateJobAmt(updateItems);
					cargoJobDao.updateJobGroup(updateItems);
					cargoJobDao.updateArrvDelvJobAmt(updateItems);
					cargoJobDao.updateInvLocJobAmt(updateItems);
					cargoJobDao.updateCgMstItems(updateItems);
				}
				
			}

			if (updateCgMstStatusItems.size() > 0) {
				cargoJobDao.updateCgMstStatus(updateCgMstStatusItems);
			}

			if (deleteItems.size() > 0) {
				cargoJobDao.deleteCargoJobItems(deleteItems);
				cargoJobDao.updateCgMstStatus(deleteItems);
				
				//Delete job for Consol/Deconsol
				for(int del = 0; del < deleteItems.size(); del++) {
					CargoJobItem delConsol = new CargoJobItem();
					delConsol = (CargoJobItem)deleteItems.get(del);
					
					if(delConsol.getTsptTpCd() != null && delConsol.getTsptTpCd() != "") {
						//If AW, need to delete VA as well
						if(delConsol.getTsptTpCd().equals("GI") && delConsol.getJobPurpCd().equals("AW")) {
							DataItemList delConsolVAItem = new DataItemList();
							delConsolVAItem.add(delConsol);
							cargoJobDao.deleteConsolDeconsolVAJobForImport(delConsolVAItem);
						}
						
						//If AV, need to delete WA as well
						if(delConsol.getTsptTpCd().equals("GO") && delConsol.getJobPurpCd().equals("AV")) {
							DataItemList delConsolAVItem = new DataItemList();
							delConsolAVItem.add(delConsol);
							cargoJobDao.deleteConsolDeconsolWAJobForExportInv(delConsolAVItem);
							cargoJobDao.deleteConsolDeconsolWAJobForExport(delConsolAVItem);
						}
					}
				}
			}

			if (updateFinalDisItems.size() > 0) {
				cargoJobDao.updateFinalDisItems(updateFinalDisItems);
			}

			if (updateDeleteMstAMTItems.size() > 0) {
				cargoJobDao.updateCgMstItems(updateDeleteMstAMTItems);
			}

			if (updGIList.size() > 0) {
				gateInUpdates.setUpdateItems(updGIList);
				cargoJobDao.updateGateInItems(gateInUpdates);
			}

			if (updGOList.size() > 0) {
				gateOutUpdates.setUpdateItems(updGOList);
				cargoJobDao.updateGateOutItems(gateOutUpdates);
			}
		}
		CargoJobItem returnItem = new CargoJobItem();
		List list = cargoJobDao.selectCargoJob(searchParm).getCollection();

		returnItem.add(list);
		return returnItem;
	}
	
	public void updateCargoStatusAfterDelete(CargoJobItem item) {
		if (item.getDelvTpCd().equals(CodeConstant.MT_DELVTP_D)) {
			item.setStat(CodeConstant.MT_CGSTATUS_RS);
			return;
		}
		if (item.getOpeClassCd().equals(CodeConstant.MT_CATGTP_E)) {
			String[] unitStatuses = { CodeConstant.MT_CGSTATUS_RS, CodeConstant.MT_CGSTATUS_ST, CodeConstant.MT_CGSTATUS_OL };
			String[] jobPurposes = { CodeConstant.MT_JOBPURP_GW, CodeConstant.MT_JOBPURP_WA, CodeConstant.MT_JOBPURP_AV };
			setStatus(item, jobPurposes, unitStatuses);
		} else if (item.getOpeClassCd().equals(CodeConstant.MT_CATGTP_I)) { 
			String[] unitStatuses = { CodeConstant.MT_CGSTATUS_RS, CodeConstant.MT_CGSTATUS_OD, CodeConstant.MT_CGSTATUS_ST };
			String[] jobPurposes = { CodeConstant.MT_JOBPURP_VA, CodeConstant.MT_JOBPURP_AW,CodeConstant.MT_JOBPURP_WG };
			setStatus(item, jobPurposes, unitStatuses);
		}
		
	}
	
	private static void setStatus(CargoJobItem item, String[] jobPurposes, String[] unitStatuses) {
		Map<String, String> map = new HashMap<>();
		for (int i = 0; i < jobPurposes.length; i++) {
			map.put(jobPurposes[i], unitStatuses[i]);
		}
		String jobPurpCd = item.getJobPurpCd();
		String status = map.get(jobPurpCd);
		if (status != null) {
			item.setStat(status);
		} else {
			item.setStat(CodeConstant.MT_CGSTATUS_RS);
		}
	}
}
