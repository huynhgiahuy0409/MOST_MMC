package com.tsb.most.basebiz.dataitem.codes;

import javax.xml.bind.annotation.XmlRootElement;

import com.tsb.most.framework.dataitem.DataItem;

@XmlRootElement(name="data")
public class UNLocationCodeItem extends DataItem {
	private String cntryCd;
	private String countryNm;
	private String portCd;
	private String portNm;
	private String insDtm;
	private String updDtm;
	private String insUserId;
	private String updUserId;
	private String portVal;
	private String mapassPortCd;
	
	public String getCntryCd() {
		return cntryCd;
	}
	public void setCntryCd(String cntryCd) {
		this.cntryCd = cntryCd;
	}
	public String getCountryNm() {
		return countryNm;
	}
	public void setCountryNm(String countryNm) {
		this.countryNm = countryNm;
	}
	public String getPortCd() {
		return portCd;
	}
	public void setPortCd(String portCd) {
		this.portCd = portCd;
	}
	public String getPortNm() {
		return portNm;
	}
	public void setPortNm(String portNm) {
		this.portNm = portNm;
	}
	public String getInsDtm() {
		return insDtm;
	}
	public void setInsDtm(String insDtm) {
		this.insDtm = insDtm;
	}
	public String getUpdDtm() {
		return updDtm;
	}
	public void setUpdDtm(String updDtm) {
		this.updDtm = updDtm;
	}
	public String getInsUserId() {
		return insUserId;
	}
	public void setInsUserId(String insUserId) {
		this.insUserId = insUserId;
	}
	public String getUpdUserId() {
		return updUserId;
	}
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}
	public String getPortVal() {
		return portVal;
	}
	public void setPortVal(String portVal) {
		this.portVal = portVal;
	}
	public String getMapassPortCd() {
		return mapassPortCd;
	}
	public void setMapassPortCd(String mapassPortCd) {
		this.mapassPortCd = mapassPortCd;
	}
}
