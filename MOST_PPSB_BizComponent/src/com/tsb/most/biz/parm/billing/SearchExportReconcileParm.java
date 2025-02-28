/**
* ImportExportReconcileParm.java
*
* Created on   : Jan 10, 2008
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Jan 10, 2008   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author Thuy An
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchExportReconcileParm extends BaseBizParm {
    private String vslCallId;
    private String searchType;
    private String fromAtb;
    private String toAtb;
    private String status;
    private String pageId;
    
    public String getPageId() {
        return pageId;
    }
    public void setPageId(String pageId) {
        this.pageId = pageId;
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
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    /**
     * @return Returns the fromAtb.
     */
    public String getFromAtb() {
        return fromAtb;
    }
    /**
     * @param fromAtb The fromAtb to set.
     */
    public void setFromAtb(String fromAtb) {
        this.fromAtb = fromAtb;
    }
    /**
     * @return Returns the toAtb.
     */
    public String getToAtb() {
        return toAtb;
    }
    /**
     * @param toAtb The toAtb to set.
     */
    public void setToAtb(String toAtb) {
        this.toAtb = toAtb;
    }
    /**
     * @return Returns the status.
     */
    public String getStatus() {
        return status;
    }
    /**
     * @param status The status to set.
     */
    public void setStatus(String status) {
        this.status = status;
    }
}
