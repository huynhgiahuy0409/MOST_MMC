package com.tsb.most.biz.dataitem.yardtruck;

import com.tsb.most.framework.dataitem.DataItem;

public class StoppageItem extends DataItem {
	private static final long serialVersionUID = 7981847957529964727L;
	
	private String sEquNo = null;
	private String sStoppageCD = null;
	private String sWorkTranTime = null;
	private String sVslCD = null;
	private String sCallYear = null;
	private String sCallSeq = null;
	private String sRemark = null;
	private String sStaffCD = null;
	
	public String getsEquNo() {
		return sEquNo;
	}
	public void setsEquNo(String sEquNo) {
		this.sEquNo = sEquNo;
	}
	public String getsStoppageCD() {
		return sStoppageCD;
	}
	public void setsStoppageCD(String sStoppageCD) {
		this.sStoppageCD = sStoppageCD;
	}
	public String getsWorkTranTime() {
		return sWorkTranTime;
	}
	public void setsWorkTranTime(String sWorkTranTime) {
		this.sWorkTranTime = sWorkTranTime;
	}
	public String getsVslCD() {
		return sVslCD;
	}
	public void setsVslCD(String sVslCD) {
		this.sVslCD = sVslCD;
	}
	public String getsCallYear() {
		return sCallYear;
	}
	public void setsCallYear(String sCallYear) {
		this.sCallYear = sCallYear;
	}
	public String getsCallSeq() {
		return sCallSeq;
	}
	public void setsCallSeq(String sCallSeq) {
		this.sCallSeq = sCallSeq;
	}
	public String getsRemark() {
		return sRemark;
	}
	public void setsRemark(String sRemark) {
		this.sRemark = sRemark;
	}
	public String getsStaffCD() {
		return sStaffCD;
	}
	public void setsStaffCD(String sStaffCD) {
		this.sStaffCD = sStaffCD;
	}
	
	
}
