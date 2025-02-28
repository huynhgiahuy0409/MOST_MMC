/**
* ShiftGroupDefItem.java
*
* Created on   : 2007-09-10
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-09-10     Mr Tonny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.operation;

import com.tsb.most.framework.dataitem.DataItem;

/**
* use ShiftGroupDefItem Class as parameters to CUD 
*
* @author Mr Tonny Kim
* @version 1.0
*
* @see 
*/
public class ShiftGroupDefItem extends DataItem {

    private String shftId;
    private String shftDivCd;
    private String aplyFmYmd;
    private String aplyToYmd;
    private String shftNm;
    private String fmHhmm;
    private String toHhmm;
    private String no;
    private String groupCd;
    private String groupNm;
    private String divCd;
    private String scd;
    private String scdNm;
    private String shftMethCd;
    private String shftIdx;
    private String useYn;
    private String rmk;
    private String insertType; //shift, group
    private String workingStatus;
    
//    private String workingStatus;
//    private ArrayList<ShiftGroupDefItem> shiftDefListItems;
//    private ArrayList<ShiftGroupDefItem> shiftDefGroupItems;
    
	/**
     * @return Returns the aplyFmYmd.
     */
    public String getAplyFmYmd() {
        return aplyFmYmd;
    }
    /**
     * @param aplyFmYmd The aplyFmYmd to set.
     */
    public void setAplyFmYmd(String aplyFmYmd) {
        this.aplyFmYmd = aplyFmYmd;
    }
    /**
     * @return Returns the aplyToYmd.
     */
    public String getAplyToYmd() {
        return aplyToYmd;
    }
    /**
     * @param aplyToYmd The aplyToYmd to set.
     */
    public void setAplyToYmd(String aplyToYmd) {
        this.aplyToYmd = aplyToYmd;
    }
    /**
     * @return Returns the divCd.
     */
    public String getDivCd() {
        return divCd;
    }
    /**
     * @param divCd The divCd to set.
     */
    public void setDivCd(String divCd) {
        this.divCd = divCd;
    }
    /**
     * @return Returns the fmHhmm.
     */
    public String getFmHhmm() {
        return fmHhmm;
    }
    /**
     * @param fmHhmm The fmHhmm to set.
     */
    public void setFmHhmm(String fmHhmm) {
        this.fmHhmm = fmHhmm;
    }
    /**
     * @return Returns the groupCd.
     */
    public String getGroupCd() {
        return groupCd;
    }
    /**
     * @param groupCd The groupCd to set.
     */
    public void setGroupCd(String groupCd) {
        this.groupCd = groupCd;
    }
    /**
     * @return Returns the groupNm.
     */
    public String getGroupNm() {
        return groupNm;
    }
    /**
     * @param groupNm The groupNm to set.
     */
    public void setGroupNm(String groupNm) {
        this.groupNm = groupNm;
    }
    /**
     * @return Returns the insertType.
     */
    public String getInsertType() {
        return insertType;
    }
    /**
     * @param insertType The insertType to set.
     */
    public void setInsertType(String insertType) {
        this.insertType = insertType;
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
     * @return Returns the rmk.
     */
    public String getRmk() {
        return rmk;
    }
    /**
     * @param rmk The rmk to set.
     */
    public void setRmk(String rmk) {
        this.rmk = rmk;
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
     * @return Returns the shftDivCd.
     */
    public String getShftDivCd() {
        return shftDivCd;
    }
    /**
     * @param shftDivCd The shftDivCd to set.
     */
    public void setShftDivCd(String shftDivCd) {
        this.shftDivCd = shftDivCd;
    }
    /**
     * @return Returns the shftId.
     */
    public String getShftId() {
        return shftId;
    }
    /**
     * @param shftId The shftId to set.
     */
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
    /**
     * @return Returns the shftIdx.
     */
    public String getShftIdx() {
        return shftIdx;
    }
    /**
     * @param shftIdx The shftIdx to set.
     */
    public void setShftIdx(String shftIdx) {
        this.shftIdx = shftIdx;
    }
    /**
     * @return Returns the shftMethCd.
     */
    public String getShftMethCd() {
        return shftMethCd;
    }
    /**
     * @param shftMethCd The shftMethCd to set.
     */
    public void setShftMethCd(String shftMethCd) {
        this.shftMethCd = shftMethCd;
    }
    /**
     * @return Returns the shftNm.
     */
    public String getShftNm() {
        return shftNm;
    }
    /**
     * @param shftNm The shftNm to set.
     */
    public void setShftNm(String shftNm) {
        this.shftNm = shftNm;
    }
    /**
     * @return Returns the toHhmm.
     */
    public String getToHhmm() {
        return toHhmm;
    }
    /**
     * @param toHhmm The toHhmm to set.
     */
    public void setToHhmm(String toHhmm) {
        this.toHhmm = toHhmm;
    }
    /**
     * @return Returns the useYn.
     */
    public String getUseYn() {
        return useYn;
    }
    /**
     * @param useYn The useYn to set.
     */
    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }
	/**
	 * @return the workingStatus
	 */
	public String getWorkingStatus() {
		return workingStatus;
	}
	/**
	 * @param workingStatus the workingStatus to set
	 */
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
}
