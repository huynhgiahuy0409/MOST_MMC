/**
* InvoiceUnitParm.java
*
* Created on   : Nov 30, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Nov 30, 2007   An Doan 1.0    First release.
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
public class SearchInvoiceUnitParm extends BaseBizParm{
    private String unitCd;
    private String unitTpCd;
    private String searchTp;

    public String getSearchTp() {
        return searchTp;
    }
    public void setSearchTp(String searchTp) {
        this.searchTp = searchTp;
    }
    public String getUnitCd() {
        return unitCd;
    }
    public void setUnitCd(String unitCd) {
        this.unitCd = unitCd;
    }
    public String getUnitTpCd() {
        return unitTpCd;
    }
    public void setUnitTpCd(String unitTp) {
        this.unitTpCd = unitTp;
    }
}
