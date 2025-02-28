package com.tsb.most.biz.parm.document;


import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchNominationManifestParm extends BaseBizParm {
	
	private static final long serialVersionUID = 1L;
    
    private String vslCd;
    private String docId;
    private String jobNo;
    private String fwdCd;
    private String vslCallId;
    private String scn;
    private String blNo;
    private String delvTpCd;
    private String authority;
    private String userId;
    private String ptnrCd;
    private String etaStart;
    private String etaEnd;
    private String searchType;
	private String callYear;
	private String callSeq;
	private String sdoNo;
    
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
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
     * @return Returns the docId.
     */
    public String getDocId() {
        return docId;
    }
    /**
     * @param docId The docId to set.
     */
    public void setDocId(String docId) {
        this.docId = docId;
    }
    /**
     * @return Returns the etaEnd.
     */
    public String getEtaEnd() {
        return etaEnd;
    }
    /**
     * @param etaEnd The etaEnd to set.
     */
    public void setEtaEnd(String etaEnd) {
        this.etaEnd = etaEnd;
    }
    /**
     * @return Returns the etaStart.
     */
    public String getEtaStart() {
        return etaStart;
    }
    /**
     * @param etaStart The etaStart to set.
     */
    public void setEtaStart(String etaStart) {
        this.etaStart = etaStart;
    }
    /**
     * @return Returns the fwdCd.
     */
    public String getFwdCd() {
        return fwdCd;
    }
    /**
     * @param fwdCd The fwdCd to set.
     */
    public void setFwdCd(String fwdCd) {
        this.fwdCd = fwdCd;
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
     * @return Returns the ptnrCd.
     */
    public String getPtnrCd() {
        return ptnrCd;
    }
    /**
     * @param ptnrCd The ptnrCd to set.
     */
    public void setPtnrCd(String ptnrCd) {
        this.ptnrCd = ptnrCd;
    }
    /**
     * @return Returns the userId.
     */
    public String getUserId() {
        return userId;
    }
    /**
     * @param userId The userId to set.
     */
    public void setUserId(String userId) {
        this.userId = userId;
        super.userId = userId;
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
     * @return Returns the vslCd.
     */
    public String getVslCd() {
        return vslCd;
    }
    /**
     * @param vslCd The vslCd to set.
     */
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
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
