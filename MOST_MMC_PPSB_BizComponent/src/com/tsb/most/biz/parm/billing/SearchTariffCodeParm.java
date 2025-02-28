/**
* TariffCodeParm.java
*
* Created on   : Dec 5, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Dec 5, 2007   An Doan 1.0    First release.
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
public class SearchTariffCodeParm extends BaseBizParm {
    private String trfTpCd;
    private String costCntCd;
    private String billTpCd;
    private String searchTp;
    private String eqTp;
    private String trfCd;
    private String subTrfCd;
    private String systemId;
    
    private String gstTpCd;
    private String templateCd;
    
    public String getSystemId() {
        return systemId;
    }
    public void setSystemId(String systemId) {
        this.systemId = systemId;
    }
    //for loading multiselect popup
    private String lcd;
    private String mcd;

    public String getBillTpCd() {
        return billTpCd;
    }
    public void setBillTpCd(String billTpCd) {
        this.billTpCd = billTpCd;
    }
    public String getCostCntCd() {
        return costCntCd;
    }
    public void setCostCntCd(String costCntCd) {
        this.costCntCd = costCntCd;
    }
    public String getTrfTpCd() {
        return trfTpCd;
    }
    public void setTrfTpCd(String trfTpCd) {
        this.trfTpCd = trfTpCd;
    }
    public String getSearchTp() {
        return searchTp;
    }
    public void setSearchTp(String searchTp) {
        this.searchTp = searchTp;
    }
    public String getEqTp() {
        return eqTp;
    }
    public void setEqTp(String eqTp) {
        this.eqTp = eqTp;
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
    public String getLcd() {
        return lcd;
    }
    public void setLcd(String lcd) {
        this.lcd = lcd;
    }
    public String getMcd() {
        return mcd;
    }
    public void setMcd(String mcd) {
        this.mcd = mcd;
    }
    public String getGstTpCd() {
        return gstTpCd;
    }
    public void setGstTpCd(String gstTpCd) {
        this.gstTpCd = gstTpCd;
    }
	public String getTemplateCd() {
		return templateCd;
	}
	public void setTemplateCd(String templateCd) {
		this.templateCd = templateCd;
	}
    
}
