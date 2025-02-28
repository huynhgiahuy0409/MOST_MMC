package com.tsb.most.biz.parm.billing;

public class SearchTariffCodeStorageDayParm {
	private String ptnrCode;
	private String cmdtCd;
	private String cgtpCd;
	private String fromDate;
	private String toDate;
	private String whereSQL;
	//MMC - Settlement
	private String catgCd;
	private String whTpCd;
	
	public String getPtnrCode() {
		return ptnrCode;
	}
	public void setPtnrCode(String ptnrCode) {
		this.ptnrCode = ptnrCode;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getCgtpCd() {
		return cgtpCd;
	}
	public void setCgtpCd(String cgtpCd) {
		this.cgtpCd = cgtpCd;
	}
	public String getFromDate() {
		return fromDate;
	}
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
	public String getWhereSQL() {
		return whereSQL;
	}
	public void setWhereSQL(String whereSQL) {
		this.whereSQL = whereSQL;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getWhTpCd() {
		return whTpCd;
	}
	public void setWhTpCd(String whTpCd) {
		this.whTpCd = whTpCd;
	}
	
}
