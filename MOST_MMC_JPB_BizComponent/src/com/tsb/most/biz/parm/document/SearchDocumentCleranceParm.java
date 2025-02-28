/**
* CustomerCleranceParm.java
*
* Created on   : Feb 28, 2009
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Feb 28, 2009   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.document;
import com.tsb.most.framework.bizparm.BaseBizParm;
/**
 * @author lamthanhtung
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchDocumentCleranceParm extends BaseBizParm {
    private String searchType;
    private String vslCallId;
    private String saId;
    private String etaFrom;
    private String etaTo;
    private String vslTp;
    private String vslTpNm;
    private String cgTpCd;
    private String tugBoat;   
    private String rptTp;
    private String scn;
   
    public String getTugBoat() {
        return tugBoat;
    }
    public void setTugBoat(String tugBoat) {
        this.tugBoat = tugBoat;
    }
    public String getCgTpCd() {
        return cgTpCd;
    }
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    public String getVslTpNm() {
        return vslTpNm;
    }
    public void setVslTpNm(String vslTpNm) {
        this.vslTpNm = vslTpNm;
    }
    public String getVslTp() {
        return vslTp;
    }
    public void setVslTp(String vslTp) {
        this.vslTp = vslTp;
    }
    /**
     * @return Returns the etaFrom.
     */
    public String getEtaFrom() {
        return etaFrom;
    }
    /**
     * @param etaFrom The etaFrom to set.
     */
    public void setEtaFrom(String etaFrom) {
        this.etaFrom = etaFrom;
    }
    /**
     * @return Returns the etaTo.
     */
    public String getEtaTo() {
        return etaTo;
    }
    /**
     * @param etaTo The etaTo to set.
     */
    public void setEtaTo(String etaTo) {
        this.etaTo = etaTo;
    }
    /**
     * @return Returns the ptnrCd.
     */
    public String getSaId() {
        return saId;
    }
    /**
     * @param ptnrCd The ptnrCd to set.
     */
    public void setSaId(String saId) {
        this.saId = saId;
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
	public String getRptTp() {
		return rptTp;
	}
	public void setRptTp(String rptTp) {
		this.rptTp = rptTp;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
