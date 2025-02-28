package com.tsb.most.biz.dataitem.billing;

import java.util.Date;

import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;

public class TariffCodeGeneratorItem extends DataItem {
	private static final long serialVersionUID = 9044633079194017677L;
	
	private String opeClass;
	private String rhdlMode;
	private String deliveryType;
	private String pol;
	private String pod;
	private String cargoType;
	private String commodityGroup;
	private String commodity;
	private String packageType;
	private String dgClass;
	private String modeofOpr;
	private String damaged;
	private String cargoImSt=""; 
	private String cargoImEnd="";
	private String cargoExSt="";
	private String cargoExEnd="";
	private String cargoBothSt="";
	private String cargoBothEnd="";
	private String cargoId;
	private String cgWgt;
	private String cgMsrmt;
	private String pkgQty;
	private String docWgt;
	private String docMsrmt;
	private String docPkgQty;
	private Date hdlInTime;
	private Date hdlOutTime;
	private Date lastBillingDate;
	private String freeStrgDD;
	private String blNo;
	private String shipgNoteNo;
	private String shipgAgnt;
	private String fwrAgent;
	private String shpr;
	private String cnsne;
	private String currLocId;
	private String billPkgQty;
	private String billWgt;
	private String billMsrmt;
	private String billwgtd;
	private String billMsgmtd;
	private String billPkgQtyd;
	private String descr;
	private String repkgTpCd;
	private String reconcileStatus;
	private String expectedDeliveryDay =""; // YYYYMMHHHH24LMI
	private String whLocTp; 
	
	private String vslCallId;
	
	private DataItemList trfBucketList = null; 
	private DataItemList invoiceList = null;
	
	private String scrId;
	private String adhocYn;
	private String refNo;
	private String refNo2;
	private String refNo4;
	private String jobPurpCd;
	private String loadStDt;
	private String loadEndDt;
	private String disStDt;
	private String disEndDt;
	private String workStDt;
	private String workEndDt;
	private String toLocId;
	private String shipftDt;
	private String shipftNm;
	private String pkgTpCd;
	private String handleType;
	private String rcCoCd;
	private String rhdlNo;
	private String jobCoCd;
	private String shuYn;
	private String jobGroup;
	private String specCargoCond;
	private String ivPrfx;
	private String cgNo;
	private String searchType;
	private String jobNo;
	
	private String shipgAgntPayTpCd;
	private String fwrAgentPayTpCd;
	private String shprPayTpCd;
	private String cnsnePayTpCd;
	private String shaPayTpCd;
	private String payer;
	private String wgtChk;
	private String equipmentType;
	
	//for Vessel
	private String vslCd;
	private String callYear;
	
	private String berthLoc;
	private String curAtb;
	private String arrvSaId;
	private String accNo;
	private String departSaId;
	private String vslTp;
	private String bbtLoc;
	private String loa;
	private String nrt;
	private String grt;
	private String dwt;
	private String sacorpId;
	private String tradeTp;
	private String purpCallCd;
	private String eta;
	private String etd;
	private String atu;
	private String atb;
	private String atd;
	private String ata;
	private String atw;
	private String atc;
	private String modeofOprLr;
	private String modeofOprSe;
	private String cgWgtLr;
	private String cgMsrmtLr;
	private String pkgQtyLr;
	private String cgWgtSe;
	private String cgMsrmtSe;
	private String pkgQtySe;
	
	//MMC-Vessel
	private String arrivalTime;
	private String dlyStDt;
	private String dlyEndDt;
	private String bnkAtb;
	private String bnkStDt;
	private String bnkEndDt;
	private String privateBerth;
	private String shift;
	private String handledQty;
	private String cargoTypeCnt;
	private String cargoTpMpts;
	
	private String dockageType;
	private String dockageHrs;
	private String normalDockageHrs;
	private String firstDockageHrs;
	private String secondDockageHrs;
	private String thirdDockageHrs;
	private String dblBnkDivCd;
	private String delayHrs;

	//MMC - Settlement
	private String catgCd;
	private String applyFreeDays;
	private String tradeType;
	private String vslPurpCall;
	private String vslTpCd;
	private String shipToShipYn;
	private String psnSvcTpCd;
	private String cargoShiftTpCd;
	private String operatorType;
	private String scn;
	
