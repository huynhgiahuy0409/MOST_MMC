package com.tsb.most.basebiz.parm.codes;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchBrandModelCodeParm extends BaseBizParm {
	private String brandCd;
	private String brandNm;
	private String modelNm;
	private String modelCd;
	
	public String getBrandNm() {
		return brandNm;
	}
	public void setBrandNm(String brandNm) {
		this.brandNm = brandNm;
	}
	public String getModelNm() {
		return modelNm;
	}
	public void setModelNm(String modelNm) {
		this.modelNm = modelNm;
	}
	public String getModelCd() {
		return modelCd;
	}
	public void setModelCd(String modelCd) {
		this.modelCd = modelCd;
	}
	public String getBrandCd() {
		return brandCd;
	}
	public void setBrandCd(String brandCd) {
		this.brandCd = brandCd;
	}

}