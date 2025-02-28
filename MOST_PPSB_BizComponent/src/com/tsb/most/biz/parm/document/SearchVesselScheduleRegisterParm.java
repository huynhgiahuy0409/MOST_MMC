package com.tsb.most.biz.parm.document;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchVesselScheduleRegisterParm extends BaseBizParm{
	private String userId;
	private String eta;
	private String etd;
	private String vslCallId;
	private String vslNm;
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	private String scn;
	private String summitStt;
	private String rqFrshWt;
	private String rqChdl;
	private String locCd;
	private String berthCd;
	private String shipPort;
	private String saCorpId;
	private String rqQtyBkr;
	private String vslCd;
	private String timeP;
	private String imoNo;
	private String shipOffNo;
	private String shaCd;
	
	public String getTimeP() {
		return timeP;
	}
	public void setTimeP(String timeP) {
		this.timeP = timeP;
	}
	public String getVslCd() {
		return vslCd;
	}
	public String getCallSeq() {
		return callSeq;
	}
	public String getCallYear() {
		return callYear;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	private String callSeq;
	private String callYear;
	public String getUserId() {
		return userId;
	}
	public String getEta() {
		return eta;
	}
	public String getEtd() {
		return etd;
	}
	public String getvslCallId() {
		return vslCallId;
	}
	public String getScn() {
		return scn;
	}
	public String getSummitStt() {
		return summitStt;
	}
	public String getRqFrshWt() {
		return rqFrshWt;
	}
	public String getRqChdl() {
		return rqChdl;
	}
	public String getLocCd() {
		return locCd;
	}
	public String getBerthCd() {
		return berthCd;
	}
	public String getShipPort() {
		return shipPort;
	}
	public String getSaCorpId() {
		return saCorpId;
	}
	public String getRqQtyBkr() {
		return rqQtyBkr;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public void setEta(String eta) {
		this.eta = eta;
	}
	public void setEtd(String etd) {
		this.etd = etd;
	}
	public void setvslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	public void setSummitStt(String summitStt) {
		this.summitStt = summitStt;
	}
	public void setRqFrshWt(String rqFrshWt) {
		this.rqFrshWt = rqFrshWt;
	}
	public void setRqChdl(String rqChdl) {
		this.rqChdl = rqChdl;
	}
	public void setLocCd(String locCd) {
		this.locCd = locCd;
	}
	public void setBerthCd(String berthCd) {
		this.berthCd = berthCd;
	}
	public void setShipPort(String shipPort) {
		this.shipPort = shipPort;
	}
	public void setSaCorpId(String saCorpId) {
		this.saCorpId = saCorpId;
	}
	public void setRqQtyBkr(String rqQtyBkr) {
		this.rqQtyBkr = rqQtyBkr;
	}
	public String getImoNo() {
		return imoNo;
	}
	public void setImoNo(String imoNo) {
		this.imoNo = imoNo;
	}
	public String getShipOffNo() {
		return shipOffNo;
	}
	public void setShipOffNo(String shipOffNo) {
		this.shipOffNo = shipOffNo;
	}
	public String getShaCd() {
		return shaCd;
	}
	public void setShaCd(String shaCd) {
		this.shaCd = shaCd;
	}
}
