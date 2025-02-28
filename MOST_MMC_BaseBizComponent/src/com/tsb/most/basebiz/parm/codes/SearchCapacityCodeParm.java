/**
* CapacityCodeParm.java
*
* Created on   : May 8, 2008
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* May 8, 2008   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.parm.codes;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author Thuy An
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchCapacityCodeParm extends BaseBizParm {
    private String eqTpCd;
    private String capaCd;
    private String searchTp;
    
    public String getCapaCd() {
        return capaCd;
    }
    public void setCapaCd(String capacCd) {
        this.capaCd = capacCd;
    }
    public String getEqTpCd() {
        return eqTpCd;
    }
    public void setEqTpCd(String eqTpCd) {
        this.eqTpCd = eqTpCd;
    }
    public String getSearchTp() {
        return searchTp;
    }
    public void setSearchTp(String searchTp) {
        this.searchTp = searchTp;
    }
}
