/**
* WhRentalParm.java
*
* Created on   : 2008-01-18
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-07-16   Mr Jackey Kim 1.0  First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchWhRentalParm extends BaseBizParm {
    
    private String conttNo;
    private String refNo;
    private String rentTpCd;   
    private String vldYn;   
    private String expiredYn;   
    private String jpvc;   
    private String locId;   
    private String tenant;   
    private String fmStYmd;
    private String fmEndYmd;
    private String toStYmd;
    private String toEndYmd;
    private String searchType; //Search Type
    private String alertYn;
    
    

    /**
     * @return Returns the alertYn.
     */
    public String getAlertYn() {
        return alertYn;
    }
    /**
     * @param alertYn The alertYn to set.
     */
    public void setAlertYn(String alertYn) {
        this.alertYn = alertYn;
    }
    public String getConttNo() {
        return conttNo;
    }
    public void setConttNo(String conttNo) {
        this.conttNo = conttNo;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getVldYn() {
        return vldYn;
    }
    public void setVldYn(String vldYn) {
        this.vldYn = vldYn;
    }
    public String getExpiredYn() {
        return expiredYn;
    }
    public void setExpiredYn(String expiredYn) {
        this.expiredYn = expiredYn;
    }
    public String getFmEndYmd() {
        return fmEndYmd;
    }
    public void setFmEndYmd(String fmEndYmd) {
        this.fmEndYmd = fmEndYmd;
    }
    public String getFmStYmd() {
        return fmStYmd;
    }
    public void setFmStYmd(String fmStYmd) {
        this.fmStYmd = fmStYmd;
    }
    public String getJpvc() {
        return jpvc;
    }
    public void setJpvc(String jpvc) {
        this.jpvc = jpvc;
    }
    public String getLocId() {
        return locId;
    }
    public void setLocId(String locId) {
        this.locId = locId;
    }
    public String getRentTpCd() {
        return rentTpCd;
    }
    public void setRentTpCd(String rentTpCd) {
        this.rentTpCd = rentTpCd;
    }
    public String getTenant() {
        return tenant;
    }
    public void setTenant(String tenant) {
        this.tenant = tenant;
    }
    public String getToEndYmd() {
        return toEndYmd;
    }
    public void setToEndYmd(String toEndYmd) {
        this.toEndYmd = toEndYmd;
    }
    public String getToStYmd() {
        return toStYmd;
    }
    public void setToStYmd(String toStYmd) {
        this.toStYmd = toStYmd;
    }
    public String getRefNo() {
        return refNo;
    }
    public void setRefNo(String refNo) {
        this.refNo = refNo;
    }
}
