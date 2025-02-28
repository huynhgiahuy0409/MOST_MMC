package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchVesselDelayPenaltyReportParm extends BaseBizParm {
	private String vslCallId;
    private String hatchNo;
    private String itemCd;
    private String roleCd;
    private String searchType;
    private String reportId; 
    private String vslNm;
    private String shftId;
    private String pntyDt;
    private String sa;
    private String userId;
    private String berthLoc;
    private String shftNm;
    private String stDt;
    private String scn;
    
    public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getStDt() {
		return stDt;
	}
	public void setStDt(String stDt) {
		this.stDt = stDt;
	}
	public String getShftNm() {
		return shftNm;
	}
	public void setShftNm(String shftNm) {
		this.shftNm = shftNm;
	}
	public String getReportId() {
		return reportId;
	}
	public String getVslNm() {
		return vslNm;
	}
	public String getSa() {
		return sa;
	}
	public String getUserId() {
		return userId;
	}
	public String getBerthLoc() {
		return berthLoc;
	}
	public void setReportId(String reportId) {
		this.reportId = reportId;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public void setSa(String sa) {
		this.sa = sa;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}
	public String getPntyDt() {
        return pntyDt;
    }
    public void setPntyDt(String pntyDt) {
        this.pntyDt = pntyDt;
    }
    public String getShftId() {
        return shftId;
    }
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getHatchNo() {
        return hatchNo;
    }
    public void setHatchNo(String hatchNo) {
        this.hatchNo = hatchNo;
    }
    public String getItemCd() {
        return itemCd;
    }
    public void setItemCd(String itemCd) {
        this.itemCd = itemCd;
    }
    public String getRoleCd() {
        return roleCd;
    }
    public void setRoleCd(String roleCd) {
        this.roleCd = roleCd;
    }
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