	public String getOpeClass() {
		return opeClass;
	}
	public void setOpeClass(String opeClass) {
		this.opeClass = opeClass;
	}
	public String getRhdlMode() {
		return rhdlMode;
	}
	public void setRhdlMode(String rhdlMode) {
		this.rhdlMode = rhdlMode;
	}
	public String getDeliveryType() {
		return deliveryType;
	}
	public void setDeliveryType(String deliveryType) {
		this.deliveryType = deliveryType;
	}
	public String getPol() {
		return pol;
	}
	public void setPol(String pol) {
		this.pol = pol;
	}
	public String getPod() {
		return pod;
	}
	public void setPod(String pod) {
		this.pod = pod;
	}
	public String getCargoType() {
		return cargoType;
	}
	public void setCargoType(String cargoType) {
		this.cargoType = cargoType;
	}
	public String getCommodityGroup() {
		return commodityGroup;
	}
	public void setCommodityGroup(String commodityGroup) {
		this.commodityGroup = commodityGroup;
	}
	public String getCommodity() {
		return commodity;
	}
	public void setCommodity(String commodity) {
		this.commodity = commodity;
	}
	public String getPackageType() {
		return packageType;
	}
	public void setPackageType(String packageType) {
		this.packageType = packageType;
	}
	public String getDgClass() {
		return dgClass;
	}
	public void setDgClass(String dgClass) {
		this.dgClass = dgClass;
	}
	public String getModeofOpr() {
		return modeofOpr;
	}
	public void setModeofOpr(String modeofOpr) {
		this.modeofOpr = modeofOpr;
	}
	public String getDamaged() {
		return damaged;
	}
	public void setDamaged(String damaged) {
		this.damaged = damaged;
	}
	public String getCargoImSt() {
		return cargoImSt;
	}
	public void setCargoImSt(String cargoImSt) {
		this.cargoImSt = cargoImSt;
	}
	public String getCargoImEnd() {
		return cargoImEnd;
	}
	public void setCargoImEnd(String cargoImEnd) {
		this.cargoImEnd = cargoImEnd;
	}
	public String getCargoExSt() {
		return cargoExSt;
	}
	public void setCargoExSt(String cargoExSt) {
		this.cargoExSt = cargoExSt;
	}
	public String getCargoExEnd() {
		return cargoExEnd;
	}
	public void setCargoExEnd(String cargoExEnd) {
		this.cargoExEnd = cargoExEnd;
	}
	public String getCargoBothSt() {
		return cargoBothSt;
	}
	public void setCargoBothSt(String cargoBothSt) {
		this.cargoBothSt = cargoBothSt;
	}
	public String getCargoBothEnd() {
		return cargoBothEnd;
	}
	public void setCargoBothEnd(String cargoBothEnd) {
		this.cargoBothEnd = cargoBothEnd;
	}
	public String getCargoId() {
		return cargoId;
	}
	public void setCargoId(String cargoId) {
		this.cargoId = cargoId;
	}
	public String getCgWgt() {
		return cgWgt;
	}
	public void setCgWgt(String cgWgt) {
		this.cgWgt = cgWgt;
	}
	public String getCgMsrmt() {
		return cgMsrmt;
	}
	public void setCgMsrmt(String cgMsrmt) {
		this.cgMsrmt = cgMsrmt;
	}
	public String getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(String pkgQty) {
		this.pkgQty = pkgQty;
	}
	public String getDocWgt() {
		return docWgt;
	}
	public void setDocWgt(String docWgt) {
		this.docWgt = docWgt;
	}
	public String getDocMsrmt() {
		return docMsrmt;
	}
	public void setDocMsrmt(String docMsrmt) {
		this.docMsrmt = docMsrmt;
	}
	public String getDocPkgQty() {
		return docPkgQty;
	}
	public void setDocPkgQty(String docPkgQty) {
		this.docPkgQty = docPkgQty;
	}
	public Date getHdlInTime() {
		return hdlInTime;
	}
	public void setHdlInTime(Date hdlInTime) {
		this.hdlInTime = hdlInTime;
	}
	public Date getHdlOutTime() {
		return hdlOutTime;
	}
	public void setHdlOutTime(Date hdlOutTime) {
		this.hdlOutTime = hdlOutTime;
	}
	public Date getLastBillingDate() {
		return lastBillingDate;
	}
	public void setLastBillingDate(Date lastBillingDate) {
		this.lastBillingDate = lastBillingDate;
	}
	public String getFreeStrgDD() {
		return freeStrgDD;
	}
	public void setFreeStrgDD(String freeStrgDD) {
		this.freeStrgDD = freeStrgDD;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getShipgAgnt() {
		return shipgAgnt;
	}
	public void setShipgAgnt(String shipgAgnt) {
		this.shipgAgnt = shipgAgnt;
	}
	public String getFwrAgent() {
		return fwrAgent;
	}
	public void setFwrAgent(String fwrAgent) {
		this.fwrAgent = fwrAgent;
	}
	public String getShpr() {
		return shpr;
	}
	public void setShpr(String shpr) {
		this.shpr = shpr;
	}
	public String getCnsne() {
		return cnsne;
	}
	public void setCnsne(String cnsne) {
		this.cnsne = cnsne;
	}
	public String getCurrLocId() {
		return currLocId;
	}
	public void setCurrLocId(String currLocId) {
		this.currLocId = currLocId;
	}
	public String getBillPkgQty() {
		return billPkgQty;
	}
	public void setBillPkgQty(String billPkgQty) {
		this.billPkgQty = billPkgQty;
	}
	public String getBillWgt() {
		return billWgt;
	}
	public void setBillWgt(String billWgt) {
		this.billWgt = billWgt;
	}
	public String getBillMsrmt() {
		return billMsrmt;
	}
	public void setBillMsrmt(String billMsrmt) {
		this.billMsrmt = billMsrmt;
	}
	public String getCallYear() {
		return callYear;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	public String getBillwgtd() {
		return billwgtd;
	}
	public void setBillwgtd(String billwgtd) {
		this.billwgtd = billwgtd;
	}
	public String getBillMsgmtd() {
		return billMsgmtd;
	}
	public void setBillMsgmtd(String billMsgmtd) {
		this.billMsgmtd = billMsgmtd;
	}
	public String getBillPkgQtyd() {
		return billPkgQtyd;
	}
	public void setBillPkgQtyd(String billPkgQtyd) {
		this.billPkgQtyd = billPkgQtyd;
	}
	public String getDescr() {
		return descr;
	}
	public void setDescr(String descr) {
		this.descr = descr;
	}
	public String getRepkgTpCd() {
		return repkgTpCd;
	}
	public void setRepkgTpCd(String repkgTpCd) {
		this.repkgTpCd = repkgTpCd;
	}
	public String getReconcileStatus() {
		return reconcileStatus;
	}
	public void setReconcileStatus(String reconcileStatus) {
		this.reconcileStatus = reconcileStatus;
	}
	public String getExpectedDeliveryDay() {
		return expectedDeliveryDay;
	}
	public void setExpectedDeliveryDay(String expectedDeliveryDay) {
		this.expectedDeliveryDay = expectedDeliveryDay;
	}
	public String getWhLocTp() {
		return whLocTp;
	}
	public void setWhLocTp(String whLocTp) {
		this.whLocTp = whLocTp;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public DataItemList getTrfBucketList() {
		return trfBucketList;
	}
	public void setTrfBucketList(DataItemList trfBucketList) {
		this.trfBucketList = trfBucketList;
	}
	public DataItemList getInvoiceList() {
		return invoiceList;
	}
	public void setInvoiceList(DataItemList invoiceList) {
		this.invoiceList = invoiceList;
	}
	public String getScrId() {
		return scrId;
	}
	public void setScrId(String scrId) {
		this.scrId = scrId;
	}
	public String getAdhocYn() {
		return adhocYn;
	}
	public void setAdhocYn(String adhocYn) {
		this.adhocYn = adhocYn;
	}
	public String getRefNo() {
		return refNo;
	}
	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
	public String getRefNo2() {
		return refNo2;
	}
	public void setRefNo2(String refNo2) {
		this.refNo2 = refNo2;
	}
	public String getRefNo4() {
		return refNo4;
	}
	public void setRefNo4(String refNo4) {
		this.refNo4 = refNo4;
	}
	public String getJobPurpCd() {
		return jobPurpCd;
	}
	public void setJobPurpCd(String jobPurpCd) {
		this.jobPurpCd = jobPurpCd;
	}
	public String getLoadStDt() {
		return loadStDt;
	}
	public void setLoadStDt(String loadStDt) {
		this.loadStDt = loadStDt;
	}
	public String getLoadEndDt() {
		return loadEndDt;
	}
	public void setLoadEndDt(String loadEndDt) {
		this.loadEndDt = loadEndDt;
	}
	public String getDisStDt() {
		return disStDt;
	}
	public void setDisStDt(String disStDt) {
		this.disStDt = disStDt;
	}
	public String getDisEndDt() {
		return disEndDt;
	}
	public void setDisEndDt(String disEndDt) {
		this.disEndDt = disEndDt;
	}
	public String getWorkStDt() {
		return workStDt;
	}
	public void setWorkStDt(String workStDt) {
		this.workStDt = workStDt;
	}
	public String getWorkEndDt() {
		return workEndDt;
	}
	public void setWorkEndDt(String workEndDt) {
		this.workEndDt = workEndDt;
	}
	public String getAtd() {
		return atd;
	}
	public void setAtd(String atd) {
		this.atd = atd;
	}
	public String getAta() {
		return ata;
	}
	public void setAta(String ata) {
		this.ata = ata;
	}
	public String getToLocId() {
		return toLocId;
	}
	public void setToLocId(String toLocId) {
		this.toLocId = toLocId;
	}
	public String getShipftDt() {
		return shipftDt;
	}
	public void setShipftDt(String shipftDt) {
		this.shipftDt = shipftDt;
	}
	public String getShipftNm() {
		return shipftNm;
	}
	public void setShipftNm(String shipftNm) {
		this.shipftNm = shipftNm;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getHandleType() {
		return handleType;
	}
	public void setHandleType(String handleType) {
		this.handleType = handleType;
	}
	public String getRcCoCd() {
		return rcCoCd;
	}
	public void setRcCoCd(String rcCoCd) {
		this.rcCoCd = rcCoCd;
	}
	public String getRhdlNo() {
		return rhdlNo;
	}
	public void setRhdlNo(String rhdlNo) {
		this.rhdlNo = rhdlNo;
	}
	public String getJobCoCd() {
		return jobCoCd;
	}
	public void setJobCoCd(String jobCoCd) {
		this.jobCoCd = jobCoCd;
	}
	public String getShuYn() {
		return shuYn;
	}
	public void setShuYn(String shuYn) {
		this.shuYn = shuYn;
	}
	public String getJobGroup() {
		return jobGroup;
	}
	public void setJobGroup(String jobGroup) {
		this.jobGroup = jobGroup;
	}
	public String getSpecCargoCond() {
		return specCargoCond;
	}
	public void setSpecCargoCond(String specCargoCond) {
		this.specCargoCond = specCargoCond;
	}
	public String getIvPrfx() {
		return ivPrfx;
	}
	public void setIvPrfx(String ivPrfx) {
		this.ivPrfx = ivPrfx;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getShipgAgntPayTpCd() {
		return shipgAgntPayTpCd;
	}
	public void setShipgAgntPayTpCd(String shipgAgntPayTpCd) {
		this.shipgAgntPayTpCd = shipgAgntPayTpCd;
	}
	public String getFwrAgentPayTpCd() {
		return fwrAgentPayTpCd;
	}
	public void setFwrAgentPayTpCd(String fwrAgentPayTpCd) {
		this.fwrAgentPayTpCd = fwrAgentPayTpCd;
	}
	public String getShprPayTpCd() {
		return shprPayTpCd;
	}
	public void setShprPayTpCd(String shprPayTpCd) {
		this.shprPayTpCd = shprPayTpCd;
	}
	public String getCnsnePayTpCd() {
		return cnsnePayTpCd;
	}
	public void setCnsnePayTpCd(String cnsnePayTpCd) {
		this.cnsnePayTpCd = cnsnePayTpCd;
	}
	public String getPayer() {
		return payer;
	}
	public void setPayer(String payer) {
		this.payer = payer;
	}
	public String getBerthLoc() {
		return berthLoc;
	}
	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}
	public String getCurAtb() {
		return curAtb;
	}
	public void setCurAtb(String curAtb) {
		this.curAtb = curAtb;
	}
	public String getArrvSaId() {
		return arrvSaId;
	}
	public void setArrvSaId(String arrvSaId) {
		this.arrvSaId = arrvSaId;
	}
	public String getAccNo() {
		return accNo;
	}
	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}
	public String getDepartSaId() {
		return departSaId;
	}
	public void setDepartSaId(String departSaId) {
		this.departSaId = departSaId;
	}

	public String getBbtLoc() {
		return bbtLoc;
	}
	public void setBbtLoc(String bbtLoc) {
		this.bbtLoc = bbtLoc;
	}
	public String getLoa() {
		return loa;
	}
	public void setLoa(String loa) {
		this.loa = loa;
	}
	public String getNrt() {
		return nrt;
	}
	public void setNrt(String nrt) {
		this.nrt = nrt;
	}
	public String getGrt() {
		return grt;
	}
	public void setGrt(String grt) {
		this.grt = grt;
	}
	public String getDwt() {
		return dwt;
	}
	public void setDwt(String dwt) {
		this.dwt = dwt;
	}
	public String getSacorpId() {
		return sacorpId;
	}
	public void setSacorpId(String sacorpId) {
		this.sacorpId = sacorpId;
	}
	public String getTradeTp() {
		return tradeTp;
	}
	public void setTradeTp(String tradeTp) {
		this.tradeTp = tradeTp;
	}
	public String getPurpCallCd() {
		return purpCallCd;
	}
	public void setPurpCallCd(String purpCallCd) {
		this.purpCallCd = purpCallCd;
	}
	public String getShaPayTpCd() {
		return shaPayTpCd;
	}
	public void setShaPayTpCd(String shaPayTpCd) {
		this.shaPayTpCd = shaPayTpCd;
	}
	public String getEta() {
		return eta;
	}
	public void setEta(String eta) {
		this.eta = eta;
	}
	public String getEtd() {
		return etd;
	}
	public void setEtd(String etd) {
		this.etd = etd;
	}
	public String getAtu() {
		return atu;
	}
	public void setAtu(String atu) {
		this.atu = atu;
	}
	public String getAtb() {
		return atb;
	}
	public void setAtb(String atb) {
		this.atb = atb;
	}
	public String getWgtChk() {
		return wgtChk;
	}
	public void setWgtChk(String wgtChk) {
		this.wgtChk = wgtChk;
	}
	public String getEquipmentType() {
		return equipmentType;
	}
	public void setEquipmentType(String equipmentType) {
		this.equipmentType = equipmentType;
	}
	public String getModeofOprLr() {
		return modeofOprLr;
	}
	public void setModeofOprLr(String modeofOprLr) {
		this.modeofOprLr = modeofOprLr;
	}
	public String getModeofOprSe() {
		return modeofOprSe;
	}
	public void setModeofOprSe(String modeofOprSe) {
		this.modeofOprSe = modeofOprSe;
	}
	public String getCgWgtLr() {
		return cgWgtLr;
	}
	public void setCgWgtLr(String cgWgtLr) {
		this.cgWgtLr = cgWgtLr;
	}
	public String getPkgQtyLr() {
		return pkgQtyLr;
	}
	public void setPkgQtyLr(String pkgQtyLr) {
		this.pkgQtyLr = pkgQtyLr;
	}
	public String getCgMsrmtLr() {
		return cgMsrmtLr;
	}
	public void setCgMsrmtLr(String cgMsrmtLr) {
		this.cgMsrmtLr = cgMsrmtLr;
	}
	public String getCgWgtSe() {
		return cgWgtSe;
	}
	public void setCgWgtSe(String cgWgtSe) {
		this.cgWgtSe = cgWgtSe;
	}
	public String getCgMsrmtSe() {
		return cgMsrmtSe;
	}
	public void setCgMsrmtSe(String cgMsrmtSe) {
		this.cgMsrmtSe = cgMsrmtSe;
	}
	public String getPkgQtySe() {
		return pkgQtySe;
	}
	public void setPkgQtySe(String pkgQtySe) {
		this.pkgQtySe = pkgQtySe;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getApplyFreeDays() {
		return applyFreeDays;
	}
	public void setApplyFreeDays(String applyFreeDays) {
		this.applyFreeDays = applyFreeDays;
	}
	public String getTradeType() {
		return tradeType;
	}
	public void setTradeType(String tradeType) {
		this.tradeType = tradeType;
	}
	public String getVslPurpCall() {
		return vslPurpCall;
	}
	public void setVslPurpCall(String vslPurpCall) {
		this.vslPurpCall = vslPurpCall;
	}
	public String getVslTpCd() {
		return vslTpCd;
	}
	public void setVslTpCd(String vslTpCd) {
		this.vslTpCd = vslTpCd;
	}
	public String getShipToShipYn() {
		return shipToShipYn;
	}
	public void setShipToShipYn(String shipToShipYn) {
		this.shipToShipYn = shipToShipYn;
	}
	public String getPsnSvcTpCd() {
		return psnSvcTpCd;
	}
	public void setPsnSvcTpCd(String psnSvcTpCd) {
		this.psnSvcTpCd = psnSvcTpCd;
	}
	public String getCargoShiftTpCd() {
		return cargoShiftTpCd;
	}
	public void setCargoShiftTpCd(String cargoShiftTpCd) {
		this.cargoShiftTpCd = cargoShiftTpCd;
	}
	public String getOperatorType() {
		return operatorType;
	}
	public void setOperatorType(String operatorType) {
		this.operatorType = operatorType;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getArrivalTime() {
		return arrivalTime;
	}
	public void setArrivalTime(String arrivalTime) {
		this.arrivalTime = arrivalTime;
	}
	public String getDlyStDt() {
		return dlyStDt;
	}
	public void setDlyStDt(String dlyStDt) {
		this.dlyStDt = dlyStDt;
	}
	public String getDlyEndDt() {
		return dlyEndDt;
	}
	public void setDlyEndDt(String dlyEndDt) {
		this.dlyEndDt = dlyEndDt;
	}
	public String getBnkAtb() {
		return bnkAtb;
	}
	public void setBnkAtb(String bnkAtb) {
		this.bnkAtb = bnkAtb;
	}
	public String getBnkStDt() {
		return bnkStDt;
	}
	public void setBnkStDt(String bnkStDt) {
		this.bnkStDt = bnkStDt;
	}
	public String getBnkEndDt() {
		return bnkEndDt;
	}
	public void setBnkEndDt(String bnkEndDt) {
		this.bnkEndDt = bnkEndDt;
	}
	public String getPrivateBerth() {
		return privateBerth;
	}
	public void setPrivateBerth(String privateBerth) {
		this.privateBerth = privateBerth;
	}
	public String getShift() {
		return shift;
	}
	public void setShift(String shift) {
		this.shift = shift;
	}
	public String getHandledQty() {
		return handledQty;
	}
	public void setHandledQty(String handledQty) {
		this.handledQty = handledQty;
	}
	public String getCargoTypeCnt() {
		return cargoTypeCnt;
	}
	public void setCargoTypeCnt(String cargoTypeCnt) {
		this.cargoTypeCnt = cargoTypeCnt;
	}
	public String getCargoTpMpts() {
		return cargoTpMpts;
	}
	public void setCargoTpMpts(String cargoTpMpts) {
		this.cargoTpMpts = cargoTpMpts;
	}
	public String getAtw() {
		return atw;
	}
	public void setAtw(String atw) {
		this.atw = atw;
	}
	public String getAtc() {
		return atc;
	}
	public void setAtc(String atc) {
		this.atc = atc;
	}

	public String getDblBnkDivCd() {
		return dblBnkDivCd;
	}
	public void setDblBnkDivCd(String dblBnkDivCd) {
		this.dblBnkDivCd = dblBnkDivCd;
	}

	public String getVslTp() {
		return vslTp;
	}
	public void setVslTp(String vslTp) {
		this.vslTp = vslTp;
	}
	public String getDockageType() {
		return dockageType;
	}
	public void setDockageType(String dockageType) {
		this.dockageType = dockageType;
	}
	public String getDockageHrs() {
		return dockageHrs;
	}
	public void setDockageHrs(String dockageHrs) {
		this.dockageHrs = dockageHrs;
	}
	public String getFirstDockageHrs() {
		return firstDockageHrs;
	}
	public void setFirstDockageHrs(String firstDockageHrs) {
		this.firstDockageHrs = firstDockageHrs;
	}
	public String getSecondDockageHrs() {
		return secondDockageHrs;
	}
	public void setSecondDockageHrs(String secondDockageHrs) {
		this.secondDockageHrs = secondDockageHrs;
	}
	public String getThirdDockageHrs() {
		return thirdDockageHrs;
	}
	public void setThirdDockageHrs(String thirdDockageHrs) {
		this.thirdDockageHrs = thirdDockageHrs;
	}
	public String getNormalDockageHrs() {
		return normalDockageHrs;
	}
	public void setNormalDockageHrs(String normalDockageHrs) {
		this.normalDockageHrs = normalDockageHrs;
	}
	public String getDelayHrs() {
		return delayHrs;
	}
	public void setDelayHrs(String delayHrs) {
		this.delayHrs = delayHrs;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	
	
}
