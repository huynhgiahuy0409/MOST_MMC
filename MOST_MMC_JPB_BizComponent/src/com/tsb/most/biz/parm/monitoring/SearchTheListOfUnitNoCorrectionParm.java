/**
* SearchTheListOfUnitNoCorrectionParm.java
*
* Created on   : 2021-07-26
* Target OS    : Java VM 1.8 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2021-07-26     nd.hiep 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.monitoring;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchTheListOfUnitNoCorrectionParm extends BaseBizParm {
	private String searchType;
    private String vslCallId;
    private String blNo;  
    private String cgTpCd;
    private String unitNo;
    private String snNo;    
    private String estArrvFromDt;
    private String estArrvToDt;
    
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getSnNo() {
		return snNo;
	}
	public void setSnNo(String snNo) {
		this.snNo = snNo;
	}
	public String getEstArrvFromDt() {
		return estArrvFromDt;
	}
	public void setEstArrvFromDt(String estArrvFromDt) {
		this.estArrvFromDt = estArrvFromDt;
	}
	public String getEstArrvToDt() {
		return estArrvToDt;
	}
	public void setEstArrvToDt(String estArrvToDt) {
		this.estArrvToDt = estArrvToDt;
	}
    
}
