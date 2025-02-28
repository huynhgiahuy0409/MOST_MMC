/**
* StandardTariffRateParm.java
*
* Created on   : Dec 11, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Dec 11, 2007   An Doan 1.0    First release.
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
public class SearchStandardTariffRateParm extends BaseBizParm {
    private String aplyYmd;
    private String exprYmd;
    private String searchTp;
    private String trfTp;
    private String trfCd;
    private String subTrfCd;
    
    public String getSearchTp() {
        return searchTp;
    }
    public void setSearchTp(String searchTp) {
        this.searchTp = searchTp;
    }
    public String getAplyYmd() {
        return aplyYmd;
    }
    public void setAplyYmd(String applyYmd) {
        this.aplyYmd = applyYmd;
    }
    public String getTrfTp() {
        return trfTp;
    }
    public void setTrfTp(String trfTyp) {
        this.trfTp = trfTyp;
    }
    public String getExprYmd() {
        return exprYmd;
    }
    public void setExprYmd(String exprYmd) {
        this.exprYmd = exprYmd;
    }
	public String getTrfCd() {
		return trfCd;
	}
	public void setTrfCd(String trfCd) {
		this.trfCd = trfCd;
	}
	public String getSubTrfCd() {
		return subTrfCd;
	}
	public void setSubTrfCd(String subTrfCd) {
		this.subTrfCd = subTrfCd;
	}
}
