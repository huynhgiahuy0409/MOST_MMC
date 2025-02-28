package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchVesselDelayParm extends BaseBizParm{
    private String vslCallId;
    private String scn;
    private String stDt;
    private String endDt;
    private String reportId;
        
    private String shftId;
    private String hatchNo;
    private String searchType;
    private String rsnCd;
    private String bulkTp;
    private String fromDate;
    private String toDate;
    private String CgTpCd;
    
    private String verifyBy;
    private String verifyDate;
    private String verifyStatus;
    private String srchStr;

    private String rsnCdNm;
    private String vslNm;
    private String eta;
    private String cmd;
    private String etb;
    private String atb;
    private String atw;
    private String atc;
    private String atu;
    private String sa;
    private String userId;
    private String berthLoc;
    private String shftNm;
    private String itemCd;
    private String roleCd;
    private String pntyDt;
    private String downloadTp;
    
    public String getDownloadTp() {
		return downloadTp;
	}
	public void setDownloadTp(String downloadTp) {
		this.downloadTp = downloadTp;
	}
	public String getItemCd() {
		return itemCd;
	}
	public String getRoleCd() {
		return roleCd;
	}
	public String getPntyDt() {
		return pntyDt;
	}
	public void setItemCd(String itemCd) {
		this.itemCd = itemCd;
	}
	public void setRoleCd(String roleCd) {
		this.roleCd = roleCd;
	}
	public void setPntyDt(String pntyDt) {
		this.pntyDt = pntyDt;
	}
	public String getShftNm() {
		return shftNm;
	}
	public void setShftNm(String shftNm) {
		this.shftNm = shftNm;
	}
	public String getRsnCdNm() {
		return rsnCdNm;
	}
	public String getVslNm() {
		return vslNm;
	}
	public String getEta() {
		return eta;
	}
	public String getCmd() {
		return cmd;
	}
	public String getEtb() {
		return etb;
	}
	public String getAtb() {
		return atb;
	}
	public String getAtw() {
		return atw;
	}
	public String getAtc() {
		return atc;
	}
	public String getAtu() {
		return atu;
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
	public void setRsnCdNm(String rsnCdNm) {
		this.rsnCdNm = rsnCdNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public void setEta(String eta) {
		this.eta = eta;
	}
	public void setCmd(String cmd) {
		this.cmd = cmd;
	}
	public void setEtb(String etb) {
		this.etb = etb;
	}
	public void setAtb(String atb) {
		this.atb = atb;
	}
	public void setAtw(String atw) {
		this.atw = atw;
	}
	public void setAtc(String atc) {
		this.atc = atc;
	}
	public void setAtu(String atu) {
		this.atu = atu;
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
	public String getSrchStr() {
		return srchStr;
	}
	public void setSrchStr(String srchStr) {
		this.srchStr = srchStr;
	}
	private String rmk;
    
    public String getRmk() {
        return rmk;
    }
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    public String getCgTpCd() {
        return CgTpCd;
    }
    public void setCgTpCd(String cgTpCd) {
        CgTpCd = cgTpCd;
    }
    public String getBulkTp() {
        return bulkTp;
    }
    public void setBulkTp(String bulkTp) {
        this.bulkTp = bulkTp;
    }
    public String getHatchNo() {
        return hatchNo;
    }
    public void setHatchNo(String hatchNo) {
        this.hatchNo = hatchNo;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getShftId() {
        return shftId;
    }
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
    public String getStDt() {
        return stDt;
    }
    public void setStDt(String stDt) {
        this.stDt = stDt;
    }
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getRsnCd() {
        return rsnCd;
    }
    public void setRsnCd(String rsnCd) {
        this.rsnCd = rsnCd;
    }
    /**
     * @return Returns the fromDate.
     */
    public String getFromDate() {
        return fromDate;
    }
    /**
     * @param fromDate The fromDate to set.
     */
    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }
    /**
     * @return Returns the toDate.
     */
    public String getToDate() {
        return toDate;
    }
    /**
     * @param toDate The toDate to set.
     */
    public void setToDate(String toDate) {
        this.toDate = toDate;
    }
    /**
     * @return Returns the reportId.
     */
    public String getReportId() {
        return reportId;
    }
    /**
     * @param reportId The reportId to set.
     */
    public void setReportId(String reportId) {
        this.reportId = reportId;
    }
    /**
     * @return Returns the endDt.
     */
    public String getEndDt() {
        return endDt;
    }
    /**
     * @param endDt The endDt to set.
     */
    public void setEndDt(String endDt) {
        this.endDt = endDt;
    }
    
    public String getVerifyBy() {
        return verifyBy;
    }
    public void setVerifyBy(String verifyBy) {
        this.verifyBy = verifyBy;
    }
    public String getVerifyDate() {
        return verifyDate;
    }
    public void setVerifyDate(String verifyDate) {
        this.verifyDate = verifyDate;
    }
    public String getVerifyStatus() {
        return verifyStatus;
    }
    public void setVerifyStatus(String verifyStatus) {
        this.verifyStatus = verifyStatus;
    }
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
