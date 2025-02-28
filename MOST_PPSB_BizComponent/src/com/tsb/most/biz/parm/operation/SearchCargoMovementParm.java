package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchCargoMovementParm extends BaseBizParm {
    
    private String cgNo;
    private String vslCallId;
    private String jobNo;
    private String stDt;
    private String endDt;
    private String shftId;
    private String toLocId;
    private String shipgAgnt;
    private String fwrAgnt;
    private String locDivCd;
    private String searchType;
    private String opeClassCd;
    private String jobTpCd;
    private String shipgNoteNo;
    private String grNo;
    private String locId;
    private String mvTpCd;
    private String ptnrCode;
    private String userType;
    private String blNo;

    /**
    * Function set a cgNo value
    * @param cgNo. 
    * @return void.
    */        
    public void setCgNo(String cgNo)
    {
        this.cgNo       = cgNo;
    }

    /**
    * Return a cgNo Value
    * @param void. 
    * @return String.
    */  
    public String getCgNo()
    {
        return cgNo;
    }

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
    * Function set a jobNo value
    * @param jobNo. 
    * @return void.
    */        
    public void setJobNo(String jobNo)
    {
        this.jobNo       = jobNo;
    }

    /**
    * Return a jobNo Value
    * @param void. 
    * @return String.
    */  
    public String getJobNo()
    {
        return jobNo;
    }

    /**
    * Function set a stDt value
    * @param stDt. 
    * @return void.
    */        
    public void setStDt(String stDt)
    {
        this.stDt       = stDt;
    }

    /**
    * Return a stDt Value
    * @param void. 
    * @return String.
    */  
    public String getStDt()
    {
        return stDt;
    }

    /**
    * Function set a endDt value
    * @param endDt. 
    * @return void.
    */        
    public void setEndDt(String endDt)
    {
        this.endDt       = endDt;
    }

    /**
    * Return a endDt Value
    * @param void. 
    * @return String.
    */  
    public String getEndDt()
    {
        return endDt;
    }

    /**
    * Function set a shftId value
    * @param shftId. 
    * @return void.
    */        
    public void setShftId(String shftId)
    {
        this.shftId       = shftId;
    }

    /**
    * Return a shftId Value
    * @param void. 
    * @return String.
    */  
    public String getShftId()
    {
        return shftId;
    }

    /**
    * Function set a toLocId value
    * @param toLocId. 
    * @return void.
    */        
    public void setToLocId(String toLocId)
    {
        this.toLocId       = toLocId;
    }

    /**
    * Return a toLocId Value
    * @param void. 
    * @return String.
    */  
    public String getToLocId()
    {
        return toLocId;
    }

    /**
    * Function set a shipgAgnt value
    * @param shipgAgnt. 
    * @return void.
    */        
    public void setShipgAgnt(String shipgAgnt)
    {
        this.shipgAgnt       = shipgAgnt;
    }

    /**
    * Return a shipgAgnt Value
    * @param void. 
    * @return String.
    */  
    public String getShipgAgnt()
    {
        return shipgAgnt;
    }

    /**
    * Function set a fwrAgnt value
    * @param fwrAgnt. 
    * @return void.
    */        
    public void setFwrAgnt(String fwrAgnt)
    {
        this.fwrAgnt       = fwrAgnt;
    }

    /**
    * Return a fwrAgnt Value
    * @param void. 
    * @return String.
    */  
    public String getFwrAgnt()
    {
        return fwrAgnt;
    }



    public String getLocDivCd() {
        return locDivCd;
    }
    public void setLocDivCd(String locDivCd) {
        this.locDivCd = locDivCd;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getJobTpCd() {
        return jobTpCd;
    }
    public void setJobTpCd(String jobTpCd) {
        this.jobTpCd = jobTpCd;
    }
    public String getOpeClassCd() {
        return opeClassCd;
    }
    public void setOpeClassCd(String opeClassCd) {
        this.opeClassCd = opeClassCd;
    }
    

    public String getGrNo() {
        return grNo;
    }
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }
    public String getLocId() {
        return locId;
    }
    public void setLocId(String locId) {
        this.locId = locId;
    }
    /**
     * @return Returns the mvTpCd.
     */
    public String getMvTpCd() {
        return mvTpCd;
    }
    /**
     * @param mvTpCd The mvTpCd to set.
     */
    public void setMvTpCd(String mvTpCd) {
        this.mvTpCd = mvTpCd;
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

	public String getBlNo() {
		return blNo;
	}

	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
}
