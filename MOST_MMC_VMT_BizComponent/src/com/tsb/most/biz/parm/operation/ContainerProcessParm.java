package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class ContainerProcessParm extends BaseBizParm{
    private String vslCallId;
    private String workYmd;
    private String shftId;
    private String hatchNo;
    private String searchType;
    

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
     * @return Returns the searchType.
     */
    public String getSearchType() {
        return searchType;
    }
    /**
     * @param searchType The searchType to set.
     */
    public void setSearchType(String searchType) {
        this.searchType = searchType;
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
}
