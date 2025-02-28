package com.tsb.most.biz.dataitem.yardtruck;

import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItem;

public class YtYardStatusItem extends DataItem {
	private static final long serialVersionUID = -778527172807491089L;

	private String bayNo = CommonConstants.BLANK;
	private String jobCount = CommonConstants.BLANK;
	private String isLiftOn = CommonConstants.BLANK;
	private String isLiftOff = CommonConstants.BLANK;
	private String isMyJob = CommonConstants.BLANK;
	
	public String getBayNo() {
		return bayNo;
	}
	
	public String getJobCount() {
		return jobCount;
	}
	
	public String getIsLiftOn() {
		return isLiftOn;
	}
	
	public String getIsLiftOff() {
		return isLiftOff;
	}
	
	public String getIsMyJob() {
		return isMyJob;
	}
	
	public void setBayNo(String bayNo) {
		this.bayNo = bayNo;
	}
	
	public void setJobCount(String jobCount) {
		this.jobCount = jobCount;
	}
	
	public void setIsLiftOn(String isLiftOn) {
		this.isLiftOn = isLiftOn;
	}
	
	public void setIsLiftOff(String isLiftOff) {
		this.isLiftOff = isLiftOff;
	}
	
	public void setIsMyJob(String isMyJob) {
		this.isMyJob = isMyJob;
	}
}
