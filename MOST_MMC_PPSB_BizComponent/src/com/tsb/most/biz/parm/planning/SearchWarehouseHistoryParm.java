/**
* CargoJobParm.java
*
* Created on   : 2007-10-19
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR            REVISION     
* 2007-10-19     Mr Sunny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchWarehouseHistoryParm extends BaseBizParm {
    
    private String jobNo;
    private String workStDt;
    private String workEndDt;
    private String jobTpCd;
    private String shftId;
    private String eqNo;
    private String eqTpCd;
    private String hatchNo;
    private String cgNo;
    private String vslCallId;
    private String fmLocId;
    private String delvTpCd;
    private String opeClassCd;
    private String searchType;
    private String blNo;
    private String grNo;
    private String blSn;
    private String rhdlGroupNo;
    private String cgCoCd;
    
    private String jobGroup;
    private String rhdlNo;
    private String ptnrCd;
    private String shftDt;
    
    /**
     * lv.dat add paging 20130611
     */
    private String currentPage;
    private String numbPerPage;
    private String pageType;
    private String fromRow;
    private String toRow;
    
    //MOLF
    private String jobPurpCd;
    private String divSearch;

    private String cd;		//Loc_Div_Cd
    private String cdNm;	//Loc_Nm
    private String locCd;
    private String berthTp;
    private String locDivCd;
    private String mfDocId;
    private String snNo;
    
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
    public String getShftDt() {
        return shftDt;
    }
    public void setShftDt(String shftDt) {
        this.shftDt = shftDt;
    }
    public String getPtnrCd() {
        return ptnrCd;
    }
    public void setPtnrCd(String ptnrCd) {
        this.ptnrCd = ptnrCd;
    }
    /**
     * @return Returns the cgCoCd.
     */
    public String getCgCoCd() {
        return cgCoCd;
    }
    /**
     * @param cgCoCd The cgCoCd to set.
     */
    public void setCgCoCd(String cgCoCd) {
        this.cgCoCd = cgCoCd;
    }
    /**
     * @return Returns the blNo.
     */
    public String getBlNo() {
        return blNo;
    }
    /**
     * @param blNo The blNo to set.
     */
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    /**
     * @return Returns the blSn.
     */
    public String getBlSn() {
        return blSn;
    }
    /**
     * @param blSn The blSn to set.
     */
    public void setBlSn(String blSn) {
        this.blSn = blSn;
    }
    /**
     * @return Returns the cgNo.
     */
    public String getCgNo() {
        return cgNo;
    }
    /**
     * @param cgNo The cgNo to set.
     */
    public void setCgNo(String cgNo) {
        this.cgNo = cgNo;
    }
    /**
     * @return Returns the delvTpCd.
     */
    public String getDelvTpCd() {
        return delvTpCd;
    }
    /**
     * @param delvTpCd The delvTpCd to set.
     */
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }
    /**
     * @return Returns the eqNo.
     */
    public String getEqNo() {
        return eqNo;
    }
    /**
     * @param eqNo The eqNo to set.
     */
    public void setEqNo(String eqNo) {
        this.eqNo = eqNo;
    }
    /**
     * @return Returns the eqTpCd.
     */
    public String getEqTpCd() {
        return eqTpCd;
    }
    /**
     * @param eqTpCd The eqTpCd to set.
     */
    public void setEqTpCd(String eqTpCd) {
        this.eqTpCd = eqTpCd;
    }
    /**
     * @return Returns the fmLocId.
     */
    public String getFmLocId() {
        return fmLocId;
    }
    /**
     * @param fmLocId The fmLocId to set.
     */
    public void setFmLocId(String fmLocId) {
        this.fmLocId = fmLocId;
    }
    /**
     * @return Returns the grNo.
     */
    public String getGrNo() {
        return grNo;
    }
    /**
     * @param grNo The grNo to set.
     */
    public void setGrNo(String grNo) {
        this.grNo = grNo;
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
     * @return Returns the jobGroup.
     */
    public String getJobGroup() {
        return jobGroup;
    }
    /**
     * @param jobGroup The jobGroup to set.
     */
    public void setJobGroup(String jobGroup) {
        this.jobGroup = jobGroup;
    }
    /**
     * @return Returns the jobNo.
     */
    public String getJobNo() {
        return jobNo;
    }
    /**
     * @param jobNo The jobNo to set.
     */
    public void setJobNo(String jobNo) {
        this.jobNo = jobNo;
    }
    /**
     * @return Returns the jobTpCd.
     */
    public String getJobTpCd() {
        return jobTpCd;
    }
    /**
     * @param jobTpCd The jobTpCd to set.
     */
    public void setJobTpCd(String jobTpCd) {
        this.jobTpCd = jobTpCd;
    }
    /**
     * @return Returns the opeClassCd.
     */
    public String getOpeClassCd() {
        return opeClassCd;
    }
    /**
     * @param opeClassCd The opeClassCd to set.
     */
    public void setOpeClassCd(String opeClassCd) {
        this.opeClassCd = opeClassCd;
    }
    /**
     * @return Returns the rhdlGroupNo.
     */
    public String getRhdlGroupNo() {
        return rhdlGroupNo;
    }
    /**
     * @param rhdlGroupNo The rhdlGroupNo to set.
     */
    public void setRhdlGroupNo(String rhdlGroupNo) {
        this.rhdlGroupNo = rhdlGroupNo;
    }
    /**
     * @return Returns the rhdlNo.
     */
    public String getRhdlNo() {
        return rhdlNo;
    }
    /**
     * @param rhdlNo The rhdlNo to set.
     */
    public void setRhdlNo(String rhdlNo) {
        this.rhdlNo = rhdlNo;
    }
    /**
     * @return Returns the searchType.
     */
    public String getSearchType() {
        return searchType;
    }
    /**
     * @param searchType The searchType to set.
     */
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    /**
     * @return Returns the shftId.
     */
    public String getShftId() {
        return shftId;
    }
    /**
     * @param shftId The shftId to set.
     */
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
    /**
     * @return Returns the vslCallId.
     */
    public String getVslCallId() {
        return vslCallId;
    }
    /**
     * @param vslCallId The vslCallId to set.
     */
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    /**
     * @return Returns the workEndDt.
     */
    public String getWorkEndDt() {
        return workEndDt;
    }
    /**
     * @param workEndDt The workEndDt to set.
     */
    public void setWorkEndDt(String workEndDt) {
        this.workEndDt = workEndDt;
    }
    /**
     * @return Returns the workStDt.
     */
    public String getWorkStDt() {
        return workStDt;
    }
    /**
     * @param workStDt The workStDt to set.
     */
    public void setWorkStDt(String workStDt) {
        this.workStDt = workStDt;
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
    public String getDivSearch() {
        return divSearch;
    }
    public void setDivSearch(String divSearch) {
        this.divSearch = divSearch;
    }
    public String getJobPurpCd() {
        return jobPurpCd;
    }
    public void setJobPurpCd(String jobPurpCd) {
        this.jobPurpCd = jobPurpCd;
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
	public String getLocCd() {
		return locCd;
	}
	public void setLocCd(String locCd) {
		this.locCd = locCd;
	}
	public String getBerthTp() {
		return berthTp;
	}
	public void setBerthTp(String berthTp) {
		this.berthTp = berthTp;
	}
	public String getLocDivCd() {
		return locDivCd;
	}
	public void setLocDivCd(String locDivCd) {
		this.locDivCd = locDivCd;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getSnNo() {
		return snNo;
	}
	public void setSnNo(String snNo) {
		this.snNo = snNo;
	}
}