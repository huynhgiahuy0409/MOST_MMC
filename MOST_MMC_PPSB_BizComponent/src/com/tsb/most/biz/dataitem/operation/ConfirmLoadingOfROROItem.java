package com.tsb.most.biz.dataitem.operation;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class ConfirmLoadingOfROROItem extends DataItem {
	private String vslCallId;
    private String bookingNo;
    private String shipgNoteNo;
    private String cgNo;
    private String catgCd;
    private String catgNm;
    private String cgTpCd;
    private String cgTpNm;
    private String delvTpCd;
    private String delvTpNm;
    private String nosOfUnit;
    private String nosOfGateIn;
    private String remainUnit;
    private String brandDesc;
    private String brandCd;
    private String brandNm;
    private String modelCd;
    private String modelNm;
    private String unitNo;
    private String gateInDate;
    private String grNo;
    private String inDate;
    private String yardLoc;
    private String hiRemarks;
    private String correctionNo;
    
    private String gateTicketNo;
    private String driverId;
    private String driverNm;
    private String truckNo; 
    private String statCd;
    private String statNm;
    private String tsptCompCd;
    private String driverLicense;
    
    private String roroSeq;
    private String cdNm;
    private String cd;
    private String yardPlanLoc;
    private String hhtFlags;
    private String updUserId;
    
    private String nosOfHandlingIn;
    private String remainYC;
    private String remainLD;
    private String loadingTime;
    private String outDate;
    private String ycRemarks;
    private String ldRemarks;
    private String stevedoreId;
    
    private String toDoYC;
    private String toDoLC;
    private String nosOfLC;
    private String crane;
    private String ioSeq;
    private String jobPurpCd;
    private String ioMode;
    
    private String nosOfYC;
    private String rhdlNo;
    private String rhdlMode;
    private String rhdlModeNm;
    private String orgVslCallId;
    private String orgCgNo;
    private String nosOfRehandle;
    
    private String customsBalQty;
    
    private List cargoTypeItems;
    private List directUnitItems;
    private List indirectUnitItems;
    
    private String vslCd;
    private String callYear;
    private String callSeq;
    
    private String action;
    private String vslLocation;
    private String tsptTpCd;
    
    private String ixCd;
    private String newYn;
    private String docWgt;
    private String cbm;
    private int docQty;
    private double  docMt;
    private double  docM3;
    private int qty;
    private double  mt;
    private double  m3;
    private int balQty;
    private double  balMt;
    private double  balM3;
    private int loadQty;
    private double  loadMt;
    private double  loadM3;
    private int pkgQty;
    private double  pkgMt;
    private double  pkgM3;
    private int accuSumQty;
    private double  accuSumWgt;
    private double  accuSumMsrmt;
    private String locArea;
    private int locQty;
    private double locWgt;
    private double locMsrmt;
    
    private double eachMt;
  	private double eachM3;
  	
  	private double avBalMt;
  	private double avBalM3;
  	private int avBalQty;
    private int snQty;
    private double  snMt;
    private double  snM3;
  	private String gateTxnNo;
  	private String vslNm;
    private String pkgTpCd;
    private String rePkgTpCd;
    private String lorryNo;
    private String jobGroup;
    private String dmgYn;
    private String jobTpCd;
    private String shftDt;
    private String shuYn;
    private String jobCoCd;//Normal : G, Shout-Out : S, Damamge : D, 
	private String spCaCoCd;
	private String jobNo;
	private String prevJobNo;
	private String locId;
	private String toLocId;
    private String cgInOutCd;//Arrv-I, Delv-O //key 

    private String startDtStr;
    private String endDtStr; 
    private String seq;
    private String eqNo;
    private String fnlOpeYn;//Sn all final
    private String fnlDelvYn;
    private String hatchNo;
    private String hatchDrt;
    private String gangNo;
    private String custMode;
    private String tsptr;
    private String vgUnitNo;
    private String mfDocId;
    
	public String getIoMode() {
		return ioMode;
	}
	public void setIoMode(String ioMode) {
		this.ioMode = ioMode;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
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
	public String getNosOfUnit() {
		return nosOfUnit;
	}
	public void setNosOfUnit(String nosOfUnit) {
		this.nosOfUnit = nosOfUnit;
	}
	public String getNosOfGateIn() {
		return nosOfGateIn;
	}
	public void setNosOfGateIn(String nosOfGateIn) {
		this.nosOfGateIn = nosOfGateIn;
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
	public String getGateInDate() {
		return gateInDate;
	}
	public void setGateInDate(String gateInDate) {
		this.gateInDate = gateInDate;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getInDate() {
		return inDate;
	}
	public void setInDate(String inDate) {
		this.inDate = inDate;
	}
	public String getYardLoc() {
		return yardLoc;
	}
	public void setYardLoc(String yardLoc) {
		this.yardLoc = yardLoc;
	}
	public String getHiRemarks() {
		return hiRemarks;
	}
	public void setHiRemarks(String hiRemarks) {
		this.hiRemarks = hiRemarks;
	}
	public String getCorrectionNo() {
		return correctionNo;
	}
	public void setCorrectionNo(String correctionNo) {
		this.correctionNo = correctionNo;
	}
	public String getGateTicketNo() {
		return gateTicketNo;
	}
	public void setGateTicketNo(String gateTicketNo) {
		this.gateTicketNo = gateTicketNo;
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
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
	public String getStatNm() {
		return statNm;
	}
	public void setStatNm(String statNm) {
		this.statNm = statNm;
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
	public String getRoroSeq() {
		return roroSeq;
	}
	public void setRoroSeq(String roroSeq) {
		this.roroSeq = roroSeq;
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
	public String getUpdUserId() {
		return updUserId;
	}
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}
	public String getNosOfHandlingIn() {
		return nosOfHandlingIn;
	}
	public void setNosOfHandlingIn(String nosOfHandlingIn) {
		this.nosOfHandlingIn = nosOfHandlingIn;
	}
	public String getRemainYC() {
		return remainYC;
	}
	public void setRemainYC(String remainYC) {
		this.remainYC = remainYC;
	}
	public String getRemainLD() {
		return remainLD;
	}
	public void setRemainLD(String remainLD) {
		this.remainLD = remainLD;
	}
	public String getLoadingTime() {
		return loadingTime;
	}
	public void setLoadingTime(String loadingTime) {
		this.loadingTime = loadingTime;
	}
	public String getOutDate() {
		return outDate;
	}
	public void setOutDate(String outDate) {
		this.outDate = outDate;
	}
	public String getYcRemarks() {
		return ycRemarks;
	}
	public void setYcRemarks(String ycRemarks) {
		this.ycRemarks = ycRemarks;
	}
	public String getLdRemarks() {
		return ldRemarks;
	}
	public void setLdRemarks(String ldRemarks) {
		this.ldRemarks = ldRemarks;
	}
	public String getStevedoreId() {
		return stevedoreId;
	}
	public void setStevedoreId(String stevedoreId) {
		this.stevedoreId = stevedoreId;
	}
	public String getToDoYC() {
		return toDoYC;
	}
	public void setToDoYC(String toDoYC) {
		this.toDoYC = toDoYC;
	}
	public String getToDoLC() {
		return toDoLC;
	}
	public void setToDoLC(String toDoLC) {
		this.toDoLC = toDoLC;
	}
	public String getNosOfLC() {
		return nosOfLC;
	}
	public void setNosOfLC(String nosOfLC) {
		this.nosOfLC = nosOfLC;
	}
	public String getCrane() {
		return crane;
	}
	public void setCrane(String crane) {
		this.crane = crane;
	}
	public String getIoSeq() {
		return ioSeq;
	}
	public void setIoSeq(String ioSeq) {
		this.ioSeq = ioSeq;
	}
	public String getJobPurpCd() {
		return jobPurpCd;
	}
	public void setJobPurpCd(String jobPurpCd) {
		this.jobPurpCd = jobPurpCd;
	}    
	public String getCRUD() {
        return crud;
    }
    public void setCRUD(String workingStatus) {
        this.crud = workingStatus;
    }
	public String getNosOfYC() {
		return nosOfYC;
	}
	public void setNosOfYC(String nosOfYC) {
		this.nosOfYC = nosOfYC;
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
	public String getOrgVslCallId() {
		return orgVslCallId;
	}
	public void setOrgVslCallId(String orgVslCallId) {
		this.orgVslCallId = orgVslCallId;
	}
	public String getOrgCgNo() {
		return orgCgNo;
	}
	public void setOrgCgNo(String orgCgNo) {
		this.orgCgNo = orgCgNo;
	}
	public String getNosOfRehandle() {
		return nosOfRehandle;
	}
	public void setNosOfRehandle(String nosOfRehandle) {
		this.nosOfRehandle = nosOfRehandle;
	}
	public String getRhdlModeNm() {
		return rhdlModeNm;
	}
	public void setRhdlModeNm(String rhdlModeNm) {
		this.rhdlModeNm = rhdlModeNm;
	}
	public String getCustomsBalQty() {
		return customsBalQty;
	}
	public void setCustomsBalQty(String customsBalQty) {
		this.customsBalQty = customsBalQty;
	}
	public List getCargoTypeItems() {
		return cargoTypeItems;
	}
	public void setCargoTypeItems(List cargoTypeItems) {
		this.cargoTypeItems = cargoTypeItems;
	}
	public List getDirectUnitItems() {
		return directUnitItems;
	}
	public void setDirectUnitItems(List directUnitItems) {
		this.directUnitItems = directUnitItems;
	}
	public List getIndirectUnitItems() {
		return indirectUnitItems;
	}
	public void setIndirectUnitItems(List indirectUnitItems) {
		this.indirectUnitItems = indirectUnitItems;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getVslLocation() {
		return vslLocation;
	}
	public void setVslLocation(String vslLocation) {
		this.vslLocation = vslLocation;
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
	public String getIxCd() {
		return ixCd;
	}
	public void setIxCd(String ixCd) {
		this.ixCd = ixCd;
	}
	public String getNewYn() {
		return newYn;
	}
	public void setNewYn(String newYn) {
		this.newYn = newYn;
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
	public int getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(int pkgQty) {
		this.pkgQty = pkgQty;
	}
	public double getPkgMt() {
		return pkgMt;
	}
	public void setPkgMt(double pkgMt) {
		this.pkgMt = pkgMt;
	}
	public double getPkgM3() {
		return pkgM3;
	}
	public void setPkgM3(double pkgM3) {
		this.pkgM3 = pkgM3;
	}
	public int getAccuSumQty() {
		return accuSumQty;
	}
	public void setAccuSumQty(int accuSumQty) {
		this.accuSumQty = accuSumQty;
	}
	public double getAccuSumWgt() {
		return accuSumWgt;
	}
	public void setAccuSumWgt(double accuSumWgt) {
		this.accuSumWgt = accuSumWgt;
	}
	public double getAccuSumMsrmt() {
		return accuSumMsrmt;
	}
	public void setAccuSumMsrmt(double accuSumMsrmt) {
		this.accuSumMsrmt = accuSumMsrmt;
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
	public double getEachMt() {
		return eachMt;
	}
	public void setEachMt(double eachMt) {
		this.eachMt = eachMt;
	}
	public double getEachM3() {
		return eachM3;
	}
	public void setEachM3(double eachM3) {
		this.eachM3 = eachM3;
	}
	public double getAvBalMt() {
		return avBalMt;
	}
	public void setAvBalMt(double avBalMt) {
		this.avBalMt = avBalMt;
	}
	public double getAvBalM3() {
		return avBalM3;
	}
	public void setAvBalM3(double avBalM3) {
		this.avBalM3 = avBalM3;
	}
	public int getAvBalQty() {
		return avBalQty;
	}
	public void setAvBalQty(int avBalQty) {
		this.avBalQty = avBalQty;
	}
	public int getSnQty() {
		return snQty;
	}
	public void setSnQty(int snQty) {
		this.snQty = snQty;
	}
	public double getSnMt() {
		return snMt;
	}
	public void setSnMt(double snMt) {
		this.snMt = snMt;
	}
	public double getSnM3() {
		return snM3;
	}
	public void setSnM3(double snM3) {
		this.snM3 = snM3;
	}
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
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
	public String getTsptTpCd() {
		return tsptTpCd;
	}
	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}
	public String getJobGroup() {
		return jobGroup;
	}
	public void setJobGroup(String jobGroup) {
		this.jobGroup = jobGroup;
	}
	public String getDmgYn() {
		return dmgYn;
	}
	public void setDmgYn(String dmgYn) {
		this.dmgYn = dmgYn;
	}
	public String getJobTpCd() {
		return jobTpCd;
	}
	public void setJobTpCd(String jobTpCd) {
		this.jobTpCd = jobTpCd;
	}
	public String getShftDt() {
		return shftDt;
	}
	public void setShftDt(String shftDt) {
		this.shftDt = shftDt;
	}
	public String getShuYn() {
		return shuYn;
	}
	public void setShuYn(String shuYn) {
		this.shuYn = shuYn;
	}
	public String getJobCoCd() {
		return jobCoCd;
	}
	public void setJobCoCd(String jobCoCd) {
		this.jobCoCd = jobCoCd;
	}
	public String getSpCaCoCd() {
		return spCaCoCd;
	}
	public void setSpCaCoCd(String spCaCoCd) {
		this.spCaCoCd = spCaCoCd;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getToLocId() {
		return toLocId;
	}
	public void setToLocId(String toLocId) {
		this.toLocId = toLocId;
	}
	public String getCgInOutCd() {
		return cgInOutCd;
	}
	public void setCgInOutCd(String cgInOutCd) {
		this.cgInOutCd = cgInOutCd;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getEqNo() {
		return eqNo;
	}
	public void setEqNo(String eqNo) {
		this.eqNo = eqNo;
	}
	public String getStartDtStr() {
		return startDtStr;
	}
	public void setStartDtStr(String startDtStr) {
		this.startDtStr = startDtStr;
	}
	public String getEndDtStr() {
		return endDtStr;
	}
	public void setEndDtStr(String endDtStr) {
		this.endDtStr = endDtStr;
	}
	public String getFnlOpeYn() {
		return fnlOpeYn;
	}
	public void setFnlOpeYn(String fnlOpeYn) {
		this.fnlOpeYn = fnlOpeYn;
	}
	public String getFnlDelvYn() {
		return fnlDelvYn;
	}
	public void setFnlDelvYn(String fnlDelvYn) {
		this.fnlDelvYn = fnlDelvYn;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getHatchDrt() {
		return hatchDrt;
	}
	public void setHatchDrt(String hatchDrt) {
		this.hatchDrt = hatchDrt;
	}
	public String getGangNo() {
		return gangNo;
	}
	public void setGangNo(String gangNo) {
		this.gangNo = gangNo;
	}
	public String getCustMode() {
		return custMode;
	}
	public void setCustMode(String custMode) {
		this.custMode = custMode;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getPrevJobNo() {
		return prevJobNo;
	}
	public void setPrevJobNo(String prevJobNo) {
		this.prevJobNo = prevJobNo;
	}
	public String getTsptr() {
		return tsptr;
	}
	public void setTsptr(String tsptr) {
		this.tsptr = tsptr;
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
