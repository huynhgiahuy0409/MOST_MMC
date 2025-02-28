package com.tsb.most.biz.dataitem.operation;

import com.tsb.most.framework.dataitem.DataItem;

public class HangingScaleItem extends DataItem {

    private String transactionNo;
    private String vslCallId;
    private String blNo;
    private String sdoNo;
    private String shipgNoteNo;
    private String grNo;
    private String mfDocId;
    
    private int pkgQty;
    private double  cgWgt;
    private double  cgVol;

    private String fetchYn;
    private String jobNo;
    private String jobTpCd;
    private String jobPurpCd;
    
	public String getTransactionNo() {
		return transactionNo;
	}
	public void setTransactionNo(String transactionNo) {
		this.transactionNo = transactionNo;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public int getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(int pkgQty) {
		this.pkgQty = pkgQty;
	}
	public double getCgWgt() {
		return cgWgt;
	}
	public void setCgWgt(double cgWgt) {
		this.cgWgt = cgWgt;
	}
	public double getCgVol() {
		return cgVol;
	}
	public void setCgVol(double cgVol) {
		this.cgVol = cgVol;
	}
	public String getFetchYn() {
		return fetchYn;
	}
	public void setFetchYn(String fetchYn) {
		this.fetchYn = fetchYn;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
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
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
   
}
