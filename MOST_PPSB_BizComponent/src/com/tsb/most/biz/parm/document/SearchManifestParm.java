package com.tsb.most.biz.parm.document;

import java.util.Date;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchManifestParm extends BaseBizParm{
	private String jobNo;
	private String vslCallId;
	private String regNo;
	private String docId;
	private String etaFromDate;
	private String etaToDate;
	private String status;
	private String areaLocation;
	private String inOutType;
	private String shipCallNo;
	private String shpagn;
	private String vslCd;
	private String callYear;
	private String callSeq;
	private String opeClassCd;
	
	
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
	public String getShpagn() {
	    return shpagn;
	}
	public void setShpagn(String shpagn) {
	    this.shpagn = shpagn;
	}
	public String getShipCallNo() {
		return shipCallNo;
	}
	public void setShipCallNo(String shipCallNo) {
		this.shipCallNo = shipCallNo;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getEtaFromDate() {
		return etaFromDate;
	}
	public void setEtaFromDate(String etaFromDate) {
		this.etaFromDate = etaFromDate;
	}
	public String getEtaToDate() {
		return etaToDate;
	}
	public void setEtaToDate(String etaToDate) {
		this.etaToDate = etaToDate;
	}
	public String getInOutType() {
		return inOutType;
	}
	public void setInOutType(String inOutType) {
		this.inOutType = inOutType;
	}
	public String getDocId() {
		return docId;
	}
	public void setDocId(String docId) {
		this.docId = docId;
	}
	
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getRegNo() {
		return regNo;
	}
	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAreaLocation() {
		return areaLocation;
	}
	public void setAreaLocation(String areaLocation) {
		this.areaLocation = areaLocation;
	}
	public String getOpeClassCd() {
		return opeClassCd;
	}
	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}
	
}
