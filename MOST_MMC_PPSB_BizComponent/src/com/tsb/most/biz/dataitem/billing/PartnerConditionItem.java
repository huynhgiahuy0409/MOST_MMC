/**
* PartnerConditionItem.java
*
* Created on   : Nov 7, 2008
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Nov 7, 2008   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author lamthanhtung
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class PartnerConditionItem extends DataItem{

    private String agreNo;
    private String seq;
    private String crud;
    private String prptCd;
    private String oprIdtCd;
    private String chrVal;
    private String noVal;
    private String dtVal;
    private String tierVal1;
    private String tierVal2;
    private String bndVal1;
    private String bndVal2;
    
    private String prptNm;
    private String dataTpCd;
    private String dataLen;
    
    private String sytmId;
    
    public String getAgreNo() {
        return agreNo;
    }
    public void setAgreNo(String agreNo) {
        this.agreNo = agreNo;
    }
    public String getBndVal1() {
        return bndVal1;
    }
    public void setBndVal1(String bndVal1) {
        this.bndVal1 = bndVal1;
    }
    public String getBndVal2() {
        return bndVal2;
    }
    public void setBndVal2(String bndVal2) {
        this.bndVal2 = bndVal2;
    }
    public String getChrVal() {
        return chrVal;
    }
    public void setChrVal(String chrVal) {
        this.chrVal = chrVal;
    }
    public String getDataLen() {
        return dataLen;
    }
    public void setDataLen(String dataLen) {
        this.dataLen = dataLen;
    }
    public String getDataTpCd() {
        return dataTpCd;
    }
    public void setDataTpCd(String dataTpCd) {
        this.dataTpCd = dataTpCd;
    }
    public String getDtVal() {
        return dtVal;
    }
    public void setDtVal(String dtVal) {
        this.dtVal = dtVal;
    }
    public String getNoVal() {
        return noVal;
    }
    public void setNoVal(String noVal) {
        this.noVal = noVal;
    }
    public String getOprIdtCd() {
        return oprIdtCd;
    }
    public void setOprIdtCd(String oprIdtCd) {
        this.oprIdtCd = oprIdtCd;
    }
    public String getPrptCd() {
        return prptCd;
    }
    public void setPrptCd(String prptCd) {
        this.prptCd = prptCd;
    }
    public String getPrptNm() {
        return prptNm;
    }
    public void setPrptNm(String prptNm) {
        this.prptNm = prptNm;
    }
    public String getSeq() {
        return seq;
    }
    public void setSeq(String seq) {
        this.seq = seq;
    }
    public String getSytmId() {
        return sytmId;
    }
    public void setSytmId(String sytmId) {
        this.sytmId = sytmId;
    }
    public String getTierVal1() {
        return tierVal1;
    }
    public void setTierVal1(String tierVal1) {
        this.tierVal1 = tierVal1;
    }
    public String getTierVal2() {
        return tierVal2;
    }
    public void setTierVal2(String tierVal2) {
        this.tierVal2 = tierVal2;
    }
   

	public String getCrud() {
		return crud;
	}
	public void setCrud(String crud) {
		this.crud = crud;
	}
}
