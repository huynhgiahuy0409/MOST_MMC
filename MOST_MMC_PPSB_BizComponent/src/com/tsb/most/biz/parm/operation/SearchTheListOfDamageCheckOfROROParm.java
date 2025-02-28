package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchTheListOfDamageCheckOfROROParm extends BaseBizParm {
	private String vslCallId;
    private String masterBlNo;
    private String blNo;
    private String bookingNo;
    private String snNo;
    private String ixCd;
    private String unitNo;
    private String checkDtFrom;
    private String checkDtTo;
    private String searchType;
    private String docNo;
    private String cgNo;
    private String catgCd;
    private String brandCd;
    
    private String returnSetType;
    private String dmgSearchType;
    private String invCd;
    private String invNm;
    private String chkLoc;
    private String pgmId;
    
	public String getChkLoc() {
		return chkLoc;
	}
	public void setChkLoc(String chkLoc) {
		this.chkLoc = chkLoc;
	}
	public String getPgmId() {
		return pgmId;
	}
	public void setPgmId(String pgmId) {
		this.pgmId = pgmId;
	}

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
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getBookingNo() {
		return bookingNo;
	}
	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}
	public String getSnNo() {
		return snNo;
	}
	public void setSnNo(String snNo) {
		this.snNo = snNo;
	}
	public String getBrandCd() {
		return brandCd;
	}
	public void setBrandCd(String brandCd) {
		this.brandCd = brandCd;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getCheckDtFrom() {
		return checkDtFrom;
	}
	public void setCheckDtFrom(String checkDtFrom) {
		this.checkDtFrom = checkDtFrom;
	}
	public String getCheckDtTo() {
		return checkDtTo;
	}
	public void setCheckDtTo(String checkDtTo) {
		this.checkDtTo = checkDtTo;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getIxCd() {
		return ixCd;
	}
	public void setIxCd(String ixCd) {
		this.ixCd = ixCd;
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
	public String getReturnSetType() {
		return returnSetType;
	}
	public void setReturnSetType(String returnSetType) {
		this.returnSetType = returnSetType;
	}
	public String getDmgSearchType() {
		return dmgSearchType;
	}
	public void setDmgSearchType(String dmgSearchType) {
		this.dmgSearchType = dmgSearchType;
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
	public String getInvCd() {
		return invCd;
	}
	public void setInvCd(String invCd) {
		this.invCd = invCd;
	}
	public String getInvNm() {
		return invNm;
	}
	public void setInvNm(String invNm) {
		this.invNm = invNm;
	}


}
