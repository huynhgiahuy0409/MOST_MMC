package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

//MMC
public class SearchTariffServiceOrderGatheredParm extends BaseBizParm {
	private String vslCallId;
	private String payTpCd;

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}

	public String getPayTpCd() {
		return payTpCd;
	}

	public void setPayTpCd(String payTpCd) {
		this.payTpCd = payTpCd;
	}

}
