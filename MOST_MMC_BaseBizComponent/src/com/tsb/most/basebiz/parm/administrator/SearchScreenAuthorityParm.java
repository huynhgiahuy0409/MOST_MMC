package com.tsb.most.basebiz.parm.administrator;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchScreenAuthorityParm extends BaseBizParm{
	private String pgmId;
	private String screenType;
	private String xtype;
	
	public String getPgmId() {
		return pgmId;
	}

	public void setPgmId(String pgmId) {
		this.pgmId = pgmId;
	}

	public String getScreenType() {
		return screenType;
	}

	public void setScreenType(String screenType) {
		this.screenType = screenType;
	}

	public String getXtype() {
		return xtype;
	}

	public void setXtype(String xtype) {
		this.xtype = xtype;
	}
	
	
}
