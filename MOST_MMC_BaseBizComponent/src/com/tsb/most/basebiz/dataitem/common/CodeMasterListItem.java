/**
* CodeMasterListItem.java
*
* Created on   : 2007-10-16
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-10-16   Mr Luis Lee	1.0          First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.dataitem.common;

import java.io.Serializable;

/**
 * @author LuisLee
 *
 */
public class CodeMasterListItem implements Serializable {
    private String no;
	private String mcd;
	private String mcdNm;
	private String scd; 
	private String scdNm;
	private String scdLgv;
	private String scdDesc;
	private String scdVal;
	private String acptYN;
    private String imdg;
    private String unno;
    private String divCd;
    private String cgTp;
	
    public String getImdg() {
        return imdg;
    }
    public void setImdg(String imdg) {
        this.imdg = imdg;
    }
    public String getCgTp() {
        return cgTp;
    }
    public void setCgTp(String cgTp) {
        this.cgTp = cgTp;
    }
    public String getUnno() {
        return unno;
    }
    public void setUnno(String unno) {
        this.unno = unno;
    }
    /**
     * @return Returns the acptYN.
     */
    public String getAcptYN() {
        return acptYN;
    }
    /**
     * @param acptYN The acptYN to set.
     */
    public void setAcptYN(String acptYN) {
        this.acptYN = acptYN;
    }
    /**
     * @return Returns the mcd.
     */
    public String getMcd() {
        return mcd;
    }
    /**
     * @param mcd The mcd to set.
     */
    public void setMcd(String mcd) {
        this.mcd = mcd;
    }
    /**
     * @return Returns the mcdNm.
     */
    public String getMcdNm() {
        return mcdNm;
    }
    /**
     * @param mcdNm The mcdNm to set.
     */
    public void setMcdNm(String mcdNm) {
        this.mcdNm = mcdNm;
    }
    /**
     * @return Returns the no.
     */
    public String getNo() {
        return no;
    }
    /**
     * @param no The no to set.
     */
    public void setNo(String no) {
        this.no = no;
    }
    /**
     * @return Returns the scd.
     */
    public String getScd() {
        return scd;
    }
    /**
     * @param scd The scd to set.
     */
    public void setScd(String scd) {
        this.scd = scd;
    }
    /**
     * @return Returns the scdLgv.
     */
    public String getScdLgv() {
        return scdLgv;
    }
    /**
     * @param scdLgv The scdLgv to set.
     */
    public void setScdLgv(String scdLgv) {
        this.scdLgv = scdLgv;
    }
    /**
     * @return Returns the scdNm.
     */
    public String getScdNm() {
        return scdNm;
    }
    /**
     * @param scdNm The scdNm to set.
     */
    public void setScdNm(String scdNm) {
        this.scdNm = scdNm;
    }
    /**
     * @return Returns the scdVal.
     */
    public String getScdVal() {
        return scdVal;
    }
    /**
     * @param scdVal The scdVal to set.
     */
    public void setScdVal(String scdVal) {
        this.scdVal = scdVal;
    }
	public String getCd() {
		return scd;
	}
	public void setCd(String scd) {
		this.scd = scd;
	}
	public String getCdNm() {
		return scdNm;
	}
	public void setCdNm(String scdNm) {
		this.scdNm = scdNm;
	}
	public String getDivCd() {
		return divCd;
	}
	public void setDivCd(String divCd) {
		this.divCd = divCd;
	}

    public String getScdDesc() {
        return scdDesc;
    }

    public void setScdDesc(String scdDesc) {
        this.scdDesc = scdDesc;
    }
}
