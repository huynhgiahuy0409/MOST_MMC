package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchBerthApprovalParm extends BaseBizParm {

	private static final long serialVersionUID = 6736393944741491204L;

	private String etaFrom;
	private String etaTo;
	private String vslCallId;
	private String cgTpCd;
	private String planned;
	private String vslStatus;
	private String vslTp;
	private String searchType;
	private String alertYn;
	private int curPage;
	private String pagingSearchType;
	private int pageSize;
	private int startRow;
	private int endRow;

	public String getEtaFrom() {
		return etaFrom;
	}

	public void setEtaFrom(String etaFrom) {
		this.etaFrom = etaFrom;
	}

	public String getEtaTo() {
		return etaTo;
	}

	public void setEtaTo(String etaTo) {
		this.etaTo = etaTo;
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

	public String getVslTp() {
		return vslTp;
	}

	public void setVslTp(String vslTp) {
		this.vslTp = vslTp;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
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

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}

}
