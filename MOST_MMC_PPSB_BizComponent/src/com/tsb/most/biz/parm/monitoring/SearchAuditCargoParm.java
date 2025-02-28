package com.tsb.most.biz.parm.monitoring;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchAuditCargoParm extends BaseBizParm {
    
    private String scn;
	private String vslCallId;
	private String blNo;
	private String snNo;
	private String transFromDt;
    private String transToDt;
    private String updateType;
    private String screenName;
    private String searchType;
    private String pgmId;
    
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
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
	public String getSnNo() {
		return snNo;
	}
	public void setSnNo(String snNo) {
		this.snNo = snNo;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getUpdateType() {
		return updateType;
	}
	public void setUpdateType(String updateType) {
		this.updateType = updateType;
	}
	public String getScreenName() {
		return screenName;
	}
	public void setScreenName(String screenName) {
		this.screenName = screenName;
	}
	public String getTransFromDt() {
		return transFromDt;
	}
	public void setTransFromDt(String transFromDt) {
		this.transFromDt = transFromDt;
	}
	public String getTransToDt() {
		return transToDt;
	}
	public void setTransToDt(String transToDt) {
		this.transToDt = transToDt;
	}
	public String getPgmId() {
		return pgmId;
	}
	public void setPgmId(String pgmId) {
		this.pgmId = pgmId;
	}
}
