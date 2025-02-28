package com.tsb.most.biz.parm.monitoring;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class HandlingInParm extends BaseBizParm {
    
    private String grNo;
    private String stat;
    private String cgNo;
    private String shipgNoteNo;
    private String vslCallId;
    private String startDt;
    private String endDt;
    private String locId;
    private String catgCd;
    private String cgTpCd;
    private String searchType;
    
    private String fwrAgnt;//add by sunny 20081121

    private String hhtFnlChk;
    
    private String ptnrCode;
    private String userType;
    
    private String workDT;
    private String shftId;
    
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

    /**
    * Function set a stat value
    * @param stat. 
    * @return void.
    */        
    public void setStat(String stat)
    {
        this.stat       = stat;
    }

    /**
    * Return a stat Value
    * @param void. 
    * @return String.
    */  
    public String getStat()
    {
        return stat;
    }

    /**
    * Function set a shipgNoteNo value
    * @param shipgNoteNo. 
    * @return void.
    */        
    public void setShipgNoteNo(String shipgNoteNo)
    {
        this.shipgNoteNo       = shipgNoteNo;
    }

    /**
    * Return a shipgNoteNo Value
    * @param void. 
    * @return String.
    */  
    public String getShipgNoteNo()
    {
        return shipgNoteNo;
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



    public String getCgNo() {
        return cgNo;
    }
    public void setCgNo(String cgNo) {
        this.cgNo = cgNo;
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

	public String getShftId() {
		return shftId;
	}

	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
}
