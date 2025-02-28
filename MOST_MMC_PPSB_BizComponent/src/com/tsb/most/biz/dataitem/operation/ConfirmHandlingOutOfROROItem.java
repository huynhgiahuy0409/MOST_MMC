package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class ConfirmHandlingOutOfROROItem extends DataItem {

	private String vslCd;
    private String callYear;
    private String callSeq;
	private String vslCallId;
    private String masterBlNo;
    private String blNo;
    private String catgCd;
    private String catgNm;
    private String cgTpCd;
    private String pkgTpCd;
    private String rePkgTpCd;
    private String cgTpNm;
    private String delvTpCd;
    private String delvTpNm;
    private String doNo;
    private String sdoNo;
    private String nosOfUnit;
    private String remainUnit;
    private String brandDesc;
    private String brandCd;
    private String brandNm;
    private String modelCd;
    private String modelNm;
    private String unitNo;
    private String yardLoc;
    private String cdNm;
    private String cd;
    private String roroSeq;
    private String dischargedDate;
    private String inDate;
    private String outDate;
    private String loginId;
    private String statCd;
    private String jobPurpCd;
    private String ioMode;
    private String ioSeq;
    private String statNm;
    private String rmk;
    private String driverId;
    private String driverNm;
    private String truckNo; 
    private String blDelvTpCd;
    private String gateTxnNo;
    private String ixCd;
    private String disEndDt;
    private String isMultiCargo;
    
    private String gateInDate;
    private String gateOutDate;
    private String gangNo;
    private String gateTicketNo;
    
    private String tsptCompCd;
    private String driverLicense;
    private String cgNo;
    
    private String yardPlanLoc;
    private String vgUnitNo;
    
    private String rsUnitCnt;
    private String dsUnitCnt;
    
    private String hhtFlags;
    private String hoRemarks;
    
    private String bookingNo;
    private String shipgNoteNo;
    private String nosOfHO;
    private String nosOfGO;
    private String nosOfGI;
    private String toDoHO;
    private String rhdlNo;
    private String rhdlMode;
    private String rhdlModeNm;
    private String grNo;
    private String newYn;
    private int actQty;
    private double  actMt;
    private double  actM3;
    private int qty;//general 
    private double  mt;//general 
    private double  m3;//general 

    private int balQty;
    private double  balMt;
    private double  balM3;
    private int loadQty;
    private double  loadMt;
    private double  loadM3;
    private String locId;
    private String lorryId;
    
    //  add JobItem
    private String jobTpCd;
    private String jobNo;
    private String jobGroup;
    private int pkgQty;
    private double  wgt;
    private double  msrmt;
    private String wgtUnit;
    private String msrmtUnit;

    private int docQty;
    private double docMt;
    private double docM3;
    private String hdlOutStDt;
    private String tsptTpCd;
    private String hdlOutEndDt;
    private String jobCoCd;//Normal : G, Shout-Out : S, Damamge : D, 
    private String eqNo;
    //add ArrvDelv
    private String cgInOutCd;//Arrv-I, Delv-O //key 
    private String gatePassNo;  
    private String hatchNo; 
    private String spCaCoCd;  
    private String cmdtCd;  
    
    private ArrayList<ConfirmHandlingOutOfROROItem> cargoItems;
    private ArrayList<ConfirmHandlingOutOfROROItem> hoItems;
    private List unitItems;
    private ArrayList<ConfirmHandlingOutOfROROItem> blItems;
    private ArrayList<ConfirmHandlingOutOfROROItem> sdoItems;
    private List driverItems;
    private List driverWithTruckItems;
    private List truckItems;
    private String mfDocId;
    
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
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
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
	public String getBrandDesc() {
		return brandDesc;
	}
	public void setBrandDesc(String brandDesc) {
		this.brandDesc = brandDesc;
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
	public String getYardLoc() {
		return yardLoc;
	}
	public void setYardLoc(String yardLoc) {
		this.yardLoc = yardLoc;
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
	public String getOutDate() {
		return outDate;
	}
	public void setOutDate(String outDate) {
		this.outDate = outDate;
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
	public String getStatNm() {
		return statNm;
	}
	public void setStatNm(String statNm) {
		this.statNm = statNm;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public String getDriverNm() {
		return driverNm;
	}
	public void setDriverNm(String driverNm) {
		this.driverNm = driverNm;
	}
	public String getTruckNo() {
		return truckNo;
	}
	public void setTruckNo(String truckNo) {
		this.truckNo = truckNo;
	}
	public String getBlDelvTpCd() {
		return blDelvTpCd;
	}
	public void setBlDelvTpCd(String blDelvTpCd) {
		this.blDelvTpCd = blDelvTpCd;
	}
	public String getIxCd() {
		return ixCd;
	}
	public void setIxCd(String ixCd) {
		this.ixCd = ixCd;
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
	public String getGateTicketNo() {
		return gateTicketNo;
	}
	public void setGateTicketNo(String gateTicketNo) {
		this.gateTicketNo = gateTicketNo;
	}
	public String getTsptCompCd() {
		return tsptCompCd;
	}
	public void setTsptCompCd(String tsptCompCd) {
		this.tsptCompCd = tsptCompCd;
	}
	public String getDriverLicense() {
		return driverLicense;
	}
	public void setDriverLicense(String driverLicense) {
		this.driverLicense = driverLicense;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getYardPlanLoc() {
		return yardPlanLoc;
	}
	public void setYardPlanLoc(String yardPlanLoc) {
		this.yardPlanLoc = yardPlanLoc;
	}
	public String getRsUnitCnt() {
		return rsUnitCnt;
	}
	public void setRsUnitCnt(String rsUnitCnt) {
		this.rsUnitCnt = rsUnitCnt;
	}
	public String getDsUnitCnt() {
		return dsUnitCnt;
	}
	public void setDsUnitCnt(String dsUnitCnt) {
		this.dsUnitCnt = dsUnitCnt;
	}
	public String getHhtFlags() {
		return hhtFlags;
	}
	public void setHhtFlags(String hhtFlags) {
		this.hhtFlags = hhtFlags;
	}
	public String getHoRemarks() {
		return hoRemarks;
	}
	public void setHoRemarks(String hoRemarks) {
		this.hoRemarks = hoRemarks;
	}
	public String getBookingNo() {
		return bookingNo;
	}
	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getNosOfHO() {
		return nosOfHO;
	}
	public void setNosOfHO(String nosOfHO) {
		this.nosOfHO = nosOfHO;
	}
	public String getNosOfGO() {
		return nosOfGO;
	}
	public void setNosOfGO(String nosOfGO) {
		this.nosOfGO = nosOfGO;
	}
	public String getNosOfGI() {
		return nosOfGI;
	}
	public void setNosOfGI(String nosOfGI) {
		this.nosOfGI = nosOfGI;
	}
	public String getToDoHO() {
		return toDoHO;
	}
	public void setToDoHO(String toDoHO) {
		this.toDoHO = toDoHO;
	}
	public String getRhdlNo() {
		return rhdlNo;
	}
	public void setRhdlNo(String rhdlNo) {
		this.rhdlNo = rhdlNo;
	}
	public String getRhdlMode() {
		return rhdlMode;
	}
	public void setRhdlMode(String rhdlMode) {
		this.rhdlMode = rhdlMode;
	}
	public String getRhdlModeNm() {
		return rhdlModeNm;
	}
	public void setRhdlModeNm(String rhdlModeNm) {
		this.rhdlModeNm = rhdlModeNm;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getNewYn() {
		return newYn;
	}
	public void setNewYn(String newYn) {
		this.newYn = newYn;
	}
	public ArrayList<ConfirmHandlingOutOfROROItem> getCargoItems() {
		return cargoItems;
	}
	public void setCargoItems(ArrayList<ConfirmHandlingOutOfROROItem> cargoItems) {
		this.cargoItems = cargoItems;
	}
	public List getUnitItems() {
		return unitItems;
	}
	public void setUnitItems(List unitItems) {
		this.unitItems = unitItems;
	}
	public ArrayList<ConfirmHandlingOutOfROROItem> getBlItems() {
		return blItems;
	}
	public void setBlItems(ArrayList<ConfirmHandlingOutOfROROItem> blItems) {
		this.blItems = blItems;
	}
	public List getDriverItems() {
		return driverItems;
	}
	public void setDriverItems(List driverItems) {
		this.driverItems = driverItems;
	}
	public List getTruckItems() {
		return truckItems;
	}
	public void setTruckItems(List truckItems) {
		this.truckItems = truckItems;
	}
	public ArrayList<ConfirmHandlingOutOfROROItem> getSdoItems() {
		return sdoItems;
	}
	public void setSdoItems(ArrayList<ConfirmHandlingOutOfROROItem> sdoItems) {
		this.sdoItems = sdoItems;
	}
	public ArrayList<ConfirmHandlingOutOfROROItem> getHoItems() {
		return hoItems;
	}
	public void setHoItems(ArrayList<ConfirmHandlingOutOfROROItem> hoItems) {
		this.hoItems = hoItems;
	}
    
	public List getDriverWithTruckItems() {
		return driverWithTruckItems;
	}
	public void setDriverWithTruckItems(List driverWithTruckItems) {
		this.driverWithTruckItems = driverWithTruckItems;
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
	public int getActQty() {
		return actQty;
	}
	public void setActQty(int actQty) {
		this.actQty = actQty;
	}
	public double getActMt() {
		return actMt;
	}
	public void setActMt(double actMt) {
		this.actMt = actMt;
	}
	public double getActM3() {
		return actM3;
	}
	public void setActM3(double actM3) {
		this.actM3 = actM3;
	}
	public int getQty() {
		return qty;
	}
	public void setQty(int qty) {
		this.qty = qty;
	}
	public double getMt() {
		return mt;
	}
	public void setMt(double mt) {
		this.mt = mt;
	}
	public double getM3() {
		return m3;
	}
	public void setM3(double m3) {
		this.m3 = m3;
	}
	public int getBalQty() {
		return balQty;
	}
	public void setBalQty(int balQty) {
		this.balQty = balQty;
	}
	public double getBalMt() {
		return balMt;
	}
	public void setBalMt(double balMt) {
		this.balMt = balMt;
	}
	public double getBalM3() {
		return balM3;
	}
	public void setBalM3(double balM3) {
		this.balM3 = balM3;
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
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getLorryId() {
		return lorryId;
	}
	public void setLorryId(String lorryId) {
		this.lorryId = lorryId;
	}
	public String getJobTpCd() {
		return jobTpCd;
	}
	public void setJobTpCd(String jobTpCd) {
		this.jobTpCd = jobTpCd;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getJobGroup() {
		return jobGroup;
	}
	public void setJobGroup(String jobGroup) {
		this.jobGroup = jobGroup;
	}
	public int getDocQty() {
		return docQty;
	}
	public void setDocQty(int docQty) {
		this.docQty = docQty;
	}
	public double getDocMt() {
		return docMt;
	}
	public void setDocMt(double docMt) {
		this.docMt = docMt;
	}
	public double getDocM3() {
		return docM3;
	}
	public void setDocM3(double docM3) {
		this.docM3 = docM3;
	}
	public String getHdlOutStDt() {
		return hdlOutStDt;
	}
	public void setHdlOutStDt(String hdlOutStDt) {
		this.hdlOutStDt = hdlOutStDt;
	}
	public String getHdlOutEndDt() {
		return hdlOutEndDt;
	}
	public void setHdlOutEndDt(String hdlOutEndDt) {
		this.hdlOutEndDt = hdlOutEndDt;
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
	public String getJobCoCd() {
		return jobCoCd;
	}
	public void setJobCoCd(String jobCoCd) {
		this.jobCoCd = jobCoCd;
	}
	public String getCgInOutCd() {
		return cgInOutCd;
	}
	public void setCgInOutCd(String cgInOutCd) {
		this.cgInOutCd = cgInOutCd;
	}
	public String getGatePassNo() {
		return gatePassNo;
	}
	public void setGatePassNo(String gatePassNo) {
		this.gatePassNo = gatePassNo;
	}
	public String getDisEndDt() {
		return disEndDt;
	}
	public void setDisEndDt(String disEndDt) {
		this.disEndDt = disEndDt;
	}
	public String getIsMultiCargo() {
		return isMultiCargo;
	}
	public void setIsMultiCargo(String isMultiCargo) {
		this.isMultiCargo = isMultiCargo;
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
	public String getTsptTpCd() {
		return tsptTpCd;
	}
	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getRePkgTpCd() {
		return rePkgTpCd;
	}
	public void setRePkgTpCd(String rePkgTpCd) {
		this.rePkgTpCd = rePkgTpCd;
	}
	public String getGangNo() {
		return gangNo;
	}
	public void setGangNo(String gangNo) {
		this.gangNo = gangNo;
	}
	public String getEqNo() {
		return eqNo;
	}
	public void setEqNo(String eqNo) {
		this.eqNo = eqNo;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getSpCaCoCd() {
		return spCaCoCd;
	}
	public void setSpCaCoCd(String spCaCoCd) {
		this.spCaCoCd = spCaCoCd;
	}
	public String getWgtUnit() {
		return wgtUnit;
	}
	public void setWgtUnit(String wgtUnit) {
		this.wgtUnit = wgtUnit;
	}
	public String getMsrmtUnit() {
		return msrmtUnit;
	}
	public void setMsrmtUnit(String msrmtUnit) {
		this.msrmtUnit = msrmtUnit;
	}
	public String getVgUnitNo() {
		return vgUnitNo;
	}
	public void setVgUnitNo(String vgUnitNo) {
		this.vgUnitNo = vgUnitNo;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
}
