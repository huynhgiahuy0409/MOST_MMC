package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchServiceOrderParm extends BaseBizParm {
    
    private String seq;
    private String odrNo;
	private String category1;
	private String category2;
	private String category3;
	private String category1Nm;
	private String category2Nm;
	private String category3Nm;
	private String vslCallId;
	private String svcDtFm;
	private String svcDtTo;
	private String shftId;
	private String statCd;
	private String userRole;
	private String searchType;
	private String subSearchType;
    private String alertYn;
    private String blSNNoSearch;
    private String scn;
    
    public String getBlSNNo() {
		return blSNNoSearch;
	}

	public void setBlSNNo(String blSNNo) {
		this.blSNNoSearch = blSNNo;
	}

	public String getSeq() {
        return seq;
    }

    public void setSeq(String seq) {
        this.seq = seq;
    }

    public String getOdrNo() {
        return odrNo;
    }

    public void setOdrNo(String odrNo) {
        this.odrNo = odrNo;
    }

    public String getCategory1() {
        return category1;
    }

    public void setCategory1(String category1) {
        this.category1 = category1;
    }

    public String getCategory2() {
        return category2;
    }

    public void setCategory2(String category2) {
        this.category2 = category2;
    }

    public String getCategory3() {
        return category3;
    }

    public void setCategory3(String category3) {
        this.category3 = category3;
    }

    public String getCategory1Nm() {
        return category1Nm;
    }

    public void setCategory1Nm(String category1Nm) {
        this.category1Nm = category1Nm;
    }

    public String getCategory2Nm() {
        return category2Nm;
    }

    public void setCategory2Nm(String category2Nm) {
        this.category2Nm = category2Nm;
    }

    public String getCategory3Nm() {
        return category3Nm;
    }

    public void setCategory3Nm(String category3Nm) {
        this.category3Nm = category3Nm;
    }

    public String getVslCallId() {
        return vslCallId;
    }

    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }

    public String getSvcDtFm() {
        return svcDtFm;
    }

    public void setSvcDtFm(String svcDtFm) {
        this.svcDtFm = svcDtFm;
    }

    public String getSvcDtTo() {
        return svcDtTo;
    }

    public void setSvcDtTo(String svcDtTo) {
        this.svcDtTo = svcDtTo;
    }

    public String getShftId() {
        return shftId;
    }

    public void setShftId(String shftId) {
        this.shftId = shftId;
    }

    public String getStatCd() {
        return statCd;
    }

    public void setStatCd(String statCd) {
        this.statCd = statCd;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getSearchType() {
        return searchType;
    }

    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }

    public String getSubSearchType() {
        return subSearchType;
    }

    public void setSubSearchType(String subSearchType) {
        this.subSearchType = subSearchType;
    }

    public String getAlertYn() {
        return alertYn;
    }

    public void setAlertYn(String alertYn) {
        this.alertYn = alertYn;
    }

	public String getScn() {
		return scn;
	}

	public void setScn(String scn) {
		this.scn = scn;
	}
}
