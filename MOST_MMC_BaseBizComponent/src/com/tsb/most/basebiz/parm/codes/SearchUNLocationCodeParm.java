package com.tsb.most.basebiz.parm.codes;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchUNLocationCodeParm extends BaseBizParm{
	private String cntryCd;
	private String countryNm;
	private String portCd;
	private String portNm;
	public String getCntryCd() {
		return cntryCd;
	}
	public void setCntryCd(String cntryCd) {
		this.cntryCd = cntryCd;
	}
	public String getPortCd() {
		return portCd;
	}
	public String getCountryNm() {
		return countryNm;
	}
	public void setCountryNm(String countryNm) {
		this.countryNm = countryNm;
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
	
	
	
}
