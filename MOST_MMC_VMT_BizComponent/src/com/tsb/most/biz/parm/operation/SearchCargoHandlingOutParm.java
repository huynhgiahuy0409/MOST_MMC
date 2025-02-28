package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchCargoHandlingOutParm extends BaseBizParm {
    
    private String cgNo;
    private String vslCallId;
    private String blNo;
    private String grNo;
    private String cgInOutCd;
    private String lorryId;
    private String startDt;
    private String endDt;
    private String locId;
    private String catgCd;
    private String searchType;
    private String shftId;
    private String shftDt;
    private String fwrAgnt;    
    private String spCaCoCd;
    private String jobCoCd;
    private String delvTpCd;
    private String shipgNoteNo;
    private String cgTpCd;
    private String rhdlNo;
    private String rhdlMode;
    private String blSn;
    private String hhtFnlChk;
    private String ptnrCode;
    private String userType;
    private String workDT;
    private String orgRefNo;
    private String mfDocId;
    private String lotNo;
    private String cmdtCd;
    private String cnsneCd;
    private String locTpCd;
    private String cargoTp;
    private String unitNo;
    
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

    /**
    * Function set a grNo value
    * @param grNo. 
    * @return void.
    */        
    public void setGrNo(String grNo)
    {
        this.grNo       = grNo;
    }

    /**
    * Return a grNo Value
    * @param void. 
    * @return String.
    */  
    public String getGrNo()
    {
        return grNo;
    }



    public String getCgInOutCd() {
        return cgInOutCd;
    }
    public void setCgInOutCd(String cgInOutCd) {
        this.cgInOutCd = cgInOutCd;
    }
    public String getLorryId() {
        return lorryId;
    }
    public void setLorryId(String lorryId) {
        this.lorryId = lorryId;
    }
    public String getCatgCd() {
        return catgCd;
    }
    public void setCatgCd(String catgCd) {
        this.catgCd = catgCd;
    }
    public String getEndDt() {
        return endDt;
    }
    public void setEndDt(String endDt) {
        this.endDt = endDt;
    }
    public String getLocId() {
        return locId;
    }
    public void setLocId(String locId) {
        this.locId = locId;
    }
    public String getStartDt() {
        return startDt;
    }
    public void setStartDt(String startDt) {
        this.startDt = startDt;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getShftDt() {
        return shftDt;
    }
    public void setShftDt(String shftDt) {
        this.shftDt = shftDt;
    }
    public String getShftId() {
        return shftId;
    }
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
    /**
     * @return Returns the fwrAgnt.
     */
    public String getFwrAgnt() {
        return fwrAgnt;
    }
    /**
     * @param fwrAgnt The fwrAgnt to set.
     */
    public void setFwrAgnt(String fwrAgnt) {
        this.fwrAgnt = fwrAgnt;
    }
    /**
     * @return Returns the cgTpCd.
     */
    public String getCgTpCd() {
        return cgTpCd;
    }
    /**
     * @param cgTpCd The cgTpCd to set.
     */
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
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
     * @return Returns the jobCoCd.
     */
    public String getJobCoCd() {
        return jobCoCd;
    }
    /**
     * @param jobCoCd The jobCoCd to set.
     */
    public void setJobCoCd(String jobCoCd) {
        this.jobCoCd = jobCoCd;
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
     * @return Returns the shipgNoteNo.
     */
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    /**
     * @param shipgNoteNo The shipgNoteNo to set.
     */
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }
    /**
     * @return Returns the spCaCoCd.
     */
    public String getSpCaCoCd() {
        return spCaCoCd;
    }
    /**
     * @param spCaCoCd The spCaCoCd to set.
     */
    public void setSpCaCoCd(String spCaCoCd) {
        this.spCaCoCd = spCaCoCd;
    }
    /**
     * @return Returns the rhdlMode.
     */
    public String getRhdlMode() {
        return rhdlMode;
    }
    /**
     * @param rhdlMode The rhdlMode to set.
     */
    public void setRhdlMode(String rhdlMode) {
        this.rhdlMode = rhdlMode;
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
     * @return Returns the hhtFnlChk.
     */
    public String getHhtFnlChk() {
        return hhtFnlChk;
    }
    /**
     * @param hhtFnlChk The hhtFnlChk to set.
     */
    public void setHhtFnlChk(String hhtFnlChk) {
        this.hhtFnlChk = hhtFnlChk;
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

    public String getWorkDT() {
        return workDT;
    }

    public void setWorkDT(String workDT) {
        this.workDT = workDT;
    }

	public String getOrgRefNo() {
		return orgRefNo;
	}

	public void setOrgRefNo(String orgRefNo) {
		this.orgRefNo = orgRefNo;
	}

	public String getMfDocId() {
		return mfDocId;
	}

	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}

	public String getLotNo() {
		return lotNo;
	}

	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}

	public String getCmdtCd() {
		return cmdtCd;
	}

	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
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
}
