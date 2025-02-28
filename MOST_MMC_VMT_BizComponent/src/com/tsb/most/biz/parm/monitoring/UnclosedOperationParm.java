package com.tsb.most.biz.parm.monitoring;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
* UnclosedOperationParm.java
*
* Created on   : 2009-04-20
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2008-04-20   Kisik Jeong    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/



public class UnclosedOperationParm extends BaseBizParm{
    private String vslCallId;
    private String searchType;

    private String currentPage;
    private String numbPerPage;
    private String pageType;
    private String fromRow;
    private String toRow;
    private String fromATB;
    private String toATB;

    public String getFromRow() {
        return fromRow;
    }
    public void setFromRow(String fromRow) {
        this.fromRow = fromRow;
    }
    public String getToRow() {
        return toRow;
    }
    public void setToRow(String toRow) {
        this.toRow = toRow;
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
    public String getCurrentPage() {
        return currentPage;
    }
    public void setCurrentPage(String currentPage) {
        this.currentPage = currentPage;
    }
    public String getNumbPerPage() {
        return numbPerPage;
    }
    public void setNumbPerPage(String numbPerPage) {
        this.numbPerPage = numbPerPage;
    }
    public String getPageType() {
        return pageType;
    }
    public void setPageType(String pageType) {
        this.pageType = pageType;
    }
    public String getFromATB() {
        return fromATB;
    }
    public void setFromATB(String fromATB) {
        this.fromATB = fromATB;
    }
    public String getToATB() {
        return toATB;
    }
    public void setToATB(String toATB) {
        this.toATB = toATB;
    }
    
}
