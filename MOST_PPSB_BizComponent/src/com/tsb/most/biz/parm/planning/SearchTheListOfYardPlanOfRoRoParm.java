/**
* SearchRoRoYardPlanParm.java
*
* Created on   : 2021-06-07
* Target OS    : Java VM 1.8 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           	AUTHOR      	           	REVISION    	
* 2021-06-07   		nd.hiep						1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author nd.hiep
 *
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchTheListOfYardPlanOfRoRoParm extends BaseBizParm {
	private String vslCallId;
    private String masterBlNo;
    private String blNo;
    private String searchType;
    private String unitNo;
    
    //RORO Export
    private String bookingNo;
    private String shipgNoteNo;
    private String docNo;
    private String cgNo;
    
    //Non-Vessel
    private String estArrvFromDt;
    private String estArrvToDt;
    private String fwdCd;
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getMasterBlNo() {
		return masterBlNo;
	}
	public void setMasterBlNo(String masterBlNo) {
		this.masterBlNo = masterBlNo;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getBookingNo() {
		return bookingNo;
	}
	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getDocNo() {
		return docNo;
	}
	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
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
	public String getFwdCd() {
		return fwdCd;
	}
	public void setFwdCd(String fwdCd) {
		this.fwdCd = fwdCd;
	}
}
