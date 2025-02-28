package com.tsb.most.basebiz.parm.codes;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchCountryCodeParm extends BaseBizParm{
	private String cntryCd;
	private String cntryNm;
	private String isEuro;
	private String flagState;
	
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
