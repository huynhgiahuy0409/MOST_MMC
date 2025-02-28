package com.tsb.most.biz.dataitem.configuration;

import com.tsb.most.framework.dataitem.DataItem;

public class BerthBittListItem extends DataItem{

	private String berthCd;
	private String berthNm;
    private String bittCd;
    private String xpos;
    private String ypos;
	private String updUserId;
	private String updDtm;
    
	public String getBerthCd() {
		return berthCd;
	}
	public void setBerthCd(String berthCd) {
		this.berthCd = berthCd;
	}
	public String getBerthNm() {
		return berthNm;
	}
	public void setBerthNm(String berthNm) {
		this.berthNm = berthNm;
	}
	public String getBittCd() {
		return bittCd;
	}
	public void setBittCd(String bittCd) {
		this.bittCd = bittCd;
	}
	public String getXpos() {
		return xpos;
	}
	public void setXpos(String xpos) {
		this.xpos = xpos;
	}
	public String getYpos() {
		return ypos;
	}
	public void setYpos(String ypos) {
		this.ypos = ypos;
	}
	public String getUpdUserId() {
		return updUserId;
	}
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}
	public String getUpdDtm() {
		return updDtm;
	}
	public void setUpdDtm(String updDtm) {
		this.updDtm = updDtm;
	}
}
