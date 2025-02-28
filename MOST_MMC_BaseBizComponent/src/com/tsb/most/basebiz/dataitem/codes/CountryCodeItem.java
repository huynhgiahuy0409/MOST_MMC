package com.tsb.most.basebiz.dataitem.codes;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

import com.tsb.most.framework.dataitem.DataItem;

@XmlRootElement(name="data")
public class CountryCodeItem extends DataItem {
	private String cntryCd;
	private String cntryNm;
	private String isEuro;
	private String flagState;
	private String updatedBy;
	private String userId;
	private Date updatedTime;
	private String crud;
	
	
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUpdatedBy() {
	    return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
	    this.updatedBy = updatedBy;
	}
	public Date getUpdatedTime() {
	    return updatedTime;
	}
	public void setUpdatedTime(Date updatedTime) {
	    this.updatedTime = updatedTime;
	}
	public String getCntryCd() {
		return cntryCd;
	}
	public void setCntryCd(String cntryCd) {
		this.cntryCd = cntryCd;
	}
	public String getCntryNm() {
		return cntryNm;
	}
	public void setCntryNm(String cntryNm) {
		this.cntryNm = cntryNm;
	}
	public String getIsEuro() {
		return isEuro;
	}
	public void setIsEuro(String isEuro) {
		this.isEuro = isEuro;
	}
	public String getFlagState() {
		return flagState;
	}
	public void setFlagState(String flagState) {
		this.flagState = flagState;
	}
}
