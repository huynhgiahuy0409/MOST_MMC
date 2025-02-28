/**
* ShippingNoteParm.java
*
* Created on   : Aug 1, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Aug 1, 2007   Mr Dong-Yeob Lee 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.document;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author dylee
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchGeneralCargoLoadingListParm extends BaseBizParm {
    private String vslCd;
    private String callYear;
    private String callSeq;
	private String vslCallId;    
    private String delvTpCd;   
    private String searchFlag;    
    private String searchType;
    private String shipgNoteNo;
    private String mfDocId;
    private String fwrd;   
    private String divCd;
    private String tsptTpCd;
    private String catgCd;
    private String authority;
    private String ptnrCd;
    private String cbrNo;
    private String statCd;
    
    //for nonJPVC
    private String arrvDtFm;
    private String arrvDtTo;
    private String snTp;
    private String opType;//operation screen type
    
    private String authUsrId;
    private String NewShipgNoteNo;
    
    //Added by Chris 2015-09-24 for 49799
    private String lorryNo;
    private String searchTypeCboSN;
    
    private String rptNo;
    private String userId;
    
    
    public String getVslCd() {
		return vslCd;
	}
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
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getRptNo() {
		return rptNo;
	}
	public void setRptNo(String rptNo) {
		this.rptNo = rptNo;
	}
	//Added by Chris 2015-09-24 for 49799
    public String getLorryNo() {
        return lorryNo;
    }
    public void setLorryNo(String lorryNo) {
        this.lorryNo = lorryNo;
    }
    public String getSearchTypeCboSN() {
        return searchTypeCboSN;
    }
    public void setSearchTypeCboSN(String searchTypeCboSN) {
        this.searchTypeCboSN = searchTypeCboSN;
    }
 
    /**
     * @return Returns the newShipgNoteNo.
     */
    public String getNewShipgNoteNo() {
        return NewShipgNoteNo;
    }
    /**
     * @param newShipgNoteNo The newShipgNoteNo to set.
     */
    public void setNewShipgNoteNo(String newShipgNoteNo) {
        NewShipgNoteNo = newShipgNoteNo;
    }
    /**
     * @return Returns the authUsrId.
     */
    public String getAuthUsrId() {
        return authUsrId;
    }
    /**
     * @param authUsrId The authUsrId to set.
     */
    public void setAuthUsrId(String authUsrId) {
        this.authUsrId = authUsrId;
    }
    public String getSnTp() {
        return snTp;
    }
    public void setSnTp(String snTp) {
        this.snTp = snTp;
    }
    public String getPtnrCd() {
        return ptnrCd;
    }
    public void setPtnrCd(String ptnrCd) {
        this.ptnrCd = ptnrCd;
    }
    public String getAuthority() {
        return authority;
    }
    public void setAuthority(String authority) {
        this.authority = authority;
    }
    public String getCatgCd() {
        return catgCd;
    }
    public void setCatgCd(String catgCd) {
        this.catgCd = catgCd;
    }
    public String getFwrd() {
        return fwrd;
    }
    public void setFwrd(String fwrd) {
        this.fwrd = fwrd;
    }  
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }
    public String getDelvTpCd() {
        return delvTpCd;
    }
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }
    public String getSearchFlag() {
        return searchFlag;
    }
    public void setSearchFlag(String searchFlag) {
        this.searchFlag = searchFlag;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
   
    
    
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getDivCd() {
        return divCd;
    }
    public void setDivCd(String divCd) {
        this.divCd = divCd;
    }
    public String getTsptTpCd() {
        return tsptTpCd;
    }
    public void setTsptTpCd(String tsptTpCd) {
        this.tsptTpCd = tsptTpCd;
    }
    public String getCbrNo() {
        return cbrNo;
    }
    public void setCbrNo(String cbrNo) {
        this.cbrNo = cbrNo;
    }
    public String getArrvDtFm() {
        return arrvDtFm;
    }
    public void setArrvDtFm(String arrvDtFm) {
        this.arrvDtFm = arrvDtFm;
    }
    public String getArrvDtTo() {
        return arrvDtTo;
    }
    public void setArrvDtTo(String arrvDtTo) {
        this.arrvDtTo = arrvDtTo;
    }
    public String getStatCd() {
        return statCd;
    }
    public void setStatCd(String statCd) {
        this.statCd = statCd;
    }
    /**
     * @return Returns the opType.
     */
    public String getOpType() {
        return opType;
    }
    /**
     * @param opType The opType to set.
     */
    public void setOpType(String opType) {
        this.opType = opType;
    }
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
}
