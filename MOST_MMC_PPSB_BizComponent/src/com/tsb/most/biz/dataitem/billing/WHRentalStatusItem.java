package com.tsb.most.biz.dataitem.billing;

import com.tsb.most.basebiz.dataitem.audit.AuditItem;

public class WHRentalStatusItem extends AuditItem{
	private String conttNo;
	private String refNo;
	private String payer;
	private String prdTpCd;
	private String sdate;
	private String edate;
	private String sShf;
	private String eShf;
	private String whCd;
	private String locId;
	private String rentUnit;
	private String unit1Val;
	private String aplyRate;
	private String aplyAmt;
	private String statCd;
	private String gstAmount;
    private String totalAmount;
	
	public String getPrdTpCd() {
		return prdTpCd;
	}
	public void setPrdTpCd(String prdTpCd) {
		this.prdTpCd = prdTpCd;
	}
	public String getConttNo() {
		return conttNo;
	}
	public void setConttNo(String conttNo) {
		this.conttNo = conttNo;
	}
	public String getRefNo() {
		return refNo;
	}
	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
	public String getPayer() {
		return payer;
	}
	public void setPayer(String payer) {
		this.payer = payer;
	}
	public String getSdate() {
		return sdate;
	}
	public void setSdate(String sdate) {
		this.sdate = sdate;
	}
	public String getEdate() {
		return edate;
	}
	public void setEdate(String edate) {
		this.edate = edate;
	}
	public String getWhCd() {
		return whCd;
	}
	public void setWhCd(String whCd) {
		this.whCd = whCd;
	}
	public String getRentUnit() {
		return rentUnit;
	}
	public void setRentUnit(String rentUnit) {
		this.rentUnit = rentUnit;
	}
	public String getUnit1Val() {
		return unit1Val;
	}
	public void setUnit1Val(String unit1Val) {
		this.unit1Val = unit1Val;
	}
	public String getAplyRate() {
		return aplyRate;
	}
	public void setAplyRate(String aplyRate) {
		this.aplyRate = aplyRate;
	}
	public String getAplyAmt() {
		return aplyAmt;
	}
	public void setAplyAmt(String aplyAmt) {
		this.aplyAmt = aplyAmt;
	}
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
	
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	
	public String getsShf() {
		return sShf;
	}
	public void setsShf(String sShf) {
		this.sShf = sShf;
	}
	public String geteShf() {
		return eShf;
	}
	public void seteShf(String eShf) {
		this.eShf = eShf;
	}
	public String getGstAmount() {
		return gstAmount;
	}
	public void setGstAmount(String gstAmount) {
		this.gstAmount = gstAmount;
	}
	public String getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}
}
