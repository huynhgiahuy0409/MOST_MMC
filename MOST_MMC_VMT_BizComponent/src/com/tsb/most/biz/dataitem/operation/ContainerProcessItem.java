package com.tsb.most.biz.dataitem.operation;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;


public class ContainerProcessItem extends DataItem {
    private String vslCallId;
    private String seq;
    private String stDt;
    private String endDt;
    private String shftId;
    private String shftNm;
    private String hatchNo;
    private String eqNo;
    private String eqNm;
    private String totalHrs;
    private String userId;
    private String no;
    private String l20;
    private String l40;
    private String d20;
    private String d40;
    private String workYmd;
 
    private List containerProcessList;

    private List hatchNoList;
    private List equipmentNoList;
    private List shiftList;
    /**
     * @return Returns the workYmd.
     */
    public String getWorkYmd() {
        return workYmd;
    }
    /**
     * @param workYmd The workYmd to set.
     */
    public void setWorkYmd(String workYmd) {
        this.workYmd = workYmd;
    }
    /**
     * @return Returns the seq.
     */
    public String getSeq() {
        return seq;
    }
    /**
     * @param seq The seq to set.
     */
    public void setSeq(String seq) {
        this.seq = seq;
    }
    //-- start ADD 20080804 tnkytn Need for HHT
    private String crud;
    //-- end   ADD 20080804 tnkytn Need for HHT
    
    //-- start ADD 20080804 tnkytn Need for HHT
    public String getCrud() {
        return crud;
    }
    public void setCrud(String workingStatus) {
        this.crud = workingStatus;
    }
    //-- end   ADD 20080804 tnkytn Need for HHT

    
    /**
     * @return Returns the d20.
     */
    public String getD20() {
        return d20;
    }
    /**
     * @param d20 The d20 to set.
     */
    public void setD20(String d20) {
        this.d20 = d20;
    }
    /**
     * @return Returns the d40.
     */
    public String getD40() {
        return d40;
    }
    /**
     * @param d40 The d40 to set.
     */
    public void setD40(String d40) {
        this.d40 = d40;
    }
    /**
     * @return Returns the endDt.
     */
    public String getEndDt() {
        return endDt;
    }
    /**
     * @param endDt The endDt to set.
     */
    public void setEndDt(String endDt) {
        this.endDt = endDt;
    }
    /**
     * @return Returns the eqNm.
     */
    public String getEqNm() {
        return eqNm;
    }
    /**
     * @param eqNm The eqNm to set.
     */
    public void setEqNm(String eqNm) {
        this.eqNm = eqNm;
    }
    /**
     * @return Returns the eqNo.
     */
    public String getEqNo() {
        return eqNo;
    }
    /**
     * @param eqNo The eqNo to set.
     */
    public void setEqNo(String eqNo) {
        this.eqNo = eqNo;
    }
    /**
     * @return Returns the hatchNo.
     */
    public String getHatchNo() {
        return hatchNo;
    }
    /**
     * @param hatchNo The hatchNo to set.
     */
    public void setHatchNo(String hatchNo) {
        this.hatchNo = hatchNo;
    }
    /**
     * @return Returns the l20.
     */
    public String getL20() {
        return l20;
    }
    /**
     * @param l20 The l20 to set.
     */
    public void setL20(String l20) {
        this.l20 = l20;
    }
    /**
     * @return Returns the l40.
     */
    public String getL40() {
        return l40;
    }
    /**
     * @param l40 The l40 to set.
     */
    public void setL40(String l40) {
        this.l40 = l40;
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
     * @return Returns the stDt.
     */
    public String getStDt() {
        return stDt;
    }
    /**
     * @param stDt The stDt to set.
     */
    public void setStDt(String stDt) {
        this.stDt = stDt;
    }
    /**
     * @return Returns the totalHrs.
     */
    public String getTotalHrs() {
        return totalHrs;
    }
    /**
     * @param totalHrs The totalHrs to set.
     */
    public void setTotalHrs(String totalHrs) {
        this.totalHrs = totalHrs;
    }
    /**
     * @return Returns the userId.
     */
    public String getUserId() {
        return userId;
    }
    /**
     * @param userId The userId to set.
     */
    public void setUserId(String userId) {
        this.userId = userId;
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
	public List getEquipmentNoList() {
		return equipmentNoList;
	}
	public void setEquipmentNoList(List equipmenNoList) {
		this.equipmentNoList = equipmenNoList;
	}
	public List getHatchNoList() {
		return hatchNoList;
	}
	public void setHatchNoList(List hatchNoList) {
		this.hatchNoList = hatchNoList;
	}
	public List getShiftList() {
		return shiftList;
	}
	public void setShiftList(List shiftList) {
		this.shiftList = shiftList;
	}
	public List getContainerProcessList() {
		return containerProcessList;
	}
	public void setContainerProcessList(List containerProcessList) {
		this.containerProcessList = containerProcessList;
	}
}
