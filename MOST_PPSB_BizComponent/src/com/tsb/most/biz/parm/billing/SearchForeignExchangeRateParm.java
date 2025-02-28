/**
* CurrencyParm.java
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
package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author pmtuan
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchForeignExchangeRateParm extends BaseBizParm {
    String currency ;
    String applyCode; /*Using for searching overlap */
    String applyDate;
    String expireDate ;
    String applyFDate;
    String expireFDate ;
    String applyTDate;
    String expireTDate ; 
    public String getCol1() {
        return col1;
    }
    public void setCol1(String col1) {
        this.col1 = col1;
    }
    String searchType ;
    String col1;
    public String getApplyDate() {
        return applyDate;
    }
    public void setApplyDate(String applyDate) {
        this.applyDate = applyDate;
    }
    public String getApplyFDate() {
        return applyFDate;
    }
    public void setApplyFDate(String applyFDate) {
        this.applyFDate = applyFDate;
    }
    public String getApplyTDate() {
        return applyTDate;
    }
    public void setApplyTDate(String applyTDate) {
        this.applyTDate = applyTDate;
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
    public String getExpireFDate() {
        return expireFDate;
    }
    public void setExpireFDate(String expireFDate) {
        this.expireFDate = expireFDate;
    }
    public String getExpireTDate() {
        return expireTDate;
    }
    public void setExpireTDate(String expireTDate) {
        this.expireTDate = expireTDate;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getApplyCode() {
        return applyCode;
    }
    public void setApplyCode(String applyCode) {
        this.applyCode = applyCode;
    }
}
