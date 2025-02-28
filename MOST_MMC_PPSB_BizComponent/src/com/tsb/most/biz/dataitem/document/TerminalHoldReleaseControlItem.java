package com.tsb.most.biz.dataitem.document;

import com.tsb.most.framework.dataitem.DataItem;

public class TerminalHoldReleaseControlItem extends DataItem {
    private String vslCallId;
    private String vslNm;
    private String vslCd;
    private String callYear;
    private String callSeq;
    private String scn;
    private String masterBl;
    private String bookingNo;
    private String docNo;
    private String holdCheck;
    private String holdReasonCd;
    
    private String holdBy;
    private String holdDt;
    
    private String releaseCheck;
    private String releaseDt;
    private String releaseBy;
    private String ie;
    private String mt;
    private String pol;
    private String pod;

    private String remark;
    private String holdReasonDesc;
    private int seq;
    private String cudFlag;
    
    private String cgNo;
    private String cd;
    private String cdNm;
    private String sunatYn;
    private String vinNo;
    
    //add Hold Remark, Release Remark
    private String holdRemark;
    private String releaseRemark;
    
    private String opToBeStopped;
    private String opToBeStoppedNm;
    
    private String yardLoc;
    private String ableToReleaseYn;
    private String vslTp;
    
	public String getYardLoc() {
		return yardLoc;
	}
	public void setYardLoc(String yardLoc) {
		this.yardLoc = yardLoc;
	}
	public String getOpToBeStopped() {
		return opToBeStopped;
	}
	public void setOpToBeStopped(String opToBeStopped) {
		this.opToBeStopped = opToBeStopped;
	}
	public String getHoldRemark() {
		return holdRemark;
	}
	public void setHoldRemark(String holdRemark) {
		this.holdRemark = holdRemark;
	}
	public String getReleaseRemark() {
		return releaseRemark;
	}
	public void setReleaseRemark(String releaseRemark) {
		this.releaseRemark = releaseRemark;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
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
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	public String getMasterBl() {
		return masterBl;
	}
	public void setMasterBl(String masterBl) {
		this.masterBl = masterBl;
	}
	public String getBookingNo() {
		return bookingNo;
	}
	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}
	public String getDocNo() {
		return docNo;
	}
	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}
	public String getHoldCheck() {
		return holdCheck;
	}
	public void setHoldCheck(String holdCheck) {
		this.holdCheck = holdCheck;
	}
	public String getHoldReasonCd() {
		return holdReasonCd;
	}
	public void setHoldReasonCd(String holdReasonCd) {
		this.holdReasonCd = holdReasonCd;
	}
	public String getReleaseCheck() {
		return releaseCheck;
	}
	public void setReleaseCheck(String releaseCheck) {
		this.releaseCheck = releaseCheck;
	}
	public String getIe() {
		return ie;
	}
	public void setIe(String ie) {
		this.ie = ie;
	}
	public String getMt() {
		return mt;
	}
	public void setMt(String mt) {
		this.mt = mt;
	}
	public String getPol() {
		return pol;
	}
	public void setPol(String pol) {
		this.pol = pol;
	}
	public String getPod() {
		return pod;
	}
	public void setPod(String pod) {
		this.pod = pod;
	}

	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getHoldBy() {
		return holdBy;
	}
	public void setHoldBy(String holdBy) {
		this.holdBy = holdBy;
	}
	public String getHoldDt() {
		return holdDt;
	}
	public void setHoldDt(String holdDt) {
		this.holdDt = holdDt;
	}
	public String getReleaseDt() {
		return releaseDt;
	}
	public void setReleaseDt(String releaseDt) {
		this.releaseDt = releaseDt;
	}
	public String getReleaseBy() {
		return releaseBy;
	}
	public void setReleaseBy(String releaseBy) {
		this.releaseBy = releaseBy;
	}
	public String getHoldReasonDesc() {
		return holdReasonDesc;
	}
	public void setHoldReasonDesc(String holdReasonDesc) {
		this.holdReasonDesc = holdReasonDesc;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getCudFlag() {
		return cudFlag;
	}
	public void setCudFlag(String cudFlag) {
		this.cudFlag = cudFlag;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getCd() {
		return cd;
	}
	public void setCd(String cd) {
		this.cd = cd;
	}
	public String getCdNm() {
		return cdNm;
	}
	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
	}
	public String getSunatYn() {
		return sunatYn;
	}
	public void setSunatYn(String sunatYn) {
		this.sunatYn = sunatYn;
	}
	public String getVinNo() {
		return vinNo;
	}
	public void setVinNo(String vinNo) {
		this.vinNo = vinNo;
	}
	public String getOpToBeStoppedNm() {
		return opToBeStoppedNm;
	}
	public void setOpToBeStoppedNm(String opToBeStoppedNm) {
		this.opToBeStoppedNm = opToBeStoppedNm;
	}
	public String getAbleToReleaseYn() {
		return ableToReleaseYn;
	}
	public void setAbleToReleaseYn(String ableToReleaseYn) {
		this.ableToReleaseYn = ableToReleaseYn;
	}
	public String getVslTp() {
		return vslTp;
	}
	public void setVslTp(String vslTp) {
		this.vslTp = vslTp;
	}
}

