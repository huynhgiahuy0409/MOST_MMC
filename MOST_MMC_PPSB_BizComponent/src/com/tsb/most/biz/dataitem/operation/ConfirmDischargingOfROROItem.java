package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class ConfirmDischargingOfROROItem extends DataItem {

	private String vslCd;
	private String callYear;
	private String callSeq;
	private String vslCallId;
	private String masterBlNo;
	private String blNo;
	private String sdoNo;
	private String catgCd;
	private String catgNm;
	private String cgTpCd;
	private String cgTpNm;
	private String delvTpCd;
	private String blDelvTpCd;
	private String delvTpNm;
	private String doNo;
	private String nosOfUnit;
	private String remainUnit;
	private String brandCd;
	private String brandNm;
	private String brandDesc;
	private String modelCd;
	private String modelNm;
	private String unitNo;
	private String dischargedDate;
	private String inDate;
	private String unitYardLoc;
	private String blYardLoc;
	private String cdNm;
	private String cd;
	private String roroSeq;
	private String outDate;
	private String gateInDate;
	private String gateOutDate;
	private String rmk;

	private String startDtStr;
	private String loginId;
	private String statCd;
	private String jobPurpCd;
	private String ioMode;
	private String ioSeq;
	private String action;
	private String statNm;
	private String confirmedDate;
	private String yardPlanLoc;

	private String hhtFlags;
	private String ixCd;

	private String stevedoreId;
	private String dischargingRmk;
	private String yardCheckRmk;
	private String correctionUnitNo;
	private String correctionUnitNoYN;

	private String orgUnitNo;
	private String newYn;
	private String docWgt;
	private String cbm;
	private double dmgQty;
	private double dmgWgt;
	private double dmgM3;
	private String dmgYn;
	private String balQty;
	private String balMt;
	private String balM3;
	private int loadQty;
	private double loadMt;
	private double loadM3;
	private int whQty;
	private double whWgt;
	private double whM3;
	private int pkgQty;
	private double wgt;
	private double msrmt;
	private int locQty;
	private double locWgt;
	private double locMsrmt;
	private String tsptTpCd;
	private String jobGroup;
	private String opDelvTpCd;
	private String lorryNo;
	private String lorryId;
	private String driverId;
	private String fnlOpeYn;
	private String endDt;
	private String endDtStr;
	private String disEndDt;
	private String disEndDtStr;
	private String jobNo;
	private String jobTpCd;
	private String jobCoCd;
	private String cgInOutCd;
	private String fnlDelvYn;
	private String fnlYn;
	private String gatePassNo;
	private String gateTxnNo;
	private String userId;
	private String iunitNo;
	private String dunitNo;
	private String hatchNo;
	private String rePkgTpCd;
	private String pkgTpCd;
	private String eqNo;
	private String bargeCheck;
	private String toLocId;
	private String locId;
	private String locArea;
	private String whTpCd;
	private String preJobNo;
	private String spCaCoCd;
	private String whLocTpCd;
	private String tsptr;
	private String awUnit;
	public int yardTruckQty;
	public double yardTruckMt;
	public double yardTruckM3;
	private int dQty;// DocQty
	private double dMt;// Doc
	private double dM3;// Doc
	private ArrayList<ConfirmDischargingOfROROItem> cargoItems;
	private ArrayList<ConfirmDischargingOfROROItem> unitItems;
	private ArrayList<ConfirmDischargingOfROROItem> blItems;
	private List delvModeItems;
	private List cargoTypeItems;

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}

	public String getMasterBlNo() {
		return masterBlNo;
	}

	public void setMasterBlNo(String masterBlNo) {
		this.masterBlNo = masterBlNo;
	}

	public String getBlNo() {
		return blNo;
	}

	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}

	public String getCatgCd() {
		return catgCd;
	}

	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}

	public String getCatgNm() {
		return catgNm;
	}

	public void setCatgNm(String catgNm) {
		this.catgNm = catgNm;
	}

	public String getCgTpCd() {
		return cgTpCd;
	}

	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}

	public String getCgTpNm() {
		return cgTpNm;
	}

	public void setCgTpNm(String cgTpNm) {
		this.cgTpNm = cgTpNm;
	}

	public String getDelvTpCd() {
		return delvTpCd;
	}

	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}

	public String getBlDelvTpCd() {
		return blDelvTpCd;
	}

	public void setBlDelvTpCd(String blDelvTpCd) {
		this.blDelvTpCd = blDelvTpCd;
	}

	public String getDelvTpNm() {
		return delvTpNm;
	}

	public void setDelvTpNm(String delvTpNm) {
		this.delvTpNm = delvTpNm;
	}

	public String getDoNo() {
		return doNo;
	}

	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}

	public String getNosOfUnit() {
		return nosOfUnit;
	}

	public void setNosOfUnit(String nosOfUnit) {
		this.nosOfUnit = nosOfUnit;
	}

	public String getRemainUnit() {
		return remainUnit;
	}

	public void setRemainUnit(String remainUnit) {
		this.remainUnit = remainUnit;
	}

	public String getBrandCd() {
		return brandCd;
	}

	public void setBrandCd(String brandCd) {
		this.brandCd = brandCd;
	}

	public String getBrandNm() {
		return brandNm;
	}

	public void setBrandNm(String brandNm) {
		this.brandNm = brandNm;
	}

	public String getBrandDesc() {
		return brandDesc;
	}

	public void setBrandDesc(String brandDesc) {
		this.brandDesc = brandDesc;
	}

	public String getModelCd() {
		return modelCd;
	}

	public void setModelCd(String modelCd) {
		this.modelCd = modelCd;
	}

	public String getModelNm() {
		return modelNm;
	}

	public void setModelNm(String modelNm) {
		this.modelNm = modelNm;
	}

	public String getUnitNo() {
		return unitNo;
	}

	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}

	public String getDischargedDate() {
		return dischargedDate;
	}

	public void setDischargedDate(String dischargedDate) {
		this.dischargedDate = dischargedDate;
	}

	public String getInDate() {
		return inDate;
	}

	public void setInDate(String inDate) {
		this.inDate = inDate;
	}

	public String getUnitYardLoc() {
		return unitYardLoc;
	}

	public void setUnitYardLoc(String unitYardLoc) {
		this.unitYardLoc = unitYardLoc;
	}

	public String getBlYardLoc() {
		return blYardLoc;
	}

	public void setBlYardLoc(String blYardLoc) {
		this.blYardLoc = blYardLoc;
	}

	public String getCdNm() {
		return cdNm;
	}

	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
	}

	public String getCd() {
		return cd;
	}

	public void setCd(String cd) {
		this.cd = cd;
	}

	public String getRoroSeq() {
		return roroSeq;
	}

	public void setRoroSeq(String roroSeq) {
		this.roroSeq = roroSeq;
	}

	public String getOutDate() {
		return outDate;
	}

	public void setOutDate(String outDate) {
		this.outDate = outDate;
	}

	public String getGateInDate() {
		return gateInDate;
	}

	public void setGateInDate(String gateInDate) {
		this.gateInDate = gateInDate;
	}

	public String getGateOutDate() {
		return gateOutDate;
	}

	public void setGateOutDate(String gateOutDate) {
		this.gateOutDate = gateOutDate;
	}

	public String getLoginId() {
		return loginId;
	}

	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}

	public String getStatCd() {
		return statCd;
	}

	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}

	public String getJobPurpCd() {
		return jobPurpCd;
	}

	public void setJobPurpCd(String jobPurpCd) {
		this.jobPurpCd = jobPurpCd;
	}

	public String getIoMode() {
		return ioMode;
	}

	public void setIoMode(String ioMode) {
		this.ioMode = ioMode;
	}

	public String getIoSeq() {
		return ioSeq;
	}

	public void setIoSeq(String ioSeq) {
		this.ioSeq = ioSeq;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getStatNm() {
		return statNm;
	}

	public void setStatNm(String statNm) {
		this.statNm = statNm;
	}

	public String getConfirmedDate() {
		return confirmedDate;
	}

	public void setConfirmedDate(String confirmedDate) {
		this.confirmedDate = confirmedDate;
	}

	public String getYardPlanLoc() {
		return yardPlanLoc;
	}

	public void setYardPlanLoc(String yardPlanLoc) {
		this.yardPlanLoc = yardPlanLoc;
	}

	public String getHhtFlags() {
		return hhtFlags;
	}

	public void setHhtFlags(String hhtFlags) {
		this.hhtFlags = hhtFlags;
	}

	public String getIxCd() {
		return ixCd;
	}

	public void setIxCd(String ixCd) {
		this.ixCd = ixCd;
	}

	public String getStevedoreId() {
		return stevedoreId;
	}

	public void setStevedoreId(String stevedoreId) {
		this.stevedoreId = stevedoreId;
	}

	public String getDischargingRmk() {
		return dischargingRmk;
	}

	public void setDischargingRmk(String dischargingRmk) {
		this.dischargingRmk = dischargingRmk;
	}

	public String getYardCheckRmk() {
		return yardCheckRmk;
	}

	public void setYardCheckRmk(String yardCheckRmk) {
		this.yardCheckRmk = yardCheckRmk;
	}

	public String getCorrectionUnitNo() {
		return correctionUnitNo;
	}

	public void setCorrectionUnitNo(String correctionUnitNo) {
		this.correctionUnitNo = correctionUnitNo;
	}

	public String getCorrectionUnitNoYN() {
		return correctionUnitNoYN;
	}

	public void setCorrectionUnitNoYN(String correctionUnitNoYN) {
		this.correctionUnitNoYN = correctionUnitNoYN;
	}

	public String getOrgUnitNo() {
		return orgUnitNo;
	}

	public void setOrgUnitNo(String orgUnitNo) {
		this.orgUnitNo = orgUnitNo;
	}

	public String getNewYn() {
		return newYn;
	}

	public void setNewYn(String newYn) {
		this.newYn = newYn;
	}

	public ArrayList<ConfirmDischargingOfROROItem> getCargoItems() {
		return cargoItems;
	}

	public void setCargoItems(ArrayList<ConfirmDischargingOfROROItem> cargoItems) {
		this.cargoItems = cargoItems;
	}

	public ArrayList<ConfirmDischargingOfROROItem> getUnitItems() {
		return unitItems;
	}

	public void setUnitItems(ArrayList<ConfirmDischargingOfROROItem> unitItems) {
		this.unitItems = unitItems;
	}

	public ArrayList<ConfirmDischargingOfROROItem> getBlItems() {
		return blItems;
	}

	public void setBlItems(ArrayList<ConfirmDischargingOfROROItem> blItems) {
		this.blItems = blItems;
	}

	public List getDelvModeItems() {
		return delvModeItems;
	}

	public void setDelvModeItems(List delvModeItems) {
		this.delvModeItems = delvModeItems;
	}

	public List getCargoTypeItems() {
		return cargoTypeItems;
	}

	public void setCargoTypeItems(List cargoTypeItems) {
		this.cargoTypeItems = cargoTypeItems;
	}

	public String getVslCd() {
		return vslCd;
	}

	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}

	public String getCallYear() {
		return callYear;
	}

	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}

	public String getCallSeq() {
		return callSeq;
	}

	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}

	public String getDocWgt() {
		return docWgt;
	}

	public void setDocWgt(String docWgt) {
		this.docWgt = docWgt;
	}

	public String getCbm() {
		return cbm;
	}

	public void setCbm(String cbm) {
		this.cbm = cbm;
	}

	public String getTsptTpCd() {
		return tsptTpCd;
	}

	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}

	public String getBalQty() {
		return balQty;
	}

	public void setBalQty(String balQty) {
		this.balQty = balQty;
	}

	public String getBalMt() {
		return balMt;
	}

	public void setBalMt(String balMt) {
		this.balMt = balMt;
	}

	public String getBalM3() {
		return balM3;
	}

	public void setBalM3(String balM3) {
		this.balM3 = balM3;
	}

	public String getJobGroup() {
		return jobGroup;
	}

	public void setJobGroup(String jobGroup) {
		this.jobGroup = jobGroup;
	}

	public String getOpDelvTpCd() {
		return opDelvTpCd;
	}

	public void setOpDelvTpCd(String opDelvTpCd) {
		this.opDelvTpCd = opDelvTpCd;
	}

	public String getLorryNo() {
		return lorryNo;
	}

	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}

	public String getLorryId() {
		return lorryId;
	}

	public void setLorryId(String lorryId) {
		this.lorryId = lorryId;
	}

	public String getFnlOpeYn() {
		return fnlOpeYn;
	}

	public void setFnlOpeYn(String fnlOpeYn) {
		this.fnlOpeYn = fnlOpeYn;
	}

	public String getEndDt() {
		return endDt;
	}

	public void setEndDt(String endDt) {
		this.endDt = endDt;
	}

	public String getEndDtStr() {
		return endDtStr;
	}

	public void setEndDtStr(String endDtStr) {
		this.endDtStr = endDtStr;
	}

	public String getDisEndDt() {
		return disEndDt;
	}

	public void setDisEndDt(String disEndDt) {
		this.disEndDt = disEndDt;
	}

	public String getDisEndDtStr() {
		return disEndDtStr;
	}

	public void setDisEndDtStr(String disEndDtStr) {
		this.disEndDtStr = disEndDtStr;
	}

	public String getJobTpCd() {
		return jobTpCd;
	}

	public void setJobTpCd(String jobTpCd) {
		this.jobTpCd = jobTpCd;
	}

	public String getCgInOutCd() {
		return cgInOutCd;
	}

	public void setCgInOutCd(String cgInOutCd) {
		this.cgInOutCd = cgInOutCd;
	}

	public String getFnlDelvYn() {
		return fnlDelvYn;
	}

	public void setFnlDelvYn(String fnlDelvYn) {
		this.fnlDelvYn = fnlDelvYn;
	}

	public String getFnlYn() {
		return fnlYn;
	}

	public void setFnlYn(String fnlYn) {
		this.fnlYn = fnlYn;
	}

	public String getDmgYn() {
		return dmgYn;
	}

	public void setDmgYn(String dmgYn) {
		this.dmgYn = dmgYn;
	}

	public double getDmgQty() {
		return dmgQty;
	}

	public void setDmgQty(double dmgQty) {
		this.dmgQty = dmgQty;
	}

	public double getDmgWgt() {
		return dmgWgt;
	}

	public void setDmgWgt(double dmgWgt) {
		this.dmgWgt = dmgWgt;
	}

	public double getDmgM3() {
		return dmgM3;
	}

	public void setDmgM3(double dmgM3) {
		this.dmgM3 = dmgM3;
	}

	public int getLoadQty() {
		return loadQty;
	}

	public void setLoadQty(int loadQty) {
		this.loadQty = loadQty;
	}

	public double getLoadMt() {
		return loadMt;
	}

	public void setLoadMt(double loadMt) {
		this.loadMt = loadMt;
	}

	public double getLoadM3() {
		return loadM3;
	}

	public void setLoadM3(double loadM3) {
		this.loadM3 = loadM3;
	}

	public int getWhQty() {
		return whQty;
	}

	public void setWhQty(int whQty) {
		this.whQty = whQty;
	}

	public double getWhWgt() {
		return whWgt;
	}

	public void setWhWgt(double whWgt) {
		this.whWgt = whWgt;
	}

	public double getWhM3() {
		return whM3;
	}

	public void setWhM3(double whM3) {
		this.whM3 = whM3;
	}

	public int getPkgQty() {
		return pkgQty;
	}

	public void setPkgQty(int pkgQty) {
		this.pkgQty = pkgQty;
	}

	public double getWgt() {
		return wgt;
	}

	public void setWgt(double wgt) {
		this.wgt = wgt;
	}

	public double getMsrmt() {
		return msrmt;
	}

	public void setMsrmt(double msrmt) {
		this.msrmt = msrmt;
	}

	public String getGatePassNo() {
		return gatePassNo;
	}

	public void setGatePassNo(String gatePassNo) {
		this.gatePassNo = gatePassNo;
	}

	public String getRmk() {
		return rmk;
	}

	public void setRmk(String rmk) {
		this.rmk = rmk;
	}

	public String getGateTxnNo() {
		return gateTxnNo;
	}

	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getIunitNo() {
		return iunitNo;
	}

	public void setIunitNo(String iunitNo) {
		this.iunitNo = iunitNo;
	}

	public String getDunitNo() {
		return dunitNo;
	}

	public void setDunitNo(String dunitNo) {
		this.dunitNo = dunitNo;
	}

	public String getDriverId() {
		return driverId;
	}

	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}

	public String getJobNo() {
		return jobNo;
	}

	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}

	public String getJobCoCd() {
		return jobCoCd;
	}

	public void setJobCoCd(String jobCoCd) {
		this.jobCoCd = jobCoCd;
	}

	public String getHatchNo() {
		return hatchNo;
	}

	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}

	public String getRePkgTpCd() {
		return rePkgTpCd;
	}

	public void setRePkgTpCd(String rePkgTpCd) {
		this.rePkgTpCd = rePkgTpCd;
	}

	public String getPkgTpCd() {
		return pkgTpCd;
	}

	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}

	public String getEqNo() {
		return eqNo;
	}

	public void setEqNo(String eqNo) {
		this.eqNo = eqNo;
	}

	public String getBargeCheck() {
		return bargeCheck;
	}

	public void setBargeCheck(String bargeCheck) {
		this.bargeCheck = bargeCheck;
	}

	public String getToLocId() {
		return toLocId;
	}

	public void setToLocId(String toLocId) {
		this.toLocId = toLocId;
	}

	public String getLocId() {
		return locId;
	}

	public void setLocId(String locId) {
		this.locId = locId;
	}

	public String getLocArea() {
		return locArea;
	}

	public void setLocArea(String locArea) {
		this.locArea = locArea;
	}

	public int getLocQty() {
		return locQty;
	}

	public void setLocQty(int locQty) {
		this.locQty = locQty;
	}

	public double getLocWgt() {
		return locWgt;
	}

	public void setLocWgt(double locWgt) {
		this.locWgt = locWgt;
	}

	public double getLocMsrmt() {
		return locMsrmt;
	}

	public void setLocMsrmt(double locMsrmt) {
		this.locMsrmt = locMsrmt;
	}

	public String getWhTpCd() {
		return whTpCd;
	}

	public void setWhTpCd(String whTpCd) {
		this.whTpCd = whTpCd;
	}

	public String getPreJobNo() {
		return preJobNo;
	}

	public void setPreJobNo(String preJobNo) {
		this.preJobNo = preJobNo;
	}

	public String getSpCaCoCd() {
		return spCaCoCd;
	}

	public void setSpCaCoCd(String spCaCoCd) {
		this.spCaCoCd = spCaCoCd;
	}

	public String getWhLocTpCd() {
		return whLocTpCd;
	}

	public void setWhLocTpCd(String whLocTpCd) {
		this.whLocTpCd = whLocTpCd;
	}

	public String getTsptr() {
		return tsptr;
	}

	public void setTsptr(String tsptr) {
		this.tsptr = tsptr;
	}

	public String getStartDtStr() {
		return startDtStr;
	}

	public void setStartDtStr(String startDtStr) {
		this.startDtStr = startDtStr;
	}

	public int getYardTruckQty() {
		return yardTruckQty;
	}

	public void setYardTruckQty(int yardTruckQty) {
		this.yardTruckQty = yardTruckQty;
	}

	public double getYardTruckMt() {
		return yardTruckMt;
	}

	public void setYardTruckMt(double yardTruckMt) {
		this.yardTruckMt = yardTruckMt;
	}

	public double getYardTruckM3() {
		return yardTruckM3;
	}

	public void setYardTruckM3(double yardTruckM3) {
		this.yardTruckM3 = yardTruckM3;
	}

	public String getSdoNo() {
		return sdoNo;
	}

	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}

	public String getAwUnit() {
		return awUnit;
	}

	public void setAwUnit(String awUnit) {
		this.awUnit = awUnit;
	}

	public int getdQty() {
		return dQty;
	}

	public void setdQty(int dQty) {
		this.dQty = dQty;
	}

	public double getdMt() {
		return dMt;
	}

	public void setdMt(double dMt) {
		this.dMt = dMt;
	}

	public double getdM3() {
		return dM3;
	}

	public void setdM3(double dM3) {
		this.dM3 = dM3;
	}

}
