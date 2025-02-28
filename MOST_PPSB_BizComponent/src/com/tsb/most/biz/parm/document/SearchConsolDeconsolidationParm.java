package com.tsb.most.biz.parm.document;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchConsolDeconsolidationParm extends BaseBizParm{
	private String vslCallId;
	private String blNo;
	private String snNo;
	private String getInFromTime;
	private String getInToTime;
	private String getOutFromTime;
	private String getOutToTime;
	private String cargoStatus;
	private String mfDocId;
	
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getSnNo() {
		return snNo;
	}
	public void setSnNo(String snNo) {
		this.snNo = snNo;
	}
	public String getCargoStatus() {
		return cargoStatus;
	}
	public void setCargoStatus(String cargoStatus) {
		this.cargoStatus = cargoStatus;
	}
	public String getGetInFromTime() {
		return getInFromTime;
	}
	public void setGetInFromTime(String getInFromTime) {
		this.getInFromTime = getInFromTime;
	}
	public String getGetInToTime() {
		return getInToTime;
	}
	public void setGetInToTime(String getInToTime) {
		this.getInToTime = getInToTime;
	}
	public String getGetOutFromTime() {
		return getOutFromTime;
	}
	public void setGetOutFromTime(String getOutFromTime) {
		this.getOutFromTime = getOutFromTime;
	}
	public String getGetOutToTime() {
		return getOutToTime;
	}
	public void setGetOutToTime(String getOutToTime) {
		this.getOutToTime = getOutToTime;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
}
