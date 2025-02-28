package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.dataitem.configuration.WhConfigurationItem;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.operation.ICargoArrvDelvDao;
import com.tsb.most.biz.dao.operation.ICargoHandlingInDao;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dataitem.operation.CargoArrvDelvItem;
import com.tsb.most.biz.dataitem.operation.CargoHandlingInItem;
import com.tsb.most.biz.dataitem.operation.PackageJobItem;
import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.biz.parm.operation.SearchCargoHandlingInParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.common.constant.OperationConstant;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class CargoHandlingIn extends MOSTBaseService implements ICargoHandlingIn {
	private ICargoHandlingInDao cargoHandlingInDao;
	private ICodeMasterDao codeMasterDao;
	private ICargoMasterDao cargoMasterDao;
	private ICargoArrvDelvDao cargoArrvDelvDao;
	
	public void setCargoHandlingInDao(ICargoHandlingInDao cargoHandlingInDao) {
		this.cargoHandlingInDao = cargoHandlingInDao;
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
	
	public DataItemList selectCargoHandlingInList(SearchCargoHandlingInParm parm) throws BizException {
    	DataItemList itemList = new DataItemList();
    	
    	CargoHandlingInItem returnItem = new CargoHandlingInItem();
        SearchCodeMasterParm partyCode;
        returnItem = (CargoHandlingInItem) cargoHandlingInDao.selectCargoHandlingInList(parm).getCollection().get(0);

        partyCode = new SearchCodeMasterParm();
        partyCode.setLcd(CodeConstant.LCD_MOST);
        partyCode.setMcd(CodeConstant.MCD_MT_CGTP);
        returnItem.setCargoTypeList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

        partyCode = new SearchCodeMasterParm();
        partyCode.setLcd(CodeConstant.LCD_MOST);
        partyCode.setMcd(CodeConstant.MCD_MT_DELVTP); // event type
        returnItem.setDeliveryList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

        itemList.add(returnItem);
        return itemList;
    }
	
	public DataItemList selectLocationList(SearchCargoHandlingInParm parm) throws BizException {
		return cargoHandlingInDao.selectLocationList(parm);
	}
	
	public DataItemList updateCargoHandlingInItems_bk(UpdateItemsBizParm parm) throws BizException {
		CargoHandlingInItem returnItem = new CargoHandlingInItem();
		CargoHandlingInItem masterItem = (CargoHandlingInItem) parm.getUpdateItem();
		DataItemList items = new DataItemList();
		items.add(masterItem);

		CargoHandlingInItem cargoHIJobItem = null;
		CargoHandlingInItem cargoHIArrvDelvItem = null;
		CargoHandlingInItem cargoHIInvLocItem = null;

		CargoHandlingInItem jobMstDmgItem = null;
		CargoHandlingInItem shuItem = null;
		CargoHandlingInItem dmgItem = null;
		CargoHandlingInItem rhdlItem = null;
		String jobGroupNo = null;
		SearchCargoMasterParm mstParm;

		boolean isBbk = false;
		boolean isDbk = false;

		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList updateCgMstAmtItems = new DataItemList();
		DataItemList insertHIJobItems = new DataItemList();
		DataItemList updateHIArrvDelvItems = new DataItemList();
		DataItemList insertHIArrvDelvItems = new DataItemList();
		DataItemList insertBalItems = new DataItemList();
		DataItemList insertRhdlItems = new DataItemList();
		DataItemList updateHIGPArrvDelvItems = new DataItemList();
		DataItemList insertInvLocItems = new DataItemList();
		DataItemList insertGateInItems = new DataItemList();
		DataItemList updateGateInItems = new DataItemList();
		DataItemList updateGateInLorryItems = new DataItemList();
		DataItemList updateGateInOnlyLorryItems = new DataItemList();
		CargoHandlingInItem item = (CargoHandlingInItem) items.get(0);

		mstParm = new SearchCargoMasterParm();
		mstParm.setCgNo(item.getCgNo());
		mstParm.setVslCallId(item.getVslCallId());
		mstParm.setLorryNo(item.getLorryId());
		mstParm.setCgInOutCd("I");

		SearchCargoHandlingInParm hiParm = new SearchCargoHandlingInParm();
		hiParm.setCgNo(item.getCgNo());
		hiParm.setVslCallId(item.getVslCallId());

		jobGroupNo = cargoMasterDao.selectJobGroupNo(mstParm);
		item.setJobGroup(jobGroupNo);

		// 1) insert arrvDelv HoTime = null, Hi time =not null
		if (cargoMasterDao.selectIsCargoMst(mstParm)) {
			item.setStat(CodeConstant.MT_CGSTATUS_ST);
			updateItems.add(item);

			cargoHIJobItem = (CargoHandlingInItem) item.clone();
			cargoHIJobItem.setJobTpCd(CodeConstant.MT_JOBTP_LF);
			cargoHIJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GW);
			cargoHIJobItem.setStat(CodeConstant.MT_JOBSTATCD_COM);

			isBbk = false;
			isDbk = false;
			if (cargoHIJobItem.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK)
					&& (cargoHIJobItem.getWgt() > 0 || cargoHIJobItem.getPkgQty() > 0)
					&& cargoHIJobItem.getLocId() != null && !cargoHIJobItem.getLocId().equals("")) {
				isBbk = true;
			}
			if ((cargoHIJobItem.getCgTpCd().equals(CodeConstant.MT_CGTP_DBN)) && (cargoHIJobItem.getWgt() > 0)
					&& cargoHIJobItem.getLocId() != null && !cargoHIJobItem.getLocId().equals("")) {
				isDbk = true;
			}
			if (isBbk || isDbk) {
				cargoHIJobItem.setJobCoCd(CodeConstant.INVLOC_WH_TP_NORMAL);
				cargoHIJobItem.setLorryId(item.getLorryId());
				insertHIJobItems.add(cargoHIJobItem);

				CargoHandlingInItem gateInItem = (CargoHandlingInItem) cargoHIJobItem.clone();
				String gateInSeq = cargoHandlingInDao.selectGateInTimeSeq(hiParm);
				if (gateInSeq != null) {
					gateInItem.setSeq(gateInSeq);
					if (gateInItem.getLorryFlag()) {
						updateGateInLorryItems.add(gateInItem);
					} else {
						updateGateInItems.add(gateInItem);
					}
				} else {
					if (gateInItem.getLorryFlag() && (gateInItem.getSeq() != null && gateInItem.getSeq() != "")) {
						updateGateInOnlyLorryItems.add(gateInItem);
					} else {
						if (gateInItem.getSeq() == null || gateInItem.getSeq() == "") {
							insertGateInItems.add(gateInItem);
						}
					}
				} // first lorry
			}

		} else {// one time
			item.setStat(CodeConstant.MT_CGSTATUS_ST);
			insertItems.add(item);
			cargoHIJobItem = (CargoHandlingInItem) item.clone();
			cargoHIJobItem.setJobTpCd(CodeConstant.MT_JOBTP_LF);
			cargoHIJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GW);
			cargoHIJobItem.setStat(CodeConstant.MT_JOBSTATCD_COM);
			isBbk = false;
			isDbk = false;
			if (cargoHIJobItem.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK)
					&& (cargoHIJobItem.getWgt() > 0 || cargoHIJobItem.getPkgQty() > 0)
					&& cargoHIJobItem.getLocId() != null && !cargoHIJobItem.getLocId().equals("")) {
				isBbk = true;
			}
			if ((cargoHIJobItem.getCgTpCd().equals(CodeConstant.MT_CGTP_DBN)) && (cargoHIJobItem.getWgt() > 0)
					&& cargoHIJobItem.getLocId() != null && !cargoHIJobItem.getLocId().equals("")) {
				isDbk = true;
			}
			if (isBbk || isDbk) {
				cargoHIJobItem.setJobCoCd(CodeConstant.INVLOC_WH_TP_NORMAL);
				insertHIJobItems.add(cargoHIJobItem);

				CargoHandlingInItem gateInItem = (CargoHandlingInItem) cargoHIJobItem.clone();

				String gateInSeq = cargoHandlingInDao.selectGateInTimeSeq(hiParm);
				if (gateInSeq != null) {
					gateInItem.setSeq(gateInSeq);
					if (gateInItem.getLorryFlag()) {
						updateGateInLorryItems.add(gateInItem);
					} else {
						updateGateInItems.add(gateInItem);
					}
				} else {
					if (gateInItem.getLorryFlag() && (gateInItem.getSeq() != null && gateInItem.getSeq() != "")) {
						updateGateInOnlyLorryItems.add(gateInItem);
					} else {
						if (gateInItem.getSeq() == null || gateInItem.getSeq() == "") {
							insertGateInItems.add(gateInItem);
						}
					}
				}
				// first lorry
			}
		}

		isBbk = false;
		isDbk = false;
		if (cargoHIJobItem.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK) && (cargoHIJobItem.getWgt() > 0 || cargoHIJobItem.getPkgQty() > 0)
				&& cargoHIJobItem.getLocId() != null && !cargoHIJobItem.getLocId().equals("")) {
			isBbk = true;
		}
		if ((cargoHIJobItem.getCgTpCd().equals(CodeConstant.MT_CGTP_DBN)) && (cargoHIJobItem.getWgt() > 0)
				&& cargoHIJobItem.getLocId() != null && !cargoHIJobItem.getLocId().equals("")) {
			isDbk = true;
		}
		// set Normal location Setting
		if (isBbk || isDbk) {
			cargoHIJobItem.setShuYn("");
			cargoHIJobItem.setDmgYn("");

			ArrayList invLocItems = (ArrayList) cargoHIJobItem.getWhConfigurationItems();

			for (int j = 0; j < invLocItems.size(); j++) {
				cargoHIInvLocItem = (CargoHandlingInItem) cargoHIJobItem.clone();
				WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems.get(j);
				if (whconfItem.getWhTpCd() == null || whconfItem.getWhTpCd() == ""
						|| whconfItem.getWhTpCd().equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
					cargoHIInvLocItem.setLocArea(cargoHIJobItem.getLocId());
					cargoHIInvLocItem.setLocId(whconfItem.getLocId());
					cargoHIInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
					cargoHIInvLocItem.setLocWgt((whconfItem.getWgt()));
					cargoHIInvLocItem.setLocMsrmt((whconfItem.getMsrmt()));
					cargoHIInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
					cargoHIInvLocItem.setWhLocTpCd(whconfItem.getLocTpCd());
					cargoHIInvLocItem.setJobCoCd(whconfItem.getWhTpCd());
					insertInvLocItems.add(cargoHIInvLocItem);
				} // end if

			} // end for
		} // end normal = general

		/**
		 * ****************************** Shut and Damage and direct location setting
		 * and gate pass ****
		 */
		if (item.getLoadCnclMode().equals("Y")) {
			if (item.getRhdlYn().equals("Y")) {
				isBbk = false;
				isDbk = false;
				if (item.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK) && (item.getShuMt() > 0 || item.getShuM3() > 0)) {
					isBbk = true;
				}
				if ((item.getCgTpCd().equals(CodeConstant.MT_CGTP_DBN))
						&& (item.getShuMt() > 0)) {
					isDbk = true;
				}
				if (isBbk || isDbk) {
					shuItem = (CargoHandlingInItem) item.clone();
					shuItem.setBalStatCd("SHU");
					shuItem.setShuYn("Y");
					insertBalItems.add(shuItem);

					cargoHIJobItem = (CargoHandlingInItem) item.clone();
					if (cargoHIJobItem.getShutRhdlMode().equals(CodeConstant.MT_RHDLMODE_R)) {// return to shipper
						cargoHIJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GG);
						cargoHIJobItem.setLocId("");
						cargoHIJobItem.setJobTpCd(CodeConstant.MT_JOBTP_LO);
						cargoHIJobItem.setRhdlYn("Y");
						cargoHIJobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_R);
					} else if (cargoHIJobItem.getShutRhdlMode().equals(CodeConstant.MT_RHDLMODE_C)) { // change vessel
						cargoHIJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GW);
						cargoHIJobItem.setJobTpCd(CodeConstant.MT_JOBTP_LF);
						;
						cargoHIJobItem.setRhdlYn("Y");
						cargoHIJobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_C);
						cargoHIJobItem.setLocId(cargoHIJobItem.getShuLocId());
					} else {
						cargoHIJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GW);
						cargoHIJobItem.setJobTpCd(CodeConstant.MT_JOBTP_LF);
						cargoHIJobItem.setRhdlYn("N");
						cargoHIJobItem.setLocId(cargoHIJobItem.getShuLocId());
					}

					cargoHIJobItem.setCgInOutCd("I");
					cargoHIJobItem.setPkgQty(item.getShuQty());
					cargoHIJobItem.setWgt(item.getShuMt());
					cargoHIJobItem.setMsrmt(item.getShuM3());
					cargoHIJobItem.setStat(CodeConstant.MT_JOBSTATCD_COM);
					cargoHIJobItem.setShuYn("Y");
					cargoHIJobItem.setJobCoCd("S");

					if (item.getShutRhdlMode() != null && item.getShutRhdlMode() != "") {
						rhdlItem = (CargoHandlingInItem) item.clone();
						rhdlItem.setRhdlMode(item.getShutRhdlMode());
						rhdlItem.setPkgQty(item.getShuQty());
						rhdlItem.setWgt(item.getShuMt());
						rhdlItem.setMsrmt(item.getShuM3());
						rhdlItem.setJobGroup(jobGroupNo);
						rhdlItem.setShuYn("Y");
						rhdlItem.setCgCoCd("S");
						rhdlItem.setJobCoCd("S");
						insertRhdlItems.add(rhdlItem);
					}

					// set ShutOut Change of Vessel and not
					// RehandlingMode location Setting
					if (cargoHIJobItem.getShutRhdlMode().equals(CodeConstant.MT_RHDLMODE_C) || (cargoHIJobItem.getShutRhdlMode() == null
							|| cargoHIJobItem.getShutRhdlMode().equals(""))) { 
						ArrayList invLocItems = (ArrayList) cargoHIJobItem.getWhConfigurationItems();

						for (int j = 0; j < invLocItems.size(); j++) {
							cargoHIInvLocItem = (CargoHandlingInItem) cargoHIJobItem.clone();
							WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems.get(j);
							if (whconfItem.getWhTpCd().equals("S")) {
								cargoHIInvLocItem.setLocArea(cargoHIInvLocItem.getShuLocId());
								cargoHIInvLocItem.setLocId(whconfItem.getLocId());
								cargoHIInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
								cargoHIInvLocItem.setLocWgt((whconfItem.getWgt()));
								cargoHIInvLocItem.setLocMsrmt((whconfItem.getMsrmt()));
								cargoHIInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
								cargoHIInvLocItem.setJobCoCd(whconfItem.getWhTpCd());
								insertInvLocItems.add(cargoHIInvLocItem);
							}

						}
					}
					insertHIJobItems.add(cargoHIJobItem);

					jobMstDmgItem = (CargoHandlingInItem) cargoHIJobItem.clone();
					jobMstDmgItem.setDmgYn("Y");
					updateCgMstAmtItems.add(jobMstDmgItem);
					// ,amt

				}
				isBbk = false;
				isDbk = false;
				if (item.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK) && (item.getDmgMt() > 0 || item.getDmgQty() > 0)) {
					isBbk = true;
				}
				if ((item.getCgTpCd().equals(CodeConstant.MT_CGTP_DBN))
						&& (item.getDmgMt() > 0)) {
					isDbk = true;

				}
				if (isBbk || isDbk) {
					dmgItem = (CargoHandlingInItem) item.clone();
					dmgItem.setBalStatCd("DMG");
					dmgItem.setDmgYn("Y");
					insertBalItems.add(dmgItem);

					// MT_JOB
					cargoHIJobItem = (CargoHandlingInItem) item.clone();
					// cargoHIJobItem.setJobGroup(jobGroupNo);
					if (cargoHIJobItem.getDmgRhdlMode().equals(CodeConstant.MT_RHDLMODE_R)) {
						cargoHIJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GG);
						cargoHIJobItem.setLocId("");
						cargoHIJobItem.setJobTpCd(CodeConstant.MT_JOBTP_LO);
						cargoHIJobItem.setRhdlYn("Y");
						cargoHIJobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_R);
					} else if (cargoHIJobItem.getDmgRhdlMode().equals(CodeConstant.MT_RHDLMODE_C)) { // change vessel
						cargoHIJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GW);
						cargoHIJobItem.setJobTpCd(CodeConstant.MT_JOBTP_LF);
						;
						cargoHIJobItem.setRhdlYn("Y");
						cargoHIJobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_C);
						cargoHIJobItem.setLocId(cargoHIJobItem.getDmgLocId());
					} else {
						cargoHIJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GW);
						cargoHIJobItem.setJobTpCd(CodeConstant.MT_JOBTP_LF);
						cargoHIJobItem.setRhdlYn("N");
						cargoHIJobItem.setLocId(cargoHIJobItem.getDmgLocId());
					}
					cargoHIJobItem.setCgInOutCd("I");
					cargoHIJobItem.setPkgQty(item.getDmgQty());
					cargoHIJobItem.setWgt(item.getDmgMt());
					cargoHIJobItem.setMsrmt(item.getDmgM3());
					cargoHIJobItem.setStat(CodeConstant.MT_JOBSTATCD_COM);
					cargoHIJobItem.setDmgYn("Y");
					cargoHIJobItem.setJobCoCd("D");
					cargoHIJobItem.setLorryId(item.getLorryId());

					if (item.getDmgRhdlMode() != null && item.getDmgRhdlMode() != "") {
						rhdlItem = (CargoHandlingInItem) item.clone();
						rhdlItem.setRhdlMode(item.getDmgRhdlMode());
						rhdlItem.setPkgQty(item.getDmgQty());
						rhdlItem.setWgt(item.getDmgMt());
						rhdlItem.setMsrmt(item.getDmgM3());
						rhdlItem.setJobGroup(jobGroupNo);
						rhdlItem.setDmgYn("Y");
						rhdlItem.setCgCoCd("D");
						rhdlItem.setJobCoCd("D");
						insertRhdlItems.add(rhdlItem);
					}

					// set not RehandlingMode location Setting
					if (cargoHIJobItem.getDmgRhdlMode().equals(CodeConstant.MT_RHDLMODE_C) || cargoHIJobItem.getDmgRhdlMode() == null
							|| cargoHIJobItem.getDmgRhdlMode().equals("")) { // change vessel
						ArrayList invLocItems = (ArrayList) cargoHIJobItem.getCollection();

						for (int j = 0; j < invLocItems.size(); j++) {
							cargoHIInvLocItem = (CargoHandlingInItem) cargoHIJobItem.clone();
							WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems.get(j);
							if (whconfItem.getWhTpCd().equals(CodeConstant.INVLOC_WH_TP_DAMAGE)) {
								cargoHIInvLocItem.setLocArea(cargoHIInvLocItem.getDmgLocId());
								cargoHIInvLocItem.setLocId(whconfItem.getLocId());
								cargoHIInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
								cargoHIInvLocItem.setLocWgt((whconfItem.getWgt()));
								cargoHIInvLocItem.setLocMsrmt((whconfItem.getMsrmt()));
								cargoHIInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
								cargoHIInvLocItem.setJobCoCd(whconfItem.getWhTpCd());
								insertInvLocItems.add(cargoHIInvLocItem);
							}

						}
					}
					cargoHIJobItem.setJobGroup(jobGroupNo);

					insertHIJobItems.add(cargoHIJobItem);
					jobMstDmgItem = (CargoHandlingInItem) cargoHIJobItem.clone();
					jobMstDmgItem.setDmgYn("Y");
					updateCgMstAmtItems.add(jobMstDmgItem);
				}
			} else if (item.getRhdlYn().equals("N")) {
				isBbk = false;
				isDbk = false;
				if (item.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK) && (item.getShuMt() > 0 || item.getShuQty() > 0)) {
					isBbk = true;
				}
				if ((item.getCgTpCd().equals(CodeConstant.MT_CGTP_DBN))
						&& (item.getShuMt() > 0)) {
					isDbk = true;

				}

				if (isBbk || isDbk) {
					shuItem = (CargoHandlingInItem) item.clone();
					shuItem.setBalStatCd("SHU");
					shuItem.setShuYn("Y");
					insertBalItems.add(shuItem);
				}

				if (isBbk || isDbk) {
					cargoHIJobItem = (CargoHandlingInItem) item.clone();
					cargoHIJobItem.setPkgQty(item.getShuQty());
					cargoHIJobItem.setWgt(item.getShuMt());
					cargoHIJobItem.setMsrmt(item.getShuM3());
					cargoHIJobItem.setStat(CodeConstant.MT_JOBSTATCD_COM);
					cargoHIJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GW);
					cargoHIJobItem.setJobTpCd(CodeConstant.MT_JOBTP_LF);
					cargoHIJobItem.setRhdlYn("N");
					cargoHIJobItem.setShuYn("Y");
					cargoHIJobItem.setJobCoCd("S");
					cargoHIJobItem.setLorryId(item.getLorryId());
					cargoHIJobItem.setLocId(cargoHIJobItem.getShuLocId());
					insertHIJobItems.add(cargoHIJobItem);

					jobMstDmgItem = (CargoHandlingInItem) cargoHIJobItem.clone();
					jobMstDmgItem.setDmgYn("Y");
					updateCgMstAmtItems.add(jobMstDmgItem);
					if ((cargoHIJobItem.getShutRhdlMode() != null && cargoHIJobItem.getShutRhdlMode().equals(CodeConstant.MT_RHDLMODE_C))
							|| (cargoHIJobItem.getShutRhdlMode() == null
									|| cargoHIJobItem.getShutRhdlMode().equals(""))) {
						ArrayList invLocItems = (ArrayList) cargoHIJobItem.getWhConfigurationItems();

						for (int j = 0; j < invLocItems.size(); j++) {
							cargoHIInvLocItem = (CargoHandlingInItem) cargoHIJobItem.clone();
							WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems.get(j);
							if (whconfItem.getWhTpCd().equals("S")) {
								cargoHIInvLocItem.setLocArea(cargoHIInvLocItem.getShuLocId());
								cargoHIInvLocItem.setLocId(whconfItem.getLocId());
								cargoHIInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
								cargoHIInvLocItem.setLocWgt((whconfItem.getWgt()));
								cargoHIInvLocItem.setLocMsrmt((whconfItem.getMsrmt()));
								cargoHIInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
								cargoHIInvLocItem.setJobCoCd(whconfItem.getWhTpCd());
								insertInvLocItems.add(cargoHIInvLocItem);
							}
						}
					}
				}

				isBbk = false;
				isDbk = false;
				if (item.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK) && (item.getDmgMt() > 0 || item.getDmgQty() > 0)) {
					isBbk = true;
				}
				if ((item.getCgTpCd().equals(CodeConstant.MT_CGTP_DBN))
						&& (item.getDmgMt() > 0)) {
					isDbk = true;
				}

				if (isBbk || isDbk) {
					dmgItem = (CargoHandlingInItem) item.clone();
					dmgItem.setBalStatCd("DMG");
					dmgItem.setDmgYn("Y");
					insertBalItems.add(dmgItem);
				}
				if (isBbk || isDbk) {
					cargoHIJobItem = (CargoHandlingInItem) item.clone();
					cargoHIJobItem.setPkgQty(item.getDmgQty());
					cargoHIJobItem.setWgt(item.getDmgMt());
					cargoHIJobItem.setMsrmt(item.getDmgM3());
					cargoHIJobItem.setStat(CodeConstant.MT_JOBSTATCD_COM);
					cargoHIJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GW);
					cargoHIJobItem.setJobTpCd(CodeConstant.MT_JOBTP_LF);
					cargoHIJobItem.setRhdlYn("N");
					cargoHIJobItem.setDmgYn("Y");
					cargoHIJobItem.setJobCoCd("D");
					cargoHIJobItem.setLocId(cargoHIJobItem.getDmgLocId());
					cargoHIJobItem.setLorryId(item.getLorryId());
					insertHIJobItems.add(cargoHIJobItem);

					jobMstDmgItem = (CargoHandlingInItem) cargoHIJobItem.clone();
					jobMstDmgItem.setDmgYn("Y");
					updateCgMstAmtItems.add(jobMstDmgItem);

					if ((cargoHIJobItem.getDmgRhdlMode() != null && cargoHIJobItem.getDmgRhdlMode().equals(CodeConstant.MT_RHDLMODE_C))
							|| cargoHIJobItem.getDmgRhdlMode() == null || cargoHIJobItem.getDmgRhdlMode().equals("")) {
						ArrayList invLocItems = (ArrayList) cargoHIJobItem.getWhConfigurationItems();

						for (int j = 0; j < invLocItems.size(); j++) {
							cargoHIInvLocItem = (CargoHandlingInItem) cargoHIJobItem.clone();
							WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems.get(j);
							if (whconfItem.getWhTpCd().equals("D")) {
								cargoHIInvLocItem.setLocArea(cargoHIInvLocItem.getDmgLocId());
								cargoHIInvLocItem.setLocId(whconfItem.getLocId());
								cargoHIInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
								cargoHIInvLocItem.setLocWgt((whconfItem.getWgt()));
								cargoHIInvLocItem.setLocMsrmt((whconfItem.getMsrmt()));
								cargoHIInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
								cargoHIInvLocItem.setJobCoCd(whconfItem.getWhTpCd());
								insertInvLocItems.add(cargoHIInvLocItem);
							}

						}
					}
				}
			}
		}
		if (item.getGatePassYn() && item.getDmgRhdlMode() != null && item.getDmgRhdlMode().equals(CodeConstant.MT_RHDLMODE_R)) {
			cargoHIArrvDelvItem = (CargoHandlingInItem) item.clone();
			cargoHIArrvDelvItem.setCgInOutCd("O");
			cargoHIArrvDelvItem.setGatePassIssueDt(item.getHdlInEndDt());
			cargoHIArrvDelvItem.setMsrmt(item.getDmgM3());
			cargoHIArrvDelvItem.setWgt(item.getDmgMt());
			cargoHIArrvDelvItem.setPkgQty(item.getDmgQty());
			cargoHIArrvDelvItem.setDmgYn("Y");
			cargoHIArrvDelvItem.setJobCoCd("D");
			cargoHIArrvDelvItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GG);
			mstParm.setCgInOutCd("O");
			if (cargoMasterDao.selectIsCargoAvDvChk(mstParm)) {
				updateHIGPArrvDelvItems.add(cargoHIArrvDelvItem);
			} else {
				insertHIArrvDelvItems.add(cargoHIArrvDelvItem);
			}

		}

		if (item.getGatePassYn() && item.getShutRhdlMode() != null && item.getShutRhdlMode().equals(CodeConstant.MT_RHDLMODE_R)) {
			cargoHIArrvDelvItem = (CargoHandlingInItem) item.clone();
			cargoHIArrvDelvItem.setCgInOutCd("O");
			cargoHIArrvDelvItem.setGatePassIssueDt(item.getHdlInEndDt());
			cargoHIArrvDelvItem.setMsrmt(item.getShuM3());
			cargoHIArrvDelvItem.setWgt(item.getShuMt());
			cargoHIArrvDelvItem.setPkgQty(item.getShuQty());
			cargoHIArrvDelvItem.setShuYn("Y");
			cargoHIArrvDelvItem.setJobCoCd("S");
			cargoHIArrvDelvItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GG);

			mstParm.setCgInOutCd("O");
			if (cargoMasterDao.selectIsCargoAvDvChk(mstParm)) {
				updateHIGPArrvDelvItems.add(cargoHIArrvDelvItem);
			} else {
				insertHIArrvDelvItems.add(cargoHIArrvDelvItem);
			}

		}
		/**
		 * ****************************** Shut and Damage and direct location setting
		 * and gate pass ****
		 */
		if (insertItems.size() > 0) {
			cargoHandlingInDao.insertCargoHandlingInItems(insertItems);
		}

		if (updateCgMstAmtItems.size() > 0) {
			cargoHandlingInDao.updateCgHIAmtItems(updateCgMstAmtItems);
		}

		if (insertHIJobItems.size() > 0) {
			cargoHandlingInDao.insertHIJobItems(insertHIJobItems);
		}

		if (insertBalItems.size() > 0) {
			cargoHandlingInDao.insertBalItems(insertBalItems);
		}

		if (insertRhdlItems.size() > 0) {
			cargoHandlingInDao.insertRhdlItems(insertRhdlItems);
		}

		if (updateHIGPArrvDelvItems.size() > 0) {
			for (int i = 0; i < updateHIGPArrvDelvItems.size(); i++) {
				CargoHandlingInItem arrvDelvItem = (CargoHandlingInItem) updateHIGPArrvDelvItems.get(i);

				SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
				gpParm.setVslCallId(arrvDelvItem.getVslCallId());
				List gpList = cargoArrvDelvDao.selectGatepassNo(gpParm).getCollection();
				if (gpList != null && gpList.size() > 0) {
					CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
					arrvDelvItem.setGatePassNo(gpItem.getGatePassNo());
					returnItem.add(gpList);
				}

				// Update processing
				DataItemList tmpArrvDelvItems = new DataItemList();
				tmpArrvDelvItems.add(arrvDelvItem);
				cargoHandlingInDao.updateHIGPArrvDelvItems(tmpArrvDelvItems);
			}
		}

		if (updateItems.size() > 0) {
			cargoHandlingInDao.updateCargoHandlingInItems(updateItems);
		}

		if (insertInvLocItems.size() > 0) {
			cargoHandlingInDao.insertCargoInvLocationItems(insertInvLocItems);
		}

		if (insertHIJobItems.size() > 0) {
			cargoHandlingInDao.updateCargoMasterStatus(insertHIJobItems);
			cargoHandlingInDao.updateCargoMasterInfo(insertHIJobItems);
		}

		if (insertHIArrvDelvItems.size() > 0) {
			for (int i = 0; i < insertHIArrvDelvItems.size(); i++) {
				CargoHandlingInItem arrvDelvItem = (CargoHandlingInItem) insertHIArrvDelvItems.get(i);

				SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
				gpParm.setVslCallId(arrvDelvItem.getVslCallId());
				List gpList = cargoArrvDelvDao.selectGatepassNo(gpParm).getCollection();
				if (gpList != null && gpList.size() > 0) {
					CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
					arrvDelvItem.setGatePassNo(gpItem.getGatePassNo());
					returnItem.add(gpList);
				}
				// Insert processing
				DataItemList tmpArrvDelvItems = new DataItemList();
				tmpArrvDelvItems.add(arrvDelvItem);
				cargoHandlingInDao.insertHIArrvDelvItems(tmpArrvDelvItems);
			}
		}
		if (updateHIArrvDelvItems.size() > 0) {
			cargoHandlingInDao.updateHIArrvDelvItems(updateHIArrvDelvItems);
		}

		if (insertGateInItems.size() > 0) { // TMT_ARRV_DELV
			cargoHandlingInDao.insertHIGeneralGateIn(insertGateInItems);
		}

		if (updateGateInItems.size() > 0) { // TMT_ARRV_DELV
			cargoHandlingInDao.updateHIGateInTime(updateGateInItems);
		}

		if (updateGateInLorryItems.size() > 0) { // TMT_ARRV_DELV
			cargoHandlingInDao.updateHIGateInLorry(updateGateInLorryItems);
		}

		if (updateGateInOnlyLorryItems.size() > 0) {
			cargoHandlingInDao.updateHIOnlyLorry(updateGateInOnlyLorryItems);
		}
		
		//Package Items
        insertPakageJobItems(insertHIJobItems);

		DataItemList itemList = new DataItemList();
		itemList.add(insertHIJobItems);
		return itemList;
	}
	
	public DataItemList updateCargoHandlingInItems(UpdateItemsBizParm parm) throws BizException {
		CargoHandlingInItem returnItem = new CargoHandlingInItem();
		CargoHandlingInItem masterItem = (CargoHandlingInItem) parm.getUpdateItem();
		DataItemList items = new DataItemList();
		items.add(masterItem);

		CargoHandlingInItem cargoHIJobItem = null;
		CargoHandlingInItem cargoHIInvLocItem = null;
		
		String jobGroupNo = null;
		SearchCargoMasterParm mstParm;

		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList insertHIJobItems = new DataItemList();

		DataItemList updateHIGPArrvDelvItems = new DataItemList();
		DataItemList insertInvLocItems = new DataItemList();
		CargoHandlingInItem item = (CargoHandlingInItem) items.get(0);

		mstParm = new SearchCargoMasterParm();
		mstParm.setCgNo(item.getCgNo());
		mstParm.setVslCallId(item.getVslCallId());
		mstParm.setLorryNo(item.getLorryId());
		mstParm.setCgInOutCd("I");

		SearchCargoHandlingInParm hiParm = new SearchCargoHandlingInParm();
		hiParm.setCgNo(item.getCgNo());
		hiParm.setVslCallId(item.getVslCallId());

		jobGroupNo = cargoMasterDao.selectJobGroupNo(mstParm);
		item.setJobGroup(jobGroupNo);

		item.setStat(CodeConstant.MT_CGSTATUS_ST);
		cargoHIJobItem = (CargoHandlingInItem) item.clone();
		cargoHIJobItem.setJobTpCd(CodeConstant.MT_JOBTP_LF);
		cargoHIJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GW);
		cargoHIJobItem.setStat(CodeConstant.MT_JOBSTATCD_COM);
		cargoHIJobItem.setJobCoCd(CodeConstant.INVLOC_WH_TP_NORMAL);
		
		//TMT_CG_MST
		if (cargoMasterDao.selectIsCargoMst(mstParm)) {
			updateItems.add(item);
		} else {
			insertItems.add(item);
		}
		
		//TMT_JOB
		insertHIJobItems.add(cargoHIJobItem);

		//TMT_INV_LOC
		ArrayList invLocItems = (ArrayList) cargoHIJobItem.getWhConfigurationItems();
		for (int j = 0; j < invLocItems.size(); j++) {
			cargoHIInvLocItem = (CargoHandlingInItem) cargoHIJobItem.clone();
			WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems.get(j);
			if (whconfItem.getWhTpCd() == null || whconfItem.getWhTpCd() == ""
					|| whconfItem.getWhTpCd().equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
				
				cargoHIInvLocItem.setLocArea(cargoHIJobItem.getLocId());
				cargoHIInvLocItem.setLocId(whconfItem.getLocId());
				cargoHIInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
				cargoHIInvLocItem.setLocWgt((whconfItem.getWgt()));
				cargoHIInvLocItem.setLocMsrmt((whconfItem.getMsrmt()));
				cargoHIInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
				cargoHIInvLocItem.setWhLocTpCd(whconfItem.getLocTpCd());
				cargoHIInvLocItem.setJobCoCd(whconfItem.getWhTpCd());
				insertInvLocItems.add(cargoHIInvLocItem);
			}

		}
		
		/**
		 * Check SHUT OUT.
		 * */
		int shuQty = item.getShuQty();
		double shuMt = item.getShuMt();
		double shuM3 = item.getShuM3();
		List <WhConfigurationItem> shuWhItems = item.getShuWhItems();
		
		if(shuWhItems != null && shuWhItems.size() > 0) {
			CargoHandlingInItem shuHiJobItem = null;
			shuHiJobItem = (CargoHandlingInItem) item.clone();
			shuHiJobItem.setJobTpCd(CodeConstant.MT_JOBTP_LF);
			shuHiJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GW);
			shuHiJobItem.setStat(CodeConstant.MT_JOBSTATCD_COM);
			shuHiJobItem.setJobCoCd(CodeConstant.INVLOC_WH_TP_SHUTOUT);
			
			shuHiJobItem.setPkgQty(shuQty);
			shuHiJobItem.setWgt(shuMt);
			shuHiJobItem.setMsrmt(shuM3);
			shuHiJobItem.setLocId(shuHiJobItem.getShuLocId());
			
			insertHIJobItems.add(shuHiJobItem);
			
			for (int j = 0; j < shuWhItems.size(); j++) {
				cargoHIInvLocItem = (CargoHandlingInItem) shuHiJobItem.clone();
				WhConfigurationItem whconfItem = (WhConfigurationItem) shuWhItems.get(j);
					
					cargoHIInvLocItem.setLocArea(shuHiJobItem.getShuLocId());
					cargoHIInvLocItem.setLocId(whconfItem.getLocId());
					cargoHIInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
					cargoHIInvLocItem.setLocWgt((whconfItem.getWgt()));
					cargoHIInvLocItem.setLocMsrmt((whconfItem.getMsrmt()));
					cargoHIInvLocItem.setJobCoCd(CodeConstant.INVLOC_WH_TP_SHUTOUT);
					cargoHIInvLocItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_SHUTOUT);
					cargoHIInvLocItem.setWhLocTpCd(whconfItem.getLocTpCd());
					cargoHIInvLocItem.setJobCoCd(whconfItem.getWhTpCd());
					insertInvLocItems.add(cargoHIInvLocItem);
				}
		}

		if (insertItems.size() > 0) {
			cargoHandlingInDao.insertCargoHandlingInItems(insertItems);
		}
		
		if (updateItems.size() > 0) {
			cargoHandlingInDao.updateCargoHandlingInItems(updateItems);
		}

		if (insertHIJobItems.size() > 0) {
			cargoHandlingInDao.insertHIJobItems(insertHIJobItems);
			cargoHandlingInDao.updateCargoMasterStatus(insertHIJobItems);
			cargoHandlingInDao.updateCargoMasterInfo(insertHIJobItems);
		}
		
		if (insertInvLocItems.size() > 0) {
			cargoHandlingInDao.insertCargoInvLocationItems(insertInvLocItems);
		}

		if (insertHIJobItems.size() > 0) {
			for (int i = 0; i < insertHIJobItems.size(); i++) {
				CargoHandlingInItem arrvDelvItem = (CargoHandlingInItem) insertHIJobItems.get(i);
				
				if(!arrvDelvItem.getJobCoCd().equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
					continue;
				}
				
				SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
				gpParm.setVslCallId(arrvDelvItem.getVslCallId());
				List gpList = cargoArrvDelvDao.selectGatepassNo(gpParm).getCollection();
				if (gpList != null && gpList.size() > 0) {
					CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
					arrvDelvItem.setGatePassNo(gpItem.getGatePassNo());
				}

				arrvDelvItem.setCgInOutCd(OperationConstant.GATE_CG_INOUT_IN);
				DataItemList tmpArrvDelvItems = new DataItemList();
				tmpArrvDelvItems.add(arrvDelvItem);
				cargoHandlingInDao.updateHIGPArrvDelvItems(tmpArrvDelvItems);
			}
		}

		//Package Items
        insertPakageJobItems(insertHIJobItems);

		DataItemList itemList = new DataItemList();
		itemList.add(insertHIJobItems);
		return itemList;
	}
	
	
	private void insertPakageJobItems(DataItemList insertJobItems) throws BizException  {
		//Package Items
		DataItemList insertPkgItems = new DataItemList();
    	CargoHandlingInItem item = (CargoHandlingInItem)insertJobItems.get(0);
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
        		  cargoHandlingInDao.insertPackageJobItems(insertPkgItems);
        	  }
        }
	}
}
