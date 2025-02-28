/**
* SpcMovRequestParm.java
*
* Created on   : 2008-01-28
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.3 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2008-01-28   Mr Sung-Yong Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchSpaceMovementPlanParm extends BaseBizParm {
    private String reqr;
    private String reqSeq;
    private String reqNo;
    private String seq;
    private String reqTpCd;
    private String statCd;
    private String reqStDt;
    private String reqEndDt;
    private String planStDt;
    private String planEndDt;
    private String vslCallId;
    private String vslCd;
    private String shipgNoteNo;
    private String mfDocId;
    
    private String blNo;
    private String grNo;
    private String reqYn;
    private String searchType; //Search Type
    private Boolean isNotPlanned;
    private String jpvcTp;
    private String estArrStDt;
    private String estArrEndDt;
    private String reqPos;
    private String alertYn;
    
    private String delvTpCd;
    private String authority;
    private String cgInOutTp;
    
    private String masterBL;
	private String bookingNo;
	private String cmdtGrpCd;
	private String cngShp;
	private String pod;
    
    private String isPlanned;
    private String planLocId;
    private String lotNo;
    private String sdoNo;
    private String cgTpCd;
    private String scn;
    
	public String getReqr() {
		return reqr;
	}

	public void setReqr(String reqr) {
		this.reqr = reqr;
	}

	public String getReqSeq() {
		return reqSeq;
	}

	public void setReqSeq(String reqSeq) {
		this.reqSeq = reqSeq;
	}

	public String getReqNo() {
		return reqNo;
	}

	public void setReqNo(String reqNo) {
		this.reqNo = reqNo;
	}

	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
	}

	public String getReqTpCd() {
		return reqTpCd;
	}

	public void setReqTpCd(String reqTpCd) {
		this.reqTpCd = reqTpCd;
	}

	public String getStatCd() {
		return statCd;
	}

	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}

	public String getReqStDt() {
		return reqStDt;
	}

	public void setReqStDt(String reqStDt) {
		this.reqStDt = reqStDt;
	}

	public String getReqEndDt() {
		return reqEndDt;
	}

	public void setReqEndDt(String reqEndDt) {
		this.reqEndDt = reqEndDt;
	}

	public String getPlanStDt() {
		return planStDt;
	}

	public void setPlanStDt(String planStDt) {
		this.planStDt = planStDt;
	}

	public String getPlanEndDt() {
		return planEndDt;
	}

	public void setPlanEndDt(String planEndDt) {
		this.planEndDt = planEndDt;
	}

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}

	public String getShipgNoteNo() {
		return shipgNoteNo;
	}

	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}

	public String getBlNo() {
		return blNo;
	}

	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}

	public String getGrNo() {
		return grNo;
	}

	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}

	public String getReqYn() {
		return reqYn;
	}

	public void setReqYn(String reqYn) {
		this.reqYn = reqYn;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public Boolean getIsNotPlanned() {
		return isNotPlanned;
	}

	public void setIsNotPlanned(Boolean isNotPlanned) {
		this.isNotPlanned = isNotPlanned;
	}

	public String getJpvcTp() {
		return jpvcTp;
	}

	public void setJpvcTp(String jpvcTp) {
		this.jpvcTp = jpvcTp;
	}

	public String getEstArrStDt() {
		return estArrStDt;
	}

	public void setEstArrStDt(String estArrStDt) {
		this.estArrStDt = estArrStDt;
	}

	public String getEstArrEndDt() {
		return estArrEndDt;
	}

	public void setEstArrEndDt(String estArrEndDt) {
		this.estArrEndDt = estArrEndDt;
	}

	public String getReqPos() {
		return reqPos;
	}

	public void setReqPos(String reqPos) {
		this.reqPos = reqPos;
	}

	public String getAlertYn() {
		return alertYn;
	}

	public void setAlertYn(String alertYn) {
		this.alertYn = alertYn;
	}

	public String getDelvTpCd() {
		return delvTpCd;
	}

	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	public String getCgInOutTp() {
		return cgInOutTp;
	}

	public void setCgInOutTp(String cgInOutTp) {
		this.cgInOutTp = cgInOutTp;
	}

	public String getMasterBL() {
		return masterBL;
	}

	public void setMasterBL(String masterBL) {
		this.masterBL = masterBL;
	}

	public String getBookingNo() {
		return bookingNo;
	}

	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}

	public String getCmdtGrpCd() {
		return cmdtGrpCd;
	}

	public void setCmdtGrpCd(String cmdtGrpCd) {
		this.cmdtGrpCd = cmdtGrpCd;
	}

	public String getCngShp() {
		return cngShp;
	}

	public void setCngShp(String cngShp) {
		this.cngShp = cngShp;
	}

	public String getPod() {
		return pod;
	}

	public void setPod(String pod) {
		this.pod = pod;
	}

	public String getIsPlanned() {
		return isPlanned;
	}

	public void setIsPlanned(String isPlanned) {
		this.isPlanned = isPlanned;
	}

	public String getPlanLocId() {
		return planLocId;
	}

	public void setPlanLocId(String planLocId) {
		this.planLocId = planLocId;
	}

	public String getLotNo() {
		return lotNo;
	}

	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}

	public String getSdoNo() {
		return sdoNo;
	}

	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}

	public String getCgTpCd() {
		return cgTpCd;
	}

	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}

	public String getScn() {
		return scn;
	}

	public void setScn(String scn) {
		this.scn = scn;
	}

	public String getVslCd() {
		return vslCd;
	}

	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}

	public String getMfDocId() {
		return mfDocId;
	}

	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
}
