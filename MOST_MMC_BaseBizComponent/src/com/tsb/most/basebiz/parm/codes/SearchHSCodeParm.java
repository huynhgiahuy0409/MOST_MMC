package com.tsb.most.basebiz.parm.codes;


import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchHSCodeParm extends BaseBizParm {
	
	private String hsCdDiv;
	private String hsCode;
	private String hsNm;
	private String unit;
	private String chpt;
	private String tmnlCd;
	
	public String getHsCdDiv() {
		return hsCdDiv;
	}
	public void setHsCdDiv(String hsCdDiv) {
		this.hsCdDiv = hsCdDiv;
	}
	public String getHsCode() {
		return hsCode;
	}
	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
	}
	public String getHsNm() {
		return hsNm;
	}
	public void setHsNm(String hsNm) {
		this.hsNm = hsNm;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getChpt() {
		return chpt;
	}
	public void setChpt(String chpt) {
		this.chpt = chpt;
	}
	public String getTmnlCd() {
		return tmnlCd;
	}
	public void setTmnlCd(String tmnlCd) {
		this.tmnlCd = tmnlCd;
	}
}
