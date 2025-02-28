/**
* FreeStoragePeriodSearchParm.java
*
* Created on   : 2007-11-27
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-11-27   Hugh Lim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author Hugh
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchFreeStorageDaysParm extends BaseBizParm {
    private String test;
    private String searchType;
    private String ptnrCd;
    private String aplyYmd;
    private String exprYmd;
    
    public String getAplyYmd() {
        return aplyYmd;
    }
    public void setAplyYmd(String aplyYmd) {
        this.aplyYmd = aplyYmd;
    }
    public String getExprYmd() {
        return exprYmd;
    }
    public void setExprYmd(String exprYmd) {
        this.exprYmd = exprYmd;
    }
    public String getPtnrCd() {
        return ptnrCd;
    }
    public void setPtnrCd(String ptnrCd) {
        this.ptnrCd = ptnrCd;
    }
    public String getTest() {
        return test;
    }
    public void setTest(String test) {
        this.test = test;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
}
