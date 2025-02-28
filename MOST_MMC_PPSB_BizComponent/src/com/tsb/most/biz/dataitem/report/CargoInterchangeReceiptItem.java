package com.tsb.most.biz.dataitem.report;

import com.tsb.most.framework.dataitem.DataItem;

public class CargoInterchangeReceiptItem extends DataItem {
    private String vslCallId;
    private String vslNm;
    private String voyageNo;
    private String atw;
    private String blNo;
    private String shipgNoteNo;
    private String sdoNo;
    private String grNo;
    private String mfDocId;
    private String customerNm;
    private String cmdtNm;
    private String pkgTpNm;
    private String locId;
    private Integer pkgQty;
    private Double cgWgt;
    private String firstWgt;
    private String secondWgt;
    private String pol;
    private String pod;
    private String gateInTime;
    private String gateOutTime;
    private String lorryNo;
    private String chassisNo;
    private String tsptTpNm;
    private String cgMarks;
    private String gateTxnNo;
    
    private String delvTpCd;
    private String delvTpNm;
    private String validDate;
    private String pkgNo;
    private String measure;
    private String cirRemark;
    private Double cgVol;
    private String cgNo;
    
	public Integer getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(Integer pkgQty) {
		this.pkgQty = pkgQty;
	}
	public Double getCgWgt() {
		return cgWgt;
	}
	public void setCgWgt(Double cgWgt) {
		this.cgWgt = cgWgt;
	}
	public Double getCgVol() {
		return cgVol;
	}
	public void setCgVol(Double cgVol) {
		this.cgVol = cgVol;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getVoyageNo() {
		return voyageNo;
	}
	public void setVoyageNo(String voyageNo) {
		this.voyageNo = voyageNo;
	}
	public String getAtw() {
		return atw;
	}
	public void setAtw(String atw) {
		this.atw = atw;
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
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getCustomerNm() {
		return customerNm;
	}
	public void setCustomerNm(String customerNm) {
		this.customerNm = customerNm;
	}
	public String getCmdtNm() {
		return cmdtNm;
	}
	public void setCmdtNm(String cmdtNm) {
		this.cmdtNm = cmdtNm;
	}
	public String getPkgTpNm() {
		return pkgTpNm;
	}
	public void setPkgTpNm(String pkgTpNm) {
		this.pkgTpNm = pkgTpNm;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getFirstWgt() {
		return firstWgt;
	}
	public void setFirstWgt(String firstWgt) {
		this.firstWgt = firstWgt;
	}
	public String getSecondWgt() {
		return secondWgt;
	}
	public void setSecondWgt(String secondWgt) {
		this.secondWgt = secondWgt;
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
	public String getGateInTime() {
		return gateInTime;
	}
	public void setGateInTime(String gateInTime) {
		this.gateInTime = gateInTime;
	}
	public String getGateOutTime() {
		return gateOutTime;
	}
	public void setGateOutTime(String gateOutTime) {
		this.gateOutTime = gateOutTime;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}
	public String getChassisNo() {
		return chassisNo;
	}
	public void setChassisNo(String chassisNo) {
		this.chassisNo = chassisNo;
	}
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}
	public String getTsptTpNm() {
		return tsptTpNm;
	}
	public void setTsptTpNm(String tsptTpNm) {
		this.tsptTpNm = tsptTpNm;
	}
	public String getCgMarks() {
		return cgMarks;
	}
	public void setCgMarks(String cgMarks) {
		this.cgMarks = cgMarks;
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
	public String getValidDate() {
		return validDate;
	}
	public void setValidDate(String validDate) {
		this.validDate = validDate;
	}
	public String getPkgNo() {
		return pkgNo;
	}
	public void setPkgNo(String pkgNo) {
		this.pkgNo = pkgNo;
	}
	public String getMeasure() {
		return measure;
	}
	public void setMeasure(String measure) {
		this.measure = measure;
	}
	public String getCirRemark() {
		return cirRemark;
	}
	public void setCirRemark(String cirRemark) {
		this.cirRemark = cirRemark;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
}
