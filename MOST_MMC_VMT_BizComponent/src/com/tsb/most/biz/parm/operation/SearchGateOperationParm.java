package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchGateOperationParm extends BaseBizParm {
    
    private String cgNo;
    private String cgInOutCd;
    private int seq;
    private String gateInDt;
    private String gateOutDt;
    private String grNo;
    private String sdoNo;
    private String locId;
    private String lorryNo;
    private String gatePassNo;
    private String vslCallId;
    private String tsptr;
    private String searchType;
    private String driverId;
    private String jobPurpCd;
    private String jobTpCd;
    private String gateTxnNo;
    private String isMultiCargo;
    
    private String shipgNoteNo;
    private String blNo;
    private String subDoNo;
    private String qrNo;

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
    * Function set a cgInOutCd value
    * @param cgInOutCd. 
    * @return void.
    */        
    public void setCgInOutCd(String cgInOutCd)
    {
        this.cgInOutCd       = cgInOutCd;
    }

    /**
    * Return a cgInOutCd Value
    * @param void. 
    * @return String.
    */  
    public String getCgInOutCd()
    {
        return cgInOutCd;
    }

    /**
    * Function set a seq value
    * @param seq. 
    * @return void.
    */ 
    public void setSeq(int seq)
    {
        this.seq = seq;
    } 

    /**
    * Function set a seq value
    * @param void. 
    * @return int.
    */      
    public int getSeq()
    {
        return seq;
    }

    /**
    * Function set a gateInDt value
    * @param gateInDt. 
    * @return void.
    */        
    public void setGateInDt(String gateInDt)
    {
        this.gateInDt       = gateInDt;
    }

    /**
    * Return a gateInDt Value
    * @param void. 
    * @return String.
    */  
    public String getGateInDt()
    {
        return gateInDt;
    }

    /**
    * Function set a gateOutDt value
    * @param gateOutDt. 
    * @return void.
    */        
    public void setGateOutDt(String gateOutDt)
    {
        this.gateOutDt       = gateOutDt;
    }

    /**
    * Return a gateOutDt Value
    * @param void. 
    * @return String.
    */  
    public String getGateOutDt()
    {
        return gateOutDt;
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

    /**
    * Function set a locId value
    * @param locId. 
    * @return void.
    */        
    public void setLocId(String locId)
    {
        this.locId       = locId;
    }

    /**
    * Return a locId Value
    * @param void. 
    * @return String.
    */  
    public String getLocId()
    {
        return locId;
    }

    /**
    * Function set a lorryNo value
    * @param lorryNo. 
    * @return void.
    */        
    public void setLorryNo(String lorryNo)
    {
        this.lorryNo       = lorryNo;
    }

    /**
    * Return a lorryNo Value
    * @param void. 
    * @return String.
    */  
    public String getLorryNo()
    {
        return lorryNo;
    }

    /**
    * Function set a gatePassNo value
    * @param gatePassNo. 
    * @return void.
    */        
    public void setGatePassNo(String gatePassNo)
    {
        this.gatePassNo       = gatePassNo;
    }

    /**
    * Return a gatePassNo Value
    * @param void. 
    * @return String.
    */  
    public String getGatePassNo()
    {
        return gatePassNo;
    }



    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getTsptr() {
        return tsptr;
    }
    public void setTsptr(String tsptr) {
        this.tsptr = tsptr;
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

	public String getJobPurpCd() {
		return jobPurpCd;
	}

	public void setJobPurpCd(String jobPurpCd) {
		this.jobPurpCd = jobPurpCd;
	}

	public String getJobTpCd() {
		return jobTpCd;
	}

	public void setJobTpCd(String jobTpCd) {
		this.jobTpCd = jobTpCd;
	}

	public String getGateTxnNo() {
		return gateTxnNo;
	}

	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
	}

	public String getIsMultiCargo() {
		return isMultiCargo;
	}

	public void setIsMultiCargo(String isMultiCargo) {
		this.isMultiCargo = isMultiCargo;
	}

	public String getDriverId() {
		return driverId;
	}

	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}

	public String getSdoNo() {
		return sdoNo;
	}

	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}

	public String getShipgNoteNo() {
		return shipgNoteNo;
	}

	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}

	public String getBlNo() {
		return blNo;
	}

	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}

	public String getSubDoNo() {
		return subDoNo;
	}

	public void setSubDoNo(String subDoNo) {
		this.subDoNo = subDoNo;
	}

	public String getQrNo() {
		return qrNo;
	}

	public void setQrNo(String qrNo) {
		this.qrNo = qrNo;
	}
	
}
