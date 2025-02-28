package com.tsb.most.basebiz.dataitem.vms;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class ClaimStatisticsItem extends DataItem {

	private	String totalCount;
	private	String requestTotalCount;
	private String requestCount;
	private String requestConfirmCount;
	private String requestLawCount;
	private String requestCompeleteCount;
	private String completeCount;
	
	public String getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(String totalCount) {
		this.totalCount = totalCount;
	}
	public String getRequestTotalCount() {
		return requestTotalCount;
	}
	public void setRequestTotalCount(String requestTotalCount) {
		this.requestTotalCount = requestTotalCount;
	}
	public String getRequestCount() {
		return requestCount;
	}
	public void setRequestCount(String requestCount) {
		this.requestCount = requestCount;
	}
	public String getRequestConfirmCount() {
		return requestConfirmCount;
	}
	public void setRequestConfirmCount(String requestConfirmCount) {
		this.requestConfirmCount = requestConfirmCount;
	}
	public String getRequestLawCount() {
		return requestLawCount;
	}
	public void setRequestLawCount(String requestLawCount) {
		this.requestLawCount = requestLawCount;
	}
	public String getRequestCompeleteCount() {
		return requestCompeleteCount;
	}
	public void setRequestCompeleteCount(String requestCompeleteCount) {
		this.requestCompeleteCount = requestCompeleteCount;
	}
	public String getCompleteCount() {
		return completeCount;
	}
	public void setCompleteCount(String completeCount) {
		this.completeCount = completeCount;
	}
	
}
