package com.tsb.most.basebiz.dataitem.vms;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class BondStatisticsItem extends DataItem {

	private	String ltptReasonCode;
	private	String ltptReasonName;
	private String balanceWon;
	private String totalCount;
	private String sortSequence;
	
	public String getLtptReasonCode() {
		return ltptReasonCode;
	}
	public void setLtptReasonCode(String ltptReasonCode) {
		this.ltptReasonCode = ltptReasonCode;
	}
	public String getLtptReasonName() {
		return ltptReasonName;
	}
	public void setLtptReasonName(String ltptReasonName) {
		this.ltptReasonName = ltptReasonName;
	}
	public String getBalanceWon() {
		return balanceWon;
	}
	public void setBalanceWon(String balanceWon) {
		this.balanceWon = balanceWon;
	}
	public String getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(String totalCount) {
		this.totalCount = totalCount;
	}
	public String getSortSequence() {
		return sortSequence;
	}
	public void setSortSequence(String sortSequence) {
		this.sortSequence = sortSequence;
	}

}
