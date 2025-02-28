package com.tsb.most.biz.parm.planning;

import java.util.Date;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchBerthPlanParm extends BaseBizParm {
	  //displayItem
    private String vslCallId;
    private String wharfMarkFrom;
    
    //searchItem
	private String vslTp;
	private Date etaFrom;
	private Date etaTo;
	private long etaFrom2;
	private long etaTo2;
	private String berthStatus;
	private String viewType;
	private String searchType;
	private String plan;
	private String viewMode;
	
	//Ship in port
	private String berthType;

	//bitt
	private String searchTp;
	private String berthLoc;
	private String berthTp;
	private String bitt;
	
	//berthing approval
    private String jpvcNo;
    private String cgTpCd;
    private String planned;
    private String vslStatus;
    private String alertYn;
    private int curPage;
    private String pagingSearchType;
    private int pageSize;
    private int startRow;
    private int endRow;
    
    //vessel agency
    private String agencyCode;
    private String vslCd;
    private String callYear;
    private String callSeq;
    private String billingType;
    private String vslNm;
    private String fromDt;
    private String toDt;
    private String cargoType;
    private String jpvc;
    
    private String scn;
    
	public String getBerthType() {
		return berthType;
	}
	public void setBerthType(String berthType) {
		this.berthType = berthType;
	}
	public long getEtaFrom2() {
		return etaFrom2;
	}
	public void setEtaFrom2(long etaFrom2) {
		this.etaFrom2 = etaFrom2;
		this.etaFrom = new Date(etaFrom2);
	}
	public long getEtaTo2() {
		return etaTo2;
	}
	public void setEtaTo2(long etaTo2) {
		this.etaTo2 = etaTo2;
		this.etaTo = new Date(etaTo2);
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getWharfMarkFrom() {
		return wharfMarkFrom;
	}
	public void setWharfMarkFrom(String wharfMarkFrom) {
		this.wharfMarkFrom = wharfMarkFrom;
	}
	public String getVslTp() {
		return vslTp;
	}
	public void setVslTp(String vslTp) {
		this.vslTp = vslTp;
	}
	public Date getEtaFrom() {
		return etaFrom;
	}
	public void setEtaFrom(Date etaFrom) {
		this.etaFrom = etaFrom;
	}
	public Date getEtaTo() {
		return etaTo;
	}
	public void setEtaTo(Date etaTo) {
		this.etaTo = etaTo;
	}
	public String getBerthStatus() {
		return berthStatus;
	}
	public void setBerthStatus(String berthStatus) {
		this.berthStatus = berthStatus;
	}
	public String getViewType() {
		return viewType;
	}
	public void setViewType(String viewType) {
		this.viewType = viewType;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getPlan() {
		return plan;
	}
	public void setPlan(String plan) {
		this.plan = plan;
	}
	public String getViewMode() {
		return viewMode;
	}
	public void setViewMode(String viewMode) {
		this.viewMode = viewMode;
	}
	public String getSearchTp() {
		return searchTp;
	}
	public void setSearchTp(String searchTp) {
		this.searchTp = searchTp;
	}
	public String getBerthLoc() {
		return berthLoc;
	}
	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}
	public String getBerthTp() {
		return berthTp;
	}
	public void setBerthTp(String berthTp) {
		this.berthTp = berthTp;
	}
	public String getBitt() {
		return bitt;
	}
	public void setBitt(String bitt) {
		this.bitt = bitt;
	}
	public String getJpvcNo() {
		return jpvcNo;
	}
	public void setJpvcNo(String jpvcNo) {
		this.jpvcNo = jpvcNo;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getPlanned() {
		return planned;
	}
	public void setPlanned(String planned) {
		this.planned = planned;
	}
	public String getVslStatus() {
		return vslStatus;
	}
	public void setVslStatus(String vslStatus) {
		this.vslStatus = vslStatus;
	}
	public String getAlertYn() {
		return alertYn;
	}
	public void setAlertYn(String alertYn) {
		this.alertYn = alertYn;
	}
	public int getCurPage() {
		return curPage;
	}
	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}
	public String getPagingSearchType() {
		return pagingSearchType;
	}
	public void setPagingSearchType(String pagingSearchType) {
		this.pagingSearchType = pagingSearchType;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getStartRow() {
		return startRow;
	}
	public void setStartRow(int startRow) {
		this.startRow = startRow;
	}
	public int getEndRow() {
		return endRow;
	}
	public void setEndRow(int endRow) {
		this.endRow = endRow;
	}
	public String getAgencyCode() {
		return agencyCode;
	}
	public void setAgencyCode(String agencyCode) {
		this.agencyCode = agencyCode;
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
	public String getBillingType() {
		return billingType;
	}
	public void setBillingType(String billingType) {
		this.billingType = billingType;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getFromDt() {
		return fromDt;
	}
	public void setFromDt(String fromDt) {
		this.fromDt = fromDt;
	}
	public String getToDt() {
		return toDt;
	}
	public void setToDt(String toDt) {
		this.toDt = toDt;
	}
	public String getCargoType() {
		return cargoType;
	}
	public void setCargoType(String cargoType) {
		this.cargoType = cargoType;
	}
	public String getJpvc() {
		return jpvc;
	}
	public void setJpvc(String jpvc) {
		this.jpvc = jpvc;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
