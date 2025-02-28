package com.tsb.most.biz.parm.codes;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchBerthBittListParm extends BaseBizParm {
	private String berthCd;
	private String bittCd;
	private String xPos;
    private String yPos;
	
	public String getBerthCd() {
		return berthCd;
	}
	public void setBerthCd(String berthCd) {
		this.berthCd = berthCd;
	}
	public String getBittCd() {
		return bittCd;
	}
	public void setBittCd(String bittCd) {
		this.bittCd = bittCd;
	}
	public String getxPos() {
		return xPos;
	}
	public void setxPos(String xPos) {
		this.xPos = xPos;
	}
	public String getyPos() {
		return yPos;
	}
	public void setyPos(String yPos) {
		this.yPos = yPos;
	}
}
