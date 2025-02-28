package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchWHRentalStatusParm extends BaseBizParm {
	private String searchType;
    private String payer;
    private String conttNo;
    private String refNo;
    private String fromDate;
    private String toDate;
    private String whCd;
    private String statCd;
    
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getPayer() {
		return payer;
	}
	public void setPayer(String payer) {
		this.payer = payer;
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
	public String getFromDate() {
		return fromDate;
	}
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
	public String getWhCd() {
		return whCd;
	}
	public void setWhCd(String whCd) {
		this.whCd = whCd;
	}
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
}
