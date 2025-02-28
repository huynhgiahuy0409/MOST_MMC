package com.tsb.most.biz.dataitem.monitoring;


import com.tsb.most.framework.dataitem.DataItem;
import java.util.List;

/**
* UnclosedOperationItem.java
*
* Created on   : 2009-04-20
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR            REVISION     
* 2008-04-20   Kisik Jeong    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/

public class UnclosedOperationItem extends DataItem {
    private String vslCallId;
    private String vslNm;
    private String cgOpTp;
    private String blSn;
    private String grNo;
    private String cgCond;
    private String rsn;
    private String atb;
    private String atu;
    
    //lv.dat add for unclosed opr add column
    private String jobStrip;
    //vt.dat add for unclosed opr combobox HHT Tablet:
    private List shiftList;
    /**
     * @return Returns the blSn.
     */
    public String getBlSn() {
        return blSn;
    }
    /**
     * @param blSn The blSn to set.
     */
    public void setBlSn(String blSn) {
        this.blSn = blSn;
    }
    /**
     * @return Returns the cgCond.
     */
    public String getCgCond() {
        return cgCond;
    }
    /**
     * @param cgCond The cgCond to set.
     */
    public void setCgCond(String cgCond) {
        this.cgCond = cgCond;
    }
    /**
     * @return Returns the cgOpTp.
     */
    public String getCgOpTp() {
        return cgOpTp;
    }
    /**
     * @param cgOpTp The cgOpTp to set.
     */
    public void setCgOpTp(String cgOpTp) {
        this.cgOpTp = cgOpTp;
    }
    /**
     * @return Returns the grNo.
     */
    public String getGrNo() {
        return grNo;
    }
    /**
     * @param grNo The grNo to set.
     */
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
    /**
     * @return Returns the rsn.
     */
    public String getRsn() {
        return rsn;
    }
    /**
     * @param rsn The rsn to set.
     */
    public void setRsn(String rsn) {
        this.rsn = rsn;
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
    public String getJobStrip() {
        return jobStrip;
    }
    public void setJobStrip(String jobStrip) {
        this.jobStrip = jobStrip;
    }
    public String getAtb() {
        return atb;
    }
    public void setAtb(String atb) {
        this.atb = atb;
    }
    public String getAtu() {
        return atu;
    }
    public void setAtu(String atu) {
        this.atu = atu;
    }
    public String getVslNm() {
        return vslNm;
    }
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
	public List getShiftList() {
		return shiftList;
	}
	public void setShiftList(List shiftList) {
		this.shiftList = shiftList;
	}
    
}