package com.tsb.most.biz.dataitem.operation;

import java.util.Date;
import java.util.List;
import com.tsb.most.framework.dataitem.DataItem;

public class ConfirmHandlingInOfROROItem extends DataItem {
	private String vslCd;
    private String callYear;
    private String callSeq;
	private String vslCallId;
    private String bookingNo;
    private String shipgNoteNo;
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
    private String locId;
    private String locNm;
    
    private String gateTicketNo;
	private String gatePassNo;
    private Date gatePassIssueDt;
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
    
    private String remainedGI;
    private String remainedHI;
    private String toDoHI;
    private String noOfHI;
    private String tsptTpCd;//stat
    
    private String ioSeq;
    private String jobPurpCd;
    private String outDate;
    private String ioMode;
    private String rhdlNo;
    private String ixCd;
    
    private String newYn;
    private String docWgt;
    private String cbm;
    
    //Non-Vessel
    private String fwdCd;
    private String fwdNm; 
    private int snQty;
    private double  snMt;
    private double  snM3;
    private int grQty;
    private double  grMt;
    private double  grM3;
    private int balQty;
    private double  balMt;
    private double  balM3;
    private int pkgQty;
    private double  wgt;
    private double  msrmt;//measurement
    private int accuSumQty;
    private double  accuSumWgt;
    private double  accuSumMsrmt;
    private String cmdtCd;
    private String cmdtGrpCd;
    private String pkgTpCd;
    private String rePkgTpCd;
    private String wgtUnit;
    private String msrmtUnit;

	private double eachWgt;
	private double eachMsrmt;
    private String correctionUnitNoYN;
    private String lorryId;
    private String jobNo;//
    private String jobGroup;
    private String jobTpCd;//LD
    private String jobPurpNm;// screen category HI , HO 
    private String jobCoCd;//Normal : G, Shout-Out : S, Damamge : D, 
	private String spCaCoCd;//Overlanded : O, Spare : S
	private String locTpCd;
    private Date hdlInEndDt;
    private Date hdlInStDt;
    private String hdlInEndDtStr;
    private String hdlInStDtStr;
    private String shuYn;
    private String gateTxnNo;
    private String stevedoreId;
    
    private String gateOutDate;
    private boolean gatePassYn;
    private String cgInOutCd;
    private String dmgYn;

    private int dmgQty;
    private double  dmgMt;
    private double  dmgM3;
    private List cargoTypeItems;
    private String seq;
    private String rmk;
    private boolean lorryFlag;//add For lorry is and is not checked
    
