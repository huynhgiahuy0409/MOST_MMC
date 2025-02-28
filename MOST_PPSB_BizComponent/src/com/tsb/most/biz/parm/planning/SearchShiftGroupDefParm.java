/**
* ShiftGroupDefParm.java
*
* Created on   : 2007-09-10
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-09-10  Mr Tonny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
* use ShiftGroupDefParm Class as parameters to search  
*
* @author Mr Tonny Kim
* @version 1.0
*
* @see 
*/
public class SearchShiftGroupDefParm extends BaseBizParm {
    
    private String shftId;
    private String divCd;
    private String useYn;
    private String searchType;
    private String shftMethCd;
    
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
     * @return Returns the shftId.
     */
    public String getShftId() {
        return shftId;
    }
    /**
     * @param shftId The shftId to set.
     */
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
    /**
     * @return Returns the shftMethCd.
     */
    public String getShftMethCd() {
        return shftMethCd;
    }
    /**
     * @param shftMethCd The shftMethCd to set.
     */
    public void setShftMethCd(String shftMethCd) {
        this.shftMethCd = shftMethCd;
    }
    /**
     * @return Returns the useYn.
     */
    public String getUseYn() {
        return useYn;
    }
    /**
     * @param useYn The useYn to set.
     */
    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }
}
