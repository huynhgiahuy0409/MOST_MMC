package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchVORLiquidBulkParm extends BaseBizParm{
    
    private String vslCallId;
    private String workYmd;		// Date
    private String shift;		// Shift
    private String cgTpCd;		// For getting information from Confirmation Slip 2: terminal operator
    private String vslCd;		// Vessel Code
    private String vslNm;		// Vessel Name
    private String inbVoy;		// Inb Voyage
    private String outbVoy;		// Shift
    private String shipgAgnt;	// Shipping Agent
    private String eta;			// eta
    private String etd;			// etd
    private String berthLoc;	// Berching Location
    private String storageLoc;	// storage Location
    private String scnNo;		// scn No.
    private String searchType;	// SearchType
    private String insertType;	// SearchType
    private String shftNm;
    
	private String jobTpCd ; 	// For getting information from Confirmation Slip 2: Job Type Code Loading - Discharging
    private String tkOpr ;		// For getting information from Confirmation Slip 2: terminal operator
     
    private String opeTp;
    private String fender;
    private String hoseTpCd;
    private String cmdtCd;
    
    private String seq;
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
    private String atb;
    private String atw;
    private String atc;
    private String atu;
    private String cgNo;
    private String catgCd;
    private String sdoNo;
    private String grNo;
    
    private String downloadTp;

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
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

	public String getCgTpCd() {
		return cgTpCd;
	}

	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}

	public String getVslCd() {
		return vslCd;
	}

	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
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

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
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

	public String getOpeTp() {
		return opeTp;
	}

	public void setOpeTp(String opeTp) {
		this.opeTp = opeTp;
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

	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
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

	public String getAtb() {
		return atb;
	}

	public void setAtb(String atb) {
		this.atb = atb;
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

	public String getCgNo() {
		return cgNo;
	}

	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}

	public String getCatgCd() {
		return catgCd;
	}

	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}

	public String getSdoNo() {
		return sdoNo;
	}

	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}

	public String getGrNo() {
		return grNo;
	}

	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
    
   
}
