package com.tsb.most.biz.parm.report;

import com.tsb.most.framework.bizparm.BaseBizParm;


public class SearchCargoInterchangeReceiptParm extends BaseBizParm {

	private String vslCallId;
	private String lorryNo;
	private String gateTxnNo;
	private String sdoNo;
	private String grNo;
	private String vslCd;
	
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}
	public String getGateTxnNo() {
		return gateTxnNo;
	}
	public void setGateTxnNo(String gateTxnNo) {
		this.gateTxnNo = gateTxnNo;
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
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
}
