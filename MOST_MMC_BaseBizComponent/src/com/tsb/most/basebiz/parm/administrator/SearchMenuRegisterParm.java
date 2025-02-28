package com.tsb.most.basebiz.parm.administrator;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchMenuRegisterParm extends BaseBizParm{
	private String pgmId;
	private String pgmNm;
	private String menuClsf;
	private String authGrp;
	private String sysCd;
	
	public String getPgmId() {
		return pgmId;
	}
	public void setPgmId(String pgmId) {
		this.pgmId = pgmId;
	}
	public String getPgmNm() {
		return pgmNm;
	}
	public void setPgmNm(String pgmNm) {
		this.pgmNm = pgmNm;
	}
	public String getMenuClsf() {
		return menuClsf;
	}
	public void setMenuClsf(String menuClsf) {
		this.menuClsf = menuClsf;
	}
	public String getAuthGrp() {
		return authGrp;
	}
	public void setAuthGrp(String authGrp) {
		this.authGrp = authGrp;
	}
	public String getSysCd() {
		return sysCd;
	}
	public void setSysCd(String sysCd) {
		this.sysCd = sysCd;
	}
}
