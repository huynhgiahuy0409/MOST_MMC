package com.tsb.most.basebiz.parm.configuration;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchBerthLocationConfigurationParm extends BaseBizParm {
	private String berthCd;
	private String berthNm;
	private String tmnlCd;
	private String locCd;
   
	public String getLocCd() {
		return locCd;
	}
	public void setLocCd(String locCd) {
		this.locCd = locCd;
	}
	public String getTmnlCd() {
		return tmnlCd;
	}
	public void setTmnlCd(String tmnlCd) {
		this.tmnlCd = tmnlCd;
	}
	public String getBerthCd() {
		return berthCd;
	}
	public void setBerthCd(String berthCd) {
		this.berthCd = berthCd;
	}
	public String getBerthNm() {
		return berthNm;
	}
	public void setBerthNm(String berthNm) {
		this.berthNm = berthNm;
	}
}
