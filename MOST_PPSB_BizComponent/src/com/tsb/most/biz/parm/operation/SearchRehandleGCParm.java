/**
* CargoRehandlingParm.java
*
* Created on   : 2007-10-19
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.3 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-10-19     Mr Sunny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.operation;

import java.util.Date;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchRehandleGCParm extends BaseBizParm {
    
    private String orgRefNo;
    private String orgGrNo;
    private String rhdlNo;
    private String rhdlMode;
    private String vslCallId;
    private String masterBlNo;
    private String bookingNo;
    //add 2008.04.01 by sunny-kim
    private String shipgNoteNo; 
    private String nextShipgNoteNo; 
    private String blNo;
    private String opeClassCd;
    private String nxVslCallId;
    private String nxRefNo;
    private String searchType;
    private String blSn;
    private String cgNo;
    private String grNo;
    private String col3;
    private String cgCoCd;
    private String spCaCoCd;
    private String arrvDtFm;
    private String arrvDtTo;
    private String jobGroup;
    private String jobNo;
    private String screanNm;
    private String estArrvDateFrm;
    private String estArrvDateTo; 
    
    private String yardInDateFrom;
    private String yardInDateTo;   
    
    private String authoType;
    private String ptnrCode;
    private String userType;
    
    private String hhtFnlMode;//FNL REHANDLING case LOADING FINAL, HADNLING OUT final

//  TAM ANH -FIXED ISSUE : 0026219 07/02/2013
    
    private String stRhdl;
    private String endRhdl;
    private String mfDocId;

    private String currentPage;
    private String numbPerPage;
    private String pageType;
    private String shiftDt;//added by Vin - 20190304 - Confirm Rehandle Loading screen
    private String shiftId;//added by Vin - 20190304 - Confirm Rehandle Loading screen
    private String cgTpCd;//added by Vin - 20190304 - Confirm Rehandle Loading screen
    private String rhdlGroupNo;//added by Vin - 20190304 - Confirm Rehandle Loading screen
    private String cmdtGrCd;
    private String cmdtCd;
    private String pkgNo;
    private String shipgAgentCd;
    private String locId;
    
    //added by Tim for rhdl Return to Shipper 16/03/2024
    private String vslCd;
    private String callSeq;
    
    public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getCallSeq() {
		return callSeq;
	}
	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}
	public String getCallYear() {
		return callYear;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	private String callYear;
    
    public String getEndRhdl() {
        return endRhdl;
    }
    public void setEndRhdl(String endRhdl) {
        this.endRhdl = endRhdl;
    }
    public String getStRhdl() {
        return stRhdl;
    }
    public void setStRhdl(String stRhdl) {
        this.stRhdl = stRhdl;
    }
    /**
     * Function set a rhdlNo value
     * @param rhdlNo. 
     * @return void.
     */        
     public void setRhdlNo(String rhdlNo)
     {
         this.rhdlNo       = rhdlNo;
     }

     /**
     * Return a rhdlNo Value
     * @param void. 
     * @return String.
     */  
     public String getRhdlNo()
     {
         return rhdlNo;
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
     * Function set a orgRefNo value
     * @param orgRefNo. 
     * @return void.
     */        
     public void setOrgRefNo(String orgRefNo)
     {
         this.orgRefNo       = orgRefNo;
     }

     /**
     * Return a orgRefNo Value
     * @param void. 
     * @return String.
     */  
     public String getOrgRefNo()
     {
         return orgRefNo;
     }

     /**
     * Function set a orgGrNo value
     * @param orgGrNo. 
     * @return void.
     */        
     public void setOrgGrNo(String orgGrNo)
     {
         this.orgGrNo       = orgGrNo;
     }

     /**
     * Return a orgGrNo Value
     * @param void. 
     * @return String.
     */  
     public String getOrgGrNo()
     {
         return orgGrNo;
     }



    public String getRhdlMode() {
        return rhdlMode;
    }
    public void setRhdlMode(String rhdlMode) {
        this.rhdlMode = rhdlMode;
    }
    public String getBlNo() {
        return blNo;
    }
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    public String getNxRefNo() {
        return nxRefNo;
    }
    public void setNxRefNo(String nxRefNo) {
        this.nxRefNo = nxRefNo;
    }
    public String getNxVslCallId() {
        return nxVslCallId;
    }
    public void setNxVslCallId(String nxVslCallId) {
        this.nxVslCallId = nxVslCallId;
    }
    public String getOpeClassCd() {
        return opeClassCd;
    }
    public void setOpeClassCd(String opeClassCd) {
        this.opeClassCd = opeClassCd;
    }
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
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
     * @return Returns the col3.
     */
    public String getCol3() {
        return col3;
    }
    /**
     * @param col3 The col3 to set.
     */
    public void setCol3(String col3) {
        this.col3 = col3;
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
     * @return Returns the arrvDtFm.
     */
    public String getArrvDtFm() {
        return arrvDtFm;
    }
    /**
     * @param arrvDtFm The arrvDtFm to set.
     */
    public void setArrvDtFm(String arrvDtFm) {
        this.arrvDtFm = arrvDtFm;
    }
    /**
     * @return Returns the arrvDtTo.
     */
    public String getArrvDtTo() {
        return arrvDtTo;
    }
    /**
     * @param arrvDtTo The arrvDtTo to set.
     */
    public void setArrvDtTo(String arrvDtTo) {
        this.arrvDtTo = arrvDtTo;
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
     * @return Returns the authoType.
     */
    public String getAuthoType() {
        return authoType;
    }
    /**
     * @param authoType The authoType to set.
     */
    public void setAuthoType(String authoType) {
        this.authoType = authoType;
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
     * @return Returns the hhtFnlChk.
     */
    public String getHhtFnlMode() {
        return hhtFnlMode;
    }
    /**
     * @param hhtFnlChk The hhtFnlChk to set.
     */
    public void setHhtFnlMode(String hhtFnlMode) {
        this.hhtFnlMode = hhtFnlMode;
    }
    /**
     * @return Returns the screanNm.
     */
    public String getScreanNm() {
        return screanNm;
    }
    /**
     * @param screanNm The screanNm to set.
     */
    public void setScreanNm(String screanNm) {
        this.screanNm = screanNm;
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
    public String getEstArrvDateFrm() {
        return estArrvDateFrm;
    }
    public void setEstArrvDateFrm(String estArrvDateFrm) {
        this.estArrvDateFrm = estArrvDateFrm;
    }
    public String getEstArrvDateTo() {
        return estArrvDateTo;
    }
    public void setEstArrvDateTo(String estArrvDateTo) {
        this.estArrvDateTo = estArrvDateTo;
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
	public String getShiftDt() {
		return shiftDt;
	}
	public void setShiftDt(String shiftDt) {
		this.shiftDt = shiftDt;
	}
	public String getShiftId() {
		return shiftId;
	}
	public void setShiftId(String shiftId) {
		this.shiftId = shiftId;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getRhdlGroupNo() {
		return rhdlGroupNo;
	}
	public void setRhdlGroupNo(String rhdlGroupNo) {
		this.rhdlGroupNo = rhdlGroupNo;
	}
	public String getMasterBlNo() {
		return masterBlNo;
	}
	public void setMasterBlNo(String masterBlNo) {
		this.masterBlNo = masterBlNo;
	}
	public String getBookingNo() {
		return bookingNo;
	}
	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}
	public String getNextShipgNoteNo() {
		return nextShipgNoteNo;
	}
	public void setNextShipgNoteNo(String nextShipgNoteNo) {
		this.nextShipgNoteNo = nextShipgNoteNo;
	}
	public String getYardInDateFrom() {
		return yardInDateFrom;
	}
	public void setYardInDateFrom(String yardInDateFrom) {
		this.yardInDateFrom = yardInDateFrom;
	}
	public String getYardInDateTo() {
		return yardInDateTo;
	}
	public void setYardInDateTo(String yardInDateTo) {
		this.yardInDateTo = yardInDateTo;
	}
	
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getCmdtGrCd() {
		return cmdtGrCd;
	}
	public void setCmdtGrCd(String cmdtGrCd) {
		this.cmdtGrCd = cmdtGrCd;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getPkgNo() {
		return pkgNo;
	}
	public void setPkgNo(String pkgNo) {
		this.pkgNo = pkgNo;
	}
	public String getShipgAgentCd() {
		return shipgAgentCd;
	}
	public void setShipgAgentCd(String shipgAgentCd) {
		this.shipgAgentCd = shipgAgentCd;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	
}
