/**
* VesselScheduleParm.java
*
* Created on   : 2007-07-03
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-07-03   Mr Yang-Min Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;
/**
 * @author kimyangmin
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchVesselScheduleParm extends BaseBizParm{
    private String vslTp;
    private String etaFrom;
    private String etaTo;
    private String sumitDt;
    private String jpvcNo;
    private String cgTpCd;
    private String planned;
    private String vslStatus;
    private String searchType;
    private String atb;
    private String alertYn;
    private String dbYn;
    private String schStatus;
    private String atdYn;
    private int curPage;
    private String pagingSearchType;
    private int pageSize;
    private int test1;
    private int test2;
    private String startRow;
    private String endRow; 
    private String rptTp;
    private String rptNm;
    private String rptLoc;
    private String ptnrCd;
    private String alertTp;
    private String locCd;
    
    private String vslCallId;
    private String cargoType;
    private int seq;
    private String vslCd;
    private String callYear;
    private String callSeq;
    private String docId;
    private String pgmId;
    private String catgCd;
    private String workYmd;
    private String shift;
    private String opeTp;
    
    private String vslNm;		// Vessel Name
    private String inbVoy;		// Inb Voyage
    private String outbVoy;		// Shift
    private String shipgAgnt;	// Shipping Agent
    private String eta;			// eta
    private String etd;			// etd
    private String berthLoc;	// Berching Location
    private String storageLoc;	// storage Location
    private String scnNo;		// scn No.
    private String insertType;	// SearchType
    private String shftNm;
	private String jobTpCd ; 	// For getting information from Confirmation Slip 2: Job Type Code Loading - Discharging
    private String tkOpr ;		// For getting information from Confirmation Slip 2: terminal operator
    private String fender;
    private String hoseTpCd;
    private String cmdtCd;
    private String hoseOnDt;
    private String hoseOffDt;
    private String commenceDt;
    private String completeDt;
    private String fromDate;
    private String toDate;
    private String reportId;
    private String endDate;
    private String shprCnsne;
    private String cnsne;
    private String comboType;
    private String etb;
    private String atw;
    private String atc;
    private String atu;
    private String downloadTp;
    
    private String blNo;
    
   
	public String getStartRow() {
        return startRow;
    }
    public void setStartRow(String startRow) {
        this.startRow = startRow;
    }
    public String getEndRow() {
        return endRow;
    }
    public void setEndRow(String endRow) {
        this.endRow = endRow;
    }
    
    public String getLocCd() {
        return locCd;
    }
    public void setLocCd(String locCd) {
        this.locCd = locCd;
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
    public String getAtdYn() {
        return atdYn;
    }
    public void setAtdYn(String atdYn) {
        this.atdYn = atdYn;
    }
    public String getSchStatus() {
        return schStatus;
    }
    public void setSchStatus(String schStatus) {
        this.schStatus = schStatus;
    }
    public String getDbYn() {
        return dbYn;
    }
    public void setDbYn(String dbYn) {
        this.dbYn = dbYn;
    }
    public String getAlertYn() {
        return alertYn;
    }
    public void setAlertYn(String alertYn) {
        this.alertYn = alertYn;
    }
    public String getAtb() {
        return atb;
    }
    public void setAtb(String atb) {
        this.atb = atb;
    }
	public SearchVesselScheduleParm(){
	    
	}
	
    public String getVslTp() {
        return vslTp;
    }
    
    public void setVslTp(String vslTp) {
        this.vslTp = vslTp;
    }
    
    public String getEtaFrom() {
        return etaFrom;
    }
    
    public void setEtaFrom(String etaFrom) {
        this.etaFrom = etaFrom;
    }
    
    public String getEtaTo() {
        return etaTo;
    }
    
    public void setEtaTo(String etaTo) {
        this.etaTo = etaTo;
    }
    
    public String getJpvcNo() {
        return jpvcNo;
    }
    
    public void setJpvcNo(String jpvcNo) {
        this.jpvcNo = jpvcNo;
    }
    
    public String getSumitDt() {
        return sumitDt;
    }
    
    public void setSumitDt(String sumitDt) {
        this.sumitDt = sumitDt;
    }
    
    public String getCgTpCd(){
        return this.cgTpCd;
    }
    
    public void setCgTpCd(String cgTpCd){
        this.cgTpCd = cgTpCd;
    }
    
    public String getPlanned(){
        return this.planned;
    }
    
    public void setPlanned(String planned){
        this.planned = planned;
    }    
        
    public String getVslStatus(){
        return this.vslStatus;
    }
    
    public void setVslStatus(String vslStatus){
        this.vslStatus = vslStatus;
    } 
    
    public String getSearchType(){
        return this.searchType;
    }
    
    public void setSearchType(String searchType){
        this.searchType = searchType;
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
    public int getCurPage() {
        return curPage;
    }
    public void setCurPage(int curPage) {
        this.curPage = curPage;
    }
    public String getAlertTp() {
        return alertTp;
    }
    public void setAlertTp(String alertTp) {
        this.alertTp = alertTp;
    }
	public String getRptTp() {
		return rptTp;
	}
	public void setRptTp(String rptTp) {
		this.rptTp = rptTp;
	}
	public String getRptNm() {
		return rptNm;
	}
	public void setRptNm(String rptNm) {
		this.rptNm = rptNm;
	}
	public String getRptLoc() {
		return rptLoc;
	}
	public void setRptLoc(String rptLoc) {
		this.rptLoc = rptLoc;
	}
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getCargoType() {
		return cargoType;
	}
	public void setCargoType(String cargoType) {
		this.cargoType = cargoType;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getCallYear() {
		return callYear;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	public String getCallSeq() {
		return callSeq;
	}
	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}
	public String getDocId() {
		return docId;
	}
	public void setDocId(String docId) {
		this.docId = docId;
	}
	public String getPgmId() {
		return pgmId;
	}
	public void setPgmId(String pgmId) {
		this.pgmId = pgmId;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getWorkYmd() {
		return workYmd;
	}
	public void setWorkYmd(String workYmd) {
		this.workYmd = workYmd;
	}
	public String getShift() {
		return shift;
	}
	public void setShift(String shift) {
		this.shift = shift;
	}
	public String getOpeTp() {
		return opeTp;
	}
	public void setOpeTp(String opeTp) {
		this.opeTp = opeTp;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getInbVoy() {
		return inbVoy;
	}
	public void setInbVoy(String inbVoy) {
		this.inbVoy = inbVoy;
	}
	public String getOutbVoy() {
		return outbVoy;
	}
	public void setOutbVoy(String outbVoy) {
		this.outbVoy = outbVoy;
	}
	public String getShipgAgnt() {
		return shipgAgnt;
	}
	public void setShipgAgnt(String shipgAgnt) {
		this.shipgAgnt = shipgAgnt;
	}
	public String getEta() {
		return eta;
	}
	public void setEta(String eta) {
		this.eta = eta;
	}
	public String getEtd() {
		return etd;
	}
	public void setEtd(String etd) {
		this.etd = etd;
	}
	public String getBerthLoc() {
		return berthLoc;
	}
	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}
	public String getStorageLoc() {
		return storageLoc;
	}
	public void setStorageLoc(String storageLoc) {
		this.storageLoc = storageLoc;
	}
	public String getScnNo() {
		return scnNo;
	}
	public void setScnNo(String scnNo) {
		this.scnNo = scnNo;
	}
	public String getInsertType() {
		return insertType;
	}
	public void setInsertType(String insertType) {
		this.insertType = insertType;
	}
	public String getShftNm() {
		return shftNm;
	}
	public void setShftNm(String shftNm) {
		this.shftNm = shftNm;
	}
	public String getJobTpCd() {
		return jobTpCd;
	}
	public void setJobTpCd(String jobTpCd) {
		this.jobTpCd = jobTpCd;
	}
	public String getTkOpr() {
		return tkOpr;
	}
	public void setTkOpr(String tkOpr) {
		this.tkOpr = tkOpr;
	}
	public String getFender() {
		return fender;
	}
	public void setFender(String fender) {
		this.fender = fender;
	}
	public String getHoseTpCd() {
		return hoseTpCd;
	}
	public void setHoseTpCd(String hoseTpCd) {
		this.hoseTpCd = hoseTpCd;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getHoseOnDt() {
		return hoseOnDt;
	}
	public void setHoseOnDt(String hoseOnDt) {
		this.hoseOnDt = hoseOnDt;
	}
	public String getHoseOffDt() {
		return hoseOffDt;
	}
	public void setHoseOffDt(String hoseOffDt) {
		this.hoseOffDt = hoseOffDt;
	}
	public String getCommenceDt() {
		return commenceDt;
	}
	public void setCommenceDt(String commenceDt) {
		this.commenceDt = commenceDt;
	}
	public String getCompleteDt() {
		return completeDt;
	}
	public void setCompleteDt(String completeDt) {
		this.completeDt = completeDt;
	}
	public String getFromDate() {
		return fromDate;
	}
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
	public String getReportId() {
		return reportId;
	}
	public void setReportId(String reportId) {
		this.reportId = reportId;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getShprCnsne() {
		return shprCnsne;
	}
	public void setShprCnsne(String shprCnsne) {
		this.shprCnsne = shprCnsne;
	}
	public String getCnsne() {
		return cnsne;
	}
	public void setCnsne(String cnsne) {
		this.cnsne = cnsne;
	}
	public String getComboType() {
		return comboType;
	}
	public void setComboType(String comboType) {
		this.comboType = comboType;
	}
	public String getEtb() {
		return etb;
	}
	public void setEtb(String etb) {
		this.etb = etb;
	}
	public String getAtw() {
		return atw;
	}
	public void setAtw(String atw) {
		this.atw = atw;
	}
	public String getAtc() {
		return atc;
	}
	public void setAtc(String atc) {
		this.atc = atc;
	}
	public String getAtu() {
		return atu;
	}
	public void setAtu(String atu) {
		this.atu = atu;
	}
	public String getDownloadTp() {
		return downloadTp;
	}
	public void setDownloadTp(String downloadTp) {
		this.downloadTp = downloadTp;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
}