	public String getOutDate() {
		return outDate;
	}
	public void setOutDate(String outDate) {
		this.outDate = outDate;
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
	public String getRemainedGI() {
		return remainedGI;
	}
	public void setRemainedGI(String remainedGI) {
		this.remainedGI = remainedGI;
	}
	public String getRemainedHI() {
		return remainedHI;
	}
	public void setRemainedHI(String remainedHI) {
		this.remainedHI = remainedHI;
	}
	public String getToDoHI() {
		return toDoHI;
	}
	public void setToDoHI(String toDoHI) {
		this.toDoHI = toDoHI;
	}
	/**
	 * @return the noOfHI
	 */
	public String getNoOfHI() {
		return noOfHI;
	}
	/**
	 * @param noOfHI the noOfHI to set
	 */
	public void setNoOfHI(String noOfHI) {
		this.noOfHI = noOfHI;
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
	public String getIoMode() {
		return ioMode;
	}
	public void setIoMode(String ioMode) {
		this.ioMode = ioMode;
	}
	public String getRhdlNo() {
		return rhdlNo;
	}
	public void setRhdlNo(String rhdlNo) {
		this.rhdlNo = rhdlNo;
	}
    
	public String getCRUD() {
        return crud;
    }
    public void setCRUD(String workingStatus) {
        this.crud = workingStatus;
    }
	public String getIxCd() {
		return ixCd;
	}
	public void setIxCd(String ixCd) {
		this.ixCd = ixCd;
	}
	public String getFwdCd() {
		return fwdCd;
	}
	public void setFwdCd(String fwdCd) {
		this.fwdCd = fwdCd;
	}
	public String getFwdNm() {
		return fwdNm;
	}
	public void setFwdNm(String fwdNm) {
		this.fwdNm = fwdNm;
	}
	public String getGateOutDate() {
		return gateOutDate;
	}
	public void setGateOutDate(String gateOutDate) {
		this.gateOutDate = gateOutDate;
	}
	public List getCargoTypeItems() {
		return cargoTypeItems;
	}
	public void setCargoTypeItems(List cargoTypeItems) {
		this.cargoTypeItems = cargoTypeItems;
	}
	public String getCorrectionUnitNoYN() {
		return correctionUnitNoYN;
	}
	public void setCorrectionUnitNoYN(String correctionUnitNoYN) {
		this.correctionUnitNoYN = correctionUnitNoYN;
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
	public int getGrQty() {
		return grQty;
	}
	public void setGrQty(int grQty) {
		this.grQty = grQty;
	}
	public double getGrMt() {
		return grMt;
	}
	public void setGrMt(double grMt) {
		this.grMt = grMt;
	}
	public double getGrM3() {
		return grM3;
	}
	public void setGrM3(double grM3) {
		this.grM3 = grM3;
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
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getCmdtGrpCd() {
		return cmdtGrpCd;
	}
	public void setCmdtGrpCd(String cmdtGrpCd) {
		this.cmdtGrpCd = cmdtGrpCd;
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
	public double getEachWgt() {
		return eachWgt;
	}
	public void setEachWgt(double eachWgt) {
		this.eachWgt = eachWgt;
	}
	public double getEachMsrmt() {
		return eachMsrmt;
	}
	public void setEachMsrmt(double eachMsrmt) {
		this.eachMsrmt = eachMsrmt;
	}
	public String getLorryId() {
		return lorryId;
	}
	public void setLorryId(String lorryId) {
		this.lorryId = lorryId;
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
	public String getJobTpCd() {
		return jobTpCd;
	}
	public void setJobTpCd(String jobTpCd) {
		this.jobTpCd = jobTpCd;
	}
	public String getJobPurpNm() {
		return jobPurpNm;
	}
	public void setJobPurpNm(String jobPurpNm) {
		this.jobPurpNm = jobPurpNm;
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
	public String getLocTpCd() {
		return locTpCd;
	}
	public void setLocTpCd(String locTpCd) {
		this.locTpCd = locTpCd;
	}
	public Date getHdlInEndDt() {
		return hdlInEndDt;
	}
	public void setHdlInEndDt(Date hdlInEndDt) {
		this.hdlInEndDt = hdlInEndDt;
	}
	public Date getHdlInStDt() {
		return hdlInStDt;
	}
	public void setHdlInStDt(Date hdlInStDt) {
		this.hdlInStDt = hdlInStDt;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public boolean getLorryFlag() {
        return lorryFlag;
    }
	public void setLorryFlag(boolean lorryFlag) {
		this.lorryFlag = lorryFlag;
	}
	public String getGatePassNo() {
		return gatePassNo;
	}
	public void setGatePassNo(String gatePassNo) {
		this.gatePassNo = gatePassNo;
	}
	public String getHdlInEndDtStr() {
		return hdlInEndDtStr;
	}
	public void setHdlInEndDtStr(String hdlInEndDtStr) {
		this.hdlInEndDtStr = hdlInEndDtStr;
	}
	public String getHdlInStDtStr() {
		return hdlInStDtStr;
	}
	public void setHdlInStDtStr(String hdlInStDtStr) {
		this.hdlInStDtStr = hdlInStDtStr;
	}
	public String getShuYn() {
		return shuYn;
	}
	public void setShuYn(String shuYn) {
		this.shuYn = shuYn;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getLocNm() {
		return locNm;
	}
	public void setLocNm(String locNm) {
		this.locNm = locNm;
	}
	public String getTsptTpCd() {
		return tsptTpCd;
	}
	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}
	public String getCgInOutCd() {
		return cgInOutCd;
	}
	public void setCgInOutCd(String cgInOutCd) {
		this.cgInOutCd = cgInOutCd;
	}
	public boolean getGatePassYn() {
	    return gatePassYn;
	}
	
	public void setGatePassYn(boolean gatePassYn) {
	     this.gatePassYn = gatePassYn;
	}
	
	public void setGatePassYn(String gatePassYn) {
	  if(gatePassYn == null){
	      this.gatePassYn = false;
	  }else if(gatePassYn.equals("Y")){
	      this.gatePassYn = true;
	  }else if(gatePassYn.equals("true")){
	      this.gatePassYn = true;
	  }else{
	      this.gatePassYn = false;
	  }
	}
	public Date getGatePassIssueDt() {
		return gatePassIssueDt;
	}
	public void setGatePassIssueDt(Date gatePassIssueDt) {
		this.gatePassIssueDt = gatePassIssueDt;
	}
	public String getDmgYn() {
		return dmgYn;
	}
	public void setDmgYn(String dmgYn) {
		this.dmgYn = dmgYn;
	}
	public int getDmgQty() {
		return dmgQty;
	}
	public void setDmgQty(int dmgQty) {
		this.dmgQty = dmgQty;
	}
	public double getDmgMt() {
		return dmgMt;
	}
	public void setDmgMt(double dmgMt) {
		this.dmgMt = dmgMt;
	}
	public double getDmgM3() {
		return dmgM3;
	}
	public void setDmgM3(double dmgM3) {
		this.dmgM3 = dmgM3;
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
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getStevedoreId() {
		return stevedoreId;
	}
	public void setStevedoreId(String stevedoreId) {
		this.stevedoreId = stevedoreId;
	}
}
