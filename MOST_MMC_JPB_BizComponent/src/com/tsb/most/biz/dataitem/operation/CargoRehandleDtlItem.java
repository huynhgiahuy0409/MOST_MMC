/**
* CargoRehandleDtlItem.java
*
* Created on   : Mar 10, 2009
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Mar 10, 2009   Mr Sunny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.operation;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author SUNNYKIM21
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class CargoRehandleDtlItem extends DataItem {

//    private String rhdlNo;//seq
    private String vslCallId;
    private String orgRefNo;//sn, bl
//    private String nxVslCallId;
//    private String nxRefNo;
    private String opeClassCd;
    private String caTgNm;//add sunnyKim 20081208
    private int pkgQty;
    private double  wgt;
    private double  msrmt;
    private String stsYn;
    private String orgGrNo;//cg_mst export CG_NO
    private String rhdlMode;
    private String updDt;
    
    //add 2008.03.31 -rehandle mode list
    private int rhdlPkgQty;
    private double rhdlWgt;
    private double rhdlMsrmt;
    
    private int balPkgQty;// DOCAMT - RHDLAMT
    private double balWgt;// DOCAMT - RHDLAMT
    private double balMsrmt;// DOCAMT - RHDLAMT
    private String chk;//crudmodechekc for grid
    private int no;//gridNumber
//    private String userId;//Update Id
    
//    private String cgCoCd;//cargo condition //sunny 20081205
//    private String cgCoNm;
//    private String rhdlChk;
    
    private String shuYn;
    private String dmgYn;
    private String jobNo;
    /**
     * @return Returns the balMsrmt.
     */
    public double getBalMsrmt() {
        return balMsrmt;
    }
    /**
     * @param balMsrmt The balMsrmt to set.
     */
    public void setBalMsrmt(double balMsrmt) {
        this.balMsrmt = balMsrmt;
    }
    /**
     * @return Returns the balPkgQty.
     */
    public int getBalPkgQty() {
        return balPkgQty;
    }
    /**
     * @param balPkgQty The balPkgQty to set.
     */
    public void setBalPkgQty(int balPkgQty) {
        this.balPkgQty = balPkgQty;
    }
    /**
     * @return Returns the balWgt.
     */
    public double getBalWgt() {
        return balWgt;
    }
    /**
     * @param balWgt The balWgt to set.
     */
    public void setBalWgt(double balWgt) {
        this.balWgt = balWgt;
    }
    /**
     * @return Returns the caTgNm.
     */
    public String getCaTgNm() {
        return caTgNm;
    }
    /**
     * @param caTgNm The caTgNm to set.
     */
    public void setCaTgNm(String caTgNm) {
        this.caTgNm = caTgNm;
    }
    /**
     * @return Returns the cgCoCd.
     */
//    public String getCgCoCd() {
//        return cgCoCd;
//    }
//    /**
//     * @param cgCoCd The cgCoCd to set.
//     */
//    public void setCgCoCd(String cgCoCd) {
//        this.cgCoCd = cgCoCd;
//    }
//    /**
//     * @return Returns the cgCoNm.
//     */
//    public String getCgCoNm() {
//        return cgCoNm;
//    }
//    /**
//     * @param cgCoNm The cgCoNm to set.
//     */
//    public void setCgCoNm(String cgCoNm) {
//        this.cgCoNm = cgCoNm;
//    }
    /**
     * @return Returns the chk.
     */
    public String getChk() {
        return chk;
    }
    /**
     * @param chk The chk to set.
     */
    public void setChk(String chk) {
        this.chk = chk;
    }
    /**
     * @return Returns the dmgYn.
     */
    public String getDmgYn() {
        return dmgYn;
    }
    /**
     * @param dmgYn The dmgYn to set.
     */
    public void setDmgYn(String dmgYn) {
        this.dmgYn = dmgYn;
    }
    /**
     * @return Returns the jobNo.
     */
    public String getJobNo() {
        return jobNo;
    }
    /**
     * @param jobNo The jobNo to set.
     */
    public void setJobNo(String jobNo) {
        this.jobNo = jobNo;
    }
    /**
     * @return Returns the msrmt.
     */
    public double getMsrmt() {
        return msrmt;
    }
    /**
     * @param msrmt The msrmt to set.
     */
    public void setMsrmt(double msrmt) {
        this.msrmt = msrmt;
    }
    /**
     * @return Returns the no.
     */
    public int getNo() {
        return no;
    }
    /**
     * @param no The no to set.
     */
    public void setNo(int no) {
        this.no = no;
    }
