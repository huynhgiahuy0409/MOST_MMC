package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchVesselDraftSurveyParm extends BaseBizParm {
	
	private static final long serialVersionUID = -4351290891857136823L;
	
	private String scn;
	private String vslCd;

	public String getScn() {
		return scn;
	}

	public void setScn(String scn) {
		this.scn = scn;
	}

	public String getVslCd() {
		return vslCd;
	}

	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}

}
