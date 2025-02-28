package com.tsb.most.basebiz.dataitem.vms;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class ContractStatisticsItem extends DataItem {

	private  String levelValue;
	private  String summaryBulk1;
	private  String summaryBulk2;
	private  String summaryTank;
	
	public String getLevelValue() {
		return levelValue;
	}
	public void setLevelValue(String levelValue) {
		this.levelValue = levelValue;
	}
	public String getSummaryBulk1() {
		return summaryBulk1;
	}
	public void setSummaryBulk1(String summaryBulk1) {
		this.summaryBulk1 = summaryBulk1;
	}
	public String getSummaryBulk2() {
		return summaryBulk2;
	}
	public void setSummaryBulk2(String summaryBulk2) {
		this.summaryBulk2 = summaryBulk2;
	}
	public String getSummaryTank() {
		return summaryTank;
	}
	public void setSummaryTank(String summaryTank) {
		this.summaryTank = summaryTank;
	}
}