/**
 * @return Returns the opeClassCd.
 */
public String getOpeClassCd() {
    return opeClassCd;
}
/**
 * @param opeClassCd The opeClassCd to set.
 */
public void setOpeClassCd(String opeClassCd) {
    this.opeClassCd = opeClassCd;
}
    /**
     * @return Returns the orgGrNo.
     */
    public String getOrgGrNo() {
        return orgGrNo;
    }
    /**
     * @param orgGrNo The orgGrNo to set.
     */
    public void setOrgGrNo(String orgGrNo) {
        this.orgGrNo = orgGrNo;
    }
    /**
     * @return Returns the pkgQty.
     */
    public int getPkgQty() {
        return pkgQty;
    }
    /**
     * @param pkgQty The pkgQty to set.
     */
    public void setPkgQty(int pkgQty) {
        this.pkgQty = pkgQty;
    }
    /**
     * @return Returns the rhdlChk.
     */
//    public String getRhdlChk() {
//        return rhdlChk;
//    }
//    /**
//     * @param rhdlChk The rhdlChk to set.
//     */
//    public void setRhdlChk(String rhdlChk) {
//        this.rhdlChk = rhdlChk;
//    }
    /**
     * @return Returns the rhdlMsrmt.
     */
    public double getRhdlMsrmt() {
        return rhdlMsrmt;
    }
    /**
     * @param rhdlMsrmt The rhdlMsrmt to set.
     */
    public void setRhdlMsrmt(double rhdlMsrmt) {
        this.rhdlMsrmt = rhdlMsrmt;
    }
//    /**
//     * @return Returns the rhdlNo.
//     */
//    public String getRhdlNo() {
//        return rhdlNo;
//    }
//    /**
//     * @param rhdlNo The rhdlNo to set.
//     */
//    public void setRhdlNo(String rhdlNo) {
//        this.rhdlNo = rhdlNo;
//    }
    /**
     * @return Returns the rhdlWgt.
     */
    public double getRhdlWgt() {
        return rhdlWgt;
    }
    /**
     * @param rhdlWgt The rhdlWgt to set.
     */
    public void setRhdlWgt(double rhdlWgt) {
        this.rhdlWgt = rhdlWgt;
    }
    /**
     * @return Returns the shuYn.
     */
    public String getShuYn() {
        return shuYn;
    }
    /**
     * @param shuYn The shuYn to set.
     */
    public void setShuYn(String shuYn) {
        this.shuYn = shuYn;
    }
    /**
     * @return Returns the stsYn.
     */
    public String getStsYn() {
        return stsYn;
    }
    /**
     * @param stsYn The stsYn to set.
     */
    public void setStsYn(String stsYn) {
        this.stsYn = stsYn;
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
    /**
     * @return Returns the wgt.
     */
    public double getWgt() {
        return wgt;
    }
    /**
     * @param wgt The wgt to set.
     */
    public void setWgt(double wgt) {
        this.wgt = wgt;
    }
    /**
     * @return Returns the orgRefNo.
     */
    public String getOrgRefNo() {
        return orgRefNo;
    }
    /**
     * @param orgRefNo The orgRefNo to set.
     */
    public void setOrgRefNo(String orgRefNo) {
        this.orgRefNo = orgRefNo;
    }
    /**
     * @return Returns the rhdlMode.
     */
    public String getRhdlMode() {
        return rhdlMode;
    }
    /**
     * @param rhdlMode The rhdlMode to set.
     */
    public void setRhdlMode(String rhdlMode) {
        this.rhdlMode = rhdlMode;
    }
    /**
     * @return Returns the rhdlPkgQty.
     */
    public int getRhdlPkgQty() {
        return rhdlPkgQty;
    }
    /**
     * @param rhdlPkgQty The rhdlPkgQty to set.
     */
    public void setRhdlPkgQty(int rhdlPkgQty) {
        this.rhdlPkgQty = rhdlPkgQty;
    }
    /**
     * @return Returns the updDt.
     */
    public String getUpdDt() {
        return updDt;
    }
    /**
     * @param updDt The updDt to set.
     */
    public void setUpdDt(String updDt) {
        this.updDt = updDt;
    }
}
