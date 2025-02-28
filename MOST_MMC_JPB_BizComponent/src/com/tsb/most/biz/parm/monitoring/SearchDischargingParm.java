package com.tsb.most.biz.parm.monitoring;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchDischargingParm extends BaseBizParm {
    private String vslCallId;
    private String doNo;
    private String dischgStDt;
    private String dischgEndDt;
    private String fwrAgnt;
    private String gatePassNo;
    private String searchType;
    private String blNo ;
    private String snNo ;
    private String mfDocId ;
    private String lorryNo ;
    private String modeOfOpr;
    private String userType;
    private String authority;
    private String ptnrCode;
    private String shiftId;
    private String hatchNo;
    private String jobPurpCd;
    private String shiftDate;

    private String currentPage;
    private String numbPerPage;
    private String pageType;
    private String fromRow;
    private String toRow;
    private String grNo;
    private String isExport;
    private String cargoTp;
    private String unitNo;
    
    private String scn;
    
    public String getShiftDate() {
        return shiftDate;
    }
    public void setShiftDate(String shiftDate) {
        this.shiftDate = shiftDate;
    }
    public String getSnNo() {
        return snNo;
    }
    public void setSnNo(String snNo) {
        this.snNo = snNo;
    }
    /**
     * @return Returns the hatchNo.
     */
    public String getHatchNo() {
        return hatchNo;
    }
    /**
     * @param hatchNo The hatchNo to set.
     */
    public void setHatchNo(String hatchNo) {
        this.hatchNo = hatchNo;
    }
    /**
     * @return Returns the shiftId.
     */
    public String getShiftId() {
        return shiftId;
    }
    /**
     * @param shiftId The shiftId to set.
     */
    public void setShiftId(String shiftId) {
        this.shiftId = shiftId;
    }
    /**
     * @return Returns the authority.
     */
    public String getAuthority() {
        return authority;
    }
    /**
     * @param authority The authority to set.
     */
    public void setAuthority(String authority) {
        this.authority = authority;
    }
    /**
     * @return Returns the ptnrCode.
     */
    public String getPtnrCode() {
        return ptnrCode;
    }
    /**
     * @param ptnrCode The ptnrCode to set.
     */
    public void setPtnrCode(String ptnrCode) {
        this.ptnrCode = ptnrCode;
    }
    /**
     * @return Returns the userType.
     */
    public String getUserType() {
        return userType;
    }
    /**
     * @param userType The userType to set.
     */
    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getDischgEndDt() {
        return dischgEndDt;
    }
    public void setDischgEndDt(String dischgEndDt) {
        this.dischgEndDt = dischgEndDt;
    }
    public String getDischgStDt() {
        return dischgStDt;
    }
    public void setDischgStDt(String dischgStDt) {
        this.dischgStDt = dischgStDt;
    }
    public String getDoNo() {
        return doNo;
    }
    public void setDoNo(String doNo) {
        this.doNo = doNo;
    }
    public String getGatePassNo() {
        return gatePassNo;
    }
    public void setGatePassNo(String gatePassNo) {
        this.gatePassNo = gatePassNo;
    }
    public String getModeOfOpr() {
        return modeOfOpr;
    }
    public void setModeOfOpr(String modeOfOpr) {
        this.modeOfOpr = modeOfOpr;
    }
    public String getFwrAgnt() {
        return fwrAgnt;
    }
    public void setFwrAgnt(String fwrAgnt) {
        this.fwrAgnt = fwrAgnt;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getLorryNo() {
        return lorryNo;
    }
    public void setLorryNo(String lorryNo) {
        this.lorryNo = lorryNo;
    }
    public String getBlNo() {
        return blNo;
    }
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    public String getCurrentPage() {
        return currentPage;
    }
    public void setCurrentPage(String currentPage) {
        this.currentPage = currentPage;
    }
    public String getNumbPerPage() {
        return numbPerPage;
    }
    public void setNumbPerPage(String numbPerPage) {
        this.numbPerPage = numbPerPage;
    }
    public String getPageType() {
        return pageType;
    }
    public void setPageType(String pageType) {
        this.pageType = pageType;
    }
    public String getFromRow() {
        return fromRow;
    }
    public void setFromRow(String fromRow) {
        this.fromRow = fromRow;
    }
    public String getToRow() {
        return toRow;
    }
    public void setToRow(String toRow) {
        this.toRow = toRow;
    }
    public String getGrNo() {
        return grNo;
    }
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
	public String getJobPurpCd() {
		return jobPurpCd;
	}
	public void setJobPurpCd(String jobPurpCd) {
		this.jobPurpCd = jobPurpCd;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getIsExport() {
		return isExport;
	}
	public void setIsExport(String isExport) {
		this.isExport = isExport;
	}
	public String getCargoTp() {
		return cargoTp;
	}
	public void setCargoTp(String cargoTp) {
		this.cargoTp = cargoTp;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
