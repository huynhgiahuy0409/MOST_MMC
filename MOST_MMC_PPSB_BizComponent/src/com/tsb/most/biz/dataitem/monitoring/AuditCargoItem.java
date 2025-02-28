package com.tsb.most.biz.dataitem.monitoring;

import java.util.ArrayList;

public class AuditCargoItem {
    
    private String vslCallId;
	private String vslCd;
	private String callYear;
	private String callSeq;
	private String pgmId;
	private String pgmNm;
	private String sessionInfo;
	private String refNo1;
	private String refNo2;
	private String doNo;
	private String historySeq;
	private String dataField;
	private String oldValue;
	private String newValue;
	private String userId;
	private String updDt;
	private String workingStatus;
	
	private String cd;
	private String cdNm;
	
	private ArrayList<AuditCargoItem> items;

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
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

	public String getPgmId() {
		return pgmId;
	}

	public void setPgmId(String pgmId) {
		this.pgmId = pgmId;
	}

	public String getPgmNm() {
		return pgmNm;
	}

	public void setPgmNm(String pgmNm) {
		this.pgmNm = pgmNm;
	}

	public String getSessionInfo() {
		return sessionInfo;
	}

	public void setSessionInfo(String sessionInfo) {
		this.sessionInfo = sessionInfo;
	}

	public String getRefNo1() {
		return refNo1;
	}

	public void setRefNo1(String refNo1) {
		this.refNo1 = refNo1;
	}

	public String getRefNo2() {
		return refNo2;
	}

	public void setRefNo2(String refNo2) {
		this.refNo2 = refNo2;
	}

	public String getDoNo() {
		return doNo;
	}

	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}

	public String getHistorySeq() {
		return historySeq;
	}

	public void setHistorySeq(String historySeq) {
		this.historySeq = historySeq;
	}

	public String getDataField() {
		return dataField;
	}

	public void setDataField(String dataField) {
		this.dataField = dataField;
	}

	public String getOldValue() {
		return oldValue;
	}

	public void setOldValue(String oldValue) {
		this.oldValue = oldValue;
	}

	public String getNewValue() {
		return newValue;
	}

	public void setNewValue(String newValue) {
		this.newValue = newValue;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public ArrayList<AuditCargoItem> getItems() {
		return items;
	}

	public void setItems(ArrayList<AuditCargoItem> items) {
		this.items = items;
	}

	public String getWorkingStatus() {
		return workingStatus;
	}

	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
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

	public String getUpdDt() {
		return updDt;
	}

	public void setUpdDt(String updDt) {
		this.updDt = updDt;
	}
}
