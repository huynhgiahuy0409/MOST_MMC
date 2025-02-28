/**
* WHReconciliationParm.java
*
* Created on   : 2009-04-16
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2009-04-16   Mr Harry Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
* use WHReconciliationParm Class as parameters to search  
*
* @author Mr Harry Kim
* @version 1.0
*
* @see 
*/
public class SearchWHReconciliationPivotParm extends BaseBizParm{
    
    private String vslCallId;
    private String cgNo;
    private String whTpCd;
    private String whLocId;
    private String blNo;
    private String grNo;
    private String snNo;
    private String category;
    private String estArrvDtFrom;
    private String estArrvDtTo;
    private String fwAgent;
    private String divCd;
    private String searchType;
    private String shpr;
    private String cnsne;
    private String cmdtCd;
    private String cmdtGrpCd;
    private String pkgNo;
    private String fromDt;
    private String toDt;
    private String aggregate;
    
    /**
     * @return Returns the blNo.
     */
    public String getBlNo() {
        return blNo;
    }
    /**
     * @param blNo The blNo to set.
     */
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    /**
     * @return Returns the category.
     */
    public String getCategory() {
        return category;
    }
    /**
     * @param category The category to set.
     */
    public void setCategory(String category) {
        this.category = category;
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
     * @return Returns the divCd.
     */
    public String getDivCd() {
        return divCd;
    }
    /**
     * @param divCd The divCd to set.
     */
    public void setDivCd(String divCd) {
        this.divCd = divCd;
    }
    /**
     * @return Returns the estArrvDtFrom.
     */
    public String getEstArrvDtFrom() {
        return estArrvDtFrom;
    }
    /**
     * @param estArrvDtFrom The estArrvDtFrom to set.
     */
    public void setEstArrvDtFrom(String estArrvDtFrom) {
        this.estArrvDtFrom = estArrvDtFrom;
    }
    /**
     * @return Returns the estArrvDtTo.
     */
    public String getEstArrvDtTo() {
        return estArrvDtTo;
    }
    /**
     * @param estArrvDtTo The estArrvDtTo to set.
     */
    public void setEstArrvDtTo(String estArrvDtTo) {
        this.estArrvDtTo = estArrvDtTo;
    }
    /**
     * @return Returns the fwAgent.
     */
    public String getFwAgent() {
        return fwAgent;
    }
    /**
     * @param fwAgent The fwAgent to set.
     */
    public void setFwAgent(String fwAgent) {
        this.fwAgent = fwAgent;
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
     * @return Returns the snNo.
     */
    public String getSnNo() {
        return snNo;
    }
    /**
     * @param snNo The snNo to set.
     */
    public void setSnNo(String snNo) {
        this.snNo = snNo;
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
     * @return Returns the whLocId.
     */
    public String getWhLocId() {
        return whLocId;
    }
    /**
     * @param whLocId The whLocId to set.
     */
    public void setWhLocId(String whLocId) {
        this.whLocId = whLocId;
    }
    /**
     * @return Returns the whTpCd.
     */
    public String getWhTpCd() {
        return whTpCd;
    }
    /**
     * @param whTpCd The whTpCd to set.
     */
    public void setWhTpCd(String whTpCd) {
        this.whTpCd = whTpCd;
    }
    public String getShpr() {
        return shpr;
    }
    public void setShpr(String shpr) {
        this.shpr = shpr;
    }
    public String getCnsne() {
        return cnsne;
    }
    public void setCnsne(String cnsne) {
        this.cnsne = cnsne;
    }
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getCmdtGrpCd() {
		return cmdtGrpCd;
	}
	public void setCmdtGrpCd(String cmdtGrpCd) {
		this.cmdtGrpCd = cmdtGrpCd;
	}
	public String getPkgNo() {
		return pkgNo;
	}
	public void setPkgNo(String pkgNo) {
		this.pkgNo = pkgNo;
	}
	public String getFromDt() {
		return fromDt;
	}
	public void setFromDt(String fromDt) {
		this.fromDt = fromDt;
	}
	public String getToDt() {
		return toDt;
	}
	public void setToDt(String toDt) {
		this.toDt = toDt;
	}
	public String getAggregate() {
		return aggregate;
	}
	public void setAggregate(String aggregate) {
		this.aggregate = aggregate;
	}
	
}
