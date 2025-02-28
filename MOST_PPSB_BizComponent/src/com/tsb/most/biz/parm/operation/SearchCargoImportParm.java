package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchCargoImportParm extends BaseBizParm {
    
    private String cgNo;
    private String vslCallId;
    private String masterBL;
    private String  blNo;
    private String doNo;
    private String stat;
    private String delvTpCd;    
    private String searchType;
    
    private String hhtFnlMode;
    
    private String startDt;
    private String endDt;
    
    private String currentPage;
    private String numbPerPage;
    private String pageType;
    
    private String truckNo;
    private String hatchNo;
    private String lorryNo;
    private String listType;
    
    private String pkgNo;
    private String userRefNo;
    private String sdoNo;
    
    private String imtNo;
    private String bargeCheckYn;
    
    //Mantis: 166711
    private String driverId;
    
    public String getLorryNo() {
		return lorryNo;
	}

	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}

    public String getTruckNo() {
		return truckNo;
	}

	public void setTruckNo(String truckNo) {
		this.truckNo = truckNo;
	}

	public String getHatchNo() {
		return hatchNo;
	}

	public void setHacthNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}

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
    * Function set a doNo value
    * @param doNo. 
    * @return void.
    */        
    public void setDoNo(String doNo)
    {
        this.doNo       = doNo;
    }

    /**
    * Return a doNo Value
    * @param void. 
    * @return String.
    */  
    public String getDoNo()
    {
        return doNo;
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


    public String getDelvTpCd() {
        return delvTpCd;
    }
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }
    
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }

    /**
     * @return Returns the hhtFnlMode.
     */
    public String getHhtFnlMode() {
        return hhtFnlMode;
    }
    /**
     * @param hhtFnlMode The hhtFnlMode to set.
     */
    public void setHhtFnlMode(String hhtFnlMode) {
        this.hhtFnlMode = hhtFnlMode;
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
    /**
     * @return Returns the startDt.
     */
    public String getStartDt() {
        return startDt;
    }
    /**
     * @param startDt The startDt to set.
     */
    public void setStartDt(String startDt) {
        this.startDt = startDt;
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

	public String getListType() {
		return listType;
	}

	public void setListType(String listType) {
		this.listType = listType;
	}

	public String getMasterBL() {
		return masterBL;
	}

	public void setMasterBL(String masterBL) {
		this.masterBL = masterBL;
	}

	public String getPkgNo() {
		return pkgNo;
	}

	public void setPkgNo(String pkgNo) {
		this.pkgNo = pkgNo;
	}

	public String getUserRefNo() {
		return userRefNo;
	}

	public void setUserRefNo(String userRefNo) {
		this.userRefNo = userRefNo;
	}

	public String getSdoNo() {
		return sdoNo;
	}

	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}

	public String getImtNo() {
		return imtNo;
	}

	public void setImtNo(String imtNo) {
		this.imtNo = imtNo;
	}

	public String getBargeCheckYn() {
		return bargeCheckYn;
	}

	public void setBargeCheckYn(String bargeCheckYn) {
		this.bargeCheckYn = bargeCheckYn;
	}

	public String getDriverId() {
		return driverId;
	}

	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
    
}
