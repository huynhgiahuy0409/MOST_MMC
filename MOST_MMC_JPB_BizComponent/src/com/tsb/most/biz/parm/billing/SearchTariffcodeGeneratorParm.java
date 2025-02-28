package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchTariffcodeGeneratorParm extends BaseBizParm {
	private String vslCallId;
	private String tarDiv;
	private String whereSQL;
	private String proformaChk;
	private String imVrfChk;
	private String exVrfChk;
	
	private String blNo;
	private String estDt;
	private String masterBL;
	private String bookingNo;
	private String trfTpCd;
	private String searchType;
	
	private String shipgNoteNo;
	private String odrNo;
	private String ptnrCd;
	//MMC
	private int osFreeDays;
	private String opeClassCd;
	private String scrId;
	
	private String acptDelayYn;
	
	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}

	public String getTarDiv() {
		return tarDiv;
	}

	public void setTarDiv(String tarDiv) {
		this.tarDiv = tarDiv;
	}

	public String getWhereSQL() {
		return whereSQL;
	}

	public void setWhereSQL(String whereSQL) {
		this.whereSQL = whereSQL;
	}

	public String getProformaChk() {
		return proformaChk;
	}

	public void setProformaChk(String proformaChk) {
		this.proformaChk = proformaChk;
	}

	public String getImVrfChk() {
		return imVrfChk;
	}

	public void setImVrfChk(String imVrfChk) {
		this.imVrfChk = imVrfChk;
	}

	public String getExVrfChk() {
		return exVrfChk;
	}

	public void setExVrfChk(String exVrfChk) {
		this.exVrfChk = exVrfChk;
	}

	public String getBlNo() {
		return blNo;
	}

	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}

	public String getEstDt() {
		return estDt;
	}

	public void setEstDt(String estDt) {
		this.estDt = estDt;
	}

	public String getMasterBL() {
		return masterBL;
	}

	public void setMasterBL(String masterBL) {
		this.masterBL = masterBL;
	}

	public String getTrfTpCd() {
		return trfTpCd;
	}

	public void setTrfTpCd(String trfTpCd) {
		this.trfTpCd = trfTpCd;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public String getShipgNoteNo() {
		return shipgNoteNo;
	}

	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}

	public String getBookingNo() {
		return bookingNo;
	}

	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}

	public String getOdrNo() {
		return odrNo;
	}

	public void setOdrNo(String odrNo) {
		this.odrNo = odrNo;
	}

	public String getPtnrCd() {
		return ptnrCd;
	}

	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}

	public int getOsFreeDays() {
		return osFreeDays;
	}

	public void setOsFreeDays(int osFreeDays) {
		this.osFreeDays = osFreeDays;
	}

	public String getOpeClassCd() {
		return opeClassCd;
	}

	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}

	public String getScrId() {
		return scrId;
	}

	public void setScrId(String scrId) {
		this.scrId = scrId;
	}

	public String getAcptDelayYn() {
		return acptDelayYn;
	}

	public void setAcptDelayYn(String acptDelayYn) {
		this.acptDelayYn = acptDelayYn;
	}

}
