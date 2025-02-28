package com.tsb.most.biz.parm.monitoring;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchWarehouseBalanceParm extends BaseBizParm {
    private String vslCallId;
    private String userRefNo;
    private String bondedWhYn;
	private String searchType;
	private String whId;
	private String cmdtCd;
	private String mfDocId;
	private String blNo;
	private String snNo;
	private String cnsneCd;
	private String locTpCd;
	private String scn;
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getUserRefNo() {
		return userRefNo;
	}
	public void setUserRefNo(String userRefNo) {
		this.userRefNo = userRefNo;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
    public String getBondedWhYn() {
		return bondedWhYn;
	}
	public void setBondedWhYn(String bondedWhYn) {
		this.bondedWhYn = bondedWhYn;
	}
	public String getWhId() {
		return whId;
	}
	public void setWhId(String whId) {
		this.whId = whId;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
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
	public String getCnsneCd() {
		return cnsneCd;
	}
	public void setCnsneCd(String cnsneCd) {
		this.cnsneCd = cnsneCd;
	}
	public String getLocTpCd() {
		return locTpCd;
	}
	public void setLocTpCd(String locTpCd) {
		this.locTpCd = locTpCd;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
