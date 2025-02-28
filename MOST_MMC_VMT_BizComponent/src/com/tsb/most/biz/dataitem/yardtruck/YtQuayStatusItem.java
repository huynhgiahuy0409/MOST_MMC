package com.tsb.most.biz.dataitem.yardtruck;

import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItem;

public class YtQuayStatusItem extends DataItem {
	private static final long serialVersionUID = 8959956119061055581L;

	private String ytNo = CommonConstants.BLANK;
	private String isArrived = CommonConstants.BLANK;
	private String operationBaySeq1 = CommonConstants.BLANK;
	private String operationBaySeq2 = CommonConstants.BLANK;
	private String isMyJob = CommonConstants.BLANK;
	private String holdDeck1 = CommonConstants.BLANK;
	private String holdDeck2 = CommonConstants.BLANK;
	
	public String getYtNo() {
		return ytNo;
	}
	
	public String getIsArrived() {
		return isArrived;
	}
	
	public String getOperationBaySeq1() {
		return operationBaySeq1;
	}
	
	public String getOperationBaySeq2() {
		return operationBaySeq2;
	}
	
	public String getIsMyJob() {
		return isMyJob;
	}
	
	public void setYtNo(String ytNo) {
		this.ytNo = ytNo;
	}
	
	public void setIsArrived(String isArrived) {
		this.isArrived = isArrived;
	}
	
	public void setOperationBaySeq1(String operationBaySeq1) {
		this.operationBaySeq1 = operationBaySeq1;
	}
	
	public void setOperationBaySeq2(String operationBaySeq2) {
		this.operationBaySeq2 = operationBaySeq2;
	}
	
	public void setIsMyJob(String isMyJob) {
		this.isMyJob = isMyJob;
	}

	public String getHoldDeck1() {
		return holdDeck1;
	}

	public String getHoldDeck2() {
		return holdDeck2;
	}

	public void setHoldDeck1(String holdDeck1) {
		this.holdDeck1 = holdDeck1;
	}

	public void setHoldDeck2(String holdDeck2) {
		this.holdDeck2 = holdDeck2;
	}
}
