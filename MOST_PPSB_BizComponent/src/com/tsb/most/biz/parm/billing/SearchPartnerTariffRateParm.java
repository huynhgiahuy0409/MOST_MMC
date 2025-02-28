/**
* PartnerTariffRateParm.java
*
* Created on   : Dec 24, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Dec 24, 2007   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author Thanh Tung
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchPartnerTariffRateParm extends BaseBizParm {
    
    private String startDtm;
    private String endDtm;
    private String trfTp;
    private String scd;
    private String scdNm;
    private String cgTp;
    private String engPtyNm;
    private String ptyDivCd;
    private String ptyCd;
    private String userId;
    private String berthCd;
    private String berthNm;
    private String expireDtChk;
    
    public String getBerthCd() {
		return berthCd;
	}
	public void setBerthCd(String berthCd) {
		this.berthCd = berthCd;
	}
	public String getBerthNm() {
		return berthNm;
	}
	public void setBerthNm(String berthNm) {
		this.berthNm = berthNm;
	}
	/**
     * @return Returns the userId.
     */
    
    public String getUserId() {
        return userId;
    }
    /**
     * @param userId The userId to set.
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getEngPtyNm() {
        return engPtyNm;
    }
    public void setEngPtyNm(String engPtyNm) {
        this.engPtyNm = engPtyNm;
    }
    public String getPtyCd() {
        return ptyCd;
    }
    public void setPtyCd(String ptyCd) {
        this.ptyCd = ptyCd;
    }
    public String getPtyDivCd() {
        return ptyDivCd;
    }
    public void setPtyDivCd(String ptyDivCd) {
        this.ptyDivCd = ptyDivCd;
    }
    public String getSearchModule() {
        return searchModule;
    }
    public void setSearchModule(String searchModule) {
        this.searchModule = searchModule;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    //2008.01.30	partner type search(Agent List) is added.
    private String searchType;
    
    //2008.10.20 search module : MPTS: LCD='MT' else LCD=CM
    private String searchModule;
    
    
    public String getCgTp() {
        return cgTp;
    }
    public void setCgTp(String cgTp) {
        this.cgTp = cgTp;
    }
    public String getN1() {
        return n1;
    }
    public void setN1(String n1) {
        this.n1 = n1;
    }
    public String getN2() {
        return n2;
    }
    public void setN2(String n2) {
        this.n2 = n2;
    }
    private String n1;
    private String n2;
    public String getScd() {
        return scd;
    }
    public void setScd(String scd) {
        this.scd = scd;
    }
    public String getScdNm() {
        return scdNm;
    }
    public void setScdNm(String scdNm) {
        this.scdNm = scdNm;
    }
    private String pkgTrfNo;
    private String ptnrCd;
    private String trfCd;
    //plz do not delete
    private String ptnrTp;
    private String ptnrCdList;
    private String ptnrSrchCond;
    private String ptnrName;
    private String conSig;
    private String updateTime;
    public String getDivCd() {
        return divCd;
    }
    public void setDivCd(String divCd) {
        this.divCd = divCd;
    }
    public String getDivNm() {
        return divNm;
    }
    public void setDivNm(String divNm) {
        this.divNm = divNm;
    }
    public String getLcd() {
        return lcd;
    }
    public void setLcd(String lcd) {
        this.lcd = lcd;
    }
    public String getTyCd() {
        return tyCd;
    }
    public void setTyCd(String tyCd) {
        this.tyCd = tyCd;
    }
    private String divNm;
    private String divCd;
    private String tyCd;
    private String lcd;
    private String subTrfCd;
    private String searchTp;
    
    public String getUpdateTime() {
        return updateTime;
    }
    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }
    public String getPtnrName() {
        return ptnrName;
    }
    public void setPtnrName(String ptnrName) {
        this.ptnrName = ptnrName;
    }
    public String getTrfCd() {
        return trfCd;
    }
    public void setTrfCd(String trfCd) {
        this.trfCd = trfCd;
    }
    public String getPtnrCd() {
        return ptnrCd;
    }
    public void setPtnrCd(String ptnrCd) {
        this.ptnrCd = ptnrCd;
    }
    public String getPkgTrfNo() {
        return pkgTrfNo;
    }
    public void setPkgTrfNo(String pkgTrfNo) {
        this.pkgTrfNo = pkgTrfNo;
    }
    public String getSearchTp() {
        return searchTp;
    }
    public String getEndDtm() {
        return endDtm;
    }
    public void setEndDtm(String endDtm) {
        this.endDtm = endDtm;
    }
   
    public void setSearchTp(String searchTp) {
        this.searchTp = searchTp;
    }
    public String getStartDtm() {
        return startDtm;
    }
    public void setStartDtm(String startDtm) {
        this.startDtm = startDtm;
    }
    public String getSubTrfCd() {
        return subTrfCd;
    }
    public void setSubTrfCd(String subTrfCd) {
        this.subTrfCd = subTrfCd;
    }
    public String getTrfTp() {
        return trfTp;
    }
    public void setTrfTp(String trfTp) {
        this.trfTp = trfTp;
    }
    //for searching standard rate
   
    public String getPtnrCdList() {
        return ptnrCdList;
    }
    public void setPtnrCdList(String ptnrCdList) {
        this.ptnrCdList = ptnrCdList;
    }
    public String getPtnrSrchCond() {
        return ptnrSrchCond;
    }
    public void setPtnrSrchCond(String ptnrSrchCond) {
        this.ptnrSrchCond = ptnrSrchCond;
    }
    public String getPtnrTp() {
        return ptnrTp;
    }
    public void setPtnrTp(String ptnrTp) {
        this.ptnrTp = ptnrTp;
    }
    public String getConSig() {
        return conSig;
    }
    public void setConSig(String conSig) {
        this.conSig = conSig;
    }
	public String getExpireDtChk() {
		return expireDtChk;
	}
	public void setExpireDtChk(String expireDtChk) {
		this.expireDtChk = expireDtChk;
	}
}
