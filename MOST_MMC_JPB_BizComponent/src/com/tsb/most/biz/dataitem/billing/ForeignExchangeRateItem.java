/**
* CurrentcyItem.java
*
* Created on   : Apr 21, 2009
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Apr 21, 2009   Phan Minh Tuan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author pmtuan
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class ForeignExchangeRateItem extends DataItem {
    private String currency ;
    private String rate ;
    private String applyDate;
    private String expireDate ;
    private String applyNewDate;
    private String expireNewDate ;
    private String indexDt ;
    private String descr;
    private String divCd;
    private String strVersion;
    private String workingStatus;
    private String no ; 
    private String codeFinancial;
    private String codeDescription ;
    private String exprYmd ;
    ArrayList<ForeignExchangeRateItem> items;
    
    public String getApplyDate() {
        return applyDate;
    }
    public void setApplyDate(String applyDate) {
        this.applyDate = applyDate;
    }
    public String getCurrency() {
        return currency;
    }
    public void setCurrency(String currency) {
        this.currency = currency;
    }
    public String getExpireDate() {
        return expireDate;
    }
    public void setExpireDate(String expireDate) {
        this.expireDate = expireDate;
    }
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    public String getRate() {
        return rate;
    }
    public void setRate(String rate) {
        this.rate = rate;
    }
    public String getStrVersion() {
        return strVersion;
    }
    public void setStrVersion(String strVersion) {
        this.strVersion = strVersion;
    }
    public String getDescr() {
        return descr;
    }
    public void setDescr(String descr) {
        this.descr = descr;
    }
    public String getDivCd() {
        return divCd;
    }
    public void setDivCd(String divCd) {
        this.divCd = divCd;
    }
    public String getIndexDt() {
        return indexDt;
    }
    public void setIndexDt(String indexDt) {
        this.indexDt = indexDt;
    }
    public String getApplyNewDate() {
        return applyNewDate;
    }
    public void setApplyNewDate(String applyNewDate) {
        this.applyNewDate = applyNewDate;
    }    
    public String getExpireNewDate() {
        return expireNewDate;
    }
    public void setExpireNewDate(String expireNewDate) {
        this.expireNewDate = expireNewDate;
    }
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public ArrayList<ForeignExchangeRateItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<ForeignExchangeRateItem> items) {
		this.items = items;
	}
	public String getCodeFinancial() {
        return codeFinancial;
    }
    public void setCodeFinancial(String codeFinancial) {
        this.codeFinancial = codeFinancial;
    }
    public String getCodeDescription() {
        return codeDescription;
    }
    public void setCodeDescription(String codeDescription) {
        this.codeDescription = codeDescription;
    }
    public String getExprYmd() {
        return exprYmd;
    }
    public void setExprYmd(String exprYmd) {
        this.exprYmd = exprYmd;
    }
    
}
