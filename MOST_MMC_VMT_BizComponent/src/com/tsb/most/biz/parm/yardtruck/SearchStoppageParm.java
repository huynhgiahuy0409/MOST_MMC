package com.tsb.most.biz.parm.yardtruck;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchStoppageParm extends BaseBizParm {
	private static final long serialVersionUID = -8472154979402724853L;

	private String equNo = "";
	private String stoppageCd = "";
	
	public String getEquNo() {
		return equNo;
	}
	public void setEquNo(String equNo) {
		this.equNo = equNo;
	}
	public String getStoppageCd() {
		return stoppageCd;
	}
	public void setStoppageCd(String stoppageCd) {
		this.stoppageCd = stoppageCd;
	}
}
