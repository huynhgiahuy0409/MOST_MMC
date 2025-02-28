package com.tsb.most.biz.parm.monitoring;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchJobMonitoringOfROROImportParm extends BaseBizParm {
	private String vslCallId;
    private String masterBlNo;
    private String blNo;
    private String cgTpCd;
    private String unitNo;
    private String searchType;
    
    private String gateTicketNo;
    
    //For RORO Export
    private String bookingNo;
  	private String shipgNoteNo;
  	
  	private String roroSeq;
  	
  //Non-Vessel
    private String estArrvFromDt;
    private String estArrvToDt;
    
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
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getGateTicketNo() {
		return gateTicketNo;
	}
	public void setGateTicketNo(String gateTicketNo) {
		this.gateTicketNo = gateTicketNo;
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
	public String getRoroSeq() {
		return roroSeq;
	}
	public void setRoroSeq(String roroSeq) {
		this.roroSeq = roroSeq;
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
