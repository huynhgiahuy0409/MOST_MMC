/**
* InvoiceTemplateParm.java
*
* Created on   : Nov 4, 2008
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Nov 4, 2008   Nghiala 1.0     First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author Nghiala
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchInvoiceTemplateParm extends BaseBizParm{
    private String templateCd;
    private String searchTp;

//  Provide for code master list
    private String lcd;
    private String mcd;
    private String scdUse;
    private String scd;
    private String scdNm;
    private String tyCd;
    private String scdLgv;
    private String col1;
    private String col2;
    private String col3;
    private String col4;
    private String col5;
    
    private String vslCallId;
    private String payer;
    private String tariffTypeCd;
    private String crcyCd;
    private String costCenterCd;
    private String refNo;
    private String adhoc;
    
    
    /**
     * @return Returns the costCenterCd.
     */
    public String getCostCenterCd() {
        return costCenterCd;
    }
    /**
     * @param costCenterCd The costCenterCd to set.
     */
    public void setCostCenterCd(String costCenterCd) {
        this.costCenterCd = costCenterCd;
    }
    /**
     * @return Returns the refNo.
     */
    public String getRefNo() {
        return refNo;
    }
    /**
     * @param refNo The refNo to set.
     */
    public void setRefNo(String refNo) {
        this.refNo = refNo;
    }
    /**
     * @return Returns the crcyCd.
     */
    public String getCrcyCd() {
        return crcyCd;
    }
    /**
     * @param crcyCd The crcyCd to set.
     */
    public void setCrcyCd(String crcyCd) {
        this.crcyCd = crcyCd;
    }
    public String getTariffTypeCd() {
        return tariffTypeCd;
    }
    public void setTariffTypeCd(String tariffTypeCd) {
        this.tariffTypeCd = tariffTypeCd;
    }
    
    public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getPayer() {
        return payer;
    }
    public void setPayer(String payer) {
        this.payer = payer;
    }
    public String getCol1() {
        return col1;
    }
    public void setCol1(String col1) {
        this.col1 = col1;
    }
    public String getCol2() {
        return col2;
    }
    public void setCol2(String col2) {
        this.col2 = col2;
    }
    public String getCol3() {
        return col3;
    }
    public void setCol3(String col3) {
        this.col3 = col3;
    }
    public String getCol4() {
        return col4;
    }
    public void setCol4(String col4) {
        this.col4 = col4;
    }
    public String getCol5() {
        return col5;
    }
    public void setCol5(String col5) {
        this.col5 = col5;
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
    public String getScd() {
        return scd;
    }
    public void setScd(String scd) {
        this.scd = scd;
    }
    public String getScdLgv() {
        return scdLgv;
    }
    public void setScdLgv(String scdLgv) {
        this.scdLgv = scdLgv;
    }
    public String getScdNm() {
        return scdNm;
    }
    public void setScdNm(String scdNm) {
        this.scdNm = scdNm;
    }
    public String getScdUse() {
        return scdUse;
    }
    public void setScdUse(String scdUse) {
        this.scdUse = scdUse;
    }
    public String getTyCd() {
        return tyCd;
    }
    public void setTyCd(String tyCd) {
        this.tyCd = tyCd;
    }
    public String getSearchTp() {
        return searchTp;
    }
    public void setSearchTp(String searchTp) {
        this.searchTp = searchTp;
    }
    public String getTemplateCd() {
        return templateCd;
    }
    public void setTemplateCd(String templateCd) {
        this.templateCd = templateCd;
    }
    /**
     * @return Returns the adhoc.
     */
    public String getAdhoc() {
        return adhoc;
    }
    /**
     * @param adhoc The adhoc to set.
     */
    public void setAdhoc(String adhoc) {
        this.adhoc = adhoc;
    }
}
