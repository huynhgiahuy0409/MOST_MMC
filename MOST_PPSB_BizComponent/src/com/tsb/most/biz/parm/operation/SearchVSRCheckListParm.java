/**
 * ListVORParm.java
 * <p>
 * Created on   : 2007-12-31
 * Target OS    : Java VM 1.4.2
 * CVS revision : $Revision: 1.1 $
 * <p>
 * ------------------------------
 * CHANGE REVISION
 * ------------------------------
 * DATE           AUTHOR      	           REVISION
 * 2007-10-01   Miss Nam-Sook Chang 1.0    First release.
 * -------------------------------
 * CLASS DESCRIPTION
 * -------------------------------
 */
package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author admin
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchVSRCheckListParm extends BaseBizParm {
    private String vslCallID;
    private String shftId;
    private String workYmd;
    private String divCd;
    private String eqDivCd;
    private String searchType;
    private String eqTp;
    private String eqNo;
    private String roleCd;
    private String workStDt;
    private String workEndDt;
    private String empId;
    private String purpose;
    private String rsNm;
    private String workingArea;
    private String searchStevedore;
    private String searchNonCallId;
    private String searchSum;
    private int curPage;
    private String pagingSearchType;
    private int pageSize;
    private int test1;
    private int test2;
    private String requester;
    private String cnrtcd_temp;
    private String mbscd_temp;
    private String searchReport;
    private String comboType;
    private String srcNm;
    private String vslNm;
    private String shftNm;
    private String userId;
    private String reportId;
    private String berthLoc;
    private String cgTpNm;
    private String atb;
    private String stgLoc;
    private String sa;
    private int seq;

    private String exportTp;

    private String printTp;

    public String getPrintTp() {
        return printTp;
    }

    public void setPrintTp(String printTp) {
        this.printTp = printTp;
    }

    private String lcd;
    private String mcd;
    private String scdLgv;
    private String col3;
    private String scdUse;

    public int getSeq() {
        return seq;
    }

    public void setSeq(int seq) {
        this.seq = seq;
    }

    public String getSa() {
        return sa;
    }

    public void setSa(String sa) {
        this.sa = sa;
    }

    public String getAtb() {
        return atb;
    }

    public String getStgLoc() {
        return stgLoc;
    }

    public void setAtb(String atb) {
        this.atb = atb;
    }

    public void setStgLoc(String stgLoc) {
        this.stgLoc = stgLoc;
    }

    public String getCgTpNm() {
        return cgTpNm;
    }

    public void setCgTpNm(String cgTpNm) {
        this.cgTpNm = cgTpNm;
    }

    public String getBerthLoc() {
        return berthLoc;
    }

    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }

    public String getUserId() {
        return userId;
    }

    public String getReportId() {
        return reportId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }

    public String getShftNm() {
        return shftNm;
    }

    public void setShftNm(String shftNm) {
        this.shftNm = shftNm;
    }

    public String getVslNm() {
        return vslNm;
    }

    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }

    public String getSrcNm() {
        return srcNm;
    }

    public void setSrcNm(String srcNm) {
        this.srcNm = srcNm;
    }

    public String getComboType() {
        return comboType;
    }

    public void setComboType(String comboType) {
        this.comboType = comboType;
    }

    public String getSearchReport() {
        return searchReport;
    }

    public void setSearchReport(String searchReport) {
        this.searchReport = searchReport;
    }

    public String getCnrtcd_temp() {
        return cnrtcd_temp;
    }

    public void setCnrtcd_temp(String cnrtcd_temp) {
        this.cnrtcd_temp = cnrtcd_temp;
    }

    public String getRequester() {
        return requester;
    }

    public void setRequester(String requester) {
        this.requester = requester;
    }

    public int getTest1() {
        return test1;
    }

    public void setTest1(int test1) {
        this.test1 = test1;
    }

    public int getTest2() {
        return test2;
    }

    public void setTest2(int test2) {
        this.test2 = test2;
    }

    /**
     * @return Returns the searchSum.
     */
    public String getSearchSum() {
        return searchSum;
    }

    /**
     * @param searchSum The searchSum to set.
     */
    public void setSearchSum(String searchSum) {
        this.searchSum = searchSum;
    }

    /**
     * @return Returns the searchNonCallId.
     */
    public String getSearchNonCallId() {
        return searchNonCallId;
    }

    /**
     * @param searchNonCallId The searchNonCallId to set.
     */
    public void setSearchNonCallId(String searchNonCallId) {
        this.searchNonCallId = searchNonCallId;
    }

    public String getWorkingArea() {
        return workingArea;
    }

    public void setWorkingArea(String workingArea) {
        this.workingArea = workingArea;
    }

    public String getRsNm() {
        return rsNm;
    }

    public void setRsNm(String rsNm) {
        this.rsNm = rsNm;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getEqDivCd() {
        return eqDivCd;
    }

    public void setEqDivCd(String eqDivCd) {
        this.eqDivCd = eqDivCd;
    }

    public String getSearchType() {
        return searchType;
    }

    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }

    public String getDivCd() {
        return divCd;
    }

    public void setDivCd(String divCd) {
        this.divCd = divCd;
    }

    public String getShftId() {
        return shftId;
    }

    public void setShftId(String shftId) {
        this.shftId = shftId;
    }

    public String getVslCallID() {
        return vslCallID;
    }

    public void setVslCallID(String vslCallID) {
        this.vslCallID = vslCallID;
    }

    public String getWorkYmd() {
        return workYmd;
    }

    public void setWorkYmd(String workYmd) {
        this.workYmd = workYmd;
    }

    public String getEqTp() {
        return eqTp;
    }

    public void setEqTp(String eqTp) {
        this.eqTp = eqTp;
    }

    public String getEqNo() {
        return eqNo;
    }

    public void setEqNo(String eqNo) {
        this.eqNo = eqNo;
    }

    public String getRoleCd() {
        return roleCd;
    }

    public void setRoleCd(String roleCd) {
        this.roleCd = roleCd;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getWorkEndDt() {
        return workEndDt;
    }

    public void setWorkEndDt(String workEndDt) {
        this.workEndDt = workEndDt;
    }

    public String getWorkStDt() {
        return workStDt;
    }

    public void setWorkStDt(String workStDt) {
        this.workStDt = workStDt;
    }

    /**
     * @return Returns the searchStevedore.
     */
    public String getSearchStevedore() {
        return searchStevedore;
    }

    /**
     * @param searchStevedore The searchStevedore to set.
     */
    public void setSearchStevedore(String searchStevedore) {
        this.searchStevedore = searchStevedore;
    }

    public int getCurPage() {
        return curPage;
    }

    public void setCurPage(int curPage) {
        this.curPage = curPage;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public String getPagingSearchType() {
        return pagingSearchType;
    }

    public void setPagingSearchType(String pagingSearchType) {
        this.pagingSearchType = pagingSearchType;
    }

    public String getMbscd_temp() {
        return mbscd_temp;
    }

    public void setMbscd_temp(String mbscd_temp) {
        this.mbscd_temp = mbscd_temp;
    }

    public String getExportTp() {
        return exportTp;
    }

    public void setExportTp(String exportTp) {
        this.exportTp = exportTp;
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

    public String getScdLgv() {
        return scdLgv;
    }

    public void setScdLgv(String scdLgv) {
        this.scdLgv = scdLgv;
    }

    public String getCol3() {
        return col3;
    }

    public void setCol3(String col3) {
        this.col3 = col3;
    }

    public String getScdUse() {
        return scdUse;
    }

    public void setScdUse(String scdUse) {
        this.scdUse = scdUse;
    }
}
