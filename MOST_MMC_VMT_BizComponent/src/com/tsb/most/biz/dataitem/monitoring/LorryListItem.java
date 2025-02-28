package com.tsb.most.biz.dataitem.monitoring;

import com.tsb.most.framework.dataitem.DataItem;

public class LorryListItem extends DataItem {

    private String VSLCALLID;
    private String BLNO;
    private String ESTDT; 
    private String TSPTCD;
    private String LORRYNO;
    private String DRIVER;
    private String EXPRDT;
   
    private String LICSNO;
    private String GATEINDT;
    private String ptnrCd;
    private String SEQ;
    private String aplyYmd;
    private String SNNO;
    private String exprYmd;
    private String GATEOUTDT;
    private String DRIVERID;
    
    //added by William (2015/07/21) Mantis issue 49799
    private String LORRYID;
    
   
    private String vslNm;
    private String doNo;
    private String consignee;
    private String shipper;
    private String eta;
    private String atb;
    private String atu;
    private String workingMode;
    private String berthLocation;
    private String commodity;
    private String storageLocation;
    private String status;
    
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
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
    public String getBerthLocation() {
        return berthLocation;
    }
    public void setBerthLocation(String berthLocation) {
        this.berthLocation = berthLocation;
    }
    public String getCommodity() {
        return commodity;
    }
    public void setCommodity(String commodity) {
        this.commodity = commodity;
    }
    public String getConsignee() {
        return consignee;
    }
    public void setConsignee(String consignee) {
        this.consignee = consignee;
    }
    public String getEta() {
        return eta;
    }
    public void setEta(String eta) {
        this.eta = eta;
    }
    public String getShipper() {
        return shipper;
    }
    public void setShipper(String shipper) {
        this.shipper = shipper;
    }
    public String getStorageLocation() {
        return storageLocation;
    }
    public void setStorageLocation(String storageLocation) {
        this.storageLocation = storageLocation;
    }
    public String getWorkingMode() {
        return workingMode;
    }
    public void setWorkingMode(String workingMode) {
        this.workingMode = workingMode;
    }
    public String getDoNo() {
        return doNo;
    }
    public void setDoNo(String doNo) {
        this.doNo = doNo;
    }
    public String getVslNm() {
        return vslNm;
    }
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
    public String getPtnrCd() {
        return ptnrCd;
    }
    public void setPtnrCd(String ptnrCd) {
        this.ptnrCd = ptnrCd;
    }
    
    
    public String getDRIVERID() {
        return DRIVERID;
    }
    public void setDRIVERID(String driverid) {
        DRIVERID = driverid;
    }
    public String getSEQ() {
        return SEQ;
    }
    public void setSEQ(String seq) {
        SEQ = seq;
    }
    public String getAplyYmd() {
        return aplyYmd;
    }
    public void setAplyYmd(String aplyYmd) {
        this.aplyYmd = aplyYmd;
    }
    public String getBLNO() {
        return BLNO;
    }
    public void setBLNO(String blno) {
        BLNO = blno;
    }
    public String getDRIVER() {
        return DRIVER;
    }
    public void setDRIVER(String driver) {
        DRIVER = driver;
    }
    public String getESTDT() {
        return ESTDT;
    }
    public void setESTDT(String estdt) {
        ESTDT = estdt;
    }
    public String getEXPRDT() {
        return EXPRDT;
    }
    public void setEXPRDT(String exprdt) {
        EXPRDT = exprdt;
    }
    public String getExprYmd() {
        return exprYmd;
    }
    public void setExprYmd(String exprYmd) {
        this.exprYmd = exprYmd;
    }
    public String getGATEINDT() {
        return GATEINDT;
    }
    public void setGATEINDT(String gateindt) {
        GATEINDT = gateindt;
    }
    public String getGATEOUTDT() {
        return GATEOUTDT;
    }
    public void setGATEOUTDT(String gateoutdt) {
        GATEOUTDT = gateoutdt;
    }
    public String getLICSNO() {
        return LICSNO;
    }
    public void setLICSNO(String licsno) {
        LICSNO = licsno;
    }
    public String getLORRYNO() {
        return LORRYNO;
    }
    public void setLORRYNO(String lorryno) {
        LORRYNO = lorryno;
    }
   
    public String getSNNO() {
        return SNNO;
    }
    public void setSNNO(String NO) {
        SNNO = NO;
    }
    public String getTSPTCD() {
        return TSPTCD;
    }
    public void setTSPTCD(String tsptcd) {
        TSPTCD = tsptcd;
    }
    public String getVSLCALLID() {
        return VSLCALLID;
    }
    public void setVSLCALLID(String vslcallid) {
        VSLCALLID = vslcallid;
    }
    public String getLORRYID() {
        return LORRYID;
    }
    public void setLORRYID(String lorryid) {
        LORRYID = lorryid;
    }
  
    
    
    
}
