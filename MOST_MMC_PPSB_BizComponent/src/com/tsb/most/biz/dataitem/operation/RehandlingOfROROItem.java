package com.tsb.most.biz.dataitem.operation;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class RehandlingOfROROItem extends DataItem {

	private String catgCd;
    private String catgNm;
	private String vslCallId;
	private String docNo;
    private String cargoNo;
	private String masterBlNo;
    private String blNo;
    private String bookingNo;
    private String shipgNoteNo;
    private String cd;
    private String cdNm;
    private String cgTpCd;
    private String cgTpNm;
    private String rhdlYn;
    private String docMt;
    private String docM3;
    private String docQty;
    private String balMt;
    private String balM3;
    private String balQty;
    private String whLoc;
    
    private String nextVslCallId;
    private String rhdlModeCd;
    private String rhdlModeNm;
    private String rhdlNo;
    private String rhdlMt;
    private String rhdlM3;
    private String rhdlQty;
    private String loginId;
    private String updatedTime;
 
    private String unitNo;
    private String roroSeq;
    private String brandCd;
    private String brandNm;
    private String modelCd;
    private String modelNm;
    private String inDate;
    private String outDate;
    private String unitYardLoc;
    private String ixCd;
    private String assignedQty;
    private String action;
    
    private String orgRefNo;
    private String nextRefNo;
    private String rhdlGroupNo;
    
    private String unitMt;
    private String unitM3;
    private String grNo;
    
    //RORO rehandling 
    private String callSeq;
    private String callYear;
    private String vslCd;
    private String shipgAgentCd;
    private String shipgAgentNm;
    private int rhdlPkgQty;
    private double rhdlWgt;
    private double rhdlMsrmt;
    private String newYn;
    private String opeClassCd;
    private String jobNo;
    private String locId;
    private String pkgQty;
    private String jobTpCd; 
    private String jobPurpCd;
    private String driverId;
    private String stevedoreId;
    private String gateTxnNo;
    private String dmgYn;
    private String lorryNo;
    private String rmk;
    private String seq;
    
    private List snItems;
    private List nextSnItems;
    private List blItems;
	
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
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getDocNo() {
		return docNo;
	}
	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}
	public String getCargoNo() {
		return cargoNo;
	}
	public void setCargoNo(String cargoNo) {
		this.cargoNo = cargoNo;
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
	public String getCd() {
		return cd;
	}
	public void setCd(String cd) {
		this.cd = cd;
	}
	public String getCdNm() {
		return cdNm;
	}
	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
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
	public String getRhdlYn() {
		return rhdlYn;
	}
	public void setRhdlYn(String rhdlYn) {
		this.rhdlYn = rhdlYn;
	}
	public String getDocMt() {
		return docMt;
	}
	public void setDocMt(String docMt) {
		this.docMt = docMt;
	}
	public String getDocM3() {
		return docM3;
	}
	public void setDocM3(String docM3) {
		this.docM3 = docM3;
	}
	public String getDocQty() {
		return docQty;
	}
	public void setDocQty(String docQty) {
		this.docQty = docQty;
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
	public String getBalQty() {
		return balQty;
	}
	public void setBalQty(String balQty) {
		this.balQty = balQty;
	}
	public String getWhLoc() {
		return whLoc;
	}
	public void setWhLoc(String whLoc) {
		this.whLoc = whLoc;
	}
	public String getNextVslCallId() {
		return nextVslCallId;
	}
	public void setNextVslCallId(String nextVslCallId) {
		this.nextVslCallId = nextVslCallId;
	}
	public String getRhdlModeCd() {
		return rhdlModeCd;
	}
	public void setRhdlModeCd(String rhdlModeCd) {
		this.rhdlModeCd = rhdlModeCd;
	}
	public String getRhdlModeNm() {
		return rhdlModeNm;
	}
	public void setRhdlModeNm(String rhdlModeNm) {
		this.rhdlModeNm = rhdlModeNm;
	}
	public String getRhdlNo() {
		return rhdlNo;
	}
	public void setRhdlNo(String rhdlNo) {
		this.rhdlNo = rhdlNo;
	}
	public String getRhdlMt() {
		return rhdlMt;
	}
	public void setRhdlMt(String rhdlMt) {
		this.rhdlMt = rhdlMt;
	}
	public String getRhdlM3() {
		return rhdlM3;
	}
	public void setRhdlM3(String rhdlM3) {
		this.rhdlM3 = rhdlM3;
	}
	public String getRhdlQty() {
		return rhdlQty;
	}
	public void setRhdlQty(String rhdlQty) {
		this.rhdlQty = rhdlQty;
	}
	public String getLoginId() {
		return loginId;
	}
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}
	public String getUpdatedTime() {
		return updatedTime;
	}
	public void setUpdatedTime(String updatedTime) {
		this.updatedTime = updatedTime;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getRoroSeq() {
		return roroSeq;
	}
	public void setRoroSeq(String roroSeq) {
		this.roroSeq = roroSeq;
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
	public String getUnitYardLoc() {
		return unitYardLoc;
	}
	public void setUnitYardLoc(String unitYardLoc) {
		this.unitYardLoc = unitYardLoc;
	}
	public String getIxCd() {
		return ixCd;
	}
	public void setIxCd(String ixCd) {
		this.ixCd = ixCd;
	}
	public String getAssignedQty() {
		return assignedQty;
	}
	public void setAssignedQty(String assignedQty) {
		this.assignedQty = assignedQty;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getOrgRefNo() {
		return orgRefNo;
	}
	public void setOrgRefNo(String orgRefNo) {
		this.orgRefNo = orgRefNo;
	}
	public String getNextRefNo() {
		return nextRefNo;
	}
	public void setNextRefNo(String nextRefNo) {
		this.nextRefNo = nextRefNo;
	}
	public String getRhdlGroupNo() {
		return rhdlGroupNo;
	}
	public void setRhdlGroupNo(String rhdlGroupNo) {
		this.rhdlGroupNo = rhdlGroupNo;
	}
	public String getUnitMt() {
		return unitMt;
	}
	public void setUnitMt(String unitMt) {
		this.unitMt = unitMt;
	}
	public String getUnitM3() {
		return unitM3;
	}
	public void setUnitM3(String unitM3) {
		this.unitM3 = unitM3;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public List getSnItems() {
		return snItems;
	}
	public void setSnItems(List snItems) {
		this.snItems = snItems;
	}
	public List getNextSnItems() {
		return nextSnItems;
	}
	public void setNextSnItems(List nextSnItems) {
		this.nextSnItems = nextSnItems;
	}
	public List getBlItems() {
		return blItems;
	}
	public void setBlItems(List blItems) {
		this.blItems = blItems;
	}
	public String getCallSeq() {
		return callSeq;
	}
	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}
	public String getCallYear() {
		return callYear;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getShipgAgentCd() {
		return shipgAgentCd;
	}
	public void setShipgAgentCd(String shipgAgentCd) {
		this.shipgAgentCd = shipgAgentCd;
	}
	public String getShipgAgentNm() {
		return shipgAgentNm;
	}
	public void setShipgAgentNm(String shipgAgentNm) {
		this.shipgAgentNm = shipgAgentNm;
	}
	public int getRhdlPkgQty() {
		return rhdlPkgQty;
	}
	public void setRhdlPkgQty(int rhdlPkgQty) {
		this.rhdlPkgQty = rhdlPkgQty;
	}
	public double getRhdlWgt() {
		return rhdlWgt;
	}
	public void setRhdlWgt(double rhdlWgt) {
		this.rhdlWgt = rhdlWgt;
	}
	public double getRhdlMsrmt() {
		return rhdlMsrmt;
	}
	public void setRhdlMsrmt(double rhdlMsrmt) {
		this.rhdlMsrmt = rhdlMsrmt;
	}
	public String getNewYn() {
		return newYn;
	}
	public void setNewYn(String newYn) {
		this.newYn = newYn;
	}
	public String getOpeClassCd() {
		return opeClassCd;
	}
	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(String pkgQty) {
		this.pkgQty = pkgQty;
	}
	public String getJobTpCd() {
		return jobTpCd;
	}
	public void setJobTpCd(String jobTpCd) {
		this.jobTpCd = jobTpCd;
	}
	public String getJobPurpCd() {
		return jobPurpCd;
	}
	public void setJobPurpCd(String jobPurpCd) {
		this.jobPurpCd = jobPurpCd;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public String getStevedoreId() {
		return stevedoreId;
	}
	public void setStevedoreId(String stevedoreId) {
		this.stevedoreId = stevedoreId;
	}
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}
	public String getDmgYn() {
		return dmgYn;
	}
	public void setDmgYn(String dmgYn) {
		this.dmgYn = dmgYn;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}

}
