package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchImportReconcileForLiquidParm extends BaseBizParm {
    private String vslCallId ;
    private String fromAtb ;
    private String toAtb ;
    private String status;
    private String searchType;
    private String scn;
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getFromAtb() {
		return fromAtb;
	}
	public void setFromAtb(String fromAtb) {
		this.fromAtb = fromAtb;
	}
	public String getToAtb() {
		return toAtb;
	}
	public void setToAtb(String toAtb) {
		this.toAtb = toAtb;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
    
    
   
}
