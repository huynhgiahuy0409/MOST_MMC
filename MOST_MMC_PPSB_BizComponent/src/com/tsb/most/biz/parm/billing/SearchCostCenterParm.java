/**
* CostCenterParm.java
*
* Created on   : Nov 30, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Nov 30, 2007   Phan Minh Tuan 1.0    First release.
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
public class SearchCostCenterParm extends BaseBizParm {
    private String codeCostCenter ;
    private String codeFinancial;
    private String codeDescription ;
    private String codeSBU ;
    private String typeDelivery ;
    private String typeCargo ;
    private String codeStaff ;    
    private String dateUpdate ;
    
    //Provide for code master list
    private String lcd;
    private String mcd;
    private String scdUse;
    private String scd;
    private String scdNm;
    private String tyCd;
    private String scdLgv;
    private String searchType;
    private String col1;
    private String col2;
    private String col3;
    private String col4;
    private String col5;
    
    private String bbtYn;
    
    public String getCodeCostCenter() {
        return codeCostCenter;
    }
    public void setCodeCostCenter(String codeCostCenter) {
        this.codeCostCenter = codeCostCenter;
    }
    public String getCodeDescription() {
        return codeDescription;
    }
    public void setCodeDescription(String codeDescription) {
        this.codeDescription = codeDescription;
    }
    public String getCodeSBU() {
        return codeSBU;
    }
    public void setCodeSBU(String codeSBU) {
        this.codeSBU = codeSBU;
    }
    public String getCodeStaff() {
        return codeStaff;
    }
    public void setCodeStaff(String codeStaff) {
        this.codeStaff = codeStaff;
    }
    public String getDateUpdate() {
        return dateUpdate;
    }
    public void setDateUpdate(String dateUpdate) {
        this.dateUpdate = dateUpdate;
    }
    public String getTypeCargo() {
        return typeCargo;
    }
    public void setTypeCargo(String typeCargo) {
        this.typeCargo = typeCargo;
    }
    public String getTypeDelivery() {
        return typeDelivery;
    }
    public void setTypeDelivery(String typeDelivery) {
        this.typeDelivery = typeDelivery;
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
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getTyCd() {
        return tyCd;
    }
    public void setTyCd(String tyCd) {
        this.tyCd = tyCd;
    }
    public String getCodeFinancial() {
        return codeFinancial;
    }
    public void setCodeFinancial(String codeFinancial) {
        this.codeFinancial = codeFinancial;
    }
	public String getBbtYn() {
		return bbtYn;
	}
	public void setBbtYn(String bbtYn) {
		this.bbtYn = bbtYn;
	}
}
