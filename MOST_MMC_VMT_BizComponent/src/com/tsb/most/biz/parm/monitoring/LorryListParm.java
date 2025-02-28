package com.tsb.most.biz.parm.monitoring;

import com.tsb.most.framework.bizparm.BaseBizParm;
/**
 * @author lamthanhtung
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class LorryListParm extends BaseBizParm  {

    private String VSLCALLID;
    private String BLNO;
    private String ESTDT; 
    private String TSPTCD;
    private String LORRYNO;
    private String DRIVER;
    private String EXPRDT;
    private String searchType;
    private String LICSNO;
    private String GATEINDT;
    private String ptnrCd;
    private String aplyYmd;
    private String SNNO;
    private String exprYmd;
    private String GATEOUTDT;
    private String noGate;
    private String DRIVERID;
    private String SEQ;
    
    private String chkParm;
   
    
    //Added by Chris 2015-03-30 for Warehouse Checker
    private String grNo;
    
    //Added by Chris 2015-03-30 for Warehouse Checker
    public String getGrNo() {
        return grNo;
    }
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
    
    //added by William (2015/07/21) Mantis issue 49799
    private String LORRYID;

    public String getDRIVERID() {
        return DRIVERID;
    }
    public void setDRIVERID(String driverid) {
        DRIVERID = driverid;
    }
   
    public String getNoGate() {
        return noGate;
    }
    public void setNoGate(String noGate) {
        this.noGate = noGate;
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
    public String getPtnrCd() {
        return ptnrCd;
    }
    public void setPtnrCd(String ptnrCd) {
        this.ptnrCd = ptnrCd;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getSNNO() {
        return SNNO;
    }
    public void setSNNO(String NO) {
        SNNO = NO;
    }
   
    public String getVSLCALLID() {
        return VSLCALLID;
    }
    public void setVSLCALLID(String vslcallid) {
        VSLCALLID = vslcallid;
    }
    public String getSEQ() {
        return SEQ;
    }
    public void setSEQ(String seq) {
        SEQ = seq;
    }
    public String getTSPTCD() {
        return TSPTCD;
    }
    public void setTSPTCD(String tsptcd) {
        TSPTCD = tsptcd;
    }
    public String getLORRYID() {
        return LORRYID;
    }
    public void setLORRYID(String lorryid) {
        LORRYID = lorryid;
    }
    public String getChkParm() {
        return chkParm;
    }
    public void setChkParm(String chkParm) {
        this.chkParm = chkParm;
    }
}
