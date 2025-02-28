package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchCargoDischargingParm extends BaseBizParm {
    
    private String vslCallId;
    private String blNo;
    private String cgTpCd;
    private String shftDt;
    private String shftId;
    private String searchType;
    private String hhtFlags;
    private String delvMode;
    private String jobType;
    private String packingSeq;
    private String jobPurpCd;
    private String jobGroup;
    
    private String startDtStr;
    private String gateTxnNo;
    private String sdoNo;

    /**
    * Function set a vslCallId value
    * @param vslCallId. 
    * @return void.
    */        
    public void setVslCallId(String vslCallId)
    {
        this.vslCallId       = vslCallId;
    }

    /**
    * Return a vslCallId Value
    * @param void. 
    * @return String.
    */  
    public String getVslCallId()
    {
        return vslCallId;
    }

    /**
    * Function set a blNo value
    * @param blNo. 
    * @return void.
    */        
    public void setBlNo(String blNo)
    {
        this.blNo       = blNo;
    }

    /**
    * Return a blNo Value
    * @param void. 
    * @return String.
    */  
    public String getBlNo()
    {
        return blNo;
    }



    public String getCgTpCd() {
        return cgTpCd;
    }
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    /**
     * @return Returns the shftDt.
     */
    public String getShftDt() {
        return shftDt;
    }
    /**
     * @param shftDt The shftDt to set.
     */
    public void setShftDt(String shftDt) {
        this.shftDt = shftDt;
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
    
    public String getHhtFlags() {
        return hhtFlags;
    }
    
    public void setHhtFlags(String hhtFlags) {
        this.hhtFlags = hhtFlags;
    }

    public String getDelvMode() {
        return delvMode;
    }

    public void setDelvMode(String delvMode) {
        this.delvMode = delvMode;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getPackingSeq() {
        return packingSeq;
    }

    public void setPackingSeq(String packingSeq) {
        this.packingSeq = packingSeq;
    }

    public String getJobGroup() {
        return jobGroup;
    }

    public void setJobGroup(String jobGroup) {
        this.jobGroup = jobGroup;
    }

    public String getJobPurpCd() {
        return jobPurpCd;
    }

    public void setJobPurpCd(String jobPurpCd) {
        this.jobPurpCd = jobPurpCd;
    }

	public String getStartDtStr() {
		return startDtStr;
	}

	public void setStartDtStr(String startDtStr) {
		this.startDtStr = startDtStr;
	}

	public String getGateTxnNo() {
		return gateTxnNo;
	}

	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}

	public String getSdoNo() {
		return sdoNo;
	}

	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
    
    
}
