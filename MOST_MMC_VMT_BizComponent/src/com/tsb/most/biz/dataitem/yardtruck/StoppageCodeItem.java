package com.tsb.most.biz.dataitem.yardtruck;

import com.tsb.most.framework.dataitem.DataItem;

public class StoppageCodeItem extends DataItem {
	private static final long serialVersionUID = 7981847957529964727L;
	
	private String stoppageCd = "";
	private String stoppageDesc = "";
	private String stopSTime = "";
	
	public String getStoppageCd() {
		return stoppageCd;
	}
	public void setStoppageCd(String stoppageCd) {
		this.stoppageCd = stoppageCd;
	}
	public String getStopSTime() {
		return stopSTime;
	}
	public void setStopSTime(String stopSTime) {
		this.stopSTime = stopSTime;
	}
	public String getStoppageDesc() {
		return stoppageDesc;
	}
	public void setStoppageDesc(String stoppageDesc) {
		this.stoppageDesc = stoppageDesc;
	}
	
}
