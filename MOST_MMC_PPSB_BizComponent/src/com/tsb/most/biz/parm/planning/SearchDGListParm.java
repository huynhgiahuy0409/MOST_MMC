/**
* ConfirmationSlipParm.java
*
* Created on   : 2024-05-30
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* //////////////////////////////
* CHANGE REVISION
* //////////////////////////////
* DATE           AUTHOR      	   REVISION    	
* 2024-05-30   	  Tim    			First release.
* //////////////////////////////-
* CLASS DESCRIPTION
* //////////////////////////////-
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchDGListParm extends BaseBizParm {
    
    //private String aprvDt; 		// Declaration Date
    private String dclrDtFrom; 	// Declaration Date From
    private String dclrDtTo; 	// Declaration Date To
    private String vslCallId;  	// JPVC
    private String dgDiv;		// DG Category
    private String statCd; 		// Status 
    private String bl;  		// BL
    private String sn;  		// SN
    private String dgDivSub;	// DG Category Sub
    private String fwrd;  		// F/A
    private String searchType;
    private String authority;
    private String ptnrCd;
    private String catgCd;
    private String pgmId;
    private String unno;
    private String imdg;
    private String cgNo;
    private String vslCd;
    private String callSeq;
    private String callYear;
    private String seq;
    private String substance;
    private String exportTp;
    
    public String getSubstance() {
		return substance;
	}
	public void setSubstance(String substance) {
		this.substance = substance;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getUnno() {
		return unno;
	}
	public void setUnno(String unno) {
		this.unno = unno;
	}
	public String getImdg() {
		return imdg;
	}
	public void setImdg(String imdg) {
		this.imdg = imdg;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
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
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getPgmId() {
		return pgmId;
	}
	public void setPgmId(String pgmId) {
		this.pgmId = pgmId;
	}
	public String getAuthority() {
        return authority;
    }
    public void setAuthority(String authority) {
        this.authority = authority;
    }
    public String getPtnrCd() {
        return ptnrCd;
    }
    public void setPtnrCd(String ptnrCd) {
        this.ptnrCd = ptnrCd;
    }
    /**
     * @return Returns the bl.
     */
    public String getBl() {
        return bl;
    }
    /**
     * @param bl The bl to set.
     */
    public void setBl(String bl) {
        this.bl = bl;
    }
    /**
     * @return Returns the dclrDtFrom.
     */
    public String getDclrDtFrom() {
        return dclrDtFrom;
    }
    /**
     * @param dclrDtFrom The dclrDtFrom to set.
     */
    public void setDclrDtFrom(String dclrDtFrom) {
        this.dclrDtFrom = dclrDtFrom;
    }
    /**
     * @return Returns the dclrDtTo.
     */
    public String getDclrDtTo() {
        return dclrDtTo;
    }
    /**
     * @param dclrDtTo The dclrDtTo to set.
     */
    public void setDclrDtTo(String dclrDtTo) {
        this.dclrDtTo = dclrDtTo;
    }
    /**
     * @return Returns the dgDiv.
     */
    public String getDgDiv() {
        return dgDiv;
    }
    /**
     * @param dgDiv The dgDiv to set.
     */
    public void setDgDiv(String dgDiv) {
        this.dgDiv = dgDiv;
    }
    /**
     * @return Returns the dgDivSub.
     */
    public String getDgDivSub() {
        return dgDivSub;
    }
    /**
     * @param dgDivSub The dgDivSub to set.
     */
    public void setDgDivSub(String dgDivSub) {
        this.dgDivSub = dgDivSub;
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
     * @return Returns the sn.
     */
    public String getSn() {
        return sn;
    }
    /**
     * @param sn The sn to set.
     */
    public void setSn(String sn) {
        this.sn = sn;
    }
    /**
     * @return Returns the statCd.
     */
    public String getStatCd() {
        return statCd;
    }
    /**
     * @param statCd The statCd to set.
     */
    public void setStatCd(String statCd) {
        this.statCd = statCd;
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
     * @return Returns the fwrd.
     */
    public String getFwrd() {
        return fwrd;
    }
    /**
     * @param fwrd The fwrd to set.
     */
    public void setFwrd(String fwrd) {
        this.fwrd = fwrd;
    }
	public String getExportTp() {
		return exportTp;
	}
	public void setExportTp(String exportTp) {
		this.exportTp = exportTp;
	}
}
